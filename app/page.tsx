import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { SecondaryButton } from '@/components/SecondaryButton'
import { HousecallProButton } from '@/components/HousecallProButton'
import { PhoneLink } from '@/components/PhoneLink'
import { Shield, CheckCircle } from 'lucide-react'
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/jsonld'
import { primaryCities } from '@/data/cities'
import { companyInfo } from '@/data/company'
import { FAQAccordion } from '@/components/FAQAccordion'
import { testimonials, getFiveStarReviews } from '@/data/testimonials'
import { MarqueeBanner, BrandLogosMarquee } from '@/components/HomePageClient'
import { TrustStrip } from '@/components/TrustStrip'
import { ServicesGrid } from '@/components/ServicesGrid'
import { StatsSection } from '@/components/StatsSection'
import { ProcessTimeline } from '@/components/ProcessTimeline'
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel'
import { MobileStickyCTA } from '@/components/MobileStickyCTA'

export default function HomePage() {
  // Generate structured data on server
  const localBusinessSchema = generateLocalBusinessSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
  ])
  
  // Get high-intent FAQs for home page
  const homeFAQs = [
    {
      question: 'How much does siding replacement cost in Eugene, OR?',
      answer: 'Siding replacement costs in Eugene typically range from $8,500 to $25,000, depending on home size, material choice (Hardie board, vinyl, or fiber cement), and project complexity. Most projects fall in the $12,000-$18,000 range. We provide detailed, no-obligation estimates within 24 hours.',
      category: 'siding' as const,
    },
    {
      question: 'How long does a full exterior repaint usually take in Oregon?',
      answer: 'Exterior painting in Oregon typically takes 3-7 business days, depending on home size, weather conditions, and the amount of prep work needed. We schedule around Oregon\'s weather patterns and work efficiently to minimize disruption. Proper surface preparation is crucial for long-lasting results in our wet climate.',
      category: 'exterior-painting' as const,
    },
    {
      question: 'What does your 5-year workmanship warranty cover?',
      answer: 'Our 5-year workmanship warranty covers defects in installation, materials, and finish quality. If your paint peels, cracks, or bubbles due to workmanship issues, we fix it at no cost to you. The warranty is transferable if you sell your home, adding value to your property. It doesn\'t cover normal wear and tear or damage from external causes.',
      category: 'warranty' as const,
    },
    {
      question: 'Do you handle both siding replacement and painting on the same project?',
      answer: 'Yes! We specialize in combining siding replacement and exterior painting for complete home protection. When we install new siding, we can coordinate with exterior painting to ensure everything works together seamlessly. This approach often saves time and money while providing superior protection against Oregon\'s weather.',
      category: 'siding' as const,
    },
    {
      question: 'Which areas do you serve in the Willamette Valley?',
      answer: 'We serve Eugene, Albany, Corvallis, Springfield, and surrounding communities including Lebanon, Philomath, Junction City, Creswell, Coburg, Tangent, Monroe, Adair Village, Harrisburg, and Millersburg. As a locally owned company based in Eugene, we understand the unique needs of Willamette Valley homeowners.',
      category: 'scheduling' as const,
    },
  ]
  const faqSchema = homeFAQs.length > 0 ? generateFAQPageSchema(homeFAQs) : null

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
      {/* Hero Section - Full Width with Image */}
      <section className="relative min-h-[80vh] flex items-center -mt-[7.5rem] md:-mt-[8.5rem] lg:-mt-[9.5rem] pt-[7.5rem] md:pt-[8.5rem] lg:pt-[9.5rem] pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Untitled design.gif"
            alt="Animated background showing Resurface-It services"
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
              Residential & Commercial Painting and Siding Experts Serving the Willamette Valley
            </h1>
            <p className="mb-4 text-xl text-white/95 md:text-2xl">
              Locally Owned. Expertly Built. Designed for Oregon&apos;s Climate.
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
              <HousecallProButton
                variant="large"
                className="shadow-xl rounded-full"
              >
                Get Free Estimate
              </HousecallProButton>
              <Link href="/gallery">
                <SecondaryButton className="px-8 py-1.5 text-lg border-2 border-white text-white hover:bg-white hover:text-primary rounded-full">
                  See Our Work
                </SecondaryButton>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                <span>5-Year Workmanship Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Licensed & Insured • CCB #217088</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-400" />
                <span>Locally Owned in Eugene, OR</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-400" />
                <span>Fast, Transparent Estimates (Often in 24 Hours)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <MarqueeBanner />

      {/* Trust Strip */}
      <TrustStrip />

      {/* Social Proof Section */}
      <Section className="bg-slate-50 py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Oregon Homeowners Rate Resurface-it ★★★★★ for Siding & Painting
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              With 50+ five-star reviews from homeowners across Eugene, Albany, Corvallis, and Springfield, we&apos;ve built our reputation on quality work, clear communication, and standing behind every project with our 5-year warranty.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {getFiveStarReviews(testimonials).slice(0, 3).map((testimonial, index) => {
                const nameParts = testimonial.name.split(' ')
                const firstName = nameParts[0] || ''
                const lastNameInitial = nameParts[1]?.[0] || ''
                const displayName = lastNameInitial ? `${firstName} ${lastNameInitial}.` : firstName
                
                return (
                  <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="mb-3 flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mb-4 text-sm italic text-slate-700">&quot;{testimonial.quote}&quot;</p>
                    <p className="text-sm font-semibold text-slate-900">
                      — {displayName}, {testimonial.location}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* Why Resurface-it Section */}
      <Section className="bg-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Why Choose Resurface-it for Your Oregon Home</h2>
              <p className="mb-4 text-lg leading-relaxed text-slate-700">
                Oregon&apos;s climate is tough on homes. Heavy winter rains, high humidity, and intense summer sun can damage siding and cause paint to fail prematurely. At Resurface-it, we specialize in both{' '}
                <Link href="/services/siding-replacement" className="font-semibold text-primary hover:underline">
                  siding replacement
                </Link>{' '}
                and{' '}
                <Link href="/services/exterior-painting" className="font-semibold text-primary hover:underline">
                  exterior painting
                </Link>
                , working together to create a complete protective system for your home.
              </p>
              <p className="mb-4 text-lg leading-relaxed text-slate-700">
                As a locally owned, non-franchise company based in Eugene, we understand the unique challenges Oregon homeowners face. Our experienced crews use materials specifically chosen for Oregon&apos;s weather—moisture-resistant primers, UV-protective paints, and durable siding materials that stand up to our climate. Every project is backed by our 5-year workmanship warranty, giving you confidence that your investment will last.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-slate-700">
                We also provide{' '}
                <Link href="/services/interior-painting" className="font-semibold text-primary hover:underline">
                  interior painting
                </Link>
                ,{' '}
                <Link href="/services/deck-staining" className="font-semibold text-primary hover:underline">
                  deck staining
                </Link>
                , and{' '}
                <Link href="/services/pressure-washing" className="font-semibold text-primary hover:underline">
                  pressure washing
                </Link>
                . Our crews are respectful, keep job sites clean daily, and communicate clearly throughout your project. We&apos;re not just contractors—we&apos;re your neighbors, committed to protecting your most valuable investment.
              </p>
              <Link href="/about">
                <SecondaryButton>Learn More About Us</SecondaryButton>
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 shadow-xl">
              <Image
                src="/images/Home-Landing.jpg"
                alt="Before and after siding replacement and exterior painting project in Corvallis Oregon"
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

      {/* Interior Painting Highlight Section */}
      <Section className="bg-gradient-to-br from-primary/5 to-surface py-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Transform Your Home&apos;s Interior</h2>
              <p className="mb-4 text-lg leading-relaxed text-slate-700">
                Refresh every room in your home with our professional interior painting services. From living rooms and bedrooms to kitchens and bathrooms, we bring expert craftsmanship and attention to detail to every project.
              </p>
              <p className="mb-4 text-lg leading-relaxed text-slate-700">
                We specialize in painting all interior spaces, using premium paints from Sherwin-Williams and Benjamin Moore. Our team handles everything—from color consultation and surface preparation to furniture protection and cleanup—ensuring a beautiful finish with minimal disruption to your daily life.
              </p>
              <ul className="mb-6 space-y-3 text-lg text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <span>Complete interior painting for all rooms and spaces</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <span>Kitchen and bathroom painting with moisture-resistant finishes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <span>Accent walls and decorative painting techniques</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <span>Low-VOC and zero-VOC paint options for healthier indoor air</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <span>Expert color consultation and design advice</span>
                </li>
              </ul>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/services/interior-painting">
                  <SecondaryButton>Learn More About Interior Painting</SecondaryButton>
                </Link>
                <HousecallProButton variant="default">
                  Get Free Estimate
                </HousecallProButton>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 shadow-xl">
              <Image
                src="/images/project-3.jpg"
                alt="Interior house painting project completed in a Springfield Oregon home"
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
      <BrandLogosMarquee />

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
      <StatsSection />

      {/* Process Timeline */}
      <Section className="bg-slate-50 py-16">
        <SectionHeader
          title="Our Process"
          subtitle="Simple, transparent steps from free estimate to completed project—we handle everything so you don't have to"
          align="center"
        />
        <div className="mt-16">
          <ProcessTimeline />
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
          <TestimonialsCarousel />
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
          title="Serving Oregon's Willamette Valley"
          subtitle="Locally owned and operated, we understand the unique needs of Oregon homeowners"
          align="center"
        />
        <div className="mt-8 grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {primaryCities
            .filter(city => city.slug !== 'junction-city' && city.slug !== 'veneta')
            .map((city) => {
            const citySpecificBlurbs: Record<string, string> = {
              eugene: 'From historic homes near the University of Oregon to modern builds in River Road, Eugene\'s diverse neighborhoods require siding and paint solutions that withstand our wet winters and sunny summers.',
              albany: 'Albany\'s mix of historic and newer homes benefits from our expertise in both traditional and modern siding materials, plus exterior painting that protects against Oregon\'s humidity and rain.',
              corvallis: 'Corvallis homeowners trust us for siding replacement and painting that stands up to the Willamette Valley\'s climate. We work with homes near OSU, in established neighborhoods, and throughout the area.',
              springfield: 'Springfield\'s growing community needs reliable exterior services. We provide siding replacement and painting solutions that protect homes from Oregon\'s weather while enhancing curb appeal.',
            }
            return (
              <Link
                key={city.slug}
                href={`/${city.slug}-or`}
                className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 text-center transition-shadow hover:shadow-lg"
              >
                <h3 className="mb-3 text-lg md:text-xl font-semibold">{city.name}</h3>
                <p className="mb-4 text-sm md:text-base text-slate-600 leading-relaxed">{citySpecificBlurbs[city.slug] || city.blurb}</p>
                <span className="text-sm md:text-base font-semibold text-primary hover:text-primaryDark">
                  View {city.name} services →
                </span>
              </Link>
            )
          })}
        </div>
        <div className="mt-8 text-center">
          <Link href="/areas-we-serve">
            <SecondaryButton>View All Areas</SecondaryButton>
          </Link>
        </div>
      </Section>

      {/* FAQ Section */}
      {homeFAQs.length > 0 && (
        <Section className="bg-slate-50 py-16">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Common questions about our siding replacement and painting services in Oregon"
            align="center"
          />
          <div className="mt-12 mx-auto max-w-3xl">
            <FAQAccordion faqs={homeFAQs} />
          </div>
          <div className="mt-8 text-center">
            <Link href="/services">
              <SecondaryButton>View All Services</SecondaryButton>
            </Link>
          </div>
        </Section>
      )}

      {/* Final CTA */}
      <Section className="bg-primary py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Get a Free Estimate in 24 Hours</h2>
            <p className="mb-4 text-lg text-white/90">
              Ready to transform your home? Schedule your free, no-obligation estimate today. We&apos;ll visit your home, assess your project, and provide a detailed quote—no pressure, no obligation.
            </p>
            <p className="mb-8 text-base text-white/80">
              <strong>12 month 0% interest financing available for qualified customers.</strong>
            </p>
            <HousecallProButton
              variant="large"
              className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold"
            >
              Schedule Now
            </HousecallProButton>
          </div>
        </div>
      </Section>

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />
      
      {/* Spacer for mobile sticky CTA */}
      <div className="h-20 lg:hidden" />
    </>
  )
}
