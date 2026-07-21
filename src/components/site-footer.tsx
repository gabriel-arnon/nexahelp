import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Logo />
          <div className="space-y-1 text-sm text-muted-foreground md:text-right">
            <p>
              Projeto acadêmico desenvolvido por{" "}
              <span className="font-medium text-foreground">Gabriel Arnon Figueira de Almeida</span>{" "}
              — RA 189800
            </p>
            <p>
              Inteligência Artificial e Automação Digital — IA Generativa Aplicada ao
              Desenvolvimento
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
