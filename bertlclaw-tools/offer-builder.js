#!/usr/bin/env node

const offers = {
  landingpage: {
    label: 'Landingpage Sprint',
    subject: 'Vorschlag für deine Angebotsseite',
    ranges: { small: [700, 1100], standard: [1100, 1900], expanded: [1900, 3200] },
    timeframe: { small: 'ca. 3-5 Werktage', standard: 'ca. 5-7 Werktage', expanded: 'ca. 1-2 Wochen' },
    focus: [
      'die Seite klarer strukturieren',
      'Angebot, Nutzen und Vertrauen sprachlich schärfen',
      'Besucher sauberer in Richtung Anfrage führen'
    ],
    included: [
      'Seitenstruktur',
      'Hero + Kernbotschaft',
      'Leistungs-/Nutzenblöcke',
      'CTA-Logik + FAQ / Einwandbehandlung',
      'umsetzungsreife Texte / Copy-Dokument'
    ],
    excluded: [
      'vollständige technische Neuentwicklung',
      'umfassender Mehrseiten-Relaunch'
    ],
    needs: 'Link zur bestehenden Seite, vorhandene Materialien und gewünschtes Timing',
    downscope: 'Nur Hero, Struktur, CTA-Logik und Kerncopy für die Hauptsektionen.',
    upsell: 'FAQ/Objection-Modul, zweite Unterseite oder leichte Umsetzungsunterstützung.',
    smallStartLabel: 'kompakter Landingpage-Start',
    smallStartIncluded: ['Hero', 'Seitenstruktur', 'CTA-Logik', 'Kerncopy für Hauptsektionen']
  },
  positioning: {
    label: 'Positionierung & Website-Texte',
    subject: 'Einordnung zu Positionierung und Website-Texten',
    ranges: { small: [500, 900], standard: [900, 1700], expanded: [1700, 2800] },
    timeframe: { small: 'ca. 3-4 Werktage', standard: 'ca. 5-7 Werktage', expanded: 'ca. 1-2 Wochen' },
    focus: [
      'dein Angebot sprachlich klarer und relevanter machen',
      'Nutzen und Abgrenzung verständlicher formulieren',
      'zentrale Website-Texte so schärfen, dass weniger nacherklärt werden muss'
    ],
    included: [
      'Positionierungsschärfung',
      'Headline-/Messaging-Richtung',
      'Leistungs- und Nutzenformulierungen',
      'FAQ / Einwandtexte',
      'Copy-Dokument für die wichtigsten Website-Bereiche'
    ],
    excluded: [
      'vollständige Markenentwicklung',
      'technische Umsetzung oder umfassendes Designprojekt'
    ],
    needs: 'Link zur Website, vorhandene Texte, Beispiele und gewünschtes Timing',
    downscope: 'Nur Messaging-Map, Headline-Set und Schärfung des Hauptangebots.',
    upsell: 'Landingpage Sprint oder Angebots-/Mail-/WhatsApp-Copy-Set.',
    smallStartLabel: 'kompakter Messaging-Start',
    smallStartIncluded: ['Messaging-Map', 'Headline-Set', 'Schärfung des Hauptangebots']
  },
  order: {
    label: 'Digitale Ordnung & Klarheit',
    subject: 'Vorschlag für digitale Ordnung und Klarheit',
    ranges: { small: [450, 850], standard: [850, 1500], expanded: [1500, 2500] },
    timeframe: { small: 'ca. 2-4 Werktage', standard: 'ca. 4-7 Werktage', expanded: 'ca. 1-2 Wochen' },
    focus: [
      'die vorhandenen Themen und Materialien sinnvoll strukturieren',
      'Prioritäten und nächste Schritte klären',
      'daraus eine arbeitsfähige Grundlage für die weitere Umsetzung machen'
    ],
    included: [
      'Sichtung und Strukturierung der Ausgangslage',
      'Prioritätenlogik',
      'System-/Dokulogik',
      'klarer Next-Step-Plan',
      'Walkthrough / Review der neuen Struktur'
    ],
    excluded: [
      'dauerhaftes Projektmanagement',
      'größere technische Migrationen oder Tool-Implementierungen'
    ],
    needs: 'Hintergrund zur aktuellen Lage, vorhandene Materialien und gewünschtes Timing',
    downscope: 'Nur Struktur-Reset, Prioritätenlogik und klarer Next-Step-Plan.',
    upsell: 'SOP-/Dokuvorlagen oder danach Positionierung/Landingpage.',
    smallStartLabel: 'kompakter Struktur-Reset',
    smallStartIncluded: ['Struktur-Reset', 'Prioritätenlogik', 'klarer Next-Step-Plan']
  }
};

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

function formatEur(n) {
  return `EUR ${new Intl.NumberFormat('de-AT').format(n)}`;
}

function list(items) {
  return items.map(i => `- ${i}`).join('\n');
}

function sentenceOrDefault(value, fallback) {
  return value && value.trim() ? value.trim() : fallback;
}

function closingQuestion(deal) {
  if (deal === 'Prime Deal') return 'Passt dieser Startpunkt für dich so, dass wir den Slot fix machen?';
  if (deal === 'Good Deal') return 'Passt der Rahmen grundsätzlich, oder sollen wir nur den Umfang noch enger zuschneiden?';
  if (deal === 'Wackliger Deal') return 'Ist eher der Umfang das Thema oder der Zeitpunkt? Dann würde ich Phase 1 bewusst kleiner machen.';
  return 'Sollen wir das bewusst kleiner zuschneiden oder aktuell offen lassen?';
}

function buildShortOffer({ name, offer, size, price, timeframe, situation, goal }) {
  return `Betreff: ${offer.subject}\n\nHallo ${name},\n\nich würde dein Thema aktuell am ehesten als **${offer.label}** aufsetzen.\n\nAusgangslage, so wie ich sie aktuell lese:\n${situation}\n\nZielbild:\n${goal}\n\nIm Kern würde ich mich auf diese Punkte konzentrieren:\n${list(offer.focus)}\n\nEnthalten wären in diesem Rahmen:\n${list(offer.included)}\n\nNicht enthalten wären in diesem Rahmen:\n${list(offer.excluded)}\n\nZeitrahmen: **${timeframe}**\nInvestition: **${formatEur(price)}**\n\nWenn das für dich grundsätzlich passt, schick mir kurz ${offer.needs}. Dann machen wir den nächsten Schritt fix.`;
}

function buildScopedProposal({ name, offer, price, timeframe, situation, goal }) {
  return `Betreff: Vorschlag für einen sinnvollen Projektstart\n\nHallo ${name},\n\nauf Basis deiner Anfrage sehe ich aktuell diesen sinnvollen Rahmen:\n\n## 1. Ausgangslage\n${situation}\n\n## 2. Zielbild\n${goal}\n\n## 3. Empfehlung\nIch würde das Thema nicht als großes Komplettpaket starten, sondern als **klar abgegrenzte erste Phase im Rahmen von ${offer.label}**.\n\n### Phase 1 — ${offer.label}\nZiel:\n${list(offer.focus)}\n\nEnthalten:\n${list(offer.included)}\n\nInvestition Phase 1: **${formatEur(price)}**\n\n## 4. Nicht enthalten / Abgrenzung\n${list(offer.excluded)}\n\n## 5. Was ich von dir brauche\n- ${offer.needs}\n- eine kurze Priorisierung, was aktuell den größten Engpass darstellt\n- Freigabe, wer Entscheidungen final trifft\n\n## 6. Zeitrahmen\n- Phase 1: **${timeframe}**\n\n## 7. Nächster Schritt\nWenn das für dich passt, starten wir sinnvollerweise mit dieser ersten Phase. Danach entscheiden wir auf sauberer Grundlage, ob und wie ein Ausbau direkt anschließt.`;
}

function buildDownscope({ offer, lowRangeMin }) {
  return `Wenn der aktuelle Rahmen für dich noch zu groß ist, kann man auch bewusst kleiner starten.\n\nDie sinnvollste Downscope-Variante wäre aus meiner Sicht ein **${offer.smallStartLabel}**:\n${list(offer.smallStartIncluded)}\n\nDamit bleibt der Hebel erhalten, ohne den Einstieg unnötig groß zu machen.\nDer reduzierte Rahmen läge dann bei **${formatEur(lowRangeMin)}**.`;
}

function buildFollowup({ deal, close }) {
  if (deal === 'Prime Deal') return `Kurzes Follow-up nach 2-3 Tagen: \"Ich wollte kurz nachfassen, ob der Rahmen für dich so passt. Wenn ja, würde ich den Startslot dafür reservieren.\"`;
  if (deal === 'Good Deal') return `Kurzes Follow-up nach 3-5 Tagen: \"Ich wollte kurz nachfassen, ob der vorgeschlagene Rahmen für dich grundsätzlich passt oder ob wir den Umfang an einer Stelle noch enger ziehen sollen.\"`;
  if (deal === 'Wackliger Deal') return `Kurzes Follow-up nach 3-5 Tagen: \"Falls der aktuelle Rahmen noch zu groß wirkt, kann ich dir auch eine bewusst kleinere Phase 1 zuschneiden, damit der Einstieg leichter wird.\"`;
  return `Nicht hinterherverkaufen. Eher knapp halten: \"Wenn das Thema später konkreter wird, kann ich es gern kleiner und klarer zuschneiden.\"`;
}

const a = parseArgs(process.argv.slice(2));
const offer = offers[a.offer];
if (!offer) {
  console.error('Usage: node offer-builder.js --offer=landingpage|positioning|order --size=small|standard|expanded --fit=1-5 --scope=1-5 --material=1-5 --decision=1-5 --friction=1-5 --upsell=1-5 [--name=Name] [--situation=...] [--goal=...]');
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
const position = pricePosition(material, friction, scope);
const price = quoteForRange(offer.ranges[size], position);
const name = a.name || 'Name';
const timeframe = a.timeframe || offer.timeframe[size];
const situation = sentenceOrDefault(a.situation, 'Die aktuelle Ausgangslage ist grundsätzlich passend, braucht aber einen klaren, wirtschaftlich sauberen Zuschnitt.');
const goal = sentenceOrDefault(a.goal, 'Nach dem ersten Schritt soll das Thema deutlich klarer, nutzbarer und leichter entscheidbar sein.');
const close = closingQuestion(deal);

let primaryTemplate;
if (form === 'Kurzangebot per Mail') {
  primaryTemplate = buildShortOffer({ name, offer, size, price, timeframe, situation, goal });
} else if (form === 'Scoped Proposal' || form === 'Scoping-Call + kurze Zusammenfassung') {
  primaryTemplate = buildScopedProposal({ name, offer, price, timeframe, situation, goal });
} else {
  primaryTemplate = buildDownscope({ offer, lowRangeMin: offer.ranges.small[0] });
}

console.log(JSON.stringify({
  summary: {
    offer: offer.label,
    size,
    score,
    deal,
    recommendedForm: form,
    suggestedPricePosition: position,
    suggestedQuoteEur: price,
    timeframe,
    downscope: offer.downscope,
    nextUpsell: offer.upsell,
    nextClosingQuestion: close
  },
  snippets: {
    primary: primaryTemplate,
    downscope: buildDownscope({ offer, lowRangeMin: offer.ranges.small[0] }),
    followup: buildFollowup({ deal, close }),
    closingQuestion: close
  }
}, null, 2));
