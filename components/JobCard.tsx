'use client'

import { JobListing, getJobDisplayTitle } from '@/data/jobs'
import { PrimaryButton } from './PrimaryButton'
import { CheckCircle } from 'lucide-react'

interface JobCardProps {
  job: JobListing
  onApply: (jobId: string) => void
}

export function JobCard({ job, onApply }: JobCardProps) {
  const displayTitle = getJobDisplayTitle(job)

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="mb-2 text-xl font-semibold text-slate-900">{displayTitle}</h3>
        <p className="text-sm font-medium text-primary">{job.location}</p>
      </div>

      <p className="mb-4 text-base leading-relaxed text-slate-700">{job.description}</p>

      {job.requirements && job.requirements.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-semibold text-slate-900">Requirements:</h4>
          <ul className="space-y-1">
            {job.requirements.map((requirement, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <PrimaryButton
          onClick={() => onApply(job.id)}
          className="w-full"
        >
          Apply Now
        </PrimaryButton>
      </div>
    </div>
  )
}
