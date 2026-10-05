"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, FileDown, Sparkles, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt physics for the portrait frame
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const orbitingChips = PORTFOLIO_DATA.personal.orbitingChips;

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Hero Typography & Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left z-10"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono-code text-xs font-semibold tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{PORTFOLIO_DATA.personal.statusPill}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-400 font-mono-code text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#FF8A1F]" />
              <span>{PORTFOLIO_DATA.personal.location}</span>
            </div>
          </motion.div>

          {/* Huge Name Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-normal tracking-wide uppercase leading-[0.9] mb-4 text-glow-white select-none"
          >
            ROMANA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A1F] via-amber-300 to-white">TAHIR</span>
          </motion.h1>

          {/* Subtitle & Role */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="font-mono-code text-xs sm:text-sm md:text-base text-[#FF8A1F] tracking-[0.2em] uppercase font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 inline animate-pulse" />
              <span>{PORTFOLIO_DATA.personal.title}</span>
            </h2>
          </motion.div>

          {/* Short Bio */}
          <motion.p
            variants={itemVariants}
            className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-8 font-normal"
          >
            {PORTFOLIO_DATA.personal.shortBio}
          </motion.p>

          {/* Key Value Highlight Chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 mb-8">
            {PORTFOLIO_DATA.personal.chips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code text-neutral-300 bg-[#121216]/90 border border-white/10 hover:border-[#FF8A1F]/40 hover:text-white transition-all shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF8A1F]" />
                {chip}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-heading text-xl tracking-wider text-black bg-gradient-to-r from-[#FF8A1F] via-amber-400 to-[#FF8A1F] bg-[length:200%_auto] hover:bg-right transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(255,138,31,0.45)] hover:shadow-[0_0_35px_rgba(255,138,31,0.7)] transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>VIEW PROJECTS</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href={PORTFOLIO_DATA.personal.cvPath}
              download="Romana_Tahir_CV.pdf"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-heading text-xl tracking-wider text-neutral-200 bg-[#121215] hover:bg-neutral-800/80 border border-[#FF8A1F]/30 hover:border-[#FF8A1F] transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(0,0,0,0.5)] transform hover:-translate-y-0.5"
            >
              <FileDown className="w-5 h-5 text-[#FF8A1F]" />
              <span>DOWNLOAD CV</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Arch Frame Portrait with Orbiting Glass Chips */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-6">
          
          {/* Ambient Warm Amber Glow Behind Arch */}
          <div
            className="absolute w-72 sm:w-96 h-96 sm:h-[480px] arch-glow rounded-full -z-10 blur-3xl opacity-70 animate-pulse-glow pointer-events-none"
            aria-hidden="true"
          />

          {/* Orbiting Glass Chips - Positioned strategically in a responsive ring */}
          <div className="hidden sm:block absolute inset-0 pointer-events-none -z-5">
            {orbitingChips.map((chip, i) => {
              // Custom fixed coordinates forming an aesthetic orbit around the arch
              const positions = [
                { top: "6%", left: "4%", delay: 0 },
                { top: "18%", right: "-2%", delay: 1.2 },
                { bottom: "35%", right: "-8%", delay: 2.4 },
                { bottom: "12%", left: "2%", delay: 3.6 },
                { top: "52%", left: "-12%", delay: 4.8 },
              ];
              const pos = positions[i % positions.length];
              return (
                <motion.div
                  key={chip}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    y: {
                      duration: 4.5 + i * 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: pos.delay,
                    },
                    opacity: { duration: 0.8, delay: 0.4 + i * 0.1 },
                  }}
                  style={{
                    position: "absolute",
                    top: pos.top,
                    left: pos.left,
                    right: pos.right,
                    bottom: pos.bottom,
                  }}
                  className="glass-chip px-3.5 py-1.5 rounded-full text-xs font-mono-code text-amber-200/90 font-medium tracking-wider shadow-[0_4px_16px_rgba(0,0,0,0.6)] border border-[#FF8A1F]/30"
                >
                  <span className="text-[#FF8A1F] font-bold mr-1">#</span>
                  {chip}
                </motion.div>
              );
            })}
          </div>

          {/* Interactive 3D Card / Frame */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-64 sm:w-72 md:w-80 h-96 sm:h-[420px] md:h-[460px] cursor-pointer group animate-float-subtle"
          >
            {/* Outer Arch Border with Gradient */}
            <div className="absolute -inset-[2px] arch-frame bg-gradient-to-b from-[#FF8A1F] via-amber-600/40 to-white/10 rounded-b-2xl p-[2px] shadow-[0_0_35px_rgba(255,138,31,0.3)] group-hover:shadow-[0_0_50px_rgba(255,138,31,0.55)] transition-shadow duration-500">
              
              {/* Inner Arch Container */}
              <div className="relative w-full h-full arch-frame rounded-b-[18px] bg-[#0c0c0f] overflow-hidden">
                {!imageError ? (
                  <>
                    <Image
                      src="/romana.jpg"
                      alt="Romana Tahir - AI/ML Engineer & MERN Stack Developer"
                      fill
                      priority
                      sizes="(max-width: 768px) 288px, 320px"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={() => setImageError(true)}
                    />

                    {/* Subtle Dark Vignette Overlay so image smoothly blends with the #050505 canvas */}
                    <div className="absolute inset-0 vignette-overlay pointer-events-none" />

                    {/* Bottom Gradient Fade */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none" />
                  </>
                ) : (
                  /* Fallback animated initials if image fails to load */
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#16161d] to-[#08080a] p-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FF8A1F] via-amber-400 to-amber-200 flex items-center justify-center text-black font-heading text-4xl font-bold shadow-[0_0_30px_rgba(255,138,31,0.6)] mb-4">
                      RT
                    </div>
                    <span className="font-heading text-2xl text-white tracking-wider">ROMANA TAHIR</span>
                    <span className="font-mono-code text-xs text-[#FF8A1F] tracking-widest mt-1">AI/ML ENGINEER</span>
                  </div>
                )}

                {/* Corner Glass Badge on Arch */}
                <div className="absolute bottom-3 inset-x-3 glass-panel px-3 py-2 rounded-xl flex items-center justify-between border border-white/10 text-xs font-mono-code z-10">
                  <span className="text-white font-medium">ROMANA TAHIR</span>
                  <span className="text-[#FF8A1F] flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A1F]" />
                    ICISCT 2026
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
        <a
          href="#about"
          className="pointer-events-auto flex flex-col items-center gap-1.5 text-neutral-500 hover:text-[#FF8A1F] transition-colors"
          aria-label="Scroll down to About"
        >
          <span className="font-mono-code text-[10px] uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
