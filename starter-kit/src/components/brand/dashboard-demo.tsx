"use client";

import { useState } from "react";
import {
  BookOpen,
  ChartLine,
  FolderOpen,
  LayoutDashboard,
  MessagesSquare,
  Settings,
  Users,
} from "lucide-react";
import { AppShell, type NavItem } from "@/components/brand/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Dashboard-Demo mit Floating Sidebar
 * (guidelines/09 §9.12). Inhalte sind Kulisse; der Code zeigt,
 * wie AppShell eingebunden wird.
 */

const NAV: NavItem[] = [
  { key: "uebersicht", label: "Übersicht", icon: <LayoutDashboard /> },
  { key: "projekte", label: "Projekte", icon: <FolderOpen /> },
  { key: "kunden", label: "Kunden", icon: <Users /> },
  { key: "auswertung", label: "Auswertung", icon: <ChartLine /> },
  {
    key: "chat",
    label: "Daten-Chat",
    icon: <MessagesSquare />,
    children: [
      { key: "neu", label: "Neuer Chat" },
      { key: "c1", label: "Pipeline Q4 nach Branche" },
      { key: "c2", label: "Auslastung Delivery-Team" },
    ],
  },
  { key: "wissen", label: "Wissen", icon: <BookOpen />, soon: true },
];

const FOOTER: NavItem[] = [
  { key: "einstellungen", label: "Einstellungen", icon: <Settings /> },
];

const KPIS = [
  { label: "Aktive Projekte", value: "18", note: "3 starten im November" },
  { label: "Pipeline", value: "€2,4M", note: "gewichtet, Stand heute" },
  { label: "Auslastung", value: "86%", note: "Delivery-Team, 4 Wochen" },
];

const ROWS = [
  ["Handelsgruppe", "Pricing-Agent", "Build", "Venture Architect"],
  ["Maschinenbauer", "Service-Assistent", "Betrieb", "Product Lead"],
  ["Versicherer", "Schadenportal", "Validierung", "Venture Architect"],
  ["Familienunternehmen", "Neues Geschäftsfeld", "Konzept", "Partner"],
  ["PE-Portfolio", "Value-Creation-Plan", "Scale", "Partner"],
];

export function DashboardDemo({
  nav = NAV,
  footer = FOOTER,
  eyebrow = "Starter-Kit, Dashboard",
}: {
  nav?: NavItem[];
  footer?: NavItem[];
  eyebrow?: string;
}) {
  const [active, setActive] = useState("uebersicht");
  const [activeChild, setActiveChild] = useState<string | undefined>("c1");

  return (
    <AppShell
      items={nav}
      footerItems={footer}
      user={{ name: "Vorname Nachname", initials: "VN" }}
      active={active}
      activeChild={activeChild}
      onNavigate={(key, child) => {
        setActive(key);
        setActiveChild(child);
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="type-eyebrow text-light">{eyebrow}</p>
            <h1 className="type-h1 mt-4">Übersicht</h1>
            <p className="type-body-l mt-3 text-mid">
              Die Sidebar schwebt als Glas-Insel über dem Inhalt. Klapp sie
              unten ein oder drück ⌘B; auf dem Handy liegt sie als Leiste
              unten.
            </p>
          </div>
          <Button>Projekt anlegen</Button>
        </header>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {KPIS.map((k) => (
            <div key={k.label} className="bm-card card-clean">
              <p className="type-eyebrow text-mid">{k.label}</p>
              <p className="type-stat mt-4">{k.value}</p>
              <p className="type-small mt-2 text-mid">{k.note}</p>
            </div>
          ))}
        </section>

        <section className="bm-card card-clean mt-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="type-card-title">Laufende Projekte</h2>
            <Badge variant="purple">5 aktiv</Badge>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-surface-stone">
                  {["Kunde", "Projekt", "Phase", "Lead"].map((h) => (
                    <th key={h} className="type-eyebrow py-3 pr-6 text-mid">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r[0]} className="border-b border-surface-stone last:border-b-0">
                    {r.map((c, i) => (
                      <td key={i} className={`type-body py-4 pr-6 ${i === 0 ? "" : "text-dark"}`}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          {["Nächste Meilensteine", "Offene Entscheidungen"].map((t) => (
            <div key={t} className="bm-card bm-card-mauve">
              <h2 className="type-card-title">{t}</h2>
              <ul className="type-body mt-4 grid gap-3 text-dark">
                <li>Pricing-Agent: Prototyp an Pilotnutzer</li>
                <li>Service-Assistent: Monatsauswertung November</li>
                <li>Schadenportal: Preisseite testen</li>
              </ul>
            </div>
          ))}
        </section>

        <section className="bm-card bm-card-dark mt-6">
          <p className="type-eyebrow text-soft">Frost auf Dunkel</p>
          <h2 className="type-h3 mt-4 max-w-2xl text-off-white">
            Scroll diese Fläche hinter die Sidebar
          </h2>
          <p className="type-body mt-3 max-w-2xl text-soft">
            Die Glas-Insel nimmt den Ton der Umgebung auf und bleibt lesbar.
          </p>
          <div className="h-80" />
        </section>
      </div>
    </AppShell>
  );
}

