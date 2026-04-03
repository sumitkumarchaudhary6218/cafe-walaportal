"use client";
import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";

// ✅ Official Size Specs
const SPECS = {
  UTI: {
    Photograph: { width: 213, height: 213, maxKB: 30, dpi: 300, format: "JPEG", label: "213×213 px", desc: "300 DPI · max 30 KB · JPEG" },
    Signature: { width: 400, height: 200, maxKB: 60, dpi: 600, format: "JPEG", label: "400×200 px", desc: "600 DPI · max 60 KB · JPEG · B&W" },
    Document: { width: null, height: null, maxKB: 2048, dpi: 200, format: "PDF", label: "PDF/A", desc: "200 DPI · max 2 MB · Color PDF" },
  },
  NSDL: {
    Photograph: { width: 197, height: 276, maxKB: 50, targetKB: 18.5, dpi: 200, format: "JPEG", label: "197×276 px", desc: "200 DPI · target 18.5 KB · JPEG" },
    Signature: { width: 354, height: 157, maxKB: 50, dpi: 200, format: "JPEG", label: "354×157 px", desc: "200 DPI · max 50 KB · JPEG" },
    Document: { width: null, height: null, maxKB: 2048, dpi: 200, format: "PDF", label: "PDF/A", desc: "200 DPI · max 2 MB · Color PDF" },
  },
};

const STEPS = ["1. Upload", "2. Requirement", "3. Editor"];
const TABS = ["PAN Card Editor", "Custom Editor"];

export default function PANCardEditor() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [image, setImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [website, setWebsite] = useState("NSDL");
  const [type, setType] = useState("Photograph");

  // Controls
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(50);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [offsetX, setOffsetX] = useState(0); // For Moving Left/Right
  const [offsetY, setOffsetY] = useState(0); // For Moving Up/Down

  const [activeControl, setActiveControl] = useState("zoom");
  const [fileSizeKB, setFileSizeKB] = useState(null);
  const [sizeOk, setSizeOk] = useState(null);

  // Dragging Logic State
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef(null);
  const spec = SPECS[website][type];

  // ✅ Canvas Logic (Burn movement, rotation, and zoom into final image)
  useEffect(() => {
    if (!image || !spec.width) { setResizedImage(image); setFileSizeKB(null); return; }
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = spec.width;
      canvas.height = spec.height;
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.filter = `contrast(${contrast}%) brightness(${brightness}%)`;

      // Move to center + user drag offset
      ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
      ctx.rotate((rotation * Math.PI) / 180);

      const scale = 0.5 + zoom / 100;
      ctx.drawImage(img, -canvas.width / 2 * scale, -canvas.height / 2 * scale, canvas.width * scale, canvas.height * scale);

      // JPEG Compression Loop
      let minQ = 0.01, maxQ = 0.99, finalDataUrl = "", finalKB = 0;
      const target = spec.targetKB || spec.maxKB * 0.8;
      for (let i = 0; i < 12; i++) {
        let midQ = (minQ + maxQ) / 2;
        let testDataUrl = canvas.toDataURL("image/jpeg", midQ);
        let testKB = (testDataUrl.split(",")[1].length * 3) / 4 / 1024;
        if (testKB < target) { minQ = midQ; finalDataUrl = testDataUrl; finalKB = testKB; }
        else { maxQ = midQ; }
      }
      setResizedImage(finalDataUrl || canvas.toDataURL("image/jpeg", 0.8));
      setFileSizeKB(finalKB.toFixed(1));
      setSizeOk(finalKB <= spec.maxKB);
    };
    img.src = image;
  }, [image, spec, rotation, zoom, contrast, brightness, offsetX, offsetY]);

  // ✅ Drag Event Handlers
  const startDrag = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - offsetX, y: clientY - offsetY });
  };
  const onDrag = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setOffsetX(clientX - dragStart.x);
    setOffsetY(clientY - dragStart.y);
  };
  const stopDrag = () => setIsDragging(false);

  const handleFile = (file) => { if (file) setImage(URL.createObjectURL(file)); };

  const sliderMap = {
    zoom: { value: zoom, set: setZoom, min: 0, max: 200, label: "Zoom" },
    rotation: { value: rotation, set: setRotation, min: -180, max: 180, label: "Rotate" },
    contrast: { value: contrast, set: setContrast, min: 50, max: 200, label: "Contrast" },
    brightness: { value: brightness, set: setBrightness, min: 50, max: 200, label: "Brightness" },
  };
  const sl = sliderMap[activeControl] ?? sliderMap.zoom;
  const percentage = ((sl.value - sl.min) / (sl.max - sl.min)) * 100;




  const downloadPDF = async () => {
    if (!resizedImage) return;

    const targetKB = 280; // 🎯 Target size

    const img = new Image();
    img.src = resizedImage;

    img.onload = async () => {
      let minQ = 0.1;
      let maxQ = 1.0;
      let finalBlob = null;

      for (let i = 0; i < 10; i++) {
        let midQ = (minQ + maxQ) / 2;

        // 🎯 Canvas compress
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL("image/jpeg", midQ);

        // 🎯 Create PDF
        const pdf = new jsPDF({
          unit: "px",
          format: "a4",
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const ratio = Math.min(
          pageWidth / img.width,
          pageHeight / img.height
        );

        const width = img.width * ratio;
        const height = img.height * ratio;

        pdf.addImage(
          dataUrl,
          "JPEG",
          (pageWidth - width) / 2,
          (pageHeight - height) / 2,
          width,
          height
        );

        const blob = pdf.output("blob");
        const sizeKB = blob.size / 1024;

        if (sizeKB > targetKB) {
          maxQ = midQ; // compress more
        } else {
          minQ = midQ;
          finalBlob = blob;
        }
      }

      // ✅ Download final PDF
      const url = URL.createObjectURL(finalBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document_280kb.pdf";
      a.click();
      URL.revokeObjectURL(url);
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Full UI Tabs */}
        <div className="grid grid-cols-2 border-b border-gray-200">
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)}
              className={`py-4 text-sm sm:text-base font-semibold transition-colors
                ${activeTab === i ? "bg-white text-gray-900 border-b-2 border-blue-500" : "bg-gray-100 text-gray-500"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Step Navigation */}
        <div className="flex flex-wrap gap-2 px-4 pt-5 pb-3">
          {STEPS.map((step, i) => (
            <button key={step} onClick={() => { if (i < activeStep || (i === 1 && image)) setActiveStep(i); }}
              className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-sm font-bold transition-colors
                ${activeStep === i ? "bg-red-500 text-white shadow" : i < activeStep ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-400 cursor-default"}`}>
              {step}
            </button>
          ))}
        </div>

        <div className="px-4 sm:px-6 pb-4 min-h-[400px]">
          {/* STEP 1: Upload */}
          {activeStep === 0 && (
            <div onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-72 sm:h-80 cursor-pointer border-blue-300 bg-blue-50/40 transition-colors">
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
              {image ? <img src={image} className="max-h-60 max-w-full object-contain rounded-lg shadow" /> : <p className="text-gray-500">Click to Select Photo</p>}
            </div>
          )}

          {/* STEP 2: Full UI Requirement logos */}
          {activeStep === 1 && (
            <div className="space-y-5 pt-1">
              <Section title="Application Website">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["UTI", "NSDL"].map((site) => (
                    <label key={site} className={`relative flex flex-col items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-colors ${website === site ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-blue-200"}`}>
                      <span className={`absolute top-0 left-0 text-xs font-bold px-3 py-1 rounded-tl-xl rounded-br-xl ${website === site ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}>{site}</span>
                      <div className="h-16 mt-2 flex items-center justify-center">
                        <img src={site === "UTI" ? "/img/utr.png" : "/img/nsdl.png"} alt={site} className="h-full object-contain" />
                      </div>
                      <input type="radio" checked={website === site} onChange={() => setWebsite(site)} className="accent-blue-500 w-5 h-5" />
                    </label>
                  ))}
                </div>
              </Section>

              <Section title="Type">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[{ label: "Photograph", icon: <PersonIcon /> }, { label: "Signature", icon: <SignIcon /> }, { label: "Document", icon: <DocIcon /> }].map(({ label, icon }) => (
                    <label key={label} className={`flex items-center sm:flex-col justify-between sm:justify-center gap-2 border-2 rounded-xl p-3 cursor-pointer ${type === label ? "border-blue-400 bg-blue-50" : "border-gray-200"}`}>
                      <div className="flex items-center gap-3 sm:flex-col">
                        <div className="hidden sm:block">{icon}</div>
                        <span className="text-xs font-bold">{label}</span>
                      </div>
                      <input type="radio" checked={type === label} onChange={() => setType(label)} className="accent-blue-500 w-5 h-5" />
                    </label>
                  ))}
                </div>
              </Section>

              <div className={`rounded-xl border-2 p-4 flex flex-col sm:flex-row justify-between items-center gap-3 ${website === "UTI" ? "border-blue-300 bg-blue-50" : "border-orange-300 bg-orange-50"}`}>
                <div className="text-center sm:text-left">
                  <p className="text-[10px] font-bold uppercase text-gray-500">{website} — {type}</p>
                  <p className="text-2xl font-black text-gray-800">{spec.label}</p>
                </div>
                <div className="text-xs bg-white rounded-lg p-3 border flex gap-4">
                  <Row k="DPI" v={spec.dpi} />
                  <Row k="Target" v={spec.targetKB || spec.maxKB} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Editor with Drag/Pan & Blue Slider */}
          {activeStep === 2 && (
            <div className="flex flex-col items-center gap-4 pt-1">
              <div className="w-full flex justify-between bg-gray-50 rounded-xl px-4 py-2 border text-[10px] sm:text-xs font-bold">
                <span className="text-gray-500 uppercase">{activeControl}: {sl.value}</span>
                <span className={sizeOk ? "text-green-600" : "text-red-600"}>{fileSizeKB} KB</span>
              </div>

              {/* ✅ INTERACTIVE DRAGGABLE PHOTO AREA */}
              <div
                className="w-full h-64 sm:h-80 bg-slate-200 rounded-xl overflow-hidden border flex items-center justify-center cursor-move touch-none relative"
                onMouseDown={startDrag} onMouseMove={onDrag} onMouseUp={stopDrag} onMouseLeave={stopDrag}
                onTouchStart={startDrag} onTouchMove={onDrag} onTouchEnd={stopDrag}
              >
                {resizedImage && <img src={resizedImage} className="max-h-full shadow-lg bg-white pointer-events-none select-none" />}
                <div className="absolute bottom-2 left-2 bg-black/30 text-white text-[8px] px-2 py-1 rounded">PRESS & DRAG TO POSITION PHOTO</div>
              </div>

              <div className="w-full space-y-4">
                <div className="flex gap-1 overflow-x-auto justify-center pb-1 no-scrollbar">
                  {Object.keys(sliderMap).map((m) => (
                    <button key={m} onClick={() => setActiveControl(m)}
                      className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-all ${activeControl === m ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-400"}`}>
                      {m}
                    </button>
                  ))}
                </div>

                <input type="range" min={sl.min} max={sl.max} value={sl.value} onChange={(e) => sl.set(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  style={{ background: `linear-gradient(to right, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%)` }} />

                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => { setActiveControl("rotation"); setRotation(r => r - 90); }} className="bg-gray-800 text-white py-2 rounded-lg text-xs font-bold">Rotate L</button>
                  <button onClick={() => { setOffsetX(0); setOffsetY(0); setZoom(50); setRotation(0); }} className="bg-red-100 text-red-600 py-2 rounded-lg text-xs font-bold uppercase">Reset</button>
                  <button onClick={() => { setActiveControl("rotation"); setRotation(r => r + 90); }} className="bg-gray-800 text-white py-2 rounded-lg text-xs font-bold">Rotate R</button>
                </div>

                <button
                  onClick={() => {
                    if (type === "Document") {
                      downloadPDF();
                    } else {
                      const a = document.createElement("a");
                      a.href = resizedImage;
                      a.download = `pan_${type}.jpg`;
                      a.click();
                    }
                  }}
                  className="w-full cursor-pointer bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform uppercase"

                >
                  Download Result
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between sm:justify-end gap-3 px-6 py-4 bg-gray-50 border-t">
          {activeStep > 0 && <button onClick={() => setActiveStep(s => s - 1)} className="px-5 py-2 bg-gray-200 rounded-lg text-sm font-semibold">Previous</button>}
          {activeStep < 2 && <button onClick={() => { if (image) setActiveStep(s => s + 1); }} className="px-8 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold ml-auto">Next</button>}
        </div>
      </div>
    </div>
  );
}

// UI Helpers
function Section({ title, children }) { return <div className="mb-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{title}</p>{children}</div>; }
function Row({ k, v }) { return <div className="flex flex-col items-center"><span>{k}</span><span className="font-bold text-gray-800">{v}</span></div>; }
const PersonIcon = () => <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z" /></svg>;
const SignIcon = () => <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M4 18c2-4 4-8 6-6s-2 6 0 6 4-4 6-4 3 2 4 2" /></svg>;
const DocIcon = () => <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM13 9V3.5L18.5 9H13z" /></svg>;