'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  X,
  ShieldCheck,
  Check,
  Award,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { profileData } from '@/data/profile';
import { projectsData } from '@/data/projects';
import { certificationsData } from '@/data/certifications';
import { soundFX } from '@/lib/audio';
import { copyToClipboard } from '@/lib/utils';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    soundFX.playClick();
    copyToClipboard(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] bg-[#0A110D] text-[#F4FBF7] border border-emerald-500/30 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.9)] overflow-y-auto flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Resume Modal Header */}
        <div className="sticky top-0 z-20 bg-[#0A110D]/95 backdrop-blur-md border-b border-emerald-500/25 px-5 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <FileText className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-mono text-emerald-400 font-bold">
                CURRICULUM VITAE // VERIFIED PROFILE
              </div>
              <div className="text-sm font-heading font-bold text-white">
                SRIDHARSHINI S — RESUME
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct PDF File Download Link (No print dialog) */}
            <a
              href="/SRIDHARSHINI_S_RESUME.pdf"
              download="SRIDHARSHINI_S_RESUME.pdf"
              onClick={() => soundFX.playClick()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#047857] to-[#10B981] hover:brightness-110 text-white text-xs font-mono font-bold shadow-[0_0_14px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
              title="Download Sridharshini's Verified Resume PDF"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>

            {/* Close Button */}
            <button
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg hover:bg-emerald-950/50 text-emerald-400/80 hover:text-white border border-emerald-500/30 cursor-pointer"
              aria-label="Close Resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet Content */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Header Profile Summary */}
          <div className="border-b border-emerald-500/20 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  SRIDHARSHINI S
                </h1>
                <p className="text-sm font-mono text-emerald-400 font-semibold mt-0.5">
                  Computer Science & Engineering — Cyber Security Specialization
                </p>
              </div>
              <div className="text-left sm:text-right text-xs font-mono text-emerald-400/80 space-y-0.5">
                <div>Chennai Institute of Technology</div>
                <div className="text-emerald-300 font-bold">9.07 CGPA</div>
                <div>{profileData.socials.email}</div>
                <div>Chennai, Tamil Nadu, India</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-300/85 leading-relaxed">
              {profileData.bio}
            </p>
          </div>

          {/* Academic Background with Exact Percentages */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Academic Education</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* College */}
              <div className="p-4 rounded-xl bg-[#0E1813] border border-emerald-500/25 space-y-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-emerald-300 font-bold">9.07 CGPA</span>
                  <span className="text-emerald-500/70">2026 — Present</span>
                </div>
                <div className="font-heading font-bold text-xs text-white">
                  B.E. CSE (Cyber Security)
                </div>
                <div className="text-[11px] text-emerald-400/75">
                  Chennai Institute of Technology
                </div>
              </div>

              {/* 12th Grade */}
              <div className="p-4 rounded-xl bg-[#0E1813] border border-emerald-500/25 space-y-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-emerald-300 font-bold">97% Aggregate</span>
                  <span className="text-emerald-500/70">2024 — 2025</span>
                </div>
                <div className="font-heading font-bold text-xs text-white">
                  Higher Secondary (Class XII)
                </div>
                <div className="text-[11px] text-emerald-400/75">
                  School 1st Rank • Mathematics & Science
                </div>
              </div>

              {/* 10th Grade */}
              <div className="p-4 rounded-xl bg-[#0E1813] border border-emerald-500/25 space-y-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-emerald-300 font-bold">95% Aggregate</span>
                  <span className="text-emerald-500/70">2022 — 2023</span>
                </div>
                <div className="font-heading font-bold text-xs text-white">
                  Secondary School (Class X)
                </div>
                <div className="text-[11px] text-emerald-400/75">
                  School 1st Rank • Secondary School
                </div>
              </div>
            </div>
          </div>

          {/* Flagship Technical Projects */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Flagship Engineering Systems (2026)</span>
            </div>
            <div className="space-y-3">
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-xl bg-[#0E1813] border border-emerald-500/25 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-sm text-white">
                        {project.title}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded">
                        {project.status}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-emerald-500/70">{project.year}</span>
                  </div>
                  <p className="text-xs text-emerald-300/80 leading-relaxed">
                    {project.overview}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack[0]?.items.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono text-emerald-200 bg-[#0A110D] border border-emerald-500/30 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience & Leadership */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>Industry Experience & Technical Leadership</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[#0E1813] border border-emerald-500/25 space-y-1">
                <div className="text-xs font-mono text-emerald-400 font-bold">
                  BAEONN, Singapore • Virtual (2026)
                </div>
                <div className="font-heading font-bold text-xs text-white">
                  Full Stack Developer Intern
                </div>
                <p className="text-xs text-emerald-300/80">
                  Developed modular full-stack web applications with React.js, Node.js, and REST APIs in an agile environment.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0E1813] border border-emerald-500/25 space-y-1">
                <div className="text-xs font-mono text-emerald-400 font-bold">
                  Club Asymmetric • CIT (2026 — Present)
                </div>
                <div className="font-heading font-bold text-xs text-white">
                  Secretary & Documentation Lead
                </div>
                <p className="text-xs text-emerald-300/80">
                  Driving technical initiatives, hackathon execution, technical documentation, and web portals for the club.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications Overview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Verified Certifications (Credly, Cisco NetAcad, Python Institute)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certificationsData.slice(0, 6).map((cert) => (
                <div
                  key={cert.id}
                  className="p-2.5 rounded-lg bg-[#0E1813] border border-emerald-500/20 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-white">{cert.title}</div>
                    <div className="text-[10px] font-mono text-emerald-400/70">{cert.issuer}</div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">Verified</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeViewer;
