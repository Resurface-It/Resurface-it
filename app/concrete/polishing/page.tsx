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
  title: 'Concrete Polishing in Eugene, Albany, Corvallis & Springfield OR',
  description:
    'Professional concrete polishing services in Eugene, Albany, Corvallis & Springfield, OR. Polished concrete floors with various sheen levels. Low-maintenance, modern finishes. 5-year warranty.',
  path: '/concrete/polishing',
})

const polishingFAQs = [
  {
    question: 'What is polished concrete, and how does it differ from regular concrete?',
    answer: 'Polished concrete is a process of grinding and polishing existing concrete to create a smooth, glossy finish. It enhances the natural beauty of concrete while providing a durable, low-maintenance surface. Unlike regular concrete, polished concrete has a refined appearance and is easier to clean and maintain.',
    category: 'concrete' as const,
  },
  {
    question: 'What sheen levels are available for polished concrete?',
    answer: 'We offer various sheen levels from matte to high-gloss. The sheen level depends on the number of polishing passes and the grit used. We help you choose the right level based on your aesthetic preferences, maintenance needs, and use case. Higher sheen provides more shine but may show scratches more easily.',
    category: 'concrete' as const,
  },
  {
    question: 'Can polished concrete be used in residential homes?',
    answer: 'Yes, polished concrete is increasingly popular in modern residential homes. It provides a sleek, contemporary look that works well in living areas, kitchens, and basements. It\'s durable, easy to maintain, and can be customized with stains or decorative elements.',
    category: 'concrete' as const,
  },
  {
    question: 'How do you protect polished concrete from stains?',
    answer: 'We apply penetrating sealers and densifiers during the polishing process to protect against stains and moisture. The polishing process itself creates a denser surface that resists staining. Regular maintenance with appropriate cleaners helps maintain the protective barrier.',
    category: 'concrete' as const,
  },
  {
    question: 'What maintenance does polished concrete require?',
    answer: 'Polished concrete is low-maintenance. Regular sweeping and occasional mopping with a pH-neutral cleaner keeps it looking great. Avoid harsh chemicals that could damage the finish. Periodic re-polishing may be needed after several years of heavy use, but the surface remains durable with proper care.',
    category: 'concrete' as const,
  },
  {
    question: 'Can you polish existing concrete, or does it need to be new?',
    answer: 'We can polish both new and existing concrete, though the condition of existing concrete affects the final result. We assess the concrete condition, repair any damage, and determine the best approach. Existing concrete may require more preparation work before polishing.',
    category: 'concrete' as const,
  },
  {
    question: 'Is polished concrete suitable for commercial spaces?',
    answer: 'Yes, polished concrete is excellent for commercial spaces like retail stores, offices, and showrooms. It provides a professional appearance, withstands heavy foot traffic, and is easy to maintain. It\'s a cost-effective flooring option for commercial applications.',
    category: 'concrete' as const,
  },
  {
    question: 'Can polished concrete be colored or stained?',
    answer: 'Yes, we can apply stains or dyes to polished concrete to achieve custom colors. This allows for unique designs and color schemes while maintaining the polished finish. We discuss color options during the consultation process.',
    category: 'concrete' as const,
  },
]

export default function ConcretePolishingPage() {
  const serviceSchema = generateServiceSchema(
    'Concrete Polishing',
    'Professional concrete polishing services for interior floors. Modern, low-maintenance polished concrete finishes with various sheen levels and stain protection. Suitable for residential and commercial spaces.'
  )
  const faqSchema = polishingFAQs.length > 0 ? generateFAQPageSchema(polishingFAQs) : null
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Concrete Services', url: '/concrete' },
    { name: 'Concrete Polishing', url: '/concrete/polishing' },
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
              Concrete Polishing in Eugene, Albany, Corvallis & Springfield, OR
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Transform your concrete floors with professional polishing services. Create modern, low-maintenance surfaces with various sheen levels and stain protection.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              Sleek finishes for residential and commercial spaces. Every project backed by our 5-year workmanship warranty.
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
              'Comprehensive floor assessment and condition evaluation',
              'Surface preparation, cleaning, and repair as needed',
              'Grinding and polishing with progressively finer grits',
              'Custom sheen level selection (matte to high-gloss)',
              'Stain protection with penetrating sealers and densifiers',
              'Optional color staining or dye application',
              'Edge polishing for complete coverage',
              'Final burnishing for desired sheen level',
              'Care instructions and maintenance recommendations',
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
              { title: 'Interior Floors', description: 'Modern, sleek polished concrete floors for living areas, kitchens, and basements in residential homes.' },
              { title: 'Retail Spaces', description: 'Professional, low-maintenance floors for retail stores, showrooms, and commercial spaces.' },
              { title: 'Modern Homes', description: 'Contemporary flooring option that complements modern architectural styles and design aesthetics.' },
              { title: 'Offices', description: 'Durable, easy-to-maintain floors for office spaces that withstand heavy foot traffic.' },
              { title: 'Basements', description: 'Transform basement floors into attractive, functional spaces with polished concrete finishes.' },
              { title: 'New Construction', description: 'Polished concrete for new builds provides a cost-effective, durable flooring solution.' },
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
                description: 'We inspect your concrete floor, assess its condition, and discuss your aesthetic preferences. We evaluate whether the concrete is suitable for polishing and identify any repairs needed.',
              },
              {
                title: 'Prep & Cleaning',
                description: 'We prepare the surface by cleaning thoroughly, removing any coatings or sealers, and making necessary repairs. Proper preparation ensures a uniform, high-quality polished finish.',
              },
              {
                title: 'Repairs',
                description: 'We repair cracks, fill holes, and level any uneven areas. The polishing process works best on smooth, uniform surfaces, so repairs are essential for quality results.',
              },
              {
                title: 'Grinding & Polishing',
                description: 'We grind the concrete with progressively finer grits, then polish to achieve the desired sheen level. We apply densifiers and sealers during the process to protect the surface.',
              },
              {
                title: 'Final Walkthrough & Care Instructions',
                description: 'We walk through the completed project, explain the finish characteristics, and provide detailed care instructions. We ensure you understand how to maintain your polished concrete floor.',
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
                description: 'We never skip preparation. Proper cleaning, repair, and surface readiness ensure a uniform, high-quality polished finish that lasts.',
              },
              {
                title: 'Built for Oregon Weather',
                description: 'While polished concrete is primarily for interior use, we ensure proper sealing and protection for Oregon\'s humidity levels and indoor conditions.',
              },
              {
                title: 'Clear Communication',
                description: 'We explain the polishing process, sheen options, and maintenance requirements clearly. You know what to expect and how to care for your polished floor.',
              },
              {
                title: 'Clean Jobsite',
                description: 'We protect your property and clean up thoroughly. Polishing can create dust, so we use proper containment and cleanup procedures.',
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

      {polishingFAQs.length > 0 && (
        <Section>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions</h2>
            <div className="mx-auto max-w-3xl">
              <FAQAccordion faqs={polishingFAQs} />
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
                slug: 'sealing',
                name: 'Concrete Sealing',
                description: 'Protective sealing for driveways, patios, and exterior concrete. Prevents water intrusion, staining, and freeze-thaw damage.',
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
          <h2 className="mb-4 text-3xl font-bold">Ready to Polish Your Concrete?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for concrete polishing. We&apos;ll assess your floor and discuss sheen options.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}
