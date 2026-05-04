# Charlie May — ML Engineer Portfolio

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to Vercel (recommended)

1. Push this folder to a GitHub repo
2. Go to vercel.com → Add New Project → Import your repo
3. Vercel auto-detects Vite — just click Deploy
4. Live at `your-project.vercel.app` in ~60 seconds

## Custom domain (optional)

In Vercel dashboard → Project → Settings → Domains → Add your domain.
Point your domain's DNS A record to Vercel's IP (shown in the dashboard).
Vercel handles SSL automatically.

## File structure

```
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx       ← React entry point
    └── Portfolio.jsx  ← Main component (edit this)
```

## Updating content

All project data lives in the `projects` array at the top of `src/Portfolio.jsx`.
Each card has: id, tag, title, subtitle, summary, bullets[], stack[], impact, color.
