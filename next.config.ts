import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Use custom Cloudinary loader for image optimization on Cloudflare Pages
    loader: 'custom',
    loaderFile: './cloudinary-loader.js',

    // Optimize device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Note: remotePatterns not needed with Cloudinary Fetch API
    // Cloudinary will fetch and optimize images from any URL

    // Allow SVG images (use with caution)
    dangerouslyAllowSVG: true,
  },

  // Optimize production builds
  reactStrictMode: true,

  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
