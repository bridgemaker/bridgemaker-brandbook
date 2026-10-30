# Bridgemaker Starter-Kit

Referenz-Code für digitale Bridgemaker-Produkte: Next.js 15 + React 19 +
Tailwind v4 + shadcn/ui auf Radix UI, gebrandet über das Token-Mapping
aus `../guidelines/09-shadcn-radix-mapping.md`.

## Quickstart

```bash
npm install
npm run dev        # http://localhost:3000
```

Die Startseite ist die **Komponenten-Referenz**: shadcn/ui im
Bridgemaker-Theming, Buttons, Felder, Karten und Badges in unseren
Rezepten — der Code der Seite ist die Gebrauchsanweisung. Die visuelle
Herleitung steht im Brandbook.

## Aufbau

```
components.json          ← shadcn-Konfiguration (new-york, Radix, Lucide)
src/
├─ app/
│  ├─ tokens.css         ← Kanon-Kopie (Quelle: ../tokens/tokens.css)
│  ├─ shadcn-theme.css   ← shadcn-Variablen ← Bridgemaker-Tokens
│  ├─ globals.css        ← Tailwind-Verdrahtung (@theme) + Icons
│  └─ …                  ← Demo-Routen
├─ components/
│  ├─ ui/                ← shadcn-Komponenten, auf Bridgemaker abgestimmt
│  └─ brand/             ← Wortmarke, Kasane, Header, Platzhalter, Swatch
└─ lib/utils.ts          ← cn() (clsx + tailwind-merge)
```

Neue Komponente: `npx shadcn@latest add <name>`, danach auf
Bridgemaker abstimmen (Checkliste in [`CLAUDE.md`](./CLAUDE.md)).

## Regeln

Verbindlich sind `../CLAUDE.md` und `../guidelines/01–09`;
Kit-Spezifisches steht in [`CLAUDE.md`](./CLAUDE.md). Kurzform:
Produkt-UI = shadcn/ui mit Bridgemaker-Mapping, Marketing =
Bridgemaker-Handwerk, Text nur über `type-*`-Klassen, Farben nur über
Tokens, Abstände eine Stufe luftiger als der shadcn-Default.

## Deploy

Statisch exportierbar oder als Next.js-App — z. B. `vercel deploy`
aus diesem Verzeichnis. Keine Env-Variablen nötig.
