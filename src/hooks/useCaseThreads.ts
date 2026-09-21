import { useCallback, useState } from 'react';
import type { UIMessage } from 'ai';

export type CaseThread = {
  id: string;
  title: string;
  updatedAt: number;
  messages: UIMessage[];
};

const STORAGE_KEY = 'pdgpt_case_threads_v1';

const isBrowser = () => typeof window !== 'undefined';

const newId = () =>
  isBrowser() && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);

const readThreads = (): CaseThread[] => {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t) => t && typeof t.id === 'string')
      .map((t) => ({
        id: t.id as string,
        title: typeof t.title === 'string' ? t.title : 'New case',
        updatedAt: typeof t.updatedAt === 'number' ? t.updatedAt : Date.now(),
        messages: Array.isArray(t.messages) ? (t.messages as UIMessage[]) : [],
      }))
      .sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
};

const writeThreads = (threads: CaseThread[]) => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  } catch {
    /* storage full or unavailable — chat still works for this session */
  }
};

export const makeCaseThread = (): CaseThread => ({
  id: newId(),
  title: 'New case',
  updatedAt: Date.now(),
  messages: [],
});

const titleFromMessages = (messages: UIMessage[], fallback: string) => {
  const firstUser = messages.find((m) => m.role === 'user');
  if (!firstUser) return fallback;
  const text = (firstUser.parts ?? [])
    .map((p) => (p.type === 'text' ? p.text : ''))
    .join(' ')
    .trim();
  if (!text) return fallback;
  return text.length > 44 ? `${text.slice(0, 44)}…` : text;
};

export function useCaseThreads() {
  const [threads, setThreads] = useState<CaseThread[]>(() => readThreads());

  const commit = useCallback((next: CaseThread[]) => {
    const sorted = [...next].sort((a, b) => b.updatedAt - a.updatedAt);
    writeThreads(sorted);
    setThreads(sorted);
    return sorted;
  }, []);

  const createThread = useCallback(() => {
    const thread = makeCaseThread();
    commit([thread, ...readThreads()]);
    return thread;
  }, [commit]);

  const ensureThread = useCallback(() => {
    const existing = readThreads();
    if (existing.length > 0) {
      commit(existing);
      return existing[0];
    }
    const thread = makeCaseThread();
    commit([thread]);
    return thread;
  }, [commit]);

  const deleteThread = useCallback(
    (id: string) => commit(readThreads().filter((t) => t.id !== id)),
    [commit],
  );

  const saveMessages = useCallback(
    (id: string, messages: UIMessage[]) => {
      const existing = readThreads();
      const current = existing.find((t) => t.id === id);
      const base: CaseThread = current ?? { ...makeCaseThread(), id };
      const updated: CaseThread = {
        ...base,
        messages,
        title: titleFromMessages(messages, base.title),
        updatedAt: Date.now(),
      };
      commit([updated, ...existing.filter((t) => t.id !== id)]);
    },
    [commit],
  );

  const getThread = useCallback(
    (id?: string) => (id ? threads.find((t) => t.id === id) : undefined),
    [threads],
  );

  return { threads, createThread, ensureThread, deleteThread, saveMessages, getThread };
}
