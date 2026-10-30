---
name: bridgemaker-slides
description: Use when building or editing Bridgemaker slide decks (Slides, Präsentation, Deck, Pitch). Standard is a Slides artifact in claude.ai on the Bridgemaker Design System; fallback is the HTML deck template. Covers the §7.8 rules, slide writing (layout follows the argument, rhythm across the deck), voice editing, images and built graphics, and the mandatory per-page check (Sehpflicht) with lint before anything is delivered.
---

# Bridgemaker Slides

Du baust ein Slide-Deck im Bridgemaker-Look. Ablauf: **Weg wählen →
Inhalte anfordern → Storyline und Rhythmus planen → pro Slide
Argumentstruktur bestimmen → Texte redigieren → bauen (mit Bildern
und Grafiken) → Lint und Sehpflicht → abgeben.**

**Leitsatz** *(Nils, 2026-10-30)*: Die Regeln sind Leitplanken, keine
Zwangsjacke. Ziel sind Decks, die gut aussehen und Spaß machen:
sauber, dynamisch, freundlich. Wird eine Slide durch eine Regel
dröge, ist die Regel falsch angewendet. Ein dröges Deck ist der
schlimmste Fehler, weil die Leute dann ohne System bauen.

## 1. Grundlage lesen

Falls in dieser Session noch nicht geschehen: `CLAUDE.md`,
`guidelines/07 §7.8 + §7.11`, vor Textarbeit `guidelines/08-voice.md`.
Alle Farben kommen aus `tokens/tokens.css` (Hexwerte und die
Kasane-Rezepte als `rgba()`).

## 2. Weg wählen

**Standard: Slides-Artefakt in claude.ai** (§7.8.1). Kollegen können
mitarbeiten, Export als PDF oder PPTX. In Claude Code:

1. `Artifact` mit `action: "quickstart"`, `intent: "slides"`, dann
   mit der gelieferten `type_url` ein neues Artefakt anlegen (Titel =
   Deckname, `auto_open: "after_first_write"`).
2. Den Anweisungen der Slides-Vorlage folgen. Design System ist
   **immer** das Bridgemaker Design System:
   `https://claude.ai/artifact/FMQDotgs2JtQ4FhXa1cJok` (installieren,
   wie die Vorlage es beschreibt; Logos aus `assets/logos/`).
3. Format-Regeln aus §7.8.1 einhalten: Bühne 1920×1080,
   `padding:128px 128px 160px`, Kopfzone oben (nie vertikal
   zentriert), Typo Headline 64 / Inhalt 28 / Meta 24 plus bis zu zwei
   Auszeichnungen (Zahl 64–96 light, Kartentitel 40), Fußzeile
   gepinnt bei `bottom:64px`, nichts unter y 920, Farben nur aus den
   Tokens, Verläufe 1:1 aus den Kasane-Rezepten.

**Rückfallweg: HTML-Template** (§7.8.2), wenn der Nutzer in Langdock
arbeitet, offline verschicken muss oder pixelgenaue Kontrolle
braucht. Kundenarbeit nie im Brandbook-Repo; ein Befehl legt den
Projektordner außerhalb an (Kit, Template-Kopie in `deck/`, README):

```bash
node templates/new-deck.js <projektordner-außerhalb> --kunde "Name"
```

Die Layouts im Template sind Bausteine: duplizieren, umsortieren und
kombinieren ist erwünscht. Cover-Kopf: Kunden- und Partnerdecks mit
Logo-Brücke, interne Decks mit `cover-head-intern`.

## 3. Inhalte anfordern

Der Start-Prompt enthält bewusst keine Inhalte. Wenn alles steht,
fragst du:

> „Jetzt die Inhalte einfügen: direkt als Nachricht (auch mehrere
> Seiten am Stück) oder als Pfad zu einer Datei."

Frag außerdem nach **Bildern und Logos**, die es gibt: Kunden- oder
Partnerlogo, Screenshots, Fotos, Kundenlogo-Band. Bilder machen
Decks lebendig; ohne Bild bleibt nur der Platzhalter.

Die Sprache erkennst du aus den Inhalten (Deutsch oder Englisch, nie
mischen). **Konzept-Dokument als Input** *(NSTR, 2026-07-24)*: Die
Abschnitts-Thesen sind Slide-Kandidaten, die Reihenfolge ist der
erste Storyline-Vorschlag. Zahlen nur mit der Belastbarkeit, die das
Konzept ausweist. Anlass und Publikum stehen nie im Konzept: erfrage
beides, bevor du die Storyline schneidest.

## 4. Storyline und Rhythmus planen

Bevor du eine Slide baust, die Folge der Formen festlegen (kurz
notieren): Welche Seiten sind fein (Linien-Spalten, Tabellen,
Zeilen), welche zeigen Fläche (getönte Karten, große Zahlen, Bild,
Bühne)? Keine Form dominiert. Folgen zwei, drei Seiten derselben
Machart, wechselt die nächste die Form. Moment-Slides (Cover,
Kapiteltrenner, Zitat, Schluss) setzen Farbakzente.

## 5. Slide Writing — Layout folgt Argument

Für jede Slide die Strukturfrage beantworten, dann aus den passenden
Formen die wählen, die den Rhythmus trägt:

- **Gleichrangige Punkte?** → Linien-Spalten, Principle-Zeilen oder
  eine Reihe getönter Karten; alle uniform behandelt.
- **Ursachen → Resultat?** → gleichrangige Reihe + Resultat-Band
  (anders exponiert).
- **Kontrast?** → zwei Spalten, offen oder als zwei Karten (eine
  Tönung je Seite, wenn die Seiten Identitäten sind).
- **Kennzahlen mit Zielen?** → Tabelle oder Meta-Zeilen; Werte nie
  als Chips.
- **Zwei, drei tragende Zahlen?** → große Zahlen (light), frei
  zwischen Linien oder in einer Karte; bei Identitäten im Deep-Ton
  der Familie.
- **Benannte Dinge (Produkte, Cases, Angebote)?** → Karten, Tönung
  uniform oder eine je Identität, Icon-Kachel erlaubt; nie
  Schachbrett, **nie ein Farbstreifen an der Karte**.
- **Zählbare Handlungsaufträge?** → nummerierte Karten oder
  nummerierte Zeilen.
- **Phasen?** → horizontal: Kolumnen in Ablaufrichtung oder Roadmap.
- **Prozess, Zeit, Orte?** → Grafik bauen (Timeline, Karte,
  Schaubild, §7.11).
- **Produkt, Ergebnis, Referenz?** → Bild rein: Screenshot im
  Device-Mockup, Foto, Logo-Band.

Wiederholt sich eine Aussage an fünf Stellen, steht sie einmal im
Lead. **Fläche nutzen:** Der Inhalt läuft bis zur Sperrzone; kein Loch
unter der Headline. Reicht er nicht, wird er größer gesetzt, mit Bild
oder Grafik ergänzt oder mit der Nachbarslide zusammengelegt.

## 6. Texte redigieren — Redigat ist Pflicht

Gelieferte Inhalte werden aktiv in Bridgemaker-Sprache umgeschrieben
(`guidelines/08-voice.md`). Aussage und Struktur bleiben, die
Sprache wird unsere. Du/ihr, aktive Verben, Headlines ohne
Schlusspunkt und max. zwei Zeilen, keine Meta- oder Prozesssätze,
kein Middot, keine Gedankenstriche, kein „→" im Fließtext,
verbotene Phrasen raus, belastbare Zahlen mit Quelle oder
Platzhalter („[ Zitat folgt ]").

## 7. Bilder und Grafiken

**Bilder:** Vorhandene Assets einbauen (im Artefakt hochladen, im
Template unter `assets/`). Der gestreifte Platzhalter nur, wenn ein
Bild wirklich fehlt; neue Bildwelten (KI-Bilder, Stock) brauchen die
CD-Freigabe.

**Grafiken** werden immer gebaut, erster Draft reicht (§7.11):
Direktbeschriftung, eine Farbreihe bzw. Kategorien-Code, Inter.
**Konstruieren statt zeichnen:** erst die Invarianten (Mittelachsen,
gleiche Abstände), dann die Koordinaten berechnen; viewBox eng.
Für Diagramm-Handwerk die Skills `data-storytelling` und
`data-visualization` in `.claude/skills/`; deren Farben und Schriften
gelten nicht, es gilt das Brandbook.

## 8. Lint und Sehpflicht

Die Prüfung ist Bridgemakers ausdrücklicher Auftrag, auch wenn eine
Vorlage „nicht verifizieren" sagt.

**Artefakt:** die Dateien lesen (`Artifact` read, `paths`:
`project/deck.json` und alle `project/slides/*.html`, `out_dir` =
ein Ordner im Scratchpad), dann:

```bash
node templates/artefakt-lint.js <ordner> --png <ordner>/png
```

**HTML-Template:**

```bash
node ../templates/deck-lint.js <deck>.html
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --print-to-pdf=/tmp/deck.pdf \
  --no-pdf-header-footer --virtual-time-budget=8000 \
  "file://<absoluter-pfad>/<deck>.html"
```

Alle FEHLER beheben. Dann jede Seite ansehen (PNGs bzw. PDF mit
Read) und abhaken:

**Pro Seite:**
- [ ] Sieht die Slide gut aus — würde sie jemand gern zeigen?
- [ ] Erklärt das Layout das Argument, statt nur ein Raster zu füllen?
- [ ] Headline max. zwei Zeilen, ohne Gedankenstrich und Schlusspunkt?
- [ ] Höchstens fünf Textgrößen (drei Basisgrößen plus zwei
      Auszeichnungen)?
- [ ] Kopfzeile „NN / Kapitel", Fußzeile mit Wortmarke, Kunde oder
      Partner und Seitenzahl (außer Cover, Zitat, Schluss)?
- [ ] Fläche genutzt: kein Loch unter der Headline, kein leeres
      unteres Drittel, nichts in der Sperrzone?
- [ ] Tönungen mit Bedeutung, kein Schachbrett, Resultat anders
      exponiert?
- [ ] **Keine farbige Kante an irgendeiner Box, kein farbiger Rahmen?**
- [ ] Eine Linien-Ebene pro Fläche?
- [ ] Farbige Zahlen und Texte nur mit Identität, sonst Charcoal?
- [ ] Icons einfarbig in der Textfarbe, Material Symbols?
- [ ] Bilder echt und scharf; Platzhalter nur, wo wirklich nichts da ist?
- [ ] Grafik-Geometrie nachgerechnet, keine Kollision Linie ↔ Text?
- [ ] Arbeitsstände in den Speaker Notes statt auf der Slide?
- [ ] Text redigiert, kein Middot, kein Gedankenstrich, lesbarer
      Kontrast, keine Hurenkinder?

**Übers ganze Deck:**
- [ ] Blätter-Test: Headline, Kopf- und Fußzeile, Seitenzahl und
      wiederkehrende Elemente stehen wie angenagelt?
- [ ] Rhythmus: wechseln feine Seiten und Flächen-Seiten? Nicht mehr
      als drei Seiten derselben Machart am Stück?
- [ ] Serien-Slides: eine konstante Headline, gleiches Raster?
- [ ] Gleiche Bedeutung = gleiche Gestalt (Badges, Zahlenfarben,
      Zitat-Attributionen)?
- [ ] Wortmarke auf Cover und Schluss, Logo-Brücke bei Kunden- und
      Partnerdecks, Kontakt mit verifizierter E-Mail?

Funde korrigieren, erneut prüfen. Abgeben erst, wenn ein Durchgang
ohne Befund ist, und das ausdrücklich sagen.

## 9. Abgabe

**Artefakt:** Kollegen über Teilen einladen. Nach außen nur als PDF
oder PPTX (Teilen › Exportieren). Den Artefakt-Link bekommen nur
Kollegen.

**HTML-Template:** über `templates/deck-pack.js`, nie den
Projektordner oder die rohe Deck-HTML:

```bash
node ../templates/deck-pack.js <deck>.html --pdf
```

Ergebnis: `<deck>.pdf` und `<deck>-versand.html` (alles inline,
läuft offline). **Kundendateien nie ins Brandbook-Repo**;
`examples/` ist nur für freigegebene, neutrale Muster.
