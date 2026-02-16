# SEO Plan: Top 3 for "Painters Near Me" and "Siding Contractor" in Willamette Valley

This plan extends the existing Painters Near Me strategy to **also** target **top 3 for "Siding Contractor"** (in the Willamette Valley). Implement both strands in parallel where possible.

**Canonical city URLs:** The single canonical URL for each city is `/locations/[city]-or` (e.g. `/locations/eugene-or`). Legacy URLs `/eugene-or`, `/eugene`, and city+service paths like `/eugene-or/interior-painting` redirect (301) to the canonical city page. The sitemap lists only canonical city URLs. Use `/locations/[city]-or` for all internal links to city pages.

---

## Part A: Painters Near Me (unchanged summary)

- **On-page**: Homepage metadata override (title/description with "Painters Near Me" and "Willamette Valley"); add painters + Willamette Valley keywords to layout and company.
- **Dedicated page**: New `/painters-willamette-valley` (or similar) with H1, body, FAQs, schema, sitemap, internal links from areas-we-serve, locations, footer, city pages.
- **Schema**: LocalBusiness/Service — add "Willamette Valley, OR" to `areaServed`; description that leads with painting in Willamette Valley where used for painter-focused entry points.
- **Homepage**: One FAQ and hero/subhead tweak for "painters" + "Willamette Valley."
- **Service pages**: Interior/exterior painting meta + schema include "Willamette Valley."
- **GMB**: Primary or secondary category "Painter" / "House painter"; service area and description emphasize painting + Willamette Valley; encourage reviews that mention painting.

---

## Part B: Siding Contractor — Top 3 in Willamette Valley

### Current state

- Layout default title is **"Siding Replacement & Painting Eugene OR"** — already siding-forward.
- Keywords include **"siding contractors Eugene"**, **"siding replacement Albany OR"**, **"siding contractors Springfield OR"** but not **"siding contractor"** or **"Willamette Valley siding contractor"**.
- City pages use **"Siding Replacement & Painting in [City] OR"** and **"Licensed Siding Contractors & Painters"** (Corvallis).
- [app/services/[slug]/page.tsx](app/services/[slug]/page.tsx): `siding-replacement` has strong local meta; no "siding contractor" or "Willamette Valley" in title/description.
- [lib/jsonld.ts](lib/jsonld.ts): LocalBusiness has `serviceType: ['Siding Replacement', ...]` and `@type` includes `GeneralContractor`; no explicit "Willamette Valley" in `areaServed` or description.

### B1. On-page and meta (Siding Contractor)

**Goal**: Make the site clearly about "siding contractor" and "Willamette Valley" for that query.

- **Homepage metadata** (when you add the override in Part A): Ensure the **default** or **alternate** title/description used for the homepage (or a dedicated siding entry) includes **"Siding Contractor"** and **"Willamette Valley"** where it makes sense. Options:
  - Single homepage title that balances both intents, e.g.  
    `Siding Contractors & Painters Near Me | Willamette Valley | Resurface-It`  
  - Or keep one primary title and add "siding contractor" and "Willamette Valley" prominently in the **description** and **keywords** so both queries are supported.
- **Layout keywords** [app/layout.tsx](app/layout.tsx): Add:
  - `siding contractor`, `siding contractor Eugene OR`, `Willamette Valley siding contractor`, `siding contractors Albany`, `siding contractors Corvallis`, `siding contractors Springfield OR`.
- **Company** [data/company.ts](data/company.ts): Add the same siding contractor + Willamette Valley phrases to `localKeywords`.

### B2. Dedicated "Siding Contractor" landing page (recommended)

**Goal**: One clear URL that targets "siding contractor" and "Willamette Valley siding contractor" with focused content and internal links.

- **New page**: e.g. `/siding-contractor-willamette-valley` or `/siding-contractor` (or `/siding` if it fits IA).
- **Content**:
  - **H1**: e.g. "Siding Contractor Near Me | Willamette Valley" or "Willamette Valley Siding Contractors | Hardie, Vinyl & Fiber Cement."
  - **Body**: 2–3 sections: service area (Eugene, Albany, Corvallis, Springfield + "throughout the Willamette Valley"), types of siding (Hardie, vinyl, fiber cement), why choose a local siding contractor, 5-year warranty, free estimate.
  - **FAQ block**: 3–5 FAQs (e.g. "Where do you offer siding contractor services?", "What siding materials do you install in the Willamette Valley?", "How do I get a quote from a siding contractor near me?"). Add **FAQPage schema** on this page.
  - **CTAs**: Free estimate, phone, links to `/services/siding-replacement`, city pages, and (optional) James Hardie / cedar / rot-repair sub-pages.
- **Metadata**: Title and description focused on "siding contractor" and "Willamette Valley siding contractor"; path set to the new URL.
- **Schema**: LocalBusiness and BreadcrumbList (and FAQPage). Reuse [lib/jsonld.ts](lib/jsonld.ts) helpers.
- **Sitemap** [lib/sitemap.ts](lib/sitemap.ts): Add this URL with high priority (e.g. 0.9).
- **Internal linking**: Add links from [app/areas-we-serve/page.tsx](app/areas-we-serve/page.tsx), [app/locations/page.tsx](app/locations/page.tsx), [components/SiteFooter.tsx](components/SiteFooter.tsx), and city pages with anchor text like "siding contractor in the Willamette Valley" or "siding contractors near me."

### B3. Structured data (Siding Contractor)

**Goal**: Reinforce "siding contractor" and "Willamette Valley" in schema.

- **[lib/jsonld.ts](lib/jsonld.ts) – LocalBusiness** (shared with Part A):
  - **areaServed**: Add **"Willamette Valley, OR"** (and optionally county-level) in addition to city list. This helps both painters and siding contractor queries.
  - **description**: In the same shared description, or in a variant used on siding-heavy pages, explicitly mention **"siding contractor"** and **"Willamette Valley"** (e.g. "Professional siding contractors and house painters serving the Willamette Valley…").
- **Service schema** for siding: For the siding-replacement service page, ensure **areaServed** in the Service schema includes **"Willamette Valley, OR"** (e.g. in [lib/jsonld.ts](lib/jsonld.ts) `generateServiceSchema` or where service-specific areaServed is set).
- **@type**: LocalBusiness already has `HomeAndConstructionBusiness` and `GeneralContractor`; no need to add a new type. Keeping **Siding Replacement** in **serviceType** is sufficient.

### B4. Siding replacement service page

**Goal**: Align the main siding URL with "siding contractor" and "Willamette Valley."

- **[app/services/[slug]/page.tsx](app/services/[slug]/page.tsx)** for `siding-replacement`:
  - **Title**: Include "Siding Contractor" and/or "Willamette Valley," e.g.  
    `Siding Contractor in Willamette Valley | Eugene, Albany, Corvallis, Springfield`  
    or  
    `Siding Replacement & Siding Contractors | Willamette Valley OR | Resurface-It`.
  - **Description**: Lead with siding contractor + Willamette Valley, then cities and warranty (e.g. "Licensed siding contractors in the Willamette Valley. Hardie board, vinyl & fiber cement in Eugene, Albany, Corvallis, Springfield. 5-year warranty. Free estimate.").
- **Service schema** for this page: Include "Willamette Valley, OR" in `areaServed` (see B3).

### B5. Homepage content (Siding Contractor)

**Goal**: Support "siding contractor" and "Willamette Valley" on the homepage.

- **Hero / H1**: Current H1 is "Residential & Commercial Painting and Siding Experts Serving the Willamette Valley." Optional: add a subline that explicitly says "siding contractors" and "painters" (e.g. "Your local siding contractors and painters in the Willamette Valley.").
- **FAQ** [app/page.tsx](app/page.tsx): Add one FAQ that includes "siding contractor" or "Willamette Valley siding contractor," e.g. "Where can I find a siding contractor near me in the Willamette Valley?" with an answer naming cities and linking to the new siding contractor page and `/services/siding-replacement`. Keep existing FAQ schema.
- **Service areas section**: Optionally add a line like "Need a siding contractor? We serve Eugene, Albany, Corvallis, Springfield and the wider Willamette Valley" with a link to the siding contractor page.

### B6. Off-site and GMB (Siding Contractor)

**Goal**: Local pack and "siding contractor near me" depend heavily on GMB.

- **Google Business Profile**:
  - **Categories**: Set **"Siding contractor"** as primary or secondary (alongside Painter if you want both). Ensure service area covers all Willamette Valley cities.
  - **Description**: Include "siding contractor," "siding replacement," "Hardie board, vinyl, fiber cement," and "Willamette Valley" (and cities). Align with the new siding contractor page and service page copy.
  - **Services**: List "Siding installation," "Siding replacement," "James Hardie siding," etc. with short descriptions.
  - **Posts**: Periodically post about siding projects, materials, or offers in the Willamette Valley.
- **Reviews**: Encourage Google reviews that mention "siding" and location (e.g. "replaced our siding in Eugene").
- **Citations**: NAP consistent everywhere; directories that allow categories should include "Siding contractor" where applicable.

---

## Combined implementation order

1. **Shared (both intents)**  
   - Layout + company keywords: add **painters near me**, **Willamette Valley painters**, **siding contractor**, **Willamette Valley siding contractor**, and city variants.  
   - LocalBusiness schema: add **"Willamette Valley, OR"** to `areaServed`; description that mentions both **siding contractors** and **painters** in the Willamette Valley.  
   - Homepage metadata override: one title/description that supports both "Painters Near Me" and "Siding Contractor" in the Willamette Valley (or two variants if you use separate entry pages).  
   - Homepage FAQs: one FAQ for painters, one for siding contractor; internal links to new pages.

2. **Painters**  
   - New `/painters-willamette-valley` page (content, meta, FAQ schema, sitemap, internal links).  
   - Painting service pages: meta + Service schema `areaServed` include "Willamette Valley."  
   - GMB: Painter category, description, services, reviews.

3. **Siding Contractor**  
   - New `/siding-contractor-willamette-valley` page (content, meta, FAQ schema, sitemap, internal links).  
   - Siding-replacement service page: meta + Service schema include "Siding Contractor" and "Willamette Valley."  
   - GMB: Siding contractor category, description, services, reviews.

4. **Optional**  
   - Blog/resource for "best painters Willamette Valley" and/or "how to choose a siding contractor Willamette Valley."  
   - Hero/subhead tweaks on homepage for both intents.

---

## Files to touch (combined)

| Area | Files |
|------|--------|
| Homepage meta + FAQs | [app/page.tsx](app/page.tsx) |
| Root keywords | [app/layout.tsx](app/layout.tsx) |
| Company keywords | [data/company.ts](data/company.ts) |
| Schema (LocalBusiness, Service areaServed) | [lib/jsonld.ts](lib/jsonld.ts) |
| New painters page | e.g. `app/painters-willamette-valley/page.tsx` |
| New siding contractor page | e.g. `app/siding-contractor-willamette-valley/page.tsx` |
| Sitemap | [lib/sitemap.ts](lib/sitemap.ts) |
| Internal links | [app/areas-we-serve/page.tsx](app/areas-we-serve/page.tsx), [app/locations/page.tsx](app/locations/page.tsx), [components/SiteFooter.tsx](components/SiteFooter.tsx), city pages |
| Painting service meta/schema | [app/services/[slug]/page.tsx](app/services/[slug]/page.tsx) (interior-painting, exterior-painting) |
| Siding service meta/schema | [app/services/[slug]/page.tsx](app/services/[slug]/page.tsx) (siding-replacement) + [lib/jsonld.ts](lib/jsonld.ts) if service-level areaServed is parameterized |

---

This gives you one plan to rank top 3 for both **"Painters Near Me"** and **"Siding Contractor"** in the Willamette Valley, with shared schema and keywords and separate landing pages + GMB focus for each intent.
