import React from 'react';
import { 
  MapPin, 
  TrendingUp, 
  Building2, 
  GraduationCap, 
  Scale, 
  Store, 
  TrainFront, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  Check,
  AlertTriangle,
  Target
} from 'lucide-react';

export default function LocationGuide() {
  return (
    <div className="min-h-screen bg-neutral-50 text-slate-900 font-sans pb-20">
      
      {/* --- Header --- */}
      <header className="bg-white border-b sticky top-0 z-50 p-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="text-emerald-600 w-6 h-6" />
            <span className="font-black text-lg">Cyber Cafe Location Guide</span>
          </div>
          <div className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
            2X EARNINGS STRATEGY
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        
        {/* --- Hero Section --- */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-8 text-slate-900">
            🚀 इन 5 जगहों पर साइबर कैफे खोलेंगे तो <span className="text-emerald-600 underline decoration-yellow-400">कमाई 2X होगी</span>
          </h1>
          
          <div className="bg-slate-900 text-white p-6 rounded-3xl mb-8 relative overflow-hidden shadow-xl">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/20 blur-3xl rounded-full"></div>
            <p className="text-lg font-medium leading-relaxed mb-4">
              अगर आप 2026 में साइबर कैफे खोलने की सोच रहे हैं, तो सबसे बड़ा सवाल होता है: 
              <span className="text-yellow-400 font-bold block mt-2 text-2xl">👉 दुकान कहाँ खोलें?</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div className="flex items-center gap-2 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                <XCircle className="text-red-400 w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-semibold">गलत लोकेशन = कम कस्टमर</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                <CheckCircle2 className="text-emerald-400 w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-semibold">सही लोकेशन = डबल कमाई</span>
              </div>
            </div>
          </div>

          <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-emerald-500 pl-4">
            बहुत सारे लोग सेटअप पर ध्यान देते हैं, लेकिन लोकेशन को इग्नोर कर देते हैं — और यहीं सबसे बड़ी गलती होती है।
          </p>
        </section>

        {/* --- The 5 Locations --- */}
        <div className="space-y-12">
          
          {/* Location 1 */}
          <section className="relative group">
            <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-200">1</div>
                <h2 className="text-2xl font-black text-slate-800">तहसील / ब्लॉक कार्यालय के पास</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-5 rounded-2xl">
                  <h3 className="font-bold mb-3 flex items-center gap-2"><Building2 className="w-4 h-4 text-blue-600"/> यहाँ क्या काम होता है?</h3>
                  <ul className="text-sm space-y-2 text-slate-700 font-medium">
                    <li>• आय, जाति, निवास प्रमाण पत्र</li>
                    <li>• e-District फॉर्म, पेंशन, किसान KYC</li>
                    <li>• सरकारी योजनाओं के आवेदन</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 p-5 rounded-2xl">
                  <h3 className="font-bold mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-600"/> कमाई का सोर्स:</h3>
                  <p className="text-sm text-slate-700 font-medium">ऑनलाइन फॉर्म, स्कैनिंग, प्रिंटआउट और पासपोर्ट फोटो। यहाँ रोजाना <strong className="text-emerald-700">100+ कस्टमर</strong> तक आ सकते हैं।</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-full w-fit text-sm">
                <CheckCircle2 size={16} /> सरकारी काम = हमेशा डिमांड
              </div>
            </div>
          </section>

          {/* Location 2 */}
          <section className="relative group">
            <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-200">2</div>
                <h2 className="text-2xl font-black text-slate-800">कॉलेज / स्कूल कैंपस के पास</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 p-5 rounded-2xl">
                  <h3 className="font-bold mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-indigo-600"/> यहाँ क्या काम मिलता है?</h3>
                  <ul className="text-sm space-y-2 text-slate-700 font-medium">
                    <li>• एडमिशन और एग्जाम फॉर्म</li>
                    <li>• स्कॉलरशिप, रिज्यूमे, प्रोजेक्ट प्रिंट</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-5 rounded-2xl">
                  <h3 className="font-bold mb-3 flex items-center gap-2 text-amber-700">⚡ खास बात:</h3>
                  <p className="text-sm text-slate-700 font-medium italic">"एडमिशन सीजन में तगड़ी कमाई और एग्जाम टाइम में जबरदस्त भीड़ रहती है।"</p>
                </div>
              </div>
            </div>
          </section>

          {/* Location 3 */}
          <section className="relative group">
            <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-800 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">3</div>
                <h2 className="text-2xl font-black text-slate-800">कोर्ट / कचहरी के पास</h2>
              </div>
              
              <div className="bg-slate-50 p-5 rounded-2xl mb-4">
                <h3 className="font-bold mb-3 flex items-center gap-2"><Scale className="w-4 h-4 text-slate-600"/> हाई-प्रॉफिट काम:</h3>
                <div className="flex flex-wrap gap-2">
                  {["एफिडेविट", "स्टाम्प प्रिंटिंग", "डॉक्यूमेंट टाइपिंग", "स्कैनिंग"].map(tag => (
                    <span key={tag} className="bg-white px-3 py-1 rounded-lg text-xs font-bold border border-slate-200 shadow-sm">{tag}</span>
                  ))}
                </div>
              </div>
              <p className="text-sm font-bold text-slate-500 bg-slate-100 p-3 rounded-xl border border-dashed border-slate-300">
                💡 यहाँ एक काम का चार्ज ज्यादा होता है — कम कस्टमर में भी हाई प्रॉफिट।
              </p>
            </div>
          </section>

          {/* Location 4 & 5 Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Location 4 */}
            <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Store className="text-rose-500" />
                <h2 className="text-xl font-bold">4. मेन मार्केट Area</h2>
              </div>
              <p className="text-sm text-slate-600 mb-4 font-medium">लगातार फुटफॉल की वजह से मार्केटिंग की जरूरत नहीं पड़ती।</p>
              <div className="text-xs space-y-2 bg-rose-50 p-3 rounded-xl border border-rose-100 text-rose-900 font-bold">
                 <div>✅ स्टेबल इनकम</div>
                 <div>✅ हर तरह के कस्टमर</div>
                 <div>✅ टिकट बुकिंग + फोटोकॉपी</div>
              </div>
            </div>

            {/* Location 5 */}
            <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                <TrainFront className="text-blue-500" />
                <h2 className="text-xl font-bold">5. रेलवे स्टेशन के पास</h2>
              </div>
              <p className="text-sm text-slate-600 mb-4 font-medium">इमरजेंसी और फास्ट सर्विस के लिए बेस्ट है।</p>
              <div className="text-xs space-y-2 bg-blue-50 p-3 rounded-xl border border-blue-100 text-blue-900 font-bold">
                 <div>⚡ तत्काल टिकट बुकिंग</div>
                 <div>⚡ इमरजेंसी प्रिंटआउट</div>
                 <div>⚡ हाई कैश फ्लो</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bonus Tips Section --- */}
        <section className="mt-16 bg-white rounded-[2.5rem] p-8 border-2 border-dashed border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
            <Lightbulb className="text-yellow-500 fill-yellow-200" /> 📍 Bonus Tips – लोकेशन चुनते समय ध्यान रखें
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
               <h3 className="font-black text-red-500 uppercase tracking-widest text-xs mb-4">❌ ये गलती न करें</h3>
               {[
                 "सुनसान जगह पर दुकान खोलना",
                 "जहाँ कस्टमर कम आते हों",
                 "सिर्फ सस्ता किराया देखकर फैसला"
               ].map(item => (
                 <div key={item} className="flex items-start gap-2 text-slate-600 font-semibold text-sm">
                   <XCircle className="text-red-400 w-4 h-4 flex-shrink-0 mt-0.5" /> {item}
                 </div>
               ))}
            </div>
            <div className="space-y-4">
               <h3 className="font-black text-emerald-500 uppercase tracking-widest text-xs mb-4">✅ ये जरूर करें</h3>
               {[
                 "जहाँ रोज भीड़ हो वही जगह चुनें",
                 "सरकारी ऑफिस को प्राथमिकता दें",
                 "स्टूडेंट एरिया पर फोकस रखें"
               ].map(item => (
                 <div key={item} className="flex items-start gap-2 text-slate-700 font-bold text-sm">
                   <CheckCircle2 className="text-emerald-500 w-4 h-4 flex-shrink-0 mt-0.5" /> {item}
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* --- Strategy Summary --- */}
        <section className="mt-12 bg-emerald-600 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Target size={120} />
          </div>
          <h2 className="text-2xl font-black mb-6">💡 Beginner के लिए Final Strategy</h2>
          
          <div className="space-y-6 relative z-10">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
              <span className="font-black text-yellow-300 block mb-2 tracking-widest">TOP PRIORITY</span>
              <p className="font-bold text-lg underline decoration-yellow-400 decoration-2 underline-offset-4">तहसील / ब्लॉक कार्यालय या कॉलेज एरिया</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold block mb-1 opacity-60">ALTERNATIVE</span>
                  <p className="font-bold text-sm">मेन मार्केट / रेलवे स्टेशन</p>
               </div>
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold block mb-1 opacity-60">HIGH PROFIT</span>
                  <p className="font-bold text-sm">कोर्ट / कचहरी (Ex. के बाद)</p>
               </div>
            </div>
          </div>
        </section>

        {/* --- Conclusion --- */}
        <footer className="mt-16 text-center">
           <div className="bg-slate-100 inline-block px-10 py-6 rounded-full border border-slate-200">
             <h2 className="text-3xl font-black mb-2 tracking-tight">🏁 Conclusion</h2>
             <p className="text-xl font-bold text-emerald-600 tracking-wide uppercase">
                "लोकेशन सही = बिजनेस सही"
             </p>
           </div>
           <p className="mt-8 text-slate-500 font-medium max-w-sm mx-auto">
             अगर आपने सही जगह चुन ली, तो कस्टमर खुद आएंगे और कमाई ऑटोमेटिक बढ़ेगी।
           </p>
        </footer>

      </main>
    </div>
  );
}