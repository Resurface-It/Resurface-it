'use client'

import { useState, FormEvent, useEffect } from 'react'
import { PrimaryButton } from './PrimaryButton'
import { getCityNames } from '@/data/cities'
import { services } from '@/data/services'
import { trackEstimateFormView, trackEstimateFormSubmit } from '@/lib/analytics'

interface MiniEstimateFormProps {
  onSuccess?: (data: { name: string; phone: string; city: string; service: string }) => void
}

export function MiniEstimateForm({ onSuccess }: MiniEstimateFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    service: '',
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

    if (!formData.city) {
      newErrors.city = 'City is required'
    }

    if (!formData.service) {
      newErrors.service = 'Service is required'
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
        service: formData.service,
        formType: 'mini',
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
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          services: [formData.service],
        }),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      // Track successful submission
      trackEstimateFormSubmit(true, {
        city: formData.city,
        service: formData.service,
        formType: 'mini',
      })

      if (onSuccess) {
        onSuccess(formData)
      }
    } catch (error) {
      // Track submission error
      trackEstimateFormSubmit(false, {
        city: formData.city,
        service: formData.service,
        formType: 'mini',
      })
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="mini-name" className="mb-1.5 block text-sm font-semibold text-slate-900">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="mini-name"
          value={formData.name}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }))
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
          }}
          className={`w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.name ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="Your name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="mini-phone" className="mb-1.5 block text-sm font-semibold text-slate-900">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="mini-phone"
          value={formData.phone}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
            if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }))
          }}
          className={`w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.phone ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="(541) 555-1234"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="mini-city" className="mb-1.5 block text-sm font-semibold text-slate-900">
          City <span className="text-red-500">*</span>
        </label>
        <select
          id="mini-city"
          value={formData.city}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, city: e.target.value }))
            if (errors.city) setErrors((prev) => ({ ...prev, city: '' }))
          }}
          className={`w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.city ? 'border-red-500' : 'border-slate-300'
          }`}
        >
          <option value="">Select your city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
      </div>

      <div>
        <label htmlFor="mini-service" className="mb-1.5 block text-sm font-semibold text-slate-900">
          Service <span className="text-red-500">*</span>
        </label>
        <select
          id="mini-service"
          value={formData.service}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, service: e.target.value }))
            if (errors.service) setErrors((prev) => ({ ...prev, service: '' }))
          }}
          className={`w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.service ? 'border-red-500' : 'border-slate-300'
          }`}
        >
          <option value="">Select a service</option>
          {serviceOptions.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
      </div>

      {errors.submit && <p className="text-xs text-red-500">{errors.submit}</p>}

      <PrimaryButton type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Get My Free Estimate'}
      </PrimaryButton>
      <p className="text-xs text-slate-500 text-center">
        Free, no-obligation estimate. We&apos;ll contact you within 24 hours.
      </p>
    </form>
  )
}

