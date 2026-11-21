# Khanyi in Motion

The personal creative world of Siya Khanyi — style, systems, strength and stories.

## Approved baseline

**v20 — Synced Chapter Status (21 November 2026).** This is the approved version. Do not substitute the earlier v18 or the rejected v21.

## Project structure

- `index.html` — complete static website, including the CSS, JavaScript and embedded original imagery.

No Node.js install, dependency build, or environment variables are required for this version.

## Preview locally

Serve this folder using any static file server, for example:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Deployment

Existing Vercel project: `khanyi-in-motion`

Production website: https://khanyi-in-motion.vercel.app

The intended integration is this repository's `main` branch connected to that **existing** Vercel project, not a second production project. Verify the preview deployment before releasing a design change. Vercel's Git connection is managed in **Project → Settings → Git**.
