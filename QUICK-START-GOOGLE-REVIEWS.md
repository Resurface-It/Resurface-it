# Quick Start: Add Your Google Reviews

## The Problem
Right now, your website is showing **manual testimonials** (the ones already in the code), not your actual **Google reviews**. 

## The Solution
You need to **manually copy your Google reviews** and add them to the testimonials file. Here's how:

## Step-by-Step Instructions

### 1. Open Your Google Business Profile
Visit: **https://maps.app.goo.gl/zrCiSQGYawtB8bSZA**

### 2. Find Your 5-Star Reviews
- Scroll down to the "Reviews" section
- Look for reviews with ⭐⭐⭐⭐⭐ (5 stars)
- Click on each review to see the full text

### 3. Copy the Review Information
For each 5-star review, copy:
- ✅ Customer name (first name + last initial is fine)
- ✅ The exact review text
- ✅ The date
- ✅ The location (city, state)

### 4. Add to Your Website
Open the file: **`/data/testimonials.ts`**

Add each review at the **top of the testimonials array** (before the existing manual reviews) using this format:

```typescript
{
  name: 'John D.',
  location: 'Eugene, OR',
  quote: 'Amazing work! The team was professional and exceeded our expectations.',
  services: ['exterior-painting'],
  source: 'google',  // ← REQUIRED: This shows the Google badge
  rating: 5,          // ← REQUIRED: Must be 5 to display
  date: 'December 2023',
  googleReviewUrl: 'https://www.google.com/maps/reviews/...', // Optional
},
```

### 5. Important Notes

- ✅ **`source: 'google'`** - REQUIRED - This makes the Google badge appear
- ✅ **`rating: 5`** - REQUIRED - Only 5-star reviews are shown
- ✅ Copy the **exact review text** - Don't modify it
- ✅ Add reviews at the **top** of the array so they show first

### 6. Example

Here's a complete example of what a Google review entry looks like:

```typescript
{
  name: 'Sarah M.',
  location: 'Eugene, OR',
  quote: 'Resurface-It did an amazing job on our siding replacement. Professional team, quality work, and great communication throughout the project. Highly recommend!',
  services: ['siding-replacement'],
  source: 'google',
  rating: 5,
  date: 'November 2023',
  googleReviewUrl: 'https://www.google.com/maps/reviews/...',
},
```

### 7. After Adding Reviews

1. Save the file (`/data/testimonials.ts`)
2. The reviews will automatically appear on your website
3. They'll show with a **Google badge** and **5 stars**
4. Only 5-star reviews will be displayed (as configured)

## Why Manual?

Google doesn't provide a free, easy way to automatically fetch reviews. The options are:
- ✅ **Manual (Free)** - Copy and paste reviews (what we're doing)
- 💰 **Third-party services** - Pay for automated sync (Reviews.io, Grade.us, etc.)

## Need Help?

If you have questions or want me to add specific reviews, just share:
- The review text
- Customer name (first name + initial)
- Location
- Date

And I can add them for you!

