import { Shield, Award, FileCheck, CreditCard } from 'lucide-react'
import { companyInfo } from '@/data/company'

const trustItems = [
  {
    icon: Shield,
    label: 'Licensed & Insured',
  },
  {
    icon: FileCheck,
    label: companyInfo.ccbLicense,
  },
  {
    icon: Award,
    label: '5-Year Workmanship Warranty',
  },
  {
    icon: CreditCard,
    label: '12 Month 0% Interest Financing',
  },
]

export function TrustBar() {
  return (
    <div className="border-y border-slate-200 bg-white py-6">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {trustItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-primary" />
                <span className="text-sm font-semibold text-slate-900 md:text-base">{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

