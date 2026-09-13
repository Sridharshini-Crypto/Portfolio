'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';

interface TechnicalCodeBackgroundProps {
  mode?: 'theme' | 'green';
  opacityMultiplier?: number;
}

export function TechnicalCodeBackground({
  mode = 'green',
  opacityMultiplier = 1,
}: TechnicalCodeBackgroundProps) {
  // Realistic technical engineering code snippets
  const layer1Snippets = [
    `class ZeroTrustArchitecture extends SecurityCore {
  private enclave = new SecureBuffer();
  async verifySession(token: AuthToken): Promise<boolean> {
    return this.enclave.evaluate(token.digest);
  }
}`,
    `struct CyberSecurityTelemetryFrame {
  timestamp: u64,
  network_throughput_mbps: f32,
  anomaly_score: f32,
  active_sessions: u32,
  zero_trust_status: VerificationState,
};`,
    `def defense_loss_function(network_weights, threat_residual):
    pde_loss = torch.mean(threat_residual ** 2)
    packet_loss = torch.nn.MSELoss()(pred, target)
    return packet_loss + 0.05 * pde_loss`,
  ];

  const layer2Snippets = [
    'const system = initialize_zero_trust();',
    'node.connect(cit_security_mesh);',
    'status: active [TLS 1.3];',
    'render(spatial_matrix);',
    'crypto.verify(payload, signature);',
    'netacad.validate_badge("58ef4ab1");',
    'firewall.dispatch(policy_rule_enforce);',
    'if (anomaly.score > threshold) isolate_node();',
    'mitre.classify(event.ttp, "T1059.001");',
    'socket.stream(packet_bus.poll());',
    'zero_trust.enforce_access_control();',
    'archive.decrypt_ledger(0x7F2A);',
  ];

  const layer3Snippets = [
    '0x040F1E', 'PORT_443_OK', 'LAT_13.0827_N', 'LON_80.2707_E',
    'CIPHER:AES_256_GCM', 'SYS.ONLINE', 'SECURITY:100%', 'TLS_1.3_ACTIVE',
    'MITRE_ATT&CK_SYNC', 'PACKET_FILTER_OK', 'CIT_CSE_SEC', 'CGPA_9.07',
  ];

  // Pure Emerald / Mint Cyber Palette
  const codeColor = useMemo(() => ({
    large: 'text-emerald-500/10',
    medium: 'text-emerald-400/15',
    small: 'text-emerald-400/20',
  }), []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0 transition-opacity duration-500 font-mono text-[11px] leading-relaxed"
      style={{ opacity: opacityMultiplier }}
    >
      {/* Ambient Cyber Circuit Globe Watermark in Backdrop */}
      <div className="absolute -right-32 top-1/4 w-[520px] h-[520px] rounded-full overflow-hidden opacity-[0.06] pointer-events-none mix-blend-screen">
        <Image
          src="/cyber_circuit_globe.jpg"
          alt="Cyber Circuit Ambient Globe"
          fill
          className="object-cover animate-[spin_80s_linear_infinite]"
        />
      </div>

      <div className="absolute -left-32 bottom-1/4 w-[460px] h-[460px] rounded-full overflow-hidden opacity-[0.05] pointer-events-none mix-blend-screen">
        <Image
          src="/cyber_circuit_globe.jpg"
          alt="Cyber Circuit Ambient Globe"
          fill
          className="object-cover animate-[spin_100s_linear_infinite_reverse]"
        />
      </div>

      {/* LAYER 1: Large Faint Background Code Blocks */}
      <div className={`absolute -top-10 -left-10 text-xs sm:text-sm blur-[0.5px] whitespace-pre ${codeColor.large}`}>
        {layer1Snippets[0]}
      </div>
      <div className={`absolute top-1/3 -right-16 text-xs sm:text-sm blur-[0.5px] whitespace-pre ${codeColor.large}`}>
        {layer1Snippets[1]}
      </div>
      <div className={`absolute bottom-8 left-10 text-xs sm:text-sm blur-[0.5px] whitespace-pre hidden sm:block ${codeColor.large}`}>
        {layer1Snippets[2]}
      </div>

      {/* LAYER 2: Medium Moving Code Streams */}
      <div className="absolute inset-0 flex justify-between px-6 sm:px-16">
        {/* Left Vertical Stream */}
        <div className="flex flex-col space-y-16 animate-[pulse_6s_ease-in-out_infinite]">
          {layer2Snippets.slice(0, 4).map((line, idx) => (
            <div
              key={idx}
              className={`transition-colors duration-300 ${codeColor.medium}`}
              style={{
                transform: `translateX(${idx % 2 === 0 ? '0px' : '15px'})`,
              }}
            >
              <span className="opacity-40">{`0${idx + 1} `}</span>
              {line}
            </div>
          ))}
        </div>

        {/* Center-Right Vertical Stream */}
        <div className="flex flex-col space-y-20 pt-28 hidden md:flex animate-[pulse_8s_ease-in-out_infinite]">
          {layer2Snippets.slice(4, 8).map((line, idx) => (
            <div
              key={idx}
              className={`transition-colors duration-300 ${codeColor.medium}`}
            >
              <span className="opacity-40">{`0${idx + 5} `}</span>
              {line}
            </div>
          ))}
        </div>

        {/* Far Right Stream */}
        <div className="flex flex-col space-y-14 pt-12 animate-[pulse_7s_ease-in-out_infinite]">
          {layer2Snippets.slice(8, 12).map((line, idx) => (
            <div
              key={idx}
              className={`transition-colors duration-300 text-right ${codeColor.medium}`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* LAYER 3: Tiny Sharp Technical Coordinates & Status Indicators */}
      <div className="absolute top-1/4 left-1/4 flex gap-4 hidden lg:flex">
        <span className={`text-[10px] ${codeColor.small}`}>{layer3Snippets[0]}</span>
        <span className={`text-[10px] ${codeColor.small}`}>{layer3Snippets[1]}</span>
      </div>

      <div className="absolute bottom-1/4 right-1/4 flex gap-4 hidden lg:flex">
        <span className={`text-[10px] ${codeColor.small}`}>{layer3Snippets[4]}</span>
        <span className={`text-[10px] ${codeColor.small}`}>{layer3Snippets[7]}</span>
      </div>

      <div className="absolute top-2/3 left-12 hidden sm:block">
        <span className={`text-[10px] tracking-widest ${codeColor.small}`}>{layer3Snippets[8]}</span>
      </div>

      <div className="absolute top-16 right-1/3 hidden sm:block">
        <span className={`text-[10px] tracking-widest ${codeColor.small}`}>{layer3Snippets[10]}</span>
      </div>
    </div>
  );
}

export default TechnicalCodeBackground;
