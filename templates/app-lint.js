#!/usr/bin/env node
/* ============================================================
   BRIDGEMAKER APP-LINT — Code-Prüfung für Produkt-Projekte
   (guidelines/04 §4.2, CLAUDE.md Abschnitt 4)

   Findet im Quellcode, was das Brandbook absolut verbietet:
   farbige Kanten an Boxen, egal an welcher Seite, und farbige
   Rahmen als Hervorhebung. Hervorhebung läuft über Surfaces
   (bm-card-*), Status-Boxen sind Tint-Flächen ohne Rand.

   Liegt im Brandbook und wird aus dem Produkt-Projekt über
   brand/templates/app-lint.js aufgerufen — so gilt immer die
   aktuelle Fassung (Kopien driften).

   Nutzung:
     node brand/templates/app-lint.js [Pfad …]   Voll-Scan (Default: .)
     node brand/templates/app-lint.js --hook     PostToolUse-Hook:
       liest das Hook-JSON von stdin, prüft die bearbeitete Datei,
       Exit 2 + Meldung auf stderr → Claude muss korrigieren.

   Exit-Code 1 (Scan) bzw. 2 (Hook) bei Funden.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const EXT = /\.(tsx?|jsx?|css|scss|sass|less|html?|vue|svelte|astro|mdx)$/i;
const SKIP_DIRS = new Set(['node_modules', '.git', '.next', 'dist', 'build', 'out', 'brand', '.vercel', 'coverage']);

/* Farb-Wörter der Marke und der Status-Familie (Tailwind-Utilities
   und CSS-Variablen) — eine Kante in diesen Farben ist immer Akzent. */
const BRAND_COLOR = '(?:bm-[a-z-]+|status-[a-z-]+|deep-[a-z-]+|lavender[a-z-]*|rose[a-z-]*|teal[a-z-]*|purple[a-z-]*|berry[a-z-]*|plum[a-z-]*|primary|accent|destructive|red-\\d+|green-\\d+|blue-\\d+|amber-\\d+|yellow-\\d+|orange-\\d+|emerald-\\d+|violet-\\d+|indigo-\\d+|sky-\\d+|pink-\\d+|rose-\\d+)';
const SIDE_CSS = '(?:top|right|bottom|left|inline-start|inline-end|block-start|block-end|inline|block)';
const SIDE_JSX = '(?:Top|Right|Bottom|Left|InlineStart|InlineEnd|BlockStart|BlockEnd|Inline|Block)';

const MSG_EDGE = 'farbige/stärkere Kante an einer Seite einer Box — absolut verboten (oben, links, egal wo).';
const MSG_FRAME = 'farbiger Rahmen als Hervorhebung — verboten.';
const FIX = 'Hervorhebung über eine Surface (bm-card-stone/-mauve/-sage/-sand), Status-Box als Tint-Fläche ohne Rand, Kategorie über Eyebrow/Titel. Regel: brand/guidelines/04-surfaces-glass.md §4.2.';

const RULES = [
  // Tailwind: border-t-4, border-l-2, border-s-[3px], border-x-4 …
  { re: new RegExp(`(?<![\\w-])border-[tlrbsexy]-(?:[2-9]|\\d{2,}|\\[)`, 'g'), msg: MSG_EDGE },
  // Tailwind: border-l border-bm-teal / border-t-bm-purple
  { re: new RegExp(`(?<![\\w-])border-[tlrbsexy]-${BRAND_COLOR}(?![\\w-])`, 'g'), msg: MSG_EDGE },
  { re: new RegExp(`(?<![\\w-])border-[tlrbsexy](?![\\w-])[^"'\`\\n]{0,160}?(?<![\\w-])border-${BRAND_COLOR}(?![\\w-])`, 'g'), msg: MSG_EDGE },
  // Tailwind: border-2 border-bm-purple (farbiger Rahmen ringsum)
  { re: new RegExp(`(?<![\\w-])border(?:-[2-9]|-\\[\\d)?(?![\\w-])[^"'\`\\n]{0,160}?(?<![\\w-])border-${BRAND_COLOR}(?![\\w-])`, 'g'), msg: MSG_FRAME },
  // CSS: border-left: 4px solid …  /  border-top-width: 3px
  { re: new RegExp(`border-${SIDE_CSS}(?:-width)?\\s*:\\s*(?:[2-9]|\\d{2,})(?:\\.\\d+)?px`, 'gi'), msg: MSG_EDGE },
  // CSS: border-left: 1px solid var(--bm-teal) / border-top-color: var(--status-warn)
  { re: new RegExp(`border-${SIDE_CSS}(?:-color)?\\s*:[^;\\n]*var\\(--(?:bm|status|deep|lavender|rose|teal|purple|berry|plum)`, 'gi'), msg: MSG_EDGE },
  // CSS: border: 2px solid var(--bm-purple)
  { re: /(?<![\w-])border\s*:\s*[^;\n]*var\(--(?:bm|status|deep|lavender|rose|teal|purple|berry|plum)/gi, msg: MSG_FRAME },
  // JSX-Style: borderLeft: '4px solid …' / borderTopWidth: 3
  { re: new RegExp(`border${SIDE_JSX}(?:Width)?\\s*:\\s*['"\`]?\\s*(?:[2-9]|\\d{2,})(?![\\d.]*\\s*%)`, 'g'), msg: MSG_EDGE },
  { re: new RegExp(`border${SIDE_JSX}(?:Color)?\\s*:\\s*[^,}\\n]*(?:--(?:bm|status)|#(?!(?:[cC]5[cC]0[bB]8|[eE]8[eE]5[dD][fF])\\b)[0-9a-fA-F]{3,6})`, 'g'), msg: MSG_EDGE },
  // Einseitiger Inset-Shadow: inset 4px 0 0 … / shadow-[inset_4px_0_0_…]
  // (weiße Lichtkante der Glas-Rezepte, inset 0 1px 0 0 rgba(255,255,255,…),
  // ist ein Reflex, kein Akzent — Weiß ist ausgenommen)
  { re: /inset[\s_]+-?[1-9]\d*(?:\.\d+)?px[\s_]+0(?:px)?[\s_]+0/gi, msg: MSG_EDGE, skip: isWhite },
  { re: /inset[\s_]+0(?:px)?[\s_]+-?[1-9]\d*(?:\.\d+)?px[\s_]+0/gi, msg: MSG_EDGE, skip: isWhite },
];

function isWhite(match) {
  return /rgba?\(\s*255[\s,_]+255[\s,_]+255|#fff(?:fff)?\b|\bwhite\b/i.test(match);
}

function lintText(text) {
  const findings = [];
  const lines = text.split('\n');
  for (const { re, msg, skip } of RULES) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) {
      if (skip && skip(text.slice(m.index).split(/[;\n]|\),|\)_/)[0])) continue;
      const line = text.slice(0, m.index).split('\n').length;
      findings.push({ line, snippet: lines[line - 1].trim().slice(0, 120), msg });
    }
  }
  const seen = new Set();
  return findings
    .filter(f => { const k = f.line + f.msg; if (seen.has(k)) return false; seen.add(k); return true; })
    .sort((a, b) => a.line - b.line);
}

function walk(p, out) {
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    if (SKIP_DIRS.has(path.basename(p))) return;
    for (const e of fs.readdirSync(p)) walk(path.join(p, e), out);
  } else if (EXT.test(p)) out.push(p);
}

function report(file, findings) {
  return findings.map(f => `${file}:${f.line}  ${f.msg}\n    ${f.snippet}`).join('\n');
}

if (process.argv.includes('--hook')) {
  let raw = '';
  process.stdin.on('data', c => (raw += c));
  process.stdin.on('end', () => {
    let file;
    try { file = JSON.parse(raw).tool_input.file_path; } catch { process.exit(0); }
    if (!file || !EXT.test(file) || file.split(path.sep).some(d => SKIP_DIRS.has(d))) process.exit(0);
    let text;
    try { text = fs.readFileSync(file, 'utf8'); } catch { process.exit(0); }
    const findings = lintText(text);
    if (!findings.length) process.exit(0);
    console.error(`BRAND-LINT — Verstoß gegen das Brandbook, sofort korrigieren:\n${report(file, findings)}\n→ ${FIX}`);
    process.exit(2);
  });
} else {
  const targets = process.argv.slice(2).filter(a => !a.startsWith('--'));
  const files = [];
  (targets.length ? targets : ['.']).forEach(t => walk(t, files));
  let total = 0;
  const out = [];
  for (const f of files) {
    const findings = lintText(fs.readFileSync(f, 'utf8'));
    if (findings.length) { total += findings.length; out.push(report(f, findings)); }
  }
  if (total) {
    console.log(`BRAND-LINT: ${total} Verstoß/Verstöße gegen das Kanten-Verbot:\n${out.join('\n')}\n→ ${FIX}`);
    process.exit(1);
  }
  console.log(`BRAND-LINT: ${files.length} Dateien geprüft, keine farbigen Kanten oder Rahmen.`);
}
