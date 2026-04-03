#!/usr/bin/env node

const pricing = {
  landingpage: {
    label: 'Landingpage Sprint',
    ranges: { small: [700, 1100], standard: [1100, 1900], expanded: [1900, 3200] },
    downscope: 'Nur Hero, Struktur, CTA-Logik und Kerncopy für die Hauptsektionen.',
    upsell: 'FAQ/Objection-Modul, zweite Unterseite oder leichte Umsetzungsunterstützung.'
  },
  positioning: {
    label: 'Positionierung & Website-Texte',
    ranges: { small: [500, 900], standard: [900, 1700], expanded: [1700, 2800] },
    downscope: 'Nur Messaging-Map, Headline-Set und Schärfung des Hauptangebots.',
    upsell: 'Landingpage Sprint oder Angebots-/Mail-/WhatsApp-Copy-Set.'
  },
  order: {
    label: 'Digitale Ordnung & Klarheit',
    ranges: { small: [450, 850], standard: [850, 1500], expanded: [1500, 2500] },
    downscope: 'Nur Struktur-Reset, Prioritätenlogik und klarer Next-Step-Plan.',
    upsell: 'SOP-/Dokuvorlagen oder danach Positionierung/Landingpage.'
  }
};

function parseArgs(argv) {
  const out = {};
  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const [k, v = ''] = arg.slice(2).split('=');
    out[k] = v;
  }
  return out;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function bucket(score) {
  if (score >= 24) return 'Prime Deal';
  if (score >= 18) return 'Good Deal';
  if (score >= 12) return 'Wackliger Deal';
  return 'Schlechter Deal';
}

function offerForm(score, scope, decision) {
  if (score < 12) return 'Downscope oder sauber beenden';
  if (scope <= 2 || decision <= 2) return 'Scoping-Call + kurze Zusammenfassung';
  if (score >= 24 && scope >= 4 && decision >= 4) return 'Kurzangebot per Mail';
  if (score >= 18 && scope >= 3) return 'Kurzangebot per Mail';
  return 'Scoped Proposal';
}

function pricePosition(material, friction, scope) {
  const avg = (material + friction + scope) / 3;
  if (avg >= 4.3) return 'high';
  if (avg >= 3) return 'mid';
  return 'low';
}

function quoteForRange(range, pos) {
  const [min, max] = range;
  if (pos === 'low') return Math.round(min);
  if (pos === 'high') return Math.round(max);
  return Math.round((min + max) / 2);
}

const a = parseArgs(process.argv.slice(2));
const offer = pricing[a.offer];
if (!offer) {
  console.error('Usage: node quote-advisor.js --offer=landingpage|positioning|order --size=small|standard|expanded --fit=1-5 --scope=1-5 --material=1-5 --decision=1-5 --friction=1-5 --upsell=1-5');
  process.exit(1);
}

const size = a.size || 'standard';
if (!offer.ranges[size]) {
  console.error('Invalid --size. Use small|standard|expanded');
  process.exit(1);
}

const fit = clamp(Number(a.fit || 3), 1, 5);
const scope = clamp(Number(a.scope || 3), 1, 5);
const material = clamp(Number(a.material || 3), 1, 5);
const decision = clamp(Number(a.decision || 3), 1, 5);
const friction = clamp(Number(a.friction || 3), 1, 5);
const upsell = clamp(Number(a.upsell || 3), 1, 5);

const score = fit + scope + material + decision + friction + upsell;
const deal = bucket(score);
const form = offerForm(score, scope, decision);
const pos = pricePosition(material, friction, scope);
const quote = quoteForRange(offer.ranges[size], pos);

let nextClose;
if (deal === 'Prime Deal') nextClose = 'Passt dieser Startpunkt für dich so, dass wir den Slot fix machen?';
else if (deal === 'Good Deal') nextClose = 'Passt der Rahmen grundsätzlich, oder sollen wir nur den Umfang noch enger zuschneiden?';
else if (deal === 'Wackliger Deal') nextClose = 'Ist eher der Umfang das Thema oder der Zeitpunkt? Dann würde ich Phase 1 bewusst kleiner machen.';
else nextClose = 'Aktuell würde ich das nur kleiner und klarer starten oder erstmal offen lassen.';

console.log(JSON.stringify({
  offer: offer.label,
  size,
  score,
  deal,
  recommendedForm: form,
  suggestedPricePosition: pos,
  suggestedQuoteEur: quote,
  downscope: offer.downscope,
  nextUpsell: offer.upsell,
  nextClosingQuestion: nextClose
}, null, 2));
