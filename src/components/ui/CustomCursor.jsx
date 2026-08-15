'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (touchCheck || reducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target.closest('[data-cursor]');
      if (target) {
        setIsHovered(true);
        setCursorText(target.getAttribute('data-cursor') || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  useEffect(() => {
    if (isTouchDevice || !isVisible) return;
    let animationFrame;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const followCursor = () => {
      setTrailingPos((prev) => ({
        x: lerp(prev.x, position.x, 0.18),
        y: lerp(prev.y, position.y, 0.18),
      }));
      animationFrame = requestAnimationFrame(followCursor);
    };

    animationFrame = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animationFrame);
  }, [position, isTouchDevice, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Central Glowing Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2.5 h-2.5 bg-[#00f0ff] rounded-full shadow-[0_0_10px_#00f0ff] transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${position.x - 5}px, ${position.y - 5}px, 0) scale(${isHovered ? 0.4 : 1})`,
        }}
      />

      {/* Trailing Outer Reticle Ring */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full border transition-all duration-300 ${
          isHovered
            ? 'w-16 h-16 bg-[#0066ff]/20 border-[#00f0ff] backdrop-blur-[2px] shadow-[0_0_20px_rgba(0,240,255,0.4)]'
            : 'w-10 h-10 border-[#00f0ff]/40'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x - (isHovered ? 32 : 20)}px, ${
            trailingPos.y - (isHovered ? 32 : 20)
          }px, 0)`,
        }}
      >
        {isHovered && cursorText && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#00f0ff] uppercase animate-pulse">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}

