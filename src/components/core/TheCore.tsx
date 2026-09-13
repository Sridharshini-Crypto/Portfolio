'use client';

import React from 'react';
import { ArrowRight, FolderGit2, Network, Compass, Award, ShieldCheck } from 'lucide-react';
import { RadarExploring } from './RadarExploring';
import { soundFX } from '@/lib/audio';
import { profileData } from '@/data/profile';

interface TheCoreProps {
  onNavigateSector: (sectorId: string) => void;
}

export function TheCore({ onNavigateSector }: TheCoreProps) {
  const handleSectorClick = (sectorId: string) => {
    soundFX.playClick();
    onNavigateSector(sectorId);
  };

  return (
    <section id="core" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-16">
      {/* Sector Header Indicator */}
      <div className="flex items-center justify-between border-b border-[#DCE3EE] dark:border-[#3E070D] pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#2563EB] dark:text-[#C96A73] bg-[#EFF6FF] dark:bg-[#3E070D]/40 px-3 py-1 rounded-full border border-[#2563EB]/25 dark:border-[#6E0F1A]/40 font-semibold">
            SECTOR 01 // CENTRAL HUB
          </span>
          <h2 className="font-heading text-xl font-bold text-[#172033] dark:text-[#F4F0F1]">THE CORE</h2>
        </div>
        <span className="text-xs font-mono text-[#64748B] dark:text-[#C96A73]/70 hidden sm:block">
          STATUS: ONLINE • SYSTEM READY
        </span>
      </div>

      {/* Main Identity & Professional Intro Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Identity & Core Bio (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#64748B] dark:text-[#C96A73] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#2563EB] dark:text-[#C96A73]" />
              <span>{profileData.institution}</span>
              <span>•</span>
              <span className="text-[#2563EB] dark:text-[#C96A73] font-bold">{profileData.cgpa}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#172033] dark:text-[#F4F0F1] tracking-tight">
              {profileData.name}
            </h3>
            <p className="text-base sm:text-lg font-medium text-[#2563EB] dark:text-[#C96A73]">
              {profileData.role} — <span className="text-[#172033] dark:text-[#F4F0F1]">Cyber Security</span>
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#101010] border border-[#DCE3EE] dark:border-[#3E070D] rounded-2xl shadow-xs space-y-4">
            <div className="text-xs font-mono text-[#64748B] dark:text-[#C96A73]/70 uppercase tracking-wider">
              Professional Synopsis
            </div>
            <p className="text-sm sm:text-base text-[#172033] dark:text-[#F4F0F1] leading-relaxed font-normal">
              {profileData.bio}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-[#64748B] dark:text-[#C96A73]/80">
              <span className="px-2.5 py-1 rounded-lg bg-[#F7F8FC] dark:bg-[#1C0A10] border border-[#DCE3EE] dark:border-[#3E070D]">
                Zero-Trust Security
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#F7F8FC] dark:bg-[#1C0A10] border border-[#DCE3EE] dark:border-[#3E070D]">
                Physics-Informed ML
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#F7F8FC] dark:bg-[#1C0A10] border border-[#DCE3EE] dark:border-[#3E070D]">
                Avionics Telemetry
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#F7F8FC] dark:bg-[#1C0A10] border border-[#DCE3EE] dark:border-[#3E070D]">
                LangGraph Agents
              </span>
            </div>
          </div>
        </div>

        {/* Right: Environmental Directional Portals (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-[#64748B] dark:text-[#C96A73]/70 uppercase tracking-wider mb-2">
            EXPLORATION DESTINATIONS
          </div>

          {/* Portal 1: Project Lab */}
          <button
            onClick={() => handleSectorClick('projects')}
            className="w-full group p-4 rounded-xl bg-white dark:bg-[#101010] hover:bg-[#172033] dark:hover:bg-[#6E0F1A] border border-[#DCE3EE] dark:border-[#3E070D] hover:border-[#172033] dark:hover:border-[#6E0F1A] transition-all duration-200 shadow-xs flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] dark:bg-[#3E070D]/40 group-hover:bg-[#2563EB] dark:group-hover:bg-[#9E2F3A] flex items-center justify-center transition-colors">
                <FolderGit2 className="w-5 h-5 text-[#2563EB] dark:text-[#C96A73] group-hover:text-white" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#64748B] dark:text-[#C96A73]/70 group-hover:text-[#38BDF8] dark:group-hover:text-[#FF8DAF]">
                  02 // CASE FILES
                </div>
                <div className="text-sm font-heading font-bold text-[#172033] dark:text-[#F4F0F1] group-hover:text-white">
                  PROJECT LAB
                </div>
                <div className="text-[11px] text-[#64748B] dark:text-[#C96A73]/70 group-hover:text-gray-200">
                  4 Flagship Engineering Platforms
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>

          {/* Portal 2: The Network */}
          <button
            onClick={() => handleSectorClick('network')}
            className="w-full group p-4 rounded-xl bg-white dark:bg-[#101010] hover:bg-[#172033] dark:hover:bg-[#6E0F1A] border border-[#DCE3EE] dark:border-[#3E070D] hover:border-[#172033] dark:hover:border-[#6E0F1A] transition-all duration-200 shadow-xs flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] dark:bg-[#3E070D]/40 group-hover:bg-[#2563EB] dark:group-hover:bg-[#9E2F3A] flex items-center justify-center transition-colors">
                <Network className="w-5 h-5 text-[#2563EB] dark:text-[#C96A73] group-hover:text-white" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#64748B] dark:text-[#C96A73]/70 group-hover:text-[#38BDF8] dark:group-hover:text-[#FF8DAF]">
                  03 // DOMAIN ECOSYSTEM
                </div>
                <div className="text-sm font-heading font-bold text-[#172033] dark:text-[#F4F0F1] group-hover:text-white">
                  THE NETWORK
                </div>
                <div className="text-[11px] text-[#64748B] dark:text-[#C96A73]/70 group-hover:text-gray-200">
                  Connected Technologies & Domains
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>

          {/* Portal 3: Journey */}
          <button
            onClick={() => handleSectorClick('journey')}
            className="w-full group p-4 rounded-xl bg-white dark:bg-[#101010] hover:bg-[#172033] dark:hover:bg-[#6E0F1A] border border-[#DCE3EE] dark:border-[#3E070D] hover:border-[#172033] dark:hover:border-[#6E0F1A] transition-all duration-200 shadow-xs flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] dark:bg-[#3E070D]/40 group-hover:bg-[#2563EB] dark:group-hover:bg-[#9E2F3A] flex items-center justify-center transition-colors">
                <Compass className="w-5 h-5 text-[#2563EB] dark:text-[#C96A73] group-hover:text-white" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#64748B] dark:text-[#C96A73]/70 group-hover:text-[#38BDF8] dark:group-hover:text-[#FF8DAF]">
                  04 // TIMELINE & MILESTONES
                </div>
                <div className="text-sm font-heading font-bold text-[#172033] dark:text-[#F4F0F1] group-hover:text-white">
                  JOURNEY
                </div>
                <div className="text-[11px] text-[#64748B] dark:text-[#C96A73]/70 group-hover:text-gray-200">
                  HAL Aerothon, 97% 12th, 95% 10th
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>

          {/* Portal 4: The Archive */}
          <button
            onClick={() => handleSectorClick('archive')}
            className="w-full group p-4 rounded-xl bg-white dark:bg-[#101010] hover:bg-[#172033] dark:hover:bg-[#6E0F1A] border border-[#DCE3EE] dark:border-[#3E070D] hover:border-[#172033] dark:hover:border-[#6E0F1A] transition-all duration-200 shadow-xs flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] dark:bg-[#3E070D]/40 group-hover:bg-[#2563EB] dark:group-hover:bg-[#9E2F3A] flex items-center justify-center transition-colors">
                <Award className="w-5 h-5 text-[#2563EB] dark:text-[#C96A73] group-hover:text-white" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#64748B] dark:text-[#C96A73]/70 group-hover:text-[#38BDF8] dark:group-hover:text-[#FF8DAF]">
                  05 // CREDENTIALS & RECORDS
                </div>
                <div className="text-sm font-heading font-bold text-[#172033] dark:text-[#F4F0F1] group-hover:text-white">
                  THE ARCHIVE
                </div>
                <div className="text-[11px] text-[#64748B] dark:text-[#C96A73]/70 group-hover:text-gray-200">
                  Cisco NetAcad, Credly, Cyfrin
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>

      {/* Currently Exploring Live Radar */}
      <RadarExploring />
    </section>
  );
}
