import { resolveMockAnswer } from "@/lib/mock-answers";
import type {
  ChatMode,
  ChatServiceRequest,
  ChatServiceResponse,
} from "@/types/chat";

/**
 * Camada de serviço do chat.
 *
 * Nesta versão, opera em modo `mock` retornando respostas simuladas a partir
 * de `src/lib/mock-answers.ts`. A arquitetura está preparada para, em uma
 * versão futura, alternar para `api` — que fará POST para uma rota/função
 * executada no servidor. Nenhuma chave de API é utilizada ou exposta aqui.
 *
 * Regras da futura integração real (documentadas em docs/arquitetura.md):
 *  - a integração com a OpenAI ocorrerá apenas no servidor;
 *  - `OPENAI_API_KEY` NUNCA poderá usar o prefixo `VITE_`;
 *  - a chave nunca deverá ser enviada ao navegador;
 *  - o endpoint deverá validar entrada e retornar somente `{ resposta, fontes: string[] }`.
 */

export function getChatMode(): ChatMode {
  const raw = (import.meta.env.VITE_CHAT_MODE as string | undefined)?.trim();
  return raw === "api" ? "api" : "mock";
}

const MOCK_DELAY_MS = 900;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function askAssistant(
  request: ChatServiceRequest,
): Promise<ChatServiceResponse> {
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

  // Ponto de extensão para a integração real (a ser implementado em versão futura):
  //
  // const res = await fetch("/api/chat", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ pergunta, historico: request.historico }),
  // });
  // if (!res.ok) throw new Error("Falha ao consultar o assistente.");
  // return (await res.json()) as ChatServiceResponse;

  throw new Error(
    "Integração com IA real ainda não configurada nesta versão. Utilize o modo de demonstração.",
  );
}
