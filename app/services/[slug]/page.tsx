import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { PrimaryButton } from '@/components/PrimaryButton'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ServicePageTracker } from '@/components/analytics/ServicePageTracker'
import { getServiceBySlug } from '@/data/services'
import { getFAQsByService } from '@/data/faq'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateServiceSchema, generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import { SmartEstimateForm } from '@/components/SmartEstimateForm'

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

  return genMeta({
    title: service.name,
    description: service.shortDescription,
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
            <h1 className="mb-6">{service.name}</h1>
            <p className="mb-8 text-xl text-slate-600">{service.longDescription}</p>
            <Link href="/contact">
              <PrimaryButton variant="large">Get Free Estimate</PrimaryButton>
            </Link>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl">What's Included</h2>
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

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="flex justify-center">
            <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
                <Image
                  src={`/images/service-${slug}-1.jpg`}
                  alt={`${service.name} example 1`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  quality={75}
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
                <Image
                  src={`/images/service-${slug}-2.jpg`}
                  alt={`${service.name} example 2`}
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
          <div className="rounded-xl bg-white p-8 text-slate-900">
            <SmartEstimateForm prefilledService={slug} />
          </div>
        </div>
      </Section>
    </>
  )
}

