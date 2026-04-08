#!/usr/bin/env node
/**
 * generate-dach-final.js
 * Generates missing city×profession landing pages for DACH-final batch.
 * Covers 35 cities × 10 new professions = up to 350 combinations.
 * Skips already existing files.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ─── Cities ──────────────────────────────────────────────────────────────────
const allCities = [
  // AT
  {slug: 'wien',        label: 'Wien',        locale: 'de_AT', country: 'Österreich', countryShort: 'AT', region: 'Wien'},
  {slug: 'graz',        label: 'Graz',        locale: 'de_AT', country: 'Österreich', countryShort: 'AT', region: 'Steiermark'},
  {slug: 'linz',        label: 'Linz',        locale: 'de_AT', country: 'Österreich', countryShort: 'AT', region: 'Oberösterreich'},
  {slug: 'salzburg',    label: 'Salzburg',    locale: 'de_AT', country: 'Österreich', countryShort: 'AT', region: 'Salzburg'},
  {slug: 'innsbruck',   label: 'Innsbruck',   locale: 'de_AT', country: 'Österreich', countryShort: 'AT', region: 'Tirol'},
  {slug: 'klagenfurt',  label: 'Klagenfurt',  locale: 'de_AT', country: 'Österreich', countryShort: 'AT', region: 'Kärnten'},
  {slug: 'villach',     label: 'Villach',     locale: 'de_AT', country: 'Österreich', countryShort: 'AT', region: 'Kärnten'},
  {slug: 'wels',        label: 'Wels',        locale: 'de_AT', country: 'Österreich', countryShort: 'AT', region: 'Oberösterreich'},
  {slug: 'st-poelten',  label: 'St. Pölten',  locale: 'de_AT', country: 'Österreich', countryShort: 'AT', region: 'Niederösterreich'},
  {slug: 'dornbirn',    label: 'Dornbirn',    locale: 'de_AT', country: 'Österreich', countryShort: 'AT', region: 'Vorarlberg'},
  // DE
  {slug: 'berlin',      label: 'Berlin',      locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Berlin'},
  {slug: 'hamburg',     label: 'Hamburg',     locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Hamburg'},
  {slug: 'muenchen',    label: 'München',     locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Bayern'},
  {slug: 'koeln',       label: 'Köln',        locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Nordrhein-Westfalen'},
  {slug: 'frankfurt',   label: 'Frankfurt',   locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Hessen'},
  {slug: 'stuttgart',   label: 'Stuttgart',   locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Baden-Württemberg'},
  {slug: 'duesseldorf', label: 'Düsseldorf',  locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Nordrhein-Westfalen'},
  {slug: 'leipzig',     label: 'Leipzig',     locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Sachsen'},
  {slug: 'dortmund',    label: 'Dortmund',    locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Nordrhein-Westfalen'},
  {slug: 'essen',       label: 'Essen',       locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Nordrhein-Westfalen'},
  {slug: 'bremen',      label: 'Bremen',      locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Bremen'},
  {slug: 'dresden',     label: 'Dresden',     locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Sachsen'},
  {slug: 'hannover',    label: 'Hannover',    locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Niedersachsen'},
  {slug: 'nuernberg',   label: 'Nürnberg',    locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Bayern'},
  {slug: 'bonn',        label: 'Bonn',        locale: 'de_DE', country: 'Deutschland', countryShort: 'DE', region: 'Nordrhein-Westfalen'},
  // CH
  {slug: 'zuerich',       label: 'Zürich',       locale: 'de_CH', country: 'Schweiz', countryShort: 'CH', region: 'Zürich'},
  {slug: 'bern',          label: 'Bern',          locale: 'de_CH', country: 'Schweiz', countryShort: 'CH', region: 'Bern'},
  {slug: 'basel',         label: 'Basel',         locale: 'de_CH', country: 'Schweiz', countryShort: 'CH', region: 'Basel-Stadt'},
  {slug: 'luzern',        label: 'Luzern',        locale: 'de_CH', country: 'Schweiz', countryShort: 'CH', region: 'Luzern'},
  {slug: 'zug',           label: 'Zug',           locale: 'de_CH', country: 'Schweiz', countryShort: 'CH', region: 'Zug'},
  {slug: 'winterthur',    label: 'Winterthur',    locale: 'de_CH', country: 'Schweiz', countryShort: 'CH', region: 'Zürich'},
  {slug: 'st-gallen',     label: 'St. Gallen',    locale: 'de_CH', country: 'Schweiz', countryShort: 'CH', region: 'St. Gallen'},
  {slug: 'schaffhausen',  label: 'Schaffhausen',  locale: 'de_CH', country: 'Schweiz', countryShort: 'CH', region: 'Schaffhausen'},
  {slug: 'chur',          label: 'Chur',          locale: 'de_CH', country: 'Schweiz', countryShort: 'CH', region: 'Graubünden'},
  {slug: 'thun',          label: 'Thun',          locale: 'de_CH', country: 'Schweiz', countryShort: 'CH', region: 'Bern'},
];

// ─── Professions ─────────────────────────────────────────────────────────────
const newProfessions = [
  {slug: 'ingenieur',           label: 'Ingenieure',           singular: 'Ingenieur',           emoji: '⚙️'},
  {slug: 'projektmanager',      label: 'Projektmanager',       singular: 'Projektmanager',      emoji: '📋'},
  {slug: 'hr-berater',          label: 'HR-Berater',           singular: 'HR-Berater',          emoji: '👥'},
  {slug: 'unternehmensberater', label: 'Unternehmensberater',  singular: 'Unternehmensberater', emoji: '📊'},
  {slug: 'energieberater',      label: 'Energieberater',       singular: 'Energieberater',      emoji: '⚡'},
  {slug: 'datenschutzberater',  label: 'Datenschutzberater',   singular: 'Datenschutzberater',  emoji: '🔒'},
  {slug: 'ki-berater',          label: 'KI-Berater',           singular: 'KI-Berater',          emoji: '🤖'},
  {slug: 'seo-berater',         label: 'SEO-Berater',          singular: 'SEO-Berater',         emoji: '🔍'},
  {slug: 'it-berater',          label: 'IT-Berater',           singular: 'IT-Berater',          emoji: '💻'},
  {slug: 'virtual-assistants',  label: 'Virtuelle Assistenten',singular: 'Virtuelle/r Assistent/in', emoji: '🖥️'},
];

// ─── Profession-specific content blocks ──────────────────────────────────────
function getProfessionContent(prof, city) {
  const {label, singular} = prof;
  const {label: cityLabel, country, region} = city;

  const contents = {
    'ingenieur': {
      intro: `Ingenieure und technische Fachkräfte, die sich selbstständig machen oder als Freelancer tätig sind, stehen vor einer besonderen Herausforderung: Ihre Expertise ist komplex — eine überzeugende Landingpage macht sie greifbar und gewinnt Vertrauen noch vor dem ersten Gespräch. ${cityLabel} ist ein starker Wirtschaftsstandort mit einer lebendigen Industrie- und Technologieszene.`,
      why: `Potenzielle Auftraggeber suchen nach konkreten Kompetenzen: Maschinenbau, Elektrotechnik, Softwareentwicklung, Automatisierung. Wer als Ingenieur eine klar strukturierte Landingpage hat, die Projekte, Skills und Erfahrung sichtbar macht, gewinnt Anfragen, die andere nicht bekommen. In ${cityLabel} (${region}) gilt das besonders: Der lokale Markt ist aktiv, die Nachfrage nach qualifizierten ${label} hoch — aber auch die Konkurrenz ist real.`,
      what: `BertlClaw entwickelt Landingpages für selbstständige Ingenieure, die Fachkompetenz klar kommunizieren, Vertrauen aufbauen und Auftraggeber zur Kontaktaufnahme bewegen. Die Kombination aus strukturierten Inhalten, überzeugenden Texten und professionellem Design schafft eine Seite, die 24/7 für dich arbeitet.`,
      process: `Ein kostenloses Erstgespräch genügt, um deinen individuellen Hebel zu finden — ob Positionierung, Landingpage oder ein komplettes Auftraggeber-Paket. BertlClaw arbeitet remote und betreut ${label} im gesamten DACH-Raum.`,
    },
    'projektmanager': {
      intro: `Projektmanager, die sich selbstständig machen oder als Freelance-PM tätig sind, brauchen eine Online-Präsenz, die ihre Methodik und ihren Track Record sichtbar macht. ${cityLabel} ist ein Wirtschaftszentrum, in dem Unternehmen ständig auf der Suche nach erfahrenen Projektleitern sind — intern und extern.`,
      why: `Unternehmen suchen Projektmanager nicht nur über Empfehlungen, sondern zunehmend online. Wer bei Begriffen wie "Freelance Projektmanager ${cityLabel}" oder "externer PM für agile Projekte" sichtbar ist, bekommt Anfragen ohne aktiv akquirieren zu müssen. In ${cityLabel} (${region}) gilt das besonders: Der lokale Markt ist aktiv, die Nachfrage nach qualifizierten ${label} hoch — aber auch die Konkurrenz ist real.`,
      what: `BertlClaw erstellt Landingpages für Freelance-Projektmanager: klar strukturiert, mit deinen Methoden (PRINCE2, Scrum, klassisches PM), deinen Branchen und einem überzeugenden CTA. So bekommst du Anfragen von Unternehmen, die genau das suchen, was du anbietest.`,
      process: `Starte mit einem kostenlosen Erstgespräch — ohne Vorlauf, ohne Verkaufsdruck. BertlClaw arbeitet remote und betreut ${label} im gesamten DACH-Raum, auch in ${cityLabel}.`,
    },
    'hr-berater': {
      intro: `HR-Berater, die selbstständig oder als Freelancer tätig sind, arbeiten in einem Bereich, der auf Vertrauen basiert — eine professionelle Landingpage schafft dieses Vertrauen, bevor das erste Gespräch stattfindet. ${cityLabel} ist ein aktiver Wirtschaftsstandort, an dem Unternehmen ständig HR-Unterstützung suchen.`,
      why: `Ob Recruiting, Employer Branding, Personalentwicklung oder HR-Prozesse — wer als HR-Berater selbstständig tätig ist, muss sein Angebot klar und überzeugend kommunizieren. Eine gut aufgestellte Landingpage sorgt dafür, dass potenzielle Klienten in ${cityLabel} (${region}) sofort verstehen, was du kannst und für wen du arbeitest.`,
      what: `BertlClaw entwickelt Landingpages für selbstständige HR-Berater: mit klarer Positionierung, spezifischen Leistungsbeschreibungen und einem Design, das Seriosität und Menschlichkeit verbindet. So gewinnst du Klienten, die wirklich zu dir passen.`,
      process: `Ein kostenloses Erstgespräch reicht für den Start. BertlClaw arbeitet vollständig remote und betreut ${label} im gesamten DACH-Raum — auch in ${cityLabel}.`,
    },
    'unternehmensberater': {
      intro: `Unternehmensberater und Consultants stehen vor einem spezifischen Problem: Ihre Expertise ist oft schwer greifbar — eine gute Landingpage macht sie konkret und vertrauenswürdig. ${cityLabel} ist ein bedeutender Wirtschaftsstandort mit einer dichten Konzentration an Unternehmen, die externe Beratung suchen.`,
      why: `Potenzielle Klienten suchen oft nach Themen, nicht nach Namen: Prozessoptimierung, Wachstumsstrategie, Restrukturierung. Eine gut aufgestellte Landingpage sorgt dafür, dass du bei den richtigen Suchanfragen sichtbar bist. In ${cityLabel} (${region}) gilt das besonders: Der lokale Markt ist aktiv, die Nachfrage nach qualifizierten ${label} hoch — aber auch die Konkurrenz ist real.`,
      what: `BertlClaw entwickelt Beratungs-Landingpages, die Expertise klar machen, Zielgruppen präzise ansprechen und den Weg zum ersten Gespräch so kurz wie möglich halten. Die Kombination aus Positionierung, überzeugenden Texten und professionellem Design schafft eine Seite, die für dich arbeitet — auch wenn du gerade beim Klienten bist.`,
      process: `Der Einstieg ist einfach: Ein kostenloses Erstgespräch, in dem wir gemeinsam schauen, wo bei dir der größte Hebel liegt. BertlClaw arbeitet remote und betreut ${label} im gesamten DACH-Raum.`,
    },
    'energieberater': {
      intro: `Energieberater, die selbstständig oder als Freelancer tätig sind, profitieren enormn von einer professionellen Online-Präsenz: Energieeffizienz, erneuerbare Energien und Fördermittel sind Themen, die gerade boomen — und nach denen aktiv gesucht wird. ${cityLabel} und die Region ${region} sind dabei keine Ausnahme.`,
      why: `Privathaushalte und Unternehmen suchen gezielt nach Energieberatung online — ob für Sanierungen, Photovoltaik, Wärmepumpen oder Förderanträge. Wer als Energieberater in ${cityLabel} mit einer klaren Landingpage sichtbar ist, bekommt Anfragen, die andere nicht erreichen. In ${region} gilt das besonders: Förderprogramme machen professionelle Beratung zur Pflicht.`,
      what: `BertlClaw erstellt Landingpages für selbstständige Energieberater: mit klarer Darstellung deiner Leistungen, Fachgebiete und Zertifizierungen sowie einem überzeugenden CTA, der Interessenten in Anfragen verwandelt. Vertrauen entsteht noch vor dem ersten Kontakt.`,
      process: `Starte mit einem kostenlosen Erstgespräch — kein Vorlauf, kein Verkaufsdruck. BertlClaw arbeitet remote und betreut ${label} im gesamten DACH-Raum, auch in ${cityLabel}.`,
    },
    'datenschutzberater': {
      intro: `Datenschutzberater und Datenschutzbeauftragte, die selbstständig tätig sind, stehen vor einer paradoxen Situation: Sie helfen anderen mit Compliance und Transparenz — aber ihre eigene Online-Präsenz ist oft dünn. Eine klare Landingpage ändert das. ${cityLabel} als Wirtschaftsstandort braucht qualifizierte Datenschutzberatung.`,
      why: `DSGVO, NIS2, Datenschutz-Audits, externe Datenschutzbeauftragte — Unternehmen suchen aktiv nach diesen Leistungen. Wer als Datenschutzberater in ${cityLabel} (${region}) online sichtbar ist, gewinnt Anfragen von KMUs und Großunternehmen, die externe Expertise brauchen — ohne teure Ausschreibungen.`,
      what: `BertlClaw entwickelt Landingpages für selbstständige Datenschutzberater: mit klaren Leistungsbeschreibungen, Referenzen und einem Vertrauensrahmen, der in der Branche unverzichtbar ist. Eine Seite, die Compliance und Kompetenz glaubwürdig kommuniziert.`,
      process: `Ein kostenloses Erstgespräch reicht für den Start. BertlClaw arbeitet vollständig remote und betreut ${label} im gesamten DACH-Raum — auch in ${cityLabel}.`,
    },
    'ki-berater': {
      intro: `KI-Berater und AI-Consultants sind eine der gefragtesten Berufsgruppen der Gegenwart — und gleichzeitig eine, bei der die Angebote noch kaum klar differenziert sind. Wer als KI-Berater in ${cityLabel} eine überzeugende Landingpage hat, hebt sich sofort ab und gewinnt das Vertrauen von Unternehmen, die KI einsetzen wollen.`,
      why: `Unternehmen in ${cityLabel} und der Region ${region} suchen aktiv nach KI-Expertise: für Automatisierung, LLM-Integration, Datenanalyse, KI-Strategie. Wer online klar kommuniziert, was er kann und für wen, bekommt qualifizierte Anfragen — ohne dass potenzielle Klienten verstehen müssen, was "Prompt Engineering" oder "RAG" bedeutet.`,
      what: `BertlClaw erstellt Landingpages für selbstständige KI-Berater und AI-Consultants: mit verständlichen Leistungsbeschreibungen, klaren Anwendungsfällen und einem CTA, der Interessenten in erste Gespräche verwandelt. Technische Expertise wird zu verständlichem Mehrwert.`,
      process: `Starte mit einem kostenlosen Erstgespräch — ohne Vorlauf. BertlClaw arbeitet remote und betreut ${label} im gesamten DACH-Raum, auch in ${cityLabel}.`,
    },
    'seo-berater': {
      intro: `SEO-Berater, die selbstständig oder als Freelancer tätig sind, wissen es eigentlich besser als alle anderen: Wer online nicht gefunden wird, existiert nicht. Trotzdem fehlt vielen SEO-Beratern eine eigene Landingpage, die ihre Expertise überzeugend kommuniziert. ${cityLabel} ist ein aktiver Markt — auch für SEO-Leistungen.`,
      why: `Unternehmen in ${cityLabel} (${region}) suchen aktiv nach SEO-Unterstützung: technisches SEO, Content-Strategie, lokale Suchmaschinenoptimierung, Linkaufbau. Wer als SEO-Berater selbst gut rankt und eine überzeugende Landingpage hat, sendet das stärkste Signal: Ich tue, was ich predige.`,
      what: `BertlClaw erstellt Landingpages für selbstständige SEO-Berater: mit klarer Positionierung, spezifischen Leistungen und Social Proof, der Vertrauen aufbaut. Eine Seite, die nicht nur erklärt, was du machst — sondern warum du der Richtige dafür bist.`,
      process: `Ein kostenloses Erstgespräch genügt für den Einstieg. BertlClaw arbeitet remote und betreut ${label} im gesamten DACH-Raum, auch in ${cityLabel}.`,
    },
    'it-berater': {
      intro: `IT-Berater und IT-Consultants, die selbstständig tätig sind, kämpfen oft damit, ihre breiten Fähigkeiten klar zu kommunizieren: Was genau machst du? Für wen? Warum du? Eine professionelle Landingpage beantwortet diese Fragen, bevor der erste Anruf kommt. ${cityLabel} ist ein IT-affiner Wirtschaftsstandort mit hoher Nachfrage.`,
      why: `Unternehmen in ${cityLabel} (${region}) suchen IT-Berater für Cloud-Migration, IT-Sicherheit, Systemintegration, Digitalisierung und vieles mehr. Wer online mit einer spezifischen, überzeugenden Landingpage sichtbar ist, bekommt Anfragen von Unternehmen, die genau das suchen — ohne Mittler.`,
      what: `BertlClaw entwickelt Landingpages für selbstständige IT-Berater: mit klaren Leistungsbeschreibungen, Technologie-Stack-Übersichten und einem Design, das Kompetenz und Zuverlässigkeit ausstrahlt. Eine Seite, die für dich arbeitet — auch wenn du gerade beim Klienten vor Ort bist.`,
      process: `Starte mit einem kostenlosen Erstgespräch. BertlClaw arbeitet vollständig remote und betreut ${label} im gesamten DACH-Raum, auch in ${cityLabel}.`,
    },
    'virtual-assistants': {
      intro: `Virtuelle Assistentinnen und Assistenten, die selbstständig tätig sind, erbringen ihre Leistungen ortsunabhängig — aber lokale Sichtbarkeit kann trotzdem entscheidend sein: Viele Auftraggeber bevorzugen VAs aus dem eigenen Land oder der eigenen Zeitzone. ${cityLabel} als bekannter Standort stärkt Vertrauen und Auffindbarkeit.`,
      why: `Auftraggeber suchen virtuelle Assistenten für E-Mail-Management, Social Media, Terminplanung, Recherche und Projektunterstützung. Wer als VA in ${cityLabel} (${region}) online klar positioniert ist und eine überzeugende Landingpage hat, gewinnt Anfragen von lokalen und regionalen Unternehmen, die eine verlässliche Remote-Unterstützung suchen.`,
      what: `BertlClaw erstellt Landingpages für selbstständige Virtuelle Assistenten: mit klaren Leistungspaketen, einer ansprechenden Selbstpräsentation und einem CTA, der Interessenten sofort zum Erstgespräch führt. Eine Seite, die zeigt: Du bist professionell, zuverlässig und bereit.`,
      process: `Ein kostenloses Erstgespräch reicht für den Start. BertlClaw arbeitet remote und betreut Virtuelle Assistenten im gesamten DACH-Raum, auch in ${cityLabel}.`,
    },
  };

  return contents[prof.slug] || contents['unternehmensberater'];
}

// ─── Country-specific wording ────────────────────────────────────────────────
function getCountryContext(city) {
  if (city.locale === 'de_AT') return {
    countryLabel: 'Österreich',
    ctaDesc: 'Als Österreich-fokussiertes Angebot kennt BertlClaw den heimischen Markt, die lokalen Besonderheiten und was selbstständige Profis im DACH-Raum wirklich brauchen.',
  };
  if (city.locale === 'de_DE') return {
    countryLabel: 'Deutschland',
    ctaDesc: 'BertlClaw betreut Selbstständige im gesamten DACH-Raum — mit Landingpages, die auf dem deutschen Markt wirken: klar positioniert, SEO-optimiert und überzeugend getextet.',
  };
  return {
    countryLabel: 'der Schweiz',
    ctaDesc: 'BertlClaw kennt den Schweizer Markt und betreut Selbstständige in der gesamten Deutschschweiz — mit Landingpages, die lokale Stärke und internationales Auftreten verbinden.',
  };
}

// ─── CSS (shared) ─────────────────────────────────────────────────────────────
const CSS = `
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
`.trim();

// ─── Page generator ───────────────────────────────────────────────────────────
function generatePage(city, prof) {
  const {label: cityLabel, locale, country, region} = city;
  const {label: profLabel, singular, emoji} = prof;
  const content  = getProfessionContent(prof, city);
  const ctx      = getCountryContext(city);
  const filename = `landingpage-${city.slug}-${prof.slug}.html`;
  const url      = `https://bertlclaw.at/${filename}`;
  const today    = new Date().toISOString().slice(0, 10);

  const title  = `Landingpage für ${profLabel} in ${cityLabel} | BertlClaw`;
  const desc   = `${profLabel} in ${cityLabel} (${region}): Professionelle Landingpage und Website-Texte von BertlClaw.`;

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Landingpage für ${profLabel} in ${cityLabel}`,
    description: desc,
    author: {
      '@type': 'Organization',
      name: 'BertlClaw',
      url: 'https://bertlclaw.at/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BertlClaw',
      url: 'https://bertlclaw.at/',
    },
    url,
    datePublished: today,
    dateModified: today,
    inLanguage: 'de',
  }, null, 2);

  // Locale-aware paragraph endings
  const dachNote = locale === 'de_AT'
    ? `BertlClaw arbeitet vollständig remote und betreut ${profLabel} im gesamten DACH-Raum — auch in ${cityLabel}. Der Prozess ist schlank: Ein kostenloses Erstgespräch, klare Aufgabenstellung, und in wenigen Tagen hast du eine fertige Landingpage, die deinen Auftritt in Österreich dauerhaft stärkt.`
    : locale === 'de_DE'
    ? `BertlClaw arbeitet vollständig remote und betreut ${profLabel} im gesamten DACH-Raum — auch in ${cityLabel}. Der Prozess ist schlank: Ein kostenloses Erstgespräch, klare Aufgabenstellung, und in wenigen Tagen hast du eine fertige Landingpage, die deinen Auftritt in Deutschland dauerhaft stärkt.`
    : `BertlClaw arbeitet vollständig remote und betreut ${profLabel} im gesamten DACH-Raum — auch in ${cityLabel}. Der Prozess ist schlank: Ein kostenloses Erstgespräch, klare Aufgabenstellung, und in wenigen Tagen hast du eine fertige Landingpage, die deinen Auftritt in der Schweiz dauerhaft stärkt.`;

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
  <meta property="og:locale" content="${locale}" />
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
      <span class="eyebrow">${emoji} ${profLabel} · ${cityLabel} · ${region}</span>
      <h1 class="accent-text">Landingpage für ${profLabel} in ${cityLabel}</h1>
      <p class="lead">Du bist als ${singular} in ${cityLabel} tätig und willst online sichtbar werden? BertlClaw erstellt professionelle Landingpages für ${profLabel} in ${cityLabel} (${region}) — klar positioniert, überzeugend getextet, in wenigen Tagen live.</p>
      <div class="cta">
        <a class="btn btn-primary" href="erstgespraech.html">Erstgespräch vereinbaren</a>
        <a class="btn btn-secondary" href="services.html">Leistungen ansehen</a>
      </div>
    </div>
  </header>

  <main class="wrap">

    <section class="section">
      <div class="article-body">

        <h2>${profLabel} in ${cityLabel} — professionelle Landingpage von BertlClaw</h2>
        <p>${content.intro}</p>

        <h2>${profLabel} in ${country}: Warum Online-Sichtbarkeit entscheidend ist</h2>
        <p>${content.why}</p>

        <h2>Was BertlClaw für ${profLabel} in ${cityLabel} macht</h2>
        <p>${content.what}</p>
        <p>${dachNote}</p>

        <h2>Wie du mit BertlClaw startest</h2>
        <p>${content.process}</p>
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
        <h2>Landingpage für ${profLabel} in ${cityLabel} — los geht's</h2>
        <p>${ctx.ctaDesc} Im kostenlosen Erstgespräch besprechen wir, wie wir deine Landingpage für ${cityLabel} aufbauen — mit klarer Positionierung, überzeugenden Texten und einem Design, das Vertrauen schafft.</p>
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
    BertlClaw · Landingpage für ${profLabel} in ${cityLabel} · ${region} · ${country}
  </footer>
</body>
</html>`;
}

// ─── Sitemap updater ──────────────────────────────────────────────────────────
function updateSitemap(newUrls) {
  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.warn('sitemap.xml not found, skipping sitemap update.');
    return;
  }
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const today = new Date().toISOString().slice(0, 10);
  const closing = '</urlset>';

  const entries = newUrls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('');

  if (sitemap.includes(closing)) {
    sitemap = sitemap.replace(closing, `${entries}\n${closing}`);
  } else {
    sitemap += entries;
  }
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log(`Sitemap updated with ${newUrls.length} new URLs.`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function main() {
  let generated = 0;
  let skipped   = 0;
  const newUrls = [];

  for (const city of allCities) {
    for (const prof of newProfessions) {
      const filename = `landingpage-${city.slug}-${prof.slug}.html`;
      const filepath = path.join(ROOT, filename);

      if (fs.existsSync(filepath)) {
        skipped++;
        continue;
      }

      const html = generatePage(city, prof);
      fs.writeFileSync(filepath, html, 'utf8');
      newUrls.push(`https://bertlclaw.at/${filename}`);
      generated++;
      console.log(`✓ ${filename}`);
    }
  }

  if (newUrls.length > 0) {
    updateSitemap(newUrls);
  }

  console.log(`\nDone. Generated: ${generated}, Skipped (already exist): ${skipped}`);
}

main();
