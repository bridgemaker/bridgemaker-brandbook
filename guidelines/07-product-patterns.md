# 07 — Produkt-Patterns

Wie Bridgemaker-Artefakte zusammengebaut werden — von der einzelnen
Sektion bis zur Landingpage, zum Deck oder App-Screen. Das ist das
„Anleitungs-Kapitel", das dem v1-Brandbook fehlte.

**Scope-Hinweis:** Marketing-Oberflächen (Website, Landingpages, Decks)
entstehen mit dem hier beschriebenen Bridgemaker-Komponenten-Handwerk.
Produkt-/App-UIs entstehen auf **shadcn/ui mit Radix UI** und
Bridgemaker-Theming — siehe [`09-shadcn-radix-mapping.md`](09-shadcn-radix-mapping.md).

## 7.1 Sektions-Anatomie

Jede Content-Sektion folgt demselben Skelett, von oben nach unten:

1. **Eyebrow** — `type-eyebrow` in `--light` (oder eine Familienfarbe,
   Disziplin: eine dominante Farbe pro Sektion)
2. **Headline** — `type-h2` (Seitenebene: `type-h1`), `max-w-2xl`
3. **Lead** — `type-body-l` in `--mid`, `max-w-2xl`
4. **Inhalt** — Karten, Medien oder redaktionelle Spalten auf dem
   8er-Raster
5. optional **CTA** — ein Button, Label verb-first

Nicht jede Sektion braucht alle fünf — aber die Reihenfolge dreht sich
nie.

## 7.2 Seitenrhythmus

Der Rhythmus der Website als Referenz (verallgemeinert):

1. **Fixe Nav** (siehe 7.5)
2. **Hero** — Kasane-Fläche, Display-Headline, Lead in `--mid`, ein bis
   zwei CTAs; optional ein Glas-Kartenstapel über dem Gradient
3. **Proof-Band** — Kundenlogos (Marquee) oder Stats auf ruhiger Fläche
4. **Themen-/Feature-Sektionen** — Karten mit variierenden Surfaces und
   Themen-Farbwelten (ein Thema = eine Farbwelt, siehe
   [`04-surfaces-glass.md`](04-surfaces-glass.md) §4.6)
5. **Cases/Referenzen** — Grid oder Scheiben mit `case-glass`-Leisten
6. **Stimmen** — satte Verlaufs-Karten (`bg-stimme-*`) mit Zitaten
7. **Abschluss-CTA** — dunkle Kasane-Fläche, eine Headline, ein Button
8. **Footer** — Off-White mit `border-t border-surface-stone`;
   Wortmarke + drei Linkspalten (Angebot / Unternehmen / Connect), je mit
   `type-eyebrow`-Spaltentiteln

Sektionen wechseln die Fläche (Weiß ↔ Off-White ↔ Surface-/Farbband) —
der Flächenrhythmus gliedert die Seite, nicht Trennlinien allein.

## 7.3 Buttons

- **Form:** Pill. Immer. `border-radius: 999px`. Keine Rechtecke.
- **Varianten (Stand Website):**
  - **Primär:** Charcoal-Pill mit Off-White-Text; Hover →
    `bg-bm-deep-plum`. Auf Dunkel invertiert: Off-White-Pill, Hover →
    `bg-bm-soft-purple`.
  - **Sekundär** *(Systemvariante, auf der Website derzeit ungenutzt)*:
    transparent mit 1.5px Purple-Kontur (Lavender auf Dunkel).
  - **Ghost** *(Systemvariante, auf der Website derzeit ungenutzt)*:
    nur Text.
- **Größen:** 36px (`h-9`) / 44px (`h-11`) / 48px (`h-12`) / 52px
  (`h-[52px]`) Höhe — auf dem 8er-Raster mit 52px als
  Featured-Ausnahme.
- **Hover:** Füllungswechsel innerhalb der Markenfamilie, nie nach
  Schwarz (siehe [`05-motion.md`](05-motion.md) §5.2).
- **Label-Voice:** verb-first („Jetzt starten", „Let's build together").
  Nie „Hier klicken" oder ein nacktes „Absenden".

## 7.4 Formulare

- **Outline-only** *(Nils, 2026-07-14)*: Inputs sind reine
  Umriss-Felder — Ruhezustand transparent auf der Fläche, **weiß füllt
  das Feld erst bei Fokus**.
- Inputs sind `radius-md` (12px), **nicht** Pill — nur Buttons sind Pill.
- Fokus: weiße Füllung + Purple-Rand + weicher Purple-Ring
  (`--border-strong` + Tint).
- Labels über den Feldern, nie Placeholder-als-Label.
- **Selects nur als `.bm-select`** *(Nils, 2026-07-24)*: Das Rezept
  in tokens.css bringt das Chevron mit (`appearance: none` +
  SVG-Chevron, 16px vom Rand — symmetrisch zum linken Padding).
  Das native Browser-Chevron ist tabu: Es klebt an der rechten
  Kante und sieht in jedem Browser anders aus.

## 7.5 Navigation & Links

- **Header (Stand Website):** fix, `64px` hoch (`h-16`), startet
  transparent und wird beim Scrollen solide: `backdrop-blur-xl` +
  `bg-white/30` (auf dunklen Sektionen `bg-charcoal/25`), Haarlinie
  unten. **Die Haarlinie ist beziffert** *(Nils, 2026-07-24 — ein
  Dashboard zeichnete volles Schwarz)*: `border-charcoal/10`
  (`rgba(28,28,30,0.10)`), auf dunklen Sektionen `border-white/10`,
  im Ruhezustand `border-transparent` (Quelle: `Nav.tsx` der
  Website). Nie volles Charcoal oder Schwarz — die Linie trennt
  leise, sie rahmt nicht. Wortmarke links, `20px` hoch; auf dunklen Sektionen
  (`data-nav-dark`) invertiert die Nav (weiße Wortmarke, helle Links).
- Links in `type-nav`; aktiver Link = `--charcoal` (bzw. Off-White auf
  Dunkel), inaktive in `--mid` mit Farbwechsel-Hover. Der Nav-CTA ist
  eine Charcoal-Pill (`h-9`).
- **Mobile:** Vollflächiges Charcoal-Overlay mit `bg-kasane-cta` (60 %
  Opacity, bewusst ohne blur — ruckelt mobil) + `grain-screen`;
  Menüpunkte in `type-h1`.
- Hover-Unterstreichung (`text-underline-offset: 3px`) nur bei **reinen
  Textlinks**. Buttons, Karten-Links und Nav nie unterstreichen — sie
  liften oder wechseln die Füllung.

## 7.6 Badges / Tags

Kleine Pills (~24px). **Farblogik (Stand Website): Tint-Hintergrund +
Deep-Textfarbe** — `purple-tint`+`deep-plum`, `teal-tint`+`deep-teal`,
`rose-tint`+`deep-berry`. Die frühere Mono-Micro-Variante für technische
Labels ist gestrichen *(Website, 2026-07-16)* — auch technische Labels
laufen in Inter (`type-caption`/`type-micro`). Mehr als 3 Badges in
einem View sind meist ein Layout-Problem.

**Badge-Vokabular** *(Nordstern-Review, 2026-07-17)* — eine Bedeutung =
eine Gestalt, dokumentweit konsistent:

1. **Semantik-Badge** („Quick-Win", „Neu"): Tint-Hintergrund +
   Deep-Text wie oben, Inter. Dieselbe Aussage trägt im gesamten
   Dokument exakt dieselbe Farbe und Form.
2. **Themen-Tag** (Referenz: Hebel-Chips der Website): Outline in
   einer Familienfarbe, max. 3 pro Einheit, nie als Listenersatz.
3. **Werte und Ziele** („Ziel: < 2 Wochen"): **nie als Badge.**
   Werte gehören in die Meta-Zeile — Label links, Wert rechts.
4. **Arbeitsstände** („folgt nach Freigabe"): **nie als
   Layout-Element.** Gehören auf eine Notizen-Seite oder in eine
   einheitliche Meta-Zeile.

Badges sind für Sand- und Weiß-Grund rezeptiert; auf getönten
Flächen (Tint auf Tint) haben sie nichts verloren.

**Status-Badges** (Bewertung, nicht Semantik): `status-*-tint` als
Fläche, Text in `--charcoal`, optional ein Punkt in der Base-Farbe.
Nie Base-Text auf eigener Tint (Kontrast). Wann welche Stufe:
[`02-colors.md`](02-colors.md) §2.8.

## 7.7 Bildsprache

> ⚠️ **Work in progress** *(Nils, 2026-07-14)*: Das Editorial-Foto-Konzept
> dieses Abschnitts ist überholt — die Website arbeitet heute ohne
> Fotografie: feine Linien im topografischen Stil auf Gradients und
> konstruierte Vektor-Icons. Das neue Bildkonzept ist in Klärung.
> Bis dahin: keine Bildentscheidungen ohne CD-Freigabe. Im Entwurf
> markiert der gestreifte Platzhalter mit Inter-Caption ein fehlendes
> Asset; nach außen geht nie etwas mit Platzhalter. Der folgende Alt-Stand dient nur noch als Referenz.

Drei Prinzipien:

1. **Charakterköpfe** — echte Menschen mit Präsenz und Haltung. Keine
   Models, kein Stock-Lächeln.
2. **Momente im Gewöhnlichen entdecken** — das sprechende Detail in der
   Alltagsszene, nicht gestellt, nicht heroisch.
3. **Überraschende Perspektiven** — ungewöhnliche Winkel, enge Crops,
   außermittige Kompositionen. Nie frontal und brav.

Ausführung: **Editorial-Fotografie** — dokumentarisch, natürliches Licht,
echte Arbeitskontexte. Treatment: leichte Entsättigung (~−10 %), warme
Abstimmung passend zu Off-White; `radius-xl` auf eingebetteten Bildern;
optional `grain-photo`-Finish (siehe
[`04-surfaces-glass.md`](04-surfaces-glass.md) §4.4). Full-bleed nur in
Heroes und Cover-Slides.

- **Bild-Asset fehlt?** (Foto, freie Illustration, CD-pflichtige
  Bildwelt, fehlendes Logo): Gestreiften Platzhalter-Block mit
  Caption in Inter verwenden, die beschreibt, was dort hingehört.
  Nie eine dekorative Illustration erfinden.
- **Platzhalter sind Arbeitsstand** *(Nils, 2026-10-30)*: In nichts,
  was nach außen geht (PDF, PPTX, Versand-HTML, veröffentlichte
  Seite), steht ein Platzhalter, weder gestreift noch als „[ … ]“.
  Vor der Weitergabe wird das Asset besorgt oder die Stelle ohne
  Bild gebaut. `deck-lint`, `artefakt-lint` und `deck-pack`
  prüfen das.
- **Informationsgrafiken sind kein Bild-Asset** *(2026-07-17)*:
  Diagramme, Timelines, Prozess-Schaubilder und Charts aus der
  Marken-Formensprache (Linien, Kreise, Typografie, Familienfarben,
  Lucide-Icons) werden IMMER gebaut — als erster Draft, der
  gemeinsam iteriert wird. Nie als Platzhalter mit Text-Idee
  abgelegt (Regeln: §7.11).
- **KI-generierte Bilder sind erlaubt**, wenn sie den editorialen
  Standard erfüllen und vom Creative Director freigegeben sind. Der
  Maßstab ist nicht „wurde es von KI gemacht?", sondern „fühlt es sich
  an wie Bridgemaker?"
- ❌ Stock-Handshakes, Menschen, die auf Screens zeigen, flache
  Vektor-Figuren, Emoji als Bildersatz, AI slop (Default-KI-Ästhetik als
  Ersatz fürs kreative Konzept).

## 7.8 Slide-Decks

**Leitsatz** *(Nils, 2026-10-30)*: Die Regeln sind Leitplanken. Ziel
sind Decks, die gut aussehen und Spaß machen: sauber, dynamisch,
freundlich. Wird eine Slide durch eine Regel dröge, ist die Regel
falsch angewendet. Hart und messbar sind nur die Qualitätsregeln,
die nicht bremsen (feste Kopfzone, Fußzeile und Sperrzone, keine
farbigen Kanten, Farben aus Tokens und Katalog, Redigat). Alles
andere ist Balance.

**Zwei Wege, ein Regelwerk** *(Nils, 2026-10-30)*:

- **Standard: Slides-Artefakt in claude.ai** mit dem Bridgemaker
  Design System als Grundlage. Kollegen arbeiten mit (Einladen wie
  bei Google Slides), Export als PDF oder PPTX. Format-Regeln:
  §7.8.1.
- **Rückfallweg: HTML-Template** (`templates/deck-template.html`)
  für Langdock und Fälle, die pixelgenaue Kontrolle oder einen
  Offline-Versand brauchen. Format-Regeln: §7.8.2.

Die folgenden Regeln gelten für beide Wege.

- **Rhythmus statt Einheitsform** *(Nils, 2026-10-30 — ersetzt den
  Linien-Nordstern vom 2026-07-17)*: Ein Deck lebt vom Wechsel.
  Feine Seiten mit Linien, Spalten und Tabellen wechseln mit
  Seiten, die Fläche zeigen: getönte Karten, große Zahlen, Bilder,
  Bühnen. Keine Form dominiert. Folgen zwei, drei Seiten derselben
  Machart aufeinander, wechselt die nächste die Form. Die Linien
  bleiben das ruhige Grundmuster der Website
  (`assets/referenz/website-2026-07/`), die Flächen bringen
  Freundlichkeit und Tempo.
- **Slide Writing — Layout folgt Argument:** Vor jedem Layout die
  Strukturfrage: gleichrangige Punkte? Kontrast? Ursachen →
  Resultat? Tabelle? Benannte Dinge? Das Layout bildet diese
  Struktur ab: Gleichrangiges wird uniform behandelt (dieselbe
  Typo-Stufe, auch im 50/50-Zweispalter), ein Resultat wird anders
  exponiert (Resultat-Band), ein Prozess läuft. Aufeinanderfolgende
  Phasen laufen horizontal, als Kolumnen in Ablaufrichtung oder
  Roadmap *(Nils, 2026-07-23)*. Für jede Struktur gibt es mehrere
  gute Formen (Linien-Spalten oder Karten, Tabelle oder Zahlenreihe);
  welche, entscheidet der Rhythmus des Decks. Ein gefülltes Raster
  ist noch keine Slide.
- **Feste Kopfzone — die Headline steht:** Eyebrow-Kopfzeile und
  Headline beginnen auf jeder Content-Slide an exakt derselben
  Position; der Inhalt füllt den Raum darunter, nie umgekehrt.
  Blätter-Test: Beim Durchschalten springt nichts, weder Kopfzeile,
  Headline, Fußzeile und Seitenzahl noch wiederkehrende Elemente
  (Tabellenkopf, Spaltenraster, Serien-Headline) *(Nils,
  2026-07-24)*.
- **Serien-Slides — ein Inhalt über mehrere Seiten** *(Nils,
  2026-07-24)*: Läuft dieselbe Struktur über mehrere Slides (z. B.
  ein Tabellen-Inventar), steht beim Blättern alles: EINE
  konstante, einzeilige Headline (kein „Fortsetzung"-Zusatz, die
  Seitenzahl trägt die Fortsetzung), identische Spaltenbreiten,
  bemessen am breitesten Inhalt der ganzen Serie, und eine feste
  Oberkante des Inhalts.
- **Eine Linien-Ebene pro Fläche:** Die Hairline hat pro Slide
  einen Job, Spalten eröffnen oder Zeilen trennen, nicht beides
  ineinander. Zwischenüberschriften trennen sich durch Raum, nicht
  durch eigene Striche. In einer Karte keine gestapelten
  Linien-Listen: ein Inhalt, ein Gliederungsmittel.
- **Typografie: drei Basisgrößen, höchstens fünf** *(Nils,
  2026-10-30 — ersetzt „max. drei Textgrößen")*: Die Basis sind
  Headline, Inhalt und Meta (Eyebrow, Quellen, Fußzeile,
  Bildunterschrift). Dazu kommen pro Slide bis zu zwei
  Auszeichnungen, etwa eine große Zahl und ein Kartentitel, oder
  Kleingedrucktes. Konkrete Größen je Format in §7.8.1 und §7.8.2.
  Hurenkinder vermeiden, notfalls umformulieren.
- **Headlines: max. zwei Zeilen, ohne Geviertstrich.** Löst eine
  Headline die dritte Zeile aus, wird redigiert, nicht geschrumpft.
  Umbruch nach Sinn. Gedankenstriche sind in Decks tabu, im
  Fließtext wie in Headlines *(Nils, 2026-07-22)*.
- **Kopf- und Fußzeile als System** *(2026-07-17)*: Kopfzeile = das
  Kapitel-Label „NN / Kapitel" links (Eyebrow, neutral). Fußzeile =
  Wortmarke + Kunde, Partner oder Projekt links, Seitenzahl rechts.
  Beide auf jeder Slide außer den Moment-Slides Cover, Zitat und
  Schluss, immer an derselben Position. **Die Reserve über der
  Fußzeile ist Sperrzone** *(Nils, 2026-07-24)*: Kein
  Content-Element läuft hinein, auch wenn es „noch auf die Seite
  passt". Wer hineinläuft, kürzt oder teilt die Slide.
- **Cover-Kopf nach Anlass:** Die Logo-Brücke (Wortmarke, Linie,
  Kunden- oder Partnerlogo) verbindet zwei Marken und gehört auf
  Kunden- und Partnerdecks. Interne Decks führen nur die Wortmarke
  *(Nils, 2026-07-22)*. Die Linie setzt nahtlos am Strich der
  Wortmarke an, auf derselben Höhe.
- **Grund Off-White, Moment-Flächen mit Bedeutung:** Content-Slides
  stehen auf Off-White. Farbflächen tragen Momente: Cover dunkel
  (Charcoal + `bg-kasane-cta` + topografische Konturen, rechts
  dicht, links offen zum Text), Kapiteltrenner auf den Bändern
  `bg-kasane-band-*` (große Ziffer light, Konturen in `#C5C0B8`),
  Zitat auf `bg-stimme-teal` *(Nils, 2026-07-24)*, Schluss auf
  `bg-contact-cta-static` + konzentrische Konturen. Mehrere Trenner
  variieren Band-Farbwelt und Linienbild. Andere vibrante
  Website-Rezepte (`bg-commercial-os`, `bg-kasane-plum` …) sind in
  Decks tabu. Auf Dunkel: Headlines `--off-white`, Fließtext
  `--soft`.
- **Karten und Tönung:** Füllungen Weiß, Mauve, Sage, Rose-Tint;
  Sand und Stone sind auf Off-White Ton-in-Ton und brauchen die
  Inset-Haarlinie von `card-clean`. Karten umschließen ihren Inhalt
  eng; Reihen gleicher Rolle mit gemeinsamer Unterkante.
  **Tönung braucht Bedeutung** *(2026-07-17)*: Dieselbe Surface
  darf sich wiederholen. Unterschiedliche Tönungen, wenn der
  Unterschied etwas sagt (Identität, Kategorie, Rolle), z. B. eine
  Tönung je Haus in einem Partner-Deck oder eine je Angebot.
  Schachbrett-Alternanz zweier Tönungen ist verboten. Resultat-
  Elemente werden anders exponiert als die Reihe darüber
  (Resultat-Band: Mauve-Tint, Eyebrow und Satz in Deep-Plum, Satz
  bold). Nie eine farbige Kante an einer Karte (guidelines/04
  §4.2).
- **Fläche nutzen** *(Nils, 2026-10-30, verschärft)*: Der Inhalt
  verteilt sich über die verfügbare Höhe bis zur Sperrzone. Kein
  Loch zwischen Headline und Inhalt, kein unteres Drittel, das ohne
  Absicht leer bleibt, keine leere rechte Hälfte. Reicht der Inhalt
  nicht für die Fläche, wird er größer gesetzt (Auszeichnung), mit
  einem Bild oder einer Grafik ergänzt oder mit der Nachbarslide
  zusammengelegt.
- **Farbe mit Bedeutung** *(Nils, 2026-10-30 — erweitert)*: Eine
  Farbwelt pro Slide als Grundsatz. Farbe kommt aus Inhalten:
  Badges, Zielwerte, Resultat-Bänder, Grafiken und **Kennzahlen und
  Auszeichnungen in den Deep-Tönen einer Familie, wenn die Farbe
  eine Identität trägt** (z. B. Deep-Plum für Bridgemaker, Deep-Teal
  für den Partner, konsequent über das ganze Deck). Keine Farbe als
  reine Deko, keine Kapitel-Farbcodes auf Eyebrows. Einfache
  Daten-SVGs in einer Farbfamilie.
- **Große Ziffern** (KPIs, Karten-Nummern): immer light
  (`font-weight: 300`), in Charcoal oder im Deep-Ton der Identität.
- **Bilder rein** *(Nils, 2026-10-30)*: Vorhandene Assets werden
  eingebaut: Wortmarke und Partnerlogos, Kundenlogo-Bänder,
  Produkt-Screenshots im Device-Mockup, Fotos aus Projekten.
  Referenz-Visuals stehen im Argument (Bausteine links, Mockup
  rechts, Bildunterschrift darunter), nie als Showcase-Solo-Slide.
  Im Entwurf markiert der gestreifte Platzhalter ein fehlendes Bild;
  vor der Weitergabe ist er ersetzt (§7.7). Neue Bildwelten (KI-Bilder, Stock, Illustrationen)
  brauchen weiter die CD-Freigabe (§7.7).
- **Grafiken bauen, nicht ankündigen** *(2026-07-17)*: Wo ein
  Diagramm, eine Karte, eine Timeline oder ein Schaubild hilft, wird
  es gebaut, als erster Draft, der gemeinsam iteriert wird (§7.11).
- **Icons:** nur Lucide, Strich 1.5 (`09 §9.8`), einfarbig in
  der Textfarbe des Kontexts *(Nils, 2026-07-23)*, funktional statt
  dekorativ. Eine Icon-Kachel (weiße Fläche in einer getönten
  Karte) ist erlaubt.
- **Badges in Decks:** rechtsbündig am Zeilenende, nie im
  Textfluss; max. 3 pro Seite (Vokabular: §7.6).
- **Arbeitsstände nie auf die Slide** („folgt nach Freigabe"): Sie
  gehören in die Speaker Notes.
- **Schluss-Slide:** Statement, keine Content-Seite. Ein Satz in
  direkter Anrede, fast leer; Ansprechpartner klein als Textzeilen
  (Name, Rolle, **verifizierte** E-Mail). Wortmarke auf Cover und
  Schluss.
- **Voice — Redigat ist Pflicht** *(2026-07-17)*: Gelieferte
  Inhalte werden aktiv in Bridgemaker-Sprache redigiert (`08-voice.md`);
  Aussage und Struktur bleiben, die Sprache wird unsere. Du/ihr,
  Headlines ohne Schlusspunkt, keine Meta- oder Prozesssätze, kein
  Middot, kein „→" im Fließtext, keine Sprachmischung; belastbare
  Zahlen mit Quelle; offene Stellen im Entwurf als „[ Zitat folgt ]",
  vor der Weitergabe gefüllt oder gestrichen.
- **Weitergabe nach außen nur als PDF oder PPTX** (beim
  HTML-Template auch als Versand-HTML). Links auf Artefakte oder
  rohe Deck-Dateien gehen nur an Kollegen.
- **Sehpflicht:** Vor jeder Abgabe jede Seite ansehen und gegen diese
  Liste prüfen, dazu den Lint des jeweiligen Wegs laufen lassen.
  Workflow im Repo-Skill `bridgemaker-slides`.

### 7.8.1 Slides-Artefakt (Standard)

*(Nils, 2026-10-30)* Ein Deck entsteht in claude.ai als Artefakt vom
Typ „Slides" mit dem **Bridgemaker Design System** als Grundlage.
Die Slides-Vorlage liest aus dem Design System die README und die
Tokens; diese Regeln sind dort verlinkt.

- **Bühne 1920×1080**, Innenabstand 128px, unten 160px
  (`padding:128px 128px 160px`). Die Kopfzone steht oben, der
  Inhalt läuft darunter (`flex-direction:column`, nie vertikal
  zentriert). Damit beginnt die Headline auf jeder Content-Slide
  bei derselben Höhe.
- **Typo-Skala (px):** Basis = Headline 64 (600, Tracking −1.5px),
  Inhalt 28, Meta 24 (Eyebrow 24 in Versalien +2.4px, Fußzeile,
  Quellen, Bildunterschrift). Auszeichnungen, höchstens zwei pro
  Slide: große Zahl 64–96 light, Kartentitel 40, in dichten
  Tabellen Inhalt 24. Cover- und Schluss-Headline 120. 24px ist die
  Untergrenze der Vorlage.
- **Fußzeile:** eine gepinnte Zeile bei `bottom:64px`, links und
  rechts 128px: Wortmarke (24px hoch) und Partner- oder Kundenlogo
  links, Quelle und Seitenzahl rechts in Meta 24 `--mid`.
  **Sperrzone:** Kein Inhalt unterhalb von y = 920px.
- **Farben nur als Hex aus den Tokens**, Verläufe 1:1 aus den
  Kasane-Rezepten in `tokens.css` (Werte und Positionen der
  `radial-gradient`-Ebenen übernehmen; jede Ellipse darf eine eigene
  vollflächige, gepinnte Ebene sein). Kein reines Schwarz oder Weiß
  als Grund.
- **Logos und Fonts aus dem Design System:** Wortmarke und Monogramm
  liegen dort unter `assets/logos/`. Inter läuft derzeit über den
  Google-Fonts-Eintrag der Vorlage; das ist für die Arbeit im
  Artefakt erlaubt (wie die Langdock-Ausnahme in §7.8.2), nach außen
  gehen nur PDF und PPTX.
- **Kollaboration:** Kollegen per Teilen einladen; Kommentare am
  Deck statt Screenshots im Chat.
- **Lint:** Die Slide-Dateien sind schlichtes HTML mit festen Werten
  und lassen sich messen: `node templates/artefakt-lint.js <ordner>`
  prüft Textgrößen, Kopfzone, Sperrzone, Farben und Kanten (Ordner =
  die gelesenen `project/`-Dateien des Artefakts).

### 7.8.2 HTML-Template (Rückfallweg)

Decks auf diesem Weg sind **statische Lese-Artefakte**, gebaut als
HTML auf einer festen **1440×810-Stage** (`templates/deck-stage.js`
skaliert verlustfrei).

- **Template-Pflicht:** Jedes Deck entsteht als Kopie von
  `templates/deck-template.html`, bei Kundenarbeit im Projekt-Kit
  außerhalb des Repos (`node templates/new-deck.js <ordner> --kunde
  "Name"`; Kundendaten nie ins Brandbook). Die Layouts dort (Cover,
  Agenda, Kapiteltrenner, Hairline-Kolumnen mit optionalem
  Resultat-Band, Content 2/3 + 1/3 mit Infografik, Device-Mockup,
  Zahlen, Principle-Zeilen, Gegenüberstellung, Objekt-Karten,
  nummerierte Objekt-Karten, Tabelle, Roadmap, Zitat, Schluss) sind
  die Bausteine; duplizieren, umsortieren und kombinieren ist
  ausdrücklich erwünscht, solange der Rhythmus stimmt. Vollbeispiel:
  `examples/beispiel-kundendeck.html`.
- **Typografie = Web:** die `type-*`-Klassen in Web-Größen (Basis
  16px, Contentbreite 1200px); der Deck-Layer pinnt die fluiden
  Stufen auf feste Werte. Basis = Headline, Content, Meta (12px,
  `.source-note`: rechtsbündig, `--mid`); Auszeichnungen wie große
  Ziffern (`type-display` light) oder Kartentitel zählen zu den zwei
  zusätzlichen Größen. Headlines `text-wrap: balance`, Fließtext
  `pretty`.
- **Kopfzone und Fußzeile:** `--deck-title-y`, `--deck-head-y`,
  `--deck-foot-y`; `--deck-pad-b` ist die Sperrzone (72px über der
  Fußzeile). Fußzeile: Wortmarke (14px) + Kunde/Projekt mit 4px Gap
  (Kundenname semi-bold im Wortmarken-Schwarz), Seitenzahl 12px
  `--mid` per CSS-Counter. Serien: `table-layout: fixed` mit festen
  th-Breiten und `.deck-body` auf `justify-content: flex-start`.
- **Cover-Brücke:** Der `.cover-bridge`-Container läuft fest 24px
  hoch und zentriert (`align-self: center`, nie `stretch`); interne
  Decks setzen `.cover-head-intern` *(Nils, 2026-07-24)*.
- **Topografische Konturen:** Generator
  `templates/deck-topo-konturen.js` (cover/schluss); bei mehreren
  Trennern Seed = Basis + Kapitelnummer.
- **Fonts lokal:** Inter und JetBrains Mono aus
  `assets/fonts/`; Icons als inline-SVG aus `assets/icons/lucide/` (der Google-Fonts-Link ist hier tabu,
  *2026-07-17*). Ausnahme *2026-07-20*: rein interne Entwürfe in
  Firmen-Tools ohne Dateizugriff (z. B. Langdock-Canvas) dürfen
  Inter per Google-Link laden. Keine Animationen, kein
  kasane-drift, keine Hover-Effekte.
- **Speaker Notes** in `script#speaker-notes` (liest
  `deck-stage.js`).
- **Lint und Sehpflicht:** `node ../templates/deck-lint.js
  <deck>.html`, dann per Headless-Chrome als PDF rendern und jede
  Seite ansehen.
- **Weitergabe** über `templates/deck-pack.js <deck>.html --pdf`:
  das **PDF** (pixelidentisch, eine Seite pro Slide) und bei Bedarf
  die **Versand-HTML** `<deck>-versand.html` (alle Ressourcen inline,
  läuft offline). Schnellweg: Chrome → Drucken → „Als PDF speichern"
  mit Hintergrundgrafiken AN, Kopf- und Fußzeilen AUS, Skalierung
  Standard; Safari und Firefox nie.

### 7.8.3 Ausnahme: interaktive Artefakte im Deck-Look

*(Nils, 2026-09-29)* Manche Seiten sehen aus wie ein Deck, sind aber
keine Lese-Artefakte: Die Website erzeugt sie aus Daten, sie sind
klickbar und werden als Link geteilt, nicht als PDF. Erster Fall ist
das Tautiom-Transform-Deck (Website-Repo `src/lib/transform-deck/`,
ausgeliefert unter `bridgemaker.com/tautiom/transform/report/…`).
Für solche Artefakte gilt §7.8 mit diesen Abweichungen und
Klarstellungen:

- **Bühne 1920×1080** statt 1440×810, aufs Fenster skaliert. Grund
  ist die Dichte (Suchfeld-Übersicht mit bis zu sechs Spalten,
  Fluss-Grafik mit Detailbereich) plus die Bedienelemente.
- **Tokens und Flächen live von der Website:** Farben, Schatten,
  Radien, Schriftgrößen, Easing und die Flächen-Klassen (`bg-kasane-hero`,
  `bg-contact-cta`, `grain-screen`) werden beim Ausliefern aus
  `globals.css` eingesetzt. Das Artefakt trägt keine eigenen
  Farbwerte; ein Test bricht ab, sobald eins auftaucht.
- **Schrift aus den Web-Tokens:** Die `type-*`-Klassen sind fluide,
  deshalb setzt das Artefakt Schriftgrößen direkt über die Tokens
  `--font-size-*` aus `globals.css` (Headline `--font-size-h1`,
  Cover `--font-size-display-xl`, Boxen `--font-size-body` usw.).
  Keine eigenen Größen, ein Test prüft das.
- **4er-Raster** für Abstände und Größen (§6 fordert 8px): Bei
  dieser Dichte trägt das Achter-Raster nicht. Radien kommen aus
  den Radius-Tokens.
- **Bedienung erlaubt:** Funktionsleiste (Blättern, Teilen,
  Vollbild), Hover- und Auswahlzustände. Die Schlussfolie darf CTAs
  tragen, als Buttons nach §7.3.

Weitere Artefakte dieser Art übernehmen diese Regeln und werden
hier ergänzt.

## 7.9 Print-Publikationen (DIN A4)

Für gedruckte Broschüren, Bookazines und Reports gilt ein eigener
Token-Layer: **`tokens/print-tokens.css`**, geladen NACH `tokens.css`.
Validiert am Bookazine v1 (Druck: Pinguin Druck Berlin, 2026).

- **Format:** DIN A4 Hochformat (210×297mm). Einheiten: Format und
  Spacing in **mm**, Typografie in **pt** — nie px im Print.
- **Schrift:** Display-Grade laufen im Print in **Inter Display**
  (`--font-display`-Override im Print-Layer; Ausnahme-Regel in
  Kapitel 03 §3.1). Body/UI bleiben Inter. Mono nur noch für echte
  Code-Darstellung *(seit 2026-07-16; Platzhalter seit 2026-10-30 in Inter)* —
  Folio, Running Header und TOC-Kapitelnummern laufen in Inter.
  Hinweis: Bookazine v1 wurde noch mit Mono-Folio validiert; die
  Inter-Folios sind beim nächsten Druck zu prüfen.
- **Satzspiegel:** symmetrisch, 16mm links/rechts, 14mm oben (Running
  Header), 18mm unten (Folio). Satzbreite 178mm, 12-Spalten-Raster mit
  4mm Gutter (`.pp-grid` + `.pp-col-*`).
- **Baseline-Grid:** 14pt vertikaler Takt; Body 10pt/14pt sitzt exakt
  darauf, Absatzabstand = genau eine Baseline. Headlines dürfen
  pragmatisch brechen.
- **Print-Type-Scale** in pt (`--pp-text-*`): Numeral 220pt (Großziffer
  auf Openern, eigener Block), Display-XL 96pt (Cover, einmal pro
  Werk), Display-L 72pt, Display 56pt, H1 36pt, H2 24pt, H3 16pt,
  H4 12pt, Lead 13pt, Body 10pt, Small 9pt, Caption 8pt, Eyebrow
  8pt Versalien. Tracking-Korrekturen für Großgrade in pt.
- **Die zwei wichtigsten Abstände** (häufigster Print-Fehler):
  Großziffer → Headline **18mm** (`--pp-gap-numeral-head`) und
  Eyebrow → Headline **12mm** (`--pp-gap-eyebrow-head`).
- **Linien sind physisch:** Hairline = **0.4pt**, Standard 0.6pt —
  nicht 1px. Im Print ruhiger als am Bildschirm.
- **Kasane im Druck:** eigene Print-Varianten (`.pp-kasane-dark/
  -vibrant/-light`) mit **+15 % Sättigung** gegen die Dämpfung von
  Naturpapier. Nicht die Bildschirm-Rezepte unverändert drucken.
- **Beschnitt:** 2mm Anschnitt rundum über den Bleed-Modus
  (`<html class="bleed">`, gesetzt vom PDF-Builder; MediaBox 214×301mm,
  TrimBox 210×297mm). Hintergründe auf `.pp-page` bluten automatisch;
  der Satzspiegel bleibt relativ zum Endformat unverändert.
- **Seitenkonstruktion:** jede Seite ist ein `.pp-page`-Element
  (`@page { size: A4; margin: 0 }`); Varianten `.pp-page-bleed`
  (vollflächig, z. B. Cover/Opener) und `.pp-page-dark`. Running
  Header + Folio in Inter-Versalien (+0.10em), Platzhalter wie am
  Bildschirm gestreift mit Caption in Inter.

## 7.10 Venture-Projekte

**Venture-Marken sind eigenständig definiert.** Bridgemakers visuelle
Identität nicht ohne ausdrückliche Freigabe des Creative Directors für
Ventures wiederverwenden. Bei Venture-Aufträgen: nach den Brand-Assets
des Ventures fragen oder bestätigen lassen, dass Bridgemaker direkt
verwendet werden soll.

## 7.11 Charts & Diagramme

*(Neu 2026-07-17, Nordstern-Review. Referenz:
`assets/referenz/website-2026-07/was-wir-bauen-06-chart-direktbeschriftung.png`.)*

**Ein Chart ist eine Aussage, keine Ausstattung.**

1. **Erst die Typografie-Frage:** Trägt die Aussage in zwei, drei
   Zahlen? Dann freie Stats zwischen vertikalen Hairlines
   (`type-stat`, Caps-Label, ein Erklärsatz) statt Chart — das
   Track-Record-Muster der Website. Ein Chart muss mehr zeigen als
   drei Werte, sonst ist es Deko.
2. **Selbsterklärungs-Test:** Ein Chart, das eine Methodik-Fußnote
   braucht, um lesbar zu sein, ist gescheitert — Charttyp wechseln
   oder zur Typografie zurückkehren.
3. **Vergleichs-Charts** (Verläufe, Balken, Datenreihen): EINE
   farbige Reihe aus einer Familienfarbe; Vergleichsreihe grau und
   gepunktet; **Direktbeschriftung statt Legende** (Label an der
   Linie/am Balken); eine Baseline-Hairline; keine Gitternetze,
   keine Achsenkästen; nichts in Balken hineinquetschen.
4. **Struktur-Diagramme** (Gantt, Kategorien-Karten, Prozessbilder):
   Familienfarben als Kategorien-Code — eine Farbe pro Kategorie,
   konsistent durchgehalten, mit Legende. Das ist Tönung MIT
   Bedeutung und kein Verstoß gegen die Ein-Familien-Regel (die
   gilt für Datenreihen).
5. **Beschriftung in Inter** (`type-caption`/`type-small`), nie
   Mono. Zahlen im Chart sind Inter wie überall.
6. **Größe:** Ein Chart, das die Slide trägt, bekommt ihre Fläche.
   Kein Briefmarken-Chart auf leerer Seite.
7. **Substanz vor Stil:** Stilisierung vereinfacht die Mittel
   (Linien, Luft, Farben), nie die Substanz. Informations-
   dimensionen, die das Argument tragen — Parallelität, Dauer,
   Abhängigkeiten, Größenverhältnisse — bleiben erhalten. Ein
   Gantt wird veredelt, nicht zur Punktlinie reduziert.
8. **Eine Rückfrage vor dem Bau:** Sind Datenlage, Dimensionen oder
   Aussage unklar, die geplante Grafik in einem Satz ansagen und
   bestätigen lassen („Ich baue X mit den Dimensionen Y — fehlt
   etwas?"). Gefragt wird nach **Inhalt**, nie nach Form (die steht
   im Kanon) — und danach wird in jedem Fall gebaut (§7.7:
   Informationsgrafiken sind kein Bild-Asset).
9. **Konstruieren statt zeichnen** *(2026-07-17)*: Erst die
   Invarianten benennen — Mittelachsen, Äquidistanz, gleiche
   Lücken, Pitch —, dann die Koordinaten daraus BERECHNEN.
   Ausrichtung entsteht übers Koordinatensystem, nie durch
   Pixel-Schieben einzelner Elemente. Symmetrische Formen bleiben
   symmetrisch; weiße Flächen ohne Outline; ein Label-Register
   pro Ebene.
10. **Geometrie-Regeln:** Die `viewBox` croppt eng (kein
    Eigen-Leerraum), `preserveAspectRatio="xMinYMin meet"` — die
    Grafik füllt ihre Spalte über die Geometrie, nicht übers
    Skalieren. Balken treffen Linien scharfkantig ODER mit 4px
    Lücke — nie fast. Die Baseline spannt exakt die
    Balkenspannweite; Balken-Werte mittig über dem Balken
    (`text-anchor: middle` auf Balkenmitte). Legenden: gleiche
    LÜCKEN zwischen den Einträgen, nicht gleicher Pitch.
11. **Timelines und Gantt:** Label-Zone und Chart-Zone strikt
    getrennt — Markerlinien kreuzen nie Labels. Bar-Label am
    Balkenende (+10px) in der Familien-Deep-Farbe seiner
    Kategorie; fehlt rechts der Platz, end-anchored nach links.
    Farbabstufung NUR mit benannter Bedeutung (z. B. kräftig =
    erste Welle, 40 % = Folgewelle — die Regel steht in Legende
    oder Fußnote). Wir sind keine Dekorateure.
12. **SVG-Handwerk:** CSS-Klassen-`fill` schlägt das
    `fill`-Attribut — Farben inline per `style` setzen. Nach dem
    Bau die Geometrie NACHRECHNEN: Symmetrien, Abstände,
    Kollisionsfreiheit Linie ↔ Text, Register, viewBox-Crop
    (Geometrie-Block der Sehpflicht im Skill
    `bridgemaker-slides`).
