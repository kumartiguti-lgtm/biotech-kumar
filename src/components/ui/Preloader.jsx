'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Activity } from 'lucide-react';

export default function Preloader() {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [statusText, setStatusText] = useState('INITIALIZING GENOMIC ENGINE...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 350);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next > 30 && next < 60) setStatusText('COMPUTING MOLECULAR DOCKING...');
        if (next >= 60 && next < 90) setStatusText('ALIGNING SINGLE-CELL SEQUENCES...');
        if (next >= 90) setStatusText('PLATFORM ACTIVE');
        return Math.min(100, next);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // 3D Rotating Molecular Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = 300);
    let height = (canvas.height = 300);

    let angle = 0;
    const nodeCount = 14;

    const render = () => {
      angle += 0.025;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Outer rotating dash ring
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.arc(cx, cy, 110, angle * 0.5, angle * 0.5 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Inner 3D rotating molecular nodes
      const nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const theta = (i / nodeCount) * Math.PI * 2 + angle;
        const rad = 85 + Math.sin(angle * 2 + i) * 12;
        const z = Math.sin(theta) * 45;
        const scale = 1 + z / 220;

        nodes.push({
          x: cx + Math.cos(theta) * rad * scale,
          y: cy + Math.sin(theta) * rad * 0.5 * scale,
          color: i % 2 === 0 ? '#00f0ff' : i % 3 === 0 ? '#00e5a3' : '#8b5cf6',
          scale,
        });
      }

      // Draw energy links between rotating nodes
      nodes.forEach((n1, i) => {
        nodes.forEach((n2, j) => {
          if (i >= j) return;
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < 90) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.45 - dist / 220})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        });

        // Node sphere
        ctx.fillStyle = n1.color;
        ctx.shadowColor = n1.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, 6.5 * n1.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#030712] text-white transition-opacity duration-500 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#0066ff]/20 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center space-y-5 sm:space-y-6 px-4">
        {/* 3D Rotating Molecular Canvas Container */}
        <div className="relative w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full" />
          
          {/* Glowing Glass Percentage Counter Badge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#030712]/90 border-2 border-[#00f0ff] shadow-[0_0_30px_rgba(0,240,255,0.6)] flex flex-col items-center justify-center backdrop-blur-md">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-wider drop-shadow-[0_0_15px_#00f0ff]">
                {progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-56 sm:w-64 h-1.5 bg-slate-800/80 rounded-full overflow-hidden border border-[#00f0ff]/20 shadow-lg">
          <div
            className="h-full bg-gradient-to-r from-[#0066ff] via-[#00f0ff] to-[#00e5a3] transition-all duration-150 shadow-[0_0_15px_#00f0ff]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Indicator */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center gap-2 text-[#00f0ff] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-[#0c1838]/90 border border-[#00f0ff]/30 px-4 sm:px-5 py-2 rounded-full shadow-xl max-w-full">
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-[#00e5a3] shrink-0" />
            <span className="truncate">{statusText}</span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-widest pt-1">
            AETHERIA BIO • ENTERPRISE PLATFORM v4.8.2
          </span>
        </div>
      </div>
    </div>
  );
}

