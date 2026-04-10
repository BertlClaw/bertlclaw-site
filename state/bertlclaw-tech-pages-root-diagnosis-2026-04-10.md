# BertlClaw GitHub Pages root diagnosis — 2026-04-10

## What was checked
- Local repo root on `main` / `origin/main`
- `site/main` remote branch contents
- Live responses from:
  - `https://bertlclaw.at/`
  - `https://bertlclaw.at/sitemap.xml`
  - `https://bertlclaw.at/services.html`
  - `https://bertlclaw.at/kontakt.html`

## Confirmed facts
- Local `main` and `origin/main` contain current root files including:
  - `index.html`
  - `services.html`
  - `kontakt.html`
  - `sitemap.xml`
  - `CNAME` (`bertlclaw.at`)
- Local/origin sitemap is the large current sitemap with `https://bertlclaw.at/...` URLs.
- Live `https://bertlclaw.at/sitemap.xml` is NOT that file. It is a short old sitemap pointing to `https://bertlclaw.github.io/bertlclaw/...` URLs.
- Live `https://bertlclaw.at/services.html` returns 200.
- Live `https://bertlclaw.at/kontakt.html` returns GitHub Pages 404.
- Live headers for `/`, `/services.html`, and `/sitemap.xml` all show the same GitHub Pages last-modified timestamp (`Wed, 08 Apr 2026 10:17:59 GMT`), so they are coming from one deployed Pages artifact, not random CDN mixing.
- `site/main` contains an older site version using `bertlclaw.github.io/bertlclaw-site/...`, but the live sitemap is even older/different (`.../bertlclaw/...`).

## Most likely cause
The custom domain `bertlclaw.at` is currently attached to the wrong GitHub Pages publication source.

Most plausible variants:
1. GitHub Pages settings for `BertlClaw/bertlclaw-site` are publishing from a different branch/artifact than `origin/main`.
2. The custom domain is attached to a different repo/site deployment (likely an older `bertlclaw` Pages site), while this repo now contains the intended site.
3. Less likely but possible: Pages is publishing from a stale Actions deployment artifact rather than current branch root.

## Why this is probably NOT the cause
- Not a simple CDN delay: live files consistently reflect the older artifact and `kontakt.html` is absent.
- Not a root-file absence in this repo: `kontakt.html` exists locally and in `origin/main`.
- Not a Jekyll underscore/include problem: the missing file is a normal root HTML file, and the wrong sitemap content indicates wrong source publication rather than Jekyll filtering.
- `.nojekyll` is not justified as the primary fix here; it would not explain an old 10-URL sitemap from another site source.

## Repo-side fix implemented
- No repo-side publishing fix was made.
- Reason: the evidence points to GitHub Pages settings / attached source mismatch, not a safe static-file issue inside this branch.

## Practical next check outside repo
In GitHub Pages settings for the live repo/domain, verify:
- publishing source = this repository
- source branch = `main` and folder = `/ (root)`
  OR confirm the active GitHub Actions Pages deployment comes from this repo and latest commit
- custom domain = `bertlclaw.at` attached to the correct site only
- no older repo/project still claims the same custom domain

## Bottom line
This repo looks structurally correct for root publishing. The live domain is almost certainly serving an older/different Pages deployment source than `origin/main`.
