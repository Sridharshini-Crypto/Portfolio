'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundFX } from '@/lib/audio';

const CYBER_GLYPHS = '01#$!<>-_/[]{}*^?~@&%¥§∆Ω';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  triggerOnHover?: boolean;
  triggerOnMount?: boolean;
  triggerKey?: any;
  progress?: number; // Optional sync progress 0-100 (e.g. from photo de-masking)
  playAudioOnScramble?: boolean;
}

export function ScrambleText({
  text,
  className = '',
  scrambleSpeed = 24,
  triggerOnHover = true,
  triggerOnMount = false,
  triggerKey,
  progress,
  playAudioOnScramble = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRunningRef = useRef(false);

  // Synchronize with external progress (e.g. photo de-masking scan 0% - 100%)
  useEffect(() => {
    if (progress !== undefined) {
      if (progress >= 100) {
        setDisplayText(text);
        setIsScrambling(false);
      } else {
        setIsScrambling(true);
        const revealedCount = Math.floor((progress / 100) * text.length);
        const scrambled = text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < revealedCount) {
              return text[index];
            }
            return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
          })
          .join('');
        setDisplayText(scrambled);
      }
    }
  }, [progress, text]);

  const startScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    isRunningRef.current = true;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;
    // Step calibrated for ~450ms smooth cyber decryption
    const step = Math.max(0.6, text.length / 22);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
          })
          .join('');
      });

      if (playAudioOnScramble && Math.random() > 0.5) {
        soundFX.playScrambleDecryption();
      }

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        isRunningRef.current = false;
        setIsScrambling(false);
      }

      iteration += step;
    }, scrambleSpeed);
  }, [text, playAudioOnScramble, scrambleSpeed]);

  // Trigger on mount if requested
  useEffect(() => {
    if (triggerOnMount && progress === undefined) {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggerOnMount, progress, startScramble]);

  // Trigger whenever triggerKey changes
  useEffect(() => {
    if (triggerKey !== undefined && progress === undefined) {
      startScramble();
    }
  }, [triggerKey, progress, startScramble]);

  const handleMouseEnter = () => {
    if (triggerOnHover && (progress === undefined || progress >= 100)) {
      startScramble();
    }
  };

  const isDecryptedInSync = progress !== undefined && progress < 100;

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`inline-block transition-colors duration-150 ${
        isScrambling || isDecryptedInSync
          ? 'text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.85)] font-mono tracking-wider'
          : ''
      } ${className}`}
    >
      {displayText}
    </span>
  );
}

export default ScrambleText;
