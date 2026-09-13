'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  X,
  Award,
  CheckCircle2,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  FileText,
  Copy,
  Check,
  Sparkles,
  Lock,
  User,
  Calendar,
  Building2,
  GraduationCap,
} from 'lucide-react';
import { Certification } from '@/types';
import { soundFX } from '@/lib/audio';

interface CertificateModalProps {
  cert: Certification | null;
  allCerts: Certification[];
  isOpen: boolean;
  onClose: () => void;
  onSelectCert: (cert: Certification) => void;
}

export function CertificateModal({
  cert,
  allCerts,
  isOpen,
  onClose,
  onSelectCert,
}: CertificateModalProps) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'pdf'>('preview');

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !cert) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const currentIndex = allCerts.findIndex((c) => c.id === cert.id);
        if (currentIndex < allCerts.length - 1) {
          soundFX.playClick();
          onSelectCert(allCerts[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = allCerts.findIndex((c) => c.id === cert.id);
        if (currentIndex > 0) {
          soundFX.playClick();
          onSelectCert(allCerts[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, cert, allCerts, onClose, onSelectCert]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      soundFX.playModalOpen();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !cert) return null;

  const currentIndex = allCerts.findIndex((c) => c.id === cert.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allCerts.length - 1;

  const handleCopyId = () => {
    if (cert.credentialId) {
      navigator.clipboard.writeText(cert.credentialId);
      setCopied(true);
      soundFX.playClick();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      {/* Backdrop click to close */}
      <div
        className="absolute inset-0"
        onClick={() => {
          soundFX.playClick();
          onClose();
        }}
      />

      {/* Modal Window */}
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] bg-[#0A110D] border border-emerald-500/40 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.25)] flex flex-col overflow-hidden text-[#F4FBF7]">
        
        {/* ── TOP HEADER / CLEARANCE HUD ── */}
        <div className="p-4 sm:p-5 border-b border-emerald-500/25 bg-[#060D09] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 uppercase tracking-wider font-semibold">
                  VERIFIED CREDENTIAL ARCHIVE
                </span>
                <span className="font-mono text-[10px] text-emerald-400/70 hidden sm:inline">
                  [{currentIndex + 1} OF {allCerts.length}]
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-heading font-extrabold text-white tracking-tight mt-0.5 line-clamp-1">
                {cert.title}
              </h2>
            </div>
          </div>

          {/* Close & Navigation Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Prev */}
            <button
              onClick={() => {
                if (hasPrev) {
                  soundFX.playClick();
                  onSelectCert(allCerts[currentIndex - 1]);
                }
              }}
              disabled={!hasPrev}
              className={`p-2 rounded-lg border font-mono text-xs flex items-center transition-all ${
                hasPrev
                  ? 'border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/50 hover:text-white cursor-pointer'
                  : 'border-emerald-500/10 text-emerald-900 cursor-not-allowed opacity-40'
              }`}
              title="Previous Certificate (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next */}
            <button
              onClick={() => {
                if (hasNext) {
                  soundFX.playClick();
                  onSelectCert(allCerts[currentIndex + 1]);
                }
              }}
              disabled={!hasNext}
              className={`p-2 rounded-lg border font-mono text-xs flex items-center transition-all ${
                hasNext
                  ? 'border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/50 hover:text-white cursor-pointer'
                  : 'border-emerald-500/10 text-emerald-900 cursor-not-allowed opacity-40'
              }`}
              title="Next Certificate (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              className="p-2 rounded-lg border border-emerald-500/30 text-emerald-400/80 hover:text-white hover:bg-emerald-950/60 transition-all cursor-pointer ml-1"
              title="Close Verification Modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── MODAL BODY: SPLIT VIEW (DOCUMENT PREVIEW + METADATA DOSSIER) ── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
          
          {/* Main Grid: Left Document Frame, Right Clearance Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Certificate Document Container (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400/80">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AUTHENTIC CERTIFICATE RECORD</span>
                </div>
                {cert.pdfUrl && (
                  <div className="flex items-center gap-1 bg-[#060D09] border border-emerald-500/20 p-0.5 rounded-lg">
                    <button
                      onClick={() => {
                        soundFX.playClick();
                        setViewMode('preview');
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                        viewMode === 'preview'
                          ? 'bg-emerald-600 text-white font-semibold'
                          : 'text-emerald-400/70 hover:text-white'
                      }`}
                    >
                      HD Image
                    </button>
                    <button
                      onClick={() => {
                        soundFX.playClick();
                        setViewMode('pdf');
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                        viewMode === 'pdf'
                          ? 'bg-emerald-600 text-white font-semibold'
                          : 'text-emerald-400/70 hover:text-white'
                      }`}
                    >
                      Interactive PDF
                    </button>
                  </div>
                )}
              </div>

              {/* Certificate Document Display */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-white/5 shadow-2xl group">
                {viewMode === 'preview' && cert.previewImage ? (
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-white flex items-center justify-center overflow-hidden">
                    <Image
                      src={cert.previewImage}
                      alt={cert.title}
                      width={1200}
                      height={800}
                      className="w-full h-full object-contain select-none"
                      priority
                    />
                    {/* Watermark badge on hover */}
                    <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-emerald-950/90 border border-emerald-500/40 rounded-md text-[10px] font-mono text-emerald-300 flex items-center gap-1.5 shadow-md">
                      <Lock className="w-3 h-3 text-emerald-400" />
                      <span>OFFICIAL DIGITAL RECORD</span>
                    </div>
                  </div>
                ) : cert.pdfUrl ? (
                  <div className="w-full h-[380px] sm:h-[480px] bg-[#0A110D]">
                    <iframe
                      src={`${cert.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                      className="w-full h-full border-0 rounded-2xl"
                      title={cert.title}
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[4/3] bg-[#0E1813] flex flex-col items-center justify-center p-6 text-center space-y-2">
                    <Award className="w-12 h-12 text-emerald-400 animate-pulse" />
                    <div className="font-heading font-bold text-white text-base">{cert.title}</div>
                    <div className="font-mono text-xs text-emerald-400/70">Verified Credential Record</div>
                  </div>
                )}
              </div>

              {/* Document Actions: Download PDF & Open View */}
              {cert.pdfUrl && (
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={cert.pdfUrl}
                    download
                    onClick={() => soundFX.playClick()}
                    className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#047857] to-[#10B981] hover:brightness-110 text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD CERTIFICATE PDF</span>
                  </a>

                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playClick()}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1813] border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-white text-xs font-mono font-semibold transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>OPEN PDF DIRECTLY</span>
                  </a>
                </div>
              )}
            </div>

            {/* Right Column: Verification Metadata Dossier (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Verification Status Card */}
              <div className="p-4 rounded-2xl bg-[#060D09] border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                    SECURITY VERIFICATION STATUS
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    AUTHENTICATED
                  </span>
                </div>

                {/* Recipient */}
                <div className="p-3 rounded-xl bg-[#0E1813] border border-emerald-500/20 flex items-start gap-2.5">
                  <User className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono text-emerald-400/70">AWARDED TO</div>
                    <div className="font-heading font-bold text-white text-sm">
                      {cert.recipientName || 'Sridharshini S'}
                    </div>
                  </div>
                </div>

                {/* Issuer & Authority */}
                <div className="p-3 rounded-xl bg-[#0E1813] border border-emerald-500/20 flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono text-emerald-400/70">ISSUING INSTITUTION & PROGRAM</div>
                    <div className="font-heading font-semibold text-emerald-200 text-xs sm:text-sm">
                      {cert.issuer}
                    </div>
                  </div>
                </div>

                {/* Instructor / Signatory */}
                {cert.instructor && (
                  <div className="p-3 rounded-xl bg-[#0E1813] border border-emerald-500/20 flex items-start gap-2.5">
                    <GraduationCap className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono text-emerald-400/70">INSTRUCTOR / SIGNATORY</div>
                      <div className="font-mono font-medium text-white text-xs">
                        {cert.instructor}
                      </div>
                    </div>
                  </div>
                )}

                {/* Completion Date */}
                <div className="p-3 rounded-xl bg-[#0E1813] border border-emerald-500/20 flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono text-emerald-400/70">COMPLETION DATE</div>
                    <div className="font-mono font-medium text-white text-xs">
                      {cert.completionDate || cert.date}
                    </div>
                  </div>
                </div>

                {/* Certificate ID & Copy */}
                {cert.credentialId && (
                  <div className="p-3 rounded-xl bg-[#0E1813] border border-emerald-500/20 space-y-1.5">
                    <div className="text-[10px] font-mono text-emerald-400/70">CREDENTIAL ID (HASH KEY)</div>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-[11px] font-mono text-emerald-300 break-all select-all">
                        {cert.credentialId}
                      </code>
                      <button
                        onClick={handleCopyId}
                        className="p-1.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 hover:text-white transition-colors cursor-pointer shrink-0"
                        title="Copy Certificate ID"
                      >
                        {copied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Skills Validated */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#060D09] border border-emerald-500/30 space-y-2.5">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                    VALIDATED TECHNICAL CAPABILITIES
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono text-emerald-200 bg-[#0E1813] border border-emerald-500/30 px-2.5 py-1 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="p-4 rounded-2xl bg-[#060D09] border border-emerald-500/30 space-y-1.5">
                <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  SYLLABUS & EVALUATION CRITERIA
                </div>
                <p className="text-xs text-emerald-300/80 leading-relaxed font-sans">
                  {cert.description}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ── BOTTOM HUD FOOTER ── */}
        <div className="p-3 sm:p-4 border-t border-emerald-500/25 bg-[#060D09] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-emerald-400/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>ZERO-TRUST IMMUTABLE AUDIT TRAIL • CIT & CISCO NETWORKING ACADEMY</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-emerald-500/60">
              Use ← → arrow keys to navigate
            </span>
            <button
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 hover:text-white font-mono text-xs cursor-pointer transition-all"
            >
              CLOSE DOSSIER
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CertificateModal;

