# Veltosports — Static Kite Catalog

Read-only static site. All content comes from JSON in GitHub. **Only you** can change the catalog by editing files in the repo and pushing — visitors cannot edit anything on the live site.

**Live site:** [https://veltosports.in](https://veltosports.in)  
**Repo:** [github.com/tashir30/veltosports](https://github.com/tashir30/veltosports)

## How to update products (GitHub workflow)

There is **no admin page** on the website.

1. Open [data/catalog.json](https://github.com/tashir30/veltosports/blob/main/data/catalog.json) on GitHub  
   **Or** clone the repo and edit locally.
2. Change `products`, `categories`, or `reviews` (see [docs/CATALOG_FIELDS.md](docs/CATALOG_FIELDS.md)).
3. If you add images, put files in **`public/products/`** and use matching paths in JSON (e.g. `/products/k103-1.jpg`).
4. Commit and push to **`main`**.
5. GitHub Actions runs `validate:catalog`, builds, and deploys to **veltosports.in**.

### Download → edit → upload (local)

```bash
git clone https://github.com/tashir30/veltosports.git
cd veltosports
# edit data/catalog.json
npm run validate:catalog   # optional check
git add data/catalog.json public/products/
git commit -m "Update catalog"
git push
```

### Edit directly on GitHub

1. Repo → `data/catalog.json` → pencil (Edit)
2. Save → Commit to `main`

## What lives where

| File | Purpose |
|------|---------|
| `data/catalog.json` | Products, categories, reviews (source of truth) |
| `data/catalog.template.json` | Example structure for new items |
| `data/site.json` | WhatsApp, Instagram, branding |
| `public/products/` | Product and category images |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).  
Your local site reflects whatever is in `data/catalog.json` on disk.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run validate:catalog` | Check JSON before you push |
| `npm run build` | Static export to `out/` |
| `npm run dev` | Local preview |

## Security note

The static site has **no backend** and **no write API**. Nobody can change your live catalog without access to your GitHub repository. Keep your GitHub account and repo access secure.

## Tech stack

Next.js 16 (static export), TypeScript, Tailwind CSS v4, GitHub Pages, custom domain `veltosports.in`.
