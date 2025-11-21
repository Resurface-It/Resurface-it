# Analytics & SEO Integration Guide

This document explains how analytics and SEO tracking are set up in the Resurface-it marketing site.

## Overview

The site integrates:
- **Google Analytics 4 (GA4)** - Event tracking and pageview analytics
- **Microsoft Clarity** - Session recordings and heatmaps
- **Google Search Console** - Domain verification
- **Automatic SEO** - Sitemap, robots.txt, and structured data

## Environment Variables

Add these to your `.env.local` file:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Microsoft Clarity
NEXT_PUBLIC_CLARITY_PROJECT_ID=your-project-id

# Site URL (for canonical URLs and sitemap)
NEXT_PUBLIC_SITE_URL=https://www.resurface-it.com

# Google Search Console Verification
NEXT_PUBLIC_GSC_VERIFICATION_TOKEN=your-verification-token
```

### Getting Your IDs

1. **GA4 Measurement ID**: 
   - Go to [Google Analytics](https://analytics.google.com)
   - Admin → Data Streams → Select your stream
   - Copy the "Measurement ID" (format: `G-XXXXXXXXXX`)

2. **Clarity Project ID**:
   - Go to [Microsoft Clarity](https://clarity.microsoft.com)
   - Create a new project
   - Copy the Project ID from the setup instructions

3. **GSC Verification Token**:
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add property → Domain or URL prefix
   - Choose "HTML tag" verification method
   - Copy the `content` value from the meta tag

## How It Works

### Analytics Scripts

The `AnalyticsScripts` component (`components/analytics/AnalyticsScripts.tsx`) automatically injects:
- GA4 global site tag (gtag.js)
- Microsoft Clarity tracking script

Scripts only load if the corresponding environment variables are set.

### Pageview Tracking

The `PageViewTracker` component automatically tracks pageviews for client-side navigation in Next.js App Router. GA4 doesn't automatically track SPA navigations, so this component:
- Listens for route changes using `usePathname()`
- Sends pageview events to GA4 on each navigation

### Event Tracking

Custom events are tracked through helper functions in `lib/analytics.ts`:

#### Available Events

- **`estimate_form_view`** - When estimate form is rendered
- **`estimate_form_submit`** - Form submission (success/failure)
- **`click_to_call`** - Phone number clicks
- **`city_service_page_view`** - City/service combination page views
- **`service_page_view`** - Service detail page views
- **`gallery_filter`** - Gallery filter usage
- **`cta_click`** - CTA button clicks

## Adding a New Event

1. Add a helper function in `lib/analytics.ts`:

```typescript
export function trackCustomAction(action: string, data?: Record<string, any>): void {
  trackEvent('custom_action', {
    event_category: 'engagement',
    event_label: action,
    ...data,
  })
}
```

2. Use it in your component:

```typescript
import { trackCustomAction } from '@/lib/analytics'

function MyComponent() {
  const handleClick = () => {
    trackCustomAction('button_clicked', { location: 'hero' })
  }
  
  return <button onClick={handleClick}>Click me</button>
}
```

## Verifying Analytics

### GA4

1. **Debug View**:
   - In GA4, go to Admin → DebugView
   - Enable debug mode in your browser (add `?debug_mode=true` to URL)
   - Events should appear in real-time

2. **Real-time Reports**:
   - Go to Reports → Real-time
   - Navigate your site and verify events appear

3. **Development Console**:
   - In development, events are logged to console as `[Analytics] Event: ...`

### Clarity

1. **Dashboard**:
   - Go to [Microsoft Clarity Dashboard](https://clarity.microsoft.com)
   - Check for session recordings and heatmaps

2. **Browser DevTools**:
   - Check Network tab for Clarity script requests
   - Look for `clarity.ms` requests

### Google Search Console

1. **Verification**:
   - After adding `NEXT_PUBLIC_GSC_VERIFICATION_TOKEN`, deploy your site
   - Go to Search Console and click "Verify"
   - The meta tag should be detected automatically

2. **Sitemap Submission**:
   - Go to Sitemaps section in Search Console
   - Submit: `https://www.resurface-it.com/sitemap.xml`

## SEO Features

### Sitemap

- **Location**: `/sitemap.xml`
- **Generated**: Dynamically from all pages in the site
- **Includes**: Static pages, services, cities, city/service combos, blog posts

### Robots.txt

- **Location**: `/robots.txt`
- **Allows**: All search engines to index
- **Points to**: Sitemap location

### Structured Data

JSON-LD structured data is included on relevant pages:
- LocalBusiness schema (home page)
- Service schema (service pages)
- FAQPage schema (pages with FAQs)

## Troubleshooting

### Scripts Not Loading

- Check that environment variables are set in `.env.local`
- Restart dev server after adding env vars
- Check browser console for errors
- Verify scripts appear in Network tab

### Events Not Tracking

- Ensure `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
- Check browser console for `[Analytics]` logs in development
- Verify gtag is available: `window.gtag` should exist
- Check GA4 DebugView for real-time events

### Pageviews Not Tracking

- Verify `PageViewTracker` is in root layout
- Check that route changes trigger `usePathname()` updates
- Look for `[Analytics] Pageview:` logs in console

## Adding Additional Tools

To add other analytics tools (e.g., Hotjar, Facebook Pixel):

1. Add environment variable for the tool's ID
2. Add script injection in `AnalyticsScripts.tsx`:

```typescript
{hotjarId && (
  <Script id="hotjar-init" strategy="afterInteractive">
    {`
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${hotjarId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `}
  </Script>
)}
```

3. Add tracking functions in `lib/analytics.ts` if needed

## Best Practices

1. **Privacy**: 
   - IP anonymization is enabled for GA4
   - No personally identifiable information (PII) is tracked

2. **Performance**:
   - Scripts load with `strategy="afterInteractive"` to not block page load
   - Analytics code is client-side only

3. **Development**:
   - Events are logged to console in development for debugging
   - Scripts gracefully handle missing environment variables

4. **Testing**:
   - Test events in development before deploying
   - Use GA4 DebugView to verify event structure
   - Check Clarity dashboard for session recordings

## Support

For issues or questions:
- Check browser console for errors
- Verify environment variables are set correctly
- Review GA4 and Clarity documentation
- Check Next.js Script component documentation

