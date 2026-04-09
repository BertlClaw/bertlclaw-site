# State: DE Unternehmensberater Metadata Cleanup (Batch 1 Fix)
Date: 2026-04-09
Status: ✅ DONE

## Goal
Clean up the incorrect self-referencing SEO metadata on the earlier DE `unternehmensberater` batch-1 pages that were accidentally pointing at `hr-berater` URLs.

## Pages Fixed (5)
- landingpage-aachen-unternehmensberater.html
- landingpage-bergisch-gladbach-unternehmensberater.html
- landingpage-bielefeld-unternehmensberater.html
- landingpage-bochum-unternehmensberater.html
- landingpage-bottrop-unternehmensberater.html

## What Was Fixed
On each of the 5 pages, corrected these URL targets from `...-hr-berater.html` to the page’s own `...-unternehmensberater.html` URL:
- canonical
- hreflang `de`
- hreflang `x-default`
- Open Graph `og:url`
- JSON-LD `url`

## Validation
- Confirmed each page now contains its own `unternehmensberater` URL in canonical, hreflang, and `og:url`
- Confirmed no residual `-hr-berater.html` metadata target remains in any of the 5 fixed pages
- Reviewed git diff to ensure only the intended metadata/self-URL fields changed

## Remaining Follow-up
- Check other previously generated `unternehmensberater` pages for similar copied metadata mistakes outside this batch-1 set
- Continue remaining DE `unternehmensberater` gap-fill cities from the latest gap list once metadata cleanup is considered stable
