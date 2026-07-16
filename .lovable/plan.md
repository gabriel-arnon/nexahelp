# NexaHelp AI — Plano final (v2 + ajustes)

Plano v2 aprovado. Incorporados apenas os ajustes solicitados abaixo; todo o restante permanece exatamente como no v2.

## Ajustes incorporados

### 1. Histórico de conversas (client-side)
- Botão "Histórico" no cabeçalho do `/assistente` (ícone `History` do lucide).
- Abre `Sheet` lateral (shadcn) com lista das conversas em `nexahelp:conversations` (localStorage).
- Cada item exibe:
  - Título derivado da primeira mensagem do usuário (truncado ~60 chars; fallback "Conversa sem título").
  - Data e horário formatados em pt-BR (`Intl.DateTimeFormat`).
- Ações por item:
  - Clique no item → carrega essa conversa como sessão ativa (a atual, se tiver mensagens, é arquivada antes).
  - Botão de excluir (ícone lixeira, com `AlertDialog` de confirmação) → remove somente aquela conversa.
- Estado vazio: "Nenhuma conversa anterior."
- Sem backend, tudo em localStorage; hook `useChatSession` ganha `listConversations()`, `openConversation(id)`, `deleteConversation(id)`.

### 2. Arquivamento condicional
- "Nova conversa" só arquiva a sessão atual se `messages.length > 0`. Sessões vazias são descartadas — nunca entram em `nexahelp:conversations`.
- Mesma regra aplicada ao trocar de conversa via painel de Histórico.

### 3. Documentação da futura integração OpenAI (`docs/arquitetura.md`)
Seção dedicada "Integração futura com OpenAI" registrando explicitamente:
- Fluxo: `ChatWindow → chat-service.ts → POST /api/chat → servidor → OpenAI`.
- A integração real será feita **exclusivamente** por rota/função no servidor (TanStack server route em `src/routes/api/chat.ts` ou `createServerFn`).
- `OPENAI_API_KEY` **nunca** poderá usar o prefixo `VITE_` (o prefixo expõe ao bundle do navegador).
- A chave **nunca** deverá ser enviada ao navegador nem retornada em respostas.
- O endpoint futuro deverá:
  - validar a entrada (ex.: `zod` com limite de 1000 chars, tipo, sanitização);
  - retornar somente `{ resposta: string, fontes: string[] }` (IDs de documentos), sem vazar prompts internos, contexto ou metadados sensíveis.
- Ponto de extensão já existe no `chat-service.ts` (modo `"api"`), que hoje lança erro amigável — na fase real, passará a fazer `fetch("/api/chat", ...)`.

### 4. Badge "Modo de demonstração" + aviso na interface
- No topo do `/assistente`, ao lado do título "Assistente Corporativo":
  - `Badge` discreto (variante `secondary`/`outline`) com texto dependente do modo.
  - Aviso curto abaixo: "Nesta primeira versão, as respostas são simuladas para fins acadêmicos."

### 5. Texto do badge por `VITE_CHAT_MODE`
- Componente `ModeBadge` em `src/components/chat/mode-badge.tsx`:
  - Lê `import.meta.env.VITE_CHAT_MODE` (padrão `"mock"`).
  - `mock` → "Modo de demonstração" (ícone `FlaskConical`, cor neutra).
  - `api` → "IA conectada" (ícone `Sparkles`, cor `--success`/`--accent`).
- O aviso descritivo abaixo do badge também troca conforme o modo (mensagem de demonstração x mensagem de IA conectada).
- `.env.example` já contempla `VITE_CHAT_MODE=mock`.

## Itens do plano v2 mantidos integralmente
Identidade visual, rotas, camadas `types/chat.ts` + `services/chat-service.ts` + `lib/mock-answers.ts`, hook `useChatSession` em localStorage, 20 documentos da base (4 por categoria) com campos `id, titulo, categoria, descricao, conteudo, palavrasChave, atualizadoEm, status`, `SourceDialog` clicável por ID, validações completas do chat (vazio, 1000 chars, duplicado, disable durante loading, retry, autoscroll, foco, `aria-live`), aviso "Não envie dados pessoais…", botões "Nova conversa" / "Limpar histórico" (com confirmação), páginas Inicial / Base de Conhecimento / Governança, rodapé acadêmico, `README.md`, `.env.example`, `docs/arquitetura.md`, `docs/evidencias/README.md`, verificações finais (lint, build, navegação, responsividade, chat, persistência, filtros, fontes, console limpo).

Sem backend, sem Lovable Cloud, sem chave de API nesta versão. Após aprovação deste plano, inicio a implementação diretamente.
