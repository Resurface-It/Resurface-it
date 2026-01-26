'use client'

import { useState } from 'react'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { JobCard } from '@/components/JobCard'
import { Modal } from '@/components/Modal'
import { jobListings, getJobById, getJobDisplayTitle } from '@/data/jobs'

export function CareersPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [formType, setFormType] = useState<'territory-manager' | 'subcontractor' | null>(null)

  const handleApplyClick = (jobId: string) => {
    const job = getJobById(jobId)
    if (job) {
      setSelectedJob(jobId)
      // Determine form type based on employment type
      if (job.employmentType === 'COMMISSION_ONLY') {
        setFormType('territory-manager')
      } else if (job.employmentType === 'SUBCONTRACTOR') {
        setFormType('subcontractor')
      }
      setIsModalOpen(true)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-primary/10 to-surface py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Join the Resurface-It Team
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-slate-700 md:text-xl">
            We&apos;re growing and looking for talented individuals to join our team. Whether you&apos;re a sales professional looking for unlimited earning potential or an experienced contractor seeking quality projects, we have opportunities for you.
          </p>
          <p className="text-base text-slate-600 md:text-lg">
            Based in Eugene, OR, we serve homeowners throughout the Willamette Valley with premium siding replacement, roofing, and painting services.
          </p>
        </div>
      </Section>

      {/* Job Listings Section */}
      <Section className="bg-white py-16">
        <SectionHeader
          title="Open Positions"
          subtitle="Explore our current job openings and find the perfect fit for your skills and career goals"
          align="center"
        />
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobListings.map((job) => (
            <JobCard key={job.id} job={job} onApply={handleApplyClick} />
          ))}
        </div>
      </Section>

      {/* Zapier Form Modal for Job Applications */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedJob(null)
          setFormType(null)
        }}
        title={selectedJob && getJobById(selectedJob) ? `Apply for ${getJobDisplayTitle(getJobById(selectedJob)!)}` : 'Apply Now'}
      >
        <div className="flex w-full items-center justify-center">
          {formType === 'territory-manager' && (
            <iframe
              src="https://interfaces.zapier.com/embed/page/cmkvdar7600076izyvs1bq9dj?noBackground=false"
              style={{
                width: '100%',
                maxWidth: '900px',
                height: '500px',
                border: 'none',
                borderRadius: '8px',
                margin: '0 auto',
              }}
              title="Territory Manager Application Form"
              allow="clipboard-read; clipboard-write"
            />
          )}
          {formType === 'subcontractor' && (
            <iframe
              src="https://interfaces.zapier.com/embed/page/cmkvnzbvl004zbeu7l4kze6qa?noBackground=false&allowQueryParams=true"
              style={{
                width: '100%',
                maxWidth: '900px',
                height: '1200px',
                border: 'none',
                borderRadius: '8px',
                margin: '0 auto',
              }}
              title="Subcontractor Application Form"
              allow="clipboard-read; clipboard-write"
            />
          )}
        </div>
      </Modal>
    </>
  )
}
