# Image File Audit Report

Generated: $(date)

## Summary
This document provides a comprehensive audit of all image files in the project, including current file sizes, formats, and optimization recommendations.

## Image Files by Size

### Critical Priority (Requires Immediate Compression)
These files are significantly larger than recommended and should be compressed immediately:

| File | Current Size | Target Size | Reduction Needed | Format | Priority |
|------|-------------|--------------|-------------------|--------|----------|
| `Resurface-it-white-logo.png` | 1.5MB | < 50KB | 97% | PNG | CRITICAL |
| `Springfield-landing.jpg` | 747KB | < 200KB | 73% | JPG | HIGH |
| `Home-Landing.jpg` | 695KB | < 200KB | 71% | JPG | HIGH |
| `Eugene-landing.jpeg` | 654KB | < 200KB | 69% | JPEG | HIGH |
| `Albany-Landing.jpg` | 597KB | < 200KB | 67% | JPG | HIGH |

### High Priority (Should be Compressed)
| File | Current Size | Target Size | Reduction Needed | Format | Priority |
|------|-------------|--------------|-------------------|--------|----------|
| `project-5.jpg` | 388KB | < 200KB | 48% | JPG | MEDIUM |
| `project-7.jpg` | 363KB | < 200KB | 45% | JPG | MEDIUM |
| `project-2.jpg` | 239KB | < 150KB | 37% | JPG | MEDIUM |
| `project-4.jpg` | 231KB | < 150KB | 35% | JPG | MEDIUM |
| `project-6.jpg` | 187KB | < 150KB | 20% | JPG | LOW |
| `project-1.jpg` | 167KB | < 150KB | 10% | JPG | LOW |
| `project-3.jpg` | 147KB | < 120KB | 18% | JPG | LOW |

### Needs Attention
| File | Current Size | Target Size | Reduction Needed | Format | Priority |
|------|-------------|--------------|-------------------|--------|----------|
| `Corvallis-landing.webp` | 1224KB | < 200KB | 84% | WebP | HIGH |
| `Albany-Landing.webp` | 111KB | < 100KB | 10% | WebP | LOW |

### Already Optimized (Good)
| File | Current Size | Status | Format | Notes |
|------|-------------|--------|--------|-------|
| `Sherwin-Williams-Logo.webp` | 9KB | ✅ Good | WebP | Already optimized |
| `behr-paint-logo.png` | 9.7KB | ✅ Good | PNG | Small logo, acceptable |
| `B-M-logo.png` | 14KB | ✅ Good | PNG | Small logo, acceptable |
| `Hardie-logo.png` | 18KB | ✅ Good | PNG | Small logo, acceptable |
| `truwood-logo.jpg` | 59KB | ⚠️ Could improve | JPG | Could convert to WebP |

### Missing/Empty Files
These files are referenced in code but appear to be empty or missing:
- `city-albany.jpg` (0 bytes)
- `city-corvallis.jpg` (0 bytes)
- `city-eugene.jpg` (0 bytes)
- `city-springfield.jpg` (0 bytes)
- `og-image.jpg` (0 bytes) — **Required for SEO/social:** Add a 1200×630px image at `public/og-image.jpg` for Open Graph and Twitter cards. Use a branded image with logo and tagline. Referenced by `lib/seo.ts` and used for all pages that do not pass a custom `image`.
- `hero-home.jpg` (0 bytes)

## Optimization Recommendations

### 1. Logo File (CRITICAL)
**File**: `Resurface-it-white-logo.png` (1.5MB)
- **Action**: Convert to SVG if possible, or compress PNG to < 50KB
- **Tools**: 
  - Try SVG conversion first (if logo is simple)
  - Use ImageOptim or TinyPNG for PNG compression
  - Target: 50KB or less (97% reduction)

### 2. Landing Page Images (HIGH)
**Files**: All city landing images and home landing
- **Action**: Compress to < 200KB each
- **Tools**: ImageOptim, FileOptimizer, or Squoosh
- **Format**: Consider converting to WebP for better compression
- **Quality**: Can reduce to 80-85% quality for background images

### 3. Project Gallery Images (MEDIUM)
**Files**: project-1.jpg through project-8.jpg
- **Action**: Compress to < 150KB each (or < 200KB for largest)
- **Tools**: ImageOptim, FileOptimizer, or online tools
- **Quality**: 75-80% is acceptable for gallery images
- **Format**: Consider WebP conversion for better compression

### 4. Brand Logos (LOW)
**Files**: Brand logo images in `/images/brands/`
- **Action**: Convert JPG logos to WebP or PNG
- **Status**: Most are already well-optimized

## Compression Tools & Methods

### Recommended Tools:
1. **ImageOptim** (Mac) - Free, drag-and-drop compression
2. **FileOptimizer** (Windows) - Free, batch processing
3. **Squoosh** (Web) - Google's online tool, great for testing
4. **TinyPNG/TinyJPG** (Web) - Popular online tool
5. **Optimizilla** (Web) - Easy-to-use online tool

### Compression Strategy:
1. **Lossless first**: Try lossless compression (ImageOptim)
2. **Lossy if needed**: Use 80-85% quality for photos
3. **Format conversion**: Convert JPG to WebP for better compression
4. **SVG for logos**: Convert simple logos to SVG when possible

## File Size Targets

| Image Type | Target Size | Quality | Format |
|-----------|-------------|---------|--------|
| Logos | < 50KB | Lossless or 100% | SVG or PNG |
| Hero/Landing Images | < 200KB | 80-85% | WebP or JPG |
| Gallery Images | < 150KB | 75-80% | WebP or JPG |
| Thumbnails | < 50KB | 70-75% | WebP or JPG |
| Brand Logos | < 30KB | Lossless | PNG or WebP |

## Expected Impact

After optimization:
- **Total image size reduction**: ~3.5MB → ~1MB (71% reduction)
- **Page load improvement**: 30-50% faster initial load
- **Bandwidth savings**: Significant for mobile users
- **Lighthouse score**: +5-10 points improvement expected

## Next Steps

1. ✅ Complete image audit (this document)
2. ⏳ Compress all images using recommended tools
3. ⏳ Convert logo to SVG or optimized PNG
4. ⏳ Replace compressed images in `/public/images/`
5. ⏳ Test page load performance
6. ⏳ Update this document with final sizes

