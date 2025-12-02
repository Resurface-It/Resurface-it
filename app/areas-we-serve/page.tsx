import Link from 'next/link'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { CitiesGrid } from '@/components/CitiesGrid'
import { HousecallProButton } from '@/components/HousecallProButton'
import { primaryCities, surroundingCities } from '@/data/cities'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Areas We Serve | Eugene, Albany, Corvallis, Springfield & Surrounding Oregon Communities',
  description: 'Serving Eugene, Albany, Corvallis, Springfield and surrounding communities with premium siding replacement and painting services. Licensed, insured, 5-year warranty. Free estimates.',
  path: '/areas-we-serve',
})

export default function AreasWeServePage() {
  return (
    <Section className="pt-24">
      <SectionHeader
        title="Areas We Serve"
        subtitle="Proudly serving Eugene, Albany, Corvallis, Springfield and surrounding communities throughout Oregon"
      />

      <div className="mt-8 mx-auto max-w-4xl">
        <p className="text-lg text-slate-700 mb-6">
          Resurface-it is your local partner for premium siding replacement and painting services throughout the Willamette Valley. We understand the unique needs of Oregon homeowners and the challenges posed by our climate—from wet winters to sunny summers.
        </p>
        <p className="text-lg text-slate-700 mb-8">
          Whether you&apos;re in Eugene, Albany, Corvallis, Springfield, or any of the surrounding communities, we&apos;re here to help protect and beautify your home with expert craftsmanship and premium materials.
        </p>
      </div>

      <CitiesGrid cities={primaryCities} surroundingCities={surroundingCities} />

      <div className="mt-12 bg-primary/5 rounded-2xl p-8">
        <h2 className="mb-4 text-2xl font-bold text-center">Ready to Get Started?</h2>
        <p className="mb-6 text-center text-lg text-slate-700">
          Get your free, no-obligation estimate for any of our services. We&apos;ll visit your home, assess your project, and provide a detailed quote.
        </p>
        <div className="text-center">
          <HousecallProButton variant="default">
            Get Your Free Estimate
          </HousecallProButton>
        </div>
      </div>
    </Section>
  )
}

