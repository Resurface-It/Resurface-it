import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Paint Studio | Explore Paint Colors & Brands',
  description:
    'Explore paint colors from top brands including Sherwin-Williams, Benjamin Moore, Behr, and PPG. Browse quality levels and find the perfect color for your project.',
  path: '/paint-studio',
})

export default function PaintStudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
