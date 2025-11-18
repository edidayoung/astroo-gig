# 🧭 Countrivia SEO + PWA Setup Documentation

This document outlines how **Countrivia** is optimized for search engines, social sharing, and Progressive Web App (PWA) functionality.  
Everything here applies to both **Vercel-hosted** projects and future custom domains.

---

## 1️⃣ Basic Meta & Favicons

Add descriptive meta tags and favicons to your `<head>` for better SEO and device compatibility.

```html
<!-- Basic Meta -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Title -->
<title>Countrivia - The Pixel Art Country Quiz Game</title>

<!-- Favicons -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=2">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png?v=2">
<link rel="icon" href="/favicon-logo.svg" type="image/svg+xml">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
```

---

## 2️⃣ Open Graph (OG) Meta Tags

Open Graph tags ensure rich previews when the game link is shared on social media platforms like Facebook, Discord, or LinkedIn.

```html
<!-- Open Graph -->
<meta property="og:title" content="Countrivia">
<meta property="og:site_name" content="Countrivia">
<meta property="og:description" content="A pixel art style country quiz game.">
<meta property="og:image" content="https://countrivia-dusky.vercel.app/thumbnail-v5.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:type" content="website">
<meta property="og:url" content="https://countrivia-dusky.vercel.app/">
<meta property="og:locale" content="en_US">
```

---

## 3️⃣ Twitter Card Meta Tags

Adds Twitter/X card support so your link displays nicely when shared.

```html
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Countrivia">
<meta name="twitter:description" content="A pixel art style country quiz game.">
<meta name="twitter:image" content="https://countrivia-dusky.vercel.app/thumbnail-v5.jpg">
```

*(Optional: add your handle if available)*  
```html
<meta name="twitter:site" content="@countrivia">
```

---

## 4️⃣ SEO Meta Tags

These tags improve visibility and define how your game appears in search results.

```html
<!-- SEO -->
<meta name="description" content="Play Countrivia – a pixel art quiz game that challenges your knowledge of countries, flags, and geography. Perfect for trivia and flag lovers!">
<meta name="keywords" content="quiz game, country quiz, pixel art quiz, geography trivia, flag game">
<meta name="author" content="Adeolu Akinde">
```

> 💡 Note: Google ignores the `keywords` tag, but keeping it doesn’t hurt.

---

## 5️⃣ PWA Setup (manifest.json)

Create a `manifest.json` file for Progressive Web App functionality.  
This allows the game to be **installed** on mobile or desktop.

**File:** `/manifest.json`
```json
{
  "name": "Countrivia",
  "short_name": "Countrivia",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#000000",
  "description": "A pixel art style country quiz game.",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "icons/icon-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

**Link it in `<head>`:**
```html
<link rel="manifest" href="manifest.json">
```

**Icon Folder:**
```
/icons
 ├── icon-192.png
 ├── icon-512.png
 └── icon-maskable.png
```

---

## 6️⃣ Robots.txt

This file controls what crawlers can or cannot access.  
Place it in your project root (`/robots.txt`).

**File:** `/robots.txt`
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dev/

Sitemap: https://countrivia-dusky.vercel.app/sitemap.xml
```

---

## 7️⃣ Sitemap (for Google Search Console)

A sitemap helps search engines index your site efficiently.  
Place it in your root directory as `/sitemap.xml`.

**File:** `/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://countrivia-dusky.vercel.app/</loc>
    <lastmod>2025-09-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 8️⃣ Google Search Console Setup

### Steps:
1. Go to **[Google Search Console](https://search.google.com/search-console/welcome)**  
2. Choose **URL Prefix** (for `vercel.app`) or **Domain** (for a custom domain).
3. Add your site URL (e.g. `https://countrivia-dusky.vercel.app/`).
4. Choose **HTML tag verification**, then paste this into your `<head>`:
   ```html
   <meta name="google-site-verification" content="SnoUtNeC5F0R1uE-y4kEWhnlN4q7c9Fk3mk5IPqVXpw">
   ```
5. Once verified, go to **Indexing → Sitemaps** in the left menu.
6. Submit your sitemap:
   ```
   https://countrivia-dusky.vercel.app/sitemap.xml
   ```

---

## ✅ Summary

| Feature | Purpose |
|----------|----------|
| Title + Meta | Defines how your page appears in search results |
| Open Graph | Enables rich previews on Facebook/LinkedIn/Discord |
| Twitter Card | Enables rich previews on X/Twitter |
| Manifest.json | Enables PWA installation on devices |
| Robots.txt | Controls crawler access |
| Sitemap | Helps Google index your pages |
| GSC Verification | Confirms ownership and allows SEO tracking |

---

**Author:** Adeolu Akinde  
**Project:** Countrivia – Pixel Art Country Quiz Game  
**Host:** [Vercel](https://vercel.com)  
**URL:** [https://countrivia-dusky.vercel.app](https://countrivia-dusky.vercel.app)
