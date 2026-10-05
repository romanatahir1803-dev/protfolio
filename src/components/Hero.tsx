"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileDown, Sparkles, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import AIAvatarPresenter from "@/components/AIAvatarPresenter";

export default function Hero() {
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

        {/* Right Column: Interactive Animated Speaking AI Avatar Presenter */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-6">
          
          {/* Ambient Warm Amber Glow Behind Presenter */}
          <div
            className="absolute w-72 sm:w-96 h-96 sm:h-[480px] arch-glow rounded-full -z-10 blur-3xl opacity-70 animate-pulse-glow pointer-events-none"
            aria-hidden="true"
          />

          {/* Orbiting Glass Chips */}
          <div className="hidden sm:block absolute inset-0 pointer-events-none -z-5">
            {orbitingChips.map((chip, i) => {
              const positions = [
                { top: "4%", left: "0%", delay: 0 },
                { top: "16%", right: "-4%", delay: 1.2 },
                { bottom: "30%", right: "-8%", delay: 2.4 },
                { bottom: "8%", left: "0%", delay: 3.6 },
                { top: "50%", left: "-10%", delay: 4.8 },
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

          {/* Interactive AI Presenter Component */}
          <AIAvatarPresenter />

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
