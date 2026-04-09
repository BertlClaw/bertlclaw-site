# State: DE Interim Manager Batch 1
Date: 2026-04-10
Status: ✅ DONE

## Taxonomy Choice
- Chosen public slug family: `interim-manager`
- Reason: this repo already uses singular profession-style hyphen slugs for established role names such as `social-media-manager`; `interim-manager` is the cleanest search-facing role slug, while `Interimsmanagement` is used naturally in body copy and cluster descriptions.
- Resulting rollout model:
  - Core profession page: `landingpage-interim-manager.html`
  - Local companion pages: `landingpage-<city>-interim-manager.html`

## Pages Added (6)
- landingpage-interim-manager.html
- landingpage-kiel-interim-manager.html
- landingpage-krefeld-interim-manager.html
- landingpage-leverkusen-interim-manager.html
- landingpage-luebeck-interim-manager.html
- landingpage-magdeburg-interim-manager.html

## Navigation / Index Updates
- landingpage-kiel.html — added local internal link card to the new Interim-Manager page
- landingpage-krefeld.html — added local internal link card to the new Interim-Manager page
- landingpage-leverkusen.html — added local internal link card to the new Interim-Manager page
- landingpage-luebeck.html — added local internal link card to the new Interim-Manager page
- landingpage-magdeburg.html — added local internal link card to the new Interim-Manager page
- landingpages.html — added `Interim-Management-Cluster: erste DE-Batch` section featuring the core page plus the 5 local pages
- sitemap.xml — appended all 6 new URLs with lastmod `2026-04-10`
- bertlclaw-tools/generate-interim-manager-batch1.py — helper generator for this first rollout batch

## Validation
- Checked local href/src targets across all 6 new pages, the 5 touched city pages, and `landingpages.html`
- Result: **0 missing local links**
- Verified canonical, `og:url`, and JSON-LD self URLs on all 6 newly created pages
- Verified each of the 6 new URLs appears exactly once in `sitemap.xml`

## Next Rollout Steps
- Continue the same `interim-manager` family into the next already-built DE B2B city set (e.g. Lünen, Mönchengladbach, Mülheim, Neuss, Oberhausen / then Oldenburg, Osnabrück, Rostock, Schwerin, Solingen where tracked base city pages exist)
- Consider a second-layer family only if there is evidence for distinct search demand worth separating, e.g. `interim-cfo`, `interim-ceo`, or `restrukturierungsmanager`; for now keep one clean umbrella family
- If CH/AT rollout is desired later, reuse the same slug logic and keep `Interimsmanagement` in copy rather than changing the URL taxonomy
