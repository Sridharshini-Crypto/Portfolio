'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { certificationsData } from '@/data/certifications';
import { CertificateModal } from './CertificateModal';
import { Certification } from '@/types';
import { soundFX } from '@/lib/audio';
import { ScrambleText } from '@/components/cyber/ScrambleText';

export function TheArchive() {
  const [filter, setFilter] = useState<'all' | 'cybersecurity' | 'networking' | 'ai' | 'programming'>('all');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [expandedCertId, setExpandedCertId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleExpand = (id: string) => {
    soundFX.playClick();
    setExpandedCertId(expandedCertId === id ? null : id);
  };

  const handleOpenVerify = (cert: Certification) => {
    soundFX.playClick();
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const filteredCerts = certificationsData.filter((cert) => {
    if (filter === 'all') return true;
    return cert.category === filter;
  });

  return (
    <section id="archive" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-10 text-[#F4FBF7]">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-emerald-500/25 pb-6 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-emerald-300 bg-emerald-950/70 px-3.5 py-1 rounded-full border border-emerald-500/40 font-semibold tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>06 // THE ARCHIVE</span>
            </span>
            <span className="text-xs font-mono text-emerald-400/70 hidden sm:inline">
              7 VERIFIED CREDENTIALS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            <ScrambleText text="ALWAYS LEARNING" triggerOnHover={true} />
          </h2>
          <p className="text-sm sm:text-base text-emerald-300/80 max-w-2xl leading-relaxed font-sans font-light">
            Verified credentials from Chennai Institute of Technology (CIT), Cisco Networking Academy, and Python Institute.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-[#0A110D] border border-emerald-500/30 rounded-xl shadow-xs self-start md:self-auto overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'ALL (7)' },
            { id: 'ai', label: 'AI & DATA' },
            { id: 'cybersecurity', label: 'CYBERSECURITY' },
            { id: 'networking', label: 'NETWORKING' },
            { id: 'programming', label: 'PYTHON' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playClick();
                setFilter(tab.id as typeof filter);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-[#047857] to-[#10B981] text-white shadow-xs font-semibold'
                  : 'text-emerald-400/70 hover:text-white hover:bg-emerald-950/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCerts.map((cert) => {
          const isExpanded = expandedCertId === cert.id;
          return (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-[#0A110D] border border-emerald-500/25 hover:border-emerald-400 hover:shadow-[0_4px_28px_rgba(16,185,129,0.2)] transition-all duration-200 flex flex-col justify-between space-y-4 group relative"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-300 uppercase bg-emerald-950/70 px-2.5 py-0.5 rounded border border-emerald-500/30 font-semibold">
                    {cert.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400/80">
                    {cert.completionDate || cert.date}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-white text-base sm:text-lg group-hover:text-emerald-300 transition-colors leading-snug">
                    <ScrambleText text={cert.title} triggerOnHover={true} />
                  </h3>
                  <div className="text-xs font-mono text-emerald-400 font-medium">
                    {cert.issuer}
                  </div>
                </div>

                {cert.credentialId && (
                  <div className="text-[10px] font-mono text-emerald-400/70 truncate bg-[#050807] px-2.5 py-1 rounded border border-emerald-500/20">
                    ID: {cert.credentialId}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenVerify(cert)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#047857] to-[#10B981] hover:brightness-110 text-white font-mono text-xs font-bold uppercase transition-all shadow-xs cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>VERIFY</span>
                </button>

                <button
                  onClick={() => toggleExpand(cert.id)}
                  className="p-2 rounded-xl border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 hover:text-white hover:bg-emerald-950/40 transition-colors cursor-pointer"
                  title="Toggle Skills"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {isExpanded && cert.skills && (
                <div className="pt-3 space-y-2 border-t border-emerald-500/15 animate-fade-in">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                    Validated Competencies:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-emerald-300 bg-[#0E1813] border border-emerald-500/25 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <CertificateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cert={selectedCert}
        allCerts={certificationsData}
        onSelectCert={(c) => setSelectedCert(c)}
      />
    </section>
  );
}

export default TheArchive;
