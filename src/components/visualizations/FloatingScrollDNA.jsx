'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FloatingScrollDNA() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // GSAP animated state variables
    const scrollObj = {
      progress: 0,
      rotation: 0,
      scale: 1,
      xPercent: 0.65, // 0 to 1
      yPercent: 0.45,
      hue: 190, // 190 = cyan, 270 = purple, 160 = emerald
    };

    // Scroll progress handler with GSAP interpolation
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const rawProgress = Math.min(1, Math.max(0, currentScroll / (maxScroll || 1)));

      // GSAP smooth target animation based on scroll progress
      gsap.to(scrollObj, {
        progress: rawProgress,
        rotation: rawProgress * Math.PI * 6,
        scale: 1 + Math.sin(rawProgress * Math.PI * 2) * 0.25,
        xPercent: rawProgress < 0.25 ? 0.68 - rawProgress * 1.5 : rawProgress < 0.55 ? 0.25 + (rawProgress - 0.25) * 1.6 : 0.72 - (rawProgress - 0.55) * 1.2,
        yPercent: 0.45 + Math.sin(rawProgress * Math.PI * 3) * 0.15,
        hue: 190 + rawProgress * 90,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 3D DNA Helix configuration
    const basePairsCount = 28;
    const helixRadius = 85;
    const helixHeight = 380;
    let autoRotation = 0;

    const render = () => {
      autoRotation += 0.012;
      ctx.clearRect(0, 0, width, height);

      const targetX = width * scrollObj.xPercent;
      const targetY = height * scrollObj.yPercent;
      const currentScale = scrollObj.scale;
      const totalRotation = autoRotation + scrollObj.rotation;

      ctx.save();
      ctx.translate(targetX, targetY);

      // Radial background aura
      const colorCyan = `hsla(${scrollObj.hue}, 100%, 50%, 0.15)`;
      const colorPurple = `hsla(${scrollObj.hue + 40}, 100%, 60%, 0.08)`;
      const aura = ctx.createRadialGradient(0, 0, 0, 0, 0, helixRadius * 2.8 * currentScale);
      aura.addColorStop(0, colorCyan);
      aura.addColorStop(0.5, colorPurple);
      aura.addColorStop(1, 'rgba(3, 7, 18, 0)');

      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(0, 0, helixRadius * 2.8 * currentScale, 0, Math.PI * 2);
      ctx.fill();

      // Render 3D Helix strands
      const basePairs = [];
      for (let i = 0; i < basePairsCount; i++) {
        const p = i / basePairsCount;
        const y = (p - 0.5) * helixHeight * currentScale;
        const angle = p * Math.PI * 4 + totalRotation;

        const x1 = Math.cos(angle) * helixRadius * currentScale;
        const z1 = Math.sin(angle) * helixRadius * currentScale;

        const x2 = Math.cos(angle + Math.PI) * helixRadius * currentScale;
        const z2 = Math.sin(angle + Math.PI) * helixRadius * currentScale;

        const scale1 = 1 + z1 / 400;
        const scale2 = 1 + z2 / 400;

        basePairs.push({
          y,
          node1: { x: x1 * scale1, y: y * scale1, z: z1, scale: scale1 },
          node2: { x: x2 * scale2, y: y * scale2, z: z2, scale: scale2 },
          zOrder: z1 + z2,
          index: i,
        });
      }

      basePairs.sort((a, b) => a.zOrder - b.zOrder);

      // Draw ribbon backbones
      ctx.strokeStyle = `hsla(${scrollObj.hue}, 100%, 55%, 0.4)`;
      ctx.lineWidth = 2 * currentScale;
      ctx.beginPath();
      basePairs.forEach((bp, idx) => {
        if (idx === 0) ctx.moveTo(bp.node1.x, bp.node1.y);
        else ctx.lineTo(bp.node1.x, bp.node1.y);
      });
      ctx.stroke();

      ctx.strokeStyle = `hsla(${scrollObj.hue + 50}, 100%, 65%, 0.4)`;
      ctx.lineWidth = 2 * currentScale;
      ctx.beginPath();
      basePairs.forEach((bp, idx) => {
        if (idx === 0) ctx.moveTo(bp.node2.x, bp.node2.y);
        else ctx.lineTo(bp.node2.x, bp.node2.y);
      });
      ctx.stroke();

      // Draw nucleotide rungs
      basePairs.forEach((bp) => {
        const { node1, node2, index } = bp;

        const rungGrad = ctx.createLinearGradient(node1.x, node1.y, node2.x, node2.y);
        rungGrad.addColorStop(0, `hsla(${scrollObj.hue}, 100%, 50%, 0.8)`);
        rungGrad.addColorStop(1, `hsla(${scrollObj.hue + 60}, 100%, 60%, 0.8)`);

        ctx.strokeStyle = rungGrad;
        ctx.lineWidth = 2 * ((node1.scale + node2.scale) / 2);
        ctx.globalAlpha = 0.65 + ((node1.z + 100) / 200) * 0.35;
        ctx.beginPath();
        ctx.moveTo(node1.x, node1.y);
        ctx.lineTo(node2.x, node2.y);
        ctx.stroke();

        // Node spheres
        ctx.fillStyle = `hsl(${scrollObj.hue}, 100%, 55%)`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(node1.x, node1.y, 5 * node1.scale * currentScale, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsl(${scrollObj.hue + 60}, 100%, 60%)`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(node2.x, node2.y, 5 * node2.scale * currentScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
