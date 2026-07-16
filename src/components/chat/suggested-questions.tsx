import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "Como faço para redefinir minha senha?",
  "Qual é o procedimento para solicitar férias?",
  "Como devo agir ao receber um e-mail suspeito?",
  "Como abrir um chamado para o setor de TI?",
  "Qual é a política de trabalho remoto?",
  "Como solicitar manutenção de um equipamento?",
];

interface SuggestedQuestionsProps {
  onPick: (q: string) => void;
  disabled?: boolean;
  className?: string;
}

export function SuggestedQuestions({ onPick, disabled, className }: SuggestedQuestionsProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-sm font-medium text-foreground">Perguntas sugeridas</p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((q) => (
          <Button
            key={q}
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={() => onPick(q)}
            className="h-auto whitespace-normal text-left"
          >
            {q}
          </Button>
        ))}
      </div>
    </div>
  );
}
