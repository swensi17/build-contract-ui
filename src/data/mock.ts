export type MilestoneStatus = "done" | "active" | "pending";

export type Milestone = {
  id: string;
  stage: string;
  meta: string;
  amount: number;
  amountLabel: string;
  status: MilestoneStatus;
  chain: string;
  receiptTx?: string;
  terms: string;
};

export const FEATURES = [
  {
    n: "01",
    title: "ИИ-генерация контрактов",
    text: "Опишите объект и этапы. Система собирает договор под узбекское строительное право за минуты, не за дни.",
  },
  {
    n: "02",
    title: "Эскроу на блокчейне",
    text: "Деньги заказчика блокируются до подтверждения этапа. Подрядчик получает выплату без ручного перевода.",
  },
  {
    n: "03",
    title: "Подтверждение через IoT",
    text: "Датчики на площадке и акты выполненных работ запускают смарт-контракт. Споры уходят в арбитраж.",
  },
  {
    n: "04",
    title: "Юридическая экспертиза",
    text: "Каждый черновик проходит double-check живым юристом до подписания через E-imzo.",
  },
] as const;

export const FLOW_STEPS = [
  ["01", "Составить"],
  ["02", "Подписать"],
  ["03", "Исполнить"],
  ["04", "Расчёт"],
] as const;

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: "m1",
    stage: "Этап 1: Подготовка площадки",
    meta: "Завершён · 2026 / 02 / 18",
    amount: 84000,
    amountLabel: "$84 000",
    status: "done",
    chain: "Транзакция успешна · 0x8A…F12",
    receiptTx: "0x8AF12C91…91E2",
    terms: "Расчистка и подготовка грунта. Акт + фото площадки.",
  },
  {
    id: "m2",
    stage: "Этап 2: Фундамент",
    meta: "Загрузите доказательства выполнения работ",
    amount: 126000,
    amountLabel: "$126 000",
    status: "active",
    chain: "Ожидание смарт-контракта",
    terms: "Бетонные работы фундамента. Нужен акт КС-2 и показания датчиков влажности.",
  },
  {
    id: "m3",
    stage: "Этап 3: Каркас здания",
    meta: "Запланирован · 2026 / 06 / 04",
    amount: 140000,
    amountLabel: "$140 000",
    status: "pending",
    chain: "Смарт-контракт неактивен",
    terms: "Металлокаркас и перекрытия. Приёмка по чек-листу инженера.",
  },
  {
    id: "m4",
    stage: "Этап 4: Отделка и сдача",
    meta: "Запланирован · 2026 / 09 / 22",
    amount: 70000,
    amountLabel: "$70 000",
    status: "pending",
    chain: "Смарт-контракт неактивен",
    terms: "Финишная отделка и сдача объекта. Финальный акт приёмки.",
  },
];

export const INITIAL_ESCROW = 336000;

export const DASHBOARD_STATS_BASE = {
  contracts: 12,
  escrowLabel: "$184 920",
  waiting: 7,
};

export type DashRow = {
  id: string;
  name: string;
  status: string;
  date: string;
  target: "payments" | "builder" | "dashboard";
};

export const INITIAL_DASH_ROWS: DashRow[] = [
  {
    id: "r1",
    name: "Riverside Tower, блок A",
    status: "В работе",
    date: "2026 / 04 / 12",
    target: "payments",
  },
  {
    id: "r2",
    name: "Реновация Aman Plaza",
    status: "Ожидает подписи",
    date: "2026 / 04 / 10",
    target: "builder",
  },
  {
    id: "r3",
    name: "Фундамент склада 14",
    status: "Завершён",
    date: "2026 / 03 / 28",
    target: "payments",
  },
  {
    id: "r4",
    name: "ЖК Сергели",
    status: "В работе",
    date: "2026 / 03 / 21",
    target: "payments",
  },
  {
    id: "r5",
    name: "Школа №44 Чиланзар",
    status: "Черновик",
    date: "2026 / 03 / 14",
    target: "builder",
  },
];

export type ProfileData = {
  name: string;
  role: string;
  email: string;
  phone: string;
  eimzo: string;
  wallet: string;
};

export const INITIAL_PROFILE: ProfileData = {
  name: "Акмаль Каримов",
  role: "Директор · BuildCo Holdings",
  email: "akmal@buildco.uz",
  phone: "+998 90 123 45 67",
  eimzo: "UZ-EIMZO-09F1·22A4",
  wallet: "0xA1F3…93C7",
};

export function formatMoney(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

export function todayLabel(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y} / ${m} / ${day}`;
}
