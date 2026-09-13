'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ArrowRight,
  FolderGit2,
  Network,
  Compass,
  Award,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { projectsData } from '@/data/projects';
import { allTechnologies } from '@/data/network';
import { soundFX } from '@/lib/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
}

interface CommandItem {
  id: string;
  label: string;
  sublabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  type: string;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          soundFX.playTone(600, 0.05);
          window.dispatchEvent(new CustomEvent('open-command-palette'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const navigateTo = (id: string) => {
    soundFX.playClick();
    onClose();
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  // Navigation targets
  const sectionItems: CommandItem[] = [
    { id: 'mindset', label: 'The Mindset (Philosophy & Pillars)', icon: Sparkles, type: 'Chapter', action: () => navigateTo('mindset') },
    { id: 'projects', label: 'Project Lab (Flagship Case Files)', icon: FolderGit2, type: 'Chapter', action: () => navigateTo('projects') },
    { id: 'intelligence', label: 'Systems & Architecture Matrix', icon: Network, type: 'Chapter', action: () => navigateTo('intelligence') },
    { id: 'journey', label: 'The Journey So Far (Academics & Milestones)', icon: Compass, type: 'Chapter', action: () => navigateTo('journey') },
    { id: 'archive', label: 'Always Learning (Industry Credentials)', icon: Award, type: 'Chapter', action: () => navigateTo('archive') },
    { id: 'connect', label: 'Connect & Collaborate', icon: MessageSquare, type: 'Chapter', action: () => navigateTo('connect') },
  ].filter((s) => !trimmed || s.label.toLowerCase().includes(trimmed));

  // Projects
  const projectItems: CommandItem[] = projectsData
    .filter(
      (p) =>
        !trimmed ||
        p.title.toLowerCase().includes(trimmed) ||
        p.tagline.toLowerCase().includes(trimmed) ||
        p.domain.toLowerCase().includes(trimmed)
    )
    .map((p) => ({
      id: `p-${p.id}`,
      label: p.title,
      sublabel: p.domain,
      icon: FolderGit2,
      type: 'Project',
      action: () => {
        onSelectProject(p.id);
        onClose();
      },
    }));

  // Technologies
  const techItems: CommandItem[] = allTechnologies
    .filter((t) => !trimmed || t.name.toLowerCase().includes(trimmed))
    .slice(0, 5)
    .map((t) => ({
      id: `t-${t.name}`,
      label: t.name,
      sublabel: t.category,
      icon: Network,
      type: 'Tech',
      action: () => navigateTo('intelligence'),
    }));

  const allResults: CommandItem[] = [...sectionItems, ...projectItems, ...techItems];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#0A110D] text-[#F4FBF7] border border-emerald-500/30 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.9)] overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-emerald-500/20 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search chapters, projects, technologies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-emerald-500/40 text-sm font-mono focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-emerald-400 hover:text-white hover:bg-emerald-950/40"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {allResults.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-emerald-400/60">
              No matching records located for &ldquo;{query}&rdquo;
            </div>
          ) : (
            allResults.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full p-3 rounded-xl hover:bg-emerald-950/40 flex items-center justify-between text-left transition-colors group cursor-pointer border border-transparent hover:border-emerald-500/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#0E1813] border border-emerald-500/25 text-emerald-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-heading font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {item.label}
                      </div>
                      {item.sublabel && (
                        <div className="text-[10px] font-mono text-emerald-400/70">
                          {item.sublabel}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                      {item.type}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="p-3 border-t border-emerald-500/20 bg-[#0E1813] flex items-center justify-between text-[10px] font-mono text-emerald-400/70">
          <div className="flex items-center gap-2">
            <span>PRESS ESC TO CLOSE</span>
            <span>•</span>
            <span>ENTER TO SELECT</span>
          </div>
          <div>ZERO-TRUST SEARCH KERNEL</div>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
