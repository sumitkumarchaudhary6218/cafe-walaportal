"use client";
import { useRouter } from "next/navigation";
import React from "react";

const tools = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    label: "PAN Resize",
    color: "#6C47FF",
    bg: "#F0ECFF",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
    label: "Compress",
    color: "#0EA5E9",
    bg: "#E0F2FE",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/>
      </svg>
    ),
    label: "BG Remove",
    color: "#10B981",
    bg: "#D1FAE5",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
      </svg>
    ),
    label: "Convert",
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
];

const DigitalToolsBox = () => {
  const router = useRouter();

  return (
    <div className="dtb-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .dtb-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 40px 16px;
          display: flex;
          justify-content: center;
        }

        .dtb-card {
          background: #ffffff;
          border: 1px solid #EAEAEA;
          border-radius: 28px;
          max-width: 1160px;
          width: 100%;
          padding: 56px 64px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 64px;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.03), 0 16px 48px rgba(0,0,0,0.07);
        }

        .dtb-orb {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(108,71,255,0.07) 0%, transparent 65%);
          top: -180px;
          right: 100px;
          pointer-events: none;
        }

        .dtb-orb2 {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 65%);
          bottom: -120px;
          right: -60px;
          pointer-events: none;
        }

        .dtb-left {
          display: flex;
          flex-direction: column;
          gap: 22px;
          position: relative;
          z-index: 1;
        }

        .dtb-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #F3F0FF;
          border: 1px solid #DDD6FE;
          color: #5B21B6;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 100px;
          width: fit-content;
        }

        .dtb-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7C3AED;
          animation: blink 2s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }

        .dtb-title {
          font-size: 46px;
          font-weight: 800;
          color: #0D0920;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0;
        }

        .dtb-accent {
          background: linear-gradient(90deg, #6C47FF 0%, #3B82F6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dtb-desc {
          font-size: 15px;
          line-height: 1.8;
          color: #6B7280;
          max-width: 420px;
          margin: 0;
        }

        .dtb-row {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .dtb-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #0D0920;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 13px 26px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(13,9,32,0.2);
        }

        .dtb-btn:hover {
          background: #6C47FF;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(108,71,255,0.32);
        }

        .dtb-btn:active { transform: translateY(0); }

        .dtb-arr {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.14);
          border-radius: 6px;
          width: 22px;
          height: 22px;
          font-size: 14px;
          transition: transform 0.2s;
        }

        .dtb-btn:hover .dtb-arr { transform: translateX(3px); }

        .dtb-meta {
          font-size: 13px;
          color: #B0B0B8;
          font-weight: 500;
        }

        .dtb-right {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        .dtb-tool {
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #FAFAFA;
          border: 1px solid #EFEFEF;
          border-radius: 16px;
          padding: 18px 18px 16px;
          width: 128px;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s, transform 0.18s, box-shadow 0.18s;
        }

        .dtb-tool:hover {
          background: #fff;
          border-color: #C4B5FD;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(108,71,255,0.1);
        }

        .dtb-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .dtb-tool-name {
          font-size: 12px;
          font-weight: 600;
          color: #374151;
        }

        @media (max-width: 800px) {
          .dtb-card {
            grid-template-columns: 1fr;
            padding: 36px 28px;
            gap: 36px;
          }
          .dtb-title { font-size: 34px; }
          .dtb-right {
            grid-template-columns: repeat(4, 1fr);
            width: 100%;
          }
          .dtb-tool { width: auto; }
        }

        @media (max-width: 520px) {
          .dtb-right { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="dtb-card">
        <div className="dtb-orb" />
        <div className="dtb-orb2" />

        <div className="dtb-left">
          <span className="dtb-badge">
            <span className="dtb-dot" />
            SevaUpdates
          </span>

          <h2 className="dtb-title">
            Digital <span className="dtb-accent">Tools</span><br />
            एक ही जगह
          </h2>

          <p className="dtb-desc">
            PAN card resize, image compressor, background remover, file
            converter और सभी cyber cafe tools अब एक ही platform पर —
            fast, free, और easy।
          </p>

          <div className="dtb-row">
            <button className="dtb-btn" onClick={() => router.push("/toolscollection")}>
              Open Tools
              <span className="dtb-arr">→</span>
            </button>
            <span className="dtb-meta">20+ tools available</span>
          </div>
        </div>

        <div className="dtb-right">
          {tools.map((t) => (
            <div key={t.label} className="dtb-tool">
              <div className="dtb-icon-wrap" style={{ background: t.bg, color: t.color }}>
                {t.icon}
              </div>
              <span className="dtb-tool-name">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalToolsBox;