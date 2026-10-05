"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles, FileDown } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const NAV_LINKS = [
  { name: "About", href: "#about", id: "about" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Education", href: "#education", id: "education" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(totalScroll > 50);

      // Detect active section
      const sections = NAV_LINKS.map((link) => document.getElementById(link.id));
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(NAV_LINKS[i].id);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-neutral-900/60 z-50 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-600 via-[#FF8A1F] to-amber-300 shadow-[0_0_12px_#FF8A1F]"
          style={{ width: `${scrollProgress}%` }}
          transition={{ ease: "easeOut", duration: 0.1 }}
        />
      </div>

      {/* Sticky Top Header */}
      <header className="fixed top-3 left-0 right-0 z-40 px-4 sm:px-8 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-[#0c0c0e]/85 backdrop-blur-xl border border-[#FF8A1F]/25 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),0_0_20px_-8px_rgba(255,138,31,0.2)]"
              : "bg-[#0e0e12]/60 backdrop-blur-md border border-white/10"
          }`}
        >
          {/* Logo / Monogram */}
          <a
            href="#"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="group flex items-center gap-2.5 pr-2 focus:outline-none"
            aria-label="Romana Tahir Home"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF8A1F] to-amber-300 flex items-center justify-center font-heading text-black font-bold text-lg tracking-wider group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(255,138,31,0.5)]">
              RT
            </div>
            <span className="font-heading text-lg tracking-wider text-white hidden md:inline group-hover:text-[#FF8A1F] transition-colors">
              ROMANA TAHIR
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.05]">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest font-mono-code transition-all duration-200 ${
                    isActive
                      ? "text-white font-medium shadow-[0_0_15px_rgba(255,138,31,0.3)]"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-[#FF8A1F]/20 border border-[#FF8A1F]/60 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={PORTFOLIO_DATA.personal.cvPath}
              download="Romana_Tahir_CV.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono-code uppercase tracking-wider text-neutral-300 bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 hover:border-[#FF8A1F]/40 hover:text-white transition-all shadow-sm"
            >
              <FileDown className="w-3.5 h-3.5 text-[#FF8A1F]" />
              <span>CV</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono-code uppercase tracking-wider text-black font-semibold bg-gradient-to-r from-[#FF8A1F] to-amber-400 hover:from-amber-400 hover:to-[#FF8A1F] transition-all shadow-[0_0_15px_rgba(255,138,31,0.4)] hover:shadow-[0_0_22px_rgba(255,138,31,0.7)]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-neutral-300 hover:text-white bg-white/5 border border-white/10 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-18 z-40 lg:hidden rounded-2xl bg-[#0c0c0f]/95 backdrop-blur-2xl border border-[#FF8A1F]/30 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-mono-code text-sm uppercase tracking-wider transition-colors ${
                    activeSection === link.id
                      ? "bg-[#FF8A1F]/15 text-[#FF8A1F] border border-[#FF8A1F]/30"
                      : "text-neutral-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[10px] text-neutral-500 font-mono-code">0{idx + 1}</span>
                    {link.name}
                  </span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </a>
              ))}

              <div className="pt-3 mt-2 border-t border-white/10 flex gap-2">
                <a
                  href={PORTFOLIO_DATA.personal.cvPath}
                  download="Romana_Tahir_CV.pdf"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono-code uppercase tracking-wider bg-neutral-900 border border-white/10 text-white"
                >
                  <FileDown className="w-4 h-4 text-[#FF8A1F]" />
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
