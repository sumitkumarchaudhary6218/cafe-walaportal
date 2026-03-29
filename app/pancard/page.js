"use client";
import { useState, useRef, useCallback, useEffect } from "react";

// ✅ Official Size Specs - NSDL strictly 197*276 & 18.5k
const SPECS = {
  UTI: {
    Photograph: { width: 213, height: 213, maxKB: 30,   dpi: 300, format: "JPEG", label: "213×213 px", desc: "300 DPI · max 30 KB · JPEG" },
    Signature:  { width: 400, height: 200, maxKB: 60,   dpi: 600, format: "JPEG", label: "400×200 px", desc: "600 DPI · max 60 KB · JPEG · B&W" },
    Document:   { width: null,height: null,maxKB: 2048, dpi: 200, format: "PDF",  label: "PDF/A",      desc: "200 DPI · max 2 MB · Color PDF" },
  },
  NSDL: {
    // 🎯 Target strictly 18.5 KB for Photograph
    Photograph: { width: 197, height: 276, maxKB: 50, targetKB: 18.5,  dpi: 200, format: "JPEG", label: "197×276 px", desc: "200 DPI · target 18.5 KB · JPEG" },
    Signature:  { width: 354, height: 157, maxKB: 50,   dpi: 200, format: "JPEG", label: "354×157 px", desc: "200 DPI · max 50 KB · JPEG" },
    Document:   { width: null,height: null,maxKB: 2048, dpi: 200, format: "PDF",  label: "PDF/A",      desc: "200 DPI · max 2 MB · Color PDF" },
  },
};

const STEPS = ["1. Upload", "2. Requirement", "3. Editor"];
const TABS  = ["PAN Card Editor", "Custom Editor"];

export default function PANCardEditor() {
  const [activeTab,     setActiveTab]     = useState(0);
  const [activeStep,    setActiveStep]    = useState(0);
  const [image,         setImage]         = useState(null);
  const [resizedImage,  setResizedImage]  = useState(null);
  const [dragging,      setDragging]      = useState(false);
  const [website,       setWebsite]       = useState("NSDL"); 
  const [type,          setType]          = useState("Photograph");
  const [resize,        setResize]        = useState("selected");
  const [rotation,      setRotation]      = useState(0);
  const [zoom,          setZoom]          = useState(50);
  const [contrast,      setContrast]      = useState(100);
  const [brightness,    setBrightness]    = useState(100);
  const [activeControl, setActiveControl] = useState("zoom");
  const [fileSizeKB,    setFileSizeKB]    = useState(null);
  const [sizeOk,        setSizeOk]        = useState(null);

  const fileInputRef = useRef(null);
  const spec = SPECS[website][type];

  // ✅ 18.5KB Target Logic
  useEffect(() => {
    if (!image || !spec.width) { setResizedImage(image); setFileSizeKB(null); return; }
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width  = spec.width;
      canvas.height = spec.height;
      const ctx = canvas.getContext("2d");

      ctx.filter = `contrast(${contrast}%) brightness(${brightness}%)`;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      
      const scale = 0.5 + zoom / 100;
      ctx.drawImage(img, -canvas.width/2 * scale, -canvas.height/2 * scale, canvas.width * scale, canvas.height * scale);

      let minQ = 0.01;
      let maxQ = 0.99;
      let finalDataUrl = "";
      let finalKB = 0;
      const target = spec.targetKB || spec.maxKB * 0.8;

      for (let i = 0; i < 12; i++) {
        let midQ = (minQ + maxQ) / 2;
        let testDataUrl = canvas.toDataURL("image/jpeg", midQ);
        let testKB = (testDataUrl.split(",")[1].length * 3) / 4 / 1024;

        if (testKB < target) {
          minQ = midQ;
          finalDataUrl = testDataUrl;
          finalKB = testKB;
        } else {
          maxQ = midQ;
        }
      }

      setResizedImage(finalDataUrl || canvas.toDataURL("image/jpeg", 0.8));
      setFileSizeKB(finalKB.toFixed(1));
      setSizeOk(finalKB <= spec.maxKB);
    };
    img.src = image;
  }, [image, spec, rotation, zoom, contrast, brightness]);

  const handleFile = (file) => {
    if (!file) return;
    setImage(URL.createObjectURL(file));
  };

  const handleDownload = () => {
    if (!resizedImage) return;
    const a = document.createElement("a");
    a.href     = resizedImage;
    a.download = `${website}_${type}_${spec.width}x${spec.height}.jpg`;
    a.click();
  };

  const imgStyle = {
    transform: `rotate(${rotation}deg) scale(${0.5 + zoom / 100})`,
    filter: `contrast(${contrast}%) brightness(${brightness}%)`,
    transition: "transform 0.1s, filter 0.1s",
  };

  const sliderMap = {
    zoom:       { value: zoom,       set: setZoom,       min: 0,  max: 200, label: "Zoom" },
    contrast:   { value: contrast,   set: setContrast,   min: 50, max: 200, label: "Contrast" },
    brightness: { value: brightness, set: setBrightness, min: 50, max: 200, label: "Brightness" },
  };
  const sl = sliderMap[activeControl] ?? sliderMap.zoom;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-3 sm:p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Tabs */}
        <div className="grid grid-cols-2 border-b border-gray-200">
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)}
              className={`py-4 text-sm sm:text-base font-semibold tracking-wide transition-colors
                ${activeTab === i ? "bg-white text-gray-900 border-b-2 border-blue-500" : "bg-gray-100 text-gray-500 hover:bg-gray-50"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Step Tabs */}
        <div className="flex gap-2 px-4 sm:px-6 pt-5 pb-3 flex-wrap">
          {STEPS.map((step, i) => (
            <button key={step} onClick={() => { if (i < activeStep || (i === 1 && image)) setActiveStep(i); }}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors
                ${activeStep === i ? "bg-red-500 text-white shadow" : i < activeStep  ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-400 cursor-default"}`}>
              {step}
            </button>
          ))}
        </div>

        <div className="px-4 sm:px-6 pb-4 min-h-[420px]">
          {/* STEP 1: Upload */}
          {activeStep === 0 && (
            <div onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-72 sm:h-80 cursor-pointer border-blue-300 bg-blue-50/40 transition-colors">
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
              {image ? <img src={image} className="max-h-60 max-w-full object-contain rounded-lg shadow" /> : <p className="text-gray-500">Click to Select Photo</p>}
            </div>
          )}

          {/* STEP 2: Requirement (Logos added here) */}
          {activeStep === 1 && (
            <div className="space-y-5 pt-1">
              <Section title="Application Website">
                <div className="grid grid-cols-2 gap-3">
                  {["UTI", "NSDL"].map((site) => (
                    <label key={site} className={`relative flex flex-col items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-colors ${website === site ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-blue-200"}`}>
                      <span className={`absolute top-0 left-0 text-xs font-bold px-3 py-1 rounded-tl-xl rounded-br-xl ${website === site ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}>{site}</span>
                      
                      <div className="h-16 mt-2 flex items-center justify-center">
                        {/* ⬇️ LOGO PLACEMENT HERE ⬇️ */}
                        {site === "UTI" 
                          ? <img src="/img/utr.png" alt="UTI Logo" className="h-full object-contain" /> // 👈 Change to your UTI logo path
                          : <img src="/img/nsdl.png" alt="NSDL Logo" className="h-full object-contain" /> // 👈 Change to your NSDL logo path
                        }
                      </div>

                      <input type="radio" name="website" checked={website === site} onChange={() => setWebsite(site)} className="accent-blue-500 w-5 h-5" />
                    </label>
                  ))}
                </div>
              </Section>

              <Section title="Type">
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[{ label: "Photograph", icon: <PersonIcon /> }, { label: "Signature", icon: <SignIcon /> }, { label: "Document", icon: <DocIcon /> }].map(({ label, icon }) => (
                    <label key={label} className={`flex flex-col items-center gap-2 border-2 rounded-xl p-2 sm:p-3 cursor-pointer transition-colors ${type === label ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-blue-200"}`}>
                      <span className={`self-start text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded ${type === label ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}>{label}</span>
                      <div className="my-1">{icon}</div>
                      <input type="radio" name="type" checked={type === label} onChange={() => setType(label)} className="accent-blue-500 w-5 h-5" />
                    </label>
                  ))}
                </div>
              </Section>

              <div className={`rounded-xl border-2 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${website === "UTI" ? "border-blue-300 bg-blue-50" : "border-orange-300 bg-orange-50"}`}>
                <div>
                  <p className={`text-xs font-bold mb-1 uppercase ${website === "UTI" ? "text-blue-600" : "text-orange-600"}`}>{website} — {type}</p>
                  <p className="text-2xl font-extrabold text-gray-800">{spec.label}</p>
                  <p className="text-xs text-gray-500">{spec.desc}</p>
                </div>
                <div className="text-xs bg-white rounded-lg px-4 py-3 border border-gray-200 min-w-[150px]">
                  <Row k="DPI" v={`${spec.dpi} DPI`} />
                  <Row k="Target" v={spec.targetKB ? `${spec.targetKB} KB` : `${spec.maxKB} KB`} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Editor */}
          {activeStep === 2 && (
            <div className="flex flex-col items-center gap-4 pt-1">
              <div className="w-full flex justify-between bg-gray-50 rounded-xl px-4 py-2.5 border">
                <div className="text-xs text-gray-600 font-bold">{website} | {spec.label}</div>
                {fileSizeKB && <span className={`text-xs font-bold px-2 py-1 rounded-full ${sizeOk ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>{fileSizeKB} KB</span>}
              </div>
              <div className="w-full flex items-center justify-center rounded-xl overflow-hidden border bg-slate-200" style={{ minHeight: 300 }}>
                {resizedImage && <img src={resizedImage} style={imgStyle} className="max-h-64 object-contain" />}
              </div>
              <div className="w-full space-y-3">
                 <input type="range" min={sl.min} max={sl.max} value={sl.value} onChange={(e) => sl.set(Number(e.target.value))} className="w-full accent-blue-500" />
                 <div className="flex gap-2">
                    <button onClick={() => setRotation(r => r - 90)} className="flex-1 bg-gray-800 text-white py-2 rounded-lg text-sm">Rotate Left</button>
                    <button onClick={() => setRotation(r => r + 90)} className="flex-1 bg-gray-800 text-white py-2 rounded-lg text-sm">Rotate Right</button>
                 </div>
                 <button onClick={handleDownload} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Download Result</button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t">
          {activeStep > 0 && <button onClick={() => setActiveStep(s => s - 1)} className="px-5 py-2 bg-gray-200 rounded-lg text-sm">Previous</button>}
          {activeStep < 2 && <button onClick={() => { if(image) setActiveStep(s => s + 1); }} className="px-5 py-2 bg-blue-500 text-white rounded-lg text-sm">Next</button>}
        </div>
      </div>
    </div>
  );
}

// Helper Components & Icons
function Section({ title, children }) { return <div className="mb-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{title}</p>{children}</div>; }
function Row({ k, v }) { return <div className="flex justify-between"><span>{k}</span><span className="font-bold">{v}</span></div>; }
const PersonIcon = () => <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z"/></svg>;
const SignIcon = () => <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M4 18c2-4 4-8 6-6s-2 6 0 6 4-4 6-4 3 2 4 2"/></svg>;
const DocIcon = () => <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM13 9V3.5L18.5 9H13z"/></svg>;