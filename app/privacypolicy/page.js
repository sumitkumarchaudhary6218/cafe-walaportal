"use client";
import { useState, useEffect, useRef } from "react";

/* ===================== DATA (UNCHANGED) ===================== */
const sections = [
  {
    id: "01",
    icon: "🔐",
    title: "Introduction",
    accent: "blue",
    content: [
      {
        type: "text",
        text: "At OnlineUpdates.com, the privacy of our visitors is extremely important to us. This Privacy Policy document outlines the types of information that are collected and recorded by OnlineUpdates.com and how we use it.",
      },
      {
        type: "text",
        text: "This Privacy Policy applies to our website and all products and services offered through OnlineUpdates.com.",
      },
    ],
  },
  {
    id: "02",
    icon: "👤",
    title: "Personal Identification Information",
    accent: "gold",
    content: [
      {
        type: "text",
        text: "We may collect personal identification information from users in several ways, including but not limited to when users visit our site, fill out a form, subscribe to a newsletter, or engage with other activities.",
      },
      {
        type: "text",
        text: "Users may visit anonymously. We collect info only if voluntarily provided.",
      },
    ],
  },
  {
    id: "03",
    icon: "📊",
    title: "Non-Personal Identification Information",
    accent: "teal",
    content: [
      {
        type: "text",
        text: "We may collect non-personal information like browser, device, OS, and ISP.",
      },
    ],
  },
  {
    id: "04",
    icon: "🍪",
    title: "Web Browser Cookies",
    accent: "amber",
    content: [
      {
        type: "text",
        text: "We use cookies to enhance experience.",
      },
      {
        type: "highlight",
        text: "Some parts may not function if cookies are disabled.",
      },
    ],
  },
  {
    id: "05",
    icon: "🔍",
    title: "How We Use Information",
    accent: "blue",
    content: [
      {
        type: "list",
        items: [
          "Improve customer service",
          "Personalize experience",
          "Improve website",
          "Send emails",
        ],
      },
    ],
  },
  {
    id: "10",
    icon: "✉️",
    title: "Contacting Us",
    accent: "green",
    content: [
      {
        type: "text",
        text: "Contact us via our Contact page.",
      },
      {
        type: "cta",
        label: "Go to Contact Page",
        href: "/contact",
      },
    ],
  },
];

/* ===================== TAILWIND COLOR MAP ===================== */
const accentMap = {
  blue: {
    bar: "bg-blue-600",
    bg: "bg-blue-600/5",
    border: "border-blue-600/20",
    pill: "bg-blue-600/10",
    text: "text-blue-700",
  },
  gold: {
    bar: "bg-yellow-600",
    bg: "bg-yellow-600/5",
    border: "border-yellow-600/20",
    pill: "bg-yellow-600/10",
    text: "text-yellow-700",
  },
  teal: {
    bar: "bg-teal-600",
    bg: "bg-teal-600/5",
    border: "border-teal-600/20",
    pill: "bg-teal-600/10",
    text: "text-teal-700",
  },
  amber: {
    bar: "bg-amber-600",
    bg: "bg-amber-600/5",
    border: "border-amber-600/20",
    pill: "bg-amber-600/10",
    text: "text-amber-700",
  },
  green: {
    bar: "bg-green-600",
    bg: "bg-green-600/5",
    border: "border-green-600/20",
    pill: "bg-green-600/10",
    text: "text-green-700",
  },
};

/* ===================== HOOK ===================== */
function useInView(ref) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return inView;
}

/* ===================== CARD ===================== */
function SectionCard({ section, index }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const a = accentMap[section.accent];

  return (
    <div
      ref={ref}
      className={`
        flex rounded-2xl overflow-hidden border backdrop-blur-md shadow-lg
        ${a.bg} ${a.border}
        transition-all duration-500
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={`w-1 ${a.bar}`} />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-9 h-9 flex items-center justify-center rounded-lg border ${a.pill} ${a.border}`}>
            {section.icon}
          </div>

          <h3 className="flex-1 text-white text-base font-semibold">
            {section.title}
          </h3>

          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${a.pill} ${a.border} ${a.text}`}>
            § {section.id}
          </span>
        </div>

        <div className={`h-px mb-4 ${a.border}`} />

        {/* Content */}
        <div className="flex flex-col gap-3">
          {section.content.map((block, i) => {
            if (block.type === "text") {
              return (
                <p key={i} className="text-sm text-gray-300 leading-relaxed">
                  {block.text}
                </p>
              );
            }

            if (block.type === "highlight") {
              return (
                <div key={i} className={`flex gap-2 p-3 rounded-lg border ${a.pill} ${a.border}`}>
                  <span>💡</span>
                  <p className={`text-sm italic ${a.text}`}>
                    {block.text}
                  </p>
                </div>
              );
            }

            if (block.type === "list") {
              return (
                <ul key={i} className="flex flex-col gap-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${a.pill} ${a.border}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${a.bar}`} />
                      </div>
                      <span className="text-sm text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            if (block.type === "cta") {
              return (
                <a
                  key={i}
                  href={block.href}
                  className={`inline-flex items-center gap-2 px-5 py-2 rounded-md text-white text-sm font-bold ${a.bar} hover:opacity-80 transition`}
                >
                  {block.label} →
                </a>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}

/* ===================== MAIN PAGE ===================== */
export default function PrivacyPolicyPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1117] via-[#131620] to-[#0d1014] px-5 py-14">
      <div className="max-w-3xl mx-auto">

        {/* HERO */}
        <div className={`text-center mb-12 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}>
          <div className="inline-block px-4 py-2 text-xs font-bold text-blue-400 border border-blue-400/30 rounded-full bg-blue-400/10 mb-4">
            Legal Document
          </div>

          <h1 className="text-5xl font-bold text-white">
            Privacy <span className="text-blue-400">Policy</span>
          </h1>

          <p className="text-white/40 text-sm mt-3">
            🌐 OnlineUpdates.com • 📅 2025 • {sections.length} Sections
          </p>
        </div>

        {/* CARDS */}
        <div className="flex flex-col gap-4">
          {sections.map((sec, i) => (
            <SectionCard key={sec.id} section={sec} index={i} />
          ))}
        </div>

      </div>
    </div>
  );
}