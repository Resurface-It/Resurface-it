import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { HousecallProButton } from '@/components/HousecallProButton'
import { FAQAccordion } from '@/components/FAQAccordion'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateServiceSchema, generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import { getFAQsByCategory } from '@/data/faq'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'House Painters | Eugene, Albany, Corvallis, Springfield OR',
  description:
    'Expert exterior house painters and interior painting services for Eugene, Albany, Corvallis & Springfield, OR. Premium paints for Oregon weather, proper prep, cabinet refinishing, and 5-year warranty.',
  path: '/services/painting',
})

const paintingFAQs = [
  ...getFAQsByCategory('exterior-painting'),
  ...getFAQsByCategory('interior-painting').slice(0, 3),
  {
    question: 'What paint is best for Oregon\'s wet climate?',
    answer: 'We use premium exterior paints specifically formulated for wet climates, including moisture-resistant primers and UV-protective topcoats. Brands like Sherwin-Williams Duration and Benjamin Moore Aura are excellent choices for Oregon homes because they resist mildew, fade, and cracking in our challenging weather conditions.',
    category: 'exterior-painting' as const,
  },
  {
    question: 'How do you prevent paint failure in Oregon\'s humidity?',
    answer: 'Proper surface preparation is critical. We thoroughly clean, scrape, sand, and repair all surfaces before painting. We use moisture-resistant primers, especially on bare wood, and ensure proper drying time between coats. We schedule painting during dry weather windows and use paints specifically designed for high-humidity environments.',
    category: 'exterior-painting' as const,
  },
  {
    question: 'Can you paint cabinets without replacing them?',
    answer: 'Yes! Cabinet refinishing is a cost-effective alternative to replacement. We degrease, sand, prime, and apply multiple coats of durable paint or stain. We use high-quality finishes that stand up to daily use, including Italian multi-component polyurethane for maximum durability.',
    category: 'interior-painting' as const,
  },
]

export default function PaintingHubPage() {
  const faqSchema = paintingFAQs.length > 0 ? generateFAQPageSchema(paintingFAQs) : null
  const serviceSchema = generateServiceSchema(
    'Professional Painting Services',
    'Expert exterior and interior painting services with premium paints for Oregon weather. Proper surface preparation, multiple coats, and cabinet refinishing available.'
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Painting Services', url: '/services/painting' },
  ])

  return (
    <>
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
              Professional Painting Services in Eugene, Albany, Corvallis & Springfield, OR
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Transform your home with our expert painting services. We specialize in exterior and interior house painting for Eugene, Albany, Corvallis, and Springfield using premium paints specifically chosen for Oregon&apos;s wet climate.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              From complete exterior repaints to interior room refreshes and cabinet refinishing, we deliver professional results backed by a 5-year workmanship warranty.
            </p>
            <HousecallProButton variant="large">Get Free Estimate</HousecallProButton>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">Why Oregon Homes Need Quality Paint</h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4 text-lg text-slate-700">
              Oregon&apos;s wet winters and sunny summers create unique challenges for paint. High humidity, heavy rainfall, and intense UV exposure can cause paint to peel, crack, fade, and fail prematurely if not properly applied with the right materials.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              At Resurface-It, Inc, we use premium paints specifically formulated for Pacific Northwest conditions. We never skip surface preparation steps—every surface is properly cleaned, repaired, primed, and sealed before paint application. This ensures your paint job lasts 7-10 years or more, even in Oregon&apos;s challenging climate.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl">Our Painting Services</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-bold">Exterior Painting</h3>
              <p className="mb-4 text-slate-700">
                Complete exterior painting with premium paints designed for Oregon weather. Proper prep, primer, and multiple coats for lasting protection.
              </p>
              <Link href="/services/exterior-painting">
                <span className="font-semibold text-primary hover:underline">Learn More →</span>
              </Link>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-bold">Interior Painting</h3>
              <p className="mb-4 text-slate-700">
                Professional interior painting for all rooms. Low-VOC options, color consultation, and expert finishes. Minimal disruption to your daily life.
              </p>
              <Link href="/services/interior-painting">
                <span className="font-semibold text-primary hover:underline">Learn More →</span>
              </Link>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
              <h3 className="mb-4 text-2xl font-bold">Cabinet Refinishing</h3>
              <p className="mb-4 text-slate-700">
                Transform your kitchen with professional cabinet painting. A cost-effective alternative to replacement with durable, high-quality finishes that stand up to daily use.
              </p>
              <Link href="/services/painting/cabinet-refinishing">
                <span className="font-semibold text-primary hover:underline">Learn More →</span>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl">Why Choose Our Painting Services?</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Premium paints specifically formulated for Oregon weather',
              'Thorough surface preparation—never skip steps',
              'Moisture-resistant primers and UV-protective topcoats',
              '5-year workmanship warranty on all projects',
              'Licensed & insured (CCB #217088)',
              'Fast, transparent estimates often within 24 hours',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <span className="text-lg text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {paintingFAQs.length > 0 && (
        <Section className="bg-white">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions</h2>
            <FAQAccordion faqs={paintingFAQs} />
          </div>
        </Section>
      )}

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Home?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for painting services.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}

