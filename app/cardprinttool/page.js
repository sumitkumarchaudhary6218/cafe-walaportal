"use client";
import React, { useState } from 'react';
import {
    Plus, Trash2, Edit3, Printer, FileText,
    RotateCcw, Layout, Image as ImageIcon
} from 'lucide-react';
import EditCardModal from './components/EditCardModal';
import jsPDF from "jspdf";

const IDCardPrintTool = () => {
    const [cards, setCards] = useState([
        { id: 1, type: 'Aadhaar Card', front: null, back: null }
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCard, setActiveCard] = useState(null);

    const addNewCard = () => {
        if (cards.length < 5) {
            setCards([...cards, { id: Date.now(), type: 'Aadhaar Card', front: null, back: null }]);
        }
    };

    const removeCard = (id) => {
        setCards(cards.filter(c => c.id !== id));
    };

    const resetAll = () => {
        if (window.confirm("Are you sure you want to remove all cards?")) {
            setCards([]);
        }
    };

    const openEditModal = (card) => {
        setActiveCard(card);
        setIsModalOpen(true);
    };

    const handleSaveCard = (updatedCard) => {
        setCards(cards.map(c => c.id === updatedCard.id ? updatedCard : c));
        setIsModalOpen(false);
    };

    const handlePrint = () => {
        window.print();
    };

    // FIXED PDF FUNCTION USING DOM-TO-IMAGE-MORE
    const handleDownloadPDF = async () => {
        const element = document.getElementById('print-area');
        if (!element) return;

        try {
            const domtoimage = (await import('dom-to-image-more')).default;
            const { jsPDF } = await import('jspdf');

            // ✅ 1. Clone element
            const clone = element.cloneNode(true);

            // ✅ 2. Remove all borders / shadows from ALL elements
            const all = clone.querySelectorAll("*");
            all.forEach((node) => {
                node.style.border = "none";
                node.style.outline = "none";
                node.style.boxShadow = "none";
            });

            // ✅ 3. Remove unwanted classes (Tailwind / MUI)
            clone.classList.remove("border", "border-gray-300");

            // ✅ 4. Fix layout + scaling
            clone.style.transform = "scale(2)";
            clone.style.transformOrigin = "top left";
            clone.style.width = element.offsetWidth + "px";
            clone.style.height = element.offsetHeight + "px";
            clone.style.overflow = "hidden";
            clone.style.background = "#fff";

            // ✅ 5. Invisible mount (important)
            clone.style.position = "fixed";
            clone.style.top = "-9999px";
            document.body.appendChild(clone);

            // ✅ 6. Generate image
            const dataUrl = await domtoimage.toPng(clone, {
                width: element.offsetWidth * 2,
                height: element.offsetHeight * 2,
                bgcolor: "#ffffff",

                filter: (node) => {
                    if (node.classList && node.classList.contains('no-pdf')) {
                        return false;
                    }
                    return true;
                }
            });

            // ✅ 7. Remove clone
            document.body.removeChild(clone);

            // ✅ 8. Create PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297);
            pdf.save(`ID_Cards_${Date.now()}.pdf`);

        } catch (error) {
            console.error("PDF generation failed:", error);
        }
    };

    return (
        <>
            {/* CSS for Exact A4 Printing */}
            <style jsx global>{`
                @media print {
                    * {
                        box-shadow: none !important;
                        -webkit-print-color-adjust: exact;
                    }
                    body {
                        background: white !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        overflow: hidden !important;
                    }
                    body * {
                        visibility: hidden;
                    }
                    #print-area, #print-area * {
                        visibility: visible;
                    }
                    #print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 210mm !important;
                        height: 297mm !important;
                        padding: 10mm !important;
                        margin: 0 !important;
                        background: white !important;
                        border: none !important;
                    }
                    .print-card-container {
                        display: flex !important;
                        flex-direction: row !important;
                        justify-content: center !important;
                        gap: 9mm !important;
                        margin-bottom: 5mm !important;
                        page-break-inside: avoid;
                    }
                    .print-image-slot {
                        width: 98mm !important;
                        height: 62mm !important;
                       
                        box-sizing: border-box !important;
                        background: white !important;
                         border-radius: 9px !important;
                    }
                    @page {
                        size: A4;
                        margin: 0;
                    }
                }
            `}</style>

            <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-700">
                {/* Top Badge */}
                <div className="flex justify-center mb-4 print:hidden">
                    <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm">
                        Smart CSC Tools
                    </span>
                </div>

                {/* Header Section */}
                <header className="text-center mb-8 print:hidden">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="bg-blue-600 p-1 rounded shadow-lg">
                            <Layout className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">
                            Multiple ID Cards Print Tool
                        </h1>
                    </div>
                    <p className="text-xs text-slate-500 max-w-2xl mx-auto">
                        Standard Size: 95mm x 62mm
                    </p>
                </header>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* LEFT COLUMN: Controls */}
                    <div className="lg:col-span-5 space-y-6 print:hidden">
                        <button
                            onClick={addNewCard}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md"
                        >
                            <Plus size={18} strokeWidth={3} /> Add New ID Card
                        </button>

                        <section className="bg-white rounded-xl shadow-sm   overflow-hidden">
                            <div className="p-4 border-b border-slate-100 flex items-center gap-2">
                                <Layout size={16} className="text-blue-500" />
                                <h2 className="font-bold text-sm">Your Cards ({cards.length}/5)</h2>
                            </div>

                            <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
                                {cards.map((card, index) => (
                                    <div key={card.id} className="border border-slate-100 rounded-lg p-3 bg-slate-50/50">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-xs uppercase">Card {index + 1}</span>
                                            <button onClick={() => removeCard(card.id)} className="text-red-500 p-1 hover:bg-red-50 rounded">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            <div className="aspect-[1.6/1] border-2 border-dashed border-slate-200 rounded flex items-center justify-center bg-white overflow-hidden">
                                                {card.front ? <img src={card.front} className="w-full h-full object-cover" /> : <ImageIcon size={16} className="text-slate-300" />}
                                            </div>
                                            <div className="aspect-[1.6/1] border-2 border-dashed border-slate-200 rounded flex items-center justify-center bg-white overflow-hidden">
                                                {card.back ? <img src={card.back} className="w-full h-full object-cover" /> : <ImageIcon size={16} className="text-slate-300" />}
                                            </div>
                                        </div>
                                        <button onClick={() => openEditModal(card)} className="w-full bg-blue-500 text-white text-xs py-1.5 rounded flex items-center justify-center gap-1 font-semibold">
                                            <Edit3 size={12} /> Edit / Upload Images
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={handlePrint} className="bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-sm shadow-sm transition-colors">
                                <Printer size={16} /> Print Now
                            </button>
                            <button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-sm shadow-sm">
                                <FileText size={16} /> Download PDF
                            </button>
                        </div>

                        <button onClick={resetAll} className="w-full bg-slate-500 hover:bg-slate-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-sm">
                            <RotateCcw size={16} /> Reset All
                        </button>
                    </div>

                    {/* RIGHT COLUMN: Preview & PRINT AREA */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center print:hidden">
                                <div className="flex items-center gap-2">
                                    <Layout size={16} className="text-purple-500" />
                                    <h2 className="font-bold text-sm text-slate-800">Live Print Preview</h2>
                                </div>
                                <span className="text-[10px] font-mono text-slate-400 uppercase">A4 Page Layout</span>
                            </div>

                            <div className="flex-1 p-5 bg-slate-100/50 flex items-start justify-center overflow-auto scrollbar-hide">
                                <div
                                    id="print-area"
                                    className="bg-white shadow-2xl border border-dashed border-slate-400 origin-top overflow-hidden"
                                    style={{ width: '210mm', minHeight: '297mm', padding: '10mm' }}
                                >
                                    <div className="flex flex-col items-center">
                                        {cards.map((card) => (
                                            <div
                                                key={card.id}
                                                className="print-card-container flex flex-row gap-[5mm] mb-[5mm]"
                                            >
                                                <div className="print-image-slot bg-white border border-slate-300 flex items-center justify-center overflow-hidden">
                                                    {card.front ? (
                                                        <img src={card.front} className="w-full h-full object-fill" alt="Front" />
                                                    ) : (
                                                        <span className="text-[10px] text-slate-300 font-bold uppercase">Front Side</span>
                                                    )}
                                                </div>

                                                <div className="print-image-slot bg-white border border-slate-300 flex items-center justify-center overflow-hidden">
                                                    {card.back ? (
                                                        <img src={card.back} className="w-full h-full object-fill" alt="Back" />
                                                    ) : (
                                                        <span className="text-[10px] text-slate-300 font-bold uppercase">Back Side</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EditCardModal
                isOpen={isModalOpen}
                cardData={activeCard}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveCard}
            />
        </>
    );
};

export default IDCardPrintTool;