'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ChevronRight, ChevronDown } from 'lucide-react';
import { soundFX } from '@/lib/audio';
import { ScrambleText } from '@/components/cyber/ScrambleText';

interface JourneyProps {
  onOpenProject?: (projectId: string) => void;
}

interface JourneyPanel {
  id: string;
  number: string;
  verticalLabel: string;
  badge: string;
  title: string;
  organization: string;
  metric: string;
  period: string;
  description: string;
  highlights: string[];
  capabilities: string[];
  projectId?: string;
}

const journeyPanels: JourneyPanel[] = [
  {
    id: 'cit-cyber-security',
    number: '01',
    verticalLabel: 'ACADEMIC // 01',
    badge: 'VERIFIED // 2026',
    title: 'B.E. COMPUTER SCIENCE & CYBER SECURITY',
    organization: 'CHENNAI INSTITUTE OF TECHNOLOGY (CIT)',
    metric: '9.07 CGPA • DISTINCTION',
    period: '2023 — Present',
    description: 'Undergraduate engineering in zero-trust cybersecurity, cryptography, and applied artificial intelligence.',
    highlights: [
      'Top distinction tier with 9.07 CGPA at CIT',
      'Secretary & Documentation Lead at Club Asymmetric',
    ],
    capabilities: ['Zero-Trust Security', 'Network Protocols', 'Applied AI/ML', 'Cryptography'],
  },
  {
    id: 'hal-aerothon',
    number: '02',
    verticalLabel: 'AEROSPACE // 02',
    badge: 'FINALIST // 2026',
    title: 'HAL × IIT INDORE AEROTHON FINALIST',
    organization: 'HINDUSTAN AERONAUTICS LIMITED & IIT INDORE',
    metric: 'TOP 25 / 2,300+ TEAMS',
    period: '2026',
    description: 'Built SubAero physics-informed digital twin for four-stage turbojets fusing Brayton thermodynamics with PyTorch.',
    highlights: [
      'Top 25 Finalist nationwide among 2,300+ teams',
      'Real-time telemetry HUD delivered to HAL scientists & IIT faculty',
    ],
    capabilities: ['Physics-Informed ML', 'Digital Twins', 'Brayton Cycle', 'Avionics Telemetry'],
    projectId: 'subaero',
  },
  {
    id: 'smart-horizon-hackathon',
    number: '03',
    verticalLabel: 'HACKATHON // 03',
    badge: 'FINALIST // 2026',
    title: 'SMART HORIZON HACKATHON GRAND FINALE FINALIST',
    organization: 'NEW HORIZON COLLEGE OF ENGINEERING, BANGALORE',
    metric: 'GRAND FINALE • 570+ STUDENTS',
    period: '2026',
    description: 'Selected as Grand Finale Finalist at Smart Horizon Hackathon, engineering high-assurance rapid software systems under timed competition.',
    highlights: [
      'Grand Finale Finalist selected from 570+ competing students across institutions',
      'Architected full-stack real-time prototype under timed hackathon constraints',
    ],
    capabilities: ['Rapid Prototyping', 'Hackathon Finalist', 'Team Leadership', 'Full-Stack Delivery'],
  },
  {
    id: 'baeonn-internship',
    number: '04',
    verticalLabel: 'INDUSTRY // 04',
    badge: 'INTERNSHIP // 2026',
    title: 'FULL STACK DEVELOPER INTERN',
    organization: 'BAEONN SINGAPORE (VIRTUAL)',
    metric: 'PRODUCTION PLATFORMS',
    period: '2026',
    description: 'Engineered production full-stack web applications, modular React UI components, and RESTful APIs.',
    highlights: [
      'Modular, high-performance UI components in React.js & TypeScript',
      'Collaborated in an international agile engineering team',
    ],
    capabilities: ['React.js', 'Node.js', 'REST APIs', 'Full-Stack', 'Agile Delivery'],
  },
  {
    id: 'club-asymmetric',
    number: '05',
    verticalLabel: 'LEADERSHIP // 05',
    badge: 'LEADERSHIP // 2026',
    title: 'SECRETARY & DOCUMENTATION LEAD',
    organization: 'CLUB ASYMMETRIC • CIT',
    metric: 'TECHNICAL GOVERNANCE',
    period: '2025 — Present',
    description: 'Directing core technical initiatives, hackathons, technical writing, and developer infrastructure.',
    highlights: [
      'Governing technical documentation & architecture blueprints for club platforms',
      'Mentoring junior developers on Git workflows, type safety, and open source',
    ],
    capabilities: ['Technical Leadership', 'Documentation', 'Git CI/CD', 'Team Governance'],
  },
  {
    id: 'cyber-ctf',
    number: '06',
    verticalLabel: 'DEFENSE // 06',
    badge: 'CTF ARENA // ACTIVE',
    title: 'CAPTURE THE FLAG & CYBER DEFENSE',
    organization: 'CYBERSECURITY ARENA & NATIONAL CTFS',
    metric: 'THREAT MITIGATION',
    period: '2025 — Present',
    description: 'Active CTF security challenges, network packet dissection, vulnerability analysis, and MITRE ATT&CK mapping.',
    highlights: [
      'Deep packet stream dissection with Wireshark and cipher analysis',
      'MITRE ATT&CK matrix adversary defense mapping',
    ],
    capabilities: ['Wireshark Forensics', 'MITRE ATT&CK', 'Vulnerability Assessment', 'Packet Dissection'],
    projectId: 'sentinelx',
  },
  {
    id: 'scholastic-foundations',
    number: '07',
    verticalLabel: 'FOUNDATION // 07',
    badge: 'SCHOLASTIC // 97% HSC',
    title: 'SCHOOL 1ST RANK & DISTRICT CHESS',
    organization: 'SCHOOL 1ST RANK (97% HSC / 95% SSLC) & DISTRICT CHESS',
    metric: '97% HSC • 95% SSLC',
    period: 'Foundational',
    description: 'Mathematical rigor, strategic foresight, and multi-move analytical calculation through competitive chess.',
    highlights: [
      'School 1st Rank with 97% in Class XII (HSC) & 95% in Class X (SSLC)',
      'District-level chess player applying positional calculation to threat modeling',
    ],
    capabilities: ['Strategic Foresight', 'Mathematics', 'Positional Analysis', 'Rigor'],
  },
];

export function Journey({ onOpenProject }: JourneyProps) {
  const [activePanelIndex, setActivePanelIndex] = useState(0);

  const handlePanelHover = (index: number) => {
    if (index !== activePanelIndex) {
      soundFX.playHoverTick();
      setActivePanelIndex(index);
    }
  };

  return (
    <section id="journey" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-10 text-[#F4FBF7]">
      <div className="space-y-6 border-b border-emerald-500/25 pb-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-300 bg-emerald-950/70 px-3.5 py-1 rounded-full border border-emerald-500/40 font-semibold tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>05 // THE JOURNEY SO FAR</span>
          </span>
          <span className="text-xs font-mono text-emerald-400/80 hidden sm:inline">
            MILESTONE ARCHIVE • HOVER OR TAP TO EXPAND
          </span>
        </div>

        <div className="space-y-1.5">
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
            <ScrambleText text="THE JOURNEY SO FAR" triggerOnHover={true} />
          </h2>
          <p className="text-sm sm:text-base text-emerald-300/80 max-w-2xl leading-relaxed font-sans font-light">
            Scholastic mathematical distinctions, national aerospace defense finals, and cybersecurity operations.
          </p>
        </div>

        {/* ── TOP SECTION: LEFT SIDE CYBER GREEN PHOTO | RIGHT SIDE 4 STAT BOXES ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
          
          {/* Left Side: Clean Cyber Green Workspace Photo Card */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border-2 border-emerald-500/45 bg-[#08120B] shadow-[0_12px_45px_rgba(16,185,129,0.3)] group">
            {/* Viewfinder Corner Accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-400 pointer-events-none z-20" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-400 pointer-events-none z-20" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-400 pointer-events-none z-20" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-400 pointer-events-none z-20" />

            {/* Subtle Tech Grid overlay */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none z-15"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(16, 185, 129, 0.4) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Photo Image with Cyber Green Vibe */}
            <div className="relative w-full h-60 sm:h-72 md:h-80 overflow-hidden">
              <img
                src="/sridharshini_journey_workspace.jpg"
                alt="Sridharshini S"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.5))',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050807]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Side: 2x2 Grid of the 4 Key Distinction Boxes */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0A110D] border border-emerald-500/30 text-center space-y-1 shadow-xs hover:border-emerald-400/60 transition-colors flex flex-col justify-center">
              <div className="text-xs font-mono text-emerald-400/80">COLLEGE CGPA</div>
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-white">9.07</div>
              <div className="text-xs font-mono text-emerald-400 font-medium">CIT Cyber Security</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0A110D] border border-emerald-500/30 text-center space-y-1 shadow-xs hover:border-emerald-400/60 transition-colors flex flex-col justify-center">
              <div className="text-xs font-mono text-emerald-400/80">CLASS XII (HSC)</div>
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-white">97%</div>
              <div className="text-xs font-mono text-emerald-400 font-medium">School 1st Rank</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0A110D] border border-emerald-500/30 text-center space-y-1 shadow-xs hover:border-emerald-400/60 transition-colors flex flex-col justify-center">
              <div className="text-xs font-mono text-emerald-400/80">CLASS X (SSLC)</div>
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-white">95%</div>
              <div className="text-xs font-mono text-emerald-400 font-medium">School 1st Rank</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0A110D] border border-emerald-500/30 text-center space-y-1 shadow-xs hover:border-emerald-400/60 transition-colors flex flex-col justify-center">
              <div className="text-xs font-mono text-emerald-400/80">HAL AEROTHON 2026</div>
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-emerald-300">TOP 25</div>
              <div className="text-xs font-mono text-emerald-400 font-medium">2,300+ Teams</div>
            </div>
          </div>

        </div>
      </div>

      {/* ── MILESTONE ACCORDION CARDS ── */}
      <div className="space-y-3">
        <div className="hidden md:flex w-full min-h-[520px] lg:min-h-[560px] rounded-3xl overflow-hidden border border-emerald-500/35 bg-[#050807] shadow-[0_0_50px_rgba(0,0,0,0.9)] transition-all">
          {journeyPanels.map((panel, idx) => {
            const isExpanded = idx === activePanelIndex;
            if (!isExpanded) {
              return (
                <div
                  key={panel.id}
                  onMouseEnter={() => handlePanelHover(idx)}
                  onClick={() => handlePanelHover(idx)}
                  className="flex-[0.5] hover:flex-[0.8] transition-all duration-500 ease-out cursor-pointer relative flex flex-col justify-between items-center py-8 border-r border-emerald-500/20 bg-[#070D09]/95 hover:bg-[#0A160F] group select-none"
                  title={`Expand ${panel.title}`}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all" />
                  <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-xs font-bold tracking-widest text-emerald-400/60 group-hover:text-emerald-300 uppercase whitespace-nowrap transition-colors flex items-center gap-3">
                    <span>{panel.verticalLabel}</span>
                  </div>
                  <div className="font-mono text-xs font-bold text-emerald-500/40 group-hover:text-emerald-300 transition-colors">
                    {panel.number}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={panel.id}
                className="flex-[5.5] transition-all duration-500 ease-out relative p-8 lg:p-10 flex flex-col justify-between bg-[#08100B] border-r border-emerald-500/40 shadow-[inset_0_0_50px_rgba(16,185,129,0.06)] overflow-hidden animate-fade-in"
              >
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(16, 185, 129, 0.45) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <div className="absolute top-8 right-8 flex items-center gap-2 pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,1)]" />
                </div>
                <div className="absolute bottom-2 right-4 text-9xl lg:text-[13rem] font-heading font-black text-emerald-500/[0.05] select-none pointer-events-none leading-none tracking-tighter">
                  {panel.number}
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-emerald-300 bg-emerald-950/90 px-3 py-1 rounded-md border border-emerald-500/40 font-semibold tracking-wider uppercase shadow-sm">
                      {panel.badge}
                    </span>
                    <span className="text-xs font-mono text-emerald-400/70">{panel.period}</span>
                  </div>

                  <div className="space-y-2 max-w-2xl">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white tracking-tight leading-tight uppercase drop-shadow-md">
                      <ScrambleText text={panel.title} triggerOnHover={true} />
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-emerald-300">
                      <span className="font-semibold text-emerald-200">{panel.organization}</span>
                      <span className="text-emerald-500/60">•</span>
                      <span className="bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-300 font-bold">
                        {panel.metric}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans max-w-2xl font-light">
                    {panel.description}
                  </p>

                  <div className="space-y-2 pt-1 max-w-2xl">
                    {panel.highlights.map((h, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-[#050807]/90 border border-emerald-500/20 text-xs sm:text-sm text-emerald-200/90 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {panel.capabilities.map((cap, i) => (
                      <span key={i} className="text-xs font-mono text-emerald-300 bg-[#050807] border border-emerald-500/30 px-2.5 py-0.5 rounded-lg">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-4 flex items-center justify-between">
                  {panel.projectId ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFX.playClick();
                        if (panel.projectId && onOpenProject) {
                          onOpenProject(panel.projectId);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/40 bg-[#050807] hover:bg-gradient-to-r hover:from-[#047857] hover:to-[#10B981] hover:border-emerald-300 text-emerald-200 hover:text-white font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer group/btn"
                    >
                      <span>EXPLORE CASE FILE</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/70">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>AUTHENTICATED MILESTONE</span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#047857] via-[#10B981] to-[#34D399]" />
              </div>
            );
          })}
        </div>

        {/* Mobile vertical accordion */}
        <div className="md:hidden space-y-3">
          {journeyPanels.map((panel, idx) => {
            const isExpanded = idx === activePanelIndex;
            return (
              <div key={panel.id} className="rounded-2xl border border-emerald-500/30 bg-[#0A110D] overflow-hidden transition-all duration-300">
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setActivePanelIndex(idx);
                  }}
                  className={`w-full p-4 flex items-center justify-between text-left transition-colors cursor-pointer ${
                    isExpanded ? 'bg-[#0E1813] border-b border-emerald-500/25' : 'hover:bg-emerald-950/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      {panel.number}
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-white text-sm">{panel.title}</h4>
                      <div className="text-[10px] font-mono text-emerald-400/70">{panel.organization}</div>
                    </div>
                  </div>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-emerald-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-emerald-400/60 shrink-0" />}
                </button>

                {isExpanded && (
                  <div className="p-4 space-y-3 bg-[#08100B] animate-fade-in relative">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">{panel.badge}</span>
                      <span className="text-emerald-200 font-bold">{panel.metric}</span>
                    </div>
                    <p className="text-xs text-emerald-100/90 leading-relaxed font-sans">{panel.description}</p>
                    <div className="space-y-1.5">
                      {panel.highlights.map((h, i) => (
                        <div key={i} className="p-2 rounded-lg bg-[#050807] border border-emerald-500/20 text-xs text-emerald-200 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {panel.capabilities.map((cap, i) => (
                        <span key={i} className="text-[10px] font-mono text-emerald-300 bg-[#050807] border border-emerald-500/30 px-2.5 py-0.5 rounded">
                          {cap}
                        </span>
                      ))}
                    </div>
                    {panel.projectId && (
                      <button
                        onClick={() => {
                          soundFX.playClick();
                          if (onOpenProject) onOpenProject(panel.projectId!);
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-[#047857] to-[#10B981] text-white font-mono text-xs font-bold uppercase cursor-pointer"
                      >
                        <span>EXPLORE CASE FILE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Journey;
