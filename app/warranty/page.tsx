import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { PillBadge } from '@/components/PillBadge'
import { FAQAccordion } from '@/components/FAQAccordion'
import { getFAQsByCategory } from '@/data/faq'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateFAQPageSchema } from '@/lib/jsonld'
import { PrintWarrantyButton } from '@/components/PrintWarrantyButton'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Our Warranties | Painting, Concrete & Roofing',
  description: 'Resurface-it offers three warranties: 5-year for painting and roofing, 1-year for concrete and siding. Learn what\'s covered and how to request service.',
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
            <PillBadge className="mb-6 !bg-primary !text-white">Our Warranties</PillBadge>
            <h1 className="mb-6">Our Promise to You</h1>
            <p className="text-xl text-slate-600">
              We offer three warranties so your project is covered by terms that match the work: a{' '}
              <strong>5-year workmanship warranty</strong> for painting and related projects, a{' '}
              <strong>5-year workmanship warranty</strong> for roofing, and a{' '}
              <strong>1-year workmanship warranty</strong> for concrete and siding. Each gives you peace of mind that we stand behind our work.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-3xl">1. Painting & Related Projects</h2>
          <p className="mb-6 text-slate-600">
            Exterior and interior painting, siding replacement, deck staining, and other painting-related work are covered by our 5-year workmanship warranty.
          </p>

          <h3 className="mb-4 text-xl font-semibold">What This Warranty Covers</h3>
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
                    Defects in materials we supply, provided they&apos;re not due to normal wear and tear.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <strong className="text-slate-900">Repair and replacement:</strong>
                  <span className="ml-2 text-slate-600">
                    We&apos;ll repair or replace covered items at no cost to you, including labor and materials.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <h3 className="mb-4 text-xl font-semibold">What This Warranty Does Not Cover</h3>
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

          <div className="mb-12 flex justify-center">
            <PrintWarrantyButton variant="painting" />
          </div>

          <hr className="my-12 border-slate-200" />

          <h2 className="mb-2 text-3xl">2. Concrete & Siding</h2>
          <p className="mb-6 text-slate-600">
            Concrete installations and siding work are covered by our 1-year workmanship warranty. Full terms are in the printable document below.
          </p>

          <h3 className="mb-4 text-xl font-semibold">What This Warranty Covers</h3>
          <div className="card mb-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <strong className="text-slate-900">Structural cracks:</strong>
                  <span className="ml-2 text-slate-600">
                    Cracks wider than ⅛ inch or uneven; improper control joints (missing or incorrectly spaced).
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <strong className="text-slate-900">Settlement and base issues:</strong>
                  <span className="ml-2 text-slate-600">
                    Slab movement from poor base preparation; major surface failures (scaling or breakdown from improper finishing).
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <strong className="text-slate-900">Incorrect slope:</strong>
                  <span className="ml-2 text-slate-600">
                    Standing water caused by incorrect slope.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <h3 className="mb-4 text-xl font-semibold">Not Covered</h3>
          <div className="card mb-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                <div className="text-slate-600">
                  Hairline or shrinkage cracks; cosmetic issues (color variation, minor blemishes); weather-related damage; customer misuse; damage from de-icing chemicals; pre-existing drainage issues; normal wear and tear; sealers not applied by Resurface-It. Crack-free concrete is not guaranteed. Warranty is valid only for the original property owner.
                </div>
              </li>
            </ul>
          </div>

          <div className="mb-12 flex justify-center">
            <PrintWarrantyButton variant="concreteSiding" />
          </div>

          <hr className="my-12 border-slate-200" />

          <h2 className="mb-2 text-3xl">3. Roofing</h2>
          <p className="mb-6 text-slate-600">
            All roofing installations are covered by our 5-year workmanship warranty from the date of project completion. Full terms are in the printable document below.
          </p>

          <h3 className="mb-4 text-xl font-semibold">What This Warranty Covers</h3>
          <div className="card mb-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <strong className="text-slate-900">Roof leaks and installation failures:</strong>
                  <span className="ml-2 text-slate-600">
                    Issues caused by improper installation, fastening, flashing, or sealing of roofing materials.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <strong className="text-slate-900">Inspection and repair:</strong>
                  <span className="ml-2 text-slate-600">
                    A Resurface-It team member will return to inspect and repair the affected area at no cost for labor.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <h3 className="mb-4 text-xl font-semibold">What This Warranty Does Not Cover</h3>
          <div className="card mb-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                <div>
                  <strong className="text-slate-900">Material defects:</strong>
                  <span className="ml-2 text-slate-600">
                    Covered separately under the roofing material manufacturer&apos;s warranty.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                <div>
                  <strong className="text-slate-900">Weather, acts of God, and external damage:</strong>
                  <span className="ml-2 text-slate-600">
                    Wind, hail, impact, ice dams, falling debris; consequential or incidental damages from extreme weather, structural movement, settling, or moisture not caused by improper installation; improper attic ventilation.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                <div>
                  <strong className="text-slate-900">Other exclusions:</strong>
                  <span className="ml-2 text-slate-600">
                    Foot traffic, misuse, or neglect; repairs or penetrations by others; satellite dishes, solar panels, HVAC, or gutters added after completion; mold, mildew, algae, or moss; condensation or moisture from inside the structure; cosmetic fading or normal aging; pre-existing structural defects. Applies only to the original property owner (non-transferable unless stated in writing) and is valid only if the project balance has been paid in full.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="mb-12 flex justify-center">
            <PrintWarrantyButton variant="roofing" />
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
                    We&apos;ll schedule a convenient time to inspect the issue and determine if it&apos;s covered under warranty.
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
                    If covered, we&apos;ll schedule repairs at no cost to you and complete the work promptly.
                  </span>
                </div>
              </li>
            </ol>
          </div>

          <h2 className="mb-6 text-3xl">Our Promise to You</h2>
          <div className="card">
            <p className="mb-4 text-lg text-slate-700">
              We stand behind our work because we&apos;re confident in the quality of our craftsmanship 
              and materials. Our warranties reflect our commitment to your satisfaction and 
              the long-term protection of your investment.
            </p>
            <p className="text-lg text-slate-700">
              When you choose Resurface-it, you&apos;re not just getting a contractor—you&apos;re getting a 
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

