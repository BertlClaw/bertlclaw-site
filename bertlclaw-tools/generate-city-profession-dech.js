#!/usr/bin/env node
/**
 * generate-city-profession-dech.js
 * Generates city×profession landing pages for DE (20 cities) and CH (10 cities).
 * Total: 30 cities × 20 professions = 600 pages
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE = path.resolve(__dirname, '..');
const SITEMAP = path.join(WORKSPACE, 'sitemap.xml');

const citiesDE = [
  {city: "Berlin", slug: "berlin", state: "Berlin", locale: "de_DE"},
  {city: "Hamburg", slug: "hamburg", state: "Hamburg", locale: "de_DE"},
  {city: "München", slug: "muenchen", state: "Bayern", locale: "de_DE"},
  {city: "Köln", slug: "koeln", state: "NRW", locale: "de_DE"},
  {city: "Frankfurt", slug: "frankfurt", state: "Hessen", locale: "de_DE"},
  {city: "Stuttgart", slug: "stuttgart", state: "Baden-Württemberg", locale: "de_DE"},
  {city: "Düsseldorf", slug: "duesseldorf", state: "NRW", locale: "de_DE"},
  {city: "Leipzig", slug: "leipzig", state: "Sachsen", locale: "de_DE"},
  {city: "Dortmund", slug: "dortmund", state: "NRW", locale: "de_DE"},
  {city: "Essen", slug: "essen", state: "NRW", locale: "de_DE"},
  {city: "Bremen", slug: "bremen", state: "Bremen", locale: "de_DE"},
  {city: "Dresden", slug: "dresden", state: "Sachsen", locale: "de_DE"},
  {city: "Hannover", slug: "hannover", state: "Niedersachsen", locale: "de_DE"},
  {city: "Nürnberg", slug: "nuernberg", state: "Bayern", locale: "de_DE"},
  {city: "Bonn", slug: "bonn", state: "NRW", locale: "de_DE"},
  {city: "Mannheim", slug: "mannheim", state: "Baden-Württemberg", locale: "de_DE"},
  {city: "Karlsruhe", slug: "karlsruhe", state: "Baden-Württemberg", locale: "de_DE"},
  {city: "Augsburg", slug: "augsburg", state: "Bayern", locale: "de_DE"},
  {city: "Freiburg", slug: "freiburg", state: "Baden-Württemberg", locale: "de_DE"},
  {city: "Regensburg", slug: "regensburg", state: "Bayern", locale: "de_DE"},
];

const citiesCH = [
  {city: "Zürich", slug: "zuerich", state: "Zürich", locale: "de_CH"},
  {city: "Bern", slug: "bern", state: "Bern", locale: "de_CH"},
  {city: "Basel", slug: "basel", state: "Basel-Stadt", locale: "de_CH"},
  {city: "Luzern", slug: "luzern", state: "Luzern", locale: "de_CH"},
  {city: "Winterthur", slug: "winterthur", state: "Zürich", locale: "de_CH"},
  {city: "St. Gallen", slug: "st-gallen", state: "St. Gallen", locale: "de_CH"},
  {city: "Zug", slug: "zug", state: "Zug", locale: "de_CH"},
  {city: "Schaffhausen", slug: "schaffhausen", state: "Schaffhausen", locale: "de_CH"},
  {city: "Chur", slug: "chur", state: "Graubünden", locale: "de_CH"},
  {city: "Thun", slug: "thun", state: "Bern", locale: "de_CH"},
];

const professions = [
  {slug: "aerzte", label: "Ärzte", keyword: "Arzt Praxis"},
  {slug: "zahnaerzte", label: "Zahnärzte", keyword: "Zahnarzt"},
  {slug: "coaches", label: "Coaches", keyword: "Coach"},
  {slug: "therapeuten", label: "Therapeuten", keyword: "Therapeut"},
  {slug: "fotografen", label: "Fotografen", keyword: "Fotograf"},
  {slug: "trainer", label: "Trainer", keyword: "Trainer"},
  {slug: "berater", label: "Unternehmensberater", keyword: "Berater"},
  {slug: "physiotherapeuten", label: "Physiotherapeuten", keyword: "Physiotherapeut"},
  {slug: "psychologen", label: "Psychologen", keyword: "Psychologe"},
  {slug: "architekten", label: "Architekten", keyword: "Architekt"},
  {slug: "steuerberater", label: "Steuerberater", keyword: "Steuerberater"},
  {slug: "heilpraktiker", label: "Heilpraktiker", keyword: "Heilpraktiker"},
  {slug: "handwerker", label: "Handwerker", keyword: "Handwerker"},
  {slug: "personal-trainer", label: "Personal Trainer", keyword: "Personal Trainer"},
  {slug: "grafikdesigner", label: "Grafikdesigner", keyword: "Grafikdesigner"},
  {slug: "webentwickler", label: "Webentwickler", keyword: "Webentwickler"},
  {slug: "makler", label: "Immobilienmakler", keyword: "Makler"},
  {slug: "buchhalter", label: "Buchhalter", keyword: "Buchhalter"},
  {slug: "yogalehrer", label: "Yogalehrer", keyword: "Yoga"},
  {slug: "ernaehrungsberater", label: "Ernährungsberater", keyword: "Ernährungsberater"},
];

// Unique content snippets per profession (used to vary paragraphs)
const professionContent = {
  aerzte: {
    intro: "Ärzte und Praxen stehen heute vor einer doppelten Herausforderung: Sie müssen einerseits medizinisch exzellent sein und andererseits online auffindbar und vertrauenswürdig wirken.",
    detail: "Patienten suchen heute zuerst online nach einem Arzt — bevor sie das Telefon in die Hand nehmen. Eine klare Landingpage für Ihre Praxis entscheidet, ob potenzielle Patienten Vertrauen fassen oder zur nächsten Suchergebnis-Seite wechseln.",
    value: "BertlClaw entwickelt Landingpages für Ärzte, die medizinische Kompetenz verständlich kommunizieren und neue Patienten gezielt ansprechen — ohne den typischen Behördencharme von Arztwebseiten."
  },
  zahnaerzte: {
    intro: "Zahnarztpraxen kämpfen online um die gleichen lokalen Suchanfragen — wer hier gut positioniert ist, gewinnt Neupatienten zuverlässig.",
    detail: "Viele Zahnarztpraxen haben Websites, die wie Branchenbucheinträge wirken: Name, Adresse, Öffnungszeiten. Mehr nicht. Eine Landingpage mit klarem Fokus macht den Unterschied — und zeigt, warum Patienten genau zu Ihnen kommen sollen.",
    value: "BertlClaw erstellt Landingpages für Zahnärzte, die Vertrauen aufbauen, Schwerpunkte klar kommunizieren und die Kontaktaufnahme so einfach wie möglich machen."
  },
  coaches: {
    intro: "Der Coaching-Markt ist groß und unübersichtlich — umso wichtiger ist eine klare Positionierung und eine Landingpage, die dein Angebot unmissverständlich kommuniziert.",
    detail: "Als Coach brauchst du eine Seite, die nicht nur dein Angebot erklärt, sondern Vertrauen aufbaut — denn Coaching ist immer auch eine Vertrauenssache. Wer bist du? Was bewirkst du? Für wen bist du der Richtige?",
    value: "BertlClaw erstellt Coaching-Landingpages, die klar positionieren, Persönlichkeit zeigen und Interessenten in Erstgespräche verwandeln."
  },
  therapeuten: {
    intro: "Therapeuten stehen vor der besonderen Herausforderung, sensible Themen klar und einladend zu kommunizieren — ohne zu viel Distanz oder zu wenig Professionalität.",
    detail: "Für Therapeuten ist die Online-Präsenz oft der erste Kontaktpunkt mit Klienten, die Hilfe suchen. Dieser Moment der Entscheidung — ob jemand Kontakt aufnimmt oder nicht — hängt stark davon ab, wie die Seite wirkt.",
    value: "BertlClaw entwickelt Landingpages für Therapeuten, die Sicherheit und Kompetenz ausstrahlen, das Angebot klar strukturieren und den Kontakteinstieg so niederschwellig wie möglich gestalten."
  },
  fotografen: {
    intro: "Fotografen leben von ihrer Arbeit — aber die Bilder allein reichen nicht, um online neue Kunden zu gewinnen. Es braucht eine Seite, die erklärt, für wen du fotografierst und was das bringt.",
    detail: "Viele Fotografen haben beeindruckende Portfolios, aber keine klare Positionierung: Hochzeiten? Portraits? Business? Events? Eine fokussierte Landingpage für einen spezifischen Bereich bringt mehr als eine generelle Galerie-Website.",
    value: "BertlClaw erstellt Landingpages für Fotografen, die nicht nur schön aussehen, sondern klar kommunizieren — und aus Interessenten Buchungen machen."
  },
  trainer: {
    intro: "Als Trainer oder Fitnesstrainer musst du online überzeugen, bevor jemand zum ersten Training kommt. Eine klare Landingpage ist dein digitaler Erstauftritt.",
    detail: "Trainer konkurrieren lokal um sichtbare Plätze — online und offline. Wer hier mit einer professionellen Seite und klarer Botschaft auftritt, wird von potenziellen Kunden als erster wahrgenommen.",
    value: "BertlClaw erstellt Landingpages für Trainer, die deine Methode erklären, dein Profil schärfen und Interessenten direkt in Anfragen verwandeln."
  },
  berater: {
    intro: "Unternehmensberater und Consultants stehen vor einem spezifischen Problem: Ihre Expertise ist oft schwer greifbar — eine gute Landingpage macht sie konkret und vertrauenswürdig.",
    detail: "Potenzielle Klienten eines Beraters googeln oft nach Themen, nicht nach Namen. Eine gut aufgestellte Landingpage sorgt dafür, dass du bei den richtigen Suchanfragen sichtbar bist und sofort Kompetenz signalisierst.",
    value: "BertlClaw entwickelt Beratungs-Landingpages, die Expertise klar machen, Zielgruppen präzise ansprechen und den Weg zum Erstgespräch verkürzen."
  },
  physiotherapeuten: {
    intro: "Physiotherapeuten sind gefragt — aber online oft schlecht auffindbar. Eine klare Praxis-Landingpage ändert das.",
    detail: "Wer nach einem Physiotherapeuten sucht, hat oft konkrete Beschwerden und möchte schnell eine passende Praxis finden. Eine fokussierte Landingpage, die Spezialisierungen und Behandlungsansätze klar kommuniziert, macht den Unterschied.",
    value: "BertlClaw erstellt Landingpages für Physiotherapeuten, die Vertrauen aufbauen, das Leistungsangebot übersichtlich darstellen und neue Patienten gezielt ansprechen."
  },
  psychologen: {
    intro: "Psychologen und Psychotherapeuten stehen vor der Aufgabe, Expertise und Wärme gleichzeitig zu transportieren — eine Herausforderung, bei der die richtige Landingpage entscheidend hilft.",
    detail: "Menschen, die einen Psychologen suchen, sind oft in einer sensiblen Situation. Deine Online-Präsenz muss Sicherheit und Kompetenz vermitteln — und gleichzeitig klar machen, wie der erste Schritt aussieht.",
    value: "BertlClaw entwickelt Landingpages für Psychologen, die professionell und zugänglich wirken, das Beratungsangebot strukturieren und die Hemmschwelle zur Kontaktaufnahme senken."
  },
  architekten: {
    intro: "Architekten und Planungsbüros gewinnen Aufträge über Reputation und Sichtbarkeit — eine starke Online-Präsenz ist heute unverzichtbar.",
    detail: "Architektur ist visuell und komplex. Eine Landingpage für Architekten muss Projekte überzeugend darstellen, die Designphilosophie greifbar machen und gleichzeitig klar kommunizieren, wer die idealen Kunden sind.",
    value: "BertlClaw erstellt Landingpages für Architekten und Planungsbüros, die Projekte ins richtige Licht rücken, den Arbeitsprozess erklären und neue Mandanten gezielt ansprechen."
  },
  steuerberater: {
    intro: "Steuerberater gewinnen Mandanten durch Vertrauen — und Vertrauen beginnt oft online, lange bevor jemand anruft.",
    detail: "Wer einen Steuerberater sucht, ist meist unzufrieden mit dem aktuellen oder steht vor einem neuen Lebensabschnitt (Selbstständigkeit, Umzug, Unternehmensgründung). Eine klare Landingpage, die genau diesen Moment anspricht, ist Gold wert.",
    value: "BertlClaw entwickelt Landingpages für Steuerberater, die Kompetenz und Verlässlichkeit signalisieren, das Leistungsangebot strukturieren und Interessenten in Mandantengespräche verwandeln."
  },
  heilpraktiker: {
    intro: "Heilpraktiker und alternative Mediziner stehen vor der Aufgabe, ihr Angebot klar und seriös darzustellen — eine durchdachte Landingpage schafft Vertrauen und Sichtbarkeit.",
    detail: "Viele Menschen suchen aktiv nach alternativen Behandlungsmethoden. Wer dabei gut positioniert ist und klar kommuniziert, was er anbietet und wie, gewinnt gezielt die Klienten, die wirklich passen.",
    value: "BertlClaw erstellt Landingpages für Heilpraktiker, die das Behandlungsspektrum übersichtlich darstellen, die Behandlungsphilosophie greifbar machen und Vertrauen bereits vor dem ersten Kontakt aufbauen."
  },
  handwerker: {
    intro: "Handwerker werden gesucht — und wer online gut aufgestellt ist, muss nicht mehr auf Empfehlungen warten.",
    detail: "Der Handwerkermarkt ist lokal. Wer bei einer Suche nach einem Handwerker in der Stadt ganz oben erscheint und einen professionellen Eindruck hinterlässt, gewinnt den Auftrag — oft noch bevor drei Mitbewerber überhaupt angefragt werden.",
    value: "BertlClaw erstellt Landingpages für Handwerksbetriebe, die Leistungen klar darstellen, Vertrauen aufbauen und die Kontaktaufnahme für potenzielle Kunden so einfach wie möglich machen."
  },
  "personal-trainer": {
    intro: "Personal Trainer brauchen eine Landingpage, die nicht nur zeigt, was sie können — sondern auch, warum jemand genau mit ihnen trainieren sollte.",
    detail: "Der Markt für Personal Training ist gewachsen. Differenzierung ist alles: Methode, Zielgruppe, Erfolge. Eine fokussierte Landingpage bringt das auf den Punkt und spricht die richtigen Klienten an.",
    value: "BertlClaw entwickelt Landingpages für Personal Trainer, die Persönlichkeit und Kompetenz zeigen, die Trainingsphilosophie erklären und Interessenten direkt in Buchungen verwandeln."
  },
  grafikdesigner: {
    intro: "Grafikdesigner sind kreativ — aber die eigene Selbstvermarktung fällt oft schwer. Eine klare Landingpage macht dein Angebot greifbar.",
    detail: "Kunden, die einen Grafikdesigner suchen, haben oft konkrete Projekte: Logo, Brand Identity, Print. Wer genau dieses Angebot klar und überzeugend präsentiert, gewinnt die passenden Aufträge — ohne lange Akquise.",
    value: "BertlClaw erstellt Landingpages für Grafikdesigner, die Portfolio und Positionierung smart verbinden, das Leistungsangebot klar machen und neue Auftraggeber gezielt ansprechen."
  },
  webentwickler: {
    intro: "Webentwickler können für andere großartige Websites bauen — aber die eigene Landingpage bleibt oft hinten. BertlClaw ändert das.",
    detail: "Paradox aber wahr: Viele Webentwickler haben keine überzeugende eigene Webpräsenz. Eine klare Landingpage, die Technologie-Stack, Arbeitsweise und Zielkunden kommuniziert, macht einen riesigen Unterschied.",
    value: "BertlClaw erstellt Landingpages für Webentwickler und Freelance-Entwickler, die Expertise zeigen, den Mehrwert klar kommunizieren und Interessenten in Projektanfragen verwandeln."
  },
  makler: {
    intro: "Immobilienmakler leben von Vertrauen und Sichtbarkeit — eine professionelle Landingpage ist der erste Baustein für beides.",
    detail: "Wer eine Immobilie kaufen, verkaufen oder vermieten will, recherchiert ausgiebig online. Wer hier mit einer klaren, professionellen Seite präsent ist, wird als kompetenter Partner wahrgenommen — noch bevor der erste Kontakt stattfindet.",
    value: "BertlClaw entwickelt Landingpages für Immobilienmakler, die Expertise und lokale Marktkenntnis kommunizieren, Vertrauen aufbauen und Interessenten direkt in Beratungsgespräche führen."
  },
  buchhalter: {
    intro: "Buchhalter und Buchhaltungsbüros gewinnen Klienten durch Vertrauen und Verlässlichkeit — und das beginnt mit einem professionellen Online-Auftritt.",
    detail: "Selbstständige und Unternehmer, die einen Buchhalter suchen, wollen jemanden, dem sie ihre Zahlen anvertrauen können. Eine Landingpage, die Kompetenz und Zuverlässigkeit ausstrahlt, schafft genau dieses Vertrauen.",
    value: "BertlClaw erstellt Landingpages für Buchhalter und Buchhaltungsbüros, die das Leistungsangebot strukturieren, Zielgruppen klar ansprechen und den Einstieg in die Zusammenarbeit erleichtern."
  },
  yogalehrer: {
    intro: "Yogalehrer und Yogastudios stehen in einem wachsenden Markt — eine klare Positionierung und professionelle Landingpage helfen, die richtigen Schüler zu finden.",
    detail: "Ob Hatha, Vinyasa oder Yin Yoga — wer seinen Stil klar kommuniziert und die Zielgruppe präzise anspricht, findet schneller die Schüler, die wirklich passen. Eine generische Yoga-Seite hilft dabei kaum.",
    value: "BertlClaw entwickelt Landingpages für Yogalehrer und Yoga-Studios, die Stil und Atmosphäre greifbar machen, das Kursangebot klar strukturieren und neue Teilnehmer gezielt ansprechen."
  },
  ernaehrungsberater: {
    intro: "Ernährungsberater helfen Menschen, gesünder zu leben — eine klare Landingpage hilft dabei, diese Menschen auch online zu erreichen.",
    detail: "Der Markt für Ernährungsberatung ist vielfältig: Abnehmen, Sportlerernährung, chronische Erkrankungen, vegane Ernährung. Wer sich klar positioniert und die eigene Expertise gezielt kommuniziert, gewinnt Klienten, die wirklich passen.",
    value: "BertlClaw erstellt Landingpages für Ernährungsberater, die Beratungsangebote klar darstellen, Spezialisierungen hervorheben und Interessenten in Erstgespräche verwandeln."
  },
};

// City-specific flavor text
function getCityFlavor(city) {
  const flavors = {
    berlin: "In Berlin, wo die Startup-Szene Europas pulsiert und zehntausende Freelancer und Kreative arbeiten, ist online Sichtbarkeit unverzichtbar.",
    hamburg: "Hamburg, als norddeutsche Wirtschaftsmetropole mit starker Medien- und Hafenwirtschaft, bietet Selbstständigen ein riesiges Spielfeld mit internationaler Ausstrahlung.",
    muenchen: "München ist einer der wirtschaftsstärksten Standorte Europas — mit Technologie, Medien, Finanzen und einer lebhaften Selbstständigenszene.",
    koeln: "Köln, als Medienstadt am Rhein, ist ein Zentrum für Kreative, Freelancer und wachsende Unternehmen in NRW.",
    frankfurt: "Frankfurt als Finanz- und Messezentrum Deutschlands bietet Selbstständigen zugang zu internationalen Kunden und einem stark vernetzten Businessumfeld.",
    stuttgart: "Stuttgart ist Heimat von Weltkonzernen und einer starken Mittelstandskultur — Selbstständige profitieren von einem hochentwickelten wirtschaftlichen Umfeld in Baden-Württemberg.",
    duesseldorf: "Düsseldorf ist Modestadt, Messestandort und Medizinhub in einem — ein urbaner Markt mit hoher Kaufkraft und starker Unternehmerdichte.",
    leipzig: "Leipzig boomt: Die sächsische Metropole zieht kreative Köpfe und Gründer an und hat sich zu einem der lebhaftesten Selbstständigen-Zentren Ostdeutschlands entwickelt.",
    dortmund: "Dortmund, das wirtschaftliche Herz des Ruhrgebiets, ist ein wachsender Standort für Tech-Unternehmen, Startups und selbstständige Dienstleister.",
    essen: "Essen im Herzen des Ruhrgebiets verbindet industrielle Geschichte mit moderner Dienstleistungswirtschaft — ein gutes Pflaster für positionierte Selbstständige.",
    bremen: "Bremen mit seiner Hafentradition und wachsenden Kreativwirtschaft bietet Selbstständigen ein gut vernetztes, überschaubares Umfeld.",
    dresden: "Dresden, die Elbmetropole in Sachsen, verbindet Kultur und Hochtechnologie — Selbstständige finden hier eine aufgeschlossene, wachsende Wirtschaftsszene.",
    hannover: "Hannover als Messestadt und niedersächsische Landeshauptstadt ist ein zentraler Knotenpunkt für B2B-Dienstleistungen und selbstständige Fachleute.",
    nuernberg: "Nürnberg, die Metropole der fränkischen Region in Bayern, ist ein starker Wirtschaftsstandort mit vielen Mittelständlern und Selbstständigen.",
    bonn: "Bonn mit seiner UNO-Geschichte und dem starken akademischen Umfeld ist ein attraktiver Standort für beratende Berufe und wissensintensive Selbstständige.",
    mannheim: "Mannheim in der Metropolregion Rhein-Neckar ist ein aufstrebender Standort für Innovation, Kreativwirtschaft und Selbstständige in Baden-Württemberg.",
    karlsruhe: "Karlsruhe, die Technologiehauptstadt am Rhein, ist ein Zentrum für IT, Recht und Innovation in Baden-Württemberg — ideal für positionierte Selbstständige.",
    augsburg: "Augsburg in Bayern verbindet eine starke Industrie- und Handwerkstradition mit wachsender Kreativ- und Dienstleistungswirtschaft.",
    freiburg: "Freiburg im Breisgau ist bekannt für seine hohe Lebensqualität und eine progressive Wirtschaftsszene — besonders beliebt bei Selbstständigen im Bereich Gesundheit und Nachhaltigkeit.",
    regensburg: "Regensburg in Bayern verbindet Universitätsstadtatmosphäre mit einer lebhaften Wirtschaft — Selbstständige profitieren von einem gut vernetzten, wachsenden Markt.",
    zuerich: "Zürich ist das Finanz- und Wirtschaftszentrum der Schweiz — und bietet Selbstständigen Zugang zu einem kaufkräftigen, international geprägten Markt.",
    bern: "Bern, die Bundeshauptstadt der Schweiz, vereint politisches Zentrum mit einer stabilen, gut vernetzten Wirtschafts- und Dienstleistungsszene.",
    basel: "Basel als trinationale Stadt und Sitz globaler Pharmaunternehmen bietet Selbstständigen ein einzigartiges wirtschaftliches Umfeld in der Nordwestschweiz.",
    luzern: "Luzern ist eines der attraktivsten Wirtschaftszentren der Zentralschweiz — mit starkem Tourismus, Finanzsektor und wachsender Selbstständigenszene.",
    winterthur: "Winterthur im Kanton Zürich ist eine wachsende Mittelstadt mit starker Industrie- und Dienstleistungswirtschaft — und einem soliden Markt für selbstständige Fachleute.",
    "st-gallen": "St. Gallen ist das wirtschaftliche Zentrum der Ostschweiz — mit einer langen Tradition in Handel, Textil und heute wachsenden Dienstleistungsbranchen.",
    zug: "Zug ist bekannt für tiefe Steuern und eine hohe Unternehmensdichte — ein Eldorado für selbstständige Dienstleister und Berater in der Deutschschweiz.",
    schaffhausen: "Schaffhausen verbindet Schweizer Qualitätsanspruch mit einer überschaubaren, gut vernetzten Wirtschaftsgemeinschaft nahe der deutschen Grenze.",
    chur: "Chur, die Hauptstadt des Kantons Graubünden, ist ein wachsendes Dienstleistungszentrum im Alpenraum mit starker regionaler Wirtschaftskraft.",
    thun: "Thun im Kanton Bern verbindet Alpenregion mit einer gut aufgestellten Stadtökonomie — ein solider Standort für selbstständige Dienstleister im Berner Raum.",
  };
  return flavors[city.slug] || `${city.city} in ${city.state} ist ein aufstrebender Standort für Selbstständige und Freelancer im DACH-Raum.`;
}

function generateContent(city, prof) {
  const isSwiss = city.locale === 'de_CH';
  const regionTerm = isSwiss ? 'Kanton' : 'Bundesland';
  const countryContext = isSwiss ? 'in der Schweiz' : 'in Deutschland';
  const currencyNote = isSwiss ? ' im Schweizer Markt' : '';
  const pc = professionContent[prof.slug];
  const cityFlavor = getCityFlavor(city);

  return `
        <h2>${prof.label} in ${city.city} — professionelle Landingpage von BertlClaw</h2>
        <p>${pc.intro} ${cityFlavor}</p>

        <h2>${prof.label} ${countryContext}: Warum Online-Sichtbarkeit entscheidend ist</h2>
        <p>${pc.detail} In ${city.city} (${regionTerm} ${city.state}) gilt das besonders: Der lokale Markt ist aktiv, die Nachfrage nach qualifizierten ${prof.label} hoch — aber auch die Konkurrenz${currencyNote} ist real. Wer hier mit einer klaren, professionellen Landingpage auftritt, gewinnt das Vertrauen potenzieller Klienten, bevor sie überhaupt Kontakt aufnehmen.</p>

        <h2>Was BertlClaw für ${prof.label} in ${city.city} macht</h2>
        <p>${pc.value} Die Kombination aus klarer Positionierung, überzeugenden Texten und einem professionellen Design schafft genau das: Eine Seite, die für dich arbeitet — auch wenn du gerade beim Klienten bist oder schläfst.</p>
        <p>BertlClaw arbeitet vollständig remote und betreut ${prof.label} im gesamten DACH-Raum — auch in ${city.city}. Der Prozess ist schlank: Ein kostenloses Erstgespräch, klare Aufgabenstellung, und in wenigen Tagen hast du eine fertige Landingpage, die deinen Auftritt ${countryContext} dauerhaft stärkt.</p>`;
}

function generatePage(city, prof) {
  const filename = `landingpage-${city.slug}-${prof.slug}.html`;
  const canonical = `https://bertlclaw.at/${filename}`;
  const title = `Landingpage für ${prof.label} in ${city.city} | BertlClaw`;
  const description = `${prof.label} in ${city.city} (${city.state}): Professionelle Landingpage und Website-Texte von BertlClaw.`;
  const content = generateContent(city, prof);
  const isSwiss = city.locale === 'de_CH';
  const lang = isSwiss ? 'de' : 'de';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="de" href="${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${canonical}" />
  <link rel="icon" href="favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" href="bertlclaw-assets/logo-32.png" />
  <link rel="apple-touch-icon" href="bertlclaw-assets/logo-180.png" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <meta property="og:site_name" content="BertlClaw" />
  <meta property="og:locale" content="${city.locale}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Landingpage für ${prof.label} in ${city.city}",
    "description": "${description}",
    "author": {
      "@type": "Organization",
      "name": "BertlClaw",
      "url": "https://bertlclaw.at/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BertlClaw",
      "url": "https://bertlclaw.at/"
    },
    "url": "${canonical}",
    "datePublished": "2026-04-08",
    "dateModified": "2026-04-08",
    "inLanguage": "de"
  }
  </script>
  <script data-goatcounter="https://bertlclaw.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
  <style>
    :root {
      --bg:#040712;
      --bg2:#09101d;
      --bg3:#0d1528;
      --panel:rgba(13,20,38,.76);
      --panel-strong:rgba(15,24,45,.90);
      --line:rgba(129,155,255,.14);
      --line-strong:rgba(124,156,255,.24);
      --text:#eef3ff;
      --muted:#afbadc;
      --muted2:#93a1c8;
      --accent:#8ea8ff;
      --accent2:#6ee7d8;
      --accent3:#c6b2ff;
      --shadow:0 30px 90px rgba(0,0,0,.45);
      --glow:0 0 0 1px rgba(124,156,255,.08), 0 0 45px rgba(124,156,255,.10);
      --radius:26px;
      --max:1240px;
    }
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text);background:radial-gradient(circle at 10% 0%, rgba(124,156,255,.16), transparent 24%),radial-gradient(circle at 90% 8%, rgba(89,225,191,.10), transparent 24%),radial-gradient(circle at 50% 100%, rgba(164,143,255,.10), transparent 32%),linear-gradient(180deg,#040712 0%,#09101d 42%,#060915 100%)}
    body::before{content:"";position:fixed;inset:0;pointer-events:none;opacity:.55;background-image:linear-gradient(rgba(124,156,255,.03) 1px, transparent 1px),linear-gradient(90deg, rgba(124,156,255,.03) 1px, transparent 1px);background-size:32px 32px;mask-image:radial-gradient(circle at center, rgba(0,0,0,.8), transparent 88%)}
    a{color:inherit;text-decoration:none}
    img{max-width:100%;display:block}
    .wrap{width:min(calc(100% - 32px),var(--max));margin:0 auto;position:relative;z-index:1}
    .nav{position:sticky;top:0;z-index:50;background:rgba(4,7,18,.78);backdrop-filter:blur(18px);border-bottom:1px solid var(--line);box-shadow:0 10px 34px rgba(0,0,0,.22)}
    .nav-inner{display:flex;justify-content:space-between;align-items:center;gap:18px;padding:14px 0}
    .brand{display:flex;align-items:center;gap:12px;font-weight:800;letter-spacing:.02em}
    .brand-mark{width:52px;height:52px;border-radius:16px;overflow:hidden;display:grid;place-items:center;background:linear-gradient(135deg, rgba(124,156,255,.16), rgba(110,231,216,.14));box-shadow:var(--shadow), 0 0 0 1px rgba(124,156,255,.10), 0 0 28px rgba(124,156,255,.12);border:1px solid rgba(255,255,255,.12);padding:5px}
    .brand-mark img{width:100%;height:100%;object-fit:contain;object-position:center center;display:block;border-radius:12px}
    .nav-links{display:flex;gap:18px;flex-wrap:wrap;color:var(--muted);font-size:.95rem}
    .nav-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:flex-end}
    .mini-btn{padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.03);font-size:.9rem;white-space:nowrap}
    .mobile-nav-row{display:none}
    h1,h2,h3,h4{margin:0 0 14px;line-height:1.08}
    h1{font-size:clamp(2.4rem,5vw,4.8rem);letter-spacing:-.05em}
    h2{font-size:clamp(1.6rem,3vw,2.4rem);letter-spacing:-.04em}
    h3{font-size:1.18rem}
    .lead{color:var(--muted);line-height:1.82;font-size:1.08rem;max-width:66ch}
    .accent-text{background:linear-gradient(135deg,#eef3ff 0%, #9db8ff 46%, #7cf0d6 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
    .micro-label{display:inline-block;margin-bottom:10px;color:#d7e3ff;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase}
    .section{padding:36px 0}
    .hero{padding:72px 0 40px}
    .hero-inner{max-width:860px}
    .eyebrow{display:inline-flex;gap:8px;align-items:center;padding:8px 14px;border-radius:999px;border:1px solid rgba(124,156,255,.24);background:rgba(124,156,255,.10);color:#dfe8ff;font-size:.82rem;letter-spacing:.05em;margin-bottom:18px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.03)}
    .cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}
    .btn{display:inline-flex;align-items:center;justify-content:center;padding:16px 22px;border-radius:14px;font-weight:700;border:1px solid transparent;transition:.2s ease;font-size:1rem;min-height:48px}
    .btn-primary{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#08111f;box-shadow:0 12px 28px rgba(89,225,191,.16)}
    .btn-secondary{background:rgba(255,255,255,.03);border-color:var(--line-strong);color:var(--text)}
    .btn:hover{transform:translateY(-1px)}
    .card{padding:26px;border-radius:22px;border:1px solid var(--line);background:linear-gradient(180deg, rgba(18,26,47,.76), rgba(10,15,28,.72));box-shadow:var(--shadow);backdrop-filter:blur(8px)}
    .icon{width:48px;height:48px;border-radius:15px;display:grid;place-items:center;margin-bottom:14px;border:1px solid rgba(124,156,255,.22);background:linear-gradient(135deg, rgba(124,156,255,.18), rgba(89,225,191,.14));color:#e8f0ff;font-size:1.2rem}
    .card p{color:var(--muted);line-height:1.74;margin:10px 0 0}
    .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
    .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}
    .section-head{margin-bottom:28px}
    .section-head p{margin:10px 0 0;color:var(--muted);line-height:1.8;max-width:68ch}
    .article-body{max-width:72ch;line-height:1.85;color:var(--muted);font-size:1.05rem}
    .article-body h2{color:var(--text);margin:36px 0 14px;font-size:clamp(1.3rem,2.5vw,1.8rem)}
    .article-body h3{color:var(--text);margin:28px 0 10px}
    .article-body p{margin:0 0 18px}
    .article-body ul{padding-left:22px;margin:0 0 18px;display:grid;gap:8px}
    .article-body li{line-height:1.78}
    .article-body strong{color:var(--text)}
    .link-card{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:22px 26px;border-radius:22px;border:1px solid rgba(124,156,255,.22);background:linear-gradient(135deg, rgba(124,156,255,.08), rgba(89,225,191,.05));box-shadow:var(--shadow);transition:.2s ease}
    .link-card:hover{transform:translateY(-2px);border-color:var(--line-strong)}
    .link-card-arrow{font-size:1.4rem;color:var(--accent2);flex:0 0 auto}
    .link-card p{margin:6px 0 0;color:var(--muted);font-size:.95rem;line-height:1.7}
    .cta-band{margin-top:18px;padding:36px;border-radius:26px;border:1px solid var(--line-strong);background:linear-gradient(135deg, rgba(124,156,255,.10), rgba(89,225,191,.08)),linear-gradient(180deg, rgba(18,26,47,.92), rgba(10,15,28,.88));box-shadow:var(--shadow),var(--glow);text-align:center}
    .cta-band h2{margin-bottom:12px}
    .cta-band p{color:var(--muted);line-height:1.8;margin:0 auto 24px;max-width:68ch}
    .cta-band .cta{justify-content:center}
    .footer{padding:38px 0 62px;text-align:center;color:var(--muted);font-size:.94rem}
    .footer-links{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:14px;font-size:.92rem}
    @media(max-width:860px){
      .nav-links{display:none}
      .mobile-nav-row{display:flex;gap:10px;overflow:auto;padding:0 0 12px}
      .mobile-nav-row a{white-space:nowrap;padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.03);color:var(--text);font-size:.92rem}
      .grid-3{grid-template-columns:1fr}
    }
    @media(max-width:768px){
      .grid-2{grid-template-columns:1fr}
      .cta-band{padding:24px 18px}
      .link-card{flex-direction:column;align-items:flex-start}
      .hero{padding:52px 0 28px}
      .section{padding:24px 0}
    }
    @media(max-width:640px){
      .nav{position:fixed;top:0;left:0;right:0;padding-top:env(safe-area-inset-top,0)}
      body{padding-top:118px}
      .nav-inner{display:grid;grid-template-columns:1fr;gap:12px}
      .nav-actions{justify-content:flex-start}
      .cta .btn{width:100%}
      .cta-band .cta .btn{width:100%}
      h1{font-size:2rem}
    }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="wrap nav-inner">
      <div class="brand"><div class="brand-mark"><img src="bertlclaw-assets/logo-main.jpg" alt="BertlClaw Logo" /></div><div>BertlClaw</div></div>
      <div class="nav-links">
        <a href="services.html">Leistungen</a>
        <a href="use-cases.html">Anwendungsfälle</a>
        <a href="proof.html">Proof</a>
        <a href="ueber-bertlclaw.html">Über BertlClaw</a>
        <a href="faq.html">FAQ</a>
        <a href="kontakt.html">Kontakt</a>
      </div>
      <div class="nav-actions">
        <a class="mini-btn" href="landingpages.html">Landingpages</a>
      </div>
    </div>
    <div class="wrap mobile-nav-row">
      <a href="services.html">Leistungen</a>
      <a href="use-cases.html">Anwendungsfälle</a>
      <a href="proof.html">Proof</a>
      <a href="ueber-bertlclaw.html">Über</a>
      <a href="kontakt.html">Kontakt</a>
    </div>
  </nav>

  <!-- Hero -->
  <header class="hero wrap">
    <div class="hero-inner">
      <span class="eyebrow">📍 ${prof.label} in ${city.city}</span>
      <h1 class="accent-text">Landingpage für ${prof.label} in ${city.city}</h1>
      <p class="lead">Du bist ${prof.label.endsWith('er') || prof.label.endsWith('en') ? '' : 'als '}${prof.keyword} in ${city.city} tätig und willst online gefunden werden? BertlClaw erstellt professionelle Landingpages für ${prof.label} in ${city.city} (${city.state}) — klar positioniert, überzeugend getextet und in wenigen Tagen live.</p>
      <div class="cta">
        <a class="btn btn-primary" href="erstgespraech.html">Erstgespräch vereinbaren</a>
        <a class="btn btn-secondary" href="services.html">Leistungen ansehen</a>
      </div>
    </div>
  </header>

  <main class="wrap">

    <section class="section">
      <div class="article-body">
        ${content}

        <h2>Wie du mit BertlClaw startest</h2>
        <p>Der Einstieg ist einfach: Ein kostenloses Erstgespräch, in dem wir gemeinsam schauen, wo bei dir der größte Hebel liegt — Positionierung, Landingpage oder beides. Kein langer Vorlauf, kein Verkaufsdruck. Nur ein ehrliches Gespräch darüber, was dir helfen würde, als ${prof.keyword} in ${city.city} sichtbarer und erfolgreicher zu werden.</p>
        <p>Wenn du bereit bist — buche jetzt dein Erstgespräch. Kostenlos, unverbindlich, direkt.</p>
      </div>
    </section>

    <!-- Internal link -->
    <section class="section">
      <div class="section-head">
        <span class="micro-label">Mehr erfahren</span>
        <h2>Was kostet eine Landingpage?</h2>
        <p>Transparente Infos zu Preisen, Paketen und was im Landingpage Sprint enthalten ist.</p>
      </div>
      <a class="link-card" href="was-kostet-eine-landingpage.html">
        <div>
          <h3 style="margin:0 0 6px">Was kostet eine Landingpage? Preise und Pakete →</h3>
          <p>Alle Infos zu Umfang, Preisen und dem Ablauf des Landingpage Sprints von BertlClaw.</p>
        </div>
        <span class="link-card-arrow">→</span>
      </a>
    </section>

    <!-- CTA Band -->
    <section class="section">
      <div class="cta-band">
        <span class="micro-label">Jetzt starten</span>
        <h2>Landingpage für ${prof.label} in ${city.city} — los geht's</h2>
        <p>Im kostenlosen Erstgespräch besprechen wir, wie wir deine Landingpage für ${city.city} aufbauen — mit klarer Positionierung, überzeugenden Texten und einem Design, das Vertrauen schafft.</p>
        <div class="cta">
          <a class="btn btn-primary" href="erstgespraech.html">Erstgespräch vereinbaren</a>
          <a class="btn btn-secondary" href="landingpages.html">Mehr zu Landingpages</a>
        </div>
      </div>
    </section>

  </main>

  <footer class="footer wrap">
    <div class="footer-links">
      <a href="index.html">Startseite</a>
      <a href="services.html">Leistungen</a>
      <a href="use-cases.html">Anwendungsfälle</a>
      <a href="proof.html">Proof</a>
      <a href="ueber-bertlclaw.html">Über BertlClaw</a>
      <a href="arbeitsweise.html">Arbeitsweise</a>
      <a href="faq.html">FAQ</a>
      <a href="kontakt.html">Kontakt</a>
      <a href="impressum.html">Impressum</a>
      <a href="datenschutz.html">Datenschutz</a>
      <a href="agb.html">AGB</a>
    </div>
    BertlClaw · Landingpage für ${prof.label} in ${city.city} · Für ${prof.keyword} in ${city.state}
  </footer>
</body>
</html>`;
}

// Main
const allCities = [...citiesDE, ...citiesCH];
let generated = 0;
const newUrls = [];

for (const city of allCities) {
  for (const prof of professions) {
    const filename = `landingpage-${city.slug}-${prof.slug}.html`;
    const outPath = path.join(WORKSPACE, filename);
    const html = generatePage(city, prof);
    fs.writeFileSync(outPath, html, 'utf8');
    newUrls.push(`https://bertlclaw.at/${filename}`);
    generated++;
    if (generated % 50 === 0) process.stdout.write(`Generated ${generated}...\n`);
  }
}

console.log(`\n✅ Generated ${generated} pages.`);

// Update sitemap.xml
const sitemapContent = fs.readFileSync(SITEMAP, 'utf8');
const newEntries = newUrls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>2026-04-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`).join('\n');

// Insert before closing </urlset>
const updatedSitemap = sitemapContent.replace(
  '</urlset>',
  `${newEntries}\n</urlset>`
);
fs.writeFileSync(SITEMAP, updatedSitemap, 'utf8');
console.log(`✅ Sitemap updated with ${newUrls.length} new entries.`);
