/** @type {import('next').NextConfig} */

// Where the chat talks to (the DrugAI app). Allowed in connect-src so the browser can reach it.
const supportApi = (process.env.NEXT_PUBLIC_SUPPORT_API_URL || '').replace(/\/$/, '')

// Security headers for every page and API route. The Content-Security-Policy keeps
// 'unsafe-inline' for scripts and styles because Next.js and Framer Motion inject inline
// code; the rest still blocks plugins, framing by other sites, foreign form targets and
// connections anywhere except this site and the help desk.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://images.unsplash.com",
  `connect-src 'self'${supportApi ? ` ${supportApi}` : ''}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "object-src 'none'",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
]

const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

module.exports = nextConfig
