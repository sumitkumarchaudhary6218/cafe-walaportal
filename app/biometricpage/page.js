"use client";
import { useState } from "react";

const features = [
  { label: "Driver Setup", mantra: "एक ही Driver", morpho: "अलग-अलग Driver" },
  { label: "उपयोग", mantra: "बहुत आसान", morpho: "थोड़ा कठिन" },
  { label: "कीमत", mantra: "₹2700–₹3000", morpho: "₹4500–₹5000" },
  { label: "Beginner Friendly", mantra: "✅ हाँ", morpho: "❌ नहीं" },
  { label: "PAN Card", mantra: "✅ एक driver से", morpho: "❌ अलग driver" },
  { label: "eKYC / AEPS", mantra: "✅ एक driver से", morpho: "❌ अलग driver" },
];

const mantraFeatures = [
  "सिर्फ एक ही Driver Install करना होता है",
  "PAN Card Apply, eKYC, Pension, Farmer KYC सब एक driver से",
  "AEPS Withdrawal बिना किसी परेशानी के",
  "Beginners के लिए Perfect Setup",
  "Time और दिमाग दोनों बचता है",
];

const morphoIssues = [
  "हर काम के लिए अलग-अलग Driver",
  "PAN Card के लिए अलग driver",
  "e-Shram के लिए अलग driver",
  "AEPS के लिए अलग driver",
  "बार-बार setup करना पड़ता है",
];

const steps = [
  { icon: "🛒", title: "सही Device लें", desc: "Mantra Device खरीदें — सस्ता और आसान" },
  { icon: "💻", title: "Driver Install करें", desc: "सिर्फ एक बार install करें, सब ready" },
  { icon: "👥", title: "ज्यादा Customer", desc: "Fast work से ज्यादा customers आएंगे" },
  { icon: "💸", title: "अच्छी कमाई", desc: "ज्यादा income, बिना tension के" },
];

export default function BiometricPage() {
  const [activeTab, setActiveTab] = useState("mantra");

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
        body { font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; }
        .glow-green { box-shadow: 0 0 30px rgba(34,197,94,0.25), 0 0 60px rgba(34,197,94,0.1); }
        .glow-red { box-shadow: 0 0 30px rgba(239,68,68,0.2), 0 0 60px rgba(239,68,68,0.08); }
        .card-glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
        .badge-pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        .grid-bg { background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 40px 40px; }
        .shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); background-size: 200%; animation: shimmer 2.5s infinite; }
        @keyframes shimmer { 0%{background-position:200%} 100%{background-position:-200%} }
        .tab-active { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; }
        .tab-inactive { background: rgba(255,255,255,0.06); color: #9ca3af; }
        .float { animation: float 3s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>

      {/* Hero Section */}
      <section className="relative grid-bg pt-16 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 badge-pulse tracking-widest uppercase">
            2026 Guide • Cyber Cafe
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5 tracking-tight">
            Best{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              Biometric Device
            </span>
            <br />
            Cyber Cafe के लिए
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Mantra vs Morpho — कौन सा device आपके Jan Seva Kendra या CSC Center के लिए सबसे बेहतर है? पूरी जानकारी यहाँ।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://fktr.in/iEJHstc"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 glow-green text-base"
            >
              🛒 Mantra Device खरीदें
            </a>
            <a
              href="#compare"
              className="border border-white/20 hover:border-white/40 text-white px-8 py-3.5 rounded-xl transition-all duration-200 hover:bg-white/5 text-base"
            >
              📊 Comparison देखें
            </a>
          </div>
        </div>
      </section>

      {/* Device Cards */}
      <section className="py-14 px-4" id="compare">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            दोनों Devices की{" "}
            <span className="text-green-400">तुलना</span>
          </h2>

          {/* Tab Switcher */}
          <div className="flex gap-3 justify-center mb-8">
            <button
              onClick={() => setActiveTab("mantra")}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${activeTab === "mantra" ? "tab-active" : "tab-inactive"}`}
            >
              🟢 Mantra Device
            </button>
            <button
              onClick={() => setActiveTab("morpho")}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${activeTab === "morpho" ? "bg-red-500/80 text-white" : "tab-inactive"}`}
            >
              🔴 Morpho Device
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "mantra" && (
            <div className="card-glass rounded-2xl p-6 sm:p-8 glow-green mb-8 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-3xl float">🟢</span>
                    <h3 className="text-2xl font-bold text-green-400">Mantra Device</h3>
                    <span className="bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full border border-green-500/30 font-semibold">RECOMMENDED</span>
                  </div>
                  <p className="text-gray-400 text-sm">Cyber Cafe के लिए #1 Choice</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-green-400">₹2,700</div>
                  <div className="text-gray-400 text-sm">से शुरू</div>
                </div>
              </div>
              <ul className="space-y-3">
                {mantraFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-200">
                    <span className="mt-0.5 text-green-400 text-lg flex-shrink-0">✅</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  href="https://fktr.in/iEJHstc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 hover:bg-green-400 text-black font-bold px-7 py-3 rounded-xl transition-all duration-200 hover:scale-105 shimmer w-full sm:w-auto text-center"
                >
                  🛒 अभी खरीदें – Best Price
                </a>
              </div>
            </div>
          )}

          {activeTab === "morpho" && (
            <div className="card-glass rounded-2xl p-6 sm:p-8 glow-red mb-8 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-3xl">🔴</span>
                    <h3 className="text-2xl font-bold text-red-400">Morpho Device</h3>
                    <span className="bg-red-500/20 text-red-300 text-xs px-3 py-1 rounded-full border border-red-500/30 font-semibold">NOT RECOMMENDED</span>
                  </div>
                  <p className="text-gray-400 text-sm">Beginners के लिए नहीं</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-red-400">₹4,500</div>
                  <div className="text-gray-400 text-sm">से शुरू</div>
                </div>
              </div>
              <ul className="space-y-3">
                {morphoIssues.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-300">
                    <span className="mt-0.5 text-red-400 text-lg flex-shrink-0">❌</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  href="https://fktr.in/RZoyqGW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 font-semibold px-7 py-3 rounded-xl transition-all duration-200 w-full sm:w-auto text-center"
                >
                  🛒 Morpho Device Link
                </a>
              </div>
            </div>
          )}

          {/* Comparison Table */}
          <div className="card-glass rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10">
              <h3 className="font-bold text-lg">📊 Full Comparison Table</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left px-5 py-3 text-gray-400 font-semibold">Feature</th>
                    <th className="text-center px-5 py-3 text-green-400 font-semibold">🟢 Mantra</th>
                    <th className="text-center px-5 py-3 text-red-400 font-semibold">🔴 Morpho</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((row, i) => (
                    <tr key={i} className={`border-t border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                      <td className="px-5 py-3 text-gray-300 font-medium">{row.label}</td>
                      <td className="px-5 py-3 text-center text-green-300">{row.mantra}</td>
                      <td className="px-5 py-3 text-center text-red-300">{row.morpho}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 px-4 bg-white/[0.02] border-y border-white/05">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
            सही Device = अच्छी{" "}
            <span className="text-green-400">कमाई</span>
          </h2>
          <p className="text-center text-gray-400 mb-10">4 आसान steps में अपना Cyber Cafe बढ़ाएं</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="card-glass rounded-2xl p-5 text-center hover:border-green-500/30 transition-all duration-200 group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200 inline-block">{s.icon}</div>
                <div className="text-xs text-green-400 font-bold mb-1 tracking-wider uppercase">Step {i + 1}</div>
                <h4 className="font-bold text-base mb-2">{s.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card-glass rounded-3xl p-8 sm:p-12 glow-green relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-transparent pointer-events-none rounded-3xl" />
            <div className="relative z-10">
              <div className="text-5xl mb-4">🏆</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                Final Verdict
              </h2>
              <p className="text-gray-300 mb-2 text-base">
                नए Cyber Cafe के लिए सिर्फ एक सही choice:
              </p>
              <div className="text-4xl font-extrabold text-green-400 mb-2">Mantra Device</div>
              <p className="text-gray-400 text-sm mb-8">आसान • सस्ता • सभी काम एक driver से</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://fktr.in/iEJHstc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 text-base glow-green"
                >
                  🛒 Mantra Device खरीदें
                </a>
                <a
                  href="https://fktr.in/RZoyqGW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl transition-all duration-200 hover:bg-white/5 text-base"
                >
                  Morpho Device Link
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-gray-500 text-sm">
        <p>© 2026 Cyber Cafe Guide • Jan Seva Kendra & CSC Center के लिए</p>
        <p className="mt-1 text-xs">ऊपर दिए गए links affiliate links हो सकते हैं</p>
      </footer>
    </div>
  );
}