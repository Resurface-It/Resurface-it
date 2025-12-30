# Google Reviews Integration Guide

This guide explains how to integrate your Google reviews into your website.

## Overview

There are several ways to display Google reviews on your website:

1. **Manual Addition** - Copy verified Google reviews and add them to your testimonials data
2. **Google Reviews Widget** - Embed Google reviews using a widget component
3. **Third-Party Services** - Use services like Reviews.io, Grade.us, or Trustpilot

## Method 1: Manual Addition (Recommended for Start)

This is the simplest method and gives you full control over which reviews to display.

### Steps:

1. **Go to your Google Business Profile**
   - Visit [Google Business Profile](https://www.google.com/business/)
   - Or search for your business on Google Maps

2. **Find your reviews**
   - Click on your business listing
   - Scroll to the "Reviews" section
   - Copy the review text, customer name, rating, and date

3. **Add to testimonials data**
   - Open `/data/testimonials.ts`
   - Add a new testimonial with the following structure:

```typescript
{
  name: 'Customer Name',
  location: 'City, State',
  quote: 'Review text here...',
  services: ['service-name'],
  source: 'google', // Mark as Google review
  rating: 5, // Star rating (1-5)
  date: 'January 2024', // Review date
  googleReviewUrl: 'https://www.google.com/maps/reviews/...', // Optional: Link to review
}
```

### Example:

```typescript
{
  name: 'John Smith',
  location: 'Eugene, OR',
  quote: 'Excellent work! The team was professional and the results exceeded our expectations.',
  services: ['exterior-painting'],
  source: 'google',
  rating: 5,
  date: 'December 2023',
  googleReviewUrl: 'https://www.google.com/maps/reviews/...',
}
```

## Method 2: Google Reviews Widget

### Option A: Using Google Place ID

1. **Get your Google Place ID**
   - Go to [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   - Search for your business
   - Copy the Place ID

2. **Add to your component**
   ```tsx
   import { GoogleReviewsWidget } from '@/components/GoogleReviewsWidget'
   
   <GoogleReviewsWidget placeId="YOUR_PLACE_ID" />
   ```

### Option B: Using Google Maps URL

1. **Get your Google Business Profile URL**
   - Go to your Google Business Profile
   - Copy the URL from the address bar
   - Example: `https://www.google.com/maps/place/Resurface-It+Inc/@44.0521,-123.0868`

2. **Add to your component**
   ```tsx
   import { GoogleReviewsWidget } from '@/components/GoogleReviewsWidget'
   
   <GoogleReviewsWidget googleMapsUrl="YOUR_GOOGLE_MAPS_URL" />
   ```

### Option C: Manual Embed Code

1. **Get embed code from Google**
   - Go to your Google Business Profile
   - Look for "Get more reviews" or share options
   - Copy the iframe embed code provided by Google

2. **Use the embed component**
   ```tsx
   import { GoogleReviewsEmbed } from '@/components/GoogleReviewsWidget'
   
   <GoogleReviewsEmbed embedCode="YOUR_EMBED_CODE" />
   ```

## Method 3: Third-Party Services

For automated, real-time Google reviews integration, consider these services:

- **Reviews.io** - Aggregates Google, Facebook, and other reviews
- **Grade.us** - Review management and display
- **Trustpilot** - Review platform with Google integration
- **Birdeye** - Reputation management platform

These services typically:
- Automatically sync Google reviews
- Provide embeddable widgets
- Offer review request automation
- Include analytics and reporting

## Setting Up Google Business Profile URL

1. **Find your Google Business Profile URL**
   - Search for your business on Google Maps
   - Copy the URL from the address bar

2. **Add to company data**
   - Open `/data/company.ts`
   - Update `googleBusinessProfileUrl` with your URL:
   ```typescript
   googleBusinessProfileUrl: 'https://www.google.com/maps/place/Your-Business-Name/@lat,long',
   ```

3. **Update schema markup**
   - The schema will automatically include your Google Business Profile URL
   - This helps with SEO and rich snippets

## Displaying Google Reviews

### On Homepage

The testimonials section automatically displays reviews marked with `source: 'google'` with a Google badge.

### On City Pages

City pages show testimonials filtered by location, including Google reviews.

### Custom Display

You can filter and display only Google reviews:

```tsx
import { testimonials } from '@/data/testimonials'

const googleReviews = testimonials.filter(t => t.source === 'google')
```

## Best Practices

1. **Verify Reviews**: Only add verified Google reviews to maintain trust
2. **Update Regularly**: Add new reviews as they come in
3. **Mix Sources**: Combine Google reviews with other testimonials for variety
4. **Include Links**: Add `googleReviewUrl` so visitors can verify reviews
5. **Show Dates**: Include review dates to show recency
6. **Respond to Reviews**: Respond to Google reviews to show engagement

## Troubleshooting

### Widget Not Showing
- Check that you've provided either `placeId` or `googleMapsUrl`
- Verify your Google Business Profile is public
- Check browser console for errors

### Reviews Not Appearing
- Ensure reviews are marked with `source: 'google'`
- Check that the testimonial data is properly formatted
- Verify the component is receiving the correct props

### Schema Issues
- Make sure `googleBusinessProfileUrl` is set in company data
- Verify the URL is accessible and public
- Test with [Google Rich Results Test](https://search.google.com/test/rich-results)

## Next Steps

1. ✅ Add your Google Business Profile URL to `/data/company.ts`
2. ✅ Add verified Google reviews to `/data/testimonials.ts`
3. ✅ Test the display on your homepage and city pages
4. ✅ Consider setting up a third-party service for automated sync
5. ✅ Monitor review performance in Google Analytics

## Resources

- [Google Business Profile](https://www.google.com/business/)
- [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Review Markup](https://schema.org/Review)

