import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001'
      },
      {
        protocol: 'https',
        hostname: 'chat-backend-mvvj.onrender.com'
      }
    ]
  }
};

export default nextConfig;
