# State: FAQ objection handling + CTA clarity
Date: 2026-04-09
Status: ✅ DONE

## What changed
- Updated `faq.html` to remove outdated pricing signals and align them with current entry prices.
- Added three new FAQ entries focused on conversion friction:
  - whether BertlClaw helps when the offer is still unclear
  - whether texts/design/tech must already exist
  - how to tell when BertlClaw is probably not the right fit
- Replaced the old offer teaser cards with clearer trust/filtering cards:
  - good fit
  - not a fit
  - entry-point pricing guidance
- Strengthened the final CTA band to send unsure visitors toward `kontakt.html`, `proof.html`, or `preise.html` instead of leaving them with a generic contact nudge.
- Updated FAQ schema JSON-LD so the new objection-handling content is also reflected structurally.

## Why it matters
The FAQ page is often where hesitant visitors go before contacting. This update makes the page do more conversion work: it answers objections, pre-qualifies visitors, reduces price confusion, and gives clearer next steps based on confidence level.

## Validation
- Parsed `faq.html` successfully with Python HTML parser ✅
- Reviewed git diff to confirm pricing alignment and new objection-handling sections ✅

## Notes
- This intentionally does not overlap with the homepage fit chooser, contact-page fit/pricing module, or 404 page.
