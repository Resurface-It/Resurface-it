import Link from 'next/link'
import { Section } from '@/components/Section'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getCities } from '@/data/geo'
import type { Metadata } from 'next'
import { MapPin } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'Area Service Spotlights | Resurface-It, Inc',
  description: 'Explore our area service spotlights for Eugene, Springfield, Corvallis, and Albany, Oregon. Learn about our approach to exterior services in different neighborhoods.',
  path: '/spotlights',
})

export default function SpotlightsIndexPage() {
  const cities = getCities()

  return (
    <Section className="bg-white py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Area Service Spotlights
          </h1>
          <p className="mb-8 text-lg text-slate-700">
            Explore our general recommendations and approach to exterior services in different neighborhoods throughout our service areas. These spotlights share insights about what works well for homes in Oregon&apos;s climate.
          </p>
          <p className="mb-12 text-base text-slate-600">
            <strong>Note:</strong> These pages share general recommendations. For completed projects with real photos and details, see our{' '}
            <Link href="/case-studies" className="font-semibold text-primary hover:underline">
              Case Studies
            </Link>
            .
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {cities.map((city) => {
              const cityName = city.cityName
              const citySlug = city.citySlug
              return (
                <Link
                  key={citySlug}
                  href={`/spotlights/${citySlug}`}
                  className="group rounded-lg border-2 border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-slate-900">{cityName} Spotlights</h2>
                  </div>
                  <p className="text-slate-600">
                    View area service spotlights for neighborhoods throughout {cityName}, Oregon.
                  </p>
                  <span className="mt-4 inline-block font-semibold text-primary group-hover:underline">
                    View {cityName} Spotlights →
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
