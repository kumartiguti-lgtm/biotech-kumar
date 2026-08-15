'use client';

import React, { useEffect, useRef, useState } from 'react';

const LABELS = [
  { id: 'genomics', title: 'Genomics', desc: 'Understanding biological info at genetic scale', angle: -50, color: '#0066FF' },
  { id: 'cell-biology', title: 'Cell Biology', desc: 'Cellular mechanics and signaling pathways', angle: 20, color: '#7B3FF2' },
  { id: 'bioinformatics', title: 'Bioinformatics', desc: 'Computational biology and structural modeling', angle: 90, color: '#00D4FF' },
  { id: 'molecular', title: 'Molecular Research', desc: 'Microscopic atomic and protein interaction', angle: 160, color: '#00C9A7' },
  { id: 'precision', title: 'Precision Medicine', desc: 'Targeted therapeutics tailored to genetic profiles', angle: 230, color: '#0066FF' },
];

export default function CircularBioVisualizer() {
  const canvasRef = useRef(null);
  const [activeLabel, setActiveLabel] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement.clientHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let angleOffset = 0;

    // Molecular nodes inside circular core
    const innerNodes = Array.from({ length: 24 }).map((_, i) => ({
      angle: (i / 24) * Math.PI * 2,
      distance: 60 + Math.random() * 80,
      size: 3 + Math.random() * 4,
      speed: (Math.random() - 0.5) * 0.008,
      category: LABELS[i % LABELS.length].id,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.32;

      angleOffset += 0.006;

      // Outer light background glow
      const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 1.4);
      bgGlow.addColorStop(0, 'rgba(0, 102, 255, 0.08)');
      bgGlow.addColorStop(0.6, 'rgba(123, 63, 242, 0.04)');
      bgGlow.addColorStop(1, 'rgba(247, 254, 255, 0)');

      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Draw outer rotating ring
      ctx.save();
      ctx.translate(cx, cy);

      ctx.strokeStyle = 'rgba(0, 102, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius * 1.15, angleOffset, angleOffset + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw secondary glowing ring
      ctx.strokeStyle = activeLabel ? 'rgba(0, 212, 255, 0.4)' : 'rgba(123, 63, 242, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius, -angleOffset * 1.5, -angleOffset * 1.5 + Math.PI * 2);
      ctx.stroke();

      // Draw internal chromosome helix rings
      const helixSegments = 16;
      ctx.beginPath();
      for (let i = 0; i <= helixSegments; i++) {
        const theta = (i / helixSegments) * Math.PI * 2 + angleOffset;
        const r = baseRadius * 0.75 + Math.sin(theta * 3) * 15;
        const x = Math.cos(theta) * r;
        const y = Math.sin(theta) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(0, 201, 167, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw inner connected nodes
      innerNodes.forEach((node, idx) => {
        node.angle += node.speed;
        const isHighlighted = activeLabel === node.category || !activeLabel;

        const nx = Math.cos(node.angle) * node.distance;
        const ny = Math.sin(node.angle) * node.distance;

        // Draw connections to nearby nodes
        innerNodes.forEach((other, jdx) => {
          if (idx >= jdx) return;
          const ox = Math.cos(other.angle) * other.distance;
          const oy = Math.sin(other.angle) * other.distance;
          const dist = Math.hypot(nx - ox, ny - oy);

          if (dist < 75) {
            ctx.strokeStyle = isHighlighted ? 'rgba(0, 102, 255, 0.25)' : 'rgba(0, 0, 0, 0.05)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nx, ny);
            ctx.lineTo(ox, oy);
            ctx.stroke();
          }
        });

        // Node dot
        ctx.fillStyle = isHighlighted
          ? node.category === 'genomics'
            ? '#0066FF'
            : node.category === 'cell-biology'
            ? '#7B3FF2'
            : node.category === 'bioinformatics'
            ? '#00D4FF'
            : node.category === 'molecular'
            ? '#00C9A7'
            : '#0066FF'
          : 'rgba(150, 160, 180, 0.3)';

        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = isHighlighted ? 8 : 0;
        ctx.beginPath();
        ctx.arc(nx, ny, isHighlighted ? node.size + 1 : node.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw active highlight beam to active category angle
      if (activeLabel) {
        const item = LABELS.find((l) => l.id === activeLabel);
        if (item) {
          const rad = (item.angle * Math.PI) / 180;
          const beamX = Math.cos(rad) * baseRadius * 1.15;
          const beamY = Math.sin(rad) * baseRadius * 1.15;

          ctx.strokeStyle = item.color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(beamX, beamY);
          ctx.stroke();

          ctx.fillStyle = item.color;
          ctx.shadowColor = item.color;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(beamX, beamY, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeLabel]);

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[600px] flex items-center justify-center select-none bg-gradient-to-b from-[#0c1838]/90 to-[#070d1e] rounded-3xl border border-[#00f0ff]/20 shadow-[0_20px_50px_rgba(3,7,18,0.85)] overflow-hidden">
      {/* Background radial glowing ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] bg-[#0066ff]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Canvas Visualizer */}
      <canvas ref={canvasRef} className="w-full h-full relative z-10" />

      {/* Interactive Floating Category Labels around the circle */}
      {LABELS.map((item) => {
        const rad = (item.angle * Math.PI) / 180;
        const radiusPercent = typeof window !== 'undefined'
          ? (window.innerWidth < 640 ? 26 : window.innerWidth < 1024 ? 30 : 36)
          : 32;
        const left = 50 + Math.cos(rad) * radiusPercent;
        const top = 50 + Math.sin(rad) * radiusPercent;
        const isActive = activeLabel === item.id;

        return (
          <div
            key={item.id}
            onMouseEnter={() => setActiveLabel(item.id)}
            onMouseLeave={() => setActiveLabel(null)}
            data-cursor="EXPLORE"
            style={{ left: `${left}%`, top: `${top}%` }}
            className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
              isActive ? 'scale-110 z-30' : 'hover:scale-105'
            }`}
          >
            <div
              className={`flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border shadow-xl backdrop-blur-md transition-all duration-300 ${
                isActive
                  ? 'bg-[#0066ff] text-white border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.6)]'
                  : 'bg-[#0c1838]/90 text-slate-200 border-[#00f0ff]/25 hover:border-[#00f0ff]'
              }`}
            >
              <span
                className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-transform duration-300 shadow-sm shrink-0"
                style={{ backgroundColor: item.color, transform: isActive ? 'scale(1.3)' : 'scale(1)' }}
              />
              <span className="text-[11px] sm:text-sm font-semibold tracking-wide font-sans whitespace-nowrap">{item.title}</span>
            </div>

            {/* Hover Tooltip Card */}
            {isActive && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 sm:w-56 p-3 sm:p-3.5 bg-[#030712]/95 text-white text-xs rounded-2xl border border-[#00f0ff]/40 shadow-2xl z-40 pointer-events-none animate-fadeIn backdrop-blur-2xl">
                <p className="font-mono text-[#00f0ff] text-[9px] sm:text-[10px] mb-1 uppercase font-bold">SYSTEM // INTEGRATED</p>
                <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed font-sans">{item.desc}</p>
              </div>
            )}
          </div>
        );
      })}

      {/* Center Label Badge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-center">
        <div className="bg-[#0c1838]/95 border border-[#00f0ff]/40 rounded-2xl p-3 sm:p-4 backdrop-blur-xl shadow-2xl">
          <p className="text-[9px] sm:text-[10px] font-mono text-[#00f0ff] uppercase tracking-widest font-bold">GENOMIC PLATFORM</p>
          <p className="text-white font-bold text-sm sm:text-lg font-sans">AETHERIA BIO</p>
        </div>
      </div>
    </div>
  );
}

