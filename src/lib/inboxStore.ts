import fs from 'fs';
import path from 'path';
import os from 'os';

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

const LOCAL_DATA_PATH = path.join(process.cwd(), 'src', 'data', 'inbox_messages.json');
const TMP_DATA_PATH = path.join(os.tmpdir(), 'sridharshini_inbox_messages.json');

// In-memory cache for fast access and fallback in immutable serverless runtimes
let memoryStore: InboxMessage[] | null = null;

function getStoreFilePath(): string {
  // Check if local data file is writable/exists
  try {
    if (fs.existsSync(LOCAL_DATA_PATH)) {
      return LOCAL_DATA_PATH;
    }
    // If not, write to tmp directory
    return TMP_DATA_PATH;
  } catch {
    return TMP_DATA_PATH;
  }
}

export function readInboxMessages(): InboxMessage[] {
  if (memoryStore !== null) {
    return [...memoryStore];
  }

  // 1. Try local data file
  try {
    if (fs.existsSync(LOCAL_DATA_PATH)) {
      const content = fs.readFileSync(LOCAL_DATA_PATH, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        memoryStore = parsed;
        return [...memoryStore];
      }
    }
  } catch (err) {
    console.warn('[InboxStore] Error reading local data path:', err);
  }

  // 2. Try temp file
  try {
    if (fs.existsSync(TMP_DATA_PATH)) {
      const content = fs.readFileSync(TMP_DATA_PATH, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        memoryStore = parsed;
        return [...memoryStore];
      }
    }
  } catch (err) {
    console.warn('[InboxStore] Error reading tmp path:', err);
  }

  // 3. Fallback default
  const defaultList: InboxMessage[] = [
    {
      id: 'disp-sys-001',
      name: 'CIT Security Telemetry Daemon',
      email: 'security@cit-cyber.internal',
      subject: 'Portfolio Backend Dispatch Subsystem Initialized',
      message:
        'Zero-Trust Dispatch Terminal is fully online. All incoming transmissions sent through the Connect interface are recorded securely in this portfolio backend inbox with timestamp and IP telemetry.',
      timestamp: new Date().toISOString(),
      status: 'read',
      channel: 'web_dispatch',
    },
  ];

  memoryStore = defaultList;
  return [...memoryStore];
}

export function saveInboxMessages(messages: InboxMessage[]): boolean {
  memoryStore = [...messages];
  let saved = false;

  // Try saving to local file
  try {
    const jsonStr = JSON.stringify(messages, null, 2);
    fs.writeFileSync(LOCAL_DATA_PATH, jsonStr, 'utf-8');
    saved = true;
  } catch {
    // Expected on read-only serverless filesystems
  }

  // Also try saving to tmp directory for serverless persistence across executions
  try {
    const jsonStr = JSON.stringify(messages, null, 2);
    fs.writeFileSync(TMP_DATA_PATH, jsonStr, 'utf-8');
    saved = true;
  } catch (err) {
    console.warn('[InboxStore] Error writing to tmp data path:', err);
  }

  return saved;
}

export function addInboxMessage(input: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  ip?: string;
}): InboxMessage {
  const current = readInboxMessages();
  const id = `disp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const newMessage: InboxMessage = {
    id,
    name: input.name.trim(),
    email: input.email.trim(),
    subject: (input.subject && input.subject.trim().length > 0)
      ? input.subject.trim()
      : `Portfolio Dispatch from ${input.name.trim()}`,
    message: input.message.trim(),
    timestamp: new Date().toISOString(),
    ip: input.ip || '127.0.0.1',
    status: 'unread',
    channel: 'web_dispatch',
  };

  const updated = [newMessage, ...current];
  saveInboxMessages(updated);

  return newMessage;
}

export function updateInboxMessageStatus(
  id: string,
  status: InboxMessage['status']
): InboxMessage | null {
  const current = readInboxMessages();
  const index = current.findIndex((m) => m.id === id);

  if (index === -1) return null;

  current[index] = {
    ...current[index],
    status,
  };

  saveInboxMessages(current);
  return current[index];
}

export function deleteInboxMessage(id: string): boolean {
  const current = readInboxMessages();
  const filtered = current.filter((m) => m.id !== id);

  if (filtered.length === current.length) return false;

  saveInboxMessages(filtered);
  return true;
}

export function getInboxStats() {
  const messages = readInboxMessages();
  const unreadCount = messages.filter((m) => m.status === 'unread').length;
  return {
    total: messages.length,
    unreadCount,
  };
}

