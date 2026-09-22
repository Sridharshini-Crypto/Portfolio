'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Inbox,
  X,
  Mail,
  RefreshCw,
  Trash2,
  Star,
  CheckCircle2,
  Lock,
  Unlock,
  KeyRound,
  Download,
  Search,
  ExternalLink,
  Shield,
  Copy,
  Clock,
  Send,
  AlertCircle,
} from 'lucide-react';
import { soundFX } from '@/lib/audio';

export interface InboxMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  ip?: string;
  status: 'unread' | 'read' | 'starred' | 'archived';
  channel: 'web_dispatch';
}

const OPERATOR_PINS = ['907', 'sridharshini', 'cit_cyber'];

export function PortfolioInboxModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Check saved session authentication
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = sessionStorage.getItem('portfolio_inbox_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const fetchMessages = useCallback(async (authKey = '907') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/inbox?key=${encodeURIComponent(authKey)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
        if (data.messages.length > 0 && !selectedMessage) {
          setSelectedMessage(data.messages[0]);
        }
      }
    } catch (err) {
      console.error('[InboxModal] fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedMessage]);

  useEffect(() => {
    const handleOpen = () => {
      soundFX.playClick();
      setIsOpen(true);
      if (isAuthenticated) {
        fetchMessages();
      }
    };

    window.addEventListener('open-portfolio-inbox', handleOpen);
    return () => {
      window.removeEventListener('open-portfolio-inbox', handleOpen);
    };
  }, [isAuthenticated, fetchMessages]);

  const handleAuthenticate = (pinToTest?: string) => {
    const key = (pinToTest || pinInput).trim().toLowerCase();
    if (OPERATOR_PINS.includes(key)) {
      soundFX.playAccessGranted();
      setIsAuthenticated(true);
      setPinError('');
      sessionStorage.setItem('portfolio_inbox_auth', 'true');
      fetchMessages(key);
    } else {
      soundFX.playGlitchWarning();
      setPinError('Invalid Operator PIN. Clearance rejected.');
    }
  };

  const handleClose = () => {
    soundFX.playClick();
    setIsOpen(false);
  };

  const handleUpdateStatus = async (id: string, status: InboxMessage['status']) => {
    soundFX.playClick();
    try {
      const res = await fetch('/api/inbox', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-inbox-key': '907',
        },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status } : m))
        );
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (err) {
      console.error('[InboxModal] update status error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dispatch from the portfolio backend?')) return;
    soundFX.playClick();
    try {
      const res = await fetch(`/api/inbox?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'x-inbox-key': '907' },
      });
      const data = await res.json();
      if (data.success) {
        const remaining = messages.filter((m) => m.id !== id);
        setMessages(remaining);
        if (selectedMessage?.id === id) {
          setSelectedMessage(remaining[0] || null);
        }
      }
    } catch (err) {
      console.error('[InboxModal] delete error:', err);
    }
  };

  const handleExportJSON = () => {
    soundFX.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sridharshini_portfolio_dispatches_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSelect = (msg: InboxMessage) => {
    soundFX.playClick();
    setSelectedMessage(msg);
    if (msg.status === 'unread') {
      handleUpdateStatus(msg.id, 'read');
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'unread' && msg.status !== 'unread') return false;
    if (filter === 'starred' && msg.status !== 'starred') return false;
    if (filter === 'archived' && msg.status !== 'archived') return false;
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return (
        msg.name.toLowerCase().includes(q) ||
        msg.email.toLowerCase().includes(q) ||
        msg.subject.toLowerCase().includes(q) ||
        msg.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in font-mono text-emerald-300">
      <div className="relative w-full max-w-5xl h-[88vh] max-h-[850px] bg-[#050B07] border-2 border-emerald-500/50 rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.3)] flex flex-col overflow-hidden">
        {/* Top Terminal Bar */}
        <div className="px-5 py-3.5 bg-[#091710] border-b border-emerald-500/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Inbox className="w-5 h-5 text-emerald-400" />
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-white uppercase">
                PORTFOLIO BACKEND // DISPATCH INBOX
              </span>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold">
                CIT.CYBER [SECURE LOGGING]
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  onClick={() => fetchMessages()}
                  disabled={loading}
                  title="Refresh Dispatches"
                  className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 hover:text-white transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={handleExportJSON}
                  title="Export Dispatches JSON"
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT</span>
                </button>
              </>
            )}
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        {!isAuthenticated ? (
          /* Operator Authentication Gate */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                OPERATOR CLEARANCE REQUIRED
              </h3>
              <p className="text-xs text-emerald-300/80 font-sans leading-relaxed">
                The portfolio backend inbox stores verified recruiter inquiries, technical briefings, and direct dispatches. Please authenticate to view messages.
              </p>
            </div>

            <div className="w-full max-w-sm space-y-3">
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAuthenticate();
                  }}
                  placeholder="Enter Operator PIN (e.g. 907)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09150E] border border-emerald-500/40 text-xs font-mono text-white placeholder-emerald-500/40 outline-none focus:border-emerald-400 text-center tracking-widest"
                />
              </div>

              {pinError && (
                <div className="text-xs text-red-400 flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{pinError}</span>
                </div>
              )}

              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => handleAuthenticate()}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#047857] to-[#10B981] hover:brightness-110 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  AUTHENTICATE OPERATOR
                </button>

                {/* 1-Click Quick Access for Portfolio Owner */}
                <button
                  onClick={() => handleAuthenticate('907')}
                  className="w-full py-2 px-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 hover:text-white text-[11px] font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>QUICK UNLOCK (CLEARANCE: 907)</span>
                </button>
              </div>

              <div className="text-[10px] text-emerald-400/60 pt-2">
                Operator Clearance: 907 (CIT Standing) or sridharshini
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Inbox Dashboard */
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-emerald-500/25">
            {/* Left Column: Dispatches List (Cols 5) */}
            <div className="md:col-span-5 flex flex-col h-full bg-[#050C08] overflow-hidden">
              {/* Search & Filter Bar */}
              <div className="p-3 border-b border-emerald-500/20 space-y-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sender, email, subject..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#09150E] border border-emerald-500/30 text-[11px] text-white placeholder-emerald-500/40 outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="flex items-center gap-1 text-[10px] overflow-x-auto">
                  {(['all', 'unread', 'starred', 'archived'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilter(t)}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer uppercase font-semibold ${
                        filter === t
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-emerald-950/60 text-emerald-400/80 hover:text-white'
                      }`}
                    >
                      {t}
                      {t === 'unread' && unreadCount > 0 && ` (${unreadCount})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message List Scroll Area */}
              <div className="flex-1 overflow-y-auto divide-y divide-emerald-500/10 custom-scrollbar">
                {filteredMessages.length === 0 ? (
                  <div className="p-8 text-center text-xs text-emerald-400/60 space-y-2">
                    <Mail className="w-8 h-8 mx-auto opacity-40" />
                    <div>No dispatches match the selected filter.</div>
                  </div>
                ) : (
                  filteredMessages.map((msg) => {
                    const isSelected = selectedMessage?.id === msg.id;
                    const isUnread = msg.status === 'unread';

                    return (
                      <div
                        key={msg.id}
                        onClick={() => handleSelect(msg)}
                        className={`p-3.5 transition-all cursor-pointer border-l-2 ${
                          isSelected
                            ? 'bg-[#0A1A10] border-emerald-400 text-white'
                            : isUnread
                            ? 'bg-[#07130A] border-emerald-500 text-emerald-100 hover:bg-[#08180D]'
                            : 'border-transparent hover:bg-[#07140B] text-emerald-300/80'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 text-[10px] mb-1">
                          <div className="flex items-center gap-1.5 font-bold truncate">
                            {isUnread && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                            )}
                            <span className="truncate">{msg.name}</span>
                          </div>
                          <span className="text-emerald-500/70 shrink-0 text-[9px]">
                            {new Date(msg.timestamp).toLocaleDateString([], {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>

                        <div className="text-xs font-semibold truncate text-white mb-0.5">
                          {msg.subject}
                        </div>

                        <div className="text-[10px] text-emerald-400/70 line-clamp-1 font-sans">
                          {msg.message}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Dispatch Details (Cols 7) */}
            <div className="md:col-span-7 flex flex-col h-full bg-[#060F09] overflow-hidden">
              {selectedMessage ? (
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  {/* Message Detail Header */}
                  <div className="p-4 sm:p-5 border-b border-emerald-500/20 space-y-3 bg-[#08140C] shrink-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-bold uppercase">
                            DISPATCH ID: {selectedMessage.id}
                          </span>
                          <span className="text-[10px] text-emerald-400/70 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(selectedMessage.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-heading font-extrabold text-white leading-tight break-words">
                          {selectedMessage.subject}
                        </h4>
                      </div>

                      {/* Header Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              selectedMessage.id,
                              selectedMessage.status === 'starred' ? 'read' : 'starred'
                            )
                          }
                          title="Star dispatch"
                          className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 hover:text-yellow-400 transition-colors cursor-pointer"
                        >
                          <Star
                            className={`w-3.5 h-3.5 ${
                              selectedMessage.status === 'starred'
                                ? 'fill-yellow-400 text-yellow-400'
                                : ''
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(selectedMessage.id)}
                          title="Delete dispatch"
                          className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-red-950/80 border border-emerald-500/30 text-emerald-300 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Sender Identity Card */}
                    <div className="p-2.5 rounded-xl bg-[#050C07] border border-emerald-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="space-y-0.5">
                        <div className="text-white font-bold">{selectedMessage.name}</div>
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="text-emerald-400 hover:text-white underline text-[11px] flex items-center gap-1"
                        >
                          <span>{selectedMessage.email}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        {selectedMessage.ip && (
                          <span className="text-[10px] text-emerald-500/80 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
                            IP: {selectedMessage.ip}
                          </span>
                        )}
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                            selectedMessage.email
                          )}&su=${encodeURIComponent(`Re: ${selectedMessage.subject}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundFX.playClick()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#047857] to-[#10B981] text-white font-bold text-[11px] hover:brightness-110 transition-all shadow-xs"
                        >
                          <Send className="w-3 h-3" />
                          <span>REPLY IN GMAIL</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Message Content Body */}
                  <div className="flex-1 p-5 overflow-y-auto space-y-4 custom-scrollbar bg-[#050C07]">
                    <div className="p-4 rounded-xl bg-[#08150D] border border-emerald-500/25 space-y-2">
                      <div className="text-[10px] text-emerald-400/70 uppercase tracking-widest font-semibold flex items-center justify-between">
                        <span>TRANSMISSION PAYLOAD</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedMessage.message);
                            soundFX.playClick();
                            setCopiedId(selectedMessage.id);
                            setTimeout(() => setCopiedId(null), 1800);
                          }}
                          className="text-[10px] text-emerald-300 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === selectedMessage.id ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                              <span>COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>COPY TEXT</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-100 font-sans leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-xs text-emerald-400/60 space-y-2">
                  <Mail className="w-10 h-10 opacity-30" />
                  <div>Select a dispatch from the list to view its complete transmission payload.</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PortfolioInboxModal;
