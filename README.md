# Veltosports — Static Kite Catalog

Production-ready **static** kite catalog for [Veltosports](https://github.com/tashir30/veltosports). Built with Next.js, TypeScript, and Tailwind CSS. Products load from local JSON; customers order via **WhatsApp**.

**Live site (after deploy):** [https://tashir30.github.io/veltosports/](https://tashir30.github.io/veltosports/)

## Features

- Home page with hero, featured products, categories, reviews, Instagram CTA
- Catalog with search, category filter, and sorting
- Product pages with gallery, specs, YouTube embed, QR codes, reviews
- WhatsApp order links: `Hi, I want to order {name} (ID:{id})`
- Admin at `/admin` with JSON export for redeploy
- SEO: meta tags, Open Graph, sitemap, Product JSON-LD

## Tech stack

- Next.js 16 (App Router), `output: "export"`
- TypeScript, Tailwind CSS v4
- GitHub Pages (`basePath`: `/veltosports`)

## Project structure

```
veltosports/
├── app/
├── components/
├── data/                # site.json, products.json, …
├── public/products/
├── types/
├── utils/
└── .github/workflows/   # GitHub Pages deploy
```

## Getting started

```bash
npm install
npm run generate:assets
npm run dev
```

Local dev URL: [http://localhost:3000/veltosports/](http://localhost:3000/veltosports/)

### Configuration

Edit **`data/site.json`**:

| Field | Example |
|-------|---------|
| `whatsappPhone` | `15551234567` (country code, no `+`) |
| `instagramUrl` | Your Instagram profile |
| `siteUrl` | `https://tashir30.github.io/veltosports` |
| `businessName` | `Veltosports` |

## Deploy to GitHub Pages

Repo: **https://github.com/tashir30/veltosports**

1. Push this project to the `main` branch.
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually).
4. Site will be at **https://tashir30.github.io/veltosports/**

The workflow is in `.github/workflows/deploy.yml`.

### Update products

1. Use `/admin` or edit `data/products.json`
2. Export JSON from admin if needed; replace `data/products.json`
3. Add images under `public/products/`
4. Commit and push — Actions redeploys automatically

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server at `/veltosports/` |
| `npm run build` | Static export to `out/` |
| `npm run generate:assets` | SVG placeholders |
| `npm run lint` | ESLint |

## Custom domain

If you add a custom domain on GitHub Pages, update `siteUrl` in `data/site.json` and adjust `NEXT_PUBLIC_BASE_PATH` / `basePath` in `next.config.ts` (use `""` or `/` for root hosting).

## License

Private project for Veltosports.
