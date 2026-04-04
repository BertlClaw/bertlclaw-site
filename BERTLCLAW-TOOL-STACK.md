# BERTLCLAW-TOOL-STACK.md
# Vollständiger Tool-Stack von BertlClaw

> Stand: 2026-04-04 · Verantwortlich: Dominic Reisenbichler

---

## Aktueller Stack

| Tool | Zweck | Kosten/Monat | Status | Alternative |
|---|---|---|---|---|
| **GitHub Pages** | Website Hosting (bertlclaw.at) | €0 | ✅ Aktiv | Netlify, Vercel |
| **Formspree** | Kontaktformular (kontakt.html) | €0 (free tier: 50 Einreichungen/Monat) | ✅ Aktiv | Netlify Forms, Basin |
| **GoatCounter** | Privacy-freundliche Analytics | €0 (self-serve, Open Source) | ✅ Installiert, E-Mail-Bestätigung ausstehend | Plausible (€9/mo), Fathom (€14/mo) |
| **world4you** | Domain-Registrar (bertlclaw.at) | ~€3.30 | ✅ Aktiv | Namecheap, Porkbun |
| **OpenClaw / Claude** | KI-Assistent, Website-Builds, Strategie | — | ✅ Aktiv | ChatGPT, Cursor |
| **Google Search Console** | SEO-Monitoring, Indexierungs-Status | €0 | ⏳ Setup ausstehend | Bing Webmaster Tools |
| **Google Sheets** | Lead-Liste, CRM-Ersatz | €0 | ⏳ Setup ausstehend | Airtable (€12/mo), Notion |
| **E-Mail @bertlclaw.at** | Professionelle E-Mail-Adresse | €0–6 | ⏳ Setup ausstehend | Fastmail (€5/mo), Zoho Mail (€0) |
| **GitHub (Org: BertlClaw)** | Versionskontrolle, öffentliches Repo | €0 | ✅ Aktiv | GitLab |

---

## Entscheidungsmatrix: Wann upgraden?

### Trigger: Erster zahlender Kunde

| Tool | Aktion |
|---|---|
| **Formspree** | Prüfe ob 50 Einreichungen/Monat reichen — wenn nicht, Basic-Plan (€10/mo) für mehr Kapazität + E-Mail-Benachrichtigung |
| **E-Mail @bertlclaw.at** | Jetzt einrichten (Zoho Mail Free oder world4you Business-Mail ~€3/mo) — professionelle Kommunikation ist Pflicht ab Kunde 1 |
| **Google Search Console** | Jetzt einrichten — kostenlos, kein Grund zum Warten |
| **Google Sheets** | Lead-Tracking starten — kostenlos, kein Grund zum Warten |

---

### Trigger: €1.000 MRR

| Tool | Aktion |
|---|---|
| **GoatCounter** | Evaluieren: Reicht GoatCounter noch, oder braucht es Plausible (€9/mo) mit mehr Detail? |
| **Formspree** | Upgrade auf Basic (€10/mo) wenn Einreichungen >50/mo oder wenn Team-Notifications gebraucht werden |
| **E-Mail** | Fastmail oder Proton Business (€5–6/mo) für professionellere Client-Kommunikation |
| **Google Sheets → Airtable** | Wenn Lead-Verwaltung zu komplex für Sheets wird: Airtable Free oder Plus (€12/mo) |
| **GitHub Actions** | CI/CD-Pipeline für automatisiertes Testing (HTML-Validierung, Linkprüfung) |

---

### Trigger: €3.000 MRR

| Tool | Aktion |
|---|---|
| **GitHub Pages → Netlify/Vercel** | Wenn Build-Zeiten, Preview-Deploys, Edge-Functions gebraucht werden |
| **Plausible Analytics** | €9/mo für bessere Insights, Goals, Conversion-Tracking |
| **CRM** | Pipedrive Starter (~€15/mo) oder HubSpot Free — wenn Lead-Pipeline zu groß für Sheets |
| **Stripe** | Wenn digitale Produkte oder Retainer-Rechnungen automatisiert werden sollen |
| **Cal.com / Calendly** | Terminbuchung für Erstgespräche automatisieren (Cal.com Free oder Paid €12/mo) |

---

## Rationale: Warum dieser Stack?

- **GitHub Pages**: Zero-Cost, versioniert, kein Server-Management, perfekt für statische HTML-Seiten
- **Formspree Free**: Reicht für Bootstrapping — 50 Anfragen/Monat sind mehr als genug vor dem ersten Kunden
- **GoatCounter**: DSGVO-konform, kein Cookie-Banner nötig, kostenlos — ideal für kleine Seiten
- **world4you**: Österreichischer Registrar, `.at`-Domain nativ unterstützt
- **No-Datenbank-Strategie**: Alles in Git und Google Sheets bis MRR-Schwellen erreicht sind

---

## Kosten-Übersicht (Aktuell)

| Kategorie | Kosten/Monat |
|---|---|
| Hosting | €0 |
| Domain | ~€3.30 |
| Formulare | €0 |
| Analytics | €0 |
| E-Mail | €0 (noch nicht aktiv) |
| **Gesamt** | **~€3.30/Monat** |

**Ziel:** Stack unter €15/Monat halten bis erster zahlender Kunde. Dann gezielt upgraden.

---

_Dieses Dokument bei jedem Tool-Wechsel oder Preisänderung aktualisieren._
