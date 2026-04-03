# BertlClaw QA Hour-Slot Bridge

Stand: 2026-04-02

Zweck: eine **kleine Evidenz-Brücke zwischen Operations-Log und Vollstunden-Update**. Das Tool sammelt sichtbare Ereignisse pro Stundenslot und macht daraus eine belastbare Grundlage für den Abschnitt **"This hour done"**.

Dateien:
- `bertlclaw-tools/qa-hour-slot-bridge.js`
- `qa-artifacts/hour-slot-bridge/latest.json`
- `qa-artifacts/hour-slot-bridge/latest.md`
- `qa-artifacts/hour-slot-bridge/history.json`

---

## Was das Tool liefert

Für den **aktuellen Stundenslot** und den **vorherigen abgeschlossenen Slot** zeigt es:
- echte Log-Einträge aus `logs/bertlclaw-operations.log`
- aktuellen Queue-/Blocker-Stand aus QA-Artefakten + CSV
- Narration-Anker für das nächste Hourly Update
- Drift-Signale, wenn Reporting/Freshness auseinanderläuft
- Snapshot-Historie pro Slot für spätere Vergleiche

Das Ziel ist simpel:
- **weniger generische Hourly-Texte**
- **mehr echte Slot-Evidenz**
- **weniger Drift zwischen tatsächlicher Arbeit und Reporting**

---

## Schnellstart

```bash
node bertlclaw-tools/qa-hour-slot-bridge.js
cat qa-artifacts/hour-slot-bridge/latest.md
```

---

## Empfohlene Nutzung vor einem Vollstunden-Update

Reihenfolge:
1. `node bertlclaw-tools/qa-hour-slot-bridge.js`
2. `cat qa-artifacts/hour-slot-bridge/latest.md`
3. `node bertlclaw-tools/qa-hourly-draft.js --refresh --hours=6`
4. Draft nur dort übernehmen, wo er mit dem Slot-Bridge-Output zusammenpasst

Kurzregel:
- **`This hour done` zuerst aus `Narration anchors for this hour` bauen**
- **danach** Stream-/Queue-Zahlen aus dem normalen Hourly-Draft ergänzen
- wenn im aktuellen Slot **keine Evidenz** sichtbar ist, nicht so tun, als wäre in dieser Stunde schon etwas Konkretes abgeschlossen worden

---

## Was im Output besonders wichtig ist

### 1. `Narration anchors for this hour`
Das sind die stärksten Kurzanker für den aktuellen Slot.
Sie eignen sich direkt für:
- `This hour done`
- Kurzstatus im Chat
- Handoff-Snippets

### 2. `Current slot evidence`
Das ist die **vollere Faktenspur**.
Wenn jemand später fragt "was genau ist in dieser Stunde passiert?", kommt die Antwort von hier.

### 3. `Drift signals`
Zeigt, ob das Reporting vom realen Ablauf abweicht, z. B.:
- keine aktuelle Slot-Evidenz
- fehlende Hour-Slots
- Hourly-Update zu alt

### 4. `Queue delta vs previous snapshot`
Praktisch, wenn der Stundentext nicht nur Aktivitäten, sondern auch **sichtbare Queue-Bewegung** nennen soll.

---

## Gute Verwendung im Hourly Update

Statt weich:
- "QA läuft weiter"
- "weitere Verbesserungen umgesetzt"

Besser mit Bridge:
- "QA ops control improvement added -> PASS — PASS/WATCH/FAIL checklist for stale-stream/full-hour risk is now in place"
- "QA tester worksheet added -> PASS — manual contact/mobile/proof evidence capture now has a compact operator sheet"
- "QA handoff acceleration layer added -> PASS — Top-5 priority board + retest→fix handoff format are now available"

---

## Grenzen

Das Tool erfindet keine Historie.
Es kann nur das verbinden, was wirklich sichtbar ist in:
- `logs/bertlclaw-operations.log`
- aktuellen QA-Artefakten
- aktuellem CSV-Zustand

Heißt konkret:
- **wenn etwas nicht geloggt wurde, taucht es nicht sauber im Slot auf**
- darum ist die Bridge kein Ersatz für Logging, sondern ein Verstärker für gutes Logging

---

## Empfehlung

Für jede kommende Vollstunde:
- erst `qa-hour-slot-bridge.js`
- dann `qa-hourly-draft.js`
- Hourly-Text gegen die Slot-Evidenz härten

Das ist klein genug für den Alltag und verbessert sofort die Wahrhaftigkeit der Stundenberichte.
