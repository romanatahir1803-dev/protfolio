"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { StatItem } from "@/data/portfolio";
import { Sparkles, TrendingUp, Award, Rocket, CheckCircle } from "lucide-react";

interface StatCounterProps {
  stats: StatItem[];
}

function CounterNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * value;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function StatCounter({ stats }: StatCounterProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="relative rounded-2xl bg-[#0c0c0f]/90 border border-white/10 hover:border-[#FF8A1F]/50 p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_10px_25px_-5px_rgba(255,138,31,0.25)] hover:-translate-y-1"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF8A1F]/5 rounded-full blur-xl group-hover:bg-[#FF8A1F]/15 transition-colors" />

          <div>
            <div className="font-heading text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-[#FF8A1F] leading-none mb-2 font-normal text-glow-amber">
              <CounterNumber
                value={stat.value}
                decimals={stat.decimals || 0}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </div>

            <h4 className="font-heading text-lg sm:text-xl text-white tracking-wide uppercase mb-1">
              {stat.label}
            </h4>
          </div>

          <p className="text-xs text-neutral-400 font-normal leading-relaxed mt-2 pt-2 border-t border-white/[0.06]">
            {stat.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
