'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Shield,
  Layers,
  Cpu,
  AlertCircle,
  Share2,
  Check,
  Maximize2,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { Project } from '@/types';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { copyToClipboard } from '@/lib/utils';
import { soundFX } from '@/lib/audio';
import { ClassifiedDossier } from '@/components/cyber/ClassifiedDossier';

interface CaseFileModalProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseFileModal({ project, onClose }: CaseFileModalProps) {
  const [copied, setCopied] = useState(false);
  const [imageExpanded, setImageExpanded] = useState(false);

  if (!project) return null;

  const handleCopyLink = () => {
    soundFX.playClick();
    const url = `${window.location.origin}/#projects?id=${project.id}`;
    copyToClipboard(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-[#0A110D] text-[#F4FBF7] border border-emerald-500/30 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.9)] overflow-y-auto flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Case File Header */}
        <div className="sticky top-0 z-20 bg-[#0A110D]/95 backdrop-blur-md border-b border-emerald-500/25 px-5 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40">
              CASE FILE // {project.number}
            </span>
            <span className="text-xs font-mono text-emerald-400/70 hidden sm:inline">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 text-xs font-mono text-emerald-300 hover:text-white bg-[#0E1813] hover:bg-emerald-950/40 transition-colors cursor-pointer"
              title="Copy Case Study Link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">COPIED</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">SHARE</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg hover:bg-emerald-950/40 text-emerald-400/80 hover:text-white border border-emerald-500/30 cursor-pointer"
              aria-label="Close Case File"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Case File Content Body */}
        <div className="p-5 sm:p-8 space-y-8">
          {/* Title & Status */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-semibold">
                {project.status}
              </span>
              <span className="text-xs font-mono text-emerald-500/70">{project.year}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-emerald-300/85 leading-relaxed font-sans">
              {project.tagline}
            </p>
          </div>

          {/* Project Screenshot / Architecture Preview */}
          {project.imagePath && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400/70">
                <span>SYSTEM ARCHITECTURE PREVIEW</span>
                <button
                  onClick={() => setImageExpanded(!imageExpanded)}
                  className="flex items-center gap-1 hover:text-white cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{imageExpanded ? 'COMPACT' : 'EXPAND'}</span>
                </button>
              </div>
              <div
                className={`relative w-full ${
                  imageExpanded ? 'h-96 sm:h-[480px]' : 'h-56 sm:h-72'
                } rounded-2xl overflow-hidden border border-emerald-500/25 bg-[#0E1813] transition-all duration-300`}
              >
                <Image
                  src={project.imagePath}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          )}

          {/* Architectural Metrics Bar */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#0E1813] border border-emerald-500/20 space-y-1"
                >
                  <div className="text-[10px] font-mono text-emerald-400/70 uppercase">{m.label}</div>
                  <div className="text-base font-heading font-bold text-white">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* System Deep-Dive Tabs (Problem, Approach) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 p-5 rounded-xl bg-[#0E1813] border border-emerald-500/20">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 font-bold uppercase">
                <AlertCircle className="w-4 h-4 text-emerald-400" />
                <span>The Problem Statement</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-300/80 leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-xl bg-[#0E1813] border border-emerald-500/20">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 font-bold uppercase">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>The Engineered Approach</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-300/80 leading-relaxed font-sans">
                {project.approach}
              </p>
            </div>
          </div>

          {/* Architecture Diagram Visualization */}
          {project.architecture && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Pipeline & Architecture Flowchart</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0E1813] border border-emerald-500/20">
                <ArchitectureDiagram
                  architecture={project.architecture}
                  projectTitle={project.title}
                />
              </div>
            </div>
          )}

          {/* Key Capabilities */}
          {project.keyCapabilities && project.keyCapabilities.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase">
                Key Engineering Capabilities
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.keyCapabilities.map((cap, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#0E1813] border border-emerald-500/20 text-xs text-emerald-200">
                    › {cap}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Modules */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-emerald-400 font-bold uppercase">
              Modular Technology Stack
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.techStack.map((group, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#0E1813] border border-emerald-500/20 space-y-2">
                  <div className="text-xs font-heading font-bold text-white">{group.category}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono text-emerald-200 bg-[#0A110D] border border-emerald-500/30 px-2 py-0.5 rounded shadow-2xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Classified Dossier Deep Dive */}
          <ClassifiedDossier
            title={`CLASSIFIED BLUEPRINT // ${project.title.toUpperCase()}`}
            classificationLevel={project.id === 'regushield' ? 'AIR-GAPPED ZERO-TRUST' : project.id === 'subaero' ? 'HAL AEROSPACE DEFENSE' : 'LEVEL-5 CYBER ENCLAVE'}
            clearanceCode={`SPEC-${project.number}-${project.year}`}
            redactedExcerpt={`Confidential ${project.domain} mathematical architecture, deterministic boundary conditions, and real-time inference telemetry protocols...`}
            revealedContent={
              <div className="space-y-3">
                <div className="text-emerald-300 font-bold">
                  [+] VERIFIED TECHNICAL DIRECTIVES &amp; CONSTRAINTS:
                </div>
                <p>
                  • <b>Zero-Trust Isolation:</b> Enforces strict process isolation ensuring zero unauthorized data egress or side-channel leakage.
                </p>
                <p>
                  • <b>Mathematical Determinism:</b> Evaluates all input states against formal invariant equations before passing telemetry to inference layers.
                </p>
                <p>
                  • <b>Telemetry Fault Resilience:</b> Continuous automated self-test routine verifying signal integrity within sub-5ms latency envelopes.
                </p>
              </div>
            }
          />

          {/* Verification & Links Footer */}
          <div className="pt-6 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/80">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Chennai Institute of Technology • High-Assurance Architecture</span>
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#047857] to-[#10B981] hover:brightness-110 text-white font-mono text-xs font-semibold shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-colors cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>VIEW REPOSITORY</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseFileModal;
