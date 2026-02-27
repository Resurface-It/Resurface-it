import { Suspense } from 'react'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { HousecallProButton } from '@/components/HousecallProButton'
import { PhoneLink } from '@/components/PhoneLink'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateBreadcrumbSchema } from '@/lib/jsonld'
import { companyInfo } from '@/data/company'
import { CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const PaintStudioContent = dynamic(
  () => import('@/components/PaintStudio/PaintStudioContent'),
  { ssr: false }
)

export const metadata: Metadata = genMeta({
  title: 'Paint Studio — Explore Premium Paint Colors | Resurface-It',
  description:
    'Browse paint colors from Sherwin-Williams, Benjamin Moore, Behr, and PPG. Choose the perfect color for your Oregon home with our Paint Studio. Free color consultation with every estimate.',
  path: '/paint-studio',
})

export default function PaintStudioPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Paint Studio', url: '/paint-studio' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Section className="bg-white py-16">
        <SectionHeader
          title="Paint Studio"
          subtitle="Explore paint colors from premium brands. Select a brand, choose a quality level, and browse available colors for your project."
          align="center"
        />
      </Section>

      <Section className="bg-slate-50 py-16">
        <div className="container">
          <Suspense
            fallback={
              <div className="mx-auto max-w-4xl text-center">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {['Sherwin-Williams', 'Benjamin Moore', 'Behr', 'PPG'].map((brand) => (
                    <div
                      key={brand}
                      className="flex flex-col items-center justify-center rounded-xl border-2 border-slate-200 bg-white p-8 animate-pulse"
                    >
                      <div className="mb-4 h-20 w-40 rounded bg-slate-200" />
                      <p className="text-lg font-semibold text-slate-400">{brand}</p>
                    </div>
                  ))}
                </div>
              </div>
            }
          >
            <PaintStudioContent />
          </Suspense>
        </div>
      </Section>

      {/* Static SEO content that always renders server-side */}
      <Section className="bg-white py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">
              Find the Perfect Color for Your Oregon Home
            </h2>
            <p className="mb-4 text-lg text-slate-700">
              Choosing the right paint color is one of the most important decisions in any painting
              project. Our Paint Studio lets you explore thousands of colors from the most trusted
              brands in the industry — Sherwin-Williams, Benjamin Moore, Behr, and PPG — so you
              can find the perfect palette for your home&apos;s interior or exterior.
            </p>
            <p className="mb-6 text-lg text-slate-700">
              Every free estimate from Resurface-It includes a color consultation. Our experienced
              painters help you choose colors that complement your home&apos;s architecture, work
              with Oregon&apos;s natural light, and stand up to our climate.
            </p>
            <div className="grid gap-4 md:grid-cols-2 mb-8">
              {[
                'Browse thousands of colors from 4 premium brands',
                'Filter by interior, exterior, and specialty paint types',
                'Compare quality levels and finish options',
                'Free color consultation with every estimate',
                'Expert guidance for Oregon-specific color choices',
                'Colors matched to your home\'s style and surroundings',
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <span className="text-lg text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-primary py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Choose Your Colors?</h2>
            <p className="mb-8 text-lg text-white/90">
              Schedule a free estimate and get expert color consultation included. We&apos;ll help
              you choose colors that look beautiful and last in Oregon&apos;s climate.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <HousecallProButton
                variant="large"
                className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold"
              >
                Get Free Estimate
              </HousecallProButton>
              <PhoneLink
                phone={companyInfo.phone}
                className="text-lg font-semibold text-white hover:text-white/80 transition-colors"
              >
                Call: {companyInfo.phone}
              </PhoneLink>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 py-12">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-lg text-slate-700">
              Explore more of our services:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/services/exterior-painting"
                className="rounded-lg border border-primary bg-white px-4 py-2 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
              >
                Exterior Painting
              </Link>
              <Link
                href="/services/interior-painting"
                className="rounded-lg border border-primary bg-white px-4 py-2 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
              >
                Interior Painting
              </Link>
              <Link
                href="/gallery"
                className="rounded-lg border border-primary bg-white px-4 py-2 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
              >
                View Our Gallery
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
