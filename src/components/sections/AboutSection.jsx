'use client';

import React from 'react';
import CircularBioVisualizer from '../visualizations/CircularBioVisualizer';
import { Microscope, Cpu, Sparkles, CheckCircle2, ShieldCheck, Dna } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-14 sm:py-16 lg:py-20 px-4 sm:px-8 bg-[#070d1e] text-white transition-colors duration-500 overflow-hidden scroll-mt-20">
      {/* Background ambient glowing light elements */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#0066ff]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#8b5cf6]/12 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        {/* Left Column: Heading & Copy (Full width on <1024px/992px, 6 cols on 1024px+) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c1838] border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-xs font-bold tracking-widest uppercase shadow-lg">
            <Dna className="w-3.5 h-3.5" />
            <span>01 / ENTERPRISE PLATFORM ARCHITECTURE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-sans tracking-tight">
            Decoding Living Systems. <br />
            <span className="bg-gradient-to-r from-white via-[#00f0ff] to-[#00e5a3] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,240,255,0.35)]">
              Engineered for <br />
              Human Health.
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            Aetheria Bio merges high-throughput single-cell genomics with neural molecular dynamics. We map target cellular pathways and engineer high-affinity biological vectors to overcome complex disease challenges.
          </p>

          {/* Core pillars checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#0c1838]/80 border border-[#00f0ff]/20 shadow-xl hover:border-[#00f0ff]/50 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-[#00f0ff]/15 flex items-center justify-center text-[#00f0ff] shrink-0">
                <Microscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Deep Gene Sequencing</h4>
                <p className="text-slate-400 text-xs mt-0.5">Sub-angstrom structural mapping</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#0c1838]/80 border border-[#00f0ff]/20 shadow-xl hover:border-[#8b5cf6]/50 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-[#8b5cf6]/15 flex items-center justify-center text-[#8b5cf6] shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">AI Computational Core</h4>
                <p className="text-slate-400 text-xs mt-0.5">Neural protein folding engine</p>
              </div>
            </div>
          </div>

          {/* Compliance & Certification Pill Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c1838] border border-slate-700 shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00e5a3]" /> FDA CLINICAL STAGE PASS
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c1838] border border-slate-700 shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00f0ff]" /> ISO 13485 CERTIFIED LAB
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Circular Bio Visualizer (Full width on <1024px/992px, 6 cols on 1024px+) */}
        <div className="lg:col-span-6 relative w-full">
          <CircularBioVisualizer />
        </div>
      </div>
    </section>
  );
}


