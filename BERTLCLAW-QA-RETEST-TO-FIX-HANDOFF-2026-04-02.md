# BertlClaw QA Retest → Fix Handoff Template

Stand: 2026-04-02

Zweck: QA-Findings so übergeben, dass daraus ohne Rückfrage direkt Implementation-Arbeit wird.

Dieses Blatt ergänzt:
- `BERTLCLAW-QA-DAILY-RHYTHM-2026-04-02.md`
- `BERTLCLAW-QA-TESTER-WORKSHEET-2026-04-02.md`
- `bertlclaw-qa-active-bugs.csv`
- `qa-artifacts/priority-board/latest.md`

---

## 1. Wann dieses Format benutzt wird

Immer dann, wenn ein QA-Fund von "gesehen" zu "bitte jetzt fixen" wechseln soll.

Nutzen für drei Fälle:
1. **Neuer Bug** aus Manual QA / Exploratory QA
2. **Retest failed** nach gemeldetem Fix
3. **Manual blocker** mit klarem Human-/Builder-Handoff

Nicht als Roman schreiben. Das Ziel ist:
- Builder versteht das Problem in <60 Sekunden
- nächste Implementationsaktion ist explizit
- QA weiß exakt, worauf danach retestet wird

---

## 2. Minimalstandard für einen guten Handoff

Jeder Handoff braucht genau diese 8 Punkte:

1. **Bug-ID + Severity + Status**
2. **betroffener Flow / Seite**
3. **knappe Failure Summary**
4. **erwartetes Verhalten**
5. **Ist-Verhalten / Impact**
6. **Evidence**
7. **nächste Builder-Aktion**
8. **Retest-Trigger / Retest nach Fix**

Faustregel:
- **wenn der Builder noch fragen muss, ist der Handoff zu weich**
- **wenn QA später nicht weiß, worauf retestet wird, ist der Handoff unvollständig**

---

## 3. Copy-Ready Template

```md
## [BUG-ID] [Severity] — [Kurztitel]

- Status: [new / ready_for_retest / retested_fail / blocked_manual_access / partial]
- Flow / Seite: [konkreter Pfad oder Screen]
- Umgebung: [Desktop / Mobile / System]

### Failure Summary
[1-2 Sätze. Was bricht konkret und warum ist es relevant?]

### Expected
[Was müsste korrekt passieren?]

### Actual / Impact
[Was passiert stattdessen? Conversion-Risiko, Trust-Risiko, Reporting-Risiko etc.]

### Evidence
- [Screenshot / JSON / DOM-Hinweis / Log / exakter Beobachtungssatz]
- [wenn nichts Starkes vorhanden ist: "manuelle Bestätigung noch offen"]

### Builder Action Now
- [die nächste konkrete Umsetzungsaktion]
- [optional: vermutete Ursache oder betroffene Datei]

### QA Retest After Fix
- Reproduce original path:
- Adjacent check:
- Mobile/Desktop counter-check:
- Pass condition:

### Handoff Outcome
- Wenn umgesetzt -> Status auf `ready_for_retest`
- Wenn extern/manual blockiert -> Status auf `blocked_manual_access`
- Wenn unklar -> in kleineres, testbares Teilproblem schneiden
```

---

## 4. Ultra-Short Telegram / Log Version

Wenn wenig Platz da ist, immer dieses Format verwenden:

```text
[BUG-ID] [Severity/Status] — [Titel]
Flow: [Seite/Flow]
Fail: [knappes Ist-Problem]
Expected: [Soll]
Evidence: [Beweis]
Fix now: [nächster konkreter Schritt]
Retest after: [Originalpfad + 1 Gegenprobe]
```

---

## 5. Ready-Made Examples aus aktuellem Backlog

### BCQA-001 — Manual blocker / Lead risk

```text
BCQA-001 [P0/blocked_manual_access] — Form submit delivery not yet manually confirmed
Flow: index.html -> Formspree -> danke.html
Fail: Frontend submit path exists, but real lead receipt is not yet confirmed in Formspree/mailbox.
Expected: Successful submit plus confirmed receipt in the real destination inbox.
Evidence: Static code path verified locally; no mailbox/Formspree confirmation available in workspace QA.
Fix now: Run one real end-to-end submission and confirm receipt in Formspree/mailbox.
Retest after: Re-run the exact submit flow and verify thank-you redirect plus actual message receipt.
```

### BCQA-004 — Mobile conversion risk

```text
BCQA-004 [P1/ready_for_retest] — Underpage chat-to-contact flow needs real UX validation on mobile
Flow: services.html / offer pages -> chat -> index.html#kontakt
Fail: Code path looks prepared, but live mobile usability is not yet confirmed.
Expected: User clearly sees the redirect to the main form and their message remains preserved.
Evidence: Local static check only; manual retest pack exists with exact pages, viewport sizes, and pass/fail criteria.
Fix now: Run the packaged mobile retest on services.html, landingpage-sprint.html, and digital-clarity-setup.html.
Retest after: Original mobile chat path plus one adjacent mobile counter-check on a second page.
```

### BCQA-006 — Reporting reliability

```text
BCQA-006 [P1/ready_for_retest] — Hourly reporting reliability not yet proven by repeatable check routine
Flow: logs/bertlclaw-operations.log + reporting process
Fail: Audit capability exists, but real reliability proof is not yet exercised as an operator loop.
Expected: Missing full-hour slots are visible and the QA operator can detect/report drift quickly.
Evidence: reminder-audit tool and artifact path now exist locally.
Fix now: Run the audit, inspect missing/full-hour visibility, and keep the result visible in the QA control loop.
Retest after: Re-run audit after the process step and confirm fresh operator-readable output.
```

---

## 6. Fast Operator Flow

### Wenn ein Fund entsteht
1. in `bertlclaw-qa-active-bugs.csv` eintragen/aktualisieren
2. sofort ein Handoff in obigem Format formulieren
3. **Builder Action Now** auf eine einzige konkrete nächste Bewegung zuspitzen
4. **QA Retest After Fix** direkt mitgeben

### Wenn ein Fix gemeldet wird
1. Ticket öffnen
2. altes Failure lesen
3. denselben Pfad retesten
4. 1 Gegenprobe machen
5. Ergebnis auf `retested_pass`, `retested_fail`, `partial` oder `blocked_manual_access` setzen

---

## 7. Verbindung mit Priority Board

Für den schnellsten Einstieg künftig:

```bash
node bertlclaw-tools/qa-priority-board.js
cat qa-artifacts/priority-board/latest.md
```

Dann:
- Top-5 aus dem Board nehmen
- für das nächste Item den Handoff aus diesem Dokument verwenden
- erst danach neue Exploratory-QA starten

---

## 8. Qualitätsregel

Ein guter QA-Handoff ist nicht nur ein Fehlerbericht.
Er ist ein **Arbeitsauftrag mit eingebautem Retest-Pfad**.

Wenn das Dokument diese zwei Fragen beantwortet, ist es gut:
- **Was muss jetzt konkret gebaut/geprüft werden?**
- **Woran erkennt QA danach schnell, ob es wirklich behoben ist?**
