import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.nike.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'brand.assets.adidas.com',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;