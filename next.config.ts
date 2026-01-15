import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['mapbox-gl', 'react-map-gl'],
  // @ts-ignore
  turbopack: {
    root: 'C:/Users/samwe/Desktop/anti',
  },
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
