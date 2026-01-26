import { NextRequest, NextResponse } from 'next/server'
import { getJobById, getJobDisplayTitle } from '@/data/jobs'

interface ApplyRequest {
  fullName: string
  phone: string
  email: string
  position: string
  city: string
  yearsExperience: number
  ccbNumber?: string
  insuranceConfirmation?: string
  message?: string
  resumeUrl: string
  company?: string // Honeypot field
}

// Simple in-memory rate limiting
// Map<IP, { count: number, resetAt: number }>
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_MAX = 3 // Max submissions per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

function getClientIP(request: NextRequest): string {
  // Try various headers for IP (works with Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  return 'unknown'
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }

  // Reset if window expired
  if (now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }

  // Check if limit exceeded
  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }

  // Increment count
  record.count++
  rateLimitMap.set(ip, record)
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request)

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    let body: ApplyRequest
    try {
      body = await request.json()
    } catch (jsonError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    // Honeypot check - reject if company field is filled
    if (body.company && body.company.trim()) {
      // Bot detected - silently reject (return success to avoid revealing honeypot)
      return NextResponse.json({ success: true })
    }

    // Server-side validation
    if (!body.fullName || !body.fullName.trim()) {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      )
    }

    if (!body.phone || !body.phone.trim()) {
      return NextResponse.json(
        { error: 'Phone is required' },
        { status: 400 }
      )
    }

    // Validate phone format (loose)
    const phoneRegex = /^[\d\s\-\(\)]+$/
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    if (!body.email || !body.email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (!body.position) {
      return NextResponse.json(
        { error: 'Position is required' },
        { status: 400 }
      )
    }

    // Validate position exists
    const job = getJobById(body.position)
    if (!job) {
      return NextResponse.json(
        { error: 'Invalid position selected' },
        { status: 400 }
      )
    }

    if (!body.city || !body.city.trim()) {
      return NextResponse.json(
        { error: 'City / Service Area is required' },
        { status: 400 }
      )
    }

    if (body.yearsExperience === undefined || body.yearsExperience === null) {
      return NextResponse.json(
        { error: 'Years of experience is required' },
        { status: 400 }
      )
    }

    if (typeof body.yearsExperience !== 'number' || body.yearsExperience < 0) {
      return NextResponse.json(
        { error: 'Years of experience must be a valid number' },
        { status: 400 }
      )
    }

    // Validate CCB and insurance for subcontractor roles
    if (job.requiresCCB) {
      if (!body.ccbNumber || !body.ccbNumber.trim()) {
        return NextResponse.json(
          { error: 'CCB number is required for this position' },
          { status: 400 }
        )
      }
      if (!body.insuranceConfirmation) {
        return NextResponse.json(
          { error: 'Insurance confirmation is required for this position' },
          { status: 400 }
        )
      }
    }

    if (!body.resumeUrl || !body.resumeUrl.trim()) {
      return NextResponse.json(
        { error: 'Resume URL is required' },
        { status: 400 }
      )
    }

    // Validate resume URL format (should be a valid URL)
    try {
      const resumeUrl = new URL(body.resumeUrl)
      // Ensure it's from a trusted domain (uploadthing.com)
      if (!resumeUrl.hostname.includes('uploadthing.com') && !resumeUrl.hostname.includes('utfs.io')) {
        return NextResponse.json(
          { error: 'Invalid resume URL domain' },
          { status: 400 }
        )
      }
    } catch {
      return NextResponse.json(
        { error: 'Invalid resume URL format' },
        { status: 400 }
      )
    }

    // Get Zapier webhook URL from environment
    const zapierWebhookUrl = process.env.ZAPIER_CAREERS_WEBHOOK_URL
    if (!zapierWebhookUrl) {
      console.error('ZAPIER_CAREERS_WEBHOOK_URL environment variable is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Get position display title
    const positionTitle = getJobDisplayTitle(job)

    // Prepare payload for Zapier
    const zapierPayload = {
      fullName: body.fullName.trim(),
      phone: body.phone.trim(),
      email: body.email.trim(),
      position: positionTitle,
      city: body.city.trim(),
      yearsExperience: body.yearsExperience,
      ...(job.requiresCCB && {
        ccbNumber: body.ccbNumber?.trim(),
        insuranceConfirmation: body.insuranceConfirmation,
      }),
      ...(body.message && { message: body.message.trim() }),
      resumeUrl: body.resumeUrl,
      submittedAt: new Date().toISOString(),
    }

    // Send to Zapier webhook
    try {
      const zapierResponse = await fetch(zapierWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zapierPayload),
      })

      if (!zapierResponse.ok) {
        console.error('Zapier webhook error:', {
          status: zapierResponse.status,
          statusText: zapierResponse.statusText,
        })
        // Still return success to user, but log the error
        // This prevents revealing webhook failures to potential attackers
      }
    } catch (zapierError) {
      console.error('Error calling Zapier webhook:', zapierError)
      // Still return success to user, but log the error
    }

    // Log successful submission (for debugging)
    console.log('Career application submitted:', {
      fullName: body.fullName,
      email: body.email,
      position: positionTitle,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing application:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
