# BERTLCLAW-SOCIAL-PROOF-SYSTEM.md
*Wie BertlClaw Social Proof sammelt, dokumentiert und einsetzt. Stand: 2026-04-04*
*Referenz-Brand: BERTLCLAW-BRAND-CORE.md*

---

## 1. Was zählt als Proof

### Typ A: Testimonials
Direkte Aussagen von Kunden über ihre Erfahrung mit BertlClaw.
- **Format:** Zitat + Name + Berufsbezeichnung (optional: Foto, Unternehmen)
- **Mindestqualität:** Konkret, nicht generisch. „Dominic hat mir geholfen, mein Angebot in einem Satz zu erklären" ist besser als „Super Arbeit, gerne wieder."
- **Zustimmung:** Immer schriftlich einholen (E-Mail reicht)

### Typ B: Case Studies
Beschreibung eines konkreten Projekts mit Ausgangslage, Vorgehen und Ergebnis.
- **Format:** One-Pager (HTML oder Markdown) — Problem → Lösung → Ergebnis
- **Mindestqualität:** Messbar oder konkret beschreibbar (z.B. „Vorher: keine klare Landingpage. Nachher: Seite live in 5 Tagen, erste Anfragen nach 2 Wochen.")

### Typ C: Before-After
Visueller Vergleich: Screenshot/Text vorher vs. nachher.
- **Format:** Bild-Paar oder Textpaar
- **Nutzen:** Stark auf Social Media und auf der Website

### Typ D: Live-Demos / Beispielprojekte
Eigene oder öffentlich sichtbare Projekte, die zeigen, was BertlClaw kann.
- **Format:** Link + kurze Beschreibung + Kontext
- **Beispiel:** Die BertlClaw-Website selbst als Beweis für Handwerk

### Typ E: Self-Projects / Referenz-Domains
Eigene Projekte, die BertlClaw als Fähigkeitsbeweis nutzt — auch ohne Kundenbezug.
- **Format:** URL + „Eigenprojekt von BertlClaw als Referenz für..."
- **Nutzen:** Für die Phase vor dem ersten Kundenprojekt essenziell

---

## 2. Wie Proof gesammelt wird

**Ablauf nach jedem abgeschlossenen Projekt:**

### Schritt 1: 3-Fragen-Feedback (direkt nach Abschluss)
Innerhalb von 2 Tagen nach Projektabschluss per E-Mail schicken:

> Hallo [Name],
> ich wäre dir sehr dankbar für ein kurzes Feedback — 3 Fragen, 5 Minuten:
> 1. Was war deine Ausgangssituation, bevor wir angefangen haben?
> 2. Was hat sich verändert — was hast du jetzt, was du vorher nicht hattest?
> 3. Für wen würdest du BertlClaw empfehlen?
> Du kannst mir einfach antworten — ich mache daraus ggf. ein kurzes Testimonial (mit deiner Zustimmung).

### Schritt 2: Testimonial-Anfrage (nach positivem Feedback)
Wenn Feedback positiv, direkt fragen:

> „Darf ich einen Teil davon als Testimonial auf meiner Website verwenden — mit deinem Namen und Berufsbezeichnung?"

### Schritt 3: Case Document anlegen
In `bertlclaw-proof/` eine Datei anlegen:
```
bertlclaw-proof/case-[slug].md
```
Struktur: siehe Template unten (Abschnitt 6).

---

## 3. Proof-Bibliothek

### Ordner: `bertlclaw-proof/`
Jedes Projekt bekommt eine eigene Datei:
```
bertlclaw-proof/
  case-landingpage-dienstleister.md
  case-positionierung-freelancerin.md
  case-website-texte-berater.md
  ...
```

### Datei: `proof.html`
Öffentliche Proof-Seite auf der Website.
- Wird manuell gepflegt wenn neuer Proof freigegeben ist
- Enthält: Testimonials + Case-Study-Links + Referenzprojekte
- URL: https://bertlclaw.at/proof.html

### Pflege-Rhythmus
- Nach jedem Projekt: Case-Datei in `bertlclaw-proof/` anlegen
- Bei freigegebenen Testimonials: in `proof.html` ergänzen
- Quartalsweise: `proof.html` aufräumen — veraltete oder schwache Beweise raus

---

## 4. Wie Proof eingesetzt wird

| Seite / Kontext | Proof-Typ | Format |
|---|---|---|
| Startseite (index.html) | 1–2 Testimonials | Zitat-Block, sichtbar ohne Scrollen |
| Services-Seite | Kurze Case-Hinweise | „Beispiel: [Projekt] → [Ergebnis]" |
| Landingpages (einzelne Angebote) | 1 passendes Testimonial | Zitat direkt neben CTA |
| proof.html | Alle freigegebenen Cases & Testimonials | Übersicht + Details |
| LinkedIn-Posts | Before-After / Learnings | Posts mit Einblick in Projekte |
| Angebote / Proposals | 1–2 relevante Testimonials | Im PDF oder als Link |
| E-Mail-Follow-up | Case-Referenz | „Hier ein Beispiel aus einem ähnlichen Projekt:" |

**Regel:** Proof kommt nie ohne Kontext. Immer erklären, wer der Kunde war und welches Problem gelöst wurde.

---

## 5. Minimum Proof-Set

**Was BertlClaw braucht, bevor ernsthafte Lead-Generierung startet:**

| Mindest-Anforderung | Status |
|---|---|
| ✅ 3 dokumentierte Cases (auch Eigenprojekte / Pro-bono zählen) | laufend aufbauen |
| ✅ 2 echte Testimonials (mit Name + Zustimmung) | nach ersten Projekten |
| ✅ 1 sichtbare Live-Referenz (eigene Website oder Kundenseite) | bertlclaw.at selbst |
| ✅ proof.html live und gepflegt | vorhanden |

**Solange dieses Set nicht erfüllt ist:**
- Mehr Self-Projects und Pro-bono-Projekte priorisieren
- Testimonials aus persönlichem Netzwerk anfragen (auch für kleine Gefälligkeiten)
- Eigene Website als primäre Referenz einsetzen

---

## 6. Templates

### Template A: Testimonial-Anfrage (E-Mail)

**Betreff:** Kurze Bitte: Darf ich dein Feedback als Testimonial verwenden?

> Hallo [Name],
>
> danke nochmal für das gute Feedback nach unserem Projekt — das hat mich wirklich gefreut.
>
> Ich wäre dir sehr dankbar, wenn ich einen Teil davon als kurzes Testimonial auf meiner Website verwenden dürfte — mit deinem Namen und deiner Berufsbezeichnung.
>
> Wenn du magst, kannst du mir auch noch kurz sagen:
> - Was war deine Situation, bevor wir gearbeitet haben?
> - Was hat sich verändert / was hast du jetzt?
>
> Oder ich formuliere etwas auf Basis deines Feedbacks und schicke es dir zur Freigabe. Ganz wie du willst.
>
> Kurze Rückmeldung reicht — danke!
>
> Grüße,
> Dominic

---

### Template B: Case Study One-Pager (Markdown)

```markdown
# Case Study: [Projekttitel / Slug]

**Datum:** [Monat Jahr]
**Kunde:** [Vorname oder Pseudonym] — [Berufsbezeichnung / Branche]
**Leistung:** [z.B. Landingpage-Sprint / Positionierungs-Session / Website-Texte]
**Freigegeben für:** [ ] Intern only  [ ] Anonym public  [ ] Namentlich public

---

## Ausgangslage

[Was war das Problem des Kunden? Was hat nicht funktioniert?
Z.B.: "Freelancerin im Bereich UX-Design, Website seit Jahren nicht aktualisiert, 
kein klares Angebot, wollte neue Kunden gewinnen."]

## Was wir gemacht haben

[Kurze Beschreibung des Vorgehens — ohne Insider-Jargon.
Z.B.: "In einem 90-minütigen Call herausgearbeitet, was sie wirklich anbietet. 
Dann Landingpage-Text geschrieben und die Seite technisch umgesetzt."]

## Ergebnis

[Konkretes Ergebnis — Zahlen wenn möglich, sonst qualitativ.
Z.B.: "Seite in 5 Tagen live. Erste Anfrage über die neue Seite 10 Tage danach.
Kundin: 'Ich hätte das nie selbst so klar formulieren können.'"]

## Testimonial (falls freigegeben)

> "[Zitat]"
> — [Name], [Berufsbezeichnung]

---
*Intern: bertlclaw-proof/case-[slug].md*
```

---

*Letzte Aktualisierung: 2026-04-04*
