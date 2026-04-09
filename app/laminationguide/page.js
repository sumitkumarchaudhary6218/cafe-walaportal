import React from 'react';
import { 
  Layers, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  BadgeIndianRupee, 
  TrendingUp, 
  ShoppingCart, 
  Wrench, 
  Lightbulb, 
  Rocket, 
  Check,
  ExternalLink,
  ArrowRight 
} from 'lucide-react';

export default function LaminationGuide() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      
      {/* --- Sticky Header --- */}
      <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50 p-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="text-indigo-600 w-6 h-6" />
            <span className="font-black text-lg">Lamination Machine Guide</span>
          </div>
          <div className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
            Beginner to Pro
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        
        {/* --- Hero Section --- */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-8 text-slate-900">
            🖥️ साइबर कैफे के लिए सबसे बेस्ट <span className="text-indigo-600">Laminating Machine</span> कौन सा है?
          </h1>
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm italic text-lg text-slate-600 leading-relaxed mb-10">
            "दोस्तों, अगर आप एक नया साइबर कैफे शुरू करने जा रहे हैं या अभी-अभी शुरू किया है, तो आपके मन में एक बहुत common सवाल जरूर आता होगा — <strong>साइबर कैफे के लिए सबसे बेस्ट Laminating Machine कौन सा लेना चाहिए?</strong>"
          </div>

          <div className="bg-indigo-600 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><TrendingUp size={120} /></div>
             <h2 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
               🔍 मशीन क्यों जरूरी है?
             </h2>
             <p className="text-indigo-100 mb-6 font-medium relative z-10">
               Laminating Machine आपके साइबर कैफे की earning बढ़ाने वाला tool है। आप इससे ये काम कर सकते हैं:
             </p>
             <div className="grid grid-cols-2 gap-3 relative z-10">
               {["Aadhaar Card", "PAN Card", "Photo", "Certificates", "ID Cards"].map(item => (
                 <div key={item} className="bg-white/10 p-2 rounded-lg border border-white/20 text-xs font-bold flex items-center gap-2">
                   <Check size={14} className="text-indigo-300"/> {item} Lamination
                 </div>
               ))}
             </div>
             <p className="mt-6 font-black text-yellow-300 text-lg">👉 हर दिन ₹100–₹500 extra earning आराम से!</p>
          </div>
        </section>

        {/* --- Beginner Warning --- */}
        <section className="mb-12 bg-rose-50 border-2 border-rose-500 p-6 rounded-3xl flex items-start gap-4">
           <AlertTriangle className="text-rose-500 flex-shrink-0 w-8 h-8" />
           <div>
             <h3 className="font-black text-rose-900 mb-2 underline decoration-rose-200 underline-offset-4 uppercase tracking-tight">⚠️ Beginner की सबसे बड़ी गलती</h3>
             <p className="text-rose-800 font-medium leading-relaxed">
               बिना जानकारी के सस्ता मशीन खरीद लेते हैं या फिर महंगा मशीन खरीदकर बजट खराब कर देते हैं। 
             </p>
           </div>
        </section>

        {/* --- Machine Comparison --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-2">
             🧾 Laminating Machine के 2 प्रकार
          </h2>

          <div className="space-y-8">
            {/* Type 1: Plastic Body */}
            <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:border-slate-300 transition-all">
               <div className="bg-slate-100 p-4 border-b flex justify-between items-center">
                  <h3 className="font-black text-slate-700">1️⃣ Plastic Body (Beginner Level)</h3>
                  <span className="text-xs font-black bg-white px-3 py-1 rounded-full text-slate-400">₹1000 - ₹1500</span>
               </div>
               <div className="p-6 grid md:grid-cols-2 gap-6">
                 <div>
                    <h4 className="text-xs font-black text-emerald-600 uppercase mb-3 tracking-widest flex items-center gap-1">👍 फायदे</h4>
                    <ul className="text-sm font-bold text-slate-600 space-y-2">
                       <li>• शुरुआती लोगों के लिए Perfect</li>
                       <li>• छोटा और portable</li>
                       <li>• बेसिक काम के लिए सस्ता</li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="text-xs font-black text-rose-500 uppercase mb-3 tracking-widest flex items-center gap-1">👎 नुकसान</h4>
                    <ul className="text-sm font-bold text-slate-600 space-y-2">
                       <li>• 5–6 महीने में खराब होने लगता है</li>
                       <li>• Heating issues आते हैं</li>
                       <li>• Heavy use के लिए नहीं</li>
                    </ul>
                 </div>
               </div>
            </div>

            {/* Type 2: Metal Body */}
            <div className="bg-white border-4 border-indigo-600 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
               <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 text-[10px] font-black rounded-bl-2xl">BEST VALUE</div>
               <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex justify-between items-center">
                  <h3 className="font-black text-indigo-900 text-lg uppercase tracking-tight">🔩 2️⃣ Metal Body (Professional Level)</h3>
                  <span className="text-sm font-black text-indigo-600">₹3000 - ₹3500</span>
               </div>
               <div className="p-6 grid md:grid-cols-2 gap-6">
                 <div>
                    <h4 className="text-xs font-black text-indigo-600 uppercase mb-3 tracking-widest">🔥 Pro Level फायदे</h4>
                    <ul className="text-sm font-bold text-indigo-900 space-y-3">
                       <li className="flex items-center gap-2"><CheckCircle2 size={16}/> बहुत मजबूत (Metal Body)</li>
                       <li className="flex items-center gap-2"><CheckCircle2 size={16}/> 2–3 साल तक आराम से लाइफ</li>
                       <li className="flex items-center gap-2"><CheckCircle2 size={16}/> Heavy work के लिए Perfect</li>
                    </ul>
                 </div>
                 <div className="bg-indigo-600/5 p-4 rounded-2xl border border-indigo-100 flex flex-col justify-center">
                    <p className="text-xs font-black text-indigo-400 uppercase mb-2">Verdict</p>
                    <p className="text-sm font-bold text-indigo-800 leading-relaxed italic">"अगर आप सीरियस हैं, तो यह बेस्ट इन्वेस्टमेंट है।"</p>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* --- Comparison Table --- */}
        <section className="mb-12 overflow-hidden rounded-3xl border border-slate-200">
           <table className="w-full text-left bg-white text-sm">
             <thead>
               <tr className="bg-slate-800 text-white font-black text-xs uppercase tracking-widest">
                  <th className="p-4">Feature</th>
                  <th className="p-4">Plastic</th>
                  <th className="p-4">Metal</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100 font-bold">
               {['Price', 'Life', 'Quality', 'Use', 'Durability'].map((f, i) => (
                 <tr key={f}>
                   <td className="p-4 text-slate-500">{f}</td>
                   <td className="p-4">{['सस्ता', '5–6 महीने', 'Average', 'Beginner', 'Low'][i]}</td>
                   <td className="p-4 text-indigo-600">{['थोड़ा महंगा', '2–3 साल', 'Professional', 'Heavy Use', 'High'][i]}</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </section>

        {/* --- Suggestion Box --- */}
        <section className="mb-12 bg-amber-50 border-2 border-dashed border-amber-400 p-8 rounded-[2.5rem]">
           <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-amber-900">
             <Lightbulb className="text-amber-500 fill-amber-200" /> मेरा सीधा Suggestion
           </h2>
           <div className="space-y-4 font-black text-xl">
             <p className="flex items-center gap-3">👉 बजट कम है <ArrowRight size={20} className="text-amber-400" /> Plastic वाला (Start करो)</p>
             <p className="flex items-center gap-3">👉 बजट manage करो <ArrowRight size={20} className="text-amber-400" /> Direct Metal वाला लो</p>
           </div>
           <div className="mt-8 pt-8 border-t border-amber-200 text-sm font-medium text-amber-800 italic">
             "सच्चाई: Plastic वाला 2 बार खरीदोगे = ₹2400 खर्च, Metal वाला एक बार लोगे = ₹3000 खर्च। Long-term में Metal ही सस्ता है।"
           </div>
        </section>

        {/* --- Earning Potential --- */}
        <section className="mb-12 bg-emerald-600 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12"><BadgeIndianRupee size={150} /></div>
           <div className="relative z-10">
             <h2 className="text-3xl font-black mb-6 flex items-center gap-2">
                💰 Earning Potential
             </h2>
             <div className="space-y-4 text-xl font-bold">
               <div className="flex justify-between border-b border-white/20 pb-2"><span>Per Charge</span> <span>₹20 – ₹50</span></div>
               <div className="flex justify-between border-b border-white/20 pb-2"><span>20 Customers/Day</span> <span>₹400 – ₹1000/day</span></div>
               <div className="pt-4 text-yellow-300 text-3xl font-black uppercase tracking-tighter">
                  कमाई: ₹12,000 – ₹30,000/Month
               </div>
             </div>
           </div>
        </section>

        {/* --- Buy Now Section --- */}
        <section className="mb-12 text-center">
           <h2 className="text-xl font-black mb-6 flex items-center justify-center gap-2">
              <ShoppingCart /> कहाँ से खरीदें?
           </h2>
           <div className="space-y-4 max-w-sm mx-auto">
             <a href="https://fktr.in/v3wcubh" target="_blank" className="flex items-center justify-center gap-2 w-full bg-white border-2 border-indigo-600 text-indigo-600 py-4 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-all group">
                Buy Best Model <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
             </a>
             <a href="https://fktr.in/UqK7OTT" target="_blank" className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all group">
                Buy Professional Unit <ShoppingCart size={18} className="group-hover:translate-x-1 transition-transform" />
             </a>
           </div>
        </section>

        {/* --- Conclusion & Tips --- */}
        <footer className="mt-20">
           <div className="bg-slate-900 text-white p-10 rounded-[4rem] text-center shadow-2xl">
              <Rocket className="mx-auto mb-6 text-indigo-400 w-12 h-12" />
              <h2 className="text-3xl font-black mb-6">🚀 Final Conclusion</h2>
              <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto">मशीन छोटा इन्वेस्टमेंट है, लेकिन कमाई बहुत बड़ी दे सकता है।</p>
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-left mb-10">
                 <h4 className="font-black text-indigo-400 uppercase tracking-widest text-xs mb-4">📢 Bonus Tip</h4>
                 <p className="font-bold text-lg leading-snug">
                   Laminating के साथ <span className="text-white">Photo Print + Scan + Online Form</span> का Combo बनाओ। इससे Income Double होगी!
                 </p>
              </div>

              <div className="pt-10 border-t border-white/10">
                 <p className="font-black text-xl mb-2 italic">Sumit Digital Creators 🚀</p>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Connecting you to Cyber Success</p>
              </div>
           </div>
        </footer>

      </main>
    </div>
  );
}