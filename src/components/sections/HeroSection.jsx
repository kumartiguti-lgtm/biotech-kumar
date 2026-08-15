'use client';

import React, { useState, useEffect } from 'react';
import HeroDNAVisualizer from '../visualizations/HeroDNAVisualizer';
import { ArrowRight, Dna, Activity, CheckCircle2 } from 'lucide-react';

const REVOLVING_PHRASES = [
  'Accelerating Discovery.',
  'Decoding Single-Cells.',
  'Simulating Molecular Docking.',
  'Engineering Gene Therapeutics.',
];

export default function HeroSection({ onOpenContact }) {
  const [viewMode, setViewMode] = useState('HELIX');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = REVOLVING_PHRASES[phraseIndex];
    let typingSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && displayText === currentFullText) {
      typingSpeed = 2400; // Pause when full phrase is typed
      const timeout = setTimeout(() => setIsDeleting(true), typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % REVOLVING_PHRASES.length);
      typingSpeed = 250;
      const timeout = setTimeout(() => {}, typingSpeed);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentFullText.substring(0, displayText.length - 1)
          : currentFullText.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section className="relative w-full min-h-screen pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-8 flex items-center bg-[#030712] overflow-hidden">
      {/* Full-width 3D Canvas Background */}
      <HeroDNAVisualizer externalMode={viewMode} onModeChange={setViewMode} />

      {/* Light Gradient Overlay Vignette for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/85 to-transparent z-[1] pointer-events-none" />

      {/* Hero Content placed directly over gradient overlay */}
      <div className="max-w-7xl mx-auto w-full space-y-6 sm:space-y-8 relative z-10">
        {/* Top Header Controls Bar: 2 Rows under < 1024px/992px, 1 Row (Badge Left, Mode Controls Right) on 1024px+ Desktops */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3.5 w-full pointer-events-auto">
          {/* Eyebrow Badge (Row 1 under <1024px/992px, Left on 1024px+) */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#0c1838]/90 border border-[#00f0ff]/35 shadow-[0_0_20px_rgba(0,240,255,0.2)] backdrop-blur-md max-w-max">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00e5a3] animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider sm:tracking-[0.2em] text-[#00f0ff] uppercase truncate">
              US ENTERPRISE PLATFORM • FDA PHASE III APPROVED
            </span>
          </div>

          {/* 3D Visualizer Mode Control Pills (Row 2 under <1024px/992px, Aligned Right on 1024px+) */}
          <div className="inline-flex items-center gap-1 sm:gap-2 bg-[#0c1838]/90 border border-[#00f0ff]/30 rounded-full p-1 sm:p-1.5 backdrop-blur-xl shadow-2xl max-w-max lg:ml-auto">
            <button
              onClick={() => setViewMode('HELIX')}
              data-cursor="HELIX"
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold transition-all ${
                viewMode === 'HELIX'
                  ? 'bg-[#0066ff] text-white shadow-[0_0_15px_#0066ff]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3D HELIX
            </button>

            <button
              onClick={() => setViewMode('DOCKING')}
              data-cursor="DOCKING"
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold transition-all ${
                viewMode === 'DOCKING'
                  ? 'bg-[#8b5cf6] text-white shadow-[0_0_15px_#8b5cf6]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              DOCKING
            </button>

            <button
              onClick={() => setViewMode('STREAM')}
              data-cursor="SEQUENCE"
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold transition-all ${
                viewMode === 'STREAM'
                  ? 'bg-[#00e5a3] text-black shadow-[0_0_15px_#00e5a3]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              GENE CODE
            </button>
          </div>
        </div>

        {/* Hero Headline & Copy Container */}
        <div className="max-w-2xl lg:max-w-3xl space-y-5 sm:space-y-7 pointer-events-auto">

          {/* Main Headline with Typewriter Effect */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] sm:leading-[1.05] font-sans min-h-[110px] sm:min-h-[160px]">
            Engineering Life. <br />
            <span className="bg-gradient-to-r from-white via-[#00f0ff] to-[#8b5cf6] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,240,255,0.45)]">
              {displayText}
            </span>
            <span className="text-[#00f0ff] animate-pulse font-light ml-1 drop-shadow-[0_0_15px_#00f0ff]">|</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-slate-300 text-sm sm:text-lg max-w-xl font-normal leading-relaxed">
            Integrating artificial intelligence with synthetic biology to model molecular docking, sequence target genes, and engineer next-generation targeted therapeutics.
          </p>

          {/* CTA Action Triggers */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <button
              onClick={onOpenContact}
              data-cursor="PARTNER"
              className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#0066ff] via-[#4f46e5] to-[#00f0ff] text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_30px_rgba(0,102,255,0.5)] hover:shadow-[0_0_45px_rgba(0,240,255,0.8)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <span>Initiate Clinical Partnership</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#technology"
              data-cursor="SPECS"
              className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#0c1838]/90 border border-[#00f0ff]/30 text-white hover:text-[#00f0ff] hover:border-[#00f0ff] font-semibold text-xs sm:text-sm tracking-wide backdrop-blur-md hover:bg-[#0c1838] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <Dna className="w-4 h-4 text-[#00e5a3]" />
              <span>Explore Platform Specs</span>
            </a>
          </div>

          {/* High-Impact Enterprise Metric Cards Strip */}
          <div className="pt-5 border-t border-slate-800/80 grid grid-cols-3 gap-2.5 sm:gap-4 text-left">
            <div className="bg-[#0c1838]/60 border border-[#00f0ff]/20 rounded-2xl p-3 sm:p-4 backdrop-blur-md hover:border-[#00f0ff]/50 transition-all duration-300 shadow-lg">
              <div className="text-lg sm:text-2xl font-extrabold text-white font-mono">99.98%</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-sans font-medium mt-0.5 leading-tight">Sequence Fidelity</div>
            </div>
            <div className="bg-[#0c1838]/60 border border-[#00f0ff]/20 rounded-2xl p-3 sm:p-4 backdrop-blur-md hover:border-[#00f0ff]/50 transition-all duration-300 shadow-lg">
              <div className="text-lg sm:text-2xl font-extrabold text-[#00f0ff] font-mono">18+</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-sans font-medium mt-0.5 leading-tight">Patented Platforms</div>
            </div>
            <div className="bg-[#0c1838]/60 border border-[#00f0ff]/20 rounded-2xl p-3 sm:p-4 backdrop-blur-md hover:border-[#00f0ff]/50 transition-all duration-300 shadow-lg">
              <div className="text-lg sm:text-2xl font-extrabold text-[#00e5a3] font-mono">14</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-sans font-medium mt-0.5 leading-tight">Clinical Vectors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}






