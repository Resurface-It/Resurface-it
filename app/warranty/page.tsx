import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { PillBadge } from '@/components/PillBadge'
import { FAQAccordion } from '@/components/FAQAccordion'
import { getFAQsByCategory } from '@/data/faq'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateFAQPageSchema } from '@/lib/jsonld'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: '5-Year Workmanship Warranty',
  description: 'Learn about Resurface-it\'s comprehensive 5-year workmanship warranty that covers all our siding replacement and painting services.',
  path: '/warranty',
})

const warrantyFaqs = getFAQsByCategory('warranty')

export default function WarrantyPage() {
  const faqSchema = generateFAQPageSchema(
    warrantyFaqs.map((faq) => ({ question: faq.question, answer: faq.answer }))
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="bg-gradient-to-br from-primary/5 to-surface pt-32 pb-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <PillBadge className="mb-6 !bg-primary !text-white">5-Year Workmanship Warranty</PillBadge>
            <h1 className="mb-6">Our Promise to You</h1>
            <p className="text-xl text-slate-600">
              Every project is backed by our comprehensive 5-year workmanship warranty, giving you 
              peace of mind that we stand behind our work.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">What This Warranty Covers</h2>
          <div className="card mb-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <strong className="text-slate-900">Installation defects:</strong>
                  <span className="ml-2 text-slate-600">
                    Issues related to improper installation, including gaps, misalignment, or material defects.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <strong className="text-slate-900">Workmanship issues:</strong>
                  <span className="ml-2 text-slate-600">
                    Problems resulting from substandard workmanship, including paint failure, peeling, or premature wear.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <strong className="text-slate-900">Material defects:</strong>
                  <span className="ml-2 text-slate-600">
                    Defects in materials we supply, provided they're not due to normal wear and tear.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <strong className="text-slate-900">Repair and replacement:</strong>
                  <span className="ml-2 text-slate-600">
                    We'll repair or replace covered items at no cost to you, including labor and materials.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <h2 className="mb-6 text-3xl">What This Warranty Does Not Cover</h2>
          <div className="card mb-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                <div>
                  <strong className="text-slate-900">Normal wear and tear:</strong>
                  <span className="ml-2 text-slate-600">
                    Gradual deterioration that occurs naturally over time.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                <div>
                  <strong className="text-slate-900">Damage from external causes:</strong>
                  <span className="ml-2 text-slate-600">
                    Damage from storms, accidents, vandalism, or other events beyond our control.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                <div>
                  <strong className="text-slate-900">Modifications by others:</strong>
                  <span className="ml-2 text-slate-600">
                    Changes or repairs made by other contractors or homeowners.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                <div>
                  <strong className="text-slate-900">Lack of maintenance:</strong>
                  <span className="ml-2 text-slate-600">
                    Issues resulting from failure to maintain the work as recommended.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <h2 className="mb-6 text-3xl">How to Request Warranty Service</h2>
          <div className="card mb-8">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  1
                </span>
                <div>
                  <strong className="text-slate-900">Contact us:</strong>
                  <span className="ml-2 text-slate-600">
                    Reach out via phone, email, or our contact form with details about the issue.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  2
                </span>
                <div>
                  <strong className="text-slate-900">Inspection:</strong>
                  <span className="ml-2 text-slate-600">
                    We'll schedule a convenient time to inspect the issue and determine if it's covered under warranty.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  3
                </span>
                <div>
                  <strong className="text-slate-900">Resolution:</strong>
                  <span className="ml-2 text-slate-600">
                    If covered, we'll schedule repairs at no cost to you and complete the work promptly.
                  </span>
                </div>
              </li>
            </ol>
          </div>

          <h2 className="mb-6 text-3xl">Our Promise to You</h2>
          <div className="card">
            <p className="mb-4 text-lg text-slate-700">
              We stand behind our work because we're confident in the quality of our craftsmanship 
              and materials. Our 5-year warranty reflects our commitment to your satisfaction and 
              the long-term protection of your investment.
            </p>
            <p className="text-lg text-slate-700">
              When you choose Resurface-it, you're not just getting a contractor—you're getting a 
              partner who will be there for you long after the project is complete.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">Warranty FAQs</h2>
          <FAQAccordion faqs={warrantyFaqs} />
        </div>
      </Section>
    </>
  )
}

