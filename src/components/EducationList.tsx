"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { Education } from "@/data/portfolio";

interface EducationListProps {
  items: Education[];
}

export default function EducationList({ items }: EducationListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((edu, idx) => (
        <motion.div
          key={edu.degree}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="rounded-2xl bg-[#0e0e13]/80 border border-white/10 hover:border-[#FF8A1F]/45 p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(255,138,31,0.2)] flex flex-col justify-between group"
        >
          <div>
            {/* Top Period Badge & Icon */}
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.06]">
              <div className="p-2 rounded-lg bg-[#FF8A1F]/10 border border-[#FF8A1F]/20 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5 text-[#FF8A1F]" />
              </div>
              <span className="font-mono-code text-xs text-[#FF8A1F] font-semibold tracking-wider">
                {edu.period}
              </span>
            </div>

            {/* Degree Title */}
            <h3 className="font-heading text-2xl text-white tracking-wide uppercase mb-2 group-hover:text-amber-200 transition-colors">
              {edu.degree}
            </h3>

            {/* Institution & Location */}
            <div className="space-y-1 mb-4">
              <p className="text-sm font-medium text-neutral-300">
                {edu.institution}
              </p>
              <p className="flex items-center gap-1.5 text-xs font-mono-code text-neutral-500">
                <MapPin className="w-3.5 h-3.5 text-[#FF8A1F]" />
                {edu.location}
              </p>
            </div>

            {/* Details */}
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
              {edu.details}
            </p>
          </div>

          {/* Honors Badges */}
          {edu.honors && edu.honors.length > 0 && (
            <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
              {edu.honors.map((honor) => (
                <span
                  key={honor}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono-code text-amber-200/90 bg-[#FF8A1F]/10 border border-[#FF8A1F]/20"
                >
                  <Award className="w-3 h-3 text-[#FF8A1F]" />
                  {honor}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
