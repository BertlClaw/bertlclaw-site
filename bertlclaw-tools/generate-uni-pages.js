#!/usr/bin/env node
/**
 * generate-uni-pages.js
 * Creates landingpage-{slug}-universitaeten.html and landingpage-{slug}-hochschulen.html
 * for all DACH university cities.
 *
 * Usage: node bertlclaw-tools/generate-uni-pages.js
 */

const fs = require('fs');
const path = require('path');

const TODAY = '2026-04-08';
const BASE_URL = 'https://bertlclaw.at';

const atUniCities = [
  {city: "Wien", slug: "wien", uni: "Universität Wien, TU Wien, WU Wien, Meduni Wien", locale: "de_AT", country: "at"},
  {city: "Graz", slug: "graz", uni: "Universität Graz, TU Graz, Med Uni Graz", locale: "de_AT", country: "at"},
  {city: "Linz", slug: "linz", uni: "JKU Linz, Kunstuniversität Linz", locale: "de_AT", country: "at"},
  {city: "Salzburg", slug: "salzburg", uni: "Universität Salzburg, FH Salzburg", locale: "de_AT", country: "at"},
  {city: "Innsbruck", slug: "innsbruck", uni: "Universität Innsbruck, MCI Innsbruck", locale: "de_AT", country: "at"},
  {city: "Klagenfurt", slug: "klagenfurt", uni: "Universität Klagenfurt, FH Kärnten", locale: "de_AT", country: "at"},
];

const deUniCities = [
  {city: "Berlin", slug: "berlin", uni: "FU Berlin, HU Berlin, TU Berlin", locale: "de_DE", country: "de"},
  {city: "München", slug: "muenchen", uni: "LMU München, TU München", locale: "de_DE", country: "de"},
  {city: "Hamburg", slug: "hamburg", uni: "Universität Hamburg, TUHH", locale: "de_DE", country: "de"},
  {city: "Frankfurt", slug: "frankfurt", uni: "Goethe-Universität Frankfurt", locale: "de_DE", country: "de"},
  {city: "Köln", slug: "koeln", uni: "Universität zu Köln", locale: "de_DE", country: "de"},
  {city: "Stuttgart", slug: "stuttgart", uni: "Universität Stuttgart, DHBW Stuttgart", locale: "de_DE", country: "de"},
  {city: "Heidelberg", slug: "heidelberg", uni: "Universität Heidelberg (älteste DE)", locale: "de_DE", country: "de"},
  {city: "Freiburg", slug: "freiburg", uni: "Albert-Ludwigs-Universität Freiburg", locale: "de_DE", country: "de"},
  {city: "Tübingen", slug: "tuebingen", uni: "Eberhard Karls Universität Tübingen", locale: "de_DE", country: "de"},
  {city: "Göttingen", slug: "goettingen", uni: "Georg-August-Universität Göttingen", locale: "de_DE", country: "de"},
  {city: "Leipzig", slug: "leipzig", uni: "Universität Leipzig", locale: "de_DE", country: "de"},
  {city: "Dresden", slug: "dresden", uni: "TU Dresden", locale: "de_DE", country: "de"},
  {city: "Hannover", slug: "hannover", uni: "Leibniz Universität Hannover", locale: "de_DE", country: "de"},
  {city: "Marburg", slug: "marburg", uni: "Philipps-Universität Marburg", locale: "de_DE", country: "de"},
  {city: "Jena", slug: "jena", uni: "Friedrich-Schiller-Universität Jena", locale: "de_DE", country: "de"},
];

const chUniCities = [
  {city: "Zürich", slug: "zuerich", uni: "Universität Zürich, ETH Zürich", locale: "de_CH", country: "ch"},
  {city: "Bern", slug: "bern", uni: "Universität Bern", locale: "de_CH", country: "ch"},
  {city: "Basel", slug: "basel", uni: "Universität Basel", locale: "de_CH", country: "ch"},
  {city: "St. Gallen", slug: "st-gallen", uni: "Universität St. Gallen (HSG)", locale: "de_CH", country: "ch"},
  {city: "Luzern", slug: "luzern", uni: "Universität Luzern", locale: "de_CH", country: "ch"},
];

const allCities = [...atUniCities, ...deUniCities, ...chUniCities];

// ─── Unique content snippets per city ────────────────────────────────────────

const cityContent = {
  // Austria
  wien: {
    uniIntro: `Wien ist das wissenschaftliche Gravitationszentrum Österreichs. Mit der Universität Wien, der TU Wien, der WU Wien und der Meduni Wien vereint die Stadt eine enorme Dichte an akademischem Wissen und internationalem Renommee. Genau hier entstehen täglich Spin-offs, Beratungsvorhaben und freie Lehraufträge — und genau hier fehlt es oft an der richtigen Online-Präsenz.`,
    spinOff: `Gerade Spin-offs aus der TU Wien oder WU Wien — ob im Bereich Deep Tech, Unternehmensberatung oder Life Sciences — stehen vor derselben Herausforderung: exzellente Forschungsergebnisse, aber kein klares Messaging für potenzielle Kunden oder Investoren.`,
    lehrbeauftragte: `Wer als Lehrbeauftragte/r an der Universität Wien oder Meduni Wien tätig ist, trägt Expertise in die Lehre, die auch außerhalb der Hörsäle gefragt ist. Aber wer auf Google nach einem Experten auf deinem Fachgebiet sucht, findet dich nicht — weil du keine klare Online-Präsenz hast.`,
  },
  graz: {
    uniIntro: `Graz ist eine echte Universitätsstadt: Universität Graz, TU Graz und Med Uni Graz prägen das intellektuelle Leben der steirischen Landeshauptstadt. Viele Akademikerinnen und Akademiker arbeiten hier in freien Engagements — als Berater, Forscher oder Lehrbeauftragte.`,
    spinOff: `Spin-offs aus der TU Graz — etwa im Bereich Engineering, Mobilität oder Materialwissenschaften — brauchen eine klare digitale Identität, um jenseits des Campus sichtbar zu werden. Eine fokussierte Landingpage ist oft der erste entscheidende Schritt.`,
    lehrbeauftragte: `Lehrbeauftragte an der Universität Graz oder Med Uni Graz leisten wichtige Arbeit — aber ohne professionelle Online-Präsenz bleiben Anfragen aus. Dein Fachwissen ist vorhanden; was fehlt, ist die Sichtbarkeit.`,
  },
  linz: {
    uniIntro: `Linz ist eine unterschätzte Universitätsstadt: Die Johannes Kepler Universität (JKU) und die Kunstuniversität Linz bilden einen lebendigen akademischen Kern in Oberösterreich. Technologie, Kunst und Wirtschaft verbinden sich hier auf einzigartige Weise.`,
    spinOff: `Die JKU Linz produziert regelmäßig Gründer in den Bereichen IT, Wirtschaft und Technik. Diese Spin-offs brauchen von Anfang an eine klare Online-Identität — nicht erst, wenn der erste Investor fragt.`,
    lehrbeauftragte: `Wer an der JKU oder der Kunstuniversität Linz als freie Lehrperson tätig ist, verfügt über spezialisiertes Wissen, das am Markt gefragt ist. Eine klare Website hilft, daraus ein skalierbares Beratungsangebot zu machen.`,
  },
  salzburg: {
    uniIntro: `Salzburg hat nicht nur Mozartkugeln und Musik — die Universität Salzburg und die FH Salzburg sind aktive wissenschaftliche Institutionen mit Verbindungen in Wirtschaft, Kultur und Sozialwissenschaften. Freie Akademiker sind hier eine wichtige, aber oft unsichtbare Gruppe.`,
    spinOff: `Gründungen aus dem Salzburger Universitätsumfeld haben ein Problem: Die Stadt ist klein genug, dass Netzwerke funktionieren — aber groß genug, dass man ohne digitale Präsenz schnell übersehen wird.`,
    lehrbeauftragte: `Lehrbeauftragte an der Universität Salzburg oder FH Salzburg sind häufig Praktikerinnen und Praktiker, die ihr Fachwissen in die Lehre bringen. Genau dieses Profil ist außerhalb der Hochschule gefragt — wenn man es findet.`,
  },
  innsbruck: {
    uniIntro: `Innsbruck ist mehr als Bergpanorama: Die Universität Innsbruck gehört zu den traditionsreichsten Hochschulen im deutschsprachigen Raum, und das MCI Innsbruck ergänzt das Angebot mit angewandter Wissenschaft. Freie Akademiker und Spin-offs aus dem Tiroler Hochschulumfeld haben großes Potenzial — und meistens eine schwache Online-Präsenz.`,
    spinOff: `MCI-Spin-offs und Ausgründungen aus der Universität Innsbruck stehen oft vor dem gleichen Problem: Der Einstieg in den Markt klappt, aber die digitale Sichtbarkeit hinkt hinterher. Eine klare Landingpage ändert das.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r an der Uni Innsbruck oder am MCI bringst du praxisnahes Wissen in die akademische Lehre. Dieses Wissen ist auch außerhalb des Campus wertvoll — wenn potenzielle Kunden und Partner dich finden können.`,
  },
  klagenfurt: {
    uniIntro: `Klagenfurt ist das akademische Zentrum Kärntens: Die Universität Klagenfurt und die FH Kärnten bilden eine solide Wissensbasis in einer Region, die traditionell auf Vernetzung und persönliche Beziehungen setzt. Umso wichtiger ist eine klare digitale Visitenkarte für freie Akademiker.`,
    spinOff: `Spin-offs aus dem Klagenfurter Hochschulumfeld sind oft regional stark vernetzt, aber digital kaum sichtbar. Eine professionelle Landingpage schließt diese Lücke — und öffnet den Weg über Kärnten hinaus.`,
    lehrbeauftragte: `Lehrbeauftragte an der Universität Klagenfurt oder FH Kärnten tragen Fachexpertise in die Region. Mit einer klaren Online-Präsenz können sie ihr Angebot auch überregional und digital skalieren.`,
  },
  // Germany
  berlin: {
    uniIntro: `Berlin ist die Wissenschaftshauptstadt Deutschlands: FU Berlin, HU Berlin und TU Berlin bilden ein akademisches Dreieck mit internationaler Strahlkraft. Kein Wunder, dass hier täglich neue Spin-offs gegründet und Lehraufträge vergeben werden — und trotzdem viele Akademikerinnen und Akademiker online unsichtbar bleiben.`,
    spinOff: `Berliner Start-ups aus dem universitären Umfeld — ob Deep Tech aus der TU Berlin oder Sozialwissenschaften aus der HU Berlin — brauchen eine Landingpage, die erklärt, was sie anbieten und für wen. Nicht nach dem Funding, sondern schon davor.`,
    lehrbeauftragte: `Wer in Berlin einen Lehrauftrag hat und nebenbei berät oder forscht, ist Teil einer riesigen, aber oft unsichtbaren Gruppe. Eine klare Website macht daraus ein echtes Angebot, das Kunden finden.`,
  },
  muenchen: {
    uniIntro: `München ist eine der wirtschaftsstärksten Universitätsstädte Europas. LMU München und TU München gehören zu den renommiertesten Hochschulen im deutschsprachigen Raum — und erzeugen eine dichte Schicht an freien Akademikern, die Beratung, Forschung und Lehre kombinieren.`,
    spinOff: `TU München Spin-offs sind bekannt dafür, technologisch stark zu sein. Die Lücke liegt oft im Außenauftritt: Eine klare Landingpage, die das Angebot auf den Punkt bringt, fehlt häufig bis weit nach dem ersten Kunden.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r an LMU oder TU München bringst du Praxiswissen auf höchstem Niveau in die Lehre. Dieses Profil ist auch außerhalb der Uni gefragt — wenn du online auffindbar bist.`,
  },
  hamburg: {
    uniIntro: `Hamburg verbindet Hafen, Handel und Wissenschaft: Die Universität Hamburg und die TUHH (Technische Universität Hamburg) bilden ein akademisches Fundament in einer Stadt, die Wirtschaftsnähe groß schreibt. Freie Akademiker und Spin-offs haben hier ein starkes Umfeld — und oft eine schwache digitale Präsenz.`,
    spinOff: `TUHH-Spin-offs im Bereich Logistik, Technik und Maritime Sciences haben Zugang zu einem einzigartigen Netzwerk. Was fehlt: eine klare Website, die ihr Angebot auch für externe Kunden zugänglich macht.`,
    lehrbeauftragte: `Lehrbeauftragte an der Universität Hamburg engagieren sich oft nebenberuflich in Beratung oder Forschung. Ohne Online-Präsenz bleibt dieses Potenzial ungenutzt — neue Kunden finden dich schlicht nicht.`,
  },
  frankfurt: {
    uniIntro: `Frankfurt am Main ist Finanzmetropole und Universitätsstadt zugleich. Die Goethe-Universität Frankfurt bringt Wirtschafts-, Sozial- und Rechtswissenschaften in direkter Nähe zu einem der wichtigsten Finanzplätze Europas zusammen. Genau diese Kombination macht freie Akademiker hier besonders gefragt.`,
    spinOff: `Ausgründungen und Spin-offs aus der Goethe-Uni Frankfurt bewegen sich oft im Umfeld Finanzen, Wirtschaft und Recht — Bereiche, in denen klare Positionierung entscheidend ist. Eine starke Landingpage ist keine Kür, sondern Pflicht.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r an der Goethe-Universität Frankfurt hast du Zugang zu einem einzigartigen Netzwerk. Um daraus eine erfolgreiche Selbstständigkeit zu machen, brauchst du eine klare digitale Präsenz — nicht nur Visitenkarten.`,
  },
  koeln: {
    uniIntro: `Köln ist eine der bevölkerungsreichsten Städte Deutschlands — und die Universität zu Köln eine der größten Universitäten im Land. Das erzeugt eine enorme Zahl an freien Akademikern, Lehrbeauftragten und Spin-off-Gründern, die alle auf dem gleichen lokalen Markt sichtbar sein wollen.`,
    spinOff: `Im Wettbewerb um Aufmerksamkeit in einer Großstadt wie Köln reicht ein LinkedIn-Profil allein nicht aus. Wer als Spin-off oder freie/r Forscher/in Kunden gewinnen will, braucht eine klare Landingpage, die auf den ersten Blick erklärt, was geboten wird.`,
    lehrbeauftragte: `Lehrbeauftragte an der Uni Köln bringen Praxiswissen in die akademische Lehre. Dieses Wissen verdient eine professionelle Online-Heimat — damit Kunden, die genau das suchen, auch fündig werden.`,
  },
  stuttgart: {
    uniIntro: `Stuttgart ist eine Hochburg für Technik und Innovation: Universität Stuttgart und DHBW Stuttgart stehen für praxisnahe akademische Ausbildung in einer Region, die von Automobilindustrie und Maschinenbau geprägt ist. Freie Akademiker hier haben Nischen-Expertise, die außerhalb der Uni gefragt ist.`,
    spinOff: `Spin-offs aus der Universität Stuttgart — ob im Bereich Robotik, Produktionstechnik oder Software — bewegen sich in einem hart umkämpften Markt. Eine klare, fokussierte Landingpage ist der erste Schritt zu echten Kundenanfragen.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r an der Uni Stuttgart oder DHBW Stuttgart verfügst du über spezifisches Industrie-Know-how. Mit einer professionellen Online-Präsenz kannst du dieses Wissen als Beratungsleistung skalieren.`,
  },
  heidelberg: {
    uniIntro: `Die Universität Heidelberg ist die älteste Universität Deutschlands — gegründet 1386 und bis heute eine der forschungsstärksten im Land. Wer hier forscht, lehrt oder aus der Uni heraus gründet, hat akademisches Kapital von hohem Wert. Die Frage ist: Wie wird das online sichtbar?`,
    spinOff: `Heidelberger Spin-offs, insbesondere im Bereich Life Sciences, Biotech und Medizin, gehören zu den ambitioniertesten in Deutschland. Dennoch fehlt vielen eine klare digitale Präsenz, die über das Fachpublikum hinausgeht.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r an der Universität Heidelberg trägst du zu einer der renommiertesten akademischen Institutionen Europas bei. Dieses Renommee sollte sich in deiner Online-Präsenz widerspiegeln — mit einer Landingpage, die auf den Punkt bringt, was du anbietest.`,
  },
  freiburg: {
    uniIntro: `Freiburg im Breisgau ist bekannt für seine Lebensqualität — und für die Albert-Ludwigs-Universität Freiburg, eine der traditionsreichsten deutschen Hochschulen. Die Stadt zieht Akademikerinnen und Akademiker an, die Wissenschaft und Lebensqualität verbinden wollen. Viele gründen oder beraten nebenberuflich.`,
    spinOff: `Spin-offs aus dem Freiburger Universitätsumfeld — oft in Bereichen wie Nachhaltigkeitsforschung, Sozialwissenschaften oder Medizin — haben ein differenziertes Angebot. Was fehlt, ist häufig eine klare, verständliche Web-Präsenz für Nicht-Fachpublikum.`,
    lehrbeauftragte: `Freiburger Lehrbeauftragte verbinden akademische Tiefe mit praktischer Expertise. Eine klare Website macht dieses Profil für potenzielle Kunden und Partner greifbar — und erzeugt konkrete Anfragen.`,
  },
  tuebingen: {
    uniIntro: `Tübingen ist eine der bekanntesten Universitätsstädte Deutschlands — die Eberhard Karls Universität Tübingen gehört zu den ältesten und renommiertesten Hochschulen des Landes. Hier forschen, lehren und gründen Akademikerinnen und Akademiker mit hohem fachlichem Anspruch.`,
    spinOff: `Tübinger Spin-offs, besonders in den Bereichen Neurowissenschaften, Informatik und Philosophie, stehen vor einer typischen Herausforderung: exzellente Fachkompetenz, aber kein klares Außenauftritt für Kunden außerhalb der akademischen Welt.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r in Tübingen bringst du Wissen in die Hochschule, das auch am Markt Wert hat. Mit einer gezielten Landingpage wird daraus ein echtes Angebot — für Beratungsmandate, Vorträge oder Förderprojekte.`,
  },
  goettingen: {
    uniIntro: `Göttingen hat eine der beeindruckendsten wissenschaftlichen Traditionen Deutschlands: Die Georg-August-Universität Göttingen hat zahlreiche Nobelpreisträger hervorgebracht und ist bis heute ein Zentrum für Grundlagenforschung. Akademiker, die hier forschen oder lehren, verfügen über Expertise, die weit über die Stadtgrenzen hinaus gefragt ist.`,
    spinOff: `Spin-offs und Ausgründungen aus der Universität Göttingen — etwa in Mathematik, Physik, Biologie oder Wirtschaftswissenschaften — sind fachlich stark. Was sie oft fehlt, ist ein klares digitales Angebot für externe Kunden und Partner.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r in Göttingen trägst du zu einer der wissenschaftshistorisch bedeutendsten Hochschulen bei. Eine professionelle Website macht dein Beratungsangebot außerhalb der Uni sichtbar.`,
  },
  leipzig: {
    uniIntro: `Leipzig ist eine aufstrebende Stadt mit einer langen akademischen Tradition: Die Universität Leipzig gehört zu den ältesten Deutschlands und hat sich als Zentrum für Geistes-, Sozial- und Naturwissenschaften etabliert. Wer hier lehrt oder forscht, bewegt sich in einem lebendigen intellektuellen Umfeld.`,
    spinOff: `Spin-offs aus dem Leipziger Universitätsumfeld haben oft ein starkes lokales Netzwerk — aber eine schwache überregionale Sichtbarkeit. Eine klare Landingpage öffnet den Markt über Sachsen hinaus.`,
    lehrbeauftragte: `Lehrbeauftragte an der Universität Leipzig kombinieren akademische Erfahrung mit praktischem Know-how. Mit der richtigen Online-Präsenz wird daraus eine skalierbare Beratungsleistung.`,
  },
  dresden: {
    uniIntro: `Dresden ist ein Technologiestandort mit akademischem Gewicht: Die TU Dresden ist eine der größten und renommiertesten technischen Universitäten Deutschlands und steht im Zentrum von Forschung in Halbleitertechnologie, Luft- und Raumfahrt sowie Informationstechnik. Freie Akademiker und Spin-offs aus diesem Umfeld haben herausragende Fachkompetenz.`,
    spinOff: `TU Dresden Spin-offs in der Halbleiter- und Mikroelektronik-Branche sind weltweit bekannt für ihre Innovationskraft. Trotzdem fehlt es vielen an einer klaren Kundenwebsite, die das Angebot zugänglich macht.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r an der TU Dresden arbeitest du in einem der technologisch führenden akademischen Umfelder Deutschlands. Eine klare Landingpage macht dein Beratungsangebot für Unternehmen außerhalb des Campus zugänglich.`,
  },
  hannover: {
    uniIntro: `Hannover ist Messestadt und Universitätsstadt zugleich: Die Leibniz Universität Hannover verbindet Ingenieurs- und Naturwissenschaften mit Wirtschaft und Sozialwissenschaften in einem lebendigen Hochschulumfeld. Wer hier lehrt, forscht oder gründet, profitiert von starker Wirtschaftsnähe.`,
    spinOff: `Spin-offs aus der Leibniz Universität Hannover, oft in den Bereichen Maschinenbau, IT oder Wirtschaftsingenieurwesen, haben direkten Zugang zur Industrie — brauchen aber eine klare digitale Präsenz, um überregional sichtbar zu werden.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r in Hannover bringst du Praxiswissen in die Hochschule. Eine professionelle Online-Präsenz hilft, dieses Wissen als Beratungsleistung zu vermarkten — jenseits des persönlichen Netzwerks.`,
  },
  marburg: {
    uniIntro: `Marburg ist eine klassische Universitätsstadt, in der das akademische Leben das Stadtbild prägt: Die Philipps-Universität Marburg, eine der ältesten deutschen Hochschulen, ist ein Zentrum für Geistes-, Sozial- und Naturwissenschaften. Freie Akademiker hier haben Expertise, die am Markt gefragt ist — wenn man sie findet.`,
    spinOff: `Spin-offs und Ausgründungen aus Marburg sind oft in Nischenbereichen tätig — Pharmazie, Chemie, Rechtswissenschaften. Für diese Zielgruppe ist eine klare, fokussierte Landingpage besonders wichtig, um sich von Wettbewerbern abzuheben.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r an der Philipps-Universität Marburg arbeitest du in einer der traditionsreichsten akademischen Institutionen Deutschlands. Eine klare Online-Präsenz macht dein Fachwissen für Kunden außerhalb der Universität zugänglich.`,
  },
  jena: {
    uniIntro: `Jena ist eine kompakte Universitätsstadt mit großer Wirkung: Die Friedrich-Schiller-Universität Jena ist bekannt für ihre Stärke in Optik, Photonik und Lebenswissenschaften — und steht im Zentrum eines wachsenden Technologie-Ökosystems in Thüringen. Spin-offs und freie Akademiker aus diesem Umfeld haben herausragende Nischen-Expertise.`,
    spinOff: `Jenaer Spin-offs in der Optik- und Photonik-Branche — eine Region, die weltweit als Kompetenzcluster gilt — brauchen eine klare digitale Identität, um Kunden über das lokale Netzwerk hinaus zu erreichen.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r an der FSU Jena bringst du Spezialwissen in die Lehre, das außerhalb der Universität kommerziell verwertbar ist. Eine fokussierte Landingpage ist der erste Schritt zu einem eigenständigen Beratungsangebot.`,
  },
  // Switzerland
  zuerich: {
    uniIntro: `Zürich ist die akademische Spitze der Schweiz: Die Universität Zürich und die ETH Zürich gehören zu den weltweit führenden Hochschulen — und erzeugen eine Dichte an akademischem Talent, die international ihresgleichen sucht. Lehrbeauftragte, Forscher und Spin-off-Gründer aus diesem Umfeld haben enorme Marktchancen — wenn sie online sichtbar sind.`,
    spinOff: `ETH Zürich Spin-offs sind weltweit für ihre Innovationskraft bekannt. Trotzdem fehlt vielen die klare Kommunikation nach außen: Was bietest du an, für wen, und warum du? Eine gezielte Landingpage beantwortet diese Fragen.`,
    lehrbeauftragte: `Lehrbeauftragte an der Universität Zürich oder ETH Zürich verfügen über Expertise auf internationalem Niveau. Mit einer professionellen Online-Präsenz lässt sich dieses Kapital in eine erfolgreiche Selbstständigkeit übersetzen.`,
  },
  bern: {
    uniIntro: `Bern ist nicht nur Bundesstadt, sondern auch Universitätsstadt: Die Universität Bern vereint Rechts-, Sozial- und Naturwissenschaften in direkter Nähe zu den wichtigsten politischen Entscheidungszentren der Schweiz. Für freie Akademiker mit Beratungsangebot ist das ein einzigartiges Umfeld.`,
    spinOff: `Berner Spin-offs und Ausgründungen aus der Universität Bern — oft in den Bereichen Medizin, Recht oder Politikwissenschaften — profitieren von der Nähe zu Bundesbehörden und NGOs. Was fehlt: eine klare digitale Visitenkarte für externe Auftraggeber.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r an der Universität Bern arbeitest du in einem akademischen Umfeld mit direkter politischer Relevanz. Eine gezielte Landingpage macht dein Beratungsangebot sichtbar — für Kunden in Bundesbehörden, Verbänden und Unternehmen.`,
  },
  basel: {
    uniIntro: `Basel ist das Zentrum der Schweizer Pharmaindustrie und beherbergt eine der ältesten Universitäten der Welt: Die Universität Basel wurde 1460 gegründet und ist bis heute eine der forschungsstärksten Hochschulen im DACH-Raum. Freie Akademiker aus diesem Umfeld bewegen sich in einem einzigartigen Markt.`,
    spinOff: `Basel ist der ideale Standort für Life-Science-Spin-offs: Pharma-Konzerne, Biotech-Unternehmen und die Universität Basel bilden ein einzigartiges Ökosystem. Wer hier gründet oder berät, braucht eine klare Online-Identität, um aus der Masse herauszustechen.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r an der Universität Basel trägst du zu einer der traditionsreichsten Hochschulen Europas bei. Eine professionelle Landingpage macht dein Fachgebiet für potenzielle Kunden in der Pharmaindustrie und darüber hinaus greifbar.`,
  },
  "st-gallen": {
    uniIntro: `St. Gallen ist die Wirtschaftsuniversität der Schweiz: Die Universität St. Gallen (HSG) hat international einen ausgezeichneten Ruf in den Bereichen Wirtschaft, Recht und Sozialwissenschaften. Wer hier lehrt, forscht oder als Alumni berät, bewegt sich in einem exklusiven Netzwerk — das aber online kaum sichtbar ist.`,
    spinOff: `HSG-Spin-offs haben Zugang zu einem der wertvollsten Alumni-Netzwerke im deutschsprachigen Raum. Trotzdem brauchen sie eine klare Website, die ihr Angebot auch für Kunden außerhalb dieses Netzwerks verständlich macht.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r an der HSG St. Gallen bringst du Praxiswissen in eine der international anerkanntesten Wirtschaftshochschulen. Dieses Profil verdient eine Online-Präsenz, die seinem Wert entspricht.`,
  },
  luzern: {
    uniIntro: `Luzern ist ein aufstrebender akademischer Standort in der Zentralschweiz: Die Universität Luzern fokussiert auf Kultur, Gesellschaft, Recht und Wirtschaft — und bildet ein wachsendes Ökosystem für freie Akademiker, die Beratung und Forschung kombinieren.`,
    spinOff: `Spin-offs und Ausgründungen aus dem Luzerner Universitätsumfeld sind oft in Nischenbereichen tätig — Kulturwirtschaft, Recht, soziale Innovationen. Für diese Profile ist eine klare, differenzierte Landingpage besonders wichtig.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r an der Universität Luzern arbeitest du in einem Umfeld, das Tradition und Innovation verbindet. Eine gezielte Online-Präsenz macht dein Beratungsangebot für Kunden in der Region und darüber hinaus sichtbar.`,
  },
};

// ─── HTML Templates ───────────────────────────────────────────────────────────

function getUniContent(c) {
  const d = cityContent[c.slug] || {
    uniIntro: `${c.city} ist ein wichtiger Hochschulstandort im DACH-Raum: ${c.uni} prägen das akademische Leben der Stadt. Freie Akademiker, Lehrbeauftragte und Spin-off-Gründer aus diesem Umfeld haben wertvolles Wissen — aber oft keine klare Online-Präsenz.`,
    spinOff: `Spin-offs aus dem Universitätsumfeld in ${c.city} brauchen eine klare digitale Identität. Eine fokussierte Landingpage erklärt, was du anbietest, für wen — und warum du die richtige Person dafür bist.`,
    lehrbeauftragte: `Als Lehrbeauftragte/r in ${c.city} verfügst du über Expertise, die auch außerhalb der Hochschule gefragt ist. Mit einer professionellen Online-Präsenz machst du dein Angebot für neue Kunden und Partner sichtbar.`,
  };
  return d;
}

function renderUniPage(c) {
  const d = getUniContent(c);
  const filename = `landingpage-${c.slug}-universitaeten.html`;
  const canonical = `${BASE_URL}/${filename}`;
  const title = `Landingpage für Lehrbeauftragte & Forscher in ${c.city} | BertlClaw`;
  const desc = `Lehrbeauftragte, Forscher und Spin-off-Gründer in ${c.city}: Mit einer klaren Landingpage und Positionierung als selbstständige/r Akademiker/in online sichtbar werden. Für Angehörige von ${c.uni}.`;

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="de" href="${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${canonical}" />
  <link rel="icon" href="favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" href="bertlclaw-assets/logo-32.png" />
  <link rel="apple-touch-icon" href="bertlclaw-assets/logo-180.png" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <meta property="og:site_name" content="BertlClaw" />
  <meta property="og:locale" content="${c.locale}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Landingpage für Lehrbeauftragte & Forscher in ${c.city}",
    "description": "${desc}",
    "author": {"@type": "Organization", "name": "BertlClaw", "url": "https://bertlclaw.at/"},
    "publisher": {"@type": "Organization", "name": "BertlClaw", "url": "https://bertlclaw.at/"},
    "url": "${canonical}",
    "datePublished": "${TODAY}",
    "dateModified": "${TODAY}",
    "inLanguage": "${c.locale.replace('_', '-')}"
  }
  </script>
  <script data-goatcounter="https://bertlclaw.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
  <style>
    :root{--bg:#040712;--bg2:#09101d;--bg3:#0d1528;--panel:rgba(13,20,38,.76);--panel-strong:rgba(15,24,45,.90);--line:rgba(129,155,255,.14);--line-strong:rgba(124,156,255,.24);--text:#eef3ff;--muted:#afbadc;--muted2:#93a1c8;--accent:#8ea8ff;--accent2:#6ee7d8;--accent3:#c6b2ff;--shadow:0 30px 90px rgba(0,0,0,.45);--glow:0 0 0 1px rgba(124,156,255,.08), 0 0 45px rgba(124,156,255,.10);--radius:26px;--max:1240px}
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text);background:radial-gradient(circle at 10% 0%,rgba(124,156,255,.16),transparent 24%),radial-gradient(circle at 90% 8%,rgba(89,225,191,.10),transparent 24%),radial-gradient(circle at 50% 100%,rgba(164,143,255,.10),transparent 32%),linear-gradient(180deg,#040712 0%,#09101d 42%,#060915 100%)}
    body::before{content:"";position:fixed;inset:0;pointer-events:none;opacity:.55;background-image:linear-gradient(rgba(124,156,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,156,255,.03) 1px,transparent 1px);background-size:32px 32px;mask-image:radial-gradient(circle at center,rgba(0,0,0,.8),transparent 88%)}
    a{color:inherit;text-decoration:none}
    img{max-width:100%;display:block}
    .wrap{width:min(calc(100% - 32px),var(--max));margin:0 auto;position:relative;z-index:1}
    .nav{position:sticky;top:0;z-index:50;background:rgba(4,7,18,.78);backdrop-filter:blur(18px);border-bottom:1px solid var(--line);box-shadow:0 10px 34px rgba(0,0,0,.22)}
    .nav-inner{display:flex;justify-content:space-between;align-items:center;gap:18px;padding:14px 0}
    .brand{display:flex;align-items:center;gap:12px;font-weight:800;letter-spacing:.02em}
    .brand-mark{width:52px;height:52px;border-radius:16px;overflow:hidden;display:grid;place-items:center;background:linear-gradient(135deg,rgba(124,156,255,.16),rgba(110,231,216,.14));box-shadow:var(--shadow),0 0 0 1px rgba(124,156,255,.10),0 0 28px rgba(124,156,255,.12);border:1px solid rgba(255,255,255,.12);padding:5px}
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
    .accent-text{background:linear-gradient(135deg,#eef3ff 0%,#9db8ff 46%,#7cf0d6 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
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
    .card{padding:26px;border-radius:22px;border:1px solid var(--line);background:linear-gradient(180deg,rgba(18,26,47,.76),rgba(10,15,28,.72));box-shadow:var(--shadow);backdrop-filter:blur(8px)}
    .icon{width:48px;height:48px;border-radius:15px;display:grid;place-items:center;margin-bottom:14px;border:1px solid rgba(124,156,255,.22);background:linear-gradient(135deg,rgba(124,156,255,.18),rgba(89,225,191,.14));color:#e8f0ff;font-size:1.2rem}
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
    .link-card{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:22px 26px;border-radius:22px;border:1px solid rgba(124,156,255,.22);background:linear-gradient(135deg,rgba(124,156,255,.08),rgba(89,225,191,.05));box-shadow:var(--shadow);transition:.2s ease}
    .link-card:hover{transform:translateY(-2px);border-color:var(--line-strong)}
    .link-card-arrow{font-size:1.4rem;color:var(--accent2);flex:0 0 auto}
    .link-card p{margin:6px 0 0;color:var(--muted);font-size:.95rem;line-height:1.7}
    .cta-band{margin-top:18px;padding:36px;border-radius:26px;border:1px solid var(--line-strong);background:linear-gradient(135deg,rgba(124,156,255,.10),rgba(89,225,191,.08)),linear-gradient(180deg,rgba(18,26,47,.92),rgba(10,15,28,.88));box-shadow:var(--shadow),var(--glow);text-align:center}
    .cta-band h2{margin-bottom:12px}
    .cta-band p{color:var(--muted);line-height:1.8;margin:0 auto 24px;max-width:68ch}
    .cta-band .cta{justify-content:center}
    .footer{padding:38px 0 62px;text-align:center;color:var(--muted);font-size:.94rem}
    .footer-links{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:14px;font-size:.92rem}
    @media(max-width:860px){.nav-links{display:none}.mobile-nav-row{display:flex;gap:10px;overflow:auto;padding:0 0 12px}.mobile-nav-row a{white-space:nowrap;padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.03);color:var(--text);font-size:.92rem}.grid-3{grid-template-columns:1fr}}
    @media(max-width:768px){.grid-2{grid-template-columns:1fr}.cta-band{padding:24px 18px}.link-card{flex-direction:column;align-items:flex-start}.hero{padding:52px 0 28px}.section{padding:24px 0}}
    @media(max-width:640px){.nav{position:fixed;top:0;left:0;right:0;padding-top:env(safe-area-inset-top,0)}body{padding-top:118px}.nav-inner{display:grid;grid-template-columns:1fr;gap:12px}.nav-actions{justify-content:flex-start}.cta .btn{width:100%}.cta-band .cta .btn{width:100%}h1{font-size:2rem}}
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

  <header class="hero wrap">
    <div class="hero-inner">
      <span class="eyebrow">🎓 Für Lehrbeauftragte, Forscher & Spin-offs in ${c.city}</span>
      <h1 class="accent-text">Akademisches Wissen sichtbar machen — als Selbstständige/r in ${c.city}.</h1>
      <p class="lead">Du forschst, lehrst oder gründest aus dem Universitätsumfeld heraus — und weißt, dass dein Fachwissen auch außerhalb der Hochschule gefragt ist. Das Problem: Online findet dich kaum jemand. BertlClaw hilft dir, das zu ändern.</p>
      <div class="cta">
        <a class="btn btn-primary" href="erstgespraech.html">Kostenloses Erstgespräch</a>
        <a class="btn btn-secondary" href="services.html">Leistungen ansehen</a>
      </div>
    </div>
  </header>

  <main class="wrap">
    <section class="section">
      <div class="article-body">

        <h2>Akademischer Standort ${c.city}: ${c.uni}</h2>
        <p>${d.uniIntro}</p>

        <h2>Das Problem: Exzellente Expertise, schwache Sichtbarkeit</h2>
        <p>Die meisten Akademiker, die sich selbstständig machen, haben dasselbe Problem: Sie sind fachlich ausgezeichnet — aber online nicht auffindbar. Potenzielle Kunden suchen nach jemandem mit genau deinem Profil und landen trotzdem woanders. Nicht weil deine Kompetenz fehlt, sondern weil deine digitale Präsenz fehlt.</p>
        <p>Das ist kein Vorwurf — es ist die Realität für viele, die aus dem Universitätsumfeld kommen. Der Fokus lag jahrelang auf Forschung, Lehre, Publikationen. Marketing war kein Thema. Jetzt ist es eines.</p>

        <h2>Spin-offs aus ${c.city}: Klare Kommunikation von Anfang an</h2>
        <p>${d.spinOff}</p>
        <p>Was genau fehlt, ist meistens nicht schwer zu benennen:</p>
        <ul>
          <li>Eine klare Beschreibung, was du anbietest — in Nicht-Akademiker-Sprache</li>
          <li>Eine Website oder Landingpage, die aus Besuchern Anfragen macht</li>
          <li>Ein LinkedIn-Profil, das dein Angebot auf Anhieb verständlich macht</li>
          <li>Eine Positionierung, die erklärt: für wen du arbeitest, und warum gerade du</li>
        </ul>

        <h2>Lehrbeauftragte als freie Unternehmer</h2>
        <p>${d.lehrbeauftragte}</p>
        <p>Lehrbeauftragte sind oft die am stärksten vernetzten — und gleichzeitig die am schlechtesten positionierten Selbstständigen. Ihr Wissen ist gefragt, aber ihre Sichtbarkeit ist minimal. Das lässt sich ändern — mit einer gezielten Landingpage und einer klaren Positionierung, die erklärt: Was bietest du an? Für wen? Und wie nimmt man mit dir Kontakt auf?</p>

        <h2>Was BertlClaw für dich tut</h2>
        <p>BertlClaw spezialisiert sich auf Selbstständige, die online sichtbar werden wollen — darunter viele aus dem akademischen Umfeld. Das Angebot:</p>
        <ul>
          <li><strong>Positionierungs-Sprint:</strong> Wir erarbeiten gemeinsam, wer du bist, für wen du arbeitest, und was dich unterscheidet — in klarer Sprache, nicht in Akademiker-Jargon.</li>
          <li><strong>Landingpage Sprint:</strong> Eine fokussierte Seite, die erklärt, was du anbietest — und Besucher zu Anfragen macht. Keine mehrseitige Website-Bürokratie, sondern das, was wirkt.</li>
          <li><strong>LinkedIn-Optimierung:</strong> Dein Profil als digitale Visitenkarte, die auf den ersten Blick klar macht, was du anbietest und für wen.</li>
        </ul>
        <p>Das Ergebnis: Du bist online auffindbar für genau die Kunden, die du erreichen willst — ob Unternehmen, NGOs, Behörden oder andere Akademiker.</p>

        <h2>Der erste Schritt: Ein kostenloses Erstgespräch</h2>
        <p>Im Erstgespräch schauen wir gemeinsam, wo bei dir der größte Hebel liegt. Was fehlt in deiner Online-Präsenz? Wo verlierst du potenzielle Kunden? Und was können wir schnell und konkret ändern? Kein Verkaufsdruck, kein Vorgespräch nötig — einfach 30 Minuten, die Klarheit bringen.</p>

      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <span class="micro-label">Verwandter Artikel</span>
        <h2>Selbstständige: Mehr Kunden online finden</h2>
        <p>Die wichtigsten Hebel für Selbstständige, die online sichtbar werden wollen — von Positionierung über Landingpage bis LinkedIn.</p>
      </div>
      <a class="link-card" href="selbststaendige-mehr-kunden.html">
        <div>
          <h3 style="margin:0 0 6px">Online nicht sichtbar — obwohl du richtig gut bist →</h3>
          <p>Wie Selbstständige mit klarer Positionierung, Website und LinkedIn online die richtigen Kunden finden.</p>
        </div>
        <span class="link-card-arrow">→</span>
      </a>
    </section>

    <section class="section">
      <div class="cta-band">
        <span class="micro-label">Jetzt starten</span>
        <h2>Bereit, als Akademiker/in online sichtbar zu werden?</h2>
        <p>Im kostenlosen Erstgespräch schauen wir gemeinsam, wo bei dir der größte Hebel liegt — ob Positionierung, Landingpage oder beides. Für Lehrbeauftragte, Forscher und Spin-off-Gründer in ${c.city}.</p>
        <div class="cta">
          <a class="btn btn-primary" href="erstgespraech.html">Erstgespräch vereinbaren</a>
          <a class="btn btn-secondary" href="services.html">Leistungen ansehen</a>
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
    BertlClaw · Landingpage für Lehrbeauftragte &amp; Forscher in ${c.city}
  </footer>
</body>
</html>`;
}

// ─── Hochschulen variant (FH-focused) ─────────────────────────────────────────

// FH names per city (fallback to city name)
const fhNames = {
  wien: "FH Wien, FH Technikum Wien, FH Campus Wien",
  graz: "FH JOANNEUM Graz",
  linz: "FH Oberösterreich (Campus Linz/Steyr/Wels/Hagenberg)",
  salzburg: "FH Salzburg",
  innsbruck: "MCI Innsbruck, FH Gesundheit Tirol",
  klagenfurt: "FH Kärnten",
  berlin: "HTW Berlin, Beuth Hochschule (HTW Berlin), HWR Berlin",
  muenchen: "Hochschule München, HM, TH Ingolstadt",
  hamburg: "HAW Hamburg, HafenCity Universität",
  frankfurt: "Frankfurt University of Applied Sciences, Hochschule Rhein-Main",
  koeln: "TH Köln, FH Aachen (Außenstelle)",
  stuttgart: "HdM Stuttgart, Hochschule Esslingen",
  heidelberg: "SRH Hochschule Heidelberg",
  freiburg: "Hochschule Freiburg (EAH)",
  tuebingen: "Hochschule Reutlingen, Hochschule Albstadt-Sigmaringen",
  goettingen: "HAWK Göttingen",
  leipzig: "HTWK Leipzig, Hochschule für Technik, Wirtschaft und Kultur",
  dresden: "HTW Dresden, Hochschule für Technik und Wirtschaft Dresden",
  hannover: "Hochschule Hannover, HMTM Hannover",
  marburg: "THM (Technische Hochschule Mittelhessen)",
  jena: "EAH Jena (Ernst-Abbe-Hochschule)",
  zuerich: "ZHAW Zürich, ZHdK, BFH",
  bern: "BFH (Berner Fachhochschule)",
  basel: "FHNW (Fachhochschule Nordwestschweiz)",
  "st-gallen": "FHS St. Gallen (OST)",
  luzern: "Hochschule Luzern (HSLU)",
};

function renderHochschulePage(c) {
  const fh = fhNames[c.slug] || `Fachhochschule ${c.city}`;
  const filename = `landingpage-${c.slug}-hochschulen.html`;
  const canonical = `${BASE_URL}/${filename}`;
  const title = `Landingpage für Selbstständige an Hochschulen in ${c.city} | BertlClaw`;
  const desc = `Lehrende, Forscher und Gründer aus Fachhochschulen in ${c.city} (${fh}): Mit einer klaren Landingpage als selbstständige/r Akademiker/in online sichtbar werden.`;

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="de" href="${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${canonical}" />
  <link rel="icon" href="favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" href="bertlclaw-assets/logo-32.png" />
  <link rel="apple-touch-icon" href="bertlclaw-assets/logo-180.png" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <meta property="og:site_name" content="BertlClaw" />
  <meta property="og:locale" content="${c.locale}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Landingpage für Selbstständige an Hochschulen in ${c.city}",
    "description": "${desc}",
    "author": {"@type": "Organization", "name": "BertlClaw", "url": "https://bertlclaw.at/"},
    "publisher": {"@type": "Organization", "name": "BertlClaw", "url": "https://bertlclaw.at/"},
    "url": "${canonical}",
    "datePublished": "${TODAY}",
    "dateModified": "${TODAY}",
    "inLanguage": "${c.locale.replace('_', '-')}"
  }
  </script>
  <script data-goatcounter="https://bertlclaw.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
  <style>
    :root{--bg:#040712;--bg2:#09101d;--bg3:#0d1528;--panel:rgba(13,20,38,.76);--panel-strong:rgba(15,24,45,.90);--line:rgba(129,155,255,.14);--line-strong:rgba(124,156,255,.24);--text:#eef3ff;--muted:#afbadc;--muted2:#93a1c8;--accent:#8ea8ff;--accent2:#6ee7d8;--accent3:#c6b2ff;--shadow:0 30px 90px rgba(0,0,0,.45);--glow:0 0 0 1px rgba(124,156,255,.08), 0 0 45px rgba(124,156,255,.10);--radius:26px;--max:1240px}
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text);background:radial-gradient(circle at 10% 0%,rgba(124,156,255,.16),transparent 24%),radial-gradient(circle at 90% 8%,rgba(89,225,191,.10),transparent 24%),radial-gradient(circle at 50% 100%,rgba(164,143,255,.10),transparent 32%),linear-gradient(180deg,#040712 0%,#09101d 42%,#060915 100%)}
    body::before{content:"";position:fixed;inset:0;pointer-events:none;opacity:.55;background-image:linear-gradient(rgba(124,156,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,156,255,.03) 1px,transparent 1px);background-size:32px 32px;mask-image:radial-gradient(circle at center,rgba(0,0,0,.8),transparent 88%)}
    a{color:inherit;text-decoration:none}
    img{max-width:100%;display:block}
    .wrap{width:min(calc(100% - 32px),var(--max));margin:0 auto;position:relative;z-index:1}
    .nav{position:sticky;top:0;z-index:50;background:rgba(4,7,18,.78);backdrop-filter:blur(18px);border-bottom:1px solid var(--line);box-shadow:0 10px 34px rgba(0,0,0,.22)}
    .nav-inner{display:flex;justify-content:space-between;align-items:center;gap:18px;padding:14px 0}
    .brand{display:flex;align-items:center;gap:12px;font-weight:800;letter-spacing:.02em}
    .brand-mark{width:52px;height:52px;border-radius:16px;overflow:hidden;display:grid;place-items:center;background:linear-gradient(135deg,rgba(124,156,255,.16),rgba(110,231,216,.14));box-shadow:var(--shadow),0 0 0 1px rgba(124,156,255,.10),0 0 28px rgba(124,156,255,.12);border:1px solid rgba(255,255,255,.12);padding:5px}
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
    .accent-text{background:linear-gradient(135deg,#eef3ff 0%,#9db8ff 46%,#7cf0d6 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
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
    .card{padding:26px;border-radius:22px;border:1px solid var(--line);background:linear-gradient(180deg,rgba(18,26,47,.76),rgba(10,15,28,.72));box-shadow:var(--shadow);backdrop-filter:blur(8px)}
    .icon{width:48px;height:48px;border-radius:15px;display:grid;place-items:center;margin-bottom:14px;border:1px solid rgba(124,156,255,.22);background:linear-gradient(135deg,rgba(124,156,255,.18),rgba(89,225,191,.14));color:#e8f0ff;font-size:1.2rem}
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
    .link-card{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:22px 26px;border-radius:22px;border:1px solid rgba(124,156,255,.22);background:linear-gradient(135deg,rgba(124,156,255,.08),rgba(89,225,191,.05));box-shadow:var(--shadow);transition:.2s ease}
    .link-card:hover{transform:translateY(-2px);border-color:var(--line-strong)}
    .link-card-arrow{font-size:1.4rem;color:var(--accent2);flex:0 0 auto}
    .link-card p{margin:6px 0 0;color:var(--muted);font-size:.95rem;line-height:1.7}
    .cta-band{margin-top:18px;padding:36px;border-radius:26px;border:1px solid var(--line-strong);background:linear-gradient(135deg,rgba(124,156,255,.10),rgba(89,225,191,.08)),linear-gradient(180deg,rgba(18,26,47,.92),rgba(10,15,28,.88));box-shadow:var(--shadow),var(--glow);text-align:center}
    .cta-band h2{margin-bottom:12px}
    .cta-band p{color:var(--muted);line-height:1.8;margin:0 auto 24px;max-width:68ch}
    .cta-band .cta{justify-content:center}
    .footer{padding:38px 0 62px;text-align:center;color:var(--muted);font-size:.94rem}
    .footer-links{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:14px;font-size:.92rem}
    @media(max-width:860px){.nav-links{display:none}.mobile-nav-row{display:flex;gap:10px;overflow:auto;padding:0 0 12px}.mobile-nav-row a{white-space:nowrap;padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.03);color:var(--text);font-size:.92rem}.grid-3{grid-template-columns:1fr}}
    @media(max-width:768px){.grid-2{grid-template-columns:1fr}.cta-band{padding:24px 18px}.link-card{flex-direction:column;align-items:flex-start}.hero{padding:52px 0 28px}.section{padding:24px 0}}
    @media(max-width:640px){.nav{position:fixed;top:0;left:0;right:0;padding-top:env(safe-area-inset-top,0)}body{padding-top:118px}.nav-inner{display:grid;grid-template-columns:1fr;gap:12px}.nav-actions{justify-content:flex-start}.cta .btn{width:100%}.cta-band .cta .btn{width:100%}h1{font-size:2rem}}
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

  <header class="hero wrap">
    <div class="hero-inner">
      <span class="eyebrow">🏫 Für Lehrende & Gründer an Hochschulen in ${c.city}</span>
      <h1 class="accent-text">Von der Hochschule in die Selbstständigkeit — mit klarer Online-Präsenz in ${c.city}.</h1>
      <p class="lead">Fachhochschulen wie ${fh} bringen praxisnahes Wissen in die Lehre — und ihre Lehrenden oft in freie Tätigkeiten. BertlClaw hilft dir, dieses Wissen als Selbstständige/r online sichtbar zu machen.</p>
      <div class="cta">
        <a class="btn btn-primary" href="erstgespraech.html">Kostenloses Erstgespräch</a>
        <a class="btn btn-secondary" href="services.html">Leistungen ansehen</a>
      </div>
    </div>
  </header>

  <main class="wrap">
    <section class="section">
      <div class="article-body">

        <h2>Hochschulen in ${c.city}: Praxisnah und selbstständig</h2>
        <p>Fachhochschulen und angewandte Universitäten wie ${fh} zeichnen sich durch einen starken Praxisbezug aus. Viele Lehrende kommen aus der Industrie, beraten nebenbei oder gründen eigene Unternehmen. Genau dieses Profil — Praxis-Expertise mit akademischem Hintergrund — ist am Markt hochgefragt.</p>
        <p>Das Problem: Diese Gruppe ist online meist kaum sichtbar. Kein klares Angebot auf einer Website, kein LinkedIn-Profil das erklärt, was man außerhalb der Hochschule tut — und damit keine eingehenden Anfragen.</p>

        <h2>Warum Hochschul-Lehrende oft unsichtbar bleiben</h2>
        <p>Die meisten FH-Lehrbeauftragten und Professoren haben ihren Fokus auf Lehre und Projektarbeit — nicht auf Selbstvermarktung. Das ist verständlich, aber es kostet Kunden. Wer googelt, findet nicht dich, sondern den Wettbewerber mit der besseren Online-Präsenz.</p>
        <ul>
          <li>Kein klares Online-Angebot für externe Kunden</li>
          <li>LinkedIn-Profil sagt "Professor" statt "Berater für X"</li>
          <li>Keine Landingpage, die Anfragen generiert</li>
          <li>Positionierung zu vage: "Ich helfe Unternehmen mit…"</li>
        </ul>

        <h2>Spin-offs und Ausgründungen aus ${c.city}</h2>
        <p>Fachhochschulen sind Brutstätten für praxisnahe Gründungen. Wer aus dem FH-Umfeld in ${c.city} gründet, bringt anwendungsorientiertes Wissen mit — und braucht von Anfang an eine klare digitale Identität. Investoren, Kunden und Partner googeln zuerst, bevor sie anrufen.</p>
        <p>Eine klare Landingpage, die erklärt was du anbietest, für wen und warum du — ist kein Nice-to-have, sondern der erste echte Vertriebskanal.</p>

        <h2>Was BertlClaw für dich tut</h2>
        <p>BertlClaw arbeitet mit Selbstständigen, die online sichtbar werden wollen — darunter viele aus dem Hochschulumfeld. Konkret:</p>
        <ul>
          <li><strong>Positionierungs-Sprint:</strong> Klarheit darüber, wer du bist, für wen du arbeitest und was dich unterscheidet.</li>
          <li><strong>Landingpage Sprint:</strong> Eine fokussierte Seite, die Anfragen generiert — nicht nur informiert.</li>
          <li><strong>LinkedIn-Optimierung:</strong> Dein Profil wird zur Visitenkarte, die auf Anhieb klar macht, was du anbietest.</li>
        </ul>
        <p>Das Ergebnis: Du bist online auffindbar — für Unternehmen, die jemanden mit genau deiner Expertise suchen.</p>

        <h2>Nächster Schritt: Kostenloses Erstgespräch</h2>
        <p>Im Erstgespräch schauen wir, wo bei dir der größte Hebel liegt. Wo verlierst du potenzielle Kunden? Was kann schnell und konkret verbessert werden? 30 Minuten, die Klarheit bringen — ohne Verkaufsdruck.</p>

      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <span class="micro-label">Verwandter Artikel</span>
        <h2>Für Lehrbeauftragte an Universitäten in ${c.city}</h2>
        <p>Du bist an einer Universität tätig? Hier findest du die spezifische Seite für universitäre Lehrbeauftragte und Forscher.</p>
      </div>
      <a class="link-card" href="landingpage-${c.slug}-universitaeten.html">
        <div>
          <h3 style="margin:0 0 6px">Landingpage für Lehrbeauftragte & Forscher in ${c.city} →</h3>
          <p>Speziell für Angehörige von ${c.uni} und anderen Universitäten in ${c.city}.</p>
        </div>
        <span class="link-card-arrow">→</span>
      </a>
    </section>

    <section class="section">
      <div class="cta-band">
        <span class="micro-label">Jetzt starten</span>
        <h2>Bereit, als Hochschul-Experte/in online sichtbar zu werden?</h2>
        <p>Im kostenlosen Erstgespräch schauen wir gemeinsam, wo bei dir der größte Hebel liegt. Für Lehrende, Gründer und freie Akademiker aus dem FH-Umfeld in ${c.city}.</p>
        <div class="cta">
          <a class="btn btn-primary" href="erstgespraech.html">Erstgespräch vereinbaren</a>
          <a class="btn btn-secondary" href="services.html">Leistungen ansehen</a>
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
    BertlClaw · Landingpage für Hochschul-Lehrende in ${c.city}
  </footer>
</body>
</html>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const outDir = path.join(__dirname, '..');

// Generate uni pages for all cities
let uniCount = 0;
for (const c of allCities) {
  const html = renderUniPage(c);
  const outPath = path.join(outDir, `landingpage-${c.slug}-universitaeten.html`);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`✓ ${path.basename(outPath)}`);
  uniCount++;
}

// Generate Hochschule pages for all cities (same list)
let fhCount = 0;
for (const c of allCities) {
  const html = renderHochschulePage(c);
  const outPath = path.join(outDir, `landingpage-${c.slug}-hochschulen.html`);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`✓ ${path.basename(outPath)}`);
  fhCount++;
}

console.log(`\n✅ Done: ${uniCount} universitaeten pages + ${fhCount} hochschulen pages`);
