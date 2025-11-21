/**
 * Analytics tracking utilities for GA4
 * 
 * This module provides helper functions to track custom events in Google Analytics 4.
 * All functions safely check for the presence of gtag before making calls.
 * 
 * Usage:
 *   import { trackEvent, trackEstimateFormSubmit } from '@/lib/analytics'
 *   trackEstimateFormSubmit(true)
 * 
 * To add a new event:
 *   1. Create a helper function here (e.g., trackCustomAction)
 *   2. Call gtag('event', 'event_name', { ...params })
 *   3. Use the helper in your component
 */

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer?: any[]
  }
}

/**
 * Check if gtag is available
 */
function isGtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

/**
 * Core event tracking function
 * 
 * @param name - Event name (e.g., 'estimate_form_submit')
 * @param params - Optional event parameters
 */
export function trackEvent(name: string, params?: Record<string, any>): void {
  if (!isGtagAvailable()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Event:', name, params)
    }
    return
  }

  try {
    window.gtag!('event', name, params || {})
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error)
  }
}

/**
 * Track pageview (for SPA navigation)
 * 
 * @param path - Page path (e.g., '/services/siding-replacement')
 */
export function trackPageView(path: string): void {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!measurementId || !isGtagAvailable()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Pageview:', path)
    }
    return
  }

  try {
    window.gtag!('config', measurementId, {
      page_path: path,
    })
  } catch (error) {
    console.error('[Analytics] Error tracking pageview:', error)
  }
}

/**
 * Track estimate form view
 * Call this when the estimate form is rendered or comes into view
 */
export function trackEstimateFormView(): void {
  trackEvent('estimate_form_view', {
    event_category: 'engagement',
    event_label: 'estimate_form',
  })
}

/**
 * Track estimate form submission
 * 
 * @param success - Whether the submission was successful
 * @param additionalData - Optional additional data (e.g., city, service)
 */
export function trackEstimateFormSubmit(
  success: boolean,
  additionalData?: {
    city?: string
    service?: string
    formType?: 'full' | 'mini'
  }
): void {
  trackEvent('estimate_form_submit', {
    event_category: 'conversion',
    event_label: success ? 'success' : 'failure',
    value: success ? 1 : 0,
    ...additionalData,
  })
}

/**
 * Track click-to-call interactions
 * 
 * @param phone - Phone number that was clicked
 */
export function trackClickToCall(phone: string): void {
  trackEvent('click_to_call', {
    event_category: 'engagement',
    event_label: phone,
    value: 1,
  })
}

/**
 * Track city/service page view
 * 
 * @param city - City name (e.g., 'Eugene')
 * @param service - Service slug (e.g., 'siding-replacement')
 */
export function trackCityServicePageView(city: string, service: string): void {
  trackEvent('city_service_page_view', {
    event_category: 'page_view',
    event_label: `${city}_${service}`,
    city,
    service,
  })
}

/**
 * Track service page view
 * 
 * @param service - Service slug (e.g., 'siding-replacement')
 */
export function trackServicePageView(service: string): void {
  trackEvent('service_page_view', {
    event_category: 'page_view',
    event_label: service,
    service,
  })
}

/**
 * Track CTA button click
 * 
 * @param ctaText - Text of the CTA button (e.g., 'Get Free Estimate')
 * @param location - Where the CTA was clicked (e.g., 'hero', 'footer')
 */
export function trackCTAClick(ctaText: string, location?: string): void {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: ctaText,
    location: location || 'unknown',
  })
}

/**
 * Track gallery filter usage
 * 
 * @param filter - Filter value (e.g., 'siding', 'exterior-painting')
 */
export function trackGalleryFilter(filter: string): void {
  trackEvent('gallery_filter', {
    event_category: 'engagement',
    event_label: filter,
  })
}

