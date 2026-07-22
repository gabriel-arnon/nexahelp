import { KNOWLEDGE_BASE } from "@/lib/knowledge-base";
import type { ChatMessage } from "@/types/chat";
import type { KnowledgeDocument } from "@/types/knowledge";

export interface ScoredKnowledgeDocument {
  document: KnowledgeDocument;
  score: number;
  matchedTerms: string[];
  strongMatches: number;
  weakMatches: number;
}

const STOPWORDS = new Set([
  "a",
  "ao",
  "aos",
  "as",
  "com",
  "como",
  "da",
  "das",
  "de",
  "do",
  "dos",
  "e",
  "em",
  "eu",
  "me",
  "minha",
  "meu",
  "na",
  "nas",
  "nao",
  "no",
  "nos",
  "o",
  "os",
  "ou",
  "para",
  "por",
  "qual",
  "quais",
  "quando",
  "que",
  "se",
  "sobre",
  "tiver",
  "um",
  "uma",
]);

const LOW_VALUE_TERMS = new Set([
  "acesso",
  "corporativa",
  "corporativo",
  "documento",
  "email",
  "empresa",
  "informacao",
  "informacoes",
  "interna",
  "interno",
  "procedimento",
  "solicitar",
  "sistema",
  "solicitacao",
  "usuario",
]);

const CONTEXTUAL_PATTERNS = [
  /^e\s+/,
  /^nesse caso\b/,
  /^neste caso\b/,
  /^nesse cenário\b/,
  /^neste cenário\b/,
  /^como faco isso\b/,
  /^como fazer isso\b/,
  /^o que devo fazer\b/,
  /^qual e o prazo\b/,
  /^qual o prazo\b/,
  /^e depois\b/,
  /\bisso\b/,
  /\bnesse\b/,
  /\bneste\b/,
  /\bdesse\b/,
  /\bdeste\b/,
];

const MINIMUM_SCORE = 14;
const MAX_RESULTS = 4;

export function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getRelevantTerms(value: string): string[] {
  const normalized = normalizeSearchText(value);
  const terms = normalized
    .split(" ")
    .map((term) => term.trim())
    .filter((term) => term.length >= 3 && !STOPWORDS.has(term) && !LOW_VALUE_TERMS.has(term));

  return Array.from(new Set(terms));
}

export function isContextualFollowUp(question: string): boolean {
  const normalized = normalizeSearchText(question);
  if (!normalized) return false;

  return CONTEXTUAL_PATTERNS.some((pattern) => pattern.test(normalized));
}

export function selectSearchHistory(
  currentQuestion: string,
  history: Pick<ChatMessage, "role" | "content" | "error">[] = [],
): Pick<ChatMessage, "role" | "content">[] {
  if (!isContextualFollowUp(currentQuestion)) {
    return [];
  }

  const lastRelevantQuestion = [...history]
    .reverse()
    .find((message) => message.role === "user" && !message.error && message.content.trim());

  return lastRelevantQuestion ? [lastRelevantQuestion] : [];
}

export function buildKnowledgeSearchQuery(
  currentQuestion: string,
  history: Pick<ChatMessage, "role" | "content" | "error">[] = [],
): string {
  const searchHistory = selectSearchHistory(currentQuestion, history).map((message) =>
    message.content.trim(),
  );

  return [...searchHistory, currentQuestion.trim()].join(" ");
}

function countFieldMatches(fieldValue: string, terms: string[]): string[] {
  const tokens = new Set(normalizeSearchText(fieldValue).split(" ").filter(Boolean));
  return terms.filter((term) => tokens.has(term));
}

function countKeywordMatches(keywords: string[], terms: string[]): string[] {
  return terms.filter((term) =>
    keywords.some((keyword) => {
      const keywordTokens = new Set(normalizeSearchText(keyword).split(" ").filter(Boolean));
      return keywordTokens.has(term);
    }),
  );
}

function getDocumentFrequency(term: string): number {
  return KNOWLEDGE_BASE.reduce((count, document) => {
    const text = normalizeSearchText(
      [
        document.titulo,
        document.descricao,
        document.conteudo,
        document.palavrasChave.join(" "),
      ].join(" "),
    );
    return text.split(" ").includes(term) ? count + 1 : count;
  }, 0);
}

function getTermWeight(term: string): number {
  const frequency = getDocumentFrequency(term);
  if (frequency <= 1) return 1.4;
  if (frequency <= 3) return 1.1;
  if (frequency <= 6) return 0.85;
  return 0.6;
}

function getDomainBoost(
  document: KnowledgeDocument,
  terms: string[],
  normalizedQuery: string,
): number {
  const hasPasswordContext =
    terms.includes("senha") ||
    terms.includes("redefinir") ||
    terms.includes("bloqueada") ||
    terms.includes("bloqueado") ||
    normalizedQuery.includes("conta bloqueada");

  if (!hasPasswordContext) {
    return 0;
  }

  if (document.id === "ti-002") {
    return 16;
  }

  return 0;
}

export function scoreKnowledgeDocument(
  document: KnowledgeDocument,
  query: string,
): ScoredKnowledgeDocument {
  const normalizedQuery = normalizeSearchText(query);
  const terms = getRelevantTerms(query);
  const titleMatches = countFieldMatches(document.titulo, terms);
  const keywordMatches = countKeywordMatches(document.palavrasChave, terms);
  const descriptionMatches = countFieldMatches(document.descricao, terms);
  const contentMatches = countFieldMatches(document.conteudo, terms);
  const matchedTerms = Array.from(
    new Set([...titleMatches, ...keywordMatches, ...descriptionMatches, ...contentMatches]),
  );
  const strongTerms = Array.from(new Set([...titleMatches, ...keywordMatches]));
  const weakTerms = Array.from(new Set([...descriptionMatches, ...contentMatches]));
  const strongMatches = strongTerms.length;
  const weakMatches = weakTerms.filter((term) => !strongTerms.includes(term)).length;
  let score = 0;

  for (const term of titleMatches) score += 12 * getTermWeight(term);
  for (const term of keywordMatches) score += 10 * getTermWeight(term);
  for (const term of descriptionMatches) score += 4 * getTermWeight(term);
  for (const term of contentMatches) score += 1.5 * getTermWeight(term);
  const domainBoost = getDomainBoost(document, terms, normalizedQuery);
  score += domainBoost;

  const normalizedTitle = normalizeSearchText(document.titulo);
  const normalizedDescription = normalizeSearchText(document.descricao);
  const normalizedKeywords = normalizeSearchText(document.palavrasChave.join(" "));
  if (
    terms.length > 1 &&
    (normalizedTitle.includes(normalizedQuery) ||
      normalizedDescription.includes(normalizedQuery) ||
      normalizedKeywords.includes(normalizedQuery))
  ) {
    score += 12;
  }

  if (matchedTerms.length > 1) {
    score += Math.min(matchedTerms.length * 2, 10);
  }

  if (strongMatches === 0 && weakMatches < 2 && domainBoost === 0) {
    score = 0;
  }

  return {
    document,
    score: Math.round(score * 100) / 100,
    matchedTerms,
    strongMatches,
    weakMatches,
  };
}

export function searchKnowledgeBase(
  query: string,
  options: { limit?: number; minimumScore?: number } = {},
): ScoredKnowledgeDocument[] {
  const limit = options.limit ?? MAX_RESULTS;
  const minimumScore = options.minimumScore ?? MINIMUM_SCORE;

  if (getRelevantTerms(query).length === 0) {
    return [];
  }

  return KNOWLEDGE_BASE.map((document) => scoreKnowledgeDocument(document, query))
    .filter((result) => result.score >= minimumScore)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.document.id.localeCompare(b.document.id);
    })
    .slice(0, limit);
}
