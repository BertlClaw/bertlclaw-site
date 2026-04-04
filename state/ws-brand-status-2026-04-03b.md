# Brand/GitHub Status — 2026-04-03b

**Agent:** subagent (bertlclaw-brand-update)
**Time:** 2026-04-03 ~15:57 GMT+2

## Completed

### 1. GITHUB-PROFILE-README-DRAFT.md
- All `https://bertlclaw.at/` URLs replaced with `https://bertlclaw.at/`
- Affected: Links section (Website, Leistungen, Anwendungsfälle) and Recommended GitHub profile settings Website field
- Draft is ready to publish to `BertlClaw/BertlClaw` repo as `README.md`

### 2. index.html — LinkedIn sameAs placeholder
- Added HTML comment `<!-- ADD: linkedin.com/in/[handle] once profile is live -->` inside the Organization JSON-LD `sameAs` array
- Location: line ~242 in index.html, within the `@graph` Organization block

### 3. BERTLCLAW-PUBLIC-ENTITY-CONSISTENCY-CHECKLIST.md
Marked completed:
- Primary URL updated to `bertlclaw.at/`
- URL consistency (repo URL)
- Structured data: Organization/Person relationship present, GitHub sameAs present
- LinkedIn sameAs: placeholder added (pending actual handle)
- About/Über BertlClaw page: exists and reviewed on-brand
- Operator block visible on homepage/services

### 4. ueber-bertlclaw.html — URL migration + brand review
- All GitHub Pages URLs (`bertlclaw.at/`) replaced with `bertlclaw.at/`
- Covers: canonical, OG tags, Twitter card, JSON-LD (Person, Organization, AboutPage, BreadcrumbList)
- **Content review:** Strong and on-brand. Clear operator attribution, well-structured "what it is / what it isn't / how it works" sections, good trust signals. No substantive copy changes needed.

## Pending (for human action)

- Publish GitHub profile README (`BertlClaw/BertlClaw/README.md`) manually on GitHub
- Set GitHub profile bio + website field to `https://bertlclaw.at/`
- Add LinkedIn handle to `index.html` sameAs once profile is live
- Update remaining HTML files (index.html, services.html, etc.) canonical/OG/JSON-LD URLs once domain fully resolves
- Verify domain redirect/DNS for `bertlclaw.at` → GitHub Pages is working

## Notes
- Domain `bertlclaw.at` is being set up today (2026-04-03)
- LinkedIn profile draft is in `state/linkedin-profile-draft.md` — ready to copy-paste
- All changes are local workspace edits; no external writes made
