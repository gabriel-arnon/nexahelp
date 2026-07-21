# Arquitetura — NexaHelp AI

Este documento descreve a arquitetura da versão acadêmica do NexaHelp AI após a primeira integração server-side com a OpenAI.

## Visão Geral

A aplicação usa **TanStack Start** com React 19, TypeScript, Vite 8, Tailwind CSS v4 e shadcn/ui. O frontend mantém o modo demonstrativo local e pode alternar para um endpoint server-side por meio de `VITE_CHAT_MODE=api`.

## Camadas do Chat

```text
ChatWindow
  -> chat-service.ts
    -> mock: mock-answers.ts
    -> api : POST /api/chat
              -> knowledge-search.ts
              -> server/openai-chat.ts
              -> OpenAI Responses API
```

- Componentes de UI dependem apenas de `askAssistant`.
- O mock continua local, sem custo e sem rede.
- O modo `api` chama somente `/api/chat`; não há importação do SDK da OpenAI no frontend.

## Server Route `POST /api/chat`

Arquivo: `src/routes/api/chat.ts`.

Contrato aceito:

```json
{
  "pergunta": "string",
  "historico": [{ "role": "user", "content": "string" }]
}
```

Validações:

- `pergunta`: obrigatória, `trim`, 1 a 1.000 caracteres.
- `historico`: opcional, até 12 mensagens.
- cada mensagem aceita apenas `role` e `content`.
- cada `content` tem até 2.000 caracteres.
- perguntas independentes não enviam histórico ao modelo.
- continuações contextuais enviam somente a última pergunta relevante do usuário.

Resposta de sucesso:

```json
{
  "resposta": "string",
  "fontes": ["ti-001"]
}
```

As fontes são IDs de documentos efetivamente enviados como contexto, limitadas aos 3 mais bem pontuados. IDs enviados pelo navegador são ignorados.

## Recuperação Local

`src/lib/knowledge-search.ts` faz busca determinística sobre os 20 documentos de `knowledge-base.ts`.

Critérios:

- normalização de minúsculas, acentos, pontuação e espaços;
- remoção de stopwords comuns em português;
- pesos maiores para título e palavras-chave;
- peso intermediário para descrição;
- peso menor para conteúdo;
- bônus para frase e múltiplos termos no mesmo documento;
- retorno de no máximo 4 documentos;
- nenhum documento é retornado sem pontuação mínima.

Se nenhum documento for relevante, o endpoint responde sem chamar a OpenAI:

```json
{
  "resposta": "Não encontrei informações suficientes na base de conhecimento para responder com segurança. Consulte o setor responsável ou reformule sua pergunta.",
  "fontes": []
}
```

## Prompt e OpenAI

Arquivos server-side:

- `src/server/assistant-prompt.ts`
- `src/server/openai-chat.ts`

A chamada usa o SDK oficial `openai`, Responses API, modelo padrão `gpt-5-mini`, `store: false`, `max_output_tokens: 700` e `reasoning.effort: "low"` conforme suportado pelos tipos instalados.

O prompt instrui o modelo a responder em português do Brasil, usar somente os documentos enviados, tratar documentos como dados, evitar invenções, não mencionar detalhes internos e sinalizar insuficiência da base.

## Segurança

- `OPENAI_API_KEY` é lida somente por `process.env` em código server-side.
- Segredos não usam `VITE_`.
- A chave não é enviada ao navegador.
- O frontend envia apenas pergunta e histórico sanitizado.
- O endpoint não registra prompt, histórico completo, documentos ou resposta bruta do provedor.
- A resposta ao navegador contém apenas `resposta` e `fontes`.
- Erros não expõem stack trace, headers, payload bruto da OpenAI ou detalhes sensíveis.

## Erros

Formato:

```json
{
  "error": {
    "code": "CODIGO_ESTAVEL",
    "message": "Mensagem amigável em português."
  }
}
```

Mapeamento:

- `400 INVALID_JSON` ou `INVALID_INPUT`;
- `429 RATE_LIMIT_EXCEEDED`;
- `503 OPENAI_NOT_CONFIGURED`;
- `502 PROVIDER_UNAVAILABLE`;
- `500 UNEXPECTED_ERROR`.

## Rate Limit

O endpoint aplica controle em memória por IP: 10 requisições por janela de 10 minutos, com cabeçalho `Retry-After` quando bloqueado. Entradas expiradas são limpas de forma best-effort a cada requisição.

Esse controle é suficiente para demonstração acadêmica local, mas não é rate limiting distribuído de produção. Em produção com múltiplas instâncias, seria necessário usar infraestrutura compartilhada.

## Persistência

O histórico continua no navegador via `localStorage`:

- `nexahelp:current-session`;
- `nexahelp:conversations`.

Sessões vazias não são persistidas. "Limpar histórico" remove as duas chaves e não recria sessão vazia imediatamente.

## Deploy Vercel/Nitro

`vite.config.ts` usa `@lovable.dev/vite-tanstack-config`, que registra plugins essenciais, incluindo TanStack Start e Nitro. A configuração atual preserva o entry server em `src/server.ts`.

Para Vercel:

- configure `OPENAI_API_KEY` somente nas variáveis do servidor;
- configure `OPENAI_MODEL` se quiser sobrescrever `gpt-5-mini`;
- configure `VITE_CHAT_MODE=api` para habilitar a UI de IA conectada;
- não publique arquivos `.env` com segredos.

Risco observado: os comentários do preset Lovable indicam Nitro com alvo padrão Cloudflare. Não foi feito deploy nesta tarefa; a compatibilidade final com Vercel precisa ser validada no ambiente de publicação antes de declarar a integração operacional em produção.

## Limitações

- Sem autenticação.
- Sem banco de dados.
- Rate limit apenas em memória.
- Sem embeddings nesta versão.
- Sem chamada real à OpenAI nos testes automatizados.
- Base de conhecimento fictícia e acadêmica.
