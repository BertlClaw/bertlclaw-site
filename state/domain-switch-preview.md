# Domain Switch Preview — bertlclaw.at

**Generated:** 2026-04-03  
**Script:** `bertlclaw-tools/switch-to-custom-domain.sh`  
**Mode:** DRY RUN (no files modified)

---

## Summary

| | |
|---|---|
| **Old URL (with slash)** | `https://bertlclaw.at/` |
| **New URL (with slash)** | `https://bertlclaw.at/` |
| **Old URL (no slash)** | `https://bertlclaw.at` |
| **New URL (no slash)** | `https://bertlclaw.at` |
| **Files with changes** | 17 |
| **Total replacements** | 97 |

---

## Pre-applied Changes (already done)

- `robots.txt` — Sitemap line already updated to `https://bertlclaw.at/sitemap.xml`
- `CNAME` — Created with content `bertlclaw.at` (GitHub Pages custom domain)

---

## Files Affected by `--apply`

| File | Replacements |
|------|-------------|
| `danke.html` | 1 |
| `datenschutz.html` | 4 |
| `digital-clarity-setup.html` | 4 |
| `digitale-struktur-systeme.html` | 1 |
| `impressum.html` | 4 |
| `index.html` | 21 |
| `ki-fuer-selbststaendige.html` | 1 |
| `landingpages.html` | 1 |
| `landingpage-sprint.html` | 4 |
| `mvp-digitale-produktideen.html` | 1 |
| `positionierung-website-texte.html` | 4 |
| `proof.html` | 3 |
| `services.html` | 7 |
| `sitemap.xml` | 15 |
| `ueber-bertlclaw.html` | 18 |
| `use-cases.html` | 7 |
| `website-texte-positionierung.html` | 1 |

---

## What Gets Updated in Each File

Canonical URLs, Open Graph URLs (`og:url`, `og:image`), Twitter card images,
JSON-LD structured data (`@id`, `url`, `logo`, `image`, `founder`, `isPartOf`, breadcrumbs),
and all sitemap `<loc>` entries.

---

## How to Apply

When `bertlclaw.at` is live and DNS is propagated:

```bash
cd /home/dominic/.openclaw/workspace
bash bertlclaw-tools/switch-to-custom-domain.sh --apply
```

A timestamped backup will be created in `/tmp/bertlclaw-backup-YYYYMMDD_HHMMSS/` before any changes.

---

## robots.txt (already updated)

```
User-agent: *
Allow: /

Sitemap: https://bertlclaw.at/sitemap.xml
```

## CNAME (already created)

```
bertlclaw.at
```
