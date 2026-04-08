#!/usr/bin/env node
/**
 * generate-de-batch6.js
 * Generates city×profession landing pages for German cities (batch 6).
 * Cities: 20 (Sachsen, Brandenburg, Saarland, Rheinland-Pfalz, Niedersachsen, Bremen, Schleswig-Holstein, Thüringen, Bayern)
 * Professions: 25
 * Total: up to 500 pages (skips already existing files)
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE = path.resolve(__dirname, '..');
const SITEMAP = path.join(WORKSPACE, 'sitemap.xml');

const cities = [
  {city: "Leipzig", slug: "leipzig", state: "Sachsen", locale: "de_DE"},
  {city: "Dresden", slug: "dresden", state: "Sachsen", locale: "de_DE"},
  {city: "Chemnitz", slug: "chemnitz", state: "Sachsen", locale: "de_DE"},
  {city: "Zwickau", slug: "zwickau", state: "Sachsen", locale: "de_DE"},
  {city: "Potsdam", slug: "potsdam", state: "Brandenburg", locale: "de_DE"},
  {city: "Cottbus", slug: "cottbus", state: "Brandenburg", locale: "de_DE"},
  {city: "Frankfurt an der Oder", slug: "frankfurt-oder", state: "Brandenburg", locale: "de_DE"},
  {city: "Saarbrücken", slug: "saarbruecken", state: "Saarland", locale: "de_DE"},
  {city: "Mainz", slug: "mainz", state: "Rheinland-Pfalz", locale: "de_DE"},
  {city: "Trier", slug: "trier", state: "Rheinland-Pfalz", locale: "de_DE"},
  {city: "Koblenz", slug: "koblenz", state: "Rheinland-Pfalz", locale: "de_DE"},
  {city: "Ludwigshafen", slug: "ludwigshafen", state: "Rheinland-Pfalz", locale: "de_DE"},
  {city: "Hannover", slug: "hannover", state: "Niedersachsen", locale: "de_DE"},
  {city: "Bremen", slug: "bremen", state: "Bremen", locale: "de_DE"},
  {city: "Bremerhaven", slug: "bremerhaven", state: "Bremen", locale: "de_DE"},
  {city: "Neumünster", slug: "neumuenster", state: "Schleswig-Holstein", locale: "de_DE"},
  {city: "Norderstedt", slug: "norderstedt", state: "Schleswig-Holstein", locale: "de_DE"},
  {city: "Erfurt", slug: "erfurt", state: "Thüringen", locale: "de_DE"},
  {city: "Regensburg", slug: "regensburg", state: "Bayern", locale: "de_DE"},
  {city: "Nürnberg", slug: "nuernberg", state: "Bayern", locale: "de_DE"},
];

const professions = [
  {slug: "aerzte", label: "Ärzte", keyword: "Arzt"},
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
  {slug: "handwerker", label: "Handwerker", keyword: "Handwerker"},
  {slug: "personal-trainer", label: "Personal Trainer", keyword: "Personal Trainer"},
  {slug: "grafikdesigner", label: "Grafikdesigner", keyword: "Grafikdesigner"},
  {slug: "webentwickler", label: "Webentwickler", keyword: "Webentwickler"},
  {slug: "makler", label: "Immobilienmakler", keyword: "Makler"},
  {slug: "buchhalter", label: "Buchhalter", keyword: "Buchhalter"},
  {slug: "yogalehrer", label: "Yogalehrer", keyword: "Yogalehrer"},
  {slug: "ernaehrungsberater", label: "Ernährungsberater", keyword: "Ernährungsberater"},
  {slug: "notare", label: "Notare", keyword: "Notar"},
  {slug: "finanzberater", label: "Finanzberater", keyword: "Finanzberater"},
  {slug: "it-berater", label: "IT-Berater", keyword: "IT-Berater"},
  {slug: "social-media-manager", label: "Social Media Manager", keyword: "Social Media Manager"},
  {slug: "texter", label: "Texter & Copywriter", keyword: "Texter"},
  {slug: "heilpraktiker", label: "Heilpraktiker", keyword: "Heilpraktiker"},
];

// Profession content
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
    intro: "Architekten stehen vor einem paradoxen Problem: Sie gestalten beeindruckende Räume — aber die eigene Online-Präsenz bleibt oft hinter dem zurück, was sie für Kunden leisten.",
    detail: "Wer einen Architekten sucht, beginnt fast immer online. Portfolio, Stil, Spezialisierung und Kontakt — all das muss sofort klar sein. Eine fokussierte Landingpage, die Projekte und Expertise zeigt, entscheidet über erste Anfragen.",
    value: "BertlClaw entwickelt Landingpages für Architekten und Architekturbüros, die Projekte wirkungsvoll präsentieren, den Arbeitsstil kommunizieren und qualifizierte Anfragen generieren."
  },
  steuerberater: {
    intro: "Steuerberater gewinnen Mandanten durch Vertrauen — und Vertrauen beginnt oft online, lange bevor jemand anruft.",
    detail: "Wer einen Steuerberater sucht, ist meist unzufrieden mit dem aktuellen oder steht vor einem neuen Lebensabschnitt (Selbstständigkeit, Umzug, Unternehmensgründung). Eine klare Landingpage, die genau diesen Moment anspricht, ist Gold wert.",
    value: "BertlClaw entwickelt Landingpages für Steuerberater, die Kompetenz und Verlässlichkeit signalisieren, das Leistungsangebot strukturieren und Interessenten in Mandantengespräche verwandeln."
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
  notare: {
    intro: "Notare gewinnen Mandate durch Seriosität und Verlässlichkeit — und das muss auch online sichtbar sein.",
    detail: "Menschen suchen einen Notar meist für wichtige Lebensereignisse: Hauskauf, Erbschaft, Firmengründung. Wer in diesem Moment mit einer professionellen, vertrauenswürdigen Seite präsent ist, gewinnt das Mandat.",
    value: "BertlClaw erstellt Landingpages für Notare und Notarskanzleien, die Kompetenz klar kommunizieren, Tätigkeitsbereiche übersichtlich darstellen und Vertrauen noch vor dem ersten Kontakt aufbauen."
  },
  finanzberater: {
    intro: "Finanzberater stehen vor einer besonderen Herausforderung: In einem Bereich mit viel Misstrauen müssen sie online schnell Kompetenz und Seriosität beweisen.",
    detail: "Wer einen Finanzberater sucht, hat oft eine konkrete Lebenssituation: Altersvorsorge, Investition, Versicherung. Eine Landingpage, die genau diese Situation anspricht und Lösungskompetenz zeigt, macht den Unterschied.",
    value: "BertlClaw entwickelt Landingpages für Finanzberater, die Vertrauen aufbauen, Spezialisierungen klar kommunizieren und Interessenten in qualifizierte Beratungsgespräche führen."
  },
  "it-berater": {
    intro: "IT-Berater und IT-Consultants sind gefragte Experten — aber ohne klare Online-Positionierung bleiben viele potenzielle Aufträge liegen.",
    detail: "Unternehmen, die IT-Beratung suchen, müssen schnell verstehen: Was ist dein Fokus? Cloud, Security, Prozessdigitalisierung, ERP? Eine fokussierte Landingpage, die genau das beantwortet, trennt dich vom Durchschnitt.",
    value: "BertlClaw entwickelt Landingpages für IT-Berater, die technische Kompetenz verständlich übersetzen, Zielgruppen klar ansprechen und den Weg zum ersten Gespräch verkürzen."
  },
  "social-media-manager": {
    intro: "Social Media Manager helfen Unternehmen, online sichtbar zu werden — und brauchen selbst eine Landingpage, die das eindrucksvoll beweist.",
    detail: "Wer als Social Media Manager Kunden überzeugen will, muss den eigenen Auftritt ernst nehmen. Eine klare Landingpage, die Expertise, Stil und Referenzen zeigt, ist das stärkste Verkaufsargument.",
    value: "BertlClaw erstellt Landingpages für Social Media Manager, die Leistungen und Persönlichkeit kombinieren, Zielgruppen punktgenau ansprechen und Interessenten in Aufträge verwandeln."
  },
  texter: {
    intro: "Texter und Copywriter wissen, wie man mit Worten überzeugt — aber die eigene Landingpage bleibt oft auf halbem Weg stecken. BertlClaw hilft beim entscheidenden Schritt.",
    detail: "Als Texter konkurrierst du online mit Hunderten von Freelancern. Was macht dich anders? Spezialisierung, Stil, Ergebnisse — das muss sofort klar sein. Eine fokussierte Landingpage sagt in wenigen Sekunden, wer du bist und warum du der Richtige bist.",
    value: "BertlClaw entwickelt Landingpages für Texter und Copywriter, die Schreibkompetenz und Persönlichkeit zeigen, Spezialisierungen klar positionieren und Anfragen qualifizierter Kunden generieren."
  },
  heilpraktiker: {
    intro: "Heilpraktiker stehen online vor einer doppelten Aufgabe: Seriosität beweisen und gleichzeitig die eigene Behandlungsphilosophie authentisch kommunizieren.",
    detail: "Wer einen Heilpraktiker sucht, hat oft einen langen Weg hinter sich — konventionelle Medizin hat nicht weitergeholfen, oder es geht um Prävention und Ganzheitlichkeit. Eine Landingpage, die diese Suche versteht und beantwortet, schafft Vertrauen.",
    value: "BertlClaw erstellt Landingpages für Heilpraktiker, die Behandlungsangebote klar strukturieren, die therapeutische Haltung kommunizieren und die Kontaktaufnahme einfach und einladend gestalten."
  },
};

// City-specific flavor text
function getCityFlavor(city) {
  const flavors = {
    leipzig: "Leipzig ist die boomende Boomtown des Ostens — mit Universität Leipzig, einer der ältesten Universitäten Deutschlands, einer pulsierenden Kreativszene, wachsender Startup-Kultur und einem Immobilienmarkt, der jährlich tausende neue Einwohner anzieht. Die Nachfrage nach professionellen Dienstleistungen wächst rasant.",
    dresden: "Dresden, die sächsische Landeshauptstadt, verbindet barockes Kulturerbe mit moderner Technologie — als Silicon Saxony ist die Region rund um Dresden eines der größten Mikroelektronik-Cluster Europas, mit TU Dresden, Infineon und Globalfoundries als Ankern einer dynamischen Wirtschaft.",
    chemnitz: "Chemnitz, die drittgrößte Stadt Sachsens, wandelt sich von der Industriestadt zur modernen Wirtschaftsregion — mit TU Chemnitz, wachsendem Mittelstand und einer Bürgerschaft, die professionelle Dienstleister aktiv nachfragt, während sich die Stadt als Kulturhauptstadt Europas neu positioniert.",
    zwickau: "Zwickau ist das Herz der sächsischen Automobilindustrie — als Geburtsstadt des VW Golf und Standort des einzigen reinen Elektroauto-Werks von Volkswagen in Deutschland hat die Stadt eine starke industrielle Basis und eine Bevölkerung, die qualifizierte lokale Dienstleistungen schätzt.",
    potsdam: "Potsdam, die brandenburgische Landeshauptstadt direkt vor den Toren Berlins, vereint historischen Glanz mit modernem Unternehmertum — als Medienstandort (Studio Babelsberg), Wissenschaftsstadt (Universität Potsdam, Fraunhofer) und bevorzugter Wohnort für gut situierte Berliner Pendler bietet die Stadt ideale Bedingungen.",
    cottbus: "Cottbus ist das Zentrum des Lausitzer Strukturwandels — als eine der am stärksten transformierten Regionen Deutschlands fließen hier massive Investitionen in neue Wirtschaftsstrukturen, entstehen neue Unternehmen und wächst der Bedarf an professionellen Dienstleistern, die diesen Wandel begleiten.",
    "frankfurt-oder": "Frankfurt an der Oder ist die östlichste Großstadt Deutschlands, direkt an der Grenze zu Polen — mit Europa-Universität Viadrina, wachsendem grenzüberschreitenden Wirtschaftsaustausch und einer strategischen Lage, die für Selbstständige mit klarem Profil in einem weniger gesättigten Markt besondere Chancen bietet.",
    saarbruecken: "Saarbrücken ist die Landeshauptstadt des Saarlandes und ein wichtiger Wirtschafts- und Kulturstandort im Dreiländereck Deutschland-Frankreich-Luxemburg — mit Universität des Saarlandes, DFKI (Deutsches Forschungszentrum für Künstliche Intelligenz) und einer gut vernetzten Unternehmenslandschaft.",
    mainz: "Mainz, die rheinland-pfälzische Landeshauptstadt, ist ein bedeutender Medien- und Wissenschaftsstandort — als Sitz von ZDF, Johannes Gutenberg-Universität und BioNTech (dem Unternehmen hinter dem ersten mRNA-COVID-Impfstoff) vereint Mainz Tradition mit Innovation und bietet eine kaufkräftige, gebildete Zielgruppe.",
    trier: "Trier ist die älteste Stadt Deutschlands und bedeutender Tourismus- und Hochschulstandort an der Mosel — mit Universität Trier, Hochschule Trier und einer kulturell reichen Region zieht die Stadt ein vielseitiges Publikum an, das professionelle Dienstleistungen in einem persönlicheren Umfeld als in Großstädten sucht.",
    koblenz: "Koblenz liegt am berühmten Deutschen Eck, dem Zusammenfluss von Rhein und Mosel, und ist ein wichtiger Verwaltungs- und Wirtschaftsstandort in Rheinland-Pfalz — mit Universität Koblenz, Bundesamt für Ausrüstung der Bundeswehr und einer soliden Mittelstandsstruktur, die qualifizierten Selbstständigen stabile Perspektiven bietet.",
    ludwigshafen: "Ludwigshafen am Rhein ist weltweit bekannt als Hauptsitz der BASF, des größten Chemieunternehmens der Welt — als Teil der Metropolregion Rhein-Neckar profitiert die Stadt von einer dichten Unternehmenslandschaft, hoher Kaufkraft und direkter Nachbarschaft zu Mannheim und Heidelberg.",
    hannover: "Hannover, die niedersächsische Landeshauptstadt, ist Messemetropole und wichtiger Wirtschaftsstandort — als Heimat der weltgrößten Industriemesse (Hannover Messe) sowie der CeBIT-Tradition, mit Leibniz Universität und einem starken Mittelstand bietet die Stadt exzellente Voraussetzungen für professionelle Selbstständige.",
    bremen: "Bremen ist eines der ältesten Handelszentren Europas und Stadtstaat mit eigenem Charakter — mit Airbus, Mercedes-Benz, Universität Bremen und einer lebhaften Startup-Szene verbindet Bremen Tradition mit Innovation und bietet Selbstständigen eine kosmopolitische, kaufkräftige Zielgruppe.",
    bremerhaven: "Bremerhaven ist Deutschlands wichtigster Überseehafen und ein Standort mit starker maritimer Identität — mit Hochschule Bremerhaven, Alfred-Wegener-Institut für Polar- und Meeresforschung und einer sich diversifizierenden Wirtschaft bietet die Stadt Selbstständigen einen Markt mit wenig lokaler Konkurrenz.",
    neumuenster: "Neumünster ist das wirtschaftliche Zentrum der Region Holstein in Schleswig-Holstein — mit einer starken Textil- und Lederindustrie-Tradition, wachsendem Dienstleistungssektor und günstiger Lage zwischen Hamburg und Kiel bietet die Stadt Selbstständigen ein solides wirtschaftliches Umfeld mit überschaubarem Wettbewerb.",
    norderstedt: "Norderstedt ist als Teil des Hamburger Umlands eine der wohlhabendsten Städte Schleswig-Holsteins — mit hervorragender S-Bahn-Anbindung nach Hamburg, einer gut situierten Bevölkerung und einem attraktiven Unternehmensstandort direkt an der Hamburger Stadtgrenze bietet Norderstedt ideale Bedingungen für positionierte Selbstständige.",
    erfurt: "Erfurt, die thüringische Landeshauptstadt, ist eine der ältesten Universitätsstädte Deutschlands — mit Universität Erfurt, Fachhochschule Erfurt und einer lebhaften Altstadt bietet die Stadt eine gut ausgebildete Bevölkerung und einen wachsenden Markt für professionelle Dienstleistungen in einer Region im wirtschaftlichen Aufschwung.",
    regensburg: "Regensburg ist eine der besterhaltenen mittelalterlichen Städte Europas und zugleich einer der dynamischsten Wirtschaftsstandorte Bayerns — mit Universität Regensburg, BMW-Werk, Siemens und Continental als Arbeitgeber sowie einer stark wachsenden Bevölkerung und hoher Kaufkraft.",
    nuernberg: "Nürnberg ist die zweitgrößte Stadt Bayerns und ein bedeutendes Wirtschafts-, Messe- und Technologiezentrum — als Standort der Spielwarenmesse, mit einem dichten Netz aus Mittelständlern, Hochschulen und einem innovativen Startup-Ökosystem bietet Nürnberg professionellen Selbstständigen hervorragende Wachstumschancen.",
  };
  return flavors[city.slug] || `${city.city} in ${city.state} ist ein wichtiger regionaler Wirtschaftsstandort in Deutschland mit wachsender Nachfrage nach professionellen Dienstleistungen.`;
}

function generateContent(city, prof) {
  const pc = professionContent[prof.slug];
  const cityFlavor = getCityFlavor(city);

  return `
        <h2>${prof.label} in ${city.city} — professionelle Landingpage von BertlClaw</h2>
        <p>${pc.intro} ${cityFlavor}</p>

        <h2>${prof.label} in Deutschland: Warum Online-Sichtbarkeit entscheidend ist</h2>
        <p>${pc.detail} In ${city.city} (${city.state}) gilt das besonders: Der lokale Markt ist aktiv, die Nachfrage nach qualifizierten ${prof.label} hoch — aber auch die Konkurrenz ist real. Wer hier mit einer klaren, professionellen Landingpage auftritt, gewinnt das Vertrauen potenzieller Klienten, bevor sie überhaupt Kontakt aufnehmen.</p>

        <h2>Was BertlClaw für ${prof.label} in ${city.city} macht</h2>
        <p>${pc.value} Die Kombination aus klarer Positionierung, überzeugenden Texten und einem professionellen Design schafft genau das: Eine Seite, die für dich arbeitet — auch wenn du gerade beim Klienten bist oder schläfst.</p>
        <p>BertlClaw arbeitet vollständig remote und betreut ${prof.label} im gesamten DACH-Raum — auch in ${city.city}. Der Prozess ist schlank: Ein kostenloses Erstgespräch, klare Aufgabenstellung, und in wenigen Tagen hast du eine fertige Landingpage, die deinen Auftritt in Deutschland dauerhaft stärkt.</p>`;
}

function generatePage(city, prof) {
  const filename = `landingpage-${city.slug}-${prof.slug}.html`;
  const canonical = `https://bertlclaw.at/${filename}`;
  const title = `Landingpage für ${prof.label} in ${city.city} | BertlClaw`;
  const description = `${prof.label} in ${city.city} (${city.state}): Professionelle Landingpage und Website-Texte von BertlClaw.`;
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
      <p class="lead">Du bist als ${prof.keyword} in ${city.city} tätig und willst online gefunden werden? BertlClaw erstellt professionelle Landingpages für ${prof.label} in ${city.city} (${city.state}) — klar positioniert, überzeugend getextet und in wenigen Tagen live.</p>
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
let generated = 0;
let skipped = 0;
const newUrls = [];

for (const city of cities) {
  for (const prof of professions) {
    const filename = `landingpage-${city.slug}-${prof.slug}.html`;
    const outPath = path.join(WORKSPACE, filename);

    if (fs.existsSync(outPath)) {
      skipped++;
      continue;
    }

    const html = generatePage(city, prof);
    fs.writeFileSync(outPath, html, 'utf8');
    newUrls.push(`https://bertlclaw.at/${filename}`);
    generated++;
    if (generated % 50 === 0) process.stdout.write(`Generated ${generated}...\n`);
  }
}

console.log(`\n✅ Generated ${generated} pages. (${skipped} skipped — already existed)`);

if (newUrls.length === 0) {
  console.log('No new pages to add to sitemap.');
  process.exit(0);
}

// Update sitemap.xml
const sitemapContent = fs.readFileSync(SITEMAP, 'utf8');
const newEntries = newUrls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>2026-04-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`).join('\n');

const updatedSitemap = sitemapContent.replace(
  '</urlset>',
  `${newEntries}\n</urlset>`
);
fs.writeFileSync(SITEMAP, updatedSitemap, 'utf8');
console.log(`✅ Sitemap updated with ${newUrls.length} new entries.`);
