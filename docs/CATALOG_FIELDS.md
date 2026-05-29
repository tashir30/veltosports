# Catalog JSON field mapping

The live site is **read-only**. It is built from **`data/catalog.json`** in GitHub at deploy time. Visitors cannot change products on the website.

## Update workflow (GitHub only)

1. Open your repo: [github.com/tashir30/veltosports](https://github.com/tashir30/veltosports)
2. Edit **`data/catalog.json`** on GitHub (pencil icon) **or** download → edit locally → upload:
   - **Download:** repo → `data/catalog.json` → Raw → Save
   - **Edit** with VS Code or any text editor
   - **Validate locally (optional):** `npm run validate:catalog`
   - **Commit** to `main` (push or GitHub web UI “Commit changes”)
3. Add new images under **`public/products/`** in the same commit when needed
4. GitHub Actions validates and deploys to **https://veltosports.in** (about 1–3 minutes)

No admin page exists on the public site. Only you (with GitHub access) can change the catalog.

## File structure

```json
{
  "version": 1,
  "products": [],
  "categories": [],
  "reviews": []
}
```

Starter copy: **`data/catalog.template.json`**

## Products (`products[]`)

| Field | Required | Shown on site |
|-------|----------|----------------|
| `id` | Yes | URL `/products/k101/`, WhatsApp message, specs |
| `name` | Yes | Cards, detail title, SEO title |
| `price` | Yes | Cards and detail (currency from `site.json`) |
| `description` | Yes | Product detail page |
| `shortDescription` | No | Catalog cards (desktop) |
| `category` | Yes | Must match a `categories[].name` |
| `size` | Yes | Card (desktop) and specs |
| `featured` | Yes | Home “Featured Kites” when `true` |
| `images` | Yes | Card + gallery; files in `public/products/` |
| `youtube` | No | Detail “Flying Video” if set |
| `specifications` | No | Detail specs table |
| `createdAt` | No | Sort “Latest” (`YYYY-MM-DD`) |

### Add a product

Add an object to `products[]` with a unique `id`, valid `category`, and `images` paths. Commit and push.

### Update / remove

Edit or delete the product object, then commit and push.

## Categories (`categories[]`)

| Field | Shown on site |
|-------|----------------|
| `name` | Must match `products[].category` |
| `slug` | URL `/categories/{slug}/` |
| `description` | Category page |
| `image` | Home + category banner |

## Reviews (`reviews[]`)

| Field | Shown on site |
|-------|----------------|
| `id` | Unique |
| `author`, `rating`, `text`, `date` | Home + product detail |
| `productId` | Optional link to a product |

## Site settings

**`data/site.json`** — WhatsApp, Instagram, domain, branding (separate from catalog).

## Validate before push

```bash
npm run validate:catalog
```

CI runs this automatically on every deploy.
