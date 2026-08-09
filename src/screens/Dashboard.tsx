import { useState } from "react";
import type { Navigate } from "@/app/types";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { DASHBOARD_STATS_BASE, INITIAL_DASH_ROWS, type DashRow } from "@/data/mock";

type Props = {
  onNavigate: Navigate;
  onNotify: (message: string) => void;
};

export function Dashboard({ onNavigate, onNotify }: Props) {
  const [rows, setRows] = useState<DashRow[]>(INITIAL_DASH_ROWS);
  const [exported, setExported] = useState(false);

  function exportRegistry() {
    const csv = ["Название;Статус;Дата", ...rows.map((r) => `${r.name};${r.status};${r.date}`)].join(
      "\n",
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "buildcontract-registry.csv";
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    onNotify("Реестр экспортирован (CSV).");
  }

  function openRow(row: DashRow) {
    onNavigate(row.target === "dashboard" ? "dashboard" : row.target);
    onNotify(`Открыт: ${row.name}`);
  }

  return (
    <Section className="py-12 md:py-16">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-sm font-medium text-fog">Обзор / май 2026</p>
          <h1 className="heading-lg text-vast-ink">
            Доброе утро,
            <br />
            Акмаль.
          </h1>
        </div>
        <Button variant="ghost" onClick={exportRegistry}>
          {exported ? "Скачать ещё раз" : "Экспорт реестра"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <div className="text-sm font-medium text-fog">Активные контракты</div>
          <div className="mt-6 font-display text-[48px] leading-[0.95] text-vast-ink">
            {DASHBOARD_STATS_BASE.contracts}
          </div>
        </Card>
        <Card>
          <div className="text-sm font-medium text-fog">Сумма в эскроу</div>
          <div className="mt-6 font-display text-[48px] leading-[0.95] text-vast-ink">
            {DASHBOARD_STATS_BASE.escrowLabel}
          </div>
        </Card>
        <Card>
          <div className="text-sm font-medium text-fog">Ожидают этапов</div>
          <div className="mt-6 font-display text-[48px] leading-[0.95] text-vast-ink">
            {DASHBOARD_STATS_BASE.waiting}
          </div>
        </Card>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button onClick={() => onNavigate("builder")}>Новый контракт</Button>
        <Button variant="secondary" onClick={() => onNavigate("payments")}>
          Исполнение Riverside
        </Button>
      </div>

      <div className="mt-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="heading text-vast-ink">Недавняя активность</h2>
          <span className="text-sm text-fog">
            {String(rows.length).padStart(2, "0")} / {String(rows.length).padStart(2, "0")} записей
          </span>
        </div>

        <div className="overflow-hidden rounded-[32px] border-2 border-vast-ink bg-lumen-cream">
          {rows.map((row, i) => (
            <button
              key={row.id}
              type="button"
              onClick={() => openRow(row)}
              className={`flex w-full flex-col gap-3 px-6 py-5 text-left transition hover:bg-lavender-whisper/40 md:flex-row md:items-center md:justify-between ${
                i > 0 ? "border-t-2 border-lumen-stone" : ""
              }`}
            >
              <div className="flex-1 text-base font-medium text-vast-ink">{row.name}</div>
              <div className="flex flex-1 justify-start md:justify-center">
                <Badge tone="dark">{row.status}</Badge>
              </div>
              <div className="flex-1 text-left text-sm text-fog md:text-right">{row.date}</div>
            </button>
          ))}
        </div>

        {rows.length > 3 ? (
          <div className="mt-4">
            <Button
              variant="ghost"
              onClick={() => {
                setRows((r) => r.slice(0, 3));
                onNotify("Список сокращён до 3 записей.");
              }}
            >
              Показать меньше
            </Button>
          </div>
        ) : (
          <div className="mt-4">
            <Button
              variant="ghost"
              onClick={() => {
                setRows(INITIAL_DASH_ROWS);
                onNotify("Показан полный список.");
              }}
            >
              Показать все
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
