import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { HousecallProButton } from '@/components/HousecallProButton'
import { ServicesGrid } from '@/components/ServicesGrid'
import { TestimonialCard } from '@/components/TestimonialCard'
import { getCityBySlug } from '@/data/cities'
import { services } from '@/data/services'
import { testimonials, getFiveStarReviews } from '@/data/testimonials'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/jsonld'
import { FAQAccordion } from '@/components/FAQAccordion'
import { getCityFAQs } from '@/data/faq'
import type { Metadata } from 'next'
import { PhoneLink } from '@/components/PhoneLink'
import { companyInfo } from '@/data/company'

export const metadata: Metadata = genMeta({
  title: 'Siding Replacement & Painting in Eugene OR',
  description:
    'Affordable siding replacement contractors and exterior house painters in Eugene, OR. Hardie board, vinyl & fiber cement installation plus interior painting. 5-year workmanship warranty. Licensed & insured.',
  path: '/eugene-or',
})

export default function EugenePage() {
  const city = getCityBySlug('eugene')
  
  if (!city) {
    notFound()
  }

  const eugeneTestimonials = getFiveStarReviews(
    testimonials.filter(t => t.location.includes('Eugene'))
  )
  const cityFAQs = getCityFAQs('Eugene')
  const faqSchema = cityFAQs.length > 0 ? generateFAQPageSchema(cityFAQs) : null
  const localBusinessSchema = generateLocalBusinessSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Areas We Serve', url: '/areas-we-serve' },
    { name: 'Eugene, OR', url: '/eugene-or' },
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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      
      {/* Hero Section */}
      <section className="relative flex items-start md:items-center -mt-32 md:-mt-40 lg:-mt-44 pt-32 md:pt-40 lg:pt-44 pb-16 md:pb-20 overflow-hidden min-h-[60vh] md:min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Eugene-landing.jpeg"
            alt="Siding replacement and painting services in Eugene, Oregon"
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
              Siding Replacement & Painting in Eugene, OR
            </h1>
            <p className="mb-4 text-base text-white/95 md:text-xl">
              Serving Eugene homeowners with premium siding replacement, exterior painting, interior painting, and comprehensive home exterior services. Licensed, insured, and backed by a 5-year workmanship warranty.
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

      {/* About Eugene Services */}
      <Section className="bg-white py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Serving Eugene, Oregon with Premium Home Exterior Services</h2>
            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="mb-4 text-lg leading-relaxed">
                Resurface-it is Eugene&apos;s trusted partner for siding replacement and painting services. From historic homes in the South University neighborhood to modern builds in the River Road area, we understand the unique needs of Eugene homeowners. Oregon&apos;s climate—with its wet winters, sunny summers, and temperature fluctuations—demands exterior materials and finishes that can withstand the elements while maintaining their beauty.
              </p>
              <p className="mb-4 text-lg leading-relaxed">
                We specialize in <Link href="/services/siding-replacement" className="font-semibold text-primary hover:underline">siding replacement</Link> using Hardie board, vinyl, and fiber cement materials that stand up to Eugene&apos;s weather. Our <Link href="/services/exterior-painting" className="font-semibold text-primary hover:underline">exterior painting</Link> services use premium paints specifically formulated for Oregon&apos;s rain and humidity. Our <Link href="/eugene-or/interior-painting" className="font-semibold text-primary hover:underline">interior painting in Eugene</Link> services transform every room in your home, and we also offer <Link href="/eugene-or/cabinet-painting" className="font-semibold text-primary hover:underline">cabinet painting</Link> and <Link href="/eugene-or/deck-and-fence-staining" className="font-semibold text-primary hover:underline">deck and fence staining</Link>.
              </p>
              <p className="mb-6 text-lg leading-relaxed">
                Whether you&apos;re near the University of Oregon campus, in the Friendly Street area, or anywhere throughout Eugene and surrounding communities like Springfield, Creswell, Coburg, and Junction City, we&apos;re here to help protect and beautify your home.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Services Available in Eugene */}
      <Section className="bg-slate-50 py-16">
        <SectionHeader
          title="Siding & Painting Services in Eugene"
          subtitle="Comprehensive home exterior and interior services tailored to Eugene homes"
          align="center"
        />
        <div className="mt-8 mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Siding Replacement</h3>
              <p className="text-slate-700">
                Hardie board, vinyl, and fiber cement siding installation that withstands Eugene&apos;s wet winters and protects your home for decades. We handle everything from removal to final inspection.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Exterior Painting</h3>
              <p className="text-slate-700">
                Premium paints formulated for Oregon&apos;s climate, with proper surface prep, primer application, and multiple coats. Our exterior painting protects against Eugene&apos;s rain and humidity.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Interior Painting</h3>
              <p className="text-slate-700">
                Transform every room in your Eugene home with expert interior painting. We use low-VOC paints, provide color consultation, and ensure minimal disruption to your daily life.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Deck & Fence Staining</h3>
              <p className="text-slate-700">
                Protect your outdoor spaces from Oregon weather with professional staining and sealing. We properly prepare surfaces and use premium stains that last through Eugene&apos;s seasons.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Pressure Washing</h3>
              <p className="text-slate-700">
                Restore your home&apos;s exterior with safe, effective pressure washing. We clean siding, decks, driveways, and more, preparing surfaces for painting or staining projects.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Roofing</h3>
              <p className="text-slate-700">
                Complete roofing services including installation, repair, and replacement. We use materials designed for Oregon&apos;s weather and ensure proper ventilation and weatherproofing.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <HousecallProButton variant="default">
            Get Your Free Estimate
          </HousecallProButton>
        </div>
      </Section>

      {/* Local Gallery */}
      <Section className="bg-white py-16">
        <SectionHeader
          title="Recent Projects in Eugene"
          subtitle="See our work transforming Eugene homes"
          align="center"
        />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].slice(0, 8).map((num) => (
            <div key={num} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
              <Image
                src={`/images/project-${num}.jpg`}
                alt={`Siding and painting project in Eugene, OR - Project ${num}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                loading="lazy"
                quality={75}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 text-center text-sm text-slate-600">
          <p>New Hardie siding and exterior paint in South Eugene • Exterior painting in Friendly Street area • Siding replacement near University of Oregon</p>
        </div>
      </Section>

      {/* Testimonials */}
      {eugeneTestimonials.length > 0 && (
        <Section className="bg-slate-50 py-16">
          <SectionHeader
            title="What Eugene Homeowners Say"
            subtitle="See why Eugene residents trust Resurface-it for their home projects"
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {eugeneTestimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </Section>
      )}

      {/* City-Specific FAQ */}
      {cityFAQs.length > 0 && (
        <Section className="bg-white py-16">
          <SectionHeader
            title="Frequently Asked Questions About Siding & Painting in Eugene"
            subtitle="Common questions from Eugene homeowners"
            align="center"
          />
          <div className="mt-12 mx-auto max-w-3xl">
            <FAQAccordion faqs={cityFAQs} />
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="bg-primary py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Transform Your Eugene Home?</h2>
            <p className="mb-8 text-lg text-white/90">
              Get your free, no-obligation estimate for siding replacement, painting, or any of our home exterior services. We&apos;ll visit your Eugene home, assess your project, and provide a detailed quote—no pressure, no obligation.
            </p>
            <HousecallProButton
              variant="large"
              className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold"
            >
              Schedule Your Free Estimate
            </HousecallProButton>
            <p className="mt-6 text-sm text-white/80">
              Serving Eugene, Springfield, Creswell, Coburg, Junction City, and surrounding Oregon communities.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}

