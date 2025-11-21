import { Shield, Award, Wrench } from 'lucide-react'

const trustItems = [
  {
    icon: Shield,
    label: 'Licensed & Insured',
  },
  {
    icon: Award,
    label: '5-Year Workmanship Warranty',
  },
  {
    icon: Wrench,
    label: 'Siding • Exterior Painting • Interior Painting',
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

