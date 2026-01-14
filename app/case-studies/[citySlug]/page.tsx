import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getCaseStudiesByCity } from '@/lib/caseStudies'
import { getCities, getMicroLocation } from '@/data/geo'
import type { Metadata } from 'next'
import { MapPin, Calendar } from 'lucide-react'

interface CityCaseStudiesPageProps {
  params: Promise<{ citySlug: string }>
}

export async function generateStaticParams() {
  const cities = getCities()
  return cities.map((city) => ({
    citySlug: city.citySlug,
  }))
}

export async function generateMetadata({ params }: CityCaseStudiesPageProps): Promise<Metadata> {
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
    title: `Case Studies in ${city.cityName}, OR | Resurface-It, Inc`,
    description: `View our completed projects in ${city.cityName}, Oregon. Real photos and details from professional siding, roofing, and painting projects.`,
    path: `/case-studies/${citySlug}`,
  })
}

export default async function CityCaseStudiesPage({ params }: CityCaseStudiesPageProps) {
  const { citySlug } = await params
  const city = getCities().find((c) => c.citySlug === citySlug)

  if (!city) {
    notFound()
  }

  const studies = getCaseStudiesByCity(citySlug)

  // Group by area
  const studiesByArea = studies.reduce((acc, study) => {
    const areaSlug = study.frontmatter.areaSlug
    if (!acc[areaSlug]) {
      acc[areaSlug] = []
    }
    acc[areaSlug].push(study)
    return acc
  }, {} as Record<string, typeof studies>)

  return (
    <Section className="bg-white py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Case Studies in {city.cityName}, OR
          </h1>
          <p className="mb-8 text-lg text-slate-700">
            View our completed projects in {city.cityName}. These case studies showcase real work 
            with photos and details from actual homes.
          </p>

          {studies.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-lg text-slate-700">
                No published case studies for {city.cityName} yet. Check back soon!
              </p>
            </div>
          ) : (
            <>
              {Object.entries(studiesByArea).map(([areaSlug, areaStudies]) => {
                const location = getMicroLocation(citySlug, areaSlug)
                return (
                  <div key={areaSlug} className="mb-12">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-slate-900">
                        {location?.areaName || areaSlug.replace(/-/g, ' ')}
                      </h2>
                      <Link
                        href={`/case-studies/${citySlug}/${areaSlug}`}
                        className="text-sm font-semibold text-primary hover:underline"
                      >
                        View All →
                      </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      {areaStudies.map((study) => (
                        <Link
                          key={`${study.frontmatter.caseSlug}`}
                          href={`/case-studies/${citySlug}/${areaSlug}/${study.frontmatter.caseSlug}`}
                          className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
                        >
                          <h3 className="mb-2 text-xl font-semibold text-slate-900 group-hover:text-primary">
                            {study.frontmatter.title}
                          </h3>
                          <div className="mb-3 flex flex-wrap gap-2">
                            {study.frontmatter.servicesUsed.slice(0, 3).map((service) => (
                              <span
                                key={service}
                                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                          {study.frontmatter.startDate && (
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(study.frontmatter.startDate).getFullYear()}</span>
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/case-studies"
              className="rounded-lg border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-primary hover:text-primary"
            >
              All Case Studies
            </Link>
            <Link
              href={`/locations/${citySlug}`}
              className="rounded-lg border-2 border-primary bg-transparent px-6 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
            >
              {city.cityName} Service Areas →
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
