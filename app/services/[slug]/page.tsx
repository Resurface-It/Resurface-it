import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { PrimaryButton } from '@/components/PrimaryButton'
import { HousecallProButton } from '@/components/HousecallProButton'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ServicePageTracker } from '@/components/analytics/ServicePageTracker'
import { getServiceBySlug } from '@/data/services'
import { getFAQsByService } from '@/data/faq'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateServiceSchema, generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/jsonld'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return genMeta({
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
      noIndex: true,
    })
  }

  // Enhanced SEO titles and descriptions for local SEO
  const serviceMetaMap: Record<string, { title: string; description: string }> = {
    'siding-replacement': {
      title: 'Siding Replacement in Eugene, Albany, Corvallis & Springfield, OR',
      description: 'Professional siding replacement in Eugene, Albany, Corvallis & Springfield, OR. Hardie board, vinyl & fiber cement installation with a 5-year workmanship warranty. Get a free estimate in 24 hours.',
    },
    'exterior-painting': {
      title: 'Exterior Painting in Eugene, Albany, Corvallis & Springfield, OR',
      description: 'Professional exterior painting in Eugene, Albany, Corvallis & Springfield, OR. Premium paints for Oregon weather. Proper prep, primer & multiple coats. 5-year warranty. Free estimates.',
    },
    'interior-painting': {
      title: 'Interior Painting in Eugene, Albany, Corvallis & Springfield, OR',
      description: 'Professional interior painting in Eugene, Albany, Corvallis & Springfield, OR. All rooms, low-VOC options, color consultation. Sherwin-Williams & Benjamin Moore paints. Free estimates.',
    },
    'deck-staining': {
      title: 'Deck Staining in Eugene & Surrounding Oregon Areas',
      description: 'Professional deck staining and sealing in Eugene, Albany, Corvallis & Springfield, OR. Protects against Oregon weather. Premium stains & sealants. Free estimates.',
    },
    'pressure-washing': {
      title: 'Pressure Washing in Eugene & Surrounding Oregon Areas',
      description: 'Professional pressure washing in Eugene, Albany, Corvallis & Springfield, OR. Safe cleaning for siding, decks, driveways. Prep for painting/staining. Free estimates.',
    },
    'roofing': {
      title: 'Roofing Services in Eugene, Albany, Corvallis & Springfield, OR',
      description: 'Professional roofing installation, repair & replacement in Eugene, Albany, Corvallis & Springfield, OR. Asphalt, metal, tile. 5-year warranty. Licensed & insured. Free estimates.',
    },
  }

  const meta = serviceMetaMap[slug] || {
    title: `${service.name} | Resurface-it`,
    description: service.shortDescription,
  }

  return genMeta({
    title: meta.title,
    description: meta.description,
    path: `/services/${slug}`,
  })
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const faqs = getFAQsByService(slug)
  const serviceSchema = generateServiceSchema(service.name, service.longDescription)
  const faqSchema = faqs.length > 0 ? generateFAQPageSchema(faqs) : null
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.name, url: `/services/${slug}` },
  ])

  return (
    <>
      <ServicePageTracker service={service.slug} />
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
      <section className="bg-gradient-to-br from-primary/5 to-surface pt-32 pb-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6">
              {service.name === 'Siding Replacement' && 'Siding Replacement in Eugene, Albany, Corvallis & Springfield, OR'}
              {service.name === 'Exterior Painting' && 'Exterior Painting in Eugene, Albany, Corvallis & Springfield, OR'}
              {service.name === 'Interior Painting' && 'Interior Painting in Eugene, Albany, Corvallis & Springfield, OR'}
              {service.name === 'Deck Staining' && 'Deck Staining in Eugene & Surrounding Oregon Areas'}
              {service.name === 'Pressure Washing' && 'Pressure Washing in Eugene & Surrounding Oregon Areas'}
              {service.name === 'Roofing' && 'Roofing Services in Eugene, Albany, Corvallis & Springfield, OR'}
              {!['Siding Replacement', 'Exterior Painting', 'Interior Painting', 'Deck Staining', 'Pressure Washing', 'Roofing'].includes(service.name) && service.name}
            </h1>
            <p className="mb-4 text-xl text-slate-600">{service.longDescription}</p>
            {(service.name === 'Siding Replacement' || service.name === 'Exterior Painting' || service.name === 'Interior Painting' || service.name === 'Roofing') && (
              <p className="mb-8 text-lg text-slate-600">
                We provide {service.name.toLowerCase()} services for homes in Eugene, Albany, Corvallis, Springfield, and surrounding Oregon communities.
              </p>
            )}
            <HousecallProButton variant="large">Get Free Estimate</HousecallProButton>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl">What&apos;s Included</h2>
          <ul className="mx-auto space-y-4 text-left max-w-2xl">
            {service.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-lg text-slate-700">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {service.processSteps && service.processSteps.length > 0 && (
        <Section className="bg-white">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl">Our Process</h2>
            <div className="space-y-6">
              {service.processSteps.map((step, index) => (
                <div key={index} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="ml-14 text-slate-700">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {service.benefits && service.benefits.length > 0 && (
        <Section>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Why Choose Our {service.name} Service?</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg bg-primary/5 p-4">
                  <svg
                    className="mt-0.5 h-6 w-6 shrink-0 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {service.materials && service.materials.length > 0 && (
        <Section className="bg-white">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Premium Materials We Use</h2>
            <p className="mb-6 text-center text-lg text-slate-600">
              We only use high-quality materials from trusted manufacturers to ensure lasting results.
            </p>
            <ul className="mx-auto space-y-3 max-w-2xl">
              {service.materials.map((material, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span className="text-lg text-slate-700">{material}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {service.additionalContent && service.additionalContent.length > 0 && (
        <Section>
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              {service.additionalContent.map((content, index) => (
                <p key={index} className="mb-4 text-lg leading-relaxed text-slate-700">
                  {content}
                </p>
              ))}
            </div>
          </div>
        </Section>
      )}

      {service.timeline && (
        <Section className="bg-primary/5">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl">What to Expect</h2>
            <p className="text-lg text-slate-700">{service.timeline}</p>
          </div>
        </Section>
      )}

      {service.image1 && service.image2 && (
        <Section className="bg-white">
          <div className="mx-auto max-w-4xl">
            <div className="flex justify-center">
              <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
                  <Image
                    src={service.image1}
                    alt={`${service.name} project example 1`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
                  <Image
                    src={service.image2}
                    alt={`${service.name} project example 2`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    quality={75}
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {faqs.length > 0 && (
        <Section>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl">Frequently Asked Questions</h2>
            <div className="mx-auto max-w-3xl">
              <FAQAccordion faqs={faqs} />
            </div>
          </div>
        </Section>
      )}

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for {service.name.toLowerCase()}.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}

