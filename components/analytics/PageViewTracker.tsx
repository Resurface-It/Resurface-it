'use client'

/**
 * PageView Tracker Component
 * 
 * Automatically tracks pageviews for SPA navigation in Next.js App Router.
 * GA4 and Facebook Pixel do not automatically track client-side navigation, 
 * so this component listens for route changes and sends pageview events.
 * 
 * Usage:
 *   Add <PageViewTracker /> to your root layout (already done in layout.tsx)
 * 
 * How it works:
 *   1. Uses usePathname() to detect route changes
 *   2. Calls trackPageView() on mount and when pathname changes
 *   3. Tracks Facebook Pixel pageviews on route changes
 *   4. Safely handles SSR (only runs on client)
 */

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView } from '@/lib/analytics'

// Extend Window interface for Facebook Pixel
declare global {
  interface Window {
    fbq?: (
      command: 'track' | 'trackCustom' | 'init' | 'set',
      eventName: string,
      params?: Record<string, any>
    ) => void
  }
}

export function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Defer tracking slightly to not block initial render
    const timeoutId = setTimeout(() => {
      // Build full path with query params if they exist
      const fullPath = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname

      // Track pageview in Google Analytics
      trackPageView(fullPath)

      // Track pageview in Facebook Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        try {
          window.fbq('track', 'PageView')
        } catch (error) {
          console.error('[Analytics] Error tracking Facebook Pixel pageview:', error)
        }
      }
    }, 100) // Small delay to prioritize page rendering
    
    return () => clearTimeout(timeoutId)
  }, [pathname, searchParams])

  return null
}

