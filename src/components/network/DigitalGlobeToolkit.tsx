'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Shield,
  Cpu,
  Code2,
  Activity,
  CheckCircle2,
  Terminal,
  X,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { soundFX } from '@/lib/audio';

interface IntelligenceNode {
  id: string;
  shortLabel: string;
  name: string;
  category: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  position: { top: string; left: string };
  skills: string[];
  capabilities: string[];
  metrics: { label: string; value: string }[];
  codeSnippet: string;
}

const intelligenceNodes: IntelligenceNode[] = [
  {
    id: 'ai',
    shortLabel: 'AI',
    name: 'APPLIED ARTIFICIAL INTELLIGENCE',
    category: 'Neural Reasoning & RAG',
    tagline: 'Multi-agent cyclic graphs, FAISS vector indexing, and physics-informed models',
    icon: Cpu,
    position: { top: '12%', left: '50%' },
    skills: ['Python', 'LangGraph', 'FAISS', 'PyTorch', 'HuggingFace', 'PIML'],
    capabilities: [
      'Multi-Agent Cyclic Reasoning & Tool Calling Graphs',
      'Air-Gapped Vector Semantic Search Pipelines',
      'Physics-Informed Loss Function Optimization',
      'Autonomous Verification & Guardrail Layers',
    ],
    metrics: [
      { label: 'RAG Latency', value: '< 18ms' },
      { label: 'Graph Convergence', value: '99.4%' },
      { label: 'Vector Index', value: '100k+' },
    ],
    codeSnippet: `// Multi-Agent Cyclic Graph Topology
const workflow = new StateGraph<AgentState>({
  channels: { messages: { reducer: (a, b) => a.concat(b) } }
})
  .addNode("supervisor", supervisorAgent)
  .addNode("vector_retriever", faissRagEnclave)
  .addNode("verifier", zeroTrustAudit)
  .addEdge("supervisor", "vector_retriever")
  .addEdge("vector_retriever", "verifier");`,
  },
  {
    id: 'security',
    shortLabel: 'SECURITY',
    name: 'ZERO-TRUST & CYBER DEFENSE',
    category: 'High-Assurance Security',
    tagline: 'Deterministic packet dissection, MITRE ATT&CK mapping, and kernel isolation',
    icon: Shield,
    position: { top: '50%', left: '12%' },
    skills: ['Zero-Trust', 'Wireshark', 'Metasploit', 'Scapy', 'AES-256', 'MITRE ATT&CK'],
    capabilities: [
      'Automated Vulnerability Scanning & Exploit Verification',
      'High-Throughput Packet Dissection & Cryptanalysis',
      'Adversary Simulation & Incident Triage Protocols',
      'Zero-Trust Network Access (ZTNA) Enclaves',
    ],
    metrics: [
      { label: 'Mitigation', value: '100%' },
      { label: 'Cipher', value: 'AES-256-GCM' },
      { label: 'Inspection', value: '1.2 Gbps' },
    ],
    codeSnippet: `// Zero-Trust Enclave Packet Verification
def verify_packet_stream(packet_buffer):
    frame = scapy.Ether(packet_buffer)
    if frame.haslayer(scapy.TCP) and frame[scapy.TCP].dport == 443:
        tls_header = parse_tls_enclave(frame)
        if tls_header.cipher_suite != TLS_AES_256_GCM_SHA384:
            isolate_session(frame.src, reason="INSECURE_CIPHER")
            return SecurityVerdict.BLOCKED
    return SecurityVerdict.PASSED`,
  },
  {
    id: 'systems',
    shortLabel: 'SYSTEMS',
    name: 'FULL-STACK ARCHITECTURE',
    category: 'Production Infrastructure',
    tagline: 'High-performance reactive interfaces, serverless APIs, and edge microservices',
    icon: Code2,
    position: { top: '50%', left: '88%' },
    skills: ['React', 'Next.js 16', 'TypeScript', 'Node.js', 'Express', 'TailwindCSS'],
    capabilities: [
      'High-Concurrency Serverless API Gateways with Edge Caching',
      'Real-Time WebSocket & Telemetry Streaming Dashboards',
      'Enterprise Type-Safe Full-Stack Monorepo Architectures',
      'Optimized SSR & Client-Side Hydration Pipelines',
    ],
    metrics: [
      { label: 'Lighthouse', value: '100/100' },
      { label: 'Build Time', value: '< 1.1s' },
      { label: 'Type Safety', value: 'Strict 100%' },
    ],
    codeSnippet: `// Next.js High-Throughput Edge Route
export async function POST(req: NextRequest) {
  const session = await verifyZeroTrustToken(req);
  if (!session.valid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const telemetryData = await telemetryEngine.stream(session.userId);
  return NextResponse.json({ status: "OK", telemetry: telemetryData });
}`,
  },
  {
    id: 'data',
    shortLabel: 'DATA',
    name: 'TELEMETRY & DIGITAL TWINS',
    category: 'Aerospace & Signal Processing',
    tagline: 'Real-time telemetry streams, Brayton thermodynamic cycles, and RUL forecasting',
    icon: Activity,
    position: { top: '88%', left: '50%' },
    skills: ['Physics-Informed ML', 'Brayton Cycles', 'Telemetry Pipelines', 'Weibull RUL'],
    capabilities: [
      'Four-Stage Turbojet Physics-Informed Digital Twins',
      'Real-Time Telemetry Anomaly Classification & Sensor Fusion',
      'Remaining Useful Life (RUL) Weibull Degradation Estimation',
      'Thermodynamic Cycle Simulation',
    ],
    metrics: [
      { label: 'RPM Fidelity', value: '99.7%' },
      { label: 'Thermal', value: '± 0.4°C' },
      { label: 'RUL Pred.', value: '98.2%' },
    ],
    codeSnippet: `// Thermodynamic Brayton Cycle Loss
def thermodynamic_residual_loss(T1, P1, T3, P3, gamma=1.4):
    isentropic_temp = T1 * (P3 / P1) ** ((gamma - 1) / gamma)
    compressor_work = cp * (T3 - T1)
    pde_residual = torch.abs(compressor_work - cp * isentropic_temp / eta_c)
    return torch.mean(pde_residual)`,
  },
];

export function DigitalGlobeToolkit() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const activeNode = intelligenceNodes.find((n) => n.id === activeNodeId) || null;

  const handleSelectNode = (id: string) => {
    soundFX.playNetworkPulse();
    setActiveNodeId(activeNodeId === id ? null : id);
  };

  return (
    <div className="relative space-y-6">
      
      {/* ── LARGE VISUAL / ANIMATED INTELLIGENCE NETWORK ── */}
      <div className="relative w-full min-h-[520px] sm:min-h-[620px] bg-[#050807] border border-emerald-500/35 rounded-3xl p-6 sm:p-10 overflow-hidden flex items-center justify-center shadow-[0_0_60px_rgba(0,0,0,0.95)]">
        
        {/* Subtle Cyber Dot-Grid Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(16, 185, 129, 0.4) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Ambient Pulsing Radar Beams */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[420px] h-[420px] sm:w-[540px] sm:h-[540px] rounded-full border border-emerald-500/20 animate-ping opacity-20" />
          <div className="w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full border border-dashed border-emerald-400/25 animate-[spin_60s_linear_infinite]" />
        </div>

        {/* Center Cyber Circuit Globe Asset with Orbiting Rings */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
          {/* Outer Rotating Energy Rings */}
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/40 animate-[spin_25s_linear_infinite] pointer-events-none" />
          <div className="absolute -inset-6 rounded-full border border-dashed border-emerald-400/30 animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />

          {/* Glowing Center Globe */}
          <div className="relative w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.5)] border-2 border-emerald-400/70 bg-[#050807]">
            <Image
              src="/cyber_circuit_globe.jpg"
              alt="Interactive Cyber Circuit Digital Globe"
              fill
              className="object-cover object-center animate-[spin_60s_linear_infinite]"
              priority
            />
            <div className="absolute inset-0 bg-emerald-500/15 mix-blend-color pointer-events-none" />
          </div>

          {/* Central Live Telemetry Status */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="px-5 py-1.5 rounded-full bg-[#050807]/95 border border-emerald-400 text-xs font-mono text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.7)] tracking-widest font-bold">
              TOOLKIT
            </div>
          </div>
        </div>

        {/* ── 4 SATELLITE INTERACTIVE DOMAIN NODES: AI • SECURITY • SYSTEMS • DATA ── */}
        <div className="absolute inset-0 p-6 sm:p-10 pointer-events-none">
          {intelligenceNodes.map((node) => {
            const Icon = node.icon;
            const isSelected = node.id === activeNodeId;

            return (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ top: node.position.top, left: node.position.left }}
              >
                <button
                  onClick={() => handleSelectNode(node.id)}
                  className={`group flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border transition-all duration-300 cursor-pointer shadow-xl ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#047857] via-[#059669] to-[#10B981] text-white border-emerald-300 scale-115 shadow-[0_0_30px_rgba(16,185,129,0.8)] font-bold'
                      : 'bg-[#0A110D]/95 hover:bg-emerald-950/80 text-emerald-200 border-emerald-500/40 hover:border-emerald-400 hover:scale-110 backdrop-blur-md'
                  }`}
                  title={`Click to inspect ${node.name}`}
                >
                  <div
                    className={`p-1.5 rounded-xl ${
                      isSelected ? 'bg-emerald-950 text-white' : 'bg-[#0E1813] text-emerald-400'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-heading font-black tracking-widest uppercase">
                    {node.shortLabel}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Floating Instruction */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] font-mono text-emerald-400/60 pointer-events-none flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>Tap any node (AI • SECURITY • SYSTEMS • DATA) to inspect details</span>
        </div>
      </div>

      {/* ── ON-DEMAND INTERACTIVE DETAIL DRAWER (Appears on click) ── */}
      {activeNode && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#08100B] border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.2)] space-y-6 animate-fade-in relative">
          
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest">
                INSPECTING // {activeNode.shortLabel}
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-black text-white uppercase">
                {activeNode.name}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/80 font-mono">
                {activeNode.tagline}
              </p>
            </div>

            <button
              onClick={() => setActiveNodeId(null)}
              className="p-2 rounded-lg border border-emerald-500/30 text-emerald-400 hover:text-white hover:bg-emerald-950/60 cursor-pointer"
              title="Close Inspection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Capabilities & Skills (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  VERIFIED CAPABILITIES
                </div>
                <div className="space-y-2">
                  {activeNode.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#050807] border border-emerald-500/20 text-xs text-emerald-100/90 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeNode.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-[#050807] border border-emerald-500/30 text-emerald-300 font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>


          </div>
        </div>
      )}

    </div>
  );
}

export default DigitalGlobeToolkit;
