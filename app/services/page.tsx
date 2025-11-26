import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { ServicesGrid } from '@/components/ServicesGrid'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Services',
  description: 'Comprehensive home exterior services including roofing, siding replacement, exterior painting, interior painting, deck staining, and pressure washing. Serving Eugene, Albany, Corvallis, and surrounding areas.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <Section className="pt-24">
      <SectionHeader
        title="What We Do"
        subtitle="Comprehensive home exterior services backed by expert craftsmanship and premium materials"
        align="center"
      />
      <div className="mt-12">
        <ServicesGrid />
      </div>
    </Section>
  )
}

