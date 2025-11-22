import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl

  // Set cache headers for static assets
  if (
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(jpg|jpeg|png|gif|ico|svg|webp|avif|woff|woff2|ttf|eot)$/i)
  ) {
    // Static assets: cache for 1 year with revalidation
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable, stale-while-revalidate=86400'
    )
    // Add ETag support
    response.headers.set('ETag', `"${Date.now()}"`)
  } else if (pathname.startsWith('/_next/image')) {
    // Next.js optimized images: cache for 1 year
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable, stale-while-revalidate=86400'
    )
  } else if (pathname.match(/\.(js|css|json|xml|txt)$/i)) {
    // JavaScript, CSS, and data files: cache for 1 year
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable, stale-while-revalidate=86400'
    )
  } else if (pathname.startsWith('/api/')) {
    // API routes: no cache or short cache
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  } else {
    // HTML pages: short cache with revalidation for optimal performance
    // This allows for fast navigation while ensuring fresh content
    response.headers.set(
      'Cache-Control',
      'public, max-age=0, must-revalidate, stale-while-revalidate=60'
    )
  }

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

