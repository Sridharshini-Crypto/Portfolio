'use client';

import React, { useState, useEffect } from 'react';
import { soundFX } from '@/lib/audio';
import { profileData } from '@/data/profile';
import {
  FileText,
  RotateCcw,
  Search,
  MessageSquare,
  Send,
  Volume2,
  VolumeX,
  Menu,
  X,
  ArrowUp,
  Sparkles,
} from 'lucide-react';

interface ChapterNavProps {
  activeSection: string;
  onNavigateSector: (sectorId: string) => void;
  onResetToGate?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenResume?: () => void;
}

const chapters = [
  { id: 'mindset', number: '01', name: 'MINDSET' },
  { id: 'projects', number: '02', name: 'PROJECT LAB' },
  { id: 'intelligence', number: '03', name: 'INTELLIGENCE' },
  { id: 'experience', number: '04', name: 'EXPERIENCE' },
  { id: 'journey', number: '05', name: 'JOURNEY' },
  { id: 'archive', number: '06', name: 'LEARNING' },
  { id: 'connect', number: '07', name: 'CONNECT' },
];

export function ChapterNav({
  activeSection,
  onNavigateSector,
  onResetToGate,
  onOpenCommandPalette,
  onOpenResume,
}: ChapterNavProps) {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setAudioEnabled(soundFX.isEnabled());
  }, []);

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    soundFX.setEnabled(next);
    if (next) {
      soundFX.playTone(520, 0.08);
    }
  };

  const handleClick = (id: string) => {
    soundFX.playClick();
    setMobileMenuOpen(false);
    onNavigateSector(id);
  };

  return (
    <>
      {/* ── DESKTOP SIDEBAR PANEL (w-56) ── */}
      <aside
        className="fixed top-0 bottom-0 left-0 w-52 lg:w-56 z-40 hidden md:flex flex-col justify-between bg-[#060C08]/98 backdrop-blur-2xl border-r border-emerald-500/35 shadow-[4px_0_35px_rgba(0,0,0,0.85)] p-3 select-none animate-fade-in overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/30"
        aria-label="Cyber Left Sidebar Navigation"
      >
        {/* ── TOP SECTION: CYBER GREEN PORTRAIT DOSSIER CARD ── */}
        <div className="space-y-2.5">
          {/* Prominent Photo Showcase Card */}
          <div
            onClick={() => handleClick('identity')}
            className="group relative rounded-2xl bg-gradient-to-b from-[#08150D] via-[#050D08] to-[#040806] border border-emerald-500/40 p-2.5 overflow-hidden hover:border-emerald-400/80 transition-all duration-300 cursor-pointer shadow-[0_4px_25px_rgba(16,185,129,0.15)]"
            title="Click to jump to System Identity"
          >
            {/* Subtle Cyber Tech Grid Pattern */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(16, 185, 129, 0.4) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />

            {/* Viewfinder Corner Accents */}
            <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-400 pointer-events-none z-20" />
            <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-400 pointer-events-none z-20" />
            <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-400 pointer-events-none z-20" />
            <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-400 pointer-events-none z-20" />

            {/* Ambient Subtle Cyber Glow & Rotating Orbit */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none group-hover:bg-emerald-400/20 transition-colors" />
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border border-emerald-500/20 border-dashed animate-[spin_30s_linear_infinite] pointer-events-none" />

            {/* Top Telemetry Tag */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playVaultUnlock();
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-classified-vault'));
                }
              }}
              className="flex items-center justify-between text-[8px] font-mono text-emerald-400/90 pb-1 relative z-10 border-b border-emerald-500/25 hover:text-white cursor-pointer"
              title="Click to Open Classified Cyber Vault // CTF Enclave"
            >
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="hover:underline">CIT.CYBER</span>
              </span>
              <span className="text-emerald-400 font-semibold bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/30 tracking-wider hover:border-emerald-400">
                ONLINE
              </span>
            </div>

            {/* Authentic Portrait Image Frame Relatable to Dark Terminal Theme */}
            <div className="relative w-full h-34 sm:h-36 lg:h-40 flex items-end justify-center overflow-hidden my-1 z-10 rounded-lg">
              <img
                src="/sridharshini_sidebar_portrait.png"
                alt="Sridharshini S — Cybersecurity Student"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.5)] group-hover:scale-102 transition-all duration-300"
              />
              {/* Soft Corner & Bottom Smudge Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#050D08] via-[#050D08]/50 to-transparent pointer-events-none z-15" />
            </div>

            {/* Dual Holographic Emerald Pedestal */}
            <div className="w-full h-1.5 rounded-[100%] bg-gradient-to-r from-emerald-500/10 via-emerald-400/50 to-emerald-500/10 blur-xs" />

            {/* Identity Label Footer */}
            <div className="pt-1 text-center space-y-0.2 relative z-10">
              <div className="font-heading font-extrabold text-xs text-white tracking-tight group-hover:text-emerald-300 transition-colors truncate">
                SRIDHARSHINI S
              </div>
              <div className="font-mono text-[9px] text-emerald-400/90 font-medium truncate">
                Cybersecurity Student
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between px-1 text-[9px] font-mono text-emerald-400/70 uppercase tracking-widest font-semibold">
            <span>// SECTORS</span>
            <span className="text-emerald-500/50">07</span>
          </div>

          {/* ── MIDDLE SECTION: CHAPTER BUTTONS ── */}
          <nav className="space-y-0.5" aria-label="Chapter Buttons">
            {chapters.map((chap) => {
              const isActive = activeSection === chap.id;

              return (
                <button
                  key={chap.id}
                  onClick={() => handleClick(chap.id)}
                  onMouseEnter={() => soundFX.playHoverTick()}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#047857] via-[#059669] to-[#10B981] text-white font-bold shadow-[0_0_14px_rgba(16,185,129,0.5)] border border-emerald-300/40 translate-x-0.5'
                      : 'text-emerald-300/80 hover:text-white hover:bg-emerald-950/60 hover:translate-x-0.5 border border-transparent'
                  }`}
                  title={`Navigate to Chapter ${chap.number} — ${chap.name}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[10px] ${
                        isActive ? 'text-white font-extrabold' : 'text-emerald-500/70 font-semibold'
                      }`}
                    >
                      {chap.number}
                    </span>
                    <span className="font-mono text-[10.5px] tracking-wide whitespace-nowrap">
                      {chap.name}
                    </span>
                  </div>

                  {/* Active Indicator Pulse Dot */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ── BOTTOM SECTION: INTEGRATED SYSTEM CONTROLS (From Header Bar) ── */}
        <div className="pt-2.5 border-t border-emerald-500/25 space-y-2 mt-2">
          <div className="flex items-center justify-between px-1 text-[8.5px] font-mono text-emerald-400/70 uppercase tracking-widest font-semibold">
            <span>// CONTROLS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
          </div>

          {/* Primary Action: Glowing Green Dispatch Button */}
          <button
            onClick={() => handleClick('connect')}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#047857] via-[#059669] to-[#10B981] hover:brightness-110 text-white font-mono text-xs font-bold shadow-[0_0_16px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
            title="Send Secure Dispatch Message"
          >
            <Send className="w-3.5 h-3.5 text-white" />
            <span>DISPATCH</span>
          </button>

          {/* 2x2 Action Pills Grid */}
          <div className="grid grid-cols-2 gap-1.5">
            {/* Resume Pill */}
            <button
              onClick={() => {
                soundFX.playClick();
                if (onOpenResume) {
                  onOpenResume();
                } else {
                  window.open('/SRIDHARSHINI_S_RESUME.pdf', '_blank');
                }
              }}
              className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-full border border-emerald-500/40 bg-[#0A120E] hover:bg-emerald-950/70 hover:border-emerald-300 text-emerald-300 hover:text-white text-[9.5px] font-mono transition-all cursor-pointer shadow-xs"
              title="View / Download Resume (PDF)"
            >
              <FileText className="w-3 h-3 text-emerald-400" />
              <span className="font-bold">RESUME</span>
            </button>

            {/* Search Pill */}
            <button
              onClick={() => {
                soundFX.playTone(600, 0.05);
                if (onOpenCommandPalette) onOpenCommandPalette();
              }}
              className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-full border border-emerald-500/40 bg-[#0A120E] hover:bg-emerald-950/70 hover:border-emerald-300 text-emerald-300 hover:text-white text-[9.5px] font-mono transition-all cursor-pointer shadow-xs"
              title="Search & Jump (Ctrl+K / Cmd+K)"
            >
              <Search className="w-3 h-3 text-emerald-400" />
              <span>SEARCH</span>
              <kbd className="text-[7.5px] px-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40">⌘K</kbd>
            </button>

            {/* Gate Pill */}
            {onResetToGate ? (
              <button
                onClick={() => {
                  soundFX.playClick();
                  onResetToGate();
                }}
                className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-full border border-emerald-500/40 bg-[#0A120E] hover:bg-emerald-950/70 hover:border-emerald-300 text-emerald-300 hover:text-white text-[9.5px] font-mono transition-all cursor-pointer shadow-xs"
                title="Return to Cyber Lock Gate"
              >
                <RotateCcw className="w-3 h-3 text-emerald-400" />
                <span>GATE</span>
              </button>
            ) : (
              <button
                onClick={() => handleClick('identity')}
                className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-full border border-emerald-500/40 bg-[#0A120E] hover:bg-emerald-950/70 hover:border-emerald-300 text-emerald-300 hover:text-white text-[9.5px] font-mono transition-all cursor-pointer shadow-xs"
                title="Jump to Top"
              >
                <ArrowUp className="w-3 h-3 text-emerald-400" />
                <span>TOP</span>
              </button>
            )}

            {/* Audio Toggle Pill */}
            <button
              onClick={toggleAudio}
              className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-full border transition-all text-[9.5px] font-mono select-none cursor-pointer ${
                audioEnabled
                  ? 'bg-gradient-to-r from-[#047857] to-[#10B981] text-white border-emerald-300 font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'bg-[#0A120E] border-emerald-500/40 text-emerald-400/80 hover:text-white hover:border-emerald-400 hover:bg-emerald-950/40'
              }`}
              title={audioEnabled ? 'Audio On — Click to Mute' : 'Audio Off — Click to Enable'}
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-3 h-3 text-white animate-pulse" />
                  <span>AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 text-emerald-400/70" />
                  <span>AUDIO OFF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* ── MOBILE FLOATING HUD DOCK (Visible on mobile only when header bar is removed) ── */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-40 bg-[#060C08]/95 backdrop-blur-2xl border border-emerald-500/40 rounded-2xl p-2 shadow-[0_4px_30px_rgba(0,0,0,0.9)] flex items-center justify-between gap-1.5">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => {
            soundFX.playClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0E1813] border border-emerald-500/40 text-emerald-300 font-mono text-[11px]"
        >
          {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          <span>SECTORS</span>
        </button>

        {/* Mobile Search */}
        <button
          onClick={() => {
            soundFX.playTone(600, 0.05);
            if (onOpenCommandPalette) onOpenCommandPalette();
          }}
          className="p-2 rounded-xl bg-[#0E1813] border border-emerald-500/40 text-emerald-400"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Mobile Audio */}
        <button
          onClick={toggleAudio}
          className={`p-2 rounded-xl border ${
            audioEnabled
              ? 'bg-emerald-600 border-emerald-300 text-white'
              : 'bg-[#0E1813] border-emerald-500/40 text-emerald-400'
          }`}
          title="Toggle Audio"
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Mobile Connect */}
        <button
          onClick={() => handleClick('connect')}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#047857] to-[#10B981] text-white font-mono text-[11px] font-bold shadow-sm cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Connect</span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-35 bg-[#050807]/98 backdrop-blur-2xl p-6 pt-12 pb-24 overflow-y-auto animate-fade-in flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400 pb-2 border-b border-emerald-500/30">
              <span>// PORTFOLIO SECTORS</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-emerald-400 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            {chapters.map((chap) => {
              const isActive = activeSection === chap.id;
              return (
                <button
                  key={chap.id}
                  onClick={() => handleClick(chap.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left font-mono transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#047857] to-[#10B981] text-white font-bold border border-emerald-300'
                      : 'bg-[#0A120E] border border-emerald-500/20 text-emerald-200 hover:bg-emerald-950/40'
                  }`}
                >
                  <span className="text-xs">{chap.name}</span>
                  <span className="text-[11px] opacity-80">{chap.number}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-2 pt-6 border-t border-emerald-500/25">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenResume) onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 p-3 bg-[#0A120E] border border-emerald-500/40 text-emerald-200 rounded-xl font-mono text-xs font-bold"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>View Resume (PDF)</span>
            </button>
            {onResetToGate && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onResetToGate();
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 rounded-xl font-mono text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return to Lock Gate</span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ChapterNav;

