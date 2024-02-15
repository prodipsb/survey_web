/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: [process?.env?.NEXT_PUBLIC_BASE_URL],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};