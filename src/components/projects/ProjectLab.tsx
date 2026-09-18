'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { projectsData } from '@/data/projects';
import { CaseFileModal } from './CaseFileModal';
import { soundFX } from '@/lib/audio';
import { Project } from '@/types';

import { ScrambleText } from '@/components/cyber/ScrambleText';

interface ProjectLabProps {
  selectedProjectId: string | null;
  onSelectProject: (projectId: string | null) => void;
}

export function ProjectLab({ selectedProjectId, onSelectProject }: ProjectLabProps) {
  const [filter, setFilter] = useState<'all' | 'ai' | 'security' | 'fintech'>('all');
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const handleOpenModal = (project: Project) => {
    soundFX.playClick();
    setModalProject(project);
  };

  const handleCloseModal = () => {
    setModalProject(null);
    onSelectProject(null);
  };

  const filteredProjects = projectsData.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'ai') return p.domain.toLowerCase().includes('ai') || p.domain.toLowerCase().includes('twin');
    if (filter === 'security') return p.domain.toLowerCase().includes('security') || p.domain.toLowerCase().includes('trust') || p.domain.toLowerCase().includes('fusion');
    if (filter === 'fintech') return p.domain.toLowerCase().includes('fintech') || p.domain.toLowerCase().includes('lending');
    return true;
  });

  return (
    <section id="projects" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-12 text-[#F4FBF7]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-emerald-500/25 pb-6 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-emerald-300 bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-500/40 font-semibold tracking-wider">
              CHAPTER 02 // PROJECT LAB
            </span>
            <span className="text-xs font-mono text-emerald-400/70">
              4 FLAGSHIP INVENTIONS &amp; CASE FILES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            <ScrambleText text="PROJECT LAB" triggerOnHover={true} />
          </h2>
          <p className="text-sm sm:text-base text-emerald-300/85 max-w-2xl leading-relaxed">
            Deep technical case studies with architecture flowcharts, mathematical models, telemetry integration, and full reproducibility documentation.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0A110D] border border-emerald-500/30 rounded-xl shadow-xs">
          {[
            { id: 'all', label: 'ALL (4)' },
            { id: 'ai', label: 'AI & TWINS' },
            { id: 'security', label: 'SECURITY' },
            { id: 'fintech', label: 'FINTECH' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playClick();
                setFilter(tab.id as typeof filter);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-[#047857] to-[#10B981] text-white shadow-xs font-semibold'
                  : 'text-emerald-400/70 hover:text-white hover:bg-emerald-950/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Flagship Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative bg-[#0A110D] border border-emerald-500/25 rounded-2xl overflow-hidden hover:border-emerald-400 hover:shadow-[0_4px_30px_rgba(16,185,129,0.25)] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Project Preview Image */}
            <div className="relative w-full h-48 sm:h-56 bg-[#0E1813] overflow-hidden border-b border-emerald-500/20">
              {project.imagePath ? (
                <Image
                  src={project.imagePath}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-mono text-emerald-400/50">
                  [ SYSTEM PREVIEW ]
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#050807]/90 text-white backdrop-blur-md border border-white/20">
                  {project.number} // {project.year}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-600 text-white shadow-xs font-medium">
                  {project.status}
                </span>
              </div>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFX.playClick();
                  }}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#0A110D]/90 text-white hover:text-emerald-300 shadow-xs transition-colors backdrop-blur-xs cursor-pointer border border-emerald-500/30"
                  title="View GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                  {project.domain}
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  <ScrambleText text={project.title} triggerOnHover={true} />
                </h3>
                <p className="text-xs sm:text-sm text-emerald-300/80 leading-relaxed line-clamp-3">
                  {project.tagline}
                </p>
              </div>

              {/* 4 Architectural Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-500/20">
                  {project.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-[#0E1813] border border-emerald-500/20">
                      <div className="text-[10px] font-mono text-emerald-400/60 uppercase">{m.label}</div>
                      <div className="text-xs font-heading font-bold text-white truncate">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack Pills & Modal Action Trigger */}
              <div className="pt-3 border-t border-emerald-500/20 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {project.techStack[0]?.items.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-emerald-200 bg-[#0E1813] border border-emerald-500/30 px-2 py-0.5 rounded shadow-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleOpenModal(project)}
                  className="flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-white font-semibold group-hover:translate-x-0.5 transition-transform cursor-pointer shrink-0"
                >
                  <span>CASE FILE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deep Case File Modal */}
      {modalProject && (
        <CaseFileModal
          project={modalProject}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}

export default ProjectLab;
