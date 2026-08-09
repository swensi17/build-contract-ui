import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "dark" | "lavender";
};

export function Card({ children, className, tone = "cream" }: Props) {
  const tones = {
    cream: "rounded-[32px] border-2 border-vast-ink bg-lumen-cream text-vast-ink",
    dark: "rounded-[40px] bg-vast-ink text-lumen-cream md:rounded-[64px]",
    lavender: "rounded-[32px] border-2 border-vast-ink bg-lavender-whisper text-vast-ink",
  };

  return <div className={cn("p-8", tones[tone], className)}>{children}</div>;
}
