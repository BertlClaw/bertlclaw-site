# BertlClaw Multilingual Rollout Plan

Practical multilingual strategy for the current GitHub Pages setup (`https://bertlclaw.github.io/bertlclaw-site/`).

## 1) Recommendation in one sentence

**Start DACH-first with German as the only live content language, but structure the site now so English can be added cleanly later via language subfolders and hreflang.**

That means:
- **Phase 1:** keep the current site fully German
- **Phase 2:** introduce a proper language architecture (`/de/`, later `/en/`)
- **Phase 3:** translate only high-intent pages first, not the whole site at once

---

## 2) Why this is the right strategy for BertlClaw

For BertlClaw, the near-term market is clearly **Austria / Germany / German-speaking DACH**. Launching half-translated English pages too early would likely create:
- more maintenance
- weaker message quality
- SEO duplication risk
- a diluted brand voice

Right now, the site is already positioned strongly in German and indexed from a **repo-based GitHub Pages path**:
- root: `https://bertlclaw.github.io/bertlclaw-site/`
- current pages are static `.html` files in the repo root
- sitemap is manually maintained
- no visible build pipeline / i18n framework is in place

So the sensible move is **not** “make everything multilingual now”, but:
1. lock down the future URL strategy,
2. define translation rules,
3. prepare templates/components,
4. only then add English pages where they can actually convert.

---

## 3) Recommended language model

## Phase A — now: German only, DACH-wide

Use **one main German version** for all DACH users.

Recommended language targeting:
- primary content language: **de**
- editorial tone: neutral German with light Austrian authenticity allowed
- avoid over-localizing by country too early

### Why not split immediately into `de-AT` and `de-DE`?

Because BertlClaw is still small and trust/clarity matter more than regional micro-variants.

A split into separate Austria/Germany versions only makes sense later if there are meaningful differences in:
- legal framing
- pricing / VAT treatment
- contact expectations
- wording that affects conversions
- region-specific landing pages or offers

**Recommendation:**
- keep one German source version now
- use `hreflang="de"` as the main German target
- optionally add `de-AT`, `de-DE`, `de-CH` alternates later only if actual country variants exist

## Phase B — later: add English as secondary language

English should be added **only for pages that help trust, referrals, portfolio use, or inbound from outside German search**.

Good reasons for English later:
- international referrals
- English-speaking founders in DACH
- portfolio / credibility for non-German visitors
- future expansion beyond German-speaking demand

Bad reason:
- “because multilingual sounds bigger”

---

## 4) URL structure recommendation for GitHub Pages

Because this is a **project site** under `/bertlclaw/`, the safest structure is **subfolders per language inside the repo**.

## Recommended final structure

```text
/                      -> German homepage for now (current live root)
/de/                   -> future explicit German section
/en/                   -> future English section
/de/services.html
/de/use-cases.html
/de/landingpages.html
/en/services.html
/en/use-cases.html
```

Since GitHub Pages serves static files well, this is easy to maintain.

## Practical rollout path

### Option 1 — best practical transition

**Keep current root URLs live as German canonical pages for now**, and only create `/en/` later.

Example:
- `/` = German homepage
- `/services.html` = German
- `/use-cases.html` = German
- `/en/` = English homepage later
- `/en/services.html` = English services page later

This avoids breaking current indexed URLs.

### Option 2 — cleaner long-term structure after migration

Later, if wanted:
- move German pages into `/de/`
- keep old root pages as redirects or mirrored canonical entry points

But for now this is unnecessary work and adds migration risk.

## Strong recommendation

**Do not move the current German pages into `/de/` yet.**

Instead:
- keep the current German root structure stable
- treat current root pages as the canonical German originals
- add English in `/en/` when ready
- only do a full root-to-`/de/` migration if the site grows significantly

That is the least risky path for SEO and GitHub Pages simplicity.

---

## 5) Content priority: what should be translated first

Do **not** translate everything.

Use this order:

## Tier 1 — translate first

These pages have the highest business value:
- homepage (`index.html`)
- services page (`services.html`)
- use cases (`use-cases.html`)
- the 2–3 most conversion-relevant offer pages:
  - `landingpage-sprint.html`
  - `positionierung-website-texte.html`
  - `digital-clarity-setup.html`

Why:
- they explain the offer fastest
- they matter most for referrals and qualification
- they can be kept high quality without exploding maintenance

## Tier 2 — translate only if useful

- `landingpages.html`
- `website-texte-positionierung.html`
- `ki-fuer-selbststaendige.html`
- `mvp-digitale-produktideen.html`
- `digitale-struktur-systeme.html`

These are more SEO/supporting pages. Translate them only if:
- English search demand matters,
- or they are important in sales conversations.

## Tier 3 — do not fully localize at first

- `impressum.html`
- `datenschutz.html`
- `danke.html`
- verification / utility files (`google...html`, `robots.txt`, `sitemap.xml`)

Recommendation:
- keep legal pages legally correct in German
- optionally add a short English note like: “Legally binding version is German.”
- avoid maintaining two full legal texts unless actually needed

---

## 6) Translation vs localization rules

BertlClaw should **not** be translated literally. It should be localized for trust and clarity.

## Core rule

**Translate meaning, not sentence shape.**

The German site currently relies on:
- directness
- clarity
- non-corporate tone
- practical positioning

That tone should survive translation.

## Keep unchanged across languages

These should stay stable:
- brand name: **BertlClaw**
- operator name: **Dominic Reisenbichler**
- core brand framing
- offer architecture
- visual identity
- proof/credibility structure

## Adapt per language

These should be localized:
- headlines
- CTA wording
- paragraphs and examples
- FAQ phrasing
- trust language
- “what this is / isn’t” framing

## Specific localization rules

### German (source)
- write for **DACH-wide comprehension**, not only Austria
- keep “du” voice if that is the brand voice
- avoid overly Austrian-only terms on core sales pages if they may reduce clarity for German visitors
- keep phone, WhatsApp, and email visible; these fit DACH trust expectations well

### English (future)
- do not overclaim agency scale
- avoid startup buzzword inflation
- translate offers in clear business English, not word-for-word
- prefer clarity over cleverness

Examples:
- `Landingpage Sprint` may stay branded as-is, but can be explained in English
- `Digitale Ordnung & Klarheit` should likely become something like **Digital Clarity Setup** rather than literal wording
- `Positionierung & Website-Texte` may become **Positioning & Website Copy** or **Positioning & Website Messaging** depending on the actual offer emphasis

## Offer naming rule

Use one of these patterns consistently:
1. keep German offer names and explain them in English, or
2. create true English equivalents

For BertlClaw, I recommend:
- **German page:** German offer names
- **English page:** English offer names, with internal mapping to the German originals

That reads more naturally and converts better.

---

## 7) SEO recommendation: canonical + hreflang

## Current reality

The current site already has canonicals pointing to the root-based German URLs.

That is good. Preserve this.

## When English is added

Each language page should have:
- a self-referencing canonical
- hreflang alternates to the equivalent page in the other language
- an `x-default` pointing to the main entry page

## Example for current German homepage

Current German homepage:
- canonical: `https://bertlclaw.github.io/bertlclaw-site/`

Later add:
- `hreflang="de"` -> `https://bertlclaw.github.io/bertlclaw-site/`
- `hreflang="en"` -> `https://bertlclaw.github.io/bertlclaw-site/en/`
- `hreflang="x-default"` -> `https://bertlclaw.github.io/bertlclaw-site/`

## Example head tags

```html
<link rel="canonical" href="https://bertlclaw.github.io/bertlclaw-site/" />
<link rel="alternate" hreflang="de" href="https://bertlclaw.github.io/bertlclaw-site/" />
<link rel="alternate" hreflang="en" href="https://bertlclaw.github.io/bertlclaw-site/en/" />
<link rel="alternate" hreflang="x-default" href="https://bertlclaw.github.io/bertlclaw-site/" />
```

## For inner pages

Map equivalents one to one where possible:
- `/services.html` ↔ `/en/services.html`
- `/use-cases.html` ↔ `/en/use-cases.html`
- `/landingpage-sprint.html` ↔ `/en/landingpage-sprint.html`

If there is **no true equivalent page**, do **not** hreflang-map it to a loosely related page.

## Important rule

**Canonical is not a language switch.**

Do not canonical English pages back to German pages.
Each localized page must canonicalize to itself.

---

## 8) Sitemap strategy

The current sitemap is manual and simple. Keep that approach unless the site becomes much larger.

## Recommended near-term setup

Use one sitemap containing all live URLs:
- current German URLs at root
- later English URLs under `/en/`

Example entries after English launch:
- `https://bertlclaw.github.io/bertlclaw-site/`
- `https://bertlclaw.github.io/bertlclaw-site/services.html`
- `https://bertlclaw.github.io/bertlclaw-site/en/`
- `https://bertlclaw.github.io/bertlclaw-site/en/services.html`

If the site grows, split into:
- `sitemap-de.xml`
- `sitemap-en.xml`
- sitemap index

But that is not needed yet.

---

## 9) Navigation and UX implications

## Desktop

Add a visible but low-friction language switcher in the top nav.

Recommended desktop placement:
- top right in nav actions
- labels as text, not flags

Use:
- `DE`
- `EN`

Avoid flags because:
- German is not one-country-only
- flags create ambiguity in DACH

### Desktop behavior

- switch to equivalent page if available
- otherwise switch to that language’s homepage
- keep the switcher simple and always visible

## Mobile

Do not hide language switching deep in the footer only.

Recommended mobile approach:
- language toggle near top nav or mobile menu top section
- large enough tap targets
- preserve page context where possible

For example:
- if user is on `services.html`, tapping `EN` should go to `/en/services.html` if it exists
- if not, go to `/en/`

## UX rule

**No automatic forced redirects based on browser language.**

Reasons:
- bad for SEO/debugging
- annoying for bilingual users
- can confuse Google indexing
- creates GitHub Pages static logic complexity

At most, later you could show a small non-blocking prompt like:
- “Looking for English? View English version.”

But only after English actually exists.

---

## 10) Metadata and structured data considerations

When English is added:
- translate `<title>` and meta description properly
- update `og:title`, `og:description`, Twitter tags per language page
- keep brand entity stable in JSON-LD
- translate page-level description, but do not create a different brand identity

## JSON-LD guidance

Keep:
- `name`: BertlClaw
- `founder` / operator: Dominic Reisenbichler
- same logo and same core entity IDs where appropriate

Adjust per page:
- `url`
- `inLanguage`
- page description

For localized pages, add:
- `inLanguage: "de"` or `"en"`

If separate page entities are used, ensure URL matches the actual localized page.

---

## 11) Legal and trust implications

Because BertlClaw appears operator-linked and DACH-focused, legal clarity matters more than translation breadth.

Recommendation:
- German legal pages remain primary
- English pages can link to the same legal pages
- if English traffic becomes meaningful, add short English helper text on legal-entry points
- do not create sloppy translated legal pages just for appearance

For contact forms:
- keep one form endpoint if operationally simplest
- localize labels/placeholders per language page
- keep thank-you logic language-aware later if needed (`/danke.html` and `/en/thank-you.html`)

---

## 12) Implementation plan

## Phase 0 — now

Document and prepare only:
- confirm language architecture decision
- keep German root URLs stable
- define translation glossary / naming rules
- ensure shared nav/footer blocks can be reused consistently

## Phase 1 — prep the German source pages

Before translation, clean up the German originals:
- make page naming consistent
- ensure each major page has clear title/meta/canonical
- standardize navigation/footer/contact CTA
- identify exact page equivalents for future hreflang mapping

This matters because messy source pages create messy translations.

## Phase 2 — launch minimal English section

Create only:
- `/en/index.html`
- `/en/services.html`
- `/en/use-cases.html`
- `/en/landingpage-sprint.html`
- maybe `/en/digital-clarity-setup.html`

Then add:
- English meta tags
- hreflang between translated pairs
- sitemap updates
- nav language switcher

## Phase 3 — expand only based on need

Translate more pages only if:
- they are used in outreach/sales
- they rank or attract meaningful traffic
- they are referenced by English-speaking prospects

---

## 13) File/folder structure suggestion

A practical static structure for later:

```text
index.html
services.html
use-cases.html
landingpage-sprint.html
positionierung-website-texte.html
...
en/
  index.html
  services.html
  use-cases.html
  landingpage-sprint.html
  digital-clarity-setup.html
bertlclaw-assets/
sitemap.xml
robots.txt
```

If the site later grows a lot, then consider:
- shared partial generation
- a simple static build step
- or moving to an SSG

But for now, plain static HTML is fine.

---

## 14) Recommended glossary starter

Use this as a consistency baseline.

| German | English recommendation | Notes |
|---|---|---|
| Landingpages | Landing Pages | standard plural |
| Website-Texte | Website Copy / Website Messaging | pick one and stay consistent |
| Positionierung | Positioning | good direct mapping |
| Digitale Struktur | Digital Structure / Digital Clarity | prefer meaning-based choice |
| Digitale Ordnung & Klarheit | Digital Clarity Setup | already close to existing naming |
| Anwendungsfälle | Use Cases | good fit |
| Leistungen | Services | stronger than “Capabilities” here |
| Kontakt aufnehmen | Get in Touch / Contact | depends on CTA tone |
| Angebot | Offer / Service Offer | choose by context |
| Selbstständige | Self-Employed Professionals / Independent Professionals | context-sensitive |
| Gründer | Founders | straightforward |

---

## 15) Concrete decisions I would make now

1. **Keep German-only live as the main site for now.**
2. **Do not split German into Austria/Germany variants yet.**
3. **Plan for English under `/en/`, not for a full `/de/` migration yet.**
4. **Translate only the homepage + key commercial pages first.**
5. **Use manual hreflang and manual sitemap updates.**
6. **Add a simple DE/EN text switcher when English launches.**
7. **Keep legal pages primarily German unless English demand becomes material.**

---

## 16) Best next actions for BertlClaw

Most sensible next actions in order:

1. create a page-equivalence map for current German URLs
2. define final English names for the 3 main offers
3. prepare nav/footer language switcher pattern
4. launch only 3–5 English pages max
5. update sitemap and hreflang together in one release
6. monitor Search Console after launch for indexing / duplicate-language issues

---

## 17) Short verdict

**BertlClaw should become multilingual in a staged way, not immediately fully bilingual.**

The right rollout is:
- **now:** one strong German DACH site
- **next:** English only for the highest-value pages under `/en/`
- **later:** broader localization only if traffic, demand, or conversion data justify it

That gives BertlClaw a clean structure without breaking the current GitHub Pages setup or weakening the brand message.
