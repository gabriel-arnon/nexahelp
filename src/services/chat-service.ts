import { getChatMode } from "@/lib/chat-mode";
import { resolveMockAnswer } from "@/lib/mock-answers";
import type { ChatServiceRequest, ChatServiceResponse } from "@/types/chat";

const MOCK_DELAY_MS = 900;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sanitizeHistory(request: ChatServiceRequest) {
  return request.historico
    .filter((message) => !message.error && message.content.trim())
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 2000),
    }));
}

function validateChatResponse(value: unknown): ChatServiceResponse {
  if (
    value &&
    typeof value === "object" &&
    "resposta" in value &&
    "fontes" in value &&
    typeof value.resposta === "string" &&
    Array.isArray(value.fontes) &&
    value.fontes.every((fonte) => typeof fonte === "string")
  ) {
    return { resposta: value.resposta, fontes: value.fontes };
  }

  throw new Error("A resposta do assistente veio em um formato inesperado.");
}

function getFriendlyApiError(status: number): string {
  switch (status) {
    case 400:
      return "Revise sua pergunta e tente novamente.";
    case 429:
      return "Muitas solicitações em pouco tempo. Aguarde alguns minutos e tente novamente.";
    case 502:
      return "O assistente está temporariamente indisponível. Tente novamente em instantes.";
    case 503:
      return "O assistente com IA ainda não está configurado neste ambiente.";
    default:
      return "Não foi possível consultar o assistente agora. Tente novamente mais tarde.";
  }
}

export async function askAssistant(request: ChatServiceRequest): Promise<ChatServiceResponse> {
  const pergunta = request.pergunta.trim();
  if (!pergunta) {
    throw new Error("A pergunta não pode estar vazia.");
  }
  if (pergunta.length > 1000) {
    throw new Error("A pergunta ultrapassa o limite de 1.000 caracteres.");
  }

  const mode = getChatMode();

  if (mode === "mock") {
    await sleep(MOCK_DELAY_MS);
    return resolveMockAnswer(pergunta);
  }

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pergunta, historico: sanitizeHistory(request) }),
  });

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      "O assistente está temporariamente indisponível. Tente novamente em instantes.",
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error("A resposta do assistente veio em um formato inesperado.");
  }

  if (!response.ok) {
    throw new Error(getFriendlyApiError(response.status));
  }

  return validateChatResponse(payload);
}
