# Manifesto de evidencias finais

Capturas realizadas em 24/07/2026. As imagens pendentes nao foram substituidas por simulacoes: devem ser produzidas manualmente nas condicoes indicadas.

| Arquivo | Descricao | Origem | Data da captura | Status | Uso sugerido no PDF |
|---|---|---|---|---|---|
| 01-home-desktop.png | Pagina inicial completa em desktop | Aplicacao publica | 24/07/2026 | Capturado | Apresentacao da solucao |
| 02-home-mobile.png | Pagina inicial responsiva em mobile | Aplicacao publica | 24/07/2026 | Capturado | Responsividade |
| 03-assistente-inicial.png | Assistente inicial com sugestoes e badge IA conectada | Aplicacao publica | 24/07/2026 | Capturado | Interface do assistente |
| 04-resposta-real-senha.png | Resposta completa sobre redefinicao de senha e fontes | Aplicacao publica | - | Pendente | Funcionamento da IA |
| 05-fonte-clicavel-aberta.png | Dialogo de fonte aberta, com categoria, conteudo e data | Aplicacao publica | 24/07/2026 | Capturado | Rastreabilidade das fontes |
| 06-continuacao-contextual.png | Resposta completa para a continuacao contextual | Aplicacao publica | - | Pendente | Uso de contexto |
| 07-pergunta-fora-da-base.png | Resposta de base insuficiente sem fontes | Aplicacao publica | 24/07/2026 | Capturado | Limites da base de conhecimento |
| 08-intencao-local.png | Resposta local para pergunta de identidade | Aplicacao publica | 24/07/2026 | Capturado | Otimizacao sem API |
| 09-protecao-prompt-injection.png | Recusa segura a tentativa de prompt injection | Aplicacao publica | - | Pendente | Seguranca da solucao |
| 10-base-conhecimento.png | Base de conhecimento com documentos e filtros | Aplicacao publica | 24/07/2026 | Capturado | Organizacao do conhecimento |
| 11-base-conhecimento-filtrada.png | Base filtrada por Seguranca da Informacao | Aplicacao publica | 24/07/2026 | Capturado | Navegacao e filtros |
| 12-governanca.png | Pagina de governanca e uso responsavel | Aplicacao publica | 24/07/2026 | Capturado | IA responsavel |
| 13-historico-conversas.png | Painel com conversa local arquivada | Aplicacao publica | 24/07/2026 | Capturado | Persistencia local |
| 14-menu-mobile.png | Menu de navegacao na interface mobile | Aplicacao publica | 24/07/2026 | Capturado | Responsividade |
| 15-repositorio-github.png | Pagina principal do repositorio e estrutura geral | GitHub publico | 24/07/2026 | Capturado | Codigo e documentacao |
| 16-pr-estabilizacao.png | PR 1 com titulo, merge e validacoes | GitHub publico | 24/07/2026 | Capturado | Evolucao do desenvolvimento |
| 17-pr-integracao-openai.png | PR 2 com integracao OpenAI e validacoes | GitHub publico | 24/07/2026 | Capturado | Integracao da IA |
| 18-pr-documentacao-final.png | PR 3 com atualizacao documental | GitHub publico | 24/07/2026 | Capturado | Finalizacao do projeto |
| 19-deploy-vercel.png | Deploy de producao com status Ready e dominio | Vercel autenticada | - | Pendente | Publicacao em producao |
| 20-uso-openai.png | Painel de consumo sem chaves de API | OpenAI autenticada | - | Pendente | Monitoramento de uso |
| 21-planejamento-chatgpt.png | Conversa com planejamento inicial, objetivo e escopo do projeto | Captura manual do usuario | - | Pendente | Planejamento |
| 22-plano-lovable.png | Plano ou iteracoes realizadas no Lovable | Captura manual do usuario | - | Pendente | Processo de desenvolvimento |
| 23-auditoria-codex.png | Conversa do Codex com auditoria tecnica e achados | Captura manual do usuario | - | Pendente | Qualidade e revisao |
| 24-correcao-relevancia-codex.png | Conversa do Codex com correcao de relevancia das fontes ou respostas | Captura manual do usuario | - | Pendente | Refinamento da IA |
| 25-testes-codex.png | Conversa do Codex com execucao e resultado dos testes | Captura manual do usuario | - | Pendente | Validacao tecnica |

## Pendencias de captura

- `04-resposta-real-senha.png`, `06-continuacao-contextual.png` e `09-protecao-prompt-injection.png`: duas tentativas reais foram executadas para cada cenario, mas as capturas obtidas ficaram com parte da resposta ou das fontes fora da area visivel. Nao foram mantidas para evitar evidencias cortadas. Refaca cada cenario em uma sessao autorizada, aguardando a resposta e garantindo que pergunta, resposta integral e fontes estejam visiveis.
- `19-deploy-vercel.png` e `20-uso-openai.png`: a automacao nao dispunha de sessao autenticada. Realize somente apos login normal, sem exibir variaveis de ambiente, chaves, tokens ou outros segredos.
- `21-planejamento-chatgpt.png` a `25-testes-codex.png`: a interface desta conversa nao pode ser capturada pelo codigo do repositorio. Registre manualmente a conversa correspondente, ocultando informacoes pessoais e credenciais.

Nenhuma imagem deste diretorio contem arquivos `.env`, chaves de API, cookies, tokens, cabecalhos de autorizacao ou credenciais.
