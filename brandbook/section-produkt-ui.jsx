/* global React */
// Brandbook — Section: shadcn/ui + Radix UI für Produkt-UIs

function BbProductUiSection() {
  const colorRoles = [
    ["--background", "--off-white", "#F5F4F1"],
    ["--foreground", "--charcoal", "#1C1C1E"],
    ["--card / --popover", "--white", "#FFFFFF"],
    ["--primary", "--bm-purple", "#6B4A94"],
    ["--secondary", "--bm-purple-tint", "#EDE3F5"],
    ["--muted / --accent", "--surface-stone", "#E8E5DF"],
    ["--muted-foreground", "--mid", "#6B6B65"],
    ["--border / --input", "--surface-mid-stone", "#C5C0B8"],
    ["--primary (dunkel)", "--bm-lavender-dark", "#AF94D2"],
  ];
  const typeRoles = [
    ["Dialog-Titel", "type-h4"],
    ["Karten-Titel", "type-card-title"],
    ["Beschreibung, Menü", "type-small"],
    ["Tooltip, Label", "type-caption"],
    ["Tab", "type-nav"],
  ];
  const spacing = [
    ["Karte, Dialog innen", "24px", "32px"],
    ["Sheet-Kopf und -Fuß", "16px", "32px"],
    ["Popover innen", "16px", "24px"],
    ["Menü-Eintrag", "6 / 8px", "8 / 12px"],
    ["Kopf → Inhalt → Aktionen", "16px", "24px"],
    ["Button-Reihe", "8px", "12px"],
    ["Feld → Feld", "–", "24px"],
    ["Label → Feld", "8px", "8px"],
  ];

  return (
    <BbSection id="produkt-ui" num="12" title="Produkt-UIs — shadcn/ui"
      desc="Digitale Bridgemaker-Produkte (Apps, Tools) bauen auf shadcn/ui mit Radix UI, gebrandet über ein explizites Token-Mapping. Marketing-Oberflächen (Website, Landingpages, Decks) bleiben Bridgemaker-Handwerk.">

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }}>
        <div className="card-clean" style={{ background: "#fff", borderRadius: 16, padding: 32 }}>
          <div style={{ font: "500 12px/1 Inter, sans-serif", textTransform: "uppercase", letterSpacing: "0.10em", color: "#6B6B65" }}>Radix und shadcn liefern</div>
          <ul style={{ font: "var(--text-small)", color: "#3D3D3A", margin: "16px 0 0", paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Verhalten und Anatomie der Komponenten</li>
            <li>Fokus-Management und Tastatur-Bedienung</li>
            <li>Accessibility (ARIA, Screenreader)</li>
            <li>Komponenten-Quellcode im Projekt</li>
          </ul>
        </div>
        <div className="card-clean" style={{ background: "#fff", borderRadius: 16, padding: 32 }}>
          <div style={{ font: "500 12px/1 Inter, sans-serif", textTransform: "uppercase", letterSpacing: "0.10em", color: "#6B6B65" }}>Bridgemaker übersteuert</div>
          <ul style={{ font: "var(--text-small)", color: "#3D3D3A", margin: "16px 0 0", paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Farbe: explizites Mapping, <strong>nie Preset</strong></li>
            <li>Typografie: Inter und type-*-Skala</li>
            <li>Shape: Pill-Buttons, Bridgemaker-Radien</li>
            <li>Elevation: Karten sitzen, ohne Rahmen</li>
            <li>Abstände: eine Stufe Luft</li>
          </ul>
        </div>
      </div>

      <div style={{ background: "#EDE3F5", borderRadius: 16, padding: "24px 32px", marginBottom: 48, font: "var(--text-small)", color: "#4A2D6B", lineHeight: 1.6 }}>
        <strong>Rezepte zuerst:</strong> Button ist bm-btn, Input ist bm-input, Card ist bm-card mit card-clean,
        Badge ist bm-badge. shadcn übernimmt, wofür wir kein Rezept haben: Dialoge, Menüs, Tabs, Popover,
        Switches, Slider.
      </div>

      <h3 style={{ font: "500 17px/1.3 Inter, sans-serif", color: "#1C1C1E", margin: "0 0 24px" }}>Farbrollen-Mapping</h3>
      <div className="card-clean" style={{ background: "#fff", borderRadius: 16, padding: "16px 32px", marginBottom: 48 }}>
        {colorRoles.map(([role, token, hex], i) => (
          <div key={role} style={{
            display: "grid", gridTemplateColumns: "200px 1fr auto 40px", gap: 16, alignItems: "center",
            padding: "12px 0", borderBottom: i < colorRoles.length - 1 ? "1px solid rgba(28,28,30,0.06)" : "none",
          }}>
            <code style={{ font: "500 12px/1.3 'JetBrains Mono', Menlo, monospace", color: "#1C1C1E" }}>{role}</code>
            <code style={{ font: "400 12px/1.3 'JetBrains Mono', Menlo, monospace", color: "#6B4A94" }}>{token}</code>
            <code style={{ font: "400 11px/1 'JetBrains Mono', Menlo, monospace", color: "#918F87" }}>{hex}</code>
            <div style={{ width: 32, height: 20, borderRadius: 6, background: hex, border: "1px solid rgba(0,0,0,0.06)" }} />
          </div>
        ))}
      </div>

      <h3 style={{ font: "500 17px/1.3 Inter, sans-serif", color: "#1C1C1E", margin: "0 0 24px" }}>Typografie-Mapping</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 48 }}>
        {typeRoles.map(([role, bm]) => (
          <div key={role} className="card-clean" style={{ background: "#fff", borderRadius: 12, padding: 24 }}>
            <div style={{ font: "400 12px/1.4 Inter, sans-serif", color: "#918F87" }}>{role}</div>
            <code style={{ font: "500 12px/1.3 'JetBrains Mono', Menlo, monospace", color: "#1C1C1E", display: "block", marginTop: 8 }}>{bm}</code>
          </div>
        ))}
      </div>

      <h3 style={{ font: "500 17px/1.3 Inter, sans-serif", color: "#1C1C1E", margin: "0 0 8px" }}>Abstände: eine Stufe Luft</h3>
      <p style={{ font: "var(--text-small)", color: "#6B6B65", margin: "0 0 24px", maxWidth: 720, lineHeight: 1.6 }}>
        shadcn ist uns einen Hauch zu eng. Wir nehmen die nächste Stufe auf dem 8px-Raster. Was zusammengehört, bleibt eng.
        Und nichts klebt an einer Kante: unten derselbe Abstand wie oben.
      </p>
      <div className="card-clean" style={{ background: "#fff", borderRadius: 16, padding: "16px 32px", marginBottom: 48 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px", gap: 16, padding: "8px 0 12px", font: "500 12px/1.4 Inter, sans-serif", color: "#918F87", borderBottom: "1px solid rgba(28,28,30,0.06)" }}>
          <span>Element</span><span>shadcn</span><span>Bridgemaker</span>
        </div>
        {spacing.map(([el, sc, bm], i) => (
          <div key={el} style={{
            display: "grid", gridTemplateColumns: "1fr 120px 120px", gap: 16, alignItems: "center",
            padding: "12px 0", font: "400 14px/1.4 Inter, sans-serif", color: "#1C1C1E",
            borderBottom: i < spacing.length - 1 ? "1px solid rgba(28,28,30,0.06)" : "none",
          }}>
            <span>{el}</span><span style={{ color: "#918F87" }}>{sc}</span><span style={{ fontWeight: 500 }}>{bm}</span>
          </div>
        ))}
      </div>

      <p style={{ font: "var(--text-small)", color: "#6B6B65", maxWidth: 720, lineHeight: 1.7 }}>
        Icons: Material Symbols für Inhalte, Lucide nur für Glyphen in den Komponenten (Häkchen, Chevron, X).
        Radien und Schatten kommen direkt aus tokens.css. Vollständiges Mapping:{" "}
        <a href="../guidelines/09-shadcn-radix-mapping.md" style={{ color: "#6B4A94", textDecoration: "underline", textUnderlineOffset: 3 }}>guidelines/09-shadcn-radix-mapping.md</a>.
      </p>
    </BbSection>
  );
}

Object.assign(window, { BbProductUiSection });
