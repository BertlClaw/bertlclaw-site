# BertlClaw live 404 diagnosis — 2026-04-10

## Scope
Diagnosed why some URLs exist locally in `/home/dominic/.openclaw/workspace` but return 404 on `https://bertlclaw.at/` via GitHub Pages.

## Findings

### 1) Primary cause: local repo is far ahead of the published branch
- Local `HEAD`: `d119cfb`
- Remote `site/main`: `da4dd73`
- Local branch is **ahead by 149 commits**.
- That alone explains why many local URLs are not live yet.

Examples checked:
- `landingpage-oldenburg.html` exists locally but is **missing on remote main**.
- `landingpage-oldenburg-unternehmensberater.html` exists locally but is **missing on remote main**.
- `landingpage-muenchen.html` exists locally but is **missing on remote main**.
- `blog/index.html` exists locally but is **missing on remote main**.

Live checks confirmed:
- `https://bertlclaw.at/` -> 200
- `https://bertlclaw.at/services.html` -> 200
- `https://bertlclaw.at/landingpage-oldenburg.html` -> 404
- `https://bertlclaw.at/landingpage-muenchen.html` -> 404
- `https://bertlclaw.at/blog/` -> 404

### 2) Secondary cause: some pages are only present locally as untracked files
These will never publish until explicitly added + committed + pushed.

Confirmed untracked examples:
- `landingpage-berlin.html`
- `landingpage-muenchen.html`
- `blog/freelancer-burnout-vermeiden.html`
- `blog/spin-off-gruendung-website.html`
- `blog/wissenschaftler-selbststaendig-machen.html`

So there are two different mismatch modes:
1. tracked locally but not pushed yet
2. not even tracked in git yet

### 3) Live sitemap is stale and still points to old GitHub Pages subpath URLs
Local `sitemap.xml` uses canonical custom-domain URLs like `https://bertlclaw.at/...`.

But live `https://bertlclaw.at/sitemap.xml` currently serves old entries such as:
- `https://bertlclaw.github.io/bertlclaw/`
- `https://bertlclaw.github.io/bertlclaw/services.html`

This is a strong signal that the currently published Pages artifact is old / from an earlier branch state and does not reflect the local workspace.

### 4) Canonical / www setup does not look like the main 404 cause
Local files checked (`index.html`, `services.html`, `preise.html`, `ueber-bertlclaw.html`, `blog/index.html`, sample landing pages) consistently point to:
- canonicals on `https://bertlclaw.at/...`
- `og:url` on `https://bertlclaw.at/...`

Live check:
- `https://www.bertlclaw.at/` resolves to `https://bertlclaw.at/`

So www/non-www is not the main problem here.

## Safe repo-side fix applied
Added tracked `CNAME` file with:

```text
bertlclaw.at
```

Reason:
- GitHub Pages custom-domain config currently appears to rely on repo/settings state rather than a committed marker.
- Adding `CNAME` makes deploy intent explicit and helps preserve custom-domain correctness across future Pages publishes.

## Fix plan Dominic can apply today

### A. Publish the actual site state first
1. Review which of the 149 local commits should go live now.
2. Push the intended branch (`main`) to GitHub.
3. In GitHub repo settings, verify Pages is publishing from the correct branch/root.
   - Expected likely source: `main` / root
   - There is no `docs/` setup and no `.github/workflows` Pages deploy workflow in this repo.

### B. Add missing files that currently exist only locally
Before pushing, explicitly `git add` the pages that should be live but are still untracked.
Priority examples:
- `landingpage-muenchen.html`
- `landingpage-berlin.html` (if intended to exist live now)
- `blog/index.html` already tracked locally, but blog posts are not
- `blog/freelancer-burnout-vermeiden.html`
- `blog/spin-off-gruendung-website.html`
- `blog/wissenschaftler-selbststaendig-machen.html`

### C. Regenerate / verify sitemap against tracked published files only
The current local sitemap includes URLs for pages that are not tracked yet (and therefore would still 404 after a push).
Today’s practical rule:
- either add the referenced files before deploy
- or remove not-yet-tracked URLs from `sitemap.xml` before deploy

### D. After push, verify these specific URLs
- `/sitemap.xml` should show `https://bertlclaw.at/...`, not `bertlclaw.github.io/...`
- `/blog/`
- `/landingpage-muenchen.html`
- `/landingpage-oldenburg.html`
- one newly-added blog post
- one tracked city/profession page

## Bottom line
Most likely live 404 mismatch is **not DNS** and **not canonical confusion**.
It is primarily a **deployment/state mismatch**:
- published GitHub Pages branch is old
- local repo is 149 commits ahead
- some expected pages are still untracked locally
- live sitemap is stale and from the old GitHub Pages path era
