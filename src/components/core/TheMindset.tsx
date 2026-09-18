'use client';

import React from 'react';
import { ArrowRight, Sparkles, Shield, Terminal, ArrowDown } from 'lucide-react';
import { soundFX } from '@/lib/audio';
import { ScrambleText } from '@/components/cyber/ScrambleText';

interface TheMindsetProps {
  onNavigateSector: (sectorId: string) => void;
}

export function TheMindset({ onNavigateSector }: TheMindsetProps) {
  const handleNavigate = (sectorId: string) => {
    soundFX.playClick();
    onNavigateSector(sectorId);
  };

  return (
    <section id="mindset" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-36 text-[#F4FBF7] overflow-hidden">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-16 sm:space-y-24">
        
        {/* ── 1. CHAPTER BADGE ── */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-300 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-500/40 font-semibold tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>01 // THE MINDSET</span>
          </span>
          <span className="text-xs font-mono text-emerald-400/60 hidden sm:inline tracking-wider">
            FIRST-PRINCIPLES ENGINEERING MANIFESTO
          </span>
        </div>

        {/* ── 2. PRIMARY POWERFUL STATEMENT ── */}
        <div className="space-y-6">
          <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
            CORE PHILOSOPHY
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-white tracking-tight leading-[1.05] uppercase">
            SECURITY<br />
            IS NOT SOMETHING<br />
            I ADD TO A SYSTEM.<br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-white bg-clip-text text-transparent">
              IT IS HOW<br />
              I BUILD IT.
            </span>
          </h2>
        </div>

        {/* ── 3. SLEEK VISUAL DIVIDER & SUBTLE ACCENT ── */}
        <div className="relative flex items-center gap-4 py-4">
          <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/60 via-emerald-500/20 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,1)]" />
          <div className="h-px w-12 bg-emerald-500/40" />
        </div>

        {/* ── 4. SECOND STATEMENT: TRIPTYCH INTENT ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0A110D]/90 border border-emerald-500/30 space-y-2 hover:border-emerald-400 transition-colors">
            <div className="text-xs font-mono text-emerald-400 font-bold">01 // INQUIRY</div>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight uppercase">
              <ScrambleText text="QUESTION EVERYTHING." triggerOnHover={true} />
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/70 font-sans pt-1">
              Never trust default configurations, black-box assumptions, or unverified boundaries.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#0A110D]/90 border border-emerald-500/30 space-y-2 hover:border-emerald-400 transition-colors">
            <div className="text-xs font-mono text-emerald-400 font-bold">02 // MASTERY</div>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight uppercase">
              <ScrambleText text="UNDERSTAND THE SYSTEM." triggerOnHover={true} />
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/70 font-sans pt-1">
              Dissect telemetry, packet flows, kernel invariants, and underlying physics.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#0A110D]/90 border border-emerald-500/30 space-y-2 hover:border-emerald-400 transition-colors">
            <div className="text-xs font-mono text-emerald-400 font-bold">03 // EXECUTION</div>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight uppercase">
              <ScrambleText text="BUILD WITH INTENT." triggerOnHover={true} />
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/70 font-sans pt-1">
              Engineer deterministic, air-gapped, zero-trust architectures that endure.
            </p>
          </div>
        </div>

        {/* ── 5. MINIMALIST ACTION NAVIGATION ── */}
        <div className="pt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => handleNavigate('projects')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#047857] via-[#059669] to-[#10B981] hover:brightness-110 text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_24px_rgba(16,185,129,0.35)] cursor-pointer hover:scale-105"
          >
            <span>[ EXPLORE CASE FILES → ]</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleNavigate('intelligence')}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-[#0A110D] border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-white font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer"
          >
            <span>DISCOVER INTELLIGENCE NETWORK</span>
            <ArrowDown className="w-4 h-4 text-emerald-400" />
          </button>
        </div>

      </div>

    </section>
  );
}

export default TheMindset;
