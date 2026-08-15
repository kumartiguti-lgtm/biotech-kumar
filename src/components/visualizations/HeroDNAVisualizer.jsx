'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Layers, Dna, Share2, Sparkles, Activity } from 'lucide-react';

export default function HeroDNAVisualizer({ externalMode, onModeChange }) {
  const canvasRef = useRef(null);
  const [internalViewMode, setInternalViewMode] = useState('HELIX');
  const viewMode = externalMode || internalViewMode;

  const setViewMode = (mode) => {
    setInternalViewMode(mode);
    if (onModeChange) onModeChange(mode);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse interactive tracking
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Configurations
    const basePairsCount = 38;
    const helixRadius = 110;
    const helixHeight = 500;
    let rotationAngle = 0;
    let time = 0;
    let sonarPulse = 0;

    // Molecular particles with bio-luminescence
    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 3 + 1,
      color: ['#00f0ff', '#8b5cf6', '#0066ff', '#00e5a3', '#38bdf8'][Math.floor(Math.random() * 5)],
      alpha: Math.random() * 0.75 + 0.2,
    }));

    // Microscopic Cell Structures floating on right and left
    const cellNodes = [
      { x: width > 1024 ? 220 : 150, y: -160, size: 30, label: 'CRISPR-CAS13', pulse: 0 },
      { x: width > 1024 ? 320 : 200, y: 160, size: 36, label: 'MITO-VECTOR', pulse: 1.5 },
      { x: width > 1024 ? -260 : -160, y: 180, size: 26, label: 'RECEPTOR-TARGET', pulse: 3 },
    ];

    // Genomic stream items
    const bases = ['A', 'T', 'C', 'G'];
    const streamColumns = Array.from({ length: 22 }).map((_, i) => ({
      x: (i / 22) * width + 20,
      speed: Math.random() * 2.2 + 1.2,
      chars: Array.from({ length: 20 }).map(() => bases[Math.floor(Math.random() * 4)]),
      yOffset: Math.random() * height,
    }));

    const render = () => {
      time += 0.02;
      sonarPulse = (sonarPulse + 0.008) % 1;

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Center DNA canvas graphic at exact center-center for screen widths < 1199px, offset to right on 1200px+ desktops
      const offsetCenterX = width >= 1200 ? width * 0.65 : width / 2;
      const centerX = offsetCenterX + (mouse.x - width / 2) * 0.04;
      const centerY = height / 2 + (mouse.y - height / 2) * 0.04;

      rotationAngle += 0.014;

      ctx.save();
      ctx.translate(centerX, centerY);

      // 1. Sonar Radar Pulse Wave
      const pulseRadius = sonarPulse * Math.min(width, height) * 0.6;
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.35 * (1 - sonarPulse)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Ambient radial cursor glow
      const cursorGlow = ctx.createRadialGradient(
        mouse.x - centerX,
        mouse.y - centerY,
        0,
        mouse.x - centerX,
        mouse.y - centerY,
        350
      );
      cursorGlow.addColorStop(0, 'rgba(0, 240, 255, 0.18)');
      cursorGlow.addColorStop(0.4, 'rgba(139, 92, 246, 0.08)');
      cursorGlow.addColorStop(1, 'rgba(3, 7, 18, 0)');

      ctx.fillStyle = cursorGlow;
      ctx.beginPath();
      ctx.arc(mouse.x - centerX, mouse.y - centerY, 350, 0, Math.PI * 2);
      ctx.fill();

      // Bio-luminescent particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x - centerX, p.y - centerY, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      });

      // MODE 1: 3D DOUBLE HELIX WITH GLOWING RIBBON BACKBONES
      if (viewMode === 'HELIX') {
        const basePairs = [];

        for (let i = 0; i < basePairsCount; i++) {
          const progress = i / basePairsCount;
          const y = (progress - 0.5) * helixHeight;
          const angle = progress * Math.PI * 4 + rotationAngle;

          const x1 = Math.cos(angle) * helixRadius;
          const z1 = Math.sin(angle) * helixRadius;

          const x2 = Math.cos(angle + Math.PI) * helixRadius;
          const z2 = Math.sin(angle + Math.PI) * helixRadius;

          const scale1 = 1 + z1 / 380;
          const scale2 = 1 + z2 / 380;

          const baseType = i % 2 === 0 ? 'A-T' : 'G-C';

          basePairs.push({
            y,
            node1: { x: x1 * scale1, y: y * scale1, z: z1, scale: scale1 },
            node2: { x: x2 * scale2, y: y * scale2, z: z2, scale: scale2 },
            zOrder: z1 + z2,
            baseType,
            index: i,
          });
        }

        basePairs.sort((a, b) => a.zOrder - b.zOrder);

        const strand1Points = basePairs.map((bp) => bp.node1);
        const strand2Points = basePairs.map((bp) => bp.node2);

        // Backbone Ribbon 1
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        strand1Points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // Backbone Ribbon 2
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        strand2Points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // Draw Rungs
        basePairs.forEach((bp) => {
          const { node1, node2, index, baseType } = bp;

          const rungGrad = ctx.createLinearGradient(node1.x, node1.y, node2.x, node2.y);
          if (baseType === 'A-T') {
            rungGrad.addColorStop(0, '#00f0ff');
            rungGrad.addColorStop(0.5, '#4f46e5');
            rungGrad.addColorStop(1, '#8b5cf6');
          } else {
            rungGrad.addColorStop(0, '#00e5a3');
            rungGrad.addColorStop(0.5, '#0066ff');
            rungGrad.addColorStop(1, '#00f0ff');
          }

          ctx.strokeStyle = rungGrad;
          ctx.lineWidth = Math.max(1.5, 2.5 * ((node1.scale + node2.scale) / 2));
          ctx.globalAlpha = 0.7 + ((node1.z + 100) / 200) * 0.3;
          ctx.beginPath();
          ctx.moveTo(node1.x, node1.y);
          ctx.lineTo(node2.x, node2.y);
          ctx.stroke();

          const midX = (node1.x + node2.x) / 2;
          const midY = (node1.y + node2.y) / 2;
          ctx.fillStyle = baseType === 'A-T' ? '#00f0ff' : '#00e5a3';
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(midX, midY, 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#00f0ff';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 12 * node1.scale;
          ctx.beginPath();
          ctx.arc(node1.x, node1.y, 6.5 * node1.scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#8b5cf6';
          ctx.shadowColor = '#8b5cf6';
          ctx.shadowBlur = 12 * node2.scale;
          ctx.beginPath();
          ctx.arc(node2.x, node2.y, 6.5 * node2.scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Floating Microscopic Cell Nodes
        cellNodes.forEach((cell) => {
          cell.pulse += 0.03;
          const currentRadius = cell.size + Math.sin(cell.pulse) * 3.5;

          ctx.strokeStyle = 'rgba(0, 240, 255, 0.55)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(cell.x, cell.y, currentRadius, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = 'rgba(139, 92, 246, 0.65)';
          ctx.shadowColor = '#8b5cf6';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(cell.x, cell.y, currentRadius * 0.45, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.setLineDash([3, 3]);
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
          ctx.beginPath();
          ctx.moveTo(cell.x, cell.y);
          ctx.lineTo(0, cell.y * 0.5);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = 'rgba(12, 24, 56, 0.92)';
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
          ctx.lineWidth = 1;
          const boxW = 105;
          const boxH = 24;
          const boxX = cell.x + 20;
          const boxY = cell.y - 12;

          ctx.fillRect(boxX, boxY, boxW, boxH);
          ctx.strokeRect(boxX, boxY, boxW, boxH);

          ctx.fillStyle = '#00f0ff';
          ctx.font = 'bold 10px monospace';
          ctx.fillText(cell.label, boxX + 6, boxY + 15);
        });
      }

      // MODE 2: MOLECULAR DOCKING COMPLEX
      else if (viewMode === 'DOCKING') {
        const nodeCount = 18;
        const dockingNodes = [];
        for (let i = 0; i < nodeCount; i++) {
          const angle = (i / nodeCount) * Math.PI * 2 + time * 0.4;
          const rad = 150 + Math.sin(time * 2 + i) * 40;
          dockingNodes.push({
            x: Math.cos(angle) * rad,
            y: Math.sin(angle) * rad,
            color: i % 2 === 0 ? '#00f0ff' : i % 3 === 0 ? '#00e5a3' : '#8b5cf6',
          });
        }

        dockingNodes.forEach((n1, i) => {
          dockingNodes.forEach((n2, j) => {
            if (i >= j) return;
            const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
            if (dist < 210) {
              ctx.strokeStyle = `rgba(0, 240, 255, ${0.55 - dist / 420})`;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();

              const progress = (time * 1.2 + i + j) % 1;
              const px = n1.x + (n2.x - n1.x) * progress;
              const py = n1.y + (n2.y - n1.y) * progress;
              ctx.fillStyle = '#00f0ff';
              ctx.beginPath();
              ctx.arc(px, py, 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
          });

          ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(n1.x, n1.y);
          ctx.stroke();

          ctx.fillStyle = n1.color;
          ctx.shadowColor = n1.color;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(n1.x, n1.y, 8.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.arc(0, 0, 26, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 34 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#030712';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('TARGET', -19, 3.5);
      }

      // MODE 3: HOLOGRAPHIC GENOMIC MATRIX STREAM
      else if (viewMode === 'STREAM') {
        ctx.font = 'bold 13px monospace';

        streamColumns.forEach((col) => {
          col.yOffset = (col.yOffset + col.speed) % height;
          col.chars.forEach((char, idx) => {
            const py = (col.yOffset + idx * 24) % height - height / 2;
            const px = col.x - width / 2;

            const isTarget = char === 'A' && idx === 3;
            ctx.fillStyle = isTarget ? '#ffffff' : idx % 2 === 0 ? '#00f0ff' : '#00e5a3';
            ctx.globalAlpha = Math.max(0.12, 1 - idx * 0.07);

            if (isTarget) {
              ctx.shadowColor = '#00f0ff';
              ctx.shadowBlur = 12;
            }

            ctx.fillText(char, px, py);
            ctx.shadowBlur = 0;
          });
        });

        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-120, -35, 240, 70);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
        ctx.fillRect(-120, -35, 240, 70);

        ctx.fillStyle = '#00f0ff';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('CRISPR TARGET MATCH: 99.98%', -105, -15);
        ctx.fillStyle = '#00e5a3';
        ctx.fillText('SEQUENCE: 5\'-ATCG-TAGC-3\'', -105, 15);

        ctx.globalAlpha = 1.0;
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [viewMode]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto">
      {/* Background Main Canvas */}
      <canvas ref={canvasRef} className="w-full h-full relative z-0 cursor-grab active:cursor-grabbing" />

      {/* Mode Control Pill Bar on Top Right (Only shown when not externally managed) */}
      {!externalMode && (
        <div className="absolute top-28 sm:top-36 right-4 sm:right-10 z-20 flex items-center gap-1 sm:gap-2 bg-[#0c1838]/90 border border-[#00f0ff]/30 rounded-full p-1 sm:p-1.5 backdrop-blur-xl shadow-2xl">
          <button
            onClick={() => setViewMode('HELIX')}
            data-cursor="HELIX"
            className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold transition-all ${
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
            className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold transition-all ${
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
            className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold transition-all ${
              viewMode === 'STREAM'
                ? 'bg-[#00e5a3] text-black shadow-[0_0_15px_#00e5a3]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            GENE CODE
          </button>
        </div>
      )}

      {/* Floating Telemetry Chips on Bottom Right */}
      <div className="absolute bottom-10 right-6 sm:right-10 z-20 hidden lg:flex items-center gap-4 bg-[#0c1838]/85 border border-[#00f0ff]/25 rounded-2xl px-5 py-3 backdrop-blur-xl text-xs font-mono text-slate-300 shadow-2xl">
        <span className="flex items-center gap-2 text-[#00e5a3]">
          <span className="w-2 h-2 rounded-full bg-[#00e5a3] animate-ping" />
          A≡T / G≡C PAIRING
        </span>
        <span className="text-slate-600">•</span>
        <span className="text-[#00f0ff]">0.8 Å RESOLUTION</span>
      </div>
    </div>
  );
}



