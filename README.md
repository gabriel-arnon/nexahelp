# NexaHelp AI — Copiloto Inteligente para Conhecimento Corporativo

Aplicação web acadêmica que simula um copiloto corporativo para conhecimento interno. Colaboradores podem fazer perguntas em linguagem natural sobre procedimentos internos, políticas, TI, RH, Segurança da Informação, Facilities e serviços administrativos, recebendo respostas demonstrativas com fontes simuladas.

## Objetivo

Demonstrar, no contexto da disciplina **IA Generativa Aplicada ao Desenvolvimento** (curso de Inteligência Artificial e Automação Digital), como a IA generativa pode facilitar o acesso ao conhecimento interno de uma organização.

Esta primeira versão utiliza **respostas simuladas** (mock) sobre uma base fictícia. A arquitetura foi desenhada para permitir, em uma versão futura, a substituição do mock por uma integração real com a OpenAI executada exclusivamente no servidor.

## Funcionalidades

- Página inicial explicando a solução, áreas atendidas e benefícios.
- Interface de chat com o "Assistente Corporativo":
  - perguntas sugeridas clicáveis;
  - histórico persistido em `localStorage`;
  - painel lateral com conversas anteriores (abrir e excluir);
  - botões "Nova conversa" e "Limpar histórico";
  - validação de entrada (não vazia, limite de 1.000 caracteres, sem envios duplicados);
  - estado de carregamento, tratamento de erro com "Tentar novamente";
  - autoscroll, retorno de foco ao campo, `aria-live` na área de respostas;
  - badge dinâmico "Modo de demonstração" / "IA conectada" conforme `VITE_CHAT_MODE`;
  - fontes clicáveis que abrem um diálogo com o documento completo.
- Base de conhecimento fictícia com **20 documentos** simulados organizados em 5 categorias, com busca e filtro.
- Página de governança com princípios de uso responsável de IA.
- Layout responsivo, acessível e em português do Brasil.

## Tecnologias utilizadas

- [TanStack Start](https://tanstack.com/start) v1 (framework React full-stack)
- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (CSS-first, `@theme`)
- shadcn/ui (Radix UI + Tailwind)
- lucide-react (ícones)
- TanStack Router e TanStack Query

## Ferramentas de IA utilizadas no desenvolvimento

- **Lovable** — geração inicial da interface e arquitetura.
- **ChatGPT** — planejamento, engenharia de prompts e revisão do escopo.
- **Codex** — auditoria, revisão de código, correções e validação técnica.

## Como executar

Pré-requisitos: [Bun](https://bun.sh) (ou Node 20+ com npm/pnpm equivalente).

```bash
# Instalar dependências
bun install

# Ambiente de desenvolvimento
bun run dev

# Build de produção
bun run build

# Lint
bun run lint
```

Não há porta explícita definida nos scripts do projeto. O servidor de desenvolvimento usa a configuração do Vite/Lovable e o terminal exibirá a URL local em uso ao executar `bun run dev`.

## Variáveis de ambiente

Copie `.env.example` para `.env` (ou `.env.local`) e ajuste conforme necessário:

- `VITE_CHAT_MODE=mock` — modo padrão desta versão; respostas simuladas.
- `VITE_CHAT_MODE=api` — reserva o modo para futura integração real com IA no servidor.

> **Importante:** nenhuma chave de API é lida ou exposta no navegador nesta versão.
> Quando a integração real for implementada, a chave `OPENAI_API_KEY` **jamais**
> poderá usar o prefixo `VITE_`.

## Estrutura do projeto

```
src/
  components/
    chat/                     # ChatWindow, Composer, MessageBubble, SourceList, ...
    knowledge/                # DocumentCard
    ui/                       # shadcn/ui
    site-header.tsx
    site-footer.tsx
    logo.tsx
  hooks/
    use-chat-session.ts       # persistência da conversa em localStorage
  lib/
    knowledge-base.ts         # 20 documentos fictícios/simulados
    mock-answers.ts           # regras de respostas simuladas (retorna IDs)
  services/
    chat-service.ts           # camada única consumida pelo chat (mock | api)
  types/
    chat.ts
    knowledge.ts
  routes/
    __root.tsx                # header, footer, metadata
    index.tsx                 # Página inicial
    assistente.tsx            # Chat
    base-conhecimento.tsx     # Lista/filtro/busca
    governanca.tsx            # Uso responsável de IA
docs/
  arquitetura.md              # Decisões de arquitetura e plano futuro OpenAI
  evidencias/README.md        # Espaço para prints/vídeos de teste
```

## Limitações da versão simulada

- Sem backend: todas as respostas vêm de regras locais em `src/lib/mock-answers.ts`.
- Sem autenticação e sem integração real com IA.
- Sem persistência em banco de dados: o histórico de conversas fica apenas no navegador (`localStorage`) e é único por dispositivo/perfil.
- A base de conhecimento é fictícia, com documentos corporativos simulados, e serve apenas para demonstração acadêmica.

## Identificação acadêmica

- **Autor:** Gabriel Arnon Figueira de Almeida
- **RA:** 189800
- **Curso:** Inteligência Artificial e Automação Digital
- **Disciplina:** IA Generativa Aplicada ao Desenvolvimento
