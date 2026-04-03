# BertlClaw QA Closure Evidence Pack — BCQA-001 / BCQA-004 / BCQA-005

Stand: 2026-04-02

Zweck: das **letzte kompakte Abschlussblatt** nach einem manuellen QA-Run. Dieses Dokument ist dafür da, die Ergebnisse aus dem Scorecard-Run in eine **ticketfähige Abschlussentscheidung** zu überführen.

Am besten zusammen verwenden mit:
- `BERTLCLAW-QA-PROOF-MOBILE-FORM-SCORECARD-2026-04-02.md`
- `BERTLCLAW-QA-MANUAL-RETEST-PACK-2026-04-02.md`
- `bertlclaw-qa-active-bugs.csv`

---

## 1. Nutzung in 3 Minuten

Nach dem manuellen Run:
1. Scorecard ausfüllen
2. die stärksten Evidence-Links/-Dateinamen hier eintragen
3. pro Ticket eine Abschlussentscheidung treffen
4. Copy-Ready Closing Notes in CSV / Log / Ticket übernehmen

Wichtig:
- **Nicht** jede Kleinigkeit dokumentieren
- nur die Beweise, die ein Ticket wirklich schließen oder offen halten
- Fokus: **echter Leadflow, echter Mobile-Flow, echte sichtbare Glaubwürdigkeit**

---

## 2. Run Header

- Operator / Tester:
- Datum:
- Start–Ende:
- Umgebung: Live / Preview
- Basis-URL:
- Gerät(e):
- Browser:
- Netz:
- Referenz-Scorecard:

---

## 3. Closure Rule Set

### Ticket darf auf `retested_pass`, wenn:
- der Kernpfad real geprüft wurde
- die Evidence konkret und nachvollziehbar ist
- keine kritische Gegenbeobachtung offen bleibt

### Ticket bleibt `partial`, wenn:
- technisch alles läuft, aber UX / Sichtbarkeit / Vertrauen noch spürbar schwach ist
- der Flow funktioniert, aber nicht überzeugend genug für echte Nutzer wirkt

### Ticket wird `retested_fail`, wenn:
- Kernfunktion bricht
- wichtiger Inhalt / CTA / Formularpfad verdeckt oder unklar bleibt
- Nutzer den wichtigsten nächsten Schritt realistisch verpasst

### Ticket wird `blocked_manual_access`, wenn:
- nur externer Zugriff fehlt (z. B. Formspree / Mailbox)
- Abschluss ohne diese Bestätigung nicht seriös möglich ist

---

# 4. BCQA-001 Closure Pack — Formular-Zustellung

## A. Required Evidence
- [ ] Screenshot vor Submit
- [ ] Screenshot Danke-Seite
- [ ] Zustellungsbeweis aus Formspree oder Mailbox
- [ ] optional: sichtbare URL vor/nach Submit

## B. Evidence Register
- Pre-submit screenshot:
- Thank-you screenshot:
- Delivery proof:
- Optional notes:

## C. Closure Questions
- Wurde das Formular ohne sichtbaren Fehler abgesendet? yes / no
- Kam der Redirect auf `danke.html` real zustande? yes / no
- Ist die Nachricht in Formspree / Mailbox real angekommen? yes / no / blocked
- Stimmen die Testdaten inhaltlich? yes / no
- Wirkt die Danke-Seite nach erfolgreichem Submit ausreichend eindeutig? yes / no

## D. Final Decision
- Ergebnis BCQA-001: PASS / PARTIAL / FAIL / BLOCKED
- Ticket-Status: retested_pass / partial / retested_fail / blocked_manual_access
- Abschlussgrund in 1 Satz:
- Rest-Risiko:
- Nächste Aktion, falls nicht PASS:

## E. Copy-Ready Ticket Close Note
```text
BCQA-001 manual closure run completed on [date/time]. Submit path on [environment] was tested from [page/url]. Redirect to danke.html = [pass/fail]. Real delivery confirmation in Formspree/mailbox = [yes/no/blocked]. Evidence: [pre-submit screenshot], [thank-you screenshot], [delivery proof]. Final result: [PASS/PARTIAL/FAIL/BLOCKED]. Next action: [next action or none].
```

---

# 5. BCQA-004 Closure Pack — Mobile Handoff / Chat → Kontakt

## A. Minimum Closure Standard
Für einen belastbaren Abschluss sollte es geben:
- mindestens **1 echter Handset-Run**
- alle 3 Pflichtseiten einmal bewertet
- pro kritischer Seite mindestens 1 Screenshot oder kurzes Recording

## B. Required Coverage
- [ ] `services.html`
- [ ] `landingpage-sprint.html`
- [ ] `digital-clarity-setup.html`
- [ ] mindestens ein iPhone-ähnlicher Viewport / Gerätelauf
- [ ] mindestens ein Android-ähnlicher Viewport / Gerätelauf

## C. Per-Page Closure Table

### `services.html`
- Gerät / Browser:
- Redirect: pass / fail
- Prefill: pass / fail
- Kontakt sofort sichtbar: yes / no
- Tappability okay: yes / no
- UI overlap: none / minor / major
- Evidence:
- Ergebnis: PASS / PARTIAL / FAIL
- Hauptgrund:

### `landingpage-sprint.html`
- Gerät / Browser:
- Redirect: pass / fail
- Prefill: pass / fail
- Kontakt sofort sichtbar: yes / no
- Tappability okay: yes / no
- UI overlap: none / minor / major
- Evidence:
- Ergebnis: PASS / PARTIAL / FAIL
- Hauptgrund:

### `digital-clarity-setup.html`
- Gerät / Browser:
- Redirect: pass / fail
- Prefill: pass / fail
- Kontakt sofort sichtbar: yes / no
- Tappability okay: yes / no
- UI overlap: none / minor / major
- Evidence:
- Ergebnis: PASS / PARTIAL / FAIL
- Hauptgrund:

## D. BCQA-004 Final Decision Gate

Setze nur dann **PASS**, wenn:
- Redirect + Prefill im Kernpfad funktionieren
- Kontaktbereich direkt nutzbar bleibt
- keine major overlaps vorhanden sind
- der Wechsel zur Startseite als Fortsetzung verständlich wirkt

Setze **PARTIAL**, wenn:
- technisch alles läuft,
- aber der Wechsel überraschend, irritierend oder visuell zu schwach bleibt

Setze **FAIL**, wenn:
- Redirect/Prefill bricht
- Kontakt verdeckt bleibt
- wichtige Controls/CTAs nicht sauber tappable sind

## E. Final Decision
- Gesamt-Ergebnis BCQA-004: PASS / PARTIAL / FAIL / BLOCKED
- Ticket-Status: retested_pass / partial / retested_fail / blocked_manual_access
- Beste Seite im Run:
- Schwächste Seite im Run:
- Größtes Mobile-Risiko:
- Nächste Aktion, falls nicht PASS:

## F. Copy-Ready Ticket Close Note
```text
BCQA-004 manual mobile closure run completed on [date/time]. Tested pages: services.html, landingpage-sprint.html, digital-clarity-setup.html. Real-device / mobile handoff result: redirect=[summary], prefill=[summary], contact visibility=[summary], overlap=[summary]. Evidence: [services evidence], [landingpage-sprint evidence], [digital-clarity-setup evidence]. Final result: [PASS/PARTIAL/FAIL/BLOCKED]. Main remaining risk: [risk or none]. Next action: [next action or none].
```

---

# 6. BCQA-005 Closure Pack — Proof Visibility / Trust Visibility

## A. Required Evidence
- [ ] Homepage-Proof-Einstieg Screenshot
- [ ] `proof.html` Screenshot des früh sichtbaren stärksten Belegs
- [ ] `proof.html` Screenshot des CTA-/Weiterführungsbereichs
- [ ] optional: Mobile-Screenshot des gleichen Kernbelegs

## B. Closure Questions

### Homepage entry
- Ist der Proof-Einstieg schnell auffindbar? yes / no
- Versteht man sofort, was man dort bekommt? yes / no
- Wirkt der Block wie echter Beleg statt bloßer Selbstbeschreibung? yes / no
- Evidence:
- Ergebnis: PASS / PARTIAL / FAIL

### `proof.html` early proof
- Ist innerhalb des ersten Screens klar, was bewiesen werden soll? yes / no
- Ist der stärkste Beleg früh sichtbar? yes / no
- Muss man zu viel Erklärung lesen, bevor etwas Greifbares erscheint? yes / no
- Früh sichtbarer stärkster Beleg:
- Evidence:
- Ergebnis: PASS / PARTIAL / FAIL

### `proof.html` modules + CTA
- Sind Proof-Module schnell scanbar? yes / no
- Wirken Artefakte real genug? yes / no
- Ist der nächste Schritt zu Kontakt/Leistung klar? yes / no
- Verliert Mobile spürbar an Proof-Sichtbarkeit? yes / no
- Stärkstes Modul:
- Schwächstes/verstecktes Modul:
- Evidence:
- Ergebnis: PASS / PARTIAL / FAIL

## C. Decision Gate

**PASS** nur wenn:
- der stärkste Beleg früh sichtbar ist
- echte Artefakte schnell erkennbar sind
- CTA/Weiterführung nicht hinter Erklärtext verschwindet
- Mobile den Kernbeleg nicht deutlich schwächer macht

**PARTIAL** wenn:
- Proof vorhanden ist,
- aber erst mit zu viel Scrollen / Lesen / Interpretieren wirkt

**FAIL** wenn:
- Besucher in 5–10 Sekunden nicht versteht, warum BertlClaw glaubwürdig ist
- der Kernbeleg versteckt bleibt
- CTA-Führung sichtbar zu schwach ist

## D. Final Decision
- Gesamt-Ergebnis BCQA-005: PASS / PARTIAL / FAIL
- Ticket-Status: retested_pass / partial / retested_fail
- Wichtigster sichtbarer Trust-Punkt:
- Wichtigster versteckter / schwacher Punkt:
- Nächste Aktion, falls nicht PASS:

## E. Copy-Ready Ticket Close Note
```text
BCQA-005 manual proof-visibility closure run completed on [date/time]. Homepage proof entry, early proof visibility on proof.html, and proof-module/CTA clarity were reviewed on desktop/mobile. Strongest visible trust point: [point]. Main hidden or weak point: [point]. Evidence: [homepage screenshot], [early proof screenshot], [CTA/module screenshot], [mobile screenshot if any]. Final result: [PASS/PARTIAL/FAIL]. Next action: [next action or none].
```

---

# 7. Final Cross-Ticket Closure Block

## Ticket Outcomes
- BCQA-001:
- BCQA-004:
- BCQA-005:

## Strongest Evidence Across Run
1.
2.
3.

## Remaining Risks Across Run
1.
2.
3.

## Ready-to-Apply Status Updates
- BCQA-001 →
- BCQA-004 →
- BCQA-005 →

## Copy-Ready Master Summary
```text
Manual QA closure pack completed on [date/time] for BCQA-001, BCQA-004, and BCQA-005. Final outcomes: BCQA-001=[status], BCQA-004=[status], BCQA-005=[status]. Strongest evidence: [short evidence summary]. Remaining risk: [short risk summary]. Evidence bundle: [refs]. Recommended status updates applied: [status updates].
```

---

# 8. Ultra-Compact Operator Version

Wenn nur 60 Sekunden bleiben, nur das hier ausfüllen:

```text
Run: [date/time] / [tester] / [env]
BCQA-001: [status] — evidence: [3 refs] — risk: [short]
BCQA-004: [status] — evidence: [3 refs] — risk: [short]
BCQA-005: [status] — evidence: [3 refs] — risk: [short]
Next actions: [1], [2], [3]
```

---

# 9. Practical Rule

Dieses Blatt ist gut, wenn danach **ohne Rückfrage** klar ist:
- welches Ticket wirklich zu ist
- welches Ticket nur teilweise gut ist
- welches Ticket wegen fehlendem echten Beweis offen bleiben muss
- welche Evidence den Abschluss trägt
