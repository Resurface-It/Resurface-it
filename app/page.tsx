'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { PrimaryButton } from '@/components/PrimaryButton'
import { SecondaryButton } from '@/components/SecondaryButton'
import { TrustStrip } from '@/components/TrustStrip'
import { PhoneLink } from '@/components/PhoneLink'
import { Shield, CheckCircle } from 'lucide-react'
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import { primaryCities } from '@/data/cities'
import { companyInfo } from '@/data/company'

// Dynamic imports for non-critical components - loaded after initial render
const ServicesGrid = dynamic(() => import('@/components/ServicesGrid').then(mod => ({ default: mod.ServicesGrid })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-200 rounded-xl" />,
  ssr: false, // Client-side only for faster initial load
})

const ProcessTimeline = dynamic(() => import('@/components/ProcessTimeline').then(mod => ({ default: mod.ProcessTimeline })), {
  loading: () => <div className="h-96 animate-pulse bg-slate-200 rounded-xl" />,
  ssr: false, // Client-side only for faster initial load
})

const TestimonialsCarousel = dynamic(() => import('@/components/TestimonialsCarousel').then(mod => ({ default: mod.TestimonialsCarousel })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-200 rounded-xl" />,
  ssr: false, // Client-side only for faster initial load
})

const StatsSection = dynamic(() => import('@/components/StatsSection').then(mod => ({ default: mod.StatsSection })), {
  loading: () => <div className="h-48 animate-pulse bg-slate-200 rounded-xl" />,
  ssr: false, // Client-side only for faster initial load
})

const MarqueeBanner = dynamic(() => import('@/components/MarqueeBanner').then(mod => ({ default: mod.MarqueeBanner })), {
  ssr: false, // Client-side only to reduce initial bundle
})

const BrandLogosMarquee = dynamic(() => import('@/components/BrandLogosMarquee').then(mod => ({ default: mod.BrandLogosMarquee })), {
  ssr: false, // Client-side only to reduce initial bundle
})

const Modal = dynamic(() => import('@/components/Modal').then(mod => ({ default: mod.Modal })), {
  ssr: false, // Modal only needed client-side
})

const SmartEstimateForm = dynamic(() => import('@/components/SmartEstimateForm').then(mod => ({ default: mod.SmartEstimateForm })), {
  ssr: false,
})

const MobileStickyCTA = dynamic(() => import('@/components/MobileStickyCTA').then(mod => ({ default: mod.MobileStickyCTA })), {
  ssr: false, // Only needed on mobile
})

export default function HomePage() {
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false)
  const [miniFormSuccess, setMiniFormSuccess] = useState(false)

  const handleMiniFormSuccess = (data: { name: string; phone: string; city: string; service: string }) => {
    setMiniFormSuccess(true)
    setTimeout(() => {
      setIsEstimateModalOpen(true)
      setMiniFormSuccess(false)
    }, 1500)
  }

  const localBusinessSchema = generateLocalBusinessSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
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
      {/* Hero Section - Full Width with Image */}
      <section className="relative min-h-[80vh] flex items-center -mt-36 md:-mt-40 lg:-mt-44 pt-36 md:pt-40 lg:pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Home-Landing.jpg"
            alt="Professional siding installation and home exterior services"
            fill
            className="object-cover w-full h-full"
            priority
            sizes="100vw"
            quality={75}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
        </div>
        
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Professional Siding & Painting Services You Can Trust
            </h1>
            <p className="mb-4 text-xl text-white/95 md:text-2xl">
              Serving Eugene, Albany, Corvallis, Springfield and surrounding Oregon communities with premium craftsmanship and unmatched customer service.
            </p>
            <div className="mb-8">
              <PhoneLink 
                phone={companyInfo.phone}
                className="text-2xl md:text-4xl lg:text-5xl font-bold text-white hover:text-primary/90 transition-colors"
              >
                {companyInfo.phone}
              </PhoneLink>
            </div>
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <PrimaryButton
                variant="large"
                onClick={() => setIsEstimateModalOpen(true)}
                className="shadow-xl"
              >
                Get Free Estimate
              </PrimaryButton>
              <Link href="/gallery">
                <SecondaryButton className="px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-primary">
                  See Our Work
                </SecondaryButton>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                <span>5-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-400" />
                <span>Locally Owned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <Suspense fallback={null}>
        <MarqueeBanner />
      </Suspense>

      {/* Trust Strip */}
      <TrustStrip />

      {/* Painting With Purpose Section */}
      <Section className="bg-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Siding & Painting With Purpose</h2>
              <p className="mb-4 text-lg leading-relaxed text-slate-700">
                As Eugene, Albany, Corvallis, and Springfield&apos;s trusted siding and painting company, Resurface-it goes above and beyond to deliver top-tier craftsmanship and unmatched customer service—because your happiness is our mission.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-slate-700">
                We&apos;re here to transform your home with a flawless experience from start to finish. Think of us as the best house guests you&apos;ve ever had: respectful, tidy, and laser-focused on making your space shine. From{' '}
                <Link href="/services/siding-replacement" className="font-semibold text-primary hover:underline">
                  siding replacement
                </Link>{' '}
                and{' '}
                <Link href="/services/exterior-painting" className="font-semibold text-primary hover:underline">
                  exterior painting
                </Link>{' '}
                to{' '}
                <Link href="/services/interior-painting" className="font-semibold text-primary hover:underline">
                  interior painting
                </Link>
                ,{' '}
                <Link href="/services/deck-staining" className="font-semibold text-primary hover:underline">
                  deck staining
                </Link>
                , and more, we offer a full suite of home improvement services tailored to your needs.
              </p>
              <Link href="/about">
                <SecondaryButton>Learn More About Us</SecondaryButton>
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 shadow-xl">
              <Image
                src="/images/Home-Landing.jpg"
                alt="Professional siding and painting services"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                quality={75}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Brand Logos Marquee */}
      <Suspense fallback={null}>
        <BrandLogosMarquee />
      </Suspense>

      {/* Services Section */}
      <Section className="bg-slate-50 py-16">
        <SectionHeader
          title="Our Services"
          subtitle="Comprehensive home exterior services that protect your investment and enhance your home's value"
          align="center"
        />
        <div className="mt-12">
          <ServicesGrid featuredOnly />
        </div>
        <div className="mt-8 text-center">
          <Link href="/services">
            <SecondaryButton>See More Services</SecondaryButton>
          </Link>
        </div>
      </Section>

      {/* Stats Section */}
      <Suspense fallback={null}>
        <StatsSection />
      </Suspense>

      {/* Process Timeline */}
      <Section className="bg-slate-50 py-16">
        <SectionHeader
          title="Our Process"
          subtitle="Simple, transparent steps from free estimate to completed project—we handle everything so you don't have to"
          align="center"
        />
        <div className="mt-16">
          <Suspense fallback={<div className="h-96 animate-pulse bg-slate-200 rounded-xl" />}>
            <ProcessTimeline />
          </Suspense>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section className="bg-white py-16">
        <SectionHeader
          title="Rated ★★★★★ by Oregon Homeowners"
          subtitle="See why homeowners trust us with their most valuable investment"
          align="center"
        />
        <div className="mt-12 max-w-6xl mx-auto">
          <Suspense fallback={<div className="h-64 animate-pulse bg-slate-200 rounded-xl" />}>
            <TestimonialsCarousel />
          </Suspense>
        </div>
      </Section>

      {/* Warranty Section */}
      <Section className="bg-primary py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Our Warranty</h2>
            <p className="mb-8 text-lg text-white/90">
              If your paint peels, cracks, or bubbles, we fix it—no questions asked. Our{' '}
              <strong>5-year workmanship warranty</strong> backs every project, so you can feel confident your home will look flawless for years to come. No stress. No shortcuts. Just a job done right—guaranteed.
            </p>
            <Link href="/warranty">
              <SecondaryButton className="border-white text-white hover:bg-white hover:text-primary">
                Learn More About Our Warranty
              </SecondaryButton>
            </Link>
          </div>
        </div>
      </Section>

      {/* Service Areas */}
      <Section className="bg-white py-16">
        <SectionHeader
          title="Serving Eugene, Albany, Corvallis, Springfield & Surrounding Oregon Communities"
          subtitle="Locally owned and operated, we understand the unique needs of Oregon homeowners"
          align="center"
        />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {primaryCities.map((city) => (
            <div key={city.slug} className="rounded-xl border border-slate-200 bg-white p-6 text-center transition-shadow hover:shadow-lg">
              <h3 className="mb-2 text-xl font-semibold">{city.name}</h3>
              <p className="mb-4 text-sm text-slate-600">{city.blurb}</p>
              <Link
                href={`/${city.slug}`}
                className="text-sm font-semibold text-primary hover:text-primaryDark"
              >
                View {city.name} services →
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/areas-we-serve">
            <SecondaryButton>View All Areas</SecondaryButton>
          </Link>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-primary py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Get a Free Estimate in 24 Hours</h2>
            <p className="mb-8 text-lg text-white/90">
              Ready to transform your home? Schedule your free, no-obligation estimate today. We&apos;ll visit your home, assess your project, and provide a detailed quote—no pressure, no obligation.
            </p>
            <PrimaryButton
              variant="large"
              onClick={() => setIsEstimateModalOpen(true)}
              className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold"
            >
              Schedule Now
            </PrimaryButton>
          </div>
        </div>
      </Section>

      {/* Mobile Sticky CTA */}
      <Suspense fallback={null}>
        <MobileStickyCTA onClick={() => setIsEstimateModalOpen(true)} />
      </Suspense>
      
      {/* Spacer for mobile sticky CTA */}
      <div className="h-20 lg:hidden" />

      <Modal
        isOpen={isEstimateModalOpen}
        onClose={() => setIsEstimateModalOpen(false)}
        title="Get Your Free Estimate"
      >
        <SmartEstimateForm onSuccess={() => setIsEstimateModalOpen(false)} />
      </Modal>
    </>
  )
}
