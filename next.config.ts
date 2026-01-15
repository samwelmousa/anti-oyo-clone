import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['mapbox-gl', 'react-map-gl'],
  // Turbopack will auto-detect the root directory
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
