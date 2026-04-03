#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const out = {};
  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const [k, ...rest] = arg.slice(2).split('=');
    out[k] = rest.join('=');
  }
  return out;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') {
      inQuotes = true;
      continue;
    }

    if (c === ',') {
      row.push(field);
      field = '';
      continue;
    }

    if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      continue;
    }

    if (c === '\r') continue;
    field += c;
  }

  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }

  const [header = [], ...body] = rows;
  return body
    .filter(r => r.some(v => String(v || '').trim() !== ''))
    .map(r => repairCommonLeadRowShape(header, r))
    .map(r => Object.fromEntries(header.map((key, idx) => [key, r[idx] || ''])));
}

function repairCommonLeadRowShape(header, row) {
  const out = [...row];
  const sourceChannels = new Set(['Website-Formular', 'E-Mail', 'WhatsApp', 'Telefon', 'Chat']);

  if (out.length === header.length - 1 && sourceChannels.has(out[10])) {
    out.splice(9, 0, '');
  }

  while (out.length < header.length) out.push('');
  return out;
}

function normalize(s) {
  return String(s || '').trim().toLowerCase();
}

function title(s) {
  return String(s || '').trim();
}

function mapOffer(value) {
  const v = normalize(value);
  if (['landingpage', 'landingpage sprint', 'landing page', 'website', 'lp'].includes(v)) return 'landingpage';
  if (['positioning', 'positionierung', 'website-texte', 'website texte', 'copy'].includes(v)) return 'positioning';
  if (['order', 'ordnung', 'digitale ordnung', 'digitale ordnung & klarheit', 'klarheit'].includes(v)) return 'order';
  return null;
}

function levelToScore(value, fallback = 3) {
  const v = normalize(value);
  if (!v || v === 'unknown' || v === 'offen' || v === 'noch offen') return fallback;
  if (['low', 'niedrig'].includes(v)) return 2;
  if (['medium', 'mittel'].includes(v)) return 3;
  if (['high', 'hoch'].includes(v)) return 5;
  return fallback;
}

function deriveOffer(lead) {
  const explicit = mapOffer(lead.kernangebot);
  if (explicit) return explicit;

  const hay = normalize([lead.topic, lead.message, lead.notes].filter(Boolean).join(' | '));
  if (/landing|hero|cta|seite|website|angebotsseite/.test(hay)) return 'landingpage';
  if (/position|text|copy|headline|botschaft|messaging/.test(hay)) return 'positioning';
  if (/ordnung|struktur|klarheit|sortier|notion|doku|priorit/.test(hay)) return 'order';
  return 'positioning';
}

function deriveScope(problem, fit, material) {
  return clamp(Math.round((problem + fit + material) / 3), 1, 5);
}

function deriveFriction(material, decision, timing) {
  return clamp(Math.round((material + decision + timing) / 3), 1, 5);
}

function deriveUpsell(fit, timing, decision) {
  return clamp(Math.round((fit + timing + decision) / 3), 1, 5);
}

function deriveSize(problem, fit, material, timing, decision) {
  const avg = (problem + fit + material + timing + decision) / 5;
  if (avg >= 4.4 && fit >= 4 && decision >= 4) return 'expanded';
  if (avg >= 3) return 'standard';
  return 'small';
}

function sentence(value, fallback) {
  const v = title(value);
  if (!v) return fallback;
  return /[.!?]$/.test(v) ? v : `${v}.`;
}

function buildSituation(lead, offer) {
  const topic = title(lead.topic);
  const message = title(lead.message);
  const combined = [topic, message].filter(Boolean).join(' ');
  if (combined) return sentence(combined, '');

  const fallback = {
    landingpage: 'Das Angebot scheint grundsätzlich da zu sein, braucht online aber eine klarere Struktur, bessere Nutzenkommunikation und einen stärkeren Anfragepfad.',
    positioning: 'Das Thema wirkt grundsätzlich passend, braucht aber sprachliche Schärfung bei Angebot, Nutzen und Abgrenzung.',
    order: 'Die Ausgangslage wirkt nach einem Struktur- und Prioritätenthema, das zuerst geordnet werden sollte, bevor größere Umsetzungspakete sinnvoll werden.'
  };

  return fallback[offer];
}

function buildGoal(lead, offer) {
  const fallback = {
    landingpage: 'Nach dem ersten Schritt soll die Seite schneller verständlich sein, mehr Vertrauen erzeugen und Anfragen sauber vorbereiten.',
    positioning: 'Nach dem ersten Schritt sollen Nutzen, Abgrenzung und Haupttexte klarer, relevanter und leichter entscheidbar sein.',
    order: 'Nach dem ersten Schritt soll eine arbeitsfähige Struktur mit klaren Prioritäten und nächsten Schritten stehen.'
  };
  return fallback[offer];
}

function shellEscape(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

const a = parseArgs(process.argv.slice(2));
const csvPath = a.csv || path.resolve(process.cwd(), 'bertlclaw-leads-template.csv');
if (!fs.existsSync(csvPath)) {
  console.error(`CSV not found: ${csvPath}`);
  process.exit(1);
}

const rows = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const lead = rows.find(r => r.lead_id === a['lead-id']);
if (!lead) {
  console.error('Lead not found. Use --lead-id=BC-XXXX and optionally --csv=path/to/file.csv');
  process.exit(1);
}

const offer = a.offer || deriveOffer(lead);
const fit = clamp(Number(a.fit || levelToScore(lead.offer_fit, 3)), 1, 5);
const problem = clamp(Number(a.problem || levelToScore(lead.problem_clarity, 3)), 1, 5);
const material = clamp(Number(a.material || levelToScore(lead.material_readiness, 3)), 1, 5);
const timing = clamp(Number(a.timing || levelToScore(lead.timing, 3)), 1, 5);
const decision = clamp(Number(a.decision || levelToScore(lead.decision_readiness, 3)), 1, 5);
const scope = clamp(Number(a.scope || deriveScope(problem, fit, material)), 1, 5);
const friction = clamp(Number(a.friction || deriveFriction(material, decision, timing)), 1, 5);
const upsell = clamp(Number(a.upsell || deriveUpsell(fit, timing, decision)), 1, 5);
const size = a.size || deriveSize(problem, fit, material, timing, decision);
const name = a.name || lead.name || 'Name';
const situation = a.situation || buildSituation(lead, offer);
const goal = a.goal || buildGoal(lead, offer);

const recommended = {
  lead_id: lead.lead_id,
  name,
  company: lead.company || '',
  status: lead.status || '',
  offer,
  size,
  fit,
  scope,
  material,
  decision,
  friction,
  upsell,
  situation,
  goal,
  source: {
    problem_clarity: lead.problem_clarity || '',
    offer_fit: lead.offer_fit || '',
    material_readiness: lead.material_readiness || '',
    timing: lead.timing || '',
    decision_readiness: lead.decision_readiness || '',
    kernangebot: lead.kernangebot || '',
    next_step: lead.next_step || ''
  },
  missingSignals: [
    !lead.kernangebot && 'kernangebot',
    normalize(lead.problem_clarity) === 'unknown' && 'problem_clarity',
    normalize(lead.offer_fit) === 'unknown' && 'offer_fit',
    normalize(lead.material_readiness) === 'unknown' && 'material_readiness',
    normalize(lead.timing) === 'unknown' && 'timing',
    normalize(lead.decision_readiness) === 'unknown' && 'decision_readiness'
  ].filter(Boolean)
};

const quoteCmd = [
  'node bertlclaw-tools/quote-advisor.js',
  `--offer=${offer}`,
  `--size=${size}`,
  `--fit=${fit}`,
  `--scope=${scope}`,
  `--material=${material}`,
  `--decision=${decision}`,
  `--friction=${friction}`,
  `--upsell=${upsell}`
].join(' ');

const offerCmd = [
  'node bertlclaw-tools/offer-builder.js',
  `--offer=${offer}`,
  `--size=${size}`,
  `--fit=${fit}`,
  `--scope=${scope}`,
  `--material=${material}`,
  `--decision=${decision}`,
  `--friction=${friction}`,
  `--upsell=${upsell}`,
  `--name=${shellEscape(name)}`,
  `--situation=${shellEscape(situation)}`,
  `--goal=${shellEscape(goal)}`
].join(' ');

const internalNote = [
  `Lead: ${lead.lead_id} ${name !== 'Name' ? `(${name})` : ''}`.trim(),
  `Kernangebot: ${offer}`,
  `Deal-Input: fit ${fit} / scope ${scope} / material ${material} / decision ${decision} / friction ${friction} / upsell ${upsell}`,
  `Preisgröße: ${size}`,
  `Nächster operativer Schritt: ${lead.next_step || 'offer_builder_run'}`
].join('\n');

console.log(JSON.stringify({
  recommended,
  commands: {
    quoteAdvisor: quoteCmd,
    offerBuilder: offerCmd
  },
  internalNote
}, null, 2));
