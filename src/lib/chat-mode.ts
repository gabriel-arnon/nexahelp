import type { ChatMode } from "@/types/chat";

export function getChatMode(): ChatMode {
  const raw = (import.meta.env.VITE_CHAT_MODE as string | undefined)?.trim();
  return raw === "api" ? "api" : "mock";
}

export function isApiChatMode(): boolean {
  return getChatMode() === "api";
}
