import { Section } from '@/components/Section'
import { generateMetadata as genMeta } from '@/lib/seo'
import { companyInfo } from '@/data/company'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Terms & Conditions',
  description: 'Terms & Conditions for Resurface-It, Inc. Website Terms of Use.',
  path: '/terms',
})

export default function TermsPage() {
  const effectiveDate = 'January 1, 2026'

  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 to-surface pt-32 pb-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6">Terms & Conditions</h1>
            <p className="text-xl text-slate-600">
              Website Terms of Use
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Effective Date: {effectiveDate}
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">1) Agreement Between You and Resurface-It, Inc.</h2>
              <p className="mb-4 text-slate-700">
                These Terms & Conditions (&quot;Terms&quot;) govern your access to and use of the Resurface-It website (the &quot;Website&quot;) and any pages, forms, or content on it. By accessing or using the Website, you agree to these Terms. If you do not agree, do not use the Website.
              </p>
              <p className="mb-4 text-slate-700">
                The Website is provided to share information about our company and services, and to allow you to request estimates, contact us, and access resources.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">2) Estimates, Proposals, and Service Agreements</h2>
              <p className="mb-4 text-slate-700">
                Requesting an estimate through the Website does not create a contract for services. Any work we perform must be confirmed through a written proposal/estimate and acceptance process (for example, through our estimating/invoicing platform) and may be subject to additional project-specific terms.
              </p>
              <p className="mb-4 text-slate-700">
                <strong>Additional work / upgrades:</strong> If additional items arise, we may present them as Additional Options in our estimate system. Any additional work is performed only after you approve it in writing through that system (or other written authorization).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">3) Electronic Communications</h2>
              <p className="mb-4 text-slate-700">
                When you use the Website, submit a form, request an estimate, or contact us by email/text, you consent to receive communications from us electronically (including email, text message, or phone) regarding your request, estimate, scheduling, and project-related updates.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">4) Eligibility and Children</h2>
              <p className="mb-4 text-slate-700">
                The Website is intended for adults. The Website is not directed to children under 13, and we do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">5) Privacy</h2>
              <p className="mb-4 text-slate-700">
                Your use of the Website is also subject to our{' '}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                , which explains how we collect, use, and protect information submitted through the Website and related services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">6) Links to Third-Party Websites and Services</h2>
              <p className="mb-4 text-slate-700">
                The Website may include links to third-party websites or tools. We provide these links for convenience only. We do not control and are not responsible for third-party content, policies, or practices. Your use of third-party websites is at your own risk.
              </p>
              <p className="mb-4 text-slate-700">
                We also use certain third-party services for analytics and advertising measurement (as described in our Privacy Policy).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">7) Permitted Use and Prohibited Conduct</h2>
              <p className="mb-4 text-slate-700">
                You may use the Website only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-slate-700">
                <li>Attempt to gain unauthorized access to the Website, servers, or systems</li>
                <li>Interfere with the Website&apos;s operation or security</li>
                <li>Use scraping, bots, or automated methods to access the Website without permission</li>
                <li>Upload or transmit malicious code, harmful data, or disruptive content</li>
                <li>Misrepresent your identity or submit false information through our forms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">8) Intellectual Property</h2>
              <p className="mb-4 text-slate-700">
                All content on the Website—such as text, graphics, logos, photos, videos, and design elements—is owned by Resurface-It, Inc. or our licensors and is protected by intellectual property laws. You may view and use the Website for personal, non-commercial use only. You may not copy, reproduce, republish, distribute, or create derivative works from Website content without our written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">9) Submissions and Feedback</h2>
              <p className="mb-4 text-slate-700">
                If you submit information through our forms (including photos, project details, messages, or feedback), you represent that you have the right to submit it. You grant us permission to use the information to respond to your request, prepare estimates, schedule services, and administer your project.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">10) Informational Content Disclaimer</h2>
              <p className="mb-4 text-slate-700">
                The Website may include general information about home services, products, processes, or timelines. This information is provided for general informational purposes only and may not reflect your specific home, conditions, or project needs. Any estimate, schedule, or recommendation is subject to an in-person assessment (when applicable) and written confirmation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">11) Disclaimer of Warranties (Website)</h2>
              <p className="mb-4 text-slate-700">
                The Website is provided on an &quot;as available&quot; basis. To the fullest extent permitted by law, we disclaim all warranties regarding the Website, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee the Website will be uninterrupted, error-free, or secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">12) Limitation of Liability</h2>
              <p className="mb-4 text-slate-700">
                To the fullest extent permitted by law, Resurface-It, Inc. will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of (or inability to use) the Website.
              </p>
              <p className="mb-4 text-slate-700">
                If liability cannot be excluded under applicable law, our total liability for claims relating to the Website will be limited to the amount (if any) you paid us solely for access to the Website (typically $0).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">13) Indemnification</h2>
              <p className="mb-4 text-slate-700">
                You agree to indemnify and hold harmless Resurface-It, Inc., its owners, employees, and agents from any claims, liabilities, damages, and expenses (including reasonable attorney fees) arising out of your misuse of the Website, your violation of these Terms, or your violation of any rights of another.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">14) Changes to the Website and These Terms</h2>
              <p className="mb-4 text-slate-700">
                We may update the Website and these Terms from time to time. Changes are effective when posted on this page. Your continued use of the Website after changes are posted means you accept the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">15) Governing Law and Venue</h2>
              <p className="mb-4 text-slate-700">
                These Terms are governed by the laws of the State of Oregon, without regard to conflict-of-law principles. Any dispute arising from these Terms or the Website will be brought in state or federal courts located in Oregon, unless applicable law requires otherwise.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">16) Contact Us</h2>
              <p className="mb-4 text-slate-700">
                Questions about these Terms? Contact us:
              </p>
              <div className="mb-4 rounded-lg bg-slate-50 p-6">
                <p className="mb-2 text-slate-700">
                  <strong>{companyInfo.name}</strong>
                </p>
                <p className="mb-2 text-slate-700">
                  {companyInfo.address.street}
                  <br />
                  {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}
                </p>
                <p className="mb-2 text-slate-700">
                  Phone: <a href={`tel:${companyInfo.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">{companyInfo.phone}</a>
                </p>
                <p className="mb-2 text-slate-700">
                  Office: <a href={`tel:${companyInfo.officePhone.replace(/\s/g, '')}`} className="text-primary hover:underline">{companyInfo.officePhone}</a>
                </p>
                <p className="text-slate-700">
                  Email: <a href={`mailto:${companyInfo.email}`} className="text-primary hover:underline">{companyInfo.email}</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </Section>
    </>
  )
}
