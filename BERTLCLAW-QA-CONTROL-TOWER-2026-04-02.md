# BertlClaw QA Control Tower — 2026-04-02

Ziel: die Reihenfolge `reminder -> audit -> proof -> stream -> ops` in **einen** lokal nutzbaren Operator-Run zusammenziehen, damit keine Hourly-Checks vergessen werden und der QA-Stream nicht zwischen mehreren Einzelbefehlen blind wird.

## Neu

### Tool
- `bertlclaw-tools/qa-control-tower.js`

### Artefakte
- `qa-artifacts/control-tower/latest.json`
- `qa-artifacts/control-tower/latest.md`

---

## Was das Tool konkret macht

Standardlauf:
1. `reminder-heartbeat.js`
2. `reminder-audit.js --hours=<n>`
3. `qa-proof-of-run.js`
4. `qa-stream-status.js`
5. `qa-ops-control.js`
6. schreibt danach eine verdichtete Control-Tower-Sicht

Damit entfällt das manuelle Zusammenstöpseln der Reihenfolge.

---

## Standardnutzung

### Voller Lauf mit Heartbeat + allen QA/Ops-Artefakten
```bash
node bertlclaw-tools/qa-control-tower.js --hours=6
```

### Nur Audit/Proof/Stream/Ops neu rendern, ohne Heartbeat zu emittieren
```bash
node bertlclaw-tools/qa-control-tower.js --hours=6 --skip-heartbeat
```

---

## Warum das praktischer ist als die Einzelbefehle

Der neue Helper beantwortet in einem Run:
- wurde der Reminder-Schritt wirklich mit ausgeführt?
- ist irgendwo in der Sequenz ein Schritt kaputtgegangen?
- ist der Stream stale?
- fehlen Hourly-Slots?
- liegt ein P0-Human-Blocker oben?
- ist die Retest-Queue noch offen?

Statt nur einzelne Dateien zu erzeugen, gibt es jetzt eine **Run-Order-Kontrolle** mit:
- `PASS / QUEUE / ATTENTION / FAIL`
- Schritt-für-Schritt-Häkchenliste
- direkten Next Moves für den Operator
- klaren Artefakt-Pfaden zum Drilldown

---

## Empfohlene Operator-Regel

Für jeden QA-/Reminder-Block zuerst:
```bash
node bertlclaw-tools/qa-control-tower.js --hours=6
cat qa-artifacts/control-tower/latest.md
```

Interpretation:
- **FAIL** = Sequenz selbst kaputt, zuerst Tool-/Script-Fehler beheben
- **ATTENTION** = Sequenz lief, aber Stream ist stale / Hours fehlen / P0-Human-Blocker aktiv
- **QUEUE** = System ist grundsätzlich okay, aber Retest-Queue muss vor Exploratory-QA weg
- **PASS** = Kontrolllage sauber, nächster Full-Hour-Slot nur weiter pünktlich halten

---

## Konkreter Nutzen gegen Blind Spots

Die bisherige Kette war schon vorhanden, aber operativ leicht zu vergessen:
- Heartbeat wird nicht mitgezogen
- Audit läuft separat
- Stream-Status wird vielleicht gelesen, vielleicht nicht
- Ops-Control ist da, aber nicht zwingend Teil des Laufs

Der Control Tower macht daraus einen **verbindlichen Laufpfad**. Genau das reduziert:
- verpasste Hourly-Updates
- stale QA-Streams
- unsichtbare Script-Fehler in der Kontrollkette
- manuelle Reihenfolgefehler bei Reminder-/QA-/Ops-Checks

---

## Praktische Abgrenzung

- `reminder-heartbeat.js` = emittiert Reminder-/Log-State
- `reminder-audit.js` = prüft Hourly-Lücken
- `qa-proof-of-run.js` = bündelt Laufnachweis + QA-Queues
- `qa-stream-status.js` = Operator-Statusblatt
- `qa-ops-control.js` = PASS/WATCH/FAIL-Kontrollblatt
- `qa-control-tower.js` = **führt alles in der richtigen Reihenfolge aus und bewertet die gesamte Sequenz**

Das ist die nächste sinnvolle Schicht nach dem Ops-Control-Layer.
