import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="13" className="opacity-15" fill="currentColor" stroke="none" />
        <circle cx="10" cy="10" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="22" cy="10" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="16" cy="22" r="2.2" fill="currentColor" stroke="none" />
        <path d="M10 10 L22 10 L16 22 Z" />
        <path d="M16 16 L10 10 M16 16 L22 10 M16 16 L16 22" />
      </svg>
      {showText && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          NexaHelp <span className="text-primary">AI</span>
        </span>
      )}
    </div>
  );
}
