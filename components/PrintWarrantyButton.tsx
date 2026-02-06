'use client'

import { PrimaryButton } from './PrimaryButton'

export const WARRANTY_PDF_PATHS = {
  painting: '/images/Full Page Warranty Print Out (1).pdf',
  concreteSiding: '/images/Concrete Full Page Warranty Print Out.pdf',
  roofing: '/images/Roofing Full Page Warranty Print Out.pdf',
} as const

interface PrintWarrantyButtonProps {
  /** Which warranty PDF to open. Defaults to painting. */
  variant?: keyof typeof WARRANTY_PDF_PATHS
  /** Button label. Defaults to "Print Warranty" or variant-specific label. */
  label?: string
}

const defaultLabels: Record<keyof typeof WARRANTY_PDF_PATHS, string> = {
  painting: 'Print Painting Warranty',
  concreteSiding: 'Print Concrete & Siding Warranty',
  roofing: 'Print Roofing Warranty',
}

export function PrintWarrantyButton({ variant = 'painting', label }: PrintWarrantyButtonProps) {
  const pdfPath = WARRANTY_PDF_PATHS[variant]
  const buttonLabel = label ?? defaultLabels[variant]

  function handlePrintWarranty() {
    const pdfWindow = window.open(encodeURI(pdfPath), '_blank')
    if (pdfWindow) {
      pdfWindow.onload = function () {
        pdfWindow.print()
      }
    }
  }

  return (
    <PrimaryButton
      onClick={handlePrintWarranty}
      variant="large"
      className="gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
        />
      </svg>
      {buttonLabel}
    </PrimaryButton>
  )
}
