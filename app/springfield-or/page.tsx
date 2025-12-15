import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { HousecallProButton } from '@/components/HousecallProButton'
import { ServicesGrid } from '@/components/ServicesGrid'
import { TestimonialCard } from '@/components/TestimonialCard'
import { getCityBySlug } from '@/data/cities'
import { testimonials } from '@/data/testimonials'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import type { Metadata } from 'next'
import { PhoneLink } from '@/components/PhoneLink'
import { companyInfo } from '@/data/company'

export const metadata: Metadata = genMeta({
  title: 'Siding Replacement & House Painting in Springfield, OR',
  description: 'Professional siding replacement and house painting in Springfield, OR. Hardie board, vinyl & fiber cement installation. Exterior & interior painting. 5-year workmanship warranty. Licensed & insured. Free estimates in 24 hours.',
  path: '/springfield-or',
})

export default function SpringfieldPage() {
  const city = getCityBySlug('springfield')
  
  if (!city) {
    notFound()
  }

  const springfieldTestimonials = testimonials.filter(t => t.location.includes('Springfield'))
  const localBusinessSchema = generateLocalBusinessSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Areas We Serve', url: '/areas-we-serve' },
    { name: 'Springfield, OR', url: '/springfield-or' },
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
      <section className="relative min-h-[70vh] flex items-center -mt-36 md:-mt-40 lg:-mt-44 pt-36 md:pt-40 lg:pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Springfield-landing.jpg"
            alt="Siding replacement and painting services in Springfield, Oregon"
            fill
            className="object-cover w-full h-full"
            priority
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
        </div>
        
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Siding Replacement & Painting in Springfield, OR
            </h1>
            <p className="mb-8 text-xl text-white/95 md:text-2xl">
              Serving Springfield homeowners with premium siding replacement, exterior painting, pressure washing, and comprehensive home exterior services. Licensed, insured, and backed by a 5-year workmanship warranty.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <HousecallProButton variant="large" className="shadow-xl">
                Get Free Estimate
              </HousecallProButton>
              <Link href="/areas-we-serve" className="text-white hover:text-primary/80 underline">
                View All Service Areas →
              </Link>
            </div>
            <p className="mt-4 text-sm text-white/90">
              Prefer to talk now?{' '}
              <PhoneLink phone={companyInfo.phone} className="font-semibold underline">
                Call {companyInfo.phone}
              </PhoneLink>
            </p>
          </div>
        </div>
      </section>

      {/* About Springfield Services */}
      <Section className="bg-white py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Serving Springfield, Oregon with Premium Home Exterior Services</h2>
            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="mb-4 text-lg leading-relaxed">
                Resurface-it is Springfield&apos;s trusted partner for siding replacement and painting services. From homes throughout Springfield to properties in the Gateway area, we understand the unique needs of Springfield homeowners. Oregon&apos;s climate—with its wet winters, sunny summers, and temperature fluctuations—demands exterior materials and finishes that can withstand the elements while maintaining their beauty.
              </p>
              <p className="mb-4 text-lg leading-relaxed">
                We specialize in <Link href="/services/siding-replacement" className="font-semibold text-primary hover:underline">siding replacement</Link> using Hardie board, vinyl, and fiber cement materials that stand up to Springfield&apos;s weather. Our <Link href="/services/exterior-painting" className="font-semibold text-primary hover:underline">exterior painting</Link> services use premium paints specifically formulated for Oregon&apos;s rain and humidity. Our <Link href="/springfield-or/interior-painting" className="font-semibold text-primary hover:underline">interior painting in Springfield</Link> services transform every room, and we also offer <Link href="/services/pressure-washing" className="font-semibold text-primary hover:underline">pressure washing</Link> to restore your home&apos;s exterior to like-new condition.
              </p>
              <p className="mb-6 text-lg leading-relaxed">
                Whether you&apos;re in downtown Springfield, near the McKenzie River, or anywhere throughout Springfield and surrounding communities like Eugene, Creswell, and Junction City, we&apos;re here to help protect and beautify your home.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Services Available in Springfield */}
      <Section className="bg-slate-50 py-16">
        <SectionHeader
          title="Our Services in Springfield"
          subtitle="Comprehensive home exterior services tailored to Springfield homes"
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
      {springfieldTestimonials.length > 0 && (
        <Section className="bg-white py-16">
          <SectionHeader
            title="What Springfield Homeowners Say"
            subtitle="See why Springfield residents trust Resurface-it for their home projects"
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {springfieldTestimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="bg-primary py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Transform Your Springfield Home?</h2>
            <p className="mb-8 text-lg text-white/90">
              Get your free, no-obligation estimate for siding replacement, painting, or any of our home exterior services. We&apos;ll visit your Springfield home, assess your project, and provide a detailed quote—no pressure, no obligation.
            </p>
            <HousecallProButton
              variant="large"
              className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold"
            >
              Schedule Your Free Estimate
            </HousecallProButton>
            <p className="mt-6 text-sm text-white/80">
              Serving Springfield, Eugene, Creswell, Junction City, and surrounding Oregon communities.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}

