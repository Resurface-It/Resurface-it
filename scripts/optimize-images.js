#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * This script checks image file sizes and provides recommendations for optimization.
 * 
 * Usage:
 *   node scripts/optimize-images.js
 * 
 * For actual compression, use external tools:
 *   - ImageOptim (Mac): https://imageoptim.com/mac
 *   - FileOptimizer (Windows): https://nikkhokkho.sourceforge.net/static.php?page=FileOptimizer
 *   - Squoosh (Web): https://squoosh.app/
 *   - TinyPNG (Web): https://tinypng.com/
 */

const fs = require('fs')
const path = require('path')

const IMAGE_DIR = path.join(__dirname, '..', 'public', 'images')
const MAX_SIZE_KB = {
  logo: 50,
  landing: 200,
  gallery: 150,
  brand: 30,
}

function getFileSizeKB(filePath) {
  const stats = fs.statSync(filePath)
  return Math.round(stats.size / 1024)
}

function getImageType(filename) {
  if (filename.includes('logo')) return 'logo'
  if (filename.includes('landing') || filename.includes('city-') || filename.includes('Home-Landing')) return 'landing'
  if (filename.includes('project-')) return 'gallery'
  if (filename.includes('brand')) return 'brand'
  return 'other'
}

function checkImages() {
  console.log('🔍 Image Optimization Check\n')
  console.log('Scanning images in:', IMAGE_DIR)
  console.log('─'.repeat(60))

  const issues = []
  const optimized = []
  let totalSize = 0
  let totalOptimizedSize = 0

  function scanDirectory(dir, relativePath = '') {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const relativeFilePath = path.join(relativePath, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        scanDirectory(filePath, relativeFilePath)
      } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
        const sizeKB = getFileSizeKB(filePath)
        const imageType = getImageType(file)
        const maxSize = MAX_SIZE_KB[imageType] || 200
        totalSize += sizeKB

        if (sizeKB > maxSize) {
          const reduction = Math.round(((sizeKB - maxSize) / sizeKB) * 100)
          issues.push({
            file: relativeFilePath,
            size: sizeKB,
            maxSize,
            reduction,
            type: imageType,
          })
        } else {
          optimized.push({
            file: relativeFilePath,
            size: sizeKB,
            type: imageType,
          })
          totalOptimizedSize += sizeKB
        }
      }
    }
  }

  scanDirectory(IMAGE_DIR)

  // Report issues
  if (issues.length > 0) {
    console.log('\n❌ Images that need optimization:\n')
    issues
      .sort((a, b) => b.size - a.size)
      .forEach(({ file, size, maxSize, reduction, type }) => {
        console.log(`  ${file}`)
        console.log(`    Current: ${size}KB | Target: <${maxSize}KB | Need: ${reduction}% reduction`)
        console.log(`    Type: ${type}`)
        console.log()
      })
  } else {
    console.log('\n✅ All images are optimized!')
  }

  // Report optimized images
  if (optimized.length > 0 && issues.length > 0) {
    console.log('✅ Already optimized images:', optimized.length)
  }

  // Summary
  console.log('─'.repeat(60))
  console.log('\n📊 Summary:')
  console.log(`  Total images scanned: ${issues.length + optimized.length}`)
  console.log(`  Need optimization: ${issues.length}`)
  console.log(`  Already optimized: ${optimized.length}`)
  console.log(`  Total size: ${totalSize}KB (${(totalSize / 1024).toFixed(2)}MB)`)
  
  if (issues.length > 0) {
    const potentialSavings = issues.reduce((sum, img) => sum + (img.size - img.maxSize), 0)
    console.log(`  Potential savings: ~${potentialSavings}KB (${(potentialSavings / 1024).toFixed(2)}MB)`)
  }

  // Recommendations
  if (issues.length > 0) {
    console.log('\n💡 Recommendations:')
    console.log('  1. Use ImageOptim (Mac) or FileOptimizer (Windows) for batch compression')
    console.log('  2. Use Squoosh.app or TinyPNG for online compression')
    console.log('  3. Convert large JPGs to WebP format for better compression')
    console.log('  4. Convert simple logos to SVG format')
    console.log('  5. Use 75-85% quality for photos, 100% for logos')
  }

  return issues.length === 0
}

// Run the check
if (require.main === module) {
  try {
    const isOptimized = checkImages()
    process.exit(isOptimized ? 0 : 1)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

module.exports = { checkImages }

