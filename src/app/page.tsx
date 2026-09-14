'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ChapterNav } from '@/components/navigation/ChapterNav';
import { CommandPalette } from '@/components/navigation/CommandPalette';
import { CyberGateGateway } from '@/components/entry/CyberGateGateway';
import { MeetSridharshini } from '@/components/entry/MeetSridharshini';
import { TechnicalCodeBackground } from '@/components/background/TechnicalCodeBackground';
import { PageTransitionOverlay } from '@/components/transitions/PageTransitionOverlay';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TheMindset } from '@/components/core/TheMindset';
import { ProjectLab } from '@/components/projects/ProjectLab';
import { TheNetwork } from '@/components/network/TheNetwork';
import { Experience } from '@/components/experience/Experience';
import { Journey } from '@/components/journey/Journey';
import { TheArchive } from '@/components/archive/TheArchive';
import { Connect } from '@/components/connect/Connect';
import { ResumeViewer } from '@/components/resume/ResumeViewer';
import { soundFX } from '@/lib/audio';

// Dynamic import of 3D Technical Canvas with SSR disabled for optimal loading
const TechnicalCanvas = dynamic(() => import('@/components/3d/TechnicalCanvas'), {
  ssr: false,
});

const SECTOR_NAMES: Record<string, { number: string; name: string }> = {
  identity: { number: '00', name: 'SYSTEM IDENTITY' },
  mindset: { number: '01', name: 'THE MINDSET' },
  projects: { number: '02', name: 'PROJECT LAB' },
  intelligence: { number: '03', name: 'INTELLIGENCE' },
  experience: { number: '04', name: 'EXPERIENCE' },
  journey: { number: '05', name: 'THE JOURNEY SO FAR' },
  archive: { number: '06', name: 'ALWAYS LEARNING' },
  connect: { number: '07', name: 'CONNECT & INQUIRIES' },
};

const SECTION_IDS = ['mindset', 'projects', 'intelligence', 'experience', 'journey', 'archive', 'connect'];

export default function HomePage() {
  // Experience stages: gateCompleted -> inPortfolio
  const [gateCompleted, setGateCompleted] = useState(false);
  const [inPortfolio, setInPortfolio] = useState(false);

  const [activeSection, setActiveSection] = useState('mindset');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeViewerOpen, setResumeViewerOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Cinematic Chapter Transition State
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetSectorInfo, setTargetSectorInfo] = useState({ number: '01', name: 'THE MINDSET' });
  const transitionTimer = useRef<NodeJS.Timeout | null>(null);

  // High-Precision Continuous Scrollspy (Active once inside portfolio)
  useEffect(() => {
    const handleOpenCommandPalette = () => setCommandPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpenCommandPalette);

    const handleScroll = () => {
      if (!inPortfolio) return;

      // Bottom of page check
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('connect');
        return;
      }

      const triggerY = window.scrollY + window.innerHeight * 0.35;
      let currentSection = 'mindset';

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (triggerY >= top - 80) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('open-command-palette', handleOpenCommandPalette);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [inPortfolio]);

  const triggerNabilTransition = (sectorId: string) => {
    const info = SECTOR_NAMES[sectorId] || { number: '00', name: sectorId.toUpperCase() };
    setTargetSectorInfo(info);
    setIsTransitioning(true);
    soundFX.playTravelWhoosh();

    if (transitionTimer.current) clearTimeout(transitionTimer.current);

    setTimeout(() => {
      const element = document.getElementById(sectorId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 350);

    transitionTimer.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 850);
  };

  const handleEnterPortfolioFromIdentity = () => {
    setInPortfolio(true);
    triggerNabilTransition('mindset');
  };

  const handleResetToGate = () => {
    setInPortfolio(false);
    setGateCompleted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGateFromIdentity = () => {
    setGateCompleted(false);
  };

  const handleNavigateSector = (sectorId: string) => {
    if (sectorId === 'identity') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!inPortfolio) setInPortfolio(true);
    triggerNabilTransition(sectorId);
  };

  const handleOpenProject = (projectId: string) => {
    soundFX.playModuleActivate();
    setSelectedProjectId(projectId);
    if (!inPortfolio) setInPortfolio(true);
    triggerNabilTransition('projects');
  };

  return (
    <main className="relative min-h-screen bg-[#050807] text-[#F4FBF7] selection:bg-[#059669] selection:text-white transition-colors duration-500 overflow-hidden pb-20">
      {/* ── STAGE 0, 1, 2: CYBER GATE & HOODED MASCOT ROTARY LOCK SPLIT ── */}
      {!gateCompleted && (
        <CyberGateGateway
          onComplete={() => {
            setGateCompleted(true);
          }}
        />
      )}

      {/* ── MULTI-SHUTTER CHAPTER TRANSITION OVERLAY ── */}
      <PageTransitionOverlay
        isTransitioning={isTransitioning}
        targetSectorName={targetSectorInfo.name}
        targetSectorNumber={targetSectorInfo.number}
      />

      {/* ── SUBTLE AMBIENT GREEN TECHNICAL CODE BACKGROUND ── */}
      <TechnicalCodeBackground mode="green" opacityMultiplier={0.35} />

      {/* 3D WebGL Technical Canvas Background with Spatial Camera Navigation */}
      <TechnicalCanvas activeSector={activeSection} />

      {/* ── UNIFIED SIDEBAR NAVIGATION (Appears after entering portfolio layer) ── */}
      {inPortfolio && (
        <ChapterNav
          activeSection={activeSection}
          onNavigateSector={handleNavigateSector}
          onResetToGate={handleResetToGate}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenResume={() => setResumeViewerOpen(true)}
        />
      )}

      {/* Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectProject={handleOpenProject}
      />

      {/* Direct Resume Viewing Modal */}
      <ResumeViewer
        isOpen={resumeViewerOpen}
        onClose={() => setResumeViewerOpen(false)}
      />

      {/* ── PAGE CONTENT ORCHESTRATION ── */}
      <div className="relative z-10">
        {/* ── STAGE 3: MEET SRIDHARSHINI (SECOND LANDING PAGE / IDENTITY REVEAL) ── */}
        <div
          id="identity"
          className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
            inPortfolio ? 'md:pl-56 lg:pl-60 pr-4 sm:pr-6' : ''
          }`}
        >
          <MeetSridharshini
            isActive={gateCompleted}
            onEnterPortfolio={handleEnterPortfolioFromIdentity}
            onBackToGate={handleBackToGateFromIdentity}
          />
        </div>

        {/* ── STAGE 4: THE FULL PORTFOLIO CHAPTER STORY ── */}
        {inPortfolio && (
          <div className="space-y-16 sm:space-y-24 animate-fade-in pt-8 md:pl-56 lg:pl-60 pr-4 sm:pr-6">
            {/* 01 — CHAPTER 01: THE MINDSET */}
            <ScrollReveal>
              <TheMindset onNavigateSector={handleNavigateSector} />
            </ScrollReveal>

            {/* 02 — CHAPTER 02: PROJECT LAB (4 FLAGSHIP CASE FILES) */}
            <ScrollReveal delay={100}>
              <ProjectLab
                selectedProjectId={selectedProjectId}
                onSelectProject={setSelectedProjectId}
              />
            </ScrollReveal>

            {/* 03 — CHAPTER 03: INTELLIGENCE & THE TOOLKIT (DIGITAL GLOBE) */}
            <ScrollReveal delay={100}>
              <TheNetwork onOpenProject={handleOpenProject} />
            </ScrollReveal>

            {/* 04 — CHAPTER 04: EXPERIENCE (3D CONCAVE CYLINDRICAL WALL) */}
            <ScrollReveal delay={100}>
              <Experience />
            </ScrollReveal>

            {/* 05 — CHAPTER 05: THE JOURNEY SO FAR (ACADEMIC DISTINCTIONS & AEROTHON) */}
            <ScrollReveal delay={100}>
              <Journey onOpenProject={handleOpenProject} />
            </ScrollReveal>

            {/* 06 — CHAPTER 06: ALWAYS LEARNING (7 CREDLY & CISCO BADGES) */}
            <ScrollReveal delay={100}>
              <TheArchive />
            </ScrollReveal>

            {/* 07 — CHAPTER 07: CONNECT & COLLABORATE */}
            <ScrollReveal delay={100}>
              <Connect />
            </ScrollReveal>
          </div>
        )}
      </div>
    </main>
  );
}
