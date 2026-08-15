'use client';

import React from 'react';

export default function Logo({ className = '', iconOnly = false, size = 'default' }) {
  const heightClasses = {
    small: 'h-10 sm:h-11',
    default: 'h-13 sm:h-15 lg:h-17',
    large: 'h-18 sm:h-22 lg:h-24',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      <div className="relative flex items-center justify-center">
        <img
          src="/assets/images/logo.png"
          alt="Biotech Logo"
          className={`${heightClasses[size] || 'h-14'} w-auto object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(0,240,255,0.75)] group-hover:scale-105 transition-all duration-300`}
        />
      </div>
    </div>
  );
}


