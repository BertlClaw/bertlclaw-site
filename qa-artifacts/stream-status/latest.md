# BertlClaw QA Stream Status

Generated from proof-of-run: 2026-04-02 13:47:31 CEST
Rendered operator view: 2026-04-03 13:14:15 CEST

## Operator Summary
- Status: **needs-human-on-p0**
- Last run freshness: **critical** (1407 min ago)
- Last hourly freshness: **critical** (1407 min ago)
- Missing hourly slots: **4**
- Longest visible hourly gap: **3 hour(s)**
- Stale stream detected: **yes**

### Immediate attention
- P0 human blocker present: manual access still required to close the top issue.
- Stream appears CRITICAL/stale: last hourly update 1407 min ago, last run 1407 min ago.
- Hourly reporting gaps detected: 4 missing slot(s), longest visible gap 3 hour(s).
- Retest queue active: 4 item(s) ready for retest before new exploratory work.

### Next best moves
- BCQA-001: Run real end-to-end submit and verify Formspree/mailbox delivery
- BCQA-002: Run local heartbeat and verify state/log update; then wire real cron/heartbeat scheduling
- BCQA-003: Retest homepage JSON-LD and confirm SearchAction is absent with valid syntax
- BCQA-004: Run a real-phone test on at least iPhone-size and Android-size devices and capture screenshot/video proof of the handoff state
- BCQA-005: Run a visibility-first proof sweep on homepage plus proof.html and produce a ranked list of hidden vs visible proof elements with screenshot evidence

## Counters
- Total bugs: 6
- Ready for retest: 4
- Blocked manual access: 2
- By status: blocked_manual_access=2, ready_for_retest=4

## Proof-of-run visibility
- Reminder last run: 2026-04-02 13:47:31
- Last hourly slot recorded: 2026-04-02 13:47
- Last daily ticket reminder: 2026-04-02
- Reminder audit status: fail
- Audit generated: 2026-04-02 13:47:31 CEST
- Missing hourly slots: 2026-04-02 08:00, 2026-04-02 09:00, 2026-04-02 10:00, 2026-04-02 12:00
- Next expected hourly slot: 2026-04-02 14:00

## Highest-signal queues

### P0/P1 open
- BCQA-001 [P0/blocked_manual_access] — Form submit delivery not yet manually confirmed -> Run real end-to-end submit and verify Formspree/mailbox delivery
- BCQA-002 [P1/ready_for_retest] — Reminder system is policy-defined but not technically scheduled -> Run local heartbeat and verify state/log update; then wire real cron/heartbeat scheduling
- BCQA-003 [P1/ready_for_retest] — Startpage JSON-LD SearchAction likely does not match a real site search -> Retest homepage JSON-LD and confirm SearchAction is absent with valid syntax
- BCQA-004 [P1/blocked_manual_access] — Mobile CTA/chat/contact collision risk still needs real-device confirmation -> Run a real-phone test on at least iPhone-size and Android-size devices and capture screenshot/video proof of the handoff state
- BCQA-005 [P1/ready_for_retest] — Proof visibility and evidence prominence are insufficiently proven -> Run a visibility-first proof sweep on homepage plus proof.html and produce a ranked list of hidden vs visible proof elements with screenshot evidence
- BCQA-006 [P1/ready_for_retest] — Hourly reporting reliability not yet proven by repeatable check routine -> Run local audit and confirm missing/full hour visibility against the operations log

### Ready for retest
- BCQA-002 [P1] — Reminder system is policy-defined but not technically scheduled -> Run local heartbeat and verify state/log update; then wire real cron/heartbeat scheduling
- BCQA-003 [P1] — Startpage JSON-LD SearchAction likely does not match a real site search -> Retest homepage JSON-LD and confirm SearchAction is absent with valid syntax
- BCQA-005 [P1] — Proof visibility and evidence prominence are insufficiently proven -> Run a visibility-first proof sweep on homepage plus proof.html and produce a ranked list of hidden vs visible proof elements with screenshot evidence
- BCQA-006 [P1] — Hourly reporting reliability not yet proven by repeatable check routine -> Run local audit and confirm missing/full hour visibility against the operations log

### Blocked by manual access
- BCQA-001 [P0] — Form submit delivery not yet manually confirmed -> Run real end-to-end submit and verify Formspree/mailbox delivery
- BCQA-004 [P1] — Mobile CTA/chat/contact collision risk still needs real-device confirmation -> Run a real-phone test on at least iPhone-size and Android-size devices and capture screenshot/video proof of the handoff state

