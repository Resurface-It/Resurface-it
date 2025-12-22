import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { HousecallProButton } from '@/components/HousecallProButton'
import { FAQAccordion } from '@/components/FAQAccordion'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateServiceSchema, generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import { getFAQsByCategory } from '@/data/faq'
import { services } from '@/data/services'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'Siding Replacement Services in Eugene, Albany, Corvallis & Springfield, OR',
  description: 'Professional siding replacement with Hardie board, vinyl, and fiber cement. Expert installation for Oregon homes. Rot repair, weatherproofing, and 5-year warranty. Free estimates.',
  path: '/services/siding',
})

const sidingFAQs = [
  ...getFAQsByCategory('siding'),
  {
    question: 'What siding materials are best for Oregon\'s climate?',
    answer: 'Hardie board (fiber cement) is excellent for Oregon\'s wet climate because it resists moisture, rot, and insects. Premium vinyl siding also performs well and offers low maintenance. Both materials stand up to Oregon\'s heavy rain, humidity, and temperature fluctuations better than traditional wood siding.',
    category: 'siding' as const,
  },
  {
    question: 'How do you protect homes from rot and moisture during siding installation?',
    answer: 'We install proper moisture barriers, flashing, and caulking to prevent water intrusion. We inspect the underlying structure for existing rot and repair it before installing new siding. Proper ventilation and weatherproofing are critical in Oregon\'s climate, and we ensure all seams and corners are properly sealed.',
    category: 'siding' as const,
  },
]

export default function SidingHubPage() {
  const sidingServices = services.filter(s => s.parentCategory === 'siding' || s.slug.includes('siding'))
  const faqSchema = sidingFAQs.length > 0 ? generateFAQPageSchema(sidingFAQs) : null
  const serviceSchema = generateServiceSchema(
    'Siding Replacement Services',
    'Professional siding replacement with Hardie board, vinyl, and fiber cement siding. Expert installation, rot repair, and weatherproofing for Oregon homes.'
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Siding Services', url: '/services/siding' },
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
              Siding Replacement Services in Eugene, Albany, Corvallis & Springfield, OR
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Protect your Oregon home from rain, moisture, and UV damage with our expert siding replacement services. We specialize in Hardie board, vinyl, and fiber cement siding that stands up to Oregon\'s challenging climate.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              From complete siding replacement to rot repair and weatherproofing, we provide comprehensive solutions backed by a 5-year workmanship warranty.
            </p>
            <HousecallProButton variant="large">Get Free Estimate</HousecallProButton>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">Why Oregon Homes Need Quality Siding</h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4 text-lg text-slate-700">
              Oregon\'s climate is tough on home exteriors. Heavy winter rains, high humidity, and intense summer sun can cause siding to deteriorate, rot, and fail prematurely. That\'s why choosing the right siding material and proper installation is crucial for protecting your most valuable investment.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              At Resurface-It, Inc, we specialize in siding materials specifically chosen for Oregon\'s weather conditions. We use moisture-resistant materials, proper flashing, and expert installation techniques to ensure your siding protects your home for decades to come.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl">Our Siding Services</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-bold">James Hardie Siding</h3>
              <p className="mb-4 text-slate-700">
                Fiber cement siding that resists moisture, rot, and insects. Perfect for Oregon\'s wet climate with ColorPlus Technology for fade-resistant color.
              </p>
              <Link href="/services/siding/james-hardie">
                <span className="font-semibold text-primary hover:underline">Learn More →</span>
              </Link>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-bold">Cedar & Natural Wood</h3>
              <p className="mb-4 text-slate-700">
                Beautiful cedar siding repair and replacement. We restore the natural beauty of wood while protecting it from Oregon\'s weather.
              </p>
              <Link href="/services/siding/cedar-wood">
                <span className="font-semibold text-primary hover:underline">Learn More →</span>
              </Link>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
              <h3 className="mb-4 text-2xl font-bold">Rot Repair & Weatherproofing</h3>
              <p className="mb-4 text-slate-700">
                Comprehensive rot repair and weatherproofing services to protect your home from moisture damage. We identify and repair rot, then install proper moisture barriers and flashing.
              </p>
              <Link href="/services/siding/rot-repair-weatherproofing">
                <span className="font-semibold text-primary hover:underline">Learn More →</span>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl">Why Choose Our Siding Services?</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Oregon-specific materials chosen for wet climate',
              'Expert installation with proper weatherproofing',
              'Rot repair and structural inspection included',
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

      {sidingFAQs.length > 0 && (
        <Section className="bg-white">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions</h2>
            <FAQAccordion faqs={sidingFAQs} />
          </div>
        </Section>
      )}

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Protect Your Home?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for siding replacement services.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}

