# BERTLCLAW-QA-TEST-SCENARIOS.md
# Umfassende QA-Testszenarien für bertlclaw.at

> Vor jedem Push nach `main` (= Live-Deploy auf bertlclaw.at) durchgehen.
> Tester: Dominic · Letztes Update: 2026-04-04

---

## Seiten-Inventar (Stand 2026-04-04)
- `/` – Startseite
- `/kontakt.html`
- `/services.html`
- `/use-cases.html`
- `/proof.html`
- `/ueber-bertlclaw.html`
- `/landingpages.html`
- `/landingpage-sprint.html`
- `/website-texte-positionierung.html`
- `/positionierung-website-texte.html`
- `/ki-fuer-selbststaendige.html`
- `/mvp-digitale-produktideen.html`
- `/digitale-struktur-systeme.html`
- `/digital-clarity-setup.html`
- `/selbststaendige-website.html`
- `/dienstleister-website.html`
- `/digitale-struktur-aufbauen.html`
- `/angebot-kommunizieren.html`
- `/arbeitsweise.html`
- `/website-optimierung.html`
- `/faq.html`
- `/erstgespraech.html`
- `/danke.html`
- `/impressum.html`
- `/datenschutz.html`

---

## Desktop Tests (1280px+)

Viewport: 1280 × 800 (mindestens), Browser-Zoom: 100%

- [ ] Startseite lädt korrekt — Hero-Bild sichtbar, keine Layout-Shifts
- [ ] Alle 6 Nav-Links vorhanden und klickbar: Leistungen, Anwendungsfälle, Proof, Über BertlClaw, FAQ, Kontakt
- [ ] Nav sticky: bleibt oben beim Scrollen
- [ ] Kontaktformular abschickbar (mit echter E-Mail-Adresse testen)
- [ ] Alle CTA-Buttons ("Jetzt anfragen", "Erstgespräch vereinbaren") klickbar und weiterleiten korrekt
- [ ] Logo lädt (`bertlclaw-assets/logo-main.jpg`)
- [ ] OG-Card-Bild ladbar (`bertlclaw-assets/og-card.jpg`)
- [ ] Footer-Links alle vorhanden und funktionstüchtig (Startseite, Leistungen, Anwendungsfälle, Proof, Über BertlClaw, Arbeitsweise, FAQ, Kontakt, Impressum, Datenschutz = 10 Links)
- [ ] FAQ-Seite: Accordion öffnet beim Klick, schließt beim erneuten Klick
- [ ] GoatCounter-Request erscheint im Netzwerk-Tab (URL: `gc.zgo.at/count`)
- [ ] Keine horizontalen Scrollbalken
- [ ] Keine kaputten Bilder (alt-Text sichtbar statt Bild)

---

## Mobile Tests (375px — iPhone SE)

DevTools: 375 × 667 px, User Agent Mobile aktiviert

- [ ] Navigation kollabiert korrekt auf Mobilgeräten (keine überquellenden Links)
- [ ] Hero-Text lesbar ohne Zoom-Geste
- [ ] Alle Grids kollabieren zu **1 Spalte** (kein 2- oder 3-Spalten-Layout auf 375px)
- [ ] Alle Buttons sind **full-width** auf Mobile
- [ ] Kontaktformular auf Mobile nutzbar: Felder tippen, Tastatur öffnet sich korrekt
- [ ] Touch-Targets ≥ 44px (Buttons, Links, Nav-Items)
- [ ] **Kein horizontaler Scroll** auf keiner Seite
- [ ] Footer-Links wrappen sauber, kein Overflow
- [ ] WhatsApp-Link funktioniert (`wa.me/...`)
- [ ] E-Mail-Link öffnet Mail-App (`mailto:...`)
- [ ] Hero-Bilder / Hintergrundgrafiken korrekt (kein Ausschnitt, kein Overflow)

---

## Tablet Tests (768px)

DevTools: 768 × 1024 px

- [ ] Layout zwischen Mobile und Desktop sieht korrekt aus
- [ ] Keine kaputten Grid-Layouts (kein 1-Spalten-Layout das eigentlich 2 sein sollte, oder umgekehrt)
- [ ] Nav korrekt dargestellt (weder Mobile-Kollaps noch Desktop-Overflow)
- [ ] Alle Buttons haben angemessene Größe (nicht riesig/nicht zu klein)
- [ ] Hero-Sektion füllt Viewport sinnvoll

---

## Browser Tests

Auf Desktop + Mobile jeweils testen:

- [ ] **Chrome** (Desktop + Android) ✓
- [ ] **Safari** (macOS) ✓
- [ ] **Firefox** (Desktop) ✓
- [ ] **Mobile Safari** (iOS) ✓
- [ ] Kein `backdrop-filter`-Fehler in Firefox (Nav-Blur ggf. degradieren)
- [ ] CSS Custom Properties (Variablen) überall korrekt

---

## SEO Tests

- [ ] Jede Seite hat **einzigartigen** `<title>` (kein Duplikat über Seiten hinweg)
- [ ] Jede Seite hat eine **einzigartige** `<meta name="description">`
- [ ] Canonical-URL korrekt (`https://bertlclaw.at/...` — **nicht** `*.github.io`)
- [ ] `hreflang` vorhanden (`de` + `x-default`)
- [ ] JSON-LD valide (testen mit [Google Rich Results Test](https://search.google.com/test/rich-results))
- [ ] GoatCounter lädt (`gc.zgo.at/count.js` — kein 404 im Netzwerk-Tab)
- [ ] `robots.txt` erreichbar unter `https://bertlclaw.at/robots.txt`
- [ ] `sitemap.xml` erreichbar unter `https://bertlclaw.at/sitemap.xml` und valide XML
- [ ] Sitemap enthält alle relevanten Seiten (keine fehlenden neuen Seiten)
- [ ] OG-Tags (`og:title`, `og:description`, `og:image`, `og:url`) auf jeder Seite
- [ ] Twitter-Card-Tags vorhanden

---

## Conversion Tests

- [ ] Kontaktformular abschicken → **Weiterleitung zu `danke.html`**
- [ ] `danke.html` lädt korrekt, kein 404
- [ ] Alle "Jetzt anfragen"-Links zeigen auf `kontakt.html` (oder `index.html#kontakt`)
- [ ] Alle "Erstgespräch"-Links zeigen auf `erstgespraech.html`
- [ ] WhatsApp-Links funktionieren auf Mobile (`wa.me/...` öffnet WhatsApp)
- [ ] E-Mail-Links (`mailto:...`) öffnen den Mail-Client
- [ ] Kein CTA-Button zeigt auf eine 404-Seite
- [ ] `erstgespraech.html` lädt korrekt
- [ ] Alle internen Links auf 404 prüfen (kurz mit Browser DevTools → Network-Tab checken)

---

## Performance Tests

- [ ] Seitenladezeit unter **3 Sekunden auf Mobile (3G)** (testen mit Chrome DevTools → Netzwerk-Drosselung: "Slow 3G")
- [ ] **Keine Konsolenfehler** (Chrome DevTools → Console → keine roten Fehlermeldungen)
- [ ] Alle `<img>`-Tags haben ein `alt`-Attribut (leer `alt=""` für dekorative Bilder OK)
- [ ] Keine 404-Fehler im Netzwerk-Tab beim Laden
- [ ] CSS/JS inline oder lokal — keine externen Abhängigkeiten (außer GoatCounter + Google Fonts wenn verwendet)
- [ ] Seiten funktionieren auch ohne JavaScript (GoatCounter-Ausfall OK, aber Layout/Inhalte müssen stehen)

---

## Regressions-Checkliste nach größeren Änderungen

Wenn Nav oder Footer geändert wird:
- [ ] Alle Seiten auf korrekten Nav/Footer prüfen (Seiten-Inventar oben)

Wenn Styles global geändert werden:
- [ ] Alle Seiten kurz aufrufen, kein Layout-Bruch

Wenn sitemap.xml geändert wird:
- [ ] XML valide (kein Tipp- oder Tag-Fehler)
- [ ] Neue Seiten drin, gelöschte Seiten draußen

Wenn Formspree-ID geändert wird:
- [ ] Testformular abschicken und E-Mail-Eingang prüfen

---

## Schnell-Referenz: Wichtige URLs

| Was | URL |
|---|---|
| Live-Site | https://bertlclaw.at/ |
| GoatCounter | https://bertlclaw.goatcounter.com/ |
| Formspree Dashboard | https://formspree.io/forms |
| Google Search Console | https://search.google.com/search-console |
| Google Rich Results Test | https://search.google.com/test/rich-results |
| GitHub Repo | https://github.com/BertlClaw/bertlclaw-site |

---

_Alle Checkboxen nach dem Testen auf `[x]` setzen und Datum notieren. Nach dem Push zurücksetzen auf `[ ]` für den nächsten Testdurchlauf._
