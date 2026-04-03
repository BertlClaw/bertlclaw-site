# BertlClaw QA Daily Rhythm — Fast Operator Loop

Stand: 2026-04-02

Zweck: ein **kompaktes Tages-/Loop-Dokument**, das den QA-Operator ohne Sucharbeit durch den richtigen Ablauf führt.

Dieses Blatt verbindet direkt:
- `BERTLCLAW-QA-CONTROL-TOWER-2026-04-02.md`
- `BERTLCLAW-QA-MISSED-SLOT-BOARD-2026-04-02.md`
- `BERTLCLAW-QA-TESTER-WORKSHEET-2026-04-02.md`
- `BERTLCLAW-QA-MANUAL-RETEST-PACK-2026-04-02.md`
- `BERTLCLAW-QA-RETEST-TO-FIX-HANDOFF-2026-04-02.md`
- `BERTLCLAW-QA-TICKET-CLOSE-HELPER-2026-04-02.md`
- `bertlclaw-qa-active-bugs.csv`

Ziel:
- schneller starten
- erst Kontrolle, dann Retest, dann neue Checks
- keine offenen Findings ohne Status/Nächsten Schritt
- Mobile immer mitführen

---

## 1. One-Page Rule Set

### Immer in dieser Reihenfolge arbeiten
1. **Control Tower prüfen**
2. **offene Retests abarbeiten**
3. **kritischen Smoke-/Worksheet-Block fahren**
4. **Funde sofort ins Bug-Register überführen**
5. **nur dann Exploratory-QA, wenn Retest-Queue leer ist**

### Harte Regeln
- **Retest vor neuem Testen**
- **P0/P1 vor P2/P3**
- **Mobile nicht auslassen**
- **Kein FAIL ohne Evidence**
- **Kein Ticket ohne nächsten Schritt**
- **Kein “sieht gut aus” ohne Status-Update im CSV / Log**

---

## 2. Fast Start — 3-Minuten Operator Boot

## A. Kontrolllage öffnen
Zuerst:
```bash
node bertlclaw-tools/qa-control-tower.js --hours=6
cat qa-artifacts/control-tower/latest.md
```

Wenn fehlende Vollstunden oder Hourly-Druck sichtbar sind, direkt danach:
```bash
node bertlclaw-tools/qa-missed-slot-board.js --refresh --hours=8
cat qa-artifacts/missed-slot-board/latest.md
```

### Sofortentscheidung
- **FAIL** → erst Kontrollkette / Freshness / fehlende Slots / Human-Blocker behandeln; bei Hourly-Lücken Missed-Slot-Board als Recovery-Queue benutzen
- **ATTENTION** → stale / fehlende Stunden / P0-Blocker aktiv prüfen
- **QUEUE** → Retest-Queue jetzt abarbeiten
- **PASS** → direkt in Retest/Smoke gehen

## B. Bug-Register öffnen
Datei:
- `bertlclaw-qa-active-bugs.csv`
- `qa-artifacts/priority-board/latest.md`

Zuerst ansehen:
- alle `blocked_manual_access`
- alle `ready_for_retest`
- alle `new`
- speziell `P0` und `P1`
- Top-5 im Priority Board für die schnellste Reihenfolge

## C. Tagesfokus wählen
Standard-Priorität:
1. `BCQA-001` Formular-Zustellung / Lead-Risiko
2. `BCQA-004` Mobile Chat → Kontakt
3. `BCQA-003` Schema-Hygiene
4. `BCQA-006` Hourly Reporting Reliability
5. `BCQA-005` Proof/Trust-Wirkung
6. `BCQA-002` Reminder Trigger/Scheduling Reliability

---

## 3. Standard-Rhythmus pro QA-Loop

## Loop 1 — Control + Retest First
Verwenden wenn:
- der Tag startet
- neue Fixes gemeldet wurden
- der Stream stale war
- `ready_for_retest` im CSV steht

### Reihenfolge
1. Control Tower laufen lassen
2. `bertlclaw-qa-active-bugs.csv` prüfen
3. `BERTLCLAW-QA-MANUAL-RETEST-PACK-2026-04-02.md` öffnen
4. alle `ready_for_retest` in Prioritätsreihenfolge retesten
5. Ergebnis direkt im CSV/Log notieren
6. `node bertlclaw-tools/qa-ticket-close-helper.js --refresh --hours=6` laufen lassen, damit Scorecard -> Evidence -> CSV -> Hourly sauber geschlossen wird

### Exit
Loop 1 ist erst fertig, wenn jeder retest-reife Punkt eines dieser Ergebnisse hat:
- `retested_pass`
- `retested_fail`
- `partial`
- `blocked_manual_access`

---

## Loop 2 — Core Manual QA Sweep
Verwenden wenn:
- Retest-Queue leer ist oder abgearbeitet wurde
- neue Live-/UX-Sicherheit gebraucht wird

### Primäres Dokument
- `BERTLCLAW-QA-TESTER-WORKSHEET-2026-04-02.md`

### Empfohlene Reihenfolge
1. Homepage contact form end-to-end
2. Alternative contact paths
3. 3 mobile chat→contact runs
4. `proof.html` trust sweep
5. contact-area trust check

### Mindestumfang für einen kurzen Loop
Wenn wenig Zeit da ist, **mindestens**:
- 1 Contact Flow Run
- 1 Mobile Chat→Contact Run
- 1 Trust/Proof Check

---

## Loop 3 — System Reliability / Ops Check
Verwenden wenn:
- Reminder-/Reporting-Risiken offen sind
- Hourly-Disziplin geprüft werden soll
- QA/Ops-Kette abgesichert werden muss

### Reihenfolge
```bash
node bertlclaw-tools/qa-ops-control.js --refresh --hours=6
cat qa-artifacts/ops-control/latest.md
```

Danach bei Bedarf:
```bash
node bertlclaw-tools/reminder-heartbeat.js
node bertlclaw-tools/reminder-audit.js --hours=6
```

### Fokus
- fehlen volle Stunden?
- ist das letzte Update fresh genug?
- liegt ein P0-Human-Blocker oben?
- ist die Retest-Queue sichtbar?

---

## 4. Quick Rotation Matrix — Was wann getestet wird

## Bei jedem QA-Block
- Control Tower
- Bug-Register
- offene Retests

## Täglich mindestens einmal
- Homepage contact form path
- 1 Mobile Chat→Contact Flow
- Proof / Trust Sweep
- Hourly / Ops visibility check

## Bei Fix-Meldung sofort
- Original-Bugpfad
- 1 angrenzender Pfad
- Mobile oder Desktop-Gegenprobe

## Wenn nichts Dringendes offen ist
In dieser Reihenfolge rotieren:
1. Mobile Conversion Sweep
2. Desktop CTA / Layout Sweep
3. Contact alternatives (`mailto`, `tel`, WhatsApp)
4. Danke-Seite / Trust layer
5. Proof messaging / CTA clarity
6. Reminder / audit reliability

---

## 5. Ticket-to-Asset Map

## Wenn das Ticket `ready_for_retest` ist
Nutze:
- `BERTLCLAW-QA-MANUAL-RETEST-PACK-2026-04-02.md`

## Wenn du einen manuellen Testlauf dokumentieren willst
Nutze:
- `BERTLCLAW-QA-TESTER-WORKSHEET-2026-04-02.md`

## Wenn du zuerst wissen musst, ob der Stream operativ sauber läuft
Nutze:
- `BERTLCLAW-QA-CONTROL-TOWER-2026-04-02.md`
- `BERTLCLAW-QA-OPS-CONTROL-CHECKLIST-2026-04-02.md`

## Wenn du Status/Owner/Nächsten Schritt setzen musst
Nutze:
- `bertlclaw-qa-active-bugs.csv`
- `BERTLCLAW-QA-RETEST-TO-FIX-HANDOFF-2026-04-02.md`
- `qa-artifacts/priority-board/latest.md`

---

## 6. Current Recommended Daily Order from Today’s Backlog

### 1. P0 manual blocker first
**BCQA-001**
- echte Formular-Zustellung bestätigen
- falls nicht möglich: klar als `blocked_manual_access` oben halten

### 2. Highest-value mobile conversion retest
**BCQA-004**
- `services.html`
- `landingpage-sprint.html`
- `digital-clarity-setup.html`
- auf `390x844` und `360x800`

### 3. Fast technical hygiene win
**BCQA-003**
- SearchAction wirklich weg?
- JSON-LD sauber?

### 4. Reporting reliability confidence
**BCQA-006` + `BCQA-002`**
- Heartbeat/Audit lokal laufen lassen
- prüfen, ob State/Logs/Artefakte konsistent sind

### 5. Trust layer
**BCQA-005**
- `proof.html` Glaubwürdigkeit / CTA-Klarheit bewerten

---

## 7. 15-Minute Quick-Start Mode

Wenn der Operator nur einen sehr kurzen Slot hat:

### Minute 0–3
```bash
node bertlclaw-tools/qa-control-tower.js --hours=6
cat qa-artifacts/control-tower/latest.md
```

### Minute 3–6
- `bertlclaw-qa-active-bugs.csv` öffnen
- `P0`, `P1`, `ready_for_retest` sortieren

### Minute 6–11
- genau **1** höchstwertigen Test fahren:
  - zuerst `BCQA-001`, sonst
  - ein Mobile Chat→Contact Retest, sonst
  - Proof trust sweep

### Minute 11–15
- Ergebnis dokumentieren
- Status setzen
- nächsten Schritt formulieren

Auch ein kurzer Slot ist nur dann wertvoll, wenn danach **ein klarer Statuswechsel** sichtbar ist.

---

## 8. Copy-Ready End-of-Loop Output

## Für CSV-Notes
`QA daily rhythm loop completed on [date/time]. Control state: [PASS/QUEUE/ATTENTION/FAIL]. Tested: [flow/page]. Result: [PASS/PARTIAL/FAIL/BLOCKED]. Evidence: [ref]. Next action: [next move].`

## Für Operations Log
`[YYYY-MM-DD HH:MM CEST] QA daily rhythm loop completed: control=[status], retests=[done/open], smoke=[status], trust=[status], blockers=[short note], next=[next move].`

## Für knappe Operator-Zusammenfassung
- Control:
- Retests:
- New findings:
- Blockers:
- Next move:

---

## 9. Definition of a Good QA Block

Ein QA-Block war gut, wenn danach:
- die Kontrolllage klar ist
- die Retest-Queue kleiner oder sauberer ist
- mindestens ein echter Risikopfad geprüft wurde
- Evidence vorhanden ist
- das CSV aktualisiert wurde
- der nächste konkrete Zug feststeht

Wenn nur getestet wurde, aber nichts sauber dokumentiert wurde, war der Block operativ nicht fertig.

---

## 10. Recommended Companion Set

Für die schnellste Arbeit diese 4 Dateien nebeneinander offen halten:
1. `qa-artifacts/control-tower/latest.md`
2. `bertlclaw-qa-active-bugs.csv`
3. `BERTLCLAW-QA-MANUAL-RETEST-PACK-2026-04-02.md`
4. `BERTLCLAW-QA-TESTER-WORKSHEET-2026-04-02.md`

Das ist der aktuelle schnellste Stack für einen BertlClaw-QA-Operator ohne Leerlauf.
