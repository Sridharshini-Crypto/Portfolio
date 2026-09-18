'use client';

import React, { useState } from 'react';
import { Lock, Unlock, ShieldAlert, Cpu, Terminal, CheckCircle } from 'lucide-react';
import { soundFX } from '@/lib/audio';

interface ClassifiedDossierProps {
  title?: string;
  classificationLevel?: string;
  clearanceCode?: string;
  redactedExcerpt?: string;
  revealedContent: React.ReactNode;
}

export function ClassifiedDossier({
  title = 'TOP SECRET RESEARCH SPECIFICATION',
  classificationLevel = 'LEVEL-5 // AIR-GAPPED ONLY',
  clearanceCode = 'CIT-CYBER-ALPHA-907',
  redactedExcerpt = 'Deterministic zero-trust constraint verification protocols prohibiting telemetry egress to public neural pipelines...',
  revealedContent,
}: ClassifiedDossierProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDecrypt = () => {
    if (isUnlocked || isDecrypting) return;

    setIsDecrypting(true);
    setProgress(0);
    soundFX.playClassifiedDecrypt();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDecrypting(false);
          setIsUnlocked(true);
          soundFX.playAccessGranted();
          return 100;
        }
        if (Math.random() > 0.5) {
          soundFX.playScrambleDecryption();
        }
        return prev + 15;
      });
    }, 50);
  };

  return (
    <div className="my-6 rounded-2xl bg-[#060D09] border border-emerald-500/35 overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.12)] transition-all">
      {/* Classified Header Strip */}
      <div className="px-4 py-2.5 bg-[#0A1A11] border-b border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isUnlocked ? (
            <Unlock className="w-4 h-4 text-emerald-400 animate-pulse" />
          ) : (
            <Lock className="w-4 h-4 text-amber-400" />
          )}
          <span className="font-mono text-[11px] font-bold tracking-wider text-emerald-300 uppercase">
            {title}
          </span>
        </div>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-semibold">
          {classificationLevel}
        </span>
      </div>

      {/* Main Body */}
      <div className="p-5 sm:p-6 space-y-4">
        {!isUnlocked ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-amber-300">
                  CLASSIFIED ENCLAVE // ACCESS RESTRICTED
                </div>
                <p className="text-xs font-mono text-emerald-400/80 leading-relaxed blur-[1.5px] select-none">
                  {redactedExcerpt}
                </p>
              </div>
            </div>

            {isDecrypting ? (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-emerald-300">
                  <span className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                    DECRYPTING PROTOCOL CIPHERS...
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#050807] border border-emerald-500/40 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#047857] via-[#10B981] to-[#34D399] transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={handleDecrypt}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0B2116] via-[#0D2E1F] to-[#0B2116] hover:bg-emerald-950 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-white font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>[ DECRYPT SECURITY DOSSIER // {clearanceCode} ]</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 border-b border-emerald-500/20 pb-2">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span>CLEARANCE AUTHENTICATED: LEVEL-5 ACCESS GRANTED</span>
            </div>
            <div className="text-xs sm:text-sm font-mono text-emerald-100/90 leading-relaxed bg-[#030604] p-4 rounded-xl border border-emerald-500/20 space-y-2">
              {revealedContent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassifiedDossier;
