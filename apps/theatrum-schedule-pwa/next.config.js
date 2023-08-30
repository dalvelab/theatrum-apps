/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['127.0.0.1', '185.211.170.236', '77.232.135.125', 'admin.theatrum.center']
  }
})
