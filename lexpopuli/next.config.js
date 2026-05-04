/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { allowedOrigins: ['superanum.pl', 'www.superanum.pl'] }
  }
}

module.exports = nextConfig
