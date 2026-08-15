'use client';

import React from 'react';
import Logo from '../ui/Logo';
import { Dna, Mail, ArrowUp, Globe, Share2, MessageSquare, ShieldCheck, FileText } from 'lucide-react';

export default function Footer({ onOpenContact }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030712] text-slate-400 font-sans pt-16 pb-12 px-4 sm:px-8 border-t border-[#00f0ff]/15 overflow-hidden">
      {/* Animated Molecular Line Across Footer Top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent animate-pulse" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 justify-between">
          {/* Brand Info */}
          <div className="sm:col-span-2 md:col-span-5 space-y-4">
            <Logo size="large" />
            <p className="text-slate-300 text-sm max-w-sm leading-relaxed">
              Advancing life through synthetic biology, single-cell genomic intelligence, and targeted therapeutic vector platforms.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#0c1838] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all"
                aria-label="Global Portal"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#0c1838] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all"
                aria-label="Network Share"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#0c1838] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all"
                aria-label="Community"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1 md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">ENTERPRISE SECTIONS</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="hover:text-[#00f0ff] transition-colors">
                  Platform Architecture
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-[#00f0ff] transition-colors">
                  Research Pipeline
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-[#00f0ff] transition-colors">
                  Proprietary Tech
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-[#00f0ff] transition-colors">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-[#00f0ff] transition-colors">
                  Impact Matrix
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="sm:col-span-1 md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">GLOBAL R&D HEADQUARTERS</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              AETHERIA BIO THERAPEUTICS INC. <br />
              100 GENOME PARKWAY, SUITE 800 <br />
              CAMBRIDGE, MA 02142, USA
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 text-xs font-mono text-[#00f0ff] hover:underline font-semibold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>CLINICAL COLLABORATION INQUIRIES</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Compliance Row */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-center sm:text-left">
            <span className="whitespace-nowrap">© 2026 AETHERIA BIO INC. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="text-[#00e5a3] whitespace-nowrap">ISO 13485 & FDA REGISTRATIONS ACTIVE</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-white transition-colors whitespace-nowrap">
              PRIVACY POLICY
            </a>
            <a href="#" className="hover:text-white transition-colors whitespace-nowrap">
              TERMS OF SERVICE
            </a>
            <button
              onClick={scrollToTop}
              data-cursor="TOP"
              className="w-8 h-8 rounded-full bg-[#0c1838] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all shadow-md shrink-0"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

