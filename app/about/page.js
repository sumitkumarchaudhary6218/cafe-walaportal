"use client";
import { useState, useEffect, useRef } from "react";

/* DATA */
const services = [
  { icon: "📣", label: "Latest Exam Notifications" },
  { icon: "🪪", label: "Admit Card Release Updates" },
  { icon: "📊", label: "Result Announcements" },
  { icon: "📝", label: "Online Application Procedures" },
  { icon: "🗝️", label: "Answer Keys & Exam Patterns" },
  { icon: "📚", label: "Study Notes & Preparation Tips" },
  { icon: "🎓", label: "University & Academic Notices" },
  { icon: "🏛️", label: "Government Job Updates" },
];

const stats = [
  { value: "100%", label: "Official Sources" },
  { value: "24/7", label: "Always Updated" },
  { value: "Free", label: "No Cost, No Login" },
];

/* HOOK */
function useInView(ref, threshold = 0.12) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setV(true);
        o.disconnect();
      }
    }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return v;
}

/* FADE */
function FadeIn({ children, delay = 0, dir = "up" }) {
  const ref = useRef(null);
  const v = useInView(ref);

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700
        ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* MAIN */
export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060b14] to-[#08101a] text-white font-sans overflow-hidden">

      {/* HERO */}
      <section className="relative text-center px-6 py-20">
        {/* grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:32px_32px]" />

        {/* ring */}
        <div className="absolute w-[520px] h-[520px] rounded-full border border-cyan-400/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className={`relative max-w-2xl mx-auto transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}>

          {/* badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 text-xs tracking-widest uppercase text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            About Us
          </div>

          {/* heading */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            Your Trusted Hub for <br />
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent italic font-normal">
              Education & Cyber Cafe
            </span>
          </h1>

          <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8">
            OnlineUpdates.com is the perfect platform for students and cyber cafe users looking for education and job-related updates — all in one place.
          </p>

          {/* stats */}
          <div className="flex justify-center flex-wrap gap-3">
            {stats.map((s, i) => (
              <div key={i} className="px-6 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-center min-w-[110px]">
                <div className="text-2xl font-bold text-cyan-400">{s.value}</div>
                <div className="text-xs text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="max-w-4xl mx-auto px-6 pb-20 flex flex-col gap-6">

        {/* intro */}
        <FadeIn>
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-3 border-b border-cyan-400/20 pb-2">
              Who We Are
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              We provide the latest information on educational news, online forms, exam updates, and career opportunities. Our website helps students and cyber cafe visitors with clear, accurate, and easy-to-understand guidance.
            </p>
          </div>
        </FadeIn>

        {/* services */}
        <FadeIn delay={0.05}>
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-4 border-b border-cyan-400/20 pb-2">
              What We Cover
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg border border-cyan-400/20 bg-cyan-400/5 hover:bg-cyan-400/10 hover:-translate-y-1 transition"
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-md bg-cyan-400/10">
                    {s.icon}
                  </div>
                  <span className="text-sm text-white/80">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* two col */}
        <div className="grid md:grid-cols-2 gap-4">

          <FadeIn delay={0.05}>
            <div className="p-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="text-2xl mb-3">🖥️</div>
              <h3 className="text-lg font-bold mb-2">Supporting Cyber Cafes</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Cyber cafes help students complete online forms. We provide simple step-by-step guides.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="p-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="text-2xl mb-3">✅</div>
              <h3 className="text-lg font-bold mb-2">Trusted Information</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                All information comes from official sources. Always verify from official websites.
              </p>
            </div>
          </FadeIn>

        </div>

        {/* CTA */}
        <FadeIn delay={0.1}>
          <div className="p-10 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 to-indigo-500/10 text-center backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-2">Stay Connected With Us</h2>
            <p className="text-white/50 mb-6 text-sm">
              Get regular updates on exams, results, admit cards, and jobs.
            </p>

            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition">
              🔔 Get Latest Updates
            </button>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}