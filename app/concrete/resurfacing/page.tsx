import { Section } from '@/components/Section'
import { HousecallProButton } from '@/components/HousecallProButton'
import { PhoneLink } from '@/components/PhoneLink'
import { FAQAccordion } from '@/components/FAQAccordion'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateServiceSchema, generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import { companyInfo } from '@/data/company'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle, Square } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'Concrete Resurfacing in Eugene, Albany, Corvallis & Springfield OR',
  description:
    'Professional concrete resurfacing services in Eugene, Albany, Corvallis & Springfield, OR. Overlay systems to smooth worn slabs. Texture options for driveways, patios & pool decks. 5-year warranty.',
  path: '/concrete/resurfacing',
})

const resurfacingFAQs = [
  {
    question: 'What is concrete resurfacing, and when is it needed?',
    answer: 'Concrete resurfacing involves applying an overlay system to existing concrete to restore appearance and smoothness. It\'s ideal for worn, cracked, or damaged concrete that doesn\'t need full replacement. Resurfacing can restore driveways, patios, and pool decks to like-new condition at a fraction of replacement cost.',
    category: 'concrete' as const,
  },
  {
    question: 'Can you resurface severely damaged concrete, or does it need replacement?',
    answer: 'We assess each situation individually. Resurfacing works well for surface damage, minor cracks, and wear. However, if the concrete is severely deteriorated, has major structural issues, or the foundation is compromised, replacement may be necessary. We provide honest assessments and recommendations.',
    category: 'concrete' as const,
  },
  {
    question: 'What texture options are available for resurfaced concrete?',
    answer: 'We offer various texture options including smooth finishes, brushed textures, and stamped patterns. The texture choice depends on your aesthetic preferences, use case, and safety requirements. We discuss options during consultation to find the right fit for your space.',
    category: 'concrete' as const,
  },
  {
    question: 'How long does concrete resurfacing last?',
    answer: 'With proper preparation and quality materials, resurfaced concrete can last 10-15 years or more. The longevity depends on the overlay system used, traffic levels, and maintenance. We use durable materials designed for Oregon weather conditions.',
    category: 'concrete' as const,
  },
  {
    question: 'Can resurfaced concrete be sealed or coated?',
    answer: 'Yes, resurfaced concrete can be sealed or coated for additional protection. In fact, sealing or coating after resurfacing helps protect the new surface and extend its lifespan. We can coordinate resurfacing with sealing or coating services.',
    category: 'concrete' as const,
  },
  {
    question: 'What preparation is required for concrete resurfacing?',
    answer: 'Proper preparation is non-negotiable. We clean the surface thoroughly, repair major cracks and damage, and ensure proper adhesion. We may need to grind or etch the existing concrete to create a bonding surface. Without proper prep, the overlay won\'t adhere correctly.',
    category: 'concrete' as const,
  },
  {
    question: 'Is resurfacing less expensive than replacing concrete?',
    answer: 'Yes, resurfacing is typically more cost-effective than full replacement. It avoids the cost and disruption of removing and replacing the entire slab. However, we assess each situation to determine whether resurfacing or replacement is the better long-term solution.',
    category: 'concrete' as const,
  },
  {
    question: 'How do you ensure resurfaced concrete matches surrounding areas?',
    answer: 'We work to match color and texture as closely as possible, though perfect matching can be challenging with aged concrete. We discuss expectations and options during consultation. In some cases, resurfacing a larger area provides a more uniform appearance.',
    category: 'concrete' as const,
  },
]

export default function ConcreteResurfacingPage() {
  const serviceSchema = generateServiceSchema(
    'Concrete Resurfacing',
    'Professional concrete resurfacing services using overlay systems. Restore worn, cracked, or damaged concrete surfaces with texture options for driveways, patios, and pool decks. Cost-effective alternative to replacement.'
  )
  const faqSchema = resurfacingFAQs.length > 0 ? generateFAQPageSchema(resurfacingFAQs) : null
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Concrete Services', url: '/concrete' },
    { name: 'Concrete Resurfacing', url: '/concrete/resurfacing' },
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
              Concrete Resurfacing in Eugene, Albany, Corvallis & Springfield, OR
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Restore your worn or damaged concrete with professional resurfacing services. Overlay systems smooth worn slabs and restore appearance at a fraction of replacement cost.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              Texture options for driveways, patios, and pool decks. Every project backed by our 5-year workmanship warranty.
            </p>
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <HousecallProButton variant="large">Get a Free Concrete Estimate</HousecallProButton>
              <PhoneLink 
                phone={companyInfo.phone}
                className="text-lg font-semibold text-slate-900 hover:text-primary transition-colors"
              >
                Call Now: {companyInfo.phone}
              </PhoneLink>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl">What This Service Includes</h2>
          <ul className="mx-auto space-y-4 text-left max-w-2xl">
            {[
              'Comprehensive assessment of concrete condition and suitability',
              'Thorough cleaning and surface preparation',
              'Crack repair and surface leveling as needed',
              'Application of concrete overlay system',
              'Texture selection and application (smooth, brushed, or stamped)',
              'Color options to match or enhance appearance',
              'Proper bonding and adhesion techniques',
              'Sealing or coating coordination if desired',
              'Final inspection and care instructions',
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <span className="text-lg text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl">Best For</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Worn Driveways', description: 'Restore worn, cracked driveways with resurfacing overlays that provide a fresh, smooth surface.' },
              { title: 'Patios', description: 'Resurface patios to restore appearance and functionality without full replacement.' },
              { title: 'Pool Decks', description: 'Resurface pool deck areas with slip-resistant textures and durable finishes.' },
              { title: 'Walkways', description: 'Restore walkways with resurfacing that improves safety and appearance.' },
              { title: 'Garage Floors', description: 'Resurface garage floors before applying coatings for a smooth, uniform base.' },
              { title: 'Commercial Surfaces', description: 'Resurface commercial concrete surfaces to restore appearance and extend lifespan.' },
            ].map((useCase, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold">{useCase.title}</h3>
                <p className="text-slate-700">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl">Our Process</h2>
          <div className="space-y-6">
            {[
              {
                title: 'On-Site Assessment',
                description: 'We inspect your concrete surfaces, assess damage and wear, and evaluate whether resurfacing is appropriate or if replacement is necessary. We provide honest recommendations based on condition and long-term viability.',
              },
              {
                title: 'Prep & Cleaning',
                description: 'We thoroughly clean the surface, remove loose material, and prepare for overlay application. Proper preparation is non-negotiable—it ensures the overlay bonds correctly and lasts. We may grind or etch to create proper adhesion.',
              },
              {
                title: 'Repairs',
                description: 'We repair major cracks, fill holes, and level uneven areas. The overlay system works best on a sound, prepared base, so we address any issues that could compromise the resurfacing.',
              },
              {
                title: 'Application & Finishing',
                description: 'We apply the overlay system with proper bonding techniques, then finish with your chosen texture. We work carefully to ensure even coverage and proper curing conditions.',
              },
              {
                title: 'Final Walkthrough & Care Instructions',
                description: 'We walk through the completed resurfacing, explain the curing process, and provide care instructions. We discuss sealing or coating options to protect the new surface long-term.',
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

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl">Why Resurface-It</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: 'Prep is Non-Negotiable',
                description: 'We never skip preparation. Proper cleaning, repair, and surface readiness ensure overlay adhesion and longevity. It\'s the foundation of quality resurfacing work.',
              },
              {
                title: 'Built for Oregon Weather',
                description: 'We use overlay systems and techniques designed for Oregon\'s weather conditions. Our resurfacing stands up to rain, freeze-thaw cycles, and temperature fluctuations.',
              },
              {
                title: 'Clear Communication',
                description: 'We explain when resurfacing is appropriate and when replacement is better. Honest assessments help you make informed decisions about your concrete surfaces.',
              },
              {
                title: 'Clean Jobsite',
                description: 'We protect your property and clean up thoroughly. Resurfacing work is completed with minimal disruption, and your space is left clean and restored.',
              },
            ].map((point, index) => (
              <div key={index} className="rounded-lg bg-primary/5 p-6">
                <h3 className="mb-2 text-xl font-bold text-slate-900">{point.title}</h3>
                <p className="text-slate-700">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {resurfacingFAQs.length > 0 && (
        <Section>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions</h2>
            <div className="mx-auto max-w-3xl">
              <FAQAccordion faqs={resurfacingFAQs} />
            </div>
          </div>
        </Section>
      )}

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl">Other Concrete Services</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                slug: 'coatings',
                name: 'Concrete Coatings',
                description: 'Garage and shop floor coatings with epoxy and polyaspartic. Durable, chemical-resistant finishes built for heavy use and Oregon weather.',
              },
              {
                slug: 'repair',
                name: 'Concrete Repair',
                description: 'Crack repair, spalling fixes, and surface restoration. We assess damage and provide solutions that prevent further deterioration.',
              },
              {
                slug: 'polishing',
                name: 'Concrete Polishing',
                description: 'Polished concrete finishes for interior floors. Modern, low-maintenance surfaces with various sheen levels and stain protection.',
              },
              {
                slug: 'sealing',
                name: 'Concrete Sealing',
                description: 'Protective sealing for driveways, patios, and exterior concrete. Prevents water intrusion, staining, and freeze-thaw damage.',
              },
              {
                slug: 'pressure-washing',
                name: 'Concrete Pressure Washing',
                description: 'Professional surface cleaning to remove algae, moss, grime, and tire marks. Prepares surfaces for sealing or coating applications.',
              },
            ].map((service) => (
              <Link
                key={service.slug}
                href={`/concrete/${service.slug}`}
                className="card flex h-full w-full flex-col items-start rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Square className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{service.name}</h3>
                </div>
                <p className="mb-4 text-sm text-slate-600">{service.description}</p>
                <span className="inline-flex items-center text-sm font-semibold text-primary hover:text-primaryDark">
                  Learn More
                  <span className="ml-1">→</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/concrete" className="font-semibold text-primary hover:underline">
              ← Back to All Concrete Services
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Resurface Your Concrete?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for concrete resurfacing. We&apos;ll assess your surfaces and discuss options.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}
