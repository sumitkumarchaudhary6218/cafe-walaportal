"use client";
import React, { useState, useRef } from "react";

export default function ExactKBResizer() {
  const [file, setFile] = useState(null);
  const [targetKB, setTargetKB] = useState(50);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileRef = useRef(null);

  const handleResize = async () => {
    if (!file) return alert("Pehle image select karein!");
    setLoading(true);
    setResult(null);

    const targetBytes = parseInt(targetKB) * 1024;
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      let quality = 0.9;
      let blob = await new Promise(res => canvas.toBlob(res, "image/jpeg", quality));

      if (blob.size > targetBytes) {
        let low = 0, high = 1;
        for (let i = 0; i < 10; i++) {
          quality = (low + high) / 2;
          blob = await new Promise(res => canvas.toBlob(res, "image/jpeg", quality));
          if (blob.size > targetBytes) high = quality;
          else low = quality;
        }
      }

      let finalBlob = blob;
      if (blob.size < targetBytes) {
        const extraBytesNeeded = targetBytes - blob.size;
        const padding = new Uint8Array(extraBytesNeeded);
        finalBlob = new Blob([blob, padding], { type: "image/jpeg" });
      }

      setResult({
        url: URL.createObjectURL(finalBlob),
        size: (finalBlob.size / 1024).toFixed(2),
      });
      setLoading(false);
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="bg-white shadow-[0_30px_100px_rgba(0,0,0,0.12)]  w-full max-w-lg border border-slate-100 overflow-hidden">

        {/* Header */}
        <div className="bg-indigo-600 px-6 py-6 sm:p-8 text-center text-white">
          <h1 className="text-xl sm:text-2xl font-black tracking-tighter uppercase">Exact KB Matcher</h1>
          <p className="text-indigo-200 text-[10px] font-bold mt-1 tracking-widest">NO LIMIT TECHNOLOGY</p>
        </div>

        <div className="p-5 sm:p-8 md:p-10">
          {/* Upload Area */}
          <div
            onClick={() => fileRef.current.click()}
            className={`border-2 border-dashed rounded-[1.5rem] sm:rounded-[2rem] p-7 sm:p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 mb-6 sm:mb-8 
              ${file ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 bg-slate-50 hover:border-indigo-400'}`}
          >
            <input type="file" ref={fileRef} onChange={(e) => setFile(e.target.files[0])} accept="image/*" className="hidden" />

            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-sm transition-transform active:scale-90
              ${file ? 'bg-indigo-600 text-white' : 'bg-white text-slate-300'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            <span className="text-slate-700 font-bold text-xs sm:text-sm truncate max-w-full px-4 text-center">
              {file ? file.name : "Select Image to Resize"}
            </span>
          </div>

          {/* Size Control */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">
                Force Size To (KB)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={targetKB}
                  onChange={(e) => setTargetKB(e.target.value)}
                  className="w-full bg-slate-100 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl p-4 sm:p-5 outline-none font-black text-slate-800 text-xl sm:text-2xl transition-all"
                />
                <div className="absolute right-5 sm:right-6 top-1/2 -translate-y-1/2 text-black font-bold text-sm sm:text-base">
                  KB
                </div>
              </div>
            </div>

            <button
              onClick={handleResize}
              disabled={loading || !file}
              className="w-full bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black py-4 sm:py-5 rounded-2xl shadow-xl transition-all active:scale-[0.97] uppercase tracking-widest text-xs"
            >
              {loading ? "Matching Exact Size..." : "Reduce / Force Resize"}
            </button>
          </div>

          {/* Result Card */}
          {result && (
            <div className="mt-6 sm:mt-8 bg-emerald-50 border-2 border-emerald-100 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black text-emerald-800 uppercase tracking-tighter">Perfect Match</p>
                <h2 className="text-3xl sm:text-4xl font-black text-emerald-600">
                  {result.size} <span className="text-base sm:text-lg">KB</span>
                </h2>
              </div>
              <a
                href={result.url}
                download={`fixed_${targetKB}kb_${file.name}`}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 sm:p-4 rounded-2xl shadow-lg transition-transform active:scale-90 flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] italic">Guaranteed Exact Size Output</p>
        </div>
      </div>
    </div>
  );
}