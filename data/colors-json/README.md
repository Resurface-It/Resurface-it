# Paint Color Data Files

This directory contains JSON files with paint color data organized by brand, paint type, and quality level.

## Directory Structure

```
colors-json/
  {brand}/
    {paintType}/
      {qualityLevel}.json
```

Example:
```
colors-json/
  sherwin-williams/
    interior/
      good.json
      better.json
      best.json
      premium.json
    exterior/
      ...
```

## JSON File Format

Each JSON file follows this structure:

```json
{
  "meta": {
    "brand": "sherwin-williams",
    "paintType": "interior",
    "qualityLevel": "premium",
    "totalColors": 150,
    "lastUpdated": "2024-01-12"
  },
  "colors": [
    {
      "id": "sw-int-prem-001",
      "name": "Pure White",
      "hex": "#FFFFFF",
      "rgb": { "r": 255, "g": 255, "b": 255 },
      "code": "SW 7005",
      "family": "neutrals"
    }
  ]
}
```

## Color Object Properties

- **id**: Unique identifier (format: `{brand}-{type}-{level}-{number}`)
- **name**: Color name (e.g., "Pure White")
- **hex**: Hex color code (e.g., "#FFFFFF")
- **rgb**: RGB values (optional, can be calculated from hex)
- **code**: Brand color code (e.g., "SW 7005")
- **family**: Color family (e.g., "neutrals", "blues", "reds")

## Importing Color Data

Use the import script to add color data:

```bash
# From JSON file
node scripts/import-paint-colors.js --brand sherwin-williams --type interior --level premium --source file --input path/to/colors.json

# From CSV file
node scripts/import-paint-colors.js --brand benjamin-moore --type exterior --level best --source csv --input path/to/colors.csv
```

## Optimizing Files

After importing, optimize JSON files to reduce size:

```bash
# Optimize all files
node scripts/optimize-color-data.js

# Optimize specific brand
node scripts/optimize-color-data.js --brand sherwin-williams

# Optimize specific file
node scripts/optimize-color-data.js --file data/colors-json/sherwin-williams/interior/premium.json
```

## File Size Guidelines

- Target: < 100KB per file (uncompressed)
- With 50 colors per page and pagination, files can be larger
- Use optimization script to minify JSON
- Next.js automatically compresses responses with gzip

## Git Strategy

**Option 1: Commit JSON files** (Recommended for small datasets)
- Color data is version controlled
- Easy to track changes
- Works well if total data < 5MB

**Option 2: Git ignore** (Recommended for large datasets)
- Add `data/colors-json/` to `.gitignore`
- Use CI/CD to generate files
- Or store in separate data repository

## API Usage

Colors are served via the API route:

```
GET /api/paint-colors?brand={brand}&type={type}&line={level}&page={page}&limit={limit}
```

Example:
```
GET /api/paint-colors?brand=sherwin-williams&type=interior&line=premium&page=1&limit=50
```

Response:
```json
{
  "colors": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "totalPages": 3,
    "hasMore": true
  }
}
```
