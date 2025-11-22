# Image Compression Guide

This guide provides step-by-step instructions for compressing images to improve website performance.

## Quick Start

1. **Check current image sizes**: Run `npm run check-images`
2. **Compress images** using one of the tools below
3. **Replace** compressed images in `/public/images/`
4. **Verify** with `npm run check-images` again

## Compression Tools

### Option 1: ImageOptim (Mac) - Recommended
**Best for**: Batch processing, lossless compression

1. Download from: https://imageoptim.com/mac
2. Drag and drop the `/public/images` folder
3. ImageOptim will automatically compress all images
4. Original files are replaced with optimized versions

**Pros**: 
- Free and open source
- Lossless compression
- Batch processing
- Automatic optimization

### Option 2: FileOptimizer (Windows) - Recommended
**Best for**: Windows users, batch processing

1. Download from: https://nikkhokkho.sourceforge.net/static.php?page=FileOptimizer
2. Add the `/public/images` folder
3. Click "Optimize All"
4. Review changes and save

**Pros**:
- Free and open source
- Supports many formats
- Batch processing
- Windows native

### Option 3: Squoosh (Web) - Best for Testing
**Best for**: Testing compression settings, single images

1. Visit: https://squoosh.app/
2. Upload an image
3. Compare different formats and quality settings
4. Download optimized version

**Pros**:
- Free, no installation
- Visual comparison
- Multiple format support
- Quality slider

### Option 4: TinyPNG / TinyJPG (Web)
**Best for**: Quick compression, JPG/PNG only

1. Visit: https://tinypng.com/ or https://tinyjpg.com/
2. Upload images (up to 20 at a time)
3. Download compressed versions
4. Replace original files

**Pros**:
- Free (with limits)
- Easy to use
- Good compression ratios
- No installation

## Compression Targets

### Logos
- **Target**: < 50KB
- **Format**: SVG (preferred) or PNG
- **Quality**: 100% (lossless)
- **Tool**: ImageOptim or convert to SVG

### Landing Page Images
- **Target**: < 200KB
- **Format**: WebP or JPG
- **Quality**: 80-85%
- **Tool**: ImageOptim + WebP conversion

### Gallery Images
- **Target**: < 150KB
- **Format**: WebP or JPG
- **Quality**: 75-80%
- **Tool**: ImageOptim or Squoosh

### Brand Logos
- **Target**: < 30KB
- **Format**: PNG or WebP
- **Quality**: 100% (lossless) or 90%+
- **Tool**: ImageOptim

## Step-by-Step Process

### 1. Audit Current Images
```bash
npm run check-images
```

This will show you which images need optimization and by how much.

### 2. Compress Images

#### Using ImageOptim (Mac):
1. Open ImageOptim
2. Drag `/public/images` folder into ImageOptim
3. Wait for compression to complete
4. Check file sizes

#### Using FileOptimizer (Windows):
1. Open FileOptimizer
2. File → Add Files → Select all images in `/public/images`
3. Click "Optimize All"
4. Review and save

#### Using Online Tools:
1. For each large image:
   - Upload to Squoosh or TinyPNG
   - Adjust quality settings
   - Download optimized version
   - Replace original file

### 3. Convert to WebP (Optional but Recommended)

WebP provides 25-35% better compression than JPG:

#### Using Squoosh:
1. Upload JPG/PNG image
2. Select "WebP" format
3. Adjust quality (75-85% for photos)
4. Download and replace original

#### Using Command Line (if you have imagemagick):
```bash
# Convert single image
magick input.jpg -quality 85 output.webp

# Batch convert (requires imagemagick)
find public/images -name "*.jpg" -exec magick {} -quality 85 {}.webp \;
```

**Note**: If converting to WebP, update image references in code to use `.webp` extension.

### 4. Verify Compression
```bash
npm run check-images
```

All images should now be under their target sizes.

## Specific Image Instructions

### Resurface-it-white-logo.png (1.5MB → < 50KB)

**Critical Priority**: This is the largest file and should be addressed first.

**Options**:
1. **Convert to SVG** (if logo is simple):
   - Open in vector editor (Illustrator, Inkscape)
   - Export as SVG
   - Should be < 10KB

2. **Compress PNG**:
   - Use ImageOptim (Mac) or FileOptimizer (Windows)
   - Target: < 50KB
   - If still too large, reduce dimensions or use PNG-8

3. **Use WebP**:
   - Convert to WebP with 90% quality
   - Update code to use `.webp` extension

### Landing Page Images

**Files**: 
- `Home-Landing.jpg` (695KB)
- `Springfield-landing.jpg` (747KB)
- `Eugene-landing.jpeg` (654KB)
- `Albany-Landing.jpg` (597KB)
- `Corvallis-landing.webp` (1224KB - needs re-compression)

**Process**:
1. Compress with ImageOptim/FileOptimizer
2. If still > 200KB, reduce quality to 80-85%
3. Consider converting to WebP
4. Target: < 200KB each

### Project Gallery Images

**Files**: `project-1.jpg` through `project-8.jpg`

**Process**:
1. Batch compress with ImageOptim/FileOptimizer
2. Quality: 75-80% is acceptable for gallery
3. Target: < 150KB each

## Quality Guidelines

| Image Type | Quality | Format | Notes |
|-----------|---------|--------|-------|
| Logos | 100% | SVG/PNG | Lossless required |
| Hero images | 80-85% | WebP/JPG | Above fold, balance quality/size |
| Gallery | 75-80% | WebP/JPG | Below fold, can be more aggressive |
| Thumbnails | 70-75% | WebP/JPG | Small images, prioritize size |

## Troubleshooting

### Image still too large after compression
- Reduce dimensions (resize image)
- Lower quality setting
- Convert to WebP format
- Use PNG-8 for simple images

### Quality looks poor
- Increase quality setting (try 85% instead of 75%)
- Use lossless compression for logos
- Check if image dimensions are appropriate

### WebP not displaying
- Ensure Next.js Image component is used (handles WebP automatically)
- Check browser support (all modern browsers support WebP)
- Keep original JPG as fallback

## Verification Checklist

- [ ] All images under target sizes
- [ ] Logo < 50KB
- [ ] Landing images < 200KB
- [ ] Gallery images < 150KB
- [ ] Brand logos < 30KB
- [ ] Run `npm run check-images` - no issues
- [ ] Test website - images load correctly
- [ ] Check Lighthouse score improvement

## Expected Results

After compression:
- **Total size reduction**: ~3.5MB → ~1MB (71% reduction)
- **Page load improvement**: 30-50% faster
- **Lighthouse score**: +5-10 points
- **Mobile performance**: Significant improvement

## Additional Resources

- [WebP Guide](https://developers.google.com/speed/webp)
- [Image Optimization Best Practices](https://web.dev/fast/#optimize-your-images)
- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)

