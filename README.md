# Knite Kites — Static Catalog Website

A production-ready **static** kite catalog built with Next.js, TypeScript, and Tailwind CSS. Products are loaded from local JSON files. Customers browse the catalog and order via **WhatsApp** (no backend, no database).

## Features

- Home page with hero, featured products, categories, reviews, Instagram CTA
- Full catalog with search, category filter, and price/date sorting
- Product detail pages with gallery, specs, YouTube embed, QR codes, and reviews
- Dynamic WhatsApp order links: `Hi, I want to order {name} (ID:{id})`
- QR codes for WhatsApp orders and product pages
- Client-side admin at `/admin` with JSON export for deployment
- SEO: meta tags, Open Graph, sitemap, robots.txt, Product JSON-LD

## Tech stack

- Next.js 16 (App Router) with `output: "export"`
- TypeScript
- Tailwind CSS v4
- [qrcode](https://www.npmjs.com/package/qrcode) for client-side QR generation

## Project structure

```
knite/
├── app/                 # Routes (static pages)
├── components/          # UI components
├── data/                # products.json, categories.json, reviews.json, site.json
├── public/products/     # Product & category images
├── types/               # TypeScript interfaces
├── utils/               # Products, WhatsApp, SEO, admin helpers
└── scripts/             # Placeholder image generator
```

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
cd knite
npm install
npm run generate:assets   # optional — creates SVG placeholders
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Configuration

Edit **`data/site.json`** before going live:

| Field | Description |
|-------|-------------|
| `whatsappPhone` | Country code + number, no `+` (e.g. `15551234567`) |
| `instagramUrl` | Your Instagram profile URL |
| `siteUrl` | Production URL (used in SEO, sitemap, QR product links) |
| `businessName`, `tagline`, `description` | Branding copy |

### Products

Edit **`data/products.json`** or use **`/admin`**:

1. Add/edit/delete products in the browser
2. Click **Export products.json**
3. Replace `data/products.json` in the repo
4. Add image files under `public/products/` (paths must match JSON)
5. Run `npm run build` and redeploy

> **Note:** A deployed static site cannot write to the server filesystem. Admin changes persist in `localStorage` until you export and commit the updated JSON.

### Images

- Place files in `public/products/`
- Reference them in JSON as `/products/your-file.jpg`
- Run `npm run generate:assets` for demo SVG placeholders

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Static export to `out/` |
| `npm run start` | Serves production build (after `next build` without export, use `npx serve out` for static) |
| `npm run lint` | ESLint |
| `npm run generate:assets` | Generate SVG placeholders |

## Deployment

### Vercel

1. Import the `knite` repository
2. Framework preset: **Next.js**
3. Build command: `npm run build`
4. Output: Next.js static export is written to `out/` automatically

### Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `out`

Update `siteUrl` in `data/site.json` to your production domain before deploying.

## WhatsApp link format

```
https://wa.me/{phone}?text=Hi,%20I%20want%20to%20order%20{ProductName}%20(ID:{ProductId})
```

Example: **Sky Fighter Pro (ID:K101)**

## License

Private / demo project for Knite Kites.

