import Link from 'next/link'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { getAllBlogPosts } from '@/data/blogPosts'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Blog',
  description: 'Expert tips, guides, and insights on siding replacement, painting, and home exterior maintenance for Oregon homeowners.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <Section className="pt-24">
      <SectionHeader
        title="Our Blog"
        subtitle="Expert tips, guides, and insights for Oregon homeowners"
      />

      {posts.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-lg text-slate-600">No blog posts available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card group block transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mb-4 text-slate-600">{post.description}</p>
              <time className="text-sm text-slate-500">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </Link>
          ))}
        </div>
      )}
    </Section>
  )
}

