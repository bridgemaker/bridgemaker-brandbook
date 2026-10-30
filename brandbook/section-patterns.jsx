/* global React */
// Brandbook — Sections: Imagery, Slide Templates, Seitenrhythmus

function BbImagerySection() {
  return (
    <BbSection id="imagery" num="16" title="Imagery"
      desc="Das Bildkonzept wird neu gedacht — die alten Editorial-Foto-Regeln gelten nicht mehr.">
      <div style={{ border: "1px solid #C5C0B8", borderRadius: 20, padding: 48, maxWidth: 720 }}>
        <span className="bm-badge bm-badge-purple">Work in progress</span>
        <p style={{ font: "400 17px/1.6 Inter, sans-serif", color: "#1C1C1E", margin: "24px 0 0", maxWidth: 620 }}>
          Die Website arbeitet heute ohne Fotografie: feine Linien im
          topografischen Stil auf Gradients und konstruierte Vektor-Icons.
          Wie das Bildkonzept daraus entsteht, ist in Klärung.
        </p>
        <p style={{ font: "var(--text-small)", color: "#6B6B65", margin: "12px 0 0", maxWidth: 620, lineHeight: 1.6 }}>
          Bis dahin: keine Bildentscheidungen ohne Creative-Director-Freigabe.
          Fehlt ein Asset, bleibt der gestreifte Platzhalter mit
          Monospace-Caption das Mittel der Wahl.
        </p>
      </div>
    </BbSection>
  );
}

function BbSlidesSection() {
  return (
    <BbSection id="slides" num="13" title="Slide-Decks"
      desc="Decks entstehen als Slides-Artefakt in claude.ai auf dem Bridgemaker Design System: gemeinsam bauen, als PDF oder PowerPoint exportieren. Die Regeln sind Leitplanken, das Ziel sind Decks, die gut aussehen und Spaß machen.">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        <div className="card-clean" style={{ background: "#fff", borderRadius: 20, padding: 32 }}>
          <div style={{ font: "500 12px/1 Inter, sans-serif", textTransform: "uppercase", letterSpacing: "0.10em", color: "#6B6B65" }}>Hart, weil es nicht bremst</div>
          <ul style={{ font: "var(--text-small)", color: "#3D3D3A", margin: "16px 0 0", paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Headline steht auf jeder Slide an derselben Stelle</li>
            <li>Fußzeile und Sperrzone darüber</li>
            <li>Keine farbigen Kanten an Boxen</li>
            <li>Farben nur aus Tokens und Kasane-Katalog</li>
            <li>Texte redigiert, Headline max. zwei Zeilen</li>
          </ul>
        </div>
        <div className="card-clean" style={{ background: "#fff", borderRadius: 20, padding: 32 }}>
          <div style={{ font: "500 12px/1 Inter, sans-serif", textTransform: "uppercase", letterSpacing: "0.10em", color: "#6B6B65" }}>Balance, keine Formel</div>
          <ul style={{ font: "var(--text-small)", color: "#3D3D3A", margin: "16px 0 0", paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Rhythmus aus feinen Linien-Seiten und Flächen-Seiten</li>
            <li>Drei Basisgrößen plus bis zu zwei Auszeichnungen</li>
            <li>Fläche nutzen, kein Loch unter der Headline</li>
            <li>Echte Bilder und Logos statt Platzhalter</li>
            <li>Farbige Zahlen, wenn die Farbe eine Identität trägt</li>
          </ul>
        </div>
      </div>
      <p style={{ font: "var(--text-small)", color: "#6B6B65", maxWidth: 720, lineHeight: 1.7 }}>
        Start-Prompt und Ablauf: <a href="../howto/slides.md" style={{ color: "#6B4A94", textDecoration: "underline", textUnderlineOffset: 3 }}>howto/slides.md</a>.
        Alle Regeln: <a href="../guidelines/07-product-patterns.md" style={{ color: "#6B4A94", textDecoration: "underline", textUnderlineOffset: 3 }}>guidelines/07 §7.8</a>.
        Für Langdock und Offline-Versand bleibt das HTML-Template als Rückfallweg.
      </p>
    </BbSection>
  );
}

function BbLandingSection() {
  const sections = [
    { n: "01", label: "Fixe Nav", desc: "64px, transparent → blur-solid beim Scrollen, Wortmarke 20px links, type-nav-Links, CTA-Pill rechts" },
    { n: "02", label: "Hero", desc: "Kasane-Fläche, Display-Headline, Lead in --mid, 1–2 CTAs, optional Glas-Kartenstapel" },
    { n: "03", label: "Proof-Band", desc: "Kundenlogos (Marquee) oder Stats auf ruhiger Fläche" },
    { n: "04", label: "Themen-Sektionen", desc: "Karten mit variierenden Surfaces, ein Thema = eine Farbwelt" },
    { n: "05", label: "Cases", desc: "Grid oder Scheiben mit case-glass-Ergebnisleisten" },
    { n: "06", label: "Stimmen", desc: "Satte Verlaufs-Karten (bg-stimme-*) mit Zitaten" },
    { n: "07", label: "Abschluss-CTA", desc: "Dunkle Kasane-Fläche, eine Headline, ein Button" },
    { n: "08", label: "Footer", desc: "Off-White, border-t surface-stone, Wortmarke + 3 Linkspalten mit Eyebrow-Titeln" },
  ];
  return (
    <BbSection id="landing" num="11" title="Seitenrhythmus"
      desc="Der Bridgemaker-Rhythmus (verallgemeinert von der Website). Sektionen wechseln die Fläche — Weiß ↔ Off-White ↔ Surface/Farbband. Jede Sektion folgt der Anatomie: Eyebrow → Headline (max-w-2xl) → Lead (max-w-2xl) → Inhalt → optional EIN CTA.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {sections.map(s => (
          <div key={s.n} className="card-clean" style={{
            background: "#fff", borderRadius: 16,
            padding: 24, display: "flex", gap: 20, alignItems: "flex-start",
          }}>
            <div style={{ font: "600 28px/1 Inter, sans-serif", letterSpacing: "-0.8px", color: "#C4B1DC", minWidth: 48 }}>{s.n}</div>
            <div>
              <div style={{ font: "500 16px/1.3 Inter, sans-serif", color: "#1C1C1E", letterSpacing: "-0.3px" }}>{s.label}</div>
              <p style={{ font: "var(--text-small)", color: "#6B6B65", margin: "6px 0 0" }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40 }}>
        <a href="../examples/landing-page.html" className="bm-btn bm-btn-secondary" style={{ textDecoration: "none" }}>Beispiel-Landingpage ansehen →</a>
      </div>
    </BbSection>
  );
}

Object.assign(window, { BbImagerySection, BbSlidesSection, BbLandingSection });
