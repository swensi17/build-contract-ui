import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark";

const styles: Record<Variant, string> = {
  primary:
    "border-2 border-vast-ink bg-lavender-whisper text-vast-ink hover:brightness-95",
  secondary:
    "border-2 border-vast-ink bg-lumen-cream text-vast-ink hover:bg-lumen-stone",
  ghost: "border-0 bg-transparent px-0 text-vast-ink underline-offset-4 hover:underline",
  dark: "border-2 border-vast-ink bg-vast-ink text-lumen-cream hover:opacity-90",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ variant = "primary", className, ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[12px] px-6 py-4 text-base font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
