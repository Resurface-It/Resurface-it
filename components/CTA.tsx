import Link from 'next/link'
import { HousecallProButton } from './HousecallProButton'
import { PhoneLink } from './PhoneLink'
import { companyInfo } from '@/data/company'
import { Shield, Award, FileCheck, CreditCard } from 'lucide-react'

interface CTAProps {
  variant?: 'default' | 'large'
  className?: string
  showTrustBadges?: boolean
}

export function CTA({ variant = 'default', className = '', showTrustBadges = true }: CTAProps) {
  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <HousecallProButton variant={variant}>
          Get Free Estimate
        </HousecallProButton>
        <PhoneLink phone={companyInfo.phone}>
          <span className="rounded-lg border-2 border-primary bg-transparent px-6 py-3 text-base font-semibold text-primary transition-all hover:bg-primary hover:text-white">
            Call {companyInfo.phone}
          </span>
        </PhoneLink>
      </div>
      
      {showTrustBadges && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-primary" />
            <span>{companyInfo.ccbLicense}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            <span>5-Year Warranty</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <span>Financing Available</span>
          </div>
        </div>
      )}
    </div>
  )
}
