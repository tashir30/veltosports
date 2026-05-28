import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public", "products");

function svg(label, colors) {
  const [bg, accent, text] = colors;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="#e0f2fe"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#sky)"/>
  <path d="M400 120 L520 280 L400 240 L280 280 Z" fill="${accent}" opacity="0.9"/>
  <path d="M400 240 L400 420" stroke="#334155" stroke-width="3"/>
  <circle cx="120" cy="100" r="40" fill="#fde68a" opacity="0.8"/>
  <text x="400" y="500" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="${text}">${label}</text>
</svg>`;
}

const files = {
  "placeholder.svg": ["Placeholder", ["#bae6fd", "#0284c7", "#0c4a6e"]],
  "hero-1.svg": ["Veltosports", ["#0c4a6e", "#38bdf8", "#fff"]],
  "hero-2.svg": ["Fly Higher", ["#164e63", "#22d3ee", "#fff"]],
  "hero-3.svg": ["Worldwide", ["#1e3a5f", "#60a5fa", "#fff"]],
  "cat-fighter.svg": ["Fighter", ["#fee2e2", "#dc2626", "#7f1d1d"]],
  "cat-premium.svg": ["Premium", ["#fef3c7", "#d97706", "#78350f"]],
  "cat-festival.svg": ["Festival", ["#fce7f3", "#db2777", "#831843"]],
  "cat-competition.svg": ["Competition", ["#e0e7ff", "#4f46e5", "#312e81"]],
  "cat-kids.svg": ["Kids", ["#d1fae5", "#059669", "#064e3b"]],
  "cat-international.svg": ["International", ["#f3e8ff", "#9333ea", "#581c87"]],
  "k101-1.svg": ["Sky Fighter Pro", ["#0ea5e9", "#0369a1", "#fff"]],
  "k101-2.svg": ["Sky Fighter Pro 2", ["#38bdf8", "#075985", "#fff"]],
  "k102-1.svg": ["Crimson Striker", ["#ef4444", "#991b1b", "#fff"]],
  "k201-1.svg": ["Goldcrest Elite", ["#f59e0b", "#b45309", "#fff"]],
  "k201-2.svg": ["Goldcrest Elite 2", ["#fbbf24", "#92400e", "#fff"]],
  "k301-1.svg": ["Rainbow Festival", ["#a855f7", "#ec4899", "#fff"]],
  "k401-1.svg": ["Apex Competition", ["#6366f1", "#4338ca", "#fff"]],
  "k501-1.svg": ["Little Cloud", ["#34d399", "#047857", "#fff"]],
  "k601-1.svg": ["Tokyo Rokkaku", ["#f472b6", "#be185d", "#fff"]],
  "k601-2.svg": ["Tokyo Rokkaku 2", ["#fb7185", "#9f1239", "#fff"]],
  "k602-1.svg": ["Brazilian Flow", ["#14b8a6", "#0f766e", "#fff"]],
};

mkdirSync(publicDir, { recursive: true });

for (const [name, [label, colors]] of Object.entries(files)) {
  writeFileSync(join(publicDir, name), svg(label, colors));
}

const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="24" fill="#0284c7"/>
  <path d="M64 24 L88 56 L64 48 L40 56 Z" fill="#fff"/>
  <path d="M64 48 L64 96" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
  <text x="64" y="118" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#fff">VELTO</text>
</svg>`;

writeFileSync(join(__dirname, "..", "public", "logo.svg"), logo);
console.log("Generated", Object.keys(files).length + 1, "SVG assets.");
