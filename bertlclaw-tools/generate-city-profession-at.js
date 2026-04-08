const fs = require('fs');
const path = require('path');

const cities = [
  {city: "Wien", slug: "wien", region: "Wien"},
  {city: "Graz", slug: "graz", region: "Steiermark"},
  {city: "Linz", slug: "linz", region: "Oberösterreich"},
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
  {city: "Weiz", slug: "weiz", region: "Steiermark"},
  {city: "Leoben", slug: "leoben", region: "Steiermark"},
  {city: "Krems", slug: "krems", region: "Niederösterreich"},
  {city: "Kapfenberg", slug: "kapfenberg", region: "Steiermark"},
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

// Read nav/footer template from existing page
const template = fs.readFileSync('landingpage-salzburg.html', 'utf8');

// Extract nav and footer
const navMatch = template.match(/<nav[\s\S]*?<\/nav>/);
const footerMatch = template.match(/<footer[\s\S]*?<\/footer>/);
const nav = navMatch ? navMatch[0] : '';
const footer = footerMatch ? footerMatch[0] : '';

// Extract CSS (everything in <style> tags)
const styleMatch = template.match(/<style>[\s\S]*?<\/style>/);
const style = styleMatch ? styleMatch[0] : '';

// Extract GoatCounter
const gcMatch = template.match(/<script data-goatcounter[\s\S]*?<\/script>/);
const gc = gcMatch ? gcMatch[0] : '';

let sitemapEntries = [];
let filesGenerated = 0;

for (const city of cities) {
  for (const prof of professions) {
    const filename = `landingpage-${city.slug}-${prof.slug}.html`;
    const url = `https://bertlclaw.at/${filename}`;
    const title = `Landingpage für ${prof.label} in ${city.city} | BertlClaw`;
    const desc = `Professionelle Landingpage für ${prof.label} in ${city.city} (${city.region}). BertlClaw erstellt Website-Texte und Landingpages für Selbstständige in ganz Österreich.`;

    const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <meta property="og:site_name" content="BertlClaw" />
  <meta property="og:locale" content="de_AT" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="favicon.ico" sizes="any" />
  ${style}
  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${title}",
    "description": "${desc}",
    "author": {"@type": "Person", "name": "Dominic Reisenbichler"},
    "publisher": {"@type": "Organization", "name": "BertlClaw", "url": "https://bertlclaw.at"},
    "datePublished": "2026-04-08",
    "url": "${url}"
  }</script>
  ${gc}
</head>
<body>
  ${nav}
  <main class="wrap">
    <div class="hero" style="padding: 48px 0 24px;">
      <div class="eyebrow">${prof.label} · ${city.city} · ${city.region}</div>
      <h1>Landingpage für ${prof.label} in ${city.city}</h1>
      <p class="lead">Als ${prof.keyword} in ${city.city} brauchen Sie eine Website, die potenzielle Klienten überzeugt. BertlClaw erstellt Landingpages und Website-Texte, die Ihr Angebot klar kommunizieren — für ${prof.label} in ${city.city} und der gesamten Region ${city.region}.</p>
    </div>
    <div class="section">
      <div class="panel">
        <h2>Warum ${prof.label} in ${city.city} eine starke Landingpage brauchen</h2>
        <p>In ${city.city} ist der Markt für ${prof.label} wettbewerbsintensiv. Wer online nicht klar kommuniziert, wer er ist und was er anbietet, verliert potenzielle Klienten — noch bevor der erste Kontakt stattfindet. Eine professionelle Landingpage ist heute kein Luxus, sondern eine Grundvoraussetzung.</p>
        <p>Viele ${prof.label} in ${city.region} haben das gleiche Problem: eine generische Website, die nicht erklärt, warum jemand genau bei ihnen anfragen soll. BertlClaw löst dieses Problem mit klaren Texten und einer Landingpage-Struktur, die konvertiert.</p>
        <h2>Was BertlClaw für ${prof.label} in ${city.city} macht</h2>
        <p>Wir analysieren Ihr Angebot, Ihre Zielgruppe und Ihre Stärken — und bauen daraus eine Landingpage, die beides zeigt: Kompetenz und Menschlichkeit. Für ${prof.label} in ${city.city} bedeutet das: weniger allgemeines Blabla, mehr konkrete Aussagen die überzeugen.</p>
        <ul>
          <li>Positionierung und Angebots-Klarheit</li>
          <li>Überzeugende Website-Texte auf den Punkt</li>
          <li>Fertige, deploybare Landingpage</li>
          <li>Remote — für ganz ${city.region} und Österreich</li>
        </ul>
        <div class="cta" style="margin-top: 24px;">
          <a class="btn primary" href="erstgespraech.html">Kostenloses Erstgespräch vereinbaren</a>
          <a class="btn secondary" href="preise.html">Leistungen &amp; Preise ansehen</a>
        </div>
      </div>
    </div>
  </main>
  ${footer}
</body>
</html>`;

    fs.writeFileSync(filename, html);
    filesGenerated++;

    sitemapEntries.push(`  <url>
    <loc>${url}</loc>
    <lastmod>2026-04-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`);
  }
}

console.log(`Generated ${filesGenerated} files`);

// Append to sitemap
const sitemapPath = 'sitemap.xml';
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
const insertBefore = '</urlset>';
const newEntries = sitemapEntries.join('\n');
sitemap = sitemap.replace(insertBefore, newEntries + '\n' + insertBefore);
fs.writeFileSync(sitemapPath, sitemap);
console.log(`Sitemap updated with ${sitemapEntries.length} entries`);
