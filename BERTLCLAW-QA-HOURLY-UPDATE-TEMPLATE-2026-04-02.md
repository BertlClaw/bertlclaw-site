# BertlClaw QA Hourly Update Template

Stand: 2026-04-02

Zweck: **ein kompaktes Vollstunden-Format**, das ein QA-Operator in 2–5 Minuten aus dem bestehenden QA-Stack bauen kann. Dieses Blatt ist **kein weiterer Test-Plan**, sondern ein **copy-ready Status-/Reporting-Output** für laufende QA-Arbeit.

Es baut auf diesen bestehenden Quellen auf:
- `qa-artifacts/stream-status/operator-summary.md`
- `qa-artifacts/priority-board/latest.md`
- `qa-artifacts/ops-control/latest.md`
- `bertlclaw-qa-active-bugs.csv`
- optional: `qa-artifacts/control-tower/latest.md`

---

## 1. Fast Rule for Full-Hour Updates

Jedes Vollstunden-Update muss diese 6 Fragen beantworten:
1. **Ist der QA-Stream frisch oder stale?**
2. **Was wurde seit der letzten Stunde konkret geprüft/geschlossen?**
3. **Welche Tickets blockieren gerade den Fluss?**
4. **Wie groß ist die `ready_for_retest`-Queue?**
5. **Was ist der nächste höchste Zug bis zur nächsten vollen Stunde?**
6. **Braucht es Human-Zugriff oder kann QA/build weiterlaufen?**

Wenn diese 6 Punkte nicht sichtbar sind, ist das Update zu weich.

---

## 2. 2-Minute Source Pull

Vor dem Schreiben kurz diese 4 Blöcke lesen:

### A. Stream-Freshness + Attention
Aus `qa-artifacts/stream-status/operator-summary.md` ziehen:
- Overall status
- Stream stale: yes/no
- Last run in min
- Last hourly update in min
- What needs attention now
- What to do next

### B. Queue / Top-5
Aus `qa-artifacts/priority-board/latest.md` ziehen:
- Ready for retest count
- Manual blockers count
- Top 3–5 nächste Moves

### C. Ops Reliability
Aus `qa-artifacts/ops-control/latest.md` ziehen:
- hourly_update_freshness
- reminder_audit / missing slots falls relevant
- Recovery moves falls sichtbar

### D. Ticket Reality Check
Aus `bertlclaw-qa-active-bugs.csv` ziehen:
- Statuswechsel seit letztem Update
- neue `retested_pass`
- neue `retested_fail`
- offene `blocked_manual_access`

---

## 3. One-Page Hourly Update Format

## Copy-ready short version

```text
[YYYY-MM-DD HH:00 CEST] QA hourly update

Stream:
- Status: [headline_status]
- Freshness: last run [x] min ago, last hourly update [y] min ago
- Retest queue: [n]
- Manual blockers: [n]

This hour done:
- [ticket/flow] -> [PASS/PARTIAL/FAIL/BLOCKED]
- [ticket/flow] -> [PASS/PARTIAL/FAIL/BLOCKED]
- [artifact/control action] -> [done/not done]

Open pressure now:
- [highest live blocker]
- [retest queue pressure]
- [reporting/reliability issue or "none"]

Next before next full hour:
1. [highest-value next move]
2. [second move]
3. [human dependency if any]

Ask / dependency:
- [none / exact manual access needed]
```

---

## 4. Operator Fill Template

```text
[YYYY-MM-DD HH:00 CEST] QA hourly update

Stream:
- Status: [needs-human-on-p0 / retest-queue-active / reminder-audit-failing / stable-no-urgent-retest-queue]
- Freshness: last run [x] min ago, last hourly update [y] min ago
- Retest queue: [n]
- Manual blockers: [n]

This hour done:
- [BCQA-xxx / flow] -> [PASS/PARTIAL/FAIL/BLOCKED] — [1-line outcome]
- [BCQA-xxx / flow] -> [PASS/PARTIAL/FAIL/BLOCKED] — [1-line outcome]
- [artifact / check / command] -> [done/not done] — [1-line outcome]

Open pressure now:
- [highest business risk still open]
- [highest QA queue pressure]
- [highest reporting/reliability pressure or none]

Next before next full hour:
1. [exact next test or retest]
2. [exact follow-up / handoff]
3. [exact update to CSV/artifact/log if still pending]

Ask / dependency:
- [none]
- or: [exact thing human must verify / unlock]
```

---

## 5. Ultra-Compact Telegram/Chat Version

Wenn nur wenig Platz da ist:

```text
[HH:00 CEST] QA: status=[headline], queue=[ready_for_retest], blockers=[manual_blockers]. Done: [ticket=result], [ticket=result]. Open: [biggest blocker]. Next: [next move]. Need human: [none / exact dependency].
```

Beispiel:

```text
[14:00 CEST] QA: status=retest-queue-active, queue=4, blockers=1. Done: BCQA-003=PASS (SearchAction gone), BCQA-006=PASS (audit JSON readable). Open: BCQA-001 still blocked on real receipt confirmation. Next: mobile retest for BCQA-004. Need human: Formspree/mailbox visibility for BCQA-001.
```

---

## 6. Output Discipline Rules

### Rule A — Kein generisches Fortschrittsgerede
Nicht schreiben:
- "QA läuft weiter"
- "wir machen Fortschritte"
- "mehr Tests folgen"

Stattdessen immer:
- Ticket-ID
- Ergebniscode
- konkreter Effekt
- nächster Zug

### Rule B — Maximal 3 offene Drücke nennen
Nicht alle offenen Punkte dumpen. Nur:
1. größtes Business-Risiko
2. größter QA-Queue-Druck
3. größtes Prozess-/Reporting-Risiko

### Rule C — Next move muss ausführbar sein
Schlecht:
- "weiter testen"

Gut:
- "BCQA-004 mobile retest on services.html at 390x844 + 360x800"
- "Run reminder audit and compare missing slots against operations log"
- "Set BCQA-003 to retested_pass and remove from active pressure"

### Rule D — Human dependency exakt benennen
Nicht:
- "brauche Zugriff"

Sondern:
- "Need Formspree/mailbox confirmation for BCQA-001 receipt validation"
- "Need live mobile device run if viewport emulator result is ambiguous"

---

## 7. Hourly Update Assembly Order

Wenn es schnell gehen muss, immer in dieser Reihenfolge bauen:

1. `qa-artifacts/stream-status/operator-summary.md`
2. `qa-artifacts/priority-board/latest.md`
3. `bertlclaw-qa-active-bugs.csv`
4. `qa-artifacts/ops-control/latest.md`

Merksatz:
- **stream-status** sagt, ob der Strom gesund ist
- **priority-board** sagt, was als Nächstes dran ist
- **CSV** sagt, was wirklich wahr ist
- **ops-control** sagt, ob der Reporting-Prozess selbst driftet

---

## 8. Recommended End-of-Hour Structure

Ein gutes Vollstunden-Update sieht so aus:
- **1 Zeile Stream-Lage**
- **2–3 Zeilen "This hour done"**
- **1–3 Zeilen "Open pressure now"**
- **1–3 nummerierte Next moves**
- **0–1 klare Human-Abhängigkeit**

Mehr ist meistens unnötig. Weniger wird oft unklar.

---

## 9. Copy-Ready Full Example

```text
[2026-04-02 14:00 CEST] QA hourly update

Stream:
- Status: retest-queue-active
- Freshness: last run 6 min ago, last hourly update 0 min ago
- Retest queue: 3
- Manual blockers: 1

This hour done:
- BCQA-003 -> PASS — homepage JSON-LD rechecked; SearchAction absent and syntax clean
- BCQA-006 -> PASS — reminder audit ran; latest.json readable and missing-slot visibility confirmed
- QA control artifacts -> done — stream/priority views still aligned with CSV state

Open pressure now:
- BCQA-001 remains the highest business blocker because real lead receipt is still not manually confirmed
- BCQA-004 is still the highest conversion-risk retest because mobile chat→contact UX is not yet live-validated
- External scheduling is still not fully wired, so reminder reliability is locally proven but not end-to-end closed

Next before next full hour:
1. Run BCQA-004 mobile retest on services.html, landingpage-sprint.html, and digital-clarity-setup.html
2. If mobile flow is clear, move BCQA-004 to retested_pass; if not, produce fix handoff immediately
3. Keep BCQA-001 visible as manual blocker until Formspree/mailbox receipt is verified

Ask / dependency:
- Need human visibility into Formspree/mailbox to close BCQA-001 with real receipt proof
```

---

## 10. Definition of a Good Hourly Update

Ein Vollstunden-Update ist gut, wenn danach ohne Rückfrage klar ist:
- was seit der letzten Stunde wirklich passiert ist
- was gerade am stärksten drückt
- was bis zur nächsten vollen Stunde passieren soll
- ob ein Mensch eingreifen muss

Wenn das Update diese 4 Dinge nicht sofort beantwortet, neu schneiden und kürzer/härter formulieren.
