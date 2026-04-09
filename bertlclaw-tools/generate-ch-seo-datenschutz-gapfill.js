#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const today = new Date().toISOString().slice(0, 10);

const cities = [
  {slug: 'aarau', label: 'Aarau', locale: 'de_CH', country: 'Schweiz', region: 'Aargau'},
  {slug: 'baden-ch', label: 'Baden', locale: 'de_CH', country: 'Schweiz', region: 'Aargau'},
  {slug: 'biel', label: 'Biel', locale: 'de_CH', country: 'Schweiz', region: 'Bern'},
  {slug: 'frauenfeld', label: 'Frauenfeld', locale: 'de_CH', country: 'Schweiz', region: 'Thurgau'},
  {slug: 'koeniz', label: 'Köniz', locale: 'de_CH', country: 'Schweiz', region: 'Bern'},
  {slug: 'kreuzlingen', label: 'Kreuzlingen', locale: 'de_CH', country: 'Schweiz', region: 'Thurgau'},
  {slug: 'olten', label: 'Olten', locale: 'de_CH', country: 'Schweiz', region: 'Solothurn'},
  {slug: 'rapperswil', label: 'Rapperswil-Jona', locale: 'de_CH', country: 'Schweiz', region: 'St. Gallen'},
  {slug: 'sion', label: 'Sion', locale: 'de_CH', country: 'Schweiz', region: 'Wallis'},
  {slug: 'uster', label: 'Uster', locale: 'de_CH', country: 'Schweiz', region: 'Zürich'},
];

const professions = [
  {slug: 'seo-berater', label: 'SEO-Berater', singular: 'SEO-Berater', emoji: '🔍'},
  {slug: 'datenschutzberater', label: 'Datenschutzberater', singular: 'Datenschutzberater', emoji: '🔒'},
];

const content = {
  'seo-berater': {
    intro: city => `SEO-Berater, die selbstständig oder als Freelancer tätig sind, wissen oft genau, wie wichtig Sichtbarkeit für ihre Kunden ist — aber die eigene Angebotsseite bleibt trotzdem zu generisch. Eine fokussierte Landingpage hilft, Expertise klar zu zeigen und den Schritt von Besuchern zu qualifizierten Anfragen deutlich leichter zu machen. ${city.label} und die Region ${city.region} bieten dafür einen spannenden Markt mit KMUs, Dienstleistern und wachsenden Digitalprojekten.`,
    why: city => `Unternehmen in ${city.label} suchen nach SEO-Unterstützung für technische Optimierung, Local SEO, Content-Strategie, Sichtbarkeitsaufbau und organische Leadgewinnung. Wer als SEO-Berater nur allgemein von Rankings spricht, wirkt austauschbar. Wer dagegen mit einer präzisen Landingpage sichtbar ist, zeigt Spezialisierung, Seriosität und echtes Verständnis für Suchintention und Geschäftsnutzen.`,
    what: city => `BertlClaw erstellt Landingpages für selbstständige SEO-Berater in ${city.label}, die Leistungen, Branchenfokus und konkrete Arbeitsweise verständlich darstellen. Statt einer diffusen Seite entsteht ein klarer Auftritt für Audits, Onpage-Optimierung, Content-Roadmaps, Local SEO oder nachhaltigen organischen Reichweitenaufbau — so, dass potenzielle Kunden schneller verstehen, warum genau dein Angebot relevant ist.`,
    process: city => `Der Einstieg ist einfach: In einem kostenlosen Erstgespräch klären wir, wie du dich als SEO-Berater in ${city.label} positionieren willst, welche Kunden du anziehen möchtest und welche Landingpage dafür den größten Hebel bietet. Danach entsteht in wenigen Tagen eine fokussierte Seite, die deinen Auftritt in der Schweiz sichtbar stärkt.`,
  },
  'datenschutzberater': {
    intro: city => `Datenschutzberater stehen für Vertrauen, Klarheit und saubere Prozesse — genau deshalb braucht auch ihr eigener Online-Auftritt Substanz. Eine professionelle Landingpage hilft, sensible Leistungen verständlich zu erklären und schon vor dem Erstkontakt Sicherheit auszustrahlen. ${city.label} und die Region ${city.region} sind ein relevanter Markt für Unternehmen, die Datenschutz und Compliance pragmatisch extern begleiten lassen wollen.`,
    why: city => `Unternehmen suchen in ${city.label} aktiv nach Unterstützung bei Datenschutz-Audits, externer Datenschutzberatung, Verzeichnissen, Richtlinien, Mitarbeiterschulungen und pragmatischer Compliance. Wer als Datenschutzberater seine Leistungen nur abstrakt beschreibt, verliert Vertrauen. Eine präzise Landingpage schafft dagegen Orientierung, Glaubwürdigkeit und einen klaren Einstieg für Erstgespräche.`,
    what: city => `BertlClaw entwickelt Landingpages für selbstständige Datenschutzberater in ${city.label}, die Leistungen, typische Einsatzfelder und Vertrauenssignale klar strukturieren. So wird aus einem trockenen oder schwer greifbaren Thema ein professioneller Auftritt, der Datenschutz, Risikoentlastung und Umsetzbarkeit verständlich vermittelt — von KMU-Beratung bis zur Rolle als externer Datenschutzbeauftragter.`,
    process: city => `Starte mit einem kostenlosen Erstgespräch: Wir klären gemeinsam, wie du dich als Datenschutzberater in ${city.label} positionieren willst, welche Zielgruppen du ansprechen möchtest und welche Landingpage den größten Hebel für deinen Schweizer Marktauftritt hat. Danach setzen wir eine fokussierte Seite um, die Kompetenz und Vertrauen sauber transportiert.`,
  }
};

const CSS = fs.readFileSync(path.join(ROOT, 'bertlclaw-tools', 'generate-dach-final.js'), 'utf8').match(/const CSS = `([\s\S]*?)`\.trim\(\);/)[1].trim();

function page(city, prof) {
  const filename = `landingpage-${city.slug}-${prof.slug}.html`;
  const url = `https://bertlclaw.at/${filename}`;
  const title = `Landingpage für ${prof.label} in ${city.label} | BertlClaw`;
  const desc = `${prof.label} in ${city.label} (${city.region}): Professionelle Landingpage und Website-Texte von BertlClaw.`;
  const schema = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Article', headline: `Landingpage für ${prof.label} in ${city.label}`,
    description: desc, author: {'@type':'Organization', name:'BertlClaw', url:'https://bertlclaw.at/'},
    publisher: {'@type':'Organization', name:'BertlClaw', url:'https://bertlclaw.at/'}, url, datePublished: today, dateModified: today, inLanguage: 'de'
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="de" href="${url}" />
  <link rel="alternate" hreflang="x-default" href="${url}" />
  <link rel="icon" href="favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" href="bertlclaw-assets/logo-32.png" />
  <link rel="apple-touch-icon" href="bertlclaw-assets/logo-180.png" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <meta property="og:site_name" content="BertlClaw" />
  <meta property="og:locale" content="${city.locale}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <script type="application/ld+json">
  ${schema}
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
      <div class="nav-actions"><a class="mini-btn" href="landingpages.html">Landingpages</a></div>
    </div>
    <div class="wrap mobile-nav-row">
      <a href="services.html">Leistungen</a><a href="use-cases.html">Anwendungsfälle</a><a href="proof.html">Proof</a><a href="ueber-bertlclaw.html">Über</a><a href="kontakt.html">Kontakt</a>
    </div>
  </nav>
  <header class="hero wrap">
    <div class="hero-inner">
      <span class="eyebrow">${prof.emoji} ${prof.label} · ${city.label} · ${city.region}</span>
      <h1 class="accent-text">Landingpage für ${prof.label} in ${city.label}</h1>
      <p class="lead">Du bist als ${prof.singular} in ${city.label} tätig und willst online sichtbar werden? BertlClaw erstellt professionelle Landingpages für ${prof.label} in ${city.label} (${city.region}) — klar positioniert, überzeugend getextet und in wenigen Tagen live.</p>
      <div class="cta"><a class="btn btn-primary" href="erstgespraech.html">Erstgespräch vereinbaren</a><a class="btn btn-secondary" href="services.html">Leistungen ansehen</a></div>
    </div>
  </header>
  <main class="wrap">
    <section class="section"><div class="article-body">
      <h2>${prof.label} in ${city.label} — professionelle Landingpage von BertlClaw</h2>
      <p>${content[prof.slug].intro(city)}</p>
      <h2>${prof.label} in der Schweiz: Warum Online-Sichtbarkeit entscheidend ist</h2>
      <p>${content[prof.slug].why(city)}</p>
      <h2>Was BertlClaw für ${prof.label} in ${city.label} macht</h2>
      <p>${content[prof.slug].what(city)}</p>
      <p>BertlClaw arbeitet vollständig remote und betreut ${prof.label} im gesamten DACH-Raum — auch in ${city.label}. Der Prozess ist schlank: Ein kostenloses Erstgespräch, klare Aufgabenstellung und in wenigen Tagen eine Landingpage, die deinen Auftritt in der Schweiz dauerhaft stärkt.</p>
      <h2>Wie du mit BertlClaw startest</h2>
      <p>${content[prof.slug].process(city)}</p>
      <p>Wenn du bereit bist — buche jetzt dein Erstgespräch. Kostenlos, unverbindlich, direkt.</p>
    </div></section>
    <section class="section">
      <div class="section-head"><span class="micro-label">Mehr erfahren</span><h2>Was kostet eine Landingpage?</h2><p>Transparente Infos zu Preisen, Paketen und was im Landingpage Sprint enthalten ist.</p></div>
      <a class="link-card" href="was-kostet-eine-landingpage.html"><div><h3 style="margin:0 0 6px">Was kostet eine Landingpage? Preise und Pakete →</h3><p>Alle Infos zu Umfang, Preisen und dem Ablauf des Landingpage Sprints von BertlClaw.</p></div><span class="link-card-arrow">→</span></a>
    </section>
    <section class="section"><div class="cta-band"><span class="micro-label">Jetzt starten</span><h2>Landingpage für ${prof.label} in ${city.label} — los geht's</h2><p>BertlClaw kennt den Schweizer Markt und betreut Selbstständige in der gesamten Deutschschweiz — mit Landingpages, die lokales Vertrauen und klares Angebot verbinden. Im kostenlosen Erstgespräch besprechen wir, wie deine Landingpage für ${city.label} aufgebaut werden sollte.</p><div class="cta"><a class="btn btn-primary" href="erstgespraech.html">Erstgespräch vereinbaren</a><a class="btn btn-secondary" href="landingpages.html">Mehr zu Landingpages</a></div></div></section>
  </main>
  <footer class="footer wrap"><div class="footer-links"><a href="index.html">Startseite</a><a href="services.html">Leistungen</a><a href="use-cases.html">Anwendungsfälle</a><a href="proof.html">Proof</a><a href="ueber-bertlclaw.html">Über BertlClaw</a><a href="arbeitsweise.html">Arbeitsweise</a><a href="faq.html">FAQ</a><a href="kontakt.html">Kontakt</a><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a><a href="agb.html">AGB</a></div>BertlClaw · Landingpage für ${prof.label} in ${city.label} · ${city.region} · ${city.country}</footer>
</body>
</html>`;
}

function updateSitemap(urls) {
  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const closing = '</urlset>';
  const entries = urls.map(url => `\n  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`).join('');
  fs.writeFileSync(sitemapPath, sitemap.replace(closing, `${entries}\n${closing}`), 'utf8');
}

const urls = [];
let generated = 0;
for (const city of cities) {
  for (const prof of professions) {
    const filename = `landingpage-${city.slug}-${prof.slug}.html`;
    const filepath = path.join(ROOT, filename);
    if (fs.existsSync(filepath)) continue;
    fs.writeFileSync(filepath, page(city, prof), 'utf8');
    urls.push(`https://bertlclaw.at/${filename}`);
    generated += 1;
    console.log(`✓ ${filename}`);
  }
}
if (urls.length) updateSitemap(urls);
console.log(`Generated ${generated} pages.`);
