import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    // Use Cloudinary loader for Cloudflare Pages
    loader: 'custom',
    loaderFile: './cloudinary-loader.js',
  },

  // Optimize production builds
  reactStrictMode: true,

  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
