# BertlClaw QA Retest Report — 2026-04-03

**Run by:** QA Retest Agent  
**Date/Time:** 2026-04-03 13:15 CEST  
**Bugs retested:** BCQA-002, BCQA-003, BCQA-005, BCQA-006

---

## BCQA-002 — Reminder System Scheduling
**Verdict: PARTIAL**

### What was tested
Ran `node bertlclaw-tools/reminder-heartbeat.js` and inspected state + log.

### Findings
- Script ran cleanly (exit 0), emitting the correct JSON status object.
- State file (`state/bertlclaw-reminders.json`) updated correctly: `last_run_at`, `last_hourly_update_at`, `last_daily_github_ticket_reminder_at` all reflect the current run.
- Operations log (`logs/bertlclaw-operations.log`) received two new entries for today:
  - `2026-04-03 13:14 CEST` — hourly update + daily ticket reminder
  - `2026-04-03 13:15 CEST` — hourly update
- The `emitted` array correctly reflects which events fired vs. which didn't (deduplication logic working).

### Gap remaining
- **External scheduling is still not wired.** No cron job, systemd timer, or OpenClaw heartbeat schedule is in place. The script works when called manually, but will not run autonomously without a triggering mechanism.
- This confirms the original bug's "remaining gap is external scheduling" note is still open.

**Status: PARTIAL** — local trigger logic verified; external scheduling still missing.

---

## BCQA-003 — SearchAction Schema
**Verdict: PASS ✅**

### What was tested
- Inspected `index.html` for all `application/ld+json` script blocks.
- Parsed JSON-LD and checked for `SearchAction` or `potentialAction` keys.
- Validated JSON syntax.

### Findings
- **1 JSON-LD block found**, containing a `@graph` with 5 nodes: `Person`, `Organization`, `WebSite`, `ProfessionalService`, `FAQPage`.
- **No `SearchAction` or `potentialAction` present** anywhere in the structured data.
- **JSON syntax is valid** — parsed without errors.
- The `WebSite` node is clean: only `@type`, `@id`, `name`, `url`, `description`, and `publisher`.

**Status: CLOSED ✅** — SearchAction fully removed, schema is syntactically valid.

---

## BCQA-005 — Proof Visibility Sweep
**Verdict: PARTIAL**

### What was tested
Reviewed `index.html` (homepage) and `proof.html` for proof element placement and visibility ranking.

### Homepage (index.html) — Proof Entry Points

| Rank | Element | Location | Visibility |
|------|---------|----------|------------|
| 1 | **Trust strip** ("Realer Operator", "Saubere Nachweise", "Direkter Rückweg") | Inside hero section, below CTA buttons | **Above the fold** — visible on load without scrolling |
| 2 | **Hero metrics** (3-column grid) | Inside hero section | **Above the fold** — adjacent to trust strip |
| 3 | **Nav link to proof.html** ("Proof") | Top nav (desktop) and mobile nav row | **Above the fold** — but low-prominence link, no visual weight |
| 4 | **`#proof` section** (what BertlClaw delivers, examples, proof-logic) | First major section after hero (id="proof" at line 425) | **Below the fold** — requires scrolling, but is the first section |
| 5 | **Proof teaser shell** (3 cards linking to proof.html#proof-logic, #proof-mini-cases, #proof-modules) | Inside `#proof` section, below explanation blocks | **Buried** — below 2 explanation paragraphs + badge row within an already below-fold section |

### proof.html — Proof Elements

| Rank | Element | Visibility |
|------|---------|------------|
| 1 | **Hero panel** — "Ehrlicher Proof statt lauter Behauptungen" + Proof-Regel note | **Above the fold** on proof.html |
| 2 | **Proof-Logic section** (id="proof-logic") — image + card explaining the 5-criteria chain | **Near fold** — first section after hero |
| 3 | **"Was BertlClaw als Beleg zeigt"** — 3-card grid (Vorher/Nachher, Deliverables, Freigegebene Ausschnitte) | Below fold, but early |
| 4 | **"Typische Ausgangslagen"** — 3-card use-case grid | Mid-page, below fold |
| 5 | **Mini-cases / Deliverables** (concrete examples) | Deep in page — requires significant scrolling |

### Key observations
- The strongest proof signals on the **homepage** are the trust strip and hero metrics — both above the fold — but they are text-only, abstract ("Saubere Nachweise") rather than concrete evidence.
- The **most concrete proof** (mini-cases, deliverable examples, Vorher/Nachher) lives deep in `proof.html`, not surfaced on the homepage.
- The proof teaser shell (3 cards with links) is the homepage's gateway to concrete proof, but it is **buried at the bottom of the #proof section**, which itself is below the fold.
- **No screenshot-worthy, immediately concrete proof element is above the fold on the homepage.** Visitors who don't scroll miss all specifics.
- The `proof.html` hero is clear and credible, but concrete examples (mini-cases) are mid-to-late page.

**Status: PARTIAL** — trust signals are present above fold, but strongest concrete proof remains buried. Recommend surfacing at least one mini-case or deliverable preview higher on the homepage.

---

## BCQA-006 — Hourly Reporting Reliability
**Verdict: PARTIAL**

### What was tested
Ran `node bertlclaw-tools/reminder-audit.js` and inspected `qa-artifacts/reminder-audit/latest.json`.

### Findings
- Audit script ran cleanly (exit 0).
- `latest.json` was generated correctly at `2026-04-03 13:15:22 CEST`.
- **Audit window:** last 6 hours (08:00–13:00 CEST today).

### Missing slots
```
2026-04-03 08:00 — MISSING
2026-04-03 09:00 — MISSING
2026-04-03 10:00 — MISSING
2026-04-03 11:00 — MISSING
2026-04-03 12:00 — MISSING
```
**5 of 6 hourly slots missing.** Only 13:00 is covered (by the manual runs at 13:14–13:15).

### Overall audit status: `fail`
- The audit mechanism itself **works correctly** — it accurately detects and reports gaps.
- The **reporting is reliable from a tooling standpoint**, but the underlying cadence is completely manual-only.
- State history shows all runs on 2026-04-02 were also manual (clustered around 11:19–13:47), not spread across clock hours.
- Daily ticket reminder: seen for 2026-04-03 ✅ (fired at 13:14).

### Root cause
No external scheduler (cron, systemd, OpenClaw heartbeat) triggers reminder-heartbeat.js at real clock hours. All prior runs are manual or QA-triggered, leading to clustering rather than true hourly cadence.

**Status: PARTIAL** — audit tooling works; reliability gap confirmed as scheduler-only, same root cause as BCQA-002.

---

## Summary Table

| Bug ID | Title | Verdict | Action |
|--------|-------|---------|--------|
| BCQA-002 | Reminder system scheduling | **PARTIAL** | External scheduler still needed |
| BCQA-003 | SearchAction schema | **PASS ✅** | Closed — schema clean |
| BCQA-005 | Proof visibility sweep | **PARTIAL** | Concrete proof buried; surface mini-case on homepage |
| BCQA-006 | Hourly reporting reliability | **PARTIAL** | Audit works; scheduler still missing (shared root with BCQA-002) |

---

## Recommended next actions

1. **BCQA-002 + BCQA-006 (shared fix):** Wire a real scheduler. Options:
   - OpenClaw heartbeat HEARTBEAT.md entry to call `node bertlclaw-tools/reminder-heartbeat.js`
   - System cron: `0 * * * * cd /home/dominic/.openclaw/workspace && node bertlclaw-tools/reminder-heartbeat.js >> logs/cron.log 2>&1`
   - Both bugs should be closed together once the scheduler is confirmed running over multiple clock hours.

2. **BCQA-005:** Move at least one concrete proof element (a mini-case teaser or a Deliverables preview card) to the homepage hero area or immediately after it. The current trust strip is good but abstract.

3. **BCQA-003:** No further action needed. ✅
