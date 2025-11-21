import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { CitiesGrid } from '@/components/CitiesGrid'
import { primaryCities, surroundingCities } from '@/data/cities'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Areas We Serve',
  description: 'Serving Eugene, Albany, Corvallis, Springfield and surrounding communities with premium siding replacement and painting services.',
  path: '/areas-we-serve',
})

export default function AreasWeServePage() {
  return (
    <Section className="pt-24">
      <SectionHeader
        title="Areas We Serve"
        subtitle="Proudly serving Eugene, Albany, Corvallis, Springfield and surrounding communities throughout Oregon"
      />

      <CitiesGrid cities={primaryCities} surroundingCities={surroundingCities} />
    </Section>
  )
}

