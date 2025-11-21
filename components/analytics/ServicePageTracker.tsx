'use client'

/**
 * Service Page Tracker Component
 * 
 * Tracks pageviews for service detail pages (e.g., /services/siding-replacement)
 * 
 * Usage:
 *   <ServicePageTracker service="siding-replacement" />
 */

import { useEffect } from 'react'
import { trackServicePageView } from '@/lib/analytics'

interface ServicePageTrackerProps {
  service: string
}

export function ServicePageTracker({ service }: ServicePageTrackerProps) {
  useEffect(() => {
    trackServicePageView(service)
  }, [service])

  return null
}

