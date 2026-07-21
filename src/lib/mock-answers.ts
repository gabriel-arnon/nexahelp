import { KNOWLEDGE_BASE } from "@/lib/knowledge-base";
import type { ChatServiceResponse } from "@/types/chat";

interface AnswerRule {
  keywords: string[];
  resposta: string;
  fontes: string[]; // IDs of KnowledgeDocument
}

const RULES: AnswerRule[] = [
  {
    keywords: ["senha", "redefinir", "esqueci", "esqueci minha senha", "reset"],
    resposta:
      "Para redefinir sua senha corporativa, acesse o portal interno de acesso e selecione a opção 'Esqueci minha senha'. Informe seu e-mail corporativo cadastrado e siga as instruções recebidas — o link é válido por 30 minutos. Caso sua conta esteja bloqueada ou você não tenha acesso ao e-mail, abra um chamado para o suporte de TI na categoria 'Acessos > Redefinição de senha'.",
    fontes: ["ti-001", "si-002"],
  },
  {
    keywords: ["férias", "ferias", "descanso", "período aquisitivo"],
    resposta:
      "As férias devem ser solicitadas com antecedência mínima de 30 dias pelo portal de RH, opção 'Minhas férias > Nova solicitação'. Informe as datas desejadas e, se for o caso, o parcelamento em até 3 períodos (sendo um deles de no mínimo 14 dias). A solicitação segue para aprovação do gestor imediato e o aviso de férias é emitido pelo RH até 30 dias antes do início.",
    fontes: ["rh-001"],
  },
  {
    keywords: [
      "e-mail suspeito",
      "email suspeito",
      "phishing",
      "golpe",
      "fraude",
      "e-mail estranho",
    ],
    resposta:
      "Ao receber um e-mail suspeito, não clique em links nem abra anexos e não responda ao remetente. Utilize o botão 'Reportar phishing' do seu cliente de e-mail corporativo. Se você já tiver clicado em algum link ou fornecido dados, comunique imediatamente a equipe de Segurança da Informação pelo canal de incidentes para conter possíveis impactos.",
    fontes: ["si-001", "si-004"],
  },
  {
    keywords: ["chamado", "abrir chamado", "helpdesk", "suporte ti", "suporte de ti"],
    resposta:
      "Chamados para o setor de TI devem ser abertos exclusivamente pelo Portal de Serviços interno. Autentique-se, clique em 'Abrir chamado', escolha a categoria adequada (Hardware, Software, Rede, Acessos etc.), descreva o problema em detalhes e anexe evidências quando possível. O prazo de atendimento segue o SLA definido pela criticidade informada.",
    fontes: ["ti-002"],
  },
  {
    keywords: ["trabalho remoto", "home office", "híbrido", "hibrido"],
    resposta:
      "A empresa adota o modelo híbrido de trabalho, com percentuais de home office definidos por área e função. A elegibilidade é avaliada pelo gestor imediato. O colaborador em regime remoto deve manter ambiente seguro e ergonômico, cumprir a jornada com registro de ponto, participar de reuniões com câmera quando solicitado e zelar pela segurança da informação. Viagens ou mudanças de cidade durante o trabalho remoto devem ser comunicadas ao gestor e ao RH.",
    fontes: ["pc-001"],
  },
  {
    keywords: ["manutenção", "manutencao", "cadeira", "ar-condicionado", "ar condicionado", "mesa"],
    resposta:
      "Para solicitar manutenção de equipamentos ou mobiliário, abra um chamado no Portal de Serviços na categoria 'Facilities > Manutenção'. Descreva o problema, informe o local exato (andar, sala, posição) e o nível de impacto, anexando fotos sempre que possível. Situações de risco (fiação exposta, vazamentos, cheiro de queimado) devem ser comunicadas imediatamente também à portaria.",
    fontes: ["fa-001"],
  },
  {
    keywords: ["ponto", "bater ponto", "correção ponto", "batida", "registro de ponto"],
    resposta:
      "O ponto deve ser registrado no aplicativo corporativo ou no relógio biométrico, incluindo entrada, intervalos e saída. Para correções, acesse o portal de RH em 'Ponto > Correções', selecione a data, informe o horário correto com justificativa e anexe comprovantes se houver. A correção precisa ser aprovada pelo gestor imediato em até 3 dias úteis.",
    fontes: ["rh-002"],
  },
  {
    keywords: ["atestado", "atestado médico", "afastamento"],
    resposta:
      "Atestados médicos devem ser enviados ao RH em até 48 horas após a emissão. Acesse o portal de RH em 'Documentos > Enviar atestado', preencha data, CID (quando informado), profissional e período de afastamento, e anexe o arquivo (PDF, JPG ou PNG, até 10 MB). Afastamentos superiores a 15 dias corridos são encaminhados à perícia do INSS.",
    fontes: ["rh-003"],
  },
  {
    keywords: ["instalar", "instalação", "software", "programa", "aplicativo"],
    resposta:
      "Apenas softwares homologados podem ser instalados em equipamentos corporativos. Consulte o Catálogo de Softwares Homologados no Portal de Serviços; se o programa estiver disponível, abra um chamado em 'Software > Instalação'. Caso o software ainda não seja homologado, solicite a homologação apresentando justificativa de negócio, fornecedor e finalidade — a avaliação de Segurança da Informação leva até 5 dias úteis.",
    fontes: ["ti-003", "pc-003"],
  },
  {
    keywords: ["equipamento", "notebook", "solicitar equipamento", "hardware"],
    resposta:
      "Solicitações de equipamentos adicionais devem ser feitas no Portal de Serviços em 'Hardware > Solicitação', descrevendo o item, a finalidade e a data desejada. A solicitação passa pela aprovação do gestor imediato e a entrega é agendada pela TI em até 5 dias úteis. Na saída da empresa ou troca de função, todos os equipamentos precisam ser devolvidos em até 5 dias úteis mediante termo assinado.",
    fontes: ["ti-004"],
  },
  {
    keywords: ["incidente", "vazamento", "reportar incidente"],
    resposta:
      "Qualquer suspeita de incidente de segurança deve ser comunicada imediatamente, mesmo sem certeza da gravidade. Utilize o Portal de Serviços em 'Segurança > Incidentes', o e-mail seguranca@empresa.local ou o ramal 24h do CSIRT (9000). Informe data, hora, sistemas envolvidos, descrição e evidências. Não tente investigar ou corrigir sozinho: preserve as evidências e aguarde a equipe de resposta.",
    fontes: ["si-004"],
  },
  {
    keywords: ["sala", "reunião", "reserva", "reservar sala"],
    resposta:
      "As salas de reunião são reservadas pelo calendário corporativo. Crie o evento, adicione a sala como recurso e confirme a disponibilidade antes de convocar os participantes. Utilize apenas o tempo necessário, libere a sala ao término e mantenha o ambiente organizado.",
    fontes: ["fa-002"],
  },
  {
    keywords: ["material", "papelaria", "canetas", "escritório"],
    resposta:
      "Materiais de escritório são solicitados pelo Portal de Serviços em 'Facilities > Materiais'. As solicitações são consolidadas às sextas-feiras e entregues em até 5 dias úteis após a consolidação. Itens fora do catálogo padrão exigem justificativa e aprovação do gestor.",
    fontes: ["fa-003"],
  },
  {
    keywords: ["visitante", "crachá", "recepção", "portaria"],
    resposta:
      "O acesso de visitantes deve ser autorizado previamente pelo colaborador anfitrião. Cadastre a visita no Portal de Facilities em 'Visitantes > Novo cadastro' informando dados pessoais, empresa, data, horário e áreas permitidas. O visitante recebe um QR Code por e-mail para apresentar na recepção. O anfitrião é responsável por acompanhar o visitante em áreas restritas.",
    fontes: ["fa-004"],
  },
  {
    keywords: ["cadastro", "endereço", "atualizar cadastro", "dados pessoais", "conta bancária"],
    resposta:
      "Para atualizar seus dados cadastrais, acesse o portal de RH em 'Meu cadastro', edite os campos desejados e anexe os comprovantes exigidos. O RH valida a atualização em até 3 dias úteis. Alterações em conta bancária exigem confirmação por token enviado ao e-mail corporativo.",
    fontes: ["rh-004"],
  },
  {
    keywords: ["conduta", "ética", "assédio", "denúncia", "canal de ética"],
    resposta:
      "O Código de Conduta orienta o comportamento profissional e ético de todos os colaboradores, com princípios de respeito, integridade, transparência e combate a assédio, corrupção e conflito de interesses. Denúncias e dúvidas éticas podem ser encaminhadas ao Canal de Ética, com sigilo garantido e proteção contra retaliação.",
    fontes: ["pc-002"],
  },
  {
    keywords: ["viagem", "reembolso", "diária", "hospedagem"],
    resposta:
      "Viagens a serviço precisam ser aprovadas pelo gestor com pelo menos 7 dias úteis de antecedência e registradas no sistema corporativo. Reservas devem ser feitas pela agência corporativa, e a prestação de contas com todos os comprovantes deve ser enviada em até 10 dias úteis após o retorno. Reembolsos sem comprovação adequada não são aprovados.",
    fontes: ["pc-004"],
  },
  {
    keywords: ["compartilhar", "confidencial", "classificação da informação"],
    resposta:
      "Informações corporativas são classificadas em pública, interna, confidencial e restrita, com regras específicas de compartilhamento para cada nível. Utilize apenas ferramentas homologadas, nunca envie informações confidenciais para e-mails pessoais e siga o princípio do menor privilégio ao conceder acessos. Compartilhamento externo exige aprovação formal do responsável pela informação.",
    fontes: ["si-003"],
  },
  {
    keywords: ["política de senha", "requisitos de senha", "mfa", "autenticação"],
    resposta:
      "As senhas corporativas devem ter no mínimo 12 caracteres, combinar maiúsculas, minúsculas, números e símbolos, e ser trocadas a cada 90 dias, sem reutilizar as 10 últimas. Utilize o gerenciador de senhas corporativo, nunca compartilhe sua senha e ative o segundo fator de autenticação (MFA) em todos os sistemas que suportem.",
    fontes: ["si-002"],
  },
  {
    keywords: ["uso aceitável", "internet corporativa", "uso pessoal"],
    resposta:
      "Os recursos corporativos são disponibilizados para uso profissional, admitido uso pessoal esporádico e razoável. É proibido acessar conteúdos ilegais ou ofensivos, instalar softwares não homologados, utilizar recursos para atividades comerciais paralelas ou compartilhar credenciais. A empresa monitora o uso conforme legislação aplicável.",
    fontes: ["pc-003"],
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function resolveMockAnswer(pergunta: string): ChatServiceResponse {
  const q = normalize(pergunta);

  // Score each rule by number of keyword matches
  let best: { rule: AnswerRule; score: number } | null = null;
  for (const rule of RULES) {
    let score = 0;
    for (const kw of rule.keywords) {
      if (q.includes(normalize(kw))) score += 1;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { rule, score };
    }
  }

  if (best) {
    return { resposta: best.rule.resposta, fontes: best.rule.fontes };
  }

  // Fallback: try keyword match in the knowledge base itself
  const doc = KNOWLEDGE_BASE.find((d) => d.palavrasChave.some((kw) => q.includes(normalize(kw))));
  if (doc) {
    return {
      resposta:
        `Encontrei um procedimento relacionado à sua pergunta: "${doc.titulo}". ` +
        `Resumo: ${doc.descricao} Consulte o documento completo em 'Fontes consultadas' para os passos detalhados.`,
      fontes: [doc.id],
    };
  }

  return {
    resposta:
      "Não encontrei informações suficientes na base de conhecimento para responder com segurança. Consulte o setor responsável ou reformule sua pergunta com mais detalhes.",
    fontes: [],
  };
}
