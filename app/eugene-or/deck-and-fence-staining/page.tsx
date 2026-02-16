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
  title: 'Deck & Fence Staining in Eugene, OR',
  description: 'Professional deck and fence staining in Eugene, OR. Protects against Oregon weather. Premium stains & sealants. Surface prep, cleaning, repairs. Free estimates.',
  path: '/eugene-or/deck-and-fence-staining',
})

const deckFAQs = [
  {
    question: 'How much does deck staining cost in Eugene, OR?',
    answer: 'Deck staining in Eugene typically costs $1,200 to $3,500 depending on deck size, condition, and stain type. Most projects range from $1,500-$2,500. Fence staining costs $800-$2,000 depending on length. We provide detailed estimates within 24 hours.',
    category: 'scheduling' as const,
  },
  {
    question: 'How often should I stain my deck in Eugene?',
    answer: 'In Eugene\'s climate, decks typically need staining every 3-5 years. The frequency depends on exposure to sun and rain, wood type, and the quality of previous staining. Regular maintenance extends the life of your deck significantly.',
    category: 'scheduling' as const,
  },
  {
    question: 'What\'s the best time of year for deck staining in Eugene?',
    answer: 'Late spring through early fall (May through September) is ideal for deck staining in Eugene. We need consistent dry weather for proper stain application and curing. We schedule around Oregon\'s weather patterns to ensure the best results.',
    category: 'scheduling' as const,
  },
]

export default function EugeneDeckStainingPage() {
  const serviceDescription = 'Professional deck and fence staining in Eugene, OR. Protect your outdoor spaces from Oregon weather with premium stains and expert application.'
  const serviceSchema = generateServiceSchema('Deck & Fence Staining in Eugene, OR', serviceDescription)
  const faqSchema = generateFAQPageSchema(deckFAQs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Eugene, OR', url: '/locations/eugene-or' },
    { name: 'Deck & Fence Staining', url: '/services/deck-staining' },
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
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Deck & Fence Staining in Eugene, OR</h1>
            <p className="mb-8 text-xl text-slate-600">
              Protect your outdoor spaces from Eugene&apos;s weather with professional deck and fence staining. Premium stains and sealants that stand up to rain, sun, and humidity.
            </p>
            <HousecallProButton variant="large">Get Free Estimate</HousecallProButton>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">What&apos;s Included in Our Deck & Fence Staining Service</h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="mb-4 text-lg leading-relaxed">
              Our deck and fence staining service in Eugene includes complete surface preparation: inspection for loose boards or structural issues, deep cleaning (power washing, deck cleaner, scrubbing), repairs to damaged boards, and sanding rough areas. We help you choose the right stain color and type (transparent, semi-transparent, or solid) based on your deck&apos;s condition and your aesthetic preferences.
            </p>
            <p className="mb-4 text-lg leading-relaxed">
              We apply premium stains using professional techniques, ensuring even coverage and following the wood grain for a natural, beautiful finish. A protective sealant is applied to lock in the stain and provide additional protection against moisture, UV rays, and wear. This extends the life of your deck significantly.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              Our process ensures your deck or fence is protected from Eugene&apos;s wet winters and sunny summers. Proper staining and sealing prevent moisture damage, rot, and UV fading, keeping your outdoor spaces beautiful and functional for years.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">Our Deck & Fence Staining Process</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Deck/Fence Inspection',
                description: 'We inspect your deck or fence for any loose boards, popped nails, or structural issues that need repair before staining. Safety and structural integrity come first. We assess the condition and recommend any necessary repairs.',
              },
              {
                title: 'Deep Cleaning',
                description: 'Your deck or fence is thoroughly cleaned using appropriate methods—power washing, deck cleaner, and scrubbing to remove dirt, mildew, and old stain. We ensure the surface is completely clean and dry before proceeding.',
              },
              {
                title: 'Repairs & Sanding',
                description: 'Any damaged boards are repaired or replaced. We sand rough areas and ensure the entire surface is smooth and ready for stain application. Proper preparation ensures the stain adheres correctly and lasts longer.',
              },
              {
                title: 'Stain Selection',
                description: 'We help you choose the right stain color and type based on your deck\'s condition and your aesthetic preferences. Newer decks can use transparent stains to show wood grain, while older decks may benefit from semi-transparent or solid stains.',
              },
              {
                title: 'Stain Application',
                description: 'Premium stain is applied using professional techniques, ensuring even coverage. We work in sections and follow the wood grain for a natural, beautiful finish. Multiple coats may be applied depending on the stain type and desired coverage.',
              },
              {
                title: 'Sealant Application & Final Inspection',
                description: 'A protective sealant is applied to lock in the stain and provide additional protection against moisture, UV rays, and wear. We conduct a final inspection to ensure everything meets our high standards. Your deck or fence is protected and beautiful.',
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
          <h2 className="mb-6 text-3xl font-bold">Why Deck & Fence Staining Matters in Eugene</h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="mb-4 text-lg leading-relaxed">
              Eugene&apos;s wet winters and sunny summers are particularly hard on decks and fences. Regular staining and sealing protect your investment and keep your outdoor spaces looking beautiful year after year. Without proper protection, wood can rot, warp, and fade, leading to costly repairs or replacement.
            </p>
            <p className="mb-4 text-lg leading-relaxed">
              Proper surface preparation is essential for stain adhesion and longevity. We never skip the cleaning and preparation steps—they&apos;re the foundation of a long-lasting finish. In Eugene&apos;s humid climate, moisture-resistant stains and sealants are essential.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              Timing is important for deck staining. We schedule projects during dry weather periods to ensure proper drying and curing of the stain and sealant. This ensures the finish adheres correctly and provides maximum protection.
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
                src="/images/project-1.jpg"
                alt="Deck staining project in Eugene, OR"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                quality={75}
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
              <Image
                src="/images/project-7.jpg"
                alt="Deck staining project in Eugene, OR"
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
            <FAQAccordion faqs={deckFAQs} />
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Protect Your Deck or Fence?</h2>
          <p className="mb-8 text-lg text-white/90">
            Get your free, no-obligation estimate for deck or fence staining in Eugene. We&apos;ll visit your home, assess your project, and provide a detailed quote.
          </p>
          <HousecallProButton
            variant="large"
            className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold"
          >
            Get Free Estimate
          </HousecallProButton>
          <p className="mt-6 text-sm text-white/80">
            <Link href="/locations/eugene-or" className="underline hover:text-white">
              ← Back to Eugene services
            </Link>
            {' • '}
            <Link href="/services/deck-staining" className="underline hover:text-white">
              View all deck staining services
            </Link>
          </p>
        </div>
      </Section>
    </>
  )
}

