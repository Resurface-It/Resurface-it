import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { PrimaryButton } from '@/components/PrimaryButton'
import { SmartEstimateForm } from '@/components/SmartEstimateForm'
import { CityServicePageTracker } from '@/components/analytics/CityServicePageTracker'
import { getCityBySlug } from '@/data/cities'
import { getServiceBySlug } from '@/data/services'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateBreadcrumbSchema } from '@/lib/jsonld'

interface CityServicePageProps {
  params: Promise<{ city: string; service: string }>
}

export async function generateMetadata({ params }: CityServicePageProps) {
  const { city: citySlug, service: serviceSlug } = await params
  const city = getCityBySlug(citySlug)
  const service = getServiceBySlug(serviceSlug)

  if (!city || !service) {
    return genMeta({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      noIndex: true,
    })
  }

  return genMeta({
    title: `${service.name} in ${city.name}, OR`,
    description: `Professional ${service.name.toLowerCase()} services in ${city.name}, Oregon. ${service.shortDescription}`,
    path: `/${citySlug}/${serviceSlug}`,
  })
}

export default async function CityServicePage({ params }: CityServicePageProps) {
  const { city: citySlug, service: serviceSlug } = await params
  const city = getCityBySlug(citySlug)
  const service = getServiceBySlug(serviceSlug)

  if (!city || !service) {
    notFound()
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: city.name, url: `/${citySlug}` },
    { name: `${service.name} in ${city.name}`, url: `/${citySlug}/${serviceSlug}` },
  ])

  return (
    <>
      <CityServicePageTracker city={city.name} service={service.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="bg-gradient-to-br from-primary/5 to-surface pt-32 pb-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6">
              {service.name} in {city.name}, OR
            </h1>
            <p className="mb-8 text-xl text-slate-600">
              {city.name} homeowners trust Resurface-it for professional {service.name.toLowerCase()}. 
              We understand the unique challenges of Oregon&apos;s climate and provide solutions that protect 
              and beautify your home for years to come.
            </p>
            <Link href="/contact">
              <PrimaryButton variant="large">Get Free Estimate</PrimaryButton>
            </Link>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">
            Why {city.name} Homeowners Choose Us for {service.name}
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-700">
              Living in {city.name} means dealing with Oregon&apos;s unique weather patterns—from heavy 
              winter rains to sunny summers. Your home&apos;s exterior needs protection that can withstand 
              these conditions while maintaining its beauty and value.
            </p>
            <p className="text-lg text-slate-700">
              Our {service.name.toLowerCase()} services are specifically designed for {city.name} homes. 
              We use premium materials and proven techniques that stand up to local weather conditions, 
              ensuring your investment lasts for years.
            </p>
            <p className="text-lg text-slate-700">
              Whether you&apos;re dealing with aging siding, faded paint, or planning a complete exterior 
              transformation, we bring the expertise and attention to detail that {city.name} homeowners 
              deserve.
            </p>
          </div>
        </div>
      </Section>

      {city.nearby.length > 0 && (
        <Section className="bg-white">
          <div className="mx-auto max-w-4xl">
            <h3 className="mb-4 text-2xl font-semibold">Also Serving Nearby Areas</h3>
            <p className="mb-4 text-slate-600">
              We&apos;re proud to serve {city.name} and surrounding communities including{' '}
              {city.nearby.slice(0, -1).join(', ')}, and {city.nearby[city.nearby.length - 1]}.
            </p>
            <Link href="/areas-we-serve" className="text-primary hover:text-primaryDark">
              View all areas we serve →
            </Link>
          </div>
        </Section>
      )}

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Get Your Free Estimate for {service.name} in {city.name}
          </h2>
          <p className="mb-8 text-lg text-primaryLight">
            Ready to transform your {city.name} home? Get started with a free, no-obligation estimate.
          </p>
          <div className="rounded-xl bg-white p-8 text-slate-900">
            <SmartEstimateForm prefilledCity={city.name} prefilledService={serviceSlug} />
          </div>
        </div>
      </Section>
    </>
  )
}

