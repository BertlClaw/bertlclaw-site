# BertlClaw QA Active Test Plan

Stand: 2026-04-02

Ziel dieses Dokuments: aus dem QA-Modell in einen aktiven, wiederholbaren Arbeitsplan wechseln – mit klaren Testpaketen, Prioritäten, Exit-Kriterien und direkter Verbindung zum Bug-Backlog.

---

## 1. Aktive QA-Schwerpunkte

### Stream A — Website Core
**Ziel:** Startseite, Leistungsseiten und Kernnavigation bleiben auf Desktop + Mobile vertrauenswürdig und conversion-tauglich.

**Seiten in jedem Sweep**
- `index.html`
- `services.html`
- `use-cases.html`
- `landingpages.html`
- `landingpage-sprint.html`
- `positionierung-website-texte.html`
- `digital-clarity-setup.html`
- `digitale-struktur-systeme.html`
- `ki-fuer-selbststaendige.html`
- `mvp-digitale-produktideen.html`
- `website-texte-positionierung.html`

**Pflichtchecks**
- Seite lädt ohne sichtbaren Bruch
- Hero und erste CTA sind sofort verständlich
- Footer-/Legal-Links funktionieren
- Keine offensichtlichen Layout-Ausreißer
- Mobile: keine horizontalen Scrollbars, keine abgeschnittenen CTAs

**Done pro Loop**
- mindestens 1 Desktop-Sweep
- mindestens 1 Mobile-Sweep
- neue Funde sofort ins Bug-Backlog

---

### Stream B — Contact Flow Reliability
**Ziel:** kein Lead geht still verloren; Website, Chat, Mailto, WhatsApp und Danke-Seite greifen sauber ineinander.

**Pflichtflows**
1. `index.html` → Kontaktformular → `danke.html`
2. `index.html` Chat → „Frage ins Formular übernehmen“ → vorbefülltes Formular
3. Unterseite mit Chat → `Projekt anfragen` → Redirect zu `index.html?chat=...#kontakt`
4. Mailto-Links öffnen mit sinnvollem Empfänger/Betreff
5. WhatsApp-Link öffnet korrekt
6. Telefon-Link öffnet korrekt

**Manual-access Pflichtpunkt**
- Formspree-/Mailbox-Eingang real bestätigen

**Done pro Loop**
- Happy Path einmal validiert
- 1 Negativtest (leere/ungültige Eingabe)
- 1 Unterseiten-Chat-zu-Kontakt-Flow validiert

---

### Stream C — Proof Pages & Trust Layer
**Ziel:** Proof-Seiten stärken Glaubwürdigkeit statt Fragen offen zu lassen.

**Seiten / Bereiche**
- `proof.html`
- `bertlclaw-proof/` Arbeitsstruktur

**Pflichtchecks**
- Proof-Seite ist aus Besuchersicht verständlich
- CTA-Pfade von Proof zurück zu Kontakt/Services funktionieren
- keine kaputten Medien/Links
- Aussagen bleiben nachvollziehbar und nicht überzogen
- Proof-Arbeitsstruktur ist für künftige Case-Evidence nutzbar

**Done pro Loop**
- 1 Trust-/Messaging-Review
- 1 CTA-/Link-Sweep
- 1 Backoffice-Check, ob Proof-Ordnerstruktur für neue Cases nutzbar bleibt

---

### Stream D — Reminder & Reporting Reliability
**Ziel:** stündliche Updates, GitHub-Ticket-Erinnerung und Operations-Log sind nicht nur Policy, sondern prüfbar.

**Pflichtchecks**
- `BERTLCLAW-REMINDER-SYSTEM.md` entspricht gewünschtem Betriebsmodus
- `logs/bertlclaw-operations.log` wird weitergeführt
- Lücke identifizieren zwischen Reminder-Policy und echter technischer Ausführung
- Prüfen, ob volle-Stunden-Updates aktuell nur manuell/disziplinbasiert sind

**Done pro Loop**
- Status der Reminder-Zuverlässigkeit dokumentiert
- technische Lücken als Bugs oder To-dos gepflegt
- Logeintrag für QA-Arbeit ergänzt

---

## 2. Priorisierte Testreihenfolge pro QA-Zyklus

1. Offene Retests
2. Contact Flow Reliability
3. Mobile Conversion Sweep
4. Website Core Layout/CTA Sweep
5. Proof/Trust Sweep
6. Reminder/Reporting Reliability Review
7. P2/P3-Backlog neu bewerten

---

## 3. Geräte-/Viewport-Matrix

### Desktop
- 1440×900
- 1280×800
- 1024×768

### Mobile
- 390×844 (iPhone Standard)
- 360×800 (Android Standard)

### Pflichtregel
Kein Check gilt als abgeschlossen, wenn nur Desktop betrachtet wurde.

---

## 4. Exit-Kriterien für die wichtigsten Bereiche

### Website Core PASS
- keine P0/P1-Layout- oder Navigationsprobleme offen
- Kernseiten auf Mobile + Desktop nutzbar

### Contact Flow PASS
- Formularsendung technisch erfolgreich
- reale Zustellung manuell bestätigt
- Danke-Seite erreichbar
- Chat-zu-Form/Redirect-Flow funktioniert nachvollziehbar

### Proof PASS
- Proof-Seite unterstützt Vertrauen
- CTAs führen sauber weiter
- keine widersprüchlichen oder unklaren Aussagen

### Reminder/Reporting PASS
- Log wird geführt
- Erinnerungslücken sind nicht nur bekannt, sondern als Arbeitspunkte verfolgt
- idealerweise Scheduler/Trigger technisch nachgezogen

---

## 5. Aktuelle QA-Fokusfragen

1. Ist der Formspree-Leadflow real bestätigt oder nur im Frontend plausibel?
2. Ist die Unterseiten-Chatlogik für Nutzer klar genug, wenn sie auf die Startseiten-Kontaktsektion zurückgeführt werden?
3. Ist die `SearchAction` auf der Startseite realitätskonform oder irreführend?
4. Sind Proof-Seite und Proof-System stark genug, um als Vertrauensbeleg zu funktionieren?
5. Ist das Reminder-/Reporting-System zuverlässig oder nur dokumentiert?

---

## 6. Empfohlener nächster QA-Block

### Block 1 — High-risk retest pack
- Form submit + delivery confirmation
- 2 mobile service-page sweeps
- 2 chat-to-contact redirects von Unterseiten
- Proof page CTA audit
- Reminder/reporting gap review

### Block 2 — Confidence pack
- kompletter Footer-/Legal-Link-Sweep
- WhatsApp/mailto/tel Audit
- Schema/canonical/meta Spot-Check
- danke.html trust review

---

## 7. Artefakte, die zu diesem Plan gehören

- `bertlclaw-qa-active-bugs.csv`
- `BERTLCLAW-REPEATABLE-QA-CHECKS.md`
- `bertlclaw-qa-bug-template.csv`
- `logs/bertlclaw-operations.log`
