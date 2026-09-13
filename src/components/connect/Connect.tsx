'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Copy, Check, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { profileData } from '@/data/profile';
import { ContactForm } from './ContactForm';
import { soundFX } from '@/lib/audio';
import { copyToClipboard, getWhatsAppLink } from '@/lib/utils';

export function Connect() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    soundFX.playClick();
    copyToClipboard(profileData.socials.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  const whatsappUrl = getWhatsAppLink(
    profileData.socials.whatsappNumber,
    profileData.defaultWhatsAppMessage
  );

  return (
    <section id="connect" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-12 text-[#F4FBF7]">
      <div className="space-y-3 border-b border-emerald-500/25 pb-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-300 bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-500/40 font-semibold tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CHAPTER 07 // CONNECT & COLLABORATE</span>
          </span>
          <span className="text-xs font-mono text-emerald-400/70 hidden sm:inline">
            DIRECT INQUIRY & COMMUNICATIONS
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
          CONNECT & COLLABORATE
        </h2>
        <p className="text-sm sm:text-base text-emerald-300/80 max-w-2xl leading-relaxed font-sans font-light">
          Open for engineering discussions, aerospace digital twin research, cybersecurity collaborations, and high-assurance systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#0A110D] border border-emerald-500/25 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                <Mail className="w-4 h-4" />
                <span>PRIMARY EMAIL DISPATCH</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg border border-emerald-500/30 bg-[#0E1813] hover:bg-emerald-950/40 text-emerald-400/80 hover:text-white transition-colors text-xs font-mono flex items-center gap-1 cursor-pointer"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[10px]">{copiedEmail ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            <div className="text-base sm:text-lg font-mono font-bold text-white break-all">
              {profileData.socials.email}
            </div>

            <a
              href={`mailto:${profileData.socials.email}?subject=Technical%20Collaboration%20Inquiry%20-%20Sridharshini%20S`}
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-white font-semibold cursor-pointer"
            >
              <span>LAUNCH DEFAULT MAIL CLIENT</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-[#0A110D] border border-emerald-500/25 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
              <MessageSquare className="w-4 h-4" />
              <span>INSTANT ENCRYPTED CHAT</span>
            </div>

            <p className="text-xs text-emerald-300/80 leading-relaxed font-sans">
              Reach out directly on WhatsApp for immediate technical collaboration, inquiries, or hackathon discussions.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-[#047857] via-[#059669] to-[#10B981] hover:brightness-110 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>OPEN WHATSAPP BRIDGE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-[#0A110D] border border-emerald-500/25 shadow-xs space-y-3">
            <div className="text-xs font-mono text-emerald-400 font-semibold uppercase">NETWORK NODES</div>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                className="p-3 rounded-xl bg-[#0E1813] border border-emerald-500/20 hover:border-emerald-400/60 text-emerald-300 hover:text-white flex items-center gap-2.5 transition-all text-xs font-mono"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB</span>
              </a>

              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                className="p-3 rounded-xl bg-[#0E1813] border border-emerald-500/20 hover:border-emerald-400/60 text-emerald-300 hover:text-white flex items-center gap-2.5 transition-all text-xs font-mono"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default Connect;
