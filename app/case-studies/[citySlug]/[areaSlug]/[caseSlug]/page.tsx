import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { CTA } from '@/components/CTA'
import { TrustBar } from '@/components/TrustBar'
import { generateMetadata as genMeta } from '@/lib/seo'
import {
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateLocalBusinessSchema,
} from '@/lib/jsonld'
import { getCaseStudyBySlug } from '@/lib/caseStudies'
import { getMicroLocation, getCities } from '@/data/geo'
import type { Metadata } from 'next'
import { MapPin, Calendar, CheckCircle } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'

interface CaseStudyDetailPageProps {
  params: Promise<{ citySlug: string; areaSlug: string; caseSlug: string }>
}

export async function generateStaticParams() {
  const { getPublishedCaseStudies } = await import('@/lib/caseStudies')
  const studies = getPublishedCaseStudies()
  
  return studies.map((study) => ({
    citySlug: study.frontmatter.citySlug,
    areaSlug: study.frontmatter.areaSlug,
    caseSlug: study.frontmatter.caseSlug,
  }))
}

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const { citySlug, areaSlug, caseSlug } = await params
  const study = getCaseStudyBySlug(citySlug, areaSlug, caseSlug)

  if (!study || study.frontmatter.status !== 'published') {
    return genMeta({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      noIndex: true,
    })
  }

  const city = getCities().find((c) => c.citySlug === citySlug)
  const location = getMicroLocation(citySlug, areaSlug)

  const title = `${study.frontmatter.title} | Case Study | Resurface-It, Inc`
  const description = `Case study: ${study.frontmatter.title} in ${location?.areaName || areaSlug}, ${city?.cityName || citySlug}, Oregon. ${study.frontmatter.servicesUsed.join(', ')}.`

  return genMeta({
    title,
    description,
    path: `/case-studies/${citySlug}/${areaSlug}/${caseSlug}`,
  })
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { citySlug, areaSlug, caseSlug } = await params
  const study = getCaseStudyBySlug(citySlug, areaSlug, caseSlug)

  if (!study || study.frontmatter.status !== 'published') {
    notFound()
  }

  const city = getCities().find((c) => c.citySlug === citySlug)
  const location = getMicroLocation(citySlug, areaSlug)

  const components = {
    h1: ({ children }: { children: React.ReactNode }) => <h1 className="mb-6 text-4xl font-bold text-slate-900">{children}</h1>,
    h2: ({ children }: { children: React.ReactNode }) => <h2 className="mb-4 mt-8 text-3xl font-bold text-slate-900">{children}</h2>,
    h3: ({ children }: { children: React.ReactNode }) => <h3 className="mb-3 mt-6 text-2xl font-semibold text-slate-900">{children}</h3>,
    p: ({ children }: { children: React.ReactNode }) => <p className="mb-4 text-lg text-slate-700">{children}</p>,
    ul: ({ children }: { children: React.ReactNode }) => <ul className="mb-4 ml-6 list-disc space-y-2 text-lg text-slate-700">{children}</ul>,
    ol: ({ children }: { children: React.ReactNode }) => <ol className="mb-4 ml-6 list-decimal space-y-2 text-lg text-slate-700">{children}</ol>,
    li: ({ children }: { children: React.ReactNode }) => <li className="text-lg text-slate-700">{children}</li>,
    strong: ({ children }: { children: React.ReactNode }) => <strong className="font-semibold text-slate-900">{children}</strong>,
  }

  // Schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/case-studies' },
    { name: city?.cityName || citySlug, url: `/case-studies/${citySlug}` },
    { name: location?.areaName || areaSlug, url: `/case-studies/${citySlug}/${areaSlug}` },
    { name: study.frontmatter.title, url: `/case-studies/${citySlug}/${areaSlug}/${caseSlug}` },
  ])

  const articleSchema = generateArticleSchema(
    study.frontmatter.title,
    `Case study: ${study.frontmatter.title} in ${location?.areaName || areaSlug}, ${city?.cityName || citySlug}, Oregon.`,
    study.frontmatter.startDate || new Date().toISOString(),
    study.frontmatter.photoGallery?.[0]?.url
  )

  const localBusinessSchema = generateLocalBusinessSchema()

  // Group photos by label
  const photosByLabel = {
    before: study.frontmatter.photoGallery.filter((p) => p.label === 'before'),
    during: study.frontmatter.photoGallery.filter((p) => p.label === 'during'),
    after: study.frontmatter.photoGallery.filter((p) => p.label === 'after'),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="h-4 w-4" />
              <span>
                {location?.areaName || areaSlug}, {city?.cityName || citySlug}, OR
              </span>
              {study.frontmatter.startDate && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(study.frontmatter.startDate).toLocaleDateString()}</span>
                  </div>
                </>
              )}
            </div>

            <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
              {study.frontmatter.title}
            </h1>

            <div className="mb-8 flex flex-wrap gap-2">
              {study.frontmatter.servicesUsed.map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <MDXRemote source={study.content} components={components} />
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Project Overview</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">Property Type</h3>
                <p className="text-lg text-slate-700">
                  {study.frontmatter.propertyType.replace('-', ' ')}
                </p>
              </div>
              {study.frontmatter.durationDays && (
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">Duration</h3>
                  <p className="text-lg text-slate-700">{study.frontmatter.durationDays} days</p>
                </div>
              )}
              {study.frontmatter.crewSize && (
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">Crew Size</h3>
                  <p className="text-lg text-slate-700">{study.frontmatter.crewSize} crew members</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Surfaces & Conditions</h2>
            <div className="mb-6 flex flex-wrap gap-2">
              {study.frontmatter.surfaces.map((surface) => (
                <span
                  key={surface}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  {surface}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Prep & Repairs</h2>
            <ul className="space-y-3">
              {study.frontmatter.prepSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <span className="text-lg text-slate-700">{step}</span>
                </li>
              ))}
            </ul>
            {study.frontmatter.materialRepairs && study.frontmatter.materialRepairs.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-xl font-semibold text-slate-900">Material Repairs</h3>
                <ul className="space-y-2">
                  {study.frontmatter.materialRepairs.map((repair, index) => (
                    <li key={index} className="text-lg text-slate-700">• {repair}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Product System</h2>
            <div className="space-y-4">
              {study.frontmatter.productsUsed.map((product, index) => (
                <div key={index} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="font-semibold text-slate-900">
                    {product.brand} {product.product}
                  </div>
                  {product.colorName && (
                    <div className="text-slate-700">Color: {product.colorName}</div>
                  )}
                  {product.sheen && <div className="text-slate-700">Sheen: {product.sheen}</div>}
                  {product.primer && <div className="text-slate-700">Primer: {product.primer}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {study.frontmatter.challenges.length > 0 && (
        <Section className="bg-slate-50 py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-3xl font-bold text-slate-900">Challenges & Solutions</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-slate-900">Challenges</h3>
                  <ul className="space-y-2">
                    {study.frontmatter.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span className="text-lg text-slate-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-slate-900">Solutions</h3>
                  <ul className="space-y-2">
                    {study.frontmatter.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-lg text-slate-700">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Results</h2>
            <ul className="space-y-3">
              {study.frontmatter.results.map((result, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <span className="text-lg text-slate-700">{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {(study.frontmatter.reviewSnippet || study.frontmatter.customerFeedbackNotes) && (
        <Section className="bg-slate-50 py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-3xl font-bold text-slate-900">Customer Feedback</h2>
              {study.frontmatter.reviewSnippet && (
                <blockquote className="mb-6 rounded-lg border-l-4 border-primary bg-white p-6 italic text-slate-700">
                  &ldquo;{study.frontmatter.reviewSnippet}&rdquo;
                </blockquote>
              )}
              {study.frontmatter.customerFeedbackNotes && (
                <p className="text-lg text-slate-700">{study.frontmatter.customerFeedbackNotes}</p>
              )}
            </div>
          </div>
        </Section>
      )}

      {study.frontmatter.photoGallery.length > 0 && (
        <Section className="bg-white py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-3xl font-bold text-slate-900">Photo Gallery</h2>
              
              {photosByLabel.before.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-semibold text-slate-900">Before</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {photosByLabel.before.map((photo, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                        <Image
                          src={photo.url}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {photosByLabel.during.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-semibold text-slate-900">During</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {photosByLabel.during.map((photo, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                        <Image
                          src={photo.url}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {photosByLabel.after.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-semibold text-slate-900">After</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {photosByLabel.after.map((photo, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                        <Image
                          src={photo.url}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      <Section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Ready for Your Project?</h2>
            <p className="mb-8 text-lg text-slate-700">
              If you&apos;re considering similar work for your home, we&apos;d be happy to discuss 
              your needs and provide a free, no-obligation estimate.
            </p>
            <CTA variant="large" />
          </div>
        </div>
      </Section>

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Explore Related Pages</h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/locations/${citySlug}/${areaSlug}`}
                className="rounded-lg border-2 border-primary bg-transparent px-6 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
              >
                {location?.areaName} Service Page →
              </Link>
              <Link
                href={`/case-studies/${citySlug}/${areaSlug}`}
                className="rounded-lg border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-primary hover:text-primary"
              >
                {location?.areaName} Case Studies →
              </Link>
              <Link
                href={`/case-studies/${citySlug}`}
                className="rounded-lg border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-primary hover:text-primary"
              >
                {city?.cityName} Case Studies →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <TrustBar />
    </>
  )
}
