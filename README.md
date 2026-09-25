# elevate – project microsite

Microsite for **elevate** (elevator + validate), a Projeto em Engenharia Informática project at the Universidade de Aveiro, developed for the Câmara Municipal de Aveiro.

Built with Vite, React, TypeScript, Tailwind CSS and React Router (`HashRouter`, so every route works on GitHub Pages).

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # type-check and build into dist/
npm run preview   # serve the production build
```

## Where things are

| Path | What |
| --- | --- |
| `src/data/site.ts` | **All site content**: links, features, team, advisors, work plan, milestones, documentation. Edit text here. |
| `src/content/minutes/` | Meeting minutes, one `.md` file each. |
| `public/logos/` | Logos used by the site: `logo-light.webp` (light mode), `logo-dark.webp` (dark mode), `favicon.png`. Cropped, resized copies of `logos/logo_white.png` and `logos/logo_dark.png`. |
| `public/docs/elevate-proposal.pdf` | Project proposal, linked from the Documentation page. |
| `src/components/`, `src/pages/` | Reusable components and pages. |

Values in square brackets in `src/data/site.ts` (e.g. `[GITHUB LINK]`) are placeholders. Placeholder links render as disabled until you replace them.

### Team photos

Put the image in `public/team/` (e.g. `public/team/claudino.jpg`) and set `photo: './team/claudino.jpg'` for that person in `src/data/site.ts`.

### Canva presentations

In Canva: **Share → More → Embed**, copy the `src` URL from the embed code and paste it into `canvaEmbedUrl` of the milestone in `src/data/site.ts`.

## Add a meeting minute

1. Copy `src/content/minutes/_TEMPLATE.md` to a new file in the same folder, e.g. `03-requirements-review.md`. Files starting with `_` are ignored.
2. Fill in the front matter:

   ```md
   ---
   number: 3
   date: 2025-10-21
   title: Requirements review with the CMA
   ---
   ```

3. Write the minute in Markdown below it (GitHub Flavored Markdown: tables, task lists, etc.).
4. Commit and push. The minute appears on the Minutes page, newest first. The file name becomes the URL (`#/minutes/03-requirements-review`).

## Deploy

Deployment is automatic: `.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every push to `main`.

One-time setup in the GitHub repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The site uses a relative base (`base: './'` in `vite.config.ts`) and hash routes, so it works both on `https://<org>.github.io/` and on `https://<org>.github.io/<repo>/` without changes.
