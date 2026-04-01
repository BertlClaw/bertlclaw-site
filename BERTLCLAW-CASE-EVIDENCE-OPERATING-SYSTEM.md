# BERTLCLAW CASE & EVIDENCE OPERATING SYSTEM

Purpose: make proof production the default side effect of every BertlClaw project.

This document turns the existing proof principles into a practical operating system: folder conventions, required evidence, publication stages, roles, naming rules, and starter artifacts.

It is designed to solve the usual failure mode:

> good work gets delivered, but reusable proof is lost because nobody captured the before state, approvals are unclear, files are scattered, and publication prep happens too late.

---

## 1. Core rule

Every BertlClaw client project should create **two outputs at once**:

1. the client deliverable
2. the internal proof asset set

If a project is finished but its proof pack is missing, the project is operationally incomplete.

---

## 2. Standard project structure

Create every new proof-relevant project inside:

`bertlclaw-proof/projects/YYYY/client-or-alias-project-slug/`

Recommended example:

`bertlclaw-proof/projects/2026/alpenhof-landingpage-refresh/`

Inside that folder, use this exact structure:

```text
bertlclaw-proof/
  projects/
    YYYY/
      client-or-alias-project-slug/
        00-admin/
        01-intake/
        02-before/
        03-work/
        04-after/
        05-evidence-pack/
        06-approval/
        07-publication/
        08-archive/
        README.md
        project.yaml
```

### Folder purpose

#### `00-admin/`
Commercial and control documents.

Use for:
- internal status notes
- timeline snapshots
- scope notes
- project IDs
- invoice / proposal references if needed
- redaction notes

#### `01-intake/`
Starting context captured at kickoff.

Use for:
- original client brief
- raw notes
- links list
- initial goals
- baseline questions
- source materials provided by client

#### `02-before/`
Protected before-state evidence.

Use for:
- screenshots of old website / hero / sections
- copied old text blocks
- structure captures of docs / boards / folders
- archived URLs
- notes on the visible problem

This folder is what makes honest before/after possible.

#### `03-work/`
Working materials generated during execution.

Use for:
- drafts
- wireframes
- rewrite options
- outline versions
- audits
- message maps
- HTML drafts

#### `04-after/`
Final client-facing outputs.

Use for:
- final text files
- approved wireframes
- final screenshots
- final HTML
- exported deliverables
- link to final live page

#### `05-evidence-pack/`
Internal proof assembly layer.

Use for:
- mini-case draft
- before/after comparison tables
- selected screenshots for proof
- proof bullets
- visible-difference summary
- claim safety check

This is the core conversion layer from delivery to reusable proof.

#### `06-approval/`
Publication permissions and boundaries.

Use for:
- approval requests
- granted permissions
- approved assets list
- restrictions and exclusions
- anonymization instructions

#### `07-publication/`
Ready-to-publish versions derived from the evidence pack.

Use for:
- website mini-case copy
- portfolio card copy
- social post draft
- newsletter / email proof snippet
- reusable proof bullets
- image asset selection

#### `08-archive/`
Old versions, rejected material, deprecated exports.

Use for:
- superseded drafts
- extra raw files
- old exports no longer in active use

---

## 3. Required files in every project

Each project should have these files at minimum:

- `README.md`
- `project.yaml`
- `05-evidence-pack/mini-case.md`
- `05-evidence-pack/proof-summary.md`
- `06-approval/approval-status.md`
- `07-publication/publication-plan.md`

Without these, the project is not publication-ready.

---

## 4. Mandatory evidence standard

Every proof-relevant project should end with at least:

### Minimum proof pack
- 1 short starting-context summary
- 1 clearly described bottleneck
- 1 deliverables list
- 1 visible-difference summary
- 2 to 4 screenshots or equivalent evidence files
- 1 before/after text or structure comparison
- 1 publication status
- 1 approval status

### Strong proof pack
- annotated before/after screenshots
- selected text diffs
- deliverable gallery candidates
- quote or client comment with permission
- live URL or final implementation reference
- channel-specific publication variants

---

## 5. Naming rules

Keep names boring, stable, and sortable.

### Project folder slug
Format:
`client-or-alias-project-slug`

Examples:
- `alpenhof-landingpage-refresh`
- `studio-nova-positioning-rewrite`
- `anon-coach-offer-clarity`

### File naming
Prefix time-sensitive files where sequence matters:

- `2026-04-01-kickoff-notes.md`
- `2026-04-02-homepage-before-hero.png`
- `2026-04-04-headline-options-v1.md`
- `2026-04-08-final-homepage-hero.png`

### Screenshot naming
Use:
`YYYY-MM-DD-surface-state-detail.ext`

Examples:
- `2026-04-02-home-before-hero.png`
- `2026-04-08-home-after-hero.png`
- `2026-04-08-offer-after-faq.png`

This makes proof comparison easier and reduces ambiguity later.

---

## 6. Project lifecycle workflow

## Stage 1 — intake
At kickoff:
- create the project folder from template
- fill `project.yaml`
- capture business context
- define likely publishability level
- list missing before-state assets immediately

## Stage 2 — before capture
Before making major edits:
- capture screenshots
- save old copy
- save structure snapshots
- note the visible weakness in plain language

No before capture = weaker future proof.

## Stage 3 — work capture
During execution:
- save meaningful intermediate drafts
- keep only key reasoning artifacts, not every scrap
- note what actually changed the quality level

## Stage 4 — after capture
At delivery or completion:
- save final visuals and outputs
- write deliverables list
- describe visible difference
- note what is safe to claim

## Stage 5 — evidence assembly
Inside `05-evidence-pack/`:
- draft the internal mini-case
- choose strongest proof assets
- produce one compact summary someone could reuse later without re-reading the whole project

## Stage 6 — approval
Inside `06-approval/`:
- record current publication rights
- request missing permissions
- document limits exactly

## Stage 7 — publication
Inside `07-publication/`:
- adapt approved proof for website, portfolio, social, sales, and proposals
- do not improvise from memory
- only publish from approved assets and approved wording

---

## 7. Publication status model

Each project gets two statuses:

### A. Evidence completeness
- `missing`
- `minimum`
- `strong`
- `premium`

### B. Publication permission
- `internal-only`
- `anonymous-public`
- `partially-identified-public`
- `fully-public`

These should live in `project.yaml` and `06-approval/approval-status.md`.

---

## 8. Evidence-to-publication conversion logic

One completed project should feed multiple assets.

### Internal source asset
`05-evidence-pack/mini-case.md`

### Derivative publication outputs
- website mini-case
- proposal proof snippet
- sales call supporting bullet list
- portfolio card
- social post draft
- deliverable-gallery example
- internal “best proof” library inclusion

This means BertlClaw should think in **proof atoms**, not just full case studies.

Useful proof atoms:
- a better hero before/after
- a stronger CTA block
- a cleaned-up offer structure
- a documented board / folder system
- a crisp problem framing sentence
- a short client-approved quote

---

## 9. What makes a project proof-worthy

A project is publication-valuable if at least one of these is true:

- the before/after difference is visually obvious
- the text quality improvement is easy to demonstrate
- the deliverables are unusually concrete or premium
- the project solves a familiar client problem clearly
- the structure/system design is elegant enough to showcase
- the final artifact explains BertlClaw’s value better than abstract positioning does

Not every project needs to become a big case study.
But most useful projects should yield at least one reusable proof atom.

---

## 10. Redaction and safety standard

Before anything leaves internal folders, check:

- names removed where required
- logos removed where required
- emails / phone numbers hidden
- analytics / sales numbers only included if verified and permitted
- internal comments removed
- screenshots cropped to proof-relevant content only

If unsure, default to anonymized and narrower publication.

---

## 11. Weekly proof ops habit

Once per week, review active or recently closed projects and ask:

- which projects are missing before-state capture?
- which have final deliverables but no evidence pack?
- which have evidence packs but no approval request?
- which are approved but not yet converted into publication assets?
- which proof atoms belong in a shared gallery/library?

This prevents proof debt from piling up.

---

## 12. Shared reusable libraries

Use these shared directories:

```text
bertlclaw-proof/
  library/
    proof-atoms/
    deliverable-gallery/
    claims/
    approvals/
  templates/
```

### `library/proof-atoms/`
Small reusable examples extracted from projects.

### `library/deliverable-gallery/`
Showcase-ready examples of concrete outputs.

### `library/claims/`
Safe phrasing, proof-backed result language, and banned risky claims.

### `library/approvals/`
Standard approval wording and permission checklists.

---

## 13. Operating discipline

The business point is simple:

BertlClaw should never again need to ask:

> “Did we save any screenshots?”
> “What exactly changed?”
> “Can we publish this?”
> “Where is the final approved wording?”

The system should answer those questions by default.

That is how proof becomes compounding business infrastructure instead of occasional cleanup work.
