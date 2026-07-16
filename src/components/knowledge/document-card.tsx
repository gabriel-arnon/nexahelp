import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { KnowledgeDocument } from "@/types/knowledge";

interface DocumentCardProps {
  document: KnowledgeDocument;
  onOpen: (id: string) => void;
}

function formatDate(iso: string): string {
  try {
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function DocumentCard({ document, onOpen }: DocumentCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(document.id)}
      className="text-left transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
    >
      <Card className="h-full transition-colors hover:border-primary/40 hover:shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="secondary" className="font-normal">
              {document.categoria}
            </Badge>
            <Badge
              variant="outline"
              className="border-success/40 bg-success/10 font-normal text-success"
            >
              {document.status}
            </Badge>
          </div>
          <CardTitle className="mt-2 text-base leading-snug">{document.titulo}</CardTitle>
          <CardDescription className="line-clamp-2">{document.descricao}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Atualizado em {formatDate(document.atualizadoEm)}
          </p>
        </CardContent>
      </Card>
    </button>
  );
}
