# BertlClaw QA Catch-up Runner

Stand: 2026-04-02

Zweck: die Lücke **nach** dem Missed-Slot-Board schließen. Das Board zeigt zwar, **welche** Vollstunden fehlen, aber noch nicht sauber, **welchen Text** man pro Slot jetzt tatsächlich senden sollte und **wann ein Slot wirklich als geklärt gilt**.

Dateien:
- `bertlclaw-tools/qa-catchup-runner.js`
- `qa-artifacts/catchup-runner/latest.json`
- `qa-artifacts/catchup-runner/latest.md`
- `qa-artifacts/catchup-runner/latest.txt`

---

## Was dieses Asset löst

Es verbindet vier Ebenen in einem kleinen Operator-Flow:
1. **Missed-slot board** → welche Slots fehlen?
2. **Operations log** → gibt es pro fehlendem Slot echte Evidenz?
3. **Hourly draft / stream pressure** → was ist die aktuelle Lage + der heutige Live-Druck?
4. **Clearance workflow** → wann bleibt ein Slot offen, wann darf er als geklärt gelten?

Kurz:
- nicht nur Backlog sehen
- sondern **pro Slot einen copy-ready Catch-up-Text haben**
- plus einen **harten Recheck-Schritt**, damit nichts zu früh als erledigt markiert wird

---

## Nutzung

Standardlauf:

```bash
node bertlclaw-tools/qa-catchup-runner.js --refresh --hours=8 --limit=6
```

Das macht:
1. Hour-slot bridge refreshen
2. Hourly draft refreshen
3. Missed-slot board refreshen
4. für die neuesten fehlenden Slots konkrete Catch-up-Texte bauen
5. pro Slot einen Clearance-Check ausgeben

Danach typischer Operator-Flow:

```bash
cat qa-artifacts/catchup-runner/latest.md
```

Dann:
- **neueste fehlende Stunde zuerst** verwenden
- Catch-up-Text senden / übernehmen
- Missed-slot board erneut refreshen
- Slot nur dann als **geklärt** behandeln, wenn er aus dem Board verschwindet

---

## Kernlogik

### 1. Zwei Modi pro Slot
- `EVIDENCE_READY` = im Operations-Log gibt es slot-spezifische Zeilen; Catch-up kann belastbar formuliert werden
- `ACK_ONLY` = keine saubere Slot-Evidenz sichtbar; nur Ehrlichkeits-/Acknowledge-Text ausgeben, nichts erfinden

### 2. Klarer Wahrheitsfilter
Wenn für einen Slot keine Log-Evidenz da ist, schreibt das Tool bewusst **keinen erfundenen Fortschritt**. Stattdessen wird der Slot als acknowledged-but-open behandelt.

### 3. Clearance-Regel
Ein Slot ist **nicht** schon deshalb geklärt, weil ein Catch-up-Text existiert.

Er gilt erst als geklärt, wenn nach dem Re-Refresh:
- `qa-artifacts/missed-slot-board/latest.json`
- den Slot **nicht mehr** als fehlend zeigt

Das verhindert falsche Selbstentlastung im Reporting.

---

## Praktischer Effekt

Vorher:
- missed-slot board zeigte den Backlog
- hourly draft zeigte die aktuelle Textform
- aber der Operator musste selbst zusammensetzen,
  - welchen Catch-up-Text er pro Slot senden soll
  - ob der Text evidenzbasiert oder nur acknowledgement ist
  - wann ein Slot wirklich geschlossen werden darf

Jetzt:
- jeder fehlende Slot bekommt einen **copy-ready Textblock**
- jeder Slot hat einen sichtbaren **Mode** (`EVIDENCE_READY` / `ACK_ONLY`)
- jeder Slot bekommt einen **Clear-after-send Check**
- das Ganze bleibt klein genug für reale Nutzung unter Zeitdruck

---

## Empfehlung

Die Reihenfolge für Recovery ist jetzt:
1. `qa-missed-slot-board.js`
2. `qa-catchup-runner.js`
3. neuesten Catch-up senden
4. Missed-slot board refreshen
5. nur verschwundene Slots als cleared behandeln

Das ist die bisher praktischste kleine Recovery-Kette zwischen fehlender Stunde, echtem Catch-up-Text und belastbarer Clearance.