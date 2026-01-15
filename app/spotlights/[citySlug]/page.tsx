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
    <Section className="bg-white py-8 sm:py-12 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight px-4 sm:px-6">
            Area Service Spotlights in {city.cityName}, OR
          </h1>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg text-slate-700 px-4 sm:px-6">
            Explore our general recommendations and approach to exterior services in different neighborhoods throughout {city.cityName}. These spotlights share insights about what works well for homes in Oregon&apos;s climate.
          </p>
          <p className="mb-6 sm:mb-8 md:mb-12 text-xs sm:text-sm md:text-base text-slate-600 px-4 sm:px-6">
            <strong>Note:</strong> These pages share general recommendations. For completed projects with real photos and details, see our{' '}
            <Link href={`/case-studies/${citySlug}`} className="font-semibold text-primary hover:underline">
              {city.cityName} Case Studies
            </Link>
            .
          </p>

          <div className="mb-6 sm:mb-8 grid gap-3 sm:gap-4 md:gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6">
            {locations.map((location) => (
              <Link
                key={location.areaSlug}
                href={`/spotlights/${citySlug}/${location.areaSlug}`}
                className="group flex flex-col rounded-lg border border-slate-200 bg-white p-3 sm:p-4 shadow-sm transition-all hover:border-primary hover:shadow-md min-w-0 overflow-hidden"
              >
                <div className="flex items-start gap-2 mb-2 min-w-0">
                  <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0 mt-0.5" />
                  <h2 className="text-base sm:text-lg font-semibold text-slate-900 leading-tight flex-1 min-w-0 break-words">
                    {location.areaName}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-2 flex-1 break-words">
                  General recommendations for homes in {location.areaName}
                </p>
                <span className="text-xs sm:text-sm font-semibold text-primary group-hover:underline mt-auto">
                  View Spotlight →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 px-4 sm:px-6">
            <Link
              href={`/locations/${citySlug}`}
              className="rounded-lg border-2 border-primary bg-transparent px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-primary transition-all hover:bg-primary hover:text-white text-center"
            >
              View {city.cityName} Service Areas →
            </Link>
            <Link
              href="/spotlights"
              className="rounded-lg border-2 border-slate-200 bg-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-slate-700 transition-all hover:border-primary hover:text-primary text-center"
            >
              All Spotlights
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
