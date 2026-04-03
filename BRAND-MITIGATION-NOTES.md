# BertlClaw Brand / Entity Mitigation Notes

## Main gap found

Aktuell gibt es eine **Identitäts-Spannung** zwischen den vorhandenen Materialien:

- `README.md` beschreibt BertlClaw primär als Angebot für Landingpages, Texte, Positionierung und digitale Projekte.
- `bertlclaw-landing.html` beschreibt BertlClaw primär als **lokalen AI-Begleiter im OpenClaw-Setup**.

Beides kann zusammengehören — aber **nicht ohne erklärende Klammer**. Ohne diese Klammer wirkt die Marke unscharf:

- Ist BertlClaw eine Person?
- eine Marke?
- ein AI-Agent?
- ein Dienstleistungsangebot?
- eine technische Demo?

## Recommended mitigation

### 1. One parent definition

Öffentlich immer mit derselben Oberdefinition arbeiten:

> BertlClaw ist die Projektmarke von Dominic Reisenbichler.

Danach kann erklärt werden, **was unter dieser Marke erscheint**:

- Website / Inhalte
- Landingpage- und Text-Angebote
- digitale Struktur
- KI-gestützte Unterstützung
- ggf. lokale AI-/Agent-Erfahrungen oder Demonstrationen

### 2. Separate brand from manifestation

Nicht sagen:

> BertlClaw ist ein lokaler AI-Begleiter.

Besser:

> Unter BertlClaw werden auch KI-gestützte Arbeitsweisen, Assistenz-Setups oder AI-nahe Projektseiten sichtbar gemacht.

So wird der AI-Aspekt zu **einem Teilbereich** der Marke statt zur gesamten Entity.

### 3. Add operator clarity everywhere

Wo sinnvoll sichtbar machen:

- Betreiber / verantwortlich: Dominic Reisenbichler
- Bei Website möglichst im Footer, Impressum oder About-Kontext
- Auf GitHub im Profil-README oder Bio

### 4. Reduce terminology drift

Nicht ständig wechseln zwischen:

- AI-Begleiter
- Agent
- Assistenz
- Marke
- Service
- Projekt
- Tool

Empfehlte Hierarchie:

- **Marke / Projektmarke** = BertlClaw
- **Betreiber** = Dominic Reisenbichler
- **Leistungs-/Inhaltsfelder** = Landingpages, Texte, Positionierung, Struktur, KI-Unterstützung
- **technische Ausprägungen** = ggf. AI-Agent, lokale Assistenz, Demos, Setups

### 5. GitHub-specific mitigation

GitHub sollte nicht nur technisch, sondern auch entity-klar sein:

- Profil-README anlegen
- Profil-Bio auf dieselbe Kurzbeschreibung setzen
- Repo-Description angleichen
- konsistentes Profilbild / Logo verwenden

## Suggested next content changes

### README
Bereits lokal überarbeitet: stärker auf Brand-/Entity-Klarheit und Betreiberbezug.

### New GitHub profile README
Lokal als Entwurf angelegt: `GITHUB-PROFILE-README-DRAFT.md`

### Metadata canon
Lokal als Referenz angelegt: `BERTLCLAW-METADATA.md`

## Optional follow-up on website

Wenn die Landingpage weiter genutzt wird, wäre die beste Folgeänderung:

- Headline oder Intro so anpassen, dass BertlClaw zuerst als **Marke / Projektidentität** erscheint
- AI-Begleiter-Text als Teilaspekt / Demonstration / Arbeitsweise einordnen
- Betreiberhinweis ergänzen

## GitHub Repo-Name Conflict (open — with GitHub Support)

**Status:** Open as of 2026-04-03.

**Issue:**
The canonical GitHub profile repo for BertlClaw should be named `BertlClaw/BertlClaw` (case-sensitive profile repo that renders as the GitHub profile README). However, the existing website repository is `BertlClaw/bertlclaw-site`.

A conflict exists where the profile-special repo name (`BertlClaw` matching the org/user name) may collide with or be shadowed by the existing `bertlclaw-site` repo name, depending on how GitHub routes profile README rendering.

**GitHub Support ticket:** Opened. Awaiting resolution.

**Interim mitigation:**
- Do not rename or delete `bertlclaw-site` until GitHub Support confirms the correct path forward.
- Local draft of the profile README is ready at `GITHUB-PROFILE-README-DRAFT.md` and can be deployed as soon as the repo structure is confirmed.
- Per `GITHUB-BRAND-ASSETS.md`, the profile repo description should be: `GitHub-Profil-Repository der Projektmarke BertlClaw.`
- The website repo description should be: `Öffentliche Web-Präsenz von BertlClaw mit Leistungen, Anwendungsfällen und Markenauftritt.`

**Next action:** Follow up with GitHub Support. Once resolved, publish the profile README and confirm both repo descriptions match canon.

---

## Bottom line

Das Problem ist weniger „zu wenig Branding“ als **zu viele implizite Rollen gleichzeitig**.  
Die sauberste Lösung ist nicht mehr Marketing-Sprache, sondern eine klare Entity-Struktur:

**BertlClaw = Marke**  
**Dominic Reisenbichler = Betreiber**  
**AI-Unterstützung + Websites + Texte + Struktur = Leistungs- und Inhaltsfelder**
