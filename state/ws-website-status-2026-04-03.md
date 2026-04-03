# BertlClaw Website Workstream Status – 2026-04-03

**Subagent:** ws-website  
**Timestamp:** 2026-04-03 13:18 CEST  
**Overall status:** 🟢 GRÜN – all autonomous fixes applied; remaining items need manual action

---

## What was done

### 1. sitemap.xml – expanded + enriched
- **Before:** 11 URLs, no `lastmod`, no `priority`, no `changefreq`
- **After:** 15 URLs with full SEO metadata
- **Added URLs:**
  - `ueber-bertlclaw.html` (was missing — important About page)
  - `landingpage-sprint.html` (was missing — service subpage)
  - `positionierung-website-texte.html` (was missing — service subpage)
  - `digital-clarity-setup.html` (was missing — service subpage)
- All entries now have `lastmod: 2026-04-03`, `priority` (1.0 for index, 0.9 for services, 0.8 for About/Proof/use-cases, 0.7 for service subpages, 0.4 for legal), `changefreq`

### 2. danke.html – noindex added
- Added `<meta name="robots" content="noindex, nofollow">` to the thank-you page
- Thank-you/confirmation pages should not be indexed (no SEO value, can confuse crawlers)

### 3. Image lazy loading – performance improvement
- Added `loading="lazy"` to all below-fold images:
  - `index.html`: 3 images (crab-core.jpg, ai-core.jpg, interface.jpg in visual section)
  - `services.html`: 2 images (interface.jpg, network-1.jpg)
  - `proof.html`: 1 image (system-map.jpg)
  - `use-cases.html`: 2 images (assistant-figure.jpg, network-1.jpg)
- Nav logo images left without lazy (above-fold, want eager loading)
- Hero images left without lazy (above-fold, want eager loading)

### 4. SEO review – verified OK
- `robots.txt`: correct (`Allow: /`, points to sitemap)
- Canonical tags: all pages have correct absolute canonical URLs
- Meta descriptions: present on all reviewed pages
- Schema.org JSON-LD: present on main pages (index, services, proof, ueber-bertlclaw)
- OG/Twitter cards: present on all pages

### 5. Deployment docs reviewed
- `GITHUB-LIVE-CHECKLIST.md`: GitHub profile setup checklist — all items require manual human action on GitHub
- `BERTLCLAW-PUBLIC-STACK-DEPLOYMENT-PACK.md`: copy/placement reference for GitHub, LinkedIn, Gravatar — all manual

---

## What still needs manual action

### HIGH PRIORITY
1. **Google Search Console property verification**
   - Add `https://bertlclaw.github.io/bertlclaw-site/` as URL-prefix property
   - Verify ownership (Google HTML tag method or file — `google636adb67c640fe50.html` already present in repo, may already be done)
   - Submit sitemap URL: `https://bertlclaw.github.io/bertlclaw-site/sitemap.xml`
   - Request indexing for: `/`, `/services.html`, `/use-cases.html`, `/landingpages.html`, `/ueber-bertlclaw.html`
   - See: `GOOGLE-SEARCH-CONSOLE-SETUP.md`

2. **GitHub profile setup** (see `GITHUB-LIVE-CHECKLIST.md`):
   - Set GitHub display name to `BertlClaw`
   - Set GitHub bio to canon copy
   - Set GitHub website field to `https://bertlclaw.github.io/bertlclaw-site/`
   - Create/update `BertlClaw/BertlClaw` profile README repo
   - Pin correct repos
   - Resolve repo-name conflict (bertlclaw vs bertlclaw-site) — noted in BRAND-MITIGATION-NOTES.md

3. **LinkedIn deployment** (see `BERTLCLAW-PUBLIC-STACK-DEPLOYMENT-PACK.md`):
   - Update About section with canon copy
   - Add Featured link to website

### MEDIUM PRIORITY
4. **Index monitoring** (see `INDEX-MONITORING-PLAN.md`):
   - Check daily for 3–7 days: `site:bertlclaw.github.io/bertlclaw-site` in Google/Bing
   - Monitor Search Console impressions once property is verified
   - Brand query: `BertlClaw` should appear once indexed

5. **`google636adb67c640fe50.html`**: This verification file exists in the repo, which is good. Confirm in Search Console that verification is complete.

### LOW PRIORITY
6. **Service subpages** (`landingpage-sprint.html`, `positionierung-website-texte.html`, `digital-clarity-setup.html`): These pages are now in sitemap but have no nav links from the main nav. Currently only linked from within content sections. Consider adding a footer or secondary nav link to these if traffic/indexing is slow.

7. **`og:site_name` and `og:locale`** missing on some secondary pages (e.g., services.html, proof.html). Low priority — present on index and About page which are most important for social sharing.

---

## Files changed
- `sitemap.xml` — expanded and enriched
- `danke.html` — noindex meta added
- `index.html` — 3 images got loading="lazy"
- `services.html` — 2 images got loading="lazy"
- `proof.html` — 1 image got loading="lazy"
- `use-cases.html` — 2 images got loading="lazy"
- `logs/bertlclaw-operations.log` — entry added
- `state/ws-website-status-2026-04-03.md` — this file

---

## SEO health summary

| Check | Status |
|---|---|
| robots.txt | ✅ OK |
| sitemap.xml | ✅ Fixed (was incomplete) |
| Canonical tags | ✅ All pages |
| noindex on thank-you page | ✅ Fixed |
| Image lazy loading | ✅ Fixed |
| Schema.org JSON-LD | ✅ Main pages covered |
| OG/Twitter cards | ✅ All pages |
| Google Search Console verified | ⚠️ Needs human action |
| Sitemap submitted to GSC | ⚠️ Needs human action |
| Index monitoring active | ⚠️ Needs human action |
| GitHub profile complete | ⚠️ Needs human action |
