"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  BrainCircuit,
  Workflow,
  Cpu,
  Code2,
  Database,
  Layers,
  Sparkles,
} from "lucide-react";
import { SkillCategory } from "@/data/portfolio";

const ICON_MAP: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-4 h-4 text-[#FF8A1F]" />,
  BrainCircuit: <BrainCircuit className="w-4 h-4 text-[#FF8A1F]" />,
  Workflow: <Workflow className="w-4 h-4 text-[#FF8A1F]" />,
  Cpu: <Cpu className="w-4 h-4 text-[#FF8A1F]" />,
  Code2: <Code2 className="w-4 h-4 text-[#FF8A1F]" />,
  Database: <Database className="w-4 h-4 text-[#FF8A1F]" />,
};

interface SkillGroupProps {
  categories: SkillCategory[];
}

export default function SkillGroup({ categories }: SkillGroupProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat, catIdx) => (
        <motion.div
          key={cat.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: catIdx * 0.08 }}
          className="rounded-2xl bg-[#0e0e12]/80 border border-white/10 hover:border-[#FF8A1F]/40 p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(255,138,31,0.15)] flex flex-col justify-between group"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#FF8A1F]/10 border border-[#FF8A1F]/20 group-hover:scale-110 transition-transform">
                  {ICON_MAP[cat.iconName] || <Layers className="w-4 h-4 text-[#FF8A1F]" />}
                </div>
                <h3 className="font-heading text-xl text-white tracking-wide uppercase group-hover:text-[#FF8A1F] transition-colors">
                  {cat.category}
                </h3>
              </div>
              <span className="font-mono-code text-[11px] text-neutral-500">
                {cat.skills.length} skills
              </span>
            </div>

            {/* Tag Cloud */}
            <div className="flex flex-wrap gap-2 pt-1">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono-code text-neutral-300 bg-white/[0.03] border border-white/[0.08] hover:border-[#FF8A1F]/60 hover:text-white hover:bg-[#FF8A1F]/10 transition-all duration-200 cursor-default hover:shadow-[0_0_12px_rgba(255,138,31,0.3)] hover:-translate-y-0.5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Subtle Bottom Accent */}
          <div className="mt-4 pt-3 flex items-center gap-1.5 text-[11px] font-mono-code text-neutral-500 opacity-60 group-hover:opacity-100 transition-opacity">
            <Sparkles className="w-3 h-3 text-[#FF8A1F]" />
            <span>Verified Proficiency</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
