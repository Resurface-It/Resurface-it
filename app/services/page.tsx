import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { ServicesGrid } from '@/components/ServicesGrid'
import { HousecallProButton } from '@/components/HousecallProButton'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Siding, Painting & Exterior Services | Eugene, OR',
  description: 'Comprehensive home exterior services including roofing, siding replacement, exterior painting, interior painting, deck staining, and pressure washing. Serving Eugene, Albany, Corvallis, Springfield, and surrounding Oregon communities. 5-year warranty. Free estimates.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-24">
        <SectionHeader
          title="Our Comprehensive Siding Replacement & Painting Services"
          subtitle="Affordable siding replacement, exterior house painting, roofing, and more—backed by expert craftsmanship and premium materials for Oregon homes."
          align="center"
        />
        <div className="mt-8 mx-auto max-w-3xl text-center">
          <p className="text-lg text-slate-700 mb-6">
            Resurface-it offers a complete suite of home exterior and interior services designed to protect and beautify your Oregon home. From affordable siding replacement and exterior house painting in Eugene, Albany, Corvallis, and Springfield to interior painting, deck staining, pressure washing, and roofing, we provide expert craftsmanship backed by a 5-year workmanship warranty.
          </p>
          <p className="text-lg text-slate-700 mb-8">
            Our services are specifically tailored for Oregon&apos;s climate—protecting against rain, humidity, and temperature fluctuations while maintaining lasting beauty. We use premium materials from trusted manufacturers like James Hardie, Sherwin-Williams, and Benjamin Moore.
          </p>
        </div>
        <div className="mt-12">
          <ServicesGrid />
        </div>
        <div className="mt-12 bg-primary/5 rounded-2xl p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Not Sure Which Service You Need?</h2>
          <p className="mb-6 text-lg text-slate-700">
            Get a free consultation. We&apos;ll visit your home, assess your needs, and recommend the best solutions for your project.
          </p>
          <HousecallProButton variant="default">
            Get Free Consultation
          </HousecallProButton>
        </div>
      </Section>
    </>
  )
}

