import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { SmartEstimateForm } from '@/components/SmartEstimateForm'
import { FAQAccordion } from '@/components/FAQAccordion'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateLocalBusinessSchema } from '@/lib/jsonld'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Contact Us | Get Your Free Estimate',
  description: 'Get your free, no-obligation estimate for siding replacement or painting services. We serve Eugene, Albany, Corvallis, Springfield and surrounding areas.',
  path: '/contact',
})

const contactFAQs = [
  {
    question: 'What happens after I submit this form?',
    answer: 'We&apos;ll contact you within 24 hours (usually same day) to schedule a convenient time for your free, no-obligation estimate. We&apos;ll discuss your project goals, assess your home, and provide a detailed written estimate.',
    category: 'scheduling' as const,
  },
  {
    question: 'How fast will you contact me?',
    answer: 'We typically respond within 24 hours, often the same day. During peak season (spring/summer), we aim to respond within 4-6 hours during business hours.',
    category: 'scheduling' as const,
  },
  {
    question: 'Is the estimate really free and no-obligation?',
    answer: 'Yes, absolutely. The estimate is completely free with no obligation to proceed. We&apos;ll visit your home, assess your project, provide recommendations, and give you a detailed written estimate. There&apos;s no pressure—you decide when and if you want to move forward.',
    category: 'scheduling' as const,
  },
  {
    question: 'How soon can you start?',
    answer: 'Project start times vary by season. During peak season (spring/summer), we typically schedule 2-4 weeks out. During fall/winter, we can often start within 1-2 weeks. We&apos;ll discuss timeline options during your estimate.',
    category: 'scheduling' as const,
  },
  {
    question: 'Do you offer financing?',
    answer: 'We work with several financing partners to offer flexible payment options. We can discuss financing options during your estimate visit to find a solution that works for your budget.',
    category: 'scheduling' as const,
  },
  {
    question: 'Do I need to be home for the estimate?',
    answer: 'Yes, we prefer you to be home so we can discuss your goals, answer questions, and show you material samples. However, if you need to reschedule, just let us know and we&apos;ll find another time that works.',
    category: 'scheduling' as const,
  },
]

export default function ContactPage() {
  const localBusinessSchema = generateLocalBusinessSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <section className="bg-gradient-to-br from-primary/5 to-surface pt-32 pb-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6">Get Your Free Estimate</h1>
            <p className="text-xl text-slate-600">
              Ready to transform your home? Get a detailed, no-obligation estimate in 24 hours or less.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl">What Happens After You Submit</h2>
              <div className="prose prose-lg max-w-none">
                <div className="mb-6 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
                  <h3 className="mb-3 text-xl font-semibold text-primary">Quick Response Guarantee</h3>
                  <p className="mb-2 text-slate-700">
                    <strong>We&apos;ll contact you within 24 hours</strong> (usually same day) to schedule your free estimate visit.
                  </p>
                  <p className="text-sm text-slate-600">
                    During peak season, we aim to respond within 4-6 hours during business hours.
                  </p>
                </div>

                <p className="mb-4 text-lg font-semibold text-slate-900">
                  Your estimate visit includes:
                </p>
                <ul className="mb-6 space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span><strong>Project assessment:</strong> We&apos;ll evaluate your home&apos;s condition and discuss your goals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span><strong>Material options:</strong> See samples and learn about different siding and paint options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span><strong>Color consultation:</strong> Get expert advice on colors that work with your home and neighborhood</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span><strong>Written estimate:</strong> Receive a detailed, transparent quote with timeline—no surprises</span>
                  </li>
                </ul>

                <div className="mb-6 rounded-xl bg-slate-50 p-6">
                  <p className="mb-3 text-lg font-semibold text-slate-900">Typical Timeline</p>
                  <ul className="space-y-2 text-slate-700">
                    <li>• <strong>Response:</strong> Within 24 hours (often same day)</li>
                    <li>• <strong>Estimate visit:</strong> Scheduled within 2-3 days</li>
                    <li>• <strong>Project start:</strong> 2-4 weeks after approval (varies by season)</li>
                    <li>• <strong>Project duration:</strong> 3-10 days depending on scope</li>
                  </ul>
                </div>

                <div className="rounded-xl bg-primary/10 p-6">
                  <h3 className="mb-3 text-xl font-semibold text-primary">Why Choose Resurface-it</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>✓ Licensed, insured, and locally owned</li>
                    <li>✓ 5-year workmanship warranty on all work</li>
                    <li>✓ Premium materials designed for Oregon weather</li>
                    <li>✓ Transparent pricing—no hidden fees or surprises</li>
                    <li>✓ Expert installation with attention to detail</li>
                    <li>✓ Free estimates with zero obligation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div className="card mb-8">
                <h2 className="mb-6 text-2xl font-semibold">Request Your Free Estimate</h2>
                <p className="mb-6 text-sm text-slate-600">
                  Fill out the form below and we&apos;ll contact you within 24 hours to schedule your free, no-obligation estimate.
                </p>
                <SmartEstimateForm />
              </div>

              <div className="card">
                <h3 className="mb-4 text-xl font-semibold">Frequently Asked Questions</h3>
                <FAQAccordion faqs={contactFAQs} />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

