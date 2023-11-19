/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["http://4.193.55.34:8000"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
