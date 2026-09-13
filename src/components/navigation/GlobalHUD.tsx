'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  MessageSquare,
  Search,
  Menu,
  X,
  Sparkles,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { soundFX } from '@/lib/audio';
import { profileData } from '@/data/profile';
import { SoundToggle } from './SoundToggle';

interface GlobalHUDProps {
  activeSection: string;
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
  onNavigateSector?: (sectorId: string) => void;
  onResetToGate?: () => void;
}

const navItems = [
  { id: 'mindset', label: 'MINDSET', number: '01' },
  { id: 'projects', label: 'PROJECT LAB', number: '02' },
  { id: 'intelligence', label: 'INTELLIGENCE', number: '03' },
  { id: 'experience', label: 'EXPERIENCE', number: '04' },
  { id: 'journey', label: 'JOURNEY', number: '05' },
  { id: 'archive', label: 'LEARNING', number: '06' },
  { id: 'connect', label: 'CONNECT', number: '07' },
];

export function GlobalHUD({
  activeSection,
  onOpenCommandPalette,
  onOpenResume,
  onNavigateSector,
  onResetToGate,
}: GlobalHUDProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    soundFX.playClick();
    setMobileMenuOpen(false);
    if (onNavigateSector) {
      onNavigateSector(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const whatsappUrl = `https://wa.me/${profileData.socials.whatsappNumber}?text=${encodeURIComponent(
    profileData.defaultWhatsAppMessage
  )}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-2.5 bg-[#050807]/95 backdrop-blur-2xl border-b border-emerald-500/30 shadow-[0_4px_35px_rgba(0,0,0,0.85)]'
            : 'py-4 bg-gradient-to-b from-[#050807]/95 via-[#050807]/80 to-transparent backdrop-blur-sm'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 md:pl-56 lg:pl-60 flex items-center justify-between gap-4">
          
          {/* ── 1. BRAND IDENTITY: SRIDHARSHINI S (Positioned left with clean spacing) ── */}
          <button
            onClick={() => handleNavClick('identity')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer shrink-0"
            title="Sridharshini S — Cyber Security Engineer"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-950/90 flex items-center justify-center border border-emerald-500/50 group-hover:border-emerald-300 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <span className="font-mono text-xs font-bold text-emerald-400 group-hover:text-white tracking-widest">S</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-emerald-300 transition-colors whitespace-nowrap">
                SRIDHARSHINI S
              </span>
              <span className="text-[10px] font-mono text-emerald-400/80 tracking-wider hidden xl:inline-block border-l border-emerald-500/30 pl-2 whitespace-nowrap">
                CIT • CYBER DEFENSE
              </span>
            </div>
          </button>

          {/* ── 2. ACTIVE SECTOR BREADCRUMB BADGE (Sleek replacement for horizontal nav) ── */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A110D]/90 border border-emerald-500/30 text-xs font-mono text-emerald-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-500/80 font-bold uppercase">SECTOR:</span>
            <span className="text-white font-extrabold tracking-wider uppercase">
              {navItems.find((n) => n.id === activeSection)?.label || 'OVERVIEW'}
            </span>
          </div>

          {/* ── 3. RIGHT TOOLS & ACTIONS ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Direct Resume Download Link */}
            <a
              href="/SRIDHARSHINI_S_RESUME.pdf"
              download="SRIDHARSHINI_S_RESUME.pdf"
              onClick={() => soundFX.playClick()}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-[#0E1813] hover:bg-emerald-950/60 text-emerald-300 hover:text-white hover:border-emerald-300 text-xs font-mono transition-all cursor-pointer shadow-xs"
              title="Download Sridharshini's Verified Resume (PDF)"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>RESUME</span>
            </a>

            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                soundFX.playTone(600, 0.05);
                onOpenCommandPalette();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-emerald-500/40 bg-[#0E1813] hover:bg-emerald-950/60 text-emerald-400/80 hover:text-white hover:border-emerald-300 transition-all text-xs font-mono cursor-pointer shadow-xs"
              title="Search & Jump (Ctrl+K / Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline text-[11px]">SEARCH</span>
              <kbd className="hidden md:inline px-1 py-0.2 bg-[#050807] border border-emerald-500/40 text-[9px] rounded text-emerald-400/80">
                ⌘K
              </kbd>
            </button>

            {/* Reset / Replay Lock Gate Button */}
            {onResetToGate && (
              <button
                onClick={() => {
                  soundFX.playClick();
                  onResetToGate();
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-emerald-500/40 bg-[#0E1813] hover:bg-emerald-950/60 text-emerald-400/80 hover:text-white hover:border-emerald-300 transition-all text-xs font-mono cursor-pointer shadow-xs"
                title="Return to Cyber Lock Gate (Stage 0)"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline text-[11px]">GATE</span>
              </button>
            )}

            {/* Sound FX Toggle (Cyber Green Theme) */}
            <SoundToggle />

            {/* Direct WhatsApp Quick Connect */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playClick()}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#047857] to-[#10B981] hover:brightness-110 text-white transition-all text-xs font-mono font-bold shadow-[0_0_16px_rgba(16,185,129,0.35)] cursor-pointer"
              title="Connect on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-white" />
              <span>Connect</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                soundFX.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl border border-emerald-500/40 bg-[#0E1813] text-emerald-400 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] z-30 bg-[#050807]/98 backdrop-blur-2xl border-b border-emerald-500/30 p-6 flex flex-col justify-between animate-fade-in">
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-wider px-3 mb-2">
              PORTFOLIO CHAPTERS
            </div>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#047857] to-[#10B981] text-white border border-emerald-400/50 shadow-md font-bold'
                      : 'bg-[#0E1813] border border-emerald-500/20 text-emerald-200 hover:bg-emerald-950/40'
                  }`}
                >
                  <span className="font-heading text-sm">{item.label}</span>
                  <span
                    className={`font-mono text-xs ${
                      isActive ? 'text-white font-bold' : 'text-emerald-500/70'
                    }`}
                  >
                    {item.number}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="space-y-3 pt-6 border-t border-emerald-500/20">
            <a
              href="/SRIDHARSHINI_S_RESUME.pdf"
              download="SRIDHARSHINI_S_RESUME.pdf"
              onClick={() => {
                setMobileMenuOpen(false);
                soundFX.playClick();
              }}
              className="w-full flex items-center justify-center gap-2 p-3 bg-[#0E1813] border border-emerald-500/40 text-emerald-200 rounded-xl font-mono text-xs font-bold transition-colors"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Download Resume PDF</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-[#047857] to-[#10B981] text-white rounded-xl font-mono text-xs font-bold transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>

            <div className="flex items-center justify-between text-xs text-emerald-400/60 font-mono px-2">
              <span>Chennai Institute of Technology</span>
              <span>B.E. CSE CYBER SECURITY</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GlobalHUD;
