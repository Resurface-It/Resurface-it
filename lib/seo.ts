import type { Metadata } from 'next'

interface SEOOptions {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function generateMetadata({
  title,
  description,
  path = '',
  image = '/og-image.jpg',
  noIndex = false,
}: SEOOptions): Metadata {
  const siteUrl = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL 
    ? process.env.NEXT_PUBLIC_SITE_URL 
    : 'https://resurface-it.com'
  const fullUrl = `${siteUrl}${path}`

  return {
    title: `${title} | Resurface-it`,
    description,
    openGraph: {
      title: `${title} | Resurface-it`,
      description,
      url: fullUrl,
      siteName: 'Resurface-it',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Resurface-it`,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}

