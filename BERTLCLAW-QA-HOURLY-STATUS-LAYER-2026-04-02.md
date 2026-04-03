# BertlClaw QA Hourly Status Layer

Stand: 2026-04-02

Zweck: die Hour-Slot-Bridge nicht nur neben dem Draft liegen lassen, sondern sie **direkt in den Hourly-Draft einspeisen** und zusätzlich einen **Mini-Ein-Befehl-Statuslauf** anbieten.

Dateien:
- `bertlclaw-tools/qa-hourly-draft.js` (erweitert)
- `bertlclaw-tools/qa-hourly-status.js` (neu)
- `qa-artifacts/hourly-status/latest.json`
- `qa-artifacts/hourly-status/latest.md`
- `qa-artifacts/hourly-status/latest.txt`

---

## Was jetzt besser ist

### 1. Hourly draft nutzt jetzt Slot-Evidenz zuerst
`qa-hourly-draft.js` zieht für **"This hour done"** jetzt in dieser Reihenfolge:
1. `hour-slot-bridge` Narration Anchors
2. sinnvolle `current_slot_evidence`
3. erst danach Queue-/Bug-Heuristiken

Damit basiert der wichtigste Textblock des Stundenupdates nicht mehr primär auf Statusfeldern, sondern zuerst auf sichtbarer Slot-Arbeit.

### 2. `--refresh` regeneriert die Bridge mit
Vorher musste man Bridge und Draft getrennt im Kopf kombinieren.
Jetzt sorgt `qa-hourly-draft.js --refresh --hours=6` dafür, dass auch `qa-hour-slot-bridge.js` im Refresh-Lauf mitgezogen wird.

### 3. Ein Mini-Wrapper für den Operator
`qa-hourly-status.js` ist der kleine Ein-Befehl-Lauf:

```bash
node bertlclaw-tools/qa-hourly-status.js --hours=6
```

Er macht:
- Refresh des Hourly-Drafts inklusive Control/Priority/Bridge-Kette
- schreibt eine kompakte One-Line-Statusdatei
- legt direkt Copy-ready + Compact-Version in `qa-artifacts/hourly-status/` ab

---

## Empfohlene Nutzung

Für die nächste Vollstunde reicht jetzt normalerweise:

```bash
node bertlclaw-tools/qa-hourly-status.js --hours=6
cat qa-artifacts/hourly-status/latest.md
```

Wenn nur der Draft gebraucht wird:

```bash
node bertlclaw-tools/qa-hourly-draft.js --refresh --hours=6
```

---

## Praktischer Effekt

Vorher:
- Bridge existierte
- Draft existierte
- Operator musste beides manuell zusammendenken

Jetzt:
- Draft ist bridge-aware
- Refresh regeneriert die Brücke automatisch mit
- Ein kleiner Wrapper liefert einen sofort verwendbaren Hourly-Status

Das ist bewusst klein gehalten, verbessert aber die Zuverlässigkeit von Vollstunden-Updates spürbar.
