#!/usr/bin/env node

const offers = {
  landingpage: {
    label: 'Landingpage Sprint',
    short: 'Angebotsseite',
    timeframe: { small: 'ca. 3-5 Werktage', standard: 'ca. 5-7 Werktage', expanded: 'ca. 1-2 Wochen' },
    needs: [
      'Link zur bestehenden Seite',
      'bestehende Texte, Materialien oder Referenzen',
      'gewünschtes Timing und Prioritäten',
      'eine Person für finale Freigaben'
    ],
    included: ['Hero', 'Seitenstruktur', 'Leistungslogik', 'FAQ / Einwandbehandlung', 'CTA-Führung', 'Copy-Dokument'],
    excluded: ['technische Full-Website-Umsetzung', 'umfassender Mehrseiten-Relaunch'],
    smallStart: 'Hero, Seitenstruktur, CTA-Logik und Kerncopy für die Hauptsektionen',
    kickoffFocus: 'Mobile, CTA-Pfade, FAQ/Einwandbehandlung und klare Scope-Grenzen gleich am Start mit absichern.'
  },
  positioning: {
    label: 'Positionierung & Website-Texte',
    short: 'Positionierung und Haupttexte',
    timeframe: { small: 'ca. 3-4 Werktage', standard: 'ca. 5-7 Werktage', expanded: 'ca. 1-2 Wochen' },
    needs: [
      'Link zur Website oder zu relevanten Seiten',
      'vorhandene Texte, Stichworte oder interne Beschreibungen',
      'vergleichbare Beispiele oder No-Gos',
      'eine Person für finale Freigaben'
    ],
    included: ['Messaging-Richtung', 'Headline-Set', 'Nutzen- und Leistungsformulierungen', 'FAQ / Einwandtexte', 'Copy-Dokument'],
    excluded: ['vollständige Markenentwicklung', 'Design- oder Technikprojekt'],
    smallStart: 'Messaging-Map, Headline-Set und Schärfung des Hauptangebots',
    kickoffFocus: 'Sprachliche Abgrenzung, reale Zielgruppe und Review-Disziplin sauber halten statt zu viele Geschmacksrunden zu öffnen.'
  },
  order: {
    label: 'Digitale Ordnung & Klarheit',
    short: 'Struktur und Prioritäten',
    timeframe: { small: 'ca. 2-4 Werktage', standard: 'ca. 4-7 Werktage', expanded: 'ca. 1-2 Wochen' },
    needs: [
      'kurzer Überblick zur aktuellen Lage',
      'bestehende Dokus, Listen oder Materialien',
      'aktuelle Engpässe und Prioritäten',
      'eine Person für finale Freigaben'
    ],
    included: ['Strukturierung der Ausgangslage', 'Prioritätenlogik', 'Next-Step-Plan', 'System-/Dokulogik', 'Review-Walkthrough'],
    excluded: ['dauerhaftes Projektmanagement', 'größere technische Migrationen'],
    smallStart: 'Struktur-Reset, Prioritätenlogik und klarer Next-Step-Plan',
    kickoffFocus: 'Keine diffuse Sammelstelle eröffnen; nur den vereinbarten Ordnungshebel sauber fixieren.'
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

function formatEur(n) {
  const num = Number(n || 0);
  return `EUR ${new Intl.NumberFormat('de-AT').format(num)}`;
}

function list(items) {
  return items.map(i => `- ${i}`).join('\n');
}

function text(value, fallback) {
  return value && value.trim() ? value.trim() : fallback;
}

function objectionReason(objection) {
  return {
    price: 'nicht das Thema selbst, sondern eher der Einstieg oder der aktuelle Umfang',
    timing: 'nicht fehlendes Interesse, sondern eher Priorität oder Kapazität',
    scope: 'nicht fehlender Fit, sondern noch zu viel Unschärfe im Startpunkt',
    internal: 'nicht Ablehnung, sondern ein interner Prüf- oder Weiterleitungsweg',
    unclear: 'nicht zwingend Widerstand, sondern noch fehlende Klarheit zum sinnvollsten ersten Schritt'
  }[objection] || 'noch nicht ganz klar, wo die Entscheidungsreibung genau sitzt';
}

function objectionReply({ name, offer, price, objection, situation, goal }) {
  const base = `Hallo ${name},\n\nverstehe ich. Für mich klingt es gerade eher nach ${objectionReason(objection)}.`;

  if (objection === 'price') {
    return `${base}\n\nBevor man da nur am Preis schraubt, würde ich lieber den Einstieg enger fassen. Der sinnvollste kleinere Start wäre bei ${offer.label}: ${offer.smallStart}.\n\nDamit bleibt der Kernhebel erhalten, ohne das Thema unnötig groß zu machen. Wenn das näher an deiner aktuellen Lage ist, kann ich es genau so zuschneiden.\n\nDie Frage wäre dann nur: Passt dieser kleinere Start für dich eher als der bisherige Rahmen?`;
  }

  if (objection === 'timing') {
    return `${base}\n\nDann würde ich es nicht künstlich drücken. Wir können entweder sauber später ansetzen oder einen kleinen Vorbereitungsschritt machen, damit der eigentliche Start später leichter wird.\n\nFür ${offer.label} wäre so ein kleiner Vorbereitungsschritt: ${offer.smallStart}.\n\nWas ist für dich gerade realistischer: bewusst später oder eine kleinere Phase 1 jetzt?`;
  }

  if (objection === 'internal') {
    return `${base}\n\nWenn es intern leichter weiterleitbar sein soll, hier die Kurzfassung:\n- Problem: ${situation}\n- Ziel: ${goal}\n- Startpunkt: ${offer.label}\n- Rahmen: ${formatEur(price)}\n\nWenn hilfreich, formuliere ich dir das auch noch in 5-7 weiterleitbaren Sätzen. Lass uns am besten direkt einen kurzen Zeitpunkt setzen, wann wir danach wieder draufschauen.`;
  }

  if (objection === 'scope') {
    return `${base}\n\nGerade deshalb würde ich den Start bewusst nicht größer machen, sondern enger. Die sauberste Phase 1 wäre: ${offer.smallStart}.\n\nDann wird der erste Hebel gelöst, ohne zu viele Baustellen in ein Paket zu pressen. Wäre dieser engere Start für dich die klarere Variante?`;
  }

  return `${base}\n\nIch würde den Einstieg bewusst klein und klar halten: ${offer.smallStart}.\n\nDamit wird die Entscheidung leichter und wir vermeiden, zu viele offene Punkte in ein erstes Paket zu drücken. Wenn das für dich stimmiger ist, kann ich genau diesen Startpunkt festziehen.`;
}

function nudgeMessage({ name, offer, price }) {
  return `Hallo ${name},\n\nich wollte kurz nachfassen, ob der vorgeschlagene Rahmen für ${offer.label} für dich so grundsätzlich passt.\n\nWenn ja, plane ich dafür den Startslot ein. Wenn eher der Umfang noch zu groß wirkt, kann ich den Einstieg auch bewusst kleiner zuschneiden statt am Wert vorbei aufzuplustern.\n\nAktueller Rahmen: ${formatEur(price)}.`;
}

function followupMessage({ name, offer, price }) {
  return `Hallo ${name},\n\nich wollte kurz nachfassen, wie der aktuelle Vorschlag für ${offer.label} bei dir liegt.\n\nFalls der Rahmen grundsätzlich passt, können wir den Start jetzt fix machen. Falls eher Umfang, Timing oder interne Abstimmung das Thema sind, kann ich den Einstieg gezielt darauf zuschneiden statt das Angebot nur offen hängen zu lassen.\n\nRahmen aktuell: ${formatEur(price)}.\n\nWas ist gerade der eigentliche Punkt: Umfang, Timing oder interner Entscheidungsweg?`;
}

function acceptanceMessage({ name, offer, price, timeframe }) {
  return `Hallo ${name},\n\nperfekt, dann halte ich den Start für ${offer.label} so fest.\n\nKurz zur Bestätigung:\n- vereinbarter Startpunkt: ${offer.label}\n- Rahmen: ${formatEur(price)}\n- geplanter Zeitrahmen: ${timeframe}\n\nDamit wir sauber starten können, brauche ich als Nächstes:\n${list(offer.needs)}\n\nWichtig für den gemeinsamen Rahmen:\n${list(offer.included)}\n\nNicht enthalten sind dabei:\n${list(offer.excluded)}\n\nSobald ich die Inputs habe, schicke ich dir den konkreten Startfahrplan für den Kickoff.`;
}

function kickoffMessage({ name, offer, timeframe }) {
  return `Hallo ${name},\n\nfür den Kickoff zu ${offer.label} würde ich den Start bewusst schlank und klar halten.\n\nIch brauche vorab bitte:\n${list(offer.needs)}\n\nZum Scope-Schutz direkt vorweg:\n- wir arbeiten auf den vereinbarten Startpunkt, nicht auf ein offenes Komplettpaket\n- Feedback bitte gesammelt und über die benannte Freigabeperson\n- zusätzliche Wünsche halten wir separat fest und ziehen sie nur dazu, wenn sie wirklich außerhalb des aktuellen Rahmens liegen\n- Mobile wird bei Seiten-/Copy-Arbeit direkt mitgedacht\n\nFür diesen Start ist mir besonders wichtig:\n${offer.kickoffFocus}\n\nGeplanter Bearbeitungsrahmen: ${timeframe}. Sobald die Inputs da sind, kann ich den Ablauf konkret takten.`;
}

const a = parseArgs(process.argv.slice(2));
const offer = offers[a.offer];
if (!offer) {
  console.error('Usage: node close-builder.js --offer=landingpage|positioning|order --size=small|standard|expanded --price=1234 --name=Name --stage=nudge|followup|accept|kickoff [--objection=price|timing|scope|internal|unclear] [--situation=...] [--goal=...]');
  process.exit(1);
}

const size = a.size || 'standard';
const timeframe = a.timeframe || offer.timeframe[size] || offer.timeframe.standard;
const stage = a.stage || 'followup';
const price = Number(a.price || 0);
const name = a.name || 'Name';
const situation = text(a.situation, `Die aktuelle Lage rund um ${offer.short} ist grundsätzlich passend, braucht aber einen klareren ersten Schritt.`);
const goal = text(a.goal, `Der erste Schritt soll ${offer.short} klarer, nutzbarer und leichter entscheidbar machen.`);
const objection = a.objection || 'unclear';

let primary;
if (stage === 'nudge') primary = nudgeMessage({ name, offer, price });
else if (stage === 'followup' && a.objection) primary = objectionReply({ name, offer, price, objection, situation, goal });
else if (stage === 'followup') primary = followupMessage({ name, offer, price });
else if (stage === 'accept') primary = acceptanceMessage({ name, offer, price, timeframe });
else if (stage === 'kickoff') primary = kickoffMessage({ name, offer, timeframe });
else {
  console.error('Invalid --stage. Use nudge|followup|accept|kickoff');
  process.exit(1);
}

console.log(JSON.stringify({
  summary: {
    offer: offer.label,
    size,
    stage,
    objection: a.objection || null,
    priceEur: price,
    timeframe,
    smallStart: offer.smallStart,
    marginGuardrails: [
      'nicht reflexartig rabattieren',
      'bei Reibung zuerst Einstieg verengen',
      'Zusage sofort in Input- und Scope-Klarheit übersetzen',
      'zusätzliche Wünsche separat halten statt gratis integrieren'
    ]
  },
  snippets: {
    primary,
    objectionReply: objectionReply({ name, offer, price, objection, situation, goal }),
    acceptance: acceptanceMessage({ name, offer, price, timeframe }),
    kickoff: kickoffMessage({ name, offer, timeframe })
  }
}, null, 2));
