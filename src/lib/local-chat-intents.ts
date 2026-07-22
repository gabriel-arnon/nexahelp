export interface LocalChatIntentResponse {
  resposta: string;
  fontes: [];
}

const IDENTITY_RESPONSE =
  "Meu nome é NexaHelp AI. Sou um assistente acadêmico para consulta de uma base de conhecimento corporativa fictícia.";

const GREETING_RESPONSE =
  "Olá! Sou o NexaHelp AI. Posso ajudar com dúvidas sobre a base de conhecimento corporativa fictícia.";

const THANKS_RESPONSE = "De nada! Se precisar, posso ajudar com outra dúvida da base fictícia.";

function normalizeIntentText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function resolveLocalChatIntent(question: string): LocalChatIntentResponse | null {
  const normalized = normalizeIntentText(question);

  if (!normalized) return null;

  if (/^(oi|ola|bom dia|boa tarde|boa noite|hello|hi)$/.test(normalized)) {
    return { resposta: GREETING_RESPONSE, fontes: [] };
  }

  if (/^(obrigado|obrigada|valeu|muito obrigado|muito obrigada)$/.test(normalized)) {
    return { resposta: THANKS_RESPONSE, fontes: [] };
  }

  if (
    /^(qual (e )?seu nome|quem e voce|o que voce faz|quem voce e)$/.test(normalized) ||
    normalized === "qual seu nome"
  ) {
    return { resposta: IDENTITY_RESPONSE, fontes: [] };
  }

  return null;
}
