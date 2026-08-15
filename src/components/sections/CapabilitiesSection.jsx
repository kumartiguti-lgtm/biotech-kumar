'use client';

import React, { useState } from 'react';
import {
  Dna,
  Database,
  TestTube2,
  Stethoscope,
  Cpu,
  Leaf,
  ArrowRight,
  Activity,
  Sparkles,
  CheckCircle2,
  Filter,
} from 'lucide-react';

const CATEGORIES = ['ALL', 'GENOMICS & AI', 'THERAPEUTICS', 'BIO-MATERIALS'];

const CAPABILITIES = [
  {
    id: 'genomics',
    title: 'Single-Cell Genomics',
    category: 'GENOMICS & AI',
    description:
      'Mapping biological information at single-nucleotide genetic resolution to identify rare cellular variants and driver mutations.',
    icon: Dna,
    color: '#0066ff',
    stats: '3.2B Base Pairs / Sec',
    badge: 'PLATFORM CORE',
    metricLabel: 'SEQUENCER FIDELITY',
    metricVal: '99.98%',
    featured: true,
  },
  {
    id: 'bioinformatics',
    title: 'Neural Bioinformatics',
    category: 'GENOMICS & AI',
    description:
      'Transforming multi-omic genomic data into 3D structural protein folding models with deep neural energy scoring.',
    icon: Database,
    color: '#00f0ff',
    stats: '140+ Clinical Datasets',
    badge: 'AI MODEL',
    metricLabel: 'FOLDING TARGETS',
    metricVal: '1.2M Structures',
  },
  {
    id: 'cell-research',
    title: 'Cellular Therapeutics',
    category: 'THERAPEUTICS',
    description:
      'Modulating stem cell plasticity, cellular senescence, and receptor signaling vectors for targeted tissue regeneration.',
    icon: TestTube2,
    color: '#8b5cf6',
    stats: '8,500+ Cell Lines',
    badge: 'R&D READY',
    metricLabel: 'ASSAY SPEED',
    metricVal: '< 12 Hours',
  },
  {
    id: 'therapeutics',
    title: 'Targeted Vector Delivery',
    category: 'THERAPEUTICS',
    description:
      'Engineering non-viral lipid nanoparticle vectors engineered to deliver CRISPR payloads directly to target organ tissues.',
    icon: Stethoscope,
    color: '#00e5a3',
    stats: '14 Clinical Targets',
    badge: 'PHASE III',
    metricLabel: 'TROPISM RATE',
    metricVal: '94.2%',
    featured: true,
  },
  {
    id: 'ai-biology',
    title: 'AI Protein Design',
    category: 'GENOMICS & AI',
    description:
      'In silico deep generative protein docking algorithms predicting binding affinity trajectories and kinetic stability in real time.',
    icon: Cpu,
    color: '#00f0ff',
    stats: '99.8% Dock Accuracy',
    badge: 'GENERATIVE AI',
    metricLabel: 'SIMULATION SPEED',
    metricVal: '100k Ops/Sec',
  },
  {
    id: 'sustainability',
    title: 'Sustainable Bio-Materials',
    category: 'BIO-MATERIALS',
    description:
      'Engineering enzymatic metabolic pathways for carbon capture, circular biopolymers, and zero-carbon therapeutic vectors.',
    icon: Leaf,
    color: '#00e5a3',
    stats: 'Zero-Carbon Vector',
    badge: 'ECO TECH',
    metricLabel: 'BIO-CIRCULARITY',
    metricVal: '100% Closed Loop',
  },
];

export default function CapabilitiesSection() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredCapabilities = CAPABILITIES.filter((cap) => {
    if (activeFilter === 'ALL') return true;
    return cap.category === activeFilter;
  });

  return (
    <section id="capabilities" className="relative py-14 sm:py-16 lg:py-20 px-4 sm:px-8 bg-[#030712] text-white overflow-hidden scroll-mt-20">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0066ff]/10 rounded-full blur-[220px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-800/80 pb-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c1838] border border-[#00e5a3]/30 text-[#00e5a3] font-mono text-xs font-bold tracking-widest uppercase">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>03 / ENTERPRISE CAPABILITIES</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-sans tracking-tight">
              From Lab Discovery <br />
              <span className="text-gradient-cyan font-extrabold">
                to Clinical Deployment.
              </span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              We operate across six specialized biotechnology disciplines to accelerate target discovery, in silico validation, and clinical translation.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-[#0c1838]/80 p-2 rounded-2xl border border-slate-800 backdrop-blur-md">
            <div className="flex items-center gap-1.5 px-3 py-1 text-slate-400 font-mono text-xs">
              <Filter className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>FILTER:</span>
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                data-cursor="SELECT"
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-[#0066ff] text-white shadow-[0_0_15px_rgba(0,102,255,0.5)] border border-[#00f0ff]/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Balanced Enterprise Capabilities Grid (Full-width under 577px, 2 columns from 577px/768px, 3 columns from 1024px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {filteredCapabilities.map((cap) => {
            const Icon = cap.icon;
            const isHovered = hoveredCard === cap.id;

            return (
              <div
                key={cap.id}
                onMouseEnter={() => setHoveredCard(cap.id)}
                onMouseLeave={() => setHoveredCard(null)}
                data-cursor="INSPECT"
                className={`group relative p-7 sm:p-8 rounded-3xl bg-[#0c1838]/70 border transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between ${
                  cap.featured
                    ? 'border-[#00f0ff]/40 bg-gradient-to-br from-[#0c1838]/90 via-[#0a1430]/80 to-[#030712] shadow-[0_10px_30px_rgba(0,102,255,0.15)]'
                    : 'border-white/10 hover:border-[#00f0ff]/50 hover:shadow-[0_10px_25px_rgba(0,240,255,0.12)]'
                }`}
              >
                {/* Background Scientific Reveal Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 80% 20%, ${cap.color}50 0%, transparent 70%)`,
                  }}
                />

                <div className="space-y-6 relative z-10">
                  {/* Top Badges & Icon */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundColor: `${cap.color}18`,
                        borderColor: `${cap.color}45`,
                        color: cap.color,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/25 text-[#00f0ff]">
                        {cap.badge}
                      </span>
                      <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-lg bg-[#030712]/90 border border-slate-700 text-slate-300">
                        {cap.stats}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-sans group-hover:text-[#00f0ff] transition-colors flex items-center gap-2">
                      <span>{cap.title}</span>
                      {cap.featured && (
                        <Sparkles className="w-4 h-4 text-[#00f0ff] animate-pulse" />
                      )}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans min-h-[60px]">
                      {cap.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Live Metric Bar & CTA */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-3 relative z-10">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-slate-400 uppercase font-semibold">{cap.metricLabel}</span>
                    <span className="font-bold font-mono text-white" style={{ color: cap.color }}>
                      {cap.metricVal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white transition-colors pt-1">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00e5a3]" />
                      <span>EXPLORE SPECS</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#00f0ff] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


