/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@emotion/react',
  '@emotion/styled'
]); // Add other packages if needed

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['103.54.36.22'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '103.54.36.22',
        port: '8000',
        pathname: '/uploads/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withTM(nextConfig);
