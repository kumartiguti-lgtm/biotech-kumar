'use client';

import React, { useState } from 'react';
import LabStageVisualizer from '../visualizations/LabStageVisualizer';
import { Microscope, FlaskConical, Dna, ArrowRight } from 'lucide-react';

export default function LabExperienceSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="research" className="relative py-14 sm:py-16 lg:py-20 px-4 sm:px-8 bg-[#0c1838] text-white overflow-hidden scroll-mt-20">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#0066ff]/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#030712] border border-[#8b5cf6]/40 text-[#8b5cf6] font-mono text-xs font-bold tracking-widest uppercase">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>DIGITAL R&D LABORATORY ENVIRONMENT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
              Clinical Stage Workflow
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Experience our 4-phase digital research pipeline. Interactively step from raw high-throughput sequence mapping to targeted therapeutic vector synthesis.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-3 bg-[#030712] border border-[#00f0ff]/20 px-5 py-2.5 rounded-2xl font-mono text-xs text-[#00f0ff] shadow-lg">
            <span className="animate-ping w-2 h-2 rounded-full bg-[#00e5a3]" />
            <span>PIPELINE STAGE: 0{activeStage + 1} / 04</span>
          </div>
        </div>

        {/* Embedded Interactive Lab Stage Canvas Visualizer */}
        <LabStageVisualizer activeStage={activeStage} onStageSelect={(idx) => setActiveStage(idx)} />
      </div>
    </section>
  );
}

