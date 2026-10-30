#!/usr/bin/env node
/* ============================================================
   BRIDGEMAKER ARTEFAKT-LINT — die messbare Hälfte der Sehpflicht
   für Slides-Artefakte aus claude.ai (guidelines/07 §7.8.1)

   Liest die Dateien eines Slides-Artefakts (project/deck.json +
   project/slides/<id>.html), rendert die Slides auf der
   1920×1080-Bühne in Headless Chrome und prüft:
   - Textgrößen: max. fünf pro Slide (drei Basisgrößen plus bis
     zu zwei Auszeichnungen; Nils, 2026-10-30)
   - Kopfzone: Headline max. zwei Zeilen, ohne Schlusspunkt und
     Gedankenstrich, auf jeder Content-Slide an derselben Höhe
   - Fußzeile: Content-Slides tragen eine gepinnte Zeile bei
     bottom:64px
   - Sperrzone: kein Inhalt unterhalb von y = 920px
   - Farben: nur Token-Hexwerte und Kasane-rgba() aus tokens.css
   - Farbige Kanten an Boxen: einseitige farbige Border oder
     farbiger Rahmen (Nils, 08.10.)
   - Zeichen: kein Middot, kein Gedankenstrich im Slide-Text

   Nutzung — erst das Artefakt lesen (Artifact read, paths:
   project/deck.json + project/slides/*.html, out_dir = <ordner>),
   dann:
     node templates/artefakt-lint.js <ordner>
     node templates/artefakt-lint.js <ordner> --json
     node templates/artefakt-lint.js <ordner> --png <bildordner>
       (jede Slide zusätzlich als PNG für die Sehpflicht)

   Exit-Code 1 bei Fehlern. Der Lint ersetzt das Ansehen nicht:
   Rhythmus, Layout-folgt-Argument und Ton prüft dein Auge.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const args = process.argv.slice(2);
const dirArg = args.find(a => !a.startsWith('--'));
const asJson = args.includes('--json');
const root = dirArg && (fs.existsSync(path.join(dirArg, 'project', 'deck.json'))
  ? dirArg : fs.existsSync(path.join(dirArg, 'deck.json')) ? path.dirname(dirArg) : null);
if (!root) {
  console.error('Nutzung: node artefakt-lint.js <ordner mit project/deck.json> [--json]');
  process.exit(1);
}

/* ------------------------------------------------------------
   Erlaubte Farben: alle Hexwerte und rgb-Tripel aus tokens.css
   (der Kasane-Katalog steht dort als rgba()).
   ------------------------------------------------------------ */
const tokensCss = fs.readFileSync(path.join(__dirname, '..', 'tokens', 'tokens.css'), 'utf8').toLowerCase();
const allowed = new Set();
const norm = (r, g, b) => `${+r},${+g},${+b}`;
for (const m of tokensCss.matchAll(/#([0-9a-f]{6})\b/g)) {
  const h = m[1];
  allowed.add(norm(parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)));
}
for (const m of tokensCss.matchAll(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g)) allowed.add(norm(m[1], m[2], m[3]));

/* Neutrale Linienfarben — Trennlinien zwischen Elementen sind
   erlaubt, sie markieren keine Box. */
const NEUTRAL_LINES = new Set(['197,192,184', '232,229,223', '28,28,30', '245,244,241', '168,166,158', '255,255,255', '0,0,0']);
/* Transparentes Schwarz, Charcoal oder Weiß (Schatten, Abdunkeln,
   Linien auf Dunkel) gilt als neutral, nicht als eigene Farbe. */
const NEUTRAL_ALPHA = new Set(['0,0,0', '28,28,30', '255,255,255', '245,244,241']);
const hasAlpha = c => /^#[0-9a-f]{8}$/i.test(c) || /rgba\([^)]*,\s*0?\.\d+\s*\)/i.test(c);

const deck = JSON.parse(fs.readFileSync(path.join(root, 'project', 'deck.json'), 'utf8'));
const order = deck.order || [];
const slides = order.map(id => {
  const p = path.join(root, 'project', 'slides', id + '.html');
  return { id, html: fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null };
});

const report = { slides: [], deck: [], meta: { slideCount: slides.length } };
const add = (s, level, msg) => s.findings.push({ level, msg });

/* ------------------------------------------------------------
   Statische Prüfungen am Quelltext.
   ------------------------------------------------------------ */
const toRgb = c => {
  c = c.toLowerCase();
  let m = c.match(/^#([0-9a-f]{3})$/);
  if (m) return norm(...m[1].split('').map(x => parseInt(x + x, 16)));
  m = c.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/);
  if (m) return norm(parseInt(m[1].slice(0, 2), 16), parseInt(m[1].slice(2, 4), 16), parseInt(m[1].slice(4, 6), 16));
  m = c.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  return m ? norm(m[1], m[2], m[3]) : null;
};

slides.forEach((sl, i) => {
  const s = { n: i + 1, label: sl.id, findings: [] };
  report.slides.push(s);
  if (!sl.html) { add(s, 'error', 'Slide-Datei fehlt im Ordner.'); return; }
  /* Eingebettete Live-Seiten (x-embed) sind Produkt-Demos mit
     eigener Optik — sie werden nicht geprüft. */
  const src = sl.html.replace(/<x-embed[\s\S]*?<\/x-embed>/g, '').replace(/<aside>[\s\S]*?<\/aside>/g, '');

  const fremd = new Set();
  for (const m of src.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g)) {
    const rgb = toRgb(m[0]);
    if (rgb && !allowed.has(rgb) && !(hasAlpha(m[0]) && NEUTRAL_ALPHA.has(rgb))) fremd.add(m[0]);
  }
  if (fremd.size) add(s, 'error', `Farben außerhalb der Tokens/Kasane-Rezepte: ${[...fremd].slice(0, 6).join(', ')}`);

  for (const m of src.matchAll(/border-(top|right|bottom|left)\s*:\s*([^;"]+)/g)) {
    const rgb = toRgb((m[2].match(/#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)/) || [''])[0]);
    if (rgb && !NEUTRAL_LINES.has(rgb)) add(s, 'error', `Farbige Kante (border-${m[1]}: ${m[2].trim()}) — an Boxen verboten, Hervorhebung über die Fläche.`);
  }
  for (const m of src.matchAll(/border\s*:\s*(\d+)px\s+solid\s+([^;"]+)/g)) {
    const rgb = toRgb(m[2].trim());
    if (rgb && !NEUTRAL_LINES.has(rgb)) add(s, 'error', `Farbiger Rahmen (border: ${m[0].slice(7).trim()}) — Hervorhebung läuft über Surfaces, nie über Rahmen.`);
  }

  const text = src.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, ' ');
  if (/·/.test(text)) add(s, 'error', 'Middot im Slide-Text — Aufzählungen als Satz mit Komma und „und".');
  if (/—|\s–\s/.test(text)) add(s, 'error', 'Gedankenstrich im Slide-Text — in Decks tabu.');
  /* Platzhalter sind Arbeitsstand (07 §7.7): vor dem Export ersetzen. */
  if (/\[\s[^\]]+\s\]/.test(text) || /<img(?![^>]*\bsrc=)[^>]*>/.test(src)) {
    add(s, 'warn', 'Platzhalter auf der Slide — vor dem Export als PDF/PPTX Asset einsetzen oder die Stelle ohne Bild bauen.');
  }
});

if (Object.values(deck.faces || {}).some(f => /fonts\.googleapis/.test(f.href || ''))) {
  report.deck.push({ level: 'warn', msg: 'Inter kommt über Google Fonts: erlaubt für die Arbeit im Artefakt, nach außen nur PDF oder PPTX weitergeben (07 §7.8.1).' });
}

/* ------------------------------------------------------------
   Render-Prüfungen: alle Slides untereinander auf echter Bühne.
   ------------------------------------------------------------ */
function measure() {
  const out = [];
  document.querySelectorAll('section.__s').forEach(sec => {
    const b = sec.getBoundingClientRect();
    const r = { id: sec.id, sizes: [], headTop: null, headLines: 0, head: '', overflow: null, footer: false };
    const sizes = new Set();
    sec.querySelectorAll('*').forEach(el => {
      if (el.closest('svg, x-embed, aside')) return;
      const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
      if (own) sizes.add(Math.round(parseFloat(getComputedStyle(el).fontSize)));
    });
    r.sizes = [...sizes].sort((a, c) => c - a);
    const h = sec.querySelector('h1, h2');
    if (h) {
      const hb = h.getBoundingClientRect();
      r.headTop = Math.round(hb.top - b.top);
      r.headLines = Math.round(hb.height / parseFloat(getComputedStyle(h).lineHeight));
      r.head = h.textContent.trim();
    }
    r.footer = [...sec.querySelectorAll('[style*="position:absolute"], [style*="position: absolute"]')]
      .some(el => /bottom:\s*64px/.test(el.getAttribute('style')));
    let maxB = 0, who = '';
    sec.querySelectorAll('*').forEach(el => {
      if (el.closest('[style*="position:absolute"], [style*="position: absolute"], aside')) return;
      const eb = el.getBoundingClientRect();
      if (!eb.height) return;
      const cs = getComputedStyle(el);
      const painted = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.backgroundImage !== 'none';
      const own = painted || [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) || /^(IMG|SVG|TABLE)$/i.test(el.tagName);
      const y = eb.bottom - b.top;
      if (own && y > maxB) { maxB = y; who = (el.textContent || el.getAttribute('alt') || el.tagName).replace(/\s+/g, ' ').trim().slice(0, 40); }
    });
    r.overflow = maxB > 920.5 ? { y: Math.round(maxB), who } : null;
    out.push(r);
  });
  return out;
}

const faces = Object.values(deck.faces || {}).filter(f => f.href).map(f => `<link rel="stylesheet" href="${f.href}">`).join('');
const body = slides.filter(s => s.html).map(s => s.html
  .replace(/<aside>[\s\S]*?<\/aside>/g, '')
  /* Eingebettete Live-Seiten bringen ein eigenes Dokument mit —
     im Render nur als Fläche in ihrer Größe. */
  .replace(/<x-embed([^>]*)>[\s\S]*?<\/x-embed>/g, '<x-embed$1 data-lint="embed"></x-embed>')
  .replace(/src="\/_blob\/[^"]*"/g, 'src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"')
  .replace(/<section ([^>]*)style="/, '<section class="__s" $1style="position:relative;overflow:hidden;width:1920px;height:1080px;box-sizing:border-box;'))
  .join('\n');
const html = `<!doctype html><html><head><meta charset="utf-8">${faces}
<style>body{margin:0} .__s *{margin:0;box-sizing:border-box} x-embed,x-icon{display:block} x-embed[data-lint]{background:#d0ccc4} x-connector{display:none}</style></head><body>${body}
<script>
window.addEventListener('load', () => Promise.resolve(document.fonts ? document.fonts.ready : null).then(() => setTimeout(() => {
  let data; try { data = (${measure.toString()})(); } catch (e) { data = { error: String(e) }; }
  const d = document.createElement('div'); d.id = '__lint__'; d.style.display = 'none';
  d.textContent = btoa(unescape(encodeURIComponent(JSON.stringify(data)))); document.body.appendChild(d);
}, 300)));
</scr` + `ipt></body></html>`;

const tmp = path.join(root, '.artefakt-lint-' + process.pid + '.html');
fs.writeFileSync(tmp, html);
let measured, fatal;
try {
  const chrome = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium']
    .find(p => fs.existsSync(p));
  if (!chrome) fatal = 'Kein Chrome gefunden — der Lint braucht Headless Chrome.';
  else {
    const dom = execFileSync(chrome, ['--headless', '--disable-gpu', '--window-size=1920,1080',
      '--virtual-time-budget=10000', '--dump-dom', 'file://' + path.resolve(tmp)],
      { maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }).toString('utf8');
    const m = dom.match(/id="__lint__"[^>]*>([A-Za-z0-9+/=]+)</);
    if (!m) fatal = 'Render lieferte keinen Befund.';
    else measured = JSON.parse(Buffer.from(m[1], 'base64').toString('utf8'));

    /* --png <ordner>: jede Slide als Bild für die Sehpflicht.
       Hochgeladene Bilder (/_blob/…) erscheinen als Leerfläche —
       sie liegen nur im Artefakt. */
    const pngIdx = args.indexOf('--png');
    if (pngIdx >= 0) {
      const outDir = path.resolve(args[pngIdx + 1] || path.join(root, 'sehpflicht'));
      fs.mkdirSync(outDir, { recursive: true });
      slides.filter(s => s.html).forEach((s, i) => {
        const one = path.join(root, `.artefakt-lint-${process.pid}-${i}.html`);
        const sec = body.split('\n<section').map((x, k) => (k ? '<section' : '') + x)
          .find(x => x.includes(`id="${s.id}"`));
        fs.writeFileSync(one, html.replace(body, sec).replace(/<script>[\s\S]*<\/script>/, ''));
        try {
          execFileSync(chrome, ['--headless', '--disable-gpu', '--hide-scrollbars', '--window-size=1920,1080',
            '--virtual-time-budget=6000', `--screenshot=${path.join(outDir, String(i + 1).padStart(2, '0') + '-' + s.id + '.png')}`,
            'file://' + one], { stdio: 'ignore' });
        } finally { fs.rmSync(one, { force: true }); }
      });
      report.meta.png = outDir;
    }
  }
} finally {
  fs.rmSync(tmp, { force: true });
}
if (fatal) { console.error(fatal); process.exit(1); }
if (measured.error) { console.error('Lint-Laufzeitfehler: ' + measured.error); process.exit(1); }

/* Content-Slides = Slides mit Fußzeile; ihre Headline-Höhe muss
   überall gleich sein (Mehrheitswert = Soll). */
const byId = Object.fromEntries(measured.map(r => [r.id, r]));
/* Kapiteltrenner setzen die Headline bewusst tief — sie zählen
   nicht zur Kopfzone der Content-Slides. */
const isContent = r => r.footer && r.headTop !== null && r.headTop < 400;
const content = measured.filter(isContent);
const tops = content.map(r => r.headTop);
const soll = tops.sort((a, b) => tops.filter(v => v === b).length - tops.filter(v => v === a).length)[0];

report.slides.forEach(s => {
  const r = byId[s.label];
  if (!r) return;
  if (r.sizes.length > 5) add(s, 'error', `${r.sizes.length} Textgrößen (${r.sizes.join('/')}px) — max. fünf: drei Basisgrößen plus bis zu zwei Auszeichnungen.`);
  if (r.headLines > 2) add(s, 'error', `Headline läuft über ${r.headLines} Zeilen — redigieren, nicht schrumpfen.`);
  if (/[.!]$/.test(r.head)) add(s, 'error', 'Headline endet mit Schlusspunkt oder Ausrufezeichen.');
  if (isContent(r) && Math.abs(r.headTop - soll) > 2) add(s, 'error', `Headline steht bei y ${r.headTop}px statt ${soll}px — beim Blättern springt sie.`);
  if (r.footer && r.overflow) add(s, 'error', `Inhalt ragt in die Sperrzone (unterkante y ${r.overflow.y}px > 920px): „${r.overflow.who}".`);
  if (!r.footer && r.headTop !== null && r.headTop < 400 && s.n > 1) add(s, 'warn', 'Keine Fußzeile bei bottom:64px — nur Cover, Zitat und Schluss laufen ohne.');
});

if (asJson) { console.log(JSON.stringify(report, null, 2)); }
let errors = 0, warns = 0;
[...report.slides.flatMap(s => s.findings), ...report.deck].forEach(f => { if (f.level === 'error') errors++; else warns++; });
if (!asJson) {
  console.log(`ARTEFAKT-LINT — ${deck.title || root} (${slides.length} Slides)`);
  report.slides.forEach(s => {
    if (!s.findings.length) return;
    console.log(`\nSlide ${String(s.n).padStart(2, '0')} [${s.label}]`);
    s.findings.forEach(f => console.log(`  ${f.level === 'error' ? 'FEHLER ' : 'HINWEIS'} ${f.msg}`));
  });
  if (report.deck.length) {
    console.log('\nÜbers ganze Deck');
    report.deck.forEach(f => console.log(`  ${f.level === 'error' ? 'FEHLER ' : 'HINWEIS'} ${f.msg}`));
  }
  console.log(errors + warns
    ? `\nErgebnis: ${errors} Fehler, ${warns} Hinweise — korrigieren, dann erneut linten.`
    : 'Ohne Befund — weiter zur Sehpflicht: jede Slide ansehen bleibt Pflicht.');
  if (report.meta.png) console.log(`Slide-Bilder: ${report.meta.png}`);
}
process.exit(errors ? 1 : 0);
