import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { buildKnowledgeSearchQuery, searchKnowledgeBase } from "@/lib/knowledge-search";
import { generateAssistantAnswer, ProviderUnavailableError } from "@/server/openai-chat";

const OUT_OF_SCOPE_RESPONSE =
  "Não encontrei informações suficientes na base de conhecimento para responder com segurança. Consulte o setor responsável ou reformule sua pergunta.";

const chatMessageSchema = z
  .object({
    role: z.enum(["user", "assistant"]),
    content: z.string().trim().min(1).max(2000),
  })
  .strip();

const chatRequestSchema = z
  .object({
    pergunta: z.string().trim().min(1).max(1000),
    historico: z.array(chatMessageSchema).max(12).optional().default([]),
  })
  .strip();

const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function jsonError(status: number, code: string, message: string, headers?: HeadersInit): Response {
  return Response.json({ error: { code, message } }, { status, headers });
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwardedFor ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): { allowed: true } | { allowed: false; retryAfter: number } {
  const now = Date.now();

  for (const [key, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) {
      rateLimitBuckets.delete(key);
    }
  }

  const bucket = rateLimitBuckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true };
}

function usefulHistory(
  history: { role: "user" | "assistant"; content: string }[],
  currentQuestion: string,
): { role: "user" | "assistant"; content: string }[] {
  const usefulMessages = history.filter((message) => message.content.trim());
  const lastMessage = usefulMessages.at(-1);

  if (lastMessage?.role === "user" && lastMessage.content.trim() === currentQuestion.trim()) {
    usefulMessages.pop();
  }

  return usefulMessages.slice(-6);
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rateLimit = checkRateLimit(getClientIp(request));
        if (!rateLimit.allowed) {
          return jsonError(
            429,
            "RATE_LIMIT_EXCEEDED",
            "Muitas solicitações em pouco tempo. Aguarde alguns minutos e tente novamente.",
            { "Retry-After": String(rateLimit.retryAfter) },
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return jsonError(400, "INVALID_JSON", "Envie uma requisição JSON válida.");
        }

        const parsed = chatRequestSchema.safeParse(body);
        if (!parsed.success) {
          return jsonError(
            400,
            "INVALID_INPUT",
            "A pergunta deve ter entre 1 e 1.000 caracteres, e o histórico enviado deve ser válido.",
          );
        }

        const history = usefulHistory(parsed.data.historico, parsed.data.pergunta);
        const query = buildKnowledgeSearchQuery(parsed.data.pergunta, history);
        const relevantDocuments = searchKnowledgeBase(query);

        if (relevantDocuments.length === 0) {
          return Response.json({ resposta: OUT_OF_SCOPE_RESPONSE, fontes: [] });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
          return jsonError(
            503,
            "OPENAI_NOT_CONFIGURED",
            "O assistente com IA ainda não está configurado neste ambiente.",
          );
        }

        try {
          const documents = relevantDocuments.map((result) => result.document);
          const resposta = await generateAssistantAnswer({
            apiKey,
            model: process.env.OPENAI_MODEL || "gpt-5-mini",
            question: parsed.data.pergunta,
            history,
            documents,
          });

          return Response.json({
            resposta,
            fontes: documents.slice(0, 3).map((document) => document.id),
          });
        } catch (error) {
          if (error instanceof ProviderUnavailableError) {
            return jsonError(
              502,
              "PROVIDER_UNAVAILABLE",
              "O assistente está temporariamente indisponível. Tente novamente em instantes.",
            );
          }

          return jsonError(
            500,
            "UNEXPECTED_ERROR",
            "Não foi possível processar a solicitação agora. Tente novamente mais tarde.",
          );
        }
      },
    },
  },
});
