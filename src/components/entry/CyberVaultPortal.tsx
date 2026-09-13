'use client';

import React, { useState, useEffect } from 'react';
import { soundFX } from '@/lib/audio';
import { Shield, Lock, Unlock, Terminal, Cpu, Fingerprint, Activity, Zap, Radio, Key } from 'lucide-react';

interface CyberVaultPortalProps {
  onUnlock: () => void;
  isTriggered?: boolean;
}

export function CyberVaultPortal({ onUnlock, isTriggered = false }: CyberVaultPortalProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);
  const [logLines, setLogLines] = useState<string[]>([
    'SYS.INIT: Zero-trust cryptographic core allocated @ 0x7FFF8A',
    'NET.SCAN: Subnet 10.0.4.1/24 [CIT.CAMPUS.SEC] online',
  ]);

  useEffect(() => {
    if (isTriggered) {
      setAuthProgress(100);
      setLogLines((prev) => [
        ...prev,
        'CIPHER.VERIFY: AES-256-GCM token verified',
        'FIREWALL: Disengaging perimeter interlocks [100%]',
        'SEAL.BREACH: Tearing blast doors apart...',
        'ACCESS GRANTED >> ENTERING SYSTEM',
      ]);
    }
  }, [isTriggered]);

  const handleMouseEnter = () => {
    if (!isTriggered) {
      soundFX.playHoverTick();
      setIsHovered(true);
      setAuthProgress(55);
      setLogLines((prev) => [
        ...prev,
        'HANDSHAKE: Biometric key recognized (Sridharshini S)',
        'SECURITY: Port 443 authorized for encrypted stream',
      ]);
    }
  };

  const handleMouseLeave = () => {
    if (!isTriggered) {
      setIsHovered(false);
      setAuthProgress(0);
    }
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
      className="relative flex flex-col items-center justify-center cursor-pointer select-none group max-w-lg mx-auto"
      role="button"
      tabIndex={0}
      aria-label="Engage Cyber Vault Authentication"
    >
      {/* Outer Ambient Emerald Energy Glow Aura */}
      <div
        className={`absolute -inset-16 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
          isTriggered
            ? 'bg-emerald-400/60 scale-180'
            : isHovered
            ? 'bg-emerald-500/35 scale-125'
            : 'bg-emerald-500/15 scale-90'
        }`}
      />

      {/* ── HIGH-TECH CYBER HOLOGRAPHIC VAULT SVG ── */}
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
        <svg
          viewBox="0 0 360 360"
          className={`w-full h-full transform transition-all duration-700 ease-out ${
            isHovered && !isTriggered ? 'scale-105' : 'scale-100'
          }`}
        >
          <defs>
            <linearGradient id="portalNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="activeTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A7F3D0" stopOpacity="1" />
              <stop offset="50%" stopColor="#34D399" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#059669" stopOpacity="1" />
            </linearGradient>

            <filter id="vaultNeonGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* LAYER 1: Heavy Vault Outer Blast Ring with Interlock Teeth */}
          <circle
            cx="180"
            cy="180"
            r="165"
            fill="none"
            stroke="url(#portalNeonGrad)"
            strokeWidth="2"
            strokeDasharray="16 8 4 8"
            className="opacity-75 animate-[spin_50s_linear_infinite] origin-center"
          />

          {/* Outer Angle Degree Markers */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 180 180)`}>
              <line x1="180" y1="10" x2="180" y2="22" stroke="#34D399" strokeWidth="2" />
              <rect
                x="174"
                y="18"
                width="12"
                height="14"
                rx="3"
                fill={isHovered ? '#34D399' : '#064e3b'}
                stroke="#10B981"
                strokeWidth="1.5"
                className="transition-colors duration-500"
              />
              <circle cx="180" cy="25" r="2.5" fill="#A7F3D0" />
            </g>
          ))}

          {/* LAYER 2: Dual Concentric Gear Rings (Counter-Rotating) */}
          <circle
            cx="180"
            cy="180"
            r="135"
            fill="none"
            stroke={isHovered ? '#6EE7B7' : '#10B981'}
            strokeWidth="1.5"
            strokeDasharray="24 12 6 12"
            strokeOpacity={isHovered ? 0.95 : 0.45}
            className="animate-[spin_25s_linear_infinite_reverse] origin-center"
          />

          <circle
            cx="180"
            cy="180"
            r="110"
            fill="none"
            stroke="#047857"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            strokeOpacity="0.75"
            className="animate-[spin_18s_linear_infinite] origin-center"
          />

          {/* LAYER 3: 4 Precision Laser Reticle Crosshairs */}
          <line x1="180" y1="40" x2="180" y2="65" stroke="#6EE7B7" strokeWidth="2.5" />
          <line x1="180" y1="295" x2="180" y2="320" stroke="#6EE7B7" strokeWidth="2.5" />
          <line x1="40" y1="180" x2="65" y2="180" stroke="#6EE7B7" strokeWidth="2.5" />
          <line x1="295" y1="180" x2="320" y2="180" stroke="#6EE7B7" strokeWidth="2.5" />

          {/* LAYER 4: Rotating Diamond Cryptographic Shield */}
          <g
            className={`transition-all duration-1000 transform origin-center ${
              isHovered ? 'rotate-90' : 'rotate-0'
            }`}
          >
            <rect
              x="110"
              y="110"
              width="140"
              height="140"
              rx="20"
              fill="none"
              stroke="url(#activeTealGrad)"
              strokeWidth="2.5"
              filter="url(#vaultNeonGlow)"
              className="opacity-85"
            />
          </g>

          {/* LAYER 5: Central Iris Biometric Scanner Nucleus */}
          <circle
            cx="180"
            cy="180"
            r="44"
            fill="#050807"
            stroke={isHovered ? '#34D399' : '#047857'}
            strokeWidth="2.5"
            className="transition-colors duration-500"
          />
          <circle
            cx="180"
            cy="180"
            r="28"
            fill={isHovered ? '#10B981' : '#022c22'}
            stroke="#6EE7B7"
            strokeWidth="2"
            filter="url(#vaultNeonGlow)"
            className="transition-colors duration-500"
          />
          <circle
            cx="180"
            cy="180"
            r="10"
            fill="#FFFFFF"
            className={isHovered ? 'animate-ping' : ''}
          />

          {/* Jagged Vertical Fracture Guidelines */}
          <path
            d="M 180 20 L 182 80 L 178 140 L 182 220 L 178 280 L 180 340"
            fill="none"
            stroke="#6EE7B7"
            strokeWidth="2"
            strokeDasharray="6 4"
            className={`transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-30'}`}
          />
        </svg>

        {/* Center Overlay Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isTriggered ? (
            <Unlock className="w-9 h-9 text-emerald-200 animate-bounce" />
          ) : isHovered ? (
            <Fingerprint className="w-9 h-9 text-white animate-pulse" />
          ) : (
            <Lock className="w-8 h-8 text-emerald-400/90" />
          )}
        </div>
      </div>

      {/* ── LIVE CYBER AUTHENTICATION LOG WINDOW (ITom-Style Tech Box) ── */}
      <div className="w-full mt-3 bg-[#0A110D]/95 border border-emerald-500/30 rounded-xl p-3 shadow-lg font-mono text-left space-y-2 backdrop-blur-md">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5 text-[10px] text-emerald-400">
          <div className="flex items-center gap-1.5 font-bold">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>AUTHENTICATION LOG // ZERO-TRUST STREAM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[9px]">ENCRYPTED (AES-256)</span>
          </div>
        </div>

        {/* Streamed Log Output */}
        <div className="h-16 overflow-y-auto space-y-1 text-[10px] text-emerald-300/90">
          {logLines.slice(-3).map((line, idx) => (
            <div key={idx} className="flex items-start gap-1 leading-tight">
              <span className="text-emerald-500 font-bold">›</span>
              <span className="truncate">{line}</span>
            </div>
          ))}
        </div>

        {/* Progress Metric Bar */}
        <div className="space-y-1 pt-1 border-t border-emerald-500/20">
          <div className="flex items-center justify-between text-[9px] text-emerald-400/80">
            <span>INTERLOCK STATUS</span>
            <span className="font-bold text-emerald-300">
              {isTriggered ? 'OVERRIDE COMPLETE (100%)' : isHovered ? 'SECURITY SCAN (55%)' : 'LOCKED (0%)'}
            </span>
          </div>
          <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#047857] to-[#34D399] transition-all duration-500 rounded-full"
              style={{ width: `${authProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interaction Prompt */}
      <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase font-semibold">
        <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-300" />
        <span>{isHovered ? 'CLICK TO BREACH & ENTER' : 'TAP VAULT TO AUTHENTICATE'}</span>
      </div>
    </div>
  );
}

export default CyberVaultPortal;
