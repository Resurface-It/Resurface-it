import { Section } from '@/components/Section'
import { generateMetadata as genMeta } from '@/lib/seo'
import { companyInfo } from '@/data/company'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Privacy Policy',
  description: 'Privacy Policy for Resurface-It, Inc. Learn how we collect, use, and protect your personal information.',
  path: '/privacy',
})

export default function PrivacyPage() {
  const lastUpdated = 'January 2025'

  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 to-surface pt-32 pb-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6">Privacy Policy</h1>
            <p className="text-xl text-slate-600">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
              <p className="mb-4 text-slate-700">
                {companyInfo.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at resurface-it.com (the &quot;Website&quot;).
              </p>
              <p className="mb-4 text-slate-700">
                By using our Website, you consent to the data practices described in this policy. If you do not agree with the practices described in this policy, please do not use our Website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">2. Information We Collect</h2>
              
              <h3 className="mb-3 text-xl font-semibold">2.1 Information You Provide</h3>
              <p className="mb-4 text-slate-700">
                We collect information that you voluntarily provide to us when you:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-slate-700">
                <li>Request a free estimate or quote</li>
                <li>Contact us through our contact forms</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>Communicate with us via email, phone, or other methods</li>
              </ul>
              <p className="mb-4 text-slate-700">
                This information may include:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-slate-700">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Physical address</li>
                <li>Project details and preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="mb-3 mt-6 text-xl font-semibold">2.2 Automatically Collected Information</h3>
              <p className="mb-4 text-slate-700">
                When you visit our Website, we automatically collect certain information about your device and browsing behavior, including:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-slate-700">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Date and time of visits</li>
                <li>Clickstream data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">3. How We Use Your Information</h2>
              <p className="mb-4 text-slate-700">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-slate-700">
                <li>To provide, maintain, and improve our services</li>
                <li>To respond to your inquiries, requests, and provide customer support</li>
                <li>To send you estimates, quotes, and project-related communications</li>
                <li>To send you marketing communications (with your consent, where required)</li>
                <li>To analyze website usage and improve user experience</li>
                <li>To detect, prevent, and address technical issues</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">4. Cookies and Tracking Technologies</h2>
              <p className="mb-4 text-slate-700">
                We use cookies and similar tracking technologies to track activity on our Website and store certain information. Cookies are small data files stored on your device that help us improve your experience.
              </p>
              <p className="mb-4 text-slate-700">
                We use the following types of cookies:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-slate-700">
                <li><strong>Essential Cookies:</strong> Required for the Website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Website</li>
                <li><strong>Marketing Cookies:</strong> Used to track visitors across websites for marketing purposes</li>
              </ul>
              <p className="mb-4 text-slate-700">
                You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our Website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">5. Third-Party Services</h2>
              <p className="mb-4 text-slate-700">
                We use third-party services that may collect information about you:
              </p>
              
              <h3 className="mb-3 text-xl font-semibold">5.1 Google Analytics</h3>
              <p className="mb-4 text-slate-700">
                We use Google Analytics to analyze website traffic and user behavior. Google Analytics uses cookies to collect information such as how often users visit our Website and what pages they visit. For more information about Google Analytics, visit{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Google&apos;s Privacy Policy
                </a>
                . You can opt out of Google Analytics by installing the{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>

              <h3 className="mb-3 text-xl font-semibold">5.2 Facebook Pixel</h3>
              <p className="mb-4 text-slate-700">
                We use Facebook Pixel to measure the effectiveness of our advertising and to show you relevant ads on Facebook. Facebook may use cookies and similar technologies to collect information about your use of our Website. For more information, visit{' '}
                <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Facebook&apos;s Data Policy
                </a>
                .
              </p>

              <h3 className="mb-3 text-xl font-semibold">5.3 Microsoft Clarity</h3>
              <p className="mb-4 text-slate-700">
                We use Microsoft Clarity to understand how users interact with our Website through heatmaps and session recordings. For more information, visit{' '}
                <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Microsoft&apos;s Privacy Statement
                </a>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">6. Information Sharing and Disclosure</h2>
              <p className="mb-4 text-slate-700">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-slate-700">
                <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, such as website hosting, analytics, and email services</li>
                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid requests by public authorities</li>
                <li><strong>Protection of Rights:</strong> We may disclose information to protect our rights, privacy, safety, or property, or that of our customers or others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">7. Data Security</h2>
              <p className="mb-4 text-slate-700">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">8. Your Rights and Choices</h2>
              <p className="mb-4 text-slate-700">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-slate-700">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Opt-Out:</strong> Opt out of marketing communications</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
              </ul>
              <p className="mb-4 text-slate-700">
                To exercise these rights, please contact us using the information provided in the &quot;Contact Us&quot; section below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">9. Children&apos;s Privacy</h2>
              <p className="mb-4 text-slate-700">
                Our Website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately, and we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">10. Links to Other Websites</h2>
              <p className="mb-4 text-slate-700">
                Our Website may contain links to other websites that are not operated by us. We are not responsible for the privacy practices of these third-party websites. We encourage you to review the privacy policies of any third-party websites you visit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">11. Changes to This Privacy Policy</h2>
              <p className="mb-4 text-slate-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">12. Contact Us</h2>
              <p className="mb-4 text-slate-700">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
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

