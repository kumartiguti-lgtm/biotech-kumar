'use client';

import React, { useState } from 'react';
import CustomCursor from '@/components/ui/CustomCursor';
import Preloader from '@/components/ui/Preloader';
import FloatingScrollDNA from '@/components/visualizations/FloatingScrollDNA';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TechnologySection from '@/components/sections/TechnologySection';
import LabExperienceSection from '@/components/sections/LabExperienceSection';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import ImpactSection from '@/components/sections/ImpactSection';
import DataVizSection from '@/components/sections/DataVizSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import ContactModal from '@/components/ui/ContactModal';

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 relative selection:bg-[#00f0ff] selection:text-[#030712]">
      {/* 3D Rotating Molecular Preloader Screen */}
      <Preloader />

      {/* Custom Desktop Interactive Pointer Cursor */}
      <CustomCursor />

      {/* GSAP Scroll-Driven 3D Biological Object */}
      <FloatingScrollDNA />

      {/* Global Floating Glassmorphism Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Hero Section with Interactive 3D DNA Model */}
      <HeroSection onOpenContact={handleOpenContact} />

      {/* Section 01: About Our Science (Light Theme Visual Contrast) */}
      <AboutSection />

      {/* Section 02: Technology (3 Interactive Instrument Cards) */}
      <TechnologySection />

      {/* Research Lab Experience (Full-Width Immersive Canvas) */}
      <LabExperienceSection />

      {/* Section 03: Capabilities (Asymmetric Editorial Grid) */}
      <CapabilitiesSection />

      {/* Section 04: Our Impact (Animated Counter Statistics & Particle Stream) */}
      <ImpactSection />

      {/* Interactive Science Data Matrix Sandbox */}
      <DataVizSection />

      {/* Dramatic Final CTA Section */}
      <CTASection onOpenContact={handleOpenContact} />

      {/* Luxury Footer */}
      <Footer onOpenContact={handleOpenContact} />

      {/* Interactive Collaboration Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </main>
  );
}
