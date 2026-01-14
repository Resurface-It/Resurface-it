import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { HousecallProButton } from '@/components/HousecallProButton'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ServiceCard } from '@/components/ServiceCard'
import { PhoneLink } from '@/components/PhoneLink'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/jsonld'
import { getCityBySlug } from '@/data/cities'
import { getServiceBySlug } from '@/data/services'
import { getCityFAQs } from '@/data/faq'
import { companyInfo } from '@/data/company'
import { getMicroLocationsByCity, getCities } from '@/data/geo'
import type { Metadata } from 'next'
import { CheckCircle, MapPin } from 'lucide-react'

interface CityPageProps {
  params: Promise<{ city: string }>
}

function getCityImagePath(citySlug: string): string {
  const imageMap: Record<string, string> = {
    eugene: '/images/Eugene-landing.jpeg',
    albany: '/images/Albany-Landing.jpg',
    corvallis: '/images/Corvallis-landing.webp',
    springfield: '/images/Springfield-landing.jpg',
  }
  return imageMap[citySlug] || `/images/city-${citySlug}.jpg`
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug.replace('-or', ''))

  if (!city) {
    return genMeta({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      noIndex: true,
    })
  }

  return genMeta({
    title: `Siding, Roofing & Painting in ${city.name}, OR | Resurface-It, Inc`,
    description: `Professional siding replacement, roofing, and painting services in ${city.name}, Oregon. Top-rated contractors serving ${city.name} and surrounding areas. Licensed, insured, 5-year warranty. Free estimates.`,
    path: `/locations/${citySlug}`,
  })
}

export default async function CityLocationPage({ params }: CityPageProps) {
  const { city: citySlug } = await params
  const citySlugClean = citySlug.replace('-or', '')
  const city = getCityBySlug(citySlugClean)

  if (!city) {
    notFound()
  }

  const cityServices = city.highlightedServices
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => service !== undefined)

  const cityFAQs = getCityFAQs(city.name)
  // Add more city-specific FAQs if needed
  const allCityFAQs = [
    ...cityFAQs,
    {
      question: `What areas of ${city.name} do you serve?`,
      answer: `We serve all neighborhoods in ${city.name} and surrounding areas. ${city.neighborhoods ? `We frequently work in ${city.neighborhoods.slice(0, 3).join(', ')}, and other ${city.name} neighborhoods.` : `We're familiar with all areas of ${city.name} and can provide services throughout the city.`}`,
      category: 'city-specific' as const,
    },
    {
      question: `How does ${city.name}'s climate affect siding and painting projects?`,
      answer: city.climateNotes || `${city.name} experiences Oregon's typical wet winters and sunny summers, requiring moisture-resistant materials and proper weatherproofing. We use materials specifically chosen for Oregon's climate.`,
      category: 'city-specific' as const,
    },
  ]

  const localBusinessSchema = generateLocalBusinessSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
    { name: city.name, url: `/locations/${citySlug}` },
  ])
  const faqSchema = allCityFAQs.length > 0 ? generateFAQPageSchema(allCityFAQs) : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
      
      <section className="relative min-h-[80vh] flex items-center -mt-36 md:-mt-40 lg:-mt-44 pt-36 md:pt-40 lg:pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={getCityImagePath(citySlugClean)}
            alt={`${city.name}, Oregon`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/75" />
        </div>
        
        <div className="container relative z-10">
          <div className="mx-auto max-w-5xl">
            <h1 className="mb-6 text-center text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Siding, Roofing & Painting Services in {city.name}, OR
            </h1>
            <p className="mb-8 text-center text-xl text-white/95 md:text-2xl">
              Professional home exterior services that protect your investment and enhance your home&apos;s value in {city.name}, Oregon
            </p>
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <HousecallProButton variant="large" className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold">
                Get Free Estimate
              </HousecallProButton>
              <PhoneLink phone={companyInfo.phone}>
                <span className="rounded-full border-2 border-white bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/20">
                  Call {companyInfo.phone}
                </span>
              </PhoneLink>
            </div>
          </div>
        </div>
      </section>

      <Section className="bg-white py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl">Serving {city.name} Homeowners</h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-4 text-lg text-slate-700">
                {city.blurb}
              </p>
              {city.housingCharacteristics && (
                <p className="mb-4 text-lg text-slate-700">
                  {city.housingCharacteristics}
                </p>
              )}
              {city.climateNotes && (
                <p className="mb-4 text-lg text-slate-700">
                  {city.climateNotes}
                </p>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Areas We Serve in {city.name}</h2>
            <p className="mb-6 text-center text-lg text-slate-600">
              We provide professional exterior services throughout {city.name}, including these neighborhoods and areas:
            </p>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {getMicroLocationsByCity(citySlug).map((location) => (
                <Link
                  key={location.areaSlug}
                  href={`/locations/${citySlug}/${location.areaSlug}`}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:border-primary hover:shadow-md"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span className="font-semibold text-slate-700">{location.areaName}</span>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={`/spotlights/${citySlug}`}
                className="rounded-lg border-2 border-primary bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primaryDark"
              >
                View Area Spotlights →
              </Link>
              <Link
                href={`/case-studies/${citySlug}`}
                className="rounded-lg border-2 border-primary bg-transparent px-6 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
              >
                View Case Studies →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white py-16">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl">Services in {city.name}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cityServices.map((service) => (
              <ServiceCard key={service.slug} service={service} featured />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/services">
              <span className="font-semibold text-primary hover:underline">View All Services →</span>
            </Link>
          </div>
        </div>
      </Section>

      {allCityFAQs.length > 0 && (
        <Section className="bg-slate-50 py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions About {city.name}</h2>
              <FAQAccordion faqs={allCityFAQs} />
            </div>
          </div>
        </Section>
      )}

      <Section className="bg-white py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl">Why Choose Resurface-It, Inc in {city.name}?</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                'Locally owned and operated in Eugene',
                'Familiar with {city.name} housing and climate',
                '5-year workmanship warranty',
                'Licensed & insured (CCB #217088)',
                'Fast, transparent estimates',
                'Expert knowledge of Oregon building requirements',
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <span className="text-lg text-slate-700">{benefit.replace('{city.name}', city.name)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-white py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Transform Your {city.name} Home?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Get your free, no-obligation estimate for siding, roofing, or painting services in {city.name}, Oregon.
            </p>
            <HousecallProButton variant="large" className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold">
              Get Free Estimate
            </HousecallProButton>
          </div>
        </div>
      </Section>
    </>
  )
}

