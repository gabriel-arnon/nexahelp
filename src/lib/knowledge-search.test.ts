import { describe, expect, it } from "vitest";
import { getRelevantTerms, normalizeSearchText, searchKnowledgeBase } from "@/lib/knowledge-search";

describe("knowledge-search", () => {
  it("normaliza texto para minusculas, pontuacao e espacos", () => {
    expect(normalizeSearchText("  Olá,   MUNDO!!! ")).toBe("ola mundo");
  });

  it("remove acentos", () => {
    expect(normalizeSearchText("férias, informação, ética")).toBe("ferias informacao etica");
  });

  it("remove stopwords comuns em portugues", () => {
    expect(getRelevantTerms("como eu faço para solicitar férias")).toEqual([
      "faco",
      "solicitar",
      "ferias",
    ]);
  });

  it("seleciona documento por titulo", () => {
    const results = searchKnowledgeBase("política de trabalho remoto");
    expect(results[0]?.document.id).toBe("pc-001");
  });

  it("seleciona documento por palavras-chave", () => {
    const results = searchKnowledgeBase("sofri phishing no email");
    expect(results[0]?.document.id).toBe("si-001");
  });

  it("retorna vazio para pergunta fora da base", () => {
    expect(searchKnowledgeBase("qual cardapio do almoco de hoje")).toEqual([]);
  });

  it("limita o maximo de documentos", () => {
    expect(
      searchKnowledgeBase("senha acesso portal chamado software equipamento").length,
    ).toBeLessThanOrEqual(4);
  });

  it("ordena por pontuacao", () => {
    const results = searchKnowledgeBase("senha corporativa redefinir acesso");
    expect(results[0]?.score ?? 0).toBeGreaterThanOrEqual(results[1]?.score ?? 0);
    expect(results[0]?.document.id).toBe("ti-001");
  });

  it("nao retorna documentos sem relevancia minima", () => {
    const results = searchKnowledgeBase("xyz assunto inexistente");
    expect(results).toHaveLength(0);
  });
});
