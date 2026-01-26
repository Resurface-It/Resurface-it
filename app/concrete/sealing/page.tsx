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
  title: 'Concrete Sealing in Eugene, Albany, Corvallis & Springfield OR',
  description:
    'Professional concrete sealing services in Eugene, Albany, Corvallis & Springfield, OR. Penetrating & topical sealers. Prevents water intrusion, staining & freeze-thaw damage. 5-year warranty.',
  path: '/concrete/sealing',
})

const sealingFAQs = [
  {
    question: 'What is the difference between penetrating and topical concrete sealers?',
    answer: 'Penetrating sealers soak into the concrete, protecting from within and allowing the concrete to breathe. Topical sealers create a protective film on the surface. We help you choose the right type based on your concrete condition, location, and needs. Both protect against water intrusion and staining.',
    category: 'concrete' as const,
  },
  {
    question: 'Why is concrete sealing important in Oregon?',
    answer: 'Oregon\'s heavy winter rains, freeze-thaw cycles, and high humidity can cause water to penetrate concrete, leading to cracking, spalling, and deterioration. Sealing creates a barrier that prevents water intrusion, protecting your concrete from damage and extending its lifespan.',
    category: 'concrete' as const,
  },
  {
    question: 'How often should concrete be resealed?',
    answer: 'Resealing frequency depends on the sealer type, traffic, and weather exposure. Penetrating sealers typically last 3-5 years, while topical sealers may need resealing every 1-3 years. We assess your sealed concrete during estimates and recommend resealing when needed.',
    category: 'concrete' as const,
  },
  {
    question: 'Can you seal concrete that has already been sealed?',
    answer: 'Yes, but old sealers must be properly removed or prepared first. We assess the existing sealer condition and determine the best approach—whether to remove it completely or prepare it for a new sealer application. Proper preparation ensures the new sealer adheres correctly.',
    category: 'concrete' as const,
  },
  {
    question: 'Does concrete sealing prevent all staining?',
    answer: 'Sealing significantly reduces staining by creating a barrier, but it doesn\'t make concrete completely stain-proof. Prompt cleanup of spills is still recommended. The level of stain protection depends on the sealer type and application quality. We discuss expectations during consultation.',
    category: 'concrete' as const,
  },
  {
    question: 'Can sealed concrete be pressure washed?',
    answer: 'Yes, sealed concrete can be pressure washed, but we use appropriate pressure levels and techniques to avoid damaging the sealer. Regular cleaning helps maintain the sealer\'s effectiveness. We can coordinate sealing with pressure washing services.',
    category: 'concrete' as const,
  },
  {
    question: 'What happens if water gets under sealed concrete?',
    answer: 'Proper sealing prevents water intrusion, but if water does get underneath (often due to poor drainage or foundation issues), it can cause problems. We assess drainage and address underlying issues before sealing. Sealing works best when combined with proper site drainage.',
    category: 'concrete' as const,
  },
  {
    question: 'Is concrete sealing necessary before applying coatings?',
    answer: 'No, sealing is typically not done before coatings. Coatings create their own protective layer. However, we ensure the concrete is properly prepared and dry before applying coatings. Sealing and coatings serve different purposes—we help you choose the right solution.',
    category: 'concrete' as const,
  },
]

export default function ConcreteSealingPage() {
  const serviceSchema = generateServiceSchema(
    'Concrete Sealing',
    'Professional concrete sealing services using penetrating and topical sealers. Protects driveways, patios, and exterior concrete from water intrusion, staining, and freeze-thaw damage in Oregon.'
  )
  const faqSchema = sealingFAQs.length > 0 ? generateFAQPageSchema(sealingFAQs) : null
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Concrete Services', url: '/concrete' },
    { name: 'Concrete Sealing', url: '/concrete/sealing' },
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
              Concrete Sealing in Eugene, Albany, Corvallis & Springfield, OR
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Protect your concrete surfaces with professional sealing services. Penetrating and topical sealers prevent water intrusion, staining, and freeze-thaw damage in Oregon&apos;s challenging climate.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              Essential protection for driveways, patios, and exterior concrete. Every project backed by our 5-year workmanship warranty.
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
              'Comprehensive surface assessment and condition evaluation',
              'Thorough cleaning and preparation of concrete surfaces',
              'Selection of appropriate sealer type (penetrating or topical)',
              'Application of penetrating or topical sealer',
              'Protection against water intrusion and moisture damage',
              'Stain resistance enhancement',
              'Freeze-thaw protection for Oregon winters',
              'Proper curing and protection during application',
              'Care instructions and resealing recommendations',
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
              { title: 'Driveways', description: 'Protect driveways from water intrusion, oil stains, and freeze-thaw damage with professional sealing.' },
              { title: 'Patios', description: 'Seal patios to prevent water damage, staining, and deterioration from Oregon weather exposure.' },
              { title: 'Garage Floors', description: 'Seal garage floors to protect against moisture, oil, and chemical spills before applying coatings.' },
              { title: 'Exterior Concrete', description: 'Protect all exterior concrete surfaces from Oregon\'s rain, freeze-thaw cycles, and weather damage.' },
              { title: 'Walkways', description: 'Seal walkways to maintain appearance and prevent water damage and deterioration.' },
              { title: 'Pool Decks', description: 'Seal pool deck areas to protect against water, chemicals, and heavy use.' },
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
                description: 'We inspect your concrete surfaces, assess their condition, and evaluate drainage and moisture issues. We determine whether penetrating or topical sealer is appropriate and identify any repairs needed before sealing.',
              },
              {
                title: 'Prep & Cleaning',
                description: 'We thoroughly clean the concrete surface, removing dirt, oil, and existing sealers if needed. Proper preparation is non-negotiable—it ensures the sealer adheres correctly and provides effective protection.',
              },
              {
                title: 'Repairs',
                description: 'We repair cracks and surface damage before sealing. Sealing works best on sound concrete, so we address any issues that could compromise the sealer\'s effectiveness.',
              },
              {
                title: 'Application',
                description: 'We apply the selected sealer using appropriate techniques—penetrating sealers are absorbed into the concrete, while topical sealers create a protective film. We ensure even coverage and proper curing conditions.',
              },
              {
                title: 'Final Walkthrough & Care Instructions',
                description: 'We walk through the completed sealing work, explain the curing process, and provide care instructions. We discuss resealing timing and maintenance to keep your concrete protected long-term.',
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
                description: 'We never skip preparation. Proper cleaning and surface readiness ensure sealer adhesion and effectiveness. It\'s essential for long-lasting protection.',
              },
              {
                title: 'Built for Oregon Weather',
                description: 'We use sealers specifically chosen for Oregon\'s wet winters, freeze-thaw cycles, and humidity. Our sealing approach addresses the weather challenges that damage concrete here.',
              },
              {
                title: 'Clear Communication',
                description: 'We explain sealer types, application processes, and maintenance requirements clearly. You understand what protection you\'re getting and how to maintain it.',
              },
              {
                title: 'Clean Jobsite',
                description: 'We protect your property and clean up thoroughly. Sealing work is completed with minimal disruption, and your space is left clean and protected.',
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

      {sealingFAQs.length > 0 && (
        <Section>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions</h2>
            <div className="mx-auto max-w-3xl">
              <FAQAccordion faqs={sealingFAQs} />
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
                slug: 'resurfacing',
                name: 'Concrete Resurfacing',
                description: 'Overlay systems to smooth worn slabs and restore appearance. Texture options and durable finishes for driveways, patios, and pool decks.',
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
                className="card h-full w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
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
          <h2 className="mb-4 text-3xl font-bold">Ready to Protect Your Concrete?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for concrete sealing. We&apos;ll assess your surfaces and recommend the right sealer.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}
