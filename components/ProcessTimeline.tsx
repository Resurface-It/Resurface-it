'use client'

import { motion } from 'framer-motion'
import { FileText, Wrench, Paintbrush, CheckCircle, Shield } from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'Free Estimate',
    description: 'We visit your home to assess your project and provide a detailed, no-obligation estimate.',
    icon: FileText,
  },
  {
    number: 2,
    title: 'Prep & Repairs',
    description: 'We prepare surfaces, make necessary repairs, and ensure everything is ready for installation or painting.',
    icon: Wrench,
  },
  {
    number: 3,
    title: 'Install / Paint',
    description: 'Our expert team performs the work with attention to detail and quality craftsmanship.',
    icon: Paintbrush,
  },
  {
    number: 4,
    title: 'Final Walk-Through',
    description: 'We walk through the completed project with you to ensure everything meets your expectations.',
    icon: CheckCircle,
  },
  {
    number: 5,
    title: 'Warranty Support',
    description: 'Your 5-year workmanship warranty begins, and we\'re here to support you long-term.',
    icon: Shield,
  },
]

export function ProcessTimeline() {
  return (
    <div className="relative">
      {/* Desktop: Horizontal layout with connecting line */}
      <div className="hidden lg:block">
        <div className="relative flex items-start justify-between">
          {/* Connecting line */}
          <div className="absolute left-16 top-12 h-0.5 w-[calc(100%-8rem)] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
          
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10 flex w-[calc(20%-1rem)] flex-col items-center text-center"
              >
                {/* Number circle with icon */}
                <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primaryDark shadow-lg ring-4 ring-white">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-primary shadow-md">
                    {step.number}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mobile/Tablet: Vertical card layout */}
      <div className="lg:hidden">
        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 pr-6 shadow-sm transition-shadow hover:shadow-md overflow-visible"
              >
                {/* Number circle with icon */}
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primaryDark shadow-md overflow-visible">
                  <Icon className="h-7 w-7 text-white" />
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-primary shadow-md border-2 border-white">
                    {step.number}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
