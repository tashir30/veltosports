import Ajv from "ajv";
import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const catalogPath = join(root, "data", "catalog.json");
const schemaPath = join(root, "data", "catalog.schema.json");
const publicDir = join(root, "public");

function loadJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function uniqueCheck(items, keyFn, label) {
  const seen = new Set();
  const errors = [];
  for (const item of items) {
    const key = keyFn(item);
    if (seen.has(key)) {
      errors.push(`Duplicate ${label}: ${key}`);
    }
    seen.add(key);
  }
  return errors;
}

function main() {
  if (!existsSync(catalogPath)) {
    console.error("Missing data/catalog.json");
    process.exit(1);
  }

  const catalog = loadJson(catalogPath);
  const schema = loadJson(schemaPath);
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  if (!validate(catalog)) {
    console.error("Schema validation failed:");
    for (const err of validate.errors ?? []) {
      console.error(`  - ${err.instancePath || "/"} ${err.message}`);
    }
    process.exit(1);
  }

  const errors = [
    ...uniqueCheck(catalog.products, (p) => p.id.toUpperCase(), "product id"),
    ...uniqueCheck(catalog.categories, (c) => c.slug, "category slug"),
    ...uniqueCheck(catalog.reviews, (r) => r.id, "review id"),
  ];

  const categoryNames = new Set(
    catalog.categories.map((c) => c.name.toLowerCase()),
  );
  const productIds = new Set(
    catalog.products.map((p) => p.id.toUpperCase()),
  );

  for (const product of catalog.products) {
    if (!categoryNames.has(product.category.toLowerCase())) {
      errors.push(
        `Product ${product.id}: category "${product.category}" not found in categories[]`,
      );
    }
    for (const img of product.images) {
      const filePath = join(publicDir, img.replace(/^\//, ""));
      if (!existsSync(filePath)) {
        errors.push(
          `Product ${product.id}: image missing on disk: public${img}`,
        );
      }
    }
  }

  for (const category of catalog.categories) {
    const filePath = join(publicDir, category.image.replace(/^\//, ""));
    if (!existsSync(filePath)) {
      errors.push(`Category ${category.slug}: image missing: public${category.image}`);
    }
  }

  for (const review of catalog.reviews) {
    if (review.productId && !productIds.has(review.productId.toUpperCase())) {
      errors.push(
        `Review ${review.id}: productId ${review.productId} not in products[]`,
      );
    }
  }

  if (errors.length > 0) {
    console.error("Catalog validation failed:");
    for (const e of errors) {
      console.error(`  - ${e}`);
    }
    process.exit(1);
  }

  console.log(
    `Catalog OK: ${catalog.products.length} products, ${catalog.categories.length} categories, ${catalog.reviews.length} reviews`,
  );
}

main();
