#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const TODAY = '2026-04-10';
const BASE_URL = 'https://bertlclaw.at';
const root = process.cwd();

const cities = [
  {
    city: 'Aarau', slug: 'aarau', locale: 'de_CH',
    unis: 'FHNW Campus Brugg-Windisch, PH FHNW, Nähe zu Universität Zürich und ETH Zürich',
    uniLead: 'Aarau liegt in Reichweite mehrerer großer Hochschulräume der Nordwestschweiz. Gerade Lehrbeauftragte, Forschungsnahe Berater und akademische Solo-Selbstständige aus dem Aargau profitieren davon, wenn ihr Angebot nicht nur über persönliche Netzwerke, sondern auch online klar auffindbar ist.',
    hochLead: 'Für Aarau ist vor allem das Fachhochschul- und Weiterbildungsumfeld der FHNW relevant. Wer aus Lehre, Forschung oder Hochschulprojekten in die Selbstständigkeit geht, braucht eine Seite, die Expertise in verständliche Leistungen übersetzt.'
  },
  {
    city: 'Baden', slug: 'baden-ch', locale: 'de_CH',
    unis: 'FHNW Brugg-Windisch, OST / ZHAW im erweiterten Raum, Nähe zu Universität Zürich und ETH Zürich',
    uniLead: 'Baden verbindet Technologie, Energie und Beratung. Akademische Profile aus dem Raum Baden profitieren besonders von einer klaren Landingpage, wenn sie zwischen Hochschulnähe, Industrieprojekten und selbstständiger Expertenpositionierung sichtbar werden wollen.',
    hochLead: 'Im Raum Baden ist das angewandte Hochschulumfeld besonders stark: Technik, Energie, Digitalisierung und Management treffen hier direkt auf Unternehmen. Genau deshalb funktionieren fachlich klare Hochschul-Landingpages hier besonders gut.'
  },
  {
    city: 'Biel', slug: 'biel', locale: 'de_CH',
    unis: 'Berner Fachhochschule BFH, Nähe zu Universität Bern und bilingualem Bildungsraum',
    uniLead: 'Biel ist zweisprachig, industriell geprägt und eng an den Berner Hochschulraum angebunden. Für akademische Berater, Dozenten und forschungsnahe Selbstständige ist das eine starke Ausgangslage – wenn das Angebot online ebenso klar wirkt wie fachlich.',
    hochLead: 'Die BFH und das zweisprachige Umfeld machen Biel besonders interessant für angewandte Profile aus Technik, Design, Gesundheit und Wirtschaft. Eine gute Hochschul-Landingpage hilft, diese Kompetenz ohne Jargon greifbar zu machen.'
  },
  {
    city: 'Frauenfeld', slug: 'frauenfeld', locale: 'de_CH',
    unis: 'Pädagogische Hochschule Thurgau, Nähe zu Universität Konstanz, Universität Zürich und ZHAW',
    uniLead: 'Frauenfeld profitiert von der Nähe zu Zürich, Winterthur und Konstanz. Gerade für Lehrbeauftragte, wissenschaftsnahe Coaches oder Berater aus Bildung und Verwaltung lohnt sich eine fokussierte Seite, die Erfahrung in ein klares Angebot übersetzt.',
    hochLead: 'Mit der PH Thurgau und dem Bildungsraum Ostschweiz passt Frauenfeld ideal für hochschulnahe Landingpages rund um Lehre, Weiterbildung, Didaktik, Forschungstransfer und Beratung.'
  },
  {
    city: 'Köniz', slug: 'koeniz', locale: 'de_CH',
    unis: 'Nähe zu Universität Bern, BFH und Bundesinstituten im Raum Bern',
    uniLead: 'Köniz profitiert direkt vom Berner Hochschul- und Behördenumfeld. Wer hier aus Universität, Fachhochschule oder Forschungsprojekten heraus berät, braucht vor allem eins: einen Auftritt, der Kompetenz schnell verständlich macht.',
    hochLead: 'Für Köniz ist das BFH- und Behördennahe Umfeld besonders relevant. Hochschulnahe Expertenprofile aus Bildung, Verwaltung, Gesundheit oder Technik können sich hier sehr klar auf konkrete Anfragen ausrichten.'
  },
  {
    city: 'Kreuzlingen', slug: 'kreuzlingen', locale: 'de_CH',
    unis: 'Pädagogische Hochschule Thurgau, Nähe zu Universität Konstanz und OST-/ZHAW-Raum',
    uniLead: 'Kreuzlingen liegt direkt an der Grenze und profitiert vom Hochschulraum Bodensee. Für selbstständige Akademiker mit grenzüberschreitendem oder bildungsnahen Angebot ist das eine spannende SEO-Nische mit klarer lokaler Verankerung.',
    hochLead: 'Die PH Thurgau und die Nähe zu Konstanz machen Kreuzlingen attraktiv für Lehr-, Coaching-, Forschungs- und Weiterbildungsprofile. Eine Hochschul-Landingpage hilft, diese Spezialisierung sauber sichtbar zu machen.'
  },
  {
    city: 'Olten', slug: 'olten', locale: 'de_CH',
    unis: 'FHNW, Nähe zu Universität Basel, Universität Bern und gut erreichbaren Hochschulräumen',
    uniLead: 'Olten ist verkehrstechnisch ein Drehkreuz – und genau das passt auch zu akademischen Expertenprofilen, die regional breit arbeiten. Eine Landingpage für Universitäts- und Forschungsnahe Selbstständige macht aus verstreuter Reputation ein klares Angebot.',
    hochLead: 'Im Fachhochschulkontext ist Olten besonders stark für angewandte Praxis, Weiterbildung und berufsnahe Studienmodelle. Wer daraus in Beratung, Training oder Projektarbeit geht, braucht eine fokussierte digitale Basis.'
  },
  {
    city: 'Rapperswil-Jona', slug: 'rapperswil', locale: 'de_CH',
    unis: 'OST Campus Rapperswil, Nähe zu ZHAW, Universität Zürich und ETH Zürich',
    uniLead: 'Rapperswil-Jona ist mit dem OST-Campus und der Nähe zum Zürcher Hochschulraum ein idealer Standort für akademisch geprägte Selbstständige. Besonders technische, digitale und forschungsnahe Profile profitieren hier von klarer Positionierung.',
    hochLead: 'Der OST-Campus Rapperswil steht für Ingenieurwesen, Informatik, Bau, Umwelt und angewandte Entwicklung. Genau dieses praxisnahe Hochschulumfeld eignet sich perfekt für lokale Experten-Landingpages.'
  },
  {
    city: 'Sion', slug: 'sion', locale: 'de_CH',
    unis: 'HES-SO Valais-Wallis, EPFL Valais Wallis, Nähe zu Forschungs- und Innovationsstandorten',
    uniLead: 'Sion entwickelt sich im Wallis stark in Richtung Forschung, Energie, Life Sciences und Innovation. Für Lehrende, Forschende und Spin-off-nahe Profile ist eine gut gebaute Landingpage hier ein starker Hebel für überregionale Sichtbarkeit.',
    hochLead: 'Mit HES-SO und EPFL Valais Wallis ist Sion einer der interessantesten angewandten Forschungsstandorte der Westschweiz. Hochschulnahe Selbstständige können sich hier sehr glaubwürdig an der Schnittstelle von Forschung und Markt positionieren.'
  },
  {
    city: 'Uster', slug: 'uster', locale: 'de_CH',
    unis: 'Nähe zu ZHAW, Universität Zürich, ETH Zürich und Zürcher Weiterbildungslandschaft',
    uniLead: 'Uster liegt im erweiterten Zürcher Hochschulraum und ist damit ideal für akademische Selbstständige, die nah an Universität, Forschung und anspruchsvollen Auftraggebern arbeiten. Eine gezielte Landingpage sorgt dafür, dass Expertise nicht unsichtbar bleibt.',
    hochLead: 'Für Uster ist vor allem die Nähe zu Winterthur und Zürich relevant: Fachhochschul-, Weiterbildungs- und Technologieprofile können hier mit einer klaren Hochschul-Landingpage sehr gut lokal andocken.'
  }
];

function pageHtml(c, kind) {
  const isUni = kind === 'universitaeten';
  const pageTitle = isUni
    ? `Landingpage für Lehrbeauftragte & Forscher in ${c.city} | BertlClaw`
    : `Landingpage für Hochschul-nahe Selbstständige in ${c.city} | BertlClaw`;
  const desc = isUni
    ? `Lehrbeauftragte, Forscher und Spin-off-nahe Experten in ${c.city}: mit klarer Landingpage und Positionierung online sichtbar werden. Relevant für ${c.unis}.`
    : `Hochschul-nahe Selbstständige, Dozenten und angewandte Experten in ${c.city}: mit klarer Landingpage online sichtbar werden. Relevant für ${c.unis}.`;
  const filename = `landingpage-${c.slug}-${kind}.html`;
  const canonical = `${BASE_URL}/${filename}`;
  const eyebrow = isUni ? `🎓 Für Lehrbeauftragte, Forscher & Spin-offs in ${c.city}` : `🏫 Für hochschulnahe Selbstständige in ${c.city}`;
  const hero = isUni
    ? `Akademisches Wissen in ${c.city} sichtbar machen — klar, fokussiert, anfragbar.`
    : `Hochschulnahe Expertise in ${c.city} online sichtbar machen — ohne Fachsprache-Chaos.`;
  const intro = isUni ? c.uniLead : c.hochLead;
  const h2a = isUni ? `Universitätsnahes Umfeld in ${c.city}` : `Hochschul- & Fachhochschulumfeld in ${c.city}`;
  const h2b = isUni ? `Für wen diese Seite in ${c.city} gedacht ist` : `Welche Profile in ${c.city} davon profitieren`;
  const h2c = isUni ? `Was akademische Selbstständige online oft unterschätzen` : `Was hochschulnahe Angebote online oft brauchen`;
  const ctaHead = isUni
    ? `Bereit, dein akademisches Profil in ${c.city} klar zu zeigen?`
    : `Bereit, dein hochschulnahes Angebot in ${c.city} klar zu zeigen?`;
  const ctaText = isUni
    ? `Im kostenlosen Erstgespräch schauen wir, wie dein Wissen aus Lehre, Forschung oder Spin-off-Praxis online verständlich und anfragbar wird.`
    : `Im kostenlosen Erstgespräch schauen wir, wie dein Angebot aus Fachhochschule, Weiterbildung oder angewandter Praxis online verständlich und anfragbar wird.`;

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="de" href="${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${canonical}" />
  <link rel="icon" href="favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" href="bertlclaw-assets/logo-32.png" />
  <link rel="apple-touch-icon" href="bertlclaw-assets/logo-180.png" />
  <meta property="og:title" content="${pageTitle}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <meta property="og:site_name" content="BertlClaw" />
  <meta property="og:locale" content="${c.locale}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${pageTitle}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${pageTitle.replace(/"/g,'&quot;')}","description":"${desc.replace(/"/g,'&quot;')}","author":{"@type":"Organization","name":"BertlClaw","url":"https://bertlclaw.at/"},"publisher":{"@type":"Organization","name":"BertlClaw","url":"https://bertlclaw.at/"},"url":"${canonical}","datePublished":"${TODAY}","dateModified":"${TODAY}","inLanguage":"de-CH"}</script>
  <script data-goatcounter="https://bertlclaw.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
  <style>
    :root{--bg:#040712;--bg2:#09101d;--bg3:#0d1528;--panel:rgba(13,20,38,.76);--panel-strong:rgba(15,24,45,.90);--line:rgba(129,155,255,.14);--line-strong:rgba(124,156,255,.24);--text:#eef3ff;--muted:#afbadc;--accent:#8ea8ff;--accent2:#6ee7d8;--shadow:0 30px 90px rgba(0,0,0,.45);--glow:0 0 0 1px rgba(124,156,255,.08), 0 0 45px rgba(124,156,255,.10);--max:1240px}
    *{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text);background:radial-gradient(circle at 10% 0%,rgba(124,156,255,.16),transparent 24%),radial-gradient(circle at 90% 8%,rgba(89,225,191,.10),transparent 24%),radial-gradient(circle at 50% 100%,rgba(164,143,255,.10),transparent 32%),linear-gradient(180deg,#040712 0%,#09101d 42%,#060915 100%)}
    body::before{content:"";position:fixed;inset:0;pointer-events:none;opacity:.55;background-image:linear-gradient(rgba(124,156,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,156,255,.03) 1px,transparent 1px);background-size:32px 32px;mask-image:radial-gradient(circle at center,rgba(0,0,0,.8),transparent 88%)}
    a{color:inherit;text-decoration:none} .wrap{width:min(calc(100% - 32px),var(--max));margin:0 auto;position:relative;z-index:1} .nav{position:sticky;top:0;z-index:50;background:rgba(4,7,18,.78);backdrop-filter:blur(18px);border-bottom:1px solid var(--line);box-shadow:0 10px 34px rgba(0,0,0,.22)} .nav-inner{display:flex;justify-content:space-between;align-items:center;gap:18px;padding:14px 0} .brand{display:flex;align-items:center;gap:12px;font-weight:800;letter-spacing:.02em} .brand-mark{width:52px;height:52px;border-radius:16px;overflow:hidden;display:grid;place-items:center;background:linear-gradient(135deg,rgba(124,156,255,.16),rgba(110,231,216,.14));box-shadow:var(--shadow);border:1px solid rgba(255,255,255,.12);padding:5px} .brand-mark img{width:100%;height:100%;object-fit:contain;border-radius:12px} .nav-links{display:flex;gap:18px;flex-wrap:wrap;color:var(--muted);font-size:.95rem}.nav-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:flex-end}.mini-btn{padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.03);font-size:.9rem;white-space:nowrap}.mobile-nav-row{display:none}
    h1,h2,h3{margin:0 0 14px;line-height:1.08} h1{font-size:clamp(2.4rem,5vw,4.8rem);letter-spacing:-.05em} h2{font-size:clamp(1.6rem,3vw,2.4rem);letter-spacing:-.04em} h3{font-size:1.18rem}.lead{color:var(--muted);line-height:1.82;font-size:1.08rem;max-width:66ch}.accent-text{background:linear-gradient(135deg,#eef3ff 0%,#9db8ff 46%,#7cf0d6 100%);-webkit-background-clip:text;background-clip:text;color:transparent}.micro-label{display:inline-block;margin-bottom:10px;color:#d7e3ff;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase}.section{padding:36px 0}.hero{padding:72px 0 40px}.hero-inner{max-width:860px}.eyebrow{display:inline-flex;gap:8px;align-items:center;padding:8px 14px;border-radius:999px;border:1px solid rgba(124,156,255,.24);background:rgba(124,156,255,.10);color:#dfe8ff;font-size:.82rem;letter-spacing:.05em;margin-bottom:18px}.cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}.btn{display:inline-flex;align-items:center;justify-content:center;padding:16px 22px;border-radius:14px;font-weight:700;border:1px solid transparent;font-size:1rem;min-height:48px}.btn-primary{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#08111f}.btn-secondary{background:rgba(255,255,255,.03);border-color:var(--line-strong);color:var(--text)} .card{padding:26px;border-radius:22px;border:1px solid var(--line);background:linear-gradient(180deg,rgba(18,26,47,.76),rgba(10,15,28,.72));box-shadow:var(--shadow)} .icon{width:48px;height:48px;border-radius:15px;display:grid;place-items:center;margin-bottom:14px;border:1px solid rgba(124,156,255,.22);background:linear-gradient(135deg,rgba(124,156,255,.18),rgba(89,225,191,.14));color:#e8f0ff;font-size:1.2rem}.card p{color:var(--muted);line-height:1.74;margin:10px 0 0}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.section-head{margin-bottom:28px}.section-head p,.article-body p,.article-body li{color:var(--muted);line-height:1.82}.article-body{max-width:72ch;font-size:1.05rem}.article-body h2{color:var(--text);margin:36px 0 14px;font-size:clamp(1.3rem,2.5vw,1.8rem)}.article-body ul{padding-left:22px;margin:0 0 18px;display:grid;gap:8px}.link-card{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:22px 26px;border-radius:22px;border:1px solid rgba(124,156,255,.22);background:linear-gradient(135deg,rgba(124,156,255,.08),rgba(89,225,191,.05));box-shadow:var(--shadow)}.link-card p{margin:6px 0 0;color:var(--muted);font-size:.95rem;line-height:1.7}.link-card-arrow{font-size:1.4rem;color:var(--accent2);flex:0 0 auto}.cta-band{margin-top:18px;padding:36px;border-radius:26px;border:1px solid var(--line-strong);background:linear-gradient(135deg,rgba(124,156,255,.10),rgba(89,225,191,.08)),linear-gradient(180deg,rgba(18,26,47,.92),rgba(10,15,28,.88));box-shadow:var(--shadow),var(--glow);text-align:center}.cta-band p{color:var(--muted);line-height:1.8;margin:0 auto 24px;max-width:68ch}.cta-band .cta{justify-content:center}.footer{padding:38px 0 62px;text-align:center;color:var(--muted);font-size:.94rem}.footer-links{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:14px;font-size:.92rem}@media(max-width:860px){.nav-links{display:none}.mobile-nav-row{display:flex;gap:10px;overflow:auto;padding:0 0 12px}.mobile-nav-row a{white-space:nowrap;padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.03);color:var(--text);font-size:.92rem}.grid-3{grid-template-columns:1fr}}@media(max-width:768px){.cta-band{padding:24px 18px}.link-card{flex-direction:column;align-items:flex-start}.hero{padding:52px 0 28px}.section{padding:24px 0}}@media(max-width:640px){.nav{position:fixed;top:0;left:0;right:0;padding-top:env(safe-area-inset-top,0)}body{padding-top:118px}.nav-inner{display:grid;grid-template-columns:1fr;gap:12px}.nav-actions{justify-content:flex-start}.cta .btn{width:100%}.cta-band .cta .btn{width:100%}h1{font-size:2rem}}
  </style>
</head>
<body>
  <nav class="nav"><div class="wrap nav-inner"><div class="brand"><div class="brand-mark"><img src="bertlclaw-assets/logo-main.jpg" alt="BertlClaw Logo" /></div><div>BertlClaw</div></div><div class="nav-links"><a href="services.html">Leistungen</a><a href="use-cases.html">Anwendungsfälle</a><a href="proof.html">Proof</a><a href="ueber-bertlclaw.html">Über BertlClaw</a><a href="faq.html">FAQ</a><a href="kontakt.html">Kontakt</a></div><div class="nav-actions"><a class="mini-btn" href="landingpages.html">Landingpages</a></div></div><div class="wrap mobile-nav-row"><a href="services.html">Leistungen</a><a href="use-cases.html">Anwendungsfälle</a><a href="proof.html">Proof</a><a href="ueber-bertlclaw.html">Über</a><a href="kontakt.html">Kontakt</a></div></nav>
  <header class="hero wrap"><div class="hero-inner"><span class="eyebrow">${eyebrow}</span><h1 class="accent-text">${hero}</h1><p class="lead">${intro}</p><div class="cta"><a class="btn btn-primary" href="erstgespraech.html">Kostenloses Erstgespräch</a><a class="btn btn-secondary" href="services.html">Leistungen ansehen</a></div></div></header>
  <main class="wrap">
    <section class="section"><div class="article-body">
      <h2>${h2a}</h2>
      <p>${intro}</p>
      <p>Relevant sind hier insbesondere: <strong>${c.unis}</strong>. Gerade wenn dein Angebot aus Lehre, Forschung, Weiterbildung, Transferprojekten oder akademisch geprägter Beratung kommt, brauchst du eine Seite, die für Nicht-Insider verständlich bleibt und trotzdem fachlich seriös wirkt.</p>
      <h2>${h2b}</h2>
      <p>Diese Seite passt für Lehrbeauftragte, Forschende, Spin-off-nahe Gründer, Weiterbildungsdozenten, hochschulnahe Coaches, wissenschaftsnahe Berater und Spezialisten, die aus einem akademischen Kontext heraus arbeiten – aber nicht wie ein Institut wirken wollen.</p>
      <ul><li>klare Beschreibung des Angebots statt abstrakter Fachsprache</li><li>glaubwürdige Positionierung zwischen Expertise, Praxis und Markt</li><li>eine Landingpage, die für Google und menschliche Leser funktioniert</li><li>ein nachvollziehbarer nächster Schritt statt diffuser Kontaktmöglichkeit</li><li>lokaler Bezug zu ${c.city}, ohne auf das eigene Netzwerk beschränkt zu bleiben</li></ul>
      <h2>${h2c}</h2>
      <p>Viele akademisch geprägte Selbstständige haben starke Inhalte, aber schwache Einstiege. Für Außenstehende bleibt zu unklar, worum es eigentlich geht, wer angesprochen wird und warum genau diese Expertise kaufbar oder anfragbar ist. Genau dort setzt BertlClaw an: Positionierung, Landingpage-Struktur, verständliche Texte und ein klarer nächster Schritt.</p>
      <p>Gerade in Städten wie ${c.city} funktioniert das gut, weil Hochschulnähe Vertrauen schafft – aber nur dann, wenn diese Stärke online auch sichtbar und verständlich gemacht wird.</p>
    </div></section>
    <section class="section"><div class="section-head"><span class="micro-label">Verwandter Artikel</span><h2>Selbstständige: Mehr Kunden online finden</h2><p>Die wichtigsten Hebel für Selbstständige, die online sichtbar werden wollen — von Positionierung über Landingpage bis LinkedIn.</p></div><a class="link-card" href="selbststaendige-mehr-kunden.html"><div><h3 style="margin:0 0 6px">Online nicht sichtbar — obwohl du richtig gut bist →</h3><p>Wie Selbstständige mit klarer Positionierung, Website und LinkedIn online die richtigen Kunden finden.</p></div><span class="link-card-arrow">→</span></a></section>
    <section class="section"><div class="cta-band"><span class="micro-label">Jetzt starten</span><h2>${ctaHead}</h2><p>${ctaText}</p><div class="cta"><a class="btn btn-primary" href="erstgespraech.html">Erstgespräch vereinbaren</a><a class="btn btn-secondary" href="services.html">Leistungen ansehen</a></div></div></section>
  </main>
  <footer class="footer wrap"><div class="footer-links"><a href="index.html">Startseite</a><a href="services.html">Leistungen</a><a href="use-cases.html">Anwendungsfälle</a><a href="proof.html">Proof</a><a href="ueber-bertlclaw.html">Über BertlClaw</a><a href="arbeitsweise.html">Arbeitsweise</a><a href="faq.html">FAQ</a><a href="kontakt.html">Kontakt</a><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a><a href="agb.html">AGB</a></div>BertlClaw · ${pageTitle}</footer>
</body>
</html>`;
}

let created = [];
for (const c of cities) {
  for (const kind of ['universitaeten','hochschulen']) {
    const file = path.join(root, `landingpage-${c.slug}-${kind}.html`);
    if (fs.existsSync(file)) continue;
    fs.writeFileSync(file, pageHtml(c, kind));
    created.push(path.basename(file));
  }
}

const sitemapPath = path.join(root, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
const marker = '</urlset>';
let inserts = '';
for (const file of created) {
  const loc = `${BASE_URL}/${file}`;
  if (!sitemap.includes(`<loc>${loc}</loc>`)) {
    inserts += `<url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <priority>0.7</priority>\n    <changefreq>monthly</changefreq>\n  </url>\n`;
  }
}
if (inserts) sitemap = sitemap.replace(marker, `${inserts}${marker}`);
fs.writeFileSync(sitemapPath, sitemap);
console.log(JSON.stringify({created}, null, 2));
