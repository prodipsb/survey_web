/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withTM = require('next-transpile-modules')(['@mui/material', '@emotion/react', '@emotion/styled']); // Add other packages as needed

module.exports = withTM({
  // other Next.js config options here
});

// module.exports = nextConfig;

module.exports = {
  images: {
    domains: [process?.env?.NEXT_PUBLIC_BASE_URL],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};