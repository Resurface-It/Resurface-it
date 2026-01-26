import { generateMetadata } from '@/lib/seo'
import { generateJobPostingSchema } from '@/lib/jsonld'
import { jobListings } from '@/data/jobs'
import { CareersPageClient } from '@/components/CareersPageClient'

export const metadata = generateMetadata({
  title: 'Careers',
  description: 'Join the Resurface-It team! We\'re hiring Territory Managers and experienced subcontractors (painters, roofers, siding contractors) in Eugene, Albany, Corvallis, and Springfield, OR. Apply today!',
  path: '/careers',
})

export default function CareersPage() {
  // Generate JSON-LD structured data for each job posting
  const jobSchemas = jobListings.map((job) =>
    generateJobPostingSchema(
      job.employmentType === 'COMMISSION_ONLY' && job.city
        ? `${job.title} — ${job.city}, OR`
        : job.title,
      job.description,
      job.location,
      job.employmentType,
      job.requirements
    )
  )

  return (
    <>
      {/* JSON-LD structured data for all job postings */}
      {jobSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <CareersPageClient />
    </>
  )
}
