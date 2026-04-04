# BertlClaw Long-Term Commercial Strategy

*Written: 2026-04-04. This is the strategic north star — concrete, honest, without theater.*

---

## The One-Sentence Commercial Vision

BertlClaw is the go-to brand in the German-speaking market for freelancers, solo founders, and small service businesses who need their online presence to actually work — clearly positioned, professionally structured, and backed by a real person, not an anonymous agency.

---

## Where BertlClaw Stands Today

**What's already working:**
- Custom domain `bertlclaw.at` live with CNAME
- Multi-page website with services, use-cases, about, impressum, datenschutz
- Contact form (Formspree) operational
- Structured JSON-LD data across all pages
- Brand assets (logo, OG card) in place
- Local documentation system solid
- Hourly heartbeat monitoring running

**What's missing for commercial traction:**
- GitHub Org migration (personal account → brand Org)
- All canonical URLs now point to `bertlclaw.at` ✓ (fixed 2026-04-04)
- Sitemap updated to `bertlclaw.at` ✓ (fixed 2026-04-04)
- Google Search Console not yet claiming `bertlclaw.at` as primary property
- No external citations / corroboration (LinkedIn, directories)
- No Analytics / attribution on the website
- No real lead volume yet → no conversion data
- GitHub profile README not yet published live

---

## The Three Commercial Layers

### Layer 1 — Trust Infrastructure (months 1–3)
*Get Google and humans to recognize BertlClaw as a real, consistent entity.*

Concrete actions:
1. **GitHub Org migration** → see `BERTLCLAW-GITHUB-ORG-MIGRATION-PLAN.md`
2. **Publish GitHub profile README** → content ready in `GITHUB-PROFILE-README-DRAFT.md`
3. **Google Search Console**: add `bertlclaw.at` as primary property, submit sitemap
4. **LinkedIn presence**: Dominic Reisenbichler profile → add BertlClaw as current position with correct URL
5. **2–3 external directory entries**: WKO/Firmen A-Z, AboutMe or similar, consistent brand/operator/URL data
6. **Verify domain on GitHub Org** (green badge)
7. **Add simple analytics** to website (Plausible or Fathom — privacy-friendly, no cookie banner needed)

Success criteria:
- Searching "BertlClaw" on Google returns: website first, GitHub second, LinkedIn third
- Same description logic appears across all three
- Search Console shows `bertlclaw.at` as the primary property being indexed

---

### Layer 2 — Conversion Engine (months 2–4)
*Make the website earn its place — not just look good, but generate qualified contact.*

Concrete actions:
1. **Form attribution**: add hidden UTM + page_path fields to `index.html` contact form
2. **Chat-to-form flow**: when user clicks "Frage ins Formular übernehmen", auto-mark `lead_entry=chat_to_form`
3. **Lead list**: create and actually use `bertlclaw-leads-template.csv` or a Google Sheet
4. **Danke-Seite**: improve with clear next-step timeline + WhatsApp as secondary only
5. **CTA audit**: ensure every page has one primary CTA, not three competing ones
6. **Services page**: add clear pricing logic or at least "Einstieg ab X €" to reduce friction
7. **Proof page**: publish at least 2–3 real or anonymized case examples

Success criteria:
- Form submissions generate complete, actionable lead entries
- At least 60% of form submissions are classifiable to a core offer
- `danke.html` bounce rate drops (people click through to services or about)

---

### Layer 3 — Demand Generation (months 3–6+)
*Build repeatable inbound that doesn't require constant manual effort.*

Concrete actions:
1. **5 cornerstone SEO pages** (not more): each targeting a clear search intent
   - "Landingpage erstellen lassen Österreich"
   - "Website-Texte Selbstständige"
   - "Positionierung Freelancer Website"
   - "Digitale Struktur kleine Unternehmen"
   - "KI-Unterstützung Selbstständige"
2. **LinkedIn content**: 1–2 posts/week, practical and opinionated, link to pages when relevant
3. **Referral activation**: 3–5 direct personal outreach messages to existing network with clear positioning
4. **First client proof**: complete one project → document it as anonymized case study → publish on `proof.html`
5. **GitHub Org as brand signal**: the org profile README + verified domain = visible trust for any technical client

Success criteria:
- Organic traffic from `bertlclaw.at`-targeted queries starts appearing in Search Console
- At least 1–2 inbound leads/month from non-direct sources
- At least 1 published proof case

---

## The GitHub Org Move: Why Now

The naming conflict (BertlClaw/BertlClaw vs BertlClaw/bertlclaw) is not just a technical annoyance.
It signals to anyone who looks at the GitHub profile that something is unresolved.

The Org migration:
- Resolves the conflict permanently
- Adds verified domain capability
- Separates personal identity from brand identity
- Costs 2–3 hours now, pays off indefinitely

**Recommended action: do the Org migration before any major LinkedIn or external profile push.** You want to point people to a clean GitHub Org, not a personal account with a workaround repo name.

See: `BERTLCLAW-GITHUB-ORG-MIGRATION-PLAN.md`

---

## Revenue Model (Honest, Not Optimistic)

### Near-term (0–6 months)
- Project-based: Landingpage Sprint, Website-Text-Paket, Digitale Ordnung
- Pricing: €500–2.500 per project depending on scope
- Volume target: 2–4 projects/month at steady state
- Revenue target: €1.000–6.000/month depending on mix

### Medium-term (6–18 months)
- Recurring: lightweight retainer for ongoing content, updates, or digital structure maintenance
- Pricing: €300–800/month per client
- Volume target: 3–6 retainer clients
- Revenue target: €1.000–5.000/month recurring + project income

### Long-term (18+ months)
- Productized offers with fixed scope + fixed price (less negotiation, better margins)
- Possibly micro-digital-products (templates, guides) as low-touch revenue
- Potentially 1–2 freelancer collaborators under BertlClaw Org

---

## What NOT to Do (Commercial Anti-Patterns)

- **Don't chase follower counts** on social before the website converts
- **Don't build complex tech** before proving manual processes work
- **Don't expand the offer list** — three core offers is enough until revenue is stable
- **Don't skip the proof step** — "trust me, I'm good" doesn't convert; documented outcomes do
- **Don't wait for perfection** before publishing GitHub profile README or LinkedIn update
- **Don't keep the GitHub personal account as the primary brand touchpoint** — migrate to Org

---

## Prioritized Action Board (next 30 days)

| Priority | Action | Effort | Impact |
|---|---|---|---|
| 🔴 1 | GitHub Org migration | 2–3h | Very high |
| 🔴 2 | Publish GitHub profile README | 15min | High |
| 🔴 3 | Google Search Console → claim `bertlclaw.at`, submit sitemap | 30min | High |
| 🟡 4 | Add simple analytics (Plausible) to all HTML pages | 1h | High |
| 🟡 5 | LinkedIn: add BertlClaw as current position with correct URL | 20min | Medium-high |
| 🟡 6 | Create and start using lead list (Google Sheet) | 30min | Medium |
| 🟢 7 | Form attribution hidden fields (UTM + page_path) | 1h | Medium |
| 🟢 8 | Services page: add pricing logic / starting price signal | 1h | Medium |
| 🟢 9 | Proof page: draft + publish first case example | 2h | Medium |
| 🟢 10 | 2–3 external directory entries (WKO, etc.) | 1h | Medium |

---

## Files Referenced

- `BERTLCLAW-GITHUB-ORG-MIGRATION-PLAN.md` — full Org migration guide
- `GITHUB-PROFILE-README-DRAFT.md` — ready-to-publish profile README
- `GITHUB-LIVE-CHECKLIST.md` — GitHub profile settings checklist
- `BERTLCLAW-GROWTH-ROADMAP.md` — phase-by-phase website/product growth
- `BERTLCLAW-SYSTEM-ARCHITECTURE.md` — tech stack and lead routing
- `BERTLCLAW-ENTITY-DOMINANCE-ROADMAP.md` — SEO/entity recognition strategy
- `LEAD-WORKFLOW.md` — lead handling SOP
- `bertlclaw-leads-template.csv` — lead list template
