import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { HousecallProButton } from '@/components/HousecallProButton'
import { FAQAccordion } from '@/components/FAQAccordion'
import { PhoneLink } from '@/components/PhoneLink'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateServiceSchema, generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import { companyInfo } from '@/data/company'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle, Square } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'Concrete Services in Eugene, Albany, Corvallis & Springfield OR',
  description:
    'Professional concrete services in Eugene, Albany, Corvallis & Springfield, OR. Coatings, repair, polishing, sealing, resurfacing & pressure washing. Built for Oregon weather. 5-year warranty.',
  path: '/concrete',
})

const concreteFAQs = [
  {
    question: 'What concrete services do you offer in Oregon?',
    answer: 'We provide comprehensive concrete services including garage and shop floor coatings (epoxy and polyaspartic), concrete repair for cracks and spalling, concrete polishing for interior floors, concrete sealing for protection, concrete resurfacing with overlays, and professional pressure washing. All services are designed to withstand Oregon\'s wet winters and sunny summers.',
    category: 'concrete' as const,
  },
  {
    question: 'How do Oregon weather conditions affect concrete?',
    answer: 'Oregon\'s climate—heavy winter rains, freeze-thaw cycles, and high humidity—can cause concrete to crack, spall, and deteriorate. Water intrusion, especially during freeze-thaw cycles, can expand cracks and cause surface damage. That\'s why proper sealing, repair, and protective coatings are essential for concrete longevity in Oregon.',
    category: 'concrete' as const,
  },
  {
    question: 'What\'s the difference between concrete sealing and concrete coatings?',
    answer: 'Concrete sealing uses penetrating or topical sealers that protect from within or on the surface, preventing water intrusion and staining. Concrete coatings (epoxy, polyaspartic) create a thicker, more durable surface layer that adds chemical resistance, traction, and aesthetic appeal. Coatings are ideal for garages and shops, while sealing works well for driveways and patios.',
    category: 'concrete' as const,
  },
  {
    question: 'How long do concrete coatings last in Oregon?',
    answer: 'With proper preparation and quality materials, concrete coatings can last 10-20 years in Oregon. Epoxy and polyaspartic coatings are specifically designed to withstand heavy use, chemical exposure, and temperature fluctuations. Regular maintenance and proper installation are key to longevity.',
    category: 'concrete' as const,
  },
  {
    question: 'Can you repair cracked concrete, or does it need replacement?',
    answer: 'Many cracked concrete surfaces can be repaired rather than replaced. We assess the extent of damage, underlying causes, and structural integrity. Small to moderate cracks can often be filled and sealed. However, if the concrete is severely deteriorated or the foundation is compromised, replacement may be necessary. We provide honest assessments and recommendations.',
    category: 'concrete' as const,
  },
  {
    question: 'Do you offer concrete services for both residential and commercial properties?',
    answer: 'Yes, we provide concrete services for both residential and commercial properties. Our services include garage floor coatings for homes, polished concrete for retail spaces, pressure washing for commercial driveways, and more. We tailor our approach to each property type and use case.',
    category: 'concrete' as const,
  },
  {
    question: 'What preparation is required before applying concrete coatings?',
    answer: 'Proper preparation is non-negotiable for long-lasting results. We thoroughly clean the surface, repair cracks and damage, grind or etch for adhesion, and ensure the concrete is completely dry. We never skip prep steps—it\'s the foundation of a durable finish that stands up to Oregon\'s weather.',
    category: 'concrete' as const,
  },
  {
    question: 'How quickly can you provide an estimate for concrete work?',
    answer: 'We typically provide detailed, written estimates within 24 hours of your request. We visit your property to assess the concrete condition, discuss your goals, and provide transparent pricing with no hidden fees. Fast, clear communication is part of our commitment to excellent service.',
    category: 'concrete' as const,
  },
]

export default function ConcreteHubPage() {
  const faqSchema = concreteFAQs.length > 0 ? generateFAQPageSchema(concreteFAQs) : null
  const serviceSchema = generateServiceSchema(
    'Concrete Services',
    'Professional concrete services including coatings, repair, polishing, sealing, resurfacing, and pressure washing. Built for Oregon weather with durable finishes and expert craftsmanship.'
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Concrete Services', url: '/concrete' },
  ])

  const concreteServices = [
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
    {
      slug: 'pressure-washing',
      name: 'Concrete Pressure Washing',
      description: 'Professional surface cleaning to remove algae, moss, grime, and tire marks. Prepares surfaces for sealing or coating applications.',
    },
  ]

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
      
      <section className="relative w-full bg-white">
        <div className="container mx-auto max-w-4xl pb-2">
          <div className="flex items-center justify-center w-full">
            <div 
              className="relative w-full overflow-hidden bg-white service-image-container flex items-center justify-center h-[150px] md:h-[200px]"
            >
              <Image
                src="/images/Resurface-ItConcrete.PNG"
                alt="Resurface-It Concrete Services logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center center'
                }}
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gradient-to-br from-primary/5 to-surface pt-8 pb-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6">
              Concrete Services in Eugene, Albany, Corvallis & Springfield, OR
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Protect and enhance your concrete surfaces with our comprehensive concrete services. From garage floor coatings and repair to polishing, sealing, resurfacing, and pressure washing—we provide durable finishes built for Oregon weather.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              Prep is non-negotiable. Clear communication. Clean jobsite. Every project backed by our 5-year workmanship warranty.
            </p>
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <HousecallProButton variant="large">Get Free Concrete Estimate</HousecallProButton>
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
          <h2 className="mb-6 text-3xl">Why Oregon Concrete Needs Expert Care</h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4 text-lg text-slate-700">
              Oregon&apos;s climate is tough on concrete. Heavy winter rains, freeze-thaw cycles, and high humidity can cause cracking, spalling, and deterioration. Water intrusion during freeze-thaw cycles can expand cracks and damage surfaces. That&apos;s why proper preparation, quality materials, and expert application are essential for concrete that lasts.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              At Resurface-It, Inc, we specialize in concrete services specifically designed for Oregon&apos;s weather conditions. We use durable materials, proper preparation techniques, and expert craftsmanship to ensure your concrete surfaces protect your property and enhance its value for years to come.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl">Our Concrete Services for Oregon Properties</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {concreteServices.map((service) => (
              <Link
                key={service.slug}
                href={`/concrete/${service.slug}`}
                className="card flex h-full w-full flex-col items-start rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Square className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold md:text-2xl">{service.name}</h3>
                </div>
                <p className="mb-6 text-slate-600">{service.description}</p>
                <span className="inline-flex items-center text-sm font-semibold text-primary hover:text-primaryDark">
                  View Service Details
                  <span className="ml-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl">Why Choose Our Concrete Services?</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Prep is non-negotiable—thorough cleaning, repair, and surface preparation',
              'Durable finishes built specifically for Oregon weather conditions',
              'Clear communication throughout your project',
              'Clean jobsite—we protect your property and clean up daily',
              '5-year workmanship warranty on all projects',
              'Licensed & insured (CCB #217088)',
              'Fast, transparent estimates often within 24 hours',
              'Expert craftsmanship with attention to detail',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <span className="text-lg text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {concreteFAQs.length > 0 && (
        <Section className="bg-white">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions</h2>
            <FAQAccordion faqs={concreteFAQs} />
          </div>
        </Section>
      )}

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Protect Your Concrete?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for concrete services. We&apos;ll assess your surfaces and provide a detailed quote—no pressure, no obligation.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}
