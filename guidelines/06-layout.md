# 06 — Layout & Abstände

## 6.1 Das 8px-Raster — verbindlich

Alle Größen, Paddings und Gaps sind **Vielfache von 8px** (4px als halbe
Stufe). Keine krummen Werte wie 28px oder 18px für Abstände. Wer einen
eigenen Pixelwert tippt, sollte sich fragen, warum.

## 6.2 Container & Rhythmus (Stand Website)

- **Container:** max `1200px`, seitliches Padding `16px` mobil /
  `32px` ab `md`. *(Ersetzt die v1-Angabe „48px horizontal padding".)*
- **Sektions-Rhythmus:** Standard-Sektionen tragen `py-24` (96px)
  vertikales Padding.
- **Grid-Gutter:** `24px` Default.
- Weiß-/Farbflächen-Sektionen grenzen sich mit
  `border-surface-stone`-Haarlinien voneinander ab (siehe
  [`02-colors.md`](02-colors.md) §2.3).

## 6.3 Maß — Textbreiten

- **Sektions-Headlines und Lead-Lines / Intro-Copy:** `max-w-2xl`.
  Eine Headline über die vollen 1200px liest sich wie ein Banner,
  nicht wie ein Statement — die 2xl-Kappung hält das Maß und lässt
  lange Headlines trotzdem einzeilig laufen.
- Fließtext-Spalten lesbar halten — Fließtext nie über die volle
  Containerbreite laufen lassen.

## 6.4 Zurückhaltungs-Regeln

- **Farbe ist rationiert** — das neutrale Fundament trägt die Seite;
  Markenfarbe erscheint in bewussten Momenten (siehe
  [`02-colors.md`](02-colors.md) §2.7).
- **Höchstens ein Motion-Moment pro Sektion** (siehe
  [`05-motion.md`](05-motion.md)).
- **Schatten bleiben dezent** — Karten dürfen nicht „vor der Fläche
  schweben" (siehe [`04-surfaces-glass.md`](04-surfaces-glass.md) §4.1).
- **Negativraum ist ein Marken-Asset.** Im Zweifel: mehr davon.

## 6.5 Eine Stufe Luft *(Nils, 2026-10-30)*

Bridgemaker setzt Abstände **eine Stufe größer** als die gängigen
UI-Kit-Defaults (shadcn, Tailwind-Beispiele, Vorlagen aus anderen
Quellen). Die Stufen laufen auf dem 8px-Raster:

`4 → 8 → 12 → 16 → 24 → 32 → 40 → 48 → 64 → 96`

Liefert eine Vorlage `p-6` (24px), nehmen wir `p-8` (32px). Liefert
sie `gap-2` (8px) zwischen gleichrangigen Elementen, nehmen wir
`gap-3` (12px). Ausnahme: Was zusammengehört, bleibt eng, etwa
Label und Feld (8px) oder Titel und Unterzeile (8px). Nähe zeigt
Zugehörigkeit, die Stufe Luft trennt die Gruppen. Die verbindlichen
Werte für Produkt-Komponenten stehen in
[`09-shadcn-radix-mapping.md`](09-shadcn-radix-mapping.md) §9.6.

## 6.6 Randabstand: nichts klebt an einer Kante *(Nils, 2026-10-30)*

Kein Inhalt berührt die Kante seines Containers, an keiner Seite.
Der häufigste Fehler sitzt **unten**: Das letzte Element einer
Karte, eines Dialogs, einer Sektion oder eines Scroll-Bereichs
klatscht an die Unterkante oder an die nächste Trennlinie.

- **Unten = oben.** Jeder Container hat unten mindestens denselben
  Innenabstand wie oben. Ein Block mit `pt-16` braucht auch `pb-16`.
- **Mindestwerte innen:** Karten, Dialoge und Sheets 32px,
  Popover 24px, Menüs 8px um die Einträge, Sektionen 96px (`py-24`).
- **Scroll-Bereiche** tragen ihr Padding innen, damit der letzte
  Eintrag beim Scrollen bis zum Ende Luft behält.
- **Fixe Leisten** (Header, Action-Bar) schieben den Inhalt um ihre
  Höhe plus einen Abstand weg, sie verdecken ihn nie.
- **Mobil zählt mit:** Nichts ragt bei 375px Breite über den Rand
  (Tab-Leisten, Tabellen, Chip-Reihen scrollen oder brechen um).

**Prüfen, nicht hoffen:** Jede Ansicht bis ganz unten scrollen,
jeden Dialog mit maximalem Inhalt öffnen und jede Seite bei 375px
ansehen, bevor sie rausgeht.
