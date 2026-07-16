# Arquitetura — NexaHelp AI

Este documento descreve as decisões de arquitetura da versão acadêmica do
NexaHelp AI e o plano para a integração real com a OpenAI em uma próxima
versão.

## Visão geral

Aplicação SPA/SSR construída com **TanStack Start** (React 19 + TypeScript +
Vite 7) e **Tailwind CSS v4 (CSS-first)** + **shadcn/ui**. Toda a lógica
desta versão executa no cliente; não há backend próprio nem banco de dados.

## Camadas do chat

```text
┌─────────────────────────┐
│   ChatWindow (UI)       │  src/components/chat/chat-window.tsx
│   ├─ Composer           │
│   ├─ MessageBubble      │
│   ├─ SourceList/Dialog  │
│   └─ HistoryPanel       │
└──────────┬──────────────┘
           │ askAssistant({ pergunta, historico })
           ▼
┌─────────────────────────┐
│   chat-service.ts       │  src/services/chat-service.ts
│   modo = VITE_CHAT_MODE │
└──────────┬──────────────┘
           │
   ┌───────┴─────────┐
   │                 │
   ▼                 ▼
mock-answers.ts   (futuro) POST /api/chat → servidor → OpenAI
(regras locais)
```

- `ChatWindow` **não** conhece o mock nem o formato de rede: ele consome
  apenas `askAssistant` e os tipos em `src/types/chat.ts`.
- `chat-service.ts` decide, com base em `VITE_CHAT_MODE`, se resolve a
  resposta localmente (`mock`) ou faz a chamada de rede (`api`).
- A troca do modo é uma única variável de ambiente — nenhum componente
  precisa ser alterado.

## Persistência

- `useChatSession` (`src/hooks/use-chat-session.ts`) mantém o estado da
  sessão atual e o arquivo de conversas anteriores em `localStorage`,
  sob duas chaves:
  - `nexahelp:current-session` — conversa em andamento;
  - `nexahelp:conversations` — histórico de conversas encerradas.
- "Nova conversa" arquiva a sessão atual **somente se** ela tiver ao menos
  uma mensagem. Sessões vazias são descartadas.
- "Limpar histórico" apaga definitivamente as duas chaves.

## Base de conhecimento

- `src/lib/knowledge-base.ts` contém 20 documentos fictícios distribuídos
  em 5 categorias (4 cada). Cada documento possui: `id`, `titulo`,
  `categoria`, `descricao`, `conteudo`, `palavrasChave`, `atualizadoEm`,
  `status`.
- As respostas simuladas em `mock-answers.ts` referenciam os documentos
  pelos **IDs**, e o UI resolve título/categoria/conteúdo/data pelo helper
  `getDocumentById`. Isso permite exibir o mesmo `SourceDialog` em qualquer
  lugar da aplicação.

## Integração futura com OpenAI

A integração real com a OpenAI será feita **exclusivamente** por uma
rota/função executada no servidor. O frontend continuará consumindo apenas
`askAssistant` do `chat-service.ts`.

### Fluxo esperado

```text
ChatWindow → chat-service.ts → POST /api/chat → servidor → OpenAI
                                                       ↑
                                                       └── OPENAI_API_KEY
                                                           (server-only)
```

### Regras não negociáveis de segurança

- **`OPENAI_API_KEY` NUNCA pode utilizar o prefixo `VITE_`.** Qualquer variável
  com esse prefixo é embutida no bundle do navegador e ficaria pública.
- **A chave nunca deve ser enviada ao navegador** por props, headers,
  respostas, logs ou qualquer outro meio.
- **A chave deve viver apenas no servidor**, lida via `process.env` dentro
  do handler da rota/função — nunca no escopo de módulo de arquivos que
  também são importados pelo cliente.
- **O endpoint futuro deve validar a entrada** (por exemplo com `zod`:
  `pergunta` string, `trim`, não vazia, ≤ 1.000 caracteres) antes de invocar
  o modelo.
- **O endpoint deve retornar somente** `{ resposta: string, fontes: string[] }`,
  onde `fontes` é uma lista de **IDs** de documentos da base — nunca prompts
  internos, contexto, chaves, metadados sensíveis ou dados do provedor.
- A limitação de taxa (rate limiting) e o tratamento de erros do provedor
  (`429`, `402`) devem ser feitos no próprio endpoint e propagados como
  mensagens de erro amigáveis para o cliente.

### Ponto de extensão já pronto

Em `src/services/chat-service.ts` o ramo `mode === "api"` é o único ponto que
precisará ser implementado quando a integração real chegar. Hoje ele lança
um erro amigável indicando que a integração real ainda não foi configurada,
evitando qualquer chamada de rede acidental.

Exemplo de implementação futura (esboço):

```ts
// src/services/chat-service.ts (versão futura, trecho de referência)
if (mode === "api") {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pergunta, historico: request.historico }),
  });
  if (!res.ok) throw new Error("Falha ao consultar o assistente.");
  return (await res.json()) as ChatServiceResponse;
}
```

E no servidor, em uma rota TanStack (`src/routes/api/chat.ts`) ou um
`createServerFn`:

```ts
// esboço — não implementar antes de habilitar o modo "api"
const key = process.env.OPENAI_API_KEY; // JAMAIS use VITE_
if (!key) return new Response("Sem chave configurada", { status: 500 });

const schema = z.object({ pergunta: z.string().trim().min(1).max(1000) });
const { pergunta } = schema.parse(await req.json());

// ...chamada ao provedor + montagem de fontes por ID...
return Response.json({ resposta, fontes });
```

## Acessibilidade

- Um único `<main>` no shell (`src/routes/__root.tsx`).
- Área de mensagens marcada com `role="log"`, `aria-live="polite"` e
  `aria-busy` durante o carregamento.
- Foco devolvido ao textarea após envio, conclusão e troca de conversa.
- Todos os controles ícone-apenas possuem `aria-label`.
- Contraste AA garantido pelos tokens em `src/styles.css`.
