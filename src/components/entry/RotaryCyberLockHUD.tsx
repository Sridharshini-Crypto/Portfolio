'use client';

import React from 'react';
import { Lock, Unlock, Fingerprint, Shield, Radio, Sparkles } from 'lucide-react';

interface RotaryCyberLockHUDProps {
  isAuthenticating: boolean;
  isUnlocked?: boolean;
}

export function RotaryCyberLockHUD({ isAuthenticating, isUnlocked }: RotaryCyberLockHUDProps) {
  return (
    <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] flex items-center justify-center select-none">
      
      {/* ── AMBIENT ENERGY AURA ── */}
      <div
        className={`absolute inset-0 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
          isAuthenticating ? 'bg-emerald-400/50 scale-135' : 'bg-emerald-500/20 group-hover:bg-emerald-400/35'
        }`}
      />

      {/* ── BESPOKE ROTATING SVG CYBER LOCK HUD ── */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full drop-shadow-[0_0_40px_rgba(16,185,129,0.5)]"
      >
        <defs>
          {/* Radial Gradient for Center Core */}
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#050807" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#050807" stopOpacity="0.98" />
          </radialGradient>

          {/* Linear Gradient for Laser Ring */}
          <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* Glowing Filter */}
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── 1. OUTERMOST STATIC TELEMETRY DEGREE RING (R=235) ── */}
        <circle
          cx="250"
          cy="250"
          r="235"
          fill="none"
          stroke="#10B981"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        
        {/* Azimuth Cardinal Marker Ticks */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 250 + Math.cos(rad) * 230;
          const y1 = 250 + Math.sin(rad) * 230;
          const x2 = 250 + Math.cos(rad) * 240;
          const y2 = 250 + Math.sin(rad) * 240;
          const isMajor = deg % 90 === 0;

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isMajor ? '#34D399' : '#10B981'}
              strokeWidth={isMajor ? '2' : '1'}
              strokeOpacity={isMajor ? '0.9' : '0.4'}
            />
          );
        })}

        {/* ── 2. ROTATING OUTER GEAR / NOTCH RING (R=210) ── */}
        <g
          className={
            isAuthenticating
              ? 'animate-[spin_4s_linear_infinite]'
              : 'animate-[spin_45s_linear_infinite]'
          }
          style={{ transformOrigin: '250px 250px' }}
        >
          <circle
            cx="250"
            cy="250"
            r="210"
            fill="none"
            stroke="url(#laserGrad)"
            strokeWidth="3"
            strokeDasharray="18 8 6 8 36 12"
            strokeOpacity="0.8"
            filter="url(#glowFilter)"
          />
          {/* Mechanical Locking Teeth Blocks */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const cx = 250 + Math.cos(rad) * 210;
            const cy = 250 + Math.sin(rad) * 210;
            return (
              <rect
                key={i}
                x={cx - 4}
                y={cy - 4}
                width="8"
                height="8"
                fill="#34D399"
                transform={`rotate(${deg}, ${cx}, ${cy})`}
                opacity="0.9"
              />
            );
          })}
        </g>

        {/* ── 3. COUNTER-ROTATING CRYPTOGRAPHIC BINARY TRACK (R=175) ── */}
        <g
          className={
            isAuthenticating
              ? 'animate-[spin_3s_linear_infinite_reverse]'
              : 'animate-[spin_30s_linear_infinite_reverse]'
          }
          style={{ transformOrigin: '250px 250px' }}
        >
          <circle
            cx="250"
            cy="250"
            r="175"
            fill="none"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeDasharray="4 6 12 6"
            strokeOpacity="0.5"
          />
          {/* Circular Telemetry Text Path */}
          <path
            id="cryptoTrackPath"
            d="M 250,250 m -175,0 a 175,175 0 1,1 350,0 a 175,175 0 1,1 -350,0"
            fill="none"
          />
          <text
            fontSize="8"
            fontFamily="monospace"
            fill="#34D399"
            letterSpacing="3"
            opacity="0.75"
          >
            <textPath href="#cryptoTrackPath" startOffset="0%">
              CIT.ZERO_TRUST // AES_256_GCM // TLS_1.3_ENCLAVE // 0x7F92E1B8 // AUTH_GATE //
            </textPath>
          </text>
        </g>

        {/* ── 4. RADAR PULSE SWEEP DISC (R=135) ── */}
        <g
          className={
            isAuthenticating
              ? 'animate-[spin_2s_linear_infinite]'
              : 'animate-[spin_10s_linear_infinite]'
          }
          style={{ transformOrigin: '250px 250px' }}
        >
          <circle
            cx="250"
            cy="250"
            r="135"
            fill="none"
            stroke="#34D399"
            strokeWidth="2"
            strokeDasharray="40 20 80 20"
            strokeOpacity="0.8"
          />
        </g>

        {/* ── 5. INNER HEX LATTICE CORE BASE (R=95) ── */}
        <circle
          cx="250"
          cy="250"
          r="95"
          fill="url(#coreGlow)"
          stroke="#10B981"
          strokeWidth="2"
          strokeOpacity="0.9"
        />

        {/* Crosshair Target Reticles */}
        <line
          x1="180"
          y1="250"
          x2="320"
          y2="250"
          stroke="#10B981"
          strokeWidth="1"
          strokeDasharray="4 4"
          strokeOpacity="0.6"
        />
        <line
          x1="250"
          y1="180"
          x2="250"
          y2="320"
          stroke="#10B981"
          strokeWidth="1"
          strokeDasharray="4 4"
          strokeOpacity="0.6"
        />

        {/* 4 Corner Locking Brackets in Center */}
        <path d="M 215,225 L 215,215 L 225,215" fill="none" stroke="#34D399" strokeWidth="2" />
        <path d="M 285,225 L 285,215 L 275,215" fill="none" stroke="#34D399" strokeWidth="2" />
        <path d="M 215,275 L 215,285 L 225,285" fill="none" stroke="#34D399" strokeWidth="2" />
        <path d="M 285,275 L 285,285 L 275,285" fill="none" stroke="#34D399" strokeWidth="2" />
      </svg>

      {/* ── DEAD-CENTER BIOMETRIC CORE ICON ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div
          className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#050807]/95 border-2 flex flex-col items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.8)] ${
            isAuthenticating
              ? 'border-emerald-300 bg-emerald-950/80 scale-110'
              : 'border-emerald-400/80'
          }`}
        >
          {isAuthenticating ? (
            <Unlock className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-300 animate-bounce" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Fingerprint className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 animate-pulse" />
              <Lock className="w-3.5 h-3.5 text-emerald-300 absolute -top-1 -right-1" />
            </div>
          )}
          <span className="text-[8px] font-mono text-emerald-300 font-bold tracking-widest mt-0.5">
            {isAuthenticating ? 'VERIFY' : 'LOCKED'}
          </span>
        </div>
      </div>

    </div>
  );
}

export default RotaryCyberLockHUD;

