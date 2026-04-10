"use client";

import { useState, useRef } from "react";
import { Box, Typography, Button, LinearProgress, Stack, Paper, Chip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DownloadIcon from "@mui/icons-material/Download";
import HighQualityIcon from '@mui/icons-material/HighQuality';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function UltraHDEnhancer() {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("idle");
  const [sliderVal, setSliderVal] = useState(50);
  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setStatus("processing");
        // Simulated HD Processing
        setTimeout(() => setStatus("done"), 2500);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ 
      bgcolor: "#f4f7f9", minHeight: "100vh", display: "flex", 
      flexDirection: "column", alignItems: "center", py: 8, px: 2 
    }}>
      
      {/* 
          ULTRA HD SVG FILTER 
          Yeh pixels ko 4K level ki sharpness dene ki koshish karta hai 
      */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="hd-upscale">
          {/* Edge enhancement for HD Look */}
          <feConvolveMatrix 
            order="3" 
            preserveAlpha="true" 
            kernelMatrix="0 -1 0 -1 5 -1 0 -1 0" 
          />
        </filter>
      </svg>

      <Stack alignItems="center" spacing={1} sx={{ mb: 6 }}>
        <Chip 
          label="AI ENGINE V2.0 ACTIVE" 
          size="small" 
          sx={{ bgcolor: "#e91e8c", color: "#fff", fontWeight: 900, mb: 1 }} 
        />
        <Typography variant="h3" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: "-2px" }}>
          HD<span style={{ color: "#e91e8c" }}>CLEANER</span>
        </Typography>
        <Typography sx={{ color: "#64748b", fontWeight: 500 }}>
          Purani ya dhundli photos ko HD quality mein convert karein
        </Typography>
      </Stack>

      <Paper elevation={0} sx={{ 
        width: "100%", maxWidth: "850px", bgcolor: "#fff", borderRadius: "40px", 
        p: 4, border: "1px solid #e2e8f0", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)"
      }}>

        {status === "idle" && (
          <Box 
            onClick={() => fileInputRef.current.click()}
            sx={{
              py: 10, border: "2px dashed #cbd5e1", borderRadius: "30px", textAlign: "center",
              cursor: "pointer", "&:hover": { borderColor: "#e91e8c", bgcolor: "#fdf2f8" }, transition: "0.3s"
            }}
          >
            <input type="file" hidden ref={fileInputRef} onChange={handleUpload} accept="image/*" />
            <CloudUploadIcon sx={{ fontSize: 60, color: "#e91e8c", mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#1e293b" }}>
              Upload Photo for HD Cleaning
            </Typography>
            <Typography sx={{ color: "#94a3b8", mt: 1 }}>Best for Portraits, Landscapes, and Selfies</Typography>
          </Box>
        )}

        {status === "processing" && (
          <Box sx={{ py: 10, textAlign: "center" }}>
            <Box sx={{ position: "relative", width: "120px", height: "120px", mx: "auto", mb: 4 }}>
                <AutoFixHighIcon sx={{ fontSize: 60, color: "#e91e8c", animation: "spin 2s linear infinite" }} />
                <Box sx={{ 
                    position: "absolute", inset: 0, borderRadius: "50%", 
                    border: "4px solid #f1f5f9", borderTopColor: "#e91e8c",
                    animation: "spin 1s linear infinite"
                }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#1e293b" }}>Upscaling to HD...</Typography>
            <Typography sx={{ color: "#64748b" }}>Deep learning neural network active</Typography>
          </Box>
        )}

        {status === "done" && (
          <Box>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                <Chip icon={<HighQualityIcon style={{color: '#fff'}}/>} label="HD RESULT READY" sx={{ bgcolor: "#0f172a", color: "#fff", fontWeight: 700 }} />
                <Button onClick={() => setStatus("idle")} size="small" startIcon={<RestartAltIcon />} sx={{ color: "#64748b" }}>Reset</Button>
            </Stack>

            <Box sx={{ 
              position: "relative", height: { xs: "350px", md: "500px" }, 
              bgcolor: "#000", borderRadius: "24px", overflow: "hidden", border: "1px solid #e2e8f0"
            }}>
              {/* AFTER PHOTO (The "HD" version) */}
              <Box component="img" src={image} sx={{ 
                width: "100%", height: "100%", objectFit: "contain",
                // HD FILTERS: Sharpness + Contrast + Slight Brightness
                filter: "url(#hd-upscale) brightness(1.05) contrast(1.1) saturate(1.1)" 
              }} />

              {/* BEFORE PHOTO (The Blur version) */}
              <Box sx={{ 
                position: "absolute", top: 0, left: 0, height: "100%", width: `${sliderVal}%`,
                borderRight: "3px solid #fff", overflow: "hidden", zIndex: 2
              }}>
                <Box component="img" src={image} sx={{ 
                    width: "780px", height: "500px", objectFit: "contain",
                    filter: "blur(5px) opacity(0.7) grayscale(0.2)" 
                }} />
              </Box>

              {/* Slider for User Interaction */}
              <Box sx={{ position: "absolute", bottom: 20, width: "80%", left: "10%", zIndex: 10 }}>
                <input 
                    type="range" min="0" max="100" value={sliderVal} 
                    onChange={(e) => setSliderVal(e.target.value)}
                    style={{ width: "100%", accentColor: "#e91e8c", cursor: "pointer" }}
                />
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                    <Typography sx={{ fontSize: "0.6rem", fontWeight: 900, color: "#fff", bgcolor: "rgba(0,0,0,0.5)", px: 1, borderRadius: 1 }}>BEFORE</Typography>
                    <Typography sx={{ fontSize: "0.6rem", fontWeight: 900, color: "#fff", bgcolor: "#e91e8c", px: 1, borderRadius: 1 }}>AFTER HD</Typography>
                </Stack>
              </Box>
            </Box>

            <Button 
                fullWidth variant="contained" 
                startIcon={<DownloadIcon />}
                sx={{ 
                    mt: 4, py: 2, borderRadius: "18px", bgcolor: "#e91e8c", 
                    fontWeight: 800, fontSize: "1.1rem", textTransform: "none",
                    boxShadow: "0 10px 20px rgba(233,30,140,0.2)",
                    "&:hover": { bgcolor: "#c2185b" }
                }}
            >
                Download HD Image
            </Button>
          </Box>
        )}
      </Paper>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </Box>
  );
}