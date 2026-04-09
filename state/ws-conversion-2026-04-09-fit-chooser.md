# State: ws-conversion-2026-04-09-fit-chooser
Date: 2026-04-09
Status: ✅ DONE

## What changed
- Added a new homepage section on `index.html`: **"Unsicher, womit du starten sollst?"**
- Built a 3-option conversion helper for the main entry offers:
  - Landingpage Sprint
  - Positionierung & Website-Texte
  - Digitale Ordnung & Klarheit
- Added a sticky preview panel that updates the recommended start, expected outcome, and focus points.
- Connected the chooser to the existing contact form:
  - preselects the matching `topic`
  - prefills the message textarea with a relevant starter text
  - sets `lead_entry` to a source-specific value for attribution

## Why it matters
The homepage already had trust and offer framing. The bigger friction left was **decision paralysis**: visitors may like the site but not know which entry point fits them. This chooser reduces cognitive load and makes the next step feel smaller and more obvious, which should improve qualified form starts.

## Validation
- Inline homepage JavaScript syntax checked with `node --check` ✅
- Reviewed diff for `index.html` to verify the new section, styles, and form-prefill wiring ✅

## Next opportunities
- Track which `lead_entry` values convert best in Formspree / downstream lead logs
- Add the same chooser concept to `services.html` or `kontakt.html` if it performs well
- Consider adding one more option for "Ich bin mir noch gar nicht sicher" if many visitors still hesitate
