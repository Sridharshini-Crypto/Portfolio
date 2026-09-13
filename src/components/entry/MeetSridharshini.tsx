'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Shield,
  MapPin,
  Award,
  Terminal,
  Sparkles,
  Fingerprint,
  Radio,
  CheckCircle2,
  RefreshCw,
  Eye,
  Scan,
} from 'lucide-react';
import { soundFX } from '@/lib/audio';

interface MeetSridharshiniProps {
  onEnterPortfolio: () => void;
  onBackToGate?: () => void;
  isActive?: boolean;
}

export function MeetSridharshini({
  onEnterPortfolio,
  onBackToGate,
  isActive = true,
}: MeetSridharshiniProps) {
  // Reveal Phase: 'cloaked' -> 'unmasking' -> 'revealed'
  const [phase, setPhase] = useState<'cloaked' | 'unmasking' | 'revealed'>('cloaked');
  const [scanProgress, setScanProgress] = useState(0);
  const animFrameRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startDeMaskSequence = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    setPhase('cloaked');
    setScanProgress(0);

    // Initial brief cloaked state (700ms) showing the Hooded Matrix Hacker before laser initiates
    timerRef.current = setTimeout(() => {
      setPhase('unmasking');
      soundFX.playBiometricReveal();

      const startTime = performance.now();
      const duration = 2000; // 2.0 seconds smooth scan

      const animateScan = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(100, (elapsed / duration) * 100);
        setScanProgress(progress);

        if (progress < 100) {
          animFrameRef.current = requestAnimationFrame(animateScan);
        } else {
          setPhase('revealed');
        }
      };

      animFrameRef.current = requestAnimationFrame(animateScan);
    }, 700);
  };

  // Automatically trigger when the page becomes active (after opening the gate)
  useEffect(() => {
    if (isActive) {
      startDeMaskSequence();
    } else {
      setPhase('cloaked');
      setScanProgress(0);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isActive]);

  const handleEnter = () => {
    soundFX.playTravelWhoosh();
    onEnterPortfolio();
  };

  return (
    <section className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-8 py-16 sm:py-24 text-[#F4FBF7] overflow-hidden">
      {/* Pumping & Holographic Transition Keyframes */}
      <style jsx>{`
        @keyframes biometricPumping {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.4));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 35px rgba(52, 211, 153, 0.95)) drop-shadow(0 0 60px rgba(16, 185, 129, 0.7));
          }
        }
        @keyframes revealSnap {
          0% {
            transform: scale(1.08);
            filter: drop-shadow(0 0 35px rgba(52, 211, 153, 0.9));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.3));
          }
        }
        .biometric-pumping {
          animation: biometricPumping 0.6s ease-in-out infinite;
          transform-origin: left center;
        }
        .reveal-snapped {
          animation: revealSnap 0.6s cubic-bezier(0.83, 0, 0.17, 1) forwards;
          transform-origin: left center;
        }
      `}</style>

      {/* Background Ambient Cyber Green Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 sm:w-[560px] sm:h-[560px] bg-emerald-500/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center z-10">
        
        {/* ── LEFT SIDE: IDENTITY TYPOGRAPHY & CREDENTIALS (COL 7) ── */}
        <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
          
          {/* Dynamic Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono tracking-wider uppercase font-semibold animate-fade-in shadow-xs self-start">
            <span className={`w-2 h-2 rounded-full ${phase === 'revealed' ? 'bg-emerald-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
            {phase === 'cloaked' && (
              <span className="text-emerald-300">CLOAKED // BIOMETRIC SCAN INITIALIZING</span>
            )}
            {phase === 'unmasking' && (
              <span className="text-emerald-300 flex items-center gap-2">
                <span>DE-MASKING IDENTITY BIOMETRICS...</span>
                <span className="text-white font-bold">{Math.floor(scanProgress)}%</span>
              </span>
            )}
            {phase === 'revealed' && (
              <span className="text-emerald-300 font-bold">AUTHENTICATED // IDENTITY REVEALED</span>
            )}
          </div>

          {/* Main Identity Heading with Dynamic Pumping & Size Scaling */}
          <div
            className={`space-y-2 transition-all duration-300 origin-left ${
              phase === 'unmasking'
                ? 'biometric-pumping'
                : phase === 'revealed'
                ? 'reveal-snapped'
                : ''
            }`}
          >
            <div className="text-xl sm:text-2xl font-mono text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-2">
              <span className={phase === 'unmasking' ? 'text-emerald-200' : ''}>MEET</span>
              {phase === 'revealed' && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 inline-block animate-bounce" />
              )}
            </div>
            <h1
              className={`font-heading font-extrabold tracking-tight leading-none transition-all duration-300 ${
                phase === 'unmasking'
                  ? 'text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-white drop-shadow-[0_0_35px_rgba(16,185,129,0.9)]'
                  : 'text-4xl sm:text-6xl md:text-7xl text-white'
              }`}
            >
              SRIDHARSHINI S
            </h1>
            <div className="text-lg sm:text-2xl font-mono text-emerald-300 font-medium pt-1">
              Cybersecurity · Applied AI · Full-Stack Engineer
            </div>
          </div>

          {/* Narrative Editorial Statement */}
          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl font-sans font-light">
            &ldquo;Engineering high-assurance, resilient architectures with an uncompromising security-first mindset.&rdquo;
          </p>

          {/* Academic & Leadership Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-[#0A110D]/90 border border-emerald-500/30 space-y-1 shadow-sm">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>B.E. CSE (CYBER SEC)</span>
              </div>
              <div className="text-emerald-200/80">Chennai Inst. of Tech (CIT)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0A110D]/90 border border-emerald-500/30 space-y-1 shadow-sm">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>ACADEMIC RIGOR</span>
              </div>
              <div className="text-emerald-200/80">Top Distinction Tier</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0A110D]/90 border border-emerald-500/30 space-y-1 shadow-sm">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>LOCATION</span>
              </div>
              <div className="text-emerald-200/80">Chennai, Tamil Nadu</div>
            </div>
          </div>

          {/* High-Tech CTA Buttons */}
          <div className="pt-4 sm:pt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={handleEnter}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#047857] via-[#059669] to-[#10B981] hover:brightness-110 text-white rounded-2xl font-mono text-sm tracking-widest uppercase font-bold transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:scale-105 cursor-pointer"
            >
              <span>[ FOLLOW THE EXECUTION → ]</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-2 transition-transform" />
            </button>

            {onBackToGate && (
              <button
                onClick={() => {
                  soundFX.playClick();
                  onBackToGate();
                }}
                className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 hover:text-white font-mono text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer"
              >
                <span>← BACK TO LOCK GATE</span>
              </button>
            )}
          </div>
        </div>

        {/* ── RIGHT SIDE: CYBER BIOMETRIC DE-MASKING DOSSIER (COL 5) ── */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center lg:items-end">
          <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl bg-[#0A110D]/95 border-2 border-emerald-500/40 shadow-[0_8px_40px_rgba(16,185,129,0.25)] p-5 sm:p-7 backdrop-blur-xl group hover:border-emerald-400/70 transition-all duration-500">
            
            {/* Ambient Background Energy Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500/25 blur-3xl pointer-events-none group-hover:bg-emerald-400/35 transition-colors" />

            {/* Frame Top Telemetry Bar */}
            <div className="flex items-center justify-between border-b border-emerald-500/25 pb-3 relative z-10">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${phase === 'revealed' ? 'bg-emerald-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
                <span className="font-mono text-xs font-bold text-white tracking-wider">
                  {phase === 'revealed' ? 'IDENTITY VERIFIED' : phase === 'unmasking' ? 'DE-MASKING IN PROGRESS' : 'CLOAKED ENTITY'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/90 px-2.5 py-0.5 rounded border border-emerald-500/40 font-semibold uppercase">
                {phase === 'revealed' ? 'CIT.CYBER' : 'BIO.SCAN'}
              </span>
            </div>

            {/* Center Portrait Visual with Holographic De-Masking Scan */}
            <div
              onClick={startDeMaskSequence}
              title="Click to replay identity de-masking scan"
              className="relative z-10 my-4 flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#08130C] via-[#050807] to-[#030805] border border-emerald-500/30 p-3 pt-4 cursor-pointer hover:border-emerald-400/60 transition-colors"
            >
              {/* Subtle Tech Grid inside image container */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(16, 185, 129, 0.45) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Rotating Cyber Halo Behind Portrait */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border border-emerald-500/25 border-dashed animate-[spin_25s_linear_infinite] pointer-events-none" />

              {/* Viewfinder Corner Accents */}
              <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-emerald-400/80 pointer-events-none z-20" />
              <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-emerald-400/80 pointer-events-none z-20" />
              <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-emerald-400/80 pointer-events-none z-20" />
              <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-emerald-400/80 pointer-events-none z-20" />

              {/* Image Frame with Layered De-Masking Transition */}
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] h-[330px] sm:h-[370px] flex items-end justify-center select-none z-10 overflow-hidden rounded-xl">
                
                {/* ── LAYER 1: Sridharshini's Authentic Cyber Portrait (Revealed Identity) ── */}
                <div className="absolute inset-0 w-full h-full flex items-end justify-center">
                  <img
                    src="/sridharshini_landing2_portrait.png"
                    alt="Sridharshini S — Cybersecurity Student"
                    className="w-full h-full object-contain object-bottom drop-shadow-[0_0_25px_rgba(16,185,129,0.5)] group-hover:drop-shadow-[0_0_40px_rgba(52,211,153,0.8)] transition-all duration-500 group-hover:scale-102"
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.55)) drop-shadow(0 0 35px rgba(5, 150, 105, 0.4))',
                    }}
                  />
                </div>

                {/* ── LAYER 2: Hooded Matrix Hacker Mask (De-cloaking from Top to Bottom) ── */}
                <div
                  className={`absolute inset-0 w-full h-full z-15 transition-opacity duration-500 ${
                    phase === 'revealed' ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                  style={{
                    clipPath:
                      phase === 'unmasking'
                        ? `inset(${scanProgress}% 0 0 0)`
                        : phase === 'revealed'
                        ? 'inset(100% 0 0 0)'
                        : 'inset(0% 0 0 0)',
                  }}
                >
                  <img
                    src="/cyber_hooded_hacker.jpg"
                    alt="Cloaked Hacker Silhouette"
                    className="w-full h-full object-cover object-top rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050807]/70 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* ── LAYER 3: Glowing Emerald Laser Scanner Line ── */}
                {phase === 'unmasking' && (
                  <div
                    className="absolute left-0 right-0 z-25 pointer-events-none"
                    style={{
                      top: `${scanProgress}%`,
                      transform: 'translateY(-50%)',
                    }}
                  >
                    {/* Laser Beam Glow */}
                    <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-emerald-300 to-transparent shadow-[0_0_15px_#10B981,0_0_30px_#34D399,0_0_45px_#059669]" />
                    {/* Laser Trailing Aura */}
                    <div className="w-full h-6 -mt-3 bg-gradient-to-b from-emerald-400/20 to-transparent blur-xs pointer-events-none" />
                    
                    {/* Floating Laser HUD Label */}
                    <div className="flex items-center justify-between px-2 text-[8px] sm:text-[9px] font-mono text-emerald-300 font-bold bg-[#050807]/90 border-y border-emerald-500/50 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Scan className="w-2.5 h-2.5 animate-spin" />
                        <span>DE-MASK: {Math.floor(scanProgress)}%</span>
                      </span>
                      <span className="text-emerald-400">BIOMETRIC MATCH</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Dual-Tier Holographic Emerald Pedestal at base */}
              <div className="w-52 h-3.5 rounded-[100%] bg-gradient-to-r from-emerald-500/10 via-emerald-400/50 to-emerald-500/10 blur-xs mt-1" />
              <div className="w-36 h-2 rounded-[100%] bg-emerald-300/60 blur-xs" />
            </div>

            {/* Bottom Identity Dossier Bar & Replay De-Mask Action */}
            <div className="pt-2 border-t border-emerald-500/25 flex items-center justify-between text-[11px] font-mono relative z-10">
              <div className="flex items-center gap-1.5 text-emerald-300">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">SRIDHARSHINI S</span>
              </div>
              
              {/* Interactive Replay Scan Trigger */}
              <button
                onClick={startDeMaskSequence}
                title="Replay Identity De-Masking Scan"
                className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 hover:text-white bg-emerald-950/80 hover:bg-emerald-900/90 px-2.5 py-1 rounded border border-emerald-500/40 transition-all cursor-pointer group/btn"
              >
                <RefreshCw className="w-3 h-3 text-emerald-400 group-hover/btn:rotate-180 transition-transform duration-500" />
                <span>REPLAY SCAN</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default MeetSridharshini;
