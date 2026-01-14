import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getMicroLocationsByCity, getCities } from '@/data/geo'
import type { Metadata } from 'next'
import { MapPin } from 'lucide-react'

interface CitySpotlightsPageProps {
  params: Promise<{ citySlug: string }>
}

export async function generateStaticParams() {
  const cities = getCities()
  return cities.map((city) => ({
    citySlug: city.citySlug,
  }))
}

export async function generateMetadata({ params }: CitySpotlightsPageProps): Promise<Metadata> {
  const { citySlug } = await params
  const city = getCities().find((c) => c.citySlug === citySlug)

  if (!city) {
    return genMeta({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      noIndex: true,
    })
  }

  return genMeta({
    title: `Area Service Spotlights in ${city.cityName}, OR | Resurface-It, Inc`,
    description: `Explore our area service spotlights for neighborhoods throughout ${city.cityName}, Oregon. General recommendations for exterior services in Oregon's climate.`,
    path: `/spotlights/${citySlug}`,
  })
}

export default async function CitySpotlightsPage({ params }: CitySpotlightsPageProps) {
  const { citySlug } = await params
  const city = getCities().find((c) => c.citySlug === citySlug)

  if (!city) {
    notFound()
  }

  const locations = getMicroLocationsByCity(citySlug)

  return (
    <Section className="bg-white py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Area Service Spotlights in {city.cityName}, OR
          </h1>
          <p className="mb-8 text-lg text-slate-700">
            Explore our general recommendations and approach to exterior services in different neighborhoods throughout {city.cityName}. These spotlights share insights about what works well for homes in Oregon&apos;s climate.
          </p>
          <p className="mb-12 text-base text-slate-600">
            <strong>Note:</strong> These pages share general recommendations. For completed projects with real photos and details, see our{' '}
            <Link href={`/case-studies/${citySlug}`} className="font-semibold text-primary hover:underline">
              {city.cityName} Case Studies
            </Link>
            .
          </p>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={location.areaSlug}
                href={`/spotlights/${citySlug}/${location.areaSlug}`}
                className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-primary hover:shadow-md"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h2 className="text-lg font-semibold text-slate-900">{location.areaName}</h2>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  General recommendations for homes in {location.areaName}
                </p>
                <span className="text-sm font-semibold text-primary group-hover:underline">
                  View Spotlight →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/locations/${citySlug}`}
              className="rounded-lg border-2 border-primary bg-transparent px-6 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
            >
              View {city.cityName} Service Areas →
            </Link>
            <Link
              href="/spotlights"
              className="rounded-lg border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-primary hover:text-primary"
            >
              All Spotlights
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
