# BertlClaw Sales Quick-Reference Card

**Für den Moment, wenn ein Lead reinkommt und schnell klar werden muss, was jetzt zu tun ist.**

Alles Wichtige aus dem gesamten Sales-System auf einer Seite.

---

## 1. Sofort-Einordnung: A / B / C

| Grade | Woran erkennbar | Nächster Schritt |
|---|---|---|
| **A** | Fit hoch + Problem klar + Timing gut + Entscheider nah | Direkt Angebot oder Termin anbieten |
| **B** | Fit gut, aber Scope/Material/Ziel noch unscharf | 3–5 Rückfragen oder 15-Min-Scoping |
| **C** | Kein klarer Fit oder keine realistische Priorität | Freundlich eingrenzen, pausieren oder sauber beenden |

---

## 2. Kernangebot zuordnen

| Signal im Lead | Kernangebot |
|---|---|
| „Seite erklärt nicht gut" / „brauche Landingpage" / CTA/Hero schwach | **Landingpage Sprint** |
| „Texte klingen generisch" / „Angebot braucht zu viel Erklärung" | **Positionierung & Website-Texte** |
| „Alles liegt verstreut" / „erst Ordnung" / keine Struktur | **Digitale Ordnung & Klarheit** |

---

## 3. Preisrahmen je Kernangebot

| Kernangebot | Small | Standard | Expanded |
|---|---|---|---|
| Landingpage Sprint | EUR 700–1.100 | EUR 1.100–1.900 | EUR 1.900–3.200 |
| Positionierung & Website-Texte | EUR 500–900 | EUR 900–1.700 | EUR 1.700–2.800 |
| Digitale Ordnung & Klarheit | EUR 450–850 | EUR 850–1.500 | EUR 1.500–2.500 |

**Small:** enger Scope, Material vorhanden, wenige Schleifen
**Standard:** substanzielle Arbeit, brauchbares Material, 1 Review
**Expanded:** komplexer Scope, schwache Materiallage, mehr Abstimmung

---

## 4. Angebotsform wählen

| Situation | Form |
|---|---|
| Fit hoch, Scope klar, 1 Entscheider | **Kurzangebot per Mail** (Default) |
| Scope noch unscharf, mehrere Richtungen | **Scoping-Call + Zusammenfassung** |
| Expanded-Scope, formelle Einkaufslage, Abgrenzung kritisch | **Scoped Proposal** |
| Kein sinnvoller Fit | **Freundliche Absage / Parkieren** |

---

## 5. Kurzangebot-Struktur (Mail, ~150–300 Wörter)

```
1. Ausgangslage (2–3 Sätze)
2. Empfehlung: Kernangebot
3. Enthalten: 3–5 Deliverables
4. Nicht enthalten: 2–3 klare Grenzen
5. Zeitrahmen
6. Preis
7. Start-CTA: "Wenn das passt, [kurzes Go / Input X] reicht."
```

---

## 6. Vor-Versand-Check (30 Sekunden)

- [ ] Ist nur **ein** Kernangebot vorne?
- [ ] Ist das Ergebnisbild konkret?
- [ ] Ist klar, was **nicht** enthalten ist?
- [ ] Ist der Preisrahmen verteidigbar?
- [ ] Gibt es eine Downscope-Option?
- [ ] Ist ein klarer Start-CTA drin?
- [ ] Ist ein Follow-up-Datum gesetzt?

**Wenn 2+ Punkte fehlen: nicht senden, erst schärfen.**

---

## 7. Einwand-Sofortantworten

| Einwand | Zug |
|---|---|
| „Zu teuer" | Nicht rabattieren. Engeren Phase-1-Start anbieten. |
| „Jetzt schlechter Zeitpunkt" | Kleinen Vorbereitungsschritt oder sauber pausieren mit Datum. |
| „Noch nicht sicher was ich brauche" | Eine klare Empfehlung geben, keine Optionsliste. |
| „Muss intern abstimmen" | Kurze weiterleitbare Zusammenfassung liefern + Wiedereinstieg mit Datum. |
| „Lieber kleiner anfangen" | Ja, wenn der Start Substanz hat. Kernhebel benennen. |

---

## 8. Follow-up-Cadence

| Sequenz | Touch 1 | Touch 2 | Touch 3 | Danach |
|---|---|---|---|---|
| Infos fehlen | Tag 0: Rückfragen | Tag +2: kurzes Nachfassen mit Entscheidungspunkt | Tag +6: letztes Angebot | `pausiert/verloren` |
| Termin angeboten | Tag 0 | Tag +3: Zeitfenster oder Wiedervorlage? | Tag +8: offen lassen | `pausiert` |
| Angebot verschickt | Tag 0: versenden | Tag +3 (Nudge bei A) / +4 (Follow-up bei B) | Tag +10: letztes Nachfassen | `verloren/pausiert` |

---

## 9. Close-Fragen (gut vs. schlecht)

| ✅ Gut | ❌ Schlecht |
|---|---|
| „Passt dieser Startpunkt grundsätzlich?" | „Wolltest du nochmal drüberschauen?" |
| „Ist eher Umfang oder Timing das Thema?" | „Sag einfach Bescheid." |
| „Wenn wir es enger schneiden, wäre es entscheidbar?" | „Melde dich gern irgendwann." |
| „Welche Unsicherheit müsste noch weg?" | „Was denkst du?" |

---

## 10. Stale-Lead-Regel

- Angebot verschickt, keine Reaktion nach **10 Tagen** → Entscheidung: aktiv closen oder pausieren
- Lead in keinem Gate klar → sofort einordnen: Wo ist er? Was ist der nächste Schritt + Datum?
- `offen` ohne Datum ist kein Status → entweder `nächste Aktion + Datum` oder `pausiert/verloren + Grund`
- **Wöchentlich prüfen:** Gibt es Leads ohne `next_followup_date` oder mit überschrittenem Datum?

---

## 11. Downscope-Optionen

| Kernangebot | Downscope |
|---|---|
| Landingpage Sprint | Nur Hero + Struktur + CTA; kein kompletter Seitentext |
| Positionierung & Texte | Nur Messaging-Map + Headlines; nur ein Hauptangebot |
| Digitale Ordnung | Nur Prioritäten-Reset; nur ein Themencluster |

**Lieber kleiner, sauberer Einstieg als großer unsauberer Scope.**

---

## 12. CLI-Shortcuts

```bash
# Schneller Preis-/Form-Check
node bertlclaw-tools/quote-advisor.js --offer=landingpage --size=standard \
  --fit=4 --scope=3 --material=3 --decision=4 --friction=3 --upsell=4

# Voller Angebots-Output
node bertlclaw-tools/offer-builder.js --offer=landingpage --size=standard \
  --fit=4 --scope=3 --material=3 --decision=4 --friction=3 --upsell=4 \
  --name="Name" --situation="..." --goal="..."

# Lead → Offer-Inputs automatisch
node bertlclaw-tools/lead-to-offer-inputs.js --lead-id=BC-2026-XXXX

# Follow-up / Einwand-Antwort / Kickoff
node bertlclaw-tools/close-builder.js --offer=landingpage --size=standard \
  --price=1500 --name="Name" --stage=followup --objection=price
```

---

*Vollständige Logik → BERTLCLAW-SALES-OPERATING-SYSTEM.md, BERTLCLAW-OFFER-PRICING-MATRIX.md, BERTLCLAW-OFFER-CLOSE-OBJECTION-PLAYBOOK.md, BERTLCLAW-LEAD-PROOF-GATES.md*
