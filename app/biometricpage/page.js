import React from 'react';
import { 
  Fingerprint, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ShoppingBag, 
  ArrowRight, 
  Star,
  Info,
  BadgeIndianRupee
} from 'lucide-react';

export default function BiometricGuide() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      
      {/* --- Sticky Header --- */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 p-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fingerprint className="text-blue-600 w-6 h-6" />
            <span className="font-bold text-lg hidden sm:block">Cyber Cafe Guide</span>
          </div>
          <div className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase tracking-wider">
            Edition 2026
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        
        {/* --- Hero Section --- */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-6 text-slate-800">
            💻 Cyber Cafe के लिए <span className="text-blue-600">Best Biometric Device 2026</span> | Mantra vs Morpho Full Guide
          </h1>
          
          <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-lg mb-8 flex items-start gap-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <Info className="w-6 h-6" />
            </div>
            <p className="text-lg font-medium leading-relaxed">
              📢 अगर आप भी Cyber Cafe चलाते हैं तो ये आर्टिकल आपके लिए बहुत जरूरी है!
            </p>
          </div>

          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            दोस्तों, अगर आप एक Cyber Cafe, CSC Center या Jan Seva Kendra चलाते हैं या खोलने की सोच रहे हैं, तो आज का ये आर्टिकल आपके लिए बहुत ही काम का होने वाला है। आज हम बात करने वाले हैं कि आपके Cyber Cafe के लिए सबसे <strong>Best Biometric Fingerprint Device</strong> कौन सा रहेगा।
          </p>
        </section>

        {/* --- Market Overview --- */}
        <section className="mb-12 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            🔍 भारत में कौन-कौन सी Biometric Device Companies आती हैं?
          </h2>
          <p className="text-slate-600 mb-6">भारत में मुख्य रूप से अनेक कंपनियां आती हैं, लेकिन आज हम केवल उन दो कंपनियों पर फोकस करेंगे जो सबसे ज्यादा मार्केट में चलती हैं:</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-100 rounded-xl font-bold text-center border-2 border-transparent hover:border-blue-500 transition-all cursor-default text-xl">
              👉 Mantra
            </div>
            <div className="p-4 bg-slate-100 rounded-xl font-bold text-center border-2 border-transparent hover:border-blue-500 transition-all cursor-default text-xl">
              👉 Morpho
            </div>
          </div>
        </section>

        {/* --- Mantra Section (Green Theme) --- */}
        <section className="mb-10">
          <div className="bg-emerald-50 border-2 border-emerald-500 rounded-3xl overflow-hidden shadow-md">
            <div className="bg-emerald-500 text-white p-4 flex items-center gap-2">
               <CheckCircle2 className="w-6 h-6" />
               <h2 className="text-xl font-bold">🟢 Mantra Biometric Device – क्यों है बेस्ट?</h2>
            </div>
            <div className="p-6">
              <p className="font-semibold text-emerald-800 mb-6 text-lg italic">"Mantra Device Cyber Cafe वालों के लिए सबसे ज्यादा आसान और उपयोगी है।"</p>
              
              <h3 className="font-bold text-lg mb-4 text-emerald-900 underline decoration-emerald-200 underline-offset-4">✅ Mantra Device की खास बातें:</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "सिर्फ एक ही Driver Install करना होता है",
                  "एक बार install किया = सभी काम ready",
                  "PAN Card Apply, eKYC, AEPS Withdrawal — सब काम एक ही driver से",
                  "Beginner और नए Cyber Cafe वालों के लिए Perfect"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-medium text-slate-700">
                    <span className="text-emerald-500 mt-1">✔️</span> {item}
                  </li>
                ))}
              </ul>

              <div className="bg-white p-4 rounded-xl border border-emerald-100 inline-flex items-center gap-3">
                <BadgeIndianRupee className="text-emerald-600" />
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400">अनुमानित कीमत</p>
                  <p className="text-2xl font-black text-emerald-700">₹2700 - ₹3000</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Morpho Section (Red Theme) --- */}
        <section className="mb-12">
          <div className="bg-rose-50 border-2 border-rose-500 rounded-3xl overflow-hidden shadow-md">
            <div className="bg-rose-500 text-white p-4 flex items-center gap-2">
               <AlertCircle className="w-6 h-6" />
               <h2 className="text-xl font-bold">🔴 Morpho Biometric Device – जटिल और महंगा</h2>
            </div>
            <div className="p-6">
              <p className="text-rose-800 mb-6 font-medium">इसमें कुछ दिक्कतें हैं जो नए लोगों के लिए परेशानी बन सकती हैं।</p>
              
              <h3 className="font-bold text-lg mb-4 text-rose-900">❌ Morpho Device की समस्याएं:</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "हर काम के लिए अलग-अलग Driver Install करना पड़ता है",
                  "PAN Card के लिए अलग, e-Shram के लिए अलग",
                  "AEPS के लिए अलग setup",
                  "बार-बार setup करना पड़ता है"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-medium text-slate-700">
                    <span className="text-rose-500 mt-1">❌</span> {item}
                  </li>
                ))}
              </ul>

              <div className="bg-white p-4 rounded-xl border border-rose-100 inline-flex items-center gap-3">
                <BadgeIndianRupee className="text-rose-600" />
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400 text-rose-300">अनुमानित कीमत</p>
                  <p className="text-2xl font-black text-rose-700">₹4500 - ₹5000</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Comparison Table --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            ⚖️ Mantra vs Morpho – कौन सा बेहतर है?
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="p-4 font-bold border-b border-slate-700">Feature</th>
                  <th className="p-4 font-bold border-b border-slate-700">Mantra</th>
                  <th className="p-4 font-bold border-b border-slate-700">Morpho</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-bold bg-slate-50">Driver</td>
                  <td className="p-4 text-emerald-600 font-semibold">एक ही driver</td>
                  <td className="p-4 text-rose-600 font-semibold">अलग-अलग driver</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold bg-slate-50">Use</td>
                  <td className="p-4">आसान</td>
                  <td className="p-4">थोड़ा कठिन</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold bg-slate-50">Price</td>
                  <td className="p-4 font-bold">सस्ता</td>
                  <td className="p-4 font-bold">महंगा</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold bg-slate-50">Beginner Friendly</td>
                  <td className="p-4 text-emerald-600 font-bold">✅ हाँ</td>
                  <td className="p-4 text-rose-600 font-bold">❌ नहीं</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Recommendation Card --- */}
        <section className="mb-12 bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-yellow-400">
              <Star className="fill-yellow-400" />🏆 Final Recommendation
            </h2>
            <p className="text-xl mb-6">अगर आप नया Cyber Cafe खोल रहे हैं, तो मेरी साफ सलाह है:</p>
            <div className="text-4xl font-black text-center mb-8 py-4 border-y border-white/10 tracking-tight">
              👉 <span className="text-blue-400">Mantra Device</span> ही लें
            </div>
            
            <div className="space-y-4">
              {["आसान है", "सस्ता है", "सभी काम एक ही driver से", "टाइम और दिमाग दोनों बचता है"].map((text, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="text-blue-400 w-5 h-5 flex-shrink-0" />
                  <span className="font-semibold">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Links --- */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">🔗 Buy Link</h2>
          <div className="space-y-4">
            <a href="https://fktr.in/iEJHstc" target="_blank" rel="noopener noreferrer" 
               className="flex items-center justify-between p-5 bg-white border-2 border-emerald-500 rounded-2xl hover:bg-emerald-50 transition-all group">
              <div className="flex items-center gap-4">
                <ShoppingBag className="text-emerald-500 w-6 h-6" />
                <span className="text-lg font-bold">Mantra Device Buy Link</span>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a href="https://fktr.in/RZoyqGW" target="_blank" rel="noopener noreferrer" 
               className="flex items-center justify-between p-5 bg-white border-2 border-rose-500 rounded-2xl hover:bg-rose-50 transition-all group">
              <div className="flex items-center gap-4">
                <ShoppingBag className="text-rose-500 w-6 h-6" />
                <span className="text-lg font-bold">Morpho Device Buy Link</span>
              </div>
              <ArrowRight className="w-5 h-5 text-rose-500 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* --- Expert Advice --- */}
        <section className="mb-12 bg-yellow-50 p-8 rounded-3xl border-2 border-dashed border-yellow-400">
           <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            💡 New Cyber Cafe वालों के लिए जरूरी सलाह
           </h2>
           <p className="text-slate-700 mb-6 leading-relaxed">अगर आप अभी नया Cyber Cafe या Jan Seva Kendra खोलने की सोच रहे हैं, तो शुरुआत में सही device लेना बहुत जरूरी है।</p>
           <div className="space-y-3 font-black text-xl text-slate-800">
             <div className="flex items-center gap-2">👉 सही device = <span className="text-blue-600 underline">Fast work</span></div>
             <div className="flex items-center gap-2">👉 Fast work = <span className="text-blue-600 underline">ज्यादा customer</span></div>
             <div className="flex items-center gap-2">👉 ज्यादा customer = <span className="text-blue-600 underline text-2xl font-black">ज्यादा income 💰</span></div>
           </div>
        </section>

        {/* --- Conclusion --- */}
        <footer className="text-center bg-white p-10 rounded-[3rem] shadow-inner border border-slate-100">
           <h2 className="text-2xl font-black mb-6">🚀 Conclusion</h2>
           <div className="max-w-xs mx-auto text-left space-y-3 mb-8 text-slate-600 font-medium">
             <p>• कौन सा Biometric Device Best है</p>
             <p>• Mantra और Morpho में क्या अंतर है</p>
             <p>• कौन सा device ज्यादा फायदेमंद रहेगा</p>
           </div>
           
           <div className="inline-block bg-emerald-100 text-emerald-700 px-8 py-4 rounded-2xl font-black text-xl mb-10 ring-4 ring-emerald-50">
            Final Verdict: Mantra Device ✅
           </div>

           <div className="border-t pt-8">
             <h3 className="text-xl font-bold mb-4">📢 Last Words</h3>
             <p className="text-slate-600 leading-relaxed mb-6 font-medium">तो दोस्तों, अगर आप भी अपने Jan Seva Kendra या Cyber Cafe को आगे बढ़ाना चाहते हैं, तो सही decision लीजिए और काम को आसान बनाइए।</p>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-bold text-slate-800">
                <div className="p-3 bg-slate-100 rounded-lg">👉 सही tool इस्तेमाल करें</div>
                <div className="p-3 bg-slate-100 rounded-lg">👉 ज्यादा काम करें</div>
                <div className="p-3 bg-blue-600 text-white rounded-lg shadow-md shadow-blue-200">👉 अच्छी कमाई करें 💸</div>
             </div>
           </div>
        </footer>

      </main>
    </div>
  );
}