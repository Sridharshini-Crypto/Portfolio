'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundFX } from '@/lib/audio';

const CYBER_GLYPHS = '!<>-_\\/[]{}—=+*^?#_0101AX';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  triggerOnHover?: boolean;
  triggerOnMount?: boolean;
  playAudioOnScramble?: boolean;
}

export function ScrambleText({
  text,
  className = '',
  scrambleSpeed = 28,
  triggerOnHover = true,
  triggerOnMount = false,
  playAudioOnScramble = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

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

      if (playAudioOnScramble && Math.random() > 0.4) {
        soundFX.playScrambleDecryption();
      }

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }

      iteration += 1 / 2.5;
    }, scrambleSpeed);
  }, [text, isScrambling, playAudioOnScramble, scrambleSpeed]);

  useEffect(() => {
    if (triggerOnMount) {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggerOnMount, startScramble]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startScramble();
    }
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`${className} ${isScrambling ? 'font-mono select-none tracking-wider' : ''} transition-colors inline-block`}
    >
      {displayText}
    </span>
  );
}

export default ScrambleText;

