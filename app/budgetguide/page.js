import React from 'react';
import { 
  Calculator, 
  Laptop, 
  Monitor, 
  Printer, 
  Layers, 
  Fingerprint, 
  Package, 
  Armchair, 
  Home, 
  Wallet, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Check 
} from 'lucide-react';

export default function BudgetGuide() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      
      {/* --- Header --- */}
      <header className="bg-white border-b sticky top-0 z-50 p-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="text-indigo-600 w-6 h-6" />
            <span className="font-black text-lg">Cyber Cafe Budget Guide</span>
          </div>
          <div className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
            Setup Guide 2026
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        
        {/* --- Hero Section --- */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-8 text-slate-900">
            💻 साइबर कैफे खोलने में <span className="text-indigo-600">कितना खर्च आता है?</span>
          </h1>
          
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-8 rounded-[2.5rem] shadow-xl mb-8">
            <p className="text-xl font-bold mb-4">₹70,000 से ₹1 लाख में पूरा सेटअप</p>
            <div className="space-y-3 opacity-90 font-medium">
              <p className="flex items-center gap-2">👉 कितना बजट लगेगा?</p>
              <p className="flex items-center gap-2">👉 कौन-कौन सा सामान लेना जरूरी है?</p>
              <p className="flex items-center gap-2">👉 कम से कम कितने पैसे में शुरुआत?</p>
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-dashed border-amber-400 p-6 rounded-3xl flex items-start gap-4">
             <Lightbulb className="text-amber-500 flex-shrink-0 w-8 h-8" />
             <div>
               <h3 className="font-black text-amber-900 mb-2 underline decoration-amber-200 underline-offset-4">🧠 शुरुआत करने से पहले जरूरी बात</h3>
               <p className="text-amber-800 font-medium leading-relaxed">
                 बहुत लोग गलती करते हैं: पहले दुकान (रूम) ले लेते हैं और फिर सामान खरीदने में बजट खत्म हो जाता है। 
                 <br/><span className="font-black">सही तरीका:</span> पहले पूरा सेटअप का सामान खरीदें, उसके बाद ही रूम लें।
               </p>
             </div>
          </div>
        </section>

        {/* --- Step 1: Hardware --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
            Step 1: PC या Laptop – सबसे जरूरी चीज
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Option 1: Desktop */}
            <div className="bg-white border-2 border-slate-100 p-6 rounded-3xl hover:border-indigo-200 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="text-slate-400" />
                <h3 className="font-bold text-lg">Option 1: Desktop PC</h3>
              </div>
              <ul className="text-sm space-y-2 mb-6 font-medium text-slate-600">
                <li className="flex justify-between"><span>PC Setup</span> <span>₹20,000</span></li>
                <li className="flex justify-between"><span>Inverter + Battery</span> <span>₹30,000</span></li>
                <li className="flex justify-between pt-2 border-t font-black text-slate-900 text-base"><span>Total</span> <span>₹50,000</span></li>
              </ul>
              <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2 font-bold italic">
                <AlertTriangle size={14}/> PC बिजली पर चलता है, Inverter जरूरी है।
              </div>
            </div>

            {/* Option 2: Laptop */}
            <div className="bg-indigo-50 border-2 border-indigo-200 p-6 rounded-3xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl">RECOMMENDED</div>
              <div className="flex items-center gap-3 mb-4">
                <Laptop className="text-indigo-600" />
                <h3 className="font-bold text-lg text-indigo-900">Option 2: Laptop</h3>
              </div>
              <div className="mb-6">
                 <p className="text-3xl font-black text-indigo-700">₹40,000</p>
                 <p className="text-xs font-bold text-indigo-400 uppercase tracking-tighter mt-1">(औसतन बजट)</p>
              </div>
              <ul className="text-xs space-y-2 font-bold text-indigo-800">
                <li className="flex items-center gap-2"><CheckCircle2 size={12}/> 4–5 घंटे बैटरी बैकअप</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={12}/> लाइट जाने पर काम चालू</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={12}/> घर-घर जाकर सर्विस दे सकते हैं</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Step 2-5: Equipment Grid --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6">⚙️ अन्य जरूरी मशीनरी</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Printer */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-start gap-4">
              <div className="bg-slate-100 p-3 rounded-2xl"><Printer className="text-indigo-600"/></div>
              <div>
                <h4 className="font-bold text-slate-900">Printer</h4>
                <p className="text-indigo-600 font-black">₹10,000</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Canon (Best) / Epson</p>
              </div>
            </div>

            {/* Laminator */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-start gap-4">
              <div className="bg-slate-100 p-3 rounded-2xl"><Layers className="text-indigo-600"/></div>
              <div>
                <h4 className="font-bold text-slate-900">Laminator</h4>
                <p className="text-indigo-600 font-black">₹3,000</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Metal body Recommended</p>
              </div>
            </div>

            {/* Biometric */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-start gap-4">
              <div className="bg-slate-100 p-3 rounded-2xl"><Fingerprint className="text-indigo-600"/></div>
              <div>
                <h4 className="font-bold text-slate-900">Biometric</h4>
                <p className="text-indigo-600 font-black">₹3,000</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Mantra / Morpho</p>
              </div>
            </div>

            {/* Raw Material */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-start gap-4">
              <div className="bg-slate-100 p-3 rounded-2xl"><Package className="text-indigo-600"/></div>
              <div>
                <h4 className="font-bold text-slate-900">Raw Material</h4>
                <p className="text-indigo-600 font-black">₹1,000</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Paper, Lamination Pouch</p>
              </div>
            </div>

          </div>
        </section>

        {/* --- Step 6: Mid-Calc Table --- */}
        <section className="mb-12 overflow-hidden rounded-[2rem] border border-slate-200">
           <div className="bg-slate-800 p-4 text-white font-bold flex justify-between">
              <span>📊 अब तक का कुल खर्च</span>
              <span className="text-indigo-400">Step 1-5</span>
           </div>
           <table className="w-full text-left bg-white">
              <tbody className="divide-y divide-slate-50">
                {['Laptop', 'Printer', 'Laminator', 'Biometric', 'Raw Material'].map((item, idx) => (
                   <tr key={idx} className="text-sm">
                      <td className="p-4 text-slate-500">{item}</td>
                      <td className="p-4 font-bold text-right">₹{[40000, 10000, 3000, 3000, 1000][idx].toLocaleString()}</td>
                   </tr>
                ))}
                <tr className="bg-slate-50 font-black text-lg">
                   <td className="p-4">TOTAL</td>
                   <td className="p-4 text-right text-indigo-700">₹57,000</td>
                </tr>
              </tbody>
           </table>
        </section>

        {/* --- Step 7-9: Infrastructure & Cash Flow --- */}
        <section className="mb-12 space-y-6">
           <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="p-4 bg-orange-50 rounded-2xl text-orange-600"><Armchair /></div>
                 <div>
                    <h3 className="font-bold">Furniture & Counter</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase">Table + 2-3 Chairs</p>
                 </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black">₹12,000</p>
                <p className="text-[10px] font-bold text-slate-400">(लगभग)</p>
              </div>
           </div>

           <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600"><Home /></div>
                 <div>
                    <h3 className="font-bold">Room Rent (1st Month)</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase">Small Shop</p>
                 </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black">₹2,000</p>
                <p className="text-[10px] font-bold text-slate-400">/ MONTH</p>
              </div>
           </div>

           {/* Cash Flow Section */}
           <div className="bg-rose-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><Wallet size={100} /></div>
             <div className="relative z-10">
               <h2 className="text-2xl font-black mb-4 flex items-center gap-2 text-rose-300">
                 <Wallet /> Step 9: Cash Flow
               </h2>
               <p className="text-rose-100 font-medium mb-6 leading-relaxed">
                 अगर आप पैसा निकालने (AEPS) या फॉर्म भरने का काम करेंगे, तो आपके पास <strong>Cash</strong> होना जरूरी है। लोग यह पॉइंट भूल जाते हैं!
               </p>
               <div className="bg-white/10 p-5 rounded-2xl border border-white/20">
                  <span className="text-xs font-black uppercase tracking-widest opacity-60 block mb-2">Minimum Cash Backup</span>
                  <div className="text-4xl font-black text-rose-300">₹25,000 - ₹30,000</div>
                  <p className="text-xs font-bold mt-2 opacity-80 italic">Note: बड़े लेवल के लिए 1 लाख तक भी चाहिए होता है।</p>
               </div>
             </div>
           </div>
        </section>

        {/* --- Final Budget --- */}
        <section className="mb-12">
          <h2 className="text-3xl font-black mb-8 text-center">📊 Final Budget Calculation</h2>
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100">
             <div className="p-8 text-center bg-indigo-600 text-white">
                <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Total Project Cost</p>
                <p className="text-5xl font-black">~ ₹1,00,000</p>
             </div>
             <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                 <h4 className="font-black text-slate-400 text-xs mb-4 uppercase tracking-widest">₹70K Plan (Minimum)</h4>
                 <ul className="space-y-3 font-bold text-slate-700">
                    <li className="flex items-center gap-2"><Check size={16} className="text-indigo-600" /> Laptop</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-indigo-600" /> Printer</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-indigo-600" /> Basic Setup</li>
                 </ul>
               </div>
               <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                 <h4 className="font-black text-indigo-400 text-xs mb-4 uppercase tracking-widest">₹1 Lakh Plan (Full)</h4>
                 <ul className="space-y-3 font-bold text-indigo-900">
                    <li className="flex items-center gap-2"><Check size={16} className="text-indigo-600" /> Full Setup</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-indigo-600" /> Cash Backup</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-indigo-600" /> Proper Furniture</li>
                 </ul>
               </div>
             </div>
          </div>
        </section>

        {/* --- Common Mistakes --- */}
        <section className="mb-16 bg-red-50 p-8 rounded-[2.5rem] border-2 border-dashed border-red-200">
           <h2 className="text-xl font-black text-red-900 mb-6 flex items-center gap-2 uppercase tracking-tight">
             <XCircle className="text-red-500" /> Common Mistakes
           </h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {[
               "बिना प्लान के खर्च करना",
               "पहले दुकान लेना",
               "सस्ता और खराब सामान खरीदना",
               "कैश रिजर्व न रखना"
             ].map((txt, i) => (
               <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-red-100 font-bold text-slate-700">
                 <ArrowRight className="text-red-300" size={16} /> {txt}
               </div>
             ))}
           </div>
        </section>

        {/* --- Conclusion --- */}
        <footer className="text-center">
           <h2 className="text-3xl font-black mb-6">🏁 Conclusion</h2>
           <p className="text-lg font-medium text-slate-600 mb-8 max-w-sm mx-auto">
             सही प्लानिंग के साथ ₹1 लाख में बढ़िया कैफे शुरू किया जा सकता है।
           </p>
           
           <div className="bg-emerald-600 text-white p-8 rounded-[3rem] shadow-2xl shadow-emerald-200">
              <p className="text-2xl font-black mb-2">कमाई: ₹20,000 – ₹50,000/महीना</p>
              <p className="text-sm font-bold opacity-80 uppercase tracking-widest">लोकेशन और सर्विस पर निर्भर</p>
              <div className="mt-8 pt-8 border-t border-white/20 italic font-medium">
                “सफलता महंगे सेटअप से नहीं, सही प्लानिंग से मिलती है।”
              </div>
           </div>
        </footer>

      </main>
    </div>
  );
}