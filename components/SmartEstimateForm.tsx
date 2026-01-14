'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PrimaryButton } from './PrimaryButton'
import { getCityNames } from '@/data/cities'
import { services } from '@/data/services'
import { trackEstimateFormView, trackEstimateFormSubmit } from '@/lib/analytics'

interface SmartEstimateFormProps {
  prefilledCity?: string
  prefilledService?: string
  onSuccess?: () => void
}

export function SmartEstimateForm({ prefilledCity, prefilledService, onSuccess }: SmartEstimateFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: prefilledCity || '',
    services: prefilledService ? [prefilledService] : [] as string[],
    timeline: '',
    details: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const cities = getCityNames()
  const serviceOptions = services.map((s) => ({ value: s.slug, label: s.name }))

  // Track form view on mount
  useEffect(() => {
    trackEstimateFormView()
  }, [])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (formData.services.length === 0) {
      newErrors.services = 'Please select at least one service'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      // Track validation failure
      trackEstimateFormSubmit(false, {
        city: formData.city,
        service: formData.services[0] || undefined,
        formType: 'full',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      // Track successful submission
      trackEstimateFormSubmit(true, {
        city: formData.city,
        service: formData.services[0] || undefined,
        formType: 'full',
      })

      // If onSuccess callback is provided (e.g., for modal), close modal first
      if (onSuccess) {
        onSuccess()
        // Small delay to allow modal to close, then redirect
        setTimeout(() => {
          router.push('/thank-you')
        }, 300)
      } else {
        // Direct redirect if not in modal
        router.push('/thank-you')
      }
    } catch (error) {
      // Track submission error
      trackEstimateFormSubmit(false, {
        city: formData.city,
        service: formData.services[0] || undefined,
        formType: 'full',
      })
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleServiceToggle = (serviceSlug: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceSlug)
        ? prev.services.filter((s) => s !== serviceSlug)
        : [...prev.services, serviceSlug],
    }))
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-900">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }))
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
          }}
          className={`w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.name ? 'border-red-500' : 'border-slate-300'
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
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
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-900">
          Email
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
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="address" className="mb-2 block text-sm font-semibold text-slate-900">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={formData.address}
          onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="city" className="mb-2 block text-sm font-semibold text-slate-900">
          City
        </label>
        <select
          id="city"
          value={formData.city}
          onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-900">
          Service(s) interested in <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {serviceOptions.map((service) => (
            <label key={service.value} className="flex items-center gap-3 min-h-[44px] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.services.includes(service.value)}
                onChange={() => handleServiceToggle(service.value)}
                className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary cursor-pointer"
              />
              <span className="text-base text-slate-700">{service.label}</span>
            </label>
          ))}
        </div>
        {errors.services && <p className="mt-1 text-sm text-red-500">{errors.services}</p>}
      </div>

      <div>
        <label htmlFor="timeline" className="mb-2 block text-sm font-semibold text-slate-900">
          Desired timeline
        </label>
        <select
          id="timeline"
          value={formData.timeline}
          onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select timeline</option>
          <option value="asap">ASAP</option>
          <option value="1-3-months">1-3 months</option>
          <option value="3-6-months">3-6 months</option>
          <option value="exploring">Just exploring</option>
        </select>
      </div>

      <div>
        <label htmlFor="details" className="mb-2 block text-sm font-semibold text-slate-900">
          Project details
        </label>
        <textarea
          id="details"
          rows={4}
          value={formData.details}
          onChange={(e) => setFormData((prev) => ({ ...prev, details: e.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Tell us about your project..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-900">Photo upload (optional)</label>
        <input
          type="file"
          accept="image/*"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="mt-1 text-xs text-slate-500">Upload photos of areas you&apos;d like us to address</p>
      </div>

      {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

      <PrimaryButton type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Get My Free Estimate'}
      </PrimaryButton>
    </form>
  )
}

