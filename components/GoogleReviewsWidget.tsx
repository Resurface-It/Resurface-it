'use client'

import { useEffect, useRef } from 'react'

interface GoogleReviewsWidgetProps {
  /**
   * Your Google Business Profile Place ID
   * Find it at: https://developers.google.com/maps/documentation/places/web-service/place-id
   * Or use the Google Maps URL: https://www.google.com/maps/place/?q=place_id:YOUR_PLACE_ID
   */
  placeId?: string
  /**
   * Alternative: Google Business Profile URL
   * Supports both short URLs (maps.app.goo.gl) and full URLs
   * Example: https://www.google.com/maps/place/Resurface-It+Inc/@44.0521,-123.0868
   * or: https://maps.app.goo.gl/zrCiSQGYawtB8bSZA
   */
  googleMapsUrl?: string
  /**
   * Minimum star rating to display (1-5)
   * Note: Google embed doesn't support filtering, but this is used for manual review filtering
   */
  minRating?: number
  /**
   * Number of reviews to display
   */
  reviewCount?: number
  /**
   * Widget height in pixels
   */
  height?: number
  /**
   * Custom CSS class
   */
  className?: string
}

/**
 * Google Reviews Widget Component
 * 
 * This component embeds Google reviews on your website.
 * 
 * SETUP INSTRUCTIONS:
 * 
 * Option 1: Using Google Place ID (Recommended)
 * 1. Go to https://developers.google.com/maps/documentation/places/web-service/place-id
 * 2. Search for your business
 * 3. Copy the Place ID
 * 4. Pass it as the `placeId` prop
 * 
 * Option 2: Using Google Maps URL
 * 1. Go to your Google Business Profile
 * 2. Copy the URL from the address bar
 * 3. Pass it as the `googleMapsUrl` prop
 * 
 * Option 3: Manual Embed (Alternative)
 * 1. Go to your Google Business Profile
 * 2. Click "Get more reviews" or "Share"
 * 3. Copy the embed code
 * 4. Use the GoogleReviewsEmbed component instead
 */
export function GoogleReviewsWidget({
  placeId,
  googleMapsUrl,
  minRating = 5,
  reviewCount = 5,
  height = 600,
  className = '',
}: GoogleReviewsWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // If no placeId or URL provided, show instructions
    if (!placeId && !googleMapsUrl) {
      containerRef.current.innerHTML = `
        <div style="padding: 2rem; text-align: center; background: #f3f4f6; border-radius: 8px;">
          <p style="color: #6b7280; margin-bottom: 1rem;">
            <strong>Google Reviews Widget Setup Required</strong>
          </p>
          <p style="color: #6b7280; font-size: 0.875rem;">
            Please add your Google Place ID or Google Maps URL to display reviews.
            <br />
            See component documentation for setup instructions.
          </p>
        </div>
      `
      return
    }

    // Convert short URL to embeddable format if needed
    const getEmbedUrl = (url: string): string => {
      // If it's a short URL (maps.app.goo.gl), convert to embed format
      if (url.includes('maps.app.goo.gl')) {
        // Short URLs redirect to full Google Maps URLs
        // For embedding, we'll append /embed to make it embeddable
        // Note: Short URLs may need to be converted to full URLs manually for best results
        // The short URL will work but may redirect
        return url.replace('maps.app.goo.gl', 'www.google.com/maps')
      }
      // If it's already a full Google Maps URL, ensure it's in embed format
      if (url.includes('google.com/maps')) {
        // If it doesn't already have /embed, we'll use it as-is
        // Google Maps URLs can be embedded directly
        return url
      }
      return url
    }

    // Method 1: Using Google Place ID with Google Maps Embed API
    if (placeId) {
      const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&q=place_id:${placeId}`
      
      containerRef.current.innerHTML = `
        <iframe
          width="100%"
          height="${height}"
          style="border:0; border-radius: 8px;"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="${embedUrl}">
        </iframe>
      `
    } else if (googleMapsUrl) {
      // Method 2: Using Google Maps URL (supports both short and full URLs)
      const embedUrl = getEmbedUrl(googleMapsUrl)
      
      // For short URLs, we'll embed them directly - Google will handle the redirect
      // Note: Google's embed doesn't support filtering by rating, but the reviews will be visible
      containerRef.current.innerHTML = `
        <iframe
          width="100%"
          height="${height}"
          style="border:0; border-radius: 8px;"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="${embedUrl}">
        </iframe>
        <p style="margin-top: 0.5rem; font-size: 0.75rem; color: #6b7280; text-align: center;">
          Showing all reviews. To filter 5-star reviews only, manually add them to testimonials data.
        </p>
      `
    }
  }, [placeId, googleMapsUrl, height, minRating])

  return (
    <div 
      ref={containerRef} 
      className={`google-reviews-widget ${className}`}
      style={{ width: '100%', minHeight: height }}
    />
  )
}

/**
 * Alternative: Manual Google Reviews Embed
 * 
 * Use this if you want to manually embed Google reviews using Google's embed code.
 * 
 * To get the embed code:
 * 1. Go to your Google Business Profile
 * 2. Click on "Get more reviews" or find the share/embed option
 * 3. Copy the iframe code provided by Google
 * 4. Use this component and pass the embed code
 */
interface GoogleReviewsEmbedProps {
  embedCode: string
  className?: string
}

export function GoogleReviewsEmbed({ embedCode, className = '' }: GoogleReviewsEmbedProps) {
  return (
    <div 
      className={`google-reviews-embed ${className}`}
      dangerouslySetInnerHTML={{ __html: embedCode }}
    />
  )
}

