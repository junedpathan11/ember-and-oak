import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Photography is served from /public, so only the modern formats matter.
    formats: ["image/avif", "image/webp"],
    // Uncomment and add a host here if you switch content/site.ts to remote
    // images (e.g. Unsplash):
    // remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
