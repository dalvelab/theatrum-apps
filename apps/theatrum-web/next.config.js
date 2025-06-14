/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui", "platform"],
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

module.exports = nextConfig
