'use client'

/**
 * Core Web Vitals Tracker
 * 
 * Tracks and reports Core Web Vitals metrics (LCP, FID, CLS) to Google Analytics.
 * These metrics are critical for understanding real user experience and SEO performance.
 * 
 * Metrics tracked:
 * - LCP (Largest Contentful Paint): Measures loading performance (target: ≤2.5s)
 * - FID (First Input Delay): Measures interactivity (target: ≤100ms)
 * - CLS (Cumulative Layout Shift): Measures visual stability (target: ≤0.1)
 * 
 * Based on Google's Core Web Vitals thresholds:
 * https://web.dev/vitals/
 */

import { useEffect } from 'react'

interface Metric {
  name: string
  value: number
  id: string
  delta: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // milliseconds
  FID: { good: 100, poor: 300 }, // milliseconds
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
      metric_rating: metric.rating,
      metric_value: metric.value,
      metric_id: metric.id,
    })
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Core Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
    })
  }
}

export function CoreWebVitalsTracker() {
  useEffect(() => {
    // Only run on client side - double check
    if (typeof window === 'undefined' || typeof document === 'undefined' || typeof PerformanceObserver === 'undefined') {
      return
    }

    // Use native PerformanceObserver API (works without additional dependencies)
    // For more accurate measurements, you can optionally install: npm install web-vitals
    const trackWebVitals = () => {
      try {
        if (!('PerformanceObserver' in window)) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('[Core Web Vitals] PerformanceObserver not supported in this browser')
          }
          return
        }
        // Track LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
            renderTime?: number
            loadTime?: number
            element?: Element
          }
          
          if (lastEntry) {
            const lcpValue = lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime
            sendToAnalytics({
              name: 'LCP',
              value: lcpValue,
              id: lastEntry.name || (lastEntry.element?.tagName || 'unknown'),
              delta: lcpValue,
              rating: getRating('LCP', lcpValue),
            })
          }
        })
        
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // Track FID (First Input Delay) - requires user interaction
        try {
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry) => {
              // Type assertion for first-input entry
              const fidEntry = entry as PerformanceEntry & {
                processingStart?: number
                startTime?: number
                name?: string
              }
              if (fidEntry.processingStart !== undefined && fidEntry.startTime !== undefined) {
                const fidValue = fidEntry.processingStart - fidEntry.startTime
                sendToAnalytics({
                  name: 'FID',
                  value: fidValue,
                  id: fidEntry.name || 'unknown',
                  delta: fidValue,
                  rating: getRating('FID', fidValue),
                })
              }
            })
          })
          
          fidObserver.observe({ entryTypes: ['first-input'] })
        } catch (e) {
          // FID tracking may not be supported in all browsers
          if (process.env.NODE_ENV === 'development') {
            console.warn('[Core Web Vitals] First Input Delay tracking not available')
          }
        }

        // Track CLS (Cumulative Layout Shift)
        let clsValue = 0
        let clsEntries: PerformanceEntry[] = []
        
        try {
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry) => {
              const layoutShift = entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean }
              // Only count layout shifts that weren't caused by user input
              if (!layoutShift.hadRecentInput && layoutShift.value) {
                clsEntries.push(entry)
                clsValue += layoutShift.value
              }
            })
          })
          
          clsObserver.observe({ entryTypes: ['layout-shift'] })

          // Report CLS when page is hidden (unload)
          const reportCLS = () => {
            if (clsValue > 0) {
              sendToAnalytics({
                name: 'CLS',
                value: clsValue,
                id: 'cumulative',
                delta: clsValue,
                rating: getRating('CLS', clsValue),
              })
            }
          }

          // Report CLS on page visibility change or before unload
          if (typeof document !== 'undefined') {
            document.addEventListener('visibilitychange', () => {
              if (document.visibilityState === 'hidden') {
                reportCLS()
              }
            })
          }

          if (typeof window !== 'undefined') {
            window.addEventListener('pagehide', reportCLS)
          }
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('[Core Web Vitals] Layout Shift tracking not available')
          }
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('[Core Web Vitals] Tracking enabled using native PerformanceObserver API')
          console.log('[Core Web Vitals] For more accurate measurements, install: npm install web-vitals')
        }
      } catch (error) {
        // Silently fail in production, log in development
        if (process.env.NODE_ENV === 'development') {
          console.error('[Core Web Vitals] Error initializing tracking:', error)
        }
      }
    }

    // Delay initialization slightly to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      trackWebVitals()
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return null
}

