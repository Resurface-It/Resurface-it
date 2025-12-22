import { Section } from '@/components/Section'
import { HousecallProButton } from '@/components/HousecallProButton'
import { FAQAccordion } from '@/components/FAQAccordion'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateServiceSchema, generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'James Hardie Siding Installation in Eugene, Albany, Corvallis & Springfield, OR',
  description: 'Expert James Hardie fiber cement siding installation for Oregon homes. Resists moisture, rot, and UV damage. ColorPlus Technology. 5-year warranty. Free estimates.',
  path: '/services/siding/james-hardie',
})

const jamesHardieFAQs = [
  {
    question: 'Why is James Hardie siding ideal for Oregon homes?',
    answer: 'James Hardie fiber cement siding is specifically designed to resist moisture, rot, and insects—all common problems in Oregon\'s wet climate. Unlike wood siding that can rot in high humidity, Hardie board maintains its integrity and appearance for decades. The ColorPlus Technology provides fade-resistant color that stands up to Oregon\'s intense summer sun.',
    category: 'siding' as const,
  },
  {
    question: 'How long does James Hardie siding last in Oregon?',
    answer: 'James Hardie siding typically lasts 50+ years when properly installed. In Oregon\'s climate, it resists the moisture, rot, and UV damage that can destroy other siding materials. The fiber cement composition doesn\'t expand and contract like wood, reducing cracking and warping.',
    category: 'siding' as const,
  },
  {
    question: 'What is ColorPlus Technology?',
    answer: 'ColorPlus Technology is James Hardie\'s factory-applied finish that provides fade-resistant color. The color is baked into the siding, so it won\'t peel, chip, or fade like painted wood. This means less maintenance and a beautiful appearance that lasts for decades without repainting.',
    category: 'siding' as const,
  },
  {
    question: 'How much does James Hardie siding cost compared to other materials?',
    answer: 'James Hardie siding typically costs $10-15 per square foot installed, making it a mid-to-high range option. While it costs more than vinyl initially, it offers superior durability and longevity, often making it a better long-term investment for Oregon homes. We provide detailed estimates so you can compare options.',
    category: 'siding' as const,
  },
  {
    question: 'Does James Hardie siding require maintenance?',
    answer: 'James Hardie siding requires minimal maintenance compared to wood siding. The ColorPlus finish doesn\'t need repainting, and the material resists rot and insects. Occasional cleaning with a garden hose is usually sufficient. This low-maintenance quality is especially valuable in Oregon\'s wet climate where wood siding requires frequent attention.',
    category: 'siding' as const,
  },
  {
    question: 'How do you ensure proper installation of James Hardie siding in Oregon?',
    answer: 'We follow James Hardie\'s installation specifications exactly, including proper flashing, caulking, and weatherproofing. We install moisture barriers appropriate for Oregon\'s wet climate and ensure proper ventilation. Our crews are trained in Hardie installation techniques, and every project is backed by our 5-year workmanship warranty.',
    category: 'siding' as const,
  },
]

export default function JamesHardiePage() {
  const faqSchema = jamesHardieFAQs.length > 0 ? generateFAQPageSchema(jamesHardieFAQs) : null
  const serviceSchema = generateServiceSchema(
    'James Hardie Siding Installation',
    'Expert James Hardie fiber cement siding installation for Oregon homes. Resists moisture, rot, and UV damage with ColorPlus Technology.'
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Siding Services', url: '/services/siding' },
    { name: 'James Hardie Siding', url: '/services/siding/james-hardie' },
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
              James Hardie Siding Installation in Eugene, Albany, Corvallis & Springfield, OR
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Protect your Oregon home with James Hardie fiber cement siding—the premier choice for durability in the Pacific Northwest. Resists moisture, rot, insects, and UV damage.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              With ColorPlus Technology for fade-resistant color and 50+ year lifespan, James Hardie siding is an investment that protects your home for generations.
            </p>
            <HousecallProButton variant="large">Get Free Estimate</HousecallProButton>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">Why James Hardie Siding for Oregon Homes?</h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4 text-lg text-slate-700">
              Oregon&apos;s climate is one of the toughest on home exteriors. Heavy winter rains, high humidity, and intense summer sun can destroy traditional siding materials. James Hardie fiber cement siding is specifically engineered to withstand these conditions.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              Unlike wood siding that rots in Oregon&apos;s humidity, Hardie board maintains its structural integrity. Unlike vinyl that can crack in temperature extremes, fiber cement expands and contracts minimally. And unlike painted wood that requires frequent repainting, ColorPlus Technology provides fade-resistant color that lasts for decades.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              At Resurface-It, Inc, we specialize in James Hardie installation following manufacturer specifications. We ensure proper flashing, weatherproofing, and moisture barriers—all critical for Oregon homes. Every installation is backed by our 5-year workmanship warranty.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl">Benefits of James Hardie Siding</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Resists moisture, rot, and insects—perfect for Oregon\'s wet climate',
              'ColorPlus Technology provides fade-resistant color for 15+ years',
              '50+ year lifespan when properly installed',
              'Fire-resistant (non-combustible material)',
              'Low maintenance—no repainting required',
              'Increases home value and curb appeal',
              'Won\'t expand/contract like wood, reducing cracking',
              'Available in multiple styles and colors',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <span className="text-lg text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">Our James Hardie Installation Process</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Assessment & Material Selection',
                description: 'We assess your home\'s structure and help you choose the right Hardie product and style. We consider your home\'s architecture, Oregon\'s climate requirements, and your aesthetic preferences.',
              },
              {
                title: 'Proper Preparation',
                description: 'We remove old siding, inspect the underlying structure for rot or damage, and make necessary repairs. We install proper moisture barriers and flashing—critical for Oregon\'s wet climate.',
              },
              {
                title: 'Expert Installation',
                description: 'Our trained crews install Hardie siding following manufacturer specifications exactly. We ensure proper fastening, spacing, and weatherproofing. Every seam and corner is carefully sealed.',
              },
              {
                title: 'Final Inspection',
                description: 'We conduct a thorough walk-through to ensure everything meets our high standards. We clean up completely and provide you with warranty information and care instructions.',
              },
            ].map((step, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                </div>
                <p className="ml-14 text-slate-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {jamesHardieFAQs.length > 0 && (
        <Section className="bg-white">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions</h2>
            <FAQAccordion faqs={jamesHardieFAQs} />
          </div>
        </Section>
      )}

      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl">Related Services</h2>
          <p className="mb-6 text-lg text-slate-600">
            We also offer related services to complete your home&apos;s exterior protection:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services/siding/rot-repair-weatherproofing" className="text-primary font-semibold hover:underline">
              Rot Repair & Weatherproofing →
            </Link>
            <Link href="/services/exterior-painting" className="text-primary font-semibold hover:underline">
              Exterior Painting →
            </Link>
            <Link href="/services/siding" className="text-primary font-semibold hover:underline">
              All Siding Services →
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Install James Hardie Siding?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for James Hardie siding installation.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}

