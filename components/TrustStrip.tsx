import Link from 'next/link'
import { Shield, Award, MapPin, FileCheck } from 'lucide-react'
import { companyInfo } from '@/data/company'

const trustItems = [
  {
    icon: Award,
    label: '5-Year Workmanship Warranty',
    href: '/warranty',
    clickable: true,
  },
  {
    icon: Shield,
    label: 'Licensed & Insured in Oregon',
    href: null,
    clickable: false,
  },
  {
    icon: FileCheck,
    label: companyInfo.ccbLicense,
    href: null,
    clickable: false,
  },
  {
    icon: MapPin,
    label: 'Locally Owned & Operated',
    href: null,
    clickable: false,
  },
]

export function TrustStrip() {
  return (
    <div className="border-y border-slate-200 bg-white py-4">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon
            const content = (
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-slate-900">{item.label}</span>
              </div>
            )

            if (item.clickable && item.href) {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="transition-opacity hover:opacity-80"
                >
                  {content}
                </Link>
              )
            }

            return <div key={index}>{content}</div>
          })}
        </div>
      </div>
    </div>
  )
}

