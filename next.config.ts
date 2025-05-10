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
      },
      {
        protocol: 'https',
        hostname: 'assets.adidas.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'photorankmedia-a.akamaihd.net',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'z2photorankmedia-a.akamaihd.net',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.converse.co.th',
        pathname: '/**'
      },
        {
        protocol: 'https',
        hostname: "image.goat.com",
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: "i.ebayimg.com",
        pathname: '/**'
      }
      
      
      
    ]
  }
};

export default nextConfig;