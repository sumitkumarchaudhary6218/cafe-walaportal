"use client";
import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Check, Sun, Contrast, RotateCcw } from 'lucide-react';

const EditCardModal = ({ isOpen, onClose, cardData, onSave }) => {
  const [cardType, setCardType] = useState("Aadhaar Card");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontFilters, setFrontFilters] = useState({ brightness: 100, contrast: 100 });
  const [backFilters, setBackFilters] = useState({ brightness: 100, contrast: 100 });

  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);

  useEffect(() => {
    if (cardData && isOpen) {
      setCardType(cardData.type);
      setFrontImage(cardData.front);
      setBackImage(cardData.back);
      setFrontFilters(cardData.frontFilters || { brightness: 100, contrast: 100 });
      setBackFilters(cardData.backFilters || { brightness: 100, contrast: 100 });
    }
  }, [cardData, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (side === 'front') setFrontImage(reader.result);
        else setBackImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({ ...cardData, type: cardType, front: frontImage, back: backImage, frontFilters, backFilters });
  };

  const FilterControl = ({ filters, setFilters }) => (
    <div className="mt-3 space-y-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-[10px] font-bold text-slate-500">
            <span className="flex items-center gap-1"><Sun size={10}/> BRIGHTNESS</span>
            <span>{filters.brightness}%</span>
        </div>
        <input type="range" min="50" max="150" value={filters.brightness} onChange={(e) => setFilters({...filters, brightness: e.target.value})} className="w-full h-1 bg-slate-200 rounded-lg appearance-none accent-blue-600" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-[10px] font-bold text-slate-500">
            <span className="flex items-center gap-1"><Contrast size={10}/> CONTRAST</span>
            <span>{filters.contrast}%</span>
        </div>
        <input type="range" min="50" max="150" value={filters.contrast} onChange={(e) => setFilters({...filters, contrast: e.target.value})} className="w-full h-1 bg-slate-200 rounded-lg appearance-none accent-blue-600" />
      </div>
      <button onClick={() => setFilters({brightness: 100, contrast: 100})} className="text-[9px] text-blue-500 font-bold flex items-center gap-1 hover:text-red-500 transition-colors">
        <RotateCcw size={10}/> RESET FILTERS
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Edit Card</h2>
          <button onClick={onClose} className="p-1 cursor-pointer rounded-full hover:bg-slate-100 text-slate-400"><X size={20} /></button>
        </div>

        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Card Type</label>
            <select value={cardType} onChange={(e) => setCardType(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm">
              <option value="Aadhaar Card">Aadhaar Card</option>
              <option value="PAN Card">PAN Card</option>
              <option value="Voter ID Card">Voter ID Card</option>
              <option value="Driving License">Driving License</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* FRONT */}
            <div className="border border-slate-100 rounded-xl p-3">
              <h3 className="font-bold text-slate-700 text-xs mb-2">Front Side</h3>
              <div className="w-full aspect-[1.58/1] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden mb-2">
                {frontImage ? <img src={frontImage} style={{filter: `brightness(${frontFilters.brightness}%) contrast(${frontFilters.contrast}%)`}} className="w-full h-full object-contain" /> : <ImageIcon size={30} className="text-slate-200" />}
              </div>
              <input type="file" ref={frontInputRef} className="hidden" onChange={(e) => handleImageUpload(e, 'front')} />
              <button onClick={() => frontInputRef.current.click()} className="w-full py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase"><Upload size={12} className="inline mr-1" /> Upload</button>
              {frontImage && <FilterControl filters={frontFilters} setFilters={setFrontFilters} />}
            </div>

            {/* BACK */}
            <div className="border border-slate-100 rounded-xl p-3">
              <h3 className="font-bold text-slate-700 text-xs mb-2">Back Side</h3>
              <div className="w-full aspect-[1.58/1] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden mb-2">
                {backImage ? <img src={backImage} style={{filter: `brightness(${backFilters.brightness}%) contrast(${backFilters.contrast}%)`}} className="w-full h-full object-contain" /> : <ImageIcon size={30} className="text-slate-200" />}
              </div>
              <input type="file" ref={backInputRef} className="hidden" onChange={(e) => handleImageUpload(e, 'back')} />
              <button onClick={() => backInputRef.current.click()} className="w-full py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase"><Upload size={12} className="inline mr-1" /> Upload</button>
              {backImage && <FilterControl filters={backFilters} setFilters={setBackFilters} />}
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-slate-100 flex gap-2">
          <button onClick={handleSave} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition flex items-center justify-center gap-2"><Check size={16} /> Save Changes</button>
          <button onClick={onClose} className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-lg font-bold text-sm">Close</button>
        </div>
      </div>
    </div>
  );
};

export default EditCardModal;