import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sholytics.org'),
  title: {
    default: 'SHOLYTICS LLC — AI-Powered Healthcare Innovation',
    template: '%s | SHOLYTICS LLC',
  },
  description:
    'SHOLYTICS develops AI research platforms advancing healthcare through decision support, early detection, drug shortage prediction, and precision medicine — improving outcomes for patients across America.',
  keywords: [
    'SHOLYTICS', 'MedAI Care', 'healthcare AI', 'CancerAI', 'DrugAI',
    'precision medicine', 'drug shortage prediction', 'clinical decision support',
    'medical AI', 'healthcare innovation', 'NIH', 'CMS value-based care',
  ],
  authors: [{ name: 'SHOLYTICS LLC' }],
  creator: 'SHOLYTICS LLC',
  openGraph: {
    title: 'SHOLYTICS LLC — AI-Powered Healthcare Innovation',
    description:
      'Six AI research platforms advancing cancer detection, drug shortage prevention, HIV treatment support, rural healthcare access, and precision medicine.',
    type: 'website',
    url: 'https://sholytics.org',
    siteName: 'SHOLYTICS LLC',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHOLYTICS LLC — AI-Powered Healthcare Innovation',
    description:
      'Advancing healthcare through AI-powered research, decision support, and better outcomes.',
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
