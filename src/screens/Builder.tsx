import { useMemo, useState } from "react";
import type { Navigate } from "@/app/types";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Field, TextArea, TextInput } from "@/components/Field";
import { Section } from "@/components/Section";

type StepState = "done" | "active" | "pending";

type Props = {
  onNotify: (message: string) => void;
  onNavigate: Navigate;
};

export function Builder({ onNotify, onNavigate }: Props) {
  const [title, setTitle] = useState("Riverside Tower, блок A");
  const [contractor, setContractor] = useState("ООО «Uzbek Construct»");
  const [amount, setAmount] = useState("$420 000");
  const [currency, setCurrency] = useState("USD");
  const [stages, setStages] = useState(
    "1. Подготовка площадки\n2. Фундамент\n3. Каркас здания\n4. Отделка и сдача",
  );
  const [description, setDescription] = useState("");
  const [phase, setPhase] = useState<"draft" | "review" | "ready" | "signed">("draft");
  const [busy, setBusy] = useState(false);

  const steps = useMemo(() => {
    const map: { n: number; label: string; state: StepState }[] = [
      { n: 1, label: "Сгенерировано ИИ", state: "done" },
      {
        n: 2,
        label: "Проверка юриста",
        state: phase === "draft" ? "active" : "done",
      },
      {
        n: 3,
        label: "Готов к ЭЦП",
        state:
          phase === "draft" ? "pending" : phase === "review" ? "active" : "done",
      },
    ];
    return map;
  }, [phase]);

  function saveDraft() {
    onNotify("Черновик сохранён.");
  }

  function sendReview() {
    if (!title.trim() || !contractor.trim()) {
      onNotify("Заполните название и контрагента.");
      return;
    }
    if (phase !== "draft") {
      onNotify("Документ уже на проверке или готов.");
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      setPhase("review");
      setBusy(false);
      onNotify("Отправлено юристу на double-check.");
    }, 700);
  }

  function approveLegal() {
    if (phase !== "review") return;
    setBusy(true);
    window.setTimeout(() => {
      setPhase("ready");
      setBusy(false);
      onNotify("Экспертиза пройдена. Можно подписывать ЭЦП.");
    }, 700);
  }

  function signContract() {
    if (phase !== "ready") return;
    setBusy(true);
    window.setTimeout(() => {
      setPhase("signed");
      setBusy(false);
      onNotify("Контракт подписан через E-imzo.");
      onNavigate("payments");
    }, 800);
  }

  return (
    <Section className="py-12 md:py-16">
      <p className="mb-3 text-sm font-medium text-fog">
        {phase === "signed"
          ? "Подписан"
          : phase === "ready"
            ? "Готов к ЭЦП"
            : phase === "review"
              ? "На экспертизе"
              : "Новый / черновик контракта"}
      </p>
      <h1 className="heading-lg text-vast-ink mb-12">Составьте соглашение.</h1>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-5">
          <Field label="Название проекта">
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={phase === "signed"}
            />
          </Field>
          <Field label="Контрагент (подрядчик)">
            <TextInput
              value={contractor}
              onChange={(e) => setContractor(e.target.value)}
              disabled={phase === "signed"}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Общая сумма">
              <TextInput
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={phase === "signed"}
              />
            </Field>
            <Field label="Валюта">
              <TextInput
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                disabled={phase === "signed"}
              />
            </Field>
          </div>
          <Field label="Этапы работ">
            <TextArea
              value={stages}
              onChange={(e) => setStages(e.target.value)}
              disabled={phase === "signed"}
            />
          </Field>
          <Field label="Описание работ">
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Результаты, материалы, условия приёмки"
              disabled={phase === "signed"}
            />
          </Field>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {phase === "draft" && (
              <>
                <Button disabled={busy} onClick={sendReview}>
                  {busy ? "Отправка…" : "Отправить на экспертизу"}
                </Button>
                <Button variant="ghost" onClick={saveDraft}>
                  Сохранить черновик
                </Button>
              </>
            )}
            {phase === "review" && (
              <Button disabled={busy} onClick={approveLegal}>
                {busy ? "Проверка…" : "Подтвердить экспертизу"}
              </Button>
            )}
            {phase === "ready" && (
              <Button disabled={busy} onClick={signContract}>
                {busy ? "Подписание…" : "Подписать через E-imzo"}
              </Button>
            )}
            {phase === "signed" && (
              <Button onClick={() => onNavigate("payments")}>Открыть исполнение</Button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card tone="dark" className="p-6 md:p-10">
            <div className="mb-6 flex items-center justify-between gap-3 text-sm text-fog">
              <span>Живой предпросмотр</span>
              <span>Хеш · 0x4F9C…21BB</span>
            </div>
            <div className="rounded-[32px] bg-lumen-cream p-6 text-vast-ink md:p-8">
              <p className="mb-4 text-sm font-medium text-fog">SmartBuild соглашение</p>
              <h3 className="font-display text-[32px] leading-[1.1]">
                Договор на строительные услуги
              </h3>
              <div className="my-6 h-px bg-lumen-stone" />
              <p className="text-base leading-[1.35] text-charcoal">
                Договор между{" "}
                <mark className="bg-lavender-whisper px-1 text-vast-ink">BuildCo Holdings</mark> и{" "}
                <mark className="bg-lavender-whisper px-1 text-vast-ink">{contractor || "—"}</mark>{" "}
                на объект <em>{title || "—"}</em>. Сумма {amount || "—"} {currency}, этапы ниже,
                средства в эскроу.
              </p>
              {description.trim() ? (
                <p className="mt-4 text-base leading-[1.35] text-charcoal">{description}</p>
              ) : (
                <p className="mt-4 text-base leading-[1.35] text-charcoal">
                  Выплата после IoT-подтверждения или акта. Споры направляются в арбитражный модуль
                  SmartBuild.
                </p>
              )}
              <pre className="mt-4 whitespace-pre-wrap rounded-[12px] border-2 border-lumen-stone bg-lumen-cream p-3 text-sm text-charcoal">
                {stages}
              </pre>
            </div>
          </Card>

          <Card>
            <p className="mb-5 text-sm font-medium text-fog">Статус документа</p>
            <div className="flex flex-col gap-4">
              {steps.map((s) => (
                <div key={s.n} className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                      s.state === "done"
                        ? "border-forest-ink bg-forest-ink text-lumen-cream"
                        : s.state === "active"
                          ? "border-vast-ink bg-lavender-whisper text-vast-ink"
                          : "border-lumen-stone bg-lumen-cream text-fog"
                    }`}
                  >
                    {s.state === "done" ? "✓" : s.n}
                  </span>
                  <span
                    className={`text-base ${
                      s.state === "pending" ? "text-fog" : "font-medium text-vast-ink"
                    }`}
                  >
                    {s.label}
                  </span>
                  {s.state === "active" && <Badge tone="ember">В работе</Badge>}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
