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
  playAudioOnScramble?: boolean;
}

export function ScrambleText({
  text,
  className = '',
  scrambleSpeed = 30,
  triggerOnHover = true,
  triggerOnMount = false,
  triggerKey,
  playAudioOnScramble = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRunningRef = useRef(false);

  const startScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    isRunningRef.current = true;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;

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

      if (playAudioOnScramble && Math.random() > 0.45) {
        soundFX.playScrambleDecryption();
      }

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        isRunningRef.current = false;
        setIsScrambling(false);
      }

      iteration += 1 / 2.2;
    }, scrambleSpeed);
  }, [text, playAudioOnScramble, scrambleSpeed]);

  // Trigger on mount if requested
  useEffect(() => {
    if (triggerOnMount) {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggerOnMount, startScramble]);

  // Trigger whenever triggerKey changes
  useEffect(() => {
    if (triggerKey !== undefined) {
      startScramble();
    }
  }, [triggerKey, startScramble]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startScramble();
    }
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`inline-block transition-all duration-150 cursor-pointer ${
        isScrambling ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.85)] tracking-wider' : ''
      } ${className}`}
      title={triggerOnHover ? 'Hover to decrypt' : undefined}
    >
      {displayText}
    </span>
  );
}

export default ScrambleText;
