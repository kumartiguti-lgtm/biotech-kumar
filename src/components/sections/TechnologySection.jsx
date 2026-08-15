'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Dna, Share2, Target, ArrowUpRight, Sparkles, Cpu } from 'lucide-react';

export default function TechnologySection() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section id="technology" className="relative py-14 sm:py-16 lg:py-20 px-4 sm:px-8 bg-[#070d1e] text-white overflow-hidden scroll-mt-20">
      {/* Glow background effects */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#0066ff]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8b5cf6]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c1838] border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-xs font-bold tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>02 / PROPRIETARY TECHNOLOGY ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-sans tracking-tight">
            Transforming Biological Data <br />
            <span className="text-gradient-hero font-extrabold">
              into Targeted Molecular <br />
              Therapeutics.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Our multi-scale technology stack bridges high-throughput sequence alignment with neural docking prediction and precision gene modification.
          </p>
        </div>

        {/* 3 Interactive Cards Grid: Under 1024px/992px -> 2 cards in Row 1, last card half-grid centered in Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 01: Genomic Intelligence */}
          <TechCard
            index={0}
            title="Genomic Intelligence Engine"
            description="Decode complex multi-omic biological information using deep neural sequence alignment with single-nucleotide accuracy."
            icon={Dna}
            accentColor="#00f0ff"
            isActive={activeCard === 0}
            onHover={() => setActiveCard(0)}
            renderVisual={(canvasRef) => <GenomicCanvas canvasRef={canvasRef} />}
            className="md:col-span-1 lg:col-span-1"
          />

          {/* Card 02: Molecular Discovery */}
          <TechCard
            index={1}
            title="Molecular Docking Simulator"
            description="Simulate atomic interactions at sub-angstrom scale to predict binding free energy trajectories and optimize ligand affinity."
            icon={Share2}
            accentColor="#8b5cf6"
            isActive={activeCard === 1}
            onHover={() => setActiveCard(1)}
            renderVisual={(canvasRef) => <MolecularCanvas canvasRef={canvasRef} />}
            className="md:col-span-1 lg:col-span-1"
          />

          {/* Card 03: Precision Biology (Half-grid centered under 1024px/992px) */}
          <TechCard
            index={2}
            title="Precision CRISPR Vectors"
            description="Translate in silico predictions into targeted CRISPR-Cas13 biological vectors engineered to modulate cell targets with zero off-target toxicity."
            icon={Target}
            accentColor="#00e5a3"
            isActive={activeCard === 2}
            onHover={() => setActiveCard(2)}
            renderVisual={(canvasRef) => <PrecisionCanvas canvasRef={canvasRef} />}
            className="md:col-span-2 lg:col-span-1 justify-self-center w-full md:max-w-[calc(50%-1rem)] lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}

function TechCard({ index, title, description, icon: Icon, accentColor, isActive, onHover, renderVisual, className = '' }) {
  const canvasRef = useRef(null);

  return (
    <div
      onMouseEnter={onHover}
      data-cursor="INSPECT"
      className={`group relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-500 overflow-hidden cursor-pointer border-glow-hover ${isActive
          ? 'bg-[#0c1838]/90 border-[#00f0ff] shadow-[0_15px_40px_rgba(0,240,255,0.25)] scale-[1.02]'
          : 'bg-[#0c1838]/50 border-white/10 hover:border-[#00f0ff]/40'
        } ${className}`}
    >
      {/* Laser Scanline Beam Effect on Hover */}
      <div className="animate-bio-scan opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Top Visualizer Canvas Container */}
      <div className="relative w-full h-56 rounded-2xl bg-[#030712] border border-slate-700/60 mb-6 overflow-hidden">
        {renderVisual(canvasRef)}
        <div className="absolute top-3 right-3 p-2.5 rounded-xl bg-[#0c1838]/90 border border-slate-700/80 text-white group-hover:border-[#00f0ff] group-hover:text-[#00f0ff] transition-colors shadow-lg">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-md"
            style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}40`, color: accentColor }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-mono text-xs font-bold text-slate-400">MODULE 0{index + 1}</span>
        </div>

        <h3 className="text-2xl font-bold text-white font-sans group-hover:text-[#00f0ff] transition-colors">
          {title}
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed font-sans">{description}</p>
      </div>

      {/* Bottom glowing line indicator */}
      <div
        className="mt-6 h-1 w-full rounded-full transition-all duration-500"
        style={{
          backgroundColor: isActive ? accentColor : 'rgba(255,255,255,0.1)',
          boxShadow: isActive ? `0 0 15px ${accentColor}` : 'none',
        }}
      />
    </div>
  );
}

// Custom Canvas Renderers inside Technology Cards

function GenomicCanvas({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement.clientHeight || 200);

    let offset = 0;
    const bases = ['A', 'T', 'C', 'G'];

    const render = () => {
      offset += 1.5;
      ctx.clearRect(0, 0, width, height);

      const barCount = 18;
      const spacing = width / barCount;

      for (let i = 0; i < barCount; i++) {
        const x = i * spacing + 10;
        const h = Math.sin((i + offset * 0.05) * 0.8) * 45 + 50;
        const y1 = height / 2 - h / 2;

        ctx.fillStyle = i % 2 === 0 ? '#00f0ff' : '#8b5cf6';
        ctx.fillRect(x, y1, 6, h);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '9px monospace';
        ctx.fillText(bases[(i + Math.floor(offset * 0.1)) % 4], x - 1, y1 - 6);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [canvasRef]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function MolecularCanvas({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement.clientHeight || 200);

    let t = 0;
    const nodes = [
      { x: width * 0.3, y: height * 0.4 },
      { x: width * 0.7, y: height * 0.3 },
      { x: width * 0.5, y: height * 0.7 },
      { x: width * 0.2, y: height * 0.8 },
      { x: width * 0.8, y: height * 0.75 },
    ];

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((n1, i) => {
        nodes.forEach((n2, j) => {
          if (i >= j) return;
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(n1.x + Math.sin(t + i) * 6, n1.y + Math.cos(t + i) * 6);
          ctx.lineTo(n2.x + Math.cos(t + j) * 6, n2.y + Math.sin(t + j) * 6);
          ctx.stroke();
        });

        ctx.fillStyle = '#8b5cf6';
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(n1.x + Math.sin(t + i) * 6, n1.y + Math.cos(t + i) * 6, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [canvasRef]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function PrecisionCanvas({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement.clientHeight || 200);

    let angle = 0;

    const render = () => {
      angle += 0.03;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      ctx.strokeStyle = '#00e5a3';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00e5a3';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(cx, cy, 46, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 66 + Math.sin(angle) * 4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - 75, cy);
      ctx.lineTo(cx + 75, cy);
      ctx.moveTo(cx, cy - 75);
      ctx.lineTo(cx, cy + 75);
      ctx.stroke();

      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [canvasRef]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

