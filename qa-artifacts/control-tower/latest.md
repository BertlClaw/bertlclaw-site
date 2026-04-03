# BertlClaw QA Control Tower

Generated: 2026-04-02 13:47:31 CEST
Run mode: full-sequence
Audit window: 6 hour(s)

## Overall
- Status: **ATTENTION**
- Failed step: **none**
- Stream headline: **needs-human-on-p0**
- Ops control status: **FAIL**
- Stale stream detected: **YES**
- Missing hourly slots: **4**
- Next expected hourly slot: **2026-04-02 14:00**
- Ready for retest: **4**
- P0 blocked manual access: **1**

## Sequence check
- [x] reminder-heartbeat (0.09s)
- [x] reminder-audit (0.1s)
- [x] qa-proof-of-run (0.09s)
- [x] qa-stream-status (0.09s)
- [x] qa-ops-control (0.1s)

## Operator next moves
- Treat stream freshness as broken until the next full-hour update is visible in both state and log artifacts.
- Recover missed slots or annotate why they were missed: 2026-04-02 08:00, 2026-04-02 09:00, 2026-04-02 10:00, 2026-04-02 12:00.
- Escalate human blocker: BCQA-001.
- Burn down retest queue before new exploratory work: BCQA-002, BCQA-003, BCQA-005, BCQA-006.

## Artifact handoff
- Reminder audit: /home/dominic/.openclaw/workspace/qa-artifacts/reminder-audit/latest.json
- Proof of run: /home/dominic/.openclaw/workspace/qa-artifacts/proof-of-run/latest.json
- Stream status: /home/dominic/.openclaw/workspace/qa-artifacts/stream-status/latest.json
- Ops control: /home/dominic/.openclaw/workspace/qa-artifacts/ops-control/latest.json
- Control tower JSON: /home/dominic/.openclaw/workspace/qa-artifacts/control-tower/latest.json
- Control tower markdown: /home/dominic/.openclaw/workspace/qa-artifacts/control-tower/latest.md

