import { describe, expect, it } from "vitest";
import { KNOWLEDGE_BASE } from "@/lib/knowledge-base";
import {
  buildKnowledgeSearchQuery,
  getRelevantTerms,
  isContextualFollowUp,
  normalizeSearchText,
  searchKnowledgeBase,
} from "@/lib/knowledge-search";
import { resolveLocalChatIntent } from "@/lib/local-chat-intents";
import { handleChatPost, selectUsefulModelHistory } from "@/routes/api/chat";

const knownIds = new Set(KNOWLEDGE_BASE.map((document) => document.id));

function idsFor(query: string): string[] {
  return searchKnowledgeBase(query).map((result) => result.document.id);
}

function postRequest(body: unknown): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": `test-${Math.random()}`,
    },
    body: JSON.stringify(body),
  });
}

describe("knowledge-search", () => {
  it("normaliza texto para minusculas, pontuacao e espacos", () => {
    expect(normalizeSearchText("  Olá,   MUNDO!!! ")).toBe("ola mundo");
  });

  it("remove acentos", () => {
    expect(normalizeSearchText("férias, informação, ética")).toBe("ferias informacao etica");
  });

  it("remove stopwords e termos genericos comuns em portugues", () => {
    expect(getRelevantTerms("como eu faço para solicitar férias no sistema corporativo")).toEqual([
      "faco",
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

  it("cardapio retorna zero documentos mesmo com historico anterior sobre senha", () => {
    const query = buildKnowledgeSearchQuery("Qual será o cardápio do almoço de hoje?", [
      { role: "user", content: "Esqueci minha senha e meu acesso ficou bloqueado." },
    ]);

    expect(query).toBe("Qual será o cardápio do almoço de hoje?");
    expect(searchKnowledgeBase(query)).toEqual([]);
  });

  it("qual seu nome e classificada como intencao local", () => {
    const response = resolveLocalChatIntent("Qual seu nome?");
    expect(response?.resposta).toContain("NexaHelp AI");
    expect(response?.fontes).toEqual([]);
  });

  it("pergunta independente nao usa historico", () => {
    const history = [{ role: "user" as const, content: "Esqueci minha senha." }];
    expect(selectUsefulModelHistory(history, "Como solicitar férias?")).toEqual([]);
    expect(buildKnowledgeSearchQuery("Como solicitar férias?", history)).toBe(
      "Como solicitar férias?",
    );
  });

  it("continuação sobre e-mail cadastrado e reconhecida como contextual", () => {
    expect(isContextualFollowUp("E se eu não tiver acesso ao e-mail cadastrado?")).toBe(true);
  });

  it("continuação sobre senha recupera documentos de senha e chamado", () => {
    const query = buildKnowledgeSearchQuery("E se eu não tiver acesso ao e-mail cadastrado?", [
      { role: "user", content: "Esqueci minha senha e meu acesso ficou bloqueado." },
    ]);
    const ids = idsFor(query);

    expect(ids).toContain("ti-001");
    expect(ids).toContain("ti-002");
  });

  it("continuação sobre senha não recupera phishing", () => {
    const query = buildKnowledgeSearchQuery("E se eu não tiver acesso ao e-mail cadastrado?", [
      { role: "user", content: "Esqueci minha senha e meu acesso ficou bloqueado." },
    ]);

    expect(idsFor(query)).not.toContain("si-001");
  });

  it("continuação sobre senha não recupera crachá de visitantes", () => {
    const query = buildKnowledgeSearchQuery("E se eu não tiver acesso ao e-mail cadastrado?", [
      { role: "user", content: "Esqueci minha senha e meu acesso ficou bloqueado." },
    ]);

    expect(idsFor(query)).not.toContain("fa-004");
  });

  it("pergunta de senha bloqueada não recupera crachá de visitantes", () => {
    const ids = idsFor("Esqueci minha senha e meu acesso ficou bloqueado.");
    expect(ids).toContain("ti-001");
    expect(ids).toContain("si-002");
    expect(ids).not.toContain("fa-004");
    expect(ids).not.toContain("si-001");
  });

  it("palavras genericas isoladas nao atingem pontuacao minima", () => {
    expect(searchKnowledgeBase("acesso informação empresa procedimento sistema usuário")).toEqual(
      [],
    );
  });

  it("limita o maximo de documentos", () => {
    expect(
      searchKnowledgeBase("senha portal chamado software equipamento ferias ponto incidente")
        .length,
    ).toBeLessThanOrEqual(4);
  });

  it("ordena por pontuacao", () => {
    const results = searchKnowledgeBase("senha redefinir bloqueada");
    expect(results[0]?.score ?? 0).toBeGreaterThanOrEqual(results[1]?.score ?? 0);
    expect(results[0]?.document.id).toBe("ti-001");
  });

  it("ids retornados sempre existem na base", () => {
    for (const result of searchKnowledgeBase("senha redefinir bloqueada chamado")) {
      expect(knownIds.has(result.document.id)).toBe(true);
    }
  });

  it("nao retorna documentos sem relevancia minima", () => {
    const results = searchKnowledgeBase("xyz assunto inexistente");
    expect(results).toHaveLength(0);
  });

  it("respostas locais retornam fontes vazias", () => {
    expect(resolveLocalChatIntent("Obrigado")?.fontes).toEqual([]);
    expect(resolveLocalChatIntent("Quem é você?")?.fontes).toEqual([]);
  });

  it("perguntas fora da base nao chegam a funcao que chama a OpenAI", async () => {
    let called = false;
    const response = await handleChatPost(
      postRequest({
        pergunta: "Qual será o cardápio do almoço de hoje?",
        historico: [{ role: "user", content: "Esqueci minha senha." }],
      }),
      async () => {
        called = true;
        return "não deveria chamar";
      },
    );
    const payload = (await response.json()) as { resposta: string; fontes: string[] };

    expect(called).toBe(false);
    expect(payload.fontes).toEqual([]);
  });
});
