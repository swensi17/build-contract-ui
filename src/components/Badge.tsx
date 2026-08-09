import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "teal" | "dark" | "outline" | "ember";

const tones: Record<Tone, string> = {
  teal: "border-transparent bg-forest-ink text-lumen-cream",
  dark: "rounded-lg border-transparent bg-vast-ink text-lumen-cream",
  outline: "border border-pure-white bg-transparent text-lumen-cream",
  ember: "border-transparent bg-ember-glow text-vast-ink",
};

type Props = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
};

export function Badge({ children, tone = "teal", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
