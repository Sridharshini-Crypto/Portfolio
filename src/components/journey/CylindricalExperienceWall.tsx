'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  GraduationCap,
  Briefcase,
  Trophy,
  Users,
  Flag,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MoveHorizontal,
  Compass,
  Award,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { journeyMilestones } from '@/data/journey';
import { JourneyMilestone } from '@/types';
import { soundFX } from '@/lib/audio';

export function CylindricalExperienceWall() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0); // Current smooth rotation in degrees
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [filter, setFilter] = useState<'all' | 'experience' | 'education' | 'milestones'>('all');

  const animationFrameRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const items = journeyMilestones.filter((m) => {
    if (filter === 'all') return true;
    if (filter === 'education') return m.category === 'education';
    if (filter === 'milestones') return m.category === 'achievement' || m.category === 'competition';
    if (filter === 'experience') return m.category === 'experience' || m.category === 'leadership';
    return true;
  });

  const totalItems = items.length;
  // Angular step per cylindrical panel
  const ANGLE_STEP = 34; // degrees per card along the cylinder
  // Cylinder radius (concave depth)
  const CYLINDER_RADIUS = 760; // px

  // Snap to a specific index
  const snapToIndex = useCallback((index: number, playSound = true) => {
    const clampedIndex = Math.max(0, Math.min(totalItems - 1, index));
    setCurrentIndex(clampedIndex);
    if (playSound) soundFX.playHoverTick();

    const targetRot = -clampedIndex * ANGLE_STEP;
    
    // Smooth animate rotation to target
    const startRot = rotation;
    const startTime = performance.now();
    const duration = 400; // ms

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setRotation(startRot + (targetRot - startRot) * ease);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [totalItems, rotation, ANGLE_STEP]);

  // Handle Drag Start
  const handleDragStart = (clientX: number) => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    setIsDragging(true);
    setStartX(clientX);
    setStartRotation(rotation);
    lastXRef.current = clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  // Handle Drag Move
  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;

    const dx = clientX - startX;
    // Rotation sensitivity: 1px drag = 0.16 deg rotation
    const newRot = startRotation + dx * 0.16;
    setRotation(newRot);

    // Compute instantaneous velocity
    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 10) {
      velocityRef.current = (clientX - lastXRef.current) / dt;
      lastXRef.current = clientX;
      lastTimeRef.current = now;
    }
  };

  // Handle Drag End with Inertia & Snapping
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Calculate inertia offset
    const projectedRot = rotation + velocityRef.current * 40;
    // Find closest index
    const closestIndex = Math.round(-projectedRot / ANGLE_STEP);
    const clampedIndex = Math.max(0, Math.min(totalItems - 1, closestIndex));

    snapToIndex(clampedIndex, true);
  };

  // Mouse Handlers
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  // Touch Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleDragStart(e.touches[0].clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        snapToIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        snapToIndex(currentIndex + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, snapToIndex]);

  const getMilestoneIcon = (category: JourneyMilestone['category']) => {
    switch (category) {
      case 'education':
        return <GraduationCap className="w-5 h-5 text-emerald-400" />;
      case 'experience':
        return <Briefcase className="w-5 h-5 text-emerald-400" />;
      case 'achievement':
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'competition':
        return <Flag className="w-5 h-5 text-emerald-400" />;
      case 'leadership':
        return <Users className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="relative w-full space-y-8 select-none">
      
      {/* ── TOP CONTROLS & FILTER BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
        {/* Interaction Telemetry Label */}
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
          <Compass className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '16s' }} />
          <span>3D CONCAVE CYLINDRICAL WALL // DRAG TO ROTATE</span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0A110D] border border-emerald-500/30 rounded-xl overflow-x-auto">
          {[
            { id: 'all', label: 'ALL EXPERIENCES' },
            { id: 'experience', label: 'INDUSTRY & LEADERSHIP' },
            { id: 'education', label: 'ACADEMICS' },
            { id: 'milestones', label: 'AWARDS & CTF' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playClick();
                setFilter(tab.id as typeof filter);
                setCurrentIndex(0);
                setRotation(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-[#047857] to-[#10B981] text-white shadow-xs font-bold'
                  : 'text-emerald-400/80 hover:text-white hover:bg-emerald-950/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── 3D CONCAVE CYLINDRICAL VIEWPORT ── */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={`relative w-full h-[540px] sm:h-[580px] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing transition-all ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
        style={{
          perspective: '1300px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Ambient Top & Bottom Scanline Vignettes */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050807] via-[#050807]/80 to-transparent pointer-events-none z-30" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050807] via-[#050807]/80 to-transparent pointer-events-none z-30" />

        {/* ── THE 3D ROTATING CYLINDRICAL SURFACE ── */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.05s linear',
          }}
        >
          {items.map((item, idx) => {
            const itemAngle = idx * ANGLE_STEP;
            const diffAngle = ((itemAngle + rotation) % 360 + 540) % 360 - 180;
            const isCenter = Math.abs(diffAngle) < ANGLE_STEP / 2;
            const isNear = Math.abs(diffAngle) < ANGLE_STEP * 2.2;

            // Only render items within visible angular field
            if (!isNear) return null;

            // Opacity & scale falloff with curvature
            const opacity = Math.max(0.2, 1 - Math.abs(diffAngle) / (ANGLE_STEP * 2.5));
            const scale = Math.max(0.85, 1 - (Math.abs(diffAngle) / 100) * 0.15);

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isDragging && !isCenter) {
                    snapToIndex(idx);
                  }
                }}
                className={`absolute w-[310px] sm:w-[420px] md:w-[480px] min-h-[380px] sm:min-h-[420px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 pointer-events-auto ${
                  isCenter
                    ? 'bg-[#0A110D]/98 border-2 border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.4)] z-20'
                    : 'bg-[#0A110D]/85 border border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_4px_24px_rgba(0,0,0,0.8)] z-10 cursor-pointer'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  // Map onto 3D concave cylinder facing user (translateZ into screen, rotated around Y axis)
                  transform: `rotateY(${itemAngle}deg) translateZ(${CYLINDER_RADIUS}px) scale(${scale})`,
                  opacity,
                  filter: isCenter ? 'none' : 'blur(0.5px) brightness(0.75)',
                }}
              >
                {/* Holographic Cyber Corner HUD Brackets */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-400 pointer-events-none" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-400 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-400 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-400 pointer-events-none" />

                {/* Card Header: Category Badge & Period */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                        {getMilestoneIcon(item.category)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                          {item.categoryLabel || item.category}
                        </span>
                        <div className="text-xs font-mono text-emerald-500/80">{item.period}</div>
                      </div>
                    </div>

                    {item.metric && (
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-gradient-to-r from-[#047857] to-[#10B981] text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                        {item.metric.value}
                      </span>
                    )}
                  </div>

                  {/* Hero Title */}
                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white leading-tight">
                    {item.title}
                  </h3>

                  {/* Organization & Location */}
                  <div className="text-xs font-mono text-emerald-300 font-semibold flex items-center gap-1.5">
                    <span>{item.organization}</span>
                    {item.location && <span className="text-emerald-500/70">• {item.location}</span>}
                  </div>
                </div>

                {/* Narrative Description */}
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans font-light py-2">
                  {item.description}
                </p>

                {/* Highlights / Skills Gained */}
                {item.skillsGained && item.skillsGained.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-emerald-500/20">
                    <div className="text-[10px] font-mono text-emerald-400/80 uppercase tracking-wider">
                      Verified Capabilities:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.skillsGained.map((skill, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono text-emerald-200 bg-[#050807] border border-emerald-500/35 px-2.5 py-0.5 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Left Navigation Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            snapToIndex(currentIndex - 1);
          }}
          disabled={currentIndex === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0A110D]/90 border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-950/80 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer z-40 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          aria-label="Previous Experience"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Navigation Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            snapToIndex(currentIndex + 1);
          }}
          disabled={currentIndex === totalItems - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0A110D]/90 border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-950/80 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer z-40 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          aria-label="Next Experience"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* ── BOTTOM DRAG INDICATOR & CYLINDER INDEX TICKER ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 pt-2 font-mono text-xs text-emerald-400/80">
        <div className="flex items-center gap-2">
          <MoveHorizontal className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>DRAG / SWIPE LEFT-RIGHT TO ROTATE CONCAVE DIGITAL WALL</span>
        </div>

        {/* Interactive Step Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => snapToIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-7 bg-gradient-to-r from-[#047857] to-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.8)]'
                  : 'w-2 bg-emerald-950 border border-emerald-500/40 hover:bg-emerald-800'
              }`}
              title={`Jump to experience ${idx + 1}`}
            />
          ))}
          <span className="ml-2 text-white font-bold">
            {currentIndex + 1} / {totalItems}
          </span>
        </div>
      </div>

    </div>
  );
}

export default CylindricalExperienceWall;

