# BuildContract — design

Источник: Wispr Flow style reference, адаптирован под продукт BuildContract.

## Direction

Cream broadsheet + dark velvet chambers. Светлый холст `#ffffeb`, сериф EB Garamond на дисплее (weight 400, масштаб вместо жирности), Figtree на UI. Секции чередуют cream и near-black. Глубина: 2px ink borders, без box-shadow.

## Palette

| Name | Hex | Role |
|------|-----|------|
| Lavender Whisper | `#f0d7ff` | Primary CTA, accent cards |
| Forest Ink | `#034f46` | Teal badges, success |
| Ember Glow | `#ffa946` | Active / needs-action |
| Vast Ink | `#1a1a1a` | Text, borders, dark chambers |
| Lumen Cream | `#ffffeb` | Page canvas |
| Lumen Stone | `#e4e4d0` | Soft dividers |
| Fog | `#8a8a80` | Captions |
| Charcoal | `#222222` | Secondary text |

## Typography

| Role | Family | Notes |
|------|--------|-------|
| Display | EB Garamond 400 | 48–120px, tight leading |
| UI | Figtree 400–700 | body 16–20px, lh 1.3 |

## Shapes

- Buttons / inputs: 12px radius, 2px ink border
- Cards: 32px
- Dark chambers: 40–80px
- Nav: floating cream pill, full radius

## Structure

```
src/
  app/         App shell + screen types
  components/  Button, Badge, Card, NavPill, Field, Section, Waveform, Squiggle
  data/        mock content
  screens/     Landing, Dashboard, Builder, Payments, Profile
  routes/      thin TanStack route entry
```

## Do

- Lavender only for primary actions
- Display headlines weight 400
- 2px borders on interactive surfaces
- Alternate cream / dark sections
- Left-align body; center only hero stack on desktop

## Don't

- box-shadow / glow
- gradients
- blue/green action colors outside palette
- emoji chrome
- hero fake LIVE pills
