"use client";
import { useState, useEffect, useRef } from "react";

const paragraphs = [
  {
    id: 1,
    icon: "📋",
    label: "General Purpose",
    text: "The information provided on Sevaupdates.com is published for general informational and educational purposes only...",
  },
  {
    id: 2,
    icon: "⚖️",
    label: "Accuracy & Liability",
    text: "While we try our best to keep the information accurate...",
    accent: "warning",
  },
  {
    id: 3,
    icon: "🛡️",
    label: "No Responsibility",
    text: "Sevaupdates.com will not be responsible for any loss...",
    accent: "danger",
  },
  {
    id: 4,
    icon: "📰",
    label: "Sources of Information",
    text: "All information published on this website is collected...",
  },
  {
    id: 5,
    icon: "🏛️",
    label: "Not a Government Website",
    text: "This website is not a government website...",
    accent: "info",
  },
  {
    id: 6,
    icon: "✉️",
    label: "Report Incorrect Information",
    text: "If you find any incorrect information...",
  },
];

const accentMap = {
  warning: "border-yellow-400/40 bg-yellow-400/10",
  danger: "border-red-400/40 bg-red-400/10",
  info: "border-blue-400/40 bg-blue-400/10",
  default: "border-amber-500/30 bg-amber-500/10",
};

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function ParagraphCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const accent = accentMap[item.accent] || accentMap.default;

  return (
    <div
      ref={ref}
      className={`flex rounded-xl border backdrop-blur-md shadow-sm transition-all duration-500 ${accent}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-24px)",
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {/* Accent bar */}
      <div className="w-1 bg-amber-500" />

      <div className="p-6 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{item.icon}</span>
          <span className="font-semibold text-base text-amber-700">
            {item.label}
          </span>
          <span className="ml-auto text-[10px] font-mono text-gray-400">
            § {String(item.id).padStart(2, "0")}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-gray-700">
          {item.text}
        </p>
      </div>
    </div>
  );
}

export default function DisclaimerPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0e8] via-[#ede5d6] to-[#e5dac8] px-5 py-12">

      <div className="max-w-3xl mx-auto">

        {/* Hero */}
        <header
          className={`text-center mb-10 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-amber-400/40 bg-amber-400/20 text-amber-700 text-xs italic tracking-widest mb-4">
            Legal Notice · Sevaupdates.com
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
            Disclaimer & <span className="text-amber-600 italic">Liability</span>
          </h1>

          <p className="text-sm text-gray-500 italic mt-2">
            Please read carefully before using this website
          </p>
        </header>

        {/* Divider */}
        <div
          className={`flex items-center gap-3 mb-8 transition-opacity duration-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <div className="w-2 h-2 bg-amber-500 rounded-full" />
          <div className="w-2 h-2 bg-amber-500 rotate-45" />
          <div className="w-2 h-2 bg-amber-500 rounded-full" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {paragraphs.map((item, i) => (
            <ParagraphCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Footer */}
        <div
          className={`mt-10 text-center transition-opacity duration-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="inline-flex flex-col items-center gap-2 bg-black/80 border border-amber-400/40 rounded-xl px-8 py-5 backdrop-blur-md">
            <div className="text-amber-500 font-serif text-xl font-bold">
              Sevaupdates.com
            </div>
            <div className="text-xs text-gray-400 italic">
              Private Digital Information Portal · Not a Government Website
            </div>

            <div className="flex gap-2 flex-wrap justify-center mt-1">
              <span className="text-[10px] px-2 py-1 border border-amber-400/30 rounded-full text-amber-400 uppercase">
                Informational Only
              </span>
              <span className="text-[10px] px-2 py-1 border border-amber-400/30 rounded-full text-amber-400 uppercase">
                No Official Affiliation
              </span>
              <span className="text-[10px] px-2 py-1 border border-amber-400/30 rounded-full text-amber-400 uppercase">
                Verify Before Acting
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}