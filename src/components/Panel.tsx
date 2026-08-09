import type { ReactNode } from "react";
import { Button } from "@/components/Button";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
};

export function Panel({ open, title, onClose, children, footer }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-vast-ink/40 p-4 sm:items-center"
      role="dialog"
      aria-modal
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-[32px] border-2 border-vast-ink bg-lumen-cream p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 className="font-display text-[32px] leading-[1.1] text-vast-ink">{title}</h2>
          <Button variant="ghost" className="py-1 text-fog" onClick={onClose} type="button">
            Закрыть
          </Button>
        </div>
        <div className="text-base leading-[1.35] text-charcoal">{children}</div>
        {footer ? <div className="mt-6 flex flex-wrap gap-3">{footer}</div> : null}
      </div>
    </div>
  );
}
