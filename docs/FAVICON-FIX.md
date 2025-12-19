# Favicon Configuration Fix

## Issue
The favicon was showing a beach image instead of the Resurface-it logo. This was because:
1. The `favicon.ico` file was a placeholder or incorrect image
2. The code was prioritizing `favicon.ico` over the correct logo

## Changes Made

### 1. Updated `app/layout.tsx`
- **Removed** the `/favicon.ico` reference from the primary icon list
- **Prioritized** `/logo.png` as the primary favicon
- **Removed** the `<link rel="icon" href="/favicon.ico" />` from the head section
- **Reordered** favicon links to prioritize logo.png first

### 2. Updated `public/site.webmanifest`
- Changed all icon references to use `/logo.png` instead of separate favicon files
- This ensures the manifest uses the correct logo

## Next Steps Required

The following favicon files in `/public/` should be regenerated from `logo.png` to ensure consistency across all browsers and devices:

1. **favicon-16x16.png** - 16x16 pixels
2. **favicon-32x32.png** - 32x32 pixels  
3. **favicon-192x192.png** - 192x192 pixels
4. **favicon-512x512.png** - 512x512 pixels
5. **apple-touch-icon.png** - 180x180 pixels (for iOS)
6. **favicon.ico** - Traditional ICO format (16x16, 32x32, 48x48 sizes)

### How to Generate Favicons

You can use one of these methods:

1. **Online Tool**: Use [RealFaviconGenerator](https://realfavicongenerator.net/) or [Favicon.io](https://favicon.io/)
   - Upload `logo.png`
   - Generate all required sizes
   - Download and replace files in `/public/`

2. **Image Editor**: Use Photoshop, GIMP, or similar
   - Open `logo.png`
   - Resize to each required size
   - Export as PNG (or ICO for favicon.ico)
   - Save to `/public/` with correct filenames

3. **Command Line** (if ImageMagick is installed):
   ```bash
   # Generate PNG favicons
   convert logo.png -resize 16x16 favicon-16x16.png
   convert logo.png -resize 32x32 favicon-32x32.png
   convert logo.png -resize 192x192 favicon-192x192.png
   convert logo.png -resize 512x512 favicon-512x512.png
   convert logo.png -resize 180x180 apple-touch-icon.png
   
   # Generate ICO file (requires multiple sizes)
   convert logo.png -define icon:auto-resize=16,32,48 favicon.ico
   ```

## Current Configuration

The site now uses `/logo.png` as the primary favicon. Browsers will:
1. First try to use `/logo.png` (which is correct)
2. Fall back to the sized PNG files if needed
3. Use the manifest icons for PWA installations

## Testing

After regenerating the favicon files:
1. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
3. Check the browser tab - should show the Resurface-it logo
4. Check browser bookmarks - should show the logo
5. Test on mobile devices - should show correct icon when saved to home screen

## Notes

- The `favicon.ico` file is still referenced in some places for legacy browser support, but it's no longer the primary favicon
- Modern browsers will use the PNG files or logo.png
- The logo.png file should be the source of truth for all favicon generation

