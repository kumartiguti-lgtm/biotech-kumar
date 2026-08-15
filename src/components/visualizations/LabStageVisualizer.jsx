'use client';

import React, { useEffect, useRef } from 'react';

const STAGES = [
  {
    id: '01',
    title: 'OBSERVE',
    subtitle: 'Single-Molecule Genomic Mapping',
    desc: 'Isolate biological samples and map initial genomic markers at single-molecule resolution.',
    metrics: [
      { label: 'RESOLUTION', val: '0.2 Å', color: '#00f0ff' },
      { label: 'DEPTH', val: '10,000x', color: '#8b5cf6' },
      { label: 'ACCURACY', val: '99.98%', color: '#00e5a3' },
    ],
    status: 'SIGNAL STABLE',
  },
  {
    id: '02',
    title: 'ANALYZE',
    subtitle: 'Cell Organelle Dynamics & Folding',
    desc: 'Simulate cellular organelle interactions and predict protein folding free energy using neural algorithms.',
    metrics: [
      { label: 'FOLDING ΔG', val: '-12.4 kcal', color: '#00f0ff' },
      { label: 'FLUX RATE', val: '4.8 µM/s', color: '#8b5cf6' },
      { label: 'CONFIDENCE', val: '97.4%', color: '#00e5a3' },
    ],
    status: 'SIMULATION ACTIVE',
  },
  {
    id: '03',
    title: 'UNDERSTAND',
    subtitle: 'Driver Mutation Target Decoding',
    desc: 'Decode complex genomic pathways and identify driver mutation targets with sub-angstrom precision.',
    metrics: [
      { label: 'PRECISION', val: '0.05 Å', color: '#00f0ff' },
      { label: 'ENTROPY', val: '0.12 H', color: '#8b5cf6' },
      { label: 'TARGET RANK', val: '#1 ALPHA', color: '#00e5a3' },
    ],
    status: 'PATHWAY DECODED',
  },
  {
    id: '04',
    title: 'TRANSFORM',
    subtitle: 'Target Vector Modeling',
    desc: 'Synthesize precision CRISPR biological vectors tailored for clinical trials and targeted deployment.',
    metrics: [
      { label: 'AFFINITY', val: '98.6%', color: '#00f0ff' },
      { label: 'OFF-TARGET', val: '< 0.01%', color: '#8b5cf6' },
      { label: 'FIDELITY', val: '99.4%', color: '#00e5a3' },
    ],
    status: 'VECTOR READY',
  },
];

export default function LabStageVisualizer({ activeStage = 0, onStageSelect }) {
  const canvasRef = useRef(null);
  const currentStage = STAGES[activeStage] || STAGES[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement.clientHeight || 400);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Center drawing relative to its own dedicated canvas frame
      const cx = width / 2;
      const cy = height / 2;

      // 1. Stage 0: OBSERVE (Rotating Double Helix Strand)
      if (activeStage === 0) {
        ctx.save();
        ctx.translate(cx, cy);

        const strandCount = Math.min(20, Math.floor(height / 20));
        const radiusScale = Math.min(110, width * 0.28);
        for (let i = -strandCount / 2; i <= strandCount / 2; i++) {
          const y = i * 16;
          const phase = i * 0.35 + time;
          const x1 = Math.sin(phase) * radiusScale;
          const x2 = Math.sin(phase + Math.PI) * radiusScale;

          // Rung connector
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();

          // Strand 1 node
          ctx.fillStyle = '#00f0ff';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(x1, y, 5, 0, Math.PI * 2);
          ctx.fill();

          // Strand 2 node
          ctx.fillStyle = '#8b5cf6';
          ctx.shadowColor = '#8b5cf6';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(x2, y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 2. Stage 1: ANALYZE (Cell Organelles & Orbiting Vesicles)
      else if (activeStage === 1) {
        ctx.save();
        ctx.translate(cx, cy);

        const baseR = Math.min(width, height) * 0.30;
        const ringRadii = [baseR, baseR * 0.72, baseR * 0.44];

        ringRadii.forEach((r, idx) => {
          ctx.strokeStyle = idx === 0 ? '#00f0ff' : idx === 1 ? '#8b5cf6' : '#00e5a3';
          ctx.lineWidth = 2;
          ctx.shadowColor = ctx.strokeStyle;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.ellipse(0, 0, r + Math.sin(time + idx) * 6, r * 0.82 + Math.cos(time + idx) * 6, time * (idx % 2 === 0 ? 0.5 : -0.5), 0, Math.PI * 2);
          ctx.stroke();
        });

        for (let i = 0; i < 8; i++) {
          const orbitAngle = (i / 8) * Math.PI * 2 + time;
          const rx = baseR * 0.85;
          const ry = baseR * 0.68;
          const vx = Math.cos(orbitAngle) * rx;
          const vy = Math.sin(orbitAngle) * ry;

          ctx.fillStyle = i % 2 === 0 ? '#00f0ff' : '#00e5a3';
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(vx, vy, 5.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // 3. Stage 2: UNDERSTAND (Chromosome & Sequence Wave Lattice)
      else if (activeStage === 2) {
        ctx.save();
        ctx.translate(cx, cy);

        const rows = 4;
        const cols = Math.min(5, Math.floor(width / 65));
        const spacingX = Math.min(38, width / (cols * 2.5));
        const spacingY = 34;

        for (let r = -rows; r <= rows; r++) {
          for (let c = -cols; c <= cols; c++) {
            const px = c * spacingX;
            const py = r * spacingY;
            const dist = Math.hypot(px, py);
            const wave = Math.sin(dist * 0.03 - time * 2);

            ctx.fillStyle = wave > 0 ? '#00f0ff' : '#8b5cf6';
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = wave > 0.5 ? 10 : 0;
            ctx.beginPath();
            ctx.arc(px, py, Math.max(1.5, 4 + wave * 2.5), 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      }

      // 4. Stage 3: TRANSFORM (Targeted Molecular Vector Hub)
      else {
        ctx.save();
        ctx.translate(cx, cy);

        const nodeCount = 14;
        const nodes = [];
        const baseDist = Math.min(125, Math.min(width, height) * 0.32);

        for (let i = 0; i < nodeCount; i++) {
          const a = (i / nodeCount) * Math.PI * 2 + time * 0.3;
          const dist = baseDist + Math.sin(time * 1.5 + i) * 20;
          nodes.push({ x: Math.cos(a) * dist, y: Math.sin(a) * dist });
        }

        nodes.forEach((n1, i) => {
          nodes.forEach((n2, j) => {
            if (i >= j) return;
            const d = Math.hypot(n1.x - n2.x, n1.y - n2.y);
            if (d < baseDist * 1.2) {
              ctx.strokeStyle = `rgba(0, 240, 255, ${1 - d / (baseDist * 1.2)})`;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          });

          ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(n1.x, n1.y);
          ctx.stroke();

          ctx.fillStyle = '#00e5a3';
          ctx.shadowColor = '#00e5a3';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(n1.x, n1.y, 6, 0, Math.PI * 2);
          ctx.fill();
        });

        // Center hub
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 22;
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeStage]);

  return (
    <div className="relative w-full flex flex-col justify-between p-5 sm:p-8 rounded-3xl bg-[#030712] border border-[#00f0ff]/20 shadow-2xl space-y-6">
      {/* Top Stage Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-[#0c1838]/90 border border-[#00f0ff]/30 rounded-full px-4 py-2 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
          <span className="text-xs font-mono font-bold text-[#00f0ff] uppercase tracking-widest">
            CLINICAL PIPELINE PHASE // {currentStage.id}
          </span>
        </div>

        <div className="text-right font-mono text-xs text-slate-400">
          <span>PROGRESSION: {((activeStage + 1) * 25)}%</span>
        </div>
      </div>

      {/* Main Side-by-Side Content Area (Half-Half 50% Grids from 768px/992px+) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch relative z-10">
        {/* Left Side Dedicated Canvas Visualizer Frame (Half Grid) */}
        <div className="md:col-span-1 relative w-full h-[320px] sm:h-[380px] md:h-auto min-h-[380px] rounded-2xl bg-[#070d1e] border border-[#00f0ff]/20 overflow-hidden flex items-center justify-center shadow-xl">
          <canvas ref={canvasRef} className="w-full h-full relative z-10" />

          {/* Floating HUD Indicator on Canvas */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-[#0c1838]/90 border border-[#00f0ff]/30 px-3 py-1 rounded-full text-[10px] font-mono text-[#00f0ff] backdrop-blur-md">
            <span className="animate-pulse">●</span>
            <span>PHASE 0{activeStage + 1} VISUALIZATION MATRIX</span>
          </div>
        </div>

        {/* Right Side Stage Details & Telemetry Values Card (Half Grid) */}
        <div className="md:col-span-1 flex flex-col justify-between bg-[#0c1838]/90 border border-[#8b5cf6]/40 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl">
          <div className="space-y-4">
            {/* Stage Header Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#00e5a3] font-mono text-xs font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#00e5a3] animate-pulse" />
                <span>PHASE {currentStage.id}</span>
                <span>•</span>
                <span>{currentStage.title}</span>
              </div>

              <div className="px-2.5 py-1 rounded-md bg-[#071A4B] border border-[#00f0ff]/30 font-mono text-[10px] font-bold text-[#00f0ff]">
                {currentStage.status}
              </div>
            </div>

            {/* Stage Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
              {currentStage.title}: {currentStage.subtitle}
            </h3>

            {/* Stage Description */}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
              {currentStage.desc}
            </p>
          </div>

          {/* Real-time Telemetry Values Grid */}
          <div className="grid grid-cols-3 gap-3 pt-5 mt-6 border-t border-slate-800 font-mono">
            {currentStage.metrics.map((metric, i) => (
              <div key={i} className="bg-[#030712]/90 border border-slate-800 rounded-xl p-3 text-center shadow-md">
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">
                  {metric.label}
                </div>
                <div className="text-xs sm:text-sm font-extrabold" style={{ color: metric.color }}>
                  {metric.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Stage Navigation Controls */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {STAGES.map((stg, idx) => {
          const isActive = activeStage === idx;
          return (
            <button
              key={stg.id}
              onClick={() => onStageSelect && onStageSelect(idx)}
              data-cursor="SELECT"
              className={`p-3.5 rounded-xl border text-left transition-all duration-300 backdrop-blur-md ${
                isActive
                  ? 'bg-[#0066ff] text-white border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                  : 'bg-[#0c1838]/70 text-slate-400 border-white/10 hover:border-[#00f0ff]/40 hover:text-white'
              }`}
            >
              <div className="font-mono text-[10px] opacity-80 font-bold mb-1">{stg.id} / STAGE</div>
              <div className="font-bold text-xs sm:text-sm font-sans tracking-wide">{stg.title}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}



