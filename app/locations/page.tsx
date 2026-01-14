import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { HousecallProButton } from '@/components/HousecallProButton'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateBreadcrumbSchema } from '@/lib/jsonld'
import { primaryCities, surroundingCities } from '@/data/cities'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MapPin } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'Service Areas: Eugene, Albany, Corvallis, Springfield & Surrounding Oregon Areas',
  description: 'Serving Eugene, Albany, Corvallis, Springfield, and surrounding Willamette Valley communities. Local siding, roofing, and painting services. Free estimates.',
  path: '/locations',
})

export default function LocationsHubPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <section className="bg-gradient-to-br from-primary/5 to-surface pt-32 pb-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6">
              Service Areas: Eugene, Albany, Corvallis, Springfield & Surrounding Oregon Areas
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Resurface-It, Inc proudly serves homeowners throughout the Willamette Valley with premium siding, roofing, and painting services.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              As a locally owned company based in Eugene, we understand the unique needs of Oregon homes and provide expert solutions tailored to our climate.
            </p>
            <HousecallProButton variant="large">Get Free Estimate</HousecallProButton>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">Primary Service Areas</h2>
          <p className="mb-6 text-lg text-slate-600">
            Click on any city below to explore our micro-location service pages, area spotlights, and case studies for specific neighborhoods.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {primaryCities
              .filter(city => city.slug !== 'junction-city' && city.slug !== 'veneta')
              .map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}-or`}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">{city.name}, OR</h3>
                  </div>
                  <p className="mb-4 text-slate-700">{city.blurb}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                      Micro-Location Pages
                    </span>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                      Area Spotlights
                    </span>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                      Case Studies
                    </span>
                  </div>
                  <span className="font-semibold text-primary hover:underline">
                    View {city.name} services →
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl">Explore Our Content</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/case-studies"
              className="rounded-xl border-2 border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:border-primary hover:shadow-md"
            >
              <h3 className="mb-2 text-xl font-bold text-slate-900">Case Studies</h3>
              <p className="mb-4 text-sm text-slate-600">
                View completed projects with real photos and details from actual homes.
              </p>
              <span className="font-semibold text-primary hover:underline">
                View Case Studies →
              </span>
            </Link>
            <Link
              href="/spotlights"
              className="rounded-xl border-2 border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:border-primary hover:shadow-md"
            >
              <h3 className="mb-2 text-xl font-bold text-slate-900">Area Spotlights</h3>
              <p className="mb-4 text-sm text-slate-600">
                General recommendations for homes in different neighborhoods throughout our service areas.
              </p>
              <span className="font-semibold text-primary hover:underline">
                View Spotlights →
              </span>
            </Link>
            <Link
              href="/gallery"
              className="rounded-xl border-2 border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:border-primary hover:shadow-md"
            >
              <h3 className="mb-2 text-xl font-bold text-slate-900">Gallery</h3>
              <p className="mb-4 text-sm text-slate-600">
                Browse our portfolio of completed projects and transformations.
              </p>
              <span className="font-semibold text-primary hover:underline">
                View Gallery →
              </span>
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl">Also Serving These Communities</h2>
          <p className="mb-6 text-center text-lg text-slate-600">
            We also provide services to homeowners in these surrounding areas:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {surroundingCities.map((city) => (
              <span
                key={city}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">Why Choose a Local Willamette Valley Contractor?</h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4 text-lg text-slate-700">
              As a locally owned company based in Eugene, we understand the unique challenges Oregon homes face. Our wet winters, high humidity, and intense summer sun require specialized knowledge and materials.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              We work with local suppliers, understand local building codes, and have experience with the specific housing stock found throughout the Willamette Valley—from historic homes in Albany to modern builds in Corvallis.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              Every project is backed by our 5-year workmanship warranty, and we provide fast, transparent estimates often within 24 hours. We&apos;re not a franchise—we&apos;re your neighbors, committed to protecting your most valuable investment.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for siding, roofing, or painting services.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}

