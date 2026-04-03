# Approved Evidence Insertion Snippets

Purpose: make it fast to drop a newly approved real proof asset into `proof.html` without rewriting the whole page each time.

Use this only when:
- the asset is real
- the approval register entry exists
- the planned surface is allowed
- the claim wording matches the evidence level

Related files:
- `/home/dominic/.openclaw/workspace/proof.html`
- `/home/dominic/.openclaw/workspace/bertlclaw-proof/library/approvals/PROOF-APPROVAL-REGISTER.md`
- `/home/dominic/.openclaw/workspace/BERTLCLAW-CLAIM-SUBSTANTIATION-AND-PROOF-USAGE-CHECKLIST-2026-04-02.md`

---

## 1. Fast insertion rule

For each approved website case, update these four layers together:

1. **Visual slot**
   - replace placeholder frame with approved screenshot, crop, or thumbnail
2. **Artifact labels**
   - name the 2-3 concrete deliverables shown by the case
3. **Evidence caption**
   - say what the visitor is looking at in plain language
4. **Claim intensity**
   - keep wording at visible-difference level unless stronger evidence is documented

If one layer is missing, the case usually feels vague or overclaimed.

---

## 2. Recommended insertion sequence

### Step 1 — register check
Confirm:
- `approval_status` is `approved`, `partial`, or `conditional`
- `proof_page` or `website` is allowed in `allowed_surfaces`
- the exact asset version is covered

### Step 2 — pick the right slot type
Choose one primary visual:
- **hero comparison** for landingpage/message work
- **cropped text excerpt** for copy / FAQ / objection handling
- **system or board crop** for structure / prioritization work

### Step 3 — choose the safe claim level
Default public wording:
- clearer
- faster to understand
- better structured
- easier to act on
- reduced friction in understanding

Avoid on website unless fully proven + approved:
- more leads
- better conversion
- more sales
- revenue increase

### Step 4 — publish only the smallest strong proof needed
Do not dump the whole project. Pick:
- 1 primary visual
- 1 excerpt or compare block
- 2-3 named deliverables
- 1 short relevance bridge

---

## 3. Reusable swap map for `proof.html`

### A. Landingpage / website clarity case
Best replacement targets:
- mini-case visual slot
- before/after compare block
- artifact grid labels

Preferred asset mix:
- hero before/after crop
- final CTA or FAQ crop
- short caption explaining the visible change

### B. Positioning / copy case
Best replacement targets:
- text compare block
- deliverable excerpt card
- optional copy screenshot slot

Preferred asset mix:
- old vs new headline
- one approved objection/FAQ block
- optional page section crop

### C. Structure / system case
Best replacement targets:
- structure excerpt card
- media slot with board or system crop
- artifact list naming the new working logic

Preferred asset mix:
- cluster board crop
- priority list crop
- SOP or process excerpt

---

## 4. Copy snippets for the visual slot caption

### Neutral caption
`Freigegebener Ausschnitt aus einem realen Projekt: sichtbar ist der konkrete Deliverable, nicht eine aufgeblasene Erfolgsbehauptung.`

### Landingpage caption
`Freigegebener Hero-/CTA-Ausschnitt: sichtbar ist, wie Angebot, Nutzen und nächster Schritt dichter zusammengeführt wurden.`

### Copy caption
`Freigegebener Textausschnitt: sichtbar ist die sprachliche Verdichtung, nicht ein unbewiesenes Ergebnisversprechen.`

### Structure caption
`Freigegebener Struktur-Ausschnitt: sichtbar ist die neue Arbeitslogik mit Prioritäten und klaren nächsten Schritten.`

---

## 5. Drop-in microcopy snippets for proof cards

### Approval badge variants
- `Freigegeben für anonyme Website-Nutzung`
- `Freigegeben als gecroppter Ausschnitt`
- `Freigegeben für Proof-Seite und Proposal`
- `Proposal-only – nicht öffentlich verwenden`
- `Teilfreigabe – nur ohne Name, Logo und URL`

### Evidence-intro variants
- `Was hier sichtbar wird`
- `Konkreter freigegebener Ausschnitt`
- `Benennbarer Deliverable statt Behauptung`
- `Sichtbarer Unterschied im Output`

### Safe result lines
- `Das Angebot wird schneller erfassbar.`
- `Die Leserführung wirkt klarer und näher an der Entscheidung.`
- `Die Struktur reduziert Interpretationsarbeit.`
- `Der nächste Schritt wird verständlicher und leichter anschlussfähig.`

---

## 6. Mini HTML swap snippets

Use these as replace-ready patterns inside the existing proof page modules.

### Screenshot slot
```html
<div class="evidence-frame" aria-label="Freigegebener Screenshot aus einem realen Projekt">
  <img src="bertlclaw-assets/proof/example-case-hero-approved.jpg" alt="Freigegebener Hero-Ausschnitt eines realen Landingpage-Projekts" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />
  <div class="caption"><strong>Freigegebener Projekt-Ausschnitt</strong><br />Sichtbar ist der gelieferte Hero-/CTA-Bereich, nicht ein unbelegter Outcome-Claim.</div>
</div>
```

### Cropped excerpt card
```html
<div class="excerpt-card">
  <div class="artifact-label">Freigegebener Ausschnitt</div>
  <strong>FAQ- / CTA-Block aus realem Projekt</strong>
  <span>Veröffentlichbar, weil nur der genehmigte Detailausschnitt gezeigt wird.</span>
  <code>"Wie schnell kann man starten?" → "Sobald Ziel, Material und Ist-Stand da sind, wird daraus eine klare Leserführung mit umsetzungsreifen nächsten Schritten."</code>
</div>
```

### Approval hint
```html
<div class="artifact-card">
  <div class="artifact-label">Freigabe</div>
  <strong>Anonyme Website-Nutzung erlaubt</strong>
  <span>Ohne Name, Logo, URL und ohne identifizierende Randdetails.</span>
</div>
```

---

## 7. Operator checklist before pasting into `proof.html`

- approval register line exists
- surface includes `proof_page` or `website`
- screenshot has been cropped for identity safety
- no email, phone, URL, logo, or unique brand trace leaked
- wording stays at visible-difference level unless stronger proof exists
- mobile crop is also available if the desktop shot becomes unreadable on small screens
- CTA next to the case still fits the offer actually being sold

---

## 8. Practical default per new approved case

If time is tight, ship this minimum website upgrade:
- 1 approved screenshot or crop
- 1 compare pair or excerpt
- 3 named deliverables
- 1 approval hint
- 1 service CTA mapped to the case

That is usually enough to improve trust and conversion quality without bloating the page.
