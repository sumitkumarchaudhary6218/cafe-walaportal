import React from 'react';
import { CheckCircle2, Lightbulb, ShoppingCart, Smartphone, Info, Printer } from 'lucide-react';

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-10">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 p-4 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Printer className="text-blue-600" />
          <h1 className="text-xl font-bold">Cyber Cafe Guide 2026</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        
        {/* Intro Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-extrabold mb-6 leading-tight">
            साइबर कैफे के लिए बेस्ट फोटो पेपर कौन सा लें? <span className="text-blue-600">(Beginner Guide 2026)</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            अगर आप एक नया साइबर कैफे खोलने की सोच रहे हैं या अभी-अभी शुरू किया है, तो यह आर्टिकल आपके लिए बहुत ही महत्वपूर्ण होने वाला है। क्योंकि साइबर कैफे में सबसे ज्यादा जो काम होता है, वह है फोटो प्रिंटिंग और फोटोकॉपी।
          </p>
        </section>

        {/* Questions Section */}
        <section className="bg-blue-50 p-6 rounded-2xl mb-10 border border-blue-100">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Info className="text-blue-600" /> अब सवाल यह आता है कि:
          </h3>
          <ul className="space-y-3">
            {["कौन सा फोटो पेपर लें?", "कौन सी कंपनी बेस्ट है?", "कितने GSM का पेपर सही रहेगा?", "ऑनलाइन खरीदें या ऑफलाइन?"].map((q, i) => (
              <li key={i} className="flex items-start gap-3 text-lg font-medium">
                <span className="text-xl">👉</span> {q}
              </li>
            ))}
          </ul>
        </section>

        {/* Product Recommendation Section */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📸</span>
            <h2 className="text-2xl font-bold">साइबर कैफे के लिए बेस्ट फोटो पेपर (Beginner के लिए)</h2>
          </div>
          <p className="text-gray-700 mb-6">
            अगर आप बिल्कुल नए हैं, तो शुरुआत में आपको क्वालिटी पर ज्यादा ध्यान देना चाहिए। क्योंकि कस्टमर पहली बार में ही आपकी सर्विस से खुश हो गया, तो वह बार-बार आपके पास ही आएगा।
          </p>

          <div className="bg-white p-6 rounded-2xl border-2 border-green-500 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                BEST CHOICE
             </div>
             <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
               <CheckCircle2 /> Prisma Jet Photo Paper
             </h3>
             <p className="font-medium text-lg mb-4">शुरुआत के लिए मैं आपको सलाह दूंगा कि आप Prisma Jet कंपनी का फोटो पेपर लें।</p>
             
             <div className="space-y-3">
               <p className="font-bold text-lg flex items-center gap-2 underline decoration-yellow-400">
                👉 क्यों Prisma Jet?
               </p>
               <ul className="list-disc ml-6 space-y-2 text-gray-800 font-medium">
                 <li>बहुत ही शानदार प्रिंट क्वालिटी</li>
                 <li>कलर आउटपुट काफी शार्प और क्लियर</li>
                 <li>पासपोर्ट साइज फोटो और फुल साइज फोटो दोनों के लिए बेस्ट</li>
                 <li>कस्टमर को प्रीमियम फील देता है</li>
               </ul>
             </div>
          </div>
        </section>

        {/* GSM Section */}
        <section className="mb-10 bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            📦 कौन सा GSM लें?
          </h3>
          <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
             <p className="text-xl font-bold text-orange-600">👉 254 GSM Photo Paper (Highly Recommended)</p>
          </div>
          <ul className="space-y-3 font-medium text-gray-700">
            <li className="flex gap-2"><span>•</span> फोटो मोटा और मजबूत निकलता है</li>
            <li className="flex gap-2"><span>•</span> कलर ज्यादा ब्राइट और आकर्षक दिखता है</li>
            <li className="flex gap-2"><span>•</span> फोटो देखने में प्रोफेशनल लगता है</li>
          </ul>

          <div className="mt-6">
            <h4 className="text-xl font-bold flex items-center gap-2 mb-3">
              💰 प्राइस (लगभग)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 uppercase tracking-wide">ऑफलाइन मार्केट</p>
                <p className="text-2xl font-bold">₹230 के आसपास</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 uppercase tracking-wide">ऑनलाइन</p>
                <p className="text-2xl font-bold">₹250 – ₹350 तक</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Advice Card */}
        <section className="bg-gray-900 text-white p-8 rounded-3xl shadow-2xl relative">
          <div className="absolute -top-4 -left-2 bg-pink-500 p-2 rounded-lg rotate-[-10deg]">
            <span className="text-2xl">🧠</span>
          </div>
          <h2 className="text-2xl font-bold mb-6">Final Advice (Beginners के लिए खास टिप)</h2>
          
          <p className="mb-6 text-gray-300">अगर आप नया साइबर कैफे खोल रहे हैं, तो याद रखें:</p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-blue-400" />
              <p className="text-lg font-semibold">शुरुआत में क्वालिटी से समझौता न करें</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-blue-400" />
              <p className="text-lg font-semibold">अच्छा फोटो पेपर = ज्यादा कस्टमर</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-blue-400" />
              <p className="text-lg font-semibold">अच्छा प्रिंट = ज्यादा कमाई</p>
            </div>
          </div>

          <div className="bg-white/10 p-5 rounded-2xl border border-white/20">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-yellow-400">
              👉 Best Combo:
            </h3>
            <ul className="space-y-3 font-medium">
              <li className="flex gap-2">
                <span className="text-yellow-400">•</span> 
                <span>Photo Paper: <strong className="text-white">Prisma Jet 254 GSM</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-400">•</span> 
                <span>Xerox Paper: <strong className="text-white">Century 75 GSM</strong></span>
              </li>
            </ul>
          </div>
        </section>

      </main>
    </div>
  );
}