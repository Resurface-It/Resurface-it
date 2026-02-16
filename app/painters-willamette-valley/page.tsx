import Link from 'next/link'
import type { Metadata } from 'next'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { HousecallProButton } from '@/components/HousecallProButton'
import { generateMetadata as genMeta } from '@/lib/seo'
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
} from '@/lib/jsonld'

export const metadata: Metadata = genMeta({
  title: 'Painters Near Me in the Willamette Valley | Interior & Exterior House Painting',
  description:
    'Looking for painters near you in the Willamette Valley? Resurface-It provides interior and exterior house painting in Eugene, Albany, Corvallis & Springfield with a 5-year workmanship warranty.',
  path: '/painters-willamette-valley',
})

export default function PaintersWillametteValleyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Painters in the Willamette Valley', url: '/painters-willamette-valley' },
  ])

  const localBusinessSchema = generateLocalBusinessSchema()

  const faqs = [
    {
      question: 'Where do you offer painting services in the Willamette Valley?',
      answer:
        'We provide interior and exterior house painting throughout Oregon’s Willamette Valley, including Eugene, Springfield, Albany, Corvallis, Junction City, Veneta, and surrounding communities in Lane, Linn, and Benton counties.',
    },
    {
      question: 'Do you handle both interior and exterior painting projects?',
      answer:
        'Yes. We provide complete interior and exterior painting services, including walls, ceilings, trim, doors, cabinets, decks, and fences. Our team can handle everything from a single room refresh to full exterior repaints and complete color updates.',
    },
    {
      question: 'What makes your painters a good fit for Willamette Valley homes?',
      answer:
        'Oregon’s Willamette Valley has heavy winter rains, high humidity, and strong summer sun. We use moisture-resistant primers, high-quality exterior paints formulated for our climate, and proven prep processes that address moss, mildew, and UV exposure so your paint job lasts.',
    },
    {
      question: 'How do I get a quote from painters near me?',
      answer:
        'You can request a free, no-obligation estimate online or by phone. We will visit your home, review your project, answer questions, and provide a detailed written quote—often within 24 hours.',
    },
  ]

  const faqSchema = generateFAQPageSchema(faqs)

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-gradient-to-br from-primary/5 to-surface pt-32 pb-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6">
              Painters Near Me in the Willamette Valley
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Interior and exterior house painters serving Eugene, Albany, Corvallis, Springfield,
              and surrounding Willamette Valley communities with climate-ready paint systems.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              As a locally owned company based in Eugene, we understand Oregon’s wet winters,
              high humidity, and intense summer sun—and we select materials and processes that
              are designed specifically for homes in the Willamette Valley.
            </p>
            <HousecallProButton variant="large">
              Get Free Painting Estimate
            </HousecallProButton>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Interior & Exterior House Painting"
            subtitle="One painting team for every part of your Willamette Valley home"
          />
          <div className="mt-6 space-y-4 text-lg text-slate-700">
            <p>
              Whether you need a full exterior repaint, a few rooms refreshed, or cabinets and
              trim updated, our painting team provides detailed prep work, premium paints, and
              clean job sites from start to finish. We protect your landscaping, mask and cover
              surfaces carefully, and communicate clearly throughout the project.
            </p>
            <p>
              For interiors, we work room by room to minimize disruption, using low-VOC and
              zero-VOC options where appropriate. For exteriors, we address moss, mildew, failing
              caulk, and damaged surfaces before we ever open a can of paint—critical steps for
              long-lasting results in the Willamette Valley.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                Exterior Painting Services
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>Full exterior repaints for siding, trim, and doors</li>
                <li>Moisture-resistant primers and climate-specific paint systems</li>
                <li>Thorough washing, scraping, sanding, and surface repairs</li>
                <li>Deck and fence staining available as part of your project</li>
              </ul>
              <div className="mt-4">
                <Link href="/services/exterior-painting" className="font-semibold text-primary hover:underline">
                  Learn more about exterior painting →
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                Interior Painting Services
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>Whole-home and single-room interior painting</li>
                <li>Kitchens, bathrooms, bedrooms, living spaces, and hallways</li>
                <li>Low-VOC and zero-VOC options for healthier indoor air</li>
                <li>Careful protection of flooring, furniture, and fixtures</li>
              </ul>
              <div className="mt-4">
                <Link href="/services/interior-painting" className="font-semibold text-primary hover:underline">
                  Learn more about interior painting →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Where We Paint in the Willamette Valley"
            subtitle="Local painters for Eugene, Springfield, Albany, Corvallis, and nearby communities"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Primary Cities</h3>
              <ul className="space-y-1 text-sm text-slate-700">
                <li>Eugene, OR</li>
                <li>Springfield, OR</li>
                <li>Albany, OR</li>
                <li>Corvallis, OR</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Surrounding Communities</h3>
              <p className="text-sm text-slate-700">
                We also serve many nearby communities throughout Lane, Linn, and Benton counties.
                Visit our{' '}
                <Link href="/areas-we-serve" className="font-semibold text-primary hover:underline">
                  Areas We Serve
                </Link>{' '}
                page for a full list of service areas.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Painting FAQs"
            subtitle="Common questions about painters near you in the Willamette Valley"
          />
          <div className="mt-6 space-y-6 text-slate-700">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  {faq.question}
                </h3>
                <p className="text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Work With Local Willamette Valley Painters?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Schedule your free, no-obligation painting estimate today. We&apos;ll visit your home,
            review your project, and provide a detailed quote—often within 24 hours.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Painting Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}

