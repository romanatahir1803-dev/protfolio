"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  RotateCcw,
  Radio,
  Scan,
  Cpu,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function AIAvatarPresenter() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [lipPhase, setLipPhase] = useState<number>(0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  
  const [subtitleText, setSubtitleText] = useState<string>(
    "Click 'Play AI Intro' to hear Romana Tahir's pleasant voice introduction."
  );
  const [captionIndex, setCaptionIndex] = useState<number>(0);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const introScript = [
    { text: "Hi there! I'm Romana Tahir, welcome to my developer portfolio.", duration: 3600 },
    { text: "I'm an AI and Machine Learning Engineer, MERN Stack Developer, and AI Automation specialist based in Karachi.", duration: 5200 },
    { text: "I graduated with a 3.8 CGPA from Sir Syed University and published research on Multimodal AI at ICISCT 2026.", duration: 5400 },
    { text: "I build intelligent RAG chatbots, Computer Vision models, and autonomous n8n workflows.", duration: 4800 },
    { text: "Take a look around my featured projects below, and feel free to connect with me!", duration: 4200 },
  ];

  // Initialize Speech Synthesis and find best clear female voice
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        if (!synthRef.current) return;
        const voices = synthRef.current.getVoices();
        setAvailableVoices(voices);

        // Priority order for the most pleasant, natural female voices
        const naturalFemaleVoice = voices.find(
          (v) =>
            (v.name.includes("Google") && (v.name.includes("Female") || v.name.includes("UK English Female") || v.name.includes("US English"))) ||
            v.name.includes("Natural") ||
            v.name.includes("Jenny") ||
            v.name.includes("Aria") ||
            v.name.includes("Samantha") ||
            v.name.includes("Zira") ||
            (v.lang.startsWith("en") && v.name.toLowerCase().includes("female"))
        ) || voices.find((v) => v.lang.startsWith("en-US") || v.lang.startsWith("en-GB")) || voices[0];

        if (naturalFemaleVoice) {
          setSelectedVoice(naturalFemaleVoice);
        }
      };

      loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Lip-syncing animation cycle when speaking
  useEffect(() => {
    let lipInterval: NodeJS.Timeout;
    if (isPlaying) {
      lipInterval = setInterval(() => {
        // Randomly morph between speech mouth shapes (0: closed, 1: slight open, 2: wide open, 3: round 'O', 4: smile)
        setLipPhase((prev) => (prev + 1) % 5);
      }, 140);
    } else {
      setLipPhase(0);
    }
    return () => clearInterval(lipInterval);
  }, [isPlaying]);

  // Voice narration & Subtitle synchronization
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isPlaying) {
      const fullText = introScript.map((s) => s.text).join(" ");

      if (synthRef.current && !isMuted) {
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(fullText);
        
        // Fine-tune speech for clear, pleasant, articulate female cadence
        utterance.rate = 0.94; // slightly relaxed for pleasant clarity
        utterance.pitch = 1.08; // clear warm pleasant tone

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        utterance.onend = () => {
          setIsPlaying(false);
          setSubtitleText("Intro completed. Click replay to listen again.");
        };

        utterance.onerror = () => {
          // If browser speech is blocked, visual captions and lip-sync will continue
        };

        utteranceRef.current = utterance;
        synthRef.current.speak(utterance);
      }

      // Synchronize closed-caption subtitles
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
  }, [isPlaying, isMuted, selectedVoice]);

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

  // Lip-syncing mouth overlay SVG paths according to speech phase
  const getLipPath = () => {
    switch (lipPhase) {
      case 1:
        // Slight open / vowel
        return "M 10 7 Q 20 2 30 7 Q 20 16 10 7 Z";
      case 2:
        // Wide open / 'Ah', 'Eh'
        return "M 8 7 Q 20 0 32 7 Q 20 22 8 7 Z";
      case 3:
        // Rounded / 'Oh', 'Oo'
        return "M 12 7 Q 20 3 28 7 Q 20 18 12 7 Z";
      case 4:
        // Smile consonant / 'Ee'
        return "M 6 8 Q 20 4 34 8 Q 20 14 6 8 Z";
      case 0:
      default:
        // Resting natural smile
        return "M 10 8 Q 20 11 30 8";
    }
  };

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto">
      
      {/* Outer Holographic AI Avatar Frame */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#181824] via-[#101018] to-[#08080c] border border-[#FF8A1F]/40 p-3 shadow-[0_0_45px_rgba(255,138,31,0.3)] overflow-hidden group">
        
        {/* Animated Scanning Laser Line on Play */}
        {isPlaying && (
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF8A1F] to-transparent shadow-[0_0_12px_#FF8A1F] z-30 pointer-events-none opacity-80"
          />
        )}

        {/* Top Video HUD Status Bar */}
        <div className="relative z-30 flex items-center justify-between px-3 py-1.5 mb-2.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 font-mono-code text-[10px] text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                  isPlaying ? "bg-emerald-400" : "bg-amber-400"
                } opacity-75`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isPlaying ? "bg-emerald-500" : "bg-[#FF8A1F]"
                }`}
              />
            </span>
            <span className="text-white font-semibold tracking-wider uppercase">
              {isPlaying ? "AI AVATAR SPEAKING" : "AI AVATAR READY"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-400">
            <Cpu className="w-3.5 h-3.5 text-[#FF8A1F] animate-pulse" />
            <span>LIP-SYNC · 60 FPS</span>
          </div>
        </div>

        {/* Stage Container with Real Portrait Transformed into AI Avatar */}
        <div className="relative w-full h-[370px] sm:h-[410px] rounded-2xl bg-[#0a0a0f] overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
          
          {/* Ambient Amber Rim Light */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-amber-500/10 z-10 pointer-events-none" />

          {/* Holographic Wireframe Grid Backdrop */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF8A1F_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          {/* Animated 3D Floating Avatar Container */}
          <motion.div
            animate={
              isPlaying
                ? {
                    y: [0, -4, 0, -3, 0],
                    rotate: [0, 0.4, -0.4, 0],
                  }
                : {
                    y: [0, -3, 0],
                  }
            }
            transition={{
              duration: isPlaying ? 3.5 : 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full"
          >
            {/* Real Portrait Photo */}
            <Image
              src="/romana.jpg"
              alt="Romana Tahir AI Avatar"
              fill
              priority
              sizes="(max-width: 768px) 340px, 380px"
              className="object-cover object-top filter brightness-[1.03] contrast-[1.05]"
            />

            {/* AI Avatar Cyberpunk Lighting & Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,5,5,0.75)_100%)] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#08080c] to-transparent pointer-events-none" />

            {/* Glowing Cyber Earpiece on Avatar */}
            <div className="absolute top-[48%] left-[22%] sm:left-[24%] z-20 pointer-events-none">
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-[#FF8A1F] opacity-75" />
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#FF8A1F] to-amber-200 shadow-[0_0_12px_#FF8A1F]" />
              </div>
            </div>

            {/* Real-Time Realistic Lip-Syncing Morphing Mouth Overlay */}
            <div
              className="absolute z-20 pointer-events-none"
              style={{
                top: "52.8%",
                left: "49.5%",
                transform: "translate(-50%, -50%)",
                width: "44px",
                height: "26px",
              }}
            >
              <svg viewBox="0 0 40 24" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                <defs>
                  {/* Natural Lip Gradient */}
                  <linearGradient id="lipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#b8463d" />
                    <stop offset="50%" stopColor="#d2584e" />
                    <stop offset="100%" stopColor="#8c2e26" />
                  </linearGradient>
                  {/* Inner Mouth Shadow */}
                  <linearGradient id="mouthInside" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3d1412" />
                    <stop offset="100%" stopColor="#1a0808" />
                  </linearGradient>
                </defs>

                {/* When speaking, render dynamic open/close lip-syncing mesh */}
                {isPlaying && lipPhase > 0 ? (
                  <>
                    {/* Inner Oral Cavity */}
                    <path
                      d={getLipPath()}
                      fill="url(#mouthInside)"
                      stroke="#4a1916"
                      strokeWidth="0.8"
                    />
                    {/* Teeth shimmer */}
                    {(lipPhase === 1 || lipPhase === 2 || lipPhase === 4) && (
                      <path
                        d="M 14 7 Q 20 5 26 7 L 25 9 Q 20 8 15 9 Z"
                        fill="#ffffff"
                        opacity="0.85"
                      />
                    )}
                    {/* Upper Lip Contour */}
                    <path
                      d="M 8 7 Q 15 3 20 5 Q 25 3 32 7"
                      fill="none"
                      stroke="url(#lipGrad)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    {/* Lower Lip Contour */}
                    <path
                      d="M 8 7 Q 20 20 32 7"
                      fill="none"
                      stroke="url(#lipGrad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </>
                ) : (
                  /* Natural Subtle Resting Lip Overlay blending perfectly with photo */
                  <path
                    d="M 10 9 Q 20 13 30 9"
                    fill="none"
                    stroke="#b8463d"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                )}
              </svg>
            </div>
          </motion.div>

          {/* Real-time Dynamic Audio Visualizer Equalizer Bars at bottom */}
          <div className="absolute bottom-3 inset-x-4 flex items-end justify-center gap-1.5 h-8 z-20 pointer-events-none">
            {[12, 22, 16, 30, 14, 26, 18, 28, 10, 24, 15, 20].map((height, i) => (
              <motion.div
                key={i}
                animate={
                  isPlaying
                    ? {
                        height: [6, height, 10, height * 1.15, 4],
                      }
                    : { height: 4 }
                }
                transition={{
                  duration: 0.6 + (i % 4) * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.04,
                }}
                className={`w-1 rounded-full ${
                  isPlaying
                    ? "bg-gradient-to-t from-[#FF8A1F] via-amber-300 to-white shadow-[0_0_10px_#FF8A1F]"
                    : "bg-white/20"
                }`}
              />
            ))}
          </div>

          {/* Futuristic HUD Framing Brackets */}
          <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-[#FF8A1F]/80 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-[#FF8A1F]/80 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-[#FF8A1F]/80 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FF8A1F]/80 pointer-events-none" />
        </div>

        {/* Dynamic Closed-Caption Subtitles Box */}
        <div className="mt-3 p-3 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md min-h-[62px] flex items-center justify-between gap-2 shadow-sm">
          <p className="text-xs font-mono-code text-amber-100 leading-relaxed">
            <span className="text-[#FF8A1F] font-bold mr-1.5">►</span>
            {subtitleText}
          </p>
        </div>

        {/* Video Player & Voice Controls */}
        <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-white/10">
          <button
            onClick={togglePlay}
            className="flex-1 py-2.5 px-4 rounded-xl font-heading text-lg tracking-wider text-black font-bold bg-gradient-to-r from-[#FF8A1F] via-amber-300 to-[#FF8A1F] bg-[length:200%_auto] hover:bg-right transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,138,31,0.45)] active:scale-95 cursor-pointer"
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
            className="p-2.5 rounded-xl text-neutral-300 hover:text-white bg-white/[0.06] hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            aria-label="Restart Intro"
            title="Restart Intro"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleMute}
            className="p-2.5 rounded-xl text-neutral-300 hover:text-white bg-white/[0.06] hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
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
