'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Shield,
  Code2,
  Terminal,
  Wrench,
  Globe,
  Sparkles,
  ArrowDown,
} from 'lucide-react';
import { soundFX } from '@/lib/audio';
import { ManualCyberGlobe } from './ManualCyberGlobe';

export interface CategoryData {
  id: string;
  number: string;
  label: string;
  shortLabel: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  tools: {
    name: string;
    description: string;
    tag?: string;
  }[];
  metrics: { label: string; value: string }[];
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    id: 'ai-ml',
    number: '01',
    label: 'AI / ML',
    shortLabel: 'AI/ML',
    tagline: 'Multi-Agent Neural Reasoning & Physics-Informed ML',
    icon: Cpu,
    description:
      'Coupling cyclic language model reasoning with vector retrieval and physics-informed loss optimization.',
    tools: [
      {
        name: 'RAG',
        description: 'FAISS vector search & air-gapped retrieval pipelines.',
        tag: 'VECTOR SEARCH',
      },
      {
        name: 'LangGraph',
        description: 'Cyclic multi-agent graph orchestration & supervisor nodes.',
        tag: 'AGENTIC WORKFLOWS',
      },
      {
        name: 'Machine Learning',
        description: 'Supervised/unsupervised models & PyTorch deep networks.',
        tag: 'DEEP LEARNING',
      },
      {
        name: 'Physics-Informed Modeling',
        description: 'Thermodynamic PDE loss functions & digital twins.',
        tag: 'PIML / PDE',
      },
    ],
    metrics: [
      { label: 'Retrieval Latency', value: '< 18ms' },
      { label: 'Graph Accuracy', value: '99.4%' },
      { label: 'Vector Index', value: 'FAISS HNSW' },
    ],
  },
  {
    id: 'full-stack',
    number: '02',
    label: 'Full-Stack',
    shortLabel: 'FULLSTACK',
    tagline: 'High-Performance Production Web Apps & APIs',
    icon: Code2,
    description:
      'Designing type-safe, high-concurrency web applications with edge caching and real-time streaming.',
    tools: [
      {
        name: 'React.js',
        description: 'Component-driven state architecture & reactive cyber interfaces.',
        tag: 'FRONTEND',
      },
      {
        name: 'Node.js',
        description: 'High-concurrency asynchronous runtime & event loop tuning.',
        tag: 'RUNTIME',
      },
      {
        name: 'Express.js',
        description: 'RESTful API architecture & edge middleware routing.',
        tag: 'BACKEND',
      },
      {
        name: 'HTML / CSS',
        description: 'Semantic layout, Tailwind CSS design tokens & fluid animations.',
        tag: 'UI STYLING',
      },
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '100 / 100' },
      { label: 'Build Latency', value: '< 1.1s' },
      { label: 'Type Safety', value: 'Strict 100%' },
    ],
  },
  {
    id: 'programming',
    number: '03',
    label: 'Programming',
    shortLabel: 'PROG',
    tagline: 'Computational Foundations & Algorithmic Mechanics',
    icon: Terminal,
    description:
      'Low-level memory management, object-oriented systems design, and relational database query optimization.',
    tools: [
      {
        name: 'Python',
        description: 'Primary computational language for AI/ML pipelines & automation.',
        tag: 'PRIMARY',
      },
      {
        name: 'C',
        description: 'Low-level memory buffers, pointers & bitwise operations.',
        tag: 'SYSTEMS',
      },
      {
        name: 'C++',
        description: 'High-performance OOP & STL data structure optimization.',
        tag: 'PERFORMANCE',
      },
      {
        name: 'Java',
        description: 'Enterprise design patterns & multithreaded workflows.',
        tag: 'OOP',
      },
      {
        name: 'SQL',
        description: 'Relational schema design, ACID transactions & indexed queries.',
        tag: 'DATABASES',
      },
      {
        name: 'JavaScript',
        description: 'Event-driven execution, asynchronous promises & browser APIs.',
        tag: 'WEB',
      },
    ],
    metrics: [
      { label: 'Languages', value: '6 Mastered' },
      { label: 'Query Latency', value: '< 2.4ms' },
      { label: 'Data Structures', value: 'Optimized' },
    ],
  },
  {
    id: 'cybersecurity',
    number: '04',
    label: 'Cybersecurity',
    shortLabel: 'CYBERSEC',
    tagline: 'Zero-Trust Enclaves & Active Threat Defense',
    icon: Shield,
    description:
      'Embedding zero-trust policy enforcement, automated packet cryptanalysis, and MITRE ATT&CK TTP mapping.',
    tools: [
      {
        name: 'Networking',
        description: 'OSI/TCP-IP stack analysis, subnetting & Wireshark dissection.',
        tag: 'NETWORKING',
      },
      {
        name: 'CTF',
        description: 'Competitive security challenges, reverse engineering & binary analysis.',
        tag: 'SECURITY OPS',
      },
      {
        name: 'Security Analysis',
        description: 'Vulnerability assessment, threat mitigation & compliance auditing.',
        tag: 'VULNERABILITY',
      },
      {
        name: 'Threat Intelligence',
        description: 'Indicator of compromise (IoC) correlation & log forensics.',
        tag: 'THREAT TRIAGE',
      },
    ],
    metrics: [
      { label: 'Mitigation Rate', value: '100%' },
      { label: 'Cipher Suite', value: 'AES-256-GCM' },
      { label: 'Inspection Rate', value: '1.2 Gbps' },
    ],
  },
  {
    id: 'tools',
    number: '05',
    label: 'Tools',
    shortLabel: 'TOOLS',
    tagline: 'Version Control, CI/CD & Network Simulation',
    icon: Wrench,
    description:
      'Distributed version control, automated CI/CD security pipelines, and virtual network topology simulation.',
    tools: [
      {
        name: 'Git',
        description: 'Distributed version control & deterministic branch management.',
        tag: 'VERSION CONTROL',
      },
      {
        name: 'GitHub',
        description: 'Repository management & automated GitHub Actions CI/CD.',
        tag: 'CI/CD',
      },
      {
        name: 'Cisco Packet Tracer',
        description: 'Enterprise network topology design & routing simulation.',
        tag: 'SIMULATION',
      },
    ],
    metrics: [
      { label: 'VCS Models', value: 'Deterministic' },
      { label: 'Topology Tests', value: 'Enterprise' },
      { label: 'CI/CD Pass Rate', value: '100%' },
    ],
  },
];

interface TheNetworkProps {
  onOpenProject?: (projectId: string) => void;
}

export function TheNetwork({ onOpenProject }: TheNetworkProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('ai-ml');

  const activeCategory =
    CATEGORIES_DATA.find((c) => c.id === activeCategoryId) || CATEGORIES_DATA[0];

  const handleSelectCategory = (id: string) => {
    soundFX.playClick();
    setActiveCategoryId(id);
  };

  return (
    <section
      id="intelligence"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32 space-y-12 text-[#F4FBF7]"
    >
      {/* ── 1. CHAPTER HEADER & EDITORIAL MANIFESTO ── */}
      <div className="space-y-4 border-b border-emerald-500/25 pb-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-300 bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-500/40 font-semibold tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>03 // INTELLIGENCE</span>
          </span>
          <span className="text-xs font-mono text-emerald-400/70 hidden sm:inline">
            5 DOMAINS • INTERACTIVE 3D SPHERE • TOOLKIT
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-white tracking-tight leading-tight uppercase">
            I DON&apos;T JUST BUILD SYSTEMS.<br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-white bg-clip-text text-transparent">
              I STUDY HOW THEY BEHAVE.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-emerald-300/80 max-w-2xl leading-relaxed font-sans font-light">
            Where probabilistic AI, deterministic security policies, and physical telemetry merge into resilient architectures.
          </p>
        </div>
      </div>

      {/* ── 2. SPLIT LAYOUT: LEFT MANUAL CYBER GLOBE | RIGHT 5 CATEGORIES & TOOLS CONTENT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* LEFT SIDE: MANUALLY CRAFTED INTERACTIVE 3D CANVAS CYBER GLOBE (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>CYBER SPHERE TOPOLOGY</span>
            </div>
            <div className="px-2.5 py-0.5 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
              5 DOMAINS
            </div>
          </div>

          {/* Manual Canvas 3D Globe Component */}
          <div className="w-full flex-1 min-h-[420px] sm:min-h-[480px]">
            <ManualCyberGlobe
              activeCategoryId={activeCategoryId}
              onSelectCategory={setActiveCategoryId}
            />
          </div>

          {/* Quick instructions pill */}
          <div className="p-2.5 rounded-xl bg-[#0A110D] border border-emerald-500/20 flex items-center justify-between text-xs font-mono text-emerald-300/80">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Select node to focus domain</span>
            </div>
            <span className="text-emerald-400 font-bold uppercase">{activeCategory.shortLabel}</span>
          </div>
        </div>

        {/* RIGHT SIDE: 5 CATEGORIES & INTERACTIVE REVEALED TOOLS (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          
          {/* 5 CATEGORY SELECTOR TABS */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {CATEGORIES_DATA.map((cat) => {
              const Icon = cat.icon;
              const isActive = cat.id === activeCategoryId;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 ${
                    isActive
                      ? 'bg-gradient-to-br from-[#0E1813] to-[#0A110D] border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400/50'
                      : 'bg-[#0A110D] border-emerald-500/20 hover:border-emerald-500/50 hover:bg-[#0E1813]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className={`p-1.5 rounded-lg border ${
                        isActive
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                          : 'bg-[#050807] border-emerald-500/20 text-emerald-400/70'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400/60">
                      {cat.number}
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase truncate">
                      {cat.shortLabel}
                    </div>
                    <h4
                      className={`font-heading font-bold text-xs sm:text-sm leading-tight line-clamp-1 ${
                        isActive ? 'text-white' : 'text-emerald-200/80'
                      }`}
                    >
                      {cat.label}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE CATEGORY REVEALED TOOLS DOSSIER CARD */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#0A110D] border border-emerald-500/35 space-y-5 shadow-[0_8px_32px_rgba(0,0,0,0.85)] flex-1 flex flex-col justify-between">
            
            {/* Category Header & Metrics */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-500/20 pb-4 gap-3">
              <div className="space-y-1">
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{activeCategory.number} — {activeCategory.shortLabel}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
                  {activeCategory.label}
                </h3>
                <p className="text-xs text-emerald-200/80 font-mono">
                  {activeCategory.tagline}
                </p>
              </div>

              {/* Metrics */}
              <div className="flex flex-wrap gap-2">
                {activeCategory.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-[#050807] border border-emerald-500/25 text-center space-y-0.5"
                  >
                    <div className="text-[9px] font-mono text-emerald-400/70">{m.label}</div>
                    <div className="text-xs font-mono font-bold text-emerald-200">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans font-light">
              {activeCategory.description}
            </p>

            {/* REVEALED TOOLS GRID */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                <span>TOOLKIT ({activeCategory.tools.length})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeCategory.tools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#050807] border border-emerald-500/25 hover:border-emerald-400/70 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-200 space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          {`0${idx + 1}.`}
                        </span>
                        <span className="font-heading font-extrabold text-white text-sm group-hover:text-emerald-300 transition-colors">
                          {tool.name}
                        </span>
                      </div>
                      {tool.tag && (
                        <span className="text-[9px] font-mono text-emerald-300 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-500/30">
                          {tool.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-emerald-200/75 leading-relaxed font-sans">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ── 3. CLOSING STATEMENT / EDITORIAL ANCHOR FOOTER ── */}
      <div className="space-y-4 pt-8 text-center flex flex-col items-center border-t border-emerald-500/20">
        <div className="flex items-center justify-center text-emerald-400 animate-bounce">
          <ArrowDown className="w-4 h-4" />
        </div>

        <div className="space-y-1.5 font-heading font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight uppercase max-w-2xl">
          <div>SEE THE SIGNAL.</div>
          <div className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-white bg-clip-text text-transparent">
            UNDERSTAND THE PATTERN.
          </div>
          <div>BUILD THE RESPONSE.</div>
        </div>
      </div>
    </section>
  );
}

export default TheNetwork;
