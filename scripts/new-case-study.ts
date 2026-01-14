#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

interface Args {
  city?: string
  area?: string
  slug?: string
}

function parseArgs(): Args {
  const args: Args = {}
  const argv = process.argv.slice(2)

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--city' && argv[i + 1]) {
      args.city = argv[i + 1]
      i++
    } else if (argv[i] === '--area' && argv[i + 1]) {
      args.area = argv[i + 1]
      i++
    } else if (argv[i] === '--slug' && argv[i + 1]) {
      args.slug = argv[i + 1]
      i++
    }
  }

  return args
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const template = `---
status: draft
title: TODO: Add case study title
citySlug: {citySlug}
areaSlug: {areaSlug}
caseSlug: {caseSlug}
servicesUsed:
  - TODO: Add service (e.g., "Exterior Painting")
propertyType: single-family # Options: single-family, multi-family, commercial
surfaces:
  - TODO: Add surface type (e.g., "Wood Siding")
prepSteps:
  - TODO: Add prep step
productsUsed:
  - brand: TODO: Add brand name
    product: TODO: Add product name
    sheen: TODO: Optional - Add sheen
    colorName: TODO: Optional - Add color name
    primer: TODO: Optional - Add primer name
startDate: TODO: YYYY-MM-DD
endDate: TODO: YYYY-MM-DD
durationDays: TODO: Number of days
challenges:
  - TODO: Add challenge
solutions:
  - TODO: Add solution
results:
  - TODO: Add result
photoGallery:
  - url: TODO: /images/case-studies/photo1.jpg
    label: before # Options: before, during, after
    alt: TODO: Descriptive alt text
  # Add at least 8 photos total for published case studies
reviewSnippet: TODO: Optional - Add review snippet
customerFeedbackNotes: TODO: Optional - Add customer feedback notes
ctaUrl: /contact
costRange: TODO: Optional - Add cost range (e.g., "$15,000 - $20,000")
warrantyUsed: TODO: Optional - Add warranty details
financingUsed: false # TODO: Set to true if financing was used
crewSize: TODO: Optional - Number of crew members
weatherNotes: TODO: Optional - Add weather-related notes
materialRepairs:
  - TODO: Optional - Add material repair details
---

# Overview

TODO: Add overview section. Describe the neighborhood (not exact address) and general context.

# Goals

TODO: Describe the homeowner's goals for this project.

# Surfaces & Conditions

TODO: Describe the surfaces and conditions encountered.

# Prep & Repairs

TODO: Detail the preparation and repair work performed.

# Product System

TODO: Describe the products and systems used.

# Process & Timeline

TODO: Explain the process and timeline.

# Challenges & Solutions

TODO: Describe challenges faced and how they were solved.

# Results

TODO: Describe the results achieved.

# Customer Feedback

TODO: Add customer feedback section if not using reviewSnippet in frontmatter.
`

function main() {
  const args = parseArgs()

  if (!args.city || !args.area || !args.slug) {
    console.error('Usage: node scripts/new-case-study.ts --city <citySlug> --area <areaSlug> --slug <caseSlug>')
    console.error('Example: node scripts/new-case-study.ts --city eugene-or --area santa-clara --slug cedar-siding-repaint')
    process.exit(1)
  }

  const citySlug = args.city
  const areaSlug = slugify(args.area)
  const caseSlug = slugify(args.slug)

  const contentDir = path.join(process.cwd(), 'content', 'case-studies', citySlug, areaSlug)
  const filePath = path.join(contentDir, `${caseSlug}.mdx`)

  // Create directory if it doesn't exist
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true })
  }

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.error(`Error: Case study file already exists at ${filePath}`)
    process.exit(1)
  }

  // Generate content
  const content = template
    .replace(/{citySlug}/g, citySlug)
    .replace(/{areaSlug}/g, areaSlug)
    .replace(/{caseSlug}/g, caseSlug)

  // Write file
  fs.writeFileSync(filePath, content, 'utf8')

  console.log(`✅ Created case study file: ${filePath}`)
  console.log(`\n📝 Next steps:`)
  console.log(`   1. Edit the file and replace all TODO placeholders with actual content`)
  console.log(`   2. Add at least 8 photos to photoGallery for published case studies`)
  console.log(`   3. Change status to "published" when ready`)
  console.log(`   4. Ensure all required fields are filled before publishing`)
}

main()
