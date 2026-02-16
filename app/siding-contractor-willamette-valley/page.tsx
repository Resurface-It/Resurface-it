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
  title: 'Siding Contractor Near Me | Willamette Valley | Hardie, Vinyl & Fiber Cement',
  description:
    'Licensed siding contractors in the Willamette Valley. Resurface-It installs Hardie board, vinyl & fiber cement siding in Eugene, Albany, Corvallis & Springfield. 5-year warranty. Free estimate.',
  path: '/siding-contractor-willamette-valley',
})

export default function SidingContractorWillametteValleyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Siding Contractor in the Willamette Valley', url: '/siding-contractor-willamette-valley' },
  ])

  const localBusinessSchema = generateLocalBusinessSchema()

  const faqs = [
    {
      question: 'Where do you offer siding contractor services in the Willamette Valley?',
      answer:
        'We provide siding replacement and installation throughout Oregon’s Willamette Valley, including Eugene, Springfield, Albany, Corvallis, Junction City, Veneta, and surrounding communities in Lane, Linn, and Benton counties.',
    },
    {
      question: 'What siding materials do you install in the Willamette Valley?',
      answer:
        'We install James Hardie fiber cement siding, vinyl siding, and other fiber cement options. We help you choose the best material for your home, budget, and Oregon’s climate—including moisture-resistant systems suited to our wet winters and sunny summers.',
    },
    {
      question: 'Why choose a local siding contractor in the Willamette Valley?',
      answer:
        'Local siding contractors understand Oregon’s building codes, moisture challenges, and housing styles. We work with local suppliers, provide a 5-year workmanship warranty, and offer fast, transparent estimates—often within 24 hours.',
    },
    {
      question: 'How do I get a quote from a siding contractor near me?',
      answer:
        'Request a free, no-obligation estimate online or by phone. We’ll visit your home, assess your project, discuss material options, and provide a detailed written quote with no pressure.',
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
              Siding Contractor Near Me | Willamette Valley
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Licensed siding contractors serving Eugene, Albany, Corvallis, Springfield,
              and surrounding Willamette Valley communities with Hardie board, vinyl, and fiber cement.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              As a locally owned company based in Eugene, we understand Oregon’s climate and building
              requirements. Every siding project is backed by our 5-year workmanship warranty.
            </p>
            <HousecallProButton variant="large">
              Get Free Siding Estimate
            </HousecallProButton>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Siding Replacement & Installation"
            subtitle="Hardie board, vinyl, and fiber cement siding for Willamette Valley homes"
          />
          <div className="mt-6 space-y-4 text-lg text-slate-700">
            <p>
              We provide full siding replacement and installation for homes throughout the Willamette Valley.
              From material selection and color choices to removal of old siding, repair of sheathing or rot,
              and proper installation and trim, we handle the entire project so your home is protected and
              looks great for years.
            </p>
            <p>
              Oregon’s wet winters and intense summer sun demand siding that can handle moisture and UV.
              We install James Hardie fiber cement, vinyl siding, and other durable options, with proper
              flashing, house wrap, and trim details so your investment holds up in our climate.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                James Hardie & Fiber Cement
              </h3>
              <p className="mb-4 text-sm text-slate-700">
                Fiber cement siding resists rot, fire, and insects and holds paint well in Oregon’s climate.
              </p>
              <Link href="/services/siding/james-hardie" className="font-semibold text-primary hover:underline">
                Learn about James Hardie siding →
              </Link>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                Full Siding Replacement
              </h3>
              <p className="mb-4 text-sm text-slate-700">
                Complete removal, repair, and new siding installation with a 5-year workmanship warranty.
              </p>
              <Link href="/services/siding-replacement" className="font-semibold text-primary hover:underline">
                Siding replacement services →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Where We Work in the Willamette Valley"
            subtitle="Siding contractors for Eugene, Springfield, Albany, Corvallis, and nearby communities"
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
                See our{' '}
                <Link href="/areas-we-serve" className="font-semibold text-primary hover:underline">
                  Areas We Serve
                </Link>{' '}
                page for the full list.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Siding Contractor FAQs"
            subtitle="Common questions about siding contractors in the Willamette Valley"
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
            Ready to Work With a Local Siding Contractor?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Schedule your free, no-obligation siding estimate today. We’ll visit your home,
            assess your project, and provide a detailed quote—often within 24 hours.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Siding Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}
