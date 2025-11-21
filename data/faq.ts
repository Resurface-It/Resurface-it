export interface FAQ {
  question: string
  answer: string
  category: 'siding' | 'exterior-painting' | 'interior-painting' | 'warranty' | 'scheduling'
}

export const faqs: FAQ[] = [
  // Siding FAQs
  {
    question: 'How long does siding replacement take?',
    answer: 'Most siding replacement projects take 5-10 business days, depending on the size of your home and weather conditions. We\'ll provide a detailed timeline during your free estimate.',
    category: 'siding',
  },
  {
    question: 'What types of siding do you install?',
    answer: 'We specialize in Hardie board (fiber cement), vinyl, and fiber cement siding. Each has unique benefits, and we\'ll help you choose the best option for your home, budget, and style preferences.',
    category: 'siding',
  },
  {
    question: 'Will you remove the old siding?',
    answer: 'Yes, we remove all old siding and inspect the underlying structure. We make any necessary repairs before installing new siding to ensure a solid foundation.',
    category: 'siding',
  },
  {
    question: 'How much does siding replacement cost?',
    answer: 'Siding replacement costs vary based on home size, material choice, and complexity. Most projects range from $8,500-$25,000. We provide detailed, no-obligation estimates.',
    category: 'siding',
  },
  // Exterior Painting FAQs
  {
    question: 'How long will exterior paint last?',
    answer: 'With proper preparation and quality paint, exterior paint typically lasts 7-10 years in Oregon\'s climate. We use premium paints specifically formulated for our weather conditions.',
    category: 'exterior-painting',
  },
  {
    question: 'Do you paint in the rain?',
    answer: 'We schedule painting around weather conditions. We need dry weather for proper paint application and curing. We\'ll work with you to find the best timing for your project.',
    category: 'exterior-painting',
  },
  {
    question: 'What paint brands do you use?',
    answer: 'We use premium paint brands like Sherwin-Williams, Benjamin Moore, and Behr that are specifically designed for exterior use and Oregon\'s climate conditions.',
    category: 'exterior-painting',
  },
  {
    question: 'Will you paint trim and doors?',
    answer: 'Yes, we paint all exterior surfaces including trim, doors, shutters, and any other exterior elements. We\'ll discuss all areas to be painted during your estimate.',
    category: 'exterior-painting',
  },
  // Interior Painting FAQs
  {
    question: 'Do I need to move furniture?',
    answer: 'We\'ll move and protect your furniture as part of our service. We use drop cloths and plastic sheeting to protect floors and belongings. You just need to remove small items and personal belongings.',
    category: 'interior-painting',
  },
  {
    question: 'How long does interior painting take?',
    answer: 'Most interior painting projects take 3-7 days depending on the number of rooms and complexity. We work efficiently to minimize disruption to your daily routine.',
    category: 'interior-painting',
  },
  {
    question: 'Do you offer low-VOC paint options?',
    answer: 'Yes, we offer low-VOC and zero-VOC paint options for healthier indoor air quality. These are especially important for families with children, pets, or sensitivities.',
    category: 'interior-painting',
  },
  {
    question: 'Can you help with color selection?',
    answer: 'Absolutely! We provide color consultation services to help you choose the perfect shades for your home. We can also work with your existing color scheme or designer recommendations.',
    category: 'interior-painting',
  },
  // Warranty FAQs
  {
    question: 'What does the 5-year workmanship warranty cover?',
    answer: 'Our warranty covers defects in workmanship, including issues with installation, materials, and finish quality. It doesn\'t cover normal wear and tear or damage from external causes.',
    category: 'warranty',
  },
  {
    question: 'How do I request warranty service?',
    answer: 'Simply contact us with details about the issue. We\'ll schedule an inspection and address any covered warranty items promptly at no cost to you.',
    category: 'warranty',
  },
  {
    question: 'Does the warranty transfer if I sell my home?',
    answer: 'Yes, our 5-year workmanship warranty is transferable to the new homeowner, which can be a valuable selling point for your property.',
    category: 'warranty',
  },
  // Scheduling FAQs
  {
    question: 'How far in advance should I schedule?',
    answer: 'We recommend scheduling 2-4 weeks in advance, especially during peak season (spring and summer). However, we can often accommodate urgent projects or work around your timeline.',
    category: 'scheduling',
  },
  {
    question: 'Do you work on weekends?',
    answer: 'We primarily work Monday through Friday, but can arrange weekend work for urgent projects or to accommodate your schedule when needed.',
    category: 'scheduling',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We serve Eugene, Albany, Corvallis, Springfield, and surrounding communities including Lebanon, Philomath, Junction City, Creswell, and more.',
    category: 'scheduling',
  },
  {
    question: 'Is the estimate really free?',
    answer: 'Yes, all estimates are completely free with no obligation. We\'ll visit your home, assess your project, and provide a detailed written estimate.',
    category: 'scheduling',
  },
]

export function getFAQsByCategory(category: FAQ['category']): FAQ[] {
  return faqs.filter((faq) => faq.category === category)
}

export function getFAQsByService(serviceSlug: string): FAQ[] {
  const serviceCategoryMap: Record<string, FAQ['category']> = {
    'siding-replacement': 'siding',
    'exterior-painting': 'exterior-painting',
    'interior-painting': 'interior-painting',
  }
  const category = serviceCategoryMap[serviceSlug]
  return category ? getFAQsByCategory(category) : []
}

