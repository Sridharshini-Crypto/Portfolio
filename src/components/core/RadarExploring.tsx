'use client';

import React, { useState } from 'react';
import { Compass, Shield, Cpu, Network, Wrench } from 'lucide-react';
import { exploringFocusAreas } from '@/data/profile';
import { soundFX } from '@/lib/audio';

export function RadarExploring() {
  const [activeTab, setActiveTab] = useState(exploringFocusAreas[0].id);

  const activeFocus = exploringFocusAreas.find((f) => f.id === activeTab) || exploringFocusAreas[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'cybersecurity-systems':
        return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'network-security':
        return <Network className="w-4 h-4 text-emerald-300" />;
      case 'ai-systems':
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      default:
        return <Wrench className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="w-full bg-[#0A110D] border border-emerald-500/25 rounded-2xl p-5 sm:p-6 shadow-md text-[#F4FBF7]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-emerald-500/20 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
            CURRENTLY EXPLORING
          </span>
        </div>
        <span className="text-[11px] font-mono text-emerald-400/70">
          ACTIVE RESEARCH & APPLIED ENGINEERING FOCUS
        </span>
      </div>

      {/* Focus Area Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-4">
        {exploringFocusAreas.map((area) => {
          const isActive = area.id === activeTab;
          return (
            <button
              key={area.id}
              onClick={() => {
                soundFX.playClick();
                setActiveTab(area.id);
              }}
              className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                isActive
                  ? 'bg-[#0E1813] text-white border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400/40'
                  : 'bg-[#050807] hover:bg-emerald-950/40 text-emerald-300/80 border-emerald-500/20 hover:border-emerald-500/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {getIcon(area.id)}
                <span className={`text-[10px] font-mono ${isActive ? 'text-emerald-300 font-bold' : 'text-emerald-400/60'}`}>
                  {area.domain}
                </span>
              </div>
              <div className="text-xs font-medium line-clamp-1 text-white">{area.title}</div>
            </button>
          );
        })}
      </div>

      {/* Active Focus Detail Box */}
      <div className="mt-4 p-4 rounded-xl bg-[#050807] border border-emerald-500/25 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-medium text-white">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>{activeFocus.title}</span>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
              {activeFocus.status}
            </span>
          </div>
          <p className="text-xs text-emerald-300/80 leading-relaxed font-sans">
            {activeFocus.description}
          </p>
        </div>
        <div className="shrink-0 text-left md:text-right">
          <div className="text-[10px] font-mono text-emerald-400/70 uppercase">Target Objective</div>
          <div className="text-xs font-mono text-emerald-300 max-w-xs">{activeFocus.targetObjective}</div>
        </div>
      </div>
    </div>
  );
}

export default RadarExploring;
