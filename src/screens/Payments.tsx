import { useMemo, useState } from "react";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Panel } from "@/components/Panel";
import { Section } from "@/components/Section";
import { Waveform } from "@/components/Waveform";
import {
  INITIAL_ESCROW,
  INITIAL_MILESTONES,
  formatMoney,
  todayLabel,
  type Milestone,
} from "@/data/mock";

type Props = {
  onNotify: (message: string) => void;
};

type PanelKind = "receipt" | "terms" | "arbitration" | null;

export function Payments({ onNotify }: Props) {
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [escrow, setEscrow] = useState(INITIAL_ESCROW);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [panel, setPanel] = useState<PanelKind>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [arbNote, setArbNote] = useState("");

  const selected = useMemo(
    () => milestones.find((m) => m.id === selectedId) ?? null,
    [milestones, selectedId],
  );

  function uploadAct(id: string) {
    if (uploadingId) return;
    setUploadingId(id);

    window.setTimeout(() => {
      setMilestones((prev) => {
        const idx = prev.findIndex((m) => m.id === id);
        if (idx < 0 || prev[idx].status !== "active") return prev;

        const tx = `0x${Math.random().toString(16).slice(2, 6).toUpperCase()}…${Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase()}`;
        const paid = prev[idx];
        const next = prev.map((m, i) => {
          if (i === idx) {
            return {
              ...m,
              status: "done" as const,
              meta: `Завершён · ${todayLabel()}`,
              chain: `Транзакция успешна · ${tx}`,
              receiptTx: tx,
            };
          }
          if (i === idx + 1 && m.status === "pending") {
            return {
              ...m,
              status: "active" as const,
              meta: "Загрузите доказательства выполнения работ",
              chain: "Ожидание смарт-контракта",
            };
          }
          return m;
        });

        setEscrow((e) => Math.max(0, e - paid.amount));
        onNotify(`Акт принят. Выплата ${paid.amountLabel} отправлена.`);
        return next;
      });
      setUploadingId(null);
    }, 900);
  }

  function openReceipt(id: string) {
    setSelectedId(id);
    setPanel("receipt");
  }

  function openTerms(id: string) {
    setSelectedId(id);
    setPanel("terms");
  }

  function submitArbitration() {
    const text = arbNote.trim();
    if (!text) {
      onNotify("Опишите спор перед отправкой.");
      return;
    }
    setArbNote("");
    setPanel(null);
    onNotify("Спор отправлен в арбитраж SmartBuild.");
  }

  return (
    <Section className="py-12 md:py-16">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-sm font-medium text-fog">Контракт / 0x4F9C…21BB</p>
          <h1 className="heading-lg text-vast-ink">Riverside Tower, блок A</h1>
        </div>
        <div className="text-left md:text-right">
          <p className="text-sm font-medium text-fog">Баланс эскроу</p>
          <p className="mt-1 font-display text-[48px] leading-[0.95] text-vast-ink">
            {formatMoney(escrow)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {milestones.map((m, i) => {
          const done = m.status === "done";
          const active = m.status === "active";
          const busy = uploadingId === m.id;

          return (
            <Card key={m.id} tone={active ? "lavender" : "cream"} className="p-6 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="text-sm font-medium text-fog md:w-10">0{i + 1}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3
                      className={`font-display text-[28px] leading-[1.1] md:text-[32px] ${
                        done ? "text-fog" : "text-vast-ink"
                      }`}
                    >
                      {m.stage}
                    </h3>
                    {done && <Badge tone="teal">Выплачено</Badge>}
                    {active && !busy && <Badge tone="ember">Нужно доказательство</Badge>}
                    {busy && <Badge tone="ember">Загрузка…</Badge>}
                  </div>
                  <p className="mt-2 text-sm text-fog">{m.meta}</p>
                  <div className="mt-3 flex items-center gap-3 text-sm text-charcoal">
                    {active ? <Waveform active={!busy} /> : null}
                    <span className={done ? "text-forest-ink" : ""}>{m.chain}</span>
                  </div>
                </div>
                <div className="font-display text-[32px] leading-none text-vast-ink md:text-right">
                  {m.amountLabel}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {active ? (
                  <Button disabled={Boolean(uploadingId)} onClick={() => uploadAct(m.id)}>
                    {busy ? "Проверка акта…" : "Загрузить акт / данные IoT"}
                  </Button>
                ) : null}
                {done ? (
                  <Button variant="ghost" onClick={() => openReceipt(m.id)}>
                    Посмотреть квитанцию
                  </Button>
                ) : null}
                {!done ? (
                  <Button variant="ghost" onClick={() => openTerms(m.id)}>
                    Условия этапа
                  </Button>
                ) : null}
              </div>
            </Card>
          );
        })}
      </div>

      <Card
        tone="dark"
        className="mt-10 flex flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <p className="text-sm text-fog">Разрешение споров</p>
          <p className="mt-2 font-display text-[32px] leading-[1.1] text-lumen-cream">
            Нашли проблему с этапом работ?
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            setPanel("arbitration");
            setSelectedId(null);
          }}
        >
          Открыть арбитраж
        </Button>
      </Card>

      <Panel
        open={panel === "receipt" && Boolean(selected)}
        title="Квитанция выплаты"
        onClose={() => setPanel(null)}
        footer={
          <Button
            variant="secondary"
            onClick={() => {
              onNotify("Квитанция скопирована в буфер.");
              if (selected?.receiptTx) {
                void navigator.clipboard?.writeText(selected.receiptTx);
              }
              setPanel(null);
            }}
          >
            Скопировать tx
          </Button>
        }
      >
        {selected ? (
          <div className="space-y-3">
            <p>
              <span className="text-fog">Этап:</span> {selected.stage}
            </p>
            <p>
              <span className="text-fog">Сумма:</span> {selected.amountLabel}
            </p>
            <p>
              <span className="text-fog">Дата:</span> {selected.meta}
            </p>
            <p>
              <span className="text-fog">Tx:</span> {selected.receiptTx ?? selected.chain}
            </p>
            <p className="rounded-[12px] border-2 border-vast-ink bg-lavender-whisper px-4 py-3 text-vast-ink">
              Средства списаны с эскроу и отправлены подрядчику.
            </p>
          </div>
        ) : null}
      </Panel>

      <Panel
        open={panel === "terms" && Boolean(selected)}
        title="Условия этапа"
        onClose={() => setPanel(null)}
        footer={
          <Button variant="secondary" onClick={() => setPanel(null)}>
            Понятно
          </Button>
        }
      >
        {selected ? (
          <div className="space-y-3">
            <p className="font-medium text-vast-ink">{selected.stage}</p>
            <p>{selected.terms}</p>
            <p className="text-fog">Сумма этапа: {selected.amountLabel}</p>
          </div>
        ) : null}
      </Panel>

      <Panel
        open={panel === "arbitration"}
        title="Арбитраж"
        onClose={() => setPanel(null)}
        footer={
          <>
            <Button onClick={submitArbitration}>Отправить спор</Button>
            <Button variant="ghost" onClick={() => setPanel(null)}>
              Отмена
            </Button>
          </>
        }
      >
        <p className="mb-3 text-fog">Опишите проблему по этапу. Заявка уйдёт в модуль SmartBuild.</p>
        <textarea
          className="min-h-28 w-full rounded-[12px] border-2 border-vast-ink bg-lumen-cream px-4 py-3 text-base text-vast-ink outline-none"
          value={arbNote}
          onChange={(e) => setArbNote(e.target.value)}
          placeholder="Например: объём бетона не совпадает с актом"
        />
      </Panel>
    </Section>
  );
}
