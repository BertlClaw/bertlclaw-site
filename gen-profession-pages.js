#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const DIR = '/home/dominic/.openclaw/workspace';

function buildPage({ slug, title, profession, keyword, emoji, h1, lead, sections, relatedLink, relatedTitle, relatedDesc, ctaH2, ctaP }) {
  const url = `https://bertlclaw.at/${slug}.html`;
  const desc = lead.replace(/<[^>]+>/g, '').substring(0, 155);
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | BertlClaw</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="de" href="${url}" />
  <link rel="alternate" hreflang="x-default" href="${url}" />
  <link rel="icon" href="favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" href="bertlclaw-assets/logo-32.png" />
  <link rel="apple-touch-icon" href="bertlclaw-assets/logo-180.png" />
  <meta property="og:title" content="${title} | BertlClaw" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <meta property="og:site_name" content="BertlClaw" />
  <meta property="og:locale" content="de_AT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title} | BertlClaw" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="https://bertlclaw.at/bertlclaw-assets/og-card.jpg" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${title}",
    "description": "${desc}",
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
    :root{--bg:#040712;--bg2:#09101d;--bg3:#0d1528;--panel:rgba(13,20,38,.76);--panel-strong:rgba(15,24,45,.90);--line:rgba(129,155,255,.14);--line-strong:rgba(124,156,255,.24);--text:#eef3ff;--muted:#afbadc;--muted2:#93a1c8;--accent:#8ea8ff;--accent2:#6ee7d8;--accent3:#c6b2ff;--shadow:0 30px 90px rgba(0,0,0,.45);--glow:0 0 0 1px rgba(124,156,255,.08), 0 0 45px rgba(124,156,255,.10);--radius:26px;--max:1240px}
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
    .section-head{margin-bottom:28px}
    .section-head p{margin:10px 0 0;color:var(--muted);line-height:1.8;max-width:68ch}
    @media(max-width:860px){.nav-links{display:none}.mobile-nav-row{display:flex;gap:10px;overflow:auto;padding:0 0 12px}.mobile-nav-row a{white-space:nowrap;padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.03);color:var(--text);font-size:.92rem}}
    @media(max-width:768px){.cta-band{padding:24px 18px}.link-card{flex-direction:column;align-items:flex-start}.hero{padding:52px 0 28px}.section{padding:24px 0}}
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
      <span class="eyebrow">${emoji} ${profession} — Online sichtbar werden</span>
      <h1 class="accent-text">${h1}</h1>
      <p class="lead">${lead}</p>
      <div class="cta">
        <a class="btn btn-primary" href="erstgespraech.html">Erstgespräch vereinbaren</a>
        <a class="btn btn-secondary" href="services.html">Leistungen ansehen</a>
      </div>
    </div>
  </header>

  <main class="wrap">
    <section class="section">
      <div class="article-body">
${sections}
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <span class="micro-label">Verwandter Artikel</span>
        <h2>${relatedTitle}</h2>
        <p>${relatedDesc}</p>
      </div>
      <a class="link-card" href="${relatedLink}">
        <div>
          <h3 style="margin:0 0 6px">${relatedTitle} →</h3>
          <p>${relatedDesc}</p>
        </div>
        <span class="link-card-arrow">→</span>
      </a>
    </section>

    <section class="section">
      <div class="cta-band">
        <span class="micro-label">Jetzt starten</span>
        <h2>${ctaH2}</h2>
        <p>${ctaP}</p>
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
    BertlClaw · ${title}
  </footer>
</body>
</html>`;
}

const professions = [
  {
    slug: "landingpage-uebersetzer",
    title: "Landingpage für Übersetzer",
    profession: "Übersetzer",
    keyword: "übersetzer freelancer website",
    emoji: "🌐",
    h1: "Als Übersetzer online gefunden werden — ohne Übersetzungsagentur.",
    lead: "Du übersetzt präzise, termingerecht und mit echtem Sprachgefühl. Doch wer sucht dich aktiv im Netz — und findet dich auch? Die meisten Übersetzer verlassen sich auf Agenturen oder Mundpropaganda. Dabei ist eine eigene, klare Online-Präsenz der effektivste Weg zu Direktmandaten mit besseren Konditionen.",
    sections: `        <h2>Warum Übersetzer eine eigene Website brauchen</h2>
        <p>Wer als freier Übersetzer für Agenturen arbeitet, gibt einen erheblichen Teil des Honorars ab — und hat wenig Einfluss auf die Kundenbeziehung. Eine eigene Website ändert das grundlegend. Sie macht dich direkt auffindbar für Unternehmen, Kanzleien, Verlage und Institutionen, die qualifizierte Übersetzer ohne Umweg suchen.</p>
        <p>Die gute Nachricht: Du musst kein Marketing-Experte werden. Du brauchst eine klare Seite, die in wenigen Sekunden erklärt, <strong>was du übersetzt, in welche Sprachen und für wen</strong> — und einen einfachen Weg zur Kontaktaufnahme.</p>

        <h2>Sprachpaare und Fachgebiete — die wichtigsten Informationen</h2>
        <p>Potenzielle Kunden suchen selten nach „Übersetzer" allgemein, sondern nach spezifischen Kombinationen: Englisch–Deutsch für Verträge, Japanisch–Deutsch für technische Handbücher, Spanisch–Deutsch für Marketing-Texte. Deine Website sollte genau diese Kombinationen klar kommunizieren.</p>
        <p>Noch wichtiger: Dein Fachgebiet. <strong>Recht, Medizin, Technik, Finanzen, Literatur, Marketing</strong> — Kunden suchen gezielt nach Spezialistinnen und Spezialisten. Wer sich als Fachübersetzer positioniert, hat einen klaren Vorteil gegenüber Generalisten und erzielt in der Regel bessere Honorare.</p>

        <h2>Vertrauen aufbauen — auch ohne hundert Referenzen</h2>
        <p>Vertrauen entsteht nicht allein durch Referenzen. Auch wenn du erst wenige direkte Kunden hattest, gibt es Wege, Kompetenz glaubwürdig zu zeigen:</p>
        <ul>
          <li>Erwähne deine Ausbildung und Zertifizierungen (staatlich geprüft, BDÜ-Mitglied o.ä.)</li>
          <li>Nenne Branchen und Themen, in denen du besondere Erfahrung mitbringst</li>
          <li>Zeige deinen Arbeitsprozess: wie du Terminologien pflegst, welche CAT-Tools du nutzt</li>
          <li>Füge eine kurze, persönliche Vita ein — Kunden wollen wissen, mit wem sie es zu tun haben</li>
        </ul>

        <h2>Anfragen generieren — nicht nur sichtbar sein</h2>
        <p>Eine Website, die nur Informationen liefert, aber keinen klaren nächsten Schritt vorgibt, verschenkt Potenzial. Jede gute Übersetzer-Landingpage hat einen klaren Call-to-Action: Eine Kontaktmöglichkeit, ein Anfrageformular für Kostenvoranschläge oder einen Link zu deinem Kalender.</p>
        <p>Dazu kommt SEO: Wer „Übersetzer Englisch Deutsch Recht" googelt, soll dich finden. Das passiert nicht von selbst — aber mit einer fokussierten Seite, die genau diese Begriffe enthält, hast du eine realistische Chance, in lokalen und fachspezifischen Suchen aufzutauchen.</p>

        <p><strong>Der Weg zu mehr Direktmandaten beginnt mit Klarheit:</strong> Wer du bist, was du übersetzt und für wen. BertlClaw hilft dir, diese Klarheit in eine Landingpage zu übersetzen — klar strukturiert, suchmaschinenoptimiert, ohne überflüssigen Aufwand.</p>`,
    relatedLink: "selbststaendige-mehr-kunden.html",
    relatedTitle: "Als Selbstständige/r online mehr Kunden finden",
    relatedDesc: "Positionierung, Website und LinkedIn — die drei wichtigsten Hebel für Selbstständige im DACH-Raum.",
    ctaH2: "Bereit, deine erste Direktanfrage zu bekommen?",
    ctaP: "Im kostenlosen Erstgespräch schauen wir gemeinsam, wie deine Übersetzer-Landingpage aufgebaut sein sollte — damit du gefunden wirst und Anfragen bekommst."
  },
  {
    slug: "landingpage-dolmetscher",
    title: "Landingpage für Dolmetscher",
    profession: "Dolmetscher",
    keyword: "dolmetscher selbstständig",
    emoji: "🎙️",
    h1: "Als Dolmetscher online buchbar werden — direkt, klar, professionell.",
    lead: "Du vermittelst zwischen Sprachen und Kulturen — in Echtzeit, unter Druck, mit hoher Verantwortung. Wer sucht dich für das nächste Gericht, die nächste Konferenz oder das nächste Business-Meeting? Wenn du online nicht auffindbar bist, verlierst du Aufträge an Kolleginnen und Kollegen, die einfach besser sichtbar sind.",
    sections: `        <h2>Die Besonderheit des Dolmetschens — und was das für deine Website bedeutet</h2>
        <p>Dolmetschen ist ein Vertrauensberuf. Wer einen Konferenzdolmetscher engagiert, stellt damit eine wichtige Brücke zwischen Gesprächspartnern her — sprachlich und kulturell. Eine professionelle Online-Präsenz ist dabei kein Luxus, sondern Grundvoraussetzung. Sie signalisiert: Ich bin vorbereitet, ich bin zuverlässig, und ich nehme meine Arbeit ernst.</p>
        <p>Gleichzeitig unterscheiden sich Dolmetscher stark in ihrer Spezialisierung: <strong>Konferenzdolmetschen, Gerichtsdolmetschen, Community-Dolmetschen, Mediendolmetschen</strong> — all das hat unterschiedliche Zielgruppen, die unterschiedliche Anforderungen stellen. Deine Website sollte sofort klar machen, in welchem Bereich du tätig bist.</p>

        <h2>Sprachpaare und Einsatzgebiete klar kommunizieren</h2>
        <p>Die wichtigsten Informationen für potenzielle Auftraggeber sind schnell aufzählt: deine Sprachkombinationen, die Art der Dolmetschtechnik (Simultan, Konsekutiv, Flüsterdolmetschen) und dein Einsatzgebiet — lokal, national oder international. Je klarer du das auf deiner Seite kommunizierst, desto gezielter landen die richtigen Anfragen bei dir.</p>
        <p>Suchmaschinen denken ähnlich. Wer „Dolmetscher Arabisch Deutsch Wien" sucht, will eine Person, keine Agentur. Mit einer auf diese Begriffe ausgerichteten Landingpage hast du gute Chancen, genau in diesen spezifischen Suchanfragen zu erscheinen.</p>

        <h2>Qualifikationen und Zertifizierungen zeigen</h2>
        <p>Gerade im Bereich Gerichtsdolmetschen sind Zulassungen und amtliche Beeidigungen entscheidend. Zeige auf deiner Website:</p>
        <ul>
          <li>Deine akademische Ausbildung und eventuelle Zertifizierungen</li>
          <li>Vereidigung als gerichtlich zertifizierter Dolmetscher (falls vorhanden)</li>
          <li>Mitgliedschaft in Berufsverbänden (z.B. UNIVERSITAS Austria, BDÜ)</li>
          <li>Branchen, in denen du besondere Erfahrung hast (Recht, Medizin, Wirtschaft)</li>
        </ul>

        <h2>Buchungsablauf einfach machen</h2>
        <p>Viele Auftraggeber wissen genau, was sie brauchen — sie wollen nur schnell wissen, ob du verfügbar und buchbar bist. Ein klarer Call-to-Action auf deiner Website (Kontaktformular, Telefonnummer, oder ein Buchungskalender) entscheidet darüber, ob eine Anfrage zu dir kommt oder zur nächsten Suchtrefferin geht.</p>
        <p>Ergänzend lohnt sich ein kurzer Abschnitt über deinen Buchungsprozess: Wie weit im Voraus sollte man buchen? Welche Unterlagen benötigst du vorab? Was sind deine Standardkonditionen? Das spart Rückfragen und wirkt professionell.</p>

        <p>BertlClaw entwickelt Landingpages für Dolmetscher, die nicht nur gut aussehen, sondern auch technisch und inhaltlich so aufgebaut sind, dass sie Anfragen generieren — von Konzernen, Gerichten, Behörden und Privatpersonen, die dich wirklich brauchen.</p>`,
    relatedLink: "landingpage-uebersetzer.html",
    relatedTitle: "Landingpage für Übersetzer",
    relatedDesc: "Wie Übersetzer mit einer eigenen Website Direktmandate gewinnen und unabhängig von Agenturen werden.",
    ctaH2: "Lass dich als Dolmetscher online finden.",
    ctaP: "Im kostenlosen Erstgespräch zeigen wir dir, wie eine Landingpage für deinen Dolmetsch-Bereich aufgebaut sein sollte — damit Auftraggeber direkt zu dir kommen."
  },
  {
    slug: "landingpage-schriftsteller",
    title: "Landingpage für Schriftsteller",
    profession: "Schriftsteller & Autoren",
    keyword: "autor schriftsteller website",
    emoji: "✍️",
    h1: "Als Autor im Netz präsent sein — Leser finden, Verlage überzeugen.",
    lead: "Du schreibst. Vielleicht Romane, Sachbücher, Kurzgeschichten oder Lyrik. Aber wer findet dich, wenn er nach jemandem wie dir sucht? Eine Autoren-Website ist kein Selbstzweck — sie ist dein erster Eindruck, deine Visitenkarte und dein wichtigstes Instrument, um Leser, Verlage und Kooperationspartner zu gewinnen.",
    sections: `        <h2>Was eine Autoren-Website leisten muss</h2>
        <p>Für Schriftstellerinnen und Schriftsteller erfüllt eine Website mehrere Funktionen gleichzeitig: Sie informiert Leserinnen und Leser über neue und bestehende Werke, überzeugt Verlage und Agenten von der Seriosität und Professionalität, und schafft einen direkten Kommunikationskanal zwischen Autor und Publikum.</p>
        <p>Dabei gilt: Weniger ist oft mehr. Eine schlichte, elegante Seite mit klarer Struktur wirkt professioneller als ein überladenes Portal. Was zählt, ist der erste Eindruck — und die klare Antwort auf die Frage: <strong>Wer bist du, und was schreibst du?</strong></p>

        <h2>Die wichtigsten Elemente einer Autoren-Landingpage</h2>
        <p>Eine starke Autoren-Website braucht im Kern vier Dinge:</p>
        <ul>
          <li><strong>Eine klare Vorstellung:</strong> Wer du bist, welche Genres du schreibst, was dich als Autorin oder Autor besonders macht</li>
          <li><strong>Deine Werke:</strong> Bücher, Artikel, Beiträge — mit Kurzbeschreibungen und Links zum Kauf oder zur weiteren Information</li>
          <li><strong>Deine Vita:</strong> Auszeichnungen, Residenzen, Veröffentlichungen, Lesungen — was dein Schreiben in einen größeren Kontext setzt</li>
          <li><strong>Kontakt und Booking:</strong> Wie erreichen dich Verlage, Journalisten, Veranstalter und interessierte Leser?</li>
        </ul>

        <h2>Sichtbarkeit für Verlage, Agenten und Leser</h2>
        <p>Verlage und Agentinnen googeln potenzielle Autorinnen und Autoren. Eine professionelle Website signalisiert: Diese Person meint es ernst. Das ist besonders wichtig, wenn du dich mit einer Idee oder einem Manuskript bewirbst — deine Online-Präsenz ist Teil deiner Bewerbung.</p>
        <p>Für Leserinnen und Leser gilt: Wer ein Buch von dir liebt, möchte mehr wissen — und idealerweise in deiner Community bleiben. Eine Website mit Newsletter-Option oder regelmäßigem Blog bindet Leserschaft langfristig.</p>

        <h2>SEO für Autoren — gefunden werden, ohne bezahlte Werbung</h2>
        <p>Wenn jemand nach deinem Namen, deinem Genre oder deinem Thema sucht, sollte deine Website als erstes erscheinen — nicht ein veralteter Eintrag in einem Buchportal. Mit gezielten Schlüsselbegriffen auf deiner Seite (Name, Genre, Region, Verlag) verbesserst du deine Chancen, organisch gefunden zu werden.</p>
        <p>Das erfordert keine technischen Kenntnisse — aber eine strukturierte Herangehensweise. BertlClaw hilft Autorinnen und Autoren, ihre Präsenz so aufzubauen, dass sie nicht nur schön aussieht, sondern auch funktioniert.</p>

        <p>Eine gute Autoren-Landingpage ist das Fundament deiner Autorenkarriere im digitalen Zeitalter. Sie öffnet Türen — bei Verlagen, Agentinnen, Lesern und Veranstaltern. Lass sie so gut werden wie dein Schreiben.</p>`,
    relatedLink: "selbststaendige-mehr-kunden.html",
    relatedTitle: "Als Selbstständige/r online mehr Kunden finden",
    relatedDesc: "Positionierung, Website und LinkedIn — die drei wichtigsten Hebel für Selbstständige im DACH-Raum.",
    ctaH2: "Deine Autoren-Website — klar, professionell, wirkungsvoll.",
    ctaP: "Im kostenlosen Erstgespräch besprechen wir, welche Art von Website zu deiner Autor-Karriere passt und wie wir sie gemeinsam aufbauen."
  },
  {
    slug: "landingpage-journalist",
    title: "Landingpage für freie Journalisten",
    profession: "Freie Journalisten",
    keyword: "freier journalist website",
    emoji: "📰",
    h1: "Als freier Journalist sichtbar sein — für Redaktionen, die dich suchen.",
    lead: "Du recherchierst, schreibst, lieferst. Aber wissen Redaktionen, dass es dich gibt? Freie Journalistinnen und Journalisten, die online nicht auffindbar sind, verlassen sich auf bestehende Kontakte. Eine professionelle Website ändert das: Sie macht dich zum aktiven Akteur auf dem Freelance-Markt.",
    sections: `        <h2>Warum freie Journalisten eine Website brauchen</h2>
        <p>Der Markt für freie Journalistinnen und Journalisten hat sich verändert. Redaktionen suchen aktiv nach Freelancern mit spezifischer Expertise — und sie googeln dabei. Wer keine Website hat oder eine veraltete, wirkt weniger professionell als jemand mit einer klaren, aktuellen Online-Präsenz.</p>
        <p>Dabei geht es nicht um Selbstvermarktung im klassischen Sinn, sondern um Auffindbarkeit und Glaubwürdigkeit. Deine Website ist der Ort, an dem du zeigst, was du kannst, welche Themen du abdeckst und wie Redakteure dich erreichen.</p>

        <h2>Portfolio und Klapptext — was nicht fehlen darf</h2>
        <p>Die wichtigsten Elemente deiner Journalisten-Website:</p>
        <ul>
          <li><strong>Klapptext / Kurzbiografie:</strong> Wer bist du, welche Medien kennst du, welche Themen sind deine Stärke?</li>
          <li><strong>Themengebiete:</strong> Politik, Wirtschaft, Wissenschaft, Kultur, Sport — je klarer, desto eher kommen die richtigen Anfragen</li>
          <li><strong>Veröffentlichungen:</strong> Links zu deinen besten Artikeln, Reportagen, Interviews, Podcasts oder TV-Beiträgen</li>
          <li><strong>Kontakt:</strong> Eine einfache, schnelle Kontaktmöglichkeit für Redakteure — Telefon oder Formular</li>
        </ul>

        <h2>Spezialisierung als Türöffner</h2>
        <p>„Ich schreibe über alles" klingt flexibel, hilft Redakteuren aber wenig. Wer dich als <strong>Experten für Klima und Umwelt</strong> kennt, ruft dich an, wenn genau das Thema aufkommt. Wer weiß, dass du Wirtschaftsthemen mit besonderer Tiefe behandelst, schickt dir genau diese Aufträge.</p>
        <p>Eine Spezialisierung schränkt nicht ein — sie schärft dein Profil. Auf deiner Website kannst du trotzdem zeigen, dass du breiter aufgestellt bist. Aber die erste Schicht sollte klar und spitz sein.</p>

        <h2>LinkedIn und Website im Zusammenspiel</h2>
        <p>Für freie Journalistinnen und Journalisten im DACH-Raum ist LinkedIn ein wichtiger Kanal. Redakteure, Chefredakteure und PR-Verantwortliche sind dort aktiv. Ein professionelles Profil, das auf deine Website verlinkt, verstärkt die Wirkung deiner Online-Präsenz deutlich.</p>
        <p>Beide Kanäle sollten dieselbe Botschaft transportieren: Deine Themenexpertise, deine Erfahrung und deine Verfügbarkeit. BertlClaw hilft dir, diese Botschaft zu schärfen und in eine Website zu übersetzen, die Redaktionen überzeugt.</p>

        <p>Als freier Journalist bist du so gut wie deine Sichtbarkeit. Wer dich nicht findet, kann dich nicht buchen — egal wie gut deine Arbeit ist. Eine starke Website ändert das.</p>`,
    relatedLink: "landingpage-texter.html",
    relatedTitle: "Landingpage für Texter",
    relatedDesc: "Wie freie Texter und Content-Creator ihre Leistungen online kommunizieren und Auftraggeber gewinnen.",
    ctaH2: "Mehr Aufträge als freier Journalist — mit einer klaren Website.",
    ctaP: "Im kostenlosen Erstgespräch besprechen wir, wie deine Journalisten-Landingpage aufgebaut sein muss, damit Redaktionen sie finden und dich kontaktieren."
  },
  {
    slug: "landingpage-pr-berater",
    title: "Landingpage für PR-Berater",
    profession: "PR-Berater",
    keyword: "pr berater selbstständig",
    emoji: "📣",
    h1: "Als PR-Berater online Kunden gewinnen — ohne Kaltakquise.",
    lead: "Du weißt, wie man Botschaften platziert, Medien bespielt und Reputation aufbaut. Aber wer baut deine eigene Reputation online auf? Als selbstständige PR-Beraterin oder PR-Berater ist deine Website das wichtigste Instrument, um das Vertrauen potenzieller Kunden zu gewinnen — bevor ihr erstes Gespräch stattfindet.",
    sections: `        <h2>PR-Beratung und das Glaubwürdigkeitsproblem</h2>
        <p>PR-Beraterinnen und PR-Berater stehen vor einer besonderen Herausforderung: Sie vermarkten andere — aber wie vermarkten sie sich selbst? Wer als PR-Profi eine schwache Online-Präsenz hat, sendet ungewollt ein Signal. Potenzielle Kunden denken: Wenn dieser Berater es nicht schafft, sich selbst gut darzustellen, wie soll er das für uns tun?</p>
        <p>Die Lösung ist eine klare, professionelle Landingpage, die genau das zeigt, was du deinen Kunden bietest: Klarheit, Struktur und überzeugende Kommunikation — diesmal für dich selbst.</p>

        <h2>Positionierung im PR-Markt</h2>
        <p>Der PR-Markt ist vielfältig: Corporate Communications, Krisen-PR, Startup-PR, Kultur-PR, politische Kommunikation, Non-Profit-PR. Je klarer du kommunizierst, in welchem Bereich du der Experte oder die Expertin bist, desto gezielter kommen die richtigen Anfragen.</p>
        <p>Auf deiner Website sollte klar sein:</p>
        <ul>
          <li>Welche Branchen du bedienst (Technologie, Gesundheit, FMCG, Mittelstand, ...)</li>
          <li>Welche Art von PR du anbietest (Medienarbeit, Content, Krisenkommunikation, Events)</li>
          <li>Was deine Kunden durch die Zusammenarbeit mit dir gewinnen</li>
        </ul>

        <h2>Case Studies und Referenzen — mit Bedacht</h2>
        <p>Natürlich unterliegt PR-Beratung oft Vertraulichkeitsvereinbarungen. Trotzdem gibt es Wege, Erfolge zu zeigen: anonymisierte Fallbeispiele, branchenbezogene Beschreibungen, Testimonials von Kunden, die sich öffentlich zu einer Zusammenarbeit bekennen. Auch Awards, Medienpräsenz und Gastbeiträge sind starke Vertrauenssignale.</p>
        <p>Wichtig: Authentizität. Wer im PR-Bereich arbeitet, weiß, dass übertriebene Selbstvermarktung schnell nach hinten losgeht. Ein nüchterner, sachlicher Ton, der deine Kompetenz zeigt, wirkt glaubwürdiger als blumige Versprechen.</p>

        <h2>Content als PR-Instrument für dich selbst</h2>
        <p>Als PR-Berater weißt du: Regelmäßige Sichtbarkeit schlägt punktuelle Aufmerksamkeit. Das gilt auch für deine eigene Website. Ein Blog oder Artikel-Bereich, in dem du über aktuelle PR-Trends, Fallstudien oder Medienpolitik schreibst, macht dich nicht nur auffindbar, sondern baut deine Expertise sichtbar auf.</p>
        <p>BertlClaw hilft dir, diesen Bereich strategisch zu konzipieren — nicht als Content-Treadmill, sondern als durchdachtes Instrument für Sichtbarkeit und Glaubwürdigkeit.</p>

        <p>Deine PR-Landingpage sollte so gut sein wie deine beste Medienkampagne. Mit BertlClaw machen wir sie genau das — strategisch, klar und überzeugend.</p>`,
    relatedLink: "freelancer-positionierung-schritt-fuer-schritt.html",
    relatedTitle: "Positionierung als Freelancer entwickeln – Schritt für Schritt",
    relatedDesc: "Von den eigenen Stärken zur fertigen Positionierung: eine strukturierte Anleitung für Selbstständige.",
    ctaH2: "Deine PR-Beratung — endlich auch online stark.",
    ctaP: "Im kostenlosen Erstgespräch erarbeiten wir gemeinsam, wie deine PR-Berater-Website Vertrauen aufbaut und die richtigen Kunden anzieht."
  },
  {
    slug: "landingpage-kuenstler",
    title: "Landingpage für Künstler",
    profession: "Künstler & Bildende Kunst",
    keyword: "künstler website landingpage",
    emoji: "🎨",
    h1: "Deine Kunst online präsentieren — und davon leben.",
    lead: "Du schaffst Werke, die berühren, überraschen und bleiben. Aber wer sieht sie — außer im Atelier oder bei Ausstellungen? Eine starke Online-Präsenz bringt deine Kunst zu Sammlern, Galerien, Kuratoren und Kunstkäufern, die aktiv suchen. Sie ist kein Kompromiss, sondern die Bühne, die deine Arbeit verdient.",
    sections: `        <h2>Warum bildende Künstler eine eigene Website brauchen</h2>
        <p>Instagram und andere soziale Plattformen sind nützlich — aber sie gehören dir nicht. Algorithmen entscheiden, wer deine Werke sieht. Deine eigene Website ist der einzige Ort im Netz, über den du vollständige Kontrolle hast. Sie ist dein Portfolio, dein Shop, deine Biografie und dein Pressematerial in einem.</p>
        <p>Und: Galerien, Sammler und Kuratoren, die ernsthaftes Interesse haben, suchen nach einer professionellen Website — nicht nur nach einem Instagram-Account. Deine digitale Präsenz ist Teil deiner künstlerischen Identität.</p>

        <h2>Portfolio — die Kernfunktion deiner Künstler-Website</h2>
        <p>Das Herzstück ist dein Portfolio. Es sollte deine Werke in hoher Qualität zeigen — mit Titeln, Formaten, Materialien und Entstehungsjahren. Wichtig ist dabei die Kuratierung: Nicht alle Werke, sondern die, die dein Schaffen am besten repräsentieren.</p>
        <p>Strukturiere dein Portfolio sinnvoll: nach Serien, Themen oder Medien. Das macht es für Besucher leichter zu navigieren und für Galerien einfacher, einzuschätzen, ob deine Arbeit zu ihrem Programm passt.</p>

        <h2>Biografie, Statement und Presse</h2>
        <p>Drei Texte, die auf keiner Künstler-Website fehlen dürfen:</p>
        <ul>
          <li><strong>Künstlerbiografie:</strong> Ausbildung, Ausstellungen, Preise, Residenzen — sachlich und aktuell</li>
          <li><strong>Künstlerstatement:</strong> Was treibt dich an? Welche Fragen stellt deine Arbeit? — authentisch und persönlich</li>
          <li><strong>Pressebereich:</strong> Fotos, Pressemitteilungen, Kataloge für Journalisten und Galerien zum Download</li>
        </ul>

        <h2>Direktverkauf und Kontakt</h2>
        <p>Immer mehr Sammler kaufen Kunst direkt online. Wenn du originale Werke oder Prints verkaufst, kann deine Website ein direkter Verkaufskanal sein — ohne Galeriegebühren. Wichtig ist dabei eine klare Preis- und Verfügbarkeitskommunikation sowie ein unkomplizierter Kontaktweg.</p>
        <p>Auch wer nicht direkt über die Website verkauft, sollte eine einfache Kontaktmöglichkeit anbieten — für Galerienanfragen, Ausstellungskooperationen, Kommissionsanfragen oder Presse.</p>

        <p>BertlClaw gestaltet Künstler-Landingpages, die deine Arbeit würdevoll präsentieren, technisch sauber aufgebaut sind und die richtigen Menschen ansprechen. Deine Kunst ist gut — lass die Welt das wissen.</p>`,
    relatedLink: "landingpage-fotografen.html",
    relatedTitle: "Landingpage für Fotografen",
    relatedDesc: "Wie Fotografen ihre Arbeit online präsentieren und neue Aufträge gewinnen.",
    ctaH2: "Deine Kunst verdient eine starke Online-Bühne.",
    ctaP: "Im kostenlosen Erstgespräch besprechen wir, wie deine Künstler-Website aufgebaut sein sollte — damit Galerien, Sammler und Kuratoren dich finden und kontaktieren."
  },
  {
    slug: "landingpage-musiker",
    title: "Landingpage für Musiker",
    profession: "Musiker",
    keyword: "musiker band website",
    emoji: "🎵",
    h1: "Als Musiker online buchbar sein — mehr Gigs, bessere Anfragen.",
    lead: "Du spielst live, produzierst Musik, gibst Unterricht — oder alles davon. Wer kennt dich außerhalb deines Netzwerks? Eine professionelle Musiker-Website macht dich für Veranstalter, Eventplaner, Labels und private Kunden auffindbar und buchbar. Ohne Manager, ohne Umwege.",
    sections: `        <h2>Was eine Musiker-Website leisten sollte</h2>
        <p>Für Musikerinnen und Musiker ist die Website Bühne, Pressemappe und Buchungskanal in einem. Veranstalter wollen schnell wissen: Welchen Stil spielst du? Wo hast du schon gespielt? Wie buchst man dich? Wie viel kostet das? Wer diese Fragen auf deiner Website schnell beantwortet findet, ist eher bereit, eine Anfrage zu schicken.</p>
        <p>Das gilt für Solokünstlerinnen genauso wie für Bands oder Ensembles. Der erste Eindruck zählt — und der entsteht oft auf der Website, noch bevor jemand eine Note von dir gehört hat.</p>

        <h2>Musik hörbar und sichtbar machen</h2>
        <p>Die wichtigsten Inhalte einer Musiker-Website:</p>
        <ul>
          <li><strong>Hörproben:</strong> Embedded Audio oder Video-Clips — die Besucher wollen hören, nicht nur lesen</li>
          <li><strong>Fotos:</strong> Professionelle Bilder von dir / der Band, die Veranstalter für Flyer und Programme verwenden können</li>
          <li><strong>Bio und Vita:</strong> Wer bist du, wo hast du gespielt, welche Auszeichnungen hast du erhalten?</li>
          <li><strong>Repertoire oder Setlist:</strong> Besonders wichtig für Cover-Künstler, DJ-Sets oder klassische Ensembles</li>
          <li><strong>Booking-Informationen:</strong> Kontakt, Preisrahmen, Rider-Info</li>
        </ul>

        <h2>Live-Auftritte und Streaming — beides gehört dazu</h2>
        <p>Nicht nur Live-Buchungen sind relevant. Wer regelmäßig streamt, auf YouTube oder Spotify präsent ist oder Musik zum Download anbietet, sollte das ebenfalls auf der Website integrieren. Social-Media-Links, Streaming-Plattformen und ein Newsletter-Eintrag halten Fans und Veranstalter auf dem Laufenden.</p>

        <h2>Lokale Sichtbarkeit für Musiker</h2>
        <p>Wenn du in einer bestimmten Region buchbar bist, lohnt es sich, das auf der Website klar zu kommunizieren. Wer in Wien oder der Steiermark nach einem Jazzquartett für eine Hochzeit sucht, soll dich finden — nicht eine Agentur aus Hamburg. Lokale Suchbegriffe auf deiner Website erhöhen die Chance, in regionalen Suchanfragen zu erscheinen.</p>
        <p>BertlClaw unterstützt Musikerinnen und Musiker beim Aufbau einer Website, die professionell wirkt, technisch sauber ist und bei Google für die richtigen Suchanfragen sichtbar wird.</p>

        <p>Mehr Gigs beginnen mit mehr Sichtbarkeit. Deine Musik verdient ein Publikum — fang online damit an.</p>`,
    relatedLink: "selbststaendige-mehr-kunden.html",
    relatedTitle: "Als Selbstständige/r online mehr Kunden finden",
    relatedDesc: "Positionierung, Website und Sichtbarkeit — die wichtigsten Hebel für Kreative und Freelancer.",
    ctaH2: "Mehr Gigs durch eine bessere Website.",
    ctaP: "Im kostenlosen Erstgespräch schauen wir, welche Art von Musiker-Landingpage für dich und deine Zielgruppe am besten funktioniert."
  },
  {
    slug: "landingpage-videograf",
    title: "Landingpage für Videografen",
    profession: "Videografen",
    keyword: "videograf freelancer website",
    emoji: "🎬",
    h1: "Als Videograf online gefunden werden — und Wunschkunden gewinnen.",
    lead: "Du weißt, wie man Geschichten erzählt — visuell, bewegend, mit Wirkung. Aber wenn dein Showreel nur in deiner Mappe liegt oder auf Vimeo vergraben ist, verlierst du Anfragen an Videografen, die besser sichtbar sind. Deine Landingpage ist das Fenster, durch das Kunden dich sehen.",
    sections: `        <h2>Der erste Eindruck: Was eine Videografen-Website leisten muss</h2>
        <p>Wer einen Videografen sucht, hat eine klare Erwartung: Er will sehen, was du kannst — und zwar sofort. Das bedeutet: Dein Showreel oder deine stärksten Clips müssen above the fold sichtbar sein. Kein langes Scrollen, kein Suchen. Die ersten Sekunden auf deiner Website entscheiden, ob jemand bleibt oder geht.</p>
        <p>Gleichzeitig muss die Website mehr liefern als Bewegtbild: Sie muss auch erklären, für wen du arbeitest, was du anbietest und wie man dich beauftragt.</p>

        <h2>Portfolio — kuratiert, nicht vollständig</h2>
        <p>Zeige nicht alles, was du je gedreht hast — sondern das, was du wieder drehen willst. Wenn du dich auf Unternehmensfilme spezialisierst, präsentiere Unternehmensfilme. Wenn du Hochzeitsvideos drehst, zeige deine emotionalsten Hochzeitsarbeiten. Kuration signalisiert Klarheit und Professionalität.</p>
        <p>Für jedes Projekt empfiehlt sich eine kurze Beschreibung: Auftraggeber, Kontext, deine Rolle. Das macht die Referenzen greifbarer und schafft Vertrauen.</p>

        <h2>Spezialisierung als Differenzierungsmerkmal</h2>
        <p>Der Videografie-Markt ist hart umkämpft. Was dich von anderen unterscheidet, ist deine Nische:</p>
        <ul>
          <li>Produkt- und Werbefilme für E-Commerce-Brands</li>
          <li>Imagefilme und Corporate Videos</li>
          <li>Social-Media-Content für Instagram und TikTok</li>
          <li>Event-Dokumentation und Konferenzvideos</li>
          <li>Kurzfilme und kreative Projekte</li>
        </ul>
        <p>Je klarer deine Spezialisierung auf der Website erkennbar ist, desto gezielter kommen Anfragen von Kunden, die genau das suchen.</p>

        <h2>Preise und Prozess kommunizieren</h2>
        <p>Viele Videografen scheuen sich, Preise zu nennen. Dabei wollen potenzielle Kunden zumindest einen Preisrahmen verstehen, bevor sie eine Anfrage schicken. Ein „ab X Euro" oder eine klare Beschreibung, was in deinen Paketen enthalten ist, reduziert Rückfragen und zieht qualifiziertere Anfragen an.</p>
        <p>Ergänzend hilft ein kurzer Abschnitt über deinen Produktionsprozess: von der Planung über den Drehtag bis zur Nachbearbeitung. Das baut Vertrauen auf und zeigt, dass du strukturiert arbeitest.</p>

        <p>BertlClaw baut Videografen-Landingpages, die deine Arbeit ins Zentrum stellen — technisch sauber, suchmaschinenoptimiert und klar auf Conversion ausgerichtet.</p>`,
    relatedLink: "landingpage-fotografen.html",
    relatedTitle: "Landingpage für Fotografen",
    relatedDesc: "Wie Fotografen mit einer starken Website Aufträge gewinnen und sich klar positionieren.",
    ctaH2: "Mehr Videoproduktions-Aufträge durch bessere Sichtbarkeit.",
    ctaP: "Im kostenlosen Erstgespräch schauen wir gemeinsam, wie deine Videografen-Landingpage aufgebaut sein muss, damit Wunschkunden dich finden."
  },
  {
    slug: "landingpage-webdesigner",
    title: "Landingpage für Webdesigner",
    profession: "Webdesigner",
    keyword: "webdesigner freelancer website",
    emoji: "🖥️",
    h1: "Als Webdesigner online punkten — die eigene Website als Bewerbung.",
    lead: "Deine Arbeit dreht sich darum, dass andere im Netz überzeugen. Aber was ist mit dir? Als freier Webdesigner ist deine eigene Website nicht nur Visitenkarte — sie ist dein leistungsstärkstes Portfolio. Wer hier überzeugt, braucht keine Kaltakquise mehr.",
    sections: `        <h2>Die doppelte Herausforderung für Webdesigner</h2>
        <p>Webdesignerinnen und Webdesigner kennen das Problem: Die eigene Website wird immer hintenangestellt. Kundenprojekte haben Priorität, und die eigene Seite bleibt veraltet oder halbfertig. Dabei ist sie das erste, was potenzielle Kunden sehen — und das erste, wonach sie dich beurteilen.</p>
        <p>Was zählt: Eine eigene Website, die nicht nur gut aussieht, sondern auch klar kommuniziert, was du anbietest, für wen und was einen Job mit dir von anderen unterscheidet. Und die konvertiert — also zu echten Anfragen führt.</p>

        <h2>Portfolio — zeigen statt erklären</h2>
        <p>Das Portfolio ist das Herzstück jeder Webdesigner-Website. Aber: Nicht möglichst viele Projekte, sondern die richtigen. Zeige Projekte, die zu den Kunden passen, die du anziehen willst. Beschreibe dabei nicht nur das Endprodukt, sondern deinen Prozess: Welches Problem hat der Kunde gehabt? Wie hast du es gelöst? Was waren die Ergebnisse?</p>
        <p>Case Studies mit Vorher-Nachher-Vergleichen oder messbaren Ergebnissen (z.B. Ladezeit verbessert, Conversion erhöht) sind besonders überzeugend.</p>

        <h2>Positionierung als Webdesigner</h2>
        <p>Der Markt für Webdesign ist groß. Was dich differenziert:</p>
        <ul>
          <li>Branchen-Fokus (z.B. Webdesign für Handwerksbetriebe, Coaches oder Agenturen)</li>
          <li>Tool-Spezialisierung (Webflow, WordPress, Shopify, Custom-Code)</li>
          <li>Kombination mit anderen Skills (UX-Design, SEO, Copywriting)</li>
          <li>Preissegment und Zielkundengröße</li>
        </ul>
        <p>Wer sich klar positioniert, wird öfter gefragt — und öfter für genau die Projekte gefragt, die er oder sie machen möchte.</p>

        <h2>Vertrauen durch Prozess-Transparenz</h2>
        <p>Viele Kunden haben schlechte Erfahrungen mit Webdesignern gemacht: Projekte, die nie fertig wurden, Preise, die explodierten, fehlende Kommunikation. Du kannst dich davon abheben, indem du deinen Prozess transparent beschreibst: Was passiert nach der Anfrage? Wie sieht ein typisches Projekt aus? Was ist in deinen Paketen enthalten?</p>
        <p>Transparenz baut Vertrauen auf und zieht Kunden an, die diese Klarheit schätzen — und entsprechend gut zusammenarbeiten.</p>

        <p>BertlClaw hilft Webdesignerinnen und Webdesignern, ihre eigene Website so aufzubauen, dass sie zu Aufträgen führt — strukturiert, klar und mit den richtigen Keywords für Google.</p>`,
    relatedLink: "landingpage-webentwickler.html",
    relatedTitle: "Landingpage für Webentwickler",
    relatedDesc: "Wie Webentwickler ihre Expertise online kommunizieren und Wunschkunden gewinnen.",
    ctaH2: "Deine Webdesign-Website — endlich so gut wie deine Kundenprojekte.",
    ctaP: "Im kostenlosen Erstgespräch besprechen wir, wie wir deine Webdesigner-Landingpage strategisch aufbauen, damit sie für dich arbeitet."
  },
  {
    slug: "landingpage-innenarchitekten",
    title: "Landingpage für Innenarchitekten",
    profession: "Innenarchitekten",
    keyword: "innenarchitekt selbstständig",
    emoji: "🏠",
    h1: "Als Innenarchitekt neue Projekte gewinnen — mit einer Website, die überzeugt.",
    lead: "Du gestaltest Räume, die Menschen bewegen. Wohnungen, Büros, Hotels, Restaurants — deine Arbeit ist sichtbar und erlebbar. Aber wie findest du neue Kunden, die genau das suchen, was du kannst? Eine professionelle Innenarchitektur-Website ist dein stärkstes Akquiseinstrument.",
    sections: `        <h2>Warum Innenarchitekten online präsent sein müssen</h2>
        <p>Wer eine Wohnung renovieren oder ein Büro gestalten lassen will, googelt. Er schaut sich Portfolios an, vergleicht Stile, liest Bewertungen. Wenn du in diesen Momenten nicht sichtbar bist, verlierst du Anfragen an Kolleginnen und Kollegen, die online besser aufgestellt sind — unabhängig von deiner fachlichen Qualität.</p>
        <p>Eine professionelle Innenarchitektur-Landingpage ändert das. Sie macht dich auffindbar, zeigt deinen Stil und schafft Vertrauen — noch bevor das erste Gespräch stattgefunden hat.</p>

        <h2>Portfolio — deine stärkste Sprache</h2>
        <p>In keiner Branche ist das Portfolio so entscheidend wie in der Innenarchitektur. Hochwertige Fotos deiner Projekte sprechen mehr als jeder Text. Achte auf professionelle Fotografie — verwackelte Handyfotos schaden mehr als sie helfen.</p>
        <p>Strukturiere dein Portfolio nach Projektkategorien: Wohnraum, Gewerbeimmobilien, Gastronomie, Hotellerie, Büro. Kurze Projekttexte mit Kontext (Auftraggeber, Fläche, besondere Herausforderungen) machen die Referenzen greifbarer.</p>

        <h2>Zielgruppe klar definieren</h2>
        <p>Nicht jeder Innenarchitekt arbeitet für jeden Kunden. Eine Spezialisierung macht deine Website stärker:</p>
        <ul>
          <li>Privatpersonen, die ihre Wohnung oder ihr Haus gestalten lassen wollen</li>
          <li>Unternehmen und Gewerbetreibende für Büro- oder Ladengestaltung</li>
          <li>Hotellerie und Gastronomie</li>
          <li>Denkmalpflege und historische Gebäude</li>
          <li>Nachhaltige und ökologische Innenarchitektur</li>
        </ul>
        <p>Je klarer deine Zielgruppe, desto gezielter kommen die Anfragen — und desto höher ist die Wahrscheinlichkeit, dass sie zu dir passen.</p>

        <h2>Beratungsangebot und erste Schritte erklären</h2>
        <p>Viele potenzielle Kunden wissen nicht, wie eine Zusammenarbeit mit einem Innenarchitekten abläuft. Was kostet das? Wie lange dauert es? Wer macht was? Ein kurzer Abschnitt, der den Prozess erklärt — von der ersten Besichtigung bis zur Fertigstellung — baut Hemmschwellen ab und animiert zur Kontaktaufnahme.</p>
        <p>BertlClaw hilft Innenarchitektinnen und Innenarchitekten, ihre Online-Präsenz aufzubauen, die zu ihrer Ästhetik passt und gleichzeitig suchmaschinenoptimiert ist — damit die richtigen Kunden sie finden.</p>

        <p>Deine Arbeit ist zu schön, um nicht gesehen zu werden. Zeig sie der Welt.</p>`,
    relatedLink: "landingpage-architekten.html",
    relatedTitle: "Landingpage für Architekten",
    relatedDesc: "Wie Architekten ihre Leistungen online positionieren und neue Bauprojekte gewinnen.",
    ctaH2: "Mehr Projektanfragen als Innenarchitekt.",
    ctaP: "Im kostenlosen Erstgespräch besprechen wir, wie deine Innenarchitektur-Website aussehen und funktionieren soll — damit Wunschkunden auf dich zukommen."
  },
  {
    slug: "landingpage-elektriker",
    title: "Landingpage für Elektriker",
    profession: "Elektriker",
    keyword: "elektriker selbstständig website",
    emoji: "⚡",
    h1: "Als selbstständiger Elektriker online gefunden werden — lokal und schnell.",
    lead: "Wenn in der Sicherung etwas fliegt oder eine Küche neu verkabelt werden muss, suchen Menschen im Netz — und zwar sofort. Wenn dein Name dabei nicht auftaucht, bleibt der Auftrag beim Kollegen, der besser sichtbar ist. Eine klare Elektriker-Website macht dich zur ersten Wahl in deiner Region.",
    sections: `        <h2>Lokale Sichtbarkeit — das A und O für Elektriker</h2>
        <p>Als selbstständiger Elektriker ist dein Markt lokal. Du arbeitest in deiner Stadt, deinem Bezirk, deiner Region — und genau dort musst du gefunden werden. Das bedeutet: Deine Website muss klar kommunizieren, wo du tätig bist, was du anbietest und wie man dich schnell erreicht.</p>
        <p>Wer „Elektriker Wien 22. Bezirk" googelt, will sofort sehen: Name, Telefonnummer, Leistungen, und idealerweise Bewertungen. Keine Romane, keine Philosophie — sondern Klarheit.</p>

        <h2>Leistungen klar und vollständig auflisten</h2>
        <p>Potenzielle Kunden wollen wissen, was du kannst. Eine klare Leistungsübersicht auf deiner Website gibt ihnen Sicherheit:</p>
        <ul>
          <li>Neuinstallationen und Erweiterungen</li>
          <li>Reparaturen und Störungsbehebung</li>
          <li>Überprüfungen und Abnahmen (E-Check)</li>
          <li>Smart-Home-Installationen</li>
          <li>Photovoltaik und Ladeinfrastruktur (E-Mobilität)</li>
          <li>Notdienst / 24h-Service</li>
        </ul>
        <p>Wer Notdienst anbietet, sollte das prominent platzieren — das ist oft der dringlichste Suchgrund.</p>

        <h2>Vertrauen aufbauen — Bewertungen und Referenzen</h2>
        <p>Im Handwerk entscheidet Vertrauen. Kundenbewertungen sind das effektivste Vertrauenssignal, das du auf deine Website bringen kannst. Verlinke deine Google-Bewertungen oder bette ausgewählte Kundenstimmen ein. Zeige auch, für welche Art von Projekten du stehst — Privatpersonen, Gewerbe, Neubau, Altbau.</p>
        <p>Zertifizierungen und Konzessionen (z.B. als konzessionierter Elektrotechniker in Österreich) gehören ebenfalls auf die Website. Sie sind Pflichtangaben — und gleichzeitig starke Vertrauenssignale.</p>

        <h2>Anfragen einfach machen</h2>
        <p>Der Kontaktweg muss so einfach wie möglich sein. Telefonnummer groß und klickbar (auch mobil!), ein kurzes Kontaktformular, idealerweise mit der Möglichkeit, das Problem kurz zu beschreiben. Je weniger Hürden, desto mehr Anfragen.</p>
        <p>BertlClaw baut Elektriker-Landingpages, die lokal auffindbar sind, Vertrauen aufbauen und Anfragen generieren — schnell, klar und ohne Schnickschnack.</p>

        <p>Mehr Aufträge beginnen damit, gefunden zu werden. Mach den ersten Schritt.</p>`,
    relatedLink: "landingpage-handwerker.html",
    relatedTitle: "Landingpage für Handwerker",
    relatedDesc: "Wie Handwerksbetriebe mit einer klaren Website mehr lokale Aufträge gewinnen.",
    ctaH2: "Mehr Elektrikeraufträge aus deiner Region.",
    ctaP: "Im kostenlosen Erstgespräch schauen wir, wie deine Elektriker-Website lokal sichtbar wird und mehr Anfragen bringt."
  },
  {
    slug: "landingpage-installateur",
    title: "Landingpage für Installateure",
    profession: "Installateure & Klempner",
    keyword: "installateur klempner website",
    emoji: "🔧",
    h1: "Als Installateur mehr Aufträge aus der Region — mit einer Website, die arbeitet.",
    lead: "Ein Rohrbruch duldet keinen Aufschub. Wenn Menschen im Notfall oder für die geplante Badezimmersanierung einen Installateur suchen, googeln sie — und buchen den Ersten, dem sie vertrauen. Bist du dabei? Eine klare Landingpage macht dich zur ersten Wahl in deiner Region.",
    sections: `        <h2>Sofortige Auffindbarkeit — warum das bei Installateuren besonders zählt</h2>
        <p>Anders als in vielen Branchen suchen Menschen einen Installateur oft unter Zeitdruck: Der Boiler ist ausgefallen, die Heizung streikt, das Rohr leckt. In diesen Momenten entscheidet die Google-Suche, wer den Auftrag bekommt. Wer in den ersten Ergebnissen erscheint, hat den klaren Vorteil.</p>
        <p>Das bedeutet: Deine Website muss lokal optimiert sein. Dein Einzugsgebiet, deine Stadt, dein Bezirk — das alles muss auf der Seite stehen. So weiß Google, für welche Suchanfragen du relevant bist.</p>

        <h2>Leistungsübersicht — von Notfall bis Badezimmer</h2>
        <p>Installateure und Klempner decken ein breites Leistungsspektrum ab. Zeige auf deiner Website klar, was du anbietest:</p>
        <ul>
          <li>Sanitärinstallationen (Badezimmer, Küche, WC)</li>
          <li>Heizungsanlagen und Wartung</li>
          <li>Trinkwasser- und Abwasserleitungen</li>
          <li>Rohrbruch-Notdienst und Entstopfung</li>
          <li>Gasinstallationen und Zertifizierungen</li>
          <li>Solarthermie und erneuerbare Wärme</li>
        </ul>
        <p>Ein eigener Bereich für Notdienst mit prominenter Telefonnummer ist Pflicht — das sind oft die dringlichsten Anfragen.</p>

        <h2>Preistransparenz — so viel wie möglich</h2>
        <p>Kunden scheuen Überraschungen. Wer auf seiner Website kommuniziert, dass Anfahrtskosten pauschal berechnet werden, ein Stundenpreis gilt oder bestimmte Standardleistungen Festpreise haben, schafft Vertrauen — und zieht Kunden an, die gute Qualität zum fairen Preis suchen.</p>
        <p>Du musst keine komplette Preisliste veröffentlichen. Aber ein Hinweis wie „Transparente Kostenaufstellung vor Beginn der Arbeiten" macht bereits einen Unterschied.</p>

        <h2>Bewertungen und lokale Glaubwürdigkeit</h2>
        <p>Im Handwerk ist Mundpropaganda immer noch mächtig — aber Google-Bewertungen sind die digitale Version davon. Bitte zufriedene Kunden aktiv um eine Bewertung und zeige diese auf deiner Website. Das stärkt deine Glaubwürdigkeit immens und erhöht die Chance, dass Neukunden sich für dich entscheiden.</p>
        <p>BertlClaw baut Installateur-Landingpages, die in Google-Suchergebnissen gut ranken, Vertrauen aufbauen und Anfragen generieren — für Notfälle und geplante Projekte.</p>

        <p>Mehr Aufträge beginnen damit, dass man dich findet. Sei da, wenn Kunden suchen.</p>`,
    relatedLink: "landingpage-handwerker.html",
    relatedTitle: "Landingpage für Handwerker",
    relatedDesc: "Wie Handwerksbetriebe mit einer klaren Website mehr lokale Aufträge gewinnen.",
    ctaH2: "Mehr Installateuraufträge aus deiner Region.",
    ctaP: "Im kostenlosen Erstgespräch besprechen wir, wie deine Installateur-Website lokal sichtbar wird und mehr Anfragen bringt."
  },
  {
    slug: "landingpage-tischler",
    title: "Landingpage für Tischler",
    profession: "Tischler & Schreiner",
    keyword: "tischler schreiner website",
    emoji: "🪵",
    h1: "Als Tischler Wunschaufträge gewinnen — mit einer Website, die dein Handwerk zeigt.",
    lead: "Du fertigst Möbel, die ein Leben lang halten. Maßanfertigungen, Einbauschränke, individuelle Küchen — Handwerk auf höchstem Niveau. Aber wer weiß davon, außer deinen Stammkunden? Eine starke Tischler-Website bringt dir die Kunden, die deine Qualität zu schätzen wissen und bereit sind, dafür zu zahlen.",
    sections: `        <h2>Warum Tischler online sichtbar sein müssen</h2>
        <p>Die Zeiten, in denen Tischlereien ausschließlich über Empfehlungen und lokale Bekanntheit Aufträge bekamen, sind vorbei. Heute starten viele Kunden ihre Suche im Internet — auch wenn sie letztlich Handwerk aus der Region wollen. Wer dabei nicht auftaucht, verliert Aufträge.</p>
        <p>Gleichzeitig bringt gute Online-Sichtbarkeit die richtigen Kunden: solche, die auf Qualität und Handwerkskunst Wert legen und Maßanfertigungen gegenüber Massenware bevorzugen. Das sind genau die Menschen, mit denen die Zusammenarbeit lohnenswert ist.</p>

        <h2>Handwerk sichtbar machen — Fotos und Portfolio</h2>
        <p>Tischlerarbeit muss man sehen. Hochwertige Fotos deiner abgeschlossenen Projekte sind das wichtigste Element deiner Website. Zeige:</p>
        <ul>
          <li>Einbauschränke und Begehbare Garderoben</li>
          <li>Maßmöbel und individuelle Einrichtungslösungen</li>
          <li>Treppen und Geländer aus Holz</li>
          <li>Küchen und Badezimmermöbel</li>
          <li>Restaurierungen und Altholzprojekte</li>
        </ul>
        <p>Vorher-Nachher-Bilder funktionieren besonders gut — sie zeigen die Transformation und machen den Wert deiner Arbeit greifbar.</p>

        <h2>Materialien und Prozess erklären</h2>
        <p>Kunden, die Maßanfertigungen wollen, interessieren sich für die Details: Welche Hölzer verwendest du? Wie lange dauert ein Projekt typischerweise? Arbeitest du allein oder mit einem Team? Bezieht du nachhaltige Materialien? Diese Informationen differenzieren dich von Mitbewerbern und stärken das Vertrauen.</p>
        <p>Ein kurzer Abschnitt über deinen Arbeitsprozess — von der Beratung über die Planung bis zur Montage — zeigt Professionalität und gibt dem Kunden ein klares Bild davon, was ihn erwartet.</p>

        <h2>Lokale Sichtbarkeit für Tischler</h2>
        <p>Tischleraufträge sind regional. Nenne auf deiner Website klar, welche Regionen du bedienst. Das verbessert deine Chancen in lokalen Google-Suchen und verhindert Anfragen aus Regionen, in die du ohnehin nicht fahren würdest.</p>
        <p>BertlClaw erstellt Tischler-Landingpages, die dein Handwerk würdevoll präsentieren, lokal gefunden werden und zu echten Anfragen führen.</p>

        <p>Deine Arbeit ist zu gut, um nicht gesehen zu werden. Zeig sie — online.</p>`,
    relatedLink: "landingpage-handwerker.html",
    relatedTitle: "Landingpage für Handwerker",
    relatedDesc: "Wie Handwerksbetriebe mit einer klaren Website mehr lokale Aufträge gewinnen.",
    ctaH2: "Mehr Wunschprojekte als Tischler oder Schreiner.",
    ctaP: "Im kostenlosen Erstgespräch schauen wir gemeinsam, wie deine Tischler-Website aufgebaut sein muss, damit die richtigen Kunden zu dir kommen."
  },
  {
    slug: "landingpage-maler",
    title: "Landingpage für Maler",
    profession: "Maler & Anstreicher",
    keyword: "maler anstreicher website",
    emoji: "🖌️",
    h1: "Als Maler & Anstreicher mehr Aufträge gewinnen — lokal, direkt, ohne Umwege.",
    lead: "Wer frisch streichen, renovieren oder dekorieren lassen will, sucht online — und entscheidet oft innerhalb von Minuten. Wenn du bei dieser Suche nicht sichtbar bist, geht der Auftrag zum nächsten Maler in der Region. Eine klare Website ändert das grundlegend.",
    sections: `        <h2>Maleraufträge beginnen mit einer Google-Suche</h2>
        <p>Ob Wohnungsrenovierung, Gewerbeanstrich oder Fassadenarbeiten — die meisten Aufträge beginnen heute mit einer Suche im Netz. Kunden vergleichen schnell mehrere Anbieter, schauen sich Fotos an, lesen Bewertungen und kontaktieren dann die überzeugendste Option.</p>
        <p>Deine Website ist dein Moment in dieser Entscheidung. Sie muss sofort klar machen: Hier arbeitet ein professioneller Maler, der weiß, was er tut — und das für Kunden wie dich.</p>

        <h2>Was auf eine gute Maler-Website gehört</h2>
        <p>Eine wirksame Maler-Landingpage enthält:</p>
        <ul>
          <li><strong>Leistungsübersicht:</strong> Innenanstrich, Außenanstrich, Fassade, Tapezieren, Dekorieren, Böden, Lackierarbeiten</li>
          <li><strong>Vorher-Nachher-Fotos:</strong> Nichts überzeugt so sehr wie sichtbare Ergebnisse</li>
          <li><strong>Einzugsgebiet:</strong> Welche Orte, Bezirke oder Regionen bedienst du?</li>
          <li><strong>Bewertungen:</strong> Google-Rezensionen oder Kundenstimmen erhöhen das Vertrauen enorm</li>
          <li><strong>Kontakt:</strong> Telefonnummer groß und klickbar, Kontaktformular für Angebotsanfragen</li>
        </ul>

        <h2>Vorher-Nachher — das stärkste Argument</h2>
        <p>Maler können ihre Qualität wie kaum eine andere Branche visuell beweisen. Vorher-Nachher-Bilder zeigen den Unterschied, den du machst — und das ist oft überzeugender als jeder Text. Sammle solche Bilder systematisch und nutze sie auf deiner Website und bei Google My Business.</p>
        <p>Ergänzend empfehlen sich kurze Beschreibungen zu ausgewählten Projekten: Welche Oberfläche, welche Farbe, welche Herausforderung — das gibt dem potenziellen Kunden einen Eindruck von deiner Fachkenntnis.</p>

        <h2>Angebotsanfragen einfach machen</h2>
        <p>Der nächste Schritt nach dem ersten Eindruck ist die Anfrage. Mach es dem potenziellen Kunden so einfach wie möglich: Ein kurzes Formular, das Raum lässt für eine kurze Projektbeschreibung, ist ideal. Keine langen Pflichtfelder, keine Registrierung — einfach Kontakt aufnehmen und loslegen.</p>
        <p>BertlClaw entwickelt Maler-Landingpages, die in regionalen Suchen sichtbar sind, Vertrauen aufbauen und Anfragen erzeugen — damit du dich aufs Malen konzentrieren kannst.</p>

        <p>Die nächste Anfrage liegt näher, als du denkst — wenn du gefunden wirst.</p>`,
    relatedLink: "landingpage-handwerker.html",
    relatedTitle: "Landingpage für Handwerker",
    relatedDesc: "Wie Handwerksbetriebe mit einer klaren Website mehr lokale Aufträge gewinnen.",
    ctaH2: "Mehr Maleraufträge aus deiner Region — mit einer starken Website.",
    ctaP: "Im kostenlosen Erstgespräch schauen wir gemeinsam, wie deine Maler-Landingpage lokal sichtbar wird und Anfragen generiert."
  },
  {
    slug: "landingpage-gaertner",
    title: "Landingpage für Gärtner",
    profession: "Gärtner & Landschaftsbauer",
    keyword: "gärtner landschaftsbau website",
    emoji: "🌿",
    h1: "Als Gärtner und Landschaftsbauer online neue Aufträge gewinnen.",
    lead: "Gärten gestalten, Rasenflächen pflegen, Terrassen und Außenbereiche neu anlegen — deine Arbeit macht Außenräume zu Wohlfühlorten. Wer dich für sein nächstes Projekt bucht, sucht zuerst online. Sei dort, wo deine Kunden dich suchen.",
    sections: `        <h2>Warum Gärtner und Landschaftsbauer eine Website brauchen</h2>
        <p>Gartenarbeit ist saisonal, lokal und oft geprägt von Stammkunden. Aber neue Kunden gewinnt man heute zunehmend über das Internet. Wer einen Gartengestalter, einen Mähservice oder einen Landschaftsbauer sucht, tippt das in die Google-Suchleiste — und bucht oft einen der ersten drei Treffer.</p>
        <p>Eine professionelle Gärtner-Website macht dich genau dort sichtbar und zeigt potenziellen Kunden sofort, was du kannst und wie sie dich beauftragen.</p>

        <h2>Leistungsspektrum und Zielgruppen</h2>
        <p>Gärtner und Landschaftsbauer bieten ein breites Spektrum an Dienstleistungen. Zeige klar, was du anbietest:</p>
        <ul>
          <li>Gartengestaltung und Neuanlage</li>
          <li>Baumpflege und Baumschnitt</li>
          <li>Rasenmähen und laufende Gartenpflege</li>
          <li>Pflasterarbeiten und Terrassengestaltung</li>
          <li>Bewässerungsanlagen</li>
          <li>Winterdienst und Schneeräumung</li>
        </ul>
        <p>Nenne dabei auch deine Zielgruppen: Private Hausgärten, gewerbliche Außenanlagen, Wohnungsverwaltungen oder kommunale Grünflächen — je klarer du das kommunizierst, desto besser passen die Anfragen.</p>

        <h2>Saisonalität nutzen — Content das ganze Jahr</h2>
        <p>Gartenarbeit ist geprägt von Jahreszeiten. Deine Website kann das aufgreifen: Ein kurzer Blog oder Aktuelles-Bereich, der im Frühjahr Tipps zur Gartenvorbereitung, im Sommer zur Bewässerung und im Herbst zum Winterschutz bietet, macht dich nicht nur sichtbar, sondern auch als Experten wahrnehmbar.</p>
        <p>Das zahlt sich langfristig aus: Wer dich als hilfreiche Informationsquelle kennt, denkt bei einem konkreten Auftrag zuerst an dich.</p>

        <h2>Projektfotos und Bewertungen</h2>
        <p>Schöne Gärten sprechen für sich — aber nur, wenn man sie auch sieht. Fotos abgeschlossener Projekte (Gestaltung, Pflasterung, Baumpflege) gehören auf deine Website. Ergänzt um Kundenbewertungen entsteht ein starkes Gesamtbild.</p>
        <p>BertlClaw erstellt Gärtner- und Landschaftsbau-Landingpages, die saisonal optimiert sind, lokal sichtbar werden und Anfragen generieren — damit du mehr Zeit im Garten verbringen kannst.</p>

        <p>Dein nächster Stammkunde sucht dich gerade online. Sei da, wenn er dich findet.</p>`,
    relatedLink: "landingpage-handwerker.html",
    relatedTitle: "Landingpage für Handwerker",
    relatedDesc: "Wie Handwerksbetriebe mit einer klaren Website mehr lokale Aufträge gewinnen.",
    ctaH2: "Mehr Gartenaufträge aus deiner Region.",
    ctaP: "Im kostenlosen Erstgespräch besprechen wir, wie deine Gärtner-Website lokal sichtbar wird und das ganze Jahr Anfragen bringt."
  },
  {
    slug: "landingpage-reinigungsunternehmen",
    title: "Landingpage für Reinigungsunternehmen",
    profession: "Reinigungsunternehmen",
    keyword: "reinigungsunternehmen website",
    emoji: "✨",
    h1: "Als Reinigungsunternehmen mehr Aufträge gewinnen — privat und gewerblich.",
    lead: "Sauberkeit ist Vertrauen. Wer eine Reinigungskraft für Zuhause oder eine Gebäudereinigung für den Betrieb sucht, googelt — und entscheidet sich für das Unternehmen, das am zuverlässigsten wirkt. Deine Website ist dein wichtigstes Argument dafür.",
    sections: `        <h2>Vertrauen zuerst — was Reinigungskunden wollen</h2>
        <p>Wer ein Reinigungsunternehmen beauftragt, lässt fremde Menschen in sein Zuhause oder seinen Betrieb. Das erfordert ein hohes Maß an Vertrauen. Deine Website muss genau das aufbauen — noch bevor das erste Gespräch stattgefunden hat.</p>
        <p>Vertrauen entsteht durch: klare Kommunikation, sichtbare Mitarbeitenden und Unternehmensgeschichte, Zertifizierungen oder Gewerbeschein-Angaben, Kundenbewertungen und — besonders wichtig im Reinigungsbereich — transparente Konditionen.</p>

        <h2>Privat- und Gewerbereinigung klar trennen</h2>
        <p>Reinigungsunternehmen arbeiten häufig für beide Zielgruppen — Privatpersonen und Unternehmen. Diese haben sehr unterschiedliche Anforderungen:</p>
        <ul>
          <li><strong>Privat:</strong> Haushaltshilfe, Fensterreinigung, Umzugsreinigung, Endreinigung, Regelmäßigkeitsservice</li>
          <li><strong>Gewerbe:</strong> Büroreinigung, Treppenhausreinigung, Industriereinigung, Baureinigung, Sonderreinigungen</li>
        </ul>
        <p>Strukturiere deine Website so, dass beide Zielgruppen schnell ihren Bereich finden und sich angesprochen fühlen.</p>

        <h2>Preise und Buchungsablauf kommunizieren</h2>
        <p>Im Reinigungsbereich sind Preistransparenz und ein klarer Buchungsablauf entscheidend. Wer sofort weiß, wie man eine Anfrage stellt, wie die Preisgestaltung funktioniert und was man beim ersten Termin erwarten kann, ist eher bereit, zu buchen.</p>
        <p>Erwäge auch, einen Online-Buchungsbereich oder zumindest ein Anfrageformular anzubieten, das eine Kostenschätzung ermöglicht (Fläche, Häufigkeit, Art der Reinigung). Das spart Zeit und zieht qualifiziertere Anfragen an.</p>

        <h2>Bewertungen als Vertrauensmotor</h2>
        <p>Kundenbewertungen sind im Reinigungsbereich besonders wirksam. Bitte zufriedene Kunden aktiv um eine Bewertung bei Google — und zeige diese auf deiner Website. Das ist das glaubwürdigste Signal, das du potenziellen Kunden geben kannst.</p>
        <p>BertlClaw baut Reinigungsunternehmen-Landingpages, die Vertrauen aufbauen, lokal sichtbar sind und Anfragen generieren — für private und gewerbliche Kunden.</p>

        <p>Dein nächster Langzeitkunde sucht dich gerade. Sei da, wenn er dich findet.</p>`,
    relatedLink: "dienstleister-website.html",
    relatedTitle: "Website für Dienstleister",
    relatedDesc: "Wie Dienstleister aller Art mit einer klaren Website mehr Kunden gewinnen.",
    ctaH2: "Mehr Aufträge für dein Reinigungsunternehmen.",
    ctaP: "Im kostenlosen Erstgespräch besprechen wir, wie deine Reinigungswebsite lokal sichtbar wird und Vertrauen aufbaut — damit Kunden dich wählen."
  },
  {
    slug: "landingpage-kueche-restaurant",
    title: "Landingpage für Köche & Restaurants",
    profession: "Köche & Catering",
    keyword: "koch catering website",
    emoji: "👨‍🍳",
    h1: "Als Koch oder Catering-Service mehr Buchungen gewinnen — online präsent sein.",
    lead: "Du bringst Genuss auf den Tisch — ob als freier Koch, Pop-up-Küche oder Catering-Service. Wer für sein nächstes Event, seine Hochzeit oder seinen Firmenabend nach einem Koch oder Caterer sucht, googelt. Wenn du dabei nicht erscheinst, geht die Buchung an jemand anderen.",
    sections: `        <h2>Catering und freie Köche — ein wachsender Online-Markt</h2>
        <p>Das Geschäft mit Catering und freier Koch-Arbeit wächst. Firmen suchen Caterer für Events, Privatpersonen buchen Köche für besondere Anlässe, und Hochzeiten oder Geburtstage werden zunehmend mit externem Küchenpersonal bestritten. Der Suchprozess beginnt fast immer online.</p>
        <p>Eine klare, appetitanregende Website macht dich in diesem Markt sichtbar und überzeugend — noch bevor jemand eine Probe-Mahlzeit genossen hat.</p>

        <h2>Menüs und Konzepte zeigen</h2>
        <p>Was servierst du, und in welchem Stil? Das ist die erste Frage, die sich potenzielle Kunden stellen. Deine Website sollte:</p>
        <ul>
          <li>Deine kulinarische Ausrichtung klar zeigen (mediterran, asiatisch, österreichisch, modern, vegane Küche...)</li>
          <li>Beispiel-Menüs oder Pakete für verschiedene Anlässe zeigen</li>
          <li>Fotos deiner Gerichte und Events präsentieren — appetitanregend, hochwertig</li>
          <li>Angaben zu Mindestbestellmenge und Einzugsgebiet machen</li>
        </ul>

        <h2>Anlässe und Zielgruppen ansprechen</h2>
        <p>Catering ist keine One-size-fits-all-Leistung. Je klarer du auf deiner Website kommunizierst, für welche Anlässe du der richtige Partner bist, desto gezielter kommen die Anfragen:</p>
        <ul>
          <li>Hochzeiten und Familienfeiern</li>
          <li>Firmenevents und Businesslunches</li>
          <li>Weihnachtsfeiern und Jahresabschlüsse</li>
          <li>Private Dinner und Koch-Events zuhause</li>
          <li>Messen und Konferenzen</li>
        </ul>

        <h2>Buchungsablauf und Kontakt einfach gestalten</h2>
        <p>Wer ein Event plant, ist oft in der Recherchephase und möchte schnell erste Informationen. Ein übersichtliches Anfrageformular mit Feldern für Datum, Gästezahl und Anlass hilft dir dabei, qualifizierte Anfragen zu bekommen — und spart Zeit bei Vor-Ort-Terminen.</p>
        <p>BertlClaw baut Catering- und Koch-Landingpages, die appetitanregend aussehen, klar kommunizieren und mehr Buchungsanfragen generieren.</p>

        <p>Dein nächstes Event-Highlight wartet auf dich. Lass dich online finden.</p>`,
    relatedLink: "dienstleister-website.html",
    relatedTitle: "Website für Dienstleister",
    relatedDesc: "Wie Dienstleister aller Art mit einer klaren Website mehr Kunden gewinnen.",
    ctaH2: "Mehr Catering-Buchungen durch bessere Sichtbarkeit.",
    ctaP: "Im kostenlosen Erstgespräch besprechen wir, wie deine Koch- oder Catering-Website aussehen muss, damit Buchungen reinkommen."
  },
  {
    slug: "landingpage-nagelstudio",
    title: "Landingpage für Nagelstudios",
    profession: "Nagelstudios & Beauty",
    keyword: "nagelstudio beauty website",
    emoji: "💅",
    h1: "Dein Nagelstudio online präsentieren — und den Terminkalender füllen.",
    lead: "Dein Studio ist einladend, dein Team talentiert und deine Kunden zufrieden. Aber wie kommen neue Kundinnen und Kunden zu dir? Wer ein Nagelstudio in der Nähe sucht, googelt — und bucht dort, wo es professionell aussieht und online buchbar ist. Deine Landingpage macht den Unterschied.",
    sections: `        <h2>Online-Sichtbarkeit für Nagelstudios — warum das heute entscheidend ist</h2>
        <p>Beauty-Dienstleistungen werden zunehmend online gesucht und gebucht. Wer ein Nagelstudio eröffnet oder ausbauen will, braucht mehr als Instagram-Präsenz: Eine eigene Website, die lokal bei Google sichtbar ist und Neukunden direkt zur Buchung führt.</p>
        <p>Insbesondere bei Nagelstudios gilt: Der erste optische Eindruck ist entscheidend. Deine Website muss zeigen, dass dein Studio professionell, sauber und stilbewusst ist — in Layout, Fotos und Texten.</p>

        <h2>Was auf die Nagelstudio-Website gehört</h2>
        <p>Eine effektive Nagelstudio-Landingpage enthält:</p>
        <ul>
          <li><strong>Galerie:</strong> Fotos eurer Nageldesigns — abwechslungsreich, hochwertig, aktuell</li>
          <li><strong>Preisliste:</strong> Klare, übersichtliche Angaben zu euren Leistungen und Preisen</li>
          <li><strong>Online-Buchung oder Terminanfrage:</strong> So einfach wie möglich — idealerweise direkt buchbar</li>
          <li><strong>Adresse und Öffnungszeiten:</strong> Klar und sofort sichtbar</li>
          <li><strong>Bewertungen:</strong> Google- oder Instagram-Testimonials schaffen Vertrauen</li>
        </ul>

        <h2>Spezialisierungen und Angebote hervorheben</h2>
        <p>Was macht euer Nagelstudio besonders? Ob Gel-Nails, Shellac, Nail Art, Schellack oder Bio-Produkte — kommuniziere klar, worin ihr Experten seid. Wer nach einem spezifischen Angebot sucht, soll es sofort auf eurer Website finden.</p>
        <p>Auch Sonderangebote, Pakete (z.B. Hochzeitspaket, Maniküre + Pediküre) oder Geschenkgutscheine können auf der Website prominenten Platz finden.</p>

        <h2>Lokale Suchoptimierung</h2>
        <p>„Nagelstudio Wien 1070" oder „Gel-Nails Graz" — solche Suchanfragen bringen kaufbereite Kunden auf eure Website. Mit einer lokal optimierten Landingpage und einem gepflegten Google-My-Business-Eintrag seid ihr bei diesen Suchen sichtbar.</p>
        <p>BertlClaw baut Nagelstudio-Landingpages, die optisch überzeugen, lokal auffindbar sind und euren Terminkalender füllen.</p>

        <p>Der nächste Stammkunde sucht gerade nach euch. Macht es ihm leicht, euch zu finden.</p>`,
    relatedLink: "landingpage-kosmetikstudio.html",
    relatedTitle: "Landingpage für Kosmetikstudios",
    relatedDesc: "Wie Kosmetikstudios online sichtbar werden und neue Stammkunden gewinnen.",
    ctaH2: "Mehr Buchungen für dein Nagelstudio.",
    ctaP: "Im kostenlosen Erstgespräch besprechen wir, wie eure Nagelstudio-Website aussehen und performen soll — damit der Terminkalender voll wird."
  },
  {
    slug: "landingpage-friseur",
    title: "Landingpage für Friseure",
    profession: "Friseure",
    keyword: "friseur selbstständig website",
    emoji: "✂️",
    h1: "Als selbstständiger Friseur mehr Kunden gewinnen — mit einer Website, die überzeugt.",
    lead: "Dein Können zeigt sich im Ergebnis. Aber wer sucht dich aktiv — außerhalb deines bestehenden Kundenstamms? Als selbstständiger Friseur oder Salon-Betreiber ist deine Online-Präsenz dein wichtigstes Akquiseinstrument. Wer bei Google sichtbar ist und professionell wirkt, füllt den Terminkalender.",
    sections: `        <h2>Warum Friseure eine eigene Website brauchen</h2>
        <p>Instagram und Facebook sind gut für Inspiration — aber für die Suche nach einem Friseur nutzen die meisten Menschen noch immer Google. Wer dort nicht auftaucht oder eine veraltete Website hat, verliert Neukunden, noch bevor die erste Schere gezückt wurde.</p>
        <p>Als selbstständiger Friseur oder Inhaberin eines Friseursalons ist eine klare, optisch ansprechende Website dein stärkstes Argument gegenüber Neukunden. Sie zeigt: Hier arbeitet jemand mit Stil, Qualität und Professionalität.</p>

        <h2>Portfolio und Galerie — Ergebnisse sprechen lassen</h2>
        <p>Der wichtigste Inhalt einer Friseur-Website sind Fotos. Vorher-Nachher-Aufnahmen, Farb-Transformationen, besondere Cuts oder Hochzeitsstyles — all das zeigt potenzielle Kunden, was sie von dir erwarten können. Je hochwertiger die Fotos, desto professioneller der Gesamteindruck.</p>
        <p>Sammle regelmäßig Fotos deiner besten Arbeiten (mit Einwilligung der Kunden) und pflege diese in dein Portfolio ein. Das Portfolio ist der überzeugendste Bereich deiner Website.</p>

        <h2>Spezialisierung klar kommunizieren</h2>
        <p>Viele Friseure haben Spezialgebiete: Colorationen, Balayage, Afro-Texturen, Hochzeits-Styling, Herren-Haarschnitte oder kindgerechtes Schneiden. Wenn du in einem dieser Bereiche besonders gut bist, kommuniziere das klar:</p>
        <ul>
          <li>Wer nach „Balayage Spezialist Wien" sucht, soll zu dir finden</li>
          <li>Wer nach „Hochzeitsfrisur Graz" sucht, soll dein Portfolio sehen</li>
          <li>Wer nach „Herrenfriseur ohne Termin Linz" sucht, soll deine Öffnungszeiten finden</li>
        </ul>

        <h2>Online-Terminbuchung — der entscheidende Hebel</h2>
        <p>Wer heute ein Restaurant über die Website bucht, erwartet das zunehmend auch vom Friseur. Eine Online-Buchungsmöglichkeit — auch wenn es nur ein Kalenderlink ist — reduziert Hemmschwellen und spart dir Telefonanrufe. Kunden, die spät abends googeln und sofort buchen können, kommen eher zurück.</p>
        <p>BertlClaw baut Friseur-Landingpages, die lokal bei Google sichtbar sind, optisch professionell wirken und zu Terminbuchungen führen.</p>

        <p>Mehr Stammkunden beginnen damit, dass neue Kunden dich online finden. Mach es ihnen leicht.</p>`,
    relatedLink: "landingpage-kosmetikstudio.html",
    relatedTitle: "Landingpage für Kosmetikstudios",
    relatedDesc: "Wie Beauty-Profis mit einer klaren Website mehr Buchungen gewinnen.",
    ctaH2: "Mehr Kunden für deinen Friseursalon.",
    ctaP: "Im kostenlosen Erstgespräch besprechen wir, wie deine Friseur-Website aussehen soll — damit neue Kunden dich finden und buchen."
  },
  {
    slug: "landingpage-kosmetikstudio",
    title: "Landingpage für Kosmetikstudios",
    profession: "Kosmetikstudios",
    keyword: "kosmetikstudio website",
    emoji: "🌸",
    h1: "Dein Kosmetikstudio online präsentieren — und mehr Stammkunden gewinnen.",
    lead: "Du bietest professionelle Hautpflege, Behandlungen und ein Wohlfühlerlebnis, das deine Kunden immer wieder zurückbringt. Aber wie kommen neue Kunden zu dir? Eine professionelle Kosmetikstudio-Website macht dich sichtbar — für alle, die in deiner Region nach dem richtigen Studio suchen.",
    sections: `        <h2>Kosmetik und Beauty online — die Erwartungen der Kunden</h2>
        <p>Wer ein Kosmetikstudio sucht, möchte sich vorab ein Bild machen: Wie wirkt das Studio? Welche Behandlungen werden angeboten? Was kosten sie? Kann man online buchen? Diese Fragen stellen sich Kunden, noch bevor sie zum Hörer greifen oder die Tür öffnen.</p>
        <p>Eine klare, einladende Website beantwortet diese Fragen — und gibt den entscheidenden ersten Eindruck, der aus einem Suchenden einen Stammkunden macht.</p>

        <h2>Behandlungen und Leistungen klar kommunizieren</h2>
        <p>Dein Leistungsangebot ist das Herzstück deiner Website. Erkläre verständlich, was jede Behandlung beinhaltet und für wen sie geeignet ist:</p>
        <ul>
          <li>Klassische Gesichtsbehandlungen und Medical Beauty</li>
          <li>Mikrodermabrasion, Peeling, Hyaluronsäure-Behandlungen</li>
          <li>Waxing, Sugaring, Epilation</li>
          <li>Wimpern-Extensions und Augenbrauen-Styling</li>
          <li>Körperpflege-Behandlungen und Massagen</li>
          <li>Produkt-Marken und verwendete Materialien</li>
        </ul>
        <p>Wer versteht, was er bekommt, ist eher bereit zu buchen — und hat realistischere Erwartungen, was die Stammkundenbindung erhöht.</p>

        <h2>Atmosphäre zeigen — durch Fotos und Design</h2>
        <p>Ein Kosmetikstudio lebt von der Atmosphäre. Fotos deiner Räumlichkeiten, der Behandlungsliegen und deines Teams vermitteln das Wohlfühlversprechen, das Menschen in ein Beauty-Studio zieht. Das Design der Website sollte die Ästhetik deines Studios widerspiegeln: ruhig, hochwertig, einladend.</p>
        <p>Bewertungen von Stammkunden sind hier besonders wertvoll — sie zeigen, dass das Erlebnis hält, was es verspricht.</p>

        <h2>Online-Buchung und Preistransparenz</h2>
        <p>Kunden schätzen es, wenn sie Preise und Termine direkt online einsehen können. Eine übersichtliche Preisliste und eine Buchungsmöglichkeit (oder zumindest ein Terminanfrage-Formular) reduzieren Hürden und erhöhen die Konversionsrate.</p>
        <p>BertlClaw baut Kosmetikstudio-Landingpages, die optisch überzeugend sind, lokal bei Google sichtbar werden und zu Buchungen führen — damit dein Kalender immer gut gefüllt ist.</p>

        <p>Schönheit beginnt mit Sichtbarkeit. Lass dein Kosmetikstudio online strahlen.</p>`,
    relatedLink: "landingpage-nagelstudio.html",
    relatedTitle: "Landingpage für Nagelstudios",
    relatedDesc: "Wie Nagelstudios und Beauty-Studios online sichtbar werden und neue Kunden gewinnen.",
    ctaH2: "Mehr Buchungen für dein Kosmetikstudio.",
    ctaP: "Im kostenlosen Erstgespräch besprechen wir, wie deine Kosmetikstudio-Website aussehen soll — damit neue Kunden dich finden und Stammkunden werden."
  }
];

for (const p of professions) {
  const html = buildPage(p);
  const filePath = path.join(DIR, `${p.slug}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ ${p.slug}.html`);
}

console.log('\nAll 20 pages generated!');
