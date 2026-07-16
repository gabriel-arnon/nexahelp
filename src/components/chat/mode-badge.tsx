import { FlaskConical, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getChatMode } from "@/services/chat-service";

export function ModeBadge() {
  const mode = getChatMode();
  if (mode === "api") {
    return (
      <Badge
        variant="outline"
        className="gap-1.5 border-success/40 bg-success/10 text-success"
      >
        <Sparkles className="h-3.5 w-3.5" aria-hidden />
        IA conectada
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="gap-1.5">
      <FlaskConical className="h-3.5 w-3.5" aria-hidden />
      Modo de demonstração
    </Badge>
  );
}

export function ModeNotice() {
  const mode = getChatMode();
  if (mode === "api") {
    return (
      <p className="text-xs text-muted-foreground">
        A IA está conectada. As respostas são geradas por modelo de linguagem e podem
        conter imprecisões — confirme informações críticas com os setores responsáveis.
      </p>
    );
  }
  return (
    <p className="text-xs text-muted-foreground">
      Nesta primeira versão, as respostas são simuladas para fins acadêmicos.
    </p>
  );
}
