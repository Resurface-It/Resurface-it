import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="mb-6 text-4xl font-bold text-slate-900">{children}</h1>,
    h2: ({ children }) => <h2 className="mb-4 mt-8 text-3xl font-bold text-slate-900">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-6 text-2xl font-semibold text-slate-900">{children}</h3>,
    p: ({ children }) => <p className="mb-4 text-lg text-slate-700">{children}</p>,
    ul: ({ children }) => <ul className="mb-4 ml-6 list-disc space-y-2 text-lg text-slate-700">{children}</ul>,
    ol: ({ children }) => <ol className="mb-4 ml-6 list-decimal space-y-2 text-lg text-slate-700">{children}</ol>,
    li: ({ children }) => <li className="text-lg text-slate-700">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
    ...components,
  }
}
