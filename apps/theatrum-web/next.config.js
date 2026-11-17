const path = require("node:path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Корень монорепо: иначе Next 15 может взять чужой lockfile выше по дереву
  outputFileTracingRoot: path.join(__dirname, "../.."),
  transpilePackages: ["ui", "platform"],
  // Линтинг вынесен в Biome (biome.json), next lint не используется
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_HOSTNAME,
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path",
        destination: `${process.env.NEXT_PUBLIC_HOSTNAME}/uploads/:path`,
      },
      {
        source: "/api/:path",
        destination: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/:path`,
      },
    ];
  },
};

module.exports = nextConfig;
