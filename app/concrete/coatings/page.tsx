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
  title: 'Concrete Coatings in Eugene, Albany, Corvallis & Springfield OR',
  description:
    'Professional concrete coatings for garages & shops in Eugene, Albany, Corvallis & Springfield, OR. Epoxy & polyaspartic floor coatings. Chemical-resistant, durable finishes. 5-year warranty.',
  path: '/concrete/coatings',
})

const coatingsFAQs = [
  {
    question: 'What types of concrete coatings do you offer?',
    answer: 'We offer epoxy and polyaspartic concrete coatings for garage and shop floors. Epoxy provides excellent chemical resistance and durability, while polyaspartic offers faster curing times and UV stability. Both create seamless, easy-to-clean surfaces that stand up to heavy use and Oregon weather.',
    category: 'concrete' as const,
  },
  {
    question: 'How long do concrete coatings take to install?',
    answer: 'Most concrete coating projects take 2-4 days, depending on the size of the area and the coating system chosen. This includes surface preparation, repair work, primer application, and the coating itself. Polyaspartic coatings cure faster than epoxy, allowing for quicker project completion.',
    category: 'concrete' as const,
  },
  {
    question: 'Can I choose different colors or patterns for my garage floor coating?',
    answer: 'Yes, we offer a variety of color options and can create custom patterns, including decorative chips, flakes, or solid colors. We help you choose colors that complement your space and provide the durability you need. Color selection is part of our consultation process.',
    category: 'concrete' as const,
  },
  {
    question: 'Are concrete coatings slippery when wet?',
    answer: 'We can add anti-slip additives to concrete coatings to provide traction, especially important in garages and workshops. We discuss your specific needs and recommend the right level of traction based on how you use the space. Safety is a priority in our coating installations.',
    category: 'concrete' as const,
  },
  {
    question: 'How do concrete coatings hold up to chemicals and oil spills?',
    answer: 'Epoxy and polyaspartic coatings are specifically designed to resist chemicals, oil, and stains. They create a seamless, non-porous surface that prevents liquids from penetrating. Spills can be easily wiped up, and the coating protects the underlying concrete from damage. This is especially important in garages and workshops.',
    category: 'concrete' as const,
  },
  {
    question: 'Do concrete coatings work in basements or areas with moisture issues?',
    answer: 'We assess moisture levels before applying coatings. If there are moisture issues, we address them first with proper preparation and moisture barriers. Coatings can work in basements, but proper surface preparation and moisture control are essential for long-lasting results.',
    category: 'concrete' as const,
  },
  {
    question: 'What maintenance do concrete coatings require?',
    answer: 'Concrete coatings are low-maintenance. Regular sweeping and occasional mopping with a mild cleaner keeps them looking great. Avoid harsh chemicals that could damage the finish. With proper care, coatings can last 10-20 years. We provide care instructions after installation.',
    category: 'concrete' as const,
  },
  {
    question: 'Can you apply coatings over existing painted or sealed concrete?',
    answer: 'Yes, but proper preparation is critical. We remove old paint or sealers, repair any damage, and ensure the surface is clean and ready for coating. We never skip prep steps—it\'s essential for coating adhesion and longevity. We assess each surface individually.',
    category: 'concrete' as const,
  },
]

export default function ConcreteCoatingsPage() {
  const serviceSchema = generateServiceSchema(
    'Concrete Coatings',
    'Professional concrete coatings for garages and shop floors. Epoxy and polyaspartic systems that provide chemical resistance, durability, and easy maintenance. Built for Oregon weather.'
  )
  const faqSchema = coatingsFAQs.length > 0 ? generateFAQPageSchema(coatingsFAQs) : null
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Concrete Services', url: '/concrete' },
    { name: 'Concrete Coatings', url: '/concrete/coatings' },
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
              Concrete Coatings in Eugene, Albany, Corvallis & Springfield, OR
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Transform your garage or shop floor with professional concrete coatings. Epoxy and polyaspartic systems provide durable, chemical-resistant surfaces that stand up to heavy use and Oregon weather.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              Seamless, easy-to-clean floors with custom color options and anti-slip protection. Every installation backed by our 5-year workmanship warranty.
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
              'Comprehensive surface assessment and moisture testing',
              'Thorough cleaning, grinding, and surface preparation',
              'Crack repair and surface leveling as needed',
              'Epoxy or polyaspartic coating application with primer',
              'Custom color selection and decorative options (chips, flakes)',
              'Anti-slip additives for safety in garages and workshops',
              'Seamless, non-porous finish that resists chemicals and stains',
              'UV-stable options for areas with natural light',
              'Final walkthrough and care instructions',
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
              { title: 'Garage Floors', description: 'Protect your garage floor from oil, chemicals, and heavy vehicle traffic with durable epoxy or polyaspartic coatings.' },
              { title: 'Workshops & Shops', description: 'Create a professional workspace with chemical-resistant, easy-to-clean floors that stand up to tools and equipment.' },
              { title: 'Basements', description: 'Transform basement floors into functional, attractive spaces with moisture-resistant coating systems.' },
              { title: 'Commercial Floors', description: 'Durable, low-maintenance floors for retail spaces, warehouses, and commercial facilities.' },
              { title: 'Mechanical Rooms', description: 'Protect mechanical room floors from water, chemicals, and heavy equipment with seamless coatings.' },
              { title: 'Interior Concrete', description: 'Enhance interior concrete floors with decorative options and easy maintenance.' },
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
                description: 'We inspect your concrete surface, test for moisture, assess existing conditions, and discuss your goals. We identify any cracks, damage, or issues that need attention before coating application.',
              },
              {
                title: 'Prep & Cleaning',
                description: 'Thorough surface preparation is non-negotiable. We clean, grind, or etch the concrete to create proper adhesion. We remove any existing coatings, paint, or sealers and ensure the surface is completely dry.',
              },
              {
                title: 'Repairs',
                description: 'We repair cracks, fill holes, and level any uneven areas. Proper repair ensures a smooth, uniform surface that will support the coating system for years to come.',
              },
              {
                title: 'Application & Finishing',
                description: 'We apply primer, then the epoxy or polyaspartic coating system. We work in sections to ensure even coverage and proper curing. Custom colors, decorative chips, or anti-slip additives are incorporated as specified.',
              },
              {
                title: 'Final Walkthrough & Care Instructions',
                description: 'We walk through the completed project with you, explain the curing process, and provide detailed care instructions. We ensure you understand how to maintain your new coating for maximum longevity.',
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
                description: 'We never skip surface preparation. Proper cleaning, grinding, and repair ensure coating adhesion and longevity. It\'s the foundation of a durable finish.',
              },
              {
                title: 'Built for Oregon Weather',
                description: 'Our coating systems are chosen for their ability to withstand Oregon\'s wet winters, temperature fluctuations, and humidity. We use materials proven in Pacific Northwest conditions.',
              },
              {
                title: 'Clear Communication',
                description: 'We explain the process, timeline, and care requirements clearly. You know what to expect at every step, from estimate to completion.',
              },
              {
                title: 'Clean Jobsite',
                description: 'We protect your property and clean up daily. Your space is left better than we found it, with minimal disruption to your routine.',
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

      {coatingsFAQs.length > 0 && (
        <Section>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions</h2>
            <div className="mx-auto max-w-3xl">
              <FAQAccordion faqs={coatingsFAQs} />
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
                className="card flex h-full w-full flex-col items-start rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
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
          <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Floor?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for concrete coatings. We&apos;ll assess your space and provide a detailed quote with no pressure.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}
