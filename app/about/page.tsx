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
    description: 'We understand Oregon\'s unique climate and building requirements, ensuring solutions that work for your home.',
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
              Resurface-it was founded with a simple mission: to provide homeowners with premium 
              exterior services that not only beautify their homes but protect their most valuable 
              investment for years to come.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              We understand that your home is more than just a building—it's where memories are made, 
              where families grow, and where you've invested your hard-earned money. That's why we 
              approach every project with the same care and attention to detail we'd want for our own homes.
            </p>
            <p className="text-lg text-slate-700">
              With years of experience serving Eugene, Albany, Corvallis, Springfield, and surrounding 
              communities, we've built a reputation for quality craftsmanship, honest communication, and 
              results that exceed expectations.
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
              Our team brings decades of combined experience in home exterior services. We've completed 
              hundreds of projects, from simple paint jobs to complete siding replacements, always 
              maintaining the highest standards of quality and professionalism.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              We stay current with the latest materials, techniques, and industry best practices. This 
              commitment to continuous improvement ensures you receive the best possible service and results.
            </p>
            <p className="text-lg text-slate-700">
              Every project is backed by our 5-year workmanship warranty, giving you peace of mind 
              that we stand behind our work long after the project is complete.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Work Together?</h2>
          <p className="mb-6 text-lg text-primaryLight">
            Let's discuss how we can help transform your home's exterior.
          </p>
          <PillBadge className="bg-white/20 text-white">
            Licensed & Insured • 5-Year Warranty • Free Estimates
          </PillBadge>
        </div>
      </Section>
    </>
  )
}

