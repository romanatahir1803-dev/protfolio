"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Award, Trophy, Sparkles } from "lucide-react";
import { Achievement } from "@/data/portfolio";

const ICON_MAP: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-5 h-5 text-[#FF8A1F]" />,
  Award: <Award className="w-5 h-5 text-[#FF8A1F]" />,
  Trophy: <Trophy className="w-5 h-5 text-[#FF8A1F]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#FF8A1F]" />,
};

interface AchievementsProps {
  items: Achievement[];
}

export default function Achievements({ items }: AchievementsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, idx) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="rounded-2xl bg-[#0d0d11]/85 border border-white/10 hover:border-[#FF8A1F]/45 p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(255,138,31,0.2)] flex gap-4 sm:gap-5 items-start group"
        >
          <div className="w-12 h-12 rounded-xl bg-[#FF8A1F]/10 border border-[#FF8A1F]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-[#FF8A1F] transition-all shadow-[0_0_15px_rgba(255,138,31,0.2)]">
            {ICON_MAP[item.icon] || <Award className="w-5 h-5 text-[#FF8A1F]" />}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-mono-code text-xs text-[#FF8A1F] font-semibold tracking-wider">
                {item.event}
              </span>
              <span className="font-mono-code text-xs text-neutral-500">
                {item.year}
              </span>
            </div>

            <h3 className="font-heading text-2xl text-white tracking-wide uppercase mb-2 group-hover:text-amber-200 transition-colors">
              {item.title}
            </h3>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-normal">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
