"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  RotateCcw,
  Radio,
  Tv,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function AIAvatarPresenter() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [subtitleText, setSubtitleText] = useState<string>(
    "Click 'Play AI Intro' to hear Romana Tahir's interactive introduction."
  );
  const [captionIndex, setCaptionIndex] = useState<number>(0);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const introScript = [
    { text: "Hello and welcome! I am Romana Tahir's AI digital presenter.", duration: 3200 },
    { text: "Romana is an AI & Machine Learning Engineer and Full Stack MERN Developer based in Karachi, Pakistan.", duration: 4200 },
    { text: "She is a published researcher at ICISCT 2026 with a 3.8 CGPA at Sir Syed University.", duration: 4000 },
    { text: "She specializes in RAG chatbots, Computer Vision, and autonomous n8n workflows.", duration: 3800 },
    { text: "Feel free to explore her featured projects, timeline, and get in touch!", duration: 3500 },
  ];

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Handle Voice Synthesis and Subtitle sync
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isPlaying) {
      const fullText = introScript.map((s) => s.text).join(" ");

      if (synthRef.current && !isMuted) {
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(fullText);
        utterance.rate = 1.0;
        utterance.pitch = 1.1;

        // Try selecting a natural female voice if available
        const voices = synthRef.current.getVoices();
        const preferredVoice = voices.find(
          (v) =>
            v.name.includes("Female") ||
            v.name.includes("Google UK English Female") ||
            v.name.includes("Samantha") ||
            v.name.includes("Zira") ||
            v.lang.startsWith("en")
        );
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onend = () => {
          setIsPlaying(false);
          setSubtitleText("Intro completed. Click replay to listen again.");
        };

        utterance.onerror = () => {
          // If speech synthesis errors or is blocked, continue visual captions
        };

        utteranceRef.current = utterance;
        synthRef.current.speak(utterance);
      }

      // Cycle subtitles dynamically
      let currentIdx = 0;
      setCaptionIndex(0);
      setSubtitleText(introScript[0].text);

      const playNextCaption = () => {
        currentIdx++;
        if (currentIdx < introScript.length) {
          setCaptionIndex(currentIdx);
          setSubtitleText(introScript[currentIdx].text);
          timeoutId = setTimeout(playNextCaption, introScript[currentIdx].duration);
        } else {
          setIsPlaying(false);
        }
      };

      timeoutId = setTimeout(playNextCaption, introScript[0].duration);
    } else {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    }

    return () => clearTimeout(timeoutId);
  }, [isPlaying, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  const restartIntro = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 150);
  };

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto">
      {/* Outer Hologram Video Container */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#181820] to-[#08080c] border border-[#FF8A1F]/40 p-3 shadow-[0_0_40px_rgba(255,138,31,0.25)] overflow-hidden group">
        
        {/* Animated Scanline Overlay */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-20"
          aria-hidden="true"
        />

        {/* Top Video HUD Status Bar */}
        <div className="relative z-30 flex items-center justify-between px-3 py-1.5 mb-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 font-mono-code text-[10px] text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                  isPlaying ? "bg-red-400" : "bg-emerald-400"
                } opacity-75`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isPlaying ? "bg-red-500" : "bg-emerald-500"
                }`}
              />
            </span>
            <span className="text-white font-semibold tracking-wider uppercase">
              {isPlaying ? "LIVE AI INTRO" : "AI PRESENTER READY"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400">
            <Radio className="w-3 h-3 text-[#FF8A1F] animate-pulse" />
            <span>60 FPS · 4K HUD</span>
          </div>
        </div>

        {/* Character Avatar Stage Area */}
        <div className="relative w-full h-[360px] sm:h-[400px] rounded-2xl bg-gradient-to-b from-[#0e0e16] via-[#12121c] to-[#08080a] overflow-hidden flex items-center justify-center border border-white/10">
          
          {/* Ambient Cyber Grid Background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FF8A1F_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Holographic Glowing Ring Behind Head */}
          <div
            className={`absolute w-48 h-48 rounded-full border-2 border-dashed border-[#FF8A1F]/30 ${
              isPlaying ? "animate-spin" : ""
            } transition-all duration-700 blur-[1px]`}
            style={{ animationDuration: "12s" }}
          />

          <div
            className="absolute w-64 h-64 bg-[#FF8A1F]/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Stylized Animated Digital Character (SVG Avatar with reactive animations) */}
          <div className="relative z-10 w-full h-full flex items-center justify-center select-none pointer-events-none">
            <motion.div
              animate={
                isPlaying
                  ? {
                      y: [0, -6, 0, -4, 0],
                      rotate: [0, 0.8, -0.8, 0],
                    }
                  : {
                      y: [0, -4, 0],
                    }
              }
              transition={{
                duration: isPlaying ? 3.5 : 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-64 h-80 flex flex-col items-center justify-center"
            >
              {/* Character Illustration SVG */}
              <svg
                viewBox="0 0 200 240"
                className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
              >
                {/* Outer Cyber Accent Halo */}
                <circle
                  cx="100"
                  cy="90"
                  r="72"
                  fill="none"
                  stroke="rgba(255, 138, 31, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Shoulders / Blazer */}
                <path
                  d="M40 240 L45 180 Q65 155 100 155 Q135 155 155 180 L160 240 Z"
                  fill="#181824"
                  stroke="#2b2b3d"
                  strokeWidth="2"
                />
                {/* Inner Shirt with Amber Accent Neckline */}
                <path
                  d="M80 155 L100 195 L120 155 Z"
                  fill="#ffffff"
                  opacity="0.9"
                />
                <path
                  d="M78 155 L100 198 L122 155"
                  fill="none"
                  stroke="#FF8A1F"
                  strokeWidth="2"
                />

                {/* Tech Collar Lapels */}
                <path
                  d="M45 180 L80 155 L75 220 Z"
                  fill="#222233"
                />
                <path
                  d="M155 180 L120 155 L125 220 Z"
                  fill="#222233"
                />

                {/* Neck */}
                <rect
                  x="86"
                  y="125"
                  width="28"
                  height="34"
                  rx="6"
                  fill="#c88b68"
                />

                {/* Hair - Back */}
                <ellipse cx="100" cy="85" rx="52" ry="56" fill="#120e0e" />
                <path
                  d="M48 90 Q40 150 55 190 Q70 140 60 90 Z"
                  fill="#1a1414"
                />
                <path
                  d="M152 90 Q160 150 145 190 Q130 140 140 90 Z"
                  fill="#1a1414"
                />

                {/* Head / Face */}
                <ellipse cx="100" cy="92" rx="36" ry="42" fill="#d99b77" />

                {/* Hair - Front Styled Bangs */}
                <path
                  d="M64 80 Q100 45 136 80 Q120 60 100 62 Q75 60 64 80 Z"
                  fill="#151010"
                />
                <path
                  d="M62 82 Q80 88 95 72 Q70 70 62 82 Z"
                  fill="#1f1818"
                />

                {/* Eyebrows */}
                <path
                  d="M74 76 Q84 72 94 77"
                  fill="none"
                  stroke="#1c1212"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M106 77 Q116 72 126 76"
                  fill="none"
                  stroke="#1c1212"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Eyes with Blinking Animation */}
                <g className="animate-pulse" style={{ animationDuration: "4.5s" }}>
                  {/* Left Eye */}
                  <ellipse cx="84" cy="86" rx="5.5" ry="4" fill="#ffffff" />
                  <circle cx="84" cy="86" r="3" fill="#2d1c16" />
                  <circle cx="85" cy="85" r="1" fill="#ffffff" />

                  {/* Right Eye */}
                  <ellipse cx="116" cy="86" rx="5.5" ry="4" fill="#ffffff" />
                  <circle cx="116" cy="86" r="3" fill="#2d1c16" />
                  <circle cx="117" cy="85" r="1" fill="#ffffff" />
                </g>

                {/* Nose */}
                <path
                  d="M100 88 L98 99 L103 100"
                  fill="none"
                  stroke="#b37856"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />

                {/* Cheeks Warm Blush */}
                <circle cx="76" cy="98" r="6" fill="#e07a68" opacity="0.35" />
                <circle cx="124" cy="98" r="6" fill="#e07a68" opacity="0.35" />

                {/* Mouth with Reactive Speaking Waveform */}
                {isPlaying ? (
                  <path
                    d="M90 114 Q100 125 110 114 Q100 118 90 114 Z"
                    fill="#a63d35"
                    stroke="#8c2c25"
                    strokeWidth="1.2"
                  />
                ) : (
                  <path
                    d="M92 114 Q100 120 108 114"
                    fill="none"
                    stroke="#993830"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}

                {/* Futuristic Cyber Headset / Earpiece with Amber LED */}
                <path
                  d="M60 88 Q56 94 62 102"
                  fill="none"
                  stroke="#FF8A1F"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="59" cy="95" r="3.5" fill="#FF8A1F" className="animate-ping" />
                <circle cx="59" cy="95" r="3" fill="#ffffff" />
                <path
                  d="M59 96 Q70 112 85 116"
                  fill="none"
                  stroke="rgba(255, 138, 31, 0.7)"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
              </svg>
            </motion.div>
          </div>

          {/* Live Audio Equalizer Waveform Bars at bottom of avatar */}
          <div className="absolute bottom-3 inset-x-4 flex items-end justify-center gap-1.5 h-7 z-20 pointer-events-none">
            {[14, 22, 18, 28, 12, 24, 16, 26, 10, 20, 15].map((height, i) => (
              <motion.div
                key={i}
                animate={
                  isPlaying
                    ? {
                        height: [6, height, 8, height * 1.1, 4],
                      }
                    : { height: 4 }
                }
                transition={{
                  duration: 0.8 + (i % 3) * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.05,
                }}
                className={`w-1 rounded-full ${
                  isPlaying
                    ? "bg-gradient-to-t from-[#FF8A1F] to-amber-300 shadow-[0_0_8px_#FF8A1F]"
                    : "bg-white/20"
                }`}
              />
            ))}
          </div>

          {/* Holographic Target Corners */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#FF8A1F]/70 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#FF8A1F]/70 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#FF8A1F]/70 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#FF8A1F]/70 pointer-events-none" />
        </div>

        {/* Dynamic Subtitles / Closed Captions Box */}
        <div className="mt-3 p-2.5 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md min-h-[58px] flex items-center justify-between gap-2">
          <p className="text-xs font-mono-code text-amber-200 leading-relaxed">
            <span className="text-[#FF8A1F] font-bold mr-1.5">►</span>
            {subtitleText}
          </p>
        </div>

        {/* Video Player Control Buttons */}
        <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-white/10">
          <button
            onClick={togglePlay}
            className="flex-1 py-2 px-3 rounded-xl font-heading text-lg tracking-wider text-black font-bold bg-gradient-to-r from-[#FF8A1F] via-amber-400 to-[#FF8A1F] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,138,31,0.4)] active:scale-95"
            aria-label={isPlaying ? "Pause AI Intro" : "Play AI Intro"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>PAUSE INTRO</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>PLAY AI INTRO</span>
              </>
            )}
          </button>

          <button
            onClick={restartIntro}
            className="p-2 rounded-xl text-neutral-300 hover:text-white bg-white/[0.06] hover:bg-white/10 border border-white/10 transition-colors"
            aria-label="Restart Intro"
            title="Restart Intro"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleMute}
            className="p-2 rounded-xl text-neutral-300 hover:text-white bg-white/[0.06] hover:bg-white/10 border border-white/10 transition-colors"
            aria-label={isMuted ? "Unmute Voice" : "Mute Voice"}
            title={isMuted ? "Unmute Voice" : "Mute Voice"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#FF8A1F]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
