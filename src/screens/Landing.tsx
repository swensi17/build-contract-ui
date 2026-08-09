import type { Navigate } from "@/app/types";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { NavPill } from "@/components/NavPill";
import { Section } from "@/components/Section";
import { Squiggle } from "@/components/Squiggle";
import { Waveform } from "@/components/Waveform";
import { FEATURES, FLOW_STEPS } from "@/data/mock";

type Props = { onNavigate: Navigate };

export function Landing({ onNavigate }: Props) {
  return (
    <div className="pb-16">
      <NavPill screen="landing" onNavigate={onNavigate} />

      <Section className="pt-16 md:pt-24 text-left md:text-center">
        <Badge tone="teal" className="mb-8">
          Smart Construction · Узбекистан
        </Badge>

        <h1 className="display-title text-vast-ink mx-auto max-w-5xl">
          <span className="text-fog">Умные контракты.</span>
          <br />
          Прочный фундамент.
        </h1>
        <div className="mx-auto mt-2 flex justify-start md:justify-center">
          <Squiggle />
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-left text-[20px] leading-[1.3] text-charcoal md:text-center">
          BuildContract автоматизирует строительные договоры, этапы работ и эскроу.
          Выплата подрядчику после IoT-подтверждения или акта, без задержек и ручных
          переводов.
        </p>

        <div className="mt-10 flex flex-col items-start gap-4 md:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => onNavigate("dashboard")}>Войти через E-imzo</Button>
            <Button variant="secondary" onClick={() => onNavigate("builder")}>
              Смотреть конструктор
            </Button>
            <Waveform active />
          </div>
        </div>
      </Section>

      <Section tone="dark" className="mt-16 md:mt-24">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="heading-lg text-lumen-cream">Четыре шага от черновика до расчёта</h2>
            <p className="mt-6 max-w-md text-[20px] text-lumen-cream/80">
              Протокол для заказчика и подрядчика: договор, ЭЦП, эскроу, подтверждение
              этапа.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {FLOW_STEPS.map(([n, label]) => (
              <div
                key={n}
                className="rounded-[32px] border border-pure-white/40 p-6 text-lumen-cream"
              >
                <div className="text-sm text-fog">{n}</div>
                <div className="mt-3 font-display text-[32px] leading-[1.1]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="mt-16 md:mt-24">
        <div className="grid gap-6 md:grid-cols-2">
          {FEATURES.map((f, i) => (
            <Card key={f.n} tone={i === 1 ? "lavender" : "cream"}>
              <div className="text-sm font-medium text-fog">
                {f.n} / 04
              </div>
              <h3 className="mt-4 font-display text-[32px] leading-[1.15] text-vast-ink">
                {f.title}
              </h3>
              <p className="mt-4 text-base leading-[1.3] text-charcoal">{f.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <footer className="mx-auto mt-20 max-w-[1200px] rounded-[40px] bg-vast-ink px-6 py-10 text-lumen-cream md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="font-display text-[32px] leading-none">BuildContract</div>
          <div className="flex flex-wrap gap-6 text-sm text-lumen-cream/70">
            <span>© 2026 SmartBuild протокол</span>
            <span>Узел · Ташкент-01</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
