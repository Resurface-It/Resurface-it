import { Section } from '@/components/Section'
import { HousecallProButton } from '@/components/HousecallProButton'
import { FAQAccordion } from '@/components/FAQAccordion'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateServiceSchema, generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'Dry Rot Repair & Weatherproofing in Eugene, Albany, Corvallis & Springfield, OR',
  description: 'Expert dry rot repair and weatherproofing services. Protect your Oregon home from moisture damage. Structural repairs, flashing, and moisture barriers. 5-year warranty.',
  path: '/services/siding/rot-repair-weatherproofing',
})

const rotRepairFAQs = [
  {
    question: 'How do I know if my home has dry rot?',
    answer: 'Signs of dry rot include soft, spongy wood; discoloration; cracking or splitting; musty odors; and visible fungal growth. If you notice any of these signs, especially around windows, doors, or siding, contact us for an inspection. Early detection prevents costly structural damage.',
    category: 'siding' as const,
  },
  {
    question: 'What causes dry rot in Oregon homes?',
    answer: 'Oregon\'s high humidity and rainfall create ideal conditions for dry rot. Moisture seeps into wood through cracks, gaps, or improper flashing, and fungal growth begins. Poor ventilation, leaking gutters, and damaged siding all contribute. That\'s why proper weatherproofing is essential.',
    category: 'siding' as const,
  },
  {
    question: 'How do you repair dry rot?',
    answer: 'We remove all affected wood, treating the area to eliminate fungal growth. We inspect the underlying structure and make necessary structural repairs. Then we install proper moisture barriers, flashing, and new materials. We ensure proper ventilation to prevent future rot.',
    category: 'siding' as const,
  },
  {
    question: 'Can dry rot spread to other parts of my home?',
    answer: 'Yes, dry rot can spread if not properly addressed. The fungal spores can travel through wood and moisture, affecting adjacent areas. That\'s why it\'s important to address rot immediately and ensure proper repairs prevent moisture intrusion. We inspect surrounding areas during repairs.',
    category: 'siding' as const,
  },
  {
    question: 'What is weatherproofing, and why is it important?',
    answer: 'Weatherproofing involves installing moisture barriers, proper flashing, caulking, and ventilation to prevent water intrusion. In Oregon\'s wet climate, weatherproofing is critical to prevent rot, mold, and structural damage. We ensure all seams, corners, and penetrations are properly sealed.',
    category: 'siding' as const,
  },
  {
    question: 'How long does rot repair take?',
    answer: 'Most rot repair projects take 2-5 days, depending on the extent of damage. We assess the situation during your free estimate and provide a detailed timeline. We work efficiently while ensuring thorough repairs that prevent future problems.',
    category: 'siding' as const,
  },
]

export default function RotRepairPage() {
  const faqSchema = rotRepairFAQs.length > 0 ? generateFAQPageSchema(rotRepairFAQs) : null
  const serviceSchema = generateServiceSchema(
    'Dry Rot Repair & Weatherproofing Services',
    'Expert dry rot repair and weatherproofing to protect Oregon homes from moisture damage. Structural repairs, proper flashing, and moisture barriers included.'
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Siding Services', url: '/services/siding' },
    { name: 'Rot Repair & Weatherproofing', url: '/services/siding/rot-repair-weatherproofing' },
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
              Dry Rot Repair & Weatherproofing in Eugene, Albany, Corvallis & Springfield, OR
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Protect your Oregon home from moisture damage with our expert dry rot repair and weatherproofing services. We identify and repair rot, then install proper protection to prevent future problems.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              From structural repairs to comprehensive weatherproofing, we ensure your home stays protected from Oregon&apos;s challenging climate.
            </p>
            <HousecallProButton variant="large">Get Free Estimate</HousecallProButton>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">Why Oregon Homes Need Rot Repair & Weatherproofing</h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4 text-lg text-slate-700">
              Oregon&apos;s high humidity and heavy rainfall create ideal conditions for dry rot. Moisture seeps into wood through cracks, gaps, or improper flashing, and fungal growth begins. Without proper repairs and weatherproofing, rot can spread and cause significant structural damage.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              At Resurface-It, Inc, we specialize in identifying and repairing dry rot, then installing comprehensive weatherproofing to prevent future problems. We remove all affected wood, make structural repairs, and install proper moisture barriers, flashing, and ventilation.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              Our weatherproofing services ensure your home is protected from Oregon&apos;s wet climate. We seal all seams, corners, and penetrations, install proper flashing around windows and doors, and ensure adequate ventilation. Every repair is backed by our 5-year workmanship warranty.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl">Our Rot Repair & Weatherproofing Services</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Dry rot identification and assessment',
              'Structural wood replacement',
              'Fungal treatment and prevention',
              'Moisture barrier installation',
              'Proper flashing and caulking',
              'Ventilation improvements',
              'Comprehensive weatherproofing',
              'Preventive maintenance programs',
            ].map((service, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <span className="text-lg text-slate-700">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">Our Rot Repair Process</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Inspection & Assessment',
                description: 'We thoroughly inspect your home to identify all areas of rot and moisture intrusion. We check siding, trim, windows, doors, and structural elements. We provide a detailed assessment and repair plan.',
              },
              {
                title: 'Removal & Treatment',
                description: 'We remove all affected wood and treat the area to eliminate fungal growth. We inspect the underlying structure and identify any structural damage that needs repair.',
              },
              {
                title: 'Structural Repairs',
                description: 'We make necessary structural repairs, replacing damaged wood with pressure-treated or rot-resistant materials. We ensure structural integrity before proceeding with weatherproofing.',
              },
              {
                title: 'Weatherproofing Installation',
                description: 'We install proper moisture barriers, flashing, and caulking. We ensure all seams, corners, and penetrations are properly sealed. We improve ventilation where needed to prevent future moisture buildup.',
              },
              {
                title: 'Final Inspection',
                description: 'We conduct a thorough inspection to ensure all repairs are complete and weatherproofing is properly installed. We provide you with maintenance recommendations to prevent future problems.',
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

      {rotRepairFAQs.length > 0 && (
        <Section className="bg-white">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions</h2>
            <FAQAccordion faqs={rotRepairFAQs} />
          </div>
        </Section>
      )}

      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl">Related Services</h2>
          <p className="mb-6 text-lg text-slate-600">
            We also offer related services to protect your home:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services/siding/james-hardie" className="text-primary font-semibold hover:underline">
              James Hardie Siding →
            </Link>
            <Link href="/services/siding/cedar-wood" className="text-primary font-semibold hover:underline">
              Cedar Siding →
            </Link>
            <Link href="/services/siding" className="text-primary font-semibold hover:underline">
              All Siding Services →
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Repair Rot & Weatherproof Your Home?</h2>
          <p className="mb-8 text-lg text-primaryLight">
            Get your free, no-obligation estimate for rot repair and weatherproofing services.
          </p>
          <HousecallProButton variant="large" className="bg-white text-primary hover:bg-slate-100">
            Get Free Estimate
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}

