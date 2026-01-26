# Resurface-it Marketing Site

A production-grade Next.js 14 marketing website for Resurface-it, a premium siding replacement and painting company serving Eugene, Albany, Corvallis, Springfield, and surrounding Oregon communities.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Headless UI** (accessible components)
- **Lucide React** (icons)

## Getting Started

### Installation

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
# or
yarn build
```

### Production

```bash
npm start
# or
yarn start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx          # Home page
│   ├── services/         # Service listing and detail pages
│   ├── areas-we-serve/   # Service areas page
│   ├── [city]/[service]/ # Dynamic city/service SEO pages
│   ├── gallery/          # Project gallery
│   ├── about/            # About page
│   ├── warranty/         # Warranty information
│   ├── contact/          # Contact/estimate form
│   ├── blog/             # Blog listing and posts
│   └── api/              # API routes
├── components/            # Reusable React components
├── data/                 # TypeScript data files
│   ├── services.ts       # Service definitions
│   ├── cities.ts         # City/service area data
│   ├── testimonials.ts   # Customer testimonials
│   ├── faq.ts           # FAQ data
│   └── blogPosts.ts     # Blog post content
├── lib/                  # Utility functions
│   ├── seo.ts           # SEO metadata helpers
│   ├── sitemap.ts       # Sitemap generation
│   └── jsonld.ts        # Structured data helpers
└── public/              # Static assets
    └── images/          # Image files
```

## Adding Content

### Adding a New Service

1. Open `data/services.ts`
2. Add a new service object to the `services` array:

```typescript
{
  slug: 'new-service',
  name: 'New Service',
  shortDescription: 'Brief description',
  longDescription: 'Detailed description...',
  bullets: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
  startingPrice: '$X,XXX',
  featured: false,
  icon: 'icon-name',
}
```

3. Add corresponding FAQ entries in `data/faq.ts` if needed
4. Add service images to `public/images/service-{slug}-1.jpg` and `service-{slug}-2.jpg`

### Adding a New City

1. Open `data/cities.ts`
2. Add to `primaryCities` array if it's a primary service area, or to `surroundingCities` if it's a secondary area:

```typescript
{
  slug: 'new-city',
  name: 'New City',
  headline: 'Services in New City, OR',
  blurb: 'Description...',
  nearby: ['Nearby City 1', 'Nearby City 2'],
  highlightedServices: ['siding-replacement', 'exterior-painting'],
}
```

### Adding a Blog Post

1. Open `data/blogPosts.ts`
2. Add a new blog post object:

```typescript
{
  slug: 'new-post-slug',
  title: 'Post Title',
  description: 'Meta description',
  date: '2025-01-20',
  tags: ['tag1', 'tag2'],
  content: [
    'First paragraph...',
    'Second paragraph...',
  ],
}
```

## API Integration

### Estimate Form Handler

The estimate form handler is located at `app/api/estimate/route.ts`. Currently, it logs requests to the console. To integrate with a real service:

1. **Housecall Pro Integration:**
   - See TODO comments in `app/api/estimate/route.ts`
   - Documentation: https://developer.housecallpro.com/docs/api-reference
   - Replace the TODO section with actual API calls

2. **Email Integration:**
   - Add an email service (e.g., SendGrid, Resend, Nodemailer)
   - Replace the TODO section with email sending logic

3. **CRM/Database Integration:**
   - Add your database client (e.g., Prisma, Supabase)
   - Store estimate requests in your database
   - Replace the TODO section with database operations

### Careers Page Integration

The careers page (`/careers`) includes job listings and an application form that integrates with Zapier for receiving applications.

#### Setup Instructions

1. **UploadThing Setup** (for resume uploads):
   - Sign up at [uploadthing.com](https://uploadthing.com)
   - Create a new app
   - Copy your `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`
   - Add them to your `.env.local` file

2. **Zapier Webhook Setup**:
   - Go to [Zapier](https://zapier.com) and create a new Zap
   - Choose "Catch Hook" as the trigger
   - Copy the webhook URL provided
   - Add it to your `.env.local` as `ZAPIER_CAREERS_WEBHOOK_URL`
   - Configure the Zap to send an email with the payload:
     - Use "Email by Zapier" as the action
     - Map the fields: `fullName`, `phone`, `email`, `position`, `city`, `yearsExperience`, `ccbNumber` (if applicable), `insuranceConfirmation` (if applicable), `message`, `resumeUrl`, `submittedAt`
     - Include the `resumeUrl` as a clickable link in the email

3. **Environment Variables**:
   ```env
   ZAPIER_CAREERS_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...
   UPLOADTHING_SECRET=sk_live_...
   UPLOADTHING_APP_ID=...
   ```

The form includes:
- Client and server-side validation
- Honeypot spam protection
- Rate limiting (3 submissions per hour per IP)
- Resume upload (PDF, DOC, DOCX, max 10MB)
- Conditional fields for subcontractor positions (CCB number, insurance)

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://resurface-it.com
ZAPIER_CAREERS_WEBHOOK_URL=your-zapier-webhook-url
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_APP_ID=your-uploadthing-app-id
```

## Image Requirements

Place images in `public/images/`:

- `hero-home.jpg` - Home page hero image (recommended: 1200x800px)
- `project-1.jpg` through `project-8.jpg` - Gallery project images
- `service-{slug}-1.jpg`, `service-{slug}-2.jpg` - Service detail page images
- `og-image.jpg` - Open Graph image (1200x630px)

All images should be optimized for web (WebP or AVIF format recommended).

## SEO Features

- Dynamic metadata generation for all pages
- Automatic sitemap generation (`/sitemap.xml`)
- JSON-LD structured data (LocalBusiness, Service, FAQPage)
- Open Graph and Twitter Card support
- Semantic HTML and proper heading hierarchy

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    DEFAULT: '#1e40af',
    light: '#3b82f6',
    dark: '#1e3a8a',
  },
  surface: '#f5f5f4',
}
```

### Fonts

Fonts are configured in `app/layout.tsx` and `app/globals.css`. Currently using:
- Headings: Poppins
- Body: Inter

## Performance

### Optimizations

- Images optimized with Next.js Image component (WebP/AVIF formats)
- Automatic code splitting and dynamic imports
- Font optimization with `next/font`
- CSS containment and content-visibility for better scroll performance
- Page prefetching for likely next pages
- Core Web Vitals tracking (LCP, FID, CLS)
- Framer Motion animations respect `prefers-reduced-motion`

### Image Optimization

Check image file sizes and get optimization recommendations:

```bash
npm run check-images
```

This script will:
- Scan all images in `public/images/`
- Report images that exceed size targets
- Provide recommendations for compression
- Show potential bandwidth savings

**Image Size Targets:**
- Logos: < 50KB
- Landing images: < 200KB
- Gallery images: < 150KB
- Brand logos: < 30KB

### Core Web Vitals Monitoring

The site automatically tracks Core Web Vitals metrics:
- **LCP (Largest Contentful Paint)**: Target ≤2.5s
- **FID (First Input Delay)**: Target ≤100ms
- **CLS (Cumulative Layout Shift)**: Target ≤0.1

Metrics are sent to Google Analytics (if configured). For more accurate measurements, install the optional `web-vitals` package:

```bash
npm install web-vitals
```

### Page Prefetching

The site automatically prefetches likely next pages based on current page context:
- Homepage prefetches main navigation pages
- City pages prefetch related service pages
- Service pages prefetch related services
- All pages prefetch high-priority pages (contact, services, gallery)

This improves perceived navigation speed by loading pages before users click.

## Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- High contrast ratios (WCAG AA compliant)
- Focus indicators on interactive elements

## License

Proprietary - All rights reserved
