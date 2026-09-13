'use client';

import React, { useState, useEffect } from 'react';
import { CyberVaultPortal } from './CyberVaultPortal';
import { FastForward, Shield, Terminal, Cpu, Database, Server, Key, Radio, Zap, Lock } from 'lucide-react';
import { soundFX } from '@/lib/audio';

interface SeamOpeningExperienceProps {
  onComplete: () => void;
}

export function SeamOpeningExperience({ onComplete }: SeamOpeningExperienceProps) {
  // Opening state: 'idle' | 'expanding' | 'splitting' | 'done'
  const [openPhase, setOpenPhase] = useState<'idle' | 'expanding' | 'splitting' | 'done'>('idle');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setOpenPhase('done');
      onComplete();
    }
  }, [onComplete]);

  const handleTriggerUnlock = () => {
    if (openPhase !== 'idle') return;

    soundFX.playSeamActivation();
    // 1. Expand portal and engage override sequence
    setOpenPhase('expanding');

    // 2. Tear & part the blast doors into Left & Right halves
    setTimeout(() => {
      soundFX.playVaultUnlock();
      soundFX.playTravelWhoosh();
      setOpenPhase('splitting');
    }, 600);

    // 3. Complete and reveal the portfolio
    setTimeout(() => {
      setOpenPhase('done');
      onComplete();
    }, 1450);
  };

  const handleSkip = () => {
    soundFX.playClick();
    setOpenPhase('done');
    onComplete();
  };

  if (openPhase === 'done') {
    return null;
  }

  const isExpanding = openPhase === 'expanding';
  const isSplitting = openPhase === 'splitting';

  // Hexadecimal cyber data streams for ambient background
  const hexStreams = [
    '0x7F 0x4A 0x9E 0x1B 0x02 0x8C 0xF3',
    'AES-GCM // 256-BIT // SHA-384',
    'SEC.HASH: 0x4F92E1B8A0D45',
    'PACKET.FILTER: 10.0.4.1 [ACTIVE]',
    'CIT.CYBER.KERNEL: INTEGRITY_OK',
    'NODE.PORT.443 // TLS_1.3_ENCRYPTED',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#050807] text-[#F4FBF7] select-none pointer-events-auto">
      {/* ── CYBER BACKGROUND: SCANLINES & DATA STREAMS ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        {/* Animated Cyber Radar Sweep */}
        <div
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] pointer-events-none opacity-20"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(16, 185, 129, 0.15) 0deg, transparent 60deg, transparent 360deg)',
            animation: 'spin 12s linear infinite',
          }}
        />

        {/* Ambient Hex Data Stream Columns */}
        <div className="absolute inset-0 flex justify-between px-8 sm:px-16 text-[10px] font-mono text-emerald-500/20 leading-loose pointer-events-none">
          <div className="hidden md:flex flex-col space-y-4 pt-12">
            {hexStreams.map((h, i) => (
              <div key={i} className="animate-pulse">{h}</div>
            ))}
          </div>
          <div className="hidden lg:flex flex-col space-y-4 pt-24 text-right">
            {hexStreams.slice().reverse().map((h, i) => (
              <div key={i} className="animate-pulse">{h}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LEFT HALF BLAST DOOR (Tears & Slides Left) ── */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-[#050807]/98 border-r border-emerald-500/40 z-20 overflow-hidden flex items-center justify-end transition-transform duration-900 ${
          isSplitting ? '-translate-x-[115vw]' : 'translate-x-0'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.83, 0, 0.17, 1)',
          willChange: 'transform',
        }}
      >
        {/* Cyber Circuit Grid Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(16, 185, 129, 0.25) 1px, transparent 1px), linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Left Telemetry Column Header */}
        <div className="absolute top-8 left-8 text-[11px] font-mono text-emerald-400/90 tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>CYBER_GATEWAY // NODE_CIT</span>
        </div>

        {/* Left Side: Authentic Cybersecurity Defense Diagnostic Box */}
        <div className="absolute top-24 left-8 hidden lg:block p-4 rounded-xl bg-[#0A110D]/90 border border-emerald-500/30 text-[10px] font-mono text-emerald-300/85 space-y-1.5 w-64 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <div className="flex items-center gap-2 font-bold text-emerald-300 border-b border-emerald-500/25 pb-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>NETWORK DEFENSE NODE // CIT</span>
          </div>
          <div>PORT 443 // TLS 1.3 ENCRYPTED</div>
          <div>PACKET FILTER // ACTIVE [0 DROPS]</div>
          <div>INTRUSION DETECT // 0 THREATS</div>
          <div>FIREWALL STATUS // ZERO-TRUST OK</div>
        </div>

        {/* Center Jagged Fracture / Interlocking Mechanical Teeth Visual Seam (Right Edge) */}
        <div className="absolute right-0 top-0 bottom-0 w-3 pointer-events-none flex flex-col justify-around opacity-90">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-4 bg-emerald-500/40 border-r border-emerald-400 transform ${
                i % 2 === 0 ? 'translate-x-1' : '-translate-x-1'
              } transition-all duration-300`}
            />
          ))}
        </div>

        {/* Left Center Door Shutter Glow */}
        <div
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-[100vw] flex justify-center items-center pointer-events-none transition-transform duration-500 ease-out ${
            isExpanding ? 'scale-125 sm:scale-140' : 'scale-100'
          }`}
        >
          <div className="w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>

        {/* Left Footer Telemetry */}
        <div className="absolute bottom-8 left-8 text-[10px] font-mono text-emerald-400/70 space-y-0.5">
          <div>CHENNAI INSTITUTE OF TECHNOLOGY</div>
          <div>B.E. CSE (CYBER SECURITY) • CGPA 9.07</div>
        </div>
      </div>

      {/* ── RIGHT HALF BLAST DOOR (Tears & Slides Right) ── */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-[#050807]/98 border-l border-emerald-500/40 z-20 overflow-hidden flex items-center justify-start transition-transform duration-900 ${
          isSplitting ? 'translate-x-[115vw]' : 'translate-x-0'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.83, 0, 0.17, 1)',
          willChange: 'transform',
        }}
      >
        {/* Cyber Circuit Grid Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(16, 185, 129, 0.25) 1px, transparent 1px), linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Right Header Skip Button */}
        <div className="absolute top-8 right-8 z-30">
          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 hover:text-white border border-emerald-500/40 px-3.5 py-1.5 rounded-full bg-emerald-950/60 backdrop-blur-md transition-all cursor-pointer shadow-xs"
          >
            <span>[ SKIP OVERRIDE ]</span>
            <FastForward className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>

        {/* Right Side: Authentic Zero-Trust Cryptographic Enclave Box */}
        <div className="absolute top-24 right-8 hidden lg:block p-4 rounded-xl bg-[#0A110D]/90 border border-emerald-500/30 text-[10px] font-mono text-emerald-300/85 space-y-1.5 w-64 text-right shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <div className="flex items-center justify-end gap-2 font-bold text-emerald-300 border-b border-emerald-500/25 pb-1.5">
            <span>CRYPTOGRAPHIC ENCLAVE</span>
            <Key className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>CIPHER // AES-256-GCM_SHA384</div>
          <div>HASH DIGEST // 0x7F92E1B8A0</div>
          <div>SECURITY CLEARANCE // LEVEL 4 (CIT)</div>
          <div>VERIFICATION // CREDLY & CISCO</div>
        </div>

        {/* Center Jagged Fracture / Interlocking Mechanical Teeth Visual Seam (Left Edge) */}
        <div className="absolute left-0 top-0 bottom-0 w-3 pointer-events-none flex flex-col justify-around opacity-90">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-4 bg-emerald-500/40 border-l border-emerald-400 transform ${
                i % 2 === 0 ? '-translate-x-1' : 'translate-x-1'
              } transition-all duration-300`}
            />
          ))}
        </div>

        {/* Right Center Door Shutter Glow */}
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-[100vw] flex justify-center items-center pointer-events-none transition-transform duration-500 ease-out ${
            isExpanding ? 'scale-125 sm:scale-140' : 'scale-100'
          }`}
        >
          <div className="w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>

        {/* Right Footer Telemetry */}
        <div className="absolute bottom-8 right-8 text-[10px] font-mono text-emerald-400/70 text-right space-y-0.5">
          <div>HYDRAULIC STATUS // LOCKED [4/4]</div>
          <div>LAT 13.0827° N • LON 80.2707° E</div>
        </div>
      </div>

      {/* ── JAGGED TEARING / BREAKING BEAM (Visible down center seam when cracking) ── */}
      <div
        className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-25 pointer-events-none transition-all duration-500 ${
          isExpanding
            ? 'w-2 bg-gradient-to-b from-transparent via-emerald-300 to-transparent shadow-[0_0_30px_#34D399] opacity-100 scale-y-100'
            : 'w-0.5 bg-emerald-500/40 opacity-70'
        }`}
      />

      {/* ── CENTER CYBER INTERFACE CONTROLLER (The Door Opening Hub) ── */}
      <div
        className={`absolute inset-0 z-30 flex flex-col items-center justify-center p-4 text-center my-auto transition-all duration-500 ${
          isSplitting ? 'opacity-0 scale-150 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="space-y-2 mb-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono tracking-[0.25em] uppercase shadow-xs">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>CYBER ENCRYPTED ACCESS PORTAL</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-white">
            SRIDHARSHINI S
          </h1>

          {/* Corrected Subtitle as Requested */}
          <p className="text-xs sm:text-sm font-mono text-emerald-300/90 tracking-widest uppercase max-w-lg mx-auto font-semibold">
            CYBERSECURITY • NETWORK DEFENSE • FULL-STACK SYSTEMS
          </p>
        </div>

        {/* Central Interactive Cyber Vault Portal with Live Authentication Log */}
        <div
          className={`transform transition-transform duration-500 ease-out w-full max-w-lg ${
            isExpanding ? 'scale-110 sm:scale-125' : 'scale-100'
          }`}
        >
          <CyberVaultPortal onUnlock={handleTriggerUnlock} isTriggered={isExpanding || isSplitting} />
        </div>
      </div>
    </div>
  );
}

export default SeamOpeningExperience;
