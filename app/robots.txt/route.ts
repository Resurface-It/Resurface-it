import { NextResponse } from 'next/server'

/**
 * Robots.txt Route
 * 
 * Generates a robots.txt file that:
 * - Allows all search engines and AI crawlers to index the site
 * - Points to the sitemap.xml location
 * - Excludes pages that should not be indexed (e.g., thank-you pages)
 * 
 * The sitemap URL is generated from NEXT_PUBLIC_SITE_URL environment variable.
 */

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resurface-it.com'
  const sitemapUrl = `${siteUrl}/sitemap.xml`

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /thank-you
Disallow: /api/

# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Sitemap location
Sitemap: ${sitemapUrl}
`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}

