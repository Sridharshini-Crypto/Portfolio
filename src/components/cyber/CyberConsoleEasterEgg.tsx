'use client';

import { useEffect } from 'react';
import { soundFX } from '@/lib/audio';

declare global {
  interface Window {
    unlock_classified_vault?: () => string;
    cit_telemetry?: () => void;
    help?: () => string;
  }
}

export function CyberConsoleEasterEgg() {
  useEffect(() => {
    // Print stylized console banner
    const bannerStyle = 'color: #10B981; font-family: monospace; font-size: 11px; font-weight: bold;';
    const highlightStyle = 'color: #34D399; font-family: monospace; font-size: 12px; font-weight: bold; background: #06150E; padding: 4px 8px; border-radius: 4px;';
    const alertStyle = 'color: #F59E0B; font-family: monospace; font-size: 11px; font-weight: bold;';

    console.log(
      `%c
  ███████╗██████╗ ██╗██████╗ ██╗  ██╗ █████╗ ██████╗ ███████╗██╗  ██╗██╗███╗   ██╗██╗
  ██╔════╝██╔══██╗██║██╔══██╗██║  ██║██╔══██╗██╔══██╗██╔════╝██║  ██║██║████╗  ██║██║
  ███████╗██████╔╝██║██║  ██║███████║███████║██████╔╝███████╗███████║██║██╔██╗ ██║██║
  ╚════██║██╔══██╗██║██║  ██║██╔══██║██╔══██║██╔══██╗╚════██║██╔══██║██║██║╚██╗██║██║
  ███████║██║  ██║██║██████╔╝██║  ██║██║  ██║██║  ██║███████║██║  ██║██║██║ ╚████║██║
  ╚══════╝╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═╝
`,
      bannerStyle
    );

    console.log(
      '%c[!] UNAUTHORIZED INSPECTION / RECRUITER HOOK DETECTED',
      alertStyle
    );
    console.log(
      '%c[+] Operator: SRIDHARSHINI S // B.E. CSE (Cyber Security) @ Chennai Institute of Technology',
      highlightStyle
    );
    console.log(
      '%c[+] Current Standing: 9.07 CGPA | Security Clearance: LEVEL-5 (Zero-Trust Enclave)',
      bannerStyle
    );
    console.log(
      '%c[?] RECRUITER CTF FLAG: FLAG{sridharshini_cit_cyber_907_top_secret}',
      'color: #38BDF8; font-family: monospace; font-size: 12px; font-weight: bold; background: #0A1C28; padding: 4px 8px; border-radius: 4px;'
    );
    console.log(
      '%c[>] Type unlock_classified_vault() in console to decrypt top-secret research notes.',
      'color: #A7F3D0; font-family: monospace; font-size: 11px; font-style: italic;'
    );

    // Register global interactive functions
    window.unlock_classified_vault = () => {
      soundFX.playVaultUnlock();
      window.dispatchEvent(new CustomEvent('open-classified-vault'));
      return '🔓 [ACCESS GRANTED]: Decrypting classified enclave modal on UI...';
    };

    window.cit_telemetry = () => {
      console.table({
        Operator: 'Sridharshini S',
        Institution: 'Chennai Institute of Technology',
        Department: 'CSE (Cyber Security)',
        CGPA: '9.07',
        'HAL Aerothon': 'Top 25 National Finalist',
        'Club Asymmetric': 'Secretary',
        Status: 'ONLINE / ZERO-TRUST',
      });
    };

    window.help = () => {
      return `
Available Cyber Commands:
• unlock_classified_vault() -> Decrypts classified lab blueprint modal on screen
• cit_telemetry()           -> Outputs structured technical operator metrics
• help()                    -> Displays available operator options
      `;
    };

    return () => {
      delete window.unlock_classified_vault;
      delete window.cit_telemetry;
      delete window.help;
    };
  }, []);

  return null;
}

export default CyberConsoleEasterEgg;
