import type { Navigate, Screen } from "@/app/types";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

const LINKS: { id: Screen; label: string }[] = [
  { id: "dashboard", label: "Панель" },
  { id: "builder", label: "Конструктор" },
  { id: "payments", label: "Исполнение" },
];

type Props = {
  screen: Screen;
  onNavigate: Navigate;
  floating?: boolean;
};

export function NavPill({ screen, onNavigate, floating = true }: Props) {
  return (
    <header
      className={cn(
        "z-20 flex items-center justify-between gap-4 border-2 border-vast-ink bg-lumen-cream px-4 py-3 md:px-5",
        floating
          ? "mx-auto mt-4 w-[calc(100%-2rem)] max-w-[1200px] rounded-full"
          : "rounded-full",
      )}
    >
      <button
        type="button"
        onClick={() => onNavigate("landing")}
        className="flex items-center gap-2 font-semibold text-base text-vast-ink"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-vast-ink text-lumen-cream text-xs">
          BC
        </span>
        BuildContract
      </button>

      <nav className="hidden items-center gap-6 md:flex">
        {LINKS.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => onNavigate(link.id)}
            className={cn(
              "text-base transition-opacity hover:opacity-70",
              screen === link.id ? "font-semibold text-vast-ink" : "font-normal text-charcoal",
            )}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="hidden sm:inline-flex py-2"
          onClick={() => onNavigate("landing")}
        >
          На главную
        </Button>
        <Button
          variant="primary"
          className="rounded-full px-4 py-2 text-sm"
          onClick={() => onNavigate("profile")}
        >
          Профиль
        </Button>
      </div>
    </header>
  );
}
