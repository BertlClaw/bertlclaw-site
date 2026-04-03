# BertlClaw Legal/Compliance Workstream Status
**Stand:** 2026-04-03 13:17 CEST
**Workstream:** Legal/Compliance (ws-legal)
**Reviewer:** Subagent Legal Workstream

---

## Gesamtampel: 🟡 GELB

Die Baseline ist solide. Alle kritischen DSGVO-Pflichtpunkte (Impressum, Datenschutz, Erhebungspunkt, Formularhinweis) sind vorhanden und korrekt. Keine ROTEN Flags auf der Live-Site. Es gibt offene GELB-Nacharbeitspunkte, die vor dem nächsten Ausbauschritt abgehakt werden sollten.

---

## 1) Was geprüft wurde

| Artefakt | Status |
|---|---|
| `BERTLCLAW-LEGAL-OPERATOR-QUICKSTART-AND-RELEASE-PACKET.md` | ✅ gelesen, konsistent |
| `BERTLCLAW-MONTHLY-LEGAL-RELEASE-BOARD.md` | ✅ gelesen, konsistent |
| `BERTLCLAW-LEGAL-DEPLOYMENT-GATE-AND-CHANGE-TRIGGERS.md` | ✅ gelesen, konsistent |
| `BERTLCLAW-COMPLIANCE-IMPLEMENTATION-PACK-2026-04-02.md` | ✅ gelesen, konsistent |
| `BERTLCLAW-PRIVACY-TEXT-SYNC-CHECKLIST.md` | ✅ gelesen, konsistent |
| `BERTLCLAW-NEWSLETTER-AND-CRM-COMPLIANCE-GATE.md` | ✅ gelesen, konsistent |
| `BERTLCLAW-TOOL-DEPLOYMENT-CONSENT-WORKSHEET.md` | ✅ gelesen, konsistent |
| `BERTLCLAW-TOOL-AND-PROCESSOR-REGISTER.md` | ✅ gelesen, Register aktuell |
| `datenschutz.html` | ✅ vollständig, DSGVO-konform |
| `impressum.html` | ✅ vollständig, AT-konform |

---

## 2) Datenschutz- und Impressum-Prüfung

### `datenschutz.html` — GRÜN ✅

**Enthält:**
- Verantwortlicher (Name, Adresse, E-Mail, Telefon) — ✅
- Hosting GitHub Pages (Zweck, Rechtsgrundlage, Link zur GitHub Privacy) — ✅
- Kontaktformular Formspree (Empfänger, Drittlandhinweis, Speicherdauer) — ✅
- E-Mail, Telefon, WhatsApp (mit Meta-Hinweis und Sensitivitätswarnung) — ✅
- Speicherdauer-Abschnitt — ✅
- Cookies/Tracking-Abschnitt mit korrekter Negativerklärung — ✅
- Betroffenenrechte + Hinweis DSB Österreich — ✅
- Footer-Navigation mit Links zu allen relevanten Seiten — ✅

**Keine Mängel erkannt.** Die Datenschutzerklärung spiegelt die aktuelle technische Realität korrekt wider.

### `impressum.html` — GRÜN ✅

**Enthält:**
- Medieninhaber/Betreiber: Dominic Reisenbichler, MSc. — ✅
- Anschrift vollständig — ✅
- E-Mail und Telefon — ✅
- Unternehmensgegenstand beschrieben — ✅
- Hinweis zu weiteren Pflichtangaben (UID, Kammer etc.) transparent gelöst — ✅
- Footer-Navigation korrekt — ✅

**Keine Mängel erkannt.**

---

## 3) Consent / Cookie-Banner-Pflicht

**Aktuelle Einschätzung: Kein Cookie-Banner derzeit zwingend.**

Die Live-Site setzt auf Basis der vorhandenen Dokumente und der HTML-Analyse aktuell ein:
- GitHub Pages Hosting (serverseitig, technisch notwendig)
- Formspree-Formular (erst nach Submit)
- Direkte Kontaktkanäle (keine Website-Skripte)
- Lokaler clientseitiger Chat (kein externes Backend)
- Keine Analytics, keine Pixel, keine Embeds, keine Chat-Widgets

→ **Kein Trigger für Cookie-Consent-Banner erkennbar** (Baseline gemäß Compliance-Pack korrekt bestätigt).

---

## 4) Tool-Register-Status

**ACTIVE-Einträge (BCL-001 bis BCL-007):** Alle korrekt dokumentiert und aktuell.

**Offene DPA/AVV-Punkte (GELB):**
- BCL-001 GitHub Pages: DPA-Status als „prüfen bei Härtung" markiert — akzeptabel für jetzt
- BCL-002 Formspree: DPA/AVV-Status = offen — **Nacharbeit empfohlen** (konkrete Dokumentation des Formspree DPA-Links)
- BCL-003 E-Mail: Provider-Details offen — akzeptabel für jetzt
- BCL-007 Lead-Liste: noch APPROVED-NOT-LIVE — kein Handlungsbedarf bis Entscheidung

**UNDER-REVIEW-Kandidaten (BCL-101 bis BCL-109):** Alle korrekt als nicht-live geführt. Keine dieser Verarbeitungen ist nach vorliegenden Informationen live geschaltet.

---

## 5) Newsletter & CRM — Status

Kein Newsletter und kein CRM derzeit aktiv (BCL-103, BCL-104 = UNDER-REVIEW).

**Wachstumspfad gemäß Gate-Dokument:**
- Stufe 1/2 (CRM-light) ist freigabefähig vorbereitet
- Stufe 3 (Newsletter) nur mit separatem Double-Opt-in — dokumentiert, noch nicht live
- Stufe 4 (Automation/Scoring) — erst nach ORANGE-Prüfung

→ Kein Handlungsbedarf heute. Gut dokumentierter Wachstumspfad liegt vor.

---

## 6) Privacy Text Sync

**Register ↔ datenschutz.html:** synchron für alle ACTIVE-Einträge.

**Erhebungspunkt-Hinweise:** laut Compliance-Pack wurden am Formular in index.html alle erforderlichen Hinweise ergänzt (Datenschutz-Checkbox, Formspree-Erwähnung, WhatsApp-Sensitivitätshinweis).

**Keine Privacy-Sync-Gaps identifiziert.**

---

## 7) Identifizierte offene Punkte (GELB — keine Blocker)

### OA-01 — Formspree DPA-Dokumentation
**Priorität:** GELB  
**Was:** BCL-002 zeigt DPA/AVV-Status = offen. Vor dem nächsten CRM-/Automatisierungsausbau sollte der Formspree-DPA-Link dokumentiert und der Status auf „vorhanden" gesetzt werden.  
**Aktion:** Formspree Data Processing Agreement prüfen unter https://formspree.io/legal/ und Register-Eintrag BCL-002 updaten.

### OA-02 — Nächster Monatsreview eintragen
**Priorität:** GELB  
**Was:** Das Monthly Legal Release Board enthält noch keine ausgefüllten Monatsprotokoll-Einträge.  
**Aktion:** Zum Ende April einen Monatsreview-Eintrag im Board anlegen.

### OA-03 — BCL-006 Chat-Eintrag Privacy-Text-Status
**Priorität:** GELB (niedrig)  
**Was:** BCL-006 (lokaler FAQ-Chat) hat Privacy-Text-Status = „teilweise indirekt abgedeckt; Update nötig falls Chat-Felder systematisch übernommen werden". Solange keine Änderung, kein Handlungsbedarf. Aber wenn der Chat ausgebaut wird, muss `datenschutz.html` ergänzt werden.  
**Aktion:** Beobachten, bei Chatausbau sofort nachziehen.

### OA-04 — Formspree AVV-Abschluss prüfen
**Priorität:** GELB  
**Was:** Bei Formspree ist nicht klar, ob ein formaler AVV/DPA abgeschlossen oder nur die Standard-Privacy-Policy anwendbar ist.  
**Aktion:** Formspree-Account auf AVV-Funktion prüfen.

---

## 8) Keine Blocker / ROT-Flags

- Kein Live-Tool ohne Dokumentation
- Kein Tracking/Embed live ohne Consent-Entscheidung
- Kein Widerspruch zwischen datenschutz.html und realer Verarbeitung
- Impressum und Datenschutz erreichbar und korrekt verlinkt
- Keine unsauberen Claims oder undokumentierten Testimonials erkennbar

---

## 9) Monatsreview-Kurzprotokoll — 2026-04

```text
Monatsreview — 2026-04
Review-Datum: 2026-04-03
Reviewer: Legal Workstream Subagent

Scope:
- Website / Datenschutz / Impressum
- Register BCL-001 bis BCL-007 + BCL-101 bis BCL-109
- Newsletter/CRM-Gate-Status
- Privacy-Text-Sync

1. Neue reale Änderungen seit letztem Review
- keine neuen Tools live geschaltet
- Website-UX-Updates (mobile CTA, Chat, Proof) ohne neue Datenflüsse laut Compliance-Pack

2. Register-Status
- vollständig aktuell für alle ACTIVE-Einträge
- UNDER-REVIEW-Kandidaten korrekt gepflegt
- Kleines Update: Formspree-DPA konkretisieren (OA-01)

3. Privacy-Sync-Status
- synchron für alle aktiven Verarbeitungen
- datenschutz.html korrekt und aktuell

4. Consent-/Trigger-Lage
- keine neuen Trigger
- kein Cookie-Banner-Zwang erkennbar

5. DPA-/Transfer-/Anbieter-Themen offen
- Formspree DPA-Dokumentation (OA-01, OA-04)

6. Proof-/Claim-/Freigabe-Themen offen
- BERTLCLAW-PROOF-PUBLICATION-RELEASE-CHECK und PROOF-APPROVAL-REGISTER vorhanden; keine ungeklärten Proof-Elemente live erkennbar

Monatsampel: GELB

Entscheidung: weiter wie geplant; Formspree-DPA vor nächstem CRM-Ausbau klären

Konkrete To-dos bis nächstes Review:
1. OA-01: Formspree DPA-Link dokumentieren, BCL-002 updaten
2. OA-02: April-Monatsreview-Protokoll eintragen
3. OA-04: Formspree AVV-Abschluss prüfen
```

---

## 10) Nächste Schritte (Zusammenfassung)

| # | Aktion | Priorität | Wann |
|---|---|---|---|
| OA-01 | Formspree DPA-Link recherchieren und BCL-002 updaten | GELB | vor CRM-Ausbau |
| OA-02 | April-Monatsreview im Board eintragen | GELB | Ende April |
| OA-03 | BCL-006 Chat beobachten | Info | bei Chatausbau |
| OA-04 | Formspree AVV-Abschluss prüfen | GELB | vor CRM-Ausbau |

---

**Kein sofortiger Handlungsbedarf. Website und Dokumentation sind in gutem legal-operativem Zustand.**
