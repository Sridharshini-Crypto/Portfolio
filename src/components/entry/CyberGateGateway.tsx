'use client';

import React, { useState } from 'react';
import {
  FastForward,
  Shield,
  Terminal,
  Key,
  Radio,
  ArrowRight,
  Fingerprint,
} from 'lucide-react';
import { RotaryCyberLockHUD } from './RotaryCyberLockHUD';
import { soundFX } from '@/lib/audio';

interface CyberGateGatewayProps {
  onComplete: () => void;
}

export function CyberGateGateway({ onComplete }: CyberGateGatewayProps) {
  // Gate sequence phase: 'idle' -> 'authenticating' -> 'unlocked' -> 'done'
  const [phase, setPhase] = useState<'idle' | 'authenticating' | 'unlocked' | 'done'>('idle');
  const [authStep, setAuthStep] = useState(0);

  const authSequence = [
    'INITIALIZING ZERO-TRUST ENCLAVE...',
    'IDENTITY CONFIRMED: SRIDHARSHINI S',
    'CLEARANCE: CIT.ZERO_TRUST [CGPA 9.07]',
    'ACCESS GRANTED // SPLITTING PORTAL SEAM',
  ];

  const handleStartAuthentication = () => {
    if (phase !== 'idle') return;

    soundFX.playSeamActivation();
    setPhase('authenticating');

    setTimeout(() => setAuthStep(1), 300);
    setTimeout(() => setAuthStep(2), 650);
    setTimeout(() => setAuthStep(3), 1000);

    // Trigger split seam opening animation
    setTimeout(() => {
      soundFX.playVaultUnlock();
      soundFX.playTravelWhoosh();
      setPhase('unlocked');
    }, 1300);

    // Complete transition into portfolio
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2200);
  };

  const handleSkip = () => {
    soundFX.playClick();
    setPhase('done');
    onComplete();
  };

  if (phase === 'done') return null;

  const isAuthenticating = phase === 'authenticating';
  const isUnlocked = phase === 'unlocked';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#030604] text-[#F4FBF7] select-none pointer-events-auto">
      {/* Custom float animation style */}
      <style jsx>{`
        @keyframes cyberMascotFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }
        .mascot-floating {
          animation: cyberMascotFloat 4s ease-in-out infinite;
        }
      `}</style>

      {/* ── SKIP BUTTON ── */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={handleSkip}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A110D]/90 border border-emerald-500/40 text-emerald-400 hover:text-white hover:border-emerald-300 transition-all text-xs font-mono tracking-wider backdrop-blur-md cursor-pointer shadow-lg group"
        >
          <span>BYPASS ENCLAVE</span>
          <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* ── SCANLINE & BACKGROUND HUD ── */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent animate-[scan_6s_linear_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,8,7,0.85)_80%)]" />
      </div>

      {/* ── LEFT GATE DOOR PANEL (Sliding Left) ── */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-20 overflow-hidden bg-[#050807] transition-transform duration-1000 ease-[cubic-bezier(0.83,0,0.17,1)] ${
          isUnlocked ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Subtle Circuit Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Left Telemetry Header */}
        <div className="absolute top-8 left-8 text-[11px] font-mono text-emerald-400/90 tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>CYBER_GATEWAY // NODE_CIT</span>
        </div>

        {/* Left Diagnostic Box */}
        <div className="absolute top-24 left-8 hidden xl:block p-4 rounded-xl bg-[#0A110D]/90 border border-emerald-500/30 text-[10px] font-mono text-emerald-300/85 space-y-1.5 w-60 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <div className="flex items-center gap-2 font-bold text-emerald-300 border-b border-emerald-500/25 pb-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>DEFENSE GUARDIAN NODE</span>
          </div>
          <div>PORT 443 // TLS 1.3 ENCRYPTED</div>
          <div>INTRUSION DETECT // ZERO THREATS</div>
          <div>GUARDIAN // ARMED & ONLINE</div>
          <div>FIREWALL // ZERO-TRUST ENCLAVE</div>
        </div>

        {/* Left Footer Telemetry */}
        <div className="absolute bottom-8 left-8 text-[10px] font-mono text-emerald-400/70 space-y-0.5">
          <div>CHENNAI INSTITUTE OF TECHNOLOGY</div>
          <div>B.E. CSE (CYBER SECURITY) • CGPA 9.07</div>
        </div>
      </div>

      {/* ── RIGHT GATE DOOR PANEL (Sliding Right) ── */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-20 overflow-hidden bg-[#050807] transition-transform duration-1000 ease-[cubic-bezier(0.83,0,0.17,1)] ${
          isUnlocked ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Subtle Circuit Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Right Telemetry Header */}
        <div className="absolute top-8 right-8 text-[11px] font-mono text-emerald-400/90 tracking-wider flex items-center gap-2">
          <span>ENCRYPTION // AES-256-GCM</span>
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
        </div>

        {/* Right Diagnostic Box */}
        <div className="absolute top-24 right-8 hidden xl:block p-4 rounded-xl bg-[#0A110D]/90 border border-emerald-500/30 text-[10px] font-mono text-emerald-300/85 space-y-1.5 w-60 text-right shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <div className="flex items-center justify-end gap-2 font-bold text-emerald-300 border-b border-emerald-500/25 pb-1.5">
            <span>CRYPTOGRAPHIC ENCLAVE</span>
            <Key className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>CIPHER // AES-256-GCM_SHA384</div>
          <div>HASH DIGEST // 0x7F92E1B8A0</div>
          <div>CLEARANCE // LEVEL 4 (CIT)</div>
          <div>VERIFICATION // CIT & CISCO</div>
        </div>

        {/* Right Footer Telemetry */}
        <div className="absolute bottom-8 right-8 text-[10px] font-mono text-emerald-400/70 text-right space-y-0.5">
          <div>ENCLAVE STATUS // LOCKED [4/4]</div>
          <div>LAT 13.0827° N • LON 80.2707° E</div>
        </div>
      </div>

      {/* ── INTERACTION LAYER (Mascot, Terminal & Rotary Cyber Lock) ── */}
      <div
        className={`absolute inset-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center transition-all duration-700 ${
          isUnlocked ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="relative w-full min-h-[620px] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* LEFT SIDE: CYBER MASCOT GUARDIAN & ZERO-TRUST TERMINAL */}
          <div
            className={`w-full max-w-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8 transition-all duration-600 ${
              isAuthenticating ? 'opacity-0 -translate-x-24 pointer-events-none' : 'opacity-100 translate-x-0'
            }`}
          >
            {/* ── 3D CYBER REAPER MASCOT FIGURE ── */}
            <div
              className="relative shrink-0 flex flex-col items-center group cursor-pointer"
              onClick={handleStartAuthentication}
              title="Click to Authenticate"
            >
              {/* Holographic Glowing Pedestal at base */}
              <div className="absolute -bottom-4 w-44 h-9 rounded-[100%] bg-emerald-500/25 blur-md group-hover:bg-emerald-400/40 transition-all duration-500" />
              <div className="absolute -bottom-3 w-36 h-4 rounded-[100%] border border-emerald-400/40 animate-pulse" />
              <div className="absolute -bottom-1 w-24 h-2 rounded-[100%] bg-emerald-400/60 blur-xs" />

              {/* Ambient Cyber Green Radial Aura */}
              <div className="absolute inset-0 bg-radial from-emerald-500/20 via-transparent to-transparent blur-xl pointer-events-none" />

              {/* Mascot Image with floating animation */}
              <div className="relative z-10 w-44 sm:w-48 md:w-56 h-auto select-none transition-transform duration-500 group-hover:scale-105">
                <img
                  src="/cyber_reaper_mascot.png"
                  alt="Cyber Security Guardian Mascot"
                  className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(16,185,129,0.45)] group-hover:drop-shadow-[0_0_45px_rgba(52,211,153,0.75)] transition-all duration-500 mascot-floating"
                />
              </div>

              {/* Mascot Telemetry Tag */}
              <div className="mt-3 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/35 text-[10px] font-mono text-emerald-300 font-semibold tracking-wider uppercase shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>CYBER GUARDIAN // ONLINE</span>
                </span>
              </div>
            </div>

            {/* ── ZERO-TRUST TERMINAL CONTROLS & CTA ── */}
            <div className="flex-1 space-y-4 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono tracking-[0.2em] uppercase shadow-xs">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>ZERO-TRUST ENCLAVE</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
                  AUTHENTICATE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                    SYSTEM CLEARANCE
                  </span>
                </h1>

                <p className="text-xs sm:text-sm font-mono text-emerald-200/80 max-w-md leading-relaxed">
                  Zero-trust encrypted gateway protecting cybersecurity architectures and applied intelligence case files for <span className="text-white font-bold">SRIDHARSHINI S</span>.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 max-w-xs pt-1 mx-auto sm:mx-0">
                <div className="p-2.5 rounded-xl bg-[#0A110D]/90 border border-emerald-500/30 space-y-0.5 text-left">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400">
                    <Shield className="w-3 h-3" />
                    <span>CLEARANCE</span>
                  </div>
                  <div className="text-[11px] text-emerald-100 font-mono font-semibold">CIT.ZERO_TRUST</div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0A110D]/90 border border-emerald-500/30 space-y-0.5 text-left">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400">
                    <Fingerprint className="w-3 h-3" />
                    <span>BIOMETRIC</span>
                  </div>
                  <div className="text-[11px] text-emerald-100 font-mono font-semibold">READY TO SCAN</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleStartAuthentication}
                  className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 bg-gradient-to-r from-[#047857] via-[#059669] to-[#10B981] hover:brightness-110 text-white rounded-2xl font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:scale-105 cursor-pointer w-full sm:w-auto"
                >
                  <span>[ AUTHENTICATE & ENTER → ]</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE -> ROTARY CYBER LOCK */}
          <div
            onClick={handleStartAuthentication}
            className={`cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] ${
              isAuthenticating
                ? 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-110 sm:scale-130 z-40'
                : 'w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] relative flex items-center justify-center hover:scale-105 shrink-0'
            }`}
          >
            <RotaryCyberLockHUD
              isAuthenticating={isAuthenticating}
              isUnlocked={isUnlocked}
            />

            {isAuthenticating && (
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-88 sm:w-96 text-center font-mono space-y-2 animate-fade-in">
                <div className="text-xs font-bold text-emerald-300 tracking-widest uppercase bg-[#0A110D]/95 py-1.5 px-4 rounded-xl border border-emerald-500/40 shadow-lg">
                  {authSequence[authStep]}
                </div>
                <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden border border-emerald-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-[#047857] via-[#10B981] to-[#34D399] transition-all duration-300"
                    style={{ width: `${((authStep + 1) / 4) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default CyberGateGateway;
