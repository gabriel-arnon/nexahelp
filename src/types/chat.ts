export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
  fontes?: string[];
  error?: boolean;
}

export interface ChatServiceResponse {
  resposta: string;
  fontes: string[];
}

export interface ChatServiceRequest {
  pergunta: string;
  historico: ChatMessage[];
}

export interface ChatConversation {
  id: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
}

export type ChatMode = "mock" | "api";
