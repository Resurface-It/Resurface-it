import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { HousecallProButton } from '@/components/HousecallProButton'
import { FAQAccordion } from '@/components/FAQAccordion'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateServiceSchema, generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Cabinet Painting & Refinishing in Eugene, OR',
  description: 'Professional cabinet painting and refinishing in Eugene, OR. Kitchen and bathroom cabinets. Moisture-resistant finishes. Expert prep, color consultation, hardware updates. Free estimates.',
  path: '/eugene-or/cabinet-painting',
})

const cabinetFAQs = [
  {
    question: 'How much does cabinet painting cost in Eugene, OR?',
    answer: 'Cabinet painting in Eugene typically costs $1,500 to $5,000 depending on the number of cabinets, doors, and drawers. Kitchen cabinets usually range from $2,500-$4,500, while bathroom cabinets cost $800-$2,000. We provide detailed estimates within 24 hours.',
    category: 'interior-painting' as const,
  },
  {
    question: 'How long does cabinet painting take?',
    answer: 'Most cabinet painting projects in Eugene take 3-5 business days. This includes proper surface preparation, primer application, multiple coats of paint, and hardware reinstallation. We work efficiently while ensuring quality results.',
    category: 'interior-painting' as const,
  },
  {
    question: 'Do you paint both kitchen and bathroom cabinets?',
    answer: 'Yes! We paint kitchen and bathroom cabinets in Eugene homes. Kitchen cabinets require durable, washable finishes that stand up to daily use, while bathroom cabinets need moisture-resistant paints. We use the appropriate finish for each application.',
    category: 'interior-painting' as const,
  },
]

export default function EugeneCabinetPaintingPage() {
  const serviceDescription = 'Professional cabinet painting and refinishing in Eugene, OR. Transform your kitchen and bathroom cabinets with expert craftsmanship and premium finishes.'
  const serviceSchema = generateServiceSchema('Cabinet Painting & Refinishing in Eugene, OR', serviceDescription)
  const faqSchema = generateFAQPageSchema(cabinetFAQs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Eugene, OR', url: '/eugene-or' },
    { name: 'Cabinet Painting', url: '/eugene-or/cabinet-painting' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gradient-to-br from-primary/5 to-surface pt-32 pb-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Cabinet Painting & Refinishing in Eugene, OR</h1>
            <p className="mb-8 text-xl text-slate-600">
              Transform your kitchen and bathroom cabinets without the cost of replacement. Expert cabinet painting and refinishing services in Eugene using premium paints and professional techniques.
            </p>
            <HousecallProButton variant="large">Get Free Estimate</HousecallProButton>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">What&apos;s Included in Our Cabinet Painting Service</h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="mb-4 text-lg leading-relaxed">
              Our cabinet painting service in Eugene covers kitchen and bathroom cabinets, including all doors, drawers, frames, and hardware. We handle complete surface preparation: cleaning, degreasing (especially important for kitchen cabinets), sanding, and priming. All hardware is removed, cleaned, and can be updated if desired.
            </p>
            <p className="mb-4 text-lg leading-relaxed">
              We use premium paints specifically formulated for cabinets—durable, washable finishes that stand up to daily use. For kitchen cabinets, we use satin or semi-gloss finishes that resist grease and are easy to clean. Bathroom cabinets receive moisture-resistant finishes that handle Eugene&apos;s humidity.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              Color consultation is included—we help you choose colors that complement your existing décor or create a completely new look. We can match existing colors or help you select new shades that transform your space.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">Our Cabinet Painting Process</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Cabinet Assessment & Color Consultation',
                description: 'We assess your cabinets, discuss your goals, and help you choose colors and finishes. We consider your existing décor, lighting, and personal style to recommend the best options for your Eugene home.',
              },
              {
                title: 'Hardware Removal & Protection',
                description: 'All hardware (hinges, handles, knobs) is carefully removed and labeled. We protect countertops, floors, and surrounding areas with drop cloths and plastic sheeting. Cabinets are cleaned and degreased.',
              },
              {
                title: 'Surface Preparation',
                description: 'Cabinets are thoroughly sanded to create a smooth surface for paint adhesion. We fill any dents, scratches, or holes, and ensure all surfaces are clean and ready. Proper preparation is crucial for a long-lasting finish.',
              },
              {
                title: 'Primer Application',
                description: 'High-quality primer is applied to all surfaces. Primer ensures proper paint adhesion and provides an even base for the finish coats. This step is essential for durability, especially in Eugene&apos;s humid climate.',
              },
              {
                title: 'Paint Application',
                description: 'We apply multiple coats of premium cabinet paint using professional techniques. Each coat is allowed to dry properly before the next is applied. We ensure even coverage and a smooth, professional finish.',
              },
              {
                title: 'Hardware Reinstallation & Final Inspection',
                description: 'Hardware is cleaned and reinstalled (or new hardware is installed if you&apos;ve chosen to update). We conduct a final inspection, complete any touch-ups, and ensure everything is perfect. Your cabinets are ready to use.',
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

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">Why Cabinet Painting Matters in Eugene</h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="mb-4 text-lg leading-relaxed">
              Eugene&apos;s high humidity can affect cabinet finishes, especially in bathrooms. We use moisture-resistant paints and proper surface preparation to ensure your cabinet paint job lasts. Kitchen cabinets need finishes that resist grease and frequent cleaning—our premium paints are specifically formulated for these conditions.
            </p>
            <p className="mb-4 text-lg leading-relaxed">
              Cabinet painting is a cost-effective way to transform your kitchen or bathroom without the expense and disruption of full cabinet replacement. With proper preparation and premium paints, painted cabinets can look beautiful and last for years.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              We work efficiently to minimize disruption to your daily routine. While we recommend avoiding heavy use of painted cabinets for a few days after completion, you can continue using your home normally during most of the project.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl font-bold">Before & After Gallery</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
              <Image
                src="/images/project-3.jpg"
                alt="Cabinet painting project in Eugene, OR"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                quality={75}
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
              <Image
                src="/images/project-6.jpg"
                alt="Cabinet painting project in Eugene, OR"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                quality={75}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-3xl">
            <FAQAccordion faqs={cabinetFAQs} />
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Cabinets?</h2>
          <p className="mb-8 text-lg text-white/90">
            Get your free, no-obligation estimate for cabinet painting in Eugene. We&apos;ll visit your home, assess your cabinets, and provide a detailed quote.
          </p>
          <HousecallProButton
            variant="large"
            className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold"
          >
            Get Free Estimate
          </HousecallProButton>
          <p className="mt-6 text-sm text-white/80">
            <Link href="/eugene-or" className="underline hover:text-white">
              ← Back to Eugene services
            </Link>
            {' • '}
            <Link href="/services/interior-painting" className="underline hover:text-white">
              View all interior painting services
            </Link>
          </p>
        </div>
      </Section>
    </>
  )
}

