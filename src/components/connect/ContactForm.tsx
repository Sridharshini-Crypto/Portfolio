'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { soundFX } from '@/lib/audio';
import { profileData } from '@/data/profile';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Spam trap
  });

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side honeypot trap
    if (formData.honeypot) {
      setFormState('success');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please provide your name, email, and a message.');
      setFormState('error');
      return;
    }

    setFormState('submitting');
    soundFX.playClick();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Technical Inquiry',
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormState('success');
        soundFX.playVaultUnlock();
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      } else {
        setErrorMessage(data.error || 'Unable to transmit message. Please launch your mail client directly.');
        setFormState('error');
      }
    } catch {
      setErrorMessage('Network transmission error. You can email directly at ' + profileData.socials.email);
      setFormState('error');
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-[#0A110D] border border-emerald-500/25 rounded-2xl shadow-xs space-y-6">
      <div className="space-y-1 border-b border-emerald-500/20 pb-4">
        <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
          DISPATCH TRANSMITTER // DIRECT API
        </div>
        <h3 className="text-xl font-heading font-extrabold text-white">
          Send a Secure Message
        </h3>
        <p className="text-xs text-emerald-300/80">
          Messages are dispatched directly to Sridharshini&apos;s verified inbox.
        </p>
      </div>

      {formState === 'success' ? (
        <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3 animate-fade-in">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-heading font-bold text-white">
            Transmission Confirmed
          </h4>
          <p className="text-xs text-emerald-300/85 max-w-sm mx-auto">
            Thank you for reaching out. Sridharshini has received your dispatch and will respond promptly.
          </p>
          <button
            onClick={() => setFormState('idle')}
            className="px-4 py-1.5 rounded-lg bg-[#0E1813] border border-emerald-500/30 text-xs font-mono text-emerald-300 hover:bg-emerald-950/40 cursor-pointer"
          >
            Send Another Dispatch
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot hidden input */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-emerald-300/85">
                YOUR NAME *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Dr. Alex Vance"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1813] border border-emerald-500/30 text-xs font-mono text-white placeholder-emerald-500/40 outline-none focus:border-emerald-400 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-emerald-300/85">
                YOUR EMAIL *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. alex@institution.org"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1813] border border-emerald-500/30 text-xs font-mono text-white placeholder-emerald-500/40 outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-emerald-300/85">
              SUBJECT
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Cyber Security Collaboration / Opportunity"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1813] border border-emerald-500/30 text-xs font-mono text-white placeholder-emerald-500/40 outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-emerald-300/85">
              MESSAGE *
            </label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message, collaboration brief, or inquiry details..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1813] border border-emerald-500/30 text-xs font-mono text-white placeholder-emerald-500/40 outline-none focus:border-emerald-400 transition-colors resize-none"
            />
          </div>

          {formState === 'error' && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center gap-2 text-xs font-mono text-emerald-300">
              <AlertTriangle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={formState === 'submitting'}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#047857] to-[#10B981] hover:brightness-110 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_14px_rgba(16,185,129,0.3)] transition-all cursor-pointer disabled:opacity-50"
          >
            {formState === 'submitting' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>DISPATCHING TELEMETRY...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>DISPATCH MESSAGE</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
