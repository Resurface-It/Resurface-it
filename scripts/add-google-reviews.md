# How to Add Your Google Reviews

## Quick Steps:

1. **Go to your Google Business Profile**
   - Visit: https://maps.app.goo.gl/zrCiSQGYawtB8bSZA
   - Or search for "Resurface-It" on Google Maps

2. **Find your 5-star reviews**
   - Scroll to the "Reviews" section
   - Look for reviews with 5 stars ⭐⭐⭐⭐⭐

3. **Copy the review information:**
   - Customer name (first name + last initial is fine)
   - Review text
   - Date of review
   - Location (city, state)

4. **Add to `/data/testimonials.ts`** using this format:

```typescript
{
  name: 'Customer Name',
  location: 'Eugene, OR', // or Albany, Corvallis, Springfield
  quote: 'The exact review text from Google...',
  services: ['exterior-painting'], // Choose relevant service(s)
  source: 'google', // REQUIRED - marks it as a Google review
  rating: 5, // REQUIRED - must be 5 for it to show
  date: 'January 2024', // Review date
  googleReviewUrl: 'https://www.google.com/maps/reviews/...', // Optional but recommended
}
```

## Example:

```typescript
{
  name: 'John D.',
  location: 'Eugene, OR',
  quote: 'Amazing work! The team was professional and the results exceeded our expectations. Highly recommend!',
  services: ['siding-replacement'],
  source: 'google',
  rating: 5,
  date: 'December 2023',
  googleReviewUrl: 'https://www.google.com/maps/reviews/...',
}
```

## Important Notes:

- ✅ **Must include `source: 'google'`** - This shows the Google badge
- ✅ **Must include `rating: 5`** - Only 5-star reviews are displayed
- ✅ **Copy the exact review text** - Don't modify it
- ✅ **Include the date** - Shows recency
- ✅ **Add the Google review URL if possible** - Allows visitors to verify

## Finding the Google Review URL:

1. Click on the review in Google Maps
2. Right-click on the review and "Copy link address"
3. Or click "Share" on the review and copy the link

## After Adding Reviews:

1. Save the file
2. The reviews will automatically appear on your website with the Google badge
3. Only 5-star reviews will be shown (as configured)

