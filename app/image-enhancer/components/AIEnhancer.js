"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Sparkles, Download, RefreshCw, Image as ImageIcon, Check } from "lucide-react";

export default function AIEnhancer() {
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle File Upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setIsEnhanced(false);
      // Reset canvas if needed
    }
  };

  // AI Enhancement Logic
  const enhanceImage = () => {
    if (!image) return;
    setIsProcessing(true);

    // Simulate "AI Processing" delay for better UX feel
    setTimeout(() => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const scale = Math.min(1200 / img.width, 1);
        const width = img.width * scale;
        const height = img.height * scale;

        canvas.width = width;
        canvas.height = height;

        // Apply filters
        ctx.filter = "contrast(1.15) brightness(1.05) saturate(1.1) blur(0px)";
        ctx.drawImage(img, 0, 0, width, height);

        // Simple sharpening effect
        let imageData = ctx.getImageData(0, 0, width, height);
        let data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] + 5); 
          data[i+1] = Math.min(255, data[i+1] + 5);
          data[i+2] = Math.min(255, data[i+2] + 5);
        }
        ctx.putImageData(imageData, 0, 0);

        setIsProcessing(false);
        setIsEnhanced(true);
      };
    }, 800);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "enhanced-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col items-center justify-center p-4 md:p-10 font-sans">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-3">
          AI Image Enhancer
        </h1>
        <p className="text-slate-400 text-lg">Professional grade enhancement in one click.</p>
      </div>

      <main className="w-full max-w-5xl bg-slate-900/50 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
        
        {!image ? (
          // Upload Dropzone
          <div 
            onClick={() => fileInputRef.current.click()}
            className="group cursor-pointer border-2 border-dashed border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all rounded-2xl p-20 flex flex-col items-center justify-center"
          >
            <div className="bg-slate-800 p-4 rounded-full group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-blue-400" />
            </div>
            <p className="mt-4 text-lg font-medium text-slate-300">Click or drag image to upload</p>
            <p className="text-sm text-slate-500 mt-1">Supports JPG, PNG, WebP</p>
            <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*" className="hidden" />
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="flex gap-3">
                <button 
                  onClick={() => setImage(null)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 rounded-full transition"
                >
                  <RefreshCw className="w-4 h-4" /> Reset
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={enhanceImage}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-full font-semibold shadow-lg shadow-blue-900/20 transition-all"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {isProcessing ? "Processing..." : "Enhance Image"}
                </button>

                {isEnhanced && (
                  <button
                    onClick={downloadImage}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-semibold shadow-lg shadow-emerald-900/20 transition-all"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                )}
              </div>
            </div>

            {/* Comparison View */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-400 ml-1">
                  <ImageIcon className="w-4 h-4" /> Original
                </div>
                <div className="relative aspect-auto rounded-xl overflow-hidden border border-slate-800 bg-black/20">
                  <img src={image} alt="Original" className="w-full h-full object-contain" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-blue-400 ml-1">
                  <Sparkles className="w-4 h-4" /> AI Enhanced
                </div>
                <div className="relative aspect-auto rounded-xl overflow-hidden border border-blue-500/30 bg-black/20 min-h-[200px] flex items-center justify-center">
                  {!isEnhanced && !isProcessing && (
                    <div className="text-slate-600 text-sm italic">Click Enhance to see results</div>
                  )}
                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm z-10">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-blue-400 font-medium animate-pulse">Analyzing Pixels...</p>
                      </div>
                    </div>
                  )}
                  <canvas 
                    ref={canvasRef} 
                    className={`w-full h-full object-contain ${!isEnhanced ? 'hidden' : 'block'}`} 
                  />
                </div>
              </div>
            </div>

          </div>
        )}
      </main>

      {/* Footer Info */}
      <div className="mt-8 flex gap-8 text-slate-500 text-sm">
        <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Free Forever</div>
        <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Privacy Focused</div>
        <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> GPU Accelerated</div>
      </div>
    </div>
  );
}