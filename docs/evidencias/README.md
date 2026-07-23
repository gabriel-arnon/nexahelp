# Evidências

Este diretório é reservado para armazenar evidências dos testes realizados com o NexaHelp AI, no formato acadêmico da disciplina.

Evidências recomendadas:

- Print da aplicação publicada na Vercel: comprova que o projeto está acessível publicamente em produção.
- Print da página inicial em desktop e mobile: comprova responsividade e apresentação correta da proposta.
- Print do chat em modo mock: comprova que o modo de demonstração permanece funcional.
- Print do chat em modo api com resposta da OpenAI: comprova a integração real via `POST /api/chat`.
- Print de fontes clicáveis abertas: comprova rastreabilidade entre resposta e documentos consultados.
- Print de pergunta fora da base: comprova que o sistema responde sem fontes e sem acionar o modelo.
- Print de continuação contextual: comprova que o histórico é usado somente quando a pergunta depende do contexto anterior.
- Print de pergunta simples, como "Qual seu nome?": comprova resposta local sem consumo da API.
- Print da base de conhecimento com filtros aplicados: comprova navegação pelos 20 documentos fictícios.
- Print do painel de histórico de conversas: comprova persistência local no navegador.
- Print da página de governança: comprova a documentação de uso responsável dentro da aplicação.
- Print das validações no terminal: comprova lint, typecheck, testes automatizados e build aprovados.
- Vídeo curto do fluxo completo: comprova a jornada do usuário da pergunta até a conferência das fontes.
- Notas de teste com data, cenário, entrada, resultado esperado e obtido: comprovam rastreabilidade acadêmica da validação.

Nomeie os arquivos de forma descritiva, por exemplo:

```text
01-home-desktop.png
02-chat-pergunta-senha.png
03-fonte-aberta.png
04-base-filtro-seguranca.png
05-historico-conversas.png
```
