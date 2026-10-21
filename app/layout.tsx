import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sholytics.org'),
  title: {
    default: 'SHOLYTICS LLC — Healthcare Intelligence, Starting with DrugAI',
    template: '%s | SHOLYTICS LLC',
  },
  description:
    'SHOLYTICS builds healthcare intelligence products, starting with DrugAI: a medication supply prototype that helps pharmacy and hospital procurement teams see which items may run out before the next delivery.',
  keywords: [
    'SHOLYTICS', 'DrugAI', 'medication supply', 'drug shortages', 'pharmacy inventory',
    'hospital pharmacy procurement', 'days of supply', 'healthcare intelligence',
    'MedAI Care', 'clinical AI research',
  ],
  authors: [{ name: 'SHOLYTICS LLC' }],
  creator: 'SHOLYTICS LLC',
  openGraph: {
    title: 'SHOLYTICS LLC — Healthcare Intelligence, Starting with DrugAI',
    description:
      'DrugAI helps pharmacy and hospital procurement teams spot medication supply gaps before the next delivery. Now inviting design partners.',
    type: 'website',
    url: 'https://sholytics.org',
    siteName: 'SHOLYTICS LLC',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHOLYTICS LLC — Healthcare Intelligence, Starting with DrugAI',
    description:
      'DrugAI: see medication supply gaps before they reach your shelf. Now inviting design partners.',
    creator: '@sholytics',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://sholytics.org',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
