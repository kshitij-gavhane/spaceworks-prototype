import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The prototype uses no server routes, so it can be deployed anywhere as
  // static files instead of requiring a Next.js server.
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  trailingSlash: true,
  reactStrictMode: true,
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    // Static hosting does not provide Next's image optimisation server.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
