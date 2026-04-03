# BertlClaw QA Tester Worksheet — Contact / Mobile UX / Proof & Trust

Stand: 2026-04-02

Zweck: kompaktes Operator-Blatt für manuelle QA-Läufe. Dieses Dokument ist absichtlich kürzer und ausführbarer als der Retest-Pack. Es soll Testen, Evidence-Capture und Ergebnis-Reporting in **einem** Ablauf bündeln.

Nutzen:
- große manuelle Blöcke werden schneller abhakbar
- Evidence wird einheitlich gesammelt
- PASS / PARTIAL / FAIL wird pro Testblock sauber dokumentiert
- Ergebnisse können direkt in `bertlclaw-qa-active-bugs.csv` oder Logeinträge überführt werden

---

## 0. Run Header

- Tester:
- Datum:
- Startzeit:
- Umgebung: Live / Preview / Local
- Basis-URL:
- Gerät:
- Browser:
- Viewport:
- Gerätetyp: Echtgerät / Emulator
- Netz: Wi-Fi / Mobile / Other
- Lauf-Typ: smoke / retest / exploratory

### Evidence-Sammelregeln
- Bei jedem FAIL mindestens **1 Screenshot**
- Bei jedem PARTIAL mindestens **1 kurze Notiz**, warum es nicht ganz sauber wirkt
- Bei Contact- oder Redirect-Problemen URL nach Aktion notieren
- Bei Formularproblemen sichtbare Fehlermeldung oder fehlenden Redirect festhalten
- Bei Trust-/Proof-Themen nicht nur „gefällt/gefällt nicht“, sondern **konkreten Reibungspunkt** notieren

### Ergebnis-Codes
- **PASS** = technisch und UX-seitig okay
- **PARTIAL** = technisch okay, aber missverständlich / schwach / leicht riskant
- **FAIL** = Funktion bricht oder relevante Hürde vorhanden
- **BLOCKED** = ohne externen Zugriff nicht abschließbar

---

# 1. Contact Flow Worksheet

## 1A. Homepage Contact Form — End-to-End

### Testdaten
- Name: `BertlClaw QA Test`
- E-Mail: kontrollierte Testadresse
- Telefon/WhatsApp: optional
- Thema: `Allgemeine Anfrage`
- Rückmeldung: `E-Mail`
- Nachricht: `Testanfrage BertlClaw QA 2026-04-02 – bitte ignorieren.`

### Prüfschritte
- [ ] `index.html#kontakt` geöffnet
- [ ] Formular vollständig ausgefüllt
- [ ] Absenden möglich
- [ ] kein sichtbarer JS-/Netzwerkfehler
- [ ] Redirect auf `danke.html`
- [ ] Danke-Seite wirkt plausibel und vertrauenswürdig
- [ ] Zustellung in Formspree/Mailbox bestätigt

### Capture
- Vor Submit URL:
- Nach Submit URL:
- Redirect okay: yes / no
- Danke-Seite sichtbar: yes / no
- Reale Zustellung bestätigt: yes / no / blocked
- Evidence:
- Ergebnis: PASS / PARTIAL / FAIL / BLOCKED
- Folgeaktion:

### Fail-Kategorie
- [ ] Validation fail
- [ ] Submit fail
- [ ] Redirect fail
- [ ] Delivery fail
- [ ] Danke-Seite schwach/unklar

---

## 1B. Alternative Contact Paths — Reachability Check

Ziel: prüfen, ob Kontaktwege für Nutzer klar und ohne Reibung erreichbar sind.

### Prüfschritte
- [ ] `mailto:`-Link vorhanden und plausibel
- [ ] `tel:`-Link vorhanden und plausibel
- [ ] WhatsApp-Link vorhanden und plausibel
- [ ] Kontakt-CTA oben sichtbar
- [ ] Kontakt-CTA unten sichtbar
- [ ] mobil weiterhin leicht erreichbar

### Capture
- Seite:
- Mail okay: yes / no
- Tel okay: yes / no
- WhatsApp okay: yes / no
- Kontakt oben klar: yes / no
- Kontakt unten klar: yes / no
- Evidence:
- Ergebnis: PASS / PARTIAL / FAIL
- Folgeaktion:

---

# 2. Mobile UX Worksheet — Real-Device Chat / CTA / Contact Handoff

## Pflichtseiten
- `services.html`
- `landingpage-sprint.html`
- `digital-clarity-setup.html`

## Pflicht-Größen
- `390x844`
- `360x800`

Abschlussbeweis nur mit mindestens einem echten Gerät plus Screenshot oder Screen Recording.

## Einheitliche Testnachricht
`Ich möchte kurz prüfen, ob meine Nachricht sauber ins Kontaktformular übernommen wird.`

---

## Pro Seite und Viewport einmal ausfüllen

### Testlauf
- Seite:
- Viewport:
- Browser/Gerät:
- Echtgerät oder Emulator:

### Prüfschritte
- [ ] Seite lädt sauber
- [ ] primäre CTA gut sichtbar
- [ ] Chat lässt sich öffnen
- [ ] Nachricht kann eingegeben werden
- [ ] Klick auf `Projekt anfragen` möglich
- [ ] Redirect auf `index.html?chat=...#kontakt`
- [ ] Kontaktsektion sofort sichtbar
- [ ] Nachricht im Nachrichtenfeld übernommen
- [ ] kein Element verdeckt Formular oder CTA
- [ ] Sticky Contact Bar stört nicht
- [ ] Chat/Floating UI stört nicht
- [ ] Flow wirkt verständlich

### Capture
- Start-URL:
- Ziel-URL:
- Redirect: pass / fail
- Prefill: pass / fail
- Kontakt sofort sichtbar: yes / no
- UI-Overlap: none / minor / major
- Flow-Eindruck: klar / partial / fail
- Was genau irritiert ggf.?
- Evidence:
- Ergebnis: PASS / PARTIAL / FAIL
- Folgeaktion:

### Explizite UX-Fragen
- Versteht man, warum man auf die Startseite springt?
- Wirkt der Wechsel wie Fortsetzung oder Bruch?
- Ist die übernommene Nachricht sofort sichtbar genug?
- Ist mobil noch genug Raum zum tatsächlichen Abschicken vorhanden?
- Verdecken Sticky-Bar, Chat-Launcher oder andere Floating-Elemente Consent, Nachrichtenfeld oder primäre Aktion?

---

# 3. Proof / Trust Worksheet

## 3A. Proof Visibility + Trust Sweep

### Ziel
Prüfen, ob `proof.html` und die Proof-Einstiege auf der Homepage die stärksten Belege schnell sichtbar machen und einen klaren nächsten Schritt liefern.

### Prüfschritte
- [ ] Homepage-Proof-Einstieg geprüft
- [ ] Proof-Seite lädt sauber
- [ ] Einstieg erklärt schnell, was hier gezeigt wird
- [ ] stärkster Beleg ist früh sichtbar und nicht versteckt
- [ ] Claims wirken nachvollziehbar statt aufgeblasen
- [ ] Mini-Cases / Proof-Module sind als reale Artefakte lesbar
- [ ] CTA zu Kontakt oder Leistungen ist klar
- [ ] Seite wirkt glaubwürdig statt selbstreferenziell
- [ ] keine offensichtliche Leerstelle bei Belegen / Nachweisen

### Capture
- Einstieg klar: yes / no
- Stärkster Beleg früh sichtbar: yes / no
- Glaubwürdigkeit: strong / okay / weak
- CTA-Klarheit: clear / partial / weak
- Konkreter stärkster sichtbarer Trust-Punkt:
- Konkreter versteckter / zu schwacher Proof-Punkt:
- Evidence:
- Ergebnis: PASS / PARTIAL / FAIL
- Folgeaktion:

---

## 3B. Contact-Area Trust Check

Ziel: prüfen, ob die Kontaktsektion genug Sicherheit gibt, damit ein Nutzer tatsächlich absendet.

### Prüfschritte
- [ ] klarer Hinweis auf echten Operator / reale Person
- [ ] kein anonymer Funnel-Eindruck
- [ ] Datenschutz / Impressum / Über / Proof sinnvoll erreichbar
- [ ] Vertrauenssignale wirken konkret, nicht generisch
- [ ] nächste Aktion ist niedrigschwellig genug

### Capture
- Seite:
- Echter-Operator-Signal klar: yes / no
- Relevante Trust-Links sichtbar: yes / no
- Kontakt wirkt niedrigschwellig: yes / no
- Größter Trust-Stärker:
- Größter Trust-Abbau:
- Evidence:
- Ergebnis: PASS / PARTIAL / FAIL
- Folgeaktion:

---

# 4. Quick Summary for Reporting

## Block-Ergebnisse
- Contact Flow:
- Alternative Contact Paths:
- Mobile UX:
- Proof Page:
- Contact Trust:

## Bugs / Tickets betroffen
- `BCQA-001`:
- `BCQA-004`:
- `BCQA-005`:
- ggf. neues Ticket:

## Empfohlene Status-Updates
- `retested_pass`
- `partial`
- `retested_fail`
- `blocked_manual_access`

## Top 3 Findings
1.
2.
3.

## Top 3 Next Actions
1.
2.
3.

---

# 5. Copy-Ready Output Snippets

## Für `bertlclaw-qa-active-bugs.csv` Notes / Evidence
`Manual worksheet run on [date/time], page [page], viewport [viewport]. Result: [PASS/PARTIAL/FAIL]. Key finding: [short finding]. Evidence: [screenshot/note/reference].`

## Für Operations Log
`[YYYY-MM-DD HH:MM CEST] QA manual worksheet run completed: contact flow=[status], mobile UX=[status], proof/trust=[status]; key finding=[short finding]; follow-up=[next action].`

## Für knappe Telegram-/Operator-Zusammenfassung
- Contact flow: 
- Mobile UX: 
- Proof/trust: 
- Blocker: 
- Next move: 

---

# 6. Recommended Run Order

Wenn wenig Zeit da ist, in dieser Reihenfolge testen:
1. Homepage contact form end-to-end
2. 3 mobile chat→contact runs
3. proof.html trust sweep
4. contact-area trust check
5. alternative contact paths check

Damit wird zuerst echtes Lead-Risiko geprüft, dann Mobile-Conversion-Risiko, dann Trust-/Proof-Wirkung.
