import { Send, ShieldAlert } from "lucide-react";
import { forwardRef, type FormEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const MAX = 1000;

interface ComposerProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  loading: boolean;
}

export const Composer = forwardRef<HTMLTextAreaElement, ComposerProps>(function Composer(
  { value, onChange, onSubmit, disabled, loading },
  ref,
) {
  const trimmed = value.trim();
  const tooLong = value.length > MAX;
  const canSend = !disabled && !loading && trimmed.length > 0 && !tooLong;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    onSubmit();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) onSubmit();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="rounded-xl border border-border bg-card p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <Textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua pergunta sobre procedimentos internos..."
          rows={3}
          maxLength={MAX + 100 /* allow paste; validation below */}
          disabled={loading}
          aria-label="Pergunta ao assistente"
          className="min-h-[72px] resize-none border-0 bg-transparent p-2 text-sm shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center justify-between gap-2 px-2 pb-1">
          <p
            className={
              tooLong ? "text-xs font-medium text-destructive" : "text-xs text-muted-foreground"
            }
          >
            {value.length}/{MAX}
          </p>
          <Button type="submit" size="sm" disabled={!canSend} className="gap-1.5">
            <Send className="h-4 w-4" aria-hidden />
            Enviar
          </Button>
        </div>
      </div>
      <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        Não envie dados pessoais, confidenciais ou sensíveis.
      </p>
    </form>
  );
});
