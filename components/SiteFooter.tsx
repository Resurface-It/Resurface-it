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
          <div>
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
              Premium siding replacement and painting services for Eugene, Albany, Corvallis, Springfield, and surrounding Oregon areas.
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
              &copy; <span suppressHydrationWarning>{currentYear}</span> Resurface-it. All rights reserved. | Licensed & Insured in Oregon
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/warranty" className="text-slate-600 hover:text-primary">
                Warranty
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-primary">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

