import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  title?: string
  eyebrow?: string
  intro?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ id, title, eyebrow, intro, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 ${className}`}>
      {(title || eyebrow) && (
        <header className="mb-10 max-w-2xl">
          {eyebrow && (
            <p className="mb-2 text-sm font-semibold tracking-widest text-secondary uppercase">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-semibold text-petrol sm:text-4xl dark:text-offwhite">
              {title}
              <span aria-hidden="true" className="mt-3 block h-1 w-12 rounded-full bg-accent" />
            </h2>
          )}
          {intro && <div className="mt-4 text-slate-600 dark:text-slate-300">{intro}</div>}
        </header>
      )}
      {children}
    </section>
  )
}

export function PageHeader({ title, intro }: { title: string; intro?: ReactNode }) {
  return (
    <div className="border-b border-slate-200 bg-white dark:border-deep-line dark:bg-deep-card/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-4xl font-semibold text-petrol sm:text-5xl dark:text-offwhite">{title}</h1>
        <span aria-hidden="true" className="mt-4 block h-1 w-14 rounded-full bg-accent" />
        {intro && <div className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">{intro}</div>}
      </div>
    </div>
  )
}

export const cardClass =
  'rounded-2xl border border-slate-200 bg-white p-6 dark:border-deep-line dark:bg-deep-card'
