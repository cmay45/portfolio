# Signalcraft Analytics Site Package

This is a Vite + React + Vercel package for the Signalcraft Analytics site.

## Included

- Header using the uploaded Signalcraft logo: `public/FF-01.png`
- Orbit hero with three subtle fading blips
- Homepage messaging sections
- Contact popup
- Vercel serverless contact endpoint: `api/contact.js`
- No-cookie Privacy & Security page
- No cookies, no tracking pixels, no analytics script

## Install

```bash
npm install
```

## Local development

```bash
cp .env.local.example .env.local
npm run dev
```

For local testing, set:

```txt
ALLOWED_ORIGIN=http://localhost:5173
```

## Vercel environment variables

In Vercel Project → Settings → Environment Variables:

```txt
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
CONTACT_TO=signalcraftanalytics@gmail.com
CONTACT_FROM=Signalcraft Analytics <no-reply@signalcraftanalytics.com>
ALLOWED_ORIGIN=https://signalcraftanalytics.com
```

`CONTACT_FROM` can use `no-reply@signalcraftanalytics.com` after your sending domain is verified in Resend. It does not need to be a real inbox.

## Deploy

Push this package to GitHub and connect it to Vercel, or copy these files into your existing Vercel repo.

Build command:

```bash
npm run build
```

Output directory:

```txt
dist
```

## Notes

The contact form uses non-cookie spam controls:
- honeypot field
- minimum submit time
- server-side validation
- origin check
- link/spam pattern filtering

If spam becomes a real issue, add server-side rate limiting with Vercel KV or Upstash before adding CAPTCHA.


## Refined copy / SEO notes

This version includes:

- `public/robots.txt`
- `public/sitemap.xml`
- `<meta name="robots" content="index, follow" />`
- `vercel.json` with `X-Robots-Tag: index, follow`

After deployment, submit this sitemap in Google Search Console:

```txt
https://signalcraftanalytics.com/sitemap.xml
```
