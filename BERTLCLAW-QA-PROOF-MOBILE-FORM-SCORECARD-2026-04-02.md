# BertlClaw QA Operator Scorecard — BCQA-001 / BCQA-004 / BCQA-005

Stand: 2026-04-02
Zweck: kompakter, direkt nutzbarer Operator-Run für die drei aktuell wichtigsten manuellen Verifikationen: echter Formularbeweis, real-device Mobile-Handoff und Proof-Sichtbarkeit.

Nutzen:
- ein Blatt statt verstreuter QA-Notizen
- klare PASS / PARTIAL / FAIL / BLOCKED-Entscheidung pro Ticket
- Evidence wird so erfasst, dass Ticket-Updates sofort möglich sind
- fokussiert auf reale Sichtbarkeit und Conversion-Risiko, nicht nur auf statische Code-Prüfung

---

## 0. Run Header

- Tester:
- Datum:
- Startzeit:
- Umgebung: Live / Preview
- Basis-URL:
- Gerät 1:
- Gerät 2:
- Browser:
- Netz: Wi-Fi / Mobile / Other
- Run-Typ: retest / live verification

### Evidence-Minimum für diesen Run
- **BCQA-001:** 1 Screenshot vor Submit, 1 Screenshot Danke-Seite, 1 Zustellungsbeweis aus Formspree/Mailbox
- **BCQA-004:** pro Pflichtseite mindestens 1 Screenshot oder 1 kurzes Screen Recording im kritischen Handoff-Zustand
- **BCQA-005:** 1 Screenshot Homepage-Proof-Einstieg + 2 Screenshots `proof.html` (früher sichtbarer Beleg + CTA-/Weiterführungsbereich)

### Ergebnis-Codes
- **PASS** = technisch sauber und aus Nutzersicht überzeugend
- **PARTIAL** = technisch okay, aber sichtbar schwach / irritierend / versteckt
- **FAIL** = Funktion oder Wahrnehmung bricht relevant
- **BLOCKED** = ohne externen Zugriff nicht abschließbar

---

# 1. BCQA-001 — Formular-Zustellung echt beweisen

## Testdaten
- Name: `BertlClaw QA Test`
- E-Mail: kontrollierte Testadresse
- Telefon/WhatsApp: `+43 660 0000000` oder leer
- Thema: `Allgemeine Anfrage`
- Rückmeldung: `E-Mail`
- Nachricht: `Testanfrage BertlClaw QA 2026-04-02 – bitte ignorieren.`

## Operator-Schritte
- [ ] `index.html#kontakt` geöffnet
- [ ] Formular vollständig ausgefüllt
- [ ] Screenshot vor Submit erstellt
- [ ] Formular abgesendet
- [ ] kein sichtbarer JS-/Netzwerkfehler
- [ ] Redirect auf `danke.html`
- [ ] Screenshot der Danke-Seite erstellt
- [ ] Formspree/Mailbox geöffnet
- [ ] Zustellung real bestätigt
- [ ] Inhalt entspricht Testdaten

## Scorecard
- Vor-Submit-URL:
- Nach-Submit-URL:
- Redirect: pass / fail
- Danke-Seite vertrauenswürdig genug: yes / no
- Reale Zustellung: yes / no / blocked
- Inhalt vollständig korrekt: yes / no
- Evidence:
- Ergebnis BCQA-001: PASS / PARTIAL / FAIL / BLOCKED
- Ticket-Status-Vorschlag: retested_pass / retested_fail / blocked_manual_access
- Folgeaktion:

## Sofortige Fail-Zuordnung
- [ ] Validation fail
- [ ] Submit fail
- [ ] Redirect fail
- [ ] Delivery fail
- [ ] Danke-Seite wirkt unklar / schwach

---

# 2. BCQA-004 — Real-Device Mobile Handoff Scorecard

## Pflichtgeräte / Größen
- Gerät A: iPhone-ähnlich (`390x844`)
- Gerät B: Android-ähnlich (`360x800`)

## Pflichtseiten
- `services.html`
- `landingpage-sprint.html`
- `digital-clarity-setup.html`

## Einheitliche Testnachricht
`Ich möchte kurz prüfen, ob meine Nachricht sauber ins Kontaktformular übernommen wird.`

## Pro Seite einmal ausfüllen

### Run
- Seite:
- Gerät / Browser:
- Viewport:
- Echtgerät oder Emulator:
- Start-URL:
- Ziel-URL:

### Prüfschritte
- [ ] Seite lädt sauber
- [ ] primäre CTA / Chat-Einstieg sichtbar
- [ ] Chat lässt sich öffnen
- [ ] Nachricht kann eingegeben werden
- [ ] `Projekt anfragen` tappable
- [ ] Redirect auf `index.html?chat=...#kontakt`
- [ ] Kontaktsektion sofort sichtbar
- [ ] Nachricht im Feld `Nachricht` übernommen
- [ ] Formularbereich bleibt nutzbar
- [ ] Sticky-Bar verdeckt nichts Relevantes
- [ ] Chat/Floating UI verdeckt nichts Relevantes
- [ ] Flow wirkt wie verständliche Fortsetzung

### Scorecard
- Redirect: pass / fail
- Prefill: pass / fail
- Kontakt sofort sichtbar: yes / no
- Submit-/Kontaktbereich tappable: yes / no
- UI-Overlap: none / minor / major
- Versteht man den Sprung zur Startseite sofort: yes / no
- Wirkt der Flow als Fortsetzung statt Bruch: yes / no
- Kritisch verdecktes Element:
- Evidence:
- Ergebnis für diese Seite: PASS / PARTIAL / FAIL
- Wahrscheinlichste Fixrichtung:

### Entscheidungshilfe
- **PASS:** kein relevanter Overlap, Kontakt sofort nutzbar, Nachricht sichtbar, Flow klar
- **PARTIAL:** technisch okay, aber Wechsel irritiert oder Proof/Prefill ist nicht sofort klar genug
- **FAIL:** Redirect bricht, Prefill fehlt, Kontakt bleibt verdeckt oder UI blockiert Hauptaktion

## BCQA-004 Gesamturteil
- `services.html`:
- `landingpage-sprint.html`:
- `digital-clarity-setup.html`:
- Gesamt-Ergebnis BCQA-004: PASS / PARTIAL / FAIL / BLOCKED
- Ticket-Status-Vorschlag: retested_pass / partial / retested_fail / blocked_manual_access
- Folgeaktion:

---

# 3. BCQA-005 — Proof Visibility & Evidence Prominence Scorecard

## Ziel
Nicht nur prüfen, ob `proof.html` existiert, sondern ob die **stärksten Belege schnell genug sichtbar** sind, damit ein echter Besucher ohne Suchen Vertrauen fasst.

## Prüfflächen
- Homepage-Proof-Einstieg
- `proof.html` auf Desktop
- `proof.html` auf Mobile

## A. Homepage-Proof-Einstieg

### Prüfschritte
- [ ] Proof-Einstieg auf Homepage schnell auffindbar
- [ ] Einstiegswortlaut erklärt sofort den Nutzen
- [ ] der Block wirkt nicht wie bloße Selbstbeschreibung
- [ ] klarer Klickpfad zu weiterem Beleg vorhanden

### Scorecard
- Einstieg schnell sichtbar: yes / no
- Was der Besucher hier bekommt ist sofort klar: yes / no
- Stärkster Trust-Punkt im Einstieg:
- Größte Reibung / Unklarheit:
- Evidence:
- Ergebnis Homepage-Einstieg: PASS / PARTIAL / FAIL

## B. `proof.html` — Above-the-fold / Early Proof Review

### Prüfschritte
- [ ] Seite lädt sauber
- [ ] innerhalb des ersten Screens ist klar, was bewiesen werden soll
- [ ] stärkster Beleg erscheint früh genug
- [ ] erste sichtbare Claims wirken konkret statt aufgeblasen
- [ ] Nutzer muss nicht erst lange Erklärung lesen, um etwas Greifbares zu sehen

### Scorecard
- Früh sichtbarer stärkster Beleg:
- Ist der Beleg screenshot-würdig: yes / no
- Above-the-fold Glaubwürdigkeit: strong / okay / weak
- Zu viel Erklärung vor Beleg: yes / no
- Wichtigster versteckter Proof-Punkt:
- Evidence:
- Ergebnis Early Proof: PASS / PARTIAL / FAIL

## C. `proof.html` — Proof-Module + CTA-Führung

### Prüfschritte
- [ ] Mini-Cases / Proof-Module sind schnell scanbar
- [ ] Artefakte wirken real statt abstrakt
- [ ] nächster Schritt zu Kontakt/Leistungen ist klar
- [ ] CTA ist nicht schwächer als umliegender Erklärungstext
- [ ] mobile Ansicht zeigt noch denselben Kernbeleg ohne Verstecken

### Scorecard
- Reale Artefakte schnell lesbar: yes / no
- Stärkstes sichtbares Proof-Modul:
- Schwächstes oder zu verstecktes Modul:
- CTA-Klarheit: clear / partial / weak
- Mobile verliert Proof-Sichtbarkeit: yes / no
- Evidence:
- Ergebnis Proof-Module/CTA: PASS / PARTIAL / FAIL

## BCQA-005 Gesamturteil
- Homepage-Einstieg:
- Early Proof:
- Proof-Module/CTA:
- Gesamt-Ergebnis BCQA-005: PASS / PARTIAL / FAIL
- Ticket-Status-Vorschlag: retested_pass / partial / retested_fail
- Wichtigster sichtbarer Trust-Punkt:
- Größter verborgener oder zu schwacher Proof-Punkt:
- Folgeaktion:

### Escalate-to-Fail-Regeln für BCQA-005
- stärkster Beleg ist erst nach deutlichem Scrollen / Suchen sichtbar
- Seite erklärt Proof mehr, als sie Proof zeigt
- CTA zu Kontakt/Leistungen ist visuell schwächer als umliegender Text
- Mobile verschlechtert Sichtbarkeit des Kernbelegs spürbar
- Besucher kann nicht in 5-10 Sekunden sagen, warum BertlClaw glaubwürdig ist

---

# 4. Cross-Ticket Summary

## Ticket-Übersicht
- BCQA-001:
- BCQA-004:
- BCQA-005:

## Top 3 Findings
1.
2.
3.

## Top 3 Next Actions
1.
2.
3.

## Copy-Ready CSV/Log Note
`Manual operator scorecard run on [date/time]. BCQA-001=[status], BCQA-004=[status], BCQA-005=[status]. Key finding: [short finding]. Evidence: [screenshots/mailbox/video refs]. Next action: [next action].`

---

# 5. Recommended Execution Order

Wenn nur ein kurzer Live-Block möglich ist:
1. **BCQA-001 zuerst** — echter Leadflow ist das härteste Business-Risiko
2. **BCQA-004 danach** — mobile Handoff-Reibung direkt auf echten Geräten prüfen
3. **BCQA-005 zuletzt** — Proof-Sichtbarkeit mit frischem Conversion-Blick bewerten

So entsteht in einem Lauf gleichzeitig:
- echter Zustellungsbeweis
- real-device Conversion-Beweis
- sichtbarkeitsorientierter Trust-/Proof-Befund
