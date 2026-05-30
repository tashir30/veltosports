import type { NextConfig } from "next";

/**
 * Custom domain (veltosports.in): leave unset or NEXT_PUBLIC_BASE_PATH=""
 * GitHub project URL only (username.github.io/veltosports): set NEXT_PUBLIC_BASE_PATH=/veltosports
 */
const rawBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBase.replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // OneDrive/sync tools corrupt Turbopack's .sst cache files on Windows.
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
};

export default nextConfig;
