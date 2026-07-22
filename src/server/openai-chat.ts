import OpenAI from "openai";
import { ASSISTANT_SYSTEM_PROMPT, buildAssistantInput } from "@/server/assistant-prompt";
import type { KnowledgeDocument } from "@/types/knowledge";

const DEFAULT_MODEL = "gpt-5-mini";
const PROVIDER_TIMEOUT_MS = 20_000;
const MAX_OUTPUT_TOKENS = 700;

export class ProviderUnavailableError extends Error {
  constructor() {
    super("OpenAI provider unavailable");
    this.name = "ProviderUnavailableError";
  }
}

export class ProviderIncompleteError extends Error {
  constructor() {
    super("OpenAI response incomplete");
    this.name = "ProviderIncompleteError";
  }
}

function sanitizeAssistantOutput(text: string): string {
  return text
    .replace(/^.*\bbase de documentos\b.*$/gim, "")
    .replace(/^.*\bfontes?\b.*\b(?:ti|rh|si|fa|pc)-\d{3}\b.*$/gim, "")
    .replace(/\b(?:ti|rh|si|fa|pc)-\d{3}\b/gi, "")
    .replace(/\bprocedimento oficial\b/gi, "procedimento simulado")
    .replace(/\bdocumentos oficiais\b/gi, "documentos fornecidos")
    .replace(/\bbase oficial\b/gi, "base fictícia")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function generateAssistantAnswer(params: {
  apiKey: string;
  model?: string;
  question: string;
  documents: KnowledgeDocument[];
  history: { role: "user" | "assistant"; content: string }[];
}): Promise<string> {
  const client = new OpenAI({ apiKey: params.apiKey });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);

  try {
    const response = await client.responses.create(
      {
        model: params.model?.trim() || DEFAULT_MODEL,
        instructions: ASSISTANT_SYSTEM_PROMPT,
        input: buildAssistantInput(params),
        max_output_tokens: MAX_OUTPUT_TOKENS,
        reasoning: { effort: "low" },
        store: false,
      },
      { signal: controller.signal },
    );

    if (response.status !== "completed") {
      if (response.incomplete_details?.reason === "max_output_tokens") {
        console.warn("OpenAI response incomplete: max_output_tokens");
      } else {
        console.warn(`OpenAI response not completed: ${response.status}`);
      }
      throw new ProviderIncompleteError();
    }

    const text = sanitizeAssistantOutput(response.output_text?.trim() ?? "");
    if (!text) {
      throw new ProviderUnavailableError();
    }
    return text;
  } catch (error) {
    if (error instanceof ProviderUnavailableError) {
      throw error;
    }
    if (error instanceof ProviderIncompleteError) {
      throw error;
    }
    throw new ProviderUnavailableError();
  } finally {
    clearTimeout(timeout);
  }
}
