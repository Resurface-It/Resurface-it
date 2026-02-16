import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Project Gallery | Siding & Painting Examples',
  description:
    'View our completed siding replacement, exterior painting, and interior painting projects in Eugene, Albany, Corvallis, Springfield, and the Willamette Valley. Real photos and details.',
  path: '/gallery',
})

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
