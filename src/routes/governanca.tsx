import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Eye, Lock, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getChatMode } from "@/lib/chat-mode";

function getGovernancaDescription(): string {
  if (getChatMode() === "api") {
    return "Princípios de governança, transparência e uso responsável de IA no NexaHelp AI.";
  }
  return "Princípios de governança e transparência da versão acadêmica em modo de demonstração do NexaHelp AI.";
}

export const Route = createFileRoute("/governanca")({
  head: () => {
    const description = getGovernancaDescription();
    return {
      meta: [
        { title: "Governança e uso responsável — NexaHelp AI" },
        {
          name: "description",
          content: description,
        },
        { property: "og:title", content: "Governança e uso responsável — NexaHelp AI" },
        {
          property: "og:description",
          content: description,
        },
      ],
    };
  },
  component: GovernancaPage,
});

function getPrincipios(isApi: boolean) {
  return [
    {
      icon: Eye,
      titulo: "Transparência",
      descricao: isApi
        ? "Cada resposta indica os documentos corporativos consultados, permitindo verificação."
        : "Cada resposta demonstrativa indica documentos corporativos simulados, permitindo verificação do escopo.",
    },
    {
      icon: Lock,
      titulo: "Privacidade",
      descricao:
        "Não envie dados pessoais, confidenciais ou sensíveis ao assistente. As interações podem ser utilizadas para melhoria do sistema.",
    },
    {
      icon: ShieldCheck,
      titulo: "Segurança",
      descricao: isApi
        ? "O assistente responde com base na base de conhecimento corporativa configurada."
        : "O assistente responde somente com base na base de conhecimento fictícia desta demonstração.",
    },
    {
      icon: UserCheck,
      titulo: "Supervisão humana",
      descricao:
        "As respostas são apoio à decisão. Casos críticos exigem revisão de um profissional responsável.",
    },
    {
      icon: Sparkles,
      titulo: "Responsabilidade",
      descricao:
        "O sistema é um copiloto e não substitui os setores responsáveis pelas políticas e procedimentos.",
    },
    {
      icon: AlertTriangle,
      titulo: "Prevenção de respostas inventadas",
      descricao:
        "Quando a base não cobre a dúvida, o assistente informa e recomenda consultar o setor competente, em vez de inventar procedimentos.",
    },
  ];
}

function GovernancaPage() {
  const isApi = getChatMode() === "api";
  const principios = getPrincipios(isApi);

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Governança e uso responsável
        </h1>
        <p className="text-muted-foreground">
          {isApi
            ? "O NexaHelp AI utiliza Inteligência Artificial Generativa como ferramenta de apoio ao conhecimento corporativo. Esta página descreve os princípios que orientam o uso responsável do assistente."
            : "O NexaHelp AI está em modo de demonstração acadêmica, com respostas simuladas sobre uma base de conhecimento fictícia. Esta página descreve os princípios que orientam o uso responsável do assistente."}
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          O que você precisa saber
        </h2>
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>
            •{" "}
            {isApi
              ? "As respostas são geradas por Inteligência Artificial."
              : "As respostas são demonstrativas e simuladas para fins acadêmicos."}
          </li>
          <li>
            •{" "}
            {isApi
              ? "A IA pode cometer erros; informações críticas devem ser confirmadas."
              : "A demonstração pode conter simplificações; informações críticas devem ser confirmadas."}
          </li>
          <li>
            •{" "}
            {isApi
              ? "O sistema responde com base na base de conhecimento corporativa configurada."
              : "O sistema responde com base em documentos corporativos simulados."}
          </li>
          <li>
            • Dados pessoais, confidenciais ou sensíveis não devem ser enviados ao assistente.
          </li>
          <li>• As interações podem ser utilizadas para melhoria contínua do sistema.</li>
          <li>• Deve existir supervisão humana em decisões relevantes apoiadas pelo assistente.</li>
          <li>
            • O NexaHelp AI não substitui os setores responsáveis (TI, RH, Segurança, Facilities,
            Jurídico e demais áreas).
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Princípios de governança
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {principios.map(({ icon: Icon, titulo, descricao }) => (
            <Card key={titulo}>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{titulo}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{descricao}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-muted/40 p-6">
        <h3 className="text-sm font-semibold text-foreground">Aviso importante</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {isApi
            ? "Esta versão reserva a integração real para código executado no servidor. A chave da OpenAI deve permanecer exclusivamente no servidor e nunca ser exposta ao navegador."
            : "Esta é uma versão acadêmica com respostas simuladas para demonstração. A arquitetura está preparada para integração futura com a OpenAI por meio de POST /api/chat executado no servidor, sem expor chaves de API no navegador."}
        </p>
      </section>
    </div>
  );
}
