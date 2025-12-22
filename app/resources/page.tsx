import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateBreadcrumbSchema } from '@/lib/jsonld'
import { resources } from '@/data/resources'
import Link from 'next/link'
import type { Metadata } from 'next'
import { BookOpen, DollarSign, Wrench, Home } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'Home Exterior Resources & Guides | Resurface-It, Inc',
  description: 'Expert guides on siding, roofing, and painting for Oregon homes. Cost guides, material comparisons, maintenance tips, and restoration advice.',
  path: '/resources',
})

const categoryIcons = {
  'cost-guide': DollarSign,
  'material-comparison': Home,
  'maintenance': Wrench,
  'restoration': BookOpen,
}

const categoryLabels = {
  'cost-guide': 'Cost Guides',
  'material-comparison': 'Material Comparisons',
  'maintenance': 'Maintenance Tips',
  'restoration': 'Restoration Guides',
}

export default function ResourcesHubPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
  ])

  const resourcesByCategory = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = []
    }
    acc[resource.category].push(resource)
    return acc
  }, {} as Record<string, typeof resources>)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <section className="bg-gradient-to-br from-primary/5 to-surface pt-32 pb-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6">
              Home Exterior Resources & Guides
            </h1>
            <p className="mb-4 text-xl text-slate-600">
              Expert guides on siding, roofing, and painting for Oregon homes. Learn about materials, costs, maintenance, and restoration.
            </p>
            <p className="mb-8 text-lg text-slate-600">
              Our resource library helps you make informed decisions about protecting and beautifying your home.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          {Object.entries(resourcesByCategory).map(([category, categoryResources]) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons]
            return (
              <div key={category} className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  {Icon && <Icon className="h-6 w-6 text-primary" />}
                  <h2 className="text-3xl font-bold">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {categoryResources.map((resource) => (
                    <Link
                      key={resource.slug}
                      href={`/resources/${resource.slug}`}
                      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
                    >
                      <h3 className="mb-3 text-xl font-bold text-slate-900">
                        {resource.title}
                      </h3>
                      <p className="mb-4 text-slate-700">{resource.description}</p>
                      <span className="font-semibold text-primary hover:underline">
                        Read More →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl">Need Help Choosing?</h2>
          <p className="mb-6 text-lg text-slate-600">
            Our expert team can help you choose the right materials and services for your home.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-primary px-8 py-4 font-semibold text-white transition-colors hover:bg-primaryDark"
          >
            Get Free Consultation
          </Link>
        </div>
      </Section>
    </>
  )
}

