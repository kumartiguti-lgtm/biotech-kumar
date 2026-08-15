'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Activity, ShieldCheck, Award, TrendingUp } from 'lucide-react';

const STATS = [
  { value: 65, suffix: '+', label: 'Genomic Initiatives', desc: 'Active clinical & computational programs worldwide' },
  { value: 24, suffix: '+', label: 'Enterprise Alliances', desc: 'Institutional & biopharma co-development research' },
  { value: 180, suffix: '+', label: 'Peer-Reviewed Studies', desc: 'Published high-impact biological & structural papers' },
  { value: 15, suffix: 'M+', label: 'Targeted Patient Reach', desc: 'Therapeutic vector patient deployment goal by 2030' },
];

export default function ImpactSection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="impact" ref={sectionRef} className="relative py-14 sm:py-16 lg:py-20 px-4 sm:px-8 bg-[#070d1e] text-white overflow-hidden scroll-mt-20">
      {/* Background Molecular Particle Stream Canvas */}
      <ImpactBackgroundCanvas />

      <div className="max-w-7xl mx-auto w-full space-y-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#030712] border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-xs font-bold tracking-widest uppercase">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>04 / CLINICAL & COMMERCIAL IMPACT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-sans tracking-tight">
            Scientific Excellence <br />
            <span className="text-gradient-hero font-extrabold">
              Measured by Patient Outcomes.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Every discovery is rigorously benchmarked against target selectivity, clinical trial translation speed, and therapeutic efficacy.
          </p>
        </div>

        {/* 4 Counter Cards Grid (2 Columns on mobile under 577px, 4 Columns on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {STATS.map((st, idx) => (
            <StatCard key={st.label} stat={st} startAnim={hasAnimated} delay={idx * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, startAnim, delay }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnim) return;

    let start = 0;
    const end = stat.value;
    const duration = 2000;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);
    }, delay);

    return () => clearTimeout(timer);
  }, [startAnim, stat.value, delay]);

  return (
    <div
      data-cursor="IMPACT"
      className="p-5 sm:p-8 rounded-3xl bg-[#030712]/80 border border-[#00f0ff]/20 hover:border-[#00f0ff]/60 transition-all duration-300 backdrop-blur-xl shadow-xl space-y-2 sm:space-y-3 group border-glow-hover flex flex-col justify-between"
    >
      <div className="text-3xl sm:text-5xl font-extrabold font-mono text-white group-hover:text-[#00f0ff] transition-colors flex items-baseline">
        <span>{count}</span>
        <span className="text-[#00f0ff] font-sans ml-0.5">{stat.suffix}</span>
      </div>

      <div className="text-xs sm:text-base font-bold text-slate-100 font-sans">{stat.label}</div>
      <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed font-sans">{stat.desc}</p>
    </div>
  );
}

function ImpactBackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 1000);
    let height = (canvas.height = canvas.parentElement.clientHeight || 500);

    const particles = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      color: ['#00f0ff', '#8b5cf6', '#00e5a3'][Math.floor(Math.random() * 3)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

