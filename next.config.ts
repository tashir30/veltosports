import type { NextConfig } from "next";

/** GitHub Pages project site: https://tashir30.github.io/veltosports/ */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/veltosports";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: `${basePath}/`,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
