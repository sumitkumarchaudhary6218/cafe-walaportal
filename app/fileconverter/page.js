"use client";

import { useState, useRef, useCallback } from "react";

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

async function convertImagesToPdf(files, quality = 0.92) {
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
    canvas.width = p.w;
    canvas.height = p.h;
    canvas.getContext("2d").drawImage(p.img, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", quality);
    doc.addImage(dataUrl, "JPEG", 0, 0, p.w, p.h, undefined, "FAST");
  }

  return doc.output("blob");
}

async function convertPdfToImages(file, scale = 2) {
  const arrayBuffer = await readFileAsArrayBuffer(file);

  if (!window.pdfjsLib) {
    await new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      s.onload = res;
      s.onerror = () => rej(new Error("Failed to load PDF.js"));
      document.head.appendChild(s);
    });
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }

  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
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
    images.push({ dataUrl, pageNum, fileName: file.name });
  }

  return images;
}

const MODES = { IMG_TO_PDF: "img2pdf", PDF_TO_IMG: "pdf2img" };

export default function FileConverter() {
  const [mode, setMode] = useState(MODES.IMG_TO_PDF);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [outputImages, setOutputImages] = useState([]);
  const [status, setStatus] = useState("idle");
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

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    if (mode === MODES.IMG_TO_PDF) {
      const newPreviews = [...previews];
      newPreviews.splice(index, 1);
      setPreviews(newPreviews);
    }
    if (newFiles.length === 0) setStatus("idle");
  };

  const handleModeSwitch = (m) => {
    setMode(m);
    reset();
  };

  const processFiles = useCallback(
    async (incoming) => {
      if (!incoming.length) return;
      setErrorMsg("");

      if (mode === MODES.IMG_TO_PDF) {
        const imgs = Array.from(incoming).filter((f) => f.type.startsWith("image/"));
        if (!imgs.length) {
          setErrorMsg("Please add image files (JPG, PNG, WebP).");
          return;
        }
        const newFiles = [...files, ...imgs];
        setFiles(newFiles);
        const newUrls = await Promise.all(imgs.map(readFileAsDataURL));
        setPreviews([...previews, ...newUrls]);
      } else {
        const pdfs = Array.from(incoming).filter((f) => f.type === "application/pdf");
        if (!pdfs.length) {
          setErrorMsg("Please add PDF files.");
          return;
        }
        setFiles([...files, ...pdfs]);
      }
    },
    [mode, files, previews]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

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
        let allExtractedImages = [];
        for (const file of files) {
          const imgs = await convertPdfToImages(file, scale);
          allExtractedImages = [...allExtractedImages, ...imgs];
        }
        setOutputImages(allExtractedImages);
        setStatus("done");
      }
    } catch (err) {
      setErrorMsg(err.message || "Conversion failed.");
      setStatus("error");
    }
  };

  const downloadImage = (dataUrl, name, page) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${name.replace(".pdf", "")}-page-${page}.jpg`;
    a.click();
  };

  const downloadAll = () => {
    outputImages.forEach((img) => downloadImage(img.dataUrl, img.fileName, img.pageNum));
  };

  const isImg2Pdf = mode === MODES.IMG_TO_PDF;

  return (
    <div className="fc-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap');

        .fc-root { min-height: 75vh; background: #f7f6f3; font-family: 'Geist', sans-serif; color: #1a1a1a; }
        .fc-layout { display: grid; grid-template-columns: 320px 1fr; min-height: 75vh; }

        .fc-left { background: #fff; border-right: 1px solid #e8e5df; padding: 32px 24px; display: flex; flex-direction: column; }
        .fc-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .fc-section-label { font-size: 10px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: #a8a29e; }
        
        .fc-refresh-btn { 
          background: none; border: none; cursor: pointer; color: #a8a29e; 
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s ease, color 0.2s;
        }
        .fc-refresh-btn:hover { color: #d97706; transform: rotate(90deg); }
        .fc-refresh-btn svg { width: 14px; height: 14px; }

        .fc-mode-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 28px; }
        .fc-mode-btn { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 10px; border: 1.5px solid transparent; background: transparent; cursor: pointer; text-align: left; }
        .fc-mode-btn.active { background: #fffbf5; border-color: #d97706; }
        .fc-mode-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; background: #f5f4f0; }
        .fc-mode-btn.active .fc-mode-icon { background: #fef3c7; }

        .fc-file-list { max-height: 250px; overflow-y: auto; margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
        .fc-file-chip { display: flex; align-items: center; gap: 8px; background: #f7f6f3; border: 1px solid #e8e5df; border-radius: 8px; padding: 6px 10px; }
        .fc-file-chip-name { font-size: 11px; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        
        .fc-convert-btn { width: 100%; padding: 14px; border-radius: 12px; border: none; background: #1a1a1a; color: #fff; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: auto; }
        .fc-convert-btn:disabled { background: #d6d3cd; }

        .fc-right { display: flex; flex-direction: column; background: #f7f6f3; }
        .fc-header-row { display: flex; align-items: center; justify-content: space-between; padding: 32px 32px 0; }
        .fc-right-title { font-family: 'Instrument Serif', serif; font-size: 28px; }
        .fc-clear-all { font-size: 12px; color: #a8a29e; background: none; border: none; cursor: pointer; text-decoration: underline; }
        .fc-clear-all:hover { color: #ef4444; }

        .fc-dropzone-wrap { padding: 24px 32px; flex: 1; }
        .fc-dropzone { border: 2px dashed #d6d3cd; border-radius: 16px; background:#465de2;  padding: 40px; text-align: center; cursor: pointer; min-height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .fc-output-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; margin-top: 20px; }
        .fc-output-card { border-radius: 12px; overflow: hidden; border: 1.5px solid #e8e5df; position: relative; aspect-ratio: 3/4; cursor: pointer; }
        .fc-output-card img { width: 100%; height: 100%; object-fit: cover; }
        .fc-page-badge { position: absolute; top: 6px; left: 6px; background: #d97706; color: #fff; font-size: 9px; padding: 2px 7px; border-radius: 999px; font-weight: bold; }

        .fc-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: fcspin .7s linear infinite; }
        @keyframes fcspin { to { transform: rotate(360deg); } }
        
        @media (max-width: 768px) { .fc-layout { grid-template-columns: 1fr; } }
      `}</style>

      <div className="fc-layout">
        <aside className="fc-left">
          <div className="fc-section-header">
            <p className="fc-section-label">Mode</p>
            <button className="fc-refresh-btn" onClick={reset} title="Refresh / Clear All">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
            </button>
          </div>

          <div className="fc-mode-group">
            {[
              { id: MODES.IMG_TO_PDF, icon: "🖼", title: "Images → PDF" },
              { id: MODES.PDF_TO_IMG, icon: "📄", title: "PDF → Images" },
            ].map((m) => (
              <button key={m.id} className={`fc-mode-btn${mode === m.id ? " active" : ""}`} onClick={() => handleModeSwitch(m.id)}>
                <div className="fc-mode-icon">{m.icon}</div>
                <div className="fc-mode-text-title">{m.title}</div>
              </button>
            ))}
          </div>

          {files.length > 0 && (
            <>
              <p className="fc-section-label" style={{marginBottom: 8}}>Files ({files.length})</p>
              <div className="fc-file-list">
                {files.map((f, i) => (
                  <div key={i} className="fc-file-chip">
                    <span className="fc-file-chip-name">{f.name}</span>
                    <button className="fc-clear-all" style={{textDecoration:'none', fontSize: 14}} onClick={() => removeFile(i)}>✕</button>
                  </div>
                ))}
              </div>
            </>
          )}

          <button className="fc-convert-btn" onClick={handleConvert} disabled={!files.length || status === "loading"}>
            {status === "loading" ? <div className="fc-spinner" /> : `Convert to ${isImg2Pdf ? 'PDF' : 'Images'}`}
          </button>
        </aside>

        <main className="fc-right">
          <div className="fc-header-row">
            <div className="fc-right-title">
              {isImg2Pdf ? <>Combine <em>Images</em></> : <>Extract from <em>PDF</em></>}
            </div>
            {files.length > 0 && (
              <button className="fc-clear-all" onClick={reset}>Clear All</button>
            )}
          </div>

          <div className="fc-dropzone-wrap">
            <div className={`fc-dropzone${dragOver ? " over" : ""}`} 
                 onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} 
                 onDragLeave={() => setDragOver(false)} 
                 onDrop={onDrop} 
                 onClick={() => inputRef.current?.click()}>
              <input ref={inputRef} type="file" accept={accept} multiple style={{ display: "none" }} onChange={onFileChange} />
              <div style={{fontSize: 40, marginBottom: 12}}>{isImg2Pdf ? "🖼" : "📄"}</div>
              <div style={{ fontWeight: 500, color: "white" }}>Click or Drag {isImg2Pdf ? 'Images' : 'PDFs'} Here</div>
              <div style={{fontSize: 12, color: '#a8a29e', marginTop: 8}}>You can add multiple files</div>
            </div>

            {outputImages.length > 0 && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
                   <span className="fc-section-label">{outputImages.length} Pages Extracted</span>
                   <button className="fc-clear-all" style={{color:'#d97706'}} onClick={downloadAll}>Download All</button>
                </div>
                <div className="fc-output-grid">
                  {outputImages.map((img, i) => (
                    <div key={i} className="fc-output-card" onClick={() => downloadImage(img.dataUrl, img.fileName, img.pageNum)}>
                      <img src={img.dataUrl} alt="" />
                      <span className="fc-page-badge">P{img.pageNum}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {status === "done" && isImg2Pdf && (
               <div style={{textAlign: 'center', padding: 40}}>
                  <div style={{fontSize: 40, marginBottom: 10}}>✅</div>
                  <h3>PDF Ready</h3>
                  <button className="fc-clear-all" onClick={reset} style={{marginTop: 10}}>Start New Task</button>
               </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}