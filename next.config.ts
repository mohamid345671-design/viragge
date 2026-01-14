import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Enable static export for Cloudflare Pages
  output: 'export',

  // Disable features incompatible with static export
  images: {
    unoptimized: true, // Required for static export
  },

  // Optimize production builds
  reactStrictMode: true,

  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
