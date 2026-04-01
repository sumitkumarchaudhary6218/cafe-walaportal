"use client";

import { useState, useRef, useCallback } from "react";
import { removeBackground } from "@imgly/background-removal";

const PRESET_COLORS = [
    { label: "Transparent", value: "transparent" },
    { label: "White", value: "#ffffff" },
    { label: "Black", value: "#000000" },
    { label: "Purple", value: "#5B21B6" },
    { label: "Pink", value: "#FBBCBC" },
    { label: "Yellow", value: "#FDE047" },
    { label: "Blue", value: "#3B82F6" },
];

export default function BgRemover() {
    const [originalImage, setOriginalImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [view, setView] = useState("after");
    const [bgColor, setBgColor] = useState("transparent");
    const [customColor, setCustomColor] = useState("#ffffff");
    const [isDragging, setIsDragging] = useState(false);
    
    const fileInputRef = useRef(null);

    const processImage = useCallback(async (file) => {
        if (!file.type.startsWith("image/")) return;
        const url = URL.createObjectURL(file);
        setOriginalImage(url);
        setProcessedImage(null);
        setIsProcessing(true);
        setProgress(0);
        setView("after");

        try {
            const blob = await removeBackground(url, {
                progress: (key, current, total) => {
                    setProgress(Math.round((current / total) * 100));
                },
            });
            const resultUrl = URL.createObjectURL(blob);
            setProcessedImage(resultUrl);
        } catch (err) {
            console.error(err);
            alert("Processing failed.");
        } finally {
            setIsProcessing(false);
        }
    }, []);

    const handleDownload = () => {
        if (!processedImage) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            if (bgColor !== "transparent") {
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const link = document.createElement("a");
            link.download = `photo-${Date.now()}.png`;
            link.href = canvas.toDataURL("image/png", 1.0);
            link.click();
        };
        img.src = processedImage;
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">ORIGINAL RESOLUTION REMOVER</h1>
                    <p className="text-slate-500 mt-2 font-medium">No Compression • No Quality Loss</p>
                </div>

                {!originalImage ? (
                    /* Upload Section */
                    <div
                        className={`border-4 border-dashed rounded-3xl p-12 transition-all flex flex-col items-center bg-white cursor-pointer
                        ${isDragging ? "border-indigo-500 bg-indigo-50" : "border-slate-300 hover:border-slate-400"}`}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if(f) processImage(f); }}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </div>
                        <span className="text-lg font-bold text-slate-700">Drop image here or Click</span>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files[0]; if(f) processImage(f); }} />
                    </div>
                ) : (
                    /* Editor Section */
                    <div className="space-y-6">
                        
                        {/* Control Panel */}
                        <div className="bg-white p-5 rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-6 border border-slate-200">
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-slate-600 text-sm">BACKGROUND:</span>
                                <div className="flex flex-wrap gap-3">
                                    {PRESET_COLORS.map((c) => (
                                        <button
                                            key={c.value}
                                            onClick={() => setBgColor(c.value)}
                                            className={`w-9 h-9 rounded-full border-4 transition-all scale-100 hover:scale-110 active:scale-95
                                            ${bgColor === c.value ? "border-indigo-600 shadow-md ring-2 ring-indigo-200" : "border-slate-200"}`}
                                            style={{ 
                                                backgroundColor: c.value === 'transparent' ? '#fff' : c.value,
                                                backgroundImage: c.value === 'transparent' ? 'repeating-conic-gradient(#cbd5e1 0% 25%, #fff 0% 50%)' : 'none',
                                                backgroundSize: '10px 10px'
                                            }}
                                        />
                                    ))}
                                    <input 
                                        type="color" 
                                        className="w-9 h-9 p-0 rounded-full border-2 border-slate-200 cursor-pointer overflow-hidden"
                                        onChange={(e) => { setBgColor(e.target.value); setCustomColor(e.target.value); }}
                                    />
                                </div>
                            </div>

                            <div className="flex bg-slate-100 rounded-xl p-1">
                                <button onClick={() => setView("before")} className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${view === 'before' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>Before</button>
                                <button onClick={() => setView("after")} className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${view === 'after' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>After</button>
                            </div>
                        </div>

                        {/* Main Preview Image with BORDER */}
                        <div 
                            className="relative rounded-[2rem] overflow-hidden flex items-center justify-center transition-all duration-500 shadow-2xl"
                            style={{ 
                                minHeight: 450,
                                // YEH HAI BORDER COLOR LOGIC
                                border: bgColor === 'transparent' ? '8px solid white' : `8px solid ${bgColor}`,
                                backgroundColor: (view === "after" && processedImage) ? (bgColor === "transparent" ? "transparent" : bgColor) : "#eee",
                                backgroundImage: (view === "after" && processedImage && bgColor === "transparent") ? "repeating-conic-gradient(#e2e8f0 0% 25%, #fff 0% 50%)" : "none",
                                backgroundSize: "30px 30px"
                            }}
                        >
                            {isProcessing && (
                                <div className="absolute inset-0 z-30 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center">
                                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="mt-4 font-black text-slate-700 tracking-widest">{progress}% REMOVING...</p>
                                </div>
                            )}

                            <button onClick={() => setOriginalImage(null)} className="absolute top-4 right-4 z-40 bg-white/90 p-2 rounded-full shadow-lg hover:bg-red-50 text-red-500">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            <img
                                src={view === "before" ? originalImage : (processedImage || originalImage)}
                                alt="Preview"
                                // filter: drop-shadow se transparent image naye background par asli dikhti hai
                                className={`max-w-full max-h-[70vh] object-contain relative z-10 transition-all
                                ${view === 'after' && processedImage ? 'drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]' : ''}`}
                            />
                        </div>

                        {/* Download Footer */}
                        <div className="flex gap-4">
                            <button 
                                onClick={handleDownload}
                                disabled={!processedImage}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-indigo-200 transition-all active:scale-95 disabled:bg-slate-300 flex items-center justify-center gap-3"
                            >
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                DOWNLOAD ORIGINAL HD
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}