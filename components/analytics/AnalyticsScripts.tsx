'use client'

/**
 * Analytics Scripts Component
 * 
 * Injects GA4 and Microsoft Clarity tracking scripts into the page.
 * Only loads scripts if the corresponding environment variables are set.
 * 
 * Environment Variables Required:
 *   - NEXT_PUBLIC_GA_MEASUREMENT_ID: GA4 Measurement ID (e.g., 'G-XXXXXXXXXX')
 *   - NEXT_PUBLIC_CLARITY_PROJECT_ID: Microsoft Clarity Project ID (10-12 char string)
 * 
 * To configure:
 *   1. Add these variables to .env.local
 *   2. Restart the dev server
 *   3. Verify in browser DevTools Network tab that scripts are loading
 * 
 * To verify GA4:
 *   - Use GA4 DebugView in Google Analytics
 *   - Check browser console for [Analytics] logs in development
 * 
 * To verify Clarity:
 *   - Check Microsoft Clarity dashboard for session recordings
 *   - Look for Clarity script in browser DevTools
 */

import { useEffect } from 'react'
import Script from 'next/script'
import clarity from '@microsoft/clarity'

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer?: any[]
    clarity?: (...args: any[]) => void
  }
}

export function AnalyticsScripts() {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'u98r7ys91f'

  // Initialize Microsoft Clarity - Deferred to not block page load
  useEffect(() => {
    if (clarityProjectId && typeof window !== 'undefined') {
      // Delay Clarity initialization to not block initial render
      const timeoutId = setTimeout(() => {
        try {
          clarity.init(clarityProjectId)
          if (process.env.NODE_ENV === 'development') {
            console.log('[Analytics] Microsoft Clarity initialized with project ID:', clarityProjectId)
          }
        } catch (error) {
          console.error('[Analytics] Error initializing Clarity:', error)
        }
      }, 2000) // Wait 2 seconds after page load
      
      return () => clearTimeout(timeoutId)
    }
  }, [clarityProjectId])

  return (
    <>
      {/* Google Analytics 4 - Deferred to not block page load */}
      {gaMeasurementId && (
        <>
          {/* Global Site Tag (gtag.js) - Load with lazyOnload strategy for better performance */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="lazyOnload"
            onLoad={() => {
              if (process.env.NODE_ENV === 'development') {
                console.log('[Analytics] GA4 script loaded')
              }
            }}
          />
          <Script id="ga4-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
                send_page_view: true,
              });
            `}
          </Script>
        </>
      )}
    </>
  )
}

