# BertlClaw QA Top-5 Fix Verification Worksheet

Stand: 2026-04-02

Zweck: kompaktes Operator-Blatt für den **nächsten QA-/Retest-Block**. Dieses Sheet ist absichtlich kleiner als Retest-Pack und Tester-Worksheet. Es soll die aktuellen Top-5 aus dem Priority Board in **eine ausführbare Reihenfolge mit klaren Pass-/Fail-Entscheidungen** übersetzen.

Dieses Blatt ergänzt:
- `qa-artifacts/priority-board/latest.md`
- `BERTLCLAW-QA-RETEST-TO-FIX-HANDOFF-2026-04-02.md`
- `BERTLCLAW-QA-MANUAL-RETEST-PACK-2026-04-02.md`
- `bertlclaw-qa-active-bugs.csv`

---

## 0. Fast Use Rule

Arbeite die Tickets **in dieser Reihenfolge**:
1. `BCQA-001` — echter Lead-Blocker
2. `BCQA-003` — schnellster sauberer Abschluss
3. `BCQA-004` — Mobile-Conversion-Risiko
4. `BCQA-002` — Reminder-Trigger lokal verifizieren
5. `BCQA-006` — Reliability-Audit lokal verifizieren

Wenn ein Punkt **FAIL** ist:
- sofort Evidence sichern
- Status setzen
- direkt Handoff formulieren
- **nicht** erst am Ende alles rekonstruieren

---

## 1. Operator Run Header

- Operator:
- Datum:
- Startzeit:
- Umgebung: Live / Preview / Local
- Basis-URL oder Repo-Stand:
- Gerät/Browser:
- Lauf-Typ: retest / verification / blocker-clearance

### Ergebnis-Codes
- **PASS** = nachweislich okay
- **PARTIAL** = technisch okay, aber mit UX-/Reliability-Reibung
- **FAIL** = Problem besteht oder neuer Defekt sichtbar
- **BLOCKED** = ohne externen Zugriff nicht abschließbar

---

## 2. Top-5 Operator Board

| Bug | Pri / Status | Operator-Ziel | 1. Check | 2. Check | Pass wenn | Sonst Status |
|---|---|---|---|---|---|---|
| BCQA-001 | P0 / blocked_manual_access | echte Lead-Zustellung bestätigen | Submit + Redirect | reale Receipt in Formspree/Mailbox | Redirect + Receipt bestätigt | `blocked_manual_access` / `retested_fail` |
| BCQA-003 | P1 / ready_for_retest | Schema-Hygiene sauber schließen | kein `SearchAction` | JSON-LD Syntax intakt | beides sauber | `retested_fail` |
| BCQA-004 | P1 / blocked_manual_access | Real-Device-Kollisionen im Chat/CTA→Kontakt-Flow bestätigen | Handoff auf echtem Gerät | kein Overlap bei Formular/Consent/CTA | Screenshot-/Videobeweis + Flow nutzbar | `blocked_manual_access` / `partial` / `retested_fail` |
| BCQA-002 | P1 / ready_for_retest | Reminder-Heartbeat lokal beweisen | State-Datei aktualisiert | Log/Output konsistent | Lauf reproduzierbar sichtbar | `retested_fail` / `partial` |
| BCQA-006 | P1 / ready_for_retest | Hourly-Audit lokal beweisen | Audit-JSON geschrieben | fehlende Stunden sichtbar | Audit auswertbar/reproduzierbar | `retested_fail` / `partial` |

---

## 3. Ticket-by-Ticket Verification Cards

## BCQA-001 — Form submit delivery not yet manually confirmed

- Owner lane: Human operator / QA
- Warum jetzt: größtes echtes Business-Risiko
- Flow: `index.html -> Formspree -> danke.html`

### Do now
- [ ] `index.html#kontakt` öffnen
- [ ] Testdaten eintragen
- [ ] Submit auslösen
- [ ] Redirect auf `danke.html` bestätigen
- [ ] Formspree/Mailbox öffnen
- [ ] reale Zustellung bestätigen
- [ ] Inhalt gegen Testdaten prüfen

### Capture
- Vor Submit URL:
- Nach Submit URL:
- Redirect okay: yes / no
- Receipt bestätigt: yes / no / blocked
- Evidence:
- Ergebnis: PASS / FAIL / BLOCKED

### Decide
- **PASS** → `retested_pass`
- **FAIL** bei Frontend/Redirect/Receipt-Fehler → `retested_fail`
- **keine Mailbox/Formspree-Sicht** → `blocked_manual_access`

### Copy-ready status line
`BCQA-001: [PASS/FAIL/BLOCKED] — submit path [ok/not ok], danke redirect [ok/not ok], real receipt [confirmed/not confirmed/blocked]. Next: [action].`

---

## BCQA-003 — Startpage JSON-LD SearchAction likely does not match a real site search

- Owner lane: Builder / SEO
- Warum jetzt: schnellster P1-Abschluss
- Flow: `index.html` schema

### Do now
- [ ] `index.html` JSON-LD öffnen
- [ ] `WebSite`-Objekt prüfen
- [ ] bestätigen, dass kein `SearchAction` mehr vorhanden ist
- [ ] auf Syntax-/Kommafehler prüfen

### Capture
- `SearchAction` vorhanden: yes / no
- JSON-LD plausibel/intakt: yes / no
- Evidence:
- Ergebnis: PASS / FAIL

### Decide
- **PASS** → `retested_pass`
- **FAIL** → `retested_fail`

### Copy-ready status line
`BCQA-003: [PASS/FAIL] — SearchAction [absent/present], JSON-LD syntax [clean/broken]. Next: [action].`

---

## BCQA-004 — Real-Device-Kollisionen im Chat/CTA→Kontakt-Flow

- Owner lane: QA
- Warum jetzt: Conversion-Risiko trotz vorbereitetem Codepfad
- Pflichtseiten: `services.html`, `landingpage-sprint.html`, `digital-clarity-setup.html`
- Pflicht-Größen: `390x844`, `360x800`
- Abschlussbeweis: mindestens ein echtes Gerät + Screenshot/kurzes Recording des kritischen Handoff-Zustands

### Do now
- [ ] Seite 1 mobil testen
- [ ] Seite 2 mobil testen
- [ ] Seite 3 mobil testen
- [ ] Chat öffnen + Testnachricht eingeben
- [ ] `Projekt anfragen` klicken
- [ ] Redirect auf `index.html?chat=...#kontakt` prüfen
- [ ] Prefill im Nachrichtenfeld prüfen
- [ ] Sichtbarkeit/Nutzbarkeit des Kontaktbereichs prüfen
- [ ] Sticky/Floating Overlap prüfen
- [ ] Consent / Nachrichtenfeld / Haupt-CTA auf Sichtbarkeit prüfen
- [ ] Screenshot oder kurzes Recording sichern
- [ ] subjektive Klarheit bewerten

### Capture per failing or weak run
- Seite:
- Viewport:
- Redirect: pass / fail
- Prefill: pass / fail
- Kontakt sofort sichtbar: yes / no
- UI-Overlap: none / minor / major
- Flow-Eindruck: clear / partial / fail
- Evidence:

### Decide
- **PASS** → alle Kernläufe klar und ohne relevanten Overlap → `retested_pass`
- **PARTIAL** → technisch okay, aber irritierend / leicht conversion-risky → `partial`
- **FAIL** → Redirect, Prefill oder mobile Nutzbarkeit bricht → `retested_fail`

### Copy-ready status line
`BCQA-004: [PASS/PARTIAL/FAIL] — mobile chat→contact tested on [pages/viewports]; redirect [ok/not ok], prefill [ok/not ok], UX [clear/partial/fail]. Next: [action].`

---

## BCQA-002 — Reminder system is policy-defined but not technically scheduled

- Owner lane: Builder / Ops
- Warum jetzt: lokaler Trigger-Baustein ist da, muss aber verifiziert werden
- Flow: `BERTLCLAW-REMINDER-SYSTEM.md / operations reporting`

### Local commands
```bash
node bertlclaw-tools/reminder-heartbeat.js
```

### Do now
- [ ] Command ausführen
- [ ] State-Datei prüfen
- [ ] Log-/Output-Spur prüfen
- [ ] Zeitstempel plausibel prüfen
- [ ] notieren, was lokal bewiesen ist und was extern weiter offen bleibt

### Capture
- Command lief: yes / no
- State aktualisiert: yes / no
- Log/Output konsistent: yes / no
- Externer Scheduler noch offen: yes / no
- Evidence:
- Ergebnis: PASS / PARTIAL / FAIL

### Decide
- **PASS** = lokaler Heartbeat reproduzierbar sichtbar, externer Gap sauber benannt
- **PARTIAL** = Heartbeat läuft, aber Output/State unklar oder unvollständig
- **FAIL** = kein belastbarer lokaler Nachweis

### Status-Hinweis
Dieses Ticket ist nur dann wirklich fertig, wenn später auch die **externe Scheduling-Schicht** verdrahtet ist. Für den aktuellen Retest zählt zuerst der lokale Nachweis.

### Copy-ready status line
`BCQA-002: [PASS/PARTIAL/FAIL] — reminder heartbeat [ran/did not run], state [updated/not updated], output [clear/unclear]. Remaining gap: [scheduler/no scheduler].`

---

## BCQA-006 — Hourly reporting reliability not yet proven by repeatable check routine

- Owner lane: Builder / Ops
- Warum jetzt: Audit-Fähigkeit existiert, muss aber als Operator-Beweis funktionieren
- Flow: `logs/bertlclaw-operations.log + reporting process`

### Local commands
```bash
node bertlclaw-tools/reminder-audit.js --hours=6
```

### Do now
- [ ] Audit ausführen
- [ ] `qa-artifacts/reminder-audit/latest.json` prüfen
- [ ] fehlende Stundenfenster identifizieren
- [ ] bestätigen, ob Report operator-lesbar ist
- [ ] notieren, ob nächstes erwartetes Fenster klar erkennbar ist

### Capture
- Audit lief: yes / no
- JSON geschrieben: yes / no
- fehlende Stunden sichtbar: yes / no
- nächste volle Stunde ableitbar: yes / no
- Evidence:
- Ergebnis: PASS / PARTIAL / FAIL

### Decide
- **PASS** = Audit schreibt verwertbaren Report und zeigt Lücken reproduzierbar
- **PARTIAL** = Report existiert, ist aber operatorisch noch zu weich/unklar
- **FAIL** = kein verwertbarer Audit-Nachweis

### Copy-ready status line
`BCQA-006: [PASS/PARTIAL/FAIL] — audit [ran/did not run], report [written/not written], missing hour visibility [clear/unclear]. Next: [action].`

---

## 4. End-of-Block Summary

### Status updates to apply
- `BCQA-001`:
- `BCQA-003`:
- `BCQA-004`:
- `BCQA-002`:
- `BCQA-006`:

### Top findings
1.
2.
3.

### Immediate fix handoffs needed
1.
2.
3.

### Safe closes from this block
- 

### Still blocked after this block
- 

---

## 5. Operator Shortcut

Wenn nur 10 Minuten da sind:
1. `BCQA-003` schließen
2. `BCQA-002` lokal prüfen
3. `BCQA-006` lokal prüfen
4. `BCQA-004` nur starten, wenn echter Mobile-Test möglich ist
5. `BCQA-001` sofort eskalieren, sobald Mailbox/Formspree-Zugriff vorhanden ist

Kurz gesagt:
- `BCQA-001` = größtes Risiko
- `BCQA-003` = schnellster Abschluss
- `BCQA-004` = größtes UX-/Conversion-Risiko
- `BCQA-002 + BCQA-006` = Betriebsbeweis statt Bauchgefühl
