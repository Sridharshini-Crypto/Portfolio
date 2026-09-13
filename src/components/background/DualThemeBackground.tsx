'use client';

import React from 'react';
import { useTheme } from '@/lib/theme';
import { TechnicalCodeBackground } from './TechnicalCodeBackground';

export function DualThemeBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-all duration-500">
      {/* Base Atmospheric Background Tint & Grid */}
      {isDark ? (
        // DARK MODE: Classic Black + Deep Burgundy + Wine Red Glow
        <div className="absolute inset-0 bg-[#080808] transition-colors duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,_rgba(110,15,26,0.18)_0%,_transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(62,7,13,0.2)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-tech-grid-wine opacity-40" />
        </div>
      ) : (
        // LIGHT MODE: Clean #F7F8FC + Soft Blue Grid (Zero Red)
        <div className="absolute inset-0 bg-[#F7F8FC] transition-colors duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,_rgba(37,99,235,0.05)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-tech-grid opacity-60" />
        </div>
      )}

      {/* Ambient Multi-Layer Code System: Wine Red in DARK, Primary Blue in LIGHT */}
      <TechnicalCodeBackground mode="theme" opacityMultiplier={isDark ? 0.9 : 0.75} />
    </div>
  );
}

export default DualThemeBackground;
