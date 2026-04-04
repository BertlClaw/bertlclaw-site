# BertlClaw.com Setup Instructions

This document explains how to redirect `bertlclaw.com` → `bertlclaw.at`.

---

## Option A: GitHub Pages Redirect (Recommended)

### Step 1: Create a new GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it: `bertlclaw-com` (or `bertlclaw.com`)
3. Set to **Public**
4. Do **not** initialize with README

### Step 2: Add files to the repo

Upload two files:

**`index.html`** — copy from `bertlclaw-com-redirect.html` in the main repo:
```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0;url=https://bertlclaw.at/" />
  <link rel="canonical" href="https://bertlclaw.at/" />
  <title>BertlClaw – Weiterleitung</title>
</head>
<body>
  <p>Diese Seite wurde verschoben. <a href="https://bertlclaw.at/">Hier klicken</a> um weiterzugehen.</p>
</body>
</html>
```

**`CNAME`** — plain text file (no extension) with exactly:
```
bertlclaw.com
```

### Step 3: Enable GitHub Pages

1. Go to repo **Settings → Pages**
2. Source: **Deploy from branch → main → / (root)**
3. Save
4. Custom domain: enter `bertlclaw.com` and save

### Step 4: Set DNS at world4you

Log into [world4you.com](https://www.world4you.com) → Domain Management → `bertlclaw.com` → DNS settings.

#### A-Records (GitHub Pages IPs for bertlclaw.com apex):

| Type | Host | Value          | TTL  |
|------|------|----------------|------|
| A    | @    | 185.199.108.153 | 3600 |
| A    | @    | 185.199.109.153 | 3600 |
| A    | @    | 185.199.110.153 | 3600 |
| A    | @    | 185.199.111.153 | 3600 |

#### CNAME for www subdomain:

| Type  | Host | Value                    | TTL  |
|-------|------|--------------------------|------|
| CNAME | www  | BertlClaw.github.io      | 3600 |

> **Note:** Replace `BertlClaw` with the exact GitHub username/org name.

### Step 5: Verify

After DNS propagates (up to 48h), visit `https://bertlclaw.com` — it should instantly redirect to `https://bertlclaw.at/`.

Enable HTTPS in the GitHub Pages settings once DNS is live.

---

## Option B: DNS-Level Redirect via world4you

world4you supports **URL forwarding/redirect** for domains. This is simpler but less SEO-clean.

1. Log into world4you → Domain Management → `bertlclaw.com`
2. Look for **"URL-Weiterleitung"** or **"Redirect"** settings
3. Set **301 Permanent Redirect** from `bertlclaw.com` → `https://bertlclaw.at/`
4. Also set `www.bertlclaw.com` → `https://bertlclaw.at/`

**Pros:** Simple, no extra repo needed
**Cons:** DNS-level redirects may not pass full SEO value; the `canonical` tag in the redirect HTML won't be read at the DNS level

---

## SEO Notes

- Use **301 (permanent) redirect** — not 302 (temporary)
- The `<link rel="canonical" href="https://bertlclaw.at/">` in the HTML ensures search engines attribute all authority to the `.at` domain
- Google will eventually consolidate both domains under `bertlclaw.at`
- Register `bertlclaw.com` as a property in Google Search Console as well, even if just to monitor redirect behavior

---

## Summary Checklist

- [ ] Create GitHub repo `bertlclaw-com` with `index.html` + `CNAME`
- [ ] Enable GitHub Pages on that repo
- [ ] Set A-records for `bertlclaw.com` in world4you
- [ ] Set CNAME for `www.bertlclaw.com` in world4you
- [ ] Verify redirect works after DNS propagation
- [ ] Enable HTTPS on GitHub Pages
- [ ] Add `bertlclaw.com` to Google Search Console
