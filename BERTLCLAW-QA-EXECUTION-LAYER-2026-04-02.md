# BertlClaw QA Execution Layer — Proof-of-Run + Stream Status

Stand: 2026-04-02

Ziel dieses Blocks: nicht nur testen, sondern den QA-Stream so sichtbar machen, dass man verpasste Läufe, vergessene Retests und unklare Prioritäten schneller erkennt.

---

## 1. Was neu ergänzt wurde

### A. Proof-of-run Visibility
Neues Artefakt:
- `bertlclaw-tools/qa-proof-of-run.js`
- Ausgabe: `qa-artifacts/proof-of-run/latest.json`
- Historie: `qa-artifacts/proof-of-run/history.json`

Zweck:
- zeigt den letzten Reminder-/Heartbeat-Lauf
- zeigt den letzten Hourly-Slot
- zeigt den letzten Daily-Ticket-Reminder
- zieht den Reminder-Audit-Status mit rein
- zeigt fehlende Stundenfenster direkt im gleichen Artefakt
- zeigt gleichzeitig die QA-Aktionsqueues (`ready_for_retest`, `blocked_manual_access`, offene `P0/P1`)

Damit gibt es einen zentralen Nachweis: **Was lief zuletzt, was fehlt, und worauf muss QA jetzt reagieren?**

### B. Stream Status Visibility
Neues Artefakt:
- `bertlclaw-tools/qa-stream-status.js`
- Ausgabe:
  - `qa-artifacts/stream-status/latest.json`
  - `qa-artifacts/stream-status/latest.md`

Zweck:
- erzeugt eine schnelle „Control Tower“-Sicht für den QA-Stream
- setzt eine Headline (`needs-human-on-p0`, `reminder-audit-failing`, `retest-queue-active`, `stable-no-urgent-retest-queue`)
- verdichtet Zähler, Proof-of-run-Signale und Top-Actions in ein leicht lesbares Statusblatt

---

## 2. Empfohlene lokale Ausführung

```bash
node bertlclaw-tools/reminder-heartbeat.js
node bertlclaw-tools/reminder-audit.js --hours=6
node bertlclaw-tools/qa-proof-of-run.js
node bertlclaw-tools/qa-stream-status.js
```

Empfohlene Reihenfolge:
1. Heartbeat laufen lassen
2. Audit berechnen
3. Proof-of-run schreiben
4. Stream-Status für schnellen Überblick erzeugen

---

## 3. Warum das konkret hilft

### Verhindert „lief vielleicht / lief vielleicht nicht“
Bisher gab es State + Audit getrennt. Jetzt gibt es ein gebündeltes Proof-Artefakt, das Laufnachweis und offene QA-Queues zusammenzieht.

### Verhindert vergessene Retests
`ready_for_retest` wird jetzt im Stream-Status prominent sichtbar.
Wenn dort Einträge stehen, ist klar: **nicht neues Testing erfinden, sondern zuerst Retest-Queue abbauen.**

### Trennt sauber zwischen technischen und menschlichen Blockern
`blocked_manual_access` ist im Status separat sichtbar. Dadurch wird klar, wo QA lokal weitermachen kann und wo gezielt menschliche Hilfe nötig ist.

### Macht Reporting-Lücken sichtbar
Wenn der Reminder-Audit fehlende Stundenfenster meldet, kippt der Headline-Status sofort auf `reminder-audit-failing`.

---

## 4. High-signal Workflow-Regeln

### Regel 1: Retest-Queue vor Exploratory QA
Wenn `ready_for_retest_count > 0`, dann zuerst diese Queue abarbeiten.

### Regel 2: P0 mit Human-Blockade sofort sichtbar halten
Wenn ein `P0` in `blocked_manual_access` steht, bleibt das oben im Stream-Status und darf nicht in normalen QA-Listen untergehen.

### Regel 3: Proof-of-run vor „alles okay“-Aussagen
Keine Aussage über Reporting-/Reminder-Reliability ohne:
- frisches `state/bertlclaw-reminders.json`
- frisches `qa-artifacts/reminder-audit/latest.json`
- frisches `qa-artifacts/proof-of-run/latest.json`

### Regel 4: Ein Statusblatt statt Dateijagd
Für schnelle Orientierung zuerst lesen:
- `qa-artifacts/stream-status/latest.md`

Nur wenn Details gebraucht werden:
- `qa-artifacts/proof-of-run/latest.json`
- `qa-artifacts/reminder-audit/latest.json`
- `bertlclaw-qa-active-bugs.csv`

---

## 5. Nächste sinnvolle QA-Schritte

1. `BCQA-001` manuell live schließen oder als echten Delivery-Fail bestätigen
2. `BCQA-004` mit dem vorhandenen Mobile-Retest-Pack live fahren
3. Proof-/CTA-Trust-Sweep für `BCQA-005` ergänzen
4. Falls Reminder extern verdrahtet werden: danach Audit erneut laufen lassen und prüfen, ob fehlende Stundenfenster verschwinden

---

## 6. Minimaler Control-Tower-Loop

Für jeden QA-Block:

```bash
node bertlclaw-tools/qa-proof-of-run.js
node bertlclaw-tools/qa-stream-status.js
```

Für Reminder-/Reporting-Blöcke zusätzlich davor:

```bash
node bertlclaw-tools/reminder-heartbeat.js
node bertlclaw-tools/reminder-audit.js --hours=6
```

So bleibt sichtbar:
- ob etwas wirklich lief
- ob Retests warten
- ob Reporting-Lücken offen sind
- ob ein Human-Blocker die höchste Priorität hat
