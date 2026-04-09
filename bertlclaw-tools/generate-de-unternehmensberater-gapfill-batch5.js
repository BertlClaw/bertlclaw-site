#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Vienna' }).format(new Date());
const CSS = fs.readFileSync(path.join(ROOT, 'bertlclaw-tools', 'generate-dach-final.js'), 'utf8').match(/const CSS = `([\s\S]*?)`\.trim\(\);/)[1].trim();

const cities = [
  {
    slug: 'luenen',
    label: 'Lünen',
    state: 'Nordrhein-Westfalen',
    locale: 'de_DE',
    eyebrow: '📍 Unternehmensberater in Lünen',
    cityFlavor: 'Lünen verbindet industrielles Umfeld, Mittelstand, Logistiknähe und die wirtschaftliche Dynamik des Ruhrgebiets mit einer klar regional geprägten Unternehmenslandschaft. Für Unternehmensberater ist dort eine fokussierte Landingpage hilfreich, weil Leistungen zwischen Strategie, Organisation und Transformation präzise erklärt werden müssen.',
    localBlurb: 'Für Unternehmensberatung in Lünen mit Fokus auf Mittelstand, Ruhrgebiet und klare Positionierung.'
  },
  {
    slug: 'moenchengladbach',
    label: 'Mönchengladbach',
    state: 'Nordrhein-Westfalen',
    locale: 'de_DE',
    eyebrow: '📍 Unternehmensberater in Mönchengladbach',
    cityFlavor: 'Mönchengladbach steht für produzierende Unternehmen, Handel, Logistik und einen vielseitigen Mittelstand am linken Niederrhein. Unternehmensberater profitieren dort von einer Seite, die Spezialisierung, Beratungsansatz und konkreten Nutzen ohne leere Managementfloskeln sichtbar macht.',
    localBlurb: 'Für Beratungsangebote in Mönchengladbach mit Fokus auf Mittelstand, Transformation und regionale Sichtbarkeit.'
  },
  {
    slug: 'muelheim',
    label: 'Mülheim an der Ruhr',
    state: 'Nordrhein-Westfalen',
    locale: 'de_DE',
    eyebrow: '📍 Unternehmensberater in Mülheim an der Ruhr',
    cityFlavor: 'Mülheim an der Ruhr liegt in einem wirtschaftlich dichten B2B-Umfeld zwischen Industrie, Dienstleistungen und regional vernetztem Mittelstand. Gerade dort brauchen Unternehmensberater eine Landingpage, die komplexe Beratungsleistungen verständlich herunterbricht und professionell einordnet.',
    localBlurb: 'Für Unternehmensberatung in Mülheim an der Ruhr mit Fokus auf B2B, Klarheit und Ruhrgebiet-Markt.'
  },
  {
    slug: 'neuss',
    label: 'Neuss',
    state: 'Nordrhein-Westfalen',
    locale: 'de_DE',
    eyebrow: '📍 Unternehmensberater in Neuss',
    cityFlavor: 'Neuss verbindet Logistik, Handel, Industrie und die direkte Nähe zu Düsseldorf zu einem starken Wirtschaftsstandort mit vielen B2B-Schnittstellen. Für Unternehmensberater lohnt sich dort eine Seite, die Vertrauen aufbaut und aus einem abstrakten Leistungsbild ein konkretes Angebot macht.',
    localBlurb: 'Für Beratungsangebote in Neuss mit Fokus auf Logistik, B2B-Struktur und regionale Nachfrage.'
  },
  {
    slug: 'oberhausen',
    label: 'Oberhausen',
    state: 'Nordrhein-Westfalen',
    locale: 'de_DE',
    eyebrow: '📍 Unternehmensberater in Oberhausen',
    cityFlavor: 'Oberhausen steht für Strukturwandel, Dienstleistung, Handel und ein Ruhrgebiets-Umfeld, in dem Positionierung und Differenzierung besonders wichtig sind. Unternehmensberater brauchen dort eine Landingpage, die Kompetenz schnell greifbar macht und den nächsten Schritt klar vorbereitet.',
    localBlurb: 'Für Unternehmensberatung in Oberhausen mit Fokus auf Strukturwandel, Mittelstand und klare Angebote.'
  }
];

function page(city) {
  const filename = `landingpage-${city.slug}-unternehmensberater.html`;
  const url = `https://bertlclaw.at/${filename}`;
  const title = `Landingpage für Unternehmensberater in ${city.label} | BertlClaw`;
  const desc = `Unternehmensberater in ${city.label} (${city.state}): Professionelle Landingpage und Website-Texte von BertlClaw.`;
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Landingpage für Unternehmensberater in ${city.label}`,
    description: desc,
    author: {'@type': 'Organization', name: 'BertlClaw', url: 'https://bertlclaw.at/'},
    publisher: {'@type': 'Organization', name: 'BertlClaw', url: 'https://bertlclaw.at/'},
    url,
    datePublished: today,
    dateModified: today,
    inLanguage: 'de'
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
      <span class="eyebrow">${city.eyebrow}</span>
      <h1 class="accent-text">Landingpage für Unternehmensberater in ${city.label}</h1>
      <p class="lead">Du bist als Unternehmensberater in ${city.label} tätig und willst online gefunden werden? BertlClaw erstellt professionelle Landingpages für Unternehmensberater in ${city.label} (${city.state}) — klar positioniert, überzeugend getextet und in wenigen Tagen live.</p>
      <div class="cta"><a class="btn btn-primary" href="erstgespraech.html">Erstgespräch vereinbaren</a><a class="btn btn-secondary" href="services.html">Leistungen ansehen</a></div>
    </div>
  </header>
  <main class="wrap">
    <section class="section">
      <div class="article-body">
        <h2>Unternehmensberater in ${city.label} — professionelle Landingpage von BertlClaw</h2>
        <p>Unternehmensberater stehen oft vor demselben Problem: Die eigene Leistung ist wertvoll, aber online zu abstrakt dargestellt. Eine starke Landingpage macht Beratungsansatz, Spezialisierung und Nutzen klar. ${city.cityFlavor}</p>

        <h2>Unternehmensberater in Deutschland: Warum klare Sichtbarkeit Anfragen vorbereitet</h2>
        <p>Unternehmen suchen nach Unterstützung bei Strategie, Organisation, Transformation, Wachstum, Effizienz und Führung — aber sie suchen selten nach austauschbaren Allgemeinplätzen. Wer seine Beratung auf einer fokussierten Landingpage sauber erklärt, schafft schon vor dem Erstkontakt Vertrauen. Genau das ist in ${city.label} (${city.state}) entscheidend: Sichtbarkeit allein reicht nicht, die Seite muss auch Kompetenz und Relevanz transportieren.</p>

        <h2>Was BertlClaw für Unternehmensberater in ${city.label} macht</h2>
        <p>BertlClaw entwickelt Landingpages für Unternehmensberater, die Leistungen klar strukturieren, Schwerpunkte sichtbar machen und die richtigen Kundentypen ansprechen. Statt diffuser Textblöcke entsteht eine Seite, die Positionierung, Angebot und nächsten Schritt verständlich verbindet — damit aus Sichtbarkeit qualifizierte Anfragen werden.</p>
        <p>BertlClaw arbeitet vollständig remote und betreut Unternehmensberater im gesamten DACH-Raum — auch in ${city.label}. Der Prozess ist schlank: kostenloses Erstgespräch, klare Aufgabenstellung, fokussierte Umsetzung und in wenigen Tagen eine fertige Seite, die deinen Marktauftritt in Deutschland dauerhaft stärkt.</p>

        <h2>Wie du mit BertlClaw startest</h2>
        <p>Der Einstieg ist einfach: In einem kostenlosen Erstgespräch klären wir, wie du dich als Unternehmensberater in ${city.label} positionieren willst, welche Zielgruppe du erreichen möchtest und welche Landingpage dafür den größten Hebel bietet. Ohne Umwege, ohne langen Vorlauf, aber mit einer klaren Richtung.</p>
        <p>Wenn du bereit bist — buche jetzt dein Erstgespräch. Kostenlos, unverbindlich, direkt.</p>
      </div>
    </section>
    <section class="section">
      <div class="section-head"><span class="micro-label">Mehr erfahren</span><h2>Was kostet eine Landingpage?</h2><p>Transparente Infos zu Preisen, Paketen und was im Landingpage Sprint enthalten ist.</p></div>
      <a class="link-card" href="was-kostet-eine-landingpage.html"><div><h3 style="margin:0 0 6px">Was kostet eine Landingpage? Preise und Pakete →</h3><p>Alle Infos zu Umfang, Preisen und dem Ablauf des Landingpage Sprints von BertlClaw.</p></div><span class="link-card-arrow">→</span></a>
    </section>
    <section class="section"><div class="cta-band"><span class="micro-label">Jetzt starten</span><h2>Landingpage für Unternehmensberater in ${city.label} — los geht's</h2><p>Im kostenlosen Erstgespräch besprechen wir, wie deine Landingpage für ${city.label} aufgebaut werden sollte — mit klarer Positionierung, verständlichen Texten und einem professionellen Auftritt, der Vertrauen schafft.</p><div class="cta"><a class="btn btn-primary" href="erstgespraech.html">Erstgespräch vereinbaren</a><a class="btn btn-secondary" href="landingpages.html">Mehr zu Landingpages</a></div></div></section>
  </main>
  <footer class="footer wrap"><div class="footer-links"><a href="index.html">Startseite</a><a href="services.html">Leistungen</a><a href="use-cases.html">Anwendungsfälle</a><a href="proof.html">Proof</a><a href="ueber-bertlclaw.html">Über BertlClaw</a><a href="arbeitsweise.html">Arbeitsweise</a><a href="faq.html">FAQ</a><a href="kontakt.html">Kontakt</a><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a><a href="agb.html">AGB</a></div>BertlClaw · Landingpage für Unternehmensberater in ${city.label} · ${city.state}</footer>
</body>
</html>`;
}

function ensureCityPageCard(city) {
  const file = path.join(ROOT, `landingpage-${city.slug}.html`);
  let html = fs.readFileSync(file, 'utf8');
  const href = `landingpage-${city.slug}-unternehmensberater.html`;
  if (html.includes(href)) return false;
  const insertBefore = '<span class="micro-label">Mehr erfahren</span>';
  const section = `\n    <section class="section">\n      <div class="section-head">\n        <span class="micro-label">Für Beratungsnischen</span>\n        <h2>Auch für Unternehmensberater in ${city.label}</h2>\n        <p>Wenn du in ${city.label} beratungsnahe B2B-Leistungen anbietest, lohnt sich eine fokussierte Nischenseite mit klarer Positionierung und lokaler Suchintention.</p>\n      </div>\n      <a class="link-card" href="${href}">\n        <div>\n          <h3 style="margin:0 0 6px">Landingpage für Unternehmensberater in ${city.label} →</h3>\n          <p>${city.localBlurb}</p>\n        </div>\n        <span class="link-card-arrow">→</span>\n      </a>\n    </section>\n    <section class="section">\n      <div class="section-head">\n        `;
  if (!html.includes(insertBefore)) throw new Error(`Could not find insertion point in landingpage-${city.slug}.html`);
  html = html.replace(`    <section class="section">\n      <div class="section-head">\n        ${insertBefore}`, section + insertBefore);
  fs.writeFileSync(file, html, 'utf8');
  return true;
}

function updateLandingpagesIndex() {
  const file = path.join(ROOT, 'landingpages.html');
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('DE Gap-Fill-Cluster: Unternehmensberater Batch 5')) return false;
  const anchor = '</main>';
  const section = `<section class="section"><div class="card"><h2>DE Gap-Fill-Cluster: Unternehmensberater Batch 5</h2><p>Der nächste systematische Unternehmensberater-Batch ergänzt fünf weitere deutsche Städte, in denen lokale Landingpages schon vorhanden waren, die passende Companion-Seite für <strong>Unternehmensberater</strong> aber noch fehlte. Dadurch wächst die Abdeckung weiter in sauberen, nachvollziehbaren Schritten.</p><div class="grid-3"><article class="card"><h3><a href="landingpage-luenen-unternehmensberater.html">Unternehmensberater in Lünen</a></h3><p>Für Unternehmensberatung in Lünen mit Fokus auf Mittelstand, Ruhrgebiet und klare Positionierung.</p></article><article class="card"><h3><a href="landingpage-moenchengladbach-unternehmensberater.html">Unternehmensberater in Mönchengladbach</a></h3><p>Für Beratungsangebote in Mönchengladbach mit Fokus auf Mittelstand, Transformation und regionale Sichtbarkeit.</p></article><article class="card"><h3><a href="landingpage-muelheim-unternehmensberater.html">Unternehmensberater in Mülheim an der Ruhr</a></h3><p>Für Unternehmensberatung in Mülheim an der Ruhr mit Fokus auf B2B, Klarheit und Ruhrgebiet-Markt.</p></article><article class="card"><h3><a href="landingpage-neuss-unternehmensberater.html">Unternehmensberater in Neuss</a></h3><p>Für Beratungsangebote in Neuss mit Fokus auf Logistik, B2B-Struktur und regionale Nachfrage.</p></article><article class="card"><h3><a href="landingpage-oberhausen-unternehmensberater.html">Unternehmensberater in Oberhausen</a></h3><p>Für Unternehmensberatung in Oberhausen mit Fokus auf Strukturwandel, Mittelstand und klare Angebote.</p></article></div></div></section>`;
  html = html.replace(anchor, `${section}${anchor}`);
  fs.writeFileSync(file, html, 'utf8');
  return true;
}

function updateSitemap(urls) {
  const file = path.join(ROOT, 'sitemap.xml');
  let xml = fs.readFileSync(file, 'utf8');
  const closing = '</urlset>';
  const fresh = urls.filter(url => !xml.includes(`<loc>${url}</loc>`));
  if (!fresh.length) return [];
  const entries = fresh.map(url => `\n  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`).join('');
  xml = xml.replace(closing, `${entries}\n${closing}`);
  fs.writeFileSync(file, xml, 'utf8');
  return fresh;
}

const created = [];
for (const city of cities) {
  const filename = `landingpage-${city.slug}-unternehmensberater.html`;
  const filepath = path.join(ROOT, filename);
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, page(city), 'utf8');
    created.push(filename);
  }
  ensureCityPageCard(city);
}
updateLandingpagesIndex();
const sitemapUrls = updateSitemap(cities.map(city => `https://bertlclaw.at/landingpage-${city.slug}-unternehmensberater.html`));
console.log(JSON.stringify({created, sitemapUrls}, null, 2));
