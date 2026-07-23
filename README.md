# NexaHelp AI — Copiloto Inteligente para Conhecimento Corporativo

Aplicação web acadêmica que demonstra um copiloto corporativo para conhecimento interno. Colaboradores podem fazer perguntas em linguagem natural sobre procedimentos internos, políticas, TI, RH, Segurança da Informação, Facilities e serviços administrativos.

Esta versão mantém o **modo mock** com respostas demonstrativas e inclui integração server-side com a OpenAI para uso quando `VITE_CHAT_MODE=api` e as variáveis do servidor estiverem configuradas. A integração server-side com a OpenAI está publicada e foi validada em produção na Vercel.

## Links do projeto

- Aplicação publicada: https://nexahelp.vercel.app/
- Repositório: https://github.com/gabriel-arnon/nexahelp

## Objetivo

Demonstrar, no contexto da disciplina **IA Generativa Aplicada ao Desenvolvimento** (curso de Inteligência Artificial e Automação Digital), como IA generativa pode facilitar o acesso ao conhecimento interno de uma organização com transparência, controle de custo e isolamento de segredos.

## Funcionalidades

- Página inicial explicando a solução, áreas atendidas e benefícios.
- Interface de chat com o "Assistente Corporativo":
  - perguntas sugeridas clicáveis;
  - histórico persistido em `localStorage`;
  - painel lateral com conversas anteriores;
  - botões "Nova conversa" e "Limpar histórico";
  - validação de entrada e prevenção de envios duplicados;
  - tratamento de erro com mensagens amigáveis;
  - fontes clicáveis que abrem o documento completo;
  - badge dinâmico "Modo de demonstração" / "IA conectada".
- Base de conhecimento fictícia com **20 documentos** simulados organizados em 5 categorias, com busca e filtro.
- Página de governança com princípios de uso responsável de IA.
- Endpoint server-side `POST /api/chat` para o modo `api`.

## Demonstração

A aplicação permite perguntar em linguagem natural, consultar uma base fictícia de 20 documentos corporativos simulados, receber respostas geradas por IA, conferir fontes clicáveis, manter histórico local no navegador e visualizar orientações de governança para uso responsável.

## Tecnologias Utilizadas

- [TanStack Start](https://tanstack.com/start) v1
- TanStack Router e TanStack Query
- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- shadcn/ui
- lucide-react
- Zod
- OpenAI SDK oficial (`openai`)
- Vitest

## Modos de Chat

- `VITE_CHAT_MODE=mock`: modo padrão. Usa `src/lib/mock-answers.ts` e não chama APIs externas.
- `VITE_CHAT_MODE=api`: o frontend envia somente `pergunta` e histórico sanitizado para `POST /api/chat`. A rota valida a entrada, busca documentos relevantes localmente e só chama a OpenAI se houver contexto suficiente.

Não existe fallback silencioso de `api` para `mock`: se a API real falhar, o usuário recebe uma mensagem de indisponibilidade.

## Variáveis de Ambiente

Copie `.env.example` para um arquivo local ignorado pelo Git, como `.env.local`, e configure no ambiente do servidor:

```env
VITE_CHAT_MODE=mock
OPENAI_API_KEY=<configurar-no-servidor>
OPENAI_MODEL=gpt-5-mini
```

- `VITE_CHAT_MODE` é público e controla a interface.
- `OPENAI_API_KEY` é exclusivamente server-side e nunca deve usar prefixo `VITE_`.
- `OPENAI_MODEL` permite alterar o modelo no servidor; o padrão é `gpt-5-mini`.
- Nenhuma chave real deve ser armazenada em arquivo versionado.

## Como Executar

Pré-requisitos: Bun ou Node 20+ com npm compatível.

```bash
npm install --package-lock=false
npm run dev
npm run lint
npm run typecheck
npm run test:run
npm run build
```

Não há porta explícita definida nos scripts. O servidor de desenvolvimento usa a configuração do Vite/Lovable e o terminal exibe a URL local em uso.

## Fluxo `POST /api/chat`

1. O frontend chama `askAssistant`.
2. Em `mock`, a resposta vem de regras locais.
3. Em `api`, o serviço faz `POST /api/chat`.
4. A rota valida o corpo com Zod.
5. A busca local seleciona até 4 documentos relevantes, priorizando a pergunta atual.
6. Se nenhum documento atingir a pontuação mínima, a rota responde sem chamar a OpenAI.
7. Perguntas independentes não enviam histórico ao modelo; continuações contextuais usam apenas a última pergunta relevante do usuário.
8. Se houver contexto e `OPENAI_API_KEY`, a rota chama a Responses API com `store: false`.
9. O retorno ao navegador contém apenas:

```json
{
  "resposta": "string",
  "fontes": ["id-documento"]
}
```

## Busca Local

`src/lib/knowledge-search.ts` faz recuperação determinística sem embeddings e sem chamadas externas. A busca normaliza caixa, acentos, pontuação e espaços; remove stopwords comuns em português; pontua título, palavras-chave, descrição e conteúdo com pesos diferentes; aplica bônus de frase e de múltiplos termos; e retorna no máximo 4 documentos com relevância mínima.

Embeddings podem ser adicionados futuramente, mas estão fora desta versão.

## Segurança e Privacidade

- O SDK da OpenAI é importado apenas por código em `src/server`.
- A chave é lida via `process.env.OPENAI_API_KEY` no servidor.
- A Responses API usa `store: false`.
- Não é usado `previous_response_id`.
- O endpoint não envia IDs de sessão, timestamps, mensagens com erro, metadados desnecessários ou todos os documentos da base.
- Erros não retornam stack trace, headers, mensagens brutas da OpenAI ou detalhes sensíveis.
- O rate limit em memória permite 10 requisições por IP a cada 10 minutos. Ele é adequado para demonstração acadêmica, mas não é distribuído nem suficiente para produção com múltiplas instâncias.

## Publicação na Vercel

O deployment full-stack na Vercel foi concluído em https://nexahelp.vercel.app/. O endpoint `POST /api/chat` foi validado na Vercel, e as variáveis server-side `OPENAI_API_KEY` e `OPENAI_MODEL` funcionaram corretamente no ambiente de produção.

O projeto usa a configuração `@lovable.dev/vite-tanstack-config`, que já registra TanStack Start, React, Tailwind, aliases e Nitro. A configuração atual mantém o entry server em `src/server.ts`. Nunca faça commit de `.env` com chaves reais; configure segredos somente nas variáveis do ambiente de execução.

## Validações realizadas

- lint aprovado, com apenas warnings preexistentes do Fast Refresh;
- typecheck aprovado;
- 21 testes automatizados aprovados;
- build de produção aprovado;
- modo mock validado;
- integração real OpenAI validada localmente;
- integração real OpenAI validada na Vercel;
- perguntas fora da base sem chamada ao modelo;
- continuação contextual validada;
- proteção contra prompt injection validada;
- ausência de segredos no repositório.

## Estrutura do Projeto

```text
src/
  components/chat/             # UI do chat
  hooks/use-chat-session.ts    # persistência local
  lib/
    knowledge-base.ts          # 20 documentos fictícios
    knowledge-search.ts        # recuperação local determinística
    mock-answers.ts            # respostas demonstrativas
  routes/
    api/chat.ts                # server route POST /api/chat
  server/
    assistant-prompt.ts        # prompt e formatação server-side
    openai-chat.ts             # chamada Responses API
  services/chat-service.ts     # mock | api
  types/
docs/
  arquitetura.md
  evidencias/README.md
```

## Ferramentas de IA Utilizadas no Desenvolvimento

- **Lovable** — geração inicial da interface e arquitetura.
- **ChatGPT** — planejamento, engenharia de prompts e revisão do escopo.
- **Codex** — auditoria, revisão de código, correções, integração server-side, documentação final e validação técnica.

## Limitações

- Base de conhecimento fictícia e estática.
- Ausência de login.
- Histórico somente no navegador.
- Rate limit em memória.
- Ausência de banco de dados.
- Ausência de embeddings.
- Aplicação criada para demonstração acadêmica.

## Identificação Acadêmica

- **Autor:** Gabriel Arnon Figueira de Almeida
- **RA:** 189800
- **Curso:** Inteligência Artificial e Automação Digital
- **Disciplina:** IA Generativa Aplicada ao Desenvolvimento
- **Professora:** Patrícia Ampese
- **Semestre:** 2º semestre
