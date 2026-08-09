import { useState } from "react";
import type { Navigate } from "@/app/types";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Field, TextInput } from "@/components/Field";
import { Section } from "@/components/Section";
import { INITIAL_PROFILE, todayLabel, type ProfileData } from "@/data/mock";

type Props = {
  onNavigate: Navigate;
  onNotify: (message: string) => void;
};

type Activity = { text: string; date: string };

export function Profile({ onNavigate, onNotify }: Props) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(INITIAL_PROFILE);
  const [draft, setDraft] = useState<ProfileData>(INITIAL_PROFILE);
  const [activity, setActivity] = useState<Activity[]>([
    { text: "Подписан контракт Riverside Tower, блок A", date: "2026 / 04 / 12" },
    { text: "Подтверждён этап 1, подготовка площадки", date: "2026 / 02 / 18" },
    { text: "Загружены данные IoT-датчиков", date: "2026 / 02 / 18" },
    { text: "Создан черновик: Школа №44 Чиланзар", date: "2026 / 03 / 14" },
  ]);

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

  function startEdit() {
    setDraft(profile);
    setEditing(true);
  }

  function saveEdit() {
    if (!draft.name.trim() || !draft.email.trim()) {
      onNotify("Имя и e-mail обязательны.");
      return;
    }
    setProfile(draft);
    setEditing(false);
    setActivity((a) => [{ text: "Профиль обновлён", date: todayLabel() }, ...a]);
    onNotify("Профиль сохранён.");
  }

  function cancelEdit() {
    setDraft(profile);
    setEditing(false);
  }

  function logout() {
    onNotify("Вы вышли из аккаунта.");
    onNavigate("landing");
  }

  const fields: { key: keyof ProfileData; label: string }[] = [
    { key: "name", label: "Полное имя" },
    { key: "role", label: "Должность" },
    { key: "email", label: "E-mail" },
    { key: "phone", label: "Телефон" },
    { key: "eimzo", label: "E-imzo" },
    { key: "wallet", label: "Кошелёк" },
  ];

  return (
    <Section className="py-12 md:py-16">
      <p className="mb-3 text-sm font-medium text-fog">Профиль / аккаунт</p>
      <h1 className="heading-lg text-vast-ink mb-12">Ваш профиль.</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card tone="dark" className="flex flex-col items-center p-8 text-center lg:col-span-1">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-lavender-whisper font-display text-[40px] text-vast-ink">
            {initials || "АК"}
          </div>
          <h2 className="mt-5 font-display text-[32px] leading-none text-lumen-cream">
            {profile.name}
          </h2>
          <div className="mt-3">
            <Badge tone="outline">Верифицирован · E-imzo</Badge>
          </div>
          {!editing ? (
            <Button variant="secondary" className="mt-6 w-full" onClick={startEdit}>
              Редактировать профиль
            </Button>
          ) : (
            <Button variant="secondary" className="mt-6 w-full" onClick={saveEdit}>
              Сохранить
            </Button>
          )}
          {editing ? (
            <Button
              variant="ghost"
              className="mt-3 text-lumen-cream hover:text-lumen-cream"
              onClick={cancelEdit}
            >
              Отмена
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="mt-3 text-lumen-cream hover:text-lumen-cream"
              onClick={logout}
            >
              Выйти из аккаунта
            </Button>
          )}
        </Card>

        <div className="space-y-10 lg:col-span-2">
          <div>
            <h2 className="heading text-vast-ink mb-6">Данные аккаунта</h2>
            {editing ? (
              <Card className="space-y-4">
                {fields.map((f) => (
                  <Field key={f.key} label={f.label}>
                    <TextInput
                      value={draft[f.key]}
                      onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                    />
                  </Field>
                ))}
              </Card>
            ) : (
              <Card className="overflow-hidden p-0">
                {fields.map((f, i) => (
                  <div
                    key={f.key}
                    className={`grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-2 ${
                      i > 0 ? "border-t-2 border-lumen-stone" : ""
                    }`}
                  >
                    <div className="text-sm font-medium text-fog">{f.label}</div>
                    <div className="text-base font-medium text-vast-ink sm:text-right">
                      {profile[f.key]}
                    </div>
                  </div>
                ))}
              </Card>
            )}
          </div>

          <div>
            <h2 className="heading text-vast-ink mb-6">История действий</h2>
            <Card className="overflow-hidden p-0">
              {activity.map((a, i) => (
                <div
                  key={`${a.text}-${a.date}-${i}`}
                  className={`flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between ${
                    i > 0 ? "border-t-2 border-lumen-stone" : ""
                  }`}
                >
                  <div className="text-base text-vast-ink">{a.text}</div>
                  <div className="text-sm text-fog">{a.date}</div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
