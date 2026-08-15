'use client';

import React, { useState, useEffect } from 'react';
import Logo from '../ui/Logo';
import { Menu, X, ArrowRight, Dna, ShieldCheck, Activity } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Platform', href: '#about' },
  { name: 'Research Lab', href: '#research' },
  { name: 'Technology', href: '#technology' },
  { name: 'Capabilities', href: '#capabilities' },
  { name: 'Impact Matrix', href: '#impact' },
];

export default function Navbar({ onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Header Container starting flush at top-0 */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070d1e]/90 backdrop-blur-xl border-b border-[#00f0ff]/15 shadow-[0_10px_35px_rgba(3,7,18,0.9)]'
            : 'bg-[#030712]/60 backdrop-blur-md border-b border-white/5'
        }`}
      >
        {/* Top Corporate Live Ticker Bar */}
        <div className="bg-[#030712] border-b border-[#00f0ff]/10 py-1 px-4 text-[11px] font-mono text-slate-400 overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
              <span className="inline-flex items-center gap-1.5 text-[#00e5a3] font-bold px-2 py-0.5 rounded bg-[#00e5a3]/10 border border-[#00e5a3]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a3] animate-ping" />
                NASDAQ: ATHB $142.85 (+3.8%)
              </span>
              <span className="text-slate-600">|</span>
              <span className="hidden sm:inline text-slate-300">FDA PHASE III CLINICAL TRIAL: APPROVED</span>
              <span className="hidden md:inline text-slate-600">|</span>
              <span className="hidden md:inline text-[#00f0ff]">GENOMIC PLATFORM v4.8.2 LIVE</span>
            </div>

            <div className="hidden lg:flex items-center gap-4 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#00f0ff]" /> ISO 13485 CERTIFIED
              </span>
              <span>•</span>
              <span>GLOBAL R&D CAMBRIDGE, MA</span>
            </div>
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Logo />
          </a>

          {/* Desktop Navigation Links (Shown at 1024px+) */}
          <nav className="hidden lg:flex items-center gap-7 bg-[#0c1838]/60 border border-[#00f0ff]/15 rounded-full px-6 py-2 backdrop-blur-md shadow-lg">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xs font-mono font-medium tracking-wider text-slate-300 hover:text-[#00f0ff] transition-colors relative py-1 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#0066ff] to-[#00f0ff] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Corporate Action CTA (Shown at 1024px+) */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenContact}
              data-cursor="PARTNER"
              className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0066ff] via-[#4f46e5] to-[#00f0ff] text-white font-sans text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105 transition-all duration-300 group"
            >
              <span>Partner Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile & Tablet Menu Toggle Button (Shown below 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#0c1838]/90 border border-[#00f0ff]/30 text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile & Tablet Sidebar Drawer Navigation Overlay (Below 1024px) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
          {/* Dark Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-[#030712]/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Right Sliding Sidebar Drawer Panel */}
          <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-[#071026] border-l border-[#00f0ff]/25 p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-transform duration-300 overflow-y-auto">
            <div>
              {/* Sidebar Header with Brand Logo & Explicit Close Button */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Logo />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  data-cursor="CLOSE"
                  className="p-2 rounded-xl bg-[#0c1838] border border-[#00f0ff]/30 text-slate-300 hover:text-white hover:border-[#00f0ff] transition-all shadow-md"
                  aria-label="Close Sidebar Navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                  <Dna className="w-3.5 h-3.5 animate-spin" />
                  <span>ENTERPRISE NAVIGATION</span>
                </div>

                {NAV_ITEMS.map((item, idx) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between p-3.5 rounded-xl bg-[#0c1838]/60 border border-slate-800/80 hover:border-[#00f0ff]/50 hover:bg-[#0c1838] text-white transition-all font-sans font-semibold text-sm"
                  >
                    <span className="group-hover:text-[#00f0ff] transition-colors">{item.name}</span>
                    <span className="text-xs font-mono text-[#8b5cf6]">0{idx + 1}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Sidebar Partner CTA */}
            <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0066ff] via-[#4f46e5] to-[#00f0ff] text-white font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-xl hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all group"
              >
                <span>Partner Portal & Clinical Trial</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


