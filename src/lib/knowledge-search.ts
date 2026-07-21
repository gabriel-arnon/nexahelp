import { KNOWLEDGE_BASE } from "@/lib/knowledge-base";
import type { ChatMessage } from "@/types/chat";
import type { KnowledgeDocument } from "@/types/knowledge";

export interface ScoredKnowledgeDocument {
  document: KnowledgeDocument;
  score: number;
  matchedTerms: string[];
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
  "um",
  "uma",
]);

const MINIMUM_SCORE = 7;
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
    .filter((term) => term.length >= 3 && !STOPWORDS.has(term));

  return Array.from(new Set(terms));
}

export function buildKnowledgeSearchQuery(
  currentQuestion: string,
  history: Pick<ChatMessage, "role" | "content" | "error">[] = [],
): string {
  const recentUserQuestions = history
    .filter((message) => message.role === "user" && !message.error && message.content.trim())
    .slice(-2)
    .map((message) => message.content.trim());

  return [...recentUserQuestions, currentQuestion.trim()].join(" ");
}

function fieldScore(fieldValue: string, terms: string[], weight: number): number {
  const field = normalizeSearchText(fieldValue);
  return terms.reduce((score, term) => {
    if (field.includes(term)) {
      return score + weight;
    }
    return score;
  }, 0);
}

function keywordScore(keywords: string[], terms: string[]): number {
  return terms.reduce((score, term) => {
    const matched = keywords.some((keyword) => normalizeSearchText(keyword).includes(term));
    return matched ? score + 8 : score;
  }, 0);
}

export function scoreKnowledgeDocument(
  document: KnowledgeDocument,
  query: string,
): ScoredKnowledgeDocument {
  const normalizedQuery = normalizeSearchText(query);
  const terms = getRelevantTerms(query);
  const searchableContent = [
    document.titulo,
    document.descricao,
    document.conteudo,
    document.palavrasChave.join(" "),
  ]
    .map(normalizeSearchText)
    .join(" ");

  const matchedTerms = terms.filter((term) => searchableContent.includes(term));
  let score = 0;

  score += fieldScore(document.titulo, terms, 10);
  score += keywordScore(document.palavrasChave, terms);
  score += fieldScore(document.descricao, terms, 5);
  score += fieldScore(document.conteudo, terms, 2);

  const normalizedTitle = normalizeSearchText(document.titulo);
  const normalizedDescription = normalizeSearchText(document.descricao);
  const normalizedKeywords = normalizeSearchText(document.palavrasChave.join(" "));
  if (
    normalizedQuery &&
    (normalizedTitle.includes(normalizedQuery) ||
      normalizedDescription.includes(normalizedQuery) ||
      normalizedKeywords.includes(normalizedQuery))
  ) {
    score += 12;
  }

  if (matchedTerms.length > 1) {
    score += Math.min(matchedTerms.length * 2, 10);
  }

  return { document, score, matchedTerms };
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
