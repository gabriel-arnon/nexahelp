import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatConversation, ChatMessage } from "@/types/chat";

const CURRENT_KEY = "nexahelp:current-session";
const ARCHIVE_KEY = "nexahelp:conversations";

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function newConversation(): ChatConversation {
  const now = Date.now();
  return { id: makeId(), createdAt: now, updatedAt: now, messages: [] };
}

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

function removeKey(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function useChatSession() {
  const [current, setCurrent] = useState<ChatConversation>(() => newConversation());
  const [archive, setArchive] = useState<ChatConversation[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const persistRef = useRef(false);

  // Hydrate from localStorage on mount (client-only, avoids SSR mismatch)
  useEffect(() => {
    const savedCurrent = readJSON<ChatConversation | null>(CURRENT_KEY, null);
    const savedArchive = readJSON<ChatConversation[]>(ARCHIVE_KEY, []);
    if (savedCurrent && Array.isArray(savedCurrent.messages)) {
      setCurrent(savedCurrent);
    }
    setArchive(Array.isArray(savedArchive) ? savedArchive : []);
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist changes after hydration
  useEffect(() => {
    if (!hydrated) return;
    writeJSON(CURRENT_KEY, current);
  }, [current, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    writeJSON(ARCHIVE_KEY, archive);
  }, [archive, hydrated]);

  const appendMessage = useCallback((message: ChatMessage) => {
    setCurrent((prev) => ({
      ...prev,
      updatedAt: Date.now(),
      messages: [...prev.messages, message],
    }));
  }, []);

  const updateMessage = useCallback(
    (id: string, updater: (m: ChatMessage) => ChatMessage) => {
      setCurrent((prev) => ({
        ...prev,
        updatedAt: Date.now(),
        messages: prev.messages.map((m) => (m.id === id ? updater(m) : m)),
      }));
    },
    [],
  );

  const removeMessage = useCallback((id: string) => {
    setCurrent((prev) => ({
      ...prev,
      updatedAt: Date.now(),
      messages: prev.messages.filter((m) => m.id !== id),
    }));
  }, []);

  // Archives current only if it has at least one message
  const startNewConversation = useCallback(() => {
    setCurrent((prev) => {
      if (prev.messages.length > 0) {
        setArchive((prevArchive) => {
          const withoutDup = prevArchive.filter((c) => c.id !== prev.id);
          return [prev, ...withoutDup];
        });
      }
      return newConversation();
    });
  }, []);

  const openConversation = useCallback((id: string) => {
    persistRef.current = true;
    setArchive((prevArchive) => {
      const target = prevArchive.find((c) => c.id === id);
      if (!target) return prevArchive;
      let newArchive = prevArchive.filter((c) => c.id !== id);
      setCurrent((prevCurrent) => {
        if (prevCurrent.messages.length > 0 && prevCurrent.id !== id) {
          newArchive = [prevCurrent, ...newArchive.filter((c) => c.id !== prevCurrent.id)];
        }
        return target;
      });
      return newArchive;
    });
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setArchive((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // Removes ALL stored conversations (current and archive) and resets to empty
  const clearAllHistory = useCallback(() => {
    removeKey(CURRENT_KEY);
    removeKey(ARCHIVE_KEY);
    setArchive([]);
    setCurrent(newConversation());
  }, []);

  return {
    current,
    archive,
    hydrated,
    appendMessage,
    updateMessage,
    removeMessage,
    startNewConversation,
    openConversation,
    deleteConversation,
    clearAllHistory,
    makeId,
  };
}
