import Image from 'next/image'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { PillBadge } from '@/components/PillBadge'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'About Us',
  description: 'Learn about Resurface-it, our mission, values, and commitment to quality craftsmanship in siding replacement and painting services.',
  path: '/about',
})

const values = [
  {
    title: 'Quality Craftsmanship',
    description: 'We take pride in every project, using premium materials and proven techniques to deliver results that last.',
  },
  {
    title: 'Customer Focus',
    description: 'Your satisfaction is our priority. We communicate clearly, respect your property, and stand behind our work.',
  },
  {
    title: 'Local Expertise',
    description: 'We understand Oregon&apos;s unique climate and building requirements, ensuring solutions that work for your home.',
  },
  {
    title: 'Transparency',
    description: 'No surprises. We provide detailed estimates, clear timelines, and honest communication throughout your project.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 to-surface pt-32 pb-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6">About Resurface-it</h1>
            <p className="text-xl text-slate-600">
              Transforming homes with premium siding replacement and painting services throughout Oregon.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="mb-6 text-3xl">Our Story</h2>
            <p className="mb-4 text-lg text-slate-700">
              Resurface-it was founded in Eugene, Oregon, with a simple mission: to provide homeowners throughout the Willamette Valley with premium siding replacement and painting services that not only beautify their homes but protect their most valuable investment for years to come.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              As a locally owned, non-franchise company, we understand that your home is more than just a building—it&apos;s where memories are made, where families grow, and where you&apos;ve invested your hard-earned money. That&apos;s why we approach every project with the same care and attention to detail we&apos;d want for our own homes.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              With years of combined experience serving Eugene, Albany, Corvallis, Springfield, and surrounding communities, we&apos;ve built a reputation for quality craftsmanship, honest communication, and results that exceed expectations. Our team brings decades of experience in home exterior services, specializing in materials and techniques specifically suited for Oregon&apos;s challenging climate.
            </p>
            <p className="text-lg text-slate-700">
              Every project is backed by our 5-year workmanship warranty, giving you peace of mind that we stand behind our work long after the project is complete. We&apos;re licensed and insured in Oregon (CCB #217088), and we take pride in being your trusted local partner for siding and painting needs.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl">Our Values</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <div key={index} className="card">
                <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">Our Experience</h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4 text-lg text-slate-700">
              Our team brings decades of combined experience in home exterior services, specifically trained and experienced in working with Oregon homes. We&apos;ve completed hundreds of projects across the Willamette Valley, from simple paint jobs to complete siding replacements, always maintaining the highest standards of quality and professionalism.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              We stay current with the latest materials, techniques, and industry best practices, especially those relevant to Oregon&apos;s climate. Our expertise includes proper moisture barriers, weatherproofing techniques, and material selection specifically suited for the Pacific Northwest. This commitment to continuous improvement ensures you receive the best possible service and results.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              Every project is backed by our 5-year workmanship warranty, giving you peace of mind that we stand behind our work long after the project is complete. We&apos;re licensed and insured in Oregon (CCB #217088), and we take pride in our local ownership and commitment to the communities we serve.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl">Why Oregon?</h2>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4 text-lg text-slate-700">
              Oregon&apos;s climate presents unique challenges for home exteriors. Our wet winters, high humidity, intense summer sun, and temperature fluctuations require specialized knowledge and materials. We understand these challenges because we live and work here—we know what works in Oregon homes.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              We choose materials specifically suited for Oregon&apos;s weather: moisture-resistant primers, UV-protective paints, and durable siding materials like Hardie board that stand up to our climate. Our installation techniques include proper flashing, weatherproofing, and ventilation—all critical for long-lasting results in Oregon.
            </p>
            <p className="text-lg text-slate-700">
              As a locally owned company based in Eugene, we&apos;re invested in the success of our community. We understand local building codes, work with local suppliers, and build relationships with homeowners throughout the Willamette Valley. When you choose Resurface-it, you&apos;re choosing a neighbor who cares about your home as much as you do.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Work Together?</h2>
          <p className="mb-6 text-lg text-primaryLight">
            Let&apos;s discuss how we can help transform your home&apos;s exterior.
          </p>
          <PillBadge className="bg-white/20 text-white">
            Licensed & Insured • 5-Year Warranty • Free Estimates
          </PillBadge>
        </div>
      </Section>
    </>
  )
}

