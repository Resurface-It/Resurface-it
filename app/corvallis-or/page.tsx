import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { HousecallProButton } from '@/components/HousecallProButton'
import { ServicesGrid } from '@/components/ServicesGrid'
import { TestimonialCard } from '@/components/TestimonialCard'
import { getCityBySlug } from '@/data/cities'
import { testimonials, getFiveStarReviews } from '@/data/testimonials'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import type { Metadata } from 'next'
import { PhoneLink } from '@/components/PhoneLink'
import { companyInfo } from '@/data/company'

export const metadata: Metadata = genMeta({
  title: 'Licensed Siding Contractors & Painters in Corvallis OR',
  description:
    'Licensed siding contractors and exterior house painters serving Corvallis, OR. Hardie board, vinyl & fiber cement siding, plus interior painting. 5-year workmanship warranty. Licensed & insured.',
  path: '/corvallis-or',
})

export default function CorvallisPage() {
  const city = getCityBySlug('corvallis')
  
  if (!city) {
    notFound()
  }

  const corvallisTestimonials = getFiveStarReviews(
    testimonials.filter(t => t.location.includes('Corvallis'))
  )
  const localBusinessSchema = generateLocalBusinessSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Areas We Serve', url: '/areas-we-serve' },
    { name: 'Corvallis, OR', url: '/corvallis-or' },
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
      
      {/* Hero Section */}
      <section className="relative flex items-start md:items-center -mt-16 md:-mt-20 lg:-mt-24 pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 overflow-hidden min-h-[60vh] md:min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Corvallis-landing.webp"
            alt="Siding replacement and painting services in Corvallis, Oregon"
            fill
            className="object-cover w-full h-full"
            priority
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
        </div>
        
        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-3xl md:max-w-4xl text-center">
            <h1 className="mb-4 md:mb-6 text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Siding Replacement & Painting in Corvallis, OR
            </h1>
            <p className="mb-4 text-base text-white/95 md:text-xl">
              Serving Corvallis homeowners with premium siding replacement, exterior painting, interior painting, and comprehensive home exterior services. Licensed, insured, and backed by a 5-year workmanship warranty.
            </p>
            <div className="mb-8">
              <PhoneLink 
                phone={companyInfo.phone}
                className="text-xl md:text-4xl lg:text-5xl font-bold text-white hover:text-primary/90 transition-colors"
              >
                {companyInfo.phone}
              </PhoneLink>
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <HousecallProButton variant="large" className="shadow-xl">
                Get Free Estimate
              </HousecallProButton>
              <Link href="/areas-we-serve" className="text-white hover:text-primary/80 underline">
                View All Service Areas →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Corvallis Services */}
      <Section className="bg-white py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Serving Corvallis, Oregon with Premium Home Exterior Services</h2>
            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="mb-4 text-lg leading-relaxed">
                Resurface-it is Corvallis&apos;s trusted partner for siding replacement and painting services. From homes near Oregon State University to properties throughout the Willamette Valley, we understand the unique needs of Corvallis homeowners. Oregon&apos;s climate—with its wet winters, sunny summers, and temperature fluctuations—demands exterior materials and finishes that can withstand the elements while maintaining their beauty.
              </p>
              <p className="mb-4 text-lg leading-relaxed">
                We specialize in <Link href="/services/siding-replacement" className="font-semibold text-primary hover:underline">siding replacement</Link> using Hardie board, vinyl, and fiber cement materials that stand up to Corvallis&apos;s weather. Our <Link href="/services/exterior-painting" className="font-semibold text-primary hover:underline">exterior painting</Link> services use premium paints specifically formulated for Oregon&apos;s rain and humidity. Our <Link href="/corvallis-or/interior-painting" className="font-semibold text-primary hover:underline">interior painting in Corvallis</Link> services transform every room in your home with expert craftsmanship and attention to detail.
              </p>
              <p className="mb-6 text-lg leading-relaxed">
                Whether you&apos;re near OSU campus, in the Timberhill area, or anywhere throughout Corvallis and surrounding communities like Philomath, Adair Village, Albany, and Monroe, we&apos;re here to help protect and beautify your home.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Services Available in Corvallis */}
      <Section className="bg-slate-50 py-16">
        <SectionHeader
          title="Our Services in Corvallis"
          subtitle="Comprehensive home exterior and interior services tailored to Corvallis homes"
          align="center"
        />
        <div className="mt-12">
          <ServicesGrid />
        </div>
        <div className="mt-8 text-center">
          <HousecallProButton variant="default">
            Get Your Free Estimate
          </HousecallProButton>
        </div>
      </Section>

      {/* Testimonials */}
      {corvallisTestimonials.length > 0 && (
        <Section className="bg-white py-16">
          <SectionHeader
            title="What Corvallis Homeowners Say"
            subtitle="See why Corvallis residents trust Resurface-it for their home projects"
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {corvallisTestimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="bg-primary py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Transform Your Corvallis Home?</h2>
            <p className="mb-8 text-lg text-white/90">
              Get your free, no-obligation estimate for siding replacement, painting, or any of our home exterior services. We&apos;ll visit your Corvallis home, assess your project, and provide a detailed quote—no pressure, no obligation.
            </p>
            <HousecallProButton
              variant="large"
              className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold"
            >
              Schedule Your Free Estimate
            </HousecallProButton>
            <p className="mt-6 text-sm text-white/80">
              Serving Corvallis, Philomath, Adair Village, Albany, Monroe, and surrounding Oregon communities.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}

