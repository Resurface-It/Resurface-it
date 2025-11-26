'use client'

/**
 * Page Prefetcher Component
 * 
 * Prefetches likely next pages based on current page context to improve navigation speed.
 * Uses <link rel="prefetch"> to hint to the browser about pages users are likely to visit.
 * 
 * Prefetching strategy:
 * - Homepage: Prefetch main navigation pages (services, gallery, about)
 * - Service pages: Prefetch related services and areas-we-serve
 * - City pages: Prefetch service pages for that city
 * - All pages: Prefetch contact and estimate pages (high conversion intent)
 */

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://resurface-it.com'

function prefetchPage(href: string) {
  if (typeof window === 'undefined') return

  // Check if link already exists
  const existingLink = document.querySelector(`link[rel="prefetch"][href="${href}"]`)
  if (existingLink) return

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  link.as = 'document'
  document.head.appendChild(link)
}

export function PagePrefetcher() {
  const pathname = usePathname()

  useEffect(() => {
    // Double check we're on client side
    if (!pathname || typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    let timeoutId: NodeJS.Timeout | null = null

    // Lazy load data to avoid issues with module resolution
    const loadData = async () => {
      try {
        const [{ primaryCities }, { services }] = await Promise.all([
          import('@/data/cities'),
          import('@/data/services'),
        ])

        // Common high-priority pages to prefetch from any page
        const commonPages = [
          '/contact',
          '/services',
          '/gallery',
          '/about',
        ]

        // Homepage: Prefetch main navigation pages
        if (pathname === '/') {
          commonPages.forEach((page) => {
            prefetchPage(`${SITE_URL}${page}`)
          })
          
          // Prefetch first city page (likely next destination)
          if (primaryCities.length > 0) {
            prefetchPage(`${SITE_URL}/${primaryCities[0].slug}`)
          }
        }

        // City pages: Prefetch service pages for that city
        const citySlug = pathname.split('/')[1]
        const currentCity = primaryCities.find((city) => city.slug === citySlug)
        
        if (currentCity && pathname === `/${citySlug}`) {
          // Prefetch highlighted services for this city
          currentCity.highlightedServices.forEach((serviceSlug) => {
            prefetchPage(`${SITE_URL}/${citySlug}/${serviceSlug}`)
          })
          
          // Prefetch areas-we-serve (related content)
          prefetchPage(`${SITE_URL}/areas-we-serve`)
        }

        // Service pages: Prefetch related services
        if (pathname.startsWith('/services/')) {
          const serviceSlug = pathname.split('/services/')[1]
          const currentService = services.find((s) => s.slug === serviceSlug)
          
          if (currentService) {
            // Prefetch related services (first 3)
            services
              .filter((s) => s.slug !== serviceSlug)
              .slice(0, 3)
              .forEach((service) => {
                prefetchPage(`${SITE_URL}/services/${service.slug}`)
              })
          }
          
          // Prefetch areas-we-serve
          prefetchPage(`${SITE_URL}/areas-we-serve`)
        }

        // Services listing page: Prefetch first few service detail pages
        if (pathname === '/services') {
          services.slice(0, 4).forEach((service) => {
            prefetchPage(`${SITE_URL}/services/${service.slug}`)
          })
        }

        // Gallery page: Prefetch about page (common next step)
        if (pathname === '/gallery') {
          prefetchPage(`${SITE_URL}/about`)
          prefetchPage(`${SITE_URL}/contact`)
        }

        // About page: Prefetch warranty and contact
        if (pathname === '/about') {
          prefetchPage(`${SITE_URL}/warranty`)
          prefetchPage(`${SITE_URL}/contact`)
        }

        // Always prefetch common pages from any page (with delay to not impact current page)
        timeoutId = setTimeout(() => {
          commonPages.forEach((page) => {
            prefetchPage(`${SITE_URL}${page}`)
          })
        }, 2000) // Wait 2 seconds after page load
      } catch (error) {
        // Silently fail if data can't be loaded
        if (process.env.NODE_ENV === 'development') {
          console.warn('[PagePrefetcher] Could not load data for prefetching:', error)
        }
      }
    }

    loadData()

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [pathname])


  return null
}

