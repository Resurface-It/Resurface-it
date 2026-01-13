#!/usr/bin/env node

/**
 * Paint Color Data Import Script
 * 
 * This script helps import paint color data from various sources.
 * It can be used to:
 * 1. Import from CSV files
 * 2. Import from JSON files
 * 3. Scrape from brand websites (requires additional setup)
 * 
 * Usage:
 *   node scripts/import-paint-colors.js --brand sherwin-williams --type interior --level premium --source file --input path/to/data.json
 *   node scripts/import-paint-colors.js --brand benjamin-moore --type exterior --level best --source csv --input path/to/data.csv
 */

const fs = require('fs')
const path = require('path')

// Parse command line arguments
const args = process.argv.slice(2)
const getArg = (name, defaultValue = null) => {
  const index = args.indexOf(`--${name}`)
  return index !== -1 && args[index + 1] ? args[index + 1] : defaultValue
}

const brand = getArg('brand')
const paintType = getArg('type')
const qualityLevel = getArg('level')
const source = getArg('source', 'file') // 'file', 'csv', 'scrape'
const inputFile = getArg('input')

// Validate required arguments
if (!brand || !paintType || !qualityLevel) {
  console.error('Error: Missing required arguments')
  console.log('\nUsage:')
  console.log('  node scripts/import-paint-colors.js --brand <brand> --type <type> --level <level> [--source <source>] [--input <file>]')
  console.log('\nRequired:')
  console.log('  --brand      Brand ID (sherwin-williams, benjamin-moore, behr, ppg)')
  console.log('  --type       Paint type (interior, exterior, trim-door)')
  console.log('  --level      Quality level (good, better, best, premium)')
  console.log('\nOptional:')
  console.log('  --source     Data source (file, csv, scrape) - default: file')
  console.log('  --input      Input file path (required for file/csv sources)')
  process.exit(1)
}

// Validate brand
const validBrands = ['sherwin-williams', 'benjamin-moore', 'behr', 'ppg']
if (!validBrands.includes(brand)) {
  console.error(`Error: Invalid brand. Must be one of: ${validBrands.join(', ')}`)
  process.exit(1)
}

// Validate paint type
const validTypes = ['interior', 'exterior', 'trim-door']
if (!validTypes.includes(paintType)) {
  console.error(`Error: Invalid paint type. Must be one of: ${validTypes.join(', ')}`)
  process.exit(1)
}

// Validate quality level
const validLevels = ['good', 'better', 'best', 'premium']
if (!validLevels.includes(qualityLevel)) {
  console.error(`Error: Invalid quality level. Must be one of: ${validLevels.join(', ')}`)
  process.exit(1)
}

// Output directory
const outputDir = path.join(process.cwd(), 'data', 'colors-json', brand, paintType)
const outputFile = path.join(outputDir, `${qualityLevel}.json`)

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

/**
 * Validate color data structure
 */
function validateColor(color) {
  const errors = []

  if (!color.id || typeof color.id !== 'string') {
    errors.push('Missing or invalid id')
  }

  if (!color.name || typeof color.name !== 'string') {
    errors.push('Missing or invalid name')
  }

  if (!color.hex || typeof color.hex !== 'string' || !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color.hex)) {
    errors.push('Missing or invalid hex color code')
  }

  return errors
}

/**
 * Normalize color data
 */
function normalizeColor(color, index) {
  return {
    id: color.id || `${brand}-${paintType}-${qualityLevel}-${String(index + 1).padStart(3, '0')}`,
    name: color.name || 'Unnamed Color',
    hex: color.hex.toUpperCase(),
    rgb: color.rgb || hexToRgb(color.hex),
    code: color.code || '',
    family: color.family || 'other',
  }
}

/**
 * Convert hex to RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Import from JSON file
 */
function importFromJson(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Error: Input file not found: ${filePath}`)
    process.exit(1)
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(fileContent)

  // Handle different JSON structures
  let colors = []
  if (Array.isArray(data)) {
    colors = data
  } else if (data.colors && Array.isArray(data.colors)) {
    colors = data.colors
  } else {
    console.error('Error: Invalid JSON structure. Expected array or object with colors array.')
    process.exit(1)
  }

  return colors
}

/**
 * Import from CSV file
 */
function importFromCsv(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Error: Input file not found: ${filePath}`)
    process.exit(1)
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const lines = fileContent.split('\n').filter((line) => line.trim())

  if (lines.length < 2) {
    console.error('Error: CSV file must have at least a header row and one data row')
    process.exit(1)
  }

  // Parse header
  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase())
  const nameIndex = headers.findIndex((h) => h.includes('name'))
  const hexIndex = headers.findIndex((h) => h.includes('hex') || h.includes('color'))
  const codeIndex = headers.findIndex((h) => h.includes('code') || h.includes('number'))
  const familyIndex = headers.findIndex((h) => h.includes('family') || h.includes('category'))

  if (nameIndex === -1 || hexIndex === -1) {
    console.error('Error: CSV must have "name" and "hex" columns')
    process.exit(1)
  }

  // Parse data rows
  const colors = []
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim())
    if (values.length < Math.max(nameIndex, hexIndex) + 1) continue

    colors.push({
      name: values[nameIndex] || '',
      hex: values[hexIndex] || '',
      code: codeIndex !== -1 ? values[codeIndex] || '' : '',
      family: familyIndex !== -1 ? values[familyIndex] || 'other' : 'other',
    })
  }

  return colors
}

/**
 * Main import function
 */
async function main() {
  console.log(`\nImporting paint colors for ${brand} - ${paintType} - ${qualityLevel}`)
  console.log(`Source: ${source}`)

  let colors = []

  try {
    if (source === 'file' || source === 'json') {
      if (!inputFile) {
        console.error('Error: --input file path required for file/json source')
        process.exit(1)
      }
      colors = importFromJson(inputFile)
    } else if (source === 'csv') {
      if (!inputFile) {
        console.error('Error: --input file path required for csv source')
        process.exit(1)
      }
      colors = importFromCsv(inputFile)
    } else if (source === 'scrape') {
      console.log('Scraping functionality not yet implemented.')
      console.log('Please use file or csv source, or implement scraping logic.')
      process.exit(1)
    } else {
      console.error(`Error: Unknown source type: ${source}`)
      process.exit(1)
    }

    // Validate and normalize colors
    console.log(`\nProcessing ${colors.length} colors...`)
    const validatedColors = []
    const errors = []

    colors.forEach((color, index) => {
      const validationErrors = validateColor(color)
      if (validationErrors.length > 0) {
        errors.push(`Color ${index + 1}: ${validationErrors.join(', ')}`)
      } else {
        validatedColors.push(normalizeColor(color, validatedColors.length))
      }
    })

    if (errors.length > 0) {
      console.warn(`\nWarning: ${errors.length} color(s) had validation errors:`)
      errors.slice(0, 10).forEach((error) => console.warn(`  - ${error}`))
      if (errors.length > 10) {
        console.warn(`  ... and ${errors.length - 10} more`)
      }
    }

    // Remove duplicates based on hex code
    const uniqueColors = []
    const seenHex = new Set()
    validatedColors.forEach((color) => {
      if (!seenHex.has(color.hex)) {
        seenHex.add(color.hex)
        uniqueColors.push(color)
      }
    })

    if (uniqueColors.length < validatedColors.length) {
      console.log(`Removed ${validatedColors.length - uniqueColors.length} duplicate color(s)`)
    }

    // Create output structure
    const output = {
      meta: {
        brand,
        paintType,
        qualityLevel,
        totalColors: uniqueColors.length,
        lastUpdated: new Date().toISOString().split('T')[0],
      },
      colors: uniqueColors,
    }

    // Write to file
    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2))
    console.log(`\n✓ Successfully imported ${uniqueColors.length} colors`)
    console.log(`  Output: ${outputFile}`)
    console.log(`\nNext steps:`)
    console.log(`  1. Review the generated JSON file`)
    console.log(`  2. Run: node scripts/optimize-color-data.js to minify the file`)
    console.log(`  3. Test the API: /api/paint-colors?brand=${brand}&type=${paintType}&line=${qualityLevel}`)
  } catch (error) {
    console.error('\nError during import:', error.message)
    process.exit(1)
  }
}

// Run the import
main()
