#!/usr/bin/env node
/**
 * generate-ch-expanded.js
 * Generates city×profession landing pages for 20 Swiss cities × 25 professions.
 * Skips already-existing files. Updates sitemap.xml.
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE = path.resolve(__dirname, '..');
const SITEMAP = path.join(WORKSPACE, 'sitemap.xml');

const citiesCH = [
  {city: "Zürich", slug: "zuerich", canton: "Zürich", locale: "de_CH"},
  {city: "Bern", slug: "bern", canton: "Bern", locale: "de_CH"},
  {city: "Basel", slug: "basel", canton: "Basel-Stadt", locale: "de_CH"},
  {city: "Luzern", slug: "luzern", canton: "Luzern", locale: "de_CH"},
  {city: "Winterthur", slug: "winterthur", canton: "Zürich", locale: "de_CH"},
  {city: "St. Gallen", slug: "st-gallen", canton: "St. Gallen", locale: "de_CH"},
  {city: "Zug", slug: "zug", canton: "Zug", locale: "de_CH"},
  {city: "Schaffhausen", slug: "schaffhausen", canton: "Schaffhausen", locale: "de_CH"},
  {city: "Chur", slug: "chur", canton: "Graubünden", locale: "de_CH"},
  {city: "Thun", slug: "thun", canton: "Bern", locale: "de_CH"},
  {city: "Biel", slug: "biel", canton: "Bern", locale: "de_CH"},
  {city: "Köniz", slug: "koeniz", canton: "Bern", locale: "de_CH"},
  {city: "Uster", slug: "uster", canton: "Zürich", locale: "de_CH"},
  {city: "Sion", slug: "sion", canton: "Wallis", locale: "de_CH"},
  {city: "Frauenfeld", slug: "frauenfeld", canton: "Thurgau", locale: "de_CH"},
  {city: "Aarau", slug: "aarau", canton: "Aargau", locale: "de_CH"},
  {city: "Olten", slug: "olten", canton: "Solothurn", locale: "de_CH"},
  {city: "Baden", slug: "baden-ch", canton: "Aargau", locale: "de_CH"},
  {city: "Kreuzlingen", slug: "kreuzlingen", canton: "Thurgau", locale: "de_CH"},
  {city: "Rapperswil", slug: "rapperswil", canton: "St. Gallen", locale: "de_CH"},
];

const professions = [
  {slug: "aerzte", label: "Ärzte", singular: "Arzt", emoji: "🏥"},
  {slug: "zahnaerzte", label: "Zahnärzte", singular: "Zahnarzt", emoji: "🦷"},
  {slug: "coaches", label: "Coaches", singular: "Coach", emoji: "🎯"},
  {slug: "therapeuten", label: "Therapeuten", singular: "Therapeut", emoji: "💆"},
  {slug: "fotografen", label: "Fotografen", singular: "Fotograf", emoji: "📸"},
  {slug: "trainer", label: "Trainer", singular: "Trainer", emoji: "💪"},
  {slug: "berater", label: "Unternehmensberater", singular: "Unternehmensberater", emoji: "📊"},
  {slug: "physiotherapeuten", label: "Physiotherapeuten", singular: "Physiotherapeut", emoji: "🩺"},
  {slug: "psychologen", label: "Psychologen", singular: "Psychologe", emoji: "🧠"},
  {slug: "architekten", label: "Architekten", singular: "Architekt", emoji: "🏛️"},
  {slug: "steuerberater", label: "Steuerberater", singular: "Steuerberater", emoji: "📋"},
  {slug: "handwerker", label: "Handwerker", singular: "Handwerker", emoji: "🔧"},
  {slug: "personal-trainer", label: "Personal Trainer", singular: "Personal Trainer", emoji: "🏋️"},
  {slug: "grafikdesigner", label: "Grafikdesigner", singular: "Grafikdesigner", emoji: "🎨"},
  {slug: "webentwickler", label: "Webentwickler", singular: "Webentwickler", emoji: "💻"},
  {slug: "makler", label: "Immobilienmakler", singular: "Immobilienmakler", emoji: "🏠"},
  {slug: "buchhalter", label: "Buchhalter", singular: "Buchhalter", emoji: "📒"},
  {slug: "yogalehrer", label: "Yogalehrer", singular: "Yogalehrer", emoji: "🧘"},
  {slug: "ernaehrungsberater", label: "Ernährungsberater", singular: "Ernährungsberater", emoji: "🥗"},
  {slug: "notare", label: "Notare", singular: "Notar", emoji: "⚖️"},
  {slug: "finanzberater", label: "Finanzberater", singular: "Finanzberater", emoji: "💰"},
  {slug: "it-berater", label: "IT-Berater", singular: "IT-Berater", emoji: "🖥️"},
  {slug: "social-media-manager", label: "Social Media Manager", singular: "Social Media Manager", emoji: "📱"},
  {slug: "texter", label: "Texter & Copywriter", singular: "Texter", emoji: "✍️"},
  {slug: "virtuelle-assistenten", label: "Virtuelle Assistenten", singular: "Virtuelle Assistentin", emoji: "🤝"},
];

// Profession-specific content snippets
const professionContent = {
  aerzte: {
    intro: "Ärzte und Praxen stehen heute vor einer doppelten Herausforderung: exzellente Medizin und gleichzeitig überzeugende Online-Präsenz.",
    detail: "Patienten suchen heute zuerst online nach einem Arzt — bevor sie das Telefon in die Hand nehmen. Eine klare Praxis-Landingpage entscheidet, ob potenzielle Patienten Vertrauen fassen oder zur nächsten Suchergebnis-Seite wechseln.",
    value: "BertlClaw entwickelt Landingpages für Ärzte, die medizinische Kompetenz verständlich kommunizieren, Spezialisierungen klar darstellen und neue Patienten gezielt ansprechen — inklusive CHF-transparenter Kommunikation für den Schweizer Markt.",
    chfNote: "Im Schweizer Markt ist professionelles Auftreten besonders wichtig: Patienten und Klienten erwarten Qualität auf höchstem Niveau, und eine durchdachte Landingpage signalisiert genau das.",
  },
  zahnaerzte: {
    intro: "Zahnarztpraxen kämpfen online um die gleichen lokalen Suchanfragen — wer klar positioniert ist, gewinnt Neupatienten zuverlässig.",
    detail: "Viele Zahnarztpraxen haben Websites, die wie Branchenbucheinträge wirken: Name, Adresse, Öffnungszeiten — und mehr nicht. Eine fokussierte Landingpage macht den Unterschied.",
    value: "BertlClaw erstellt Landingpages für Zahnärzte, die Vertrauen aufbauen, Schwerpunkte klar kommunizieren und die Kontaktaufnahme so einfach wie möglich machen. Im CHF-Markt der Schweiz zahlt Qualität sich direkt aus.",
    chfNote: "Schweizer Patienten sind anspruchsvoll und vergleichen. Eine überzeugende Praxis-Landingpage positioniert Sie von Anfang an als erste Wahl.",
  },
  coaches: {
    intro: "Der Coaching-Markt ist groß und unübersichtlich — umso wichtiger ist eine klare Positionierung und eine Landingpage, die dein Angebot unmissverständlich kommuniziert.",
    detail: "Als Coach brauchst du eine Seite, die nicht nur dein Angebot erklärt, sondern Vertrauen aufbaut — denn Coaching ist immer auch eine Vertrauenssache. Wer bist du? Was bewirkst du? Für wen bist du der Richtige?",
    value: "BertlClaw erstellt Coaching-Landingpages, die klar positionieren, Persönlichkeit zeigen und Interessenten in Erstgespräche verwandeln. In der Schweiz mit ihrer hohen Kaufkraft lohnt sich professionelles Online-Marketing besonders.",
    chfNote: "Schweizer Klienten sind gewohnt, für Qualität zu zahlen — und eine professionelle Landingpage kommuniziert genau diesen Qualitätsanspruch.",
  },
  therapeuten: {
    intro: "Therapeuten stehen vor der besonderen Herausforderung, sensible Themen klar und einladend zu kommunizieren — ohne zu viel Distanz oder zu wenig Professionalität.",
    detail: "Für Therapeuten ist die Online-Präsenz oft der erste Kontaktpunkt mit Klienten, die Hilfe suchen. Dieser erste Eindruck ist entscheidend — er entscheidet, ob jemand Kontakt aufnimmt oder nicht.",
    value: "BertlClaw entwickelt Landingpages für Therapeuten, die Sicherheit und Kompetenz ausstrahlen, das Angebot klar strukturieren und den Kontakteinstieg so niederschwellig wie möglich gestalten.",
    chfNote: "Im Schweizer Gesundheitsmarkt ist Seriosität und Transparenz entscheidend — auch bei der Online-Präsentation des therapeutischen Angebots.",
  },
  fotografen: {
    intro: "Fotografen leben von ihrer Arbeit — aber die Bilder allein reichen nicht, um online neue Kunden zu gewinnen. Es braucht eine Seite, die erklärt, für wen du fotografierst und was das bringt.",
    detail: "Viele Fotografen haben beeindruckende Portfolios, aber keine klare Positionierung. Eine fokussierte Landingpage für einen spezifischen Bereich — Hochzeit, Business, Portrait — bringt mehr als eine generelle Galerie-Website.",
    value: "BertlClaw erstellt Landingpages für Fotografen, die nicht nur schön aussehen, sondern klar kommunizieren — und aus Interessenten Buchungen machen.",
    chfNote: "Schweizer Kunden schätzen hochwertige Fotografie und zahlen entsprechend. Eine professionelle Landingpage positioniert dein Angebot im Premium-Segment.",
  },
  trainer: {
    intro: "Als Trainer oder Fitnesstrainer musst du online überzeugen, bevor jemand zum ersten Training kommt. Eine klare Landingpage ist dein digitaler Erstauftritt.",
    detail: "Trainer konkurrieren lokal um sichtbare Plätze — online und offline. Wer mit einer professionellen Seite und klarer Botschaft auftritt, wird von potenziellen Kunden als erster wahrgenommen.",
    value: "BertlClaw erstellt Landingpages für Trainer, die deine Methode erklären, dein Profil schärfen und Interessenten direkt in Anfragen verwandeln.",
    chfNote: "In der Schweiz ist Sport und Fitness stark verankert — ein professioneller Online-Auftritt ist für Trainer im Schweizer Markt unverzichtbar.",
  },
  berater: {
    intro: "Unternehmensberater und Consultants stehen vor einem spezifischen Problem: Ihre Expertise ist oft schwer greifbar — eine gute Landingpage macht sie konkret und vertrauenswürdig.",
    detail: "Potenzielle Klienten eines Beraters googeln oft nach Themen, nicht nach Namen. Eine gut aufgestellte Landingpage sorgt dafür, dass du bei den richtigen Suchanfragen sichtbar bist und sofort Kompetenz signalisierst.",
    value: "BertlClaw entwickelt Beratungs-Landingpages, die Expertise klar machen, Zielgruppen präzise ansprechen und den Weg zum Erstgespräch verkürzen.",
    chfNote: "Der Schweizer Unternehmensberatungsmarkt ist anspruchsvoll. Mit einer professionellen Landingpage positionierst du dich als kompetenter Partner für Schweizer KMUs — mit CHF-Preistransparenz.",
  },
  physiotherapeuten: {
    intro: "Physiotherapeuten sind gefragt — aber online oft schlecht auffindbar. Eine klare Praxis-Landingpage ändert das.",
    detail: "Wer nach einem Physiotherapeuten sucht, hat oft konkrete Beschwerden und möchte schnell eine passende Praxis finden. Eine fokussierte Landingpage, die Spezialisierungen klar kommuniziert, macht den Unterschied.",
    value: "BertlClaw erstellt Landingpages für Physiotherapeuten, die Vertrauen aufbauen, das Leistungsangebot übersichtlich darstellen und neue Patienten gezielt ansprechen.",
    chfNote: "Im Schweizer Gesundheitssystem ist Eigenverantwortung zentral — viele Patienten suchen aktiv nach Physiotherapeuten und wählen gezielt nach Online-Auftritt.",
  },
  psychologen: {
    intro: "Psychologen und Psychotherapeuten stehen vor der Aufgabe, Expertise und Wärme gleichzeitig zu transportieren — die richtige Landingpage hilft dabei entscheidend.",
    detail: "Menschen, die einen Psychologen suchen, sind oft in einer sensiblen Situation. Deine Online-Präsenz muss Sicherheit und Kompetenz vermitteln — und klar machen, wie der erste Schritt aussieht.",
    value: "BertlClaw entwickelt Landingpages für Psychologen, die professionell und zugänglich wirken, das Beratungsangebot strukturieren und die Hemmschwelle zur Kontaktaufnahme senken.",
    chfNote: "Das Schweizer Gesundheitswesen schätzt psychologische Fachkompetenz hoch — ein professioneller Online-Auftritt stärkt Vertrauen und Auffindbarkeit zugleich.",
  },
  architekten: {
    intro: "Architekten und Planungsbüros gewinnen Aufträge über Reputation und Sichtbarkeit — eine starke Online-Präsenz ist heute unverzichtbar.",
    detail: "Architektur ist visuell und komplex. Eine Landingpage für Architekten muss Projekte überzeugend darstellen, die Designphilosophie greifbar machen und klar kommunizieren, wer die idealen Kunden sind.",
    value: "BertlClaw erstellt Landingpages für Architekten, die Projekte ins richtige Licht rücken, den Arbeitsprozess erklären und neue Mandanten gezielt ansprechen.",
    chfNote: "Schweizer Bauprojekte haben hohe Qualitätsstandards. Eine professionelle Architektur-Landingpage signalisiert genau diese Qualität — und hilft, anspruchsvolle Bauherren zu gewinnen.",
  },
  steuerberater: {
    intro: "Steuerberater gewinnen Mandanten durch Vertrauen — und Vertrauen beginnt oft online, lange bevor jemand anruft.",
    detail: "Wer einen Steuerberater sucht, ist meist unzufrieden mit dem aktuellen oder steht vor einem neuen Lebensabschnitt. Eine klare Landingpage, die genau diesen Moment anspricht, ist Gold wert.",
    value: "BertlClaw entwickelt Landingpages für Steuerberater, die Kompetenz und Verlässlichkeit signalisieren, das Leistungsangebot strukturieren und Interessenten in Mandantengespräche verwandeln.",
    chfNote: "Das Schweizer Steuersystem ist komplex — Selbstständige und Unternehmen suchen aktiv nach kompetenten Steuerberatern. Eine starke Landingpage sichert dir die Sichtbarkeit im Schweizer Markt.",
  },
  handwerker: {
    intro: "Handwerker werden gesucht — und wer online gut aufgestellt ist, muss nicht mehr auf Empfehlungen warten.",
    detail: "Der Handwerkermarkt ist lokal. Wer bei einer Suche ganz oben erscheint und einen professionellen Eindruck hinterlässt, gewinnt den Auftrag — oft noch bevor drei Mitbewerber überhaupt angefragt werden.",
    value: "BertlClaw erstellt Landingpages für Handwerksbetriebe, die Leistungen klar darstellen, Vertrauen aufbauen und die Kontaktaufnahme für potenzielle Kunden so einfach wie möglich machen.",
    chfNote: "Schweizer Kunden erwarten Handwerksqualität auf höchstem Niveau und zahlen entsprechende CHF-Preise dafür. Eine professionelle Landingpage unterstreicht deinen Qualitätsanspruch.",
  },
  "personal-trainer": {
    intro: "Personal Trainer brauchen eine Landingpage, die nicht nur zeigt, was sie können — sondern auch, warum jemand genau mit ihnen trainieren sollte.",
    detail: "Der Markt für Personal Training ist gewachsen. Differenzierung ist alles: Methode, Zielgruppe, Erfolge. Eine fokussierte Landingpage bringt das auf den Punkt.",
    value: "BertlClaw entwickelt Landingpages für Personal Trainer, die Persönlichkeit und Kompetenz zeigen, die Trainingsphilosophie erklären und Interessenten direkt in Buchungen verwandeln.",
    chfNote: "Personal Training ist in der Schweiz ein Premium-Segment mit kaufkräftiger Kundschaft. Eine professionelle Landingpage positioniert dich als Top-Trainer im Schweizer Markt.",
  },
  grafikdesigner: {
    intro: "Grafikdesigner sind kreativ — aber die eigene Selbstvermarktung fällt oft schwer. Eine klare Landingpage macht dein Angebot greifbar.",
    detail: "Kunden, die einen Grafikdesigner suchen, haben oft konkrete Projekte: Logo, Brand Identity, Print. Wer genau dieses Angebot klar und überzeugend präsentiert, gewinnt die passenden Aufträge.",
    value: "BertlClaw erstellt Landingpages für Grafikdesigner, die Portfolio und Positionierung smart verbinden, das Leistungsangebot klar machen und neue Auftraggeber gezielt ansprechen.",
    chfNote: "Schweizer Unternehmen investieren in Qualitätsdesign — eine professionelle Landingpage öffnet dir die Türen zum CHF-starken Schweizer Design-Markt.",
  },
  webentwickler: {
    intro: "Webentwickler können für andere großartige Websites bauen — aber die eigene Landingpage bleibt oft hinten. BertlClaw ändert das.",
    detail: "Paradox aber wahr: Viele Webentwickler haben keine überzeugende eigene Webpräsenz. Eine klare Landingpage, die Technologie-Stack, Arbeitsweise und Zielkunden kommuniziert, macht einen riesigen Unterschied.",
    value: "BertlClaw erstellt Landingpages für Webentwickler und Freelance-Entwickler, die Expertise zeigen, den Mehrwert klar kommunizieren und Interessenten in Projektanfragen verwandeln.",
    chfNote: "Der Schweizer Tech-Markt ist gut bezahlt. Mit einer professionellen Landingpage positionierst du dich als erstklassiger Entwickler für Schweizer Kunden und Unternehmen.",
  },
  makler: {
    intro: "Immobilienmakler leben von Vertrauen und Sichtbarkeit — eine professionelle Landingpage ist der erste Baustein für beides.",
    detail: "Wer eine Immobilie kaufen, verkaufen oder vermieten will, recherchiert ausgiebig online. Wer hier mit einer klaren Seite präsent ist, wird als kompetenter Partner wahrgenommen — noch bevor der erste Kontakt stattfindet.",
    value: "BertlClaw entwickelt Landingpages für Immobilienmakler, die Expertise und lokale Marktkenntnis kommunizieren, Vertrauen aufbauen und Interessenten in Beratungsgespräche führen.",
    chfNote: "Der Schweizer Immobilienmarkt ist anspruchsvoll und wettbewerbsintensiv. Eine professionelle Makler-Landingpage unterstreicht deine lokale Expertise und Marktkenntnis in CHF-Preissegmenten.",
  },
  buchhalter: {
    intro: "Buchhalter und Buchhaltungsbüros gewinnen Klienten durch Vertrauen und Verlässlichkeit — und das beginnt mit einem professionellen Online-Auftritt.",
    detail: "Selbstständige und Unternehmer, die einen Buchhalter suchen, wollen jemanden, dem sie ihre Zahlen anvertrauen können. Eine Landingpage, die Kompetenz und Zuverlässigkeit ausstrahlt, schafft genau dieses Vertrauen.",
    value: "BertlClaw erstellt Landingpages für Buchhalter, die das Leistungsangebot strukturieren, Zielgruppen klar ansprechen und den Einstieg in die Zusammenarbeit erleichtern.",
    chfNote: "Im Schweizer Markt mit CHF-Buchhaltung und Schweizer Buchführungsstandards suchen KMUs und Selbstständige gezielt nach lokalen Buchhaltern mit Expertise.",
  },
  yogalehrer: {
    intro: "Yogalehrer und Yogastudios stehen in einem wachsenden Markt — eine klare Positionierung und professionelle Landingpage helfen, die richtigen Schüler zu finden.",
    detail: "Ob Hatha, Vinyasa oder Yin Yoga — wer seinen Stil klar kommuniziert und die Zielgruppe präzise anspricht, findet schneller die Schüler, die wirklich passen.",
    value: "BertlClaw entwickelt Landingpages für Yogalehrer, die Stil und Atmosphäre greifbar machen, das Kursangebot klar strukturieren und neue Teilnehmer gezielt ansprechen.",
    chfNote: "Yoga und Wellness sind in der Schweiz stark nachgefragt. Eine professionelle Landingpage hilft dir, in diesem wachsenden Markt mit CHF-kaufkräftigen Kunden sichtbar zu bleiben.",
  },
  ernaehrungsberater: {
    intro: "Ernährungsberater helfen Menschen, gesünder zu leben — eine klare Landingpage hilft dabei, diese Menschen auch online zu erreichen.",
    detail: "Der Markt für Ernährungsberatung ist vielfältig: Abnehmen, Sportlerernährung, chronische Erkrankungen, vegane Ernährung. Wer sich klar positioniert, gewinnt Klienten, die wirklich passen.",
    value: "BertlClaw erstellt Landingpages für Ernährungsberater, die Beratungsangebote klar darstellen, Spezialisierungen hervorheben und Interessenten in Erstgespräche verwandeln.",
    chfNote: "Gesundheitsbewusstsein ist in der Schweiz besonders hoch. Eine professionelle Landingpage erschliesst dir Zugang zu einem kaufkräftigen Klientel im Schweizer Gesundheitsmarkt.",
  },
  notare: {
    intro: "Notare gewinnen Mandanten durch Seriosität und lokale Bekanntheit — eine professionelle Online-Präsenz verstärkt beides nachhaltig.",
    detail: "Wer notarielle Dienstleistungen sucht, möchte absolute Sicherheit und Kompetenz. Eine klare Kanzlei-Landingpage kommuniziert genau das — und macht aus Online-Suchenden direkte Mandanten.",
    value: "BertlClaw entwickelt Landingpages für Notare, die das Leistungsangebot präzise darstellen, juristische Expertise unterstreichen und den Erstkontakt professionell gestalten.",
    chfNote: "Notarielle Dienstleistungen sind im Schweizer Rechts- und Immobilienmarkt unverzichtbar. Eine starke Online-Präsenz positioniert dich als erste Wahl im lokalen Schweizer Markt.",
  },
  finanzberater: {
    intro: "Finanzberater und Vermögensverwalter stehen im Wettbewerb um Vertrauen — eine professionelle Landingpage ist der entscheidende erste Schritt.",
    detail: "Klienten, die einen Finanzberater suchen, vertrauen ihr Geld an. Wer online Kompetenz und Seriösität ausstrahlt, gewinnt dieses Vertrauen — noch bevor das erste Gespräch stattfindet.",
    value: "BertlClaw erstellt Landingpages für Finanzberater, die Expertise und Vertrauenswürdigkeit kommunizieren, das Beratungsangebot strukturieren und Interessenten direkt ansprechen.",
    chfNote: "Die Schweiz ist ein globales Finanzzentrum. Eine erstklassige Finanzberater-Landingpage positioniert dich als seriösen Partner im CHF-Markt — für Privatkunden und Unternehmen.",
  },
  "it-berater": {
    intro: "IT-Berater sind gefragter denn je — aber wer online nicht sichtbar ist, geht im Rauschen unter. Eine klare Landingpage schafft Abhilfe.",
    detail: "Unternehmen suchen IT-Expertise gezielt online. Eine fokussierte Landingpage, die Technologie-Schwerpunkte, Branchenerfahrung und Arbeitsweise klar kommuniziert, gewinnt die richtigen Kunden.",
    value: "BertlClaw entwickelt Landingpages für IT-Berater, die Expertise greifbar machen, Vertrauen aufbauen und Interessenten direkt in Beratungsanfragen verwandeln.",
    chfNote: "Schweizer Unternehmen investieren stark in IT-Expertise. Eine professionelle IT-Berater-Landingpage öffnet dir den Zugang zum attraktiven Schweizer Tech-Markt mit CHF-Tagessätzen.",
  },
  "social-media-manager": {
    intro: "Social Media Manager sind überall tätig — aber wer nicht selbst online überzeugt, hat es schwer, Kunden von seinen Leistungen zu überzeugen.",
    detail: "Unternehmen suchen Social Media Expertise, um online zu wachsen. Eine Landingpage, die deine Methoden, Plattformen und Erfolge klar kommuniziert, bringt genau die Kunden, die du willst.",
    value: "BertlClaw erstellt Landingpages für Social Media Manager, die digitale Expertise zeigen, klare Leistungsangebote kommunizieren und Interessenten in langfristige Kunden verwandeln.",
    chfNote: "Im Schweizer Markt sind Social Media Fähigkeiten gefragt — von KMUs bis Grossunternehmen. Eine professionelle Landingpage positioniert dich als Experte für den DACH-Raum.",
  },
  texter: {
    intro: "Texter und Copywriter sind das Rückgrat jedes erfolgreichen Marketing-Auftritts — und wer selbst klar und überzeugend kommuniziert, gewinnt die besten Aufträge.",
    detail: "Kunden, die einen Texter suchen, wollen jemanden, der versteht, wie Sprache wirkt. Eine fokussierte Landingpage beweist genau das — noch bevor der erste Kontakt stattfindet.",
    value: "BertlClaw erstellt Landingpages für Texter und Copywriter, die das eigene Angebot klar positionieren, Stärken und Spezialisierungen hervorheben und Interessenten in Auftraggeber verwandeln.",
    chfNote: "Deutschsprachige Textkompetenz ist im Schweizer Markt hoch geschätzt — für Websites, Kampagnen und Content-Strategien in CHF-starken Branchen.",
  },
  "virtuelle-assistenten": {
    intro: "Virtuelle Assistentinnen und Assistenten entlasten Unternehmer und Selbstständige — aber wer online nicht klar kommuniziert, bleibt unsichtbar.",
    detail: "Unternehmer suchen VA-Support oft aus dem Stress heraus. Wer hier mit einer klaren, professionellen Landingpage präsent ist, die Leistungen und Vorteile auf den Punkt bringt, gewinnt das Vertrauen direkt.",
    value: "BertlClaw entwickelt Landingpages für Virtuelle Assistentinnen, die das Leistungsangebot strukturieren, Zuverlässigkeit kommunizieren und den Einstieg in die Zusammenarbeit erleichtern.",
    chfNote: "Schweizer Unternehmer schätzen professionelle VA-Unterstützung — eine klar positionierte Landingpage erschliesst dir Zugang zum gut zahlenden Schweizer Geschäftskundenmarkt.",
  },
};

// City-specific flavor text for all 20 cities
function getCityFlavor(city) {
  const flavors = {
    zuerich: "Zürich ist das Finanz- und Wirtschaftszentrum der Schweiz — und bietet Selbstständigen Zugang zu einem kaufkräftigen, international geprägten Markt.",
    bern: "Bern, die Bundeshauptstadt der Schweiz, vereint politisches Zentrum mit einer stabilen, gut vernetzten Wirtschafts- und Dienstleistungsszene.",
    basel: "Basel als trinationale Stadt und Sitz globaler Pharmaunternehmen bietet Selbstständigen ein einzigartiges wirtschaftliches Umfeld in der Nordwestschweiz.",
    luzern: "Luzern ist eines der attraktivsten Wirtschaftszentren der Zentralschweiz — mit starkem Tourismus, Finanzsektor und wachsender Selbstständigenszene.",
    winterthur: "Winterthur im Kanton Zürich ist eine wachsende Mittelstadt mit starker Industrie- und Dienstleistungswirtschaft — und einem soliden Markt für selbstständige Fachleute.",
    "st-gallen": "St. Gallen ist das wirtschaftliche Zentrum der Ostschweiz — mit einer langen Tradition in Handel und Textil und heute wachsenden Dienstleistungsbranchen.",
    zug: "Zug ist bekannt für tiefe Steuern und eine hohe Unternehmensdichte — ein Eldorado für selbstständige Dienstleister und Berater in der Deutschschweiz.",
    schaffhausen: "Schaffhausen verbindet Schweizer Qualitätsanspruch mit einer überschaubaren, gut vernetzten Wirtschaftsgemeinschaft nahe der deutschen Grenze.",
    chur: "Chur, die Hauptstadt des Kantons Graubünden, ist ein wachsendes Dienstleistungszentrum im Alpenraum mit starker regionaler Wirtschaftskraft.",
    thun: "Thun im Kanton Bern verbindet Alpenregion mit einer gut aufgestellten Stadtökonomie — ein solider Standort für selbstständige Dienstleister im Berner Raum.",
    biel: "Biel/Bienne ist die zweisprachige Uhrmacherstadt im Kanton Bern — ein innovationsstarker Standort mit hoher industrieller Dichte und wachsender Dienstleistungsszene.",
    koeniz: "Köniz bei Bern ist eine der größten Gemeinden der Schweiz — mit direkter Anbindung an die Bundeshauptstadt und einem stabilen, kaufkräftigen lokalen Markt.",
    uster: "Uster im Kanton Zürich ist eine dynamische Kleinstadt im Großraum Zürich — mit hoher Kaufkraft und direktem Zugang zum stärksten Wirtschaftsraum der Schweiz.",
    sion: "Sion im Kanton Wallis ist das administrative Zentrum der französischsprachigen Westschweiz — ein wachsender Standort für Dienstleistungen im Walliser Wirtschaftsraum.",
    frauenfeld: "Frauenfeld ist die Hauptstadt des Kantons Thurgau — ein aufstrebender Wirtschaftsstandort zwischen Zürich und dem Bodensee mit gut vernetzter Unternehmerszene.",
    aarau: "Aarau, die Hauptstadt des Kantons Aargau, ist ein zentraler Wirtschaftsknotenpunkt zwischen Zürich und Basel — mit einer starken Selbstständigen- und KMU-Szene.",
    olten: "Olten im Kanton Solothurn ist als Eisenbahnknotenpunkt der Schweiz ideal verbunden — und bietet Selbstständigen ein gut erreichbares, wachsendes Wirtschaftsumfeld.",
    "baden-ch": "Baden im Kanton Aargau ist ein aufstrebender Tech- und Dienstleistungsstandort — bekannt als «Silicon Valley der Schweiz» mit starker Industrietradition und moderner Wirtschaft.",
    kreuzlingen: "Kreuzlingen im Kanton Thurgau liegt direkt an der deutschen Grenze — ein strategischer Standort mit Zugang zu Kunden im DACH-Grenzraum und wachsender lokaler Wirtschaft.",
    rapperswil: "Rapperswil-Jona im Kanton St. Gallen liegt am Zürichsee — eine attraktive Kleinstadt mit kaufkräftiger Bevölkerung und direkter Anbindung an den Großraum Zürich.",
  };
  return flavors[city.slug] || `${city.city} im Kanton ${city.canton} ist ein aufstrebender Standort für Selbstständige und Freelancer im Schweizer Markt.`;
}

const CSS = `    :root {
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
    }`;

function generateContent(city, prof) {
  const pc = professionContent[prof.slug] || {
    intro: `${prof.label} sind in ${city.city} gefragt — und wer online klar aufgestellt ist, gewinnt mehr Klienten.`,
    detail: `In ${city.city} wächst der Markt für ${prof.label}. Eine professionelle Landingpage schafft die nötige Sichtbarkeit und Differenzierung.`,
    value: `BertlClaw erstellt Landingpages für ${prof.label}, die klar positionieren, überzeugen und Interessenten in Kunden verwandeln.`,
    chfNote: `Im Schweizer Markt mit hoher Kaufkraft lohnt sich professionelles Online-Marketing besonders.`,
  };
  const cityFlavor = getCityFlavor(city);

  return `
        <h2>${prof.label} in ${city.city} — professionelle Landingpage von BertlClaw</h2>
        <p>${pc.intro} ${cityFlavor}</p>

        <h2>${prof.label} in der Schweiz: Warum Online-Sichtbarkeit entscheidend ist</h2>
        <p>${pc.detail} In ${city.city} (Kanton ${city.canton}) gilt das besonders: Der lokale Markt ist aktiv, die Nachfrage nach qualifizierten ${prof.label} hoch — aber auch die Konkurrenz im Schweizer Markt ist real. ${pc.chfNote} Wer hier mit einer klaren, professionellen Landingpage auftritt, gewinnt das Vertrauen potenzieller Klienten, bevor sie überhaupt Kontakt aufnehmen.</p>

        <h2>Was BertlClaw für ${prof.label} in ${city.city} macht</h2>
        <p>${pc.value} Die Kombination aus klarer Positionierung, überzeugenden Texten und einem professionellen Design schafft genau das: Eine Seite, die für dich arbeitet — auch wenn du gerade beim Klienten bist oder schläfst.</p>
        <p>BertlClaw arbeitet vollständig remote und betreut ${prof.label} im gesamten DACH-Raum — auch in ${city.city}. Der Prozess ist schlank: Ein kostenloses Erstgespräch, klare Aufgabenstellung, und in wenigen Tagen hast du eine fertige Landingpage, die deinen Auftritt in der Schweiz dauerhaft stärkt.</p>

        <h2>Wie du mit BertlClaw startest</h2>
        <p>Der Einstieg ist einfach: Ein kostenloses Erstgespräch, in dem wir gemeinsam schauen, wo bei dir der größte Hebel liegt — Positionierung, Landingpage oder beides. Kein langer Vorlauf, kein Verkaufsdruck. Nur ein ehrliches Gespräch darüber, was dir helfen würde, als ${prof.singular} in ${city.city} sichtbarer und erfolgreicher zu werden.</p>
        <p>Wenn du bereit bist — buche jetzt dein Erstgespräch. Kostenlos, unverbindlich, direkt.</p>`;
}

function generatePage(city, prof) {
  const filename = `landingpage-${city.slug}-${prof.slug}.html`;
  const canonical = `https://bertlclaw.at/${filename}`;
  const title = `Landingpage für ${prof.label} in ${city.city} | BertlClaw`;
  const description = `${prof.label} in ${city.city} (Kanton ${city.canton}): Professionelle Landingpage und Website-Texte von BertlClaw.`;
  const content = generateContent(city, prof);

  return `<!DOCTYPE html>
<html lang="de">
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
${CSS}
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
      <span class="eyebrow">${prof.emoji} ${prof.label} in ${city.city}</span>
      <h1 class="accent-text">Landingpage für ${prof.label} in ${city.city}</h1>
      <p class="lead">Du bist als ${prof.singular} in ${city.city} tätig und willst online gefunden werden? BertlClaw erstellt professionelle Landingpages für ${prof.label} in ${city.city} (Kanton ${city.canton}) — klar positioniert, überzeugend getextet und in wenigen Tagen live.</p>
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
    BertlClaw · Landingpage für ${prof.label} in ${city.city} · Für ${prof.singular} in ${city.city}
  </footer>
</body>
</html>`;
}

function updateSitemap(newUrls) {
  let sitemap = fs.readFileSync(SITEMAP, 'utf8');
  const today = '2026-04-08';
  const insertBefore = '</urlset>';
  
  const urlBlocks = newUrls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.6</priority>
    <changefreq>monthly</changefreq>
  </url>`).join('\n');
  
  if (urlBlocks) {
    sitemap = sitemap.replace(insertBefore, urlBlocks + '\n' + insertBefore);
    fs.writeFileSync(SITEMAP, sitemap, 'utf8');
  }
}

// Main
let generated = 0;
let skipped = 0;
const newSitemapUrls = [];

for (const city of citiesCH) {
  for (const prof of professions) {
    const filename = `landingpage-${city.slug}-${prof.slug}.html`;
    const filepath = path.join(WORKSPACE, filename);
    
    if (fs.existsSync(filepath)) {
      skipped++;
      continue;
    }
    
    const html = generatePage(city, prof);
    fs.writeFileSync(filepath, html, 'utf8');
    newSitemapUrls.push(`https://bertlclaw.at/${filename}`);
    generated++;
    
    if (generated % 25 === 0) {
      process.stdout.write(`  Generated ${generated} pages so far...\n`);
    }
  }
}

// Update sitemap with new URLs
if (newSitemapUrls.length > 0) {
  // Check which URLs already in sitemap
  const sitemap = fs.readFileSync(SITEMAP, 'utf8');
  const trulyNew = newSitemapUrls.filter(url => !sitemap.includes(url));
  if (trulyNew.length > 0) {
    updateSitemap(trulyNew);
    console.log(`✅ Added ${trulyNew.length} new URLs to sitemap.xml`);
  }
}

console.log(`\n✅ Done!`);
console.log(`   Generated: ${generated} new pages`);
console.log(`   Skipped (already exist): ${skipped} pages`);
console.log(`   New sitemap entries: ${newSitemapUrls.length}`);
