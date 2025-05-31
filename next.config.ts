import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',            // enable static export
  basePath: '/ev-bunk-spotter', // your GitHub repo name
  trailingSlash: true,         // helps with routing on GitHub Pages

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
