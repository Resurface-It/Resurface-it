import Link from 'next/link'
import { Section } from '@/components/Section'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getPublishedCaseStudies, getAllCaseStudies } from '@/lib/caseStudies'
import { getCities } from '@/data/geo'
import type { Metadata } from 'next'
import { MapPin, Calendar } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'Case Studies | Resurface-It, Inc',
  description: 'View our completed projects with real photos and details. Professional siding, roofing, and painting projects throughout Eugene, Springfield, Corvallis, and Albany, Oregon.',
  path: '/case-studies',
})

export default function CaseStudiesIndexPage() {
  const publishedStudies = getPublishedCaseStudies()
  const cities = getCities()

  // Group by city
  const studiesByCity = cities.map((city) => ({
    city,
    studies: publishedStudies.filter((study) => study.frontmatter.citySlug === city.citySlug),
  }))

  return (
    <Section className="bg-white py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">Case Studies</h1>
          <p className="mb-8 text-lg text-slate-700">
            Explore our completed projects with real photos and details. These case studies showcase 
            our work on actual homes throughout our service areas.
          </p>

          {publishedStudies.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-lg text-slate-700">
                Coming soon!
              </p>
            </div>
          ) : (
            <>
              <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {publishedStudies.slice(0, 6).map((study) => {
                  const city = cities.find((c) => c.citySlug === study.frontmatter.citySlug)
                  return (
                    <Link
                      key={`${study.frontmatter.citySlug}-${study.frontmatter.areaSlug}-${study.frontmatter.caseSlug}`}
                      href={`/case-studies/${study.frontmatter.citySlug}/${study.frontmatter.areaSlug}/${study.frontmatter.caseSlug}`}
                      className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
                    >
                      <h2 className="mb-2 text-xl font-semibold text-slate-900 group-hover:text-primary">
                        {study.frontmatter.title}
                      </h2>
                      <div className="mb-3 flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {study.frontmatter.areaSlug.replace(/-/g, ' ')}, {city?.cityName || study.frontmatter.citySlug}
                        </span>
                      </div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {study.frontmatter.servicesUsed.slice(0, 2).map((service) => (
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
                  )
                })}
              </div>

              <div className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">Browse by City</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {studiesByCity.map(({ city, studies }) => (
                    <Link
                      key={city.citySlug}
                      href={`/case-studies/${city.citySlug}`}
                      className="group rounded-lg border-2 border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="h-6 w-6 text-primary" />
                        <h3 className="text-xl font-bold text-slate-900">{city.cityName} Case Studies</h3>
                      </div>
                      <p className="text-slate-600 mb-2">
                        {studies.length} {studies.length === 1 ? 'case study' : 'case studies'}
                      </p>
                      <span className="font-semibold text-primary group-hover:underline">
                        View {city.cityName} Case Studies →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Section>
  )
}
