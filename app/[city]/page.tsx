import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { PrimaryButton } from '@/components/PrimaryButton'
import { SecondaryButton } from '@/components/SecondaryButton'
import { HousecallProButton } from '@/components/HousecallProButton'
import { ServiceCard } from '@/components/ServiceCard'
import { CityBadge } from '@/components/CityBadge'
import { TestimonialCard } from '@/components/TestimonialCard'
import { PhoneLink } from '@/components/PhoneLink'
import { MarqueeBanner } from '@/components/MarqueeBanner'
import { BrandLogosMarquee } from '@/components/BrandLogosMarquee'
import { getCityBySlug } from '@/data/cities'
import { services, getServiceBySlug } from '@/data/services'
import { testimonials } from '@/data/testimonials'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import { companyInfo } from '@/data/company'
import { Shield, Award, Users, Clock, CheckCircle, Star } from 'lucide-react'

// Map city slugs to their image file names
function getCityImagePath(citySlug: string): string {
  const imageMap: Record<string, string> = {
    eugene: '/images/Eugene-landing.jpeg',
    albany: '/images/Albany-Landing.jpg',
    corvallis: '/images/Corvallis-landing.webp',
    springfield: '/images/Springfield-landing.jpg',
  }
  return imageMap[citySlug] || `/images/city-${citySlug}.jpg`
}

interface CityPageProps {
  params: Promise<{ city: string }>
}

export async function generateMetadata({ params }: CityPageProps) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)

  if (!city) {
    return genMeta({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      noIndex: true,
    })
  }

  return genMeta({
    title: `${city.name}'s Premier Siding & Painting Services | Resurface-it`,
    description: `Professional siding replacement and painting services in ${city.name}, Oregon. Top-rated contractors serving ${city.name} and surrounding areas. Licensed, insured, 5-year warranty. Free estimates.`,
    path: `/${citySlug}`,
  })
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)

  if (!city) {
    notFound()
  }

  // Get services for this city
  const cityServices = city.highlightedServices
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => service !== undefined)

  // Get testimonials from this city
  const cityTestimonials = testimonials.filter((t) =>
    t.location.toLowerCase().includes(city.name.toLowerCase())
  )

  // Get all services if we need fallback
  const allServices = services.filter((s) => s.featured)

  const localBusinessSchema = generateLocalBusinessSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: city.name, url: `/${citySlug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Hero Section - Professional Full-Width */}
      <section className="relative min-h-[80vh] flex items-center -mt-36 md:-mt-40 lg:-mt-44 pt-36 md:pt-40 lg:pt-44 pb-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getCityImagePath(citySlug)}
            alt={`${city.name}, Oregon aerial view`}
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
            {/* Trust Badge */}
            <div className="mb-6 flex items-center justify-center gap-2 text-white/90 lg:justify-start">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="text-sm font-semibold">Rated 5.0 by {city.name} homeowners</span>
            </div>

            {/* Main Headline */}
            <h1 className="mb-6 text-center text-4xl font-bold leading-tight text-white md:text-5xl lg:text-left lg:text-6xl">
              {city.name}&apos;s Premier Siding & Painting Services
            </h1>
            
            {/* Subheadline */}
            <p className="mb-8 text-center text-xl text-white/95 md:text-2xl lg:text-left">
              Professional home exterior services that protect your investment and enhance your home&apos;s value in {city.name}, Oregon
            </p>

            {/* CTAs */}
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <HousecallProButton variant="large" className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold">
                Get Free Estimate
              </HousecallProButton>
              <PhoneLink phone={companyInfo.phone}>
                <SecondaryButton className="px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-primary">
                  Call {companyInfo.phone}
                </SecondaryButton>
              </PhoneLink>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/90 lg:justify-start">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="font-semibold">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold">5-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                <span className="font-semibold">{companyInfo.ccbLicense}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-semibold">Locally Owned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <MarqueeBanner />

      {/* Our Promise Section - Professional Value Props */}
      <Section className="bg-white py-16">
        <div className="container">
          <SectionHeader
            title="Our Promise to You"
            subtitle={`What sets Resurface-it apart in ${city.name}`}
            align="center"
          />
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-8 text-center transition-shadow hover:shadow-lg">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Reputation</h3>
              <p className="text-slate-600">
                50+ five-star reviews! We&apos;re the siding & painting contractor of choice for {city.name} and surrounding areas.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-8 text-center transition-shadow hover:shadow-lg">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Expert Team</h3>
              <p className="text-slate-600">
                Our employees are full-time professional craftspeople, not subcontractors. We invest in training and quality.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-8 text-center transition-shadow hover:shadow-lg">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Service</h3>
              <p className="text-slate-600">
                Courteous, reliable, and high-quality service. We treat your home like our own and respect your property.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-8 text-center transition-shadow hover:shadow-lg">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Guarantee</h3>
              <p className="text-slate-600">
                Our company stands behind our quality services with a comprehensive 5-year workmanship warranty on all projects.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-8 text-center transition-shadow hover:shadow-lg">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Quality</h3>
              <p className="text-slate-600">
                Superior quality service and workmanship. We use premium materials designed for Oregon&apos;s unique climate.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-8 text-center transition-shadow hover:shadow-lg">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Insurance</h3>
              <p className="text-slate-600">
                We are fully insured, including liability and Workers&apos; Compensation insurance. Your protection is our priority.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <HousecallProButton variant="large" className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold">Get Your Free Estimate</HousecallProButton>
          </div>
        </div>
      </Section>

      {/* Brand Logos Marquee */}
      <BrandLogosMarquee />

      {/* How It Works - Process Section */}
      <Section className="bg-slate-50 py-16">
        <div className="container">
          <SectionHeader
            title="How It Works"
            subtitle="The perfect project in 3 simple steps"
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white shadow-lg">
                  1
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900">Schedule Your Estimate</h3>
              <p className="text-slate-600">
                Contact us at <PhoneLink phone={companyInfo.phone} className="font-semibold text-primary hover:underline">{companyInfo.phone}</PhoneLink> or request online. 
                We&apos;ll schedule a convenient time to meet at your {city.name} home and discuss your project.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white shadow-lg">
                  2
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900">Planning Your Project</h3>
              <p className="text-slate-600">
                Meet with our project manager to plan and discuss all details before work begins. We&apos;ll review materials, 
                colors, timeline, and answer all your questions.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white shadow-lg">
                  3
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900">Project Completed!</h3>
              <p className="text-slate-600">
                Get the job done on time and to your satisfaction. We&apos;ll do a final walkthrough together to ensure 
                everything meets our high standards. It&apos;s that easy with Resurface-it!
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <HousecallProButton variant="large" className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold">Get Your Free Estimate</HousecallProButton>
          </div>
        </div>
      </Section>

      {/* Services Section - Professional Grid */}
      <Section className="bg-white py-16">
        <SectionHeader
          title={`Siding & Painting Services in ${city.name}, OR`}
          subtitle={`Comprehensive home exterior services tailored for ${city.name} homeowners`}
          align="center"
        />
        <div className="mt-12 flex justify-center">
          <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cityServices.length > 0
              ? cityServices.map((service) => (
                  <ServiceCard key={service.slug} service={service} featured />
                ))
              : allServices.map((service) => (
                  <ServiceCard key={service.slug} service={service} featured />
                ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link href="/services">
            <SecondaryButton>View All Services</SecondaryButton>
          </Link>
        </div>
      </Section>

      {/* Testimonials Section */}
      {cityTestimonials.length > 0 && (
        <Section className="bg-slate-50 py-16">
          <SectionHeader
            title={`What ${city.name} Homeowners Say`}
            subtitle="See why your neighbors trust Resurface-it for their home exterior projects"
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cityTestimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/contact" className="text-primary font-semibold hover:text-primaryDark">
              Read More Reviews →
            </Link>
          </div>
        </Section>
      )}

      {/* Nearby Areas */}
      {city.nearby.length > 0 && (
        <Section className="bg-white py-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Also Serving {city.name} and Surrounding Communities</h2>
            <p className="mb-8 text-lg text-slate-600">
              We&apos;re proud to serve {city.name} and nearby areas. Our team is familiar with the unique needs 
              of homes throughout the region.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <CityBadge city={city.name} />
              {city.nearby.map((nearbyCity) => (
                <CityBadge key={nearbyCity} city={nearbyCity} />
              ))}
            </div>
            <div className="mt-8">
              <Link href="/areas-we-serve" className="text-primary font-semibold hover:text-primaryDark">
                View all areas we serve →
              </Link>
            </div>
          </div>
        </Section>
      )}

      {/* CTA Section with Button */}
      <Section className="bg-primary py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to Transform Your {city.name} Home?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Get your free, no-obligation estimate for siding replacement or painting services in {city.name}, Oregon.
            </p>
            <HousecallProButton variant="large" className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold">
              Get Free Estimate
            </HousecallProButton>
          </div>
        </div>
      </Section>

      {/* About Section */}
      <Section className="bg-white py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold">About Resurface-it</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-semibold">Serving {city.name} Since Day One</h3>
                <p className="mb-4 text-slate-600">
                  As a locally owned and operated business, we understand what {city.name} homeowners need. 
                  From historic homes to new construction, we&apos;ve worked on all types of properties throughout the area.
                </p>
                <p className="text-slate-600">
                  Our commitment to quality, fair pricing, and excellent customer service has made us a trusted 
                  choice for {city.name} residents looking to protect and beautify their homes.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-semibold">Why {city.name} Homes Need Quality Exteriors</h3>
                <p className="mb-4 text-slate-600">
                  Oregon&apos;s climate can be tough on home exteriors. Heavy rainfall, temperature fluctuations, 
                  and UV exposure can cause siding to deteriorate and paint to fade prematurely.
                </p>
                <p className="text-slate-600">
                  That&apos;s why we use premium materials specifically designed for Pacific Northwest conditions. 
                  Whether you need new siding or a fresh coat of paint, we ensure your {city.name} home 
                  stays protected and beautiful for years to come.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
