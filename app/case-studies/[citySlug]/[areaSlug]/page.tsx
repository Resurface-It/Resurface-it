import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getCaseStudiesByArea } from '@/lib/caseStudies'
import { getMicroLocation, getCities } from '@/data/geo'
import type { Metadata } from 'next'
import { MapPin, Calendar } from 'lucide-react'

interface AreaCaseStudiesPageProps {
  params: Promise<{ citySlug: string; areaSlug: string }>
}

export async function generateStaticParams() {
  const cities = getCities()
  const params: Array<{ citySlug: string; areaSlug: string }> = []
  
  for (const city of cities) {
    const { getMicroLocationsByCity } = await import('@/data/geo')
    const locations = getMicroLocationsByCity(city.citySlug)
    for (const location of locations) {
      params.push({
        citySlug: city.citySlug,
        areaSlug: location.areaSlug,
      })
    }
  }
  
  return params
}

export async function generateMetadata({ params }: AreaCaseStudiesPageProps): Promise<Metadata> {
  const { citySlug, areaSlug } = await params
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

  return genMeta({
    title: `Case Studies in ${location.areaName}, ${cityName}, OR | Resurface-It, Inc`,
    description: `View our completed projects in ${location.areaName}, ${cityName}, Oregon. Real photos and details from professional exterior projects.`,
    path: `/case-studies/${citySlug}/${areaSlug}`,
  })
}

export default async function AreaCaseStudiesPage({ params }: AreaCaseStudiesPageProps) {
  const { citySlug, areaSlug } = await params
  const location = getMicroLocation(citySlug, areaSlug)

  if (!location) {
    notFound()
  }

  const city = getCities().find((c) => c.citySlug === citySlug)
  const studies = getCaseStudiesByArea(citySlug, areaSlug)

  return (
    <Section className="bg-white py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Case Studies in {location.areaName}, {city?.cityName || citySlug}
          </h1>
          <p className="mb-8 text-lg text-slate-700">
            View our completed projects in {location.areaName}. These case studies showcase real work 
            with photos and details from actual homes in this neighborhood.
          </p>

          {studies.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-lg text-slate-700 mb-4">
                No published case studies for {location.areaName} yet. Check back soon!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/case-studies/${citySlug}`}
                  className="rounded-lg border-2 border-primary bg-transparent px-6 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                >
                  View {city?.cityName} Case Studies
                </Link>
                <Link
                  href={`/locations/${citySlug}/${areaSlug}`}
                  className="rounded-lg border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-primary hover:text-primary"
                >
                  {location.areaName} Service Page
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                {studies.map((study) => (
                  <Link
                    key={study.frontmatter.caseSlug}
                    href={`/case-studies/${citySlug}/${areaSlug}/${study.frontmatter.caseSlug}`}
                    className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
                  >
                    <h2 className="mb-2 text-xl font-semibold text-slate-900 group-hover:text-primary">
                      {study.frontmatter.title}
                    </h2>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {study.frontmatter.servicesUsed.map((service) => (
                        <span
                          key={service}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    <p className="mb-3 text-sm text-slate-600">
                      {study.frontmatter.propertyType.replace('-', ' ')}
                    </p>
                    {study.frontmatter.startDate && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(study.frontmatter.startDate).getFullYear()}</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/case-studies/${citySlug}`}
                  className="rounded-lg border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-primary hover:text-primary"
                >
                  All {city?.cityName} Case Studies
                </Link>
                <Link
                  href={`/locations/${citySlug}/${areaSlug}`}
                  className="rounded-lg border-2 border-primary bg-transparent px-6 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                >
                  {location.areaName} Service Page →
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Section>
  )
}
