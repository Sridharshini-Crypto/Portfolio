'use client';

import React from 'react';
import { ArrowRight, Server, Database, Cpu, ShieldCheck, Monitor } from 'lucide-react';
import { ProjectArchitecture } from '@/types';

interface ArchitectureDiagramProps {
  architecture: ProjectArchitecture;
  projectTitle?: string;
}

export function ArchitectureDiagram({ architecture, projectTitle = 'SYSTEM' }: ArchitectureDiagramProps) {
  const getNodeIcon = (index: number) => {
    switch (index % 5) {
      case 0:
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 1:
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 2:
        return <Cpu className="w-4 h-4 text-emerald-300" />;
      case 3:
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      default:
        return <Monitor className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-[#0A110D] border border-emerald-500/25 rounded-xl p-5 space-y-6">
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold uppercase text-white">
            SYSTEM TOPOLOGY & DATA PIPELINE
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400/70">
          {projectTitle.toUpperCase()} // ARCH.V2
        </span>
      </div>

      <p className="text-xs text-emerald-300/80 leading-relaxed">
        {architecture.summary}
      </p>

      {/* Interactive Node Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {architecture.nodes.map((node, i) => (
          <div
            key={node.id}
            className="p-3.5 bg-[#0E1813] border border-emerald-500/25 rounded-lg shadow-2xs space-y-2 relative group hover:border-emerald-400/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400/60">0{i + 1}</span>
              {getNodeIcon(i)}
            </div>
            <div>
              <div className="text-xs font-heading font-bold text-white">{node.label}</div>
              <div className="text-[11px] text-emerald-300/75 mt-0.5 line-clamp-2">{node.role}</div>
            </div>
            <div className="pt-1.5 border-t border-emerald-500/20">
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                {node.tech}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sequential Execution Pipeline */}
      <div className="space-y-2 pt-2">
        <div className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-wider">
          SEQUENTIAL EXECUTION PIPELINE
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {architecture.flow.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-1.5 bg-[#0E1813] border border-emerald-500/30 px-2.5 py-1.5 rounded text-[11px] font-mono text-emerald-200 shadow-2xs">
                <span className="text-emerald-400 font-bold">[{idx + 1}]</span>
                <span>{step}</span>
              </div>
              {idx < architecture.flow.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400 hidden sm:inline" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArchitectureDiagram;
