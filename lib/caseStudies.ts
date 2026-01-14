import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getMicroLocation } from '@/data/geo'

export type CaseStudyFrontmatter = {
  status: 'draft' | 'published'
  title: string
  citySlug: string
  areaSlug: string
  caseSlug: string
  servicesUsed: string[]
  propertyType: 'single-family' | 'multi-family' | 'commercial'
  surfaces: string[]
  prepSteps: string[]
  productsUsed: Array<{
    brand: string
    product: string
    sheen?: string
    colorName?: string
    primer?: string
  }>
  startDate?: string
  endDate?: string
  durationDays?: number
  challenges: string[]
  solutions: string[]
  results: string[]
  photoGallery: Array<{
    url: string
    label: 'before' | 'during' | 'after'
    alt: string
  }>
  reviewSnippet?: string
  customerFeedbackNotes?: string
  ctaUrl: '/contact'
  costRange?: string
  warrantyUsed?: string
  financingUsed?: boolean
  crewSize?: number
  weatherNotes?: string
  materialRepairs?: string[]
}

export type CaseStudy = {
  frontmatter: CaseStudyFrontmatter
  content: string
  slug: string
}

const caseStudiesDirectory = path.join(process.cwd(), 'content', 'case-studies')

/**
 * Validate case study frontmatter
 * Throws error if published case study has invalid data
 */
export function validateCaseStudy(frontmatter: CaseStudyFrontmatter): void {
  if (frontmatter.status !== 'published') {
    return // Drafts don't need validation
  }

  const errors: string[] = []

  // Required fields check
  if (!frontmatter.title) errors.push('title is required')
  if (!frontmatter.citySlug) errors.push('citySlug is required')
  if (!frontmatter.areaSlug) errors.push('areaSlug is required')
  if (!frontmatter.caseSlug) errors.push('caseSlug is required')
  if (!frontmatter.servicesUsed || frontmatter.servicesUsed.length === 0) {
    errors.push('servicesUsed must have at least one service')
  }
  if (!frontmatter.propertyType) errors.push('propertyType is required')
  if (!frontmatter.surfaces || frontmatter.surfaces.length === 0) {
    errors.push('surfaces must have at least one surface')
  }
  if (!frontmatter.prepSteps || frontmatter.prepSteps.length === 0) {
    errors.push('prepSteps must have at least one step')
  }
  if (!frontmatter.productsUsed || frontmatter.productsUsed.length === 0) {
    errors.push('productsUsed must have at least one product')
  }
  if (!frontmatter.challenges || frontmatter.challenges.length === 0) {
    errors.push('challenges must have at least one challenge')
  }
  if (!frontmatter.solutions || frontmatter.solutions.length === 0) {
    errors.push('solutions must have at least one solution')
  }
  if (!frontmatter.results || frontmatter.results.length === 0) {
    errors.push('results must have at least one result')
  }

  // Photo gallery check
  if (!frontmatter.photoGallery || frontmatter.photoGallery.length < 8) {
    errors.push('photoGallery must have at least 8 photos for published case studies')
  }

  // Review or feedback check
  if (!frontmatter.reviewSnippet && !frontmatter.customerFeedbackNotes) {
    errors.push('published case studies must have either reviewSnippet or customerFeedbackNotes')
  }

  // Location validation
  const location = getMicroLocation(frontmatter.citySlug, frontmatter.areaSlug)
  if (!location) {
    errors.push(
      `citySlug "${frontmatter.citySlug}" and areaSlug "${frontmatter.areaSlug}" must match a valid micro-location in data/geo.ts`
    )
  }

  if (errors.length > 0) {
    throw new Error(
      `Invalid published case study "${frontmatter.caseSlug}" in ${frontmatter.citySlug}/${frontmatter.areaSlug}:\n${errors.join('\n')}`
    )
  }
}

/**
 * Get all case study files
 */
function getAllCaseStudyFiles(): string[] {
  if (!fs.existsSync(caseStudiesDirectory)) {
    return []
  }

  const files: string[] = []

  function walkDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walkDir(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        files.push(fullPath)
      }
    }
  }

  walkDir(caseStudiesDirectory)
  return files
}

/**
 * Read and parse a case study file
 */
function readCaseStudyFile(filePath: string): CaseStudy | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    // Extract slug from file path
    const relativePath = path.relative(caseStudiesDirectory, filePath)
    const pathParts = relativePath.split(path.sep)
    const caseSlug = path.basename(pathParts[pathParts.length - 1], '.mdx')
    const areaSlug = pathParts[pathParts.length - 2]
    const citySlug = pathParts[pathParts.length - 3]

    const frontmatter: CaseStudyFrontmatter = {
      ...data,
      citySlug: data.citySlug || citySlug,
      areaSlug: data.areaSlug || areaSlug,
      caseSlug: data.caseSlug || caseSlug,
    } as CaseStudyFrontmatter

    // Validate published case studies
    validateCaseStudy(frontmatter)

    return {
      frontmatter,
      content,
      slug: caseSlug,
    }
  } catch (error) {
    console.error(`Error reading case study file ${filePath}:`, error)
    return null
  }
}

/**
 * Get all case studies
 */
export function getAllCaseStudies(): CaseStudy[] {
  const files = getAllCaseStudyFiles()
  const caseStudies = files
    .map((file) => readCaseStudyFile(file))
    .filter((study): study is CaseStudy => study !== null)

  return caseStudies
}

/**
 * Get only published case studies
 */
export function getPublishedCaseStudies(): CaseStudy[] {
  return getAllCaseStudies().filter((study) => study.frontmatter.status === 'published')
}

/**
 * Get case study by slug
 */
export function getCaseStudyBySlug(
  citySlug: string,
  areaSlug: string,
  caseSlug: string
): CaseStudy | null {
  const allStudies = getAllCaseStudies()
  return (
    allStudies.find(
      (study) =>
        study.frontmatter.citySlug === citySlug &&
        study.frontmatter.areaSlug === areaSlug &&
        study.frontmatter.caseSlug === caseSlug
    ) || null
  )
}

/**
 * Get case studies by city
 */
export function getCaseStudiesByCity(citySlug: string): CaseStudy[] {
  return getPublishedCaseStudies().filter((study) => study.frontmatter.citySlug === citySlug)
}

/**
 * Get case studies by area
 */
export function getCaseStudiesByArea(citySlug: string, areaSlug: string): CaseStudy[] {
  return getPublishedCaseStudies().filter(
    (study) =>
      study.frontmatter.citySlug === citySlug && study.frontmatter.areaSlug === areaSlug
  )
}
