#!/usr/bin/env node

/**
 * Color Data Optimization Script
 * 
 * Minifies JSON color data files to reduce file size.
 * Removes whitespace and optionally shortens property names.
 * 
 * Usage:
 *   node scripts/optimize-color-data.js                    # Optimize all files
 *   node scripts/optimize-color-data.js --brand sherwin-williams  # Optimize specific brand
 *   node scripts/optimize-color-data.js --file path/to/file.json  # Optimize specific file
 */

const fs = require('fs')
const path = require('path')

// Parse command line arguments
const args = process.argv.slice(2)
const getArg = (name, defaultValue = null) => {
  const index = args.indexOf(`--${name}`)
  return index !== -1 && args[index + 1] ? args[index + 1] : defaultValue
}

const brandFilter = getArg('brand')
const fileFilter = getArg('file')

const colorsJsonDir = path.join(process.cwd(), 'data', 'colors-json')

/**
 * Minify JSON file
 */
function optimizeJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(content)

    // Minify by removing whitespace
    const minified = JSON.stringify(data)

    // Get original size
    const originalSize = Buffer.byteLength(content, 'utf8')
    const minifiedSize = Buffer.byteLength(minified, 'utf8')
    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1)

    // Write minified version
    fs.writeFileSync(filePath, minified)

    return {
      file: path.relative(process.cwd(), filePath),
      originalSize,
      minifiedSize,
      savings: parseFloat(savings),
    }
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error.message)
    return null
  }
}

/**
 * Find all JSON files to optimize
 */
function findJsonFiles(dir, brandFilter = null) {
  const files = []

  if (!fs.existsSync(dir)) {
    return files
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      // If brand filter is set, only process matching brand
      if (brandFilter && entry.name !== brandFilter) {
        continue
      }
      files.push(...findJsonFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(fullPath)
    }
  }

  return files
}

/**
 * Main optimization function
 */
function main() {
  console.log('\nOptimizing color data files...\n')

  let filesToOptimize = []

  if (fileFilter) {
    // Optimize specific file
    const filePath = path.isAbsolute(fileFilter) ? fileFilter : path.join(process.cwd(), fileFilter)
    if (fs.existsSync(filePath)) {
      filesToOptimize = [filePath]
    } else {
      console.error(`Error: File not found: ${fileFilter}`)
      process.exit(1)
    }
  } else {
    // Find all JSON files
    filesToOptimize = findJsonFiles(colorsJsonDir, brandFilter)
  }

  if (filesToOptimize.length === 0) {
    console.log('No JSON files found to optimize.')
    console.log(`Looking in: ${colorsJsonDir}`)
    process.exit(0)
  }

  console.log(`Found ${filesToOptimize.length} file(s) to optimize\n`)

  let totalOriginalSize = 0
  let totalMinifiedSize = 0
  const results = []

  filesToOptimize.forEach((filePath) => {
    const result = optimizeJsonFile(filePath)
    if (result) {
      results.push(result)
      totalOriginalSize += result.originalSize
      totalMinifiedSize += result.minifiedSize
    }
  })

  // Print results
  console.log('Optimization Results:')
  console.log('─'.repeat(60))
  results.forEach((result) => {
    const sizeDisplay = `${(result.minifiedSize / 1024).toFixed(2)} KB`
    const savingsDisplay = result.savings > 0 ? `(-${result.savings}%)` : ''
    console.log(`${result.file.padEnd(50)} ${sizeDisplay.padStart(10)} ${savingsDisplay}`)
  })
  console.log('─'.repeat(60))
  const totalSavings = ((1 - totalMinifiedSize / totalOriginalSize) * 100).toFixed(1)
  console.log(
    `Total: ${(totalOriginalSize / 1024).toFixed(2)} KB → ${(totalMinifiedSize / 1024).toFixed(2)} KB (${totalSavings}% reduction)`
  )
  console.log(`\n✓ Optimized ${results.length} file(s)`)
}

// Run optimization
main()
