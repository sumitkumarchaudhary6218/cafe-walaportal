"use client";
import React from 'react';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Info, 
  ShieldCheck, 
  Search,
  Clock,
  ArrowRight,
  Check
} from 'lucide-react';

export default function TECInfoGuide() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 p-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-700">
            <Award className="w-6 h-6" />
            <span className="font-black text-lg">TEC Certificate Hub</span>
          </div>
          <div className="bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Complete Guide
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        
        {/* Hero */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-8">
            🧾 TEC Certificate <span className="text-blue-600">क्या है और कैसे प्राप्त करें?</span>
          </h1>

          <div className="bg-white p-6 rounded-[2rem] border shadow-sm text-lg text-slate-600 mb-8 leading-relaxed">
            <p className="mb-4">
              👉 अगर आप <strong>घर बैठे कमाई करना चाहते हैं</strong> या <strong>CSC Center खोलना चाहते हैं</strong>, 
              तो TEC Certificate आपके लिए बहुत जरूरी है।
            </p>
            <p className="mb-4">
              लेकिन सवाल ये है — <strong>TEC क्या है?</strong>, <strong>कैसे बनता है?</strong>, और 
              <strong>क्या ये जरूरी है?</strong>
            </p>
            <p className="font-bold text-blue-700">
              💡 इस गाइड में आपको पूरी जानकारी मिलेगी — आसान भाषा में।
            </p>
          </div>

          {/* Why Guide */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-6 rounded-3xl mb-10 border">
            <h3 className="font-black text-xl mb-4 text-blue-700">
              📌 यह गाइड आपके लिए क्यों जरूरी है?
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              <li>✔ CSC शुरू करने वालों के लिए पूरी जानकारी</li>
              <li>✔ Step-by-step process</li>
              <li>✔ Exam + Registration guide</li>
              <li>✔ Practical earning tips</li>
            </ul>
          </div>

          {/* TEC Info */}
          <div className="bg-blue-600 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><Info size={120} /></div>
            <h2 className="text-2xl font-bold mb-4 relative z-10">
              🎯 TEC Certificate क्या होता है?
            </h2>
            <p className="text-blue-100 mb-6 relative z-10 leading-relaxed">
              TEC (Telecentre Entrepreneur Course) एक certification program है 
              जो आपको डिजिटल सेवाओं के लिए तैयार करता है।
              <br /><br />
              👉 यह खासकर उन लोगों के लिए है जो CSC के माध्यम से 
              <strong> online services और digital business शुरू करना चाहते हैं।</strong>
            </p>
            <div className="bg-white/10 p-5 rounded-2xl font-black">
              👉 TEC Certificate = CSC ID लेने की पहली step
            </div>
          </div>
        </section>

        {/* Scroll Hook */}
        <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-2xl text-center mb-10">
          <p className="font-black text-yellow-800 text-lg">
            🤔 क्या आप जानते हैं?
          </p>
          <p className="text-sm text-yellow-700 mt-2">
            बिना TEC Certificate के आप CSC ID के लिए apply नहीं कर सकते।
          </p>
        </div>

        {/* Objectives */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6">🔥 इस कोर्स में क्या सिखाया जाता है?</h2>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "CSC क्या है और कैसे काम करता है",
                "Online services कैसे दें",
                "Form filling process",
                "Customer dealing skills"
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-slate-50 p-4 rounded-xl font-bold">
                  <CheckCircle2 className="text-blue-500 w-5 h-5" /> {item}
                </div>
              ))}
            </div>

            <div className="mt-8 bg-indigo-50 p-5 rounded-2xl">
              <p className="font-bold text-indigo-800">🔥 Pro Tip:</p>
              <p className="text-sm mt-2">
                आप CSC से ₹10,000 से ₹50,000 महीना कमा सकते हैं।
              </p>
            </div>
          </div>
        </section>

        {/* Fees */}
        <section className="mb-12">
          <div className="bg-white p-8 rounded-3xl flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black">💰 TEC Certificate Fee</h2>
              <p className="text-xs mt-2 text-slate-500">
                ⚠️ यह फीस non-refundable है
              </p>
            </div>
            <div className="bg-black text-white px-6 py-4 rounded-2xl text-2xl font-black">
              ₹1479
            </div>
          </div>
        </section>

        {/* Registration */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6">📝 Registration Process</h2>
          <div className="space-y-4">
            {[
              "Official website पर जाएं",
              "Details भरें",
              "₹1479 payment करें",
              "PDF download करें"
            ].map((step, i) => (
              <div key={i} className="bg-white p-5 rounded-xl flex gap-4 shadow">
                <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                  {i + 1}
                </div>
                <p className="font-bold">{step}</p>
              </div>
            ))}
          </div>

          <div className="bg-green-50 p-5 rounded-2xl mt-6">
            <p className="font-bold text-green-800">💡 Important:</p>
            <p className="text-sm mt-2">
              नाम और मोबाइल नंबर सही भरें — यही certificate में आएगा।
            </p>
          </div>
        </section>

        {/* Exam */}
        <section className="mb-12">
          <div className="bg-white p-8 rounded-3xl">
            <h2 className="text-xl font-black mb-4">📚 Exam Details</h2>
            <ul className="space-y-2 font-bold text-sm">
              <li>✔ Online MCQ exam</li>
              <li>✔ Easy level</li>
              <li>✔ Pass करना जरूरी</li>
            </ul>

            <p className="mt-6 text-sm font-bold">
              🎯 Exam बहुत आसान होता है अगर आपने PDF पढ़ी है।
            </p>
          </div>
        </section>

        {/* CSC Apply */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6">🏢 CSC ID Apply</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            {[
              "Website",
              "Form Fill",
              "Verification"
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow">
                <p className="font-black">{item}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-100 p-6 rounded-2xl text-center mt-6">
            <p className="font-black text-blue-800">
              🚀 TEC मिलने के बाद तुरंत apply करें
            </p>
          </div>

          <div className="mt-6 flex gap-3 items-center bg-amber-50 p-5 rounded-2xl">
            <Clock className="text-amber-500" />
            <p className="text-sm font-bold">
              Verification में कुछ दिन लग सकते हैं।
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20">
          <div className="bg-slate-900 text-white p-10 rounded-[3rem] text-center">
            <h2 className="text-3xl font-black mb-6">🚀 Conclusion</h2>
            <p className="text-slate-400 mb-6">
              अगर आप digital business शुरू करना चाहते हैं, 
              तो TEC आपका पहला step है।
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {["Register", "Read PDF", "Pass Exam", "Get CSC ID"].map((txt, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-xl font-bold flex gap-2 items-center">
                  <CheckCircle2 className="text-blue-400" /> {txt}
                </div>
              ))}
            </div>

            <p className="text-blue-400 font-black text-lg">
              👉 आज ही शुरुआत करें
            </p>
          </div>
        </footer>

      </main>
    </div>
  );
}