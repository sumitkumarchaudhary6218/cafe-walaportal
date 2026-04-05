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
    images.push({ dataUrl, pageNum, w: viewport.width, h: viewport.height });
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

  const handleModeSwitch = (m) => {
    setMode(m);
    reset();
  };

  const processFiles = useCallback(
    async (incoming) => {
      if (!incoming.length) return;
      reset();

      if (mode === MODES.IMG_TO_PDF) {
        const imgs = Array.from(incoming).filter((f) => f.type.startsWith("image/"));
        if (!imgs.length) {
          setErrorMsg("Please drop image files (JPG, PNG, WebP).");
          setStatus("error");
          return;
        }
        setFiles(imgs);
        const urls = await Promise.all(imgs.map(readFileAsDataURL));
        setPreviews(urls);
      } else {
        const pdfs = Array.from(incoming).filter((f) => f.type === "application/pdf");
        if (!pdfs.length) {
          setErrorMsg("Please drop a PDF file.");
          setStatus("error");
          return;
        }
        setFiles([pdfs[0]]);
      }
    },
    [mode]
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

  const isImg2Pdf = mode === MODES.IMG_TO_PDF;

  return (
    <div className="fc-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap');

        .fc-root {
          min-height: 100vh;
          background: #f7f6f3;
          font-family: 'Geist', sans-serif;
          color: #1a1a1a;
          padding: 0;
        }

        /* ── TOP NAV ── */
        .fc-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 32px;
          background: #fff;
          border-bottom: 1px solid #e8e5df;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .fc-nav-logo {
          font-family: 'Instrument Serif', serif;
          font-size: 20px;
          color: #1a1a1a;
          letter-spacing: -0.3px;
        }
        .fc-nav-logo span { color: #d97706; }
        .fc-nav-tag {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #a8a29e;
          background: #f5f4f0;
          border: 1px solid #e8e5df;
          padding: 4px 12px;
          border-radius: 999px;
        }

        /* ── MAIN LAYOUT ── */
        .fc-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          min-height: calc(100vh - 61px);
        }

        /* ── LEFT PANEL ── */
        .fc-left {
          background: #fff;
          border-right: 1px solid #e8e5df;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .fc-section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #a8a29e;
          margin-bottom: 12px;
        }

        /* Mode toggle */
        .fc-mode-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 28px;
        }
        .fc-mode-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid transparent;
          background: transparent;
          cursor: pointer;
          transition: all .18s;
          text-align: left;
          font-family: 'Geist', sans-serif;
        }
        .fc-mode-btn:hover { background: #f7f6f3; border-color: #e8e5df; }
        .fc-mode-btn.active {
          background: #fffbf5;
          border-color: #d97706;
        }
        .fc-mode-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          background: #f5f4f0;
          flex-shrink: 0;
          transition: background .18s;
        }
        .fc-mode-btn.active .fc-mode-icon { background: #fef3c7; }
        .fc-mode-text-title {
          font-size: 13px;
          font-weight: 500;
          color: #1a1a1a;
          line-height: 1.2;
        }
        .fc-mode-text-sub {
          font-size: 11px;
          color: #a8a29e;
          margin-top: 1px;
        }
        .fc-mode-check {
          margin-left: auto;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #d97706;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity .18s;
          flex-shrink: 0;
        }
        .fc-mode-btn.active .fc-mode-check { opacity: 1; }
        .fc-mode-check svg { width: 10px; height: 10px; stroke: #fff; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }

        .fc-divider { height: 1px; background: #e8e5df; margin: 4px 0 24px; }

        /* Settings */
        .fc-settings-group { display: flex; flex-direction: column; gap: 16px; margin-bottom: 28px; }
        .fc-setting-item { display: flex; flex-direction: column; gap: 8px; }
        .fc-setting-row { display: flex; align-items: center; justify-content: space-between; }
        .fc-setting-name { font-size: 12px; font-weight: 500; color: #57534e; }
        .fc-setting-val { font-size: 12px; font-weight: 600; color: #d97706; }
        .fc-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 3px;
          border-radius: 2px;
          background: #e8e5df;
          outline: none;
          cursor: pointer;
        }
        .fc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #d97706;
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,.2);
          cursor: pointer;
        }
        .fc-res-group { display: flex; gap: 6px; }
        .fc-res-btn {
          flex: 1;
          padding: 6px 0;
          border-radius: 7px;
          border: 1.5px solid #e8e5df;
          background: #fff;
          font-size: 11px;
          font-weight: 600;
          color: #a8a29e;
          cursor: pointer;
          transition: all .15s;
          font-family: 'Geist', sans-serif;
        }
        .fc-res-btn:hover { border-color: #d97706; color: #d97706; }
        .fc-res-btn.active { border-color: #d97706; background: #fffbf5; color: #d97706; }

        /* File chip */
        .fc-file-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f7f6f3;
          border: 1px solid #e8e5df;
          border-radius: 10px;
          padding: 10px 12px;
          margin-bottom: 16px;
        }
        .fc-file-chip-icon { font-size: 20px; }
        .fc-file-chip-info { flex: 1; min-width: 0; }
        .fc-file-chip-name { font-size: 12px; font-weight: 500; color: #1a1a1a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .fc-file-chip-size { font-size: 10px; color: #a8a29e; margin-top: 2px; }
        .fc-chip-clear { background: none; border: none; cursor: pointer; color: #c4b5a0; font-size: 14px; padding: 2px 4px; border-radius: 4px; transition: color .15s; }
        .fc-chip-clear:hover { color: #ef4444; }

        /* Convert button */
        .fc-convert-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: #1a1a1a;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Geist', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all .2s;
          letter-spacing: .01em;
          margin-top: auto;
        }
        .fc-convert-btn:hover { background: #2c2c2c; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,.15); }
        .fc-convert-btn:active { transform: translateY(0); }
        .fc-convert-btn:disabled { background: #d6d3cd; cursor: not-allowed; transform: none; box-shadow: none; }
        .fc-convert-btn-accent { color: #fbbf24; margin-right: 2px; }

        .fc-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 12px;
          color: #dc2626;
          margin-bottom: 12px;
        }

        /* ── RIGHT PANEL ── */
        .fc-right {
          background: #f7f6f3;
          display: flex;
          flex-direction: column;
        }

        .fc-right-header {
          padding: 28px 32px 0;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }
        .fc-right-title {
          font-family: 'Instrument Serif', serif;
          font-size: 28px;
          color: #1a1a1a;
          line-height: 1.1;
          letter-spacing: -0.5px;
        }
        .fc-right-title em { color: #d97706; font-style: italic; }
        .fc-right-subtitle { font-size: 13px; color: #a8a29e; margin-top: 6px; font-weight: 400; }

        /* Drop zone */
        .fc-dropzone-wrap {
          padding: 24px 32px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .fc-dropzone {
          border: 2px dashed #d6d3cd;
          border-radius: 16px;
          background: #fff;
          padding: 56px 32px;
          text-align: center;
          cursor: pointer;
          transition: all .2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 260px;
        }
        .fc-dropzone:hover, .fc-dropzone.over {
          border-color: #d97706;
          background: #fffdf7;
        }
        .fc-dropzone-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: #f5f4f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 4px;
          transition: background .2s;
        }
        .fc-dropzone:hover .fc-dropzone-icon-wrap, .fc-dropzone.over .fc-dropzone-icon-wrap { background: #fef3c7; }
        .fc-dropzone-title { font-size: 15px; font-weight: 500; color: #1a1a1a; }
        .fc-dropzone-sub { font-size: 12px; color: #a8a29e; }
        .fc-dropzone-sub span { color: #d97706; text-decoration: underline; text-underline-offset: 2px; }
        .fc-dropzone-formats {
          display: flex;
          gap: 6px;
          margin-top: 4px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .fc-format-tag {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 4px;
          background: #f5f4f0;
          color: #78716c;
          border: 1px solid #e8e5df;
        }

        /* Thumbnails */
        .fc-previews {
          margin-top: 20px;
        }
        .fc-previews-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .fc-previews-count {
          font-size: 12px;
          font-weight: 500;
          color: #78716c;
        }
        .fc-clear-link {
          background: none;
          border: none;
          font-size: 12px;
          color: #a8a29e;
          cursor: pointer;
          font-family: 'Geist', sans-serif;
          transition: color .15s;
        }
        .fc-clear-link:hover { color: #ef4444; }
        .fc-thumb-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 8px;
        }
        .fc-thumb {
          aspect-ratio: 1;
          border-radius: 10px;
          overflow: hidden;
          border: 1.5px solid #e8e5df;
          position: relative;
          cursor: pointer;
          transition: border-color .15s;
        }
        .fc-thumb:hover { border-color: #d97706; }
        .fc-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .fc-thumb-num {
          position: absolute;
          bottom: 4px;
          right: 4px;
          background: rgba(0,0,0,.55);
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          padding: 2px 5px;
          border-radius: 4px;
        }

        /* Output images */
        .fc-output-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 12px;
          margin-top: 20px;
        }
        .fc-output-card {
          border-radius: 12px;
          overflow: hidden;
          border: 1.5px solid #e8e5df;
          cursor: pointer;
          position: relative;
          aspect-ratio: 3/4;
          background: #fff;
          transition: border-color .15s, transform .15s;
        }
        .fc-output-card:hover { border-color: #d97706; transform: translateY(-2px); }
        .fc-output-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .fc-output-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,.52);
          opacity: 0;
          transition: opacity .2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #fff;
          gap: 4px;
        }
        .fc-output-card:hover .fc-output-overlay { opacity: 1; }
        .fc-output-overlay-icon { font-size: 20px; }
        .fc-output-overlay-label { font-size: 11px; font-weight: 500; }
        .fc-page-badge {
          position: absolute;
          top: 6px;
          left: 6px;
          background: rgba(217,119,6,.85);
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 999px;
          letter-spacing: .04em;
        }

        /* Done state */
        .fc-done {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 48px 32px;
          text-align: center;
          flex: 1;
        }
        .fc-done-check {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #d1fae5;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fc-done-check svg { width: 26px; height: 26px; stroke: #059669; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
        .fc-done-title { font-family: 'Instrument Serif', serif; font-size: 22px; color: #1a1a1a; }
        .fc-done-sub { font-size: 13px; color: #a8a29e; }
        .fc-done-reset {
          background: none;
          border: 1.5px solid #e8e5df;
          padding: 8px 20px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          color: #78716c;
          cursor: pointer;
          font-family: 'Geist', sans-serif;
          margin-top: 4px;
          transition: all .15s;
        }
        .fc-done-reset:hover { border-color: #d97706; color: #d97706; }

        /* Output header */
        .fc-output-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
        }
        .fc-dl-all-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1.5px solid #1a1a1a;
          background: #1a1a1a;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Geist', sans-serif;
          transition: all .15s;
        }
        .fc-dl-all-btn:hover { background: #2c2c2c; }

        .fc-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: fcspin .7s linear infinite;
        }
        @keyframes fcspin { to { transform: rotate(360deg); } }

        .fc-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 40px;
          text-align: center;
          color: #c4b5a0;
          gap: 8px;
        }
        .fc-empty-icon { font-size: 36px; opacity: .4; }
        .fc-empty-text { font-size: 13px; }

        /* Responsive */
        @media (max-width: 768px) {
          .fc-layout { grid-template-columns: 1fr; }
          .fc-left { border-right: none; border-bottom: 1px solid #e8e5df; }
          .fc-convert-btn { margin-top: 16px; }
        }
      `}</style>

      {/* NAV */}
      {/* <nav className="fc-nav">
        <span className="fc-nav-logo">
          file<span>.</span>craft
        </span>
        <span className="fc-nav-tag">Browser-only · Private</span>
      </nav> */}

      <div className="fc-layout">
        {/* ── LEFT PANEL ── */}
        <aside className="fc-left">
          <p className="fc-section-label">Conversion Mode</p>

          <div className="fc-mode-group">
            {[
              { id: MODES.IMG_TO_PDF, icon: "🖼", title: "Images → PDF", sub: "Combine JPG, PNG, WebP" },
              { id: MODES.PDF_TO_IMG, icon: "📄", title: "PDF → Images", sub: "Extract pages as JPEG" },
            ].map((m) => (
              <button
                key={m.id}
                className={`fc-mode-btn${mode === m.id ? " active" : ""}`}
                onClick={() => handleModeSwitch(m.id)}
              >
                <div className="fc-mode-icon">{m.icon}</div>
                <div>
                  <div className="fc-mode-text-title">{m.title}</div>
                  <div className="fc-mode-text-sub">{m.sub}</div>
                </div>
                <div className="fc-mode-check">
                  <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" /></svg>
                </div>
              </button>
            ))}
          </div>

          <div className="fc-divider" />

          <p className="fc-section-label">Settings</p>
          <div className="fc-settings-group">
            {isImg2Pdf ? (
              <div className="fc-setting-item">
                <div className="fc-setting-row">
                  <span className="fc-setting-name">Output Quality</span>
                  <span className="fc-setting-val">{quality}%</span>
                </div>
                <input
                  type="range"
                  className="fc-slider"
                  min={50}
                  max={100}
                  step={1}
                  value={quality}
                  onChange={(e) => setQuality(+e.target.value)}
                />
              </div>
            ) : (
              <div className="fc-setting-item">
                <div className="fc-setting-row">
                  <span className="fc-setting-name">Resolution Scale</span>
                  <span className="fc-setting-val">{scale}×</span>
                </div>
                <div className="fc-res-group">
                  {[1, 1.5, 2, 3].map((s) => (
                    <button
                      key={s}
                      className={`fc-res-btn${scale === s ? " active" : ""}`}
                      onClick={() => setScale(s)}
                    >
                      {s}×
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* File chip for PDF */}
          {!isImg2Pdf && files.length > 0 && (
            <div className="fc-file-chip">
              <span className="fc-file-chip-icon">📄</span>
              <div className="fc-file-chip-info">
                <div className="fc-file-chip-name">{files[0].name}</div>
                <div className="fc-file-chip-size">{(files[0].size / 1024).toFixed(1)} KB</div>
              </div>
              <button className="fc-chip-clear" onClick={reset}>✕</button>
            </div>
          )}

          {status === "error" && (
            <div className="fc-error">⚠ {errorMsg}</div>
          )}

          <button
            className="fc-convert-btn"
            onClick={handleConvert}
            disabled={!files.length || status === "loading"}
          >
            {status === "loading" ? (
              <>
                <div className="fc-spinner" />
                Converting…
              </>
            ) : (
              <>
                <span className="fc-convert-btn-accent">⚡</span>
                {isImg2Pdf ? "Convert to PDF" : "Convert to Images"}
              </>
            )}
          </button>
        </aside>

        {/* ── RIGHT PANEL ── */}
        <main className="fc-right">
          <div className="fc-right-header">
            <div>
              <div className="fc-right-title">
                {isImg2Pdf ? (
                  <>Drop your <em>images</em></>
                ) : (
                  <>Drop your <em>PDF</em></>
                )}
              </div>
              <div className="fc-right-subtitle">
                {isImg2Pdf
                  ? "Add one or multiple images. Drag to reorder."
                  : "One PDF at a time. Each page becomes an image."}
              </div>
            </div>
          </div>

          <div className="fc-dropzone-wrap">
            {/* Drop zone */}
            <div
              className={`fc-dropzone${dragOver ? " over" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={isImg2Pdf}
                style={{ display: "none" }}
                onChange={onFileChange}
              />
              <div className="fc-dropzone-icon-wrap">
                {isImg2Pdf ? "🖼" : "📄"}
              </div>
              <div className="fc-dropzone-title">
                Drag & drop {isImg2Pdf ? "images" : "a PDF"} here
              </div>
              <div className="fc-dropzone-sub">
                or <span>click to browse</span>
              </div>
              <div className="fc-dropzone-formats">
                {isImg2Pdf ? (
                  ["JPG", "PNG", "WebP"].map((f) => (
                    <span key={f} className="fc-format-tag">{f}</span>
                  ))
                ) : (
                  <span className="fc-format-tag">PDF</span>
                )}
              </div>
            </div>

            {/* Image previews */}
            {isImg2Pdf && previews.length > 0 && (
              <div className="fc-previews">
                <div className="fc-previews-header">
                  <span className="fc-previews-count">{previews.length} image{previews.length !== 1 ? "s" : ""} ready</span>
                  <button className="fc-clear-link" onClick={reset}>Clear all</button>
                </div>
                <div className="fc-thumb-grid">
                  {previews.map((url, i) => (
                    <div key={i} className="fc-thumb">
                      <img src={url} alt="" />
                      <span className="fc-thumb-num">{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Done: img→pdf */}
            {status === "done" && isImg2Pdf && (
              <div className="fc-done">
                <div className="fc-done-check">
                  <svg viewBox="0 0 24 24"><polyline points="4,12 9,17 20,7" /></svg>
                </div>
                <div className="fc-done-title">PDF Ready!</div>
                <div className="fc-done-sub">Your file has been downloaded.</div>
                <button className="fc-done-reset" onClick={reset}>Convert more files</button>
              </div>
            )}

            {/* Output: pdf→img */}
            {outputImages.length > 0 && (
              <>
                <div className="fc-output-actions">
                  <span className="fc-previews-count">{outputImages.length} page{outputImages.length !== 1 ? "s" : ""} extracted</span>
                  <button className="fc-dl-all-btn" onClick={downloadAll}>
                    ↓ Download All
                  </button>
                </div>
                <div className="fc-output-grid">
                  {outputImages.map((img) => (
                    <div
                      key={img.pageNum}
                      className="fc-output-card"
                      onClick={() => downloadImage(img.dataUrl, img.pageNum)}
                    >
                      <img src={img.dataUrl} alt={`Page ${img.pageNum}`} />
                      <div className="fc-output-overlay">
                        <span className="fc-output-overlay-icon">↓</span>
                        <span className="fc-output-overlay-label">Download</span>
                      </div>
                      <span className="fc-page-badge">P{img.pageNum}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, textAlign: "center" }}>
                  <button className="fc-done-reset" onClick={reset}>Convert another file</button>
                </div>
              </>
            )}

            {/* Empty state when no files and not done */}
            {!previews.length && !outputImages.length && status !== "done" && (
              <div className="fc-empty-state">
                <div className="fc-empty-icon">
                  {isImg2Pdf ? "🖼" : "📄"}
                </div>
                <div className="fc-empty-text">
                  {isImg2Pdf
                    ? "Your image previews will appear here"
                    : "Extracted pages will appear here"}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}