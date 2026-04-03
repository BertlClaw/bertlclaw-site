# BertlClaw QA Ops Control Checklist — 2026-04-02

Ziel: aus dem vorhandenen `operator-summary.md` eine noch schneller operationalisierbare Kontrollsicht machen, damit verpasste Full-Hour-Updates und Stale-Stream-Risiko nicht nur sichtbar, sondern mit einem Mini-Runbook behandelbar werden.

---

## 1. Neuer Helper

Neues Tool:
- `bertlclaw-tools/qa-ops-control.js`

Neue Artefakte:
- `qa-artifacts/ops-control/latest.json`
- `qa-artifacts/ops-control/latest.md`

Das Tool sitzt **eine Ebene über** dem bestehenden Stream-Status:
1. Reminder-Audit zeigt fehlende Stundenfenster
2. Proof-of-run bündelt Reminder- und QA-Queues
3. Stream-Status verdichtet das in eine Operator-Sicht
4. **Ops-Control-Checklist** macht daraus ein kompaktes PASS/WATCH/FAIL-Kontrollblatt

---

## 2. Was der Operator jetzt schnell prüfen kann

Die Checklist beantwortet in einem Blick:

- Wurden die QA-Control-Artefakte frisch erzeugt?
- Ist das letzte Hourly-Update noch innerhalb der Guardrail?
- Gibt es fehlende Full-Hour-Slots?
- Ist der Stream als stale markiert?
- Liegt ein P0 mit Human-Blockade oben im System?
- Ist die Retest-Queue sichtbar und damit operativ abarbeitbar?

Wichtig: Das ist **kein Ersatz** für den detaillierten Stream-Status, sondern der schnellste Einstiegspunkt für Betriebsdisziplin.

---

## 3. Empfohlene Nutzung

### A. Nur Kontrollblatt aktualisieren
```bash
node bertlclaw-tools/qa-ops-control.js
```

Voraussetzung:
- `qa-artifacts/proof-of-run/latest.json` ist vorhanden
- `qa-artifacts/stream-status/latest.json` ist vorhanden

### B. Kontrollblatt inklusive Refresh der zugrunde liegenden QA-Artefakte
```bash
node bertlclaw-tools/qa-ops-control.js --refresh --hours=6
```

Das führt intern aus:
1. `reminder-audit.js --hours=6`
2. `qa-proof-of-run.js`
3. `qa-stream-status.js`
4. schreibt danach das neue Ops-Control-Checklist-Artefakt

---

## 4. Praktische Guardrails

Aktuell sind die Kontrollsignale bewusst einfach gehalten:

- **run_freshness** → FAIL wenn letzter Control-Refresh älter als 65 Minuten ist
- **hourly_update_freshness** → FAIL wenn letztes Hourly-Update älter als 65 Minuten ist
- **missing_hour_slots** → FAIL sobald im Auditfenster mindestens ein voller Slot fehlt
- **stale_stream** → FAIL sobald Stream-Status `stale_stream_detected = true` meldet
- **p0_human_blocker** → FAIL wenn ein geblockter P0 oben liegt
- **retest_queue_visibility** → reine Sichtbarkeitskontrolle, damit Retests nicht unsichtbar werden

Diese Schwellen sind absichtlich streng, weil Dominic explizit Full-Hour-Disziplin will.

---

## 5. Recovery-Muster

Wenn das Kontrollblatt auf FAIL kippt, ist die Reihenfolge:

1. Control-Artefakte refreshen
2. Fehlende Full-Hour-Slots konkret benennen
3. P0-Human-Blocker separat nach oben ziehen
4. Ready-for-retest vor neuer Exploratory-QA abarbeiten

Damit wird aus „der Stream wirkt stale“ eine konkrete Operator-Reihenfolge statt eines diffusen Bauchgefühls.

---

## 6. Empfohlener Quick-Loop

Für einen sehr kurzen QA/Ops-Check reicht künftig:

```bash
node bertlclaw-tools/qa-ops-control.js --refresh --hours=6
cat qa-artifacts/ops-control/latest.md
```

Wenn FAIL:
- Recovery-Moves im gleichen Artefakt abarbeiten
- danach bei Bedarf Detailtiefe aus `qa-artifacts/stream-status/latest.md` öffnen

---

## 7. Warum das konkret ein Fortschritt ist

Das bestehende `operator-summary.md` sagt bereits gut, **dass** etwas stale ist.
Die neue Ops-Control-Checklist sagt schneller,

- **ob** die Kontrolllage operativ sauber ist,
- **welcher** Risk-Typ vorliegt (freshness / full-hour / stale / P0 blocker),
- und **welcher nächste Zug** sofort auszuführen ist.

Damit wird das Risiko „missed full-hour updates + stale stream“ nicht nur beschrieben, sondern als kleiner Betriebs-Check operationalisiert.
