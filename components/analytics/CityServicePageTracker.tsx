'use client'

/**
 * City Service Page Tracker Component
 * 
 * Tracks pageviews for city/service combination pages (e.g., /eugene/siding-replacement)
 * 
 * Usage:
 *   <CityServicePageTracker city="Eugene" service="siding-replacement" />
 */

import { useEffect } from 'react'
import { trackCityServicePageView } from '@/lib/analytics'

interface CityServicePageTrackerProps {
  city: string
  service: string
}

export function CityServicePageTracker({ city, service }: CityServicePageTrackerProps) {
  useEffect(() => {
    trackCityServicePageView(city, service)
  }, [city, service])

  return null
}

