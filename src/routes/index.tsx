import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Building2,
  CircuitBoard,
  FileSearch,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  UserCog,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexaHelp AI — Copiloto Inteligente para Conhecimento Corporativo" },
      {
        name: "description",
        content:
          "Copiloto corporativo com IA generativa que responde dúvidas sobre procedimentos e políticas internas com base em uma base de conhecimento oficial.",
      },
      { property: "og:title", content: "NexaHelp AI — Copiloto Inteligente para Conhecimento Corporativo" },
      {
        property: "og:description",
        content: "Copiloto corporativo com IA generativa que responde dúvidas sobre procedimentos e políticas internas com base em uma base de conhecimento oficial.",
      },
    ],
  }),
  component: HomePage,
});

const AREAS = [
  {
    icon: CircuitBoard,
    titulo: "Tecnologia da Informação",
    descricao:
      "Acessos, chamados, softwares homologados e equipamentos corporativos.",
  },
  {
    icon: Users,
    titulo: "Recursos Humanos",
    descricao:
      "Férias, ponto, atestados e atualização de dados cadastrais.",
  },
  {
    icon: ShieldCheck,
    titulo: "Segurança da Informação",
    descricao:
      "Phishing, senhas, classificação da informação e incidentes.",
  },
  {
    icon: Building2,
    titulo: "Facilities e serviços internos",
    descricao:
      "Manutenção, salas de reunião, materiais e acesso de visitantes.",
  },
  {
    icon: UserCog,
    titulo: "Políticas corporativas",
    descricao:
      "Trabalho remoto, código de conduta, uso aceitável e viagens.",
  },
];

const BENEFITS = [
  {
    titulo: "Respostas rápidas",
    descricao:
      "Reduza o tempo gasto procurando informações em manuais e intranet.",
  },
  {
    titulo: "Fontes rastreáveis",
    descricao:
      "Cada resposta cita os documentos oficiais consultados.",
  },
  {
    titulo: "Padronização",
    descricao:
      "Orientações consistentes, alinhadas às políticas da empresa.",
  },
  {
    titulo: "Disponível 24/7",
    descricao:
      "Consulte procedimentos a qualquer momento, pelo navegador.",
  },
];

function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="grid gap-8 py-14 md:grid-cols-2 md:items-center md:py-20">
        <div className="space-y-6">
          <Badge variant="secondary" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            IA Generativa aplicada ao conhecimento corporativo
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            NexaHelp <span className="text-primary">AI</span>
          </h1>
          <p className="text-lg font-medium text-foreground">
            Copiloto Inteligente para Conhecimento Corporativo
          </p>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Um assistente corporativo que responde dúvidas sobre procedimentos internos,
            políticas, tecnologia da informação, recursos humanos, segurança e serviços
            administrativos — consultando uma base de conhecimento oficial e apresentando
            fontes verificáveis.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/assistente">
                Conversar com o assistente
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/base-conhecimento">Ver base de conhecimento</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            As respostas são geradas por IA e podem conter imprecisões — confirme
            informações críticas com o setor responsável.
          </p>
        </div>
        <div className="relative">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Assistente Corporativo
                </p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-primary-foreground">
                  Como faço para redefinir minha senha?
                </div>
              </div>
              <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-border bg-muted/40 px-3 py-2 text-foreground">
                Acesse o portal interno de acesso e selecione "Esqueci minha senha".
                Siga as instruções enviadas ao seu e-mail corporativo.
                <div className="mt-2 border-t border-border/60 pt-2 text-xs text-muted-foreground">
                  <span className="font-semibold">Fontes:</span> Redefinição de Senha,
                  Política de Senhas
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="border-t border-border py-14">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Como funciona
          </h2>
          <p className="mt-2 text-muted-foreground">
            Três passos para transformar dúvidas em orientações confiáveis.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: MessageSquare,
              titulo: "1. Você pergunta",
              descricao:
                "Escreva sua dúvida em linguagem natural, como faria com um colega.",
            },
            {
              icon: FileSearch,
              titulo: "2. A IA consulta a base",
              descricao:
                "O assistente consulta procedimentos e políticas corporativas oficiais.",
            },
            {
              icon: Bot,
              titulo: "3. Você recebe a resposta",
              descricao:
                "Orientação objetiva com as fontes consultadas para conferência.",
            },
          ].map(({ icon: Icon, titulo, descricao }) => (
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

      {/* Áreas atendidas */}
      <section className="border-t border-border py-14">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Áreas atendidas
          </h2>
          <p className="mt-2 text-muted-foreground">
            O NexaHelp AI cobre as principais frentes de dúvidas dos colaboradores.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map(({ icon: Icon, titulo, descricao }) => (
            <Card key={titulo}>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/30 text-primary">
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

      {/* Benefícios */}
      <section className="border-t border-border py-14">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Benefícios
          </h2>
          <p className="mt-2 text-muted-foreground">
            Ganhos práticos para colaboradores e para a organização.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ titulo, descricao }) => (
            <div
              key={titulo}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="text-sm font-semibold text-foreground">{titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{descricao}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Aviso IA */}
      <section className="py-10">
        <div className="rounded-xl border border-border bg-muted/40 p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Aviso sobre respostas geradas por IA
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                As respostas são produzidas por Inteligência Artificial e podem conter
                imprecisões. Sempre confirme informações críticas com o setor
                responsável e consulte os documentos oficiais.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
