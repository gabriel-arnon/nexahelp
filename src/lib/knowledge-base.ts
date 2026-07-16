import type { KnowledgeDocument } from "@/types/knowledge";

export type { CategoriaCorporativa, KnowledgeDocument } from "@/types/knowledge";
export { CATEGORIAS } from "@/types/knowledge";

export const KNOWLEDGE_BASE: KnowledgeDocument[] = [
  // ============ Tecnologia da Informação ============
  {
    id: "ti-001",
    titulo: "Redefinição de senha corporativa",
    categoria: "Tecnologia da Informação",
    descricao: "Procedimento oficial para redefinir a senha de acesso aos sistemas corporativos.",
    conteudo:
      "1. Acesse o portal interno de acesso em https://acesso.empresa.local.\n" +
      "2. Clique em 'Esqueci minha senha' na tela de login.\n" +
      "3. Informe seu e-mail corporativo cadastrado e confirme.\n" +
      "4. Você receberá um link de redefinição válido por 30 minutos no e-mail informado.\n" +
      "5. Abra o link, defina uma nova senha seguindo a Política de Criação de Senhas e confirme.\n\n" +
      "Caso sua conta esteja bloqueada, o link não chegue ou você não tenha mais acesso ao e-mail cadastrado, abra um chamado para o suporte de TI pelo Portal de Serviços, categoria 'Acessos > Redefinição de senha'. O prazo padrão de atendimento é de até 4 horas úteis.",
    palavrasChave: ["senha", "redefinir", "esqueci", "acesso", "login", "bloqueada"],
    atualizadoEm: "2026-02-14",
    status: "Ativo",
  },
  {
    id: "ti-002",
    titulo: "Abertura de chamado de suporte",
    categoria: "Tecnologia da Informação",
    descricao: "Como registrar um chamado para o setor de TI através do Portal de Serviços.",
    conteudo:
      "Todos os chamados de TI devem ser registrados exclusivamente pelo Portal de Serviços interno, disponível em https://servicos.empresa.local.\n\n" +
      "Passo a passo:\n" +
      "1. Autentique-se com suas credenciais corporativas.\n" +
      "2. Clique em 'Abrir chamado' e escolha a categoria adequada (Hardware, Software, Rede, Acessos, Outros).\n" +
      "3. Descreva o problema com o máximo de detalhes: sintomas, quando começou, mensagens de erro e impacto.\n" +
      "4. Anexe evidências (prints, fotos) quando possível.\n" +
      "5. Confirme a abertura e anote o número do chamado para acompanhamento.\n\n" +
      "SLA padrão: baixo (24h úteis), médio (8h úteis), alto (4h úteis), crítico (1h útil). Solicitações por e-mail, chat ou telefone não substituem o registro formal.",
    palavrasChave: ["chamado", "suporte", "ti", "abrir", "portal", "helpdesk"],
    atualizadoEm: "2026-01-22",
    status: "Ativo",
  },
  {
    id: "ti-003",
    titulo: "Instalação de programas homologados",
    categoria: "Tecnologia da Informação",
    descricao: "Regras para solicitar e instalar softwares em equipamentos corporativos.",
    conteudo:
      "Apenas softwares homologados pela área de TI podem ser instalados em equipamentos corporativos. A instalação por conta própria não é permitida e pode configurar violação da Política de Uso Aceitável.\n\n" +
      "Para solicitar a instalação de um novo software:\n" +
      "1. Consulte o Catálogo de Softwares Homologados no Portal de Serviços.\n" +
      "2. Se o software estiver disponível, abra um chamado na categoria 'Software > Instalação'.\n" +
      "3. Se o software não estiver homologado, solicite a homologação apresentando justificativa de negócio, fornecedor e finalidade.\n" +
      "4. Aguarde a avaliação da equipe de Segurança da Informação (até 5 dias úteis).\n\n" +
      "Softwares gratuitos e de código aberto também precisam de homologação.",
    palavrasChave: ["instalar", "programa", "software", "homologado", "aplicativo"],
    atualizadoEm: "2025-11-05",
    status: "Ativo",
  },
  {
    id: "ti-004",
    titulo: "Solicitação e devolução de equipamentos",
    categoria: "Tecnologia da Informação",
    descricao: "Processo para retirada, empréstimo e devolução de equipamentos corporativos.",
    conteudo:
      "Novos colaboradores recebem o kit padrão (notebook, mouse, headset) por meio da integração com o RH e a TI. Solicitações adicionais devem seguir o fluxo abaixo:\n\n" +
      "1. Abra um chamado no Portal de Serviços, categoria 'Hardware > Solicitação'.\n" +
      "2. Descreva o equipamento, a finalidade e a data desejada.\n" +
      "3. A solicitação passa por aprovação do gestor imediato.\n" +
      "4. Após aprovação, a TI agenda a entrega em até 5 dias úteis.\n\n" +
      "Devolução:\n" +
      "- Ao encerrar contrato ou trocar de função, todos os equipamentos devem ser devolvidos em até 5 dias úteis.\n" +
      "- A devolução é registrada em termo assinado e conferida pela TI.\n" +
      "- Danos causados por mau uso podem ser cobrados conforme política interna.",
    palavrasChave: ["equipamento", "notebook", "solicitar", "devolver", "hardware", "kit"],
    atualizadoEm: "2025-12-18",
    status: "Ativo",
  },

  // ============ Recursos Humanos ============
  {
    id: "rh-001",
    titulo: "Solicitação de férias",
    categoria: "Recursos Humanos",
    descricao: "Regras e prazos para a solicitação de férias no sistema de RH.",
    conteudo:
      "As férias devem ser solicitadas com antecedência mínima de 30 dias, respeitando o período aquisitivo e a legislação trabalhista vigente.\n\n" +
      "Passo a passo:\n" +
      "1. Acesse o portal de RH em https://rh.empresa.local.\n" +
      "2. Vá em 'Minhas férias' > 'Nova solicitação'.\n" +
      "3. Informe as datas desejadas e, se aplicável, o parcelamento (até 3 períodos, sendo um de ao menos 14 dias).\n" +
      "4. Envie para aprovação do gestor imediato.\n" +
      "5. Acompanhe o status pelo próprio portal.\n\n" +
      "O RH processa o pagamento e envia o aviso de férias em até 30 dias antes do início. Cancelamentos e alterações precisam de nova aprovação.",
    palavrasChave: ["férias", "solicitar", "descanso", "rh", "período aquisitivo"],
    atualizadoEm: "2026-01-10",
    status: "Ativo",
  },
  {
    id: "rh-002",
    titulo: "Registro e correção de ponto",
    categoria: "Recursos Humanos",
    descricao: "Como registrar o ponto diariamente e como solicitar correções.",
    conteudo:
      "O registro de ponto é obrigatório para todos os colaboradores em regime CLT e deve ser feito no aplicativo corporativo de ponto ou no relógio biométrico da unidade.\n\n" +
      "Registro:\n" +
      "- Entrada, início e fim de intervalo, e saída.\n" +
      "- Em caso de trabalho remoto, utilize o aplicativo com geolocalização ativada.\n\n" +
      "Correção:\n" +
      "1. Acesse o portal de RH e vá em 'Ponto > Correções'.\n" +
      "2. Selecione a data e informe o horário correto, com justificativa.\n" +
      "3. Anexe comprovantes quando existirem (e-mails, chamados, atestados).\n" +
      "4. O gestor imediato deve aprovar em até 3 dias úteis.\n\n" +
      "Correções devem ser feitas no mesmo mês da ocorrência, sempre que possível.",
    palavrasChave: ["ponto", "registro", "correção", "horário", "batida"],
    atualizadoEm: "2025-10-30",
    status: "Ativo",
  },
  {
    id: "rh-003",
    titulo: "Entrega de atestado médico",
    categoria: "Recursos Humanos",
    descricao: "Como enviar atestados médicos ao RH dentro do prazo.",
    conteudo:
      "Atestados médicos devem ser encaminhados ao RH em até 48 horas após a emissão, para justificar ausências e evitar descontos.\n\n" +
      "Como enviar:\n" +
      "1. Digitalize ou fotografe o atestado, garantindo boa legibilidade.\n" +
      "2. Acesse o portal de RH, opção 'Documentos > Enviar atestado'.\n" +
      "3. Preencha data, CID (quando informado), profissional e período de afastamento.\n" +
      "4. Anexe o arquivo (PDF, JPG ou PNG, até 10 MB).\n\n" +
      "Afastamentos superiores a 15 dias corridos são encaminhados à perícia do INSS. O RH orienta sobre os próximos passos.",
    palavrasChave: ["atestado", "médico", "afastamento", "saúde", "inss"],
    atualizadoEm: "2025-09-12",
    status: "Ativo",
  },
  {
    id: "rh-004",
    titulo: "Atualização de dados cadastrais",
    categoria: "Recursos Humanos",
    descricao: "Como manter seus dados pessoais atualizados no sistema de RH.",
    conteudo:
      "Manter os dados cadastrais atualizados é responsabilidade de cada colaborador, especialmente endereço, telefone, e-mail pessoal, estado civil e dependentes.\n\n" +
      "Passo a passo:\n" +
      "1. Acesse o portal de RH em 'Meu cadastro'.\n" +
      "2. Edite os campos desejados.\n" +
      "3. Anexe comprovantes quando exigido (comprovante de residência, certidões, documentos de dependentes).\n" +
      "4. Confirme e aguarde a validação do RH em até 3 dias úteis.\n\n" +
      "Alterações em conta bancária exigem confirmação por token enviado ao e-mail corporativo.",
    palavrasChave: ["cadastro", "dados", "endereço", "atualizar", "conta bancária"],
    atualizadoEm: "2025-08-20",
    status: "Ativo",
  },

  // ============ Segurança da Informação ============
  {
    id: "si-001",
    titulo: "Identificação de e-mails suspeitos (phishing)",
    categoria: "Segurança da Informação",
    descricao: "Sinais de phishing e como agir ao receber um e-mail suspeito.",
    conteudo:
      "E-mails de phishing tentam induzir o colaborador a clicar em links, baixar anexos ou fornecer credenciais.\n\n" +
      "Sinais de alerta:\n" +
      "- Remetente com domínio estranho ou parecido com o oficial.\n" +
      "- Senso de urgência, ameaças ou promessas.\n" +
      "- Erros de português, formatação estranha.\n" +
      "- Links que não correspondem ao texto exibido.\n" +
      "- Anexos inesperados, especialmente .zip, .exe, .html.\n\n" +
      "Como agir:\n" +
      "1. Não clique em links nem baixe anexos.\n" +
      "2. Não responda ao remetente.\n" +
      "3. Use o botão 'Reportar phishing' no cliente de e-mail corporativo.\n" +
      "4. Em caso de clique acidental ou fornecimento de dados, comunique imediatamente a Segurança da Informação pelo canal de incidentes.",
    palavrasChave: ["phishing", "email", "e-mail", "suspeito", "golpe", "fraude"],
    atualizadoEm: "2026-02-05",
    status: "Ativo",
  },
  {
    id: "si-002",
    titulo: "Política de criação e uso de senhas",
    categoria: "Segurança da Informação",
    descricao: "Requisitos mínimos de senha e boas práticas de uso.",
    conteudo:
      "Toda senha corporativa deve atender aos seguintes requisitos:\n" +
      "- No mínimo 12 caracteres.\n" +
      "- Combinação de letras maiúsculas, minúsculas, números e caracteres especiais.\n" +
      "- Não conter nome, data de nascimento, palavras óbvias ou sequências.\n" +
      "- Ser trocada a cada 90 dias.\n" +
      "- Não ser reutilizada nas últimas 10 senhas.\n\n" +
      "Boas práticas:\n" +
      "- Utilize o gerenciador de senhas corporativo.\n" +
      "- Nunca compartilhe sua senha, mesmo com colegas ou gestores.\n" +
      "- Ative o segundo fator de autenticação (MFA) em todos os sistemas que suportem.\n" +
      "- Em suspeita de vazamento, troque a senha imediatamente e abra um chamado.",
    palavrasChave: ["senha", "política", "criação", "segurança", "mfa"],
    atualizadoEm: "2026-02-05",
    status: "Ativo",
  },
  {
    id: "si-003",
    titulo: "Compartilhamento seguro de informações",
    categoria: "Segurança da Informação",
    descricao: "Regras para compartilhar documentos e informações corporativas.",
    conteudo:
      "Informações corporativas são classificadas em quatro níveis: pública, interna, confidencial e restrita. Cada nível possui regras específicas de compartilhamento.\n\n" +
      "Diretrizes:\n" +
      "- Utilize apenas as ferramentas corporativas homologadas (armazenamento, e-mail, chat).\n" +
      "- Nunca envie informações confidenciais para e-mails pessoais.\n" +
      "- Compartilhamento externo exige aprovação formal do responsável pela informação.\n" +
      "- Aplique controle de acesso ao criar pastas e arquivos: princípio do menor privilégio.\n" +
      "- Revise periodicamente os acessos concedidos e revogue quando não forem mais necessários.\n\n" +
      "Documentos restritos devem ser marcados como tal no cabeçalho e no metadado do arquivo.",
    palavrasChave: ["compartilhamento", "informação", "confidencial", "classificação"],
    atualizadoEm: "2025-12-01",
    status: "Ativo",
  },
  {
    id: "si-004",
    titulo: "Comunicação de incidentes de segurança",
    categoria: "Segurança da Informação",
    descricao: "Como reportar suspeitas ou confirmações de incidentes de segurança.",
    conteudo:
      "Qualquer suspeita de incidente deve ser comunicada imediatamente, mesmo sem certeza da gravidade. Um incidente pode envolver acesso indevido, perda ou roubo de equipamento, vazamento de dados, malware, engenharia social, entre outros.\n\n" +
      "Canais oficiais:\n" +
      "- Portal de Serviços, categoria 'Segurança > Incidentes'.\n" +
      "- E-mail seguranca@empresa.local.\n" +
      "- Telefone 24h do CSIRT interno: ramal 9000.\n\n" +
      "Ao reportar, forneça: data e hora, sistemas envolvidos, descrição do ocorrido, evidências (prints, e-mails, logs) e pessoas envolvidas. Não tente investigar ou corrigir sozinho: preserve as evidências e aguarde orientação da equipe de resposta a incidentes.",
    palavrasChave: ["incidente", "segurança", "vazamento", "reportar", "csirt"],
    atualizadoEm: "2026-01-28",
    status: "Ativo",
  },

  // ============ Facilities e serviços internos ============
  {
    id: "fa-001",
    titulo: "Solicitação de manutenção de equipamentos",
    categoria: "Facilities e serviços internos",
    descricao: "Como pedir manutenção corretiva ou preventiva de mobiliário e equipamentos.",
    conteudo:
      "Solicitações de manutenção referem-se a mobiliário, ar-condicionado, iluminação, cadeiras, mesas ajustáveis e demais itens de infraestrutura.\n\n" +
      "Passo a passo:\n" +
      "1. Acesse o Portal de Serviços, categoria 'Facilities > Manutenção'.\n" +
      "2. Descreva o problema, o local (andar, sala, posição) e o nível de impacto.\n" +
      "3. Anexe fotos quando possível.\n" +
      "4. Envie o chamado e acompanhe o andamento.\n\n" +
      "Prazos padrão: preventiva (até 10 dias úteis), corretiva simples (até 3 dias úteis), corretiva crítica (até 24h). Em situações que ofereçam risco (fiação exposta, vazamentos, cheiro de queimado), acione também a portaria imediatamente.",
    palavrasChave: ["manutenção", "equipamento", "ar-condicionado", "cadeira", "mesa"],
    atualizadoEm: "2025-11-19",
    status: "Ativo",
  },
  {
    id: "fa-002",
    titulo: "Reserva de salas de reunião",
    categoria: "Facilities e serviços internos",
    descricao: "Como reservar salas de reunião e boas práticas de uso.",
    conteudo:
      "As salas de reunião podem ser reservadas pelo calendário corporativo integrado ao sistema de agendamento.\n\n" +
      "Como reservar:\n" +
      "1. No calendário, crie um evento e adicione a sala como recurso.\n" +
      "2. Confirme a disponibilidade antes de convocar os participantes.\n" +
      "3. Utilize apenas o tempo necessário; libere a sala ao final.\n\n" +
      "Boas práticas:\n" +
      "- Cancele reservas não utilizadas com antecedência.\n" +
      "- Não altere a disposição do mobiliário sem autorização.\n" +
      "- Ao final, apague luzes, desligue TVs e recolha copos ou embalagens.\n" +
      "- Salas com equipamentos audiovisuais possuem manual afixado; siga as orientações.",
    palavrasChave: ["sala", "reunião", "reservar", "agendar", "calendário"],
    atualizadoEm: "2025-10-08",
    status: "Ativo",
  },
  {
    id: "fa-003",
    titulo: "Solicitação de material de escritório",
    categoria: "Facilities e serviços internos",
    descricao: "Como solicitar itens de papelaria e insumos de escritório.",
    conteudo:
      "Materiais de escritório (canetas, blocos, tonner, pilhas, itens de copa) são solicitados pelo Portal de Serviços, categoria 'Facilities > Materiais'.\n\n" +
      "Regras:\n" +
      "- Solicitações são consolidadas semanalmente, todas as sextas-feiras.\n" +
      "- Itens fora do catálogo padrão exigem justificativa e aprovação do gestor.\n" +
      "- Itens de alto valor (ex.: cadeiras ergonômicas, monitores adicionais) seguem o processo específico de solicitação de equipamentos.\n\n" +
      "O prazo padrão de entrega é de 5 dias úteis após a consolidação semanal.",
    palavrasChave: ["material", "escritório", "papelaria", "canetas", "insumos"],
    atualizadoEm: "2025-09-27",
    status: "Ativo",
  },
  {
    id: "fa-004",
    titulo: "Acesso e crachá de visitantes",
    categoria: "Facilities e serviços internos",
    descricao: "Como cadastrar visitantes e regras de acesso às unidades.",
    conteudo:
      "O acesso de visitantes deve ser previamente autorizado pelo colaborador anfitrião.\n\n" +
      "Cadastro:\n" +
      "1. Acesse o Portal de Facilities, opção 'Visitantes > Novo cadastro'.\n" +
      "2. Informe nome completo, documento, empresa, data e horário previsto.\n" +
      "3. Selecione as áreas de acesso permitidas.\n" +
      "4. O visitante recebe um QR Code por e-mail para apresentar na recepção.\n\n" +
      "Regras:\n" +
      "- Visitantes devem usar crachá visível durante toda a permanência.\n" +
      "- O anfitrião é responsável por acompanhar o visitante em áreas restritas.\n" +
      "- Ao final da visita, o crachá deve ser devolvido na recepção.",
    palavrasChave: ["visitante", "crachá", "acesso", "recepção", "portaria"],
    atualizadoEm: "2025-11-02",
    status: "Ativo",
  },

  // ============ Políticas corporativas ============
  {
    id: "pc-001",
    titulo: "Política de trabalho remoto",
    categoria: "Políticas corporativas",
    descricao: "Regras, elegibilidade e responsabilidades no trabalho remoto.",
    conteudo:
      "O modelo de trabalho remoto é oferecido em regime híbrido, com percentuais definidos por área e função. A elegibilidade é avaliada pelo gestor imediato, considerando maturidade do cargo, natureza das atividades e desempenho.\n\n" +
      "Responsabilidades do colaborador em regime remoto:\n" +
      "- Manter ambiente de trabalho seguro, ergonômico e com conexão estável.\n" +
      "- Cumprir a jornada acordada e registrar o ponto normalmente.\n" +
      "- Participar de reuniões com câmera quando solicitado.\n" +
      "- Zelar pela segurança da informação: rede confiável, tela bloqueada, sem exposição de dados.\n\n" +
      "A empresa fornece auxílio home office conforme política vigente. Viagens ou mudanças de cidade durante o trabalho remoto devem ser comunicadas ao gestor e ao RH.",
    palavrasChave: ["trabalho remoto", "home office", "híbrido", "política"],
    atualizadoEm: "2026-01-15",
    status: "Ativo",
  },
  {
    id: "pc-002",
    titulo: "Código de conduta e ética",
    categoria: "Políticas corporativas",
    descricao: "Princípios éticos e padrões de conduta esperados de todos os colaboradores.",
    conteudo:
      "O Código de Conduta orienta o comportamento profissional e ético de todos os colaboradores, fornecedores e parceiros.\n\n" +
      "Princípios:\n" +
      "- Respeito, diversidade e não discriminação.\n" +
      "- Integridade, honestidade e transparência.\n" +
      "- Combate a assédio, corrupção, fraude e conflito de interesses.\n" +
      "- Confidencialidade das informações corporativas e de terceiros.\n" +
      "- Uso responsável de recursos e canais oficiais.\n\n" +
      "Denúncias e dúvidas éticas podem ser encaminhadas ao Canal de Ética, com sigilo garantido e proteção contra retaliação. Violações estão sujeitas a medidas disciplinares, conforme a gravidade.",
    palavrasChave: ["código", "conduta", "ética", "assédio", "denúncia"],
    atualizadoEm: "2025-12-10",
    status: "Ativo",
  },
  {
    id: "pc-003",
    titulo: "Política de uso aceitável de recursos",
    categoria: "Políticas corporativas",
    descricao: "Regras de uso de equipamentos, sistemas, internet e e-mail corporativos.",
    conteudo:
      "Os recursos tecnológicos corporativos (equipamentos, sistemas, internet, e-mail, telefone) são disponibilizados para uso profissional.\n\n" +
      "É permitido:\n" +
      "- Uso pessoal esporádico e razoável, desde que não interfira nas atividades e não viole demais políticas.\n\n" +
      "É proibido:\n" +
      "- Acessar conteúdos ilegais, ofensivos, discriminatórios ou pornográficos.\n" +
      "- Instalar softwares não homologados.\n" +
      "- Utilizar recursos corporativos para atividades comerciais paralelas.\n" +
      "- Compartilhar credenciais ou burlar controles de segurança.\n\n" +
      "A empresa monitora o uso dos recursos conforme legislação aplicável e sempre com finalidade legítima. O descumprimento pode ensejar medidas disciplinares.",
    palavrasChave: ["uso aceitável", "internet", "recursos", "política", "monitoramento"],
    atualizadoEm: "2025-11-24",
    status: "Ativo",
  },
  {
    id: "pc-004",
    titulo: "Política de viagens e reembolsos",
    categoria: "Políticas corporativas",
    descricao: "Regras para viagens a serviço, adiantamentos e prestação de contas.",
    conteudo:
      "Viagens a serviço devem ser previamente aprovadas pelo gestor e registradas no sistema de viagens corporativo.\n\n" +
      "Antes da viagem:\n" +
      "1. Solicite a aprovação com pelo menos 7 dias úteis de antecedência.\n" +
      "2. Utilize a agência corporativa para reservas de passagens e hospedagem.\n" +
      "3. Solicite adiantamento, se necessário, com base nas diárias vigentes.\n\n" +
      "Durante a viagem:\n" +
      "- Guarde todos os comprovantes originais.\n" +
      "- Respeite os limites de despesas e a categoria de hospedagem definidas por cargo.\n\n" +
      "Após a viagem:\n" +
      "- Preste contas em até 10 dias úteis, anexando comprovantes ao sistema.\n" +
      "- Devolva eventual saldo do adiantamento.\n\n" +
      "Reembolsos sem comprovação adequada não são aprovados.",
    palavrasChave: ["viagem", "reembolso", "diária", "hospedagem", "prestação de contas"],
    atualizadoEm: "2025-10-15",
    status: "Ativo",
  },
];

export function getDocumentById(id: string): KnowledgeDocument | undefined {
  return KNOWLEDGE_BASE.find((doc) => doc.id === id);
}

export function getDocumentsByIds(ids: string[]): KnowledgeDocument[] {
  return ids.map((id) => getDocumentById(id)).filter((d): d is KnowledgeDocument => Boolean(d));
}
