'use client';

import React from 'react';
import { networkDomains } from '@/data/network';
import { projectsData } from '@/data/projects';
import { Shield, Network, Cpu, Code2, BrainCircuit, ArrowRight, FolderGit2 } from 'lucide-react';
import { soundFX } from '@/lib/audio';

interface NetworkCanvasProps {
  selectedDomainId: string;
  onSelectDomain: (domainId: string) => void;
  onOpenProject?: (projectId: string) => void;
}

export function NetworkCanvas({
  selectedDomainId,
  onSelectDomain,
  onOpenProject,
}: NetworkCanvasProps) {
  const currentDomain =
    networkDomains.find((d) => d.id === selectedDomainId) || networkDomains[0];

  const getDomainIcon = (id: string) => {
    switch (id) {
      case 'cybersecurity':
        return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'networking':
        return <Network className="w-5 h-5 text-emerald-400" />;
      case 'ai':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'software-dev':
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <BrainCircuit className="w-5 h-5 text-emerald-400" />;
    }
  };

  const connectedProjects = projectsData.filter((p) =>
    currentDomain.connectedProjectIds.includes(p.id)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0A110D] border border-emerald-500/25 rounded-2xl p-5 sm:p-8 shadow-xs">
      {/* Left: Domain Nodes Selector (5 Cols) */}
      <div className="lg:col-span-5 space-y-3">
        <div className="text-xs font-mono text-emerald-400/70 uppercase tracking-wider mb-2">
          CENTRAL TECHNICAL DOMAINS
        </div>

        <div className="space-y-2">
          {networkDomains.map((domain) => {
            const isSelected = domain.id === selectedDomainId;
            return (
              <button
                key={domain.id}
                onClick={() => {
                  soundFX.playNetworkPulse();
                  onSelectDomain(domain.id);
                }}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#047857] to-[#10B981] text-white border-emerald-400/40 shadow-[0_0_14px_rgba(16,185,129,0.3)]'
                    : 'bg-[#0E1813] hover:bg-emerald-950/40 text-emerald-200 border-emerald-500/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-300/40'
                        : 'bg-[#0A110D] text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {getDomainIcon(domain.id)}
                  </div>
                  <div>
                    <div className="text-xs font-heading font-bold">{domain.name}</div>
                    <div
                      className={`text-[10px] font-mono ${
                        isSelected ? 'text-emerald-100' : 'text-emerald-400/70'
                      }`}
                    >
                      {domain.technologies.length} Core Technologies
                    </div>
                  </div>
                </div>

                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected
                      ? 'bg-white animate-ping'
                      : 'bg-emerald-500/40'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Active Domain Breakdown & Linked Platforms (7 Cols) */}
      <div className="lg:col-span-7 bg-[#0E1813] border border-emerald-500/20 rounded-xl p-5 sm:p-6 space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              DOMAIN TOPOLOGY // ACTIVE PROFILE
            </span>
            <span className="text-[10px] font-mono text-emerald-400/60">
              CROSS-DISCIPLINARY
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-heading font-extrabold text-white">
              {currentDomain.name}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-300/80 leading-relaxed">
              {currentDomain.description}
            </p>
          </div>

          {/* Connected Tech Tags */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-wider">
              APPLIED TECHNOLOGIES & PROTOCOLS
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentDomain.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#0A110D] border border-emerald-500/30 text-emerald-200 shadow-2xs"
                >
                  {typeof tech === 'string' ? tech : tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Linked Flagship Systems */}
        <div className="space-y-2 pt-4 border-t border-emerald-500/20">
          <div className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-wider">
            CONNECTED ENGINEERING PLATFORMS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {connectedProjects.map((proj) => (
              <div
                key={proj.id}
                className="p-3 rounded-lg bg-[#0A110D] border border-emerald-500/20 flex items-center justify-between group hover:border-emerald-400/40 transition-colors"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <FolderGit2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-xs font-heading font-medium text-white truncate">
                    {proj.title}
                  </span>
                </div>

                {onOpenProject && (
                  <button
                    onClick={() => {
                      soundFX.playClick();
                      onOpenProject(proj.id);
                    }}
                    className="text-[10px] font-mono text-emerald-400 hover:text-white flex items-center gap-0.5 cursor-pointer shrink-0"
                  >
                    <span>EXPLORE</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NetworkCanvas;
