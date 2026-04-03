# BertlClaw Legal Operator Quick-Start & Release Decision Packet

Stand: 2026-04-02
Owner: Dominic Reisenbichler / BertlClaw
Purpose: kompaktes Operator-Dokument, das die vorhandenen Legal-/Compliance-Artefakte zu einem echten Arbeitsablauf verbindet.

Dieses Dokument ist der praktische Einstieg **nach** dem Monthly Legal Release Board:
- Was muss ich vor einem Release tun?
- Welche Datei ist wofür zuständig?
- Wie komme ich in 5–15 Minuten zu einer belastbaren Freigabe?
- Wo dokumentiere ich die Entscheidung so, dass sie später nachvollziehbar bleibt?

Es ist bewusst kein neues Theoriedokument. Es ist die Bedienungsanleitung für die bereits vorhandenen Dateien.

Verknüpfte Kernartefakte:
- `BERTLCLAW-MONTHLY-LEGAL-RELEASE-BOARD.md`
- `BERTLCLAW-TOOL-AND-PROCESSOR-REGISTER.md`
- `BERTLCLAW-PRIVACY-TEXT-SYNC-CHECKLIST.md`
- `BERTLCLAW-TOOL-DEPLOYMENT-CONSENT-WORKSHEET.md`
- `BERTLCLAW-LEGAL-DEPLOYMENT-GATE-AND-CHANGE-TRIGGERS.md`
- `BERTLCLAW-COMPLIANCE-IMPLEMENTATION-PACK-2026-04-02.md`

Kein Ersatz für Rechtsberatung. Aber das operative Release-Paket für BertlClaw.

---

## 1) Wofür dieses Dokument da ist

Dieses Dokument schließt die letzte operative Lücke:

- Das **Board** sagt, ob BertlClaw insgesamt grün/gelb/orange/rot steht.
- Das **Register** dokumentiert einzelne Tools/Verarbeitungen.
- Die **Privacy-Sync-Checkliste** hält Website-Text und Realität zusammen.
- Das **Consent-Worksheet** prüft riskantere Tool-Einbauten.
- Das **Deployment-Gate** liefert die Ampellogik.

Was bisher fehlte, war ein **Operator-Flow**:
1. Änderung erkennen
2. richtigen Prüfpfad wählen
3. nur die nötigen Dateien anfassen
4. Entscheidung in einem einzigen Paket festhalten
5. erst dann live gehen

Genau dafür ist diese Datei da.

---

## 2) Die drei Standardfälle

### Fall A — Kein relevanter Legal Trigger
Beispiele:
- reine Textkorrektur
- Designänderung ohne Datenfluss
- CTA-Formulierung ohne neuen Kanal / ohne neues Feld

**Aktion:**
- Kurzvermerk: `No legal trigger affected`
- kein vollständiges Paket nötig

### Fall B — Gelber Trigger
Beispiele:
- neues Formularfeld
- WhatsApp wird prominenter platziert
- neuer Kontaktkanal
- bestehender Prozess bleibt gleich, aber Text oder Transparenz muss nachgezogen werden

**Aktion:**
- Register prüfen / aktualisieren
- Privacy-Sync prüfen
- Release-Paket ausfüllen

### Fall C — Orange-/Rot-Kandidat
Beispiele:
- Analytics
- CRM mit Syncs / Profiling / Add-ons
- Newsletter-Tool
- Chat-Widget
- KI-Backend-Chat
- reCAPTCHA / Anti-Spam-Dienst
- Calendly / Maps / YouTube / Trustpilot / Social embed
- neuer externer Prozessor oder Drittlandbezug

**Aktion:**
- Register aktualisieren
- Consent-Worksheet Pflicht
- Privacy-Sync Pflicht
- Release-Paket Pflicht
- ohne klare Entscheidung kein Livegang

---

## 3) Einfache Bedienungslogik: welche Datei nutze ich wann?

| Wenn die Frage lautet … | Dann zuerst in diese Datei schauen | Ergebnis |
|---|---|---|
| Ist das insgesamt freigabefähig? | `BERTLCLAW-MONTHLY-LEGAL-RELEASE-BOARD.md` | Monats- oder Release-Ampel |
| Welche Tools/Prozesse sind real im Einsatz? | `BERTLCLAW-TOOL-AND-PROCESSOR-REGISTER.md` | Realität + Status je Tool |
| Muss `datenschutz.html` oder ein Formularhinweis angepasst werden? | `BERTLCLAW-PRIVACY-TEXT-SYNC-CHECKLIST.md` | Text-/UI-Abgleich |
| Ist Consent / ePrivacy / Zwei-Klick / Blockierung betroffen? | `BERTLCLAW-TOOL-DEPLOYMENT-CONSENT-WORKSHEET.md` | ORANGE-/ROT-Entscheidungsbasis |
| Welche Ampel gilt bei dieser Art von Änderung grundsätzlich? | `BERTLCLAW-LEGAL-DEPLOYMENT-GATE-AND-CHANGE-TRIGGERS.md` | Triggerklassifikation |
| Was ist die aktuelle Baseline der live angenommenen Verarbeitung? | `BERTLCLAW-COMPLIANCE-IMPLEMENTATION-PACK-2026-04-02.md` | Startzustand / heutige Lage |

---

## 4) 5-Minuten-Operator-Flow vor jedem Release

### Schritt 1 — Änderung in einem Satz beschreiben
Beispiel:
- „Neues Formularfeld Budget einbauen“
- „Calendly auf Kontaktseite einbetten“
- „WhatsApp-CTA auf Startseite deutlich prominenter machen“
- „Plausible als Webanalyse ergänzen“

Wenn dieser Satz nicht klar formulierbar ist, ist die Änderung meist auch nicht sauber prüfbar.

### Schritt 2 — Triggerklasse bestimmen
Fragen:
- neuer Datenfluss?
- neuer Empfänger?
- neues Tool / neues Script / neuer Kanal?
- Änderung an `datenschutz.html`, Formularhinweis oder Impressum nötig?
- Cookie-/Identifier-/Embed-/Tracking-Thema?

Ergebnis:
- **kein Trigger** → Kurzvermerk genügt
- **gelber Trigger** → Register + Privacy-Sync + Paket
- **orange/rot** → Register + Consent-Worksheet + Privacy-Sync + Paket

### Schritt 3 — Register zuerst aktualisieren
Immer zuerst im Register prüfen:
- existiert schon ein passender Eintrag?
- passt der Status noch?
- stimmen Datenkategorien, Trigger, Empfängerregion, Consent-Status, DPA-Status?

**Faustregel:** Kein Tool real einbauen, bevor der Registerstand stimmt.

### Schritt 4 — Privacy-Sync prüfen
Abgleichen:
- `datenschutz.html`
- Formularhinweis / CTA-nahe Mikrocopy
- ggf. Chat-Hinweis / WhatsApp-Hinweis / Zwei-Klick-Hinweis
- Legal-Links Desktop + mobil

### Schritt 5 — Nur bei ORANGE/unklar: Consent-Worksheet ausfüllen
Pflicht bei:
- Analytics
- Embeds
- Chat-Widgets
- Anti-Spam-Diensten
- Newsletter-Tracking
- CRM mit erweiterten Funktionen
- unklaren Drittland-/Anbieterlagen

### Schritt 6 — Release-Paket unten ausfüllen
Am Ende steht genau eine Entscheidung:
- **FREIGEGEBEN**
- **FREIGEGEBEN UNTER BEDINGUNGEN**
- **NICHT FREIGEGEBEN**

---

## 5) Harte Operator-Regeln

### Regel 1
**Erst Register, dann Technik.**

### Regel 2
**Wenn Text und Realität auseinanderlaufen, kein stiller Release.**

### Regel 3
**Bei Seitenaufruf + Drittanbieter + Identifier/Tracking = mindestens ORANGE denken.**

### Regel 4
**Wenn Empfänger, Zweck oder Ladeverhalten unklar sind, nicht live schalten.**

### Regel 5
**Das Release-Paket ist die eine Stelle, an der die Freigabeentscheidung lesbar zusammenläuft.**

---

## 6) Aktuelle BertlClaw-Baseline für schnelle Entscheidungen

Nach aktuellem Workspace-Stand ist die Baseline:
- Website-Hosting über GitHub Pages
- Kontaktformular über Formspree
- Kontaktkanäle: E-Mail, Telefon, WhatsApp
- lokaler clientseitiger FAQ-/Prefill-Chat ohne externes Backend
- aktuell keine freigegebenen Live-Analytics-/Pixel-/Embed-/reCAPTCHA-/externen Chat-Setups im Register

Das bedeutet operativ:
- **GRÜN/GELB** sind derzeit typisch für Copy-, Formular- und Kontaktkanal-Themen
- **ORANGE** wird sehr schnell erreicht bei Analytics, Scheduling, Embeds, Chat-Widgets, Newsletter, CRM-Add-ons, Anti-Spam und Drittland-/Transferfragen

---

## 7) Quick matrix: Welcher Pfad ist nötig?

| Änderung | Register | Privacy-Sync | Consent-Worksheet | Release-Paket |
|---|---|---|---|---|
| Tippfehler / Design ohne Datenfluss | nein / meist nein | nein | nein | Kurzvermerk reicht |
| neues Formularfeld | ja | ja | meist nein | ja |
| neuer Kontaktkanal | ja | ja | meist nein | ja |
| WhatsApp prominenter / neue CTA-Logik | ggf. ja | ja | meist nein | ja |
| CRM nach Formular-Submit | ja | ja | oft sinnvoll | ja |
| Analytics / Heatmap / Pixel | ja | ja | ja | ja |
| Chat-Widget / KI-Chat | ja | ja | ja | ja |
| reCAPTCHA / Turnstile | ja | ja | ja | ja |
| Calendly / Maps / YouTube / Trustpilot | ja | ja | ja | ja |

---

## 8) Copy-ready Release Decision Packet

Diesen Block für reale Freigaben kopieren.

```text
## BertlClaw Release Decision Packet — [Name / Datum]

Änderung / Scope:
Verantwortlich:
Typ:
- Release-Freigabe
- Nachdokumentation
- Sonderprüfung

1. Kurzbeschreibung
- Was ändert sich real?
- Welche Seiten / Touchpoints sind betroffen?
- Was ist der geschäftliche Zweck?

2. Trigger-Einstufung
- Kein Trigger
- GELB-Trigger
- ORANGE-/ROT-Kandidat

Kurzbegründung:
- ...

3. Betroffene Register-IDs
- ...

4. Register-Status
- Eintrag vorhanden / aktualisiert: ja / nein
- Status realistisch gesetzt: ja / nein
- Datenkategorien aktuell: ja / nein
- Trigger / Startpunkt aktuell: ja / nein
- Empfängerregion / Transferhinweis aktuell: ja / nein
- Consent-Status gesetzt: ja / nein
- DPA/AVV-Status gesetzt: ja / nein / offen

Register-Ergebnis:
- GRÜN / GELB / ORANGE / ROT

5. Privacy-Sync-Status
- `datenschutz.html` geprüft: ja / nein
- Erhebungspunkt / Formularhinweis geprüft: ja / nein / nicht nötig
- CTA-/Kanal-/Chat-Hinweis geprüft: ja / nein / nicht nötig
- Impressum / Datenschutz erreichbar: ja / nein
- Desktop + mobil gegengeprüft: ja / nein

Privacy-Ergebnis:
- GRÜN / GELB / ORANGE / ROT

6. Consent-/ePrivacy-Prüfung
- Worksheet nötig: ja / nein
- Worksheet abgeschlossen: ja / nein / nicht nötig
- lädt bei Seitenaufruf: ja / nein / unklar
- Cookies / Identifier / Endgeräteinfos: ja / nein / unklar
- Tracking / Profiling / Messung: ja / nein / unklar
- neuer externer Anbieter / Prozessor: ja / nein / unklar
- Drittland-/Transferbezug: ja / nein / unklar
- Zwei-Klick / Blockierung nötig oder sinnvoll: ja / nein / unklar

Consent-Ergebnis:
- GRÜN / GELB / ORANGE / ROT

7. Außenwirkung / Proof / Freigaben
- Testimonials / Logos / Reviews betroffen: ja / nein
- Freigaben dokumentiert: ja / nein / nicht nötig
- neue starke Claims geprüft: ja / nein / nicht nötig

Außenwirkungs-Ergebnis:
- GRÜN / GELB / ORANGE / ROT

8. Gesamtampel
- GRÜN / GELB / ORANGE / ROT

9. Entscheidung
- FREIGEGEBEN
- FREIGEGEBEN UNTER BEDINGUNGEN
- NICHT FREIGEGEBEN

10. Bedingungen / offene Punkte vor Live
1. ...
2. ...
3. ...

11. Nachweis / Referenzen
- Board geprüft: ja / nein
- Register geprüft: ja / nein
- Privacy-Sync geprüft: ja / nein
- Consent-Worksheet geprüft: ja / nein / nicht nötig
- ergänzte Dateien / Seiten:
  - ...

Freigegeben von:
Datum:
```

---

## 9) Minimalbeispiele, damit das Paket sofort nutzbar ist

### Beispiel A — Neues Formularfeld „Budget“
Typisch:
- Trigger: **GELB**
- Register: BCL-002 aktualisieren
- Privacy-Sync: Datenarten + Formularhinweis prüfen
- Consent-Worksheet: meist nicht nötig
- Entscheidung: oft **FREIGEGEBEN UNTER BEDINGUNGEN**, bis Textabgleich sichtbar ist

### Beispiel B — Calendly einbetten
Typisch:
- Trigger: **ORANGE**
- Register: neuer oder konkretisierter Scheduling-Eintrag
- Privacy-Sync: `datenschutz.html` + Zwei-Klick-/Embed-Hinweis prüfen
- Consent-Worksheet: Pflicht
- Entscheidung: erst nach technischer und textlicher Klärung

### Beispiel C — Plausible oder ähnliche Webanalyse
Typisch:
- Trigger: **ORANGE**
- Register: Analytics-Eintrag konkretisieren
- Privacy-Sync: Pflicht
- Consent-Worksheet: Pflicht
- Entscheidung: ohne saubere Einordnungsentscheidung nicht live

### Beispiel D — WhatsApp-CTA deutlich stärker ausrollen
Typisch:
- Trigger: **GELB**
- Register: BCL-005 prüfen
- Privacy-Sync: CTA-nahe Mikrohinweise und Datenschutzerklärung gegentesten
- Consent-Worksheet: meist nicht nötig, solange kein Widget lädt
- Entscheidung: meist freigabefähig nach Text-/UX-Abgleich

---

## 10) Maintainability-Regel: so bleibt das System schlank

Dieses Dokument soll **nicht** jedes Detail duplizieren. Pflegeprinzip:

- Die fachliche Wahrheit pro Tool lebt im **Register**.
- Die Text-/UI-Synchronisation lebt in der **Privacy-Sync-Checkliste**.
- Die Risikoprüfung für neue Tools lebt im **Consent-Worksheet**.
- Die periodische Gesamtsicht lebt im **Monthly Legal Release Board**.
- Diese Datei bleibt nur der **Operator-Index + Freigabepaket-Template**.

Wenn etwas fachlich genauer werden muss, **nicht hier aufblasen**, sondern die jeweilige Quelldatei pflegen.

---

## 11) Praktische Ein-Satz-Regel

**Wenn BertlClaw etwas live schalten will, das Datenfluss, Empfänger, Transparenz oder Außenwirkung verändert, muss vor dem Release mindestens das Register stimmen und das Release Decision Packet ausgefüllt sein.**
