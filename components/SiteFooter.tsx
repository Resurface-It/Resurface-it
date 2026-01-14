import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { PillBadge } from './PillBadge'
import { PhoneLink } from './PhoneLink'
import { HousecallProButton } from './HousecallProButton'
import { companyInfo } from '@/data/company'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-visible">
            <div className="mb-4">
              <Image
                src="/Resurface-it.png"
                alt="Resurface-it Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                loading="lazy"
                quality={75}
              />
            </div>
            <p className="mb-4 text-sm text-slate-600">
              Premium siding replacement, roofing, and painting services for Eugene, Albany, Corvallis, Springfield, and surrounding Oregon areas.
            </p>
            <p className="mb-4 text-xs text-slate-500 italic">
              Resurface-It, Inc specializes in siding, roofing, and painting services for residential exteriors in the Willamette Valley.
            </p>
            <div className="mb-4 space-y-2">
              <PillBadge>5-Year Workmanship Warranty</PillBadge>
              <PillBadge>Licensed & Insured</PillBadge>
              <PillBadge>Locally Owned</PillBadge>
              <PillBadge>12 Month 0% Interest Financing</PillBadge>
            </div>
            <p className="mt-4 text-xs text-slate-500 font-semibold">{companyInfo.ccbLicense}</p>
            <p className="mt-2 text-xs text-slate-500">
              Licensed & Insured in Oregon
            </p>
            <div className="mt-6">
              <style dangerouslySetInnerHTML={{ __html: `
                .bz-bdg {
                  width: 230px;
                }
                .bz-bdg > a {
                  display: block;
                  font-family: Helvetica;
                  font-size: 9px;
                  font-weight: 500;
                  text-align: center;
                  margin-top: 4px;
                  color: #484848;
                  line-height: 10px;
                }
                .bz-bdg .small-label {
                  margin-top: -12px;
                  padding: 0 10px;
                }
              ` }} />
              <div className="flex flex-wrap items-start gap-4">
                <div className="bz-bdg flex-shrink-0">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    title="BuildZoom.com"
                    href="https://www.buildzoom.com/contractor/resurface-it-inc?ad_location=co_website"
                  >
                    <img
                      alt="BuildZoom.com"
                      width={230}
                      style={{ height: 'auto' }}
                      src="https://badges.buildzoom.com/2024/bz_2.png"
                    />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.buildzoom.com/eugene-or/exterior-contractors?ad_location=co_website&bg_ref=30303323"
                  >
                    Exterior Contractors in Eugene
                  </a>
                  <img
                    src="https://track.buildzoom.com//badge_load?track_id=QKBxJM&entity=Contractor&event_type=impression&ad_type=contractor_badge"
                    width="1"
                    height="1"
                    alt=""
                    className="hidden"
                  />
                </div>
                <div className="flex-shrink-0">
                  <img
                    src="/images/Oregon-Lead-Safe-Certified.png"
                    alt="Lead-Safe Oregon Certified Firm"
                    width={120}
                    style={{ height: 'auto', width: '120px', display: 'block' }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/siding-replacement" className="text-slate-600 hover:text-primary">
                  Siding Replacement
                </Link>
              </li>
              <li>
                <Link href="/services/exterior-painting" className="text-slate-600 hover:text-primary">
                  Exterior Painting
                </Link>
              </li>
              <li>
                <Link href="/services/interior-painting" className="text-slate-600 hover:text-primary">
                  Interior Painting
                </Link>
              </li>
              <li>
                <Link href="/services/deck-staining" className="text-slate-600 hover:text-primary">
                  Deck Staining
                </Link>
              </li>
              <li>
                <Link href="/services/pressure-washing" className="text-slate-600 hover:text-primary">
                  Pressure Washing
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-600 hover:text-primary">
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-slate-600 hover:text-primary">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-slate-600 hover:text-primary">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/spotlights" className="text-slate-600 hover:text-primary">
                  Area Spotlights
                </Link>
              </li>
              <li>
                <Link href="/paint-studio" className="text-slate-600 hover:text-primary">
                  Paint Studio
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-slate-600 hover:text-primary">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-600 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/areas-we-serve" className="text-slate-600 hover:text-primary">
                  Areas We Serve
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-slate-600 hover:text-primary">
                  Service Locations
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold text-slate-900">Service Areas</h4>
              <ul className="space-y-1 text-xs text-slate-600">
                <li>
                  <Link href="/eugene-or" className="hover:text-primary">
                    Eugene, OR
                  </Link>
                </li>
                <li>
                  <Link href="/albany-or" className="hover:text-primary">
                    Albany, OR
                  </Link>
                </li>
                <li>
                  <Link href="/corvallis-or" className="hover:text-primary">
                    Corvallis, OR
                  </Link>
                </li>
                <li>
                  <Link href="/springfield-or" className="hover:text-primary">
                    Springfield, OR
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <PhoneLink phone={companyInfo.phone} className="flex items-center gap-2 hover:text-primary">
                  <Phone className="h-4 w-4" />
                  {companyInfo.phone}
                </PhoneLink>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Office: {companyInfo.officePhone}</span>
              </li>
              <li>
                <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-2 hover:text-primary">
                  <Mail className="h-4 w-4" />
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {companyInfo.address.street}<br />
                  {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{companyInfo.hours.weekdays}</span>
              </li>
              <li className="pt-2">
                <HousecallProButton className="!px-4 !py-2 text-sm font-semibold">
                  Get Free Estimate →
                </HousecallProButton>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-600">
              &copy; <span suppressHydrationWarning>{currentYear}</span> Resurface-It, Inc. All rights reserved. | Licensed & Insured in Oregon
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/warranty" className="text-slate-600 hover:text-primary">
                Warranty
              </Link>
              <Link href="/privacy" className="text-slate-600 hover:text-primary">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

