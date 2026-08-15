'use client';

import React from 'react';
import InteractiveDataSandbox from '../visualizations/InteractiveDataSandbox';
import { Cpu, Sparkles } from 'lucide-react';

export default function DataVizSection() {
  return (
    <section className="relative py-14 sm:py-16 lg:py-20 px-4 sm:px-8 bg-[#040E2B] text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071A4B] border border-[#00D4FF]/30 text-[#00D4FF] font-mono text-xs font-bold tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>INTERACTIVE LABORATORY SANDBOX</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            Biological Data Matrix
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Hover over and click nodes in the matrix to inspect real-time nucleotide sequencing telemetry, binding kinetics, and structural confidence metrics.
          </p>
        </div>

        {/* Embedded Interactive Biological Data Sandbox */}
        <InteractiveDataSandbox />
      </div>
    </section>
  );
}
