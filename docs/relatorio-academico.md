# Construindo um Copiloto Corporativo com IA: Da Ideia a Aplicacao Utilizando Desenvolvimento Assistido por IA

- Autor: Gabriel Arnon Figueira de Almeida
- RA: 189800
- Curso: Inteligencia Artificial e Automacao Digital
- Disciplina: IA Generativa Aplicada ao Desenvolvimento
- Professora: Patricia Ampese
- Projeto: NexaHelp AI
- Aplicacao publicada: https://nexahelp.vercel.app/
- Repositorio: https://github.com/gabriel-arnon/nexahelp

## 1. Contextualizacao do Problema

Empresas em crescimento acumulam documentos internos em diferentes formatos, como planilhas, PDFs, apresentacoes, politicas corporativas, treinamentos e procedimentos operacionais. Mesmo quando a informacao existe, ela costuma ficar dispersa em multiplos canais, dificultando o acesso rapido pelos colaboradores.

Esse contexto gera perda de produtividade, retrabalho e dependencia excessiva de colegas ou grupos internos para responder duvidas recorrentes. O problema central do projeto foi, portanto, criar uma experiencia simples de consulta ao conhecimento corporativo, permitindo que um colaborador formule perguntas em linguagem natural e receba orientacoes contextualizadas, com fontes verificaveis.

## 2. Descricao da Solucao Desenvolvida

O NexaHelp AI e uma aplicacao web academica que simula um copiloto corporativo inteligente. A solucao permite consultar uma base de conhecimento ficticia, organizada por categorias, e receber respostas em portugues do Brasil sobre procedimentos internos, tecnologia da informacao, recursos humanos, seguranca da informacao, facilities e politicas corporativas.

A aplicacao possui:

- pagina inicial com proposta, beneficios e areas atendidas;
- assistente conversacional com perguntas sugeridas;
- integracao server-side com OpenAI no modo `api`;
- resposta com fontes consultadas;
- modal de fonte clicavel com conteudo do documento;
- base de conhecimento com busca e filtros;
- historico local de conversas no navegador;
- pagina de governanca e uso responsavel;
- controles para perguntas fora da base, intencoes locais e prompt injection.

Evidencias recomendadas para esta secao:

- `01-home-desktop.png`;
- `03-assistente-inicial.png`;
- `04-resposta-real-senha.png`;
- `05-fonte-clicavel-aberta.png`;
- `10-base-conhecimento.png`;
- `12-governanca.png`.

## 3. Ferramentas de IA Utilizadas Durante o Desenvolvimento

O desenvolvimento utilizou diferentes ferramentas de IA em etapas complementares:

- Lovable: geracao inicial da aplicacao, estrutura visual e fluxo principal.
- ChatGPT: planejamento do projeto, refinamento de escopo, engenharia de prompts e definicao das evidencias necessarias.
- Codex/OpenCode: auditoria tecnica, organizacao de evidencias, integracao server-side, ajustes de seguranca, documentacao e validacao.
- OpenAI: funcionalidade principal de IA generativa no assistente publicado.

Tambem foram utilizados GitHub e Vercel como suporte ao ciclo de versionamento, revisao por Pull Requests e publicacao da aplicacao.

Evidencias recomendadas para esta secao:

- `21-planejamento-chatgpt.png`;
- `22-plano-lovable.png`;
- `23-auditoria-codex.png`;
- `24-correcao-relevancia-codex.png`;
- `25-testes-codex.png`.

## 4. Como a IA Auxiliou na Criacao da Aplicacao

A IA foi usada como parceira de desenvolvimento em vez de apenas como recurso final da aplicacao. No inicio, ela ajudou a transformar o desafio academico em um escopo tecnico com paginas, componentes, categorias de conhecimento, comportamento do chat e criterios de governanca.

Durante a implementacao, a IA apoiou a criacao da interface, a organizacao da base de conhecimento, a revisao de problemas de seguranca, a correcao de textos inconsistentes e a definicao de uma arquitetura que separa frontend, servico de chat, busca local e chamada server-side ao provedor de IA.

Na etapa final, a IA auxiliou na auditoria, na validacao dos fluxos, na documentacao, na selecao de evidencias e na organizacao do material para entrega academica.

## 5. Agentes, Automacoes e Gerenciamento de Contexto

O projeto explorou desenvolvimento assistido por IA com comportamento semelhante a agentes especializados. O Codex/OpenCode atuou em tarefas de auditoria, revisao, validacao, organizacao documental e automacao de capturas. O processo tambem utilizou contexto do repositorio para entender arquivos, rotas, servicos e documentacao antes de propor ou aplicar mudancas.

Na aplicacao, o gerenciamento de contexto aparece no proprio assistente:

- perguntas independentes sao tratadas sem enviar historico desnecessario;
- continuacoes contextuais usam apenas o contexto relevante anterior;
- perguntas fora da base retornam resposta segura sem chamar a OpenAI;
- intencoes locais, como "Qual seu nome?", sao respondidas sem custo externo;
- fontes sao associadas a documentos reais da base ficticia.

Esse desenho reduz custo, limita exposicao de dados e melhora a previsibilidade das respostas.

## 6. Beneficios Obtidos

O NexaHelp AI demonstra beneficios praticos da IA generativa aplicada ao conhecimento corporativo:

- acesso mais rapido a procedimentos internos;
- reducao de retrabalho em duvidas recorrentes;
- experiencia em linguagem natural;
- respostas acompanhadas de fontes;
- centralizacao de documentos por categoria;
- historico local para continuidade da consulta;
- arquitetura preparada para modo demonstrativo e modo real;
- evidencias claras do uso de IA no desenvolvimento.

## 7. Limitacoes Encontradas

Por se tratar de uma versao academica, algumas limitacoes permanecem:

- a base de conhecimento e ficticia e estatica;
- nao ha autenticacao de usuarios;
- o historico fica somente no navegador;
- nao ha banco de dados;
- o rate limit e em memoria;
- nao foram usados embeddings;
- a aplicacao nao substitui canais oficiais de atendimento;
- respostas geradas por IA podem conter imprecisoes e devem ser verificadas.

Essas limitacoes foram documentadas no README, na arquitetura e na propria pagina de governanca da aplicacao.

## 8. Aspectos Eticos, Responsabilidade e Governanca da IA

O projeto foi desenhado com preocupacoes de seguranca, privacidade e uso responsavel. A chave da OpenAI e utilizada somente no servidor e nunca e exposta ao navegador. A aplicacao orienta o usuario a nao enviar dados pessoais, confidenciais ou sensiveis.

A arquitetura evita chamadas desnecessarias ao modelo, bloqueia respostas quando a base e insuficiente e instrui o assistente a nao inventar informacoes. Tambem ha protecao contra prompt injection, recusando solicitacoes para ignorar regras, revelar IDs internos ou criar dados inexistentes.

A pagina de governanca apresenta principios de transparencia, privacidade, seguranca e supervisao humana, reforcando que a IA deve apoiar o colaborador, nao substituir a validacao por setores responsaveis.

Evidencias recomendadas para esta secao:

- `07-pergunta-fora-da-base.png`;
- `08-intencao-local.png`;
- `09-protecao-prompt-injection.png`;
- `12-governanca.png`;
- `20-uso-openai.png`.

## 9. Parte Pratica e Publicacao

A aplicacao foi publicada na Vercel e validada em producao. O repositorio contem README, arquitetura, evidencias visuais, Pull Requests e documentacao de execucao.

Links finais:

- Aplicacao: https://nexahelp.vercel.app/
- Repositorio: https://github.com/gabriel-arnon/nexahelp
- Evidencias: `docs/evidencias/manifesto.md`

Evidencias recomendadas para esta secao:

- `15-repositorio-github.png`;
- `16-pr-estabilizacao.png`;
- `17-pr-integracao-openai.png`;
- `18-pr-documentacao-final.png`;
- `19-deploy-vercel.png`.

## 10. Conclusao

O NexaHelp AI atende ao desafio proposto ao demonstrar uma aplicacao funcional de copiloto corporativo com IA generativa, publicada, documentada e acompanhada de evidencias do processo de desenvolvimento assistido por IA.

O projeto mostra como ferramentas como Lovable, ChatGPT, Codex/OpenCode e OpenAI podem acelerar a criacao de uma solucao digital, desde o planejamento ate a implementacao, auditoria, validacao e organizacao academica. Ao mesmo tempo, evidencia a importancia de governanca, seguranca, privacidade e supervisao humana no uso de IA em contextos corporativos.
