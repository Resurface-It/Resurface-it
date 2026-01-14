import { NextRequest, NextResponse } from 'next/server'

interface EstimateRequest {
  name: string
  phone: string
  email?: string
  address?: string
  city?: string
  services: string[]
  timeline?: string
  details?: string
}

export async function POST(request: NextRequest) {
  try {
    let body: EstimateRequest
    try {
      body = await request.json()
    } catch (jsonError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    // Server-side validation
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    if (!body.services || body.services.length === 0) {
      return NextResponse.json(
        { error: 'At least one service must be selected' },
        { status: 400 }
      )
    }

    // Validate phone format (basic)
    const phoneRegex = /^[\d\s\-\(\)]+$/
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    // Validate email if provided
    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // TODO: Integrate with Housecall Pro API
    // Example: await housecallPro.createLead(body)
    // See: https://developer.housecallpro.com/docs/api-reference

    // TODO: Send email notification
    // Example: await sendEmail({
    //   to: 'info@resurface-it.com',
    //   subject: `New Estimate Request from ${body.name}`,
    //   body: formatEstimateEmail(body)
    // })

    // TODO: Store in CRM/database
    // Example: await db.estimates.create({ data: body })

    // For now, just log the request
    console.log('New estimate request:', {
      name: body.name,
      phone: body.phone,
      email: body.email,
      city: body.city,
      services: body.services,
      timeline: body.timeline,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing estimate request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

