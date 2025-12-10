import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'api.escuelajs.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
