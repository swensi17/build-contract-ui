import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "dark";
};

export function Section({ children, className, tone = "cream" }: Props) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-[1200px] px-4 md:px-6",
        tone === "dark" &&
          "rounded-[40px] bg-vast-ink px-6 py-16 text-lumen-cream md:rounded-[80px] md:px-16 md:py-20",
        className,
      )}
    >
      {children}
    </section>
  );
}
