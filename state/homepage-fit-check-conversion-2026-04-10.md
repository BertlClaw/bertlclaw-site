# Homepage fit-check conversion improvement — 2026-04-10

## Done
- Added a new above-the-fold fit/disqualifier block on `index.html` directly under the primary homepage CTA.
- Framed it as a quick "Passt gut, wenn … / Eher nicht, wenn …" decision aid.
- Goal: reduce hesitation before contact by helping visitors self-qualify fast and by signaling that BertlClaw is not pretending to be for everyone.

## Why this change
- Pricing trust work was already done elsewhere.
- Homepage already had proof, FAQ and process further down, but a visitor still had to scroll to understand whether BertlClaw is the right kind of provider.
- This new block moves that clarity into the primary conversion path.

## Validation
- Parsed `index.html` with Python `html.parser` successfully.
- Checked homepage links/fragments locally; no broken local links found.

## Files changed
- `index.html`
