import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { AnalyticsScripts } from '@/components/analytics/AnalyticsScripts'
import { PageViewTracker } from '@/components/analytics/PageViewTracker'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Reduced from 5 weights to 3 - only what's actually used
  variable: '--font-heading',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

import { companyInfo } from '@/data/company'
import { generateOrganizationSchema } from '@/lib/jsonld'

// Google Search Console verification token
// Set NEXT_PUBLIC_GSC_VERIFICATION_TOKEN in .env.local to enable verification
// Get the token from: https://search.google.com/search-console
const gscVerificationToken = process.env.NEXT_PUBLIC_GSC_VERIFICATION_TOKEN
const organizationSchema = generateOrganizationSchema()

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://resurface-it.com'),
  title: {
    default: 'Resurface-it | Siding Replacement & Painting Services in Eugene, Albany, Corvallis OR',
    template: '%s | Resurface-it',
  },
  description: 'Professional siding replacement and painting services in Eugene, Albany, Corvallis, Springfield OR. Top-rated contractors with 5-year warranty. Licensed & insured. Free estimates.',
  keywords: [
    'siding replacement Eugene OR',
    'exterior painting Eugene Oregon',
    'interior painting Eugene',
    'siding contractors Eugene',
    'house painters Eugene OR',
    'siding replacement Albany OR',
    'exterior painting Corvallis',
    'siding contractors Springfield OR',
    'professional painters Eugene',
    'home exterior services Eugene',
    'siding replacement',
    'exterior painting',
    'interior painting',
    'Eugene',
    'Albany',
    'Corvallis',
    'Springfield',
    'Oregon',
  ],
  authors: [{ name: 'Resurface-it' }],
  icons: {
    icon: '/Resurface-it.png',
    shortcut: '/Resurface-it.png',
    apple: '/Resurface-it.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resurface-it.com',
    siteName: 'Resurface-it',
    title: 'Resurface-it | Siding Replacement & Painting Services in Eugene, Albany, Corvallis OR',
    description: 'Professional siding replacement and painting services in Eugene, Albany, Corvallis, Springfield OR. Top-rated contractors with 5-year warranty.',
  },
  other: {
    'dns-prefetch': 'https://www.googletagmanager.com https://www.clarity.ms',
  },
  // Google Search Console verification
  ...(gscVerificationToken && {
    verification: {
      google: gscVerificationToken,
    },
  }),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Viewport meta tag - prevents zooming out and horizontal scrolling */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        
        {/* Resource Hints - Critical for Performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        
        {/* Preload critical hero image for homepage */}
        <link rel="preload" as="image" href="/images/Home-Landing.jpg" fetchPriority="high" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-surface text-slate-900">
        <AnalyticsScripts />
        <PageViewTracker />
        <SiteHeader />
        <main className="pt-36 md:pt-40 lg:pt-44">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}

