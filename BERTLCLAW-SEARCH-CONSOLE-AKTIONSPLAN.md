# BertlClaw — Google Search Console Aktionsplan

## Voraussetzung
Property in Search Console verifiziert (via HTML-Tag oder DNS-Eintrag bei bertlclaw.at).

---

## Schritt 1: Sitemap einreichen

**Was:** Die sitemap.xml teilt Google mit, welche Seiten es indexieren soll.

**Steps:**
1. In Search Console: linke Sidebar → "Sitemaps"
2. Feld: `https://bertlclaw.at/sitemap.xml` eingeben
3. "Senden" klicken
4. Status sollte nach wenigen Minuten "Erfolg" zeigen

**Falls keine sitemap.xml vorhanden:**
- Erstelle `/sitemap.xml` im Repository mit allen wichtigen Seiten:
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://bertlclaw.at/</loc></url>
    <url><loc>https://bertlclaw.at/services.html</loc></url>
    <url><loc>https://bertlclaw.at/proof.html</loc></url>
    <url><loc>https://bertlclaw.at/use-cases.html</loc></url>
    <url><loc>https://bertlclaw.at/kontakt.html</loc></url>
    <url><loc>https://bertlclaw.at/impressum.html</loc></url>
  </urlset>
  ```

---

## Schritt 2: URL-Inspektion für die 10 wichtigsten Seiten

**Was:** Prüfen ob eine Seite indexiert ist, und falls nicht — warum.

**Steps:**
1. Sidebar → "URL-Inspektion"
2. URL eingeben, Enter
3. Ergebnis lesen: "URL ist bei Google" ✅ oder "URL ist nicht bei Google" ⚠️

**Die 10 wichtigsten BertlClaw-Seiten prüfen:**
1. `https://bertlclaw.at/` — Startseite
2. `https://bertlclaw.at/services.html` — Leistungen
3. `https://bertlclaw.at/proof.html` — Referenzen/Beweis
4. `https://bertlclaw.at/use-cases.html` — Anwendungsfälle
5. `https://bertlclaw.at/kontakt.html` — Kontakt
6. `https://bertlclaw.at/impressum.html` — Impressum
7. `https://bertlclaw.at/datenschutz.html` — Datenschutz (falls vorhanden)
8. Weitere Unterseiten nach Bedarf

**Falls "nicht indexiert":**
- Auf "Indexierung beantragen" klicken
- Google indexiert neue Seiten typisch innerhalb 1–7 Tage

---

## Schritt 3: Performance-Bericht lesen

**Navigation:** Sidebar → "Leistung" → "Suchergebnisse"

**Was die 4 Metriken bedeuten:**

| Metrik | Bedeutung | Was ist gut? |
|--------|-----------|--------------|
| **Impressionen** | Wie oft erschien deine Seite in den Suchergebnissen | Wächst mit der Zeit |
| **Klicks** | Wie oft jemand auf dein Ergebnis geklickt hat | Mehr = besser |
| **CTR** (Click-Through-Rate) | Klicks ÷ Impressionen × 100 | > 3–5% ist solid |
| **Position** | Durchschnittliche Ranking-Position | < 10 = erste Seite |

**Tipps:**
- Filter nach "Seiten" um zu sehen, welche Seiten am besten performen
- Filter nach "Suchanfragen" um zu sehen, für welche Keywords du rankst
- Zeitraum: "Letzte 3 Monate" für sinnvolle Trends

**Worauf achten:**
- Suchanfragen mit hoher Impression, niedriger CTR → Title/Description verbessern
- Suchanfragen mit Position 11–20 → "low-hanging fruit" für Optimierung
- Neue Keywords entdecken, für die du unabsichtlich rankst

---

## Schritt 4: "Entdeckung" — Welche Seiten sind nicht indexiert?

**Navigation:** Sidebar → "Indexierung" → "Seiten"

**Was du siehst:**
- **Indexiert:** Diese Seiten kennt Google ✅
- **Nicht indexiert:** Diese Seiten fehlen ⚠️

**Häufige Gründe für "nicht indexiert":**
- "Gecrawlt – aktuell nicht indexiert" → Google hat die Seite gesehen, hält sie für irrelevant → Content verbessern
- "Entdeckt – aktuell nicht indexiert" → Google weiß davon, hat sie noch nicht gecrawlt → warten oder Indexierung beantragen
- "Nicht gecrawlt" → robots.txt blockiert evtl. → prüfen
- "Noindex-Tag" → `<meta name="robots" content="noindex">` entfernen falls ungewollt

**Action:**
- Alle wichtigen Seiten sollten indexiert sein
- Unwichtige Seiten (z.B. Danke-Seiten) können ruhig nicht-indexiert bleiben

---

## Schritt 5: Regelmäßiger Rhythmus

### Wöchentlich (5 Min)
- [ ] Neue Suchanfragen anschauen (was suchen Leute?)
- [ ] Gibt es plötzliche Einbrüche bei Impressionen oder Klicks?
- [ ] Neue Seiten indexiert?

### Monatlich (20–30 Min)
- [ ] Performance-Bericht: Top-10-Keywords notieren
- [ ] CTR-Analyse: Welche Seiten haben schlechte CTR? → Title/Meta Description überarbeiten
- [ ] Positionen: Welche Keywords sind von 11–20 auf < 10 gerückt?
- [ ] Neue Seiten oder Änderungen am Impressum → URL-Inspektion + Indexierung beantragen
- [ ] Core Web Vitals Report prüfen (Sidebar → "Nutzererfahrung")
- [ ] PageSpeed Insights für Startseite ausführen: https://pagespeed.web.dev

### Quartalsweise
- [ ] Gesamtstrategie: Wachsen Impressionen und Klicks?
- [ ] Neue Keywords identifizieren und dafür Content planen
- [ ] Sitemap aktualisieren falls neue Seiten hinzugekommen sind

---

## Quick-Reference: Wichtige Search Console URLs

| Bereich | Direkt-Link |
|---------|-------------|
| Leistung | https://search.google.com/search-console/performance/search-analytics |
| URL-Inspektion | https://search.google.com/search-console/inspect |
| Sitemaps | https://search.google.com/search-console/sitemaps |
| Indexabdeckung | https://search.google.com/search-console/index |
| Core Web Vitals | https://search.google.com/search-console/core-web-vitals |

---

## Zeitaufwand

| Aufgabe | Zeit |
|---------|------|
| Ersteinrichtung (Sitemap, URL-Inspektion der 10 Seiten) | ~45 Min |
| Wöchentlicher Check | ~5 Min |
| Monatlicher Review | ~20–30 Min |
