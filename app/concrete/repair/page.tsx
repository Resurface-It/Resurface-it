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
  title: 'Concrete Repair in Eugene, Albany, Corvallis & Springfield OR',
  description:
    'Professional concrete repair services in Eugene, Albany, Corvallis & Springfield, OR. Crack repair, spalling fixes, trip hazard removal. Expert assessment & durable solutions. 5-year warranty.',
  path: '/concrete/repair',
})

const repairFAQs = [
  {
    question: 'What types of concrete damage can you repair?',
    answer: 'We repair cracks (hairline to wide), spalling (surface flaking), trip hazards, holes, and surface deterioration. We assess the underlying cause—whether it\'s freeze-thaw damage, settling, or wear—and provide solutions that address both the symptom and the root cause when possible.',
    category: 'concrete' as const,
  },
  {
    question: 'How do you determine if concrete can be repaired or needs replacement?',
    answer: 'We assess the extent of damage, structural integrity, and underlying causes. Small to moderate cracks and surface damage can often be repaired. However, if the concrete is severely deteriorated, the foundation is compromised, or there\'s extensive structural damage, replacement may be necessary. We provide honest assessments and recommendations.',
    category: 'concrete' as const,
  },
  {
    question: 'Why is proper preparation important for concrete repair?',
    answer: 'Prep is non-negotiable. We clean out cracks, remove loose material, and ensure proper adhesion surfaces. Without proper prep, repairs won\'t bond correctly and will fail prematurely. We never skip preparation steps—it\'s the foundation of a lasting repair.',
    category: 'concrete' as const,
  },
  {
    question: 'Can you fix trip hazards in concrete?',
    answer: 'Yes, we repair trip hazards by grinding down raised edges or filling in depressions. We ensure the repaired surface is level and safe, matching the surrounding concrete as closely as possible. Safety is a priority in all our repair work.',
    category: 'concrete' as const,
  },
  {
    question: 'How long do concrete repairs last?',
    answer: 'With proper preparation and quality materials, concrete repairs can last many years. The longevity depends on the type of repair, underlying causes, and ongoing maintenance. We use durable repair materials and techniques designed to withstand Oregon\'s weather conditions.',
    category: 'concrete' as const,
  },
  {
    question: 'Do you repair concrete in winter, or do I need to wait for warmer weather?',
    answer: 'We can assess and plan repairs year-round, but some repair work is best done in dry, moderate temperatures. We schedule work around Oregon\'s weather patterns and use materials appropriate for the conditions. We\'ll discuss timing during your estimate.',
    category: 'concrete' as const,
  },
  {
    question: 'What causes concrete to crack and spall in Oregon?',
    answer: 'Oregon\'s freeze-thaw cycles, heavy winter rains, and water intrusion are common causes. Water seeps into cracks, freezes, and expands, causing further damage. Poor drainage, settling foundations, and age also contribute. We address these issues in our repair approach.',
    category: 'concrete' as const,
  },
  {
    question: 'Can repaired concrete be sealed or coated afterward?',
    answer: 'Yes, once repairs are complete and fully cured, the concrete can be sealed or coated. In fact, sealing or coating after repair helps protect the repaired areas and prevent future damage. We can coordinate repair with sealing or coating services.',
    category: 'concrete' as const,
  },
]

export default function ConcreteRepairPage() {
  const serviceSchema = generateServiceSchema(
    'Concrete Repair',
    'Professional concrete repair services including crack repair, spalling fixes, trip hazard removal, and surface restoration. Expert assessment and durable solutions for Oregon concrete.'
  )
  const faqSchema = repairFAQs.length > 0 ? generateFAQPageSchema(repairFAQs) : null
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Concrete Services', url: '/concrete' },
    { name: 'Concrete Repair', url: '/concrete/repair' },
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
              Concrete Repair in Eugene, Albany, Corvallis & Springfield, OR
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Restore your concrete surfaces with expert repair services. We fix cracks, spalling, trip hazards, and surface damage using durable materials and proper preparation techniques.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              Honest assessments. Quality repairs. Every project backed by our 5-year workmanship warranty.
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
              'Comprehensive damage assessment and root cause analysis',
              'Crack repair using appropriate fillers and sealants',
              'Spalling repair to restore smooth surfaces',
              'Trip hazard removal and leveling',
              'Hole and void filling with durable materials',
              'Surface preparation and cleaning',
              'Structural evaluation when needed',
              'Coordination with sealing or coating if desired',
              'Final inspection and care recommendations',
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
              { title: 'Driveways', description: 'Repair cracks, spalling, and trip hazards in driveways to restore appearance and safety.' },
              { title: 'Patios', description: 'Fix surface damage and cracks in patios to extend their lifespan and improve appearance.' },
              { title: 'Walkways', description: 'Remove trip hazards and repair cracks in walkways for safety and curb appeal.' },
              { title: 'Steps', description: 'Repair damaged steps and remove trip hazards to ensure safe access.' },
              { title: 'Garage Floors', description: 'Fix cracks and surface damage in garage floors before applying coatings.' },
              { title: 'Pool Decks', description: 'Repair spalling and cracks in pool deck areas to maintain safety and appearance.' },
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
                description: 'We inspect the concrete damage, assess the extent and underlying causes, and evaluate structural integrity. We determine whether repair is feasible or if replacement is necessary, providing honest recommendations.',
              },
              {
                title: 'Prep & Cleaning',
                description: 'We clean out cracks, remove loose material, and prepare surfaces for repair. Proper preparation is non-negotiable—it ensures repair materials bond correctly and last. We never skip prep steps.',
              },
              {
                title: 'Repairs',
                description: 'We perform the necessary repairs using appropriate materials—crack fillers, patching compounds, or leveling materials. We match the repair to the specific type of damage and ensure proper adhesion.',
              },
              {
                title: 'Finishing',
                description: 'We finish repaired areas to match surrounding concrete as closely as possible. We ensure surfaces are level, smooth, and safe, with no trip hazards or rough edges.',
              },
              {
                title: 'Final Walkthrough & Care Instructions',
                description: 'We walk through the completed repairs with you, explain the curing process, and provide care instructions. We discuss whether sealing or coating is recommended to protect repaired areas.',
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
                description: 'We never skip preparation. Proper cleaning, crack preparation, and surface readiness ensure repairs bond correctly and last. It\'s the foundation of quality repair work.',
              },
              {
                title: 'Built for Oregon Weather',
                description: 'We use repair materials and techniques designed for Oregon\'s freeze-thaw cycles and wet conditions. Our repairs are built to withstand the weather that caused the damage.',
              },
              {
                title: 'Clear Communication',
                description: 'We explain what can and can\'t be repaired, why, and what to expect. Honest assessments help you make informed decisions about your concrete surfaces.',
              },
              {
                title: 'Clean Jobsite',
                description: 'We protect your property and clean up thoroughly. Repairs are completed with minimal disruption, and your space is left clean and safe.',
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

      {repairFAQs.length > 0 && (
        <Section>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions</h2>
            <div className="mx-auto max-w-3xl">
              <FAQAccordion faqs={repairFAQs} />
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
                slug: 'sealing',
                name: 'Concrete Sealing',
                description: 'Protective sealing for driveways, patios, and exterior concrete. Prevents water intrusion, staining, and freeze-thaw damage.',
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
          <h2 className="mb-4 text-3xl font-bold">Ready to Repair Your Concrete?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for concrete repair. We&apos;ll assess the damage and provide honest recommendations.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}
