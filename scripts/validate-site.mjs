import Ajv from "ajv";
import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sitePath = join(root, "data", "site.json");
const schemaPath = join(root, "data", "site.schema.json");
const publicDir = join(root, "public");

function loadJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function containsHtmlBreakout(value) {
  return typeof value === "string" && /[<>]/.test(value);
}

function collectStringFields(obj, path = "") {
  const fields = [];
  if (typeof obj === "string") {
    fields.push({ path, value: obj });
    return fields;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      fields.push(...collectStringFields(item, `${path}[${index}]`));
    });
    return fields;
  }
  if (obj && typeof obj === "object") {
    for (const [key, value] of Object.entries(obj)) {
      fields.push(...collectStringFields(value, path ? `${path}.${key}` : key));
    }
  }
  return fields;
}

function main() {
  if (!existsSync(sitePath)) {
    console.error("Missing data/site.json");
    process.exit(1);
  }

  const site = loadJson(sitePath);
  const schema = loadJson(schemaPath);
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  if (!validate(site)) {
    console.error("Site schema validation failed:");
    for (const err of validate.errors ?? []) {
      console.error(`  - ${err.instancePath || "/"} ${err.message}`);
    }
    process.exit(1);
  }

  const errors = [];

  for (const { path, value } of collectStringFields(site)) {
    if (containsHtmlBreakout(value)) {
      errors.push(`site.json ${path}: must not contain < or >`);
    }
  }

  let siteHostname = "";
  try {
    siteHostname = new URL(site.siteUrl).hostname;
  } catch {
    errors.push("siteUrl is not a valid URL");
  }

  if (siteHostname && !site.siteUrl.startsWith(`https://${siteHostname}`)) {
    errors.push("siteUrl must use https without credentials or fragments");
  }

  for (const assetPath of [site.logo, ...site.heroImages]) {
    const filePath = join(publicDir, assetPath.replace(/^\//, ""));
    if (!existsSync(filePath)) {
      errors.push(`Asset missing on disk: public${assetPath}`);
    }
  }

  if (errors.length > 0) {
    console.error("Site validation failed:");
    for (const e of errors) {
      console.error(`  - ${e}`);
    }
    process.exit(1);
  }

  console.log(`Site OK: ${site.businessName} (${site.siteUrl})`);
}

main();
