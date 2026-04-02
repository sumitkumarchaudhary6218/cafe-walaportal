"use client";
import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Check } from 'lucide-react';

const EditCardModal = ({ isOpen, onClose, cardData, onSave }) => {
  const [cardType, setCardType] = useState("Aadhaar Card");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);

  // Sync state when modal opens with card data
  useEffect(() => {
    if (cardData && isOpen) {
      setCardType(cardData.type);
      setFrontImage(cardData.front);
      setBackImage(cardData.back);
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
      back: backImage
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Edit Card</h2>
          <button 
            onClick={onClose}
            className="p-1 cursor-pointer rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4 max-h-[65vh] overflow-y-auto">
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

          {/* Front Side */}
          <div className="border border-slate-100 rounded-xl p-3 space-y-3">
            <h3 className="font-bold text-slate-700 text-xs">Front Side</h3>
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[260px] aspect-[1.58/1] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                {frontImage ? (
                  <img src={frontImage} alt="Front Preview" className="w-full h-full object-contain p-1" />
                ) : (
                  <div className="text-center">
                    <ImageIcon size={30} className="text-slate-300 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-400">No image</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={frontInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'front')}
              />
              <button 
                onClick={() => frontInputRef.current.click()}
                className="mt-2 w-full flex items-center justify-center gap-1 py-2 px-3 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-semibold text-xs hover:bg-blue-100 transition"
              >
                <Upload size={14} /> Upload Front
              </button>
            </div>
          </div>

          {/* Back Side */}
          <div className="border border-slate-100 rounded-xl p-3 space-y-3">
            <h3 className="font-bold text-slate-700 text-xs">Back Side</h3>
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[260px] aspect-[1.58/1] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                {backImage ? (
                  <img src={backImage} alt="Back Preview" className="w-full h-full object-contain p-1" />
                ) : (
                  <div className="text-center">
                    <ImageIcon size={30} className="text-slate-300 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-400">No image</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={backInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'back')}
              />
              <button 
                onClick={() => backInputRef.current.click()}
                className="mt-2 w-full flex items-center justify-center gap-1 py-2 px-3 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-semibold text-xs hover:bg-blue-100 transition"
              >
                <Upload size={14} /> Upload Back
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 flex gap-2">
          <button 
            onClick={handleSave}
            className="flex-1 py-2. cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition flex items-center justify-center gap-2"
          >
            <Check size={16} /> Save Changes
          </button>
          <button 
            onClick={onClose}
            className="px-6 cursor-pointer py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-bold text-sm transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditCardModal;