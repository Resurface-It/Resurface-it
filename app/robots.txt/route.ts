import { NextResponse } from 'next/server'

/**
 * Robots.txt Route
 * 
 * Generates a robots.txt file that:
 * - Allows all search engines to index the site
 * - Points to the sitemap.xml location
 * 
 * The sitemap URL is generated from NEXT_PUBLIC_SITE_URL environment variable.
 */

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resurface-it.com'
  const sitemapUrl = `${siteUrl}/sitemap.xml`

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}

