/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["8422-103-197-204-100.ngrok-free.app"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
