import { Section } from '@/components/Section'
import { HousecallProButton } from '@/components/HousecallProButton'
import { FAQAccordion } from '@/components/FAQAccordion'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateServiceSchema, generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'Cedar Siding Repair & Replacement in Eugene, Albany, Corvallis & Springfield, OR',
  description: 'Expert cedar and natural wood siding repair and replacement. Restore beauty while protecting from Oregon weather. Rot repair, staining, and weatherproofing included.',
  path: '/services/siding/cedar-wood',
})

const cedarFAQs = [
  {
    question: 'Can you repair existing cedar siding, or do I need full replacement?',
    answer: 'We can often repair damaged cedar siding sections rather than replacing everything. We assess each situation individually—if rot is localized, we replace only affected areas. If the siding is in good condition overall, we repair, sand, and refinish. Full replacement is only necessary when the majority of the siding is deteriorated.',
    category: 'siding' as const,
  },
  {
    question: 'How do you protect cedar siding from Oregon\'s moisture?',
    answer: 'We use premium stains and sealants specifically designed for cedar in wet climates. We ensure proper flashing, caulking, and ventilation. Regular maintenance staining every 3-5 years is essential for cedar in Oregon. We can set up a maintenance schedule to keep your cedar siding protected.',
    category: 'siding' as const,
  },
  {
    question: 'What\'s the difference between cedar repair and replacement?',
    answer: 'Repair involves replacing damaged boards, sanding, and refinishing existing siding. Replacement involves removing all old siding and installing new cedar. We recommend replacement when more than 30% of the siding is damaged or when you want to upgrade to modern materials. We\'ll assess your situation and provide honest recommendations.',
    category: 'siding' as const,
  },
  {
    question: 'How long does cedar siding last in Oregon?',
    answer: 'With proper maintenance, cedar siding can last 20-30 years in Oregon. However, Oregon\'s high humidity and rainfall require more frequent maintenance than drier climates. Regular staining every 3-5 years is essential. Without proper maintenance, cedar can rot and deteriorate much faster.',
    category: 'siding' as const,
  },
  {
    question: 'Do you offer staining services for cedar siding?',
    answer: 'Yes, we provide professional cedar staining services using premium stains designed for wet climates. We properly prepare surfaces, apply stain evenly, and seal to protect against moisture. Regular staining is essential for maintaining cedar siding in Oregon\'s climate.',
    category: 'siding' as const,
  },
  {
    question: 'Can you match existing cedar siding if I need repairs?',
    answer: 'Yes, we can match existing cedar siding for repairs. We source cedar from the same suppliers and can match grain patterns and colors. For best results, we recommend staining the entire side of the house after repairs to ensure a uniform appearance.',
    category: 'siding' as const,
  },
]

export default function CedarWoodPage() {
  const faqSchema = cedarFAQs.length > 0 ? generateFAQPageSchema(cedarFAQs) : null
  const serviceSchema = generateServiceSchema(
    'Cedar & Natural Wood Siding Services',
    'Expert cedar and natural wood siding repair and replacement. Restore beauty while protecting from Oregon weather with proper staining and weatherproofing.'
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Siding Services', url: '/services/siding' },
    { name: 'Cedar & Wood Siding', url: '/services/siding/cedar-wood' },
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
              Cedar Siding Repair & Replacement in Eugene, Albany, Corvallis & Springfield, OR
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Restore the natural beauty of your cedar siding while protecting it from Oregon&apos;s challenging weather. We specialize in cedar repair, replacement, and maintenance.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              From localized rot repair to complete cedar siding replacement, we preserve the classic look of natural wood while ensuring long-lasting protection.
            </p>
            <HousecallProButton variant="large">Get Free Estimate</HousecallProButton>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">Cedar Siding in Oregon&apos;s Climate</h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4 text-lg text-slate-700">
              Cedar siding offers unmatched natural beauty, but Oregon&apos;s high humidity and rainfall can be tough on wood. Without proper maintenance, cedar can rot, warp, and deteriorate. That&apos;s why regular maintenance and proper installation are crucial.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              At Resurface-It, Inc, we specialize in both preserving existing cedar siding and installing new cedar. We use premium stains and sealants designed for wet climates, ensure proper flashing and ventilation, and provide maintenance schedules to keep your cedar siding beautiful for decades.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              Whether you need localized repairs or complete replacement, we work with high-quality cedar and match existing siding for seamless repairs. Every project is backed by our 5-year workmanship warranty.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl">Our Cedar Siding Services</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Cedar siding repair and localized replacement',
              'Complete cedar siding replacement',
              'Rot repair and structural restoration',
              'Professional cedar staining and sealing',
              'Matching existing cedar for seamless repairs',
              'Weatherproofing and moisture protection',
            ].map((service, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <span className="text-lg text-slate-700">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">Why Maintain Cedar Siding?</h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4 text-lg text-slate-700">
              Cedar siding requires regular maintenance in Oregon&apos;s climate, but the natural beauty and character it provides make it worth the effort. With proper care, cedar siding can last 20-30 years and maintain its distinctive appearance.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              Regular staining every 3-5 years is essential to protect cedar from moisture, UV damage, and rot. We use premium stains specifically formulated for cedar in wet climates, ensuring your siding stays protected and beautiful.
            </p>
          </div>
        </div>
      </Section>

      {cedarFAQs.length > 0 && (
        <Section className="bg-white">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions</h2>
            <FAQAccordion faqs={cedarFAQs} />
          </div>
        </Section>
      )}

      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl">Related Services</h2>
          <p className="mb-6 text-lg text-slate-600">
            We also offer related services to protect your home:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services/siding/rot-repair-weatherproofing" className="text-primary font-semibold hover:underline">
              Rot Repair & Weatherproofing →
            </Link>
            <Link href="/services/siding/james-hardie" className="text-primary font-semibold hover:underline">
              James Hardie Siding →
            </Link>
            <Link href="/services/siding" className="text-primary font-semibold hover:underline">
              All Siding Services →
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Restore Your Cedar Siding?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for cedar siding repair or replacement.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}

