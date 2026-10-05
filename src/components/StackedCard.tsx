"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StackedCardProps {
  id: string;
  sectionNumber: string;
  label: string;
  heading: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

export default function StackedCard({
  id,
  sectionNumber,
  label,
  heading,
  subtitle,
  children,
  className = "",
}: StackedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}
    >
      {/* 3D Glassmorphism Stacked Container */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.98 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative rounded-3xl glass-panel p-6 sm:p-10 md:p-14 overflow-hidden group/card transition-all duration-500 hover:border-[#FF8A1F]/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
      >
        {/* Subtle Ambient Radial Light behind card */}
        <div
          className="absolute -right-20 -top-20 w-80 h-80 bg-[#FF8A1F]/[0.05] rounded-full blur-3xl pointer-events-none group-hover/card:bg-[#FF8A1F]/[0.09] transition-colors duration-500"
          aria-hidden="true"
        />

        {/* Big Faded Section Number in the Top Right Corner */}
        <div
          className="absolute right-4 sm:right-8 top-3 sm:top-4 font-heading text-7xl sm:text-9xl md:text-[140px] text-white/[0.035] select-none pointer-events-none leading-none tracking-tighter"
          aria-hidden="true"
        >
          {sectionNumber}
        </div>

        {/* Header Content */}
        <div className="relative z-10 max-w-3xl mb-8 md:mb-12">
          {/* Monospace Uppercase Label */}
          <div className="inline-block mb-3 font-mono-code text-xs sm:text-sm text-[#FF8A1F] font-semibold uppercase tracking-[0.25em]">
            {label}
          </div>

          {/* Condensed Bold Heading with soft white text-glow */}
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white font-normal uppercase tracking-wide leading-none text-glow-white mb-4">
            {heading}
          </h2>

          {/* Optional Subtitle */}
          {subtitle && (
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Section Body */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </section>
  );
}
