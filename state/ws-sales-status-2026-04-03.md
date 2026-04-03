# BertlClaw Sales Workstream Status — 2026-04-03

**Agent:** ws-sales subagent
**Completed:** 2026-04-03 ~13:20 CEST

---

## What Was Done

### Files Reviewed
- BERTLCLAW-SALES-OPERATING-SYSTEM.md ✅
- BERTLCLAW-OFFER-EXECUTION-LAYER.md ✅
- BERTLCLAW-OFFER-PRICING-MATRIX.md ✅
- BERTLCLAW-COMMERCIAL-PACKAGING-PLAYBOOK.md ✅
- BERTLCLAW-LEAD-PROOF-GATES.md ✅
- LEAD-TO-OFFER-WORKFLOW.md ✅
- BERTLCLAW-OFFER-CLOSE-OBJECTION-PLAYBOOK.md ✅
- BERTLCLAW-FOLLOW-UP-SEQUENCES.md ✅
- BERTLCLAW-OFFER-FOLLOWUP-AND-KICKOFF-LAYER.md ✅

### Top 3 Gaps Identified

1. **Follow-up sequences were too passive** — the existing Touch 2/3 messages just "nachfassen" without structuring a decision. The close playbook already had strong objection logic but it wasn't reflected in the sequence templates.

2. **No single quick-reference document** — knowledge was spread across 8+ files. When a live lead arrives, Dominic has no fast cheat sheet to check pricing, form, close-questions, and cadence in one place.

3. **No deal-aging / stale-lead rules in the gates system** — leads could sit at Gate 3 or 4 for weeks with no trigger to review or escalate. The Gate system defines what must be true, but not what happens when time passes without action.

---

## Changes Implemented

### 1. BERTLCLAW-FOLLOW-UP-SEQUENCES.md — Major Rewrite
- Each Touch now includes a **decision-structuring question or statement**, not just "checking in"
- Added **active objection handling** section with 4 copy-paste patterns (Preis, Timing, Scope, Interne Abstimmung)
- Touch 1 differentiated: Nudge for A-deals only, Follow-up for B/C
- Added explicit **when-to-exit table** (Section 7) per scenario
- Added rule: 3 contacts without reaction → must decide: `verloren`, `pausiert`, or direct close

### 2. BERTLCLAW-LEAD-PROOF-GATES.md — New Section 14 Added
- Gate-by-gate **maximum age thresholds** before action is required
- **Weekly stale-lead check** checklist (5 questions, recommended Monday)
- **Escalation rule**: any lead not clearly in a gate with a date → immediate re-triage
- **Faustregel**: "`offen` ohne Datum ist kein Status"

### 3. BERTLCLAW-SALES-QUICKREF.md — New File Created
- Single-page cheat sheet for live-lead moments
- Covers: A/B/C grading, offer mapping, price ranges (all 3 tiers × 3 offers), offer form selection, pre-send checklist, objection sofort-antworten, follow-up cadence table, close questions (gut vs. schlecht), stale-lead rules, downscope options, CLI shortcuts
- All cross-references to full source documents included

---

## What Needs Dominic's Input

### 1. Pricing ranges — confirm or adjust
The matrix has EUR ranges (e.g., Standard Landingpage = EUR 1.100–1.900). These should be confirmed as accurate for current market positioning. If Dominic has been quoting outside these ranges regularly, the matrix should be updated to reflect reality.

### 2. Follow-up channel preference
The sequences are written channel-agnostic. Does Dominic primarily follow up via E-Mail or WhatsApp per segment? If there's a clear pattern, the sequences could add per-channel variants (as the Sales OS already has channel standards for responses but not for follow-ups).

### 3. Wiedervorlage system
Several sequences end with "Wiedervorlage setzen" — but there's no automated reminder system tied to lead status. The `BERTLCLAW-REMINDER-SYSTEM.md` exists, but it's not integrated with lead-followup dates. This is a gap worth closing if lead volume grows: consider a simple weekly cron or heartbeat that surfaces leads with overdue `next_followup_date`.

### 4. Quick-ref card — review for accuracy
`BERTLCLAW-SALES-QUICKREF.md` is meant to be a living cheat sheet. Dominic should review and mark anything that doesn't match how he actually works day-to-day, so it stays genuinely useful rather than aspirational.

---

## Files Changed
- `BERTLCLAW-FOLLOW-UP-SEQUENCES.md` — rewritten
- `BERTLCLAW-LEAD-PROOF-GATES.md` — new Section 14 added
- `BERTLCLAW-SALES-QUICKREF.md` — new file created

## Files Read (no changes)
- All others listed above under "Files Reviewed"
