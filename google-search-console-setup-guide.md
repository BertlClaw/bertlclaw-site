# Google Search Console – Setup Guide für BertlClaw

## Warum das wichtig ist

Google kann eine Seite nicht ranken, die es noch nicht kennt. Ohne Indexierung existiert die Seite für Suchmaschinen schlicht nicht. Google Search Console (GSC) ist das direkte Kommunikationsmittel zwischen dir und Google – du meldest die Seite aktiv an, gibst Google Zugriff auf die Sitemap und kannst einzelne URLs direkt zur Indexierung anfragen.

**Erwartete Timelines:**
- Erste Indexierung (Startseite sichtbar in Google): 1–7 Tage nach GSC-Setup
- Erste Rankings auf Brand-Terms (z.B. „BertlClaw"): 2–4 Wochen
- Rankings auf kompetitive Keywords (z.B. „Landingpage erstellen Österreich"): 3–6 Monate
- Stabile organische Sichtbarkeit: 6–12 Monate mit konsistenter Content-Arbeit

---

## Schritt-für-Schritt Anleitung

### Schritt 1: GSC öffnen

Geh auf: **https://search.google.com/search-console/welcome**

Melde dich mit deinem Google-Account an (idealerweise mit einem, den du langfristig nutzen willst – du kannst später weitere Nutzer hinzufügen).

---

### Schritt 2: Property hinzufügen (URL-Präfix-Methode)

Wähle auf der Willkommensseite die rechte Option: **„URL-Präfix"**

Gib ein: `https://bertlclaw.at/`

⚠️ Achte auf das exakte `https://` und den abschließenden `/`. Nicht `http://` und nicht ohne Slash.

Klick auf **Weiter**.

---

### Schritt 3: Verifizierung via HTML-Tag

Du siehst mehrere Verifizierungsmethoden. Wähle: **„HTML-Tag"**

GSC zeigt dir einen Tag wie diesen:
```html
<meta name="google-site-verification" content="DEIN_CODE_HIER" />
```

**Was du tun musst:**
1. Kopiere den `content="..."` Wert (dein persönlicher Code)
2. Öffne `index.html` in deinem GitHub-Repo oder lokal
3. Suche nach dem Kommentar: `<!-- Google Search Console verification — replace content value after GSC setup -->`
4. Ersetze `REPLACE_WITH_GSC_CODE` mit deinem echten Code
5. Speichern → Git commit → Push auf main

Warte ca. 1–2 Minuten bis GitHub Pages deployed hat, dann klick auf **„Verifizieren"** in GSC.

---

### Schritt 4: Sitemap einreichen

Nach erfolgreicher Verifizierung:

1. Im linken Menü: **Sitemaps** klicken
2. Im Feld „Neue Sitemap hinzufügen" eingeben: `sitemap.xml`
3. Klick auf **Senden**

GSC zeigt dann den Status der Sitemap an. Grün = gut. Es kann 24–48h dauern bis GSC die URLs aus der Sitemap verarbeitet hat.

Die BertlClaw-Sitemap ist erreichbar unter: `https://bertlclaw.at/sitemap.xml`

---

### Schritt 5: Einzelne URLs zur Indexierung anfragen

Für die wichtigsten Seiten direkt eine Indexierung anfordern (beschleunigt den Prozess):

1. Im linken Menü: **URL-Prüfung** (oben)
2. URL eingeben → Enter
3. Warte auf die Prüfung → Klick auf **„Indexierung beantragen"**

**Prioritätsliste – diese URLs anfragen:**
1. `https://bertlclaw.at/`
2. `https://bertlclaw.at/services.html`
3. `https://bertlclaw.at/landingpage-sprint.html`
4. `https://bertlclaw.at/positionierung-website-texte.html`
5. `https://bertlclaw.at/digital-clarity-setup.html`
6. `https://bertlclaw.at/ueber-bertlclaw.html`
7. `https://bertlclaw.at/faq.html`
8. `https://bertlclaw.at/use-cases.html`
9. `https://bertlclaw.at/proof.html`

⚠️ GSC erlaubt max. ~10 manuelle Anfragen pro Tag – verteile sie auf 2 Tage.

---

## Bonus-Tipps für schnellere Indexierung

- **Externe Links aufbauen:** Teile die Seite auf LinkedIn, in Netzwerken, in relevanten Foren. Jeder externe Link hilft Google, die Seite zu entdecken.
- **Ping-Service:** Nach dem Push kannst du auch `https://www.google.com/ping?sitemap=https://bertlclaw.at/sitemap.xml` im Browser aufrufen – das ist ein direkter Hinweis an Google.
- **GSC regelmäßig checken:** Nach 2–3 Wochen siehst du erste Click- und Impression-Daten. Diese zeigen dir, für welche Suchbegriffe Google die Seite bereits zeigt.

---

## Wann bist du fertig?

- ✅ Property verifiziert
- ✅ Sitemap eingereicht und Status = „Erfolgreich"
- ✅ Indexierungsanfragen für Top-9-URLs gestellt
- ✅ `google-site-verification` Meta-Tag in index.html mit echtem Code

Danach: warten + beobachten. GSC zeigt nach ca. 7–14 Tagen erste Daten.
