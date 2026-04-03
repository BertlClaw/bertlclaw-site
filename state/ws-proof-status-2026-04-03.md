# BertlClaw Proof/Cases Workstream Status — 2026-04-03

**Workstream:** Proof & Evidence  
**Date:** 2026-04-03  
**Operator:** Subagent (bertlclaw-ws-proof)

---

## Summary

Full proof system audit completed. All core proof documents reviewed, proof artifact library inventoried, proof.html improved.

---

## Files Reviewed

| File | Status |
|------|--------|
| BERTLCLAW-PROOF-SYSTEM.md | ✅ Complete and operational |
| BERTLCLAW-PROOF-OPS-CHECKLIST.md | ✅ Complete — template ready for use per project |
| BERTLCLAW-PUBLISHABLE-PROOF-COLLECTION-PLAN.md | ✅ Complete — 3 proof pack tiers defined |
| BERTLCLAW-EXTERNAL-CORROBORATION-PLAN.md | ✅ Complete — phases 1–3 defined, Phase 1 (GitHub) primary |
| BERTLCLAW-CLAIM-SUBSTANTIATION-AND-PROOF-USAGE-CHECKLIST-2026-04-02.md | ✅ Complete — 4-level claim ladder defined |
| BERTLCLAW-PROOF-PUBLICATION-RELEASE-CHECK-2026-04-02.md | ✅ Complete — 4 release tiers with operator flow |

---

## Proof Library Inventory

### bertlclaw-proof/library/approvals/
- PROOF-APPROVAL-REGISTER.md — ✅ operational spec
- proof-approval-register.csv — ✅ 3 example rows (BPA-0001 to BPA-0003), all correct
- APPROVAL-REQUEST-TEMPLATE.md — ✅ present
- PROOF-APPROVAL-ROW-TEMPLATE.md — ✅ present

### bertlclaw-proof/library/claims/
- SAFE-CLAIMS.md — ✅ clean, usable

### bertlclaw-proof/library/proof-atoms/
- PROOF-ATOMS-CATALOG.md — ✅ 7 atom types defined with metadata requirements

### bertlclaw-proof/library/deliverable-gallery/
- DELIVERABLE-GALLERY-CARDS.md — ✅ 6 card types with proof requirements

### bertlclaw-proof/library/publication/
- PUBLISHABLE-CASE-SCORECARD.md — ✅ 10-category scoring model (24+ = publishable)
- PROOF-DEPLOYMENT-MAP.md — ✅ present
- WORKED-REVIEW-INTERNAL-MINI-CASE.md — ✅ present

### bertlclaw-proof/templates/
- All 8 templates present and functional

### bertlclaw-proof/projects/2026/
- `_project-template` — ✅ present (no real projects yet)

---

## Ready to Publish vs Still Draft

### Ready to publish (with current assets)
| Item | Type | Status | Notes |
|------|------|--------|-------|
| Mini-Case: Landingpage geschärft | Anonymized demo | ✅ Website-safe | Already on proof.html; no real client data |
| Mini-Case: Positionierung verdichtet | Anonymized demo | ✅ Website-safe | Already on proof.html |
| Mini-Case: Digitale Ordnung | Anonymized demo | ✅ Website-safe | Already on proof.html |
| Deliverable Gallery (6 card types) | Internal demonstrator | ✅ Publishable as method proof | Cards documented in library |
| Safe Claims Library | Generic phrasing | ✅ Always safe | No client info; pure copy guidance |
| Proof-Logik explanation | Meta content | ✅ Published | On proof.html |

### Still draft / internal only
| Item | Type | Gap | Action needed |
|------|------|-----|---------------|
| BPA-0001 (WhatsApp feedback) | Real testimonial | Approval not requested | Request explicit wording + surface approval from client |
| BPA-0002 (Anon screenshot) | Conditional | Final review required before pub | Run re-identification check, then publish |
| BPA-0003 (Named proposal ref) | Partial/proposal-only | Not website-safe | Keep to proposals only; never publish publicly |
| Real project files | None yet | No real projects in bertlclaw-proof/projects/2026/ | Populate with first real client project |

---

## proof.html Improvements Made

### Problem identified
The hero/above-the-fold section had only text (lead paragraph + note box). The strongest evidence (Vorher/Nachher comparisons) was buried further down in the mini-cases section.

### Change made
Added a 3-column grid of compact Vorher/Nachher comparison cards directly inside the hero panel, immediately below the lead paragraph and above the note box. Each card shows:
- A before/after code snippet (the most immediately readable evidence type)
- A one-sentence summary of the visible difference
- Covers all 3 BertlClaw offer types (Landingpage, Digitale Ordnung, Copy/Positionierung)

### Result
Visitors now see concrete evidence within the first visible screen, without needing to scroll. The strongest proof type (text diff) surfaces above the fold.

---

## External Corroboration Status (from BERTLCLAW-EXTERNAL-CORROBORATION-PLAN.md)

Phase 1 (GitHub) and Phase 2 (LinkedIn/Gravatar) are documented but require human action:
- GitHub profile README: drafted (GITHUB-PROFILE-README-DRAFT.md exists) — needs pushing to GitHub
- LinkedIn About/Featured: not yet verified — needs Dominic to update manually
- Gravatar: no status documented — needs setup

**Not actioned here** — requires Dominic's manual steps on external platforms.

---

## Claim Safety Assessment

All current public claims on proof.html are Level 1–2 (work description + visible difference). No Level 4 outcome claims exist. System is compliant with BERTLCLAW-PROOF-SYSTEM.md hard rules.

---

## Next Actions for Dominic

1. **First real project**: When a client project completes, use `bertlclaw-proof/templates/PROJECT-SETUP-CHECKLIST.md` to capture before-material. Run scorecard. Aim for 18+ points before publishing.
2. **BPA-0002 screenshot**: Run re-identification check, then flip to published on proof page.
3. **GitHub README**: Push `GITHUB-PROFILE-README-DRAFT.md` content to GitHub profile.
4. **LinkedIn**: Update About section and add Featured link to bertlclaw site.
5. **Populate proof register**: As real projects complete, add CSV rows to `proof-approval-register.csv`.

---

## Workstream Health

| Area | Status |
|------|--------|
| Proof system docs | ✅ Complete |
| Claim discipline | ✅ Strong |
| Publication gates | ✅ Operational |
| Real client cases | ⚠️ None yet — templates ready |
| External corroboration | ⚠️ Documented but requires manual action |
| proof.html quality | ✅ Improved (strongest evidence now above fold) |
