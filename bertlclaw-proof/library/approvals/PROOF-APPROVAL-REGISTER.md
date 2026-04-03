# BertlClaw Proof Approval Register

Stand: 2026-04-02
Owner: Dominic Reisenbichler / BertlClaw
Purpose: kompakter, durchsuchbarer Freigabe-Tracker für jedes veröffentlichungsrelevante Proof-Item.

Dieses Asset ist der praktische nächste Schritt nach dem Release-Check:
- Das Release-Check-Dokument entscheidet, **ob** ein Asset publiziert werden darf.
- Dieses Register hält kompakt fest, **welches konkrete Proof-Item welchen Status, welche Scope-Grenze und welche Publikationslimits hat**.

Nutzen:
- schnelle Suche nach freigegebenen Testimonials / Cases / Logos / Screenshots
- kein Rätselraten, ob ein Asset anonym, proposal-only oder website-tauglich ist
- saubere Trennung zwischen internen Rohbelegen und echten Public-Proof-Assets
- weniger Risiko, dass Logo-/URL-/Zitat-/Screenshot-Freigaben durcheinandergeraten

Kein Ersatz für Rechtsberatung. Aber ein sehr brauchbarer Operator-Tracker für BertlClaw.

Verknüpfte Artefakte:
- `/home/dominic/.openclaw/workspace/BERTLCLAW-PROOF-PUBLICATION-RELEASE-CHECK-2026-04-02.md`
- `/home/dominic/.openclaw/workspace/BERTLCLAW-LEGAL-OPERATOR-QUICKSTART-AND-RELEASE-PACKET.md`
- `/home/dominic/.openclaw/workspace/bertlclaw-proof/templates/PUBLICATION-WORKFLOW.md`
- `/home/dominic/.openclaw/workspace/bertlclaw-proof/library/approvals/APPROVAL-REQUEST-TEMPLATE.md`
- `/home/dominic/.openclaw/workspace/bertlclaw-proof/library/approvals/proof-approval-register.csv`

---

## 1) Wofür der Registereintrag da ist

Jedes Proof-Item bekommt **eine kompakte Statuszeile**.

Ein Proof-Item kann sein:
- Testimonial / Quote
- anonymisierte Mini-Case
- Named reference
- Logo-Nutzung
- URL / Domain-Nennung
- Screenshot / Vorher-Nachher-Ausschnitt
- Textauszug
- Deliverable-Gallery-Karte
- Proposal-only Referenz
- Follow-up-only Proof-Snippet
- interne Demo / Demonstrator mit Außenwirkungsgrenze

**Wichtig:**
Nicht nur ganze Projekte tracken. Auch einzelne Proof-Bausteine tracken, wenn ihre Freigabegrenzen unterschiedlich sind.

Beispiel:
- Firmenname im Proposal erlaubt
- Logo nicht erlaubt
- anonymisierter Screenshot auf Website erlaubt
- Live-URL nicht erlaubt

Das sind **unterschiedliche Scope-Grenzen** und sollten nicht in einer unklaren Sammelnotiz verschwinden.

---

## 2) Kernregel für BertlClaw

**Wenn ein Proof-Item keinen Registereintrag mit klarer Freigabegrenze hat, gilt es operativ als nicht publikationsreif.**

Dann nur:
- intern verwenden
- oder erst Freigabe klären
- oder anonymisieren und neu prüfen

---

## 3) Wie granular BertlClaw tracken sollte

### Ein Eintrag pro eigenständigem Proof-Item
Gut geeignet für:
- einzelnes Testimonial
- einzelner Screenshot
- einzelnes Logo
- einzelnes Named-Reference-Statement
- einzelne URL-Nennung
- einzelne Website-Mini-Case

### Ein Bundle-Eintrag nur dann, wenn Scope wirklich identisch ist
Okay nur wenn gemeinsam freigegeben:
- Firmenname + Logo + kurzes Zitat + definierter Einsatzkanal
- exakt dieselbe Nutzungsgenehmigung für alle enthaltenen Elemente

Sobald Grenzen abweichen, lieber trennen.

---

## 4) Die empfohlene Spaltenlogik

Pflichtfelder im CSV-Tracker:

- `item_id` — stabile BertlClaw-ID
- `project_or_alias` — Projektname oder interner Alias
- `proof_item` — was genau ist das Asset?
- `proof_type` — testimonial / screenshot / logo / mini_case / quote / url / etc.
- `source_channel` — email / whatsapp / live page / figma / doc / internal demo / other
- `real_or_demo` — real / anonymized-real / internal-demo / mixed
- `identification_level` — none / indirect / clear
- `release_tier` — A / B / C / D
- `approval_status` — not_requested / requested / partial / approved / conditional / rejected / expired
- `allowed_identity` — internal_only / anonymous_only / partial_identity / full_identity
- `allowed_surfaces` — internal / proposal / followup / website / proof_page / social / email
- `blocked_surfaces` — wohin ausdrücklich nicht
- `allowed_elements` — z. B. quote+anonymous-case / name+quote / screenshot-cropped
- `publication_limits` — die konkrete Nutzungsgrenze in Klartext
- `claims_limit` — welche Claim-Grenze gilt
- `final_review_required` — yes / no
- `approval_source` — Mail / WhatsApp / Call follow-up / signed note / etc.
- `approval_date` — Datum der Freigabe
- `review_expiry` — falls später erneut prüfen
- `asset_location` — Datei / Ordner / Link
- `public_targets` — wohin bereits live oder geplant
- `owner` — wer pflegt den Eintrag
- `last_checked` — letzter Review
- `notes` — knappe Red Flags / Besonderheiten

---

## 5) Freigabe- und Statuslogik

### Release-Tier
- `A` = internal only
- `B` = anonymous public
- `C` = partially identified public
- `D` = fully public

### Approval Status
- `not_requested` = Freigabe noch gar nicht angefragt
- `requested` = angefragt, noch offen
- `partial` = nur Teile erlaubt
- `approved` = innerhalb dokumentierter Grenzen freigegeben
- `conditional` = nur unter Bedingungen freigegeben
- `rejected` = nicht freigegeben
- `expired` = alte Freigabe nicht mehr verlässlich / neu prüfen

### Allowed Identity
- `internal_only`
- `anonymous_only`
- `partial_identity`
- `full_identity`

Diese drei Felder zusammen machen Suchfilter sehr einfach.

---

## 6) BertlClaw-Suchlogik: typische Fragen, die das Register beantworten soll

Suche im CSV oder importiere es später in Notion/Airtable/Sheets.

Typische Operator-Fragen:
- Welche Items sind `approved` oder `conditional`?
- Welche Items sind `website`-tauglich?
- Welche Items sind nur `proposal`-tauglich?
- Welche Assets sind `anonymous_only`?
- Welche Items haben `final_review_required = yes`?
- Welche Freigaben sind `expired` oder ohne frischen `last_checked`-Wert?
- Für welches Projekt gibt es zwar Proof, aber noch keine öffentliche Freigabe?
- Welche Screenshots sind erlaubt, aber nur gecroppt/anonymisiert?

---

## 7) Einfache Betriebsregeln

### Regel 1
Vor neuer Veröffentlichung zuerst im Register suchen.

### Regel 2
Wenn der Release-Check „FREIGEGEBEN UNTER BEDINGUNGEN“ sagt, muss genau diese Bedingung in `publication_limits` oder `notes` stehen.

### Regel 3
`allowed_surfaces` und `blocked_surfaces` immer explizit pflegen.

Denn oft ist BertlClaw-Freigabe nicht allgemein, sondern kanalbezogen.

### Regel 4
Bei Messenger-/E-Mail-Lob ohne klare Veröffentlichungserlaubnis nie direkt `approved` setzen.

### Regel 5
Wenn eine Freigabe nur für eine konkrete Version gilt, Asset-Datei oder Version klar in `asset_location` benennen.

---

## 8) Copy-ready Status Row Template

Diese Zeile kann zuerst in Markdown ausgefüllt und dann ins CSV übertragen werden.

```text
item_id:
project_or_alias:
proof_item:
proof_type:
source_channel:
real_or_demo:
identification_level:
release_tier:
approval_status:
allowed_identity:
allowed_surfaces:
blocked_surfaces:
allowed_elements:
publication_limits:
claims_limit:
final_review_required:
approval_source:
approval_date:
review_expiry:
asset_location:
public_targets:
owner:
last_checked:
notes:
```

---

## 9) Drei BertlClaw-Beispiele

### Beispiel A — WhatsApp-Lob noch nicht publizierbar
- `proof_type`: testimonial
- `source_channel`: whatsapp
- `release_tier`: A
- `approval_status`: not_requested
- `allowed_identity`: internal_only
- `allowed_surfaces`: internal
- `publication_limits`: positive Nachricht intern notiert; keine öffentliche Nutzung ohne explizite Wortlaut-Freigabe

### Beispiel B — Anonymisierter Vorher/Nachher-Screenshot für Website erlaubt
- `proof_type`: screenshot
- `source_channel`: live_page
- `real_or_demo`: anonymized-real
- `release_tier`: B
- `approval_status`: conditional
- `allowed_identity`: anonymous_only
- `allowed_surfaces`: website|proof_page|proposal
- `blocked_surfaces`: social
- `allowed_elements`: cropped-before-after-screenshot
- `publication_limits`: keine URL, kein Name, kein Logo, keine re-identifizierenden Textdetails

### Beispiel C — Firmenname im Proposal okay, Website nein
- `proof_type`: named_reference
- `release_tier`: C
- `approval_status`: partial
- `allowed_identity`: partial_identity
- `allowed_surfaces`: proposal|followup
- `blocked_surfaces`: website|proof_page|social
- `allowed_elements`: company-name-only
- `publication_limits`: namentliche Erwähnung nur in 1:1 Sales-Kontext, kein Logo, kein Zitat, keine öffentliche Referenzseite

---

## 10) Minimaler Workflow

1. Proof-Item identifizieren
2. Release-Check / Freigabe klären
3. Eine Registerzeile anlegen oder aktualisieren
4. Asset-Datei / Ordner sauber verlinken
5. Erst danach veröffentlichen oder im Proposal verwenden
6. Nach Veröffentlichung `public_targets` ergänzen

---

## 11) Beziehung zum Release Record

Nicht verwechseln:

- Der **Proof Publication Release Record** ist die detaillierte Entscheidungsakte pro Asset oder Asset-Bundle.
- Das **Proof Approval Register** ist die kompakte operative Übersicht.

Empfohlene Praxis:
- größere/relevante Fälle zuerst im Release Record dokumentieren
- dann die Kurzfassung als Registerzeile übernehmen

So bleibt BertlClaw gleichzeitig prüfbar und schnell.

---

## 12) Ein-Satz-Regel

**Der Registereintrag ist die operative Wahrheit dafür, was BertlClaw mit einem konkreten Proof-Item wirklich tun darf — wo, wie identifiziert und mit welchen Grenzen.**
