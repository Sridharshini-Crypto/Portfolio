'use client';

import React from 'react';
import { ArrowDown, Shield, Cpu, Network, Sparkles, FileText } from 'lucide-react';
import { soundFX } from '@/lib/audio';
import { profileData } from '@/data/profile';

interface EntryExperienceProps {
  onEnter: () => void;
  onOpenResume?: () => void;
}

export function EntryExperience({ onEnter, onOpenResume }: EntryExperienceProps) {
  const handleEnterClick = () => {
    soundFX.playTone(520, 0.1);
    onEnter();
  };

  return (
    <section id="identity" className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between items-center px-4 sm:px-6 py-16 sm:py-24 text-center overflow-hidden text-[#F4FBF7]">
      {/* System Status Telemetry Header */}
      <div className="flex items-center gap-3 text-xs font-mono text-[#F4FBF7] bg-[#0A110D] px-4 py-1.5 rounded-full border border-emerald-500/30 shadow-md animate-fade-in">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>SYSTEM IDENTITY // CIT.CSE.SEC</span>
        <span className="text-emerald-500/30">|</span>
        <span className="text-emerald-300 font-bold">CGPA 9.07</span>
      </div>

      {/* Central Hero Spatial Block */}
      <div className="max-w-4xl mx-auto my-auto space-y-6 sm:space-y-8 z-10">
        {/* Name & Academic Discipline */}
        <div className="space-y-3">
          <div className="inline-block px-3.5 py-1 bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-mono tracking-widest uppercase font-semibold">
            Computer Science & Engineering • Cyber Security
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-white">
            SRIDHARSHINI S
          </h1>
          <div className="h-0.5 w-24 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto opacity-90 rounded-full" />
        </div>

        {/* Professional Tagline */}
        <p className="text-lg sm:text-2xl font-sans font-light text-emerald-100 max-w-2xl mx-auto leading-relaxed">
          &ldquo;{profileData.tagline}&rdquo;
        </p>

        {/* Technical Domain Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-emerald-300/90 pt-2">
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0E1813] border border-emerald-500/30 shadow-xs text-white">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cybersecurity</span>
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0E1813] border border-emerald-500/30 shadow-xs text-white">
            <Network className="w-3.5 h-3.5 text-emerald-400" />
            <span>Networking</span>
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0E1813] border border-emerald-500/30 shadow-xs text-white">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI & Digital Twins</span>
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0E1813] border border-emerald-500/30 shadow-xs text-white">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero-Trust Systems</span>
          </span>
        </div>

        {/* Primary CTA Buttons */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#047857] to-[#10B981] hover:brightness-110 text-white rounded-xl font-mono text-sm tracking-wider uppercase font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:translate-y-[-1px] cursor-pointer"
          >
            <span>[ EXPLORE THE MINDSET ]</span>
            <ArrowDown className="w-4 h-4 text-white group-hover:translate-y-1 transition-transform" />
          </button>

          {onOpenResume && (
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenResume();
              }}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-emerald-500/30 bg-[#0E1813] hover:bg-emerald-950/40 text-emerald-200 hover:text-white hover:border-emerald-400/60 text-xs font-mono font-semibold transition-all shadow-xs cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>VIEW RESUME</span>
            </button>
          )}
        </div>
        <div className="text-[11px] font-mono text-emerald-400/60">
          Scroll down or click to explore the engineering narrative
        </div>
      </div>

      {/* Bottom Coordinates */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-emerald-400/70 gap-2 pt-6 border-t border-emerald-500/25">
        <div>CHENNAI INSTITUTE OF TECHNOLOGY</div>
        <div className="hidden sm:block">ZERO-TRUST • PIML • CYBER DEFENSE</div>
        <div>LAT 13.0827° N • LON 80.2707° E</div>
      </div>
    </section>
  );
}

export default EntryExperience;
