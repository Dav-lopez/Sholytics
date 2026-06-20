import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Next.js 16: Turbopack is default, explicit opt-in no longer needed
}

export default nextConfig
