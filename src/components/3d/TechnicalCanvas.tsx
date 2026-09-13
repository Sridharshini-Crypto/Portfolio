'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { SpatialWorld } from './SpatialWorld';

interface TechnicalCanvasProps {
  activeSector?: string;
}

export default function TechnicalCanvas({ activeSector = 'core' }: TechnicalCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect WebGL capability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    // Detect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!mounted || prefersReducedMotion || !hasWebGL) {
    // 2D Motion Fallback
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 bg-tech-grid" />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50 transition-opacity duration-1000">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[12, 12, 8]} intensity={0.7} />
        <pointLight position={[0, -2, -10]} intensity={0.5} color="#5F91C7" />
        <SpatialWorld activeSector={activeSector} />
      </Canvas>
    </div>
  );
}
