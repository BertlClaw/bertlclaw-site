#!/usr/bin/env node
/**
 * generate-local-pages.js
 * Generates local SEO landing pages for Austrian cities.
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE = path.resolve(__dirname, '..');

const austrianCities = [
  {city: "Salzburg", slug: "salzburg", region: "Salzburg"},
  {city: "Innsbruck", slug: "innsbruck", region: "Tirol"},
  {city: "Klagenfurt", slug: "klagenfurt", region: "Kärnten"},
  {city: "Villach", slug: "villach", region: "Kärnten"},
  {city: "Wels", slug: "wels", region: "Oberösterreich"},
  {city: "St. Pölten", slug: "st-poelten", region: "Niederösterreich"},
  {city: "Dornbirn", slug: "dornbirn", region: "Vorarlberg"},
  {city: "Wiener Neustadt", slug: "wiener-neustadt", region: "Niederösterreich"},
  {city: "Steyr", slug: "steyr", region: "Oberösterreich"},
  {city: "Feldkirch", slug: "feldkirch", region: "Vorarlberg"},
  {city: "Bregenz", slug: "bregenz", region: "Vorarlberg"},
  {city: "Leonding", slug: "leonding", region: "Oberösterreich"},
  {city: "Klosterneuburg", slug: "klosterneuburg", region: "Niederösterreich"},
  {city: "Baden", slug: "baden", region: "Niederösterreich"},
  {city: "Wolfsberg", slug: "wolfsberg", region: "Kärnten"},
  {city: "Leoben", slug: "leoben", region: "Steiermark"},
  {city: "Krems", slug: "krems", region: "Niederösterreich"},
  {city: "Traun", slug: "traun", region: "Oberösterreich"},
  {city: "Amstetten", slug: "amstetten", region: "Niederösterreich"},
  {city: "Lustenau", slug: "lustenau", region: "Vorarlberg"},
  {city: "Kapfenberg", slug: "kapfenberg", region: "Steiermark"},
  {city: "Mödling", slug: "moedling", region: "Niederösterreich"},
  {city: "Hallein", slug: "hallein", region: "Salzburg"},
  {city: "Kufstein", slug: "kufstein", region: "Tirol"},
  {city: "Ternitz", slug: "ternitz", region: "Niederösterreich"},
  {city: "Traiskirchen", slug: "traiskirchen", region: "Niederösterreich"},
  {city: "Schwechat", slug: "schwechat", region: "Niederösterreich"},
  {city: "Braunau am Inn", slug: "braunau", region: "Oberösterreich"},
  {city: "Stockerau", slug: "stockerau", region: "Niederösterreich"},
  {city: "Spittal an der Drau", slug: "spittal", region: "Kärnten"},
];

// City-specific intros and contextual flavour text
const cityContext = {
  "salzburg": {
    intro: "Salzburg ist eine der bekanntesten Städte Österreichs — Mozartkugeln, Festspiele, Tourismus. Aber hinter der Kulisse der Altstadt arbeiten hunderte Selbstständige und Kleinunternehmen, die nichts mit Tourismus zu tun haben: Coaches, Berater, Therapeuten, Grafiker, Handwerker, Freelancer aller Art. Und viele davon kämpfen mit demselben Problem: Sie sind fachlich top — aber online kaum sichtbar.",
    local1: "In Salzburg ist der Wettbewerb unter Dienstleistern intensiver als man denkt. Die Nähe zu Deutschland und die gut vernetzte lokale Wirtschaft sorgen dafür, dass Anfragen oft an jene gehen, die klarer kommunizieren — nicht unbedingt an die Besten.",
    local2: "Viele Selbstständige im Raum Salzburg verlassen sich noch auf Empfehlungen aus dem Freundes- und Bekanntenkreis. Das funktioniert eine Weile — aber es skaliert nicht. Wer in Salzburg dauerhaft Neukunden gewinnen will, braucht eine Online-Präsenz, die auch dann arbeitet, wenn man selbst schläft.",
    local3: "Die gute Nachricht: BertlClaw arbeitet vollständig remote und betreut Selbstständige und kleine Unternehmen in ganz Österreich — also auch in Salzburg. Kein Bürotermin notwendig, kein Anfahrtsweg. Alles läuft digital, effizient und auf den Punkt.",
  },
  "innsbruck": {
    intro: "Innsbruck ist mehr als die Landeshauptstadt Tirols — es ist ein pulsierendes Zentrum für Dienstleister, Kreative und Selbstständige in den Alpen. Die Universität sorgt für gut ausgebildete Fachkräfte, viele davon wagen den Schritt in die Selbstständigkeit. Doch online sichtbar zu werden ist in Innsbruck genauso eine Herausforderung wie überall sonst in Österreich.",
    local1: "In Tirol ist persönliche Vernetzung stark — Stammtische, Kammern, Netzwerkveranstaltungen. Das ist wertvoll, reicht aber allein nicht mehr. Wer in Innsbruck als Selbstständige/r langfristig wachsen will, braucht eine digitale Präsenz, die seinen Namen auch außerhalb des persönlichen Netzwerks bekannt macht.",
    local2: "Besonders Coaches, Berater und Freelancer in Innsbruck haben das Problem: Ihr Angebot ist erklärungsbedürftig, und ohne eine klare Website fehlt der erste Eindruck, der überzeugt. Potenzielle Kunden googeln — und wenn sie dich nicht finden oder deine Seite nicht überzeugt, landen sie beim Nächsten.",
    local3: "BertlClaw arbeitet remote und unterstützt Selbstständige in ganz Österreich, Tirol inklusive. Egal ob du in Innsbruck, Hall in Tirol oder sonst wo in der Region bist — das Erstgespräch ist kostenlos und findet digital statt. Keine Anfahrt, kein Aufwand.",
  },
  "klagenfurt": {
    intro: "Klagenfurt am Wörthersee ist die Landeshauptstadt Kärntens und ein wichtiger Wirtschaftsstandort im Süden Österreichs. Die Stadt hat eine lebhafte Selbstständigenszene — von Beratern über Handwerker bis hin zu IT-Freelancern und kreativen Dienstleistern. Wer hier am Markt erfolgreich sein will, braucht mehr als gute Qualität: Er braucht eine klare Botschaft online.",
    local1: "Kärnten hat eine besondere Lage: Nähe zu Slowenien und Italien, internationale Einflüsse, aber auch ein starkes regionales Bewusstsein. Selbstständige in Klagenfurt arbeiten oft für lokale Kunden — und trotzdem entscheidet der erste Google-Treffer darüber, ob man angerufen wird oder nicht.",
    local2: "Eine Landingpage, die klar kommuniziert wer du bist, für wen du arbeitest und was dein Angebot konkret leistet, ist in Klagenfurt genauso entscheidend wie in Wien. Oft unterschätzen Selbstständige, wie viel ein schlechter erster Online-Eindruck kostet — nicht in Euro, sondern in verpassten Anfragen.",
    local3: "BertlClaw ist remote tätig und begleitet Selbstständige in ganz Österreich — selbstverständlich auch in Klagenfurt und dem gesamten Raum Kärnten. Alles digital, kein Vor-Ort-Termin nötig. Das Erstgespräch ist kostenlos.",
  },
  "villach": {
    intro: "Villach ist Kärntens zweitgrößte Stadt und ein wichtiger Knotenpunkt im Dreiländereck Österreich–Italien–Slowenien. Diese Lage macht Villach interessant für Unternehmen und Selbstständige mit internationalem Blick — gleichzeitig ist die lokale Konkurrenz real. Wer als Freiberufler oder kleines Unternehmen in Villach sichtbar sein will, braucht online eine klare Stimme.",
    local1: "In Villach und dem Kärntner Zentralraum gibt es viele Selbstständige, die handwerkliche, beratende oder kreative Dienstleistungen anbieten. Der gemeinsame Nenner: Zu wenig Anfragen, obwohl die Qualität stimmt. Das liegt fast immer daran, dass die Online-Präsenz nicht kommuniziert, was sie kommunizieren müsste.",
    local2: "Eine gut gemachte Landingpage ist in Villach kein Luxus — sie ist die Grundausstattung für alle, die Neukunden gewinnen wollen. Der Landingpage Sprint von BertlClaw schafft genau das: Eine fokussierte Seite, die erklärt was du tust, für wen, und warum du die richtige Wahl bist.",
    local3: "BertlClaw arbeitet vollständig remote. Ob Villach, Klagenfurt oder irgendwo sonst in Kärnten — die Zusammenarbeit ist digital, unkompliziert und auf das Ergebnis ausgerichtet. Kein Bürotermin, kein Hin- und Herschicken von Unterlagen.",
  },
  "wels": {
    intro: "Wels ist nach Linz die größte Stadt Oberösterreichs und ein bedeutender Wirtschaftsstandort — bekannt für seine Messen, den Handel und eine starke mittelständische Unternehmenslandschaft. Auch Selbstständige und Freelancer haben sich hier einen festen Platz erarbeitet. Aber: Online-Sichtbarkeit ist auch in Wels keine Selbstverständlichkeit.",
    local1: "Oberösterreich hat eine starke Wirtschaftsmentalität — pragmatisch, ergebnisorientiert, ohne viel Schnickschnack. Genau das spiegelt BertlClaw in seiner Arbeitsweise wider: keine langen Prozesse, kein Agentur-Overhead, sondern klare Leistung in kurzer Zeit. Für Selbstständige in Wels ist das ein echter Vorteil.",
    local2: "Viele Selbstständige in Wels haben ein gutes Netzwerk in der Region — aber das trägt nur so weit. Wer über die eigene Blase hinauswachsen will, braucht eine Website, die auch Fremde überzeugt. Eine Landingpage, die auf den Punkt bringt, was du anbietest und warum du die richtige Wahl bist.",
    local3: "BertlClaw unterstützt Selbstständige und kleine Unternehmen in ganz Österreich — also auch in Wels und dem gesamten Raum Oberösterreich. Die Zusammenarbeit läuft vollständig remote. Das Erstgespräch ist kostenlos und unverbindlich.",
  },
  "st-poelten": {
    intro: "St. Pölten ist Niederösterreichs Landeshauptstadt und wächst als Wirtschafts- und Kulturstandort kontinuierlich. Die Nähe zu Wien macht die Stadt attraktiv — gleichzeitig schärft sie den Wettbewerb: Selbstständige in St. Pölten konkurrieren nicht nur lokal, sondern auch mit Anbietern aus der Bundeshauptstadt. Wer dabei vorne landen will, braucht eine klare Online-Präsenz.",
    local1: "In der Region Niederösterreich rund um St. Pölten gibt es eine wachsende Zahl von Freelancern, Coaches und Beratern, die qualitativ hochwertige Dienstleistungen anbieten. Das Problem: Online sehen sie oft alle gleich aus. Eine individuelle Positionierung und eine starke Landingpage machen den Unterschied.",
    local2: "Der Positionierungs-Sprint von BertlClaw hilft dir, in wenigen Tagen herauszuarbeiten, was dich von anderen unterscheidet — damit du in St. Pölten und darüber hinaus die richtigen Kunden ansprichst. Klar positioniert fällst du auf, auch wenn der Markt eng ist.",
    local3: "BertlClaw ist remote tätig und begleitet Selbstständige in ganz Österreich — inklusive St. Pölten und dem gesamten Raum Niederösterreich. Alles digital, ohne Anfahrtswege. Das Erstgespräch ist kostenlos.",
  },
  "dornbirn": {
    intro: "Dornbirn ist die bevölkerungsreichste Stadt Vorarlbergs und ein wirtschaftliches Schwergewicht im Westen Österreichs. Die Region ist bekannt für ihre Unternehmensdichte, die Nähe zur Schweiz und Deutschland sowie eine ausgeprägte Gründerkultur. Wer in Dornbirn als Selbstständige/r tätig ist, hat starke Mitbewerber — und braucht deshalb einen klaren, überzeugenden Online-Auftritt.",
    local1: "Vorarlberg hat eine besondere Wirtschaftskultur: pragmatisch, qualitätsbewusst, mit hohem Anspruch. Kunden in der Region erwarten das auch online — eine Website, die professionell wirkt, klar kommuniziert und schnell auf den Punkt kommt. Wer das nicht liefert, verliert potenzielle Aufträge, bevor das erste Gespräch stattfindet.",
    local2: "Viele Selbstständige in Dornbirn sind in ihrer Nische fachlich exzellent — aber ihr Online-Auftritt erzählt das nicht. Mit einem Landingpage Sprint schafft BertlClaw in kurzer Zeit eine Seite, die genau das kommuniziert: dein Angebot, deine Zielgruppe, dein Mehrwert.",
    local3: "BertlClaw ist remote aktiv und arbeitet mit Selbstständigen in ganz Österreich zusammen — natürlich auch in Dornbirn und dem Vorarlberger Rheintal. Keine Vor-Ort-Termine notwendig. Das Erstgespräch ist kostenlos und digital.",
  },
  "wiener-neustadt": {
    intro: "Wiener Neustadt ist eine der dynamischsten Städte Niederösterreichs — nicht nur als Industriestandort, sondern auch als Heimat für viele Selbstständige und kleine Unternehmen. Die Nähe zu Wien bringt Chancen, aber auch Druck: Wer in Wiener Neustadt als Freiberufler oder Dienstleister wachsen will, muss online überzeugend auftreten.",
    local1: "In der Region um Wiener Neustadt gibt es viele gut ausgebildete Selbstständige — Trainer, Berater, Therapeuten, IT-Freelancer — die ihre Dienstleistungen professionell anbieten, aber online kaum zu finden sind. Das ist verschenktes Potenzial, das sich mit der richtigen Landingpage schnell verändern lässt.",
    local2: "Wer in Wiener Neustadt Kunden gewinnen will, muss in der Googlesuche auftauchen und dann mit einer klaren Botschaft überzeugen. Der Landingpage Sprint liefert genau das: Eine Seite, die erklärt was du tust, wem du hilfst, und warum du die richtige Wahl bist — ohne Schnickschnack.",
    local3: "BertlClaw arbeitet vollständig remote und betreut Selbstständige in ganz Österreich, darunter auch in Wiener Neustadt und dem Raum Niederösterreich. Kein Vor-Ort-Termin, keine Umstände. Das Erstgespräch ist kostenlos.",
  },
  "steyr": {
    intro: "Steyr ist eine der ältesten Industriestädte Österreichs und heute ein vielfältiger Wirtschaftsstandort in Oberösterreich. Neben dem klassischen Gewerbe hat sich eine aktive Selbstständigenszene etabliert — Berater, Therapeuten, Kreative, Handwerker. Doch auch in Steyr gilt: Ohne klare Online-Präsenz bleiben Kunden aus, egal wie gut man ist.",
    local1: "In Oberösterreich — und Steyr ist ein gutes Beispiel dafür — schätzen Kunden Direktheit und Verlässlichkeit. Das sollte sich auch in deiner Website widerspiegeln. Eine Landingpage, die sofort auf den Punkt kommt, signalisiert genau das: Du weißt, was du tust, und du respektierst die Zeit deiner Kunden.",
    local2: "Viele Selbstständige in Steyr kennen ihre Stärken, finden aber keine klaren Worte dafür. Genau da setzt der Positionierungs-Sprint von BertlClaw an: In kurzer Zeit erarbeitest du gemeinsam mit uns eine Positionierung, die auch andere verstehen und weitererzählen können.",
    local3: "BertlClaw ist remote tätig — Selbstständige und kleine Unternehmen in ganz Österreich, also auch in Steyr und dem Raum Oberösterreich, werden digital betreut. Das Erstgespräch ist kostenlos, unverbindlich und findet online statt.",
  },
  "feldkirch": {
    intro: "Feldkirch ist eine der ältesten Städte Vorarlbergs und bekannt für ihre mittelalterliche Altstadt und ihre Lage an der Grenze zu Liechtenstein und der Schweiz. Diese Grenzlage macht Feldkirch besonders: Selbstständige hier sind oft international vernetzt — und trotzdem entscheidet die eigene Website darüber, ob Anfragen ankommen oder nicht.",
    local1: "Im Vorarlberger Unterland rund um Feldkirch sind viele Selbstständige aktiv, die Qualitätsarbeit leisten. Aber Qualität muss auch kommuniziert werden. Wer online nicht klar zeigt, was er anbietet und für wen, verliert potenzielle Kunden, noch bevor ein erstes Gespräch stattfindet.",
    local2: "Eine fokussierte Landingpage ist der direkteste Weg, um aus Online-Besuchern echte Anfragen zu machen. Der Landingpage Sprint von BertlClaw liefert eine klare, überzeugende Seite — schnell, ohne langen Agentur-Prozess, mit Texten die wirklich wirken.",
    local3: "BertlClaw arbeitet remote und betreut Selbstständige und Kleinunternehmen in ganz Österreich — also auch in Feldkirch und dem gesamten Vorarlberg. Keine Anfahrt, keine Umstände. Das Erstgespräch ist kostenlos.",
  },
  "bregenz": {
    intro: "Bregenz, die Landeshauptstadt Vorarlbergs am Bodensee, ist ein besonderer Ort: klein, aber international verbunden — mit der Schweiz, Deutschland und Liechtenstein direkt vor der Haustür. Selbstständige und Kleinunternehmen in Bregenz profitieren von dieser Offenheit, müssen sich aber auch gegen gut positionierte Mitbewerber behaupten. Online fängt das an.",
    local1: "In Vorarlberg — und Bregenz als Landeshauptstadt vorweg — ist die Erwartung an professionelle Dienstleister hoch. Das gilt auch für den Online-Auftritt. Wer mit einer unklaren oder veralteten Website aufwartet, wird nicht ernst genommen, egal wie gut die eigentliche Leistung ist.",
    local2: "Ob Unternehmensberatung, Coaching, Grafikdesign oder Handwerk: Selbstständige in Bregenz brauchen eine Website, die sofort klar macht, wer sie sind und was sie anbieten. Der Landingpage Sprint von BertlClaw schafft das in wenigen Tagen — remote, professionell, auf den Punkt.",
    local3: "BertlClaw ist für Selbstständige in ganz Österreich remote tätig, Bregenz und Vorarlberg natürlich inklusive. Keine langen Abstimmungsrunden, kein unnötiger Aufwand. Das Erstgespräch ist kostenlos.",
  },
  "leonding": {
    intro: "Leonding liegt direkt vor den Toren von Linz und ist eine der größten Gemeinden Oberösterreichs. Die Nähe zur Landeshauptstadt macht Leonding attraktiv für Selbstständige — aber auch zum Wettbewerbsfeld: Kunden haben die Wahl zwischen lokalen Anbietern und dem gesamten Linzer Raum. Wer in Leonding als Freelancer oder Dienstleister auffallen will, braucht eine klare Online-Präsenz.",
    local1: "Im Großraum Linz, zu dem Leonding gehört, gibt es viele gut qualifizierte Selbstständige. Der Unterschied zwischen denen, die regelmäßig Anfragen bekommen, und jenen, die warten, liegt oft nicht in der Qualität — sondern darin, wie klar sie ihr Angebot kommunizieren.",
    local2: "Eine durchdachte Landingpage mit klarer Botschaft macht dich in Leonding sichtbar — für Google und für Menschen, die nach jemandem wie dir suchen. Mit dem Positionierungs-Sprint erarbeitest du die Grundlage dafür: Wer du bist, für wen du arbeitest, was dich unterscheidet.",
    local3: "BertlClaw betreut Selbstständige und kleine Unternehmen in ganz Österreich remote — Leonding und Oberösterreich sind dabei selbstverständlich dabei. Das Erstgespräch ist kostenlos, digital und ohne Verpflichtung.",
  },
  "klosterneuburg": {
    intro: "Klosterneuburg liegt im Herzen des Wienerwaldes, direkt an der Donau und nur wenige Kilometer von Wien entfernt. Diese Lage ist ein Vorteil — und eine Herausforderung zugleich. Selbstständige in Klosterneuburg konkurrieren mit Anbietern aus der ganzen Wiener Metropolregion. Online gut aufgestellt zu sein ist hier keine Option, sondern Notwendigkeit.",
    local1: "Im Raum Niederösterreich, speziell im Wiener Umland, suchen viele Kunden bewusst nach lokalen Anbietern — und finden sie über Google. Wer in Klosterneuburg eine klare Landingpage hat, die sein Angebot verständlich macht, hat einen echten Vorteil gegenüber denjenigen, die sich auf Mundpropaganda verlassen.",
    local2: "Der Landingpage Sprint von BertlClaw ist das richtige Format für Selbstständige in Klosterneuburg, die schnell professionell online auftreten wollen — ohne monatelange Website-Projekte und ohne Agenturpreise. Ergebnis: Eine fokussierte Seite, die Besucher in Anfragen verwandelt.",
    local3: "BertlClaw ist remote tätig und unterstützt Selbstständige in ganz Österreich — also auch in Klosterneuburg und dem gesamten niederösterreichischen Wiener Umland. Erstkontakt kostenlos, alles digital.",
  },
  "baden": {
    intro: "Baden bei Wien ist bekannt für sein Kurwesen, seine Therme und seine idyllische Lage im südlichen Wiener Umland. Weniger bekannt, aber genauso real: In Baden und der Region gibt es viele Selbstständige, Freiberufler und kleine Unternehmen — vom Coach bis zum Grafiker — die mit denselben Online-Sichtbarkeitsproblemen kämpfen wie überall in Österreich.",
    local1: "Die Nähe zu Wien ist für Selbstständige in Baden ein zweischneidiges Schwert: Einerseits erreichst du die Metropolregion leicht, andererseits verschwinden lokale Anbieter schnell im Rauschen der Wiener Online-Ergebnisse. Ein klar positionierter Online-Auftritt hilft, sich aus dieser Anonymität zu lösen.",
    local2: "Wer in Baden als Coach, Berater oder Dienstleister arbeitet, sollte eine Landingpage haben, die klar kommuniziert: Was ich tue, für wen ich es tue, warum ich die richtige Wahl bin. Das ist kein Marketing-Kram — das ist das Minimum, damit Kunden, die dich noch nicht kennen, dich verstehen.",
    local3: "BertlClaw arbeitet vollständig remote und begleitet Selbstständige in ganz Österreich, darunter auch in Baden und dem Raum Niederösterreich. Das Erstgespräch ist kostenlos und findet digital statt.",
  },
  "wolfsberg": {
    intro: "Wolfsberg ist das Zentrum des Lavanttals in Kärnten und eine Stadt mit starker regionaler Identität. Selbstständige und Kleinunternehmen hier sind oft tief in der Gemeinschaft verwurzelt — was ein großes Gut ist. Aber regionale Bekanntheit schützt nicht davor, online unsichtbar zu sein. Und unsichtbar online bedeutet: verpasste Chancen.",
    local1: "Im Lavanttal gibt es viele spezialisierte Dienstleister, die ihr Handwerk verstehen. Was viele noch nicht ausgebaut haben, ist die digitale Seite ihres Auftretens. Eine professionelle Landingpage, die auf den Punkt erklärt was du anbietest, reicht oft aus, um deutlich mehr Anfragen zu bekommen.",
    local2: "Gerade in Regionen wie dem Kärntner Lavanttal, wo persönliche Empfehlungen noch viel zählen, unterschätzt man leicht, wie viele potenzielle Kunden zuerst googeln — bevor sie jemanden fragen. Wer dann mit einer klaren Website punktet, gewinnt.",
    local3: "BertlClaw ist remote tätig und unterstützt Selbstständige in ganz Österreich — auch in Wolfsberg und der Region Kärnten. Kein Vor-Ort-Termin notwendig, kein Aufwand. Das Erstgespräch ist kostenlos.",
  },
  "leoben": {
    intro: "Leoben ist die zweitgrößte Stadt der Steiermark und ein wichtiger Bergbau- und Industriestandort mit langer Geschichte. Die Montanuniversität prägt die Stadt — und sorgt für gut ausgebildete Fachkräfte, von denen viele den Weg in die Selbstständigkeit einschlagen. In Leoben online sichtbar zu sein ist entscheidend, um die richtigen Kunden zu erreichen.",
    local1: "In der obersteirischen Region rund um Leoben hat die Selbstständigkeit eine starke Tradition in technischen und handwerklichen Berufen. Aber auch Coaches, Berater und kreative Freelancer wachsen hier. Für all diese Berufsgruppen gilt: Ein klarer Online-Auftritt entscheidet über Anfragen — nicht nur die eigene Kompetenz.",
    local2: "Wer in Leoben ein spezifisches Angebot hat und die richtigen Kunden ansprechen will, braucht eine Landingpage, die genau das kommuniziert. Der Positionierungs-Sprint von BertlClaw hilft dir, dein Angebot so zu formulieren, dass es hängen bleibt — bei Kunden und in Suchmaschinen.",
    local3: "BertlClaw begleitet Selbstständige in ganz Österreich remote — selbstverständlich auch in Leoben und der Steiermark. Kein Vor-Ort-Termin, alles digital. Das Erstgespräch ist kostenlos.",
  },
  "krems": {
    intro: "Krems an der Donau ist eines der kulturellen Zentren Niederösterreichs — bekannt für Wein, Kulturmeile und eine aktive Wirtschaft im Donautal. Die Universität für Weiterbildung Krems bringt akademische Impulse in die Region, und viele Absolventinnen und Absolventen gehen in die Selbstständigkeit. Wer in Krems online gefunden werden will, braucht mehr als eine Visitenkarte im Netz.",
    local1: "Im Raum Krems und dem Donautal gibt es viele kompetente Dienstleister, aber wenige mit wirklich klarer Online-Positionierung. Wer sein Angebot präzise formuliert und eine überzeugende Landingpage hat, sticht sofort heraus — und bekommt Anfragen, während andere warten.",
    local2: "Gerade in Niederösterreich, wo die Entscheidungen oft lokal fallen, lohnt sich eine gezielte Online-Strategie. Mit dem Landingpage Sprint schaffst du in kurzer Zeit eine professionelle Seite, die dein Angebot sichtbar macht — ohne monatelangen Agenturprozess.",
    local3: "BertlClaw arbeitet remote und unterstützt Selbstständige in ganz Österreich. Krems und die Region Niederösterreich sind selbstverständlich dabei. Das Erstgespräch ist kostenlos, digital und unverbindlich.",
  },
  "traun": {
    intro: "Traun liegt im oberösterreichischen Zentralraum, direkt an der Stadtgrenze von Linz. Als Teil des Großraums Linz ist Traun ein attraktiver Standort für Selbstständige — aber auch ein Ort, wo man leicht in der Anonymität der Linzer Online-Suche untergeht. Wer in Traun als Freelancer oder kleines Unternehmen wachsen will, muss online klar auftreten.",
    local1: "Im Wirtschaftsraum Linz, zu dem Traun zählt, gibt es eine hohe Dichte an Dienstleistern aller Art. Der Unterschied zwischen vollen Auftragsbüchern und halbvoller Pipeline liegt oft nicht in der Qualität der Arbeit — sondern darin, ob man online klar und überzeugend kommuniziert, was man anbietet.",
    local2: "Mit dem Landingpage Sprint von BertlClaw bekommst du in kurzer Zeit eine Seite, die dein Angebot auf den Punkt bringt. Keine langen Projekte, kein Overhead — direkt das, was wirkt.",
    local3: "BertlClaw ist remote tätig und begleitet Selbstständige in ganz Österreich, Traun und Oberösterreich inklusive. Das Erstgespräch ist kostenlos, digital und ohne Verpflichtung.",
  },
  "amstetten": {
    intro: "Amstetten ist eine der größten Städte Niederösterreichs und ein wirtschaftliches Zentrum im Mostviertel. Die Region hat eine starke Handwerks- und Dienstleistungstradition — und eine wachsende Zahl von Selbstständigen, die ihr Angebot online besser positionieren möchten. Wer in Amstetten Kunden gewinnen will, braucht einen klaren Online-Auftritt.",
    local1: "Im Mostviertel und rund um Amstetten schätzen Kunden Direktheit und Verlässlichkeit. Das sollte sich auch online zeigen: Eine Landingpage, die keine Fragen offenlässt — was du anbietest, für wen, und wie man dich beauftragt — ist das Fundament jeder erfolgreichen Selbstständigkeit im digitalen Zeitalter.",
    local2: "Viele Selbstständige in Amstetten verlassen sich auf Weiterempfehlungen — ein gutes Zeichen für die Qualität. Aber Weiterempfehlungen skalieren nicht. Mit der richtigen Positionierung und einer klaren Landingpage wächst dein Kundenstamm auch ohne aktives Netzwerken.",
    local3: "BertlClaw betreut Selbstständige remote in ganz Österreich, natürlich auch in Amstetten und dem Raum Niederösterreich. Kein Vor-Ort-Termin nötig. Das Erstgespräch ist kostenlos.",
  },
  "lustenau": {
    intro: "Lustenau liegt im Vorarlberger Rheintal, direkt an der Schweizer Grenze — und ist eine der wirtschaftsstärksten Gemeinden Österreichs. Stickereien, Handel, Dienstleistungen: Lustenau hat eine unternehmerische DNA. Aber auch hier gilt: Fachliche Stärke allein reicht nicht. Wer in Lustenau als Selbstständige/r wachsen will, braucht eine klare digitale Präsenz.",
    local1: "Im Vorarlberger Rheintal sind die Ansprüche hoch — bei Kunden wie bei Dienstleistern. Wer mit einer schwachen oder unklaren Website auftritt, verliert Vertrauen, bevor das erste Gespräch stattfindet. Eine professionell formulierte Landingpage ist in Lustenau kein Extra — sie ist Pflicht.",
    local2: "Der Positionierungs-Sprint und der Landingpage Sprint von BertlClaw sind für genau solche Situationen gemacht: Schnell, klar, ohne langen Agentur-Prozess. Das Ergebnis ist eine Seite, die erklärt wer du bist, was du anbietest und warum du die richtige Wahl bist.",
    local3: "BertlClaw ist remote tätig — Vorarlberg, Lustenau und der gesamte deutschsprachige Raum sind selbstverständlich abgedeckt. Das Erstgespräch ist kostenlos und findet digital statt.",
  },
  "kapfenberg": {
    intro: "Kapfenberg ist eine Industriestadt in der Steiermark, die sich in den letzten Jahren zunehmend auch für Dienstleistungen und Kreativwirtschaft geöffnet hat. Neben dem klassischen Gewerbe gibt es eine wachsende Zahl von Selbstständigen, die in Kapfenberg und Umgebung arbeiten — und die online besser sichtbar sein wollen.",
    local1: "In der Steiermark, gerade in der Industrieregion rund um Kapfenberg, wird Qualität hoch geschätzt. Aber Qualität muss auch kommuniziert werden. Eine Landingpage, die klar zeigt was du kannst und für wen du das tust, ist oft die Grundlage dafür, dass überhaupt jemand anfragt.",
    local2: "Mit dem Landingpage Sprint von BertlClaw schaffst du in kurzer Zeit eine Seite, die dein Angebot verständlich und überzeugend präsentiert. Kein langer Website-Prozess, kein großes Agenturbudget. Nur das, was wirkt.",
    local3: "BertlClaw unterstützt Selbstständige und kleine Unternehmen in ganz Österreich, remote und unkompliziert. Kapfenberg und die Steiermark sind dabei selbstverständlich dabei. Das Erstgespräch ist kostenlos.",
  },
  "moedling": {
    intro: "Mödling liegt im südlichen Wiener Umland und ist Teil der Metropolregion Wien — mit allem, was das bedeutet: kurze Wege in die Hauptstadt, aber auch harter Wettbewerb um Kunden. Selbstständige in Mödling stehen vor der Herausforderung, sich in einem dichten Anbietermarkt zu behaupten. Online-Sichtbarkeit ist dabei kein Luxus, sondern Grundbedingung.",
    local1: "Im Raum Niederösterreich rund um Mödling googeln potenzielle Kunden regelmäßig nach Dienstleistungen aller Art — und entscheiden oft anhand des ersten Online-Eindrucks. Wer bei dieser Suche nicht auftaucht oder mit einer unklaren Website aufwartet, verliert Aufträge an Mitbewerber mit besserem Online-Auftritt.",
    local2: "Eine klare, fokussierte Landingpage — erarbeitet mit dem Landingpage Sprint von BertlClaw — macht den Unterschied. Sie kommuniziert in Sekunden: Was du anbietest, für wen, und warum du die richtige Wahl bist. Genau das, was Kunden brauchen, um eine Anfrage zu schicken.",
    local3: "BertlClaw begleitet Selbstständige in ganz Österreich remote, natürlich auch in Mödling und dem niederösterreichischen Umland von Wien. Das Erstgespräch ist kostenlos, digital und unverbindlich.",
  },
  "hallein": {
    intro: "Hallein ist eine der ältesten Städte Salzburgs und liegt idyllisch an der Salzach, südlich der Landeshauptstadt. Die Region hat eine lange Geschichte als Salzabbau-Zentrum — heute ist Hallein ein lebendiger Wirtschaftsstandort mit vielen Selbstständigen und Kleinstunternehmen. Wer hier erfolgreich sein will, braucht auch online Präsenz.",
    local1: "Im Raum Salzburg, dem Hallein angehört, gibt es eine aktive Selbstständigenszene mit hohem Qualitätsanspruch. Viele Anbieter sind gut vernetzt, haben aber keinen klaren Online-Auftritt. Das ist eine Lücke — und gleichzeitig eine Chance für alle, die bereit sind, in die eigene Online-Sichtbarkeit zu investieren.",
    local2: "Eine gut strukturierte Landingpage, die klar kommuniziert was du tust und für wen, ist in Hallein genauso entscheidend wie in Wien. Mit dem Landingpage Sprint von BertlClaw bekommst du diese Seite schnell und professionell — ohne langen Agentur-Prozess.",
    local3: "BertlClaw ist remote tätig und betreut Selbstständige in ganz Österreich. Hallein und die Region Salzburg sind selbstverständlich dabei. Das Erstgespräch ist kostenlos.",
  },
  "kufstein": {
    intro: "Kufstein liegt am Innufer, direkt an der deutschen Grenze — die Festungsstadt ist nicht nur ein Touristenziel, sondern auch ein wirtschaftlich aktiver Standort in Tirol. Selbstständige und Kleinunternehmen hier profitieren von der Lage zwischen Innsbruck und München, stehen aber auch vor der Herausforderung, sich in einem grenzüberschreitenden Markt zu behaupten. Online-Sichtbarkeit ist dafür entscheidend.",
    local1: "Im Tiroler Unterland rund um Kufstein gibt es viele Dienstleister mit starker regionaler Verwurzelung. Das ist ein Vorteil — aber er reicht allein nicht, wenn Kunden zuerst online suchen und einen anderen finden. Eine klare Positionierung und eine überzeugende Landingpage sind hier keine Option, sondern Notwendigkeit.",
    local2: "Mit dem Positionierungs-Sprint von BertlClaw erarbeitest du in kurzer Zeit, was dich von anderen Anbietern in Kufstein und Tirol unterscheidet. Das Ergebnis: Eine Botschaft, die Kunden verstehen — und eine Landingpage, die aus Besuchern Anfragen macht.",
    local3: "BertlClaw begleitet Selbstständige remote in ganz Österreich. Kufstein und Tirol sind dabei selbstverständlich dabei. Das Erstgespräch ist kostenlos, digital und ohne Verpflichtung.",
  },
  "ternitz": {
    intro: "Ternitz liegt in der südlichen Industrieregion Niederösterreichs und hat sich von einem klassischen Industriestandort hin zu einem vielfältigen Wirtschaftsstandort entwickelt. Selbstständige und kleine Unternehmen sind hier genauso aktiv wie überall in Österreich — und kämpfen genauso damit, online sichtbar zu sein.",
    local1: "In Niederösterreich, und speziell in der Region um Ternitz, sind es oft persönliche Netzwerke, über die Aufträge vergeben werden. Das ist wertvoll, hat aber Grenzen. Wer als Selbstständige/r wachsen will, braucht eine Online-Präsenz, die auch fremde Kunden überzeugt.",
    local2: "Der Landingpage Sprint von BertlClaw ist für genau diese Situation gemacht: In kurzer Zeit eine professionelle Seite erstellen, die klar kommuniziert was du anbietest — ohne großen Aufwand, ohne Agenturpreise, ohne monatelange Prozesse.",
    local3: "BertlClaw ist remote tätig und betreut Selbstständige in ganz Österreich, natürlich auch in Ternitz und der Region Niederösterreich. Das Erstgespräch ist kostenlos.",
  },
  "traiskirchen": {
    intro: "Traiskirchen liegt im Bezirk Baden, südlich von Wien — ein Standort mit starker Industrie- und Dienstleistungsstruktur. Viele Selbstständige aus Traiskirchen und Umgebung arbeiten für regionale Kunden, aber auch für die Wiener Metropolregion. Wer dabei den Online-Kanal vernachlässigt, verschenkt echtes Potenzial.",
    local1: "Im südlichen Niederösterreich rund um Traiskirchen googeln potenzielle Kunden regelmäßig nach lokalen Anbietern — und entscheiden oft beim ersten Klick. Eine Landingpage, die sofort Vertrauen aufbaut und klar kommuniziert, was du leistest, ist der direkteste Weg zu mehr Anfragen.",
    local2: "Ob Positionierungs-Sprint oder Landingpage Sprint — BertlClaw bietet schnelle, fokussierte Lösungen für Selbstständige, die keine Zeit für monatelange Projekte haben. Das Ergebnis ist eine Seite, die wirkt.",
    local3: "BertlClaw begleitet Selbstständige remote in ganz Österreich, Traiskirchen und Niederösterreich inklusive. Das Erstgespräch ist kostenlos und digital.",
  },
  "schwechat": {
    intro: "Schwechat liegt östlich von Wien, direkt beim internationalen Flughafen. Das bringt eine besondere wirtschaftliche Dynamik: internationale Einflüsse, Logistik, Industrie — aber auch viele lokale Selbstständige, die für regionale und überregionale Kunden arbeiten. Wer in Schwechat online aufgefunden werden will, braucht einen klaren Auftritt.",
    local1: "Die Nähe zu Wien macht Schwechat zu einem dichten Wettbewerbsumfeld für Selbstständige. Wer hier als Dienstleister oder Freelancer wachsen will, muss online überzeugen — mit einer klaren Positionierung und einer Landingpage, die aus Besuchern Anfragen macht.",
    local2: "BertlClaw schafft mit dem Landingpage Sprint genau das: Eine fokussierte Seite, die erklärt wer du bist, was du anbietest und warum du die richtige Wahl bist. Keine aufwändige Website, kein langer Prozess — direkt das, was wirkt.",
    local3: "BertlClaw ist remote tätig und betreut Selbstständige in ganz Österreich. Schwechat und der Raum Niederösterreich sind selbstverständlich dabei. Das Erstgespräch ist kostenlos.",
  },
  "braunau": {
    intro: "Braunau am Inn liegt an der Grenze zu Bayern und ist das Tor zum Innviertel in Oberösterreich. Die Region hat eine starke wirtschaftliche Tradition — Handel, Handwerk, Dienstleistungen — und eine wachsende Selbstständigenszene. Wer in Braunau und dem Innviertel als Freiberufler oder kleines Unternehmen sichtbar sein will, braucht eine klare Online-Präsenz.",
    local1: "Im Innviertel schätzen Kunden direkte Kommunikation und Verlässlichkeit. Das gilt auch online: Eine Landingpage, die sofort klar macht, was du anbietest und für wen, erzeugt Vertrauen — und Anfragen. Viele Selbstständige in Braunau unterschätzen, wie viel eine schlechte oder fehlende Seite kostet.",
    local2: "Mit dem Positionierungs-Sprint und dem Landingpage Sprint von BertlClaw bekommst du in kurzer Zeit beides: Eine klare Positionierung und eine Seite, die sie kommuniziert. Kein langer Prozess, kein großes Budget nötig.",
    local3: "BertlClaw ist remote tätig und betreut Selbstständige in ganz Österreich — Braunau am Inn und Oberösterreich natürlich inklusive. Das Erstgespräch ist kostenlos.",
  },
  "stockerau": {
    intro: "Stockerau liegt im niederösterreichischen Weinviertel, nördlich von Wien. Die Stadt ist ein wichtiger Knotenpunkt in der Region und beherbergt viele kleine Unternehmen und Selbstständige aus unterschiedlichsten Branchen. Online-Sichtbarkeit ist auch hier ein Thema — denn wer in Stockerau nicht gefunden wird, verliert Kunden an besser positionierte Mitbewerber.",
    local1: "Im Weinviertel rund um Stockerau ist die Wirtschaftsstruktur kleinteilig und regional geprägt. Das ist eine Stärke — aber sie bedeutet auch, dass Weiterempfehlungen allein nicht reichen. Mit einer klaren Landingpage erreichst du auch Kunden, die du noch nicht persönlich kennst.",
    local2: "Der Landingpage Sprint von BertlClaw liefert in kurzer Zeit eine professionelle Seite, die dein Angebot klar kommuniziert. Ohne Agentur-Overhead, ohne lange Wartezeiten — direkt das, was Kunden überzeugt.",
    local3: "BertlClaw begleitet Selbstständige remote in ganz Österreich, Stockerau und Niederösterreich inklusive. Das Erstgespräch ist kostenlos und unverbindlich.",
  },
  "spittal": {
    intro: "Spittal an der Drau liegt im Herzen Oberkärntens und ist das wirtschaftliche Zentrum der Region. Mit dem Millstätter See in der Nähe und einer gut vernetzten Unternehmenslandschaft ist Spittal ein attraktiver Standort für Selbstständige. Wer hier als Freelancer oder kleines Unternehmen wachsen will, braucht mehr als regionale Bekanntheit — er braucht eine klare Online-Präsenz.",
    local1: "In Kärnten — und besonders in ländlicheren Regionen wie dem Oberkärntner Raum rund um Spittal an der Drau — dominieren oft persönliche Netzwerke. Das ist ein echter Vorteil, hat aber eine klare Grenze. Wer über sein bestehendes Netzwerk hinauswachsen will, kommt an einer starken Online-Präsenz nicht vorbei.",
    local2: "Eine fokussierte Landingpage, die erklärt wer du bist, was du anbietest und warum du die richtige Wahl bist, ist der direkteste Weg zu neuen Anfragen — auch in Spittal an der Drau. Der Landingpage Sprint von BertlClaw schafft genau das, schnell und ohne großen Aufwand.",
    local3: "BertlClaw ist remote tätig und betreut Selbstständige in ganz Österreich, natürlich auch in Spittal an der Drau und dem gesamten Raum Kärnten. Das Erstgespräch ist kostenlos.",
  },
};

function generatePage({city, slug, region}) {
  const ctx = cityContext[slug] || {
    intro: `${city} in ${region} ist ein wichtiger Wirtschaftsstandort in Österreich. Selbstständige und kleine Unternehmen sind hier aktiv — und kämpfen mit denselben Herausforderungen wie überall: Online-Sichtbarkeit, klare Positionierung, Neukunden gewinnen.`,
    local1: `In ${region} gibt es viele kompetente Selbstständige, die fachlich stark sind — aber online kaum sichtbar. Das Gute: Das lässt sich ändern.`,
    local2: `Mit einer klaren Landingpage und der richtigen Positionierung können Selbstständige in ${city} deutlich mehr Anfragen generieren. BertlClaw hilft dabei.`,
    local3: `BertlClaw ist remote tätig und betreut Selbstständige in ganz Österreich — auch in ${city} und ${region}. Das Erstgespräch ist kostenlos.`,
  };

  const url = `https://bertlclaw.at/landingpage-${slug}.html`;
  const title = `Landingpage erstellen ${city} | BertlClaw`;
  const description = `Landingpage für Selbstständige und kleine Unternehmen in ${city}. BertlClaw erstellt Landingpages, Website-Texte und Positionierung – remote, unkompliziert, auf den Punkt.`;
  const schemaHeadline = `Landingpage erstellen in ${city} – für Selbstständige und Kleinunternehmen`;
  const schemaDesc = `Wie Selbstständige und kleine Unternehmen in ${city} (${region}) mit einer klaren Landingpage und Positionierung online sichtbar werden und mehr Kunden gewinnen.`;

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="de" href="${url}" />
  <link rel="alternate" hreflang="x-default" href="${url}" />
  <link rel="icon" href="favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" href="bertlclaw-assets/logo-32.png" />
  <link rel="apple-touch-icon" href="bertlclaw-assets/logo-180.png" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <meta property="og:site_name" content="BertlClaw" />
  <meta property="og:locale" content="de_AT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${schemaHeadline}",
    "description": "${schemaDesc}",
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
    "url": "${url}",
    "datePublished": "2026-04-08",
    "dateModified": "2026-04-08",
    "inLanguage": "de-AT"
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
      <span class="eyebrow">📍 Landingpage erstellen in ${city}</span>
      <h1 class="accent-text">Landingpage für Selbstständige in ${city} – klar, überzeugend, auf den Punkt.</h1>
      <p class="lead">Du bist selbstständig in ${city} und willst online mehr Anfragen bekommen? BertlClaw erstellt Landingpages und Website-Texte für Selbstständige und kleine Unternehmen in ${region} – remote, unkompliziert, direkt.</p>
      <div class="cta">
        <a class="btn btn-primary" href="erstgespraech.html">Kostenloses Erstgespräch</a>
        <a class="btn btn-secondary" href="services.html">Leistungen ansehen</a>
      </div>
    </div>
  </header>

  <main class="wrap">

    <section class="section">
      <div class="article-body">

        <h2>Selbstständig in ${city} – und online kaum sichtbar?</h2>
        <p>${ctx.intro}</p>

        <h2>Warum Online-Sichtbarkeit für Selbstständige in ${city} entscheidend ist</h2>
        <p>${ctx.local1}</p>
        <p>${ctx.local2}</p>
        <p>Das Fundament dafür ist eine klare Positionierung: Wer bist du, für wen arbeitest du, und was unterscheidet dich von anderen? Wer diese Fragen klar beantworten kann, hat die Grundlage für alles weitere — für Website-Texte, für Anfragen, für Wachstum. BertlClaw bietet dafür den <strong>Positionierungs-Sprint</strong> an — ein strukturiertes Format, das genau das in kurzer Zeit herausarbeitet.</p>

        <h2>Eine Landingpage, die dein Angebot verkauft</h2>
        <p>Sobald die Positionierung steht, braucht sie eine Heimat online. Nicht zwingend eine aufwändige Website mit zehn Unterseiten — oft reicht eine einzige, gut gemachte Landingpage, die erklärt:</p>
        <ul>
          <li>Was du anbietest — konkret, nicht vage</li>
          <li>Für wen genau du das tust</li>
          <li>Warum du die richtige Person dafür bist</li>
          <li>Wie man mit dir in Kontakt tritt</li>
        </ul>
        <p>Der <strong>Landingpage Sprint</strong> von BertlClaw liefert genau das: Eine fokussierte Seite mit Texten, die wirken. Kein Schnickschnack, kein Aufblähen — nur das, was Besucher in Anfragen verwandelt. Das ist das richtige Format für Selbstständige in ${city}, die keine Zeit für monatelange Projekte haben.</p>

        <h2>Remote aus ganz Österreich — auch für ${city} und ${region}</h2>
        <p>${ctx.local3}</p>
        <p>Alle Projekte laufen vollständig remote ab: Abstimmung per Video-Call, Inhalte werden gemeinsam erarbeitet, Ergebnis wird digital geliefert. Weder du noch BertlClaw müssen dafür irgendwo hinfahren. Das spart Zeit — und macht gute Arbeit erst recht möglich, egal wo in Österreich du bist.</p>

      </div>
    </section>

    <!-- Internal link -->
    <section class="section">
      <div class="section-head">
        <span class="micro-label">Weiterführend</span>
        <h2>Mehr Kunden als Selbstständige/r finden</h2>
        <p>Positionierung, Landingpage, Sichtbarkeit: Hier ist der vollständige Überblick, welche Hebel wirklich wirken.</p>
      </div>
      <a class="link-card" href="selbststaendige-mehr-kunden.html">
        <div>
          <h3 style="margin:0 0 6px">Online nicht sichtbar — obwohl du richtig gut bist →</h3>
          <p>Warum Qualität allein nicht reicht, und welche Schritte Selbstständige brauchen, um online mehr Kunden zu gewinnen.</p>
        </div>
        <span class="link-card-arrow">→</span>
      </a>
    </section>

    <!-- CTA Band -->
    <section class="section">
      <div class="cta-band">
        <span class="micro-label">Jetzt starten</span>
        <h2>Bereit, in ${city} online sichtbar zu werden?</h2>
        <p>Im kostenlosen Erstgespräch schauen wir gemeinsam, wo bei dir der größte Hebel liegt — Positionierung, Landingpage oder beides. Kein Verkaufsdruck, kein Vorgespräch nötig. Vollständig remote, auch aus ${city}.</p>
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
    BertlClaw · Landingpage erstellen ${city} · ${region}
  </footer>
</body>
</html>`;
}

// Generate all pages
const generated = [];
for (const cityData of austrianCities) {
  const html = generatePage(cityData);
  const filename = `landingpage-${cityData.slug}.html`;
  const filepath = path.join(WORKSPACE, filename);
  fs.writeFileSync(filepath, html, 'utf8');
  generated.push(filename);
  console.log(`✓ Generated: ${filename}`);
}

// Update sitemap.xml
const sitemapPath = path.join(WORKSPACE, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

const newEntries = austrianCities.map(({slug}) => `  <url>
    <loc>https://bertlclaw.at/landingpage-${slug}.html</loc>
    <lastmod>2026-04-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n');

sitemap = sitemap.replace('</urlset>', `${newEntries}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log(`\n✓ Updated sitemap.xml with ${austrianCities.length} entries`);
console.log(`\n📄 Summary: ${generated.length} pages generated`);
generated.forEach(f => console.log(`   - ${f}`));
