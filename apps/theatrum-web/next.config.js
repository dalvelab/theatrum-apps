/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui', 'platform'],
  images: {
    domains: ['127.0.0.1', '185.211.170.236', '77.232.135.125', 'admin.theatrum.center']
  }
}

module.exports = nextConfig
