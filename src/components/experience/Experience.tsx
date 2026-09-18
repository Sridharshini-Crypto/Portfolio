'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { soundFX } from '@/lib/audio';
import { ScrambleText } from '@/components/cyber/ScrambleText';

interface ProfessionalExperience {
  id: string;
  number: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  badge: string;
  highlights: string[];
  technologies: string[];
}

const professionalExperiences: ProfessionalExperience[] = [
  {
    id: 'baeonn-internship',
    number: '01',
    role: 'Full Stack Developer Intern',
    organization: 'BAEONN',
    location: 'Singapore (Virtual)',
    period: '2026',
    badge: 'INDUSTRY INTERNSHIP',
    highlights: [
      'Engineered modular React.js UI components and high-concurrency client workflows.',
      'Optimized RESTful API state hydration with payload compression and error handling.',
    ],
    technologies: ['React.js', 'Node.js', 'Express', 'REST APIs', 'Agile'],
  },
  {
    id: 'club-asymmetric',
    number: '02',
    role: 'Secretary & Documentation Lead',
    organization: 'Club Asymmetric',
    location: 'Chennai Institute of Technology (CIT)',
    period: '2025 — Present',
    badge: 'TECHNICAL LEADERSHIP',
    highlights: [
      'Governing technical documentation and system blueprints for premier club web platforms.',
      'Mentoring junior developers on Git workflows, type-safe development, and open source.',
    ],
    technologies: ['Technical Leadership', 'Documentation', 'Git CI/CD', 'Team Governance'],
  },
  {
    id: 'workshops-events',
    number: '03',
    role: 'Workshop Instructor & Technical Event Organizer',
    organization: 'Institutional Technical Symposia',
    location: 'Chennai Institute of Technology (CIT)',
    period: '2025 — Present',
    badge: 'TECHNICAL MENTORSHIP',
    highlights: [
      'Delivered hands-on Blockchain & smart contract workshops for 200+ students.',
      'Orchestrated multi-track competitive hackathons and automated evaluation rubrics.',
    ],
    technologies: ['Blockchain', 'Smart Contracts', 'Instruction', 'Event Operations'],
  },
];

export function Experience() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const activeExp = professionalExperiences[activeRoleIndex];

  return (
    <section id="experience" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-10 text-[#F4FBF7]">
      <div className="space-y-4 border-b border-emerald-500/25 pb-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-300 bg-emerald-950/70 px-3.5 py-1 rounded-full border border-emerald-500/40 font-semibold tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>04 // EXPERIENCE</span>
          </span>
          <span className="text-xs font-mono text-emerald-400/80 hidden sm:inline">
            INDUSTRY INTERNSHIPS • CIT TECHNICAL LEADERSHIP
          </span>
        </div>
        <div className="space-y-1.5">
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            <ScrambleText text="EXPERIENCE & LEADERSHIP" triggerOnHover={true} />
          </h2>
          <p className="text-sm sm:text-base text-emerald-300/80 max-w-2xl leading-relaxed font-sans font-light">
            Production software engineering, technical leadership at CIT, and hands-on systems instruction.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {professionalExperiences.map((exp, idx) => {
          const isActive = idx === activeRoleIndex;
          return (
            <button
              key={exp.id}
              onClick={() => {
                soundFX.playClick();
                setActiveRoleIndex(idx);
              }}
              className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${
                isActive
                  ? 'bg-[#0E1813] border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/40'
                  : 'bg-[#0A110D] border-emerald-500/20 hover:border-emerald-500/50 hover:bg-[#0C140F]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                  isActive
                    ? 'bg-emerald-900/60 border-emerald-400 text-emerald-200'
                    : 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400/70'
                }`}>
                  {exp.badge}
                </span>
                <span className="text-xs font-mono text-emerald-400/60">{exp.number}</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base sm:text-lg leading-snug">
                  <ScrambleText text={exp.role} triggerOnHover={true} />
                </h3>
                <div className="text-xs font-mono text-emerald-400 font-medium mt-1">{exp.organization}</div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400/70 pt-2 border-t border-emerald-500/15">
                <span>{exp.period}</span>
                <span className="text-emerald-300 flex items-center gap-1">
                  <span>{isActive ? 'ACTIVE' : 'INSPECT'}</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#0A110D] border border-emerald-500/35 space-y-6 shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-500/20 pb-4 gap-3">
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>ROLE PROFILE // {activeExp.number}</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white leading-tight">
              <ScrambleText text={activeExp.role} triggerOnHover={true} />
            </h3>
            <div className="text-xs sm:text-sm font-mono text-emerald-300 font-medium flex items-center gap-2">
              <span>{activeExp.organization}</span>
              <span className="text-emerald-600">•</span>
              <span className="text-emerald-400/80">{activeExp.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-500/40">
              {activeExp.period}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">KEY DELIVERABLES & IMPACT:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeExp.highlights.map((highlight, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#050807] border border-emerald-500/25 flex items-start gap-3 hover:border-emerald-400/60 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed font-sans">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-500/20">
          <span className="text-[10px] font-mono text-emerald-400/70 uppercase">TECH STACK:</span>
          {activeExp.technologies.map((tech, idx) => (
            <span key={idx} className="text-xs font-mono text-emerald-300 bg-[#050807] border border-emerald-500/30 px-2.5 py-1 rounded-lg">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
