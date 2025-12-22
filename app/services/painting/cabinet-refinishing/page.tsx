import { Section } from '@/components/Section'
import { HousecallProButton } from '@/components/HousecallProButton'
import { FAQAccordion } from '@/components/FAQAccordion'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateServiceSchema, generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'Cabinet Painting & Refinishing in Eugene, Albany, Corvallis & Springfield, OR',
  description: 'Professional kitchen cabinet refinishing and painting. Cost-effective alternative to replacement. Durable finishes, proper prep, and expert application. Free estimates.',
  path: '/services/painting/cabinet-refinishing',
})

const cabinetFAQs = [
  {
    question: 'How much does cabinet refinishing cost compared to replacement?',
    answer: 'Cabinet refinishing typically costs $3,000-$8,000, while replacement can cost $15,000-$30,000 or more. Refinishing is a cost-effective way to transform your kitchen without the expense and disruption of full replacement. We provide detailed estimates so you can compare options.',
    category: 'interior-painting' as const,
  },
  {
    question: 'What\'s included in cabinet refinishing?',
    answer: 'Our cabinet refinishing includes degreasing, sanding, priming, and applying multiple coats of durable paint or stain. We remove hardware, protect surrounding areas, and reinstall everything when complete. We can also replace hardware if desired. The process typically takes 3-5 days.',
    category: 'interior-painting' as const,
  },
  {
    question: 'What type of finish do you use for cabinets?',
    answer: 'We use high-quality finishes specifically designed for cabinets, including Italian multi-component polyurethane for maximum durability. These finishes stand up to daily use, cleaning, and moisture. We can match existing colors or help you choose new colors.',
    category: 'interior-painting' as const,
  },
  {
    question: 'Do I need to empty my cabinets?',
    answer: 'Yes, you\'ll need to empty your cabinets before we begin. We\'ll provide guidance on what to remove and how to protect your belongings. We handle all the prep work, but having empty cabinets ensures we can work efficiently and protect your items.',
    category: 'interior-painting' as const,
  },
  {
    question: 'How long does cabinet refinishing take?',
    answer: 'Most cabinet refinishing projects take 3-5 days, depending on the number of cabinets and complexity. We work efficiently to minimize disruption to your kitchen use. We\'ll provide a detailed timeline during your estimate.',
    category: 'interior-painting' as const,
  },
  {
    question: 'Will the finish last, or will I need to refinish again soon?',
    answer: 'With proper preparation and high-quality finishes, cabinet refinishing can last 10-15 years or more. The key is proper surface preparation, quality materials, and expert application—all of which we provide. We use durable finishes specifically designed for high-traffic kitchen use.',
    category: 'interior-painting' as const,
  },
]

export default function CabinetRefinishingPage() {
  const faqSchema = cabinetFAQs.length > 0 ? generateFAQPageSchema(cabinetFAQs) : null
  const serviceSchema = generateServiceSchema(
    'Cabinet Painting & Refinishing Services',
    'Professional kitchen cabinet refinishing and painting. Cost-effective alternative to replacement with durable finishes and expert application.'
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Painting Services', url: '/services/painting' },
    { name: 'Cabinet Refinishing', url: '/services/painting/cabinet-refinishing' },
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
              Cabinet Painting & Refinishing in Eugene, Albany, Corvallis & Springfield, OR
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Transform your kitchen with professional cabinet refinishing—a cost-effective alternative to replacement. Durable finishes that stand up to daily use.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              From degreasing and sanding to expert paint application, we deliver beautiful results that last 10-15 years or more.
            </p>
            <HousecallProButton variant="large">Get Free Estimate</HousecallProButton>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">Why Choose Cabinet Refinishing?</h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4 text-lg text-slate-700">
              Cabinet replacement can cost $15,000-$30,000 or more, plus weeks of kitchen disruption. Cabinet refinishing offers a cost-effective alternative that transforms your kitchen for a fraction of the cost—typically $3,000-$8,000.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              At Resurface-It, Inc, we specialize in cabinet refinishing that delivers professional results. We use high-quality finishes specifically designed for cabinets, including Italian multi-component polyurethane for maximum durability. Proper preparation ensures the finish adheres properly and lasts for years.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              Our process includes thorough degreasing, sanding, priming, and multiple coats of durable paint or stain. We protect surrounding areas, remove and reinstall hardware, and ensure a flawless finish. Every project is backed by our 5-year workmanship warranty.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl">Our Cabinet Refinishing Process</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Preparation & Degreasing',
                description: 'We thoroughly degrease all cabinet surfaces to remove cooking oils, grease, and grime. This is critical for proper paint adhesion. We remove hardware and protect surrounding areas.',
              },
              {
                title: 'Sanding & Surface Prep',
                description: 'We sand all surfaces to create a smooth, uniform base for paint. We fill any holes or imperfections and ensure surfaces are ready for primer application.',
              },
              {
                title: 'Priming',
                description: 'We apply high-quality primer to ensure proper paint adhesion and coverage. Primer is especially important for previously stained or painted cabinets.',
              },
              {
                title: 'Paint Application',
                description: 'We apply multiple coats of durable cabinet paint or stain using professional techniques. We use finishes specifically designed for high-traffic kitchen use.',
              },
              {
                title: 'Protective Topcoat',
                description: 'We apply a protective topcoat, such as Italian multi-component polyurethane, for maximum durability. This protects the finish from daily wear, cleaning, and moisture.',
              },
              {
                title: 'Reinstallation & Final Touches',
                description: 'We reinstall hardware, make any final adjustments, and conduct a thorough inspection. We clean up completely and ensure everything meets our high standards.',
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
          <h2 className="mb-6 text-center text-3xl">Benefits of Cabinet Refinishing</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Cost-effective alternative to replacement (typically 70-80% less)',
              'Minimal kitchen disruption (3-5 days vs. weeks)',
              'Durable finishes that last 10-15 years',
              'Custom color matching to your vision',
              'Professional results with expert application',
              '5-year workmanship warranty included',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <span className="text-lg text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {cabinetFAQs.length > 0 && (
        <Section className="bg-white">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions</h2>
            <FAQAccordion faqs={cabinetFAQs} />
          </div>
        </Section>
      )}

      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl">Related Services</h2>
          <p className="mb-6 text-lg text-slate-600">
            We also offer related interior painting services:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services/interior-painting" className="text-primary font-semibold hover:underline">
              Interior Painting →
            </Link>
            <Link href="/services/painting" className="text-primary font-semibold hover:underline">
              All Painting Services →
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Kitchen?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for cabinet refinishing.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}

