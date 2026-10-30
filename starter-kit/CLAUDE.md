# Bridgemaker Starter-Kit — Claude-Instructions (v2)

> **Markenregeln zuerst:** `../CLAUDE.md` (Destillat) und `../guidelines/01–09`
> sind verbindlich. Dieses File ergänzt nur, was am Kit selbst hängt.

## Architektur

- **Next.js 15 + React 19 + Tailwind v4 + shadcn/ui auf Radix UI**
  (`radix-ui`-Sammelpaket, Style `new-york`, `components.json`).
- **Vorrang-Regel (guidelines/09 §9.1):** Bridgemaker-Rezepte gelten
  überall — Typo (`type-*`), Buttons (`bm-btn`), Formulare (`bm-input`,
  outline-only), Karten, Badges, Header. In `src/components/ui/` ist
  das verdrahtet: `Button` = `bm-btn`, `Input`/`Textarea` = `bm-input`/
  `bm-textarea`, `Card` = `bm-card card-clean`, `Badge` = `bm-badge`.
  shadcn übernimmt die Lücken: Dialoge, Menüs, Tabs, Popover, Tooltips,
  Sheets, Checkboxen, Switches, Radios, Slider, Progress.
- **Tokens:** `src/app/tokens.css` ist die Kanon-Kopie (Quelle:
  `../tokens/tokens.css`) — bei Updates neu kopieren, nie hier editieren.
  Einzige beabsichtigte Abweichung: `--font-sans`/`--font-mono` zeigen in
  `globals.css` auf die next/font-Variablen.
- **Theming:** `src/app/shadcn-theme.css` mappt jede shadcn-Variable
  explizit auf ein Token (guidelines/09 §9.2). Nie Preset, nie
  Basisfarbe. Dunkel über `.bm-on-dark` (Sektion) oder `.dark` (App).
  Radien und Schatten liefert tokens.css direkt (gleiche Namen wie
  Tailwind), deshalb kein `--radius` mit `calc()`-Kette.

## shadcn verwenden

- Komponenten importieren aus `@/components/ui/<name>`.
- Neue Komponente: `npx shadcn@latest add <name>`. Danach die Datei
  durchgehen (guidelines/09 §9.11): Text auf `type-*`, Abstände eine
  Stufe hoch (§9.6), Rahmen an schwebenden Ebenen raus, englische
  Beschriftungen auf Deutsch. **Nie `shadcn init`** erneut laufen
  lassen, es überschreibt `globals.css`.
- **Icons:** Inhalte mit Material Symbols
  (`<span className="material-symbols-outlined">name</span>`, Font
  selbst gehostet in `src/app/fonts/`). Lucide nur innerhalb der
  `ui/`-Komponenten (Häkchen, Chevron, X).
- `TooltipProvider` sitzt im Root-Layout.

## Abstände (guidelines/06 §6.5–6.6, 09 §9.6)

- **Eine Stufe Luft:** Karte/Dialog 32px innen, Popover 24px,
  Felder 24px auseinander, Button-Reihen 12px, Label → Feld 8px.
- **Nichts klebt an einer Kante:** unten derselbe Abstand wie oben,
  Scroll-Bereiche mit Padding innen, nichts ragt bei 375px über den
  Rand. Jede Ansicht bis ganz unten und mobil ansehen.

## ⚠ Handwerks-Fallen

1. **Rezepte schlagen Utilities:** Die `bm-*`-Klassen in tokens.css
   sind ungelayert und gewinnen gegen jede Tailwind-Utility. Eine
   Rezept-Eigenschaft am Element überschreiben = `!`-Utility
   (`!bg-transparent`). Rezepte mit `display: block` (`bm-label`)
   nicht in Flex-Layouts einsetzen.
2. **Hydration-Warnungen am `<html>`:** Browser-Extensions stempeln
   Attribute vor der Hydration — `suppressHydrationWarning` im Layout
   fängt genau das ab, nichts anderes.

## Bausteine

- `brand/wordmark` — Wortmarke als SVG-Asset (20px im Header); Monogramm
  nur Favicon/Avatar/Stempel.
- `brand/kasane` — Gradient-Katalog-Varianten (hero/cta/plum/band-*),
  Drift + Grain als Props. Ein Hero-Kasane pro Seite.
- `brand/site-nav` — fixer 64px-Header, transparent → blur-solid.
- `brand/image-placeholder` — gestreifter Platzhalter mit
  Monospace-Caption. Nie Illustrationen erfinden.

## Harte Regeln (Kurzfassung)

- Text NUR über `type-*`-Klassen — nie `text-sm`/`font-semibold` ad hoc.
- Farben NUR über Token-Utilities (`bg-bm-purple`, `text-mid`, …).
- Grundton Off-White; Weiß ist Sektionsfläche im Wechsel.
- Buttons Pill, immer: `bm-btn`-Familie bzw. `Button` aus `ui/` (gleiche Optik).
- Karten sitzen: `card-clean`/`bm-card-*`. Hervorhebung NUR über
  Surfaces (`bm-card-stone/-mauve/-sage/-sand`); Outline-Box nimmt zurück.
- **Nie eine farbige Kante an einer Box — oben, links, egal wo**
  (`border-t-4`, `border-l-4`, inset-Shadow, `::before`-Balken) und nie
  farbige Rahmen. Auch nicht bei Status-/Hinweis-Boxen: die sind Tint-Fläche.
- Höchstens ein Motion-Moment pro Sektion; `prefers-reduced-motion` gilt.
- Unklar? Fragen — Markenkritisches nie improvisieren.
