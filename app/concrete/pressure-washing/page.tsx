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
  title: 'Concrete Pressure Washing in Eugene, Albany, Corvallis & Springfield OR',
  description:
    'Professional concrete pressure washing services in Eugene, Albany, Corvallis & Springfield, OR. Remove algae, moss, grime & tire marks. Prep for sealing/coatings. Safe, effective cleaning. 5-year warranty.',
  path: '/concrete/pressure-washing',
})

const pressureWashingFAQs = [
  {
    question: 'What surfaces can you pressure wash?',
    answer: 'We pressure wash driveways, patios, walkways, sidewalks, pool decks, and other exterior concrete surfaces. We use appropriate pressure levels and techniques for each surface type to ensure effective cleaning without damage.',
    category: 'concrete' as const,
  },
  {
    question: 'Can pressure washing remove oil stains and tire marks?',
    answer: 'Yes, pressure washing can remove many oil stains and tire marks, especially when combined with appropriate cleaning solutions. Stubborn stains may require additional treatment or multiple cleaning passes. We assess stains during estimates and discuss expectations.',
    category: 'concrete' as const,
  },
  {
    question: 'How do you remove algae and moss from concrete?',
    answer: 'We use appropriate cleaning solutions and pressure washing techniques to remove algae and moss. Pre-treatment with cleaning agents helps break down organic growth before pressure washing. We ensure thorough removal to prevent regrowth.',
    category: 'concrete' as const,
  },
  {
    question: 'Is pressure washing safe for all concrete surfaces?',
    answer: 'We use appropriate pressure levels for each surface type. Older or damaged concrete may require gentler pressure to avoid further damage. We assess surface condition before cleaning and adjust our approach accordingly. Safety and surface protection are priorities.',
    category: 'concrete' as const,
  },
  {
    question: 'Do you use cleaning solutions, or just water?',
    answer: 'We use appropriate cleaning solutions when needed to break down dirt, algae, moss, and stains. Solutions are applied before pressure washing to make cleaning more effective. We use eco-friendly options when possible and ensure proper rinsing.',
    category: 'concrete' as const,
  },
  {
    question: 'Can pressure washing prepare concrete for sealing or coating?',
    answer: 'Yes, pressure washing is an essential first step before sealing or coating. It removes all dirt, debris, and contaminants that could prevent proper adhesion. We coordinate pressure washing with sealing or coating services when needed.',
    category: 'concrete' as const,
  },
  {
    question: 'How often should concrete be pressure washed?',
    answer: 'Frequency depends on use, weather exposure, and appearance goals. Annual pressure washing helps maintain appearance and prepares surfaces for resealing. We can discuss a maintenance schedule based on your specific needs and conditions.',
    category: 'concrete' as const,
  },
  {
    question: 'What safety measures do you take during pressure washing?',
    answer: 'We use appropriate pressure levels, protect landscaping and nearby surfaces, and ensure proper runoff management. We wear protective equipment and follow safety protocols. We discuss any specific concerns or requirements during estimates.',
    category: 'concrete' as const,
  },
]

export default function ConcretePressureWashingPage() {
  const serviceSchema = generateServiceSchema(
    'Concrete Pressure Washing',
    'Professional concrete pressure washing services to remove algae, moss, grime, and tire marks. Prepares surfaces for sealing or coating applications. Safe, effective cleaning for driveways, patios, and exterior concrete.'
  )
  const faqSchema = pressureWashingFAQs.length > 0 ? generateFAQPageSchema(pressureWashingFAQs) : null
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Concrete Services', url: '/concrete' },
    { name: 'Concrete Pressure Washing', url: '/concrete/pressure-washing' },
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
              Concrete Pressure Washing in Eugene, Albany, Corvallis & Springfield, OR
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Restore your concrete surfaces with professional pressure washing services. Remove algae, moss, grime, and tire marks to reveal clean, like-new concrete.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              Essential preparation for sealing or coating applications. Safe, effective cleaning backed by our 5-year workmanship warranty.
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
              'Pre-treatment with appropriate cleaning solutions',
              'Pressure washing with adjustable pressure levels',
              'Removal of algae, moss, and organic growth',
              'Stain removal (oil, tire marks, grime)',
              'Thorough rinsing to remove all cleaning solutions',
              'Protection of landscaping and nearby surfaces',
              'Proper runoff management and cleanup',
              'Preparation for sealing or coating if desired',
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
              { title: 'Driveways', description: 'Remove oil stains, tire marks, and accumulated grime from driveways to restore appearance.' },
              { title: 'Patios', description: 'Clean patios to remove algae, moss, and dirt buildup from Oregon weather exposure.' },
              { title: 'Sidewalks', description: 'Pressure wash sidewalks to remove algae, moss, and improve safety and appearance.' },
              { title: 'Exterior Concrete', description: 'Clean all exterior concrete surfaces to prepare for sealing or restore appearance.' },
              { title: 'Pool Decks', description: 'Remove algae, moss, and grime from pool deck areas to maintain safety and appearance.' },
              { title: 'Pre-Coating Prep', description: 'Essential cleaning step before applying concrete sealers or coatings for proper adhesion.' },
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
                description: 'We inspect your concrete surfaces, identify cleaning needs, and assess surface condition. We determine appropriate pressure levels and cleaning solutions needed for effective, safe cleaning.',
              },
              {
                title: 'Prep & Protection',
                description: 'We protect landscaping, windows, and nearby surfaces from cleaning solutions and water. We move or cover items as needed to prevent damage during the cleaning process.',
              },
              {
                title: 'Pre-Treatment',
                description: 'We apply appropriate cleaning solutions to break down dirt, algae, moss, and stains. Pre-treatment makes pressure washing more effective and reduces the pressure needed, protecting the concrete surface.',
              },
              {
                title: 'Pressure Washing',
                description: 'We use professional-grade equipment with adjustable pressure settings. We clean each surface with appropriate pressure—ensuring effective cleaning without damage. We work systematically for complete coverage.',
              },
              {
                title: 'Final Rinsing & Cleanup',
                description: 'We thoroughly rinse all surfaces to remove cleaning solutions and debris. We ensure no residue is left behind and everything is clean. We discuss next steps if sealing or coating is planned.',
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
                description: 'We never skip preparation. Proper pre-treatment and surface assessment ensure effective, safe cleaning. It\'s essential for quality results and surface protection.',
              },
              {
                title: 'Built for Oregon Weather',
                description: 'We understand Oregon\'s algae, moss, and moisture challenges. Our cleaning approach addresses the specific conditions that affect concrete here.',
              },
              {
                title: 'Clear Communication',
                description: 'We explain the cleaning process, what to expect, and any limitations. You know what results are achievable and how to maintain clean surfaces.',
              },
              {
                title: 'Clean Jobsite',
                description: 'We protect your property, manage runoff properly, and clean up thoroughly. Your space is left clean and ready, with no mess or damage.',
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

      {pressureWashingFAQs.length > 0 && (
        <Section>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions</h2>
            <div className="mx-auto max-w-3xl">
              <FAQAccordion faqs={pressureWashingFAQs} />
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
                slug: 'sealing',
                name: 'Concrete Sealing',
                description: 'Protective sealing for driveways, patios, and exterior concrete. Prevents water intrusion, staining, and freeze-thaw damage.',
              },
              {
                slug: 'resurfacing',
                name: 'Concrete Resurfacing',
                description: 'Overlay systems to smooth worn slabs and restore appearance. Texture options and durable finishes for driveways, patios, and pool decks.',
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
          <h2 className="mb-4 text-3xl font-bold">Ready to Clean Your Concrete?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for concrete pressure washing. We&apos;ll assess your surfaces and provide a detailed quote.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}
