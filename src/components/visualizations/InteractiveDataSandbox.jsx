'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Sliders, Activity, Download, RefreshCw, Cpu } from 'lucide-react';

const NODES_DATA = [
  { id: 'GENE 01', type: 'GENOMIC', seq: 'ATCG-9942-X', score: 99.4, binding: '-8.2 kcal/mol', x: 20, y: 30, color: '#00f0ff' },
  { id: 'CELL 24', type: 'CYTOLOGICAL', seq: 'MITO-CELL-8', score: 96.1, binding: '-9.8 kcal/mol', x: 75, y: 25, color: '#8b5cf6' },
  { id: 'PROTEIN 08', type: 'ENZYMATIC', seq: 'FOL-PRT-08', score: 99.8, binding: '-11.1 kcal/mol', x: 50, y: 65, color: '#00e5a3' },
  { id: 'DNA HELIX', type: 'HELIX', seq: 'GCAT-1102-Z', score: 98.6, binding: '-7.4 kcal/mol', x: 25, y: 75, color: '#0066ff' },
  { id: 'VECTOR NET', type: 'STRUCTURAL', seq: 'MOL-NET-33', score: 97.2, binding: '-10.5 kcal/mol', x: 80, y: 70, color: '#00f0ff' },
];

export default function InteractiveDataSandbox() {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(NODES_DATA[0]);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Live Interactive Parameter Sliders
  const [affinity, setAffinity] = useState(85);
  const [fidelity, setFidelity] = useState(99);
  const [viability, setViability] = useState(92);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement.clientHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      // Speed driven by affinity slider
      time += 0.01 + (affinity / 100) * 0.02;
      ctx.clearRect(0, 0, width, height);

      // Grid backdrop
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Physics force adjustments from sliders
      const forceScale = (fidelity / 100) * 25;
      const pulseSpeed = (viability / 100) * 1.5;

      const canvasNodes = NODES_DATA.map((node) => {
        const baseX = (node.x / 100) * width;
        const baseY = (node.y / 100) * height;

        const dx = mouse.x - baseX;
        const dy = mouse.y - baseY;
        const dist = Math.hypot(dx, dy);
        const force = Math.max(0, 1 - dist / 180);

        const floatX = Math.sin(time + node.x) * 12 + (dx / (dist || 1)) * force * forceScale;
        const floatY = Math.cos(time + node.y) * 12 + (dy / (dist || 1)) * force * forceScale;

        return {
          ...node,
          cx: baseX + floatX,
          cy: baseY + floatY,
          distToMouse: dist,
        };
      });

      // Draw energy links
      canvasNodes.forEach((n1, i) => {
        canvasNodes.forEach((n2, j) => {
          if (i >= j) return;
          const d = Math.hypot(n1.cx - n2.cx, n1.cy - n2.cy);

          ctx.strokeStyle =
            selectedNode?.id === n1.id || selectedNode?.id === n2.id
              ? 'rgba(0, 240, 255, 0.45)'
              : 'rgba(139, 92, 246, 0.18)';
          ctx.lineWidth = selectedNode?.id === n1.id || selectedNode?.id === n2.id ? 2 : 1;

          ctx.beginPath();
          ctx.moveTo(n1.cx, n1.cy);
          ctx.lineTo(n2.cx, n2.cy);
          ctx.stroke();

          // Traveling energy pulse
          const pulseProgress = (time * pulseSpeed + i + j) % 1;
          const px = n1.cx + (n2.cx - n1.cx) * pulseProgress;
          const py = n1.cy + (n2.cy - n1.cy) * pulseProgress;

          ctx.fillStyle = n1.color;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // Draw nodes and labels
      canvasNodes.forEach((node) => {
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode === node.id;

        ctx.strokeStyle = node.color;
        ctx.lineWidth = isSelected ? 2.5 : 1;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isSelected || isHovered ? 20 : 6;
        ctx.beginPath();
        ctx.arc(node.cx, node.cy, isSelected ? 22 : 16, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.cx, node.cy, isSelected ? 9 : 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label box
        ctx.fillStyle = isSelected ? '#0066ff' : '#0c1838';
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1;
        const lw = 115;
        const lh = 24;
        const lx = node.cx + 22;
        const ly = node.cy - 12;

        ctx.fillRect(lx, ly, lw, lh);
        ctx.strokeRect(lx, ly, lw, lh);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(node.id, lx + 8, ly + 16);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [selectedNode, hoveredNode, affinity, fidelity, viability]);

  return (
    <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch bg-[#0c1838]/80 border border-[#00f0ff]/20 rounded-3xl p-5 sm:p-7 lg:p-10 backdrop-blur-2xl shadow-2xl">
      {/* Interactive Canvas Box (Half Grid 50% from 768px/992px+) */}
      <div className="md:col-span-1 relative w-full h-[360px] sm:h-[420px] md:h-auto min-h-[420px] rounded-2xl bg-[#030712] border border-[#00f0ff]/20 overflow-hidden shadow-xl">
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />

        {/* Floating HUD status overlay */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex items-center gap-2 bg-[#0c1838]/90 border border-[#00f0ff]/30 px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono text-[#00f0ff] backdrop-blur-md max-w-[90%] truncate">
          <span className="animate-pulse shrink-0">●</span>
          <span className="truncate">LIVE BIOLOGICAL MATRIX // CLICK NODE OR ADJUST SLIDERS</span>
        </div>
      </div>

      {/* Live Node Telemetry Panel + Parameter Controls (Half Grid 50% from 768px/992px+) */}
      <div className="md:col-span-1 flex flex-col justify-between gap-6 bg-[#030712] border border-[#8b5cf6]/35 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#00e5a3] uppercase font-bold tracking-widest">
              TELEMETRY MATRIX
            </span>
            <h3 className="text-xl font-bold text-white font-sans">{selectedNode.id}</h3>
          </div>
          <span
            className="w-4 h-4 rounded-full shadow-[0_0_12px_currentColor]"
            style={{ backgroundColor: selectedNode.color, color: selectedNode.color }}
          />
        </div>

        {/* Interactive Parameter Sliders */}
        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between text-xs font-mono text-[#00f0ff] font-bold">
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>REAL-TIME PHYSICS SLIDERS</span>
            </div>
          </div>

          {/* Quick Preset Buttons for Recruiters */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <button
              onClick={() => { setAffinity(95); setFidelity(99); setViability(88); }}
              className="px-2.5 py-1 rounded-md bg-[#0c1838] border border-[#00f0ff]/30 text-[10px] font-mono text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all"
            >
              [ONCOLOGY TARGET]
            </button>
            <button
              onClick={() => { setAffinity(78); setFidelity(94); setViability(96); }}
              className="px-2.5 py-1 rounded-md bg-[#0c1838] border border-[#8b5cf6]/30 text-[10px] font-mono text-slate-300 hover:text-[#8b5cf6] hover:border-[#8b5cf6] transition-all"
            >
              [NEUROGENOMIC MAP]
            </button>
            <button
              onClick={() => { setAffinity(90); setFidelity(98); setViability(92); }}
              className="px-2.5 py-1 rounded-md bg-[#0c1838] border border-[#00e5a3]/30 text-[10px] font-mono text-slate-300 hover:text-[#00e5a3] hover:border-[#00e5a3] transition-all"
            >
              [CRISPR VECTOR]
            </button>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
              <span>BINDING AFFINITY</span>
              <span className="text-[#00f0ff] font-bold">{affinity}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={affinity}
              onChange={(e) => setAffinity(Number(e.target.value))}
              className="w-full accent-[#00f0ff] bg-slate-800 rounded-lg cursor-pointer h-1.5"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
              <span>SEQUENCE FIDELITY</span>
              <span className="text-[#00e5a3] font-bold">{fidelity}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={fidelity}
              onChange={(e) => setFidelity(Number(e.target.value))}
              className="w-full accent-[#00e5a3] bg-slate-800 rounded-lg cursor-pointer h-1.5"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
              <span>CELL VIABILITY</span>
              <span className="text-[#8b5cf6] font-bold">{viability}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              value={viability}
              onChange={(e) => setViability(Number(e.target.value))}
              className="w-full accent-[#8b5cf6] bg-slate-800 rounded-lg cursor-pointer h-1.5"
            />
          </div>
        </div>

        {/* Selected Node Details */}
        <div className="space-y-3 font-mono text-xs pt-2 border-t border-slate-800">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0c1838] border border-slate-800 p-3 rounded-xl">
              <div className="text-slate-400 text-[10px] mb-1">FREE ENERGY</div>
              <div className="text-sm font-bold text-[#8b5cf6]">{selectedNode.binding}</div>
            </div>

            <div className="bg-[#0c1838] border border-slate-800 p-3 rounded-xl">
              <div className="text-slate-400 text-[10px] mb-1">CONFIDENCE</div>
              <div className="text-sm font-bold text-[#00e5a3]">{selectedNode.score}%</div>
            </div>
          </div>

          {/* Node Selector Buttons */}
          <div className="pt-2">
            <div className="text-slate-400 text-[10px] mb-2 font-sans font-semibold">SELECT TARGET NODE</div>
            <div className="flex flex-wrap gap-2">
              {NODES_DATA.map((nd) => (
                <button
                  key={nd.id}
                  onClick={() => setSelectedNode(nd)}
                  onMouseEnter={() => setHoveredNode(nd.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  data-cursor="INSPECT"
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                    selectedNode.id === nd.id
                      ? 'bg-[#0066ff] text-white font-bold border border-[#00f0ff]'
                      : 'bg-[#0c1838] text-slate-300 border border-slate-700 hover:border-[#00f0ff]'
                  }`}
                >
                  {nd.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

