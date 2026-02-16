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
  title: 'Interior Painting in Albany, OR',
  description: 'Professional interior painting in Albany, OR. All rooms, low-VOC options, color consultation. Sherwin-Williams & Benjamin Moore paints. Expert prep, furniture protection, cleanup. Free estimates.',
  path: '/locations/albany-or',
})

const albanyInteriorFAQs = [
  {
    question: 'How much does interior painting cost in Albany, OR?',
    answer: 'Interior painting in Albany typically costs $2,500 to $8,000 depending on the number of rooms, square footage, and complexity. A single room can cost $500-$1,500, while whole-home projects range from $5,000-$12,000. We provide detailed estimates within 24 hours.',
    category: 'interior-painting' as const,
  },
  {
    question: 'Do you paint kitchens and bathrooms in Albany homes?',
    answer: 'Yes! We specialize in kitchen and bathroom painting in Albany. These spaces require moisture-resistant paints and special preparation. We use washable, moisture-resistant finishes in satin or semi-gloss that stand up to steam, splashes, and regular cleaning—essential for Oregon\'s humidity.',
    category: 'interior-painting' as const,
  },
  {
    question: 'How long does interior painting take in Albany?',
    answer: 'Most interior painting projects in Albany take 2-7 days depending on the number of rooms and complexity. A single room can often be completed in one day, while whole-home projects may take 5-7 days. We work efficiently to minimize disruption to your daily routine.',
    category: 'interior-painting' as const,
  },
]

export default function AlbanyInteriorPaintingPage() {
  const serviceDescription = 'Professional interior painting services in Albany, OR. Transform every room in your home with expert craftsmanship, premium paints, and attention to detail.'
  const serviceSchema = generateServiceSchema('Interior Painting in Albany, OR', serviceDescription)
  const faqSchema = generateFAQPageSchema(albanyInteriorFAQs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Albany, OR', url: '/locations/albany-or' },
    { name: 'Interior Painting', url: '/services/interior-painting' },
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
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Interior Painting in Albany, OR</h1>
            <p className="mb-8 text-xl text-slate-600">
              Transform every room in your Albany home with professional interior painting. From living rooms and bedrooms to kitchens and bathrooms, we bring expert craftsmanship and premium paints to every project.
            </p>
            <HousecallProButton variant="large">Get Free Estimate</HousecallProButton>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">What&apos;s Included in Our Interior Painting Service</h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="mb-4 text-lg leading-relaxed">
              Our interior painting service in Albany covers every aspect of your project. We paint all interior spaces including living rooms, dining rooms, bedrooms, kitchens, bathrooms, hallways, home offices, and more. Each room type receives specific attention—we use moisture-resistant paints in bathrooms and kitchens, durable finishes in high-traffic areas, and the right sheen for each space.
            </p>
            <p className="mb-4 text-lg leading-relaxed">
              We handle complete surface preparation: cleaning walls, sanding rough areas, filling nail holes, repairing cracks, and ensuring surfaces are smooth and ready. We apply primer where needed, especially for new drywall, patched areas, or dramatic color changes. All furniture and flooring are protected with drop cloths and plastic sheeting.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              We use premium interior paints from trusted brands like Sherwin-Williams and Benjamin Moore, with low-VOC and zero-VOC options available for healthier indoor air quality. Our team provides expert color consultation to help you choose the perfect shades for your Albany home.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">Our Interior Painting Process</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Color Consultation',
                description: 'We help you choose the perfect colors for your space. Our team provides expert advice on color schemes, finishes, and how different colors will look in your lighting conditions. We consider natural light, room size, and how colors flow from room to room.',
              },
              {
                title: 'Room Preparation',
                description: 'We move and protect all furniture, cover floors and fixtures, and remove or protect hardware. Our goal is to keep your belongings safe and minimize disruption to your daily routine. You can continue using other areas of your home while we work.',
              },
              {
                title: 'Surface Preparation',
                description: 'Walls are cleaned, sanded, and patched as needed. We fill nail holes, repair cracks, and ensure surfaces are smooth and ready for paint. All trim and baseboards are taped and protected. Proper surface preparation is crucial for a professional finish.',
              },
              {
                title: 'Primer Application',
                description: 'Where needed, we apply primer to ensure proper paint adhesion and coverage. This is especially important for new drywall, patched areas, or dramatic color changes. Primer ensures an even base for the finish coats.',
              },
              {
                title: 'Paint Application',
                description: 'We apply paint using professional techniques, starting with cutting in edges and trim, then rolling walls. Multiple coats ensure even coverage and a flawless finish. We use the right finish for each surface—flat for ceilings, eggshell for most walls, satin for high-traffic areas, and semi-gloss for trim and doors.',
              },
              {
                title: 'Cleanup & Final Touches',
                description: 'We clean up thoroughly, remove all protection materials, and return furniture to its original position. Touch-ups are completed, and we ensure everything is perfect before we leave. Your Albany home is left clean and beautiful.',
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
          <h2 className="mb-6 text-3xl font-bold">Why Interior Painting Matters in Albany</h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="mb-4 text-lg leading-relaxed">
              Albany&apos;s climate, with its high humidity and temperature fluctuations, can affect interior paint performance. We use paints specifically chosen for their ability to handle these conditions. In kitchens and bathrooms, moisture-resistant finishes are essential to prevent peeling and mildew growth.
            </p>
            <p className="mb-4 text-lg leading-relaxed">
              Proper surface preparation is especially important in Albany homes, where humidity can cause paint adhesion issues if surfaces aren&apos;t properly cleaned and primed. We never skip steps—every wall is properly prepared before paint application.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              Low-VOC and zero-VOC paint options are available for families with children, pets, or anyone sensitive to paint fumes. These paints have minimal odor and are safer for indoor air quality, which is important when you&apos;re living in the home during painting.
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
                alt="Interior painting project in Albany, OR"
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
                alt="Interior painting project in Albany, OR"
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
            <FAQAccordion faqs={albanyInteriorFAQs} />
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Albany Home&apos;s Interior?</h2>
          <p className="mb-8 text-lg text-white/90">
            Get your free, no-obligation estimate for interior painting in Albany. We&apos;ll visit your home, assess your project, and provide a detailed quote.
          </p>
          <HousecallProButton
            variant="large"
            className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold"
          >
            Get Free Estimate
          </HousecallProButton>
          <p className="mt-6 text-sm text-white/80">
            <Link href="/locations/albany-or" className="underline hover:text-white">
              ← Back to Albany services
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

