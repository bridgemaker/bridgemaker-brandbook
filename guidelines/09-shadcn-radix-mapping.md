# 09 — shadcn/ui + Radix UI (Produkt-UIs)

Digitale Bridgemaker-Produkte (Apps, Tools, interne Software)
entstehen auf **shadcn/ui** mit **Radix UI** als Primitive-Basis,
gebrandet über ein explizites Bridgemaker-Token-Mapping
*(Nils, 2026-10-30)*.

**Scope:** shadcn/ui gilt für Produkt-/App-UIs. Marketing-Oberflächen
(Website, Landingpages, Decks) behalten das Bridgemaker-Handwerk aus
[`07-product-patterns.md`](07-product-patterns.md).

## 9.1 Arbeitsteilung

**Radix UI liefert (unverändert übernehmen):**

- Verhalten und Anatomie (Dialoge, Menüs, Popover, Tabs, Tooltips,
  Sheets, Auswahl-Elemente)
- Accessibility: Fokus-Management, Tastatur-Bedienung, ARIA-Rollen,
  Screenreader-Texte
- Positionierung schwebender Ebenen (Kollision, Ausrichtung)

**shadcn/ui liefert** den Komponenten-Quellcode, der im Projekt liegt
(`src/components/ui/`). Er gehört uns: Wir passen ihn an, statt ihn
von außen zu überstimmen.

**Vorrang-Regel:** Hat Bridgemaker ein eigenes Rezept (Typo `type-*`,
Buttons `bm-btn`, Formulare `bm-input`/`bm-select`, Karten, Badges,
Header), dann trägt die shadcn-Komponente dessen Optik. Im
Starter-Kit ist das schon verdrahtet: `Button` = `bm-btn`,
`Input` = `bm-input`, `Card` = `bm-card card-clean`, `Badge` =
`bm-badge`. shadcn übernimmt unverändert, wofür wir kein Rezept
haben: Dialoge, Menüs, Tabs, Popover, Tooltips, Sheets, Checkboxen,
Switches, Radios, Slider, Progress.

**Bridgemaker übersteuert (immer):**

- **Farbe**: explizites Token-Mapping (9.2)
- **Typografie**: Inter und die `type-*`-Skala (9.3)
- **Shape**: Pill-Buttons, Bridgemaker-Radien (9.4)
- **Elevation**: zurückhaltende Schatten, keine Rahmen um Karten (9.5)
- **Abstände**: eine Stufe Luft (9.6)
- **Motion**: Bridgemaker-Dauern und -Zurückhaltung (9.7)

## 9.2 Farbrollen — explizit mappen, nie Preset

Keine shadcn-Basisfarbe (zinc, neutral, slate …), kein Preset und
kein Theme-Generator. Jede shadcn-Variable zeigt auf ein Token
(Starter-Kit: `src/app/shadcn-theme.css`):

| shadcn-Variable | Bridgemaker-Token | Wert |
|---|---|---|
| `--background` | `--off-white` | `#F5F4F1` |
| `--foreground` | `--charcoal` | `#1C1C1E` |
| `--card`, `--popover` | `--white` | `#FFFFFF` |
| `--primary` | `--bm-purple` | `#6B4A94` |
| `--primary-foreground` | `--off-white` | `#F5F4F1` |
| `--secondary` | `--bm-purple-tint` | `#EDE3F5` |
| `--secondary-foreground` | `--bm-deep-plum` | `#4A2D6B` |
| `--muted`, `--accent` | `--surface-stone` | `#E8E5DF` |
| `--muted-foreground` | `--mid` | `#6B6B65` |
| `--destructive` | `--status-critical` | `#C4403C` |
| `--border`, `--input` | `--surface-mid-stone` | `#C5C0B8` |
| `--ring` | `--bm-purple` | `#6B4A94` |
| `--chart-1…5` | Purple, Teal, Berry, Lavender, Mid-Stone | |

**Dunkel:** über `.bm-on-dark` (Sektion) oder `.dark` (ganze App).
Basis `--charcoal`, `--primary` wird `--bm-lavender-dark`
(`#AF94D2`). Die On-Dark-Regel aus [`02-colors.md`](02-colors.md)
§2.5 gilt weiter: rohes `--bm-purple` fällt auf Dunkel durch den
Kontrast.

## 9.3 Typografie

shadcn setzt Text mit Tailwind-Größen (`text-sm font-medium`). Bei
uns läuft Text NUR über `type-*`. In `src/components/ui/` ist das
schon ersetzt; neue Komponenten aus der shadcn-Registry werden beim
Einfügen umgestellt:

| shadcn-Default | Bridgemaker-Klasse |
|---|---|
| Dialog-/Sheet-Titel (`text-lg font-semibold`) | `type-h4` |
| Karten-Titel (`font-semibold`) | `type-card-title` |
| Dialog-Beschreibung | `type-body` |
| Karten-/Sheet-Beschreibung, Menü-Einträge (`text-sm`) | `type-small` |
| Tooltip, Menü-Label, Shortcut (`text-xs`) | `type-caption` |
| Tab-Beschriftung | `type-nav` |

Inter überall, nie Geist. `tracking-widest` und andere positive
Spationierung fliegen raus; positiv gesperrt ist nur `type-eyebrow`.

## 9.4 Shape

Die Radien kommen aus `tokens.css`. Weil die Token-Namen mit
Tailwind übereinstimmen (`--radius-sm/md/lg/xl/2xl`), liefern
`rounded-md` usw. in allen shadcn-Komponenten automatisch unsere
Werte. Kein eigenes `--radius` mit `calc()`-Kette.

- **Buttons, Tabs, Filter-Chips, Toggles: Pill** (`rounded-full`)
- **Karten, Dialoge, Sheets:** `rounded-xl` (20px)
- **Inputs, Selects:** `rounded-md` (12px), nie Pill
- **Popover, Menüs:** `rounded-lg` (16px), Einträge `rounded-md`

## 9.5 Elevation

Karten sitzen, sie fliegen nicht. shadcn-Karten tragen `border` und
`shadow-sm`; bei uns ist `Card` die Karte aus
[`04-surfaces-glass.md`](04-surfaces-glass.md) (`bm-card card-clean`,
Inset-Haarlinie statt Rahmen). Schwebende Ebenen (Dialog, Sheet,
Popover, Menü) tragen nur Schatten (`shadow-md`/`shadow-lg` aus den
Tokens), keinen Rahmen. Sheets haben keine Trennlinie an der
Innenkante.

## 9.6 Abstände: eine Stufe Luft

shadcn ist uns einen Hauch zu eng. Deshalb gilt die Regel aus
[`06-layout.md`](06-layout.md) §6.5: **eine Stufe größer als der
shadcn-Default**. Im Starter-Kit ist das eingebaut:

| Element | shadcn-Default | Bridgemaker |
|---|---|---|
| Karte innen | 24px | **32px** |
| Dialog, AlertDialog innen | 24px | **32px** |
| Sheet-Header und -Footer | 16px | **32px** |
| Popover innen | 16px | **24px** |
| Menü-Container | 4px | **8px** |
| Menü-Eintrag (y / x) | 6 / 8px | **8 / 12px** |
| Dialog: Kopf → Inhalt → Aktionen | 16px | **24px** |
| Button-Reihe | 8px | **12px** |
| Tabs: Leiste → Inhalt | 8px | **24px** |
| Formular: Feld → Feld | — | **24px** |
| Label → Feld | 8px | **8px** (gehört zusammen) |

Dazu der Randabstand aus [`06-layout.md`](06-layout.md) §6.6: Nichts
klebt an einer Kante, unten gilt derselbe Abstand wie oben, und
jede Ansicht wird bis ganz unten und bei 375px Breite geprüft.

## 9.7 Motion

shadcn animiert über `tw-animate-css` (Ein-/Ausblenden, Zoom,
Slide). Das bleibt Feedback, keine Dekoration: Dauern und Easings
aus [`05-motion.md`](05-motion.md), höchstens ein Motion-Moment pro
View, `prefers-reduced-motion` ist Pflicht. Keine zusätzlichen
Animations-Bibliotheken für Komponenten-Zustände.

## 9.8 Icons

**Lucide** ist die einzige Icon-Quelle, für Produkt-UIs, Decks,
Brandbook und Website *(Nils, 2026-10-30 — ersetzt Material Symbols)*.
Ein Set für alles: Inhalts-Icons und die Glyphen in den
shadcn-Komponenten sehen gleich aus.

- **Strichstärke 1.5** überall (Lucide-Standard ist 2). Die Regel
  steht in `tokens.css` (`svg.lucide { stroke-width: 1.5 }`) und
  greift damit in jedem Format. Keine gefüllten Varianten, kein
  zweites Icon-Set.
- **Einfarbig in der Textfarbe des Kontexts**: auf Hell
  `--charcoal`, auf Dunkel `--off-white`. Nie in Markenfarben und nie
  mehrfarbige Icon-Reihen *(Nils, 2026-07-23: ein einzelnes farbiges
  Icon in einer neutralen Reihe liest sich als Bedeutung, wo keine
  ist)*.
- **Funktional statt dekorativ:** Icons geben Orientierung (ein Icon
  pro Karte, Aspekt oder Navigationspunkt), nie als Zeilenschmuck
  vor jedem Bullet, nie als Bildersatz.
- **Größen:** 24px Standard, 18–22px in Zeilen und Navigation,
  32px als Akzent in Karten.
- **Laden:** In React `lucide-react` (`<LayoutDashboard />`). In
  statischem HTML (Decks, einfache Tools) das SVG aus
  `assets/icons/lucide/<name>.svg` inline einsetzen, in einem
  `<span class="bm-icon">`; `stroke="currentColor"` erbt die
  Textfarbe. Im Slides-Artefakt ebenfalls als inline-SVG. Namen:
  lucide.dev/icons.
- **Version:** Die Dateien in `assets/icons/lucide/` entsprechen der
  `lucide-react`-Version im Starter-Kit (Lizenz ISC liegt bei).

## 9.9 Favicon & App-Icon

Jedes Produkt-UI führt die fertigen Icons, keine selbst gebauten
(Regel und Begründung: `guidelines/01 §1.2`):

- **Browser-Favicon:** NUR der Gedankenstrich auf schwarzem
  Quadrat, `assets/logos/favicon-dash.png` (72 px) bzw.
  `favicon.ico`. Das volle B—M ist bei Tab-Größe unlesbar.
- **App-/Touch-Icon (ab ~120 px):** B—M im Kreis,
  `assets/logos/app-icon-bm-circle.png`.
- Im Starter-Kit liegen beide fertig verdrahtet: `src/app/icon.png`,
  `src/app/favicon.ico` und `src/app/apple-icon.png`. Next serviert
  sie über die Datei-Konvention automatisch, kein `icons`-Metadata
  nötig.

## 9.10 Dashboard-Basics

*(2026-07-24: Befunde aus dem ersten Mitarbeiter-Dashboard, das mit
dem Style Guide gebaut wurde.)*

1. **Header-Haarlinie beziffert:** Beim Scrollen trennt
   `border-charcoal/10` (`rgba(28,28,30,0.10)`; dunkle Sektionen
   `border-white/10`), Ruhezustand transparent. Nie volles Charcoal
   oder Schwarz (Werte und Verhalten: `07 §7.5`, Referenz-Code:
   `starter-kit/src/components/brand/site-nav.tsx`).
2. **Selects nur als `.bm-select`:** Das Chevron steckt im Rezept
   (tokens.css: `appearance: none` + SVG-Chevron 16px vom Rand). Wer
   ein nacktes `<select>` stylt, bekommt das native Browser-Dreieck an
   der Kante. Braucht eine Auswahl Suche oder eigene Einträge, nimmt
   sie die shadcn-`Select`/`Combobox` mit derselben Optik: Höhe 44px,
   `rounded-md`, Chevron 16px vom Rand.
3. **KPI-Karten-Reihen — gleiche Höhe nur bei gleicher Rolle:**
   Gleichrangige Stat-Karten laufen uniform (Weiß, `card-clean`,
   gemeinsame Unterkante). Trägt EINE Karte mehr Inhalt (z. B. eine
   Aufschlüsselung als Meta-Zeilen), bricht sie bewusst aus:
   Bento-Split (kompakte Karten gestapelt neben der hohen
   Detail-Karte) statt Nachbarn, die sich leer aufblähen. Karten
   umschließen ihren Inhalt eng, Leerraum lebt auf Seitenebene.
   Tönung bleibt an Bedeutung gebunden: KPIs gleicher Art nicht
   einfärben, höchstens die Detail-Karte, wenn ihre Rolle das trägt.
4. **Hinweise, Alerts, Banner, Status-Boxen — nie mit farbiger
   Kante:** shadcn-Vorlagen und Blocks liefern gern Varianten mit
   Farbstreifen oben oder links (`border-l-4`, `border-t-4`). Die
   sind bei uns verboten, ebenso farbige Rahmen. Status-Boxen sind
   reine Tint-Flächen (§2.8), Hervorhebung läuft über Surfaces, eine
   Outline-Box nimmt zurück (`04-surfaces-glass.md` §4.2). Karten in
   einer Reihe unterscheidet die Eyebrow oder der Titel, nie ein
   Farbstreifen.

## 9.11 Implementierung

- **Setup:** `components.json` mit Style `new-york`, Basis Radix
  (`radix-ui`, das Sammelpaket), `iconLibrary: lucide`, CSS-Variablen
  an. Neue Komponenten mit `npx shadcn@latest add <name>`.
- **Nach jedem `add`** die neue Datei durchgehen: Textgrößen auf
  `type-*`, Abstände eine Stufe hoch (9.6), Rahmen an schwebenden
  Ebenen raus (9.5), englische Beschriftungen („Close") auf Deutsch.
  `globals.css` und `shadcn-theme.css` nie vom CLI überschreiben
  lassen; `shadcn init` läuft nicht erneut.
- **Keine zweite Bibliothek mit eigener Optik** daneben (MUI,
  Mantine, Chakra, Ant Design, HeroUI, Radix Themes). Fehlt etwas,
  kommt es aus der shadcn-Registry oder wird aus Radix-Primitives
  gebaut. Ein Wechsel der Basis ist eine Kanon-Entscheidung, nie eine
  Projekt-Entscheidung.
- **⚠ Handwerks-Falle:** Die `bm-*`-Rezepte in `tokens.css` sind
  ungelayert und schlagen damit jede Tailwind-Utility. Wer eine
  Rezept-Eigenschaft am Element überschreiben will (z. B.
  Hintergrund einer Badge), braucht `!` (`!bg-transparent`).
  Rezepte mit `display: block` (z. B. `bm-label`) nie mit
  `flex`-Layouts kombinieren, das `flex` verliert.

## 9.12 Navigation interner Tools: Floating Sidebar

*(Nils, 2026-10-30 — Grundlage: MarketingOS-Prototyp und die
1Q-Dashboards)* Interne Tools mit mehreren Bereichen navigieren über
eine **Floating Sidebar**: eine Glas-Insel, die links über dem Inhalt
schwebt.

- **Rezept `bm-sidenav`** in `tokens.css` (auch für statische Tools
  ohne React), React-Komponente `AppShell` im Starter-Kit
  (`src/components/brand/app-shell.tsx`), Demo unter `/dashboard`.
- **Zwei Zustände:** ausgeklappt 280px mit Icon und Label,
  eingeklappt eine Pill-Säule von 68px mit 44px-Kreisen. Der
  Zustand wird gemerkt, ⌘B bzw. Strg+B schaltet um. Eingeklappt
  zeigt ein Tooltip das Label (Radix; im statischen Rezept per
  `data-label`).
- **Marke:** ausgeklappt die Wortmarke (20px), eingeklappt der
  Gedankenstrich im schwarzen Kreis (32px), passend zur Pill-Säule
  und zum App-Icon. Kein B—M in der Säule, kein Tool-Logo-Ersatz.
- **Schwarz-weiß:** Die Navigation trägt keine Markenfarbe. Hover
  und Auswahl sind leise Charcoal-Tönungen (5 % und 6 %), die
  Auswahl zusätzlich semi-bold. Kein Charcoal-Block, keine farbige
  Kante am aktiven Eintrag.
- **Aufbau von oben nach unten:** Marke, Hauptbereiche (scrollen bei
  niedrigem Fenster, mit Luft innen), Trennlinie, Fußbereich mit
  Einstellungen, Nutzer und Einklappen.
- **Unterpunkte** (z. B. Chats, gespeicherte Ansichten) erscheinen
  nur unter dem aktiven Eintrag; die Tönung trägt dann der ganze
  Block, der aktive Unterpunkt ist weiß. Eingeklappt verschwinden
  sie.
- **Noch nicht verfügbare Bereiche** stehen ausgegraut mit
  „Bald"-Badge in der Liste und sind nicht klickbar.
- **Icons:** Lucide, Strich 1.5, einfarbig in Charcoal (§9.8).
- **Inhalt** rückt um Insel und Luft ein (`bm-app-main`); der Rand
  bleibt auch unten frei (06 §6.6).
- **Mobil (< 768px):** dieselbe Insel als Icon-Leiste unten, mittig,
  horizontal scrollbar; Unterpunkte und „Bald"-Einträge entfallen.
- **Dunkle Variante** (wie in den 1Q-Dashboards) gibt es noch nicht;
  sie wird gebaut, wenn ein Tool sie braucht.
