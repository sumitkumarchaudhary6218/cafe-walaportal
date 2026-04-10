"use client";

import { useState, useRef, useCallback } from "react";
import { Typography, Box, Chip } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function HeroSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) updateSlider(e.clientX);
  };

  const handleTouchMove = (e) => {
    updateSlider(e.touches[0].clientX);
  };

  return (
    <Box
      sx={{
        // IMPORTANT: Added dark background so white text is visible
        bgcolor: "#050505",
        color: "#fff",
        minHeight: "100vh",
        pt: { xs: 12, md: 14 },
        pb: { xs: 6, md: 10 },
        px: { xs: 2, md: 6 },
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow effect */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "800px",
          height: "600px",
          background: "radial-gradient(circle, rgba(233,30,140,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Chip
          icon={<AutoAwesomeIcon sx={{ fontSize: "14px !important", color: "#e91e8c !important" }} />}
          label="AI-Powered Technology"
          sx={{
            background: "rgba(233,30,140,0.1)",
            border: "1px solid rgba(233,30,140,0.3)",
            color: "#e91e8c",
            fontFamily: "inherit",
            fontWeight: 600,
            fontSize: "0.75rem",
            mb: 3,
            py: 0.5,
            "& .MuiChip-label": { px: 1.5 }
          }}
        />

        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            color: "#fff",
            mb: 2,
            maxWidth: "900px",
            mx: "auto",
            // Added fallback for the gradient text
            "& span": {
              display: "inline-block",
              background: "linear-gradient(135deg, #e91e8c, #9c27b0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "#e91e8c", // Fallback color
            },
          }}
        >
          Free Photo <span>Enhancer</span>
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.6)",
            fontSize: { xs: "1rem", md: "1.15rem" },
            maxWidth: "620px",
            mx: "auto",
            mb: 6,
            lineHeight: 1.6,
          }}
        >
          Make photos clearer and sharper in just a click with AI-powered technology.
          Boost image quality, add detail, and get your photos ready to share.
        </Typography>

        {/* Before/After Slider Container */}
        <Box
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "600px",
            height: { xs: "350px", sm: "450px" },
            mx: "auto",
            borderRadius: "24px",
            overflow: "hidden",
            cursor: "ew-resize",
            boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
            border: "1px solid rgba(255,255,255,0.1)",
            userSelect: "none",
          }}
        >
          {/* AFTER IMAGE (Enhanced - Right Side) */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "#1a1a1a",
            }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=100"
              alt="After"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "contrast(1.1) saturate(1.1)",
              }}
            />
          </Box>

          {/* BEFORE IMAGE (Original - Left Side with ClipPath) */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              zIndex: 2,
            }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=20"
              alt="Before"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "blur(2px) grayscale(0.3)",
              }}
            />
          </Box>

          {/* Slider Handle Line */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${sliderPos}%`,
              width: "2px",
              background: "white",
              zIndex: 10,
              transform: "translateX(-50%)",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            {/* Center Circle Button */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: "44px",
                height: "44px",
                background: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 8L22 12L18 16M6 8L2 12L6 16" stroke="#e91e8c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Box>
          </Box>

          {/* Labels */}
          <Box sx={{ position: "absolute", bottom: 20, left: 20, zIndex: 11 }}>
            <Chip label="ORIGINAL" size="small" sx={{ background: "rgba(0,0,0,0.6)", color: "#fff", fontWeight: 700, fontSize: "0.65rem", backdropFilter: "blur(4px)" }} />
          </Box>
          <Box sx={{ position: "absolute", bottom: 20, right: 20, zIndex: 11 }}>
            <Chip label="ENHANCED" size="small" sx={{ background: "rgba(233,30,140,0.8)", color: "#fff", fontWeight: 700, fontSize: "0.65rem", backdropFilter: "blur(4px)" }} />
          </Box>
        </Box>

        <Typography
          sx={{
            mt: 4,
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.85rem",
            fontWeight: 500,
            letterSpacing: "0.05em"
          }}
        >
          DRAG SLIDER TO COMPARE
        </Typography>
      </Box>
    </Box>
  );
}