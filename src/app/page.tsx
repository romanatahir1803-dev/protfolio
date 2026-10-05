"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Mail,
  Heart,
  Sparkles,
  Layers,
  Award,
  BookOpen,
  Code,
  FileCheck,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import LenisProvider from "@/components/LenisProvider";
import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StackedCard from "@/components/StackedCard";
import SkillGroup from "@/components/SkillGroup";
import Timeline from "@/components/Timeline";
import ProjectCard from "@/components/ProjectCard";
import EducationList from "@/components/EducationList";
import StatCounter from "@/components/StatCounter";
import Achievements from "@/components/Achievements";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const projectCategories = ["ALL", "AI/ML", "Full Stack", "Automation"];

  const filteredProjects =
    selectedCategory === "ALL"
      ? PORTFOLIO_DATA.projects.items
      : PORTFOLIO_DATA.projects.items.filter(
          (p) => p.category === selectedCategory
        );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LenisProvider>
      <div className="relative bg-[#050505] text-[#E2E8F0] min-h-screen selection:bg-[#FF8A1F]/30 selection:text-[#FF8A1F] overflow-x-hidden">
        {/* Animated Canvas Particle Starfield Background */}
        <StarField />

        {/* Ambient Top Glow */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#FF8A1F]/[0.08] via-transparent to-transparent blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Sticky Mini Navigation */}
        <Navbar />

        {/* Hero Section */}
        <Hero />

        {/* Main Content Sections wrapped in 3D Stacked Glass Cards */}
        <main className="relative z-10 flex flex-col gap-6 sm:gap-10 pb-20">
          
          {/* 01 WHO I AM */}
          <StackedCard
            id="about"
            sectionNumber={PORTFOLIO_DATA.about.sectionNumber}
            label={PORTFOLIO_DATA.about.label}
            heading={PORTFOLIO_DATA.about.heading}
            subtitle="Bridging the frontier of machine learning, modern cloud architectures, and autonomous workflows."
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-5">
                {PORTFOLIO_DATA.about.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal"
                  >
                    {p}
                  </p>
                ))}

                {/* Chips */}
                <div className="pt-4 flex flex-wrap gap-2.5">
                  {PORTFOLIO_DATA.personal.chips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono-code text-neutral-200 bg-[#FF8A1F]/10 border border-[#FF8A1F]/30 shadow-[0_0_12px_rgba(255,138,31,0.15)]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#FF8A1F]" />
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Info Glass Callout */}
              <div className="lg:col-span-4 rounded-2xl bg-[#0e0e13]/90 border border-white/10 p-6 space-y-4">
                <h4 className="font-heading text-xl text-white tracking-wide uppercase border-b border-white/[0.08] pb-3 flex items-center justify-between">
                  <span>HIGHLIGHTS</span>
                  <Award className="w-4 h-4 text-[#FF8A1F]" />
                </h4>

                <div className="space-y-3 font-mono-code text-xs">
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Degree</span>
                    <span className="text-white font-medium">B.Sc. Software Eng.</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>University</span>
                    <span className="text-white font-medium">SSUET, Karachi</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>CGPA</span>
                    <span className="text-[#FF8A1F] font-bold text-sm">3.8 / 4.00</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Research</span>
                    <span className="text-white font-medium">ICISCT 2026</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Availability</span>
                    <span className="text-emerald-400 font-semibold">Immediate / Remote</span>
                  </div>
                </div>
              </div>
            </div>
          </StackedCard>

          {/* 02 TECHNICAL SKILLS */}
          <StackedCard
            id="skills"
            sectionNumber={PORTFOLIO_DATA.skills.sectionNumber}
            label={PORTFOLIO_DATA.skills.label}
            heading={PORTFOLIO_DATA.skills.heading}
            subtitle={PORTFOLIO_DATA.skills.subtitle}
          >
            <SkillGroup categories={PORTFOLIO_DATA.skills.categories} />
          </StackedCard>

          {/* 03 EXPERIENCE */}
          <StackedCard
            id="experience"
            sectionNumber={PORTFOLIO_DATA.experience.sectionNumber}
            label={PORTFOLIO_DATA.experience.label}
            heading={PORTFOLIO_DATA.experience.heading}
            subtitle="Hands-on experience delivering intelligent chatbots, autonomous pipelines, and production web systems."
          >
            <Timeline items={PORTFOLIO_DATA.experience.items} />
          </StackedCard>

          {/* 04 PROJECTS */}
          <StackedCard
            id="projects"
            sectionNumber={PORTFOLIO_DATA.projects.sectionNumber}
            label={PORTFOLIO_DATA.projects.label}
            heading={PORTFOLIO_DATA.projects.heading}
            subtitle="Selected research systems, full-stack applications, and AI workflow automations."
          >
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono-code uppercase tracking-wider transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-[#FF8A1F] text-black font-semibold shadow-[0_0_15px_rgba(255,138,31,0.5)]"
                      : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          </StackedCard>

          {/* 05 EDUCATION */}
          <StackedCard
            id="education"
            sectionNumber={PORTFOLIO_DATA.education.sectionNumber}
            label={PORTFOLIO_DATA.education.label}
            heading={PORTFOLIO_DATA.education.heading}
            subtitle="Academic qualifications, merit recognitions, and professional development programs."
          >
            <EducationList items={PORTFOLIO_DATA.education.items} />
          </StackedCard>

          {/* 06 BY THE NUMBERS */}
          <StackedCard
            id="numbers"
            sectionNumber={PORTFOLIO_DATA.numbers.sectionNumber}
            label={PORTFOLIO_DATA.numbers.label}
            heading={PORTFOLIO_DATA.numbers.heading}
            subtitle="Key milestones that define my academic journey and technical career."
          >
            <StatCounter stats={PORTFOLIO_DATA.numbers.stats} />
          </StackedCard>

          {/* 07 ACHIEVEMENTS */}
          <StackedCard
            id="achievements"
            sectionNumber={PORTFOLIO_DATA.achievements.sectionNumber}
            label={PORTFOLIO_DATA.achievements.label}
            heading={PORTFOLIO_DATA.achievements.heading}
            subtitle="Honors, international publications, and competitive hackathon placements."
          >
            <Achievements items={PORTFOLIO_DATA.achievements.items} />
          </StackedCard>

          {/* 08 CONTACT */}
          <StackedCard
            id="contact"
            sectionNumber={PORTFOLIO_DATA.contact.sectionNumber}
            label={PORTFOLIO_DATA.contact.label}
            heading={PORTFOLIO_DATA.contact.heading}
            subtitle="Ready to discuss engineering roles, collaborative research, or AI automation systems."
          >
            <ContactForm />
          </StackedCard>

        </main>

        {/* Footer */}
        <footer className="relative border-t border-white/10 bg-[#08080a] py-12 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF8A1F] to-amber-300 flex items-center justify-center font-heading text-black font-bold text-lg">
                RT
              </div>
              <div>
                <span className="font-heading text-xl text-white tracking-wider block">
                  ROMANA TAHIR
                </span>
                <span className="font-mono-code text-[11px] text-neutral-400">
                  AI/ML Engineer · Karachi, Pakistan
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-neutral-400">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/[0.04] hover:bg-[#FF8A1F]/20 hover:text-[#FF8A1F] border border-white/10 transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/[0.04] hover:bg-[#FF8A1F]/20 hover:text-[#FF8A1F] border border-white/10 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="p-2.5 rounded-full bg-white/[0.04] hover:bg-[#FF8A1F]/20 hover:text-[#FF8A1F] border border-white/10 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-mono-code text-xs text-neutral-500">
                © {new Date().getFullYear()} Romana Tahir. All rights reserved.
              </span>

              <button
                onClick={scrollToTop}
                className="p-2.5 rounded-full bg-[#FF8A1F]/15 hover:bg-[#FF8A1F] hover:text-black text-[#FF8A1F] border border-[#FF8A1F]/30 transition-all shadow-[0_0_12px_rgba(255,138,31,0.2)]"
                aria-label="Scroll back to top"
                title="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

          </div>
        </footer>
      </div>
    </LenisProvider>
  );
}
