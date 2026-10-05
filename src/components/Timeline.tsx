"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Edit3, CheckCircle } from "lucide-react";
import { Experience } from "@/data/portfolio";

interface TimelineProps {
  items: Experience[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative pl-4 sm:pl-8 md:pl-0">
      {/* Vertical Animated Timeline Line */}
      <div className="absolute left-4 sm:left-8 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#FF8A1F] via-[#FF8A1F]/40 to-white/10" />

      <div className="flex flex-col gap-10 sm:gap-12">
        {items.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative flex flex-col md:flex-row items-start ${
                isEven ? "md:flex-row-reverse" : ""
              } gap-6 md:gap-12`}
            >
              {/* Timeline Center Node */}
              <div className="absolute left-4 sm:left-8 md:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-[#050505] border-2 border-[#FF8A1F] flex items-center justify-center shadow-[0_0_12px_#FF8A1F]">
                  <div className="w-2 h-2 rounded-full bg-[#FF8A1F] animate-ping" />
                </div>
              </div>

              {/* Date & Company Metadata (Left on desktop for even, right for odd) */}
              <div
                className={`w-full md:w-1/2 pl-10 sm:pl-16 md:pl-0 flex flex-col ${
                  isEven
                    ? "md:items-start md:pl-8"
                    : "md:items-end md:pr-8 md:text-right"
                }`}
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF8A1F]/15 border border-[#FF8A1F]/40 text-[#FF8A1F] font-mono-code text-xs font-semibold tracking-wider mb-2 shadow-[0_0_12px_rgba(255,138,31,0.25)]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide uppercase">
                  {item.company}
                </h3>

                <div
                  className={`flex items-center gap-1.5 text-xs font-mono-code text-neutral-400 mt-1 ${
                    isEven ? "" : "md:justify-end"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FF8A1F]" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Experience Details Glass Card */}
              <div
                className={`w-full md:w-1/2 pl-10 sm:pl-16 md:pl-0 ${
                  isEven ? "md:pr-8" : "md:pl-8"
                }`}
              >
                <div className="rounded-2xl bg-[#0e0e13]/85 backdrop-blur-md border border-white/10 hover:border-[#FF8A1F]/40 p-6 transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(255,138,31,0.2)]">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-4 h-4 text-[#FF8A1F]" />
                    <h4 className="font-heading text-xl text-white tracking-wide uppercase">
                      {item.role}
                    </h4>
                  </div>

                  <ul className="space-y-3 mb-5">
                    {item.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A1F] mt-2 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono-code text-neutral-300 bg-white/[0.04] border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
