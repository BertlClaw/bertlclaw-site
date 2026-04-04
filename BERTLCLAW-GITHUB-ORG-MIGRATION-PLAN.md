# BertlClaw GitHub Organization Migration Plan

## Why This Matters Commercially

A personal GitHub account (`github.com/BertlClaw`) signals a hobbyist or individual freelancer.
A GitHub Organization (`github.com/BertlClaw` as an Org) signals a structured business entity — even if it's one person behind it.

Key commercial differences:
- Org profile README lives in `.github/profile/README.md` → no naming conflict with BertlClaw/BertlClaw
- Team/access management (relevant when collaborators are added)
- Investors, enterprise clients, and procurement systems look for Org accounts
- Org-level verified domain adds trust signal (green checkmark)
- Org repos get cleaner separation of concerns: website, tools, assets, client work

---

## The Naming Conflict — Resolved

The GitHub Support ticket confirmed: `BertlClaw/BertlClaw` and `BertlClaw/bertlclaw` are **the same repo** due to case-insensitivity. This is a hard GitHub platform limitation.

**Migrating to an Organization eliminates this problem entirely:**
- Org profile README: `BertlClaw/.github` → `profile/README.md`
- Website repo: `BertlClaw/website` or `BertlClaw/bertlclaw-site` — clean, no conflict
- No need to ever fight GitHub's case-insensitivity again

---

## Migration Architecture

### Before (personal account)
```
github.com/BertlClaw (personal)
├── BertlClaw/BertlClaw   ← profile repo (conflicts with website name)
└── BertlClaw/bertlclaw-site  ← website (workaround name)
```

### After (GitHub Organization)
```
github.com/BertlClaw (organization)
├── BertlClaw/.github/profile/README.md  ← org profile (no naming conflict)
├── BertlClaw/website  ← main website repo, served at bertlclaw.at
├── BertlClaw/tools    ← internal tooling (private or public)
└── BertlClaw/assets   ← brand assets (optional, can be private)
```

---

## Step-by-Step Migration

### Phase 1: Prepare (before creating the Org)

1. **Register a new personal GitHub account** for Dominic Reisenbichler personally
   - e.g., `github.com/dominicreisenbichler` or `github.com/d-reisenbichler`
   - This becomes the personal developer account; BertlClaw becomes the brand Org
   - Note: GitHub does not allow converting a personal account to an Org *and* keeping the same username on a new personal account simultaneously. You must rename the personal account first OR use a different personal username.

2. **Option A — Rename personal account first (recommended):**
   - Go to github.com/settings → change username from `BertlClaw` to something like `bertlclaw-dominic` temporarily
   - Create the `BertlClaw` Organization
   - Transfer repos from personal to Org
   - Done

3. **Option B — Create new personal account first:**
   - Create `dominicreisenbichler` personal account
   - Convert `BertlClaw` personal to Org (Settings → Convert to Organization)
   - GitHub will ask for a new "owner" account — use the new personal account

   **Recommended: Option B** — cleanest, no temp username juggling.

### Phase 2: Convert or Create Organization

1. Go to: `https://github.com/settings/organizations`
2. Click "Convert [BertlClaw] to organization" — OR — create a new org named `BertlClaw` after renaming the personal account
3. Set the new personal account as the Org owner
4. Set billing email

### Phase 3: Set Up Org Profile

1. Create repo: `BertlClaw/.github`
2. Create file: `.github/profile/README.md`
3. Content: use the draft from `GITHUB-PROFILE-README-DRAFT.md`
4. This is the org-level public profile — visible at `github.com/BertlClaw`

### Phase 4: Migrate Website Repo

1. Create repo: `BertlClaw/website` (or keep `bertlclaw-site` — both work)
2. Push all current workspace HTML/assets to it
3. Enable GitHub Pages on the repo → serves at `bertlclaw.at` via CNAME
4. Delete or archive `BertlClaw/bertlclaw-site` (or rename cleanly)

### Phase 5: Verify Domain on Org

1. Go to Org Settings → Verified domains
2. Add `bertlclaw.at`
3. Follow DNS TXT verification steps
4. Result: green verified badge on Org profile — strong trust signal

### Phase 6: Update All References

After migration, update:
- `CNAME` file (stays `bertlclaw.at`)
- GitHub profile settings (bio, location, website URL)
- All `sameAs` JSON-LD entries in HTML files → already use `https://github.com/BertlClaw` (stays the same)
- `BERTLCLAW-METADATA.md`, `GITHUB-BRAND-ASSETS.md`, `GITHUB-LIVE-CHECKLIST.md`

---

## Timing Recommendation

| Phase | When | Effort |
|---|---|---|
| Phase 1–2: Personal account + Org setup | Now or next 1–2 weeks | 30 min |
| Phase 3: Org profile README | Immediately after | 15 min |
| Phase 4: Website repo migration | Same day | 1 hour |
| Phase 5: Domain verification | Same day | 15 min |
| Phase 6: Reference updates | Ongoing, most already done | 30 min |

Total migration effort: **~2–3 hours**
Commercial upside: significant and permanent.

---

## What NOT to Do

- Do not rename repos to avoid the case conflict — it's a dead end
- Do not abandon `bertlclaw.at` custom domain — it's the right long-term URL
- Do not create an org with a different name — `BertlClaw` is the brand
- Do not rush the personal account creation — think through the username you want to keep long-term

---

## Post-Migration Checklist

- [ ] New personal GitHub account created (Dominic Reisenbichler)
- [ ] BertlClaw Org created with personal account as owner
- [ ] `.github/profile/README.md` live with correct content
- [ ] Website repo live, GitHub Pages serving `bertlclaw.at`
- [ ] Org domain `bertlclaw.at` verified (green badge)
- [ ] Org bio, location, website field all set
- [ ] Old personal account (if kept) renamed to non-brand username
- [ ] All internal docs updated to reflect Org URL structure

---

## Long-Term Org Structure (12–24 months)

As BertlClaw grows, the Org cleanly accommodates:

```
BertlClaw/website       ← public-facing site (bertlclaw.at)
BertlClaw/.github       ← org profile README
BertlClaw/tools         ← internal automation (private)
BertlClaw/templates     ← reusable project templates
BertlClaw/client-work   ← private client repos (if applicable)
BertlClaw/docs          ← public knowledge base (optional)
```

This is the architecture of a real business — not a personal project.

---

## Summary

**The migration is ~2–3 hours of work, eliminates the naming conflict permanently, and transforms BertlClaw from "person's GitHub" to "brand's GitHub" — which matters commercially, for SEO entity recognition, and for any future investment or partnership conversations.**

Do it once, do it right, never touch it again.
