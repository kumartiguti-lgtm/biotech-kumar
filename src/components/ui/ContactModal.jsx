'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, Dna, Building2, ShieldCheck } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [inquiryTab, setInquiryTab] = useState('Clinical Partnership');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-[#030712]/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#0c1838] border border-[#00f0ff]/30 rounded-3xl p-5 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.25)] custom-scrollbar">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#0066ff]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor="CLOSE"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#030712] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#00f0ff] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#00e5a3]/20 border border-[#00e5a3] flex items-center justify-center text-[#00e5a3] animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white font-sans">Protocol Request Transmitted</h3>
            <p className="text-slate-300 text-sm max-w-md">
              Thank you for initiating contact with Aetheria Bio. Our clinical strategy team will review your inquiry and respond within 24 business hours.
            </p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 text-[#00f0ff] font-mono text-xs font-bold uppercase mb-2">
              <Dna className="w-4 h-4 animate-spin" />
              <span>CORPORATE COLLABORATION PROTOCOL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans mb-2">
              Partner with Aetheria Bio.
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-5">
              Connect with our clinical & computational strategy team to discuss target vector co-development, platform licensing, or investor relations.
            </p>

            {/* Inquiry Tabs */}
            <div className="flex flex-wrap gap-2 mb-5">
              {['Clinical Partnership', 'Genomic Licensing', 'R&D Collaboration', 'Investor Inquiry'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setInquiryTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    inquiryTab === tab
                      ? 'bg-[#0066ff] text-white font-bold border border-[#00f0ff]'
                      : 'bg-[#030712] text-slate-400 border border-slate-700 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Alexander Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">WORK EMAIL *</label>
                  <input
                    type="email"
                    required
                    placeholder="vance@biophil.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">ORGANIZATION *</label>
                  <input
                    type="text"
                    required
                    placeholder="Biopharma Therapeutics Ltd."
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">ROLE / TITLE</label>
                  <input
                    type="text"
                    placeholder="Chief Scientific Officer"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">PROJECT SPECS & TIMELINE *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Outline your research goals, target pathways, or clinical timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                data-cursor="SUBMIT"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0066ff] via-[#4f46e5] to-[#00f0ff] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all flex items-center justify-center gap-2 group"
              >
                <span>TRANSMIT PARTNERSHIP PROTOCOL</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

