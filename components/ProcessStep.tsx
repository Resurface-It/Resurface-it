import { ReactNode } from 'react'

interface ProcessStepProps {
  number: number
  title: string
  description: string
  isLast?: boolean
}

export function ProcessStep({ number, title, description, isLast = false }: ProcessStepProps) {
  return (
    <div className="relative flex flex-col items-center text-center md:flex-row md:text-left">
      <div className="relative mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white md:mb-0 md:mr-6">
        {number}
      </div>
      {!isLast && (
        <div className="absolute left-8 top-16 hidden h-full w-0.5 bg-slate-200 md:block md:h-0.5 md:w-full md:left-16 md:top-8" />
      )}
      <div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  )
}

