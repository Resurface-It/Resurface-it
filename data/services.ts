export interface Service {
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  bullets: string[]
  startingPrice?: string
  featured?: boolean
  icon?: string
  processSteps?: {
    title: string
    description: string
  }[]
  benefits?: string[]
  materials?: string[]
  timeline?: string
  additionalContent?: string[]
  image1?: string
  image2?: string
}

export const services: Service[] = [
  {
    slug: 'siding-replacement',
    name: 'Siding Replacement',
    shortDescription: 'Complete siding replacement with premium materials and expert installation.',
    longDescription: 'Transform your home\'s exterior with our professional siding replacement services. We specialize in Hardie board, vinyl, and fiber cement siding that stands up to Oregon\'s weather. Our expert team ensures proper installation, weatherproofing, and a finish that enhances your home\'s curb appeal and value.',
    bullets: [
      'Hardie board, vinyl, and fiber cement options',
      'Expert installation with proper weatherproofing',
      'Enhanced curb appeal and home value',
      '5-year workmanship warranty included',
    ],
    startingPrice: '$8,500',
    featured: true,
    icon: 'home',
    processSteps: [
      {
        title: 'Initial Consultation & Estimate',
        description: 'We visit your home to assess your current siding condition, discuss your goals, and provide a detailed estimate. We\'ll help you choose the best material for your home\'s style and Oregon\'s climate.',
      },
      {
        title: 'Material Selection & Ordering',
        description: 'Once you approve the estimate, we order premium materials from trusted suppliers. We ensure all materials arrive on schedule and are properly stored until installation begins.',
      },
      {
        title: 'Preparation & Removal',
        description: 'Our team carefully removes old siding, inspects the underlying structure for any issues, and makes necessary repairs. We protect your landscaping and property throughout the process.',
      },
      {
        title: 'Installation & Weatherproofing',
        description: 'Expert craftsmen install your new siding with precision, ensuring proper flashing, caulking, and weatherproofing. Every seam and corner is carefully sealed to protect against Oregon\'s rain and moisture.',
      },
      {
        title: 'Final Inspection & Cleanup',
        description: 'We conduct a thorough walk-through with you to ensure everything meets our high standards. Our team cleans up completely, leaving your property better than we found it.',
      },
    ],
    benefits: [
      'Increased home value and curb appeal',
      'Superior protection against Oregon\'s weather',
      'Lower maintenance requirements',
      'Improved energy efficiency',
      'Long-lasting durability (20+ years)',
      'Fire-resistant options available',
    ],
    materials: [
      'James Hardie fiber cement siding',
      'Premium vinyl siding options',
      'Professional-grade flashing and trim',
      'High-quality caulking and sealants',
      'Weather-resistant fasteners',
    ],
    timeline: 'Most siding replacement projects take 5-10 business days, depending on home size and complexity. We work efficiently while maintaining our commitment to quality craftsmanship.',
    additionalContent: [
      'Oregon\'s climate demands siding that can handle heavy rain, humidity, and temperature fluctuations. Our siding solutions are specifically chosen for their ability to withstand these conditions while maintaining their appearance for decades.',
      'We work with leading manufacturers like James Hardie, known for their ColorPlus Technology that provides fade-resistant color that lasts. This means less maintenance and more time enjoying your beautiful home.',
      'Our installation process follows manufacturer specifications and local building codes. We ensure proper ventilation, moisture barriers, and flashing to protect your home\'s structure from water damage.',
    ],
    image1: '/images/project-1.jpg',
    image2: '/images/project-4.jpg',
  },
  {
    slug: 'exterior-painting',
    name: 'Exterior Painting',
    shortDescription: 'Professional exterior painting that protects and beautifies your home.',
    longDescription: 'Protect and beautify your home with our premium exterior painting services. We use high-quality paints designed for Oregon\'s climate, including proper surface preparation, primer application, and multiple coats for lasting protection. Our attention to detail ensures a flawless finish that withstands rain, sun, and time.',
    bullets: [
      'Premium paints for Oregon weather conditions',
      'Thorough surface prep and primer application',
      'Multiple coats for lasting protection',
      'Color consultation included',
    ],
    startingPrice: '$3,500',
    featured: true,
    icon: 'paintbrush',
    processSteps: [
      {
        title: 'Surface Inspection & Preparation',
        description: 'We thoroughly inspect your home\'s exterior, identifying any areas needing repair. We scrape loose paint, sand rough surfaces, and repair any damaged wood or siding before painting begins.',
      },
      {
        title: 'Power Washing & Cleaning',
        description: 'Your home is power washed to remove dirt, mildew, and chalky residue. This ensures the paint adheres properly and lasts longer. We protect landscaping and windows during this process.',
      },
      {
        title: 'Primer Application',
        description: 'We apply a high-quality primer to all surfaces, especially bare wood and areas with repairs. Primer ensures proper paint adhesion and provides an even base for the finish coats.',
      },
      {
        title: 'Caulking & Sealing',
        description: 'All gaps, cracks, and joints are properly caulked to prevent moisture intrusion. We use premium, paintable caulk that expands and contracts with temperature changes.',
      },
      {
        title: 'Paint Application',
        description: 'We apply two coats of premium exterior paint using professional techniques. Our team ensures even coverage, proper brush and roller work, and attention to detail on trim and edges.',
      },
      {
        title: 'Final Inspection',
        description: 'We conduct a detailed walk-through to ensure every surface is properly painted and protected. Any touch-ups are completed, and we clean up thoroughly.',
      },
    ],
    benefits: [
      'Protection against moisture and UV damage',
      'Enhanced curb appeal and home value',
      'Extended lifespan of your home\'s exterior',
      'Custom color matching to your vision',
      'Professional finish that lasts 7-10 years',
      'Comprehensive warranty coverage',
    ],
    materials: [
      'Sherwin-Williams Duration or similar premium paints',
      'High-quality exterior primers',
      'Professional-grade brushes and rollers',
      'Premium caulking and sealants',
      'Drop cloths and protection materials',
    ],
    timeline: 'Exterior painting typically takes 3-7 business days, depending on home size, weather conditions, and the amount of prep work needed. We schedule around Oregon\'s weather patterns.',
    additionalContent: [
      'Oregon\'s wet winters and sunny summers create unique challenges for exterior paint. We use paints specifically formulated to resist mildew, fade, and cracking in these conditions.',
      'Proper surface preparation is the foundation of a long-lasting paint job. We never skip steps—every surface is properly cleaned, repaired, primed, and sealed before paint application.',
      'Color selection is important for both aesthetics and durability. We offer color consultation to help you choose shades that complement your home while providing maximum protection.',
      'Our two-coat system ensures complete coverage and protection. The first coat provides adhesion and base coverage, while the second coat delivers the final color and maximum durability.',
    ],
    image1: '/images/project-2.jpg',
    image2: '/images/project-5.jpg',
  },
  {
    slug: 'interior-painting',
    name: 'Interior Painting',
    shortDescription: 'Professional interior painting for every room in your home—from kitchens and bathrooms to living rooms and bedrooms.',
    longDescription: 'Transform your home\'s interior with our comprehensive interior painting services. We specialize in painting all interior spaces including living rooms, bedrooms, kitchens, bathrooms, hallways, and more. Our expert team handles everything from color consultation and surface preparation to furniture protection and cleanup. We use premium paints from trusted brands like Sherwin-Williams and Benjamin Moore, with low-VOC and zero-VOC options available for healthier indoor air quality. Whether you need a single room refreshed or your entire home painted, we deliver professional results with minimal disruption to your daily life.',
    bullets: [
      'Complete interior painting for all rooms and spaces',
      'Kitchen and bathroom painting with moisture-resistant finishes',
      'Accent walls and decorative painting techniques',
      'Ceiling painting and trim work included',
      'Low-VOC and zero-VOC paint options available',
      'Furniture and floor protection included',
      'Color consultation and design advice',
      'Clean, efficient process with minimal disruption',
      'Premium paints from Sherwin-Williams and Benjamin Moore',
      'Multiple finish options: flat, eggshell, satin, semi-gloss',
    ],
    startingPrice: '$2,500',
    featured: true,
    icon: 'palette',
    processSteps: [
      {
        title: 'Color Consultation',
        description: 'We help you choose the perfect colors for your space. Our team provides expert advice on color schemes, finishes, and how different colors will look in your lighting conditions.',
      },
      {
        title: 'Room Preparation',
        description: 'We move and protect all furniture, cover floors and fixtures, and remove or protect hardware. Our goal is to keep your belongings safe and minimize disruption to your daily routine.',
      },
      {
        title: 'Surface Preparation',
        description: 'Walls are cleaned, sanded, and patched as needed. We fill nail holes, repair cracks, and ensure surfaces are smooth and ready for paint. All trim and baseboards are taped and protected.',
      },
      {
        title: 'Primer Application',
        description: 'Where needed, we apply primer to ensure proper paint adhesion and coverage. This is especially important for new drywall, patched areas, or dramatic color changes.',
      },
      {
        title: 'Paint Application',
        description: 'We apply paint using professional techniques, starting with cutting in edges and trim, then rolling walls. Multiple coats ensure even coverage and a flawless finish.',
      },
      {
        title: 'Cleanup & Final Touches',
        description: 'We clean up thoroughly, remove all protection materials, and return furniture to its original position. Touch-ups are completed, and we ensure everything is perfect before we leave.',
      },
    ],
    benefits: [
      'Fresh, updated look for your entire home or individual rooms',
      'Increased property value and market appeal',
      'Low-VOC and zero-VOC options for healthier indoor air quality',
      'Professional finish that lasts 5-7 years with proper care',
      'Minimal disruption to your daily life—we work around your schedule',
      'Expert color matching and design advice from experienced professionals',
      'Moisture-resistant finishes for kitchens and bathrooms',
      'Proper surface preparation ensures paint adhesion and longevity',
      'Complete coverage including walls, ceilings, trim, and doors',
      'Accent walls and decorative techniques to add visual interest',
      'Thorough cleanup and furniture protection throughout the project',
    ],
    materials: [
      'Premium interior paints (Sherwin-Williams, Benjamin Moore)',
      'Low-VOC and zero-VOC options available',
      'High-quality brushes and rollers',
      'Professional painter\'s tape',
      'Drop cloths and protection materials',
    ],
    timeline: 'Interior painting projects typically take 2-7 days depending on the number of rooms and complexity. A single room can often be completed in one day, while whole-home projects may take 5-7 days. We work efficiently and communicate our schedule clearly so you know what to expect.',
    additionalContent: [
      'We specialize in painting all interior spaces including living rooms, dining rooms, bedrooms, kitchens, bathrooms, hallways, home offices, and more. Each room type requires specific techniques and finishes—we use moisture-resistant paints in bathrooms and kitchens, durable finishes in high-traffic areas, and the right sheen for each space.',
      'Kitchen painting requires special attention to moisture, grease, and frequent cleaning. We use washable, moisture-resistant paints in satin or semi-gloss finishes that stand up to steam, splashes, and regular cleaning. All surfaces are properly degreased and primed before painting.',
      'Bathroom painting demands moisture-resistant finishes that can handle high humidity. We use premium paints specifically formulated for bathrooms, ensuring proper ventilation during application and using finishes that resist mildew and moisture damage.',
      'Accent walls are a popular way to add visual interest without overwhelming a space. We can create stunning accent walls using bold colors, decorative techniques, or specialty finishes. Our team helps you choose the perfect wall and color to achieve your desired effect.',
      'Ceiling painting is included in our service. We use flat or matte finishes on ceilings to minimize imperfections and reduce glare. Proper lighting and ventilation ensure a smooth, even application.',
      'Trim, baseboards, and doors receive special attention. We use semi-gloss or gloss finishes on these surfaces for durability and easy cleaning. All trim is carefully taped and cut in for crisp, clean lines.',
      'We understand that having painters in your home can be disruptive. That\'s why we work efficiently, communicate clearly about our schedule, and always clean up thoroughly at the end of each day. We protect all furniture and flooring, and you can continue using other areas of your home while we work.',
      'Low-VOC and zero-VOC paints are available for families with children, pets, or anyone sensitive to paint fumes. These paints have minimal odor and are safer for indoor air quality. We ensure proper ventilation during application regardless of paint type.',
      'Proper surface preparation is crucial for a professional finish. We never rush this step—every wall is properly cleaned, sanded, and patched before paint application. We fill nail holes, repair cracks, smooth rough areas, and ensure surfaces are ready for paint.',
      'Color selection can be overwhelming. Our team provides expert guidance to help you choose colors that work with your existing décor, lighting, and personal style. We consider natural light, room size, and how colors flow from room to room throughout your home.',
      'We offer multiple finish options: flat (for ceilings and low-traffic areas), eggshell (subtle sheen, great for most walls), satin (durable, easy to clean), and semi-gloss (for trim, doors, and high-moisture areas). We help you choose the right finish for each surface.',
    ],
    image1: '/images/project-3.jpg',
    image2: '/images/project-6.jpg',
  },
  {
    slug: 'deck-staining',
    name: 'Deck Staining',
    shortDescription: 'Professional deck staining and sealing to protect your outdoor space.',
    longDescription: 'Extend the life of your deck with professional staining and sealing services. We properly prepare surfaces, apply premium stains, and seal against moisture and UV damage. Our process ensures your deck looks beautiful and stays protected through Oregon\'s wet winters and sunny summers.',
    bullets: [
      'Surface preparation and cleaning',
      'Premium stain and sealant application',
      'Protection against moisture and UV damage',
      'Enhanced appearance and longevity',
    ],
    startingPrice: '$1,200',
    featured: false,
    icon: 'square',
    processSteps: [
      {
        title: 'Deck Inspection',
        description: 'We inspect your deck for any loose boards, popped nails, or structural issues that need repair before staining. Safety and structural integrity come first.',
      },
      {
        title: 'Deep Cleaning',
        description: 'Your deck is thoroughly cleaned using appropriate methods—power washing, deck cleaner, and scrubbing to remove dirt, mildew, and old stain. We ensure the surface is completely clean and dry.',
      },
      {
        title: 'Repairs & Sanding',
        description: 'Any damaged boards are repaired or replaced. We sand rough areas and ensure the entire surface is smooth and ready for stain application.',
      },
      {
        title: 'Stain Selection',
        description: 'We help you choose the right stain color and type (transparent, semi-transparent, or solid) based on your deck\'s condition and your aesthetic preferences.',
      },
      {
        title: 'Stain Application',
        description: 'Premium stain is applied using professional techniques, ensuring even coverage. We work in sections and follow the wood grain for a natural, beautiful finish.',
      },
      {
        title: 'Sealant Application',
        description: 'A protective sealant is applied to lock in the stain and provide additional protection against moisture, UV rays, and wear. This extends the life of your deck significantly.',
      },
    ],
    benefits: [
      'Extended deck lifespan (3-5 years between treatments)',
      'Protection against moisture and rot',
      'UV protection to prevent fading and graying',
      'Enhanced natural wood beauty',
      'Increased home value',
      'Reduced maintenance requirements',
    ],
    materials: [
      'Premium deck stains (Cabot, Ready Seal, or similar)',
      'High-quality deck sealants',
      'Professional deck cleaners',
      'Power washing equipment',
      'Sandpaper and repair materials',
    ],
    timeline: 'Deck staining typically takes 2-4 days, including cleaning, drying time, and stain application. Weather conditions can affect the timeline.',
    additionalContent: [
      'Oregon\'s wet winters and sunny summers are particularly hard on decks. Regular staining and sealing protect your investment and keep your deck looking beautiful year after year.',
      'Proper surface preparation is essential for stain adhesion and longevity. We never skip the cleaning and preparation steps—they\'re the foundation of a long-lasting finish.',
      'The type of stain you choose depends on your deck\'s age and condition. Newer decks can use transparent stains to show wood grain, while older decks may benefit from semi-transparent or solid stains.',
      'Timing is important for deck staining. We schedule projects during dry weather periods to ensure proper drying and curing of the stain and sealant.',
    ],
    image1: '/images/project-1.jpg',
    image2: '/images/project-7.jpg',
  },
  {
    slug: 'pressure-washing',
    name: 'Pressure Washing',
    shortDescription: 'Professional pressure washing for siding, decks, driveways, and more.',
    longDescription: 'Restore your home\'s exterior with our professional pressure washing services. We safely clean siding, decks, driveways, patios, and walkways using the right pressure and cleaning solutions for each surface. Our service removes dirt, mildew, and stains to reveal a like-new appearance.',
    bullets: [
      'Safe cleaning for all exterior surfaces',
      'Removes dirt, mildew, and stains',
      'Prepares surfaces for painting or staining',
      'Eco-friendly cleaning solutions available',
    ],
    startingPrice: '$350',
    featured: false,
    icon: 'droplet',
    processSteps: [
      {
        title: 'Surface Assessment',
        description: 'We inspect all surfaces to be cleaned, identifying the appropriate pressure levels and cleaning solutions needed for each material type.',
      },
      {
        title: 'Preparation & Protection',
        description: 'We protect landscaping, windows, and delicate surfaces. Outdoor furniture and items are moved or covered to prevent damage from cleaning solutions.',
      },
      {
        title: 'Pre-Treatment',
        description: 'Where needed, we apply appropriate cleaning solutions to break down dirt, mildew, and stains. This makes the pressure washing more effective and reduces the pressure needed.',
      },
      {
        title: 'Pressure Washing',
        description: 'We use professional-grade equipment with adjustable pressure settings. Each surface is cleaned with the appropriate pressure—gentle for siding, stronger for concrete—to avoid damage.',
      },
      {
        title: 'Rinsing & Final Cleanup',
        description: 'All surfaces are thoroughly rinsed to remove cleaning solutions and debris. We ensure no residue is left behind and everything is clean and ready.',
      },
    ],
    benefits: [
      'Restored appearance to like-new condition',
      'Removal of harmful mildew and algae',
      'Preparation for painting or staining projects',
      'Increased curb appeal and home value',
      'Prevention of surface deterioration',
      'Eco-friendly cleaning options available',
    ],
    materials: [
      'Professional-grade pressure washers',
      'Eco-friendly cleaning solutions',
      'Surface-specific cleaning agents',
      'Protection materials for landscaping',
      'Extension wands and specialized nozzles',
    ],
    timeline: 'Most pressure washing projects are completed in 1-2 days, depending on the size of the area and number of surfaces to be cleaned.',
    additionalContent: [
      'Different surfaces require different pressure levels and techniques. We use the right approach for each material—gentle pressure for siding and wood, stronger pressure for concrete and brick.',
      'Regular pressure washing prevents the buildup of dirt, mildew, and algae that can damage surfaces over time. It\'s an important part of home maintenance, especially in Oregon\'s humid climate.',
      'If you\'re planning to paint or stain, pressure washing is an essential first step. It removes all dirt and debris, ensuring proper adhesion of paint or stain.',
      'Our eco-friendly cleaning solutions are safe for your family, pets, and landscaping while still being highly effective at removing stains and buildup.',
    ],
    image1: '/images/project-2.jpg',
    image2: '/images/project-7.jpg',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getFeaturedServices(): Service[] {
  return services.filter((service) => service.featured)
}

