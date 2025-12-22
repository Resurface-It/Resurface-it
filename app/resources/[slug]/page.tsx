import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { Section } from '@/components/Section'
import { HousecallProButton } from '@/components/HousecallProButton'
import { FAQAccordion } from '@/components/FAQAccordion'
import { generateMetadata as genMeta } from '@/lib/seo'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/jsonld'
import { getResourceBySlug } from '@/data/resources'
import Link from 'next/link'
import type { Metadata } from 'next'

interface ResourcePageProps {
  params: Promise<{ slug: string }>
}

// Resource content - in a real implementation, this could come from MDX files
const resourceContent: Record<string, { content: string; faqs: Array<{ question: string; answer: string }> }> = {
  'cost-guide-eugene-siding-painting-2025': {
    content: `
# 2025 Cost Guide: Siding and Painting Prices in Eugene/Springfield

Understanding the costs of siding replacement and painting projects helps you budget effectively and make informed decisions. This guide provides honest pricing ranges based on typical projects in Eugene and Springfield, Oregon.

## Siding Replacement Costs

Siding replacement costs vary significantly based on home size, material choice, and project complexity:

- **Small homes (1,000-1,500 sq ft)**: $8,500 - $15,000
- **Medium homes (1,500-2,500 sq ft)**: $12,000 - $22,000
- **Large homes (2,500+ sq ft)**: $18,000 - $30,000+

### Material Costs

- **Vinyl siding**: $6-12 per square foot installed
- **James Hardie fiber cement**: $10-15 per square foot installed
- **Cedar siding**: $12-18 per square foot installed

## Exterior Painting Costs

Exterior painting costs depend on home size, surface condition, and paint quality:

- **Small homes**: $3,500 - $6,000
- **Medium homes**: $5,000 - $9,000
- **Large homes**: $8,000 - $15,000+

### Factors Affecting Cost

- Surface preparation needs (scraping, sanding, repairs)
- Number of stories
- Paint quality (premium paints cost more but last longer)
- Trim and detail work

## Interior Painting Costs

Interior painting costs vary by number of rooms and complexity:

- **Single room**: $500 - $1,500
- **Whole home (average)**: $2,500 - $7,000
- **Large homes**: $5,000 - $12,000+

## Why Get Multiple Estimates?

We recommend getting 2-3 estimates to compare:
- Pricing transparency
- Material quality differences
- Warranty coverage
- Timeline and scheduling

## What's Included in Our Estimates?

Our detailed estimates include:
- Material costs
- Labor costs
- Preparation work
- Cleanup and disposal
- Warranty information
- Timeline

We provide transparent, written estimates with no hidden fees.
    `,
    faqs: [
      {
        question: 'Why do siding costs vary so much?',
        answer: 'Siding costs vary based on home size, material choice (vinyl vs. Hardie vs. cedar), amount of prep work needed, and project complexity. A simple rectangular home costs less than a home with multiple angles, dormers, and architectural details.',
      },
      {
        question: 'Is it cheaper to paint or replace siding?',
        answer: 'Painting is typically less expensive upfront ($3,500-$9,000) but may need to be repeated every 7-10 years. Siding replacement costs more initially ($8,500-$30,000) but can last 20-50 years with minimal maintenance. The long-term value often favors siding replacement.',
      },
      {
        question: 'Do you offer financing?',
        answer: 'Yes, we offer 12-month 0% interest financing for qualified customers. This makes larger projects more affordable by spreading payments over time.',
      },
      {
        question: 'What affects painting costs the most?',
        answer: 'Surface preparation needs have the biggest impact. Homes with extensive scraping, sanding, or repair needs cost more. Paint quality also affects cost—premium paints cost more but last longer and provide better protection.',
      },
      {
        question: 'Are your estimates really free?',
        answer: 'Yes, all estimates are completely free with no obligation. We visit your home, assess your project, and provide a detailed written estimate. There\'s no pressure to proceed.',
      },
      {
        question: 'How accurate are these price ranges?',
        answer: 'These ranges are based on typical projects in Eugene and Springfield. Your actual cost may vary based on your specific home, material choices, and project scope. We provide detailed estimates after assessing your home.',
      },
    ],
  },
  'james-hardie-vs-vinyl-willamette-valley': {
    content: `
# James Hardie vs. Vinyl in the Willamette Valley: Why Fiber Cement Wins in the Rain

Choosing the right siding material for your Oregon home is crucial. In the Willamette Valley's wet climate, not all siding performs equally. Here's how James Hardie fiber cement compares to vinyl siding.

## Why Climate Matters

Oregon's Willamette Valley experiences:
- Heavy winter rains (40+ inches annually)
- High humidity year-round
- Intense summer sun
- Temperature fluctuations

These conditions test siding materials differently than drier climates.

## James Hardie Fiber Cement Siding

### Advantages in Oregon:
- **Moisture resistance**: Fiber cement doesn't absorb water like wood
- **Rot resistance**: Won't rot in high humidity
- **ColorPlus Technology**: Factory-applied finish resists fading
- **50+ year lifespan**: When properly installed
- **Fire resistance**: Non-combustible material

### Considerations:
- Higher initial cost ($10-15/sq ft vs. $6-12/sq ft for vinyl)
- Requires professional installation
- Heavier material

## Vinyl Siding

### Advantages:
- Lower initial cost
- Easy maintenance
- Good moisture resistance
- Wide variety of colors

### Limitations in Oregon:
- Can crack in extreme temperature swings
- May fade more quickly in intense sun
- Less durable than fiber cement
- Can be damaged by impact

## The Verdict for Oregon Homes

For Willamette Valley homes, James Hardie siding typically provides better long-term value:
- Superior moisture protection
- Better resistance to Oregon's climate challenges
- Longer lifespan offsets higher initial cost
- Lower maintenance requirements

However, premium vinyl siding can be a good choice for budget-conscious homeowners when properly installed with adequate weatherproofing.

## Making the Right Choice

Consider:
- Your budget
- Long-term goals (how long you plan to own the home)
- Home's architectural style
- Maintenance preferences

We help you choose based on your specific situation and goals.
    `,
    faqs: [
      {
        question: 'Is James Hardie really worth the extra cost?',
        answer: 'For Oregon homes, James Hardie often provides better long-term value. The 50+ year lifespan and minimal maintenance can offset the higher initial cost. In Oregon\'s wet climate, the superior moisture resistance is especially valuable.',
      },
      {
        question: 'Can vinyl siding work in Oregon?',
        answer: 'Yes, premium vinyl siding can work well in Oregon when properly installed with adequate weatherproofing. However, it may require more maintenance and have a shorter lifespan than fiber cement in our challenging climate.',
      },
      {
        question: 'How do I know which is right for my home?',
        answer: 'We assess your home, budget, and goals during your free estimate. We consider your home\'s architecture, your long-term plans, and maintenance preferences to recommend the best option.',
      },
      {
        question: 'Does James Hardie require painting?',
        answer: 'No, James Hardie\'s ColorPlus Technology provides fade-resistant color that lasts 15+ years without repainting. This is a major advantage over materials that require regular painting.',
      },
      {
        question: 'Which material is more environmentally friendly?',
        answer: 'Both materials have environmental considerations. James Hardie lasts longer, reducing replacement frequency. Vinyl is recyclable but has a shorter lifespan. We can discuss environmental factors during your estimate.',
      },
      {
        question: 'Can you install both materials?',
        answer: 'Yes, we install both James Hardie and premium vinyl siding. We help you choose based on your specific needs, budget, and home characteristics.',
      },
    ],
  },
  'paint-failure-oregon-uv-moisture': {
    content: `
# The Truth About Paint Failure in Oregon: Battling UV and Moisture

Paint failure is common in Oregon due to our unique climate challenges. Understanding why paint fails helps you choose the right materials and prevent costly repaints.

## Why Paint Fails in Oregon

Oregon's climate creates multiple challenges:
- **High humidity**: Promotes mildew and moisture absorption
- **Heavy rainfall**: Water intrusion through cracks and gaps
- **Intense UV exposure**: Fades and degrades paint
- **Temperature fluctuations**: Causes expansion and contraction

## Common Paint Failure Types

### Peeling
Caused by moisture behind paint, poor surface preparation, or incompatible paint layers.

### Cracking
Results from paint that's too thick, poor surface preparation, or extreme temperature changes.

### Fading
UV exposure breaks down pigments, especially on south-facing surfaces.

### Mildew Growth
High humidity and lack of sunlight create ideal conditions for mildew.

## Prevention Strategies

### Proper Surface Preparation
- Thorough cleaning and scraping
- Sanding rough surfaces
- Repairing damaged areas
- Applying appropriate primer

### Moisture-Resistant Primers
Essential for bare wood and high-moisture areas. Creates a barrier against water intrusion.

### UV-Protective Paints
Premium paints with UV inhibitors resist fading and degradation from sun exposure.

### Proper Application
- Multiple thin coats vs. one thick coat
- Proper drying time between coats
- Weather-appropriate timing

## Choosing the Right Paint

For Oregon homes, look for:
- Moisture-resistant formulas
- UV protection
- Mildew resistance
- High-quality binders

We use premium paints specifically formulated for wet climates, including Sherwin-Williams Duration and Benjamin Moore Aura.

## When to Repaint

Signs it's time to repaint:
- Extensive peeling or cracking
- Significant fading
- Mildew that won't clean
- Paint older than 7-10 years

Early repainting prevents costly surface damage.
    `,
    faqs: [
      {
        question: 'How long should paint last in Oregon?',
        answer: 'With proper preparation and quality paint, exterior paint should last 7-10 years in Oregon. Premium paints and proper application can extend this to 10-15 years.',
      },
      {
        question: 'Why does paint fail faster in Oregon?',
        answer: 'Oregon\'s high humidity, heavy rainfall, and intense sun create challenging conditions. Without proper preparation and moisture-resistant materials, paint fails much faster than in drier climates.',
      },
      {
        question: 'Can I prevent paint failure?',
        answer: 'Yes, proper surface preparation, moisture-resistant primers, UV-protective paints, and expert application significantly reduce paint failure. We use materials and techniques specifically designed for Oregon\'s climate.',
      },
      {
        question: 'What\'s the most important factor in preventing paint failure?',
        answer: 'Surface preparation is critical. Proper cleaning, scraping, sanding, and priming create a foundation that allows paint to adhere properly and resist moisture intrusion.',
      },
      {
        question: 'Should I paint in the rain?',
        answer: 'No, painting requires dry weather for proper application and curing. We schedule projects during dry weather windows and work around Oregon\'s weather patterns.',
      },
      {
        question: 'How do I know if my paint is failing?',
        answer: 'Signs include peeling, cracking, significant fading, or mildew growth. If you notice these signs, contact us for an assessment. Early intervention prevents costly surface damage.',
      },
    ],
  },
  'historic-home-siding-restoration-lead-safe-painting': {
    content: `
# Historic Home Siding Restoration & Lead-Safe Painting

Historic homes in Albany and Eugene require specialized restoration techniques that preserve character while providing modern protection. Lead-safe practices are essential for homes built before 1978.

## Historic Home Challenges

Historic homes face unique challenges:
- **Aging materials**: Original siding may be deteriorated
- **Lead paint**: Pre-1978 homes likely contain lead paint
- **Architectural details**: Preserving character while modernizing
- **Building codes**: Balancing historic preservation with modern requirements

## Lead-Safe Practices

### Why It Matters
Lead paint poses health risks, especially during renovation. Proper containment and removal are essential.

### Our Approach
- EPA-certified lead-safe practices
- Proper containment during work
- Safe disposal of lead-contaminated materials
- Testing when necessary

## Restoration Options

### Repair and Restore
For homes with mostly intact original siding:
- Localized rot repair
- Matching materials for replacements
- Careful refinishing that preserves character

### Replace with Modern Materials
For extensively deteriorated homes:
- Modern materials that mimic historic appearance
- James Hardie with cedar texture
- Proper installation that maintains architectural integrity

## Preserving Historic Character

We work to preserve:
- Architectural details
- Original proportions
- Historic color schemes
- Character-defining features

While providing:
- Modern weather protection
- Energy efficiency
- Long-term durability
- Low maintenance

## Albany's Historic Districts

Albany has extensive historic districts requiring:
- Special permits for exterior work
- Compliance with historic guidelines
- Materials that maintain historic appearance
- Expert craftsmanship

We're familiar with Albany's historic requirements and work within guidelines to preserve your home's character.
    `,
    faqs: [
      {
        question: 'Do you handle lead paint removal?',
        answer: 'Yes, we follow EPA-certified lead-safe practices. We properly contain work areas, use appropriate safety measures, and dispose of lead-contaminated materials safely. We can test for lead when necessary.',
      },
      {
        question: 'Can you match historic siding materials?',
        answer: 'Yes, we source materials that match historic appearances, including cedar and materials that mimic original textures. We work to preserve your home\'s historic character while providing modern protection.',
      },
      {
        question: 'Do I need special permits for historic homes?',
        answer: 'Historic districts often require permits for exterior work. We\'re familiar with Albany and Eugene\'s historic requirements and can help navigate the permit process.',
      },
      {
        question: 'How do you preserve historic character?',
        answer: 'We preserve architectural details, maintain original proportions, match historic color schemes, and use materials that maintain the home\'s character while providing modern weather protection.',
      },
      {
        question: 'Is it better to repair or replace historic siding?',
        answer: 'It depends on the extent of deterioration. We assess each situation individually. Localized repairs preserve more original material, while extensive deterioration may require replacement with materials that mimic historic appearance.',
      },
      {
        question: 'How long does historic restoration take?',
        answer: 'Historic restoration projects typically take longer due to careful work and permit requirements. Most projects take 1-3 weeks, depending on scope. We provide detailed timelines during estimates.',
      },
    ],
  },
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params
  const resource = getResourceBySlug(slug)

  if (!resource) {
    return genMeta({
      title: 'Resource Not Found',
      description: 'The requested resource could not be found.',
      noIndex: true,
    })
  }

  return genMeta({
    title: resource.title,
    description: resource.description,
    path: `/resources/${slug}`,
  })
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params
  const resource = getResourceBySlug(slug)

  if (!resource) {
    notFound()
  }

  const content = resourceContent[slug]
  const articleSchema = generateArticleSchema(
    resource.title,
    resource.description,
    resource.datePublished
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: resource.title, url: `/resources/${slug}` },
  ])
  const faqSchema = content?.faqs ? generateFAQPageSchema(content.faqs) : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <section className="bg-gradient-to-br from-primary/5 to-surface pt-32 pb-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-4xl font-bold">{resource.title}</h1>
            <p className="mb-4 text-xl text-slate-600">{resource.description}</p>
            <p className="text-sm text-slate-500">
              Published: {(() => {
                const date = new Date(resource.datePublished)
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
              })()}
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {(() => {
              if (!content?.content) return null
              
              const lines = content.content.split('\n')
              const elements: ReactNode[] = []
              let currentList: string[] = []
              
              const flushList = () => {
                if (currentList.length > 0) {
                  elements.push(
                    <ul key={`ul-${elements.length}`} className="mb-4 ml-6 list-disc space-y-2">
                      {currentList.map((item, i) => (
                        <li key={`li-${i}`} className="text-lg text-slate-700">{item}</li>
                      ))}
                    </ul>
                  )
                  currentList = []
                }
              }
              
              lines.forEach((line, index) => {
                const trimmed = line.trim()
                if (trimmed === '') {
                  flushList()
                  return
                }
                
                if (trimmed.startsWith('# ')) {
                  flushList()
                  elements.push(<h2 key={`h2-${index}`} className="mb-4 mt-8 text-3xl font-bold">{trimmed.replace('# ', '')}</h2>)
                } else if (trimmed.startsWith('## ')) {
                  flushList()
                  elements.push(<h3 key={`h3-${index}`} className="mb-3 mt-6 text-2xl font-bold">{trimmed.replace('## ', '')}</h3>)
                } else if (trimmed.startsWith('### ')) {
                  flushList()
                  elements.push(<h4 key={`h4-${index}`} className="mb-2 mt-4 text-xl font-semibold">{trimmed.replace('### ', '')}</h4>)
                } else if (trimmed.startsWith('- ')) {
                  currentList.push(trimmed.replace('- ', ''))
                } else {
                  flushList()
                  elements.push(<p key={`p-${index}`} className="mb-4 text-lg text-slate-700">{trimmed}</p>)
                }
              })
              
              flushList() // Flush any remaining list items
              
              return elements
            })()}
          </div>
        </div>
      </Section>

      {content?.faqs && content.faqs.length > 0 && (
        <Section className="bg-white">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl">Frequently Asked Questions</h2>
            <FAQAccordion faqs={content.faqs} />
          </div>
        </Section>
      )}

      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl">Ready to Get Started?</h2>
          <p className="mb-6 text-lg text-slate-600">
            Get your free, no-obligation estimate for your project.
          </p>
          <HousecallProButton variant="large">Get Free Estimate</HousecallProButton>
        </div>
      </Section>
    </>
  )
}

