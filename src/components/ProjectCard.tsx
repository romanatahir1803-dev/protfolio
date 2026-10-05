"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  Layers,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt interaction
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative rounded-2xl bg-[#0d0d10]/90 border border-white/10 hover:border-[#FF8A1F]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_40px_rgba(255,138,31,0.25)]"
    >
      {/* Dynamic Animated Gradient Thumbnail Placeholder */}
      <div
        className={`relative w-full h-48 sm:h-52 bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between overflow-hidden border-b border-white/[0.08]`}
      >
        {/* Animated ambient shimmer lines */}
        <div
          className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.4),transparent)] group-hover:opacity-40 transition-opacity"
          aria-hidden="true"
        />

        {/* Top bar with category & Year */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono-code uppercase tracking-wider font-semibold text-white bg-black/60 backdrop-blur-md border border-white/10">
            {project.category}
          </span>
          <span className="font-mono-code text-xs text-amber-200/80 font-medium">
            {project.year}
          </span>
        </div>

        {/* Center Tech Graphic / Icon */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-black/50 backdrop-blur-md border border-[#FF8A1F]/30 flex items-center justify-center text-[#FF8A1F] group-hover:scale-110 group-hover:border-[#FF8A1F] transition-all shadow-[0_0_15px_rgba(255,138,31,0.3)]">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <span className="font-heading text-xl text-white tracking-wide block leading-tight">
              {project.id.toUpperCase()}
            </span>
            {project.highlight && (
              <span className="text-[11px] font-mono-code text-[#FF8A1F] font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 inline" />
                {project.highlight}
              </span>
            )}
          </div>
        </div>

        {/* Bottom edge glow line */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8A1F]/60 to-transparent" />
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Subtitle if available */}
          {project.subtitle && (
            <div className="font-mono-code text-xs text-[#FF8A1F] font-semibold tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
              <span>{project.subtitle}</span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide uppercase leading-tight mb-3 group-hover:text-amber-200 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Tag Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono-code text-neutral-300 bg-white/[0.04] border border-white/[0.08]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-mono-code uppercase tracking-wider text-neutral-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF8A1F]/50 transition-colors"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#FF8A1F]" />
                <span>Code</span>
              </a>
            )}

            <a
              href={project.demo || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-mono-code uppercase tracking-wider text-black font-semibold bg-gradient-to-r from-[#FF8A1F] to-amber-300 hover:from-amber-300 hover:to-[#FF8A1F] transition-all shadow-[0_0_12px_rgba(255,138,31,0.3)]"
              aria-label={`Live demo for ${project.title}`}
            >
              <span>Live Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
