/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["dc20-103-197-204-100.ngrok-free.app"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
