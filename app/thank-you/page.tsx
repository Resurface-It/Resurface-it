import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { SecondaryButton } from '@/components/SecondaryButton'
import { PhoneLink } from '@/components/PhoneLink'
import Link from 'next/link'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'
import { companyInfo } from '@/data/company'
import { CheckCircle, Clock, Phone, Mail, MapPin, Shield, Award } from 'lucide-react'
import Script from 'next/script'

export const metadata: Metadata = genMeta({
  title: 'Thank You | We\'ll Contact You Soon',
  description: 'Thank you for requesting your free estimate. We\'ll contact you within 24 hours to schedule your estimate visit.',
  path: '/thank-you',
  noIndex: true, // Don't index thank you pages
})

export default function ThankYouPage() {
  return (
    <>
      {/* Google tag (gtag.js) event */}
      <Script
        id="conversion-event-request-quote"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('event', 'conversion_event_request_quote', {
              // <event_parameters>
            });
          `,
        }}
      />
      <section className="bg-gradient-to-br from-primary/5 to-surface pt-32 pb-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Thank You!</h1>
            <p className="mb-8 text-xl text-slate-600">
              We&apos;ve received your request and will contact you within 24 hours to schedule your free, no-obligation estimate.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* What Happens Next */}
            <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-8">
              <div className="mb-4 flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">What Happens Next</h2>
              </div>
              <ol className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    1
                  </span>
                  <div>
                    <p className="font-semibold">We&apos;ll contact you within 24 hours</p>
                    <p className="text-sm text-slate-600">
                      Usually the same day, often within 4-6 hours during business hours.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    2
                  </span>
                  <div>
                    <p className="font-semibold">Schedule your free estimate visit</p>
                    <p className="text-sm text-slate-600">
                      We&apos;ll find a time that works for you, typically within 2-3 days.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    3
                  </span>
                  <div>
                    <p className="font-semibold">Get your detailed estimate</p>
                    <p className="text-sm text-slate-600">
                      We&apos;ll assess your home, discuss options, and provide a written estimate—no obligation.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Your Estimate Visit Includes */}
            <div className="rounded-xl border border-slate-200 bg-white p-8">
              <h2 className="mb-4 text-2xl font-bold">Your Estimate Visit Includes</h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span>Project assessment and condition evaluation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span>Material samples and options discussion</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span>Color consultation and recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span>Detailed written estimate with timeline</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span>Answers to all your questions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Information */}
      <Section className="bg-slate-50">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Have Questions?"
            subtitle="We're here to help. Reach out anytime."
            align="center"
          />
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Call Us</h3>
              <PhoneLink
                phone={companyInfo.phone}
                className="text-lg font-semibold text-primary hover:text-primaryDark"
              >
                {companyInfo.phone}
              </PhoneLink>
              <p className="mt-2 text-sm text-slate-600">{companyInfo.hours.weekdays}</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Email Us</h3>
              <a
                href={`mailto:${companyInfo.email}`}
                className="text-lg font-semibold text-primary hover:text-primaryDark"
              >
                {companyInfo.email}
              </a>
              <p className="mt-2 text-sm text-slate-600">We respond within 24 hours</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Visit Us</h3>
              <p className="text-slate-700">
                {companyInfo.address.street}
                <br />
                {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Why Homeowners Choose Resurface-it"
            subtitle="Your trusted local experts for siding and painting"
            align="center"
          />
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Licensed & Insured</h3>
              <p className="text-sm text-slate-600">{companyInfo.ccbLicense}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">5-Year Warranty</h3>
              <p className="text-sm text-slate-600">Workmanship guarantee</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Locally Owned</h3>
              <p className="text-sm text-slate-600">Serving Oregon since day one</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">50+ Five-Star Reviews</h3>
              <p className="text-sm text-slate-600">Trusted by homeowners</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">While You Wait</h2>
          <p className="mb-8 text-lg text-white/90">
            Explore our gallery, learn about our services, or read what other homeowners have to say about working with us.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <SecondaryButton 
              href="/gallery" 
              as="a"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              View Our Work
            </SecondaryButton>
            <SecondaryButton 
              href="/services" 
              as="a"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Our Services
            </SecondaryButton>
            <SecondaryButton 
              href="/about" 
              as="a"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Learn About Us
            </SecondaryButton>
          </div>
        </div>
      </Section>
    </>
  )
}

