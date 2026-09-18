'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, X, Terminal, Check, Copy, ExternalLink, Download } from 'lucide-react';
import { soundFX } from '@/lib/audio';

export function ClassifiedVaultModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      soundFX.playAccessGranted();
      setIsOpen(true);
    };

    window.addEventListener('open-classified-vault', handleOpen);
    return () => {
      window.removeEventListener('open-classified-vault', handleOpen);
    };
  }, []);

  const handleCopyFlag = () => {
    navigator.clipboard.writeText('FLAG{sridharshini_cit_cyber_907_top_secret}');
    soundFX.playClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    soundFX.playClick();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#050B07] border-2 border-emerald-500/50 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.3)] overflow-hidden font-mono text-emerald-300">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-[#091710] border-b border-emerald-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-white uppercase">
              TOP SECRET // RECRUITER CTF VAULT
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {/* Status Badge */}
          <div className="p-4 rounded-xl bg-[#09150E] border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <Terminal className="w-4 h-4" />
              <span>CLEARANCE AUTHENTICATED: LEVEL-5 ZERO-TRUST OPERATOR</span>
            </div>
            <p className="text-xs text-emerald-400/80 leading-relaxed font-sans">
              Welcome to Sridharshini&apos;s classified research enclave. You unlocked this terminal via the Recruiter CTF hook or Developer Telemetry console.
            </p>
          </div>

          {/* CTF Flag Box */}
          <div className="space-y-2">
            <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
              [+] RECRUITER CTF FLAG RECORD
            </div>
            <div className="p-3.5 rounded-xl bg-[#020503] border border-emerald-500/40 flex items-center justify-between gap-3">
              <code className="text-xs sm:text-sm text-emerald-300 font-bold break-all">
                FLAG&#123;sridharshini_cit_cyber_907_top_secret&#125;
              </code>
              <button
                onClick={handleCopyFlag}
                className="px-3 py-1.5 rounded-lg bg-[#0E1F15] hover:bg-emerald-950 border border-emerald-500/40 text-xs text-emerald-300 hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 transition-all font-bold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>

          {/* Research Telemetry Highlights */}
          <div className="space-y-3">
            <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
              [+] CORE SPECIALIZATION MATRIX
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#09140E] border border-emerald-500/20 space-y-1">
                <span className="text-emerald-300 font-bold">🚀 SubAero (HAL Aerothon)</span>
                <p className="text-[11px] text-emerald-400/70">
                  PINN thermodynamic Brayton loss solver with Weibull remaining useful life modeling.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#09140E] border border-emerald-500/20 space-y-1">
                <span className="text-emerald-300 font-bold">🛡️ ReguShield (Air-Gapped)</span>
                <p className="text-[11px] text-emerald-400/70">
                  Zero cloud egress local open-weights LLM compliance validation with LangGraph DAGs.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#09140E] border border-emerald-500/20 space-y-1">
                <span className="text-emerald-300 font-bold">⚡ SentinelX (Cyber Fusion)</span>
                <p className="text-[11px] text-emerald-400/70">
                  Cross-domain threat telemetry mapping network port-scans with fraud velocity.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#09140E] border border-emerald-500/20 space-y-1">
                <span className="text-emerald-300 font-bold">🏛️ Academic Standing</span>
                <p className="text-[11px] text-emerald-400/70">
                  9.07 CGPA @ CIT · School 1st Rank HSC (97%) &amp; SSLC (95%).
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="/Sridharshini_S_Cyber_Resume.pdf"
              download
              onClick={() => soundFX.playClick()}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#047857] to-[#10B981] hover:brightness-110 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME PDF</span>
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ssridharshiniofficial@gmail.com&su=Technical%20Collaboration%20Inquiry%20-%20Sridharshini%20S"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playClick()}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-[#0E1F15] hover:bg-emerald-950 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>SEND SECURE DISPATCH</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassifiedVaultModal;

