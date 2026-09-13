'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundFX } from '@/lib/audio';

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(soundFX.isEnabled());
  }, []);

  const toggleSound = () => {
    const next = !enabled;
    setEnabled(next);
    soundFX.setEnabled(next);
  };

  return (
    <button
      onClick={toggleSound}
      aria-label={enabled ? 'Mute audio soundscape' : 'Enable ambient soundscape'}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-mono select-none cursor-pointer ${
        enabled
          ? 'bg-gradient-to-r from-[#047857] via-[#059669] to-[#10B981] text-white border-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.5)] font-bold'
          : 'bg-[#0A110D] border-emerald-500/30 text-emerald-400/80 hover:text-white hover:border-emerald-400 hover:bg-emerald-950/40 shadow-xs'
      }`}
      title={enabled ? 'Ambient Soundscape Active' : 'Sound Muted — Click to Enable'}
    >
      {enabled ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
          <span className="text-[11px] font-bold tracking-wider text-white">
            AUDIO ON
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-emerald-400/70" />
          <span className="text-[11px] font-semibold text-emerald-300/80 tracking-wider">
            AUDIO OFF
          </span>
        </>
      )}
    </button>
  );
}

export default SoundToggle;
