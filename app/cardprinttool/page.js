"use client";
import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Printer, FileText, RotateCcw, Layout, Image as ImageIcon } from 'lucide-react';
import jsPDF from "jspdf";
import EditCardModal from './components/EditCardModal';

const IDCardPrintTool = () => {
    const [cards, setCards] = useState([{ 
        id: 1, type: 'Aadhaar Card', front: null, back: null,
        frontFilters: { brightness: 100, contrast: 100 },
        backFilters: { brightness: 100, contrast: 100 }
    }]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCard, setActiveCard] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const addNewCard = () => {
        if (cards.length < 5) {
            setCards([...cards, { 
                id: Date.now(), type: 'Aadhaar Card', front: null, back: null,
                frontFilters: { brightness: 100, contrast: 100 },
                backFilters: { brightness: 100, contrast: 100 }
            }]);
        }
    };

    // --- PDF GENERATION WITH ROUNDED CORNERS ---
    const handleDownloadPDF = async () => {
        try {
            setIsGenerating(true);
            const pdf = new jsPDF("p", "mm", "a4");
            const cardW = 95, cardH = 60, mLeft = 7.5, mTop = 10, gap = 5;
            const radius = 3; // 3mm corner radius

            const getFilteredAndRounded = (base64, f) => new Promise(res => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width; canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    
                    // 1. Draw rounded rectangle path for clipping
                    const r = (radius * img.width) / cardW; // scale radius to image pixels
                    ctx.beginPath();
                    ctx.moveTo(r, 0);
                    ctx.lineTo(canvas.width - r, 0);
                    ctx.quadraticCurveTo(canvas.width, 0, canvas.width, r);
                    ctx.lineTo(canvas.width, canvas.height - r);
                    ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - r, canvas.height);
                    ctx.lineTo(r, canvas.height);
                    ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - r);
                    ctx.lineTo(0, r);
                    ctx.quadraticCurveTo(0, 0, r, 0);
                    ctx.closePath();
                    ctx.clip(); // Clip everything outside the rounded corners

                    // 2. Apply Filters
                    ctx.filter = `brightness(${f.brightness}%) contrast(${f.contrast}%)`;
                    
                    // 3. Draw Image
                    ctx.drawImage(img, 0, 0);
                    res(canvas.toDataURL("image/jpeg", 0.9));
                };
                img.src = base64;
            });

            for (let i = 0; i < cards.length; i++) {
                const c = cards[i];
                const y = mTop + (i * (cardH + gap));
                
                if (c.front) {
                    const img = await getFilteredAndRounded(c.front, c.frontFilters);
                    // Use roundedRect for the border in PDF
                    pdf.setDrawColor(180);
                    pdf.roundedRect(mLeft, y, cardW, cardH, radius, radius, 'D');
                    pdf.addImage(img, "JPEG", mLeft, y, cardW, cardH);
                }
                if (c.back) {
                    const img = await getFilteredAndRounded(c.back, c.backFilters);
                    const xBack = mLeft + cardW + gap;
                    pdf.setDrawColor(180);
                    pdf.roundedRect(xBack, y, cardW, cardH, radius, radius, 'D');
                    pdf.addImage(img, "JPEG", xBack, y, cardW, cardH);
                }
            }
            pdf.save("ID-Cards-Rounded.pdf");
        } catch (e) { 
            console.error(e);
            alert("PDF Error"); 
        } finally { 
            setIsGenerating(false); 
        }
    };

    const getFilterStyle = (f) => ({ filter: `brightness(${f?.brightness}%) contrast(${f?.contrast}%)` });

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
            {/* --- PRINT CSS WITH ROUNDED CORNERS --- */}
            <style jsx global>{`
                @media print {
                    body * { visibility: hidden; }
                    #print-area, #print-area * { visibility: visible; }
                    #print-area { position: absolute; left: 0; top: 0; width: 210mm; padding: 10mm; background: white; }
                    .print-card { display: flex; gap: 4mm; margin-bottom: 5mm; }
                    
                    /* ROUNDED CORNERS FOR PRINT */
                    .slot { 
                        width: 90mm; 
                        height: 58mm; 
                        border: 0.2mm solid #999 !important; 
                        border-radius: 3mm !important; 
                        overflow: hidden !important;
                        -webkit-print-color-adjust: exact;
                    }
                    @page { size: A4; margin: 0; }
                }
            `}</style>

            <header className="text-center mb-8 print:hidden">
                <h1 className="text-2xl font-extrabold text-blue-700 flex items-center justify-center gap-2">
                    <Layout className="bg-blue-600 text-white p-1 rounded" /> Smart ID Print Tool
                </h1>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* LEFT SIDE: CONTROLS */}
                <div className="lg:col-span-5 space-y-4 print:hidden">
                    <button onClick={addNewCard} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
                        + Add New ID Card
                    </button>

                    <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                        {cards.map((card, idx) => (
                            <div key={card.id} className="border rounded-xl p-3 bg-slate-50">
                                <div className="flex justify-between mb-2 items-center font-bold text-xs uppercase text-slate-500">
                                    <span>CARD {idx + 1}</span>
                                    <button onClick={() => setCards(cards.filter(c => c.id !== card.id))} className="text-red-500 hover:bg-red-50 p-1 rounded transition"><Trash2 size={14}/></button>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                    {/* THUMBNAILS WITH ROUNDED CORNERS */}
                                    <div className="aspect-[1.58/1] bg-white border rounded-lg overflow-hidden flex items-center justify-center">
                                        {card.front ? <img src={card.front} style={getFilterStyle(card.frontFilters)} className="w-full h-full object-cover" /> : <ImageIcon size={14} className="text-slate-300" />}
                                    </div>
                                    <div className="aspect-[1.58/1] bg-white border rounded-lg overflow-hidden flex items-center justify-center">
                                        {card.back ? <img src={card.back} style={getFilterStyle(card.backFilters)} className="w-full h-full object-cover" /> : <ImageIcon size={14} className="text-slate-300" />}
                                    </div>
                                </div>
                                <button onClick={() => { setActiveCard(card); setIsModalOpen(true); }} className="w-full bg-blue-500 text-white text-xs py-2 rounded-lg font-bold hover:bg-blue-600 transition">
                                    Edit Images & Adjust Filters
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => window.print()} className="bg-emerald-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition shadow-sm"><Printer size={18}/> Print</button>
                        <button onClick={handleDownloadPDF} disabled={isGenerating} className="bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-blue-800 transition disabled:bg-slate-400">
                            <FileText size={18}/> {isGenerating ? "Processing..." : "Download PDF"}
                        </button>
                    </div>
                    
                    <button onClick={() => setCards([])} className="w-full text-slate-400 text-xs font-bold hover:text-red-500 transition flex items-center justify-center gap-1">
                        <RotateCcw size={12} /> RESET WORKBOARD
                    </button>
                </div>

                {/* RIGHT SIDE: LIVE PREVIEW */}
                <div className="lg:col-span-7 flex justify-center bg-slate-200 p-4 rounded-2xl border-4 border-white shadow-inner">
                    <div id="print-area" className="bg-white shadow-2xl p-[10mm] origin-top" style={{ width: '210mm', minHeight: '297mm' }}>
                        {cards.map((card) => (
                            <div key={card.id} className="print-card flex gap-3 mb-6">
                                {/* FRONT SLOT WITH ROUNDED CORNERS */}
                                <div className="slot flex items-center justify-center overflow-hidden border border-slate-300 rounded-[3mm]">
                                    {card.front && (
                                        <div style={getFilterStyle(card.frontFilters)} className="w-full h-full">
                                            <img src={card.front} className="w-full h-full object-fill" />
                                        </div>
                                    )}
                                </div>
                                {/* BACK SLOT WITH ROUNDED CORNERS */}
                                <div className="slot flex items-center justify-center overflow-hidden border border-slate-300 rounded-[3mm]">
                                    {card.back && (
                                        <div style={getFilterStyle(card.backFilters)} className="w-full h-full">
                                            <img src={card.back} className="w-full h-full object-fill" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <EditCardModal
                isOpen={isModalOpen} 
                cardData={activeCard} 
                onClose={() => setIsModalOpen(false)} 
                onSave={(updated) => {
                    setCards(cards.map(c => c.id === updated.id ? updated : c));
                    setIsModalOpen(false);
                }} 
            />
        </div>
    );
};

export default IDCardPrintTool;