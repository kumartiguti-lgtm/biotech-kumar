'use client';

import React from 'react';
import { ArrowRight, Dna, Sparkles, Building2 } from 'lucide-react';

export default function CTASection({ onOpenContact }) {
  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-8 bg-[#0c1838] text-white overflow-hidden text-center">
      {/* Background glowing ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-[#0066ff]/20 via-[#8b5cf6]/20 to-[#00f0ff]/20 rounded-full blur-[190px] pointer-events-none" />

      {/* Subtle Background DNA Watermark Graphic */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none animate-pulse-subtle">
        <svg viewBox="0 0 600 600" className="w-[850px] h-[850px] text-[#00f0ff]">
          <circle cx="300" cy="300" r="280" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" fill="none" />
          <circle cx="300" cy="300" r="200" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M150 150 Q 300 450 450 150 T 150 150" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#030712] border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-xs font-bold tracking-widest uppercase">
          <Dna className="w-4 h-4 animate-spin" />
          <span>GLOBAL BIOPHARMA ALLIANCES</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight font-sans">
          Accelerate your clinical <br />
          <span className="text-gradient-hero drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
            pipeline with Aetheria Bio.
          </span>
        </h2>

        <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto font-sans leading-relaxed">
          Partner with our computational biology team to co-develop target vectors, license genomic intelligence models, or initiate clinical trials.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenContact}
            data-cursor="CONNECT"
            className="px-9 py-4.5 rounded-full bg-gradient-to-r from-[#0066ff] via-[#4f46e5] to-[#00f0ff] text-white font-bold text-base tracking-wide shadow-[0_0_30px_rgba(0,102,255,0.5)] hover:shadow-[0_0_45px_rgba(0,240,255,0.7)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span>Access Partner Portal</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#technology"
            data-cursor="SPECS"
            className="px-8 py-4.5 rounded-full bg-[#030712]/80 border border-[#00f0ff]/30 text-white hover:text-[#00f0ff] font-semibold text-base tracking-wide backdrop-blur-md hover:bg-[#030712] transition-all duration-300"
          >
            View Technology Whitepapers
          </a>
        </div>
      </div>
    </section>
  );
}

