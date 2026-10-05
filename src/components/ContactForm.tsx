"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { LinkedinIcon } from "@/components/Icons";
import confetti from "canvas-confetti";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contact = PORTFOLIO_DATA.contact;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your name";
    }
    if (!formData.email.trim()) {
      errs.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      errs.message = "Please write a message";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message should be at least 10 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF8A1F", "#FFA64D", "#FFFFFF", "#10B981"],
      });
    }, 1000);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left Column: Direct Contact Details */}
      <div className="lg:col-span-5 space-y-6">
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
          {contact.subtitle}
        </p>

        <div className="space-y-4 pt-2">
          {/* Email Item */}
          <div className="rounded-xl bg-[#0e0e12] border border-white/10 p-4 flex items-center justify-between hover:border-[#FF8A1F]/50 transition-colors group">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#FF8A1F]/10 border border-[#FF8A1F]/20 flex items-center justify-center text-[#FF8A1F] group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono-code text-[11px] text-neutral-400 uppercase tracking-wider block">
                  Email
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm font-medium text-white hover:text-[#FF8A1F] transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(contact.email, "email")}
              className="p-2 rounded-lg text-neutral-400 hover:text-white bg-white/[0.04] border border-white/10 hover:border-[#FF8A1F]/40 transition-all"
              aria-label="Copy Email"
              title="Copy Email"
            >
              {copiedField === "email" ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Phone Item */}
          <div className="rounded-xl bg-[#0e0e12] border border-white/10 p-4 flex items-center justify-between hover:border-[#FF8A1F]/50 transition-colors group">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#FF8A1F]/10 border border-[#FF8A1F]/20 flex items-center justify-center text-[#FF8A1F] group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono-code text-[11px] text-neutral-400 uppercase tracking-wider block">
                  Phone
                </span>
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="text-sm font-medium text-white hover:text-[#FF8A1F] transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(contact.phone, "phone")}
              className="p-2 rounded-lg text-neutral-400 hover:text-white bg-white/[0.04] border border-white/10 hover:border-[#FF8A1F]/40 transition-all"
              aria-label="Copy Phone Number"
              title="Copy Phone Number"
            >
              {copiedField === "phone" ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* LinkedIn Item */}
          <div className="rounded-xl bg-[#0e0e12] border border-white/10 p-4 flex items-center justify-between hover:border-[#FF8A1F]/50 transition-colors group">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#FF8A1F]/10 border border-[#FF8A1F]/20 flex items-center justify-center text-[#FF8A1F] group-hover:scale-105 transition-transform">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono-code text-[11px] text-neutral-400 uppercase tracking-wider block">
                  LinkedIn
                </span>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white hover:text-[#FF8A1F] transition-colors flex items-center gap-1"
                >
                  <span>romana-tahir</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-neutral-400 hover:text-white bg-white/[0.04] border border-white/10 hover:border-[#FF8A1F]/40 transition-all"
              aria-label="Open LinkedIn Profile"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Location Item */}
          <div className="rounded-xl bg-[#0e0e12] border border-white/10 p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#FF8A1F]/10 border border-[#FF8A1F]/20 flex items-center justify-center text-[#FF8A1F]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono-code text-[11px] text-neutral-400 uppercase tracking-wider block">
                Base Location
              </span>
              <span className="text-sm font-medium text-white">
                {contact.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Form */}
      <div className="lg:col-span-7">
        <div className="rounded-2xl bg-[#0a0a0d] border border-white/10 p-6 sm:p-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-3xl sm:text-4xl text-white uppercase tracking-wide">
                  Message Sent Successfully!
                </h3>
                <p className="text-neutral-300 text-sm max-w-md">
                  Thank you for reaching out, <span className="text-[#FF8A1F] font-semibold">{formData.name}</span>. I have received your message and will respond promptly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl font-mono-code text-xs uppercase tracking-wider text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block font-mono-code text-xs uppercase tracking-wider text-neutral-300 mb-2"
                  >
                    Your Name <span className="text-[#FF8A1F]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    placeholder="e.g. Alexander Mitchell"
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${
                      errors.name ? "border-red-500" : "border-white/10 focus:border-[#FF8A1F]"
                    } text-white placeholder-neutral-600 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF8A1F] transition-all`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1 font-mono-code">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-mono-code text-xs uppercase tracking-wider text-neutral-300 mb-2"
                  >
                    Your Email <span className="text-[#FF8A1F]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="e.g. alexander@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${
                      errors.email ? "border-red-500" : "border-white/10 focus:border-[#FF8A1F]"
                    } text-white placeholder-neutral-600 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF8A1F] transition-all`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1 font-mono-code">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono-code text-xs uppercase tracking-wider text-neutral-300 mb-2"
                  >
                    Your Message <span className="text-[#FF8A1F]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: "" });
                    }}
                    placeholder="Tell me about your project, vision, or role requirements..."
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${
                      errors.message ? "border-red-500" : "border-white/10 focus:border-[#FF8A1F]"
                    } text-white placeholder-neutral-600 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF8A1F] transition-all resize-none`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400 mt-1 font-mono-code">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-heading text-xl tracking-wider text-black bg-gradient-to-r from-[#FF8A1F] via-amber-400 to-[#FF8A1F] bg-[length:200%_auto] hover:bg-right transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,138,31,0.4)] hover:shadow-[0_0_30px_rgba(255,138,31,0.65)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2 font-mono-code text-sm uppercase">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </div>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
