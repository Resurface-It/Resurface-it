'use client'

/**
 * Core Web Vitals Tracker
 * 
 * Tracks and reports Core Web Vitals metrics (LCP, INP, CLS) to Google Analytics.
 * These metrics are critical for understanding real user experience and SEO performance.
 * 
 * Metrics tracked:
 * - LCP (Largest Contentful Paint): Measures loading performance (target: ≤2.5s)
 * - INP (Interaction to Next Paint): Measures interactivity (target: ≤200ms) - replaces FID
 * - CLS (Cumulative Layout Shift): Measures visual stability (target: ≤0.1)
 * 
 * Uses web-vitals library for accurate measurements including INP support.
 * Based on Google's Core Web Vitals thresholds:
 * https://web.dev/vitals/
 */

import { useEffect } from 'react'
import { onLCP, onINP, onCLS, type Metric } from 'web-vitals'

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // milliseconds
  INP: { good: 200, poor: 500 }, // milliseconds
  CLS: { good: 0.1, poor: 0.25 }, // score
}

function getRating(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metricName as keyof typeof THRESHOLDS]
  if (!threshold) return 'needs-improvement'
  
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

function sendToAnalytics(metric: Metric) {
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      // Custom dimension for rating
      metric_rating: getRating(metric.name, metric.value),
      metric_value: metric.value,
      metric_id: metric.id,
    })
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Core Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: getRating(metric.name, metric.value),
      id: metric.id,
    })
  }
}

export function CoreWebVitalsTracker() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return
    }

    try {
      // Track LCP (Largest Contentful Paint)
      onLCP(sendToAnalytics)

      // Track INP (Interaction to Next Paint) - replaces FID as the interactivity metric
      // INP measures all interactions, not just the first one
      onINP(sendToAnalytics)

      // Track CLS (Cumulative Layout Shift)
      onCLS(sendToAnalytics)

      // Add performance marks for marquee animation start/end
      // This helps identify if marquee animations impact performance
      let marqueeTimeoutId: NodeJS.Timeout | null = null
      if (typeof window !== 'undefined' && window.performance && typeof window.performance.mark === 'function') {
        // Mark when marquee components are rendered
        const markMarqueeStart = () => {
          if (document.querySelector('.animate-marquee, .animate-marquee-slow')) {
            performance.mark('marquee-animation-start')
          }
        }
        
        // Delay mark slightly to ensure marquees are rendered
        marqueeTimeoutId = setTimeout(markMarqueeStart, 100)
      }

      // Cleanup function
      return () => {
        if (marqueeTimeoutId) {
          clearTimeout(marqueeTimeoutId)
        }
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('[Core Web Vitals] Tracking enabled using web-vitals library')
        console.log('[Core Web Vitals] Metrics: LCP, INP, CLS')
      }
    } catch (error) {
      // Silently fail in production, log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('[Core Web Vitals] Error initializing tracking:', error)
      }
    }
  }, [])

  return null
}

