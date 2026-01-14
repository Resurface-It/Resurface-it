import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { CTA } from '@/components/CTA'
import { TrustBar } from '@/components/TrustBar'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateBreadcrumbSchema } from '@/lib/jsonld'
import { getMicroLocation, getCities } from '@/data/geo'
import type { Metadata } from 'next'
import { CheckCircle } from 'lucide-react'

interface SpotlightDetailPageProps {
  params: Promise<{ citySlug: string; areaSlug: string }>
}

export async function generateStaticParams() {
  const cities = getCities()
  const params: Array<{ citySlug: string; areaSlug: string }> = []
  
  for (const city of cities) {
    const { getMicroLocationsByCity } = await import('@/data/geo')
    const locations = getMicroLocationsByCity(city.citySlug)
    for (const location of locations) {
      params.push({
        citySlug: city.citySlug,
        areaSlug: location.areaSlug,
      })
    }
  }
  
  return params
}

export async function generateMetadata({ params }: SpotlightDetailPageProps): Promise<Metadata> {
  const { citySlug, areaSlug } = await params
  const location = getMicroLocation(citySlug, areaSlug)

  if (!location) {
    return genMeta({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      noIndex: true,
    })
  }

  const city = getCities().find((c) => c.citySlug === citySlug)
  const cityName = city?.cityName || citySlug.replace('-or', '')

  const title = `Painting & Siding in ${location.areaName}, ${cityName}: What Holds Up in Oregon Weather`
  const description = `General recommendations for painting and siding projects in ${location.areaName}, ${cityName}, Oregon. Learn what works well for homes in Oregon's climate.`

  return genMeta({
    title,
    description,
    path: `/spotlights/${citySlug}/${areaSlug}`,
  })
}

export default async function SpotlightDetailPage({ params }: SpotlightDetailPageProps) {
  const { citySlug, areaSlug } = await params
  const location = getMicroLocation(citySlug, areaSlug)

  if (!location) {
    notFound()
  }

  const city = getCities().find((c) => c.citySlug === citySlug)
  const cityName = city?.cityName || citySlug.replace('-or', '')

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Spotlights', url: '/spotlights' },
    { name: cityName, url: `/spotlights/${citySlug}` },
    { name: location.areaName, url: `/spotlights/${citySlug}/${areaSlug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
              Painting & Siding in {location.areaName}, {cityName}: What Holds Up in Oregon Weather
            </h1>
            
            <div className="mb-8 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
              <p className="text-base text-amber-900">
                <strong>Note:</strong> This page shares general recommendations for homes in and around {location.areaName}. 
                For completed projects with real photos and details, see our{' '}
                <Link href={`/case-studies/${citySlug}/${areaSlug}`} className="font-semibold underline hover:text-amber-700">
                  Case Studies
                </Link>
                .
              </p>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg text-slate-700">
                Homeowners in {location.areaName} face the same challenges as others throughout the Willamette Valley: 
                protecting their homes from Oregon&apos;s heavy winter rains, high humidity, and intense summer sun. 
                While every home is unique, there are general approaches and recommendations that work well for properties 
                in this area.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Typical Homeowner Goals</h2>
            <p className="mb-4 text-lg text-slate-700">
              Homeowners in {location.areaName} typically seek exterior improvements that:
            </p>
            <ul className="mb-6 space-y-3">
              {[
                'Protect their investment from Oregon\'s weather elements',
                'Enhance curb appeal and home value',
                'Reduce long-term maintenance requirements',
                'Address existing issues like rot, peeling paint, or damaged siding',
                'Modernize the appearance of older homes',
                'Prepare a home for sale or rental',
              ].map((goal, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <span className="text-lg text-slate-700">{goal}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg text-slate-700">
              Understanding these goals helps guide material selection, preparation approaches, and project timelines 
              that work well for homes in this area.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Common Surfaces & How We Approach Them</h2>
            <p className="mb-4 text-lg text-slate-700">
              Homes in {location.areaName} feature a variety of exterior surfaces, each requiring specific approaches:
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">Wood Siding</h3>
                <p className="text-lg text-slate-700">
                  Wood siding requires thorough preparation including scraping loose paint, treating for organic growth, 
                  and proper priming. We use primer systems that provide moisture barriers and ensure paint adhesion. 
                  The finish coats are selected for their ability to withstand Oregon&apos;s moisture and UV exposure.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">Fiber Cement</h3>
                <p className="text-lg text-slate-700">
                  Fiber cement siding offers excellent durability in Oregon&apos;s climate. When painting fiber cement, 
                  we ensure proper surface preparation and use paint systems compatible with the material. For replacement, 
                  we follow manufacturer specifications for installation and weatherproofing.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">Vinyl Siding</h3>
                <p className="text-lg text-slate-700">
                  Vinyl siding provides low-maintenance protection, but may need replacement if damaged or faded. 
                  When replacing vinyl, we ensure proper installation with appropriate expansion gaps and fastening 
                  techniques for Oregon&apos;s temperature variations.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">Trim & Details</h3>
                <p className="text-lg text-slate-700">
                  Trim work, doors, and detailed elements require careful attention. We use appropriate primers and 
                  finish coats for these surfaces, often selecting semi-gloss or gloss finishes for durability and 
                  easy cleaning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Prep Checklist</h2>
            <p className="mb-4 text-lg text-slate-700">
              Proper preparation is the foundation of lasting exterior work. For homes in {location.areaName}, 
              our general prep process includes:
            </p>
            <ol className="mb-6 space-y-3 list-decimal list-inside">
              {[
                'Thorough inspection to identify areas needing repair or special attention',
                'Power washing to remove dirt, organic growth, and chalky residue',
                'Scraping loose paint and preparing surfaces for new material or paint',
                'Treating for moss, mildew, and other organic growth common in Oregon',
                'Repairing damaged areas including rot, cracks, and loose material',
                'Applying appropriate primers that provide moisture barriers and ensure adhesion',
                'Caulking and sealing gaps, joints, and areas prone to moisture intrusion',
                'Protecting landscaping, windows, and other areas during work',
              ].map((step, index) => (
                <li key={index} className="text-lg text-slate-700">{step}</li>
              ))}
            </ol>
            <p className="text-lg text-slate-700">
              This comprehensive preparation ensures that the finish work—whether paint or new siding—has a solid 
              foundation and will perform well in Oregon&apos;s climate.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Recommended Systems by Substrate</h2>
            <p className="mb-4 text-lg text-slate-700">
              Material selection for homes in {location.areaName} should account for Oregon&apos;s climate challenges:
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">For Wood Surfaces</h3>
                <p className="text-lg text-slate-700">
                  We recommend primer and paint systems that provide excellent moisture resistance and flexibility. 
                  These systems accommodate the expansion and contraction that occurs with Oregon&apos;s temperature 
                  and humidity variations.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">For Fiber Cement</h3>
                <p className="text-lg text-slate-700">
                  Fiber cement benefits from paint systems compatible with its composition. These systems provide 
                  UV protection and moisture resistance while maintaining the material&apos;s durability.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">For Siding Replacement</h3>
                <p className="text-lg text-slate-700">
                  When replacing siding, we consider material options including fiber cement, vinyl, and wood. 
                  Each has benefits suited to different homes and budgets, and we help homeowners choose based 
                  on their specific needs and Oregon&apos;s climate requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Seasonal Timing Guidance</h2>
            <p className="mb-4 text-lg text-slate-700">
              Oregon&apos;s weather patterns affect when exterior work can be performed effectively:
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">Spring & Summer</h3>
                <p className="text-lg text-slate-700">
                  These seasons typically offer the best conditions for exterior work, with warmer temperatures 
                  and lower humidity. However, we monitor for rain and ensure proper drying times between coats.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">Fall</h3>
                <p className="text-lg text-slate-700">
                  Early fall can be suitable for exterior work, but we need to account for increasing moisture 
                  and shorter daylight hours. Projects are scheduled to allow adequate drying time before winter.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">Winter</h3>
                <p className="text-lg text-slate-700">
                  Winter work is limited by rain, cold temperatures, and high humidity. We may perform interior 
                  work or preparation during this time, but exterior painting and installation typically wait 
                  for better conditions.
                </p>
              </div>
            </div>
            <p className="mt-6 text-lg text-slate-700">
              We schedule projects around weather patterns to ensure optimal conditions for material application 
              and proper curing.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">What to Expect During Your Project</h2>
            <p className="mb-4 text-lg text-slate-700">
              When you work with us on an exterior project in {location.areaName}, you can expect:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Clear Communication',
                  description: 'We keep you informed about project timelines, progress, and any changes due to weather or other factors.',
                },
                {
                  title: 'Property Protection',
                  description: 'We take care to protect your landscaping, windows, and other areas during work. Drop cloths and barriers are used as needed.',
                },
                {
                  title: 'Quality Workmanship',
                  description: 'Our team follows proven techniques and pays attention to details that ensure lasting results.',
                },
                {
                  title: 'Thorough Cleanup',
                  description: 'We clean up thoroughly at the end of each day and upon project completion, leaving your property in excellent condition.',
                },
                {
                  title: 'Final Walk-Through',
                  description: 'We conduct a final walk-through with you to ensure everything meets our standards and your satisfaction.',
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-1 text-xl font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-lg text-slate-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Ready to Get Started?</h2>
            <p className="mb-8 text-lg text-slate-700">
              If you&apos;re considering exterior work for your {location.areaName} home, we&apos;d be happy to 
              discuss your specific needs and provide a free, no-obligation estimate. We understand the unique 
              challenges of Oregon&apos;s climate and can recommend approaches that work well for homes in this area.
            </p>
            <CTA variant="large" />
          </div>
        </div>
      </Section>

      <Section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Explore Related Pages</h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/locations/${citySlug}/${areaSlug}`}
                className="rounded-lg border-2 border-primary bg-transparent px-6 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
              >
                {location.areaName} Service Page →
              </Link>
              <Link
                href={`/locations/${citySlug}`}
                className="rounded-lg border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-primary hover:text-primary"
              >
                {cityName} Service Areas →
              </Link>
              <Link
                href={`/case-studies/${citySlug}/${areaSlug}`}
                className="rounded-lg border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-primary hover:text-primary"
              >
                {location.areaName} Case Studies →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <TrustBar />
    </>
  )
}
