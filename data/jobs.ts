export interface JobListing {
  id: string
  title: string
  location: string
  description: string
  requirements?: string[]
  employmentType: 'COMMISSION_ONLY' | 'SUBCONTRACTOR'
  requiresCCB: boolean
  city?: string // For territory manager positions
}

export const jobListings: JobListing[] = [
  {
    id: 'territory-manager-eugene',
    title: 'Territory Manager',
    location: 'Eugene, OR',
    description: 'Join our team as a Territory Manager in Eugene, OR. This commission-only position offers unlimited earning potential for motivated sales professionals. You\'ll be responsible for generating leads, meeting with homeowners, and closing deals for our premium siding, roofing, and painting services.',
    employmentType: 'COMMISSION_ONLY',
    requiresCCB: false,
    city: 'Eugene',
  },
  {
    id: 'territory-manager-corvallis',
    title: 'Territory Manager',
    location: 'Corvallis, OR',
    description: 'Join our team as a Territory Manager in Corvallis, OR. This commission-only position offers unlimited earning potential for motivated sales professionals. You\'ll be responsible for generating leads, meeting with homeowners, and closing deals for our premium siding, roofing, and painting services.',
    employmentType: 'COMMISSION_ONLY',
    requiresCCB: false,
    city: 'Corvallis',
  },
  {
    id: 'territory-manager-albany',
    title: 'Territory Manager',
    location: 'Albany, OR',
    description: 'Join our team as a Territory Manager in Albany, OR. This commission-only position offers unlimited earning potential for motivated sales professionals. You\'ll be responsible for generating leads, meeting with homeowners, and closing deals for our premium siding, roofing, and painting services.',
    employmentType: 'COMMISSION_ONLY',
    requiresCCB: false,
    city: 'Albany',
  },
  {
    id: 'painters-subcontractor',
    title: 'Painters',
    location: 'Eugene, Albany, Corvallis, Springfield, OR',
    description: 'We\'re seeking experienced painting subcontractors to join our team. Work on high-quality residential and commercial painting projects throughout the Willamette Valley. Must have valid CCB number, active insurance, and minimum 2 years of experience.',
    requirements: [
      'Valid CCB number required',
      'Active insurance required',
      'Minimum 2 years of experience',
    ],
    employmentType: 'SUBCONTRACTOR',
    requiresCCB: true,
  },
  {
    id: 'roofers-subcontractor',
    title: 'Roofers',
    location: 'Eugene, Albany, Corvallis, Springfield, OR',
    description: 'We\'re seeking experienced roofing subcontractors to join our team. Work on high-quality residential roofing projects throughout the Willamette Valley. Must have valid CCB number, active insurance, and minimum 2 years of experience.',
    requirements: [
      'Valid CCB number required',
      'Active insurance required',
      'Minimum 2 years of experience',
    ],
    employmentType: 'SUBCONTRACTOR',
    requiresCCB: true,
  },
  {
    id: 'siding-contractors-subcontractor',
    title: 'Siding Contractors',
    location: 'Eugene, Albany, Corvallis, Springfield, OR',
    description: 'We\'re seeking experienced siding contractor subcontractors to join our team. Work on high-quality siding replacement and installation projects throughout the Willamette Valley. Must have valid CCB number, active insurance, and minimum 2 years of experience.',
    requirements: [
      'Valid CCB number required',
      'Active insurance required',
      'Minimum 2 years of experience',
    ],
    employmentType: 'SUBCONTRACTOR',
    requiresCCB: true,
  },
]

/**
 * Get job listing by ID
 */
export function getJobById(id: string): JobListing | undefined {
  return jobListings.find((job) => job.id === id)
}

/**
 * Get job display title (includes location for territory managers)
 */
export function getJobDisplayTitle(job: JobListing): string {
  if (job.employmentType === 'COMMISSION_ONLY' && job.city) {
    return `${job.title} — ${job.city}, OR (Commission-Only to Start)`
  }
  return job.title
}
