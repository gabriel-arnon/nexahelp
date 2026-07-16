import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SourceDialog } from "@/components/chat/source-dialog";
import { DocumentCard } from "@/components/knowledge/document-card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CATEGORIAS, KNOWLEDGE_BASE } from "@/lib/knowledge-base";
import type { CategoriaCorporativa } from "@/types/knowledge";

type Filter = "Todas" | CategoriaCorporativa;

export const Route = createFileRoute("/base-conhecimento")({
  head: () => ({
    meta: [
      { title: "Base de conhecimento — NexaHelp AI" },
      {
        name: "description",
        content:
          "Consulte os procedimentos internos, políticas corporativas e serviços da empresa organizados por categoria.",
      },
      { property: "og:title", content: "Base de conhecimento — NexaHelp AI" },
      {
        property: "og:description",
        content: "Documentos internos consultados pelo assistente NexaHelp AI.",
      },
    ],
  }),
  component: KnowledgeBasePage,
});

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function KnowledgeBasePage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("Todas");
  const [sourceId, setSourceId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return KNOWLEDGE_BASE.filter((doc) => {
      if (filter !== "Todas" && doc.categoria !== filter) return false;
      if (!q) return true;
      const haystack = normalize(
        [doc.titulo, doc.descricao, doc.palavrasChave.join(" ")].join(" "),
      );
      return haystack.includes(q);
    });
  }, [query, filter]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Base de conhecimento
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Documentos internos consultados pelo assistente. Use a busca e os filtros
          para encontrar procedimentos e políticas corporativas.
        </p>
      </header>

      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título, descrição ou palavra-chave..."
            className="pl-9"
            aria-label="Buscar na base de conhecimento"
          />
        </div>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-muted/60 p-1">
            <TabsTrigger value="Todas" className="text-xs sm:text-sm">
              Todas
            </TabsTrigger>
            {CATEGORIAS.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="text-xs sm:text-sm">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <p className="text-sm text-muted-foreground">
          {filtered.length}{" "}
          {filtered.length === 1 ? "documento encontrado" : "documentos encontrados"}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhum documento corresponde à sua busca.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} document={doc} onOpen={setSourceId} />
          ))}
        </div>
      )}

      <SourceDialog
        documentId={sourceId}
        onOpenChange={(open) => !open && setSourceId(null)}
      />
    </div>
  );
}
