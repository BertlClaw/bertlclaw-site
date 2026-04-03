# BertlClaw QA Priority Board

Generated: 2026-04-02 13:47:31 CEST

## At a glance
- Active items: **6**
- Manual blockers: **2**
- Ready for retest: **4**
- Retested fail / fix-now: **0**
- New items needing triage: **0**

## Top 5 next moves
1. BCQA-001 [P0/blocked_manual_access] — Form submit delivery not yet manually confirmed
   - flow: index.html -> Formspree -> danke.html
   - why now: Frontend path exists but real receipt is not yet confirmed from current workspace-only QA
   - next move: Run real end-to-end submit and verify Formspree/mailbox delivery
   - retest handoff: Escalate human/manual blocker immediately.
2. BCQA-004 [P1/blocked_manual_access] — Mobile CTA/chat/contact collision risk still needs real-device confirmation
   - flow: services.html and offer pages -> chat / sticky CTA / contact handoff
   - why now: Manual feedback indicates the remaining uncertainty is no longer generic mobile UX but real-device collision/overlap verification between chat CTA bars and the contact area; workspace QA cannot close this from static inspection alone
   - next move: Run a real-phone test on at least iPhone-size and Android-size devices and capture screenshot/video proof of the handoff state
   - retest handoff: Escalate human/manual blocker immediately.
3. BCQA-002 [P1/ready_for_retest] — Reminder system is policy-defined but not technically scheduled
   - flow: BERTLCLAW-REMINDER-SYSTEM.md / operations reporting
   - why now: Local technical basis now exists via heartbeat/state/log wiring, but external scheduling is still not yet attached
   - next move: Run local heartbeat and verify state/log update; then wire real cron/heartbeat scheduling
   - retest handoff: Retest now before new exploratory QA.
4. BCQA-003 [P1/ready_for_retest] — Startpage JSON-LD SearchAction likely does not match a real site search
   - flow: index.html schema
   - why now: Invalid SearchAction noise removed from homepage JSON-LD and WebSite object left intact
   - next move: Retest homepage JSON-LD and confirm SearchAction is absent with valid syntax
   - retest handoff: Retest now before new exploratory QA.
5. BCQA-005 [P1/ready_for_retest] — Proof visibility and evidence prominence are insufficiently proven
   - flow: proof.html + homepage proof entry points
   - why now: Latest manual feedback points to proof visibility insufficiency: the issue is not only generic trust quality, but whether the most convincing evidence is surfaced early and clearly enough to support conversion
   - next move: Run a visibility-first proof sweep on homepage plus proof.html and produce a ranked list of hidden vs visible proof elements with screenshot evidence
   - retest handoff: Retest now before new exploratory QA.

## Lane view
### Manual blocker (2)
- BCQA-001 [P0/blocked_manual_access] — Form submit delivery not yet manually confirmed | index.html -> Formspree -> danke.html | next: Run real end-to-end submit and verify Formspree/mailbox delivery | manual access required
- BCQA-004 [P1/blocked_manual_access] — Mobile CTA/chat/contact collision risk still needs real-device confirmation | services.html and offer pages -> chat / sticky CTA / contact handoff | next: Run a real-phone test on at least iPhone-size and Android-size devices and capture screenshot/video proof of the handoff state | manual access required

### Retest first (4)
- BCQA-002 [P1/ready_for_retest] — Reminder system is policy-defined but not technically scheduled | BERTLCLAW-REMINDER-SYSTEM.md / operations reporting | next: Run local heartbeat and verify state/log update; then wire real cron/heartbeat scheduling | workspace-actionable
- BCQA-003 [P1/ready_for_retest] — Startpage JSON-LD SearchAction likely does not match a real site search | index.html schema | next: Retest homepage JSON-LD and confirm SearchAction is absent with valid syntax | workspace-actionable
- BCQA-005 [P1/ready_for_retest] — Proof visibility and evidence prominence are insufficiently proven | proof.html + homepage proof entry points | next: Run a visibility-first proof sweep on homepage plus proof.html and produce a ranked list of hidden vs visible proof elements with screenshot evidence | workspace-actionable
- BCQA-006 [P1/ready_for_retest] — Hourly reporting reliability not yet proven by repeatable check routine | logs/bertlclaw-operations.log + reporting process | next: Run local audit and confirm missing/full hour visibility against the operations log | workspace-actionable

### Fix now (0)
- none

### Triage next (0)
- none

### Resolve gaps (0)
- none

### Monitor (0)
- none

## Copy-ready retest → fix handoff starters
### BCQA-001
- Severity / status: P0 / blocked_manual_access
- Flow: index.html -> Formspree -> danke.html
- Failure: Frontend path exists but real receipt is not yet confirmed from current workspace-only QA
- Expected: Successful submission plus confirmed lead receipt
- Evidence: Static code shows fetch POST to Formspree endpoint and redirect to danke.html; no mailbox/Formspree confirmation available locally
- Builder action: Run real end-to-end submit and verify Formspree/mailbox delivery
- QA retest after fix: after manual access

### BCQA-004
- Severity / status: P1 / blocked_manual_access
- Flow: services.html and offer pages -> chat / sticky CTA / contact handoff
- Failure: Manual feedback indicates the remaining uncertainty is no longer generic mobile UX but real-device collision/overlap verification between chat CTA bars and the contact area; workspace QA cannot close this from static inspection alone
- Expected: On a real phone the CTA/chat/contact path should remain readable tappable and non-overlapping during the handoff to contact
- Evidence: Local CSS improvements exist for mobile spacing/safe-area handling, but no evidence yet from a real handset run with screenshots/video proving that no important UI is covered during the handoff
- Builder action: Run a real-phone test on at least iPhone-size and Android-size devices and capture screenshot/video proof of the handoff state
- QA retest after fix: after real-device mobile run

### BCQA-002
- Severity / status: P1 / ready_for_retest
- Flow: BERTLCLAW-REMINDER-SYSTEM.md / operations reporting
- Failure: Local technical basis now exists via heartbeat/state/log wiring, but external scheduling is still not yet attached
- Expected: Automated reliable hourly updates and daily GitHub ticket reminder
- Evidence: Added bertlclaw-tools/reminder-heartbeat.js plus state/bertlclaw-reminders.json and updated reminder doc to reflect locally executable trigger basis
- Builder action: Run local heartbeat and verify state/log update; then wire real cron/heartbeat scheduling
- QA retest after fix: after local heartbeat validation

### BCQA-003
- Severity / status: P1 / ready_for_retest
- Flow: index.html schema
- Failure: Invalid SearchAction noise removed from homepage JSON-LD and WebSite object left intact
- Expected: Structured data should only describe real user-facing features
- Evidence: index.html updated: SearchAction/potentialAction removed from WebSite JSON-LD; no local evidence of real site search remains
- Builder action: Retest homepage JSON-LD and confirm SearchAction is absent with valid syntax
- QA retest after fix: after schema change

### BCQA-005
- Severity / status: P1 / ready_for_retest
- Flow: proof.html + homepage proof entry points
- Failure: Latest manual feedback points to proof visibility insufficiency: the issue is not only generic trust quality, but whether the most convincing evidence is surfaced early and clearly enough to support conversion
- Expected: Visitors should quickly see concrete proof signals and a clear next step without needing to decode the structure
- Evidence: Workspace contains proof modules and publication controls, but there is still no operator-facing benchmark that confirms which proof items are above the fold, obvious, and screenshot-worthy on desktop/mobile
- Builder action: Run a visibility-first proof sweep on homepage plus proof.html and produce a ranked list of hidden vs visible proof elements with screenshot evidence
- QA retest after fix: after proof visibility sweep


