"use client";
import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Check, RotateCcw, Sun, Contrast } from 'lucide-react';

const EditCardModal = ({ isOpen, onClose, cardData, onSave }) => {
  const [cardType, setCardType] = useState("Aadhaar Card");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  
  // Filter States
  const [frontFilters, setFrontFilters] = useState({ brightness: 100, contrast: 100 });
  const [backFilters, setBackFilters] = useState({ brightness: 100, contrast: 100 });

  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);

  useEffect(() => {
    if (cardData && isOpen) {
      setCardType(cardData.type || "Aadhaar Card");
      setFrontImage(cardData.front || null);
      setBackImage(cardData.back || null);
      // Initialize filters from cardData if they exist, otherwise default to 100
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
    onSave({
      ...cardData,
      type: cardType,
      front: frontImage,
      back: backImage,
      frontFilters,
      backFilters
    });
  };

  const FilterControls = ({ filters, setFilters }) => (
    <div className="mt-3 space-y-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
            <Sun size={12} /> BRIGHTNESS
          </label>
          <span className="text-[10px] font-mono text-blue-600">{filters.brightness}%</span>
        </div>
        <input 
          type="range" min="50" max="150" value={filters.brightness}
          onChange={(e) => setFilters({...filters, brightness: e.target.value})}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
            <Contrast size={12} /> CONTRAST
          </label>
          <span className="text-[10px] font-mono text-blue-600">{filters.contrast}%</span>
        </div>
        <input 
          type="range" min="50" max="150" value={filters.contrast}
          onChange={(e) => setFilters({...filters, contrast: e.target.value})}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
      <button 
        onClick={() => setFilters({ brightness: 100, contrast: 100 })}
        className="text-[10px] flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors font-bold"
      >
        <RotateCcw size={10} /> RESET FILTERS
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Edit Card</h2>
          <button onClick={onClose} className="p-1 cursor-pointer rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Card Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Card Type</label>
            <select 
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="Aadhaar Card">Aadhaar Card (85.6×54mm)</option>
              <option value="PAN Card">PAN Card (85.6×54mm)</option>
              <option value="Voter ID Card">Voter ID Card (85.6×54mm)</option>
              <option value="Driving License">Driving License (85.6×54mm)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Front Side */}
            <div className="border border-slate-100 rounded-xl p-3 space-y-3">
              <h3 className="font-bold text-slate-700 text-xs">Front Side</h3>
              <div className="w-full aspect-[1.58/1] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                {frontImage ? (
                  <img 
                    src={frontImage} 
                    alt="Front Preview" 
                    className="w-full h-full object-contain p-1 transition-all"
                    style={{ filter: `brightness(${frontFilters.brightness}%) contrast(${frontFilters.contrast}%)` }}
                  />
                ) : (
                  <ImageIcon size={30} className="text-slate-300" />
                )}
              </div>
              <input type="file" ref={frontInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'front')} />
              <button 
                onClick={() => frontInputRef.current.click()}
                className="w-full flex items-center justify-center gap-1 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-semibold text-[11px] hover:bg-blue-100 transition"
              >
                <Upload size={14} /> Upload Front
              </button>
              
              {frontImage && <FilterControls filters={frontFilters} setFilters={setFrontFilters} />}
            </div>

            {/* Back Side */}
            <div className="border border-slate-100 rounded-xl p-3 space-y-3">
              <h3 className="font-bold text-slate-700 text-xs">Back Side</h3>
              <div className="w-full aspect-[1.58/1] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                {backImage ? (
                  <img 
                    src={backImage} 
                    alt="Back Preview" 
                    className="w-full h-full object-contain p-1 transition-all"
                    style={{ filter: `brightness(${backFilters.brightness}%) contrast(${backFilters.contrast}%)` }}
                  />
                ) : (
                  <ImageIcon size={30} className="text-slate-300" />
                )}
              </div>
              <input type="file" ref={backInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'back')} />
              <button 
                onClick={() => backInputRef.current.click()}
                className="w-full flex items-center justify-center gap-1 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-semibold text-[11px] hover:bg-blue-100 transition"
              >
                <Upload size={14} /> Upload Back
              </button>

              {backImage && <FilterControls filters={backFilters} setFilters={setBackFilters} />}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 flex gap-2">
          <button onClick={handleSave} className="flex-1 py-2.5 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition flex items-center justify-center gap-2">
            <Check size={16} /> Save Changes
          </button>
          <button onClick={onClose} className="px-6 cursor-pointer py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-bold text-sm transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCardModal;