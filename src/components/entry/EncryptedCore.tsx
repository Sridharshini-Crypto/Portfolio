'use client';

import React, { useState } from 'react';
import { soundFX } from '@/lib/audio';

interface EncryptedCoreProps {
  onUnlock: () => void;
  isTriggered?: boolean;
}

export function EncryptedCore({ onUnlock, isTriggered = false }: EncryptedCoreProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!isTriggered) {
      soundFX.playHoverTick();
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (isTriggered) return;
    soundFX.playSeamActivation();
    onUnlock();
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center justify-center cursor-pointer select-none group"
      role="button"
      tabIndex={0}
      aria-label="Unlock Portfolio"
    >
      {/* Outer Ambient Glow */}
      <div
        className={`absolute -inset-12 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
          isTriggered
            ? 'bg-[#FF2E6B]/50 scale-175'
            : isHovered
            ? 'bg-[#6E0F1A]/40 scale-120'
            : 'bg-[#6E0F1A]/20 scale-95'
        }`}
      />

      {/* SVG Interactive Geometric Core Monolith */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
        <svg
          viewBox="0 0 280 280"
          className={`w-full h-full transform transition-all duration-700 ease-out ${
            isHovered && !isTriggered ? 'scale-105' : 'scale-100'
          }`}
        >
          <defs>
            <linearGradient id="wineCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C96A73" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#6E0F1A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3E070D" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="activeWineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8DAF" stopOpacity="1" />
              <stop offset="50%" stopColor="#FF2E6B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6E0F1A" stopOpacity="1" />
            </linearGradient>

            <filter id="coreWineGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* LAYER 1: Outer Rotating Diamond Structure (◇) */}
          <g
            className={`transition-all duration-1000 transform origin-center ${
              isHovered ? 'rotate-45' : 'rotate-0'
            }`}
          >
            <rect
              x="50"
              y="50"
              width="180"
              height="180"
              rx="18"
              fill="none"
              stroke="url(#wineCoreGrad)"
              strokeWidth="1.5"
              strokeDasharray="14 8"
              className="opacity-70 animate-[spin_30s_linear_infinite]"
            />
            <rect
              x="62"
              y="62"
              width="156"
              height="156"
              rx="12"
              fill="none"
              stroke="#6E0F1A"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
          </g>

          {/* LAYER 2: Concentric Segmented Precision Rings */}
          <circle
            cx="140"
            cy="140"
            r="82"
            fill="none"
            stroke={isHovered ? '#FF2E6B' : '#C96A73'}
            strokeWidth="1.5"
            strokeDasharray="8 6 2 6"
            strokeOpacity={isHovered ? 0.9 : 0.4}
            className="animate-[spin_20s_linear_infinite_reverse] origin-center"
          />

          <circle
            cx="140"
            cy="140"
            r="65"
            fill="none"
            stroke="#9E2F3A"
            strokeWidth="1"
            strokeDasharray="4 8"
            strokeOpacity="0.6"
            className="animate-[spin_15s_linear_infinite] origin-center"
          />

          {/* LAYER 3: 4 Cardinal Reticles & Ticks */}
          <line x1="140" y1="28" x2="140" y2="44" stroke="#FF8DAF" strokeWidth="2" strokeOpacity={isHovered ? 1 : 0.6} />
          <line x1="140" y1="236" x2="140" y2="252" stroke="#FF8DAF" strokeWidth="2" strokeOpacity={isHovered ? 1 : 0.6} />
          <line x1="28" y1="140" x2="44" y2="140" stroke="#FF8DAF" strokeWidth="2" strokeOpacity={isHovered ? 1 : 0.6} />
          <line x1="236" y1="140" x2="252" y2="140" stroke="#FF8DAF" strokeWidth="2" strokeOpacity={isHovered ? 1 : 0.6} />

          {/* LAYER 4: Inner Hexagonal Nucleus */}
          <polygon
            points="140,88 185,114 185,166 140,192 95,166 95,114"
            fill="none"
            stroke="url(#activeWineGrad)"
            strokeWidth="2"
            filter="url(#coreWineGlow)"
            className={`transition-all duration-700 origin-center ${
              isHovered ? 'scale-110 stroke-[#FF8DAF]' : 'scale-100'
            }`}
          />

          {/* LAYER 5: Center Core Nucleus (◉) */}
          <circle
            cx="140"
            cy="140"
            r="16"
            fill={isHovered ? '#FF2E6B' : '#6E0F1A'}
            stroke="#FF8DAF"
            strokeWidth="2"
            filter="url(#coreWineGlow)"
            className="transition-all duration-500"
          />
          <circle
            cx="140"
            cy="140"
            r="6"
            fill="#FFFFFF"
            className={isHovered ? 'animate-ping' : ''}
          />

          {/* Vertical Seam / Break Line Preview */}
          <line
            x1="140"
            y1="20"
            x2="140"
            y2="260"
            stroke="#FF2E6B"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className={`transition-opacity duration-300 ${isHovered ? 'opacity-80' : 'opacity-20'}`}
          />
        </svg>
      </div>

      {/* Interaction Label */}
      <div className="mt-4 space-y-1 text-center">
        <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-[#FF8DAF] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E6B] animate-ping" />
          <span>{isHovered ? 'READY TO UNLOCK' : 'CLICK TO ENTER EXPERIENCE'}</span>
        </div>
        <div className="text-[10px] font-mono text-[#C96A73]/70">
          [ INTERACTIVE MONOLITH // SPLIT REVEAL ]
        </div>
      </div>
    </div>
  );
}

export default EncryptedCore;
