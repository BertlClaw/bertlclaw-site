# BertlClaw — Projektverwaltung

*Stand: 2026-04-04 | Abschnitt 6.2*

---

## Tool-Entscheidung

**Empfehlung: Notion (kostenloser Personal-Plan)**

**Rationale:**
- Kostenlos für Einzelpersonen, keine Einschränkungen für Solo-Betrieb
- Kombiniert Projektboard + Dokumente + Datenbank in einem Tool
- Kein Overhead beim Hinzufügen neuer Projekte
- Offline-Zugriff via App (iOS/Android)
- Einfache Tabellenansicht + Kanban-Ansicht je nach Bedarf

**Alternative (wenn Notion zu viel Overhead):** Google Sheets
- Einfachste Variante: 1 Tabellenblatt = alle Projekte
- Jede Zeile = 1 Projekt/Lead
- Spalten: ID | Kunde | Angebot | Status | Nächster Schritt | Frist | Preis | Notizen

**Entscheidungsregel:** Nutze das Tool, das du wirklich öffnest. Lieber ein einfaches System das funktioniert als ein perfektes das du nie nutzt.

---

## Projekt-Ordnerstruktur

Für jeden Kunden und jedes Projekt eine einheitliche Struktur:

```
projekte/
└── [YYYY-MM]_[KUNDENNAME]_[ANGEBOT]/
    ├── 00_briefing/
    │   ├── briefing-fragebogen.pdf
    │   └── erstgespräch-notizen.md
    ├── 01_research/
    │   ├── wettbewerber.md
    │   └── zielgruppe-notes.md
    ├── 02_entwuerfe/
    │   ├── v1_[datum].md
    │   ├── v2_[datum].md
    │   └── feedback-notizen.md
    ├── 03_final/
    │   ├── final_[datum]_[kundenname].pdf
    │   └── übergabe-dokument.pdf
    ├── 04_kommunikation/
    │   └── e-mail-verlauf.md (wichtige Entscheidungen notieren)
    └── projekt-info.md
```

**`projekt-info.md` Inhalt (Vorlage):**
```markdown
# Projekt: [Name]

- **Kunde:** [Name / Unternehmen]
- **Angebot:** [Landingpage Sprint / Website-Texte / Positionierungs-Sprint]
- **Startdatum:** YYYY-MM-DD
- **Abgabedatum:** YYYY-MM-DD
- **Preis:** €
- **Zahlungseingang:** [ ] ausstehend / [x] erhalten am YYYY-MM-DD
- **Status:** aktiv / abgeschlossen / pausiert
- **Ansprechpartner:** [Name, E-Mail, Tel]

## Scope
[Was ist inbegriffen]

## Deliverables
[Was wird geliefert]

## Ausgeschlossen
[Was ist explizit nicht Teil des Projekts]

## Notizen
[Wichtige Entscheidungen, Besonderheiten]
```

---

## Projekt-Lifecycle

```
📥 ANFRAGE
   ↓ Formular oder direkte Kontaktaufnahme
   → Sofortige Antwort (< 24h)
   → Erstgespräch vereinbaren

📞 AUFTRAG (Qualifizierung + Scoping)
   ↓ 30–45 Min. Erstgespräch
   → Briefing-Fragebogen senden
   → Angebot / Proposal erstellen (innerhalb 48h)
   → Angebot senden und nachfassen

✅ KICKOFF
   ↓ Auftragsbestätigung / Unterschrift (schriftliche Bestätigung genügt)
   → 50% Anzahlung (für neue Kunden)
   → Kickoff-Meeting oder detailliertes Briefing
   → Projektordner anlegen
   → Timeline festlegen

🔨 UMSETZUNG
   ↓ Arbeit nach Execution-Checkliste
   → Zwischenstände kommunizieren (mindestens 1 Check-in bei längeren Projekten)
   → Entwurf v1 liefern
   → Feedback einholen (max. 2 Feedbackrunden laut Angebot)

🔍 REVIEW
   ↓ Feedbackrunden (vertraglich definiert: standard = 2 Runden)
   → Entwurf überarbeiten
   → Finale Version erstellen

📦 ÜBERGABE
   ↓ Finale Dateien liefern
   → Übergabedokument mitschicken
   → Abnahme-Bestätigung erbitten (kurze E-Mail: "Passt das alles?")
   → Restbetrag in Rechnung stellen

🏁 ABSCHLUSS
   ↓ Zahlung eingegangen
   → Feedback / Testimonial anfragen (optional, nach 1–2 Wochen)
   → Projekt in EAR-Tabelle als abgeschlossen markieren
   → Internes Abschlussprotokoll schreiben (5 Min.)
   → Projektordner archivieren
```

---

## Dateinamenskonventionen

**Grundregel:** Datum zuerst, dann Inhalt, dann Version.

| Dateiart | Format | Beispiel |
|----------|--------|---------|
| Projektstarter | `YYYY-MM-DD_[Kunde]_briefing.pdf` | `2026-04-15_MusterGmbH_briefing.pdf` |
| Entwurf | `YYYY-MM-DD_[Kunde]_entwurf-v[N].md` | `2026-04-20_MusterGmbH_entwurf-v1.md` |
| Finale Datei | `YYYY-MM-DD_[Kunde]_final.pdf` | `2026-04-28_MusterGmbH_final.pdf` |
| Rechnung | `BC-[JAHR]-[NR]_[Kunde].pdf` | `BC-2026-001_MusterGmbH.pdf` |
| Übergabedok | `YYYY-MM-DD_[Kunde]_übergabe.pdf` | `2026-04-28_MusterGmbH_übergabe.pdf` |
| Interne Notiz | `YYYY-MM-DD_[Thema].md` | `2026-04-15_kickoff-notizen.md` |

**Regeln:**
- Keine Leerzeichen → Unterstriche `_`
- Keine Umlaute in Dateinamen (für technische Kompatibilität): ä→ae, ö→oe, ü→ue
- Immer Datum vorne → automatische Sortierung

---

## Ablage von Kunden-Assets

| Asset-Typ | Ablage | Anmerkung |
|-----------|--------|-----------|
| Briefing-Dokumente | `projekte/[PROJEKT]/00_briefing/` | Originale behalten |
| Logos, Bilder, Grafiken | `projekte/[PROJEKT]/00_briefing/assets/` | Unbearbeitet |
| Textdokumente (Word, Google Docs) | Export als PDF in `00_briefing/` | Original-Link notieren |
| Zugangsdaten (wenn nötig) | **Niemals in Textdateien** — Passwort-Manager (Bitwarden free) | DSGVO-relevant |
| Finale Lieferung | `projekte/[PROJEKT]/03_final/` | Archiviert nach Projektabschluss |

**Cloud-Sync:** Projektordner via Google Drive oder iCloud automatisch synchronisieren.
**DSGVO:** Kundendaten 6 Monate nach Projektabschluss löschen (laut Datenschutzkonzept).

---

## Versionskontrolle für Deliverables

| Situation | Vorgehen |
|-----------|---------|
| Neue Version eines Entwurfs | Neue Datei mit erhöhter Versionsnummer: v1 → v2 → v3 |
| Alte Versionen | Behalten bis Projektabschluss, dann archivieren oder löschen |
| Finales Deliverable | Immer als `final` markieren + Datum — nie überschreiben |
| Kunden schickt Änderungswünsche | Als neue Datei: `YYYY-MM-DD_[Kunde]_feedback-runde2.md` |
| Technische Dateien (Code, HTML) | GitHub-Repo für Webprojekte → natürliche Versionierung |

**Grundregel:** Niemals eine Datei überschreiben, die an Kunden gesendet wurde. Immer neue Version anlegen.

---

## Projektboard-Statusmodell

Für Notion-Kanban oder Google-Sheets-Spalte "Status":

| Status | Beschreibung |
|--------|-------------|
| `anfrage` | Erstkontakt eingegangen, noch kein Gespräch |
| `qualifizierung` | Gespräch geführt, Bedarf prüfen |
| `angebot-erstellen` | Scope klar, Angebot wird vorbereitet |
| `angebot-gesendet` | Angebot raus, warte auf Antwort |
| `aktiv` | Projekt läuft |
| `review` | Deliverable bei Kunde, warte auf Feedback |
| `abgeschlossen` | Lieferung + Zahlung erledigt |
| `verloren` | Kein Auftrag (mit Grund notieren) |
| `pausiert` | Auf Eis, Follow-up-Datum setzen |

---

*Dokument erstellt: 2026-04-04 | BertlClaw Business Workspace*
