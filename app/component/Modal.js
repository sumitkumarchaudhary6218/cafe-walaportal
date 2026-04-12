"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";


const tools = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    label: "PAN Resize",
    desc: "Resize PAN cards instantly",
    color: "#6C47FF",
    bg: "#F0ECFF",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
    label: "Compress",
    desc: "Fast image compression",
    color: "#0EA5E9",
    bg: "#E0F2FE",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/>
      </svg>
    ),
    label: "BG Remove",
    desc: "Remove backgrounds instantly",
    color: "#10B981",
    bg: "#D1FAE5",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
      </svg>
    ),
    label: "Convert",
    desc: "Convert file formats",
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="10"/>
      </svg>
    ),
    label: "Crop",
    desc: "Crop images precisely",
    color: "#EC4899",
    bg: "#FCE7F3",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
      </svg>
    ),
    label: "PDF Tools",
    desc: "Merge & split PDFs",
    color: "#8B5CF6",
    bg: "#F3E8FF",
  },
];

const Modal = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredTool, setHoveredTool] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsModalOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dtb-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        .dtb-root {
          font-family: 'Inter', sans-serif;
          padding: 40px 16px;
          display: flex;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%);
        }

        /* --- Modal Styles --- */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: linear-gradient(135deg, #ffffff 0%, #f9f9fb 100%);
          padding: 40px;
          border-radius: 28px;
          max-width: 500px;
          width: 90%;
          text-align: center;
          position: relative;
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15), 0 0 1px rgba(255,255,255,0.5);
          animation: modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes modalSlideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0,0,0,0.04);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          font-weight: 600;
          color: #666;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: rgba(0,0,0,0.08);
          transform: rotate(90deg);
        }

        .modal-title {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #000 0%, #4F46E5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          font-family: 'Space Grotesk', sans-serif;
        }

        .modal-text {
          color: #666;
          line-height: 1.6;
          margin-bottom: 28px;
          font-size: 15px;
        }

        .modal-btn {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
        }

        .modal-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(79, 70, 229, 0.4);
        }

        /* --- Main Card --- */
        .dtb-card {
          background: white;
          border-radius: 32px;
          max-width: 1200px;
          width: 100%;
          padding: 60px;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 10px 40px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.05);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 80px;
          align-items: center;
          position: relative;
          overflow: hidden;
          animation: cardAppear 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
        }

        @keyframes cardAppear {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Background Orbs */
        .dtb-orb {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%);
          top: -150px;
          right: 50px;
          pointer-events: none;
          animation: float 6s ease-in-out infinite;
        }

        .dtb-orb2 {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%);
          bottom: -100px;
          left: -50px;
          pointer-events: none;
          animation: float 8s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }

        .dtb-left {
          display: flex;
          flex-direction: column;
          gap: 28px;
          position: relative;
          z-index: 1;
        }

        .dtb-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #F3E8FF 0%, #EDE9FE 100%);
          border: 1px solid #DDD6FE;
          color: #6D28D9;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          width: fit-content;
          transition: all 0.3s ease;
        }

        .dtb-badge:hover {
          background: linear-gradient(135deg, #DDD6FE 0%, #DBEAFE 100%);
          transform: translateY(-2px);
        }

        .dtb-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #7C3AED;
          animation: pulse 2.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7); }
          50% { opacity: 0.7; }
        }

        .dtb-title {
          font-size: 52px;
          font-weight: 800;
          font-family: 'Space Grotesk', sans-serif;
          color: #0D0920;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .dtb-accent {
          background: linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dtb-desc {
          font-size: 16px;
          line-height: 1.8;
          color: #666;
          max-width: 460px;
          margin: 0;
          font-weight: 400;
        }

        .dtb-row {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 8px;
        }

        .dtb-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, #0D0920 0%, #1F2937 100%);
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          padding: 14px 28px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 8px 20px rgba(13,9,32,0.25);
          position: relative;
          overflow: hidden;
        }

        .dtb-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,0.1);
          transition: left 0.4s ease;
        }

        .dtb-btn:hover::before {
          left: 100%;
        }

        .dtb-btn:hover {
          background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(79, 70, 229, 0.4);
        }

        .dtb-btn:active {
          transform: translateY(-1px);
        }

        .dtb-arr {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
          font-size: 16px;
        }

        .dtb-btn:hover .dtb-arr {
          transform: translateX(4px);
        }

        .dtb-meta {
          font-size: 14px;
          color: #999;
          font-weight: 500;
        }

        /* Tools Grid */
        .dtb-right {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        .dtb-tool {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: linear-gradient(135deg, #FAFAFA 0%, #F5F5F7 100%);
          border: 1px solid #EAEAEA;
          border-radius: 16px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          min-width: 140px;
        }

        .dtb-tool::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%);
          pointer-events: none;
        }

        .dtb-tool:hover {
          background: white;
          border-color: #C4B5FD;
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(79, 70, 229, 0.15);
        }

        .dtb-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .dtb-tool:hover .dtb-icon-wrap {
          transform: scale(1.1) rotate(5deg);
        }

        .dtb-tool-name {
          font-size: 13px;
          font-weight: 700;
          color: #1F2937;
          position: relative;
          z-index: 1;
        }

        .dtb-tool-desc {
          font-size: 12px;
          color: #999;
          position: relative;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.3s ease;
          margin-top: -8px;
        }

        .dtb-tool:hover .dtb-tool-desc {
          opacity: 1;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .dtb-card {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 48px 40px;
          }

          .dtb-right {
            grid-template-columns: repeat(3, 1fr);
            width: 100%;
            gap: 12px;
          }
        }

        @media (max-width: 768px) {
          .dtb-root {
            padding: 24px 12px;
          }

          .dtb-card {
            padding: 36px 24px;
            gap: 32px;
            border-radius: 24px;
          }

          .dtb-title {
            font-size: 36px;
          }

          .dtb-desc {
            font-size: 15px;
          }

          .dtb-right {
            grid-template-columns: repeat(2, 1fr);
          }

          .dtb-tool {
            min-width: auto;
          }

          .dtb-orb {
            width: 400px;
            height: 400px;
            top: -100px;
            right: 0;
          }

          .dtb-orb2 {
            width: 300px;
            height: 300px;
            bottom: -80px;
          }
        }

        @media (max-width: 480px) {
          .dtb-card {
            padding: 28px 20px;
            gap: 24px;
          }

          .dtb-title {
            font-size: 28px;
          }

          .dtb-right {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .dtb-tool {
            padding: 16px;
            border-radius: 12px;
          }

          .dtb-icon-wrap {
            width: 40px;
            height: 40px;
          }

          .dtb-btn {
            padding: 12px 20px;
            font-size: 14px;
          }
        }
      `}</style>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            <h3 className="modal-title">Welcome to SevaUpdates! 🚀</h3>
            <p className="modal-text">
              Hamare naye Digital Tools section mein aapka swagat hai. Ab PAN resize aur Photo compress karna hua aur bhi asaan.
            </p>
            <button className="modal-btn" onClick={() => router.push("/toolscollection")}>
              Let's Start Exploring
            </button>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="dtb-card">
        <div className="dtb-orb" />
        <div className="dtb-orb2" />

        <div className="dtb-left">
          <span className="dtb-badge">
            <span className="dtb-dot" />
            SEVA UPDATES
          </span>

          <h2 className="dtb-title">
            Digital <span className="dtb-accent">Tools</span>
            <br />
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
            <div
              key={t.label}
              className="dtb-tool"
              onMouseEnter={() => setHoveredTool(t.label)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              <div className="dtb-icon-wrap" style={{ background: t.bg, color: t.color }}>
                {t.icon}
              </div>
              <span className="dtb-tool-name">{t.label}</span>
              <span className="dtb-tool-desc">{t.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;