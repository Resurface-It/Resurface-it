import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { CTA } from '@/components/CTA'
import { FAQ } from '@/components/FAQ'
import { MapEmbed } from '@/components/MapEmbed'
import { TrustBar } from '@/components/TrustBar'
import { generateMetadata as genMeta } from '@/lib/seo'
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateServiceSchema,
} from '@/lib/jsonld'
import { getMicroLocation, getCities } from '@/data/geo'
import { pickVariant, introVariants, homesAndSurfacesVariants, oregonPrepVariants, systemsVariants, timelinesVariants, getFAQQuestions, ctaBlockVariants } from '@/lib/copyVariants'
import { getCaseStudiesByArea } from '@/lib/caseStudies'
import type { Metadata } from 'next'
import { MapPin, CheckCircle } from 'lucide-react'

interface AreaPageProps {
  params: Promise<{ city: string; areaSlug: string }>
}

export async function generateStaticParams() {
  const cities = getCities()
  const params: Array<{ city: string; areaSlug: string }> = []
  
  for (const city of cities) {
    const { getMicroLocationsByCity } = await import('@/data/geo')
    const locations = getMicroLocationsByCity(city.citySlug)
    for (const location of locations) {
      params.push({
        city: city.citySlug,
        areaSlug: location.areaSlug,
      })
    }
  }
  
  return params
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { city: citySlug, areaSlug } = await params
  const location = getMicroLocation(citySlug, areaSlug)

  if (!location) {
    return genMeta({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      noIndex: true,
    })
  }

  const city = getCities().find((c) => c.citySlug === citySlug)
  const cityName = city?.cityName || citySlug.replace('-or', '')

  const title = `House Painters in ${location.areaName}, ${cityName}, OR | Professional Exterior Services`
  const description = `Professional house painting, siding replacement, and exterior services in ${location.areaName}, ${cityName}, Oregon. Licensed, insured, 5-year warranty. Free estimates.`

  return genMeta({
    title,
    description,
    path: `/locations/${citySlug}/${areaSlug}`,
  })
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { city: citySlug, areaSlug } = await params
  const location = getMicroLocation(citySlug, areaSlug)

  if (!location) {
    notFound()
  }

  const city = getCities().find((c) => c.citySlug === citySlug)
  const cityName = city?.cityName || citySlug.replace('-or', '')

  // Deterministic copy selection
  const copyKey = `${citySlug}-${areaSlug}`
  const intro = pickVariant(`${copyKey}-intro`, introVariants).replace('{areaName}', location.areaName)
  const homesAndSurfaces = pickVariant(`${copyKey}-homes`, homesAndSurfacesVariants).replace('{areaName}', location.areaName)
  const oregonPrep = pickVariant(`${copyKey}-prep`, oregonPrepVariants).replace('{areaName}', location.areaName)
  const systems = pickVariant(`${copyKey}-systems`, systemsVariants).replace('{areaName}', location.areaName)
  const timelines = pickVariant(`${copyKey}-timelines`, timelinesVariants).replace('{areaName}', location.areaName)
  const ctaBlock = pickVariant(`${copyKey}-cta`, ctaBlockVariants).replace('{areaName}', location.areaName)
  const faqs = getFAQQuestions(copyKey, 5)

  // Get nearby locations for internal links
  const nearbyLocations = location.nearbyAreas
    .map((slug) => getMicroLocation(citySlug, slug))
    .filter((loc): loc is NonNullable<typeof loc> => loc !== undefined)
    .slice(0, 3)

  // Get published case studies for this area
  let caseStudies: any[] = []
  try {
    caseStudies = getCaseStudiesByArea(citySlug, areaSlug)
  } catch (error) {
    // If case studies can't be loaded, continue without them
    console.warn('Could not load case studies:', error)
  }

  // Schema
  const localBusinessSchema = generateLocalBusinessSchema()
  const serviceSchema = generateServiceSchema(
    `Exterior Services in ${location.areaName}`,
    `Professional siding replacement, roofing, and painting services in ${location.areaName}, ${cityName}, Oregon.`
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
    { name: cityName, url: `/locations/${citySlug}` },
    { name: location.areaName, url: `/locations/${citySlug}/${areaSlug}` },
  ])
  const faqSchema = faqs.length > 0 ? generateFAQPageSchema(faqs) : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
              House Painters in {location.areaName}, {cityName}, OR
            </h1>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg text-slate-700">{intro}</p>
            </div>

            <CTA variant="default" />
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Our Services in {location.areaName}</h2>
            <p className="mb-6 text-lg text-slate-700">
              We provide comprehensive exterior services for homes throughout {location.areaName}:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                'Siding Replacement',
                'Exterior Painting',
                'Interior Painting',
                'Deck Staining',
                'Pressure Washing',
                'Roofing',
              ].map((service) => (
                <div key={service} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <span className="text-lg text-slate-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">
              Homes & Exteriors Common in {location.areaName}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-700">{homesAndSurfaces}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">
              Why Oregon Prep Matters in {location.areaName}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-700">{oregonPrep}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">
              Recommended Systems by Substrate
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-700">{systems}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Project Timelines</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-700">{timelines}</p>
            </div>
          </div>
        </div>
      </Section>

      {location.landmarks.length > 0 && (
        <Section className="bg-white py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-3xl font-bold text-slate-900">
                Nearby Landmarks & Neighborhoods
              </h2>
              <p className="mb-6 text-lg text-slate-700">
                {location.areaName} is conveniently located near these well-known areas and landmarks:
              </p>
              <div className="flex flex-wrap gap-3">
                {location.landmarks.map((landmark) => (
                  <div
                    key={landmark}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2"
                  >
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-slate-700">{landmark}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {caseStudies.length > 0 ? (
        <Section className="bg-slate-50 py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-3xl font-bold text-slate-900">
                Recent Projects in {location.areaName}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {caseStudies.map((study) => (
                  <Link
                    key={study.caseSlug}
                    href={`/case-studies/${citySlug}/${areaSlug}/${study.caseSlug}`}
                    className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <h3 className="mb-2 text-xl font-semibold text-slate-900">{study.title}</h3>
                    <p className="text-slate-600">{study.servicesUsed.join(', ')}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Section>
      ) : (
        <Section className="bg-slate-50 py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-3xl font-bold text-slate-900">
                Recent Projects in {location.areaName}
              </h2>
              <p className="mb-6 text-lg text-slate-700">
                See projects in nearby neighborhoods:
              </p>
              <div className="flex flex-wrap gap-3">
                {nearbyLocations.map((nearby) => (
                  <Link
                    key={nearby.areaSlug}
                    href={`/case-studies/${citySlug}/${nearby.areaSlug}`}
                    className="rounded-lg border border-primary bg-white px-4 py-2 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                  >
                    {nearby.areaName}
                  </Link>
                ))}
                <Link
                  href={`/case-studies/${citySlug}`}
                  className="rounded-lg border border-primary bg-white px-4 py-2 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                >
                  All {cityName} Case Studies →
                </Link>
              </div>
            </div>
          </div>
        </Section>
      )}

      {faqs.length > 0 && (
        <Section className="bg-white py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-center text-3xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
              <FAQ faqs={faqs} />
            </div>
          </div>
        </Section>
      )}

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <MapEmbed query={`${location.areaName}, ${cityName}, OR`} />
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Ready to Get Started?</h2>
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg text-slate-700">{ctaBlock}</p>
            </div>
            <CTA variant="large" />
          </div>
        </div>
      </Section>

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Explore Related Areas</h2>
            <div className="mb-6 flex flex-wrap gap-3">
              <Link
                href={`/locations/${citySlug}`}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition-all hover:border-primary hover:text-primary"
              >
                {cityName} Service Areas
              </Link>
              <Link
                href={`/spotlights/${citySlug}/${areaSlug}`}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition-all hover:border-primary hover:text-primary"
              >
                {location.areaName} Spotlight
              </Link>
              <Link
                href={`/case-studies/${citySlug}/${areaSlug}`}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition-all hover:border-primary hover:text-primary"
              >
                {location.areaName} Case Studies
              </Link>
            </div>
            {nearbyLocations.length > 0 && (
              <>
                <p className="mb-4 text-lg text-slate-700">Nearby neighborhoods we serve:</p>
                <div className="flex flex-wrap gap-3">
                  {nearbyLocations.map((nearby) => (
                    <Link
                      key={nearby.areaSlug}
                      href={`/locations/${citySlug}/${nearby.areaSlug}`}
                      className="rounded-lg border border-primary bg-white px-4 py-2 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                    >
                      {nearby.areaName}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </Section>

      <TrustBar />
    </>
  )
}
