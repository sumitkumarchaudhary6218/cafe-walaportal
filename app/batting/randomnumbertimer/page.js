"use client";
import { useState, useEffect, useRef } from "react";

const TOTAL_SECONDS = 1 * 60; // 1 minute

export default function RandomNumberTimer() {
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [revealed, setRevealed] = useState(false);
  const [number, setNumber] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [displayNum, setDisplayNum] = useState("??");
  const intervalRef = useRef(null);

  // countdown
  useEffect(() => {
    if (revealed) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          startReveal();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [revealed]);

  const startReveal = () => {
    setRolling(true);
    let ticks = 0;
    const maxTicks = 20;
    const roll = setInterval(() => {
      setDisplayNum(Math.floor(Math.random() * 100) + 1);
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(roll);
        const final = Math.floor(Math.random() * 100) + 1;
        setNumber(11);
        setDisplayNum(final);
        setRolling(false);
        setRevealed(true);
      }
    }, 70);
  };

  // For demo: manual skip button
  const skipTimer = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(0);
    startReveal();
  };

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const progress = ((TOTAL_SECONDS - timeLeft) / TOTAL_SECONDS) * 100;

  const getColor = (n) => {
    if (!n) return "#a78bfa";
    if (n <= 33) return "#f87171";
    if (n <= 66) return "#fbbf24";
    return "#34d399";
  };

  const getLabel = (n) => {
    if (n <= 33) return "LOW";
    if (n <= 66) return "MID";
    return "HIGH";
  };

  const pad = (n) => String(n).padStart(2, "0");

  // Circular SVG progress
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = circumference - (progress / 100) * circumference;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07070f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', monospace",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background dots */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: revealed
            ? `${getColor(number)}15`
            : "rgba(167,139,250,0.08)",
          filter: "blur(100px)",
          transition: "background 1s ease",
          pointerEvents: "none",
        }}
      />

      {/* Headline */}
      <div
        style={{
          zIndex: 1,
          textAlign: "center",
          marginBottom: "36px",
        }}
      >
        <p
          style={{
            color: "#444",
            fontSize: "10px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          Lucky Draw
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "clamp(36px, 8vw, 64px)",
              fontWeight: "900",
              color: "#f87171",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
              textShadow: "0 0 30px rgba(248,113,113,0.5)",
            }}
          >
            1
          </span>
          <span
            style={{
              fontSize: "clamp(18px, 4vw, 28px)",
              color: "#333",
              fontWeight: "300",
              letterSpacing: "4px",
            }}
          >
            TO
          </span>
          <span
            style={{
              fontSize: "clamp(36px, 8vw, 64px)",
              fontWeight: "900",
              color: "#34d399",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
              textShadow: "0 0 30px rgba(52,211,153,0.5)",
            }}
          >
            100
          </span>
        </div>
        <div
          style={{
            marginTop: "10px",
            height: "2px",
            width: "clamp(160px, 40vw, 260px)",
            margin: "10px auto 0",
            background:
              "linear-gradient(90deg, #f87171, #fbbf24, #34d399)",
            borderRadius: "100px",
          }}
        />
        <p
          style={{
            color: "#555",
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginTop: "10px",
          }}
        >
          {revealed ? "🎉 Result Revealed!" : "⏳ 1 Minute Countdown"}
        </p>
      </div>

      {/* Main circle */}
      <div style={{ position: "relative", zIndex: 1, marginBottom: "32px" }}>
        <svg
          width="clamp(240px, 60vw, 300px)"
          height="clamp(240px, 60vw, 300px)"
          viewBox="0 0 280 280"
          style={{ display: "block" }}
        >
          {/* Track */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            stroke="#1a1a2e"
            strokeWidth="8"
          />
          {/* Progress arc */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            stroke={revealed ? getColor(number) : "#a78bfa"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDash}
            transform="rotate(-90 140 140)"
            style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.6s ease" }}
          />
          {/* Tick marks */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const x1 = 140 + (radius - 14) * Math.cos(rad);
            const y1 = 140 + (radius - 14) * Math.sin(rad);
            const x2 = 140 + (radius - 6) * Math.cos(rad);
            const y2 = 140 + (radius - 6) * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#2a2a4a"
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* Center content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          {!revealed ? (
            <>
              <div
                style={{
                  fontSize: "clamp(32px, 8vw, 52px)",
                  fontWeight: "900",
                  color: "#fff",
                  letterSpacing: "-2px",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {pad(hours)}:{pad(minutes)}:{pad(seconds)}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#444",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                }}
              >
                Remaining
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  fontSize: "clamp(56px, 14vw, 88px)",
                  fontWeight: "900",
                  color: getColor(number),
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                  filter: `drop-shadow(0 0 20px ${getColor(number)}88)`,
                  transition: "color 0.5s ease",
                }}
              >
                {rolling ? displayNum : number}
              </div>
              {!rolling && (
                <div
                  style={{
                    fontSize: "10px",
                    color: getColor(number),
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    border: `1px solid ${getColor(number)}55`,
                    padding: "2px 10px",
                    borderRadius: "100px",
                  }}
                >
                  {getLabel(number)}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Time blocks (show when not revealed) */}
      {!revealed && (
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "32px",
            zIndex: 1,
          }}
        >
          {[
            { label: "Hours", val: pad(hours) },
            { label: "Min", val: pad(minutes) },
            { label: "Sec", val: pad(seconds) },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "#0f0f1e",
                border: "1px solid #1e1e3a",
                borderRadius: "10px",
                padding: "12px 16px",
                textAlign: "center",
                minWidth: "64px",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(20px, 5vw, 28px)",
                  fontWeight: "900",
                  color: "#a78bfa",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {item.val}
              </div>
              <div
                style={{
                  fontSize: "9px",
                  color: "#444",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Revealed range info */}
      {revealed && !rolling && (
        <div
          style={{
            zIndex: 1,
            textAlign: "center",
            marginBottom: "24px",
            color: "#555",
            fontSize: "12px",
            letterSpacing: "2px",
          }}
        >
          Range: 1 – 100 &nbsp;|&nbsp; Your number:{" "}
          <span style={{ color: getColor(number), fontWeight: "700" }}>
            {number}
          </span>
        </div>
      )}

      {/* Demo skip button */}
      {!revealed && (
        <button
          onClick={skipTimer}
          style={{
            zIndex: 1,
            padding: "10px 28px",
            background: "transparent",
            color: "#333",
            border: "1px solid #222",
            borderRadius: "6px",
            fontSize: "10px",
            fontWeight: "700",
            letterSpacing: "3px",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "'Courier New', monospace",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#a78bfa";
            e.target.style.borderColor = "#a78bfa";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#333";
            e.target.style.borderColor = "#222";
          }}
        >
          ⚡ Skip (Demo)
        </button>
      )}

      {/* Bottom hint */}
      <p
        style={{
          position: "absolute",
          bottom: "16px",
          color: "#2a2a2a",
          fontSize: "10px",
          letterSpacing: "2px",
          zIndex: 1,
        }}
      >
        AUTO REVEAL AFTER 1 MINUTE
      </p>
    </div>
  );
}