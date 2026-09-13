'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { soundFX } from '@/lib/audio';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleSelectDark = () => {
    if (theme !== 'dark') {
      soundFX.playClick();
      setTheme('dark');
    }
  };

  const handleSelectLight = () => {
    if (theme !== 'light') {
      soundFX.playClick();
      setTheme('light');
    }
  };

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-[#101010] border border-[#DCE3EE] dark:border-[#3E070D] shadow-xs backdrop-blur-md">
      {/* LIGHT MODE BUTTON: White + Navy + Blue */}
      <button
        onClick={handleSelectLight}
        aria-label="Switch to Light Theme (White & Blue)"
        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer select-none ${
          theme === 'light'
            ? 'bg-[#172033] text-white shadow-xs font-semibold'
            : 'text-[#64748B] hover:text-[#172033] hover:bg-[#F7F8FC]'
        }`}
        title="Light Theme: White & Primary Blue"
      >
        <span className={`text-[10px] ${theme === 'light' ? 'text-[#38BDF8] font-bold' : 'text-gray-400'}`}>
          {theme === 'light' ? '◉' : '○'}
        </span>
        <Sun className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-amber-400' : 'text-gray-400'}`} />
        <span className="hidden sm:inline text-[11px]">LIGHT</span>
      </button>

      {/* DARK MODE BUTTON: Classic Black + Wine Red */}
      <button
        onClick={handleSelectDark}
        aria-label="Switch to Dark Theme (Black & Wine Red)"
        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer select-none ${
          theme === 'dark'
            ? 'bg-[#6E0F1A] text-[#F4F0F1] shadow-xs font-semibold border border-[#9E2F3A]/40'
            : 'text-[#C96A73]/70 hover:text-[#F4F0F1] hover:bg-[#3E070D]/40'
        }`}
        title="Dark Theme: Black & Wine Red"
      >
        <span className={`text-[10px] ${theme === 'dark' ? 'text-[#FF8DAF] font-bold' : 'text-gray-500'}`}>
          {theme === 'dark' ? '◉' : '○'}
        </span>
        <Moon className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-[#FF8DAF]' : 'text-gray-400'}`} />
        <span className="hidden sm:inline text-[11px]">DARK</span>
      </button>
    </div>
  );
}

export default ThemeToggle;
