'use client'

import { useState, FormEvent, useEffect } from 'react'
import { jobListings, getJobDisplayTitle, type JobListing } from '@/data/jobs'
import { PrimaryButton } from './PrimaryButton'
import { UploadButton } from '@/lib/uploadthing'
import { Upload, X, CheckCircle } from 'lucide-react'

interface CareerApplicationFormProps {
  preselectedJobId?: string
  onSuccess?: () => void
}

interface FormData {
  fullName: string
  phone: string
  email: string
  position: string
  city: string
  yearsExperience: string
  ccbNumber: string
  insuranceConfirmation: string
  message: string
  company: string // Honeypot field
  resumeUrl: string
  resumeFileName: string
}

export function CareerApplicationForm({ preselectedJobId, onSuccess }: CareerApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    position: preselectedJobId || '',
    city: '',
    yearsExperience: '',
    ccbNumber: '',
    insuranceConfirmation: '',
    message: '',
    company: '', // Honeypot
    resumeUrl: '',
    resumeFileName: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const selectedJob = formData.position ? jobListings.find((job) => job.id === formData.position) : null
  const requiresCCB = selectedJob?.requiresCCB || false

  // Get position options for dropdown
  const positionOptions = jobListings.map((job) => ({
    value: job.id,
    label: getJobDisplayTitle(job),
  }))

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.position) {
      newErrors.position = 'Please select a position'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City / Service Area is required'
    }

    if (!formData.yearsExperience.trim()) {
      newErrors.yearsExperience = 'Years of experience is required'
    } else {
      const years = parseInt(formData.yearsExperience, 10)
      if (isNaN(years) || years < 0) {
        newErrors.yearsExperience = 'Please enter a valid number of years'
      }
    }

    if (requiresCCB) {
      if (!formData.ccbNumber.trim()) {
        newErrors.ccbNumber = 'CCB number is required for this position'
      }
      if (!formData.insuranceConfirmation) {
        newErrors.insuranceConfirmation = 'Insurance confirmation is required for this position'
      }
    }

    if (!formData.resumeUrl) {
      newErrors.resume = 'Resume upload is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Check honeypot
    if (formData.company.trim()) {
      // Bot detected - silently fail
      return
    }

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          position: formData.position,
          city: formData.city,
          yearsExperience: parseInt(formData.yearsExperience, 10),
          ccbNumber: requiresCCB ? formData.ccbNumber : undefined,
          insuranceConfirmation: requiresCCB ? formData.insuranceConfirmation : undefined,
          message: formData.message || undefined,
          resumeUrl: formData.resumeUrl,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Submission failed')
      }

      setIsSuccess(true)
      if (onSuccess) {
        setTimeout(() => {
          onSuccess()
        }, 2000)
      }
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUploadComplete = (res: { url: string; name: string }[]) => {
    if (res && res.length > 0) {
      setFormData((prev) => ({
        ...prev,
        resumeUrl: res[0].url,
        resumeFileName: res[0].name,
      }))
      if (errors.resume) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.resume
          return newErrors
        })
      }
    }
    setIsUploading(false)
  }

  const handleFileUploadError = (error: Error) => {
    setErrors({
      resume: error.message || 'Failed to upload resume. Please try again.',
    })
    setIsUploading(false)
  }

  if (isSuccess) {
    return (
      <div className="rounded-lg border-2 border-green-500 bg-green-50 p-8 text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h3 className="mb-2 text-2xl font-bold text-green-900">Thank You!</h3>
        <p className="text-lg text-green-800">
          We received your application. We&apos;ll review it and get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="application-form">
      {/* Honeypot field - hidden from users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company (leave blank)</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-slate-900">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          value={formData.fullName}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, fullName: e.target.value }))
            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }))
          }}
          className={`w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.fullName ? 'border-red-500' : 'border-slate-300'
          }`}
          required
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-900">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
            if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }))
          }}
          className={`w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.phone ? 'border-red-500' : 'border-slate-300'
          }`}
          required
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-900">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, email: e.target.value }))
            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
          }}
          className={`w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.email ? 'border-red-500' : 'border-slate-300'
          }`}
          required
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="position" className="mb-2 block text-sm font-semibold text-slate-900">
          Position Applying For <span className="text-red-500">*</span>
        </label>
        <select
          id="position"
          value={formData.position}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              position: e.target.value,
              ccbNumber: '', // Reset CCB fields when position changes
              insuranceConfirmation: '',
            }))
            if (errors.position) setErrors((prev) => ({ ...prev, position: '' }))
          }}
          className={`w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.position ? 'border-red-500' : 'border-slate-300'
          }`}
          required
        >
          <option value="">Select a position</option>
          {positionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.position && <p className="mt-1 text-sm text-red-500">{errors.position}</p>}
      </div>

      <div>
        <label htmlFor="city" className="mb-2 block text-sm font-semibold text-slate-900">
          City / Service Area <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="city"
          value={formData.city}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, city: e.target.value }))
            if (errors.city) setErrors((prev) => ({ ...prev, city: '' }))
          }}
          className={`w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.city ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="e.g., Eugene, OR"
          required
        />
        {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
      </div>

      <div>
        <label htmlFor="yearsExperience" className="mb-2 block text-sm font-semibold text-slate-900">
          Years of Experience <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="yearsExperience"
          min="0"
          value={formData.yearsExperience}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, yearsExperience: e.target.value }))
            if (errors.yearsExperience) setErrors((prev) => ({ ...prev, yearsExperience: '' }))
          }}
          className={`w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.yearsExperience ? 'border-red-500' : 'border-slate-300'
          }`}
          required
        />
        {errors.yearsExperience && <p className="mt-1 text-sm text-red-500">{errors.yearsExperience}</p>}
      </div>

      {requiresCCB && (
        <>
          <div>
            <label htmlFor="ccbNumber" className="mb-2 block text-sm font-semibold text-slate-900">
              CCB Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ccbNumber"
              value={formData.ccbNumber}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, ccbNumber: e.target.value }))
                if (errors.ccbNumber) setErrors((prev) => ({ ...prev, ccbNumber: '' }))
              }}
              className={`w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.ccbNumber ? 'border-red-500' : 'border-slate-300'
              }`}
              required
            />
            {errors.ccbNumber && <p className="mt-1 text-sm text-red-500">{errors.ccbNumber}</p>}
          </div>

          <div>
            <label htmlFor="insuranceConfirmation" className="mb-2 block text-sm font-semibold text-slate-900">
              Insurance Confirmation <span className="text-red-500">*</span>
            </label>
            <select
              id="insuranceConfirmation"
              value={formData.insuranceConfirmation}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, insuranceConfirmation: e.target.value }))
                if (errors.insuranceConfirmation) setErrors((prev) => ({ ...prev, insuranceConfirmation: '' }))
              }}
              className={`w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.insuranceConfirmation ? 'border-red-500' : 'border-slate-300'
              }`}
              required
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes, I have active insurance</option>
              <option value="No">No, I do not have active insurance</option>
            </select>
            {errors.insuranceConfirmation && (
              <p className="mt-1 text-sm text-red-500">{errors.insuranceConfirmation}</p>
            )}
          </div>
        </>
      )}

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-900">
          Message / Experience Summary
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Tell us about your experience and why you're interested in this position..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-900">
          Resume <span className="text-red-500">*</span>
        </label>
        {formData.resumeUrl ? (
          <div className="flex items-center justify-between rounded-lg border border-green-500 bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-green-900">{formData.resumeFileName}</p>
                <p className="text-xs text-green-700">Resume uploaded successfully</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setFormData((prev) => ({ ...prev, resumeUrl: '', resumeFileName: '' }))
                if (errors.resume) setErrors((prev) => ({ ...prev, resume: '' }))
              }}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div>
            <UploadButton
              endpoint="resume"
              onClientUploadComplete={handleFileUploadComplete}
              onUploadError={handleFileUploadError}
              onUploadBegin={() => setIsUploading(true)}
              content={{
                button: ({ ready }) => (
                  <div
                    className={`flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 transition-colors hover:border-primary hover:bg-slate-100 ${
                      !ready || isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    } ${errors.resume ? 'border-red-500' : ''}`}
                  >
                    <Upload className="h-5 w-5 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">
                      {isUploading ? 'Uploading...' : 'Upload Resume (PDF, DOC, DOCX - Max 8MB)'}
                    </span>
                  </div>
                ),
                allowedContent: 'PDF, DOC, DOCX up to 10MB',
              }}
            />
            {errors.resume && <p className="mt-1 text-sm text-red-500">{errors.resume}</p>}
            <p className="mt-1 text-xs text-slate-500">Accepted formats: PDF, DOC, DOCX. Maximum file size: 8MB</p>
          </div>
        )}
      </div>

      {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

      <PrimaryButton type="submit" disabled={isSubmitting || isUploading} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </PrimaryButton>
    </form>
  )
}
