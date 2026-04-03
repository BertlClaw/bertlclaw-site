# BertlClaw QA Ticket-Close Helper — 2026-04-02

Stand: 2026-04-02

Zweck: nach Scorecard, Evidence Pack und Retest-Worksheet fehlte noch der **allerletzte kleine Operator-Schritt**. Dieses Asset schließt genau diese Lücke:

- nimmt den aktuellen Ticket-Stand aus `bertlclaw-qa-active-bugs.csv`
- zieht die aktuelle Hourly-One-Line aus `qa-artifacts/hourly-status/latest.json`
- legt pro ausgewähltem Ticket ein kompaktes Close-out-Blatt an
- verbindet **Verifikation -> Evidence refs -> CSV-Update -> Hourly-Status-Zeile**

Dateien:
- `bertlclaw-tools/qa-ticket-close-helper.js`
- `qa-artifacts/ticket-close-helper/latest.json`
- `qa-artifacts/ticket-close-helper/latest.md`
- `qa-artifacts/ticket-close-helper/latest.txt`

---

## Warum das sinnvoll ist

Vorher gab es bereits:
- Scorecard / Worksheet für den eigentlichen Testlauf
- Evidence-Pack-/Screenshot-Logik
- Priority-/Hourly-/Missed-Slot-Layer

Aber direkt nach einem manuellen Run blieb noch unnötige Reibung:
- Was genau kommt jetzt ins CSV?
- Wie formuliere ich die Abschlussnote pro Ticket?
- Welche Zeile gehört ins Stundenupdate?
- Welche Tickets will ich in diesem Abschlussblock überhaupt gemeinsam schließen?

Der Ticket-Close-Helper bündelt genau diese letzte Meile.

---

## Standardnutzung

### Kompakter Standardlauf

```bash
node bertlclaw-tools/qa-ticket-close-helper.js --refresh --hours=6
cat qa-artifacts/ticket-close-helper/latest.md
```

Das macht:
1. Hourly-Status aktualisieren
2. aktive Top-Tickets auswählen (standardmäßig die ersten 3 aktiven Tickets)
3. ein direkt ausfüllbares Close-out-Blatt erzeugen

### Gezielt für bestimmte Tickets

```bash
node bertlclaw-tools/qa-ticket-close-helper.js --ids=BCQA-001,BCQA-004,BCQA-005
```

### Für alle aktiven Tickets

```bash
node bertlclaw-tools/qa-ticket-close-helper.js --all
```

---

## Was im Output steckt

Pro Ticket:
- aktueller Severity-/Status-Stand
- aktueller Flow / Environment / Manual-Access-Hinweis
- Verweis auf passende Scorecard / Worksheet
- aktuelles `actual`, `evidence`, `next_action` aus dem CSV
- Block für den echten Verifikationsausgang
- Block für die geplante CSV-Umschreibung
- copy-ready Ticket-Close-/Handoff-Zeile
- Hourly-Bridge-Zeile für das nächste Stundenupdate

Am Ende zusätzlich:
- kleiner Closure-Ledger für den ganzen Run
- copy-ready Gesamtzusammenfassung

---

## Empfohlener Einsatzpunkt im QA-Loop

Nach einem manuellen Retest-/Verification-Block:
1. Scorecard oder Worksheet ausfüllen
2. Evidence sichern
3. `qa-ticket-close-helper.js` laufen lassen
4. nur noch CSV-Delta + Abschlusszeile + Hourly-Zeile ergänzen
5. Ticket sauber schließen oder bewusst geblockt lassen

So wird aus einem manuellen Testlauf schneller ein echter operativer Abschluss statt nur einer lose dokumentierten Beobachtung.

---

## Praktischer Effekt

Das Asset ersetzt keine Scorecard und keinen Evidence Pack.
Es ist absichtlich nur der **kleine Abschlussadapter** danach.

Genau deshalb ist es nützlich:
- weniger Kontextwechsel
- weniger vergessene CSV-Updates
- sauberere Hourly-Updates
- weniger Friktion beim Ticket-Schließen
