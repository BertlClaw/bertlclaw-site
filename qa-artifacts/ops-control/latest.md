# BertlClaw QA Ops Control Checklist

Generated: 2026-04-02 13:47:31 CEST
Source stream status: 2026-04-02 13:47:31 CEST
Source proof-of-run: 2026-04-02 13:47:31 CEST

## Overall
- Control status: **FAIL**
- Stale stream detected: **YES**
- Next expected hourly slot: **2026-04-02 14:00**

## Compact control checklist
- [x] run_freshness — PASS — QA control artifacts refreshed recently (0 min ago).
- [x] hourly_update_freshness — PASS — Last hourly update is within guardrail (1 min ago).
- [ ] missing_hour_slots — FAIL — Missing full-hour slots detected: 2026-04-02 08:00, 2026-04-02 09:00, 2026-04-02 10:00, 2026-04-02 12:00.
- [ ] stale_stream — FAIL — Stream is flagged stale and needs immediate recovery.
- [ ] p0_human_blocker — FAIL — P0 human blocker active: BCQA-001.
- [x] retest_queue_visibility — PASS — Retest queue visible: 4 item(s) ready for retest.

## Immediate recovery moves
- Run `node bertlclaw-tools/reminder-audit.js --hours=6 && node bertlclaw-tools/qa-proof-of-run.js && node bertlclaw-tools/qa-stream-status.js && node bertlclaw-tools/qa-ops-control.js` to refresh the control view.
- Investigate why these full-hour slots were missed: 2026-04-02 08:00, 2026-04-02 09:00, 2026-04-02 10:00, 2026-04-02 12:00.
- BCQA-001: Run real end-to-end submit and verify Formspree/mailbox delivery
- Before new exploratory QA, clear ready-for-retest items: BCQA-002, BCQA-003, BCQA-005, BCQA-006.

