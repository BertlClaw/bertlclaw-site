# BertlClaw Repeatable QA Checks

Stand: 2026-04-02

Diese Checks sind absichtlich kurz, wiederholbar und für permanente Retests gedacht.

---

## A. 5-Minuten Critical Smoke

### A1. Startseite
- `index.html` öffnen
- Hero lesen: Ist in 5 Sekunden klar, was BertlClaw anbietet?
- Erste primäre CTA klicken
- bis zur Kontaktsektion scrollen

### A2. Kontakt
- Formularfelder fokussieren
- Pflichtfelder kurz prüfen
- Datenschutz-Hinweis beim Formular prüfen
- Danke-Seite als Zielpfad plausibilisieren

### A3. Vertrauenslayer
- `impressum.html` öffnen
- `datenschutz.html` öffnen
- Footer-Links prüfen

### A4. Mobile Schnellcheck
- `index.html` bei 390×844 und 360×800 öffnen
- Chat-Button öffnen/schließen
- CTA antippen
- horizontalen Scroll ausschließen

**PASS wenn**
- keine Kernseite sichtbar kaputt ist
- CTA-/Kontaktpfad erkennbar nutzbar ist
- Legal-Seiten erreichbar sind

---

## B. Contact Flow Retest Pack

### Happy Path
1. `index.html` öffnen
2. Formular mit Testdaten füllen
3. absenden
4. Weiterleitung zu `danke.html` prüfen
5. realen Eingang manuell im Zielsystem prüfen

### Negative Path
1. Formular leer oder mit ungültiger Mail absenden
2. Browser-/Form-Validierung beobachten
3. prüfen, ob Nutzer sauber geführt wird

### Chat-to-Form
1. Chat auf Startseite öffnen
2. Freitext eingeben
3. „Frage ins Formular übernehmen“ klicken
4. prüfen, ob Nachricht im Nachrichtenfeld landet
5. Kontaktsektion-Fokus prüfen

### Unterseiten-Redirect
1. `services.html` oder `landingpage-sprint.html` öffnen
2. Chat öffnen
3. kurze Nachricht eingeben
4. `Projekt anfragen` klicken
5. prüfen, ob Redirect zu `index.html?chat=...#kontakt` verständlich funktioniert
6. prüfen, ob Nachricht im Formular vorbefüllt ankommt

**PASS wenn**
- kein stilles Scheitern auftritt
- Nutzer nie in einer Sackgasse landet
- reale Lead-Zustellung bestätigt ist

---

## C. Mobile Conversion Sweep

Auf mindestens 3 Seiten testen:
- `index.html`
- `services.html`
- eine Angebotsunterseite (z. B. `landingpage-sprint.html`)

### Prüfen
- Headline ohne Zoomen lesbar
- erste CTA schnell erreichbar
- Chat/Floating UI verdeckt keine Kerninhalte
- Buttons ausreichend groß
- kein abgeschnittener Text
- Footer/Legal mobil noch gut erreichbar

**PASS wenn**
- Seite sich natürlich mit dem Daumen bedienen lässt
- keine Konversionsbarriere sichtbar ist

---

## D. Proof Page Trust Check

### Seite
- `proof.html`

### Prüfen
- Titel/Intro vermitteln glaubwürdige Proof-Logik
- CTA zurück zu Services/Kontakt funktioniert
- keine hohlen Behauptungen ohne Einordnung
- Proof wirkt wie Vertrauensverstärker, nicht wie Platzhalter

**PASS wenn**
- ein neuer Besucher versteht, was Proof hier bedeutet
- die Seite eine nachvollziehbare nächste Handlung anbietet

---

## E. Reminder / Reporting Reliability Check

### Dokumente / Artefakte
- `BERTLCLAW-REMINDER-SYSTEM.md`
- `logs/bertlclaw-operations.log`
- `state/bertlclaw-reminders.json`
- `qa-artifacts/reminder-audit/latest.json`

### Prüfen
- `node bertlclaw-tools/reminder-heartbeat.js` ausführen
- `node bertlclaw-tools/reminder-audit.js --hours=6` ausführen
- werden Logeinträge konsistent ergänzt?
- ist der letzte erfolgreiche Lauf in der State-Datei sichtbar?
- meldet der Audit fehlende Stundenfenster reproduzierbar?
- ist die tägliche GitHub-Ticket-Erinnerung technisch mindestens lokal abgesichert?

**PASS wenn**
- Systemzustand klar ist
- Heartbeat + Audit lokal reproduzierbar laufen
- fehlende Stunden maschinisch erkennbar sind
- bekannte Restlücken dokumentiert und priorisiert sind

---

## F. Schema / Metadata Spot Check

### Fokus
- `index.html`
- zentrale Unterseiten nach Bedarf

### Prüfen
- `title`, `meta description`, canonical vorhanden
- Open Graph plausibel
- JSON-LD nur mit real existierenden Features
- `SearchAction` nur behalten, wenn echte Site Search existiert

**PASS wenn**
- Metadaten und strukturierte Daten keine falschen Signale senden

---

## G. Retest-Notizstandard

Jeder Retest soll am Ende kurz festhalten:
- Datum/Zeit
- getesteter Bereich
- Gerät/Viewport
- Ergebnis: pass / fail / partial
- Folgeaktion
