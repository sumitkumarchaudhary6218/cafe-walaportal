"use client";
import React, { useState, useRef } from "react";

export default function ExactKBPDFResizer() {
    const [file, setFile] = useState(null);
    const [targetKB, setTargetKB] = useState(200);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const fileRef = useRef(null);

    const handleResize = async () => {
        if (!file) return alert("Pehle PDF select karein!");
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const targetBytes = parseInt(targetKB) * 1024;
            const fileBytes = file.size;

            const arrayBuffer = await file.arrayBuffer();
            const originalBytes = new Uint8Array(arrayBuffer);

            // If PDF is already smaller than target, pad it
            if (fileBytes <= targetBytes) {
                const paddingNeeded = targetBytes - fileBytes;

                // Build a valid PDF comment block for padding (safe padding inside PDF)
                const commentPrefix = new TextEncoder().encode("\n% PADDING: ");
                const commentSuffix = new TextEncoder().encode("\n");
                const paddingData = new Uint8Array(
                    paddingNeeded - commentPrefix.length - commentSuffix.length
                ).fill(0x20); // spaces

                let paddedBlob;
                if (paddingNeeded > commentPrefix.length + commentSuffix.length) {
                    paddedBlob = new Blob(
                        [originalBytes, commentPrefix, paddingData, commentSuffix],
                        { type: "application/pdf" }
                    );
                } else {
                    // Not enough room for comment, just raw pad
                    const rawPad = new Uint8Array(paddingNeeded).fill(0x20);
                    paddedBlob = new Blob([originalBytes, rawPad], {
                        type: "application/pdf",
                    });
                }

                setResult({
                    url: URL.createObjectURL(paddedBlob),
                    size: (paddedBlob.size / 1024).toFixed(2),
                    originalSize: (fileBytes / 1024).toFixed(2),
                    method: fileBytes < targetBytes ? "padded" : "exact",
                });
                setLoading(false);
                return;
            }

            // If PDF is larger than target — compress via canvas re-render of pages
            // We'll use PDF.js to render pages and repack as JPEG-based PDF
            // Load PDF.js from CDN dynamically
            if (!window.pdfjsLib) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement("script");
                    script.src =
                        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
                window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
            }

            const pdfDoc = await window.pdfjsLib.getDocument({ data: originalBytes })
                .promise;
            const numPages = pdfDoc.numPages;

            // Render all pages to canvas
            const pageCanvases = [];
            for (let i = 1; i <= numPages; i++) {
                const page = await pdfDoc.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement("canvas");
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const ctx = canvas.getContext("2d");
                await page.render({ canvasContext: ctx, viewport }).promise;
                pageCanvases.push({ canvas, width: viewport.width, height: viewport.height });
            }

            // Binary search for quality that hits target size
            // Build minimal PDF manually from JPEG images
            const buildPDF = async (quality) => {
                const jpegBlobs = await Promise.all(
                    pageCanvases.map(
                        ({ canvas }) =>
                            new Promise((res) => canvas.toBlob(res, "image/jpeg", quality))
                    )
                );

                const jpegArrayBuffers = await Promise.all(
                    jpegBlobs.map((b) => b.arrayBuffer())
                );

                // Build a minimal valid PDF with embedded JPEG images
                const pdfParts = [];
                const offsets = [];
                let offset = 0;

                const enc = (str) => new TextEncoder().encode(str);

                const header = enc("%PDF-1.4\n%\xe2\xe3\xcf\xd3\n");
                pdfParts.push(header);
                offset += header.length;

                const objectOffsets = [];

                // Page objects: 3 objects per page (image XObject, page dict, contents)
                // Object numbering:
                // 1: Catalog
                // 2: Pages
                // 3 + i*2: Page i
                // 3 + i*2 + 1: Image XObject for page i

                const totalPages = pageCanvases.length;

                // We'll collect objects in order
                const objects = [];

                // Obj 1: Catalog
                objects.push(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`);

                // Obj 2: Pages
                const pageRefs = pageCanvases
                    .map((_, i) => `${3 + i * 2} 0 R`)
                    .join(" ");
                objects.push(
                    `2 0 obj\n<< /Type /Pages /Kids [${pageRefs}] /Count ${totalPages} >>\nendobj\n`
                );

                // Pages and image objects
                for (let i = 0; i < totalPages; i++) {
                    const { width, height } = pageCanvases[i];
                    const jpegData = new Uint8Array(jpegArrayBuffers[i]);
                    const imgObjNum = 3 + i * 2 + 1;
                    const pageObjNum = 3 + i * 2;

                    // Page object
                    objects.push(
                        `${pageObjNum} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width.toFixed(2)} ${height.toFixed(2)}] /Contents ${pageObjNum + totalPages * 2} 0 R /Resources << /XObject << /Im${i} ${imgObjNum} 0 R >> >> >>\nendobj\n`
                    );

                    // Image XObject
                    const imgHeader = enc(
                        `${imgObjNum} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${Math.round(width)} /Height ${Math.round(height)} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegData.length} >>\nstream\n`
                    );
                    const imgFooter = enc(`\nendstream\nendobj\n`);
                    objects.push([imgHeader, jpegData, imgFooter]);
                }

                // Content streams for each page
                for (let i = 0; i < totalPages; i++) {
                    const { width, height } = pageCanvases[i];
                    const contentStr = `q ${width.toFixed(2)} 0 0 ${height.toFixed(2)} 0 0 cm /Im${i} Do Q`;
                    const contentObjNum = 3 + totalPages * 2 + i;
                    objects.push(
                        `${contentObjNum} 0 obj\n<< /Length ${contentStr.length} >>\nstream\n${contentStr}\nendstream\nendobj\n`
                    );
                }

                // Write all objects and record offsets
                const binaryParts = [];
                let byteOffset = header.length;
                const xrefOffsets = [];

                for (let objIdx = 0; objIdx < objects.length; objIdx++) {
                    xrefOffsets.push(byteOffset);
                    const obj = objects[objIdx];
                    if (Array.isArray(obj)) {
                        for (const part of obj) {
                            binaryParts.push(part);
                            byteOffset += part.length;
                        }
                    } else {
                        const encoded = enc(obj);
                        binaryParts.push(encoded);
                        byteOffset += encoded.length;
                    }
                }

                // xref table
                const xrefOffset = byteOffset;
                const numObjects = objects.length + 1;
                let xrefStr = `xref\n0 ${numObjects}\n0000000000 65535 f \n`;
                for (const off of xrefOffsets) {
                    xrefStr += `${String(off).padStart(10, "0")} 00000 n \n`;
                }
                xrefStr += `trailer\n<< /Size ${numObjects} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

                return new Blob([header, ...binaryParts, enc(xrefStr)], {
                    type: "application/pdf",
                });
            };

            // Binary search for quality
            let low = 0.05,
                high = 0.95,
                bestBlob = null;

            for (let i = 0; i < 12; i++) {
                const mid = (low + high) / 2;
                const blob = await buildPDF(mid);
                if (blob.size <= targetBytes) {
                    bestBlob = blob;
                    low = mid;
                } else {
                    high = mid;
                }
            }

            if (!bestBlob) {
                // Even at lowest quality, too big — use lowest
                bestBlob = await buildPDF(0.05);
            }

            // Pad if needed
            if (bestBlob.size < targetBytes) {
                const paddingNeeded = targetBytes - bestBlob.size;
                const pad = new Uint8Array(paddingNeeded).fill(0x20);
                bestBlob = new Blob([bestBlob, enc_pad(pad)], {
                    type: "application/pdf",
                });
            }

            function enc_pad(arr) {
                return arr;
            }

            setResult({
                url: URL.createObjectURL(bestBlob),
                size: (bestBlob.size / 1024).toFixed(2),
                originalSize: (fileBytes / 1024).toFixed(2),
                method: "compressed",
                pages: numPages,
            });
        } catch (err) {
            console.error(err);
            setError("Kuch error aaya: " + err.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50  flex items-center justify-center p-4 sm:p-6 font-sans">
            <div className={`max-w-[900px] bg-[#0d2de0]  mx-auto 
border-2 border-dashed rounded-2xl 
p-8 flex flex-col items-center justify-center 
cursor-pointer transition-all duration-300 scale-[1.02]

${file
                    ? "border-rose-500 bg-rose-50 shadow-md"
                    : "border-gray-300 bg-gray-50 hover:border-rose-400 hover:bg-rose-50/40"
                }`}>
                {/* Header */}
                <div className=" px-6 py-6 sm:p-8 text-center text-black">
                    <h1 className="text-xl sm:text-2xl font-black tracking-tighter uppercase">
                        PDF KB Matcher
                    </h1>
                    <p className="text-rose-200 text-[10px] font-bold mt-1 tracking-widest">
                        EXACT SIZE TECHNOLOGY
                    </p>
                </div>

                <div className="p-5 sm:p-8 md:p-10">
                    {/* Upload Area */}
                    <div
                        onClick={() => fileRef.current.click()}
                        className={`border-2 border-dashed rounded-[1.5rem] sm:rounded-[2rem] p-7 sm:p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 mb-6 sm:mb-8 
              ${file ? "border-rose-500 bg-rose-50/50" : "border-slate-200 bg-slate-50 hover:border-rose-400"}`}
                    >
                        <input
                            type="file"
                            ref={fileRef}
                            onChange={(e) => { setFile(e.target.files[0]); setResult(null); setError(null); }}
                            accept="application/pdf"
                            className="hidden"
                        />

                        <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-sm transition-transform active:scale-90
              ${file ? "bg-rose-600 text-white" : "bg-white text-slate-300"}`}
                        >
                            {/* PDF icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="9" y1="13" x2="15" y2="13" />
                                <line x1="9" y1="17" x2="15" y2="17" />
                                <line x1="9" y1="9" x2="11" y2="9" />
                            </svg>
                        </div>

                        <span className="text-slate-700 font-bold text-xs sm:text-sm truncate max-w-full px-4 text-center">
                            {file ? file.name : "Select PDF to Resize"}
                        </span>

                        {file && (
                            <span className="text-slate-400 text-[10px] font-semibold mt-1">
                                Original: {(file.size / 1024).toFixed(1)} KB
                            </span>
                        )}
                    </div>

                    {/* Size Control */}
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">
                                Force PDF Size To (KB)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={targetKB}
                                    onChange={(e) => setTargetKB(e.target.value)}
                                    className="w-full bg-slate-100 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-2xl p-4 sm:p-5 outline-none font-black text-slate-800 text-xl sm:text-2xl transition-all"
                                />
                                <div className="absolute right-5 sm:right-6 top-1/2 -translate-y-1/2 text-black font-bold text-sm sm:text-base">
                                    KB
                                </div>
                            </div>
                        </div>

                        {/* Info note */}
                        <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 text-[10px] text-amber-700 font-semibold leading-relaxed">
                            ⚡ <strong>Compress karna ho</strong> toh target size original se kam rakho. <strong>Pad karna ho</strong> toh target size original se zyada rakho.
                        </div>

                        <button
                            onClick={handleResize}
                            disabled={loading || !file}
                            className="w-full cursor-pointer bg-slate-900 hover:bg-rose-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black py-4 sm:py-5 rounded-2xl shadow-xl transition-all active:scale-[0.97] uppercase tracking-widest text-xs"
                        >
                            {loading ? (
                                <span className="flex cursor-pointer items-center justify-center gap-2">
                                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    </svg>
                                    Processing PDF...
                                </span>
                            ) : (
                                "Reduce / Force Resize PDF"
                            )}
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mt-5 bg-red-50 border-2 border-red-100 rounded-2xl p-4 text-red-600 text-xs font-bold">
                            ❌ {error}
                        </div>
                    )}

                    {/* Result Card */}
                    {result && (
                        <div className="mt-6 sm:mt-8 bg-emerald-50 border-2 border-emerald-100 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-black text-emerald-800 uppercase tracking-tighter">
                                    {result.method === "padded" ? "Padded to Target" : result.method === "exact" ? "Already Exact" : `Compressed (${result.pages} pages)`}
                                </p>
                                <h2 className="text-3xl sm:text-4xl font-black text-emerald-600">
                                    {result.size} <span className="text-base sm:text-lg">KB</span>
                                </h2>
                                <p className="text-[10px] text-emerald-700 mt-1 font-semibold">
                                    Was: {result.originalSize} KB → Now: {result.size} KB
                                </p>
                            </div>
                            <a
                                href={result.url}
                                download={`fixed_${targetKB}kb_${file?.name || "output.pdf"}`}
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
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] italic">
                        Guaranteed Exact Size PDF Output
                    </p>
                </div>
            </div>
        </div>
    );
}