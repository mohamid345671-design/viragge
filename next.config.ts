import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Enable modern image formats for better compression
    formats: ['image/avif', 'image/webp'],

    // Optimize device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Allow external image domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'salmon-cattle-403149.hostingersite.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],

    // Cache optimized images for better performance
    minimumCacheTTL: 60,

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
