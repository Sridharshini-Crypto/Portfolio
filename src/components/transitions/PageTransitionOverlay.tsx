'use client';

import React from 'react';

interface PageTransitionOverlayProps {
  isTransitioning: boolean;
  targetSectorName: string;
  targetSectorNumber: string;
}

export function PageTransitionOverlay({
  isTransitioning,
  targetSectorName,
  targetSectorNumber,
}: PageTransitionOverlayProps) {
  // 4 Column shutters for Nabil Issa style architectural curtain wipe
  const columns = [0, 1, 2, 3];

  if (!isTransitioning) return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex flex-col"
      aria-hidden="true"
    >
      {/* 4 Multi-Column Cyber Green Shutter Curtains */}
      <div className="absolute inset-0 grid grid-cols-4 w-full h-full">
        {columns.map((col) => (
          <div
            key={col}
            className="w-full h-full transform transition-transform bg-[#050807] border-r border-emerald-500/30"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.83, 0, 0.17, 1)',
              transitionDuration: '0.65s',
              transitionDelay: `${col * 0.05}s`,
              transform: isTransitioning ? 'translateY(0%)' : 'translateY(100%)',
              animation: 'nabilCurtain 0.85s cubic-bezier(0.83, 0, 0.17, 1) forwards',
              animationDelay: `${col * 0.04}s`,
            }}
          />
        ))}
      </div>

      {/* Center Cinematic Sector Badge during Transition */}
      <div className="relative z-10 m-auto flex flex-col items-center justify-center space-y-2 text-center select-none animate-[fade-in_0.3s_ease-out]">
        <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-emerald-400">
          {targetSectorNumber ? `CHAPTER // ${targetSectorNumber}` : 'INITIALIZING'}
        </div>
        <div className="text-2xl sm:text-4xl font-heading font-extrabold tracking-tight text-white uppercase">
          {targetSectorName || 'THE TECHNICAL EXPLORATION'}
        </div>
        <div className="w-16 h-0.5 bg-emerald-500 rounded-full mx-auto mt-2 animate-pulse" />
      </div>

      <style jsx>{`
        @keyframes nabilCurtain {
          0% {
            transform: translateY(100%);
          }
          45% {
            transform: translateY(0%);
          }
          55% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
      `}</style>
    </div>
  );
}

export default PageTransitionOverlay;
