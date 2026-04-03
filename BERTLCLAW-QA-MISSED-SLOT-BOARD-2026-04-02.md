# BertlClaw QA Missed-Slot Board

Stand: 2026-04-02

Zweck: nach der Hourly-Status-Schicht die **nächste kleine Reliability-Hilfe** bereitstellen, die verpasste Vollstunden **als expliziten Backlog** sichtbar macht und daraus sofort eine Recovery-Reihenfolge ableitet.

Dateien:
- `bertlclaw-tools/qa-missed-slot-board.js`
- `qa-artifacts/missed-slot-board/latest.json`
- `qa-artifacts/missed-slot-board/latest.md`
- `qa-artifacts/missed-slot-board/latest.txt`

---

## Was dieses Asset löst

Die Hourly-Status-Schicht sagt jetzt gut, **was aktuell** gemeldet werden sollte.

Das neue Board beantwortet zusätzlich:
- **Welche Vollstunden fehlen überhaupt noch?**
- **Wie groß ist der Reporting-Backlog gerade?**
- **Welche Catch-up-Reihenfolge ist am sinnvollsten?**
- **Welcher Copy-ready-Satz kann direkt für einen verpassten Slot verwendet werden?**

Damit wird aus "irgendwo fehlt wohl ein Update" ein kleiner, klarer Abarbeitungsstapel.

---

## Nutzung

Standardlauf:

```bash
node bertlclaw-tools/qa-missed-slot-board.js --refresh --hours=8
```

Das macht:
1. Reminder-Audit für das Zeitfenster refreshen
2. Hourly-Status refreshen
3. Missed-Slot-Board erzeugen

Danach reichen normalerweise:

```bash
cat qa-artifacts/missed-slot-board/latest.md
```

---

## Kernlogik

### Statusklassen
- `CLEAR` = keine fehlenden Vollstunden
- `WATCH` = 1 fehlende Vollstunde
- `PRESSURE` = 2-3 fehlende Vollstunden
- `FAIL` = 4+ fehlende Vollstunden

### Recovery-Regel
Wenn Slots fehlen:
- **zuerst den neuesten fehlenden Slot** sichtbar machen
- dadurch die Reporting-Kette wieder an der Gegenwart verankern
- danach ältere Slots knapp backfillen, falls noch nötig

Das ist absichtlich pragmatisch. Erst Gegenwarts-Anker zurückgewinnen, dann Historie glätten.

---

## Praktischer Effekt

Vorher:
- Audit zeigte fehlende Stunden
- Hourly-Status zeigte aktuellen Text
- aber der Recovery-Backlog war nicht als eigener Operator-Stapel sichtbar

Jetzt:
- fehlende Slots werden als **Board + Queue** ausgegeben
- jede Lücke bekommt eine konkrete Aktion
- zusätzlich gibt es einen **copy-ready Catch-up-Satz** pro fehlendem Slot

Das ist klein, aber genau die Art Druck-/Recovery-Visualisierung, die verpasste Stunden schneller aufräumbar macht.
