# BuildContract UI

Frontend прототип умных строительных контрактов для Узбекистана. Лендинг, панель, конструктор, исполнение (эскроу/IoT) и профиль. Без бэкенда.

## Stack

| Layer | Tech |
|-------|------|
| App | Vite, React 19, TypeScript |
| UI | Tailwind CSS 4, собственные primitives |
| Router | TanStack Router |
| Deploy | GitHub Pages |

## Structure

```
build-contract-ui/
├── src/
│   ├── app/          # оболочка приложения
│   ├── components/   # Button, Card, NavPill, …
│   ├── screens/      # Landing, Dashboard, Builder, Payments, Profile
│   ├── data/         # mock-данные экранов
│   └── styles.css    # токены Wispr Flow
├── docs/DESIGN.md
└── .github/workflows
```

## Design

Wispr Flow: cream `#ffffeb` + dark `#1a1a1a`, EB Garamond + Figtree, lavender CTA `#f0d7ff`, forest `#034f46`, ember `#ffa946`. Без теней, 2px ink borders. Детали: `docs/DESIGN.md`.

## Quick start

```bash
npm install
npm run dev
```

- Local: http://localhost:3000
- Pages: https://swensi17.github.io/build-contract-ui/

```bash
npm run build:pages
```

## Status

Готово: модульный UI на токенах Wispr Flow, 5 экранов, Pages.

Не готово: API, E-imzo, URL-роуты на экраны, реальная генерация договоров.
