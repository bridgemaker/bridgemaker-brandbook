# 02 — Farben

> Quelle der Werte: `tokens/tokens.css` (gespiegelt in
> `tokens/tokens.json`). Farben nie inline neu definieren — immer aus den
> Tokens ziehen. Alle Werte hier sind gegen die Website (`globals.css`,
> September 2026) verifiziert.

## 2.1 Marken-Triade

| Rolle | Token | Hex | Wann |
|---|---|---|---|
| **Primär** | `--bm-purple` | `#6B4A94` | Sekundäre CTAs, Links, Markenmomente, Hover-Akzente |
| **Akzent** | `--bm-berry` | `#B84A6F` | Tags, Hervorhebungen, sparsame Betonung |
| **Sekundär** | `--bm-teal` | `#3A9E97` | Charts, Infografiken, Tech-Kontexte |

**Sage ist gestrichen** (Entscheidung 2026-07-14): keine benannte Marken-
oder Chart-Farbe mehr. Grüntöne existieren nur noch als namenlose
Bestandteile der Gradient-Rezepte und als `surface-sage`-Fläche (beides
live auf der Website). Eine neue Chart-/Zusatzfarbe ist noch nicht
definiert — bis dahin: Triade + Neutrals.

## 2.2 Vollständige Farbfamilien

Jede Markenfarbe existiert als Familie: Base, Deep, Soft, Tint. Die
Familie nutzen statt Zwischentöne zu erfinden.

| Familie | Base | Deep | Soft | Tint | Extra |
|---|---|---|---|---|---|
| Purple | `#6B4A94` | `--bm-deep-plum` `#4A2D6B` | `--bm-soft-purple` `#C4B1DC` | `--bm-purple-tint` `#EDE3F5` | `--bm-lavender` `#9070B8`, `--bm-lavender-dark` `#AF94D2` (on-dark) |
| Berry | `#B84A6F` | `--bm-deep-berry` `#8A3050` | `--bm-dusty-rose` `#D4809A` | `--bm-rose-tint` `#F5E0E8` | |
| Teal | `#3A9E97` | `--bm-deep-teal` `#1D6B66` | `--bm-soft-teal` `#7EC4BE` | `--bm-teal-tint` `#E0F2F0` | |

## 2.3 Neutrals — die Arbeitspferde

- **Vordergrund:** `--charcoal` (`#1C1C1E`)
- **Dunkel sekundär:** `--dark` (`#3D3D3A`)
- **Sekundärtext:** `--mid` (`#6B6B65`)
- **Fließtext auf Dunkel:** `--soft` (`#A8A69E`)
- **Eyebrow-Text:** `--light` (`#918F87`)
- **Hintergrund:** `--off-white` (`#F5F4F1`)

**Off-White ist der Grundton der Seite (body), reines Weiß ist eine
Sektionsfläche.** Der Flächenrhythmus lebt von der Mischung: Weiß-Sektionen
wechseln sich mit Off-White und Surface-Tönen (z. B. Sand) ab und grenzen
sich mit `border-surface-stone`-Haarlinien ab. Eine Seite komplett in
sterilem Weiß — ohne die warmen Töne — verliert die Marken-Wärme.
*(Ersetzt die v1-Regel „nie reines #FFFFFF als Hintergrund".)*

## 2.4 Surfaces — gedeckte Flächen mit Marken-DNA

Die `surface-*`-Tokens für Sektions-Hintergründe und Karten, wenn reines
Off-White flach wirkt. Sie tragen leise Marken-Untertöne:

- `surface-stone` `#E8E5DF` — Default
- `surface-mauve` `#E3E0E8` — Purple-getönte Sektion
- `surface-sage` `#DDE4E0` — Tech-/Security-Kontext
- `surface-sand` `#E5E0D8` — Ventures-Kontext
- `surface-mid-stone` `#C5C0B8` — Rand-/Trennlinien-Wert (siehe 2.6)
- `surface-dark` `#333330` — kontrastreicher dunkler Block in heller Seite

Für reichere, atmosphärische Flächen (Kasane-Gradients, Farbbänder) siehe
[`04-surfaces-glass.md`](04-surfaces-glass.md).

## 2.5 Auf dunklem Grund

Für Inhalte auf `--charcoal`-Hintergründen:

- Headlines: `--off-white`, Fließtext: `--soft` (`#A8A69E`)
- Links und Sekundär-Buttons: `--bm-lavender-dark` (`#AF94D2`) —
  **niemals** rohes `--bm-purple` auf Dunkel; der Kontrast reicht nicht.
- Der Primär-CTA wird zu Weiß-auf-Charcoal.

## 2.6 Ränder & Trennlinien

Drei Ebenen, von weich nach kräftig (Stand Website):

- **Flächen-/Sektionsgrenzen:** `1px solid --surface-stone` (`#E8E5DF`) —
  so trennt die Website Weiß-Sektionen, Footer und Bänder voneinander.
  Weichste sichtbare Grenze. *(Ersetzt das v1-Verbot, Stone-Töne als
  Rand zu nutzen — die Website tut genau das, bewusst.)*
- **Umriss-Boxen, Tabellenlinien:** `--border-subtle`
  (`1px solid #C5C0B8`) — wo eine Linie mehr Gewicht braucht.
- **Fokusringe, aktive Umrisse:** `--border-strong`
  (`1.5px solid --bm-purple`).

`--border-hairline` (`rgba(28,28,30,0.06)`) ist der Ton der
Karten-Inset-Ringe und sehr weicher innerer Unterteilungen.

**Karten sind ein eigenes System.** Content-Karten tragen ihre Kante als
Inset-Haarlinie, die in die Karten-Rezepte eingebacken ist
(`card-elevated` / `card-clean` — siehe
[`04-surfaces-glass.md`](04-surfaces-glass.md)), nicht als CSS-`border`.
*(Ersetzt die v1-Regel „cards are borderless".)*

## 2.7 Farbdisziplin

- **Eine dominante Farbe pro Sektion.** Eine dominant, eine als Akzent,
  Neutrals für alles andere — nie drei Markenfarben in Konkurrenz.
- **Farbe ist rationiert.** Das neutrale Fundament trägt die Seite;
  kräftige Farbe erscheint in Momenten, nicht als Tapete.
- ❌ Ganze Seiten in sterilem Reinweiß ohne warme Gegenflächen — Weiß ist
  eine Sektionsfläche im Rhythmus, nicht der Grundton
- ❌ `--bm-purple`-Text auf Dunkel (→ `--bm-lavender-dark`)
- ❌ Neue Farben erfinden. Wenn eine fehlt: fragen.
- ❌ Status-Farben (§2.8) als Deko, Akzent oder Chart-Farbe — sie
  bedeuten immer eine Bewertung.

## 2.8 Status-Farben — Funktionsfarben für Bewertungen

*(Website, 2026-09-09; erster Einsatz: Ampel der Dimensions-Scores im
Commercial-Readiness-Scan.)* Die Marken-Triade kann Bewertungen nicht
tragen: Teal und Berry standen bislang für „erfüllt" und „nicht erfüllt",
für Zwischenstufen fehlte alles. Deshalb gibt es vier Status-Farben mit
Tint, gedämpft, damit sie neben der Palette stehen können, ohne sie zu
übertönen.

| Stufe | Token | Hex | Tint | Hex |
|---|---|---|---|---|
| Gut | `--status-good` | `#3F9A6E` | `--status-good-tint` | `#E0F0E8` |
| Achtung | `--status-warn` | `#D6A63A` | `--status-warn-tint` | `#F7EBD0` |
| Schwach | `--status-poor` | `#D4703B` | `--status-poor-tint` | `#F8E3D6` |
| Kritisch | `--status-critical` | `#C4403C` | `--status-critical-tint` | `#F7DDDB` |

Auf der Website heißen die Tailwind-Klassen `bg-status-*` / `text-status-*`
(Tokens `--color-status-*` in `globals.css`).

**Regeln:**

- Status-Farben tragen **nur Bewertungen** (Scores, Prüfergebnisse,
  Ampeln). Nie als Sektionsfarbe, Akzent, Chart-Serie oder Illustration.
- **Schwellen sind Sache des Produkts**, nicht der Farbe. Referenz Scan:
  ab 70 gut, 50–69 Achtung, 30–49 schwach, unter 30 kritisch — als
  Konstanten im Code, nicht in Copy.
- **Base-Farbe** für Balken, Zahlen und Punkte auf hellem Grund
  (Off-White, Weiß, Surfaces). **Tint** für Flächen dahinter (Badge,
  Zeile). Auf einer Tint steht Text in `--charcoal`, nie in der eigenen
  Base-Farbe — Amber auf Amber-Tint hat keinen Kontrast.
- **Status-Boxen** (Hinweis, Warnung, Prüfergebnis) sind reine
  Tint-Flächen ohne Rand. Nie Tint plus farbige Kante oben oder links,
  nie Base-Farbe als Rahmen (Verbot: `04-surfaces-glass.md` §4.2).
- Binäre Prüfungen (erfüllt / nicht erfüllt) bleiben bei
  `teal-tint`+`deep-teal` und `rose-tint`+`deep-berry` (Stand Website).
  Status-Farben kommen erst ins Spiel, wenn es Zwischenstufen gibt.
- **Auf Dunkel** sind Status-Farben nicht rezeptiert. Der Score-Ring im
  dunklen Band bleibt Off-White; Amber und Ziegelrot auf Plum wirken
  schrill.
- Höchstens **eine Ampel pro View**. Zwei Bewertungslogiken nebeneinander
  liest niemand mehr.
