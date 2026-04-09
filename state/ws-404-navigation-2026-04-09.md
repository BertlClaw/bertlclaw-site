# State: Custom 404 Recovery Page
Date: 2026-04-09
Status: ✅ DONE

## What changed
- Added a new root-level `404.html` for GitHub Pages.
- Built it in the existing BertlClaw visual style so error traffic still feels trustworthy and on-brand.
- Added clear recovery actions:
  - Startseite
  - Leistungen
  - Proof
  - Anwendungsfälle
  - FAQ
  - Kontakt
  - Browser "Zurück" fallback button
- Added a small script that shows the missing requested path to reduce confusion when someone lands via an old or mistyped URL.
- Included GoatCounter so 404 traffic can still be measured.
- Added `noindex, follow` so the error page itself should not compete in search results.

## Why it matters
Before this, broken or outdated links had no branded recovery path. On a static GitHub Pages site, a proper `404.html` is a small technical fix with outsized UX value: fewer dead ends, better trust, and more chances to recover lost visitors.

## Validation
- Parsed `404.html` successfully with Python's HTML parser ✅
- Checked all local links on the new page: no missing targets ✅

## Next opportunities
- Review GoatCounter for recurring missing URLs and add redirects or internal links if patterns appear.
- If the custom domain supports it later, consider redirect rules for the most common legacy paths.
