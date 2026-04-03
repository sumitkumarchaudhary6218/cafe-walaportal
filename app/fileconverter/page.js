"use client";

import { useState, useRef, useCallback } from "react";

// ─── tiny helpers ──────────────────────────────────────────────────────────────
const readFileAsDataURL = (file) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

const readFileAsArrayBuffer = (file) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsArrayBuffer(file);
  });

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// ─── JPG → PDF (pure canvas, no lib needed) ───────────────────────────────────
async function convertImagesToPdf(files, quality = 0.92) {
  // We'll use jsPDF loaded from CDN via dynamic import-like approach
  // Since we can't use dynamic CDN in Next.js easily, we build a minimal PDF manually
  // using canvas + raw PDF bytes approach via jsPDF script tag check,
  // OR we embed pages into a single PDF using the browser's print API as fallback.
  // For production use, install: npm i jspdf
  // Here we create a proper multi-page PDF using raw PDF structure:

  const pages = [];
  for (const file of files) {
    const dataUrl = await readFileAsDataURL(file);
    await new Promise((res) => {
      const img = new Image();
      img.onload = () => {
        pages.push({ img, w: img.naturalWidth, h: img.naturalHeight, dataUrl });
        res();
      };
      img.src = dataUrl;
    });
  }

  // Build PDF using canvas → blob per page, then stitch with pdf-lib style raw PDF
  // We'll use the simplest approach: single-canvas PDF
  // Load jsPDF via script tag if not already loaded
  if (!window.jspdf) {
    await new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload = res;
      s.onerror = () => rej(new Error("Failed to load jsPDF"));
      document.head.appendChild(s);
    });
  }

  const JsPDF = window.jspdf.jsPDF;
  const firstPage = pages[0];
  const orientation = firstPage.w > firstPage.h ? "l" : "p";
  const doc = new JsPDF({ orientation, unit: "px", format: [firstPage.w, firstPage.h], hotfixes: ["px_scaling"] });

  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    if (i > 0) doc.addPage([p.w, p.h], p.w > p.h ? "l" : "p");
    const canvas = document.createElement("canvas");
    canvas.width = p.w; canvas.height = p.h;
    canvas.getContext("2d").drawImage(p.img, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", quality);
    doc.addImage(dataUrl, "JPEG", 0, 0, p.w, p.h, undefined, "FAST");
  }

  const blob = doc.output("blob");
  return blob;
}

// ─── PDF → JPG (using PDF.js) ─────────────────────────────────────────────────
async function convertPdfToImages(file, scale = 2) {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const pdfjsLib = await import("https://cdn.skypack.dev/pdfjs-dist").catch(() => null);

  if (!pdfjsLib) throw new Error("PDF.js not available");

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  const images = [];
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    images.push({ dataUrl, pageNum, w: viewport.width, h: viewport.height });
  }

  return images;
}

// ─── UI COMPONENT ─────────────────────────────────────────────────────────────
const MODES = { IMG_TO_PDF: "img2pdf", PDF_TO_IMG: "pdf2img" };

export default function FileConverter() {
  const [mode, setMode] = useState(MODES.IMG_TO_PDF);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [outputImages, setOutputImages] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [errorMsg, setErrorMsg] = useState("");
  const [quality, setQuality] = useState(92);
  const [scale, setScale] = useState(2);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const accept = mode === MODES.IMG_TO_PDF ? "image/jpeg,image/png,image/webp" : "application/pdf";

  const reset = () => {
    setFiles([]);
    setPreviews([]);
    setOutputImages([]);
    setStatus("idle");
    setErrorMsg("");
  };

  const handleModeSwitch = (m) => {
    setMode(m);
    reset();
  };

  const processFiles = useCallback(async (incoming) => {
    if (!incoming.length) return;
    reset();

    if (mode === MODES.IMG_TO_PDF) {
      const imgs = Array.from(incoming).filter((f) => f.type.startsWith("image/"));
      if (!imgs.length) { setErrorMsg("Please drop image files (JPG, PNG, WebP)."); setStatus("error"); return; }
      setFiles(imgs);
      const urls = await Promise.all(imgs.map(readFileAsDataURL));
      setPreviews(urls);
    } else {
      const pdfs = Array.from(incoming).filter((f) => f.type === "application/pdf");
      if (!pdfs.length) { setErrorMsg("Please drop a PDF file."); setStatus("error"); return; }
      setFiles([pdfs[0]]);
    }
  }, [mode]);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const onFileChange = (e) => processFiles(e.target.files);

  const handleConvert = async () => {
    if (!files.length) return;
    setStatus("loading");
    setOutputImages([]);
    try {
      if (mode === MODES.IMG_TO_PDF) {
        const blob = await convertImagesToPdf(files, quality / 100);
        downloadBlob(blob, "converted.pdf");
        setStatus("done");
      } else {
        const imgs = await convertPdfToImages(files[0], scale);
        setOutputImages(imgs);
        setStatus("done");
      }
    } catch (err) {
      setErrorMsg(err.message || "Conversion failed.");
      setStatus("error");
    }
  };

  const downloadImage = (dataUrl, pageNum) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `page-${pageNum}.jpg`;
    a.click();
  };

  const downloadAll = () => {
    outputImages.forEach((img) => downloadImage(img.dataUrl, img.pageNum));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans flex flex-col items-center justify-start px-4 py-12 selection:bg-violet-500/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .title-font { font-family: 'Syne', sans-serif; }
        .glow { box-shadow: 0 0 40px rgba(139,92,246,0.25); }
        .glow-sm { box-shadow: 0 0 16px rgba(139,92,246,0.3); }
        .border-grad { border: 1px solid rgba(139,92,246,0.3); }
        .bg-card { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); }
        .tab-active { background: linear-gradient(135deg, #7c3aed, #4f46e5); box-shadow: 0 4px 20px rgba(124,58,237,0.4); }
        .btn-primary { background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); transition: all .2s; }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(124,58,237,0.5); }
        .btn-primary:active { transform: translateY(0); }
        .btn-primary:disabled { opacity: .4; cursor: not-allowed; transform: none !important; }
        .drop-zone { transition: all .25s; }
        .drop-zone:hover, .drop-active { border-color: rgba(139,92,246,0.7) !important; background: rgba(139,92,246,0.06) !important; }
        .thumb { transition: transform .2s; }
        .thumb:hover { transform: scale(1.04); }
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .fade-up { animation: fadeUp .4s ease both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .badge { background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.3); }
        .noise { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E"); }
      `}</style>

      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-violet-700/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />
        <div className="noise absolute inset-0 w-full h-full" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-10 fade-up">
        <div className="inline-flex items-center gap-2 badge rounded-full px-4 py-1.5 text-xs text-violet-300 mb-4 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block animate-pulse" />
          File Converter
        </div>
        <h1 className="title-font text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
            Convert
          </span>{" "}
          <span className="text-white/90">Anything.</span>
        </h1>
        <p className="text-white/40 mt-3 text-sm md:text-base font-light max-w-md mx-auto">
          Images to PDF or PDF to images — fast, private, and fully in-browser.
        </p>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-2xl bg-card border-grad rounded-2xl p-6 md:p-8 glow fade-up" style={{ animationDelay: ".1s" }}>

        {/* Mode Tabs */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-8">
          {[
            { id: MODES.IMG_TO_PDF, label: "Image → PDF", icon: "🖼️" },
            { id: MODES.PDF_TO_IMG, label: "PDF → Image", icon: "📄" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => handleModeSwitch(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === t.id ? "tab-active text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Drop Zone */}
        <div
          className={`drop-zone border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer mb-6 relative ${dragOver ? "drop-active" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={mode === MODES.IMG_TO_PDF}
            className="hidden"
            onChange={onFileChange}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-2xl">
              {mode === MODES.IMG_TO_PDF ? "🖼️" : "📄"}
            </div>
            <div>
              <p className="text-white/70 text-sm font-medium">
                Drop {mode === MODES.IMG_TO_PDF ? "images" : "a PDF"} here
              </p>
              <p className="text-white/30 text-xs mt-1">
                or <span className="text-violet-400 underline underline-offset-2">browse files</span>
                {mode === MODES.IMG_TO_PDF ? " · JPG, PNG, WebP · multiple allowed" : " · PDF only"}
              </p>
            </div>
          </div>
        </div>

        {/* Settings Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {mode === MODES.IMG_TO_PDF ? (
            <label className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
              <span className="text-xs text-white/50 uppercase tracking-wider">Quality</span>
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="range" min={50} max={100} step={1}
                  value={quality}
                  onChange={(e) => setQuality(+e.target.value)}
                  className="flex-1 accent-violet-500"
                />
                <span className="text-violet-300 text-sm font-semibold w-8 text-right">{quality}%</span>
              </div>
            </label>
          ) : (
            <label className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
              <span className="text-xs text-white/50 uppercase tracking-wider">Resolution</span>
              <div className="flex gap-2">
                {[1, 1.5, 2, 3].map((s) => (
                  <button
                    key={s}
                    onClick={() => setScale(s)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      scale === s ? "tab-active text-white" : "bg-white/5 text-white/40 hover:text-white/70"
                    }`}
                  >
                    {s}×
                  </button>
                ))}
              </div>
            </label>
          )}
        </div>

        {/* Preview Thumbnails (img→pdf) */}
        {previews.length > 0 && (
          <div className="mb-6 fade-up">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-white/50 uppercase tracking-wider">{previews.length} image{previews.length > 1 ? "s" : ""} selected</span>
              <button onClick={reset} className="text-xs text-red-400/70 hover:text-red-400 transition-colors">✕ Clear</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {previews.map((url, i) => (
                <div key={i} className="thumb relative group rounded-lg overflow-hidden border border-white/10" style={{ width: 72, height: 72 }}>
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PDF file selected */}
        {mode === MODES.PDF_TO_IMG && files.length > 0 && (
          <div className="mb-6 fade-up flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
            <span className="text-2xl">📄</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/80 font-medium truncate">{files[0].name}</p>
              <p className="text-xs text-white/30">{(files[0].size / 1024).toFixed(1)} KB</p>
            </div>
            <button onClick={reset} className="text-xs text-red-400/70 hover:text-red-400 transition-colors">✕</button>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="mb-6 fade-up bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-300">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={!files.length || status === "loading"}
          className="btn-primary w-full py-4 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 disabled:opacity-40"
        >
          {status === "loading" ? (
            <>
              <svg className="spinner w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="8" />
              </svg>
              Converting…
            </>
          ) : (
            <>
              ⚡ Convert {mode === MODES.IMG_TO_PDF ? "to PDF" : "to Images"}
            </>
          )}
        </button>

        {/* Done state – img→pdf */}
        {status === "done" && mode === MODES.IMG_TO_PDF && (
          <div className="mt-5 fade-up text-center">
            <div className="inline-flex flex-col items-center gap-2">
              <span className="text-3xl">✅</span>
              <p className="text-sm text-white/70">PDF downloaded successfully!</p>
              <button onClick={reset} className="text-xs text-violet-400 hover:underline">Convert more files</button>
            </div>
          </div>
        )}
      </div>

      {/* Output Images – pdf→img */}
      {outputImages.length > 0 && (
        <div className="relative z-10 w-full max-w-2xl mt-6 bg-card border-grad rounded-2xl p-6 md:p-8 fade-up">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="title-font text-lg font-bold text-white/90">Converted Pages</h2>
              <p className="text-xs text-white/40 mt-0.5">{outputImages.length} page{outputImages.length > 1 ? "s" : ""} extracted</p>
            </div>
            <button
              onClick={downloadAll}
              className="btn-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              ⬇ Download All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {outputImages.map((img) => (
              <div key={img.pageNum} className="thumb group relative rounded-xl overflow-hidden border border-white/10 cursor-pointer aspect-[3/4]" onClick={() => downloadImage(img.dataUrl, img.pageNum)}>
                <img src={img.dataUrl} alt={`Page ${img.pageNum}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-1">
                  <span className="text-xl">⬇</span>
                  <span className="text-xs text-white font-medium">Page {img.pageNum}</span>
                </div>
                <div className="absolute top-2 left-2 badge rounded-full px-2 py-0.5 text-xs text-violet-300">
                  p.{img.pageNum}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button onClick={reset} className="text-xs text-violet-400 hover:underline">Convert another file</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <p className="relative z-10 mt-10 text-xs text-white/20 text-center">
        All processing happens in your browser · No files are uploaded anywhere
      </p>
    </div>
  );
}