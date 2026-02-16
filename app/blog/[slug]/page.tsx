import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { HousecallProButton } from '@/components/HousecallProButton'
import { getBlogPostBySlug, getRelatedPosts } from '@/data/blogPosts'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/jsonld'
import { formatDate } from '@/lib/formatDate'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return genMeta({
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
      noIndex: true,
    })
  }

  return genMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    ...(post.image && { image: post.image }),
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug)
  const articleSchema = generateArticleSchema(
    post.title,
    post.description,
    post.date,
    post.image
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="pt-32">
        <Section>
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mb-4">{post.title}</h1>
            <time className="text-slate-500">
              {formatDate(post.date)}
            </time>
          </div>
        </Section>

        <Section className="bg-white">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              {post.content.map((paragraph, index) => (
                <p key={index} className="mb-6 text-lg leading-relaxed text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Section>
      </article>

      {/* CTA Section */}
      <Section className="bg-primary text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-6 text-lg text-white/90">
            Get your free, no-obligation estimate for your home project. We&apos;ll visit your home, assess your needs, and provide a detailed quote.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <HousecallProButton
              variant="large"
              className="bg-white !text-slate-900 hover:bg-slate-100 shadow-xl font-bold"
            >
              Get Free Estimate
            </HousecallProButton>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              View All Services
            </Link>
          </div>
          <div className="mt-8 text-sm text-white/80">
            <p className="mb-2">Serving Eugene, Albany, Corvallis, Springfield, and surrounding Oregon communities.</p>
            <Link href="/areas-we-serve" className="underline hover:text-white">
              View all service areas →
            </Link>
          </div>
        </div>
      </Section>

      {relatedPosts.length > 0 && (
        <Section>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl">Related Posts</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="card group block transition-all hover:shadow-lg"
                >
                  <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-slate-600">{relatedPost.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  )
}

