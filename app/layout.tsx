import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { PromotionalBanner } from '@/components/PromotionalBanner'
import { ClientOnly } from '@/components/ClientOnly'
import { AnalyticsScripts } from '@/components/analytics/AnalyticsScripts'
import { PageViewTracker } from '@/components/analytics/PageViewTracker'
import { SafeComponentWrapper } from '@/components/SafeComponentWrapper'
import { LazyCoreWebVitalsTracker } from '@/components/LazyCoreWebVitalsTracker'
import { LazyPagePrefetcher } from '@/components/LazyPagePrefetcher'

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
    default: 'Siding Replacement & Painting Eugene OR | Resurface-It',
    template: '%s | Resurface-It, Inc',
  },
  description:
    'Professional siding replacement & exterior house painting in Eugene, Albany, Corvallis & Springfield OR. 5-year workmanship warranty, licensed & insured, locally owned.',
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
  authors: [{ name: 'Resurface-It, Inc Siding, Roofing & Painting' }],
  icons: {
    icon: [
      { url: '/257529E2-6B87-4D4E-B81A-4713142427AF.PNG', sizes: 'any', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resurface-it.com',
    siteName: 'Resurface-It, Inc Siding, Roofing & Painting',
    title: 'Resurface-It, Inc | Siding, Roofing & Painting Services in Eugene, Albany, Corvallis OR',
    description: 'Professional siding replacement, roofing, and painting services in Eugene, Albany, Corvallis, Springfield OR. Top-rated contractors with 5-year warranty.',
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
        {/* Favicon Links - Full Support for Google Search Results */}
        <link
          rel="icon"
          type="image/png"
          sizes="any"
          href="/257529E2-6B87-4D4E-B81A-4713142427AF.PNG"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Resource Hints - Critical for Performance (keep for early connection) */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        
        {/* Structured Data - Keep in head for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-surface text-slate-900">
        {/* Google Tag Manager - Loaded with afterInteractive strategy to not block initial render */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-52PLS4BR');
            `,
          }}
        />
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-52PLS4BR"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {/* Google tag (gtag.js) - Loaded with afterInteractive strategy */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17795278955"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17795278955');
              gtag('config', 'G-R6WNQ9VY4G');
            `,
          }}
        />
        
        {/* Meta Pixel - Loaded with lazyOnload strategy (lowest priority) */}
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '3992623650881816');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=3992623650881816&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        
        <PromotionalBanner />
        <SiteHeader />
        <main className="pt-36 md:pt-40 lg:pt-44">{children}</main>
        <SiteFooter />
        <ClientOnly>
          <AnalyticsScripts />
          <PageViewTracker />
          <SafeComponentWrapper>
            <LazyCoreWebVitalsTracker />
          </SafeComponentWrapper>
          <SafeComponentWrapper>
            <LazyPagePrefetcher />
          </SafeComponentWrapper>
        </ClientOnly>
        <Analytics />
      </body>
    </html>
  )
}

