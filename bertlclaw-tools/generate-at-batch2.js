#!/usr/bin/env node
/**
 * generate-at-batch2.js
 * Generates city×profession landing pages for AT cities — expanded profession list (batch 2).
 * 24 AT cities × 10 new professions = up to 240 pages (skips already existing files).
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE = path.resolve(__dirname, '..');
const SITEMAP = path.join(WORKSPACE, 'sitemap.xml');

const cities = [
  {city: "Wien", slug: "wien", region: "Wien", locale: "de_AT"},
  {city: "Graz", slug: "graz", region: "Steiermark", locale: "de_AT"},
  {city: "Linz", slug: "linz", region: "Oberösterreich", locale: "de_AT"},
  {city: "Salzburg", slug: "salzburg", region: "Salzburg", locale: "de_AT"},
  {city: "Innsbruck", slug: "innsbruck", region: "Tirol", locale: "de_AT"},
  {city: "Klagenfurt", slug: "klagenfurt", region: "Kärnten", locale: "de_AT"},
  {city: "Villach", slug: "villach", region: "Kärnten", locale: "de_AT"},
  {city: "Wels", slug: "wels", region: "Oberösterreich", locale: "de_AT"},
  {city: "St. Pölten", slug: "st-poelten", region: "Niederösterreich", locale: "de_AT"},
  {city: "Dornbirn", slug: "dornbirn", region: "Vorarlberg", locale: "de_AT"},
  {city: "Wiener Neustadt", slug: "wiener-neustadt", region: "Niederösterreich", locale: "de_AT"},
  {city: "Steyr", slug: "steyr", region: "Oberösterreich", locale: "de_AT"},
  {city: "Feldkirch", slug: "feldkirch", region: "Vorarlberg", locale: "de_AT"},
  {city: "Bregenz", slug: "bregenz", region: "Vorarlberg", locale: "de_AT"},
  {city: "Weiz", slug: "weiz", region: "Steiermark", locale: "de_AT"},
  {city: "Leoben", slug: "leoben", region: "Steiermark", locale: "de_AT"},
  {city: "Krems", slug: "krems", region: "Niederösterreich", locale: "de_AT"},
  {city: "Kapfenberg", slug: "kapfenberg", region: "Steiermark", locale: "de_AT"},
  {city: "Amstetten", slug: "amstetten", region: "Niederösterreich", locale: "de_AT"},
  {city: "Mödling", slug: "moedling", region: "Niederösterreich", locale: "de_AT"},
  {city: "Klosterneuburg", slug: "klosterneuburg", region: "Niederösterreich", locale: "de_AT"},
  {city: "Baden bei Wien", slug: "baden-wien", region: "Niederösterreich", locale: "de_AT"},
  {city: "Hallein", slug: "hallein", region: "Salzburg", locale: "de_AT"},
  {city: "Kufstein", slug: "kufstein", region: "Tirol", locale: "de_AT"},
];

const newProfessions = [
  {slug: "notare", label: "Notare", keyword: "Notar"},
  {slug: "finanzberater", label: "Finanzberater", keyword: "Finanzberater"},
  {slug: "it-berater", label: "IT-Berater", keyword: "IT-Berater"},
  {slug: "social-media-manager", label: "Social Media Manager", keyword: "Social Media Manager"},
  {slug: "texter", label: "Texter & Copywriter", keyword: "Texter"},
  {slug: "heilpraktiker", label: "Heilpraktiker", keyword: "Heilpraktiker"},
  {slug: "architekten", label: "Architekten", keyword: "Architekt"},
  {slug: "zahnaerzte", label: "Zahnärzte", keyword: "Zahnarzt"},
  {slug: "virtuelle-assistenten", label: "Virtuelle Assistenten", keyword: "Virtuelle/r Assistent/in"},
  {slug: "unternehmensberater", label: "Unternehmensberater", keyword: "Unternehmensberater"},
];

const professionContent = {
  notare: {
    intro: "Notare gewinnen Mandate durch Seriosität und Verlässlichkeit — und das muss auch online sichtbar sein.",
    detail: "Menschen suchen einen Notar meist für wichtige Lebensereignisse: Hauskauf, Erbschaft, Firmengründung. Wer in diesem Moment mit einer professionellen, vertrauenswürdigen Seite präsent ist, gewinnt das Mandat. Viele Notarskanzleien unterschätzen, wie viel ein klarer Online-Auftritt bringt — gerade in einem Bereich, der so stark von Vertrauen lebt.",
    value: "BertlClaw erstellt Landingpages für Notare und Notarskanzleien, die Kompetenz klar kommunizieren, Tätigkeitsbereiche übersichtlich darstellen und Vertrauen noch vor dem ersten Kontakt aufbauen."
  },
  finanzberater: {
    intro: "Finanzberater stehen vor einer besonderen Herausforderung: In einem Bereich mit viel Misstrauen müssen sie online schnell Kompetenz und Seriosität beweisen.",
    detail: "Wer einen Finanzberater sucht, hat oft eine konkrete Lebenssituation: Altersvorsorge, Investition, Versicherung. Eine Landingpage, die genau diese Situation anspricht und Lösungskompetenz zeigt, macht den Unterschied — und bringt qualifizierte Anfragen statt anonymer Klicks.",
    value: "BertlClaw entwickelt Landingpages für Finanzberater, die Vertrauen aufbauen, Spezialisierungen klar kommunizieren und Interessenten in qualifizierte Beratungsgespräche führen."
  },
  "it-berater": {
    intro: "IT-Berater und IT-Freelancer sind gefragt — aber wer online nicht klar erklärt, was er löst und für wen, verliert Aufträge an die Konkurrenz.",
    detail: "Unternehmen, die einen IT-Berater suchen, wollen Sicherheit: Kann diese Person mein Problem lösen? Hat sie Erfahrung mit meiner Branche oder meinem Tech-Stack? Eine Landingpage, die genau diese Fragen beantwortet, bringt die richtigen Anfragen. Generische IT-Berater-Websites bringen kaum qualifizierte Leads.",
    value: "BertlClaw erstellt Landingpages für IT-Berater und IT-Freelancer, die Technologie-Expertise verständlich machen, den Nutzen für den Kunden in den Vordergrund stellen und aus Websitebesuchern qualifizierte Projektanfragen machen."
  },
  "social-media-manager": {
    intro: "Social Media Manager vermarkten andere — aber die eigene Sichtbarkeit bleibt oft auf der Strecke. Eine starke Landingpage ändert das.",
    detail: "Unternehmer und Marken, die einen Social Media Manager suchen, wollen wissen: Welche Kanäle? Welche Branchen? Welche Ergebnisse? Eine klar strukturierte Landingpage, die Dienstleistungen, Zielgruppen und Referenzen auf den Punkt bringt, macht den Unterschied zwischen Anfrage und Weiterklicken.",
    value: "BertlClaw erstellt Landingpages für Social Media Manager und Social Media Freelancer, die Leistungen klar positionieren, Zielgruppen präzise ansprechen und Interessenten in Zusammenarbeit verwandeln."
  },
  texter: {
    intro: "Texter und Copywriter schreiben für andere überzeugend — aber die eigene Landingpage bleibt oft der blinde Fleck.",
    detail: "Kunden, die einen Texter suchen, fragen sich: Kann diese Person meinen Ton treffen? Versteht sie meine Branche? Hat sie Erfahrung mit dem, was ich brauche — Website, Newsletter, Ads? Eine Landingpage, die genau das klar beantwortet, ist Gold wert — und bringt Anfragen von Kunden, die wirklich passen.",
    value: "BertlClaw erstellt Landingpages für Texter und Copywriter, die Schreibkompetenz greifbar machen, Spezialgebiete klar benennen und potenzielle Auftraggeber direkt in Anfragen verwandeln."
  },
  heilpraktiker: {
    intro: "Heilpraktiker und alternative Mediziner stehen vor der Aufgabe, Kompetenz und Vertrauen gleichzeitig zu transportieren — in einem Bereich, in dem viele Menschen skeptisch oder unsicher sind.",
    detail: "Wer einen Heilpraktiker sucht, ist oft auf der Suche nach einem ganzheitlichen Ansatz, den die Schulmedizin nicht geboten hat. Eine Landingpage, die Behandlungsansätze erklärt, Vertrauen aufbaut und den ersten Schritt zur Kontaktaufnahme erleichtert, ist hier besonders wertvoll.",
    value: "BertlClaw entwickelt Landingpages für Heilpraktiker und alternative Mediziner, die Behandlungsphilosophie klar kommunizieren, Zielgruppen gezielt ansprechen und die Hemmschwelle zur Terminbuchung senken."
  },
  architekten: {
    intro: "Architekten und Architekturbüros haben beeindruckende Projekte — aber ohne eine klare Online-Präsenz bleiben diese Referenzen unsichtbar für potenzielle Bauherren.",
    detail: "Bauherren, die ein Architekturbüro suchen, wollen Portfolio, Persönlichkeit und Prozess verstehen — bevor sie Kontakt aufnehmen. Eine Landingpage, die genau das transportiert, ohne generisch zu wirken, bringt qualifizierte Anfragen von Klienten, die wirklich passen.",
    value: "BertlClaw erstellt Landingpages für Architekten und Architekturbüros, die Projekte überzeugend präsentieren, den Arbeitsprozess erklären und Interessenten in erste Beratungsgespräche führen."
  },
  zahnaerzte: {
    intro: "Zahnarztpraxen kämpfen online um die gleichen lokalen Suchanfragen — wer hier gut positioniert ist, gewinnt Neupatienten zuverlässig.",
    detail: "Viele Zahnarztpraxen haben Websites, die wie Branchenbucheinträge wirken: Name, Adresse, Öffnungszeiten. Mehr nicht. Eine Landingpage mit klarem Fokus macht den Unterschied — und zeigt, warum Patienten genau zu Ihnen kommen sollen und was Ihre Praxis auszeichnet.",
    value: "BertlClaw erstellt Landingpages für Zahnärzte, die Vertrauen aufbauen, Schwerpunkte klar kommunizieren und die Kontaktaufnahme für neue Patienten so einfach wie möglich machen."
  },
  "virtuelle-assistenten": {
    intro: "Virtuelle Assistenten sind eine Branche, die boomt — aber auch eine, in der es schwer ist, sich klar zu differenzieren. Eine präzise Landingpage macht den Unterschied.",
    detail: "Unternehmer, die eine virtuelle Assistenz suchen, wollen wissen: Was genau übernimmst du? Für welche Branchen? Welche Tools nutzt du? Je klarer und konkreter die Antworten auf einer Landingpage, desto wahrscheinlicher ist eine Anfrage. Vage Beschreibungen führen zu Stille.",
    value: "BertlClaw entwickelt Landingpages für Virtuelle Assistenten, die Leistungen klar strukturieren, Zielkunden präzise ansprechen und den Einstieg in eine Zusammenarbeit so einfach wie möglich machen."
  },
  unternehmensberater: {
    intro: "Unternehmensberater und Consultants stehen vor einem spezifischen Problem: Ihre Expertise ist oft schwer greifbar — eine gute Landingpage macht sie konkret und vertrauenswürdig.",
    detail: "Potenzielle Klienten eines Unternehmensberaters suchen oft nach Themen, nicht nach Namen: Prozessoptimierung, Wachstumsstrategie, Restrukturierung. Eine gut aufgestellte Landingpage sorgt dafür, dass du bei den richtigen Suchanfragen sichtbar bist und sofort Kompetenz signalisierst — noch bevor jemand deinen Namen kennt.",
    value: "BertlClaw entwickelt Beratungs-Landingpages, die Expertise klar machen, Zielgruppen präzise ansprechen und den Weg zum ersten Beratungsgespräch so kurz wie möglich halten."
  },
};

function getCityFlavor(city) {
  const flavors = {
    wien: "Wien ist Österreichs wirtschaftliches und kulturelles Zentrum — mit einer der dichtesten Konzentrationen an Selbstständigen und Freiberuflern im deutschsprachigen Raum.",
    graz: "Graz als zweitgrößte Stadt Österreichs und Hauptstadt der Steiermark bietet Selbstständigen ein lebhaftes wirtschaftliches Umfeld mit starker Start-up-Szene und wachsender Dienstleistungswirtschaft.",
    linz: "Linz verbindet Industrietradition mit digitaler Innovation — als Landeshauptstadt Oberösterreichs ist die Stadt ein starker Wirtschaftsstandort mit hoher Nachfrage nach professionellen Dienstleistungen.",
    salzburg: "Salzburg ist nicht nur Tourismusmetropole, sondern auch wichtiger Wirtschaftsstandort für die gesamte Alpenregion — mit einer kaufkräftigen, gut vernetzten Zielgruppe für Selbstständige.",
    innsbruck: "Innsbruck als Tiroler Landeshauptstadt und Universitätsstadt im Herzen der Alpen bietet Selbstständigen ein attraktives Umfeld mit internationalem Flair und starker lokaler Wirtschaft.",
    klagenfurt: "Klagenfurt am Wörthersee ist das wirtschaftliche und kulturelle Zentrum Kärntens — mit einer wachsenden Dienstleistungsszene und guter Erreichbarkeit in die Grenzregion zu Slowenien und Italien.",
    villach: "Villach als zweitgrößte Stadt Kärntens ist ein wichtiger Verkehrs- und Wirtschaftsknotenpunkt im Dreiländereck Österreich-Italien-Slowenien — mit internationalem Charakter und wachsender Nachfrage nach professionellen Services.",
    wels: "Wels ist nach Linz die zweitgrößte Stadt Oberösterreichs und ein bedeutendes Messe- und Wirtschaftszentrum — mit einer soliden mittelständischen Unternehmenslandschaft und hoher Nachfrage nach Dienstleistungen.",
    "st-poelten": "St. Pölten als Landeshauptstadt Niederösterreichs hat sich in den letzten Jahren zu einem lebhaften Wirtschaftsstandort entwickelt — mit wachsender Bedeutung als Kulturstadt und Pendlerzentrum im Großraum Wien.",
    dornbirn: "Dornbirn ist das wirtschaftliche Zentrum Vorarlbergs — die größte Stadt des westlichsten Bundeslandes Österreichs verbindet Textil- und Industrietradition mit moderner Dienstleistungswirtschaft.",
    "wiener-neustadt": "Wiener Neustadt ist ein wichtiges Wirtschaftszentrum südlich von Wien — mit starker Industriebase, Militärakademie und wachsender Dienstleistungsnachfrage in der Pendlerregion.",
    steyr: "Steyr in Oberösterreich verbindet Industriegeschichte (Steyr-Daimler-Puch) mit moderner Wirtschaft — eine solide, gut vernetzte Stadt mit wachsender Nachfrage nach professionellen Dienstleistungen.",
    feldkirch: "Feldkirch an der Grenze zu Liechtenstein und der Schweiz ist das kulturelle und wirtschaftliche Zentrum des Vorarlberger Unterlandes — mit internationalem Charakter und kaufkräftiger Zielgruppe.",
    bregenz: "Bregenz als Vorarlberger Landeshauptstadt am Bodensee ist ein attraktiver Wirtschaftsstandort im Dreiländereck — bekannt durch die Festspiele, aber auch durch eine starke, gut vernetzte Wirtschaftsgemeinschaft.",
    weiz: "Weiz in der Steiermark ist das Zentrum einer wirtschaftlich aktiven Bezirksstadt östlich von Graz — mit solider Unternehmenslandschaft und wachsender regionaler Dienstleistungsnachfrage.",
    leoben: "Leoben ist die bedeutendste Industriestadt der Steiermark mit der renommierten Montanuniversität — ein Wirtschaftsstandort mit hohem Bildungsniveau und wachsender Nachfrage nach qualifizierten Dienstleistern.",
    krems: "Krems an der Donau ist das Wirtschaftszentrum der Wachau und des nördlichen Niederösterreich — mit Universität, Kulturszene und einer kaufkräftigen, gut vernetzten regionalen Wirtschaft.",
    kapfenberg: "Kapfenberg in der Steiermark ist nach Leoben das wichtigste Industrie- und Wirtschaftszentrum der Obersteiermark — mit einer soliden Unternehmenslandschaft und wachsender Dienstleistungsnachfrage.",
    amstetten: "Amstetten ist das wirtschaftliche Zentrum des Mostviertels in Niederösterreich — mit einer soliden Unternehmenslandschaft und wachsender Nachfrage nach professionellen Dienstleistungen.",
    moedling: "Mödling liegt im direkten Einzugsgebiet von Wien und profitiert von der Nähe zur Bundeshauptstadt — ein attraktiver Markt für Selbstständige, die städtisches Niveau mit regionalem Charme verbinden.",
    klosterneuburg: "Klosterneuburg, unmittelbar nördlich von Wien gelegen, verbindet Weinbautradition mit moderner Wirtschaft — und eine kaufkräftige, gut vernetzte Zielgruppe für Selbstständige.",
    "baden-wien": "Baden bei Wien ist nicht nur Kurstadt, sondern auch ein wohlhabendes Zentrum für Dienstleistungen und selbstständige Fachleute im südlichen Niederösterreich.",
    hallein: "Hallein im Salzburger Tennengau liegt im direkten Einzugsbereich der Stadt Salzburg und bietet Selbstständigen Zugang zu einem wirtschaftlich starken, gut vernetzten regionalen Markt.",
    kufstein: "Kufstein an der Grenze zu Bayern ist ein wichtiger Wirtschaftsknotenpunkt in Tirol — mit starkem Tourismus, Industrie und einem lebhaften lokalen Dienstleistungsmarkt.",
  };
  return flavors[city.slug] || `${city.city} in ${city.region} ist ein wichtiger regionaler Wirtschaftsstandort in Österreich mit wachsender Nachfrage nach professionellen Dienstleistungen.`;
}

function generateContent(city, prof) {
  const pc = professionContent[prof.slug];
  const cityFlavor = getCityFlavor(city);

  return `
        <h2>${prof.label} in ${city.city} — professionelle Landingpage von BertlClaw</h2>
        <p>${pc.intro} ${cityFlavor}</p>

        <h2>${prof.label} in Österreich: Warum Online-Sichtbarkeit entscheidend ist</h2>
        <p>${pc.detail} In ${city.city} (${city.region}) gilt das besonders: Der lokale Markt ist aktiv, die Nachfrage nach qualifizierten ${prof.label} hoch — aber auch die Konkurrenz ist real. Wer hier mit einer klaren, professionellen Landingpage auftritt, gewinnt das Vertrauen potenzieller Klienten, bevor sie überhaupt Kontakt aufnehmen.</p>

        <h2>Was BertlClaw für ${prof.label} in ${city.city} macht</h2>
        <p>${pc.value} Die Kombination aus klarer Positionierung, überzeugenden Texten und einem professionellen Design schafft genau das: Eine Seite, die für dich arbeitet — auch wenn du gerade beim Klienten bist oder schläfst.</p>
        <p>BertlClaw arbeitet vollständig remote und betreut ${prof.label} im gesamten DACH-Raum — auch in ${city.city}. Der Prozess ist schlank: Ein kostenloses Erstgespräch, klare Aufgabenstellung, und in wenigen Tagen hast du eine fertige Landingpage, die deinen Auftritt in Österreich dauerhaft stärkt.</p>`;
}

function generatePage(city, prof) {
  const filename = `landingpage-${city.slug}-${prof.slug}.html`;
  const canonical = `https://bertlclaw.at/${filename}`;
  const title = `Landingpage für ${prof.label} in ${city.city} | BertlClaw`;
  const description = `${prof.label} in ${city.city} (${city.region}): Professionelle Landingpage und Website-Texte von BertlClaw. Klar positioniert, überzeugend getextet, schnell live.`;
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
      <span class="eyebrow">📍 ${prof.label} · ${city.city} · ${city.region}</span>
      <h1 class="accent-text">Landingpage für ${prof.label} in ${city.city}</h1>
      <p class="lead">Du bist als ${prof.keyword} in ${city.city} tätig und willst online sichtbar werden? BertlClaw erstellt professionelle Landingpages für ${prof.label} in ${city.city} (${city.region}) — klar positioniert, überzeugend getextet, in wenigen Tagen live.</p>
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
    BertlClaw · Landingpage für ${prof.label} in ${city.city} · ${city.region} · Österreich
  </footer>
</body>
</html>`;
}

// Main
let generated = 0;
let skipped = 0;
const newUrls = [];

for (const city of cities) {
  for (const prof of newProfessions) {
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
    if (generated % 20 === 0) process.stdout.write(`Generated ${generated}...\n`);
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
