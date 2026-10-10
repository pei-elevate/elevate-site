import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section } from '../components/Section'
import { allMilestones, type Milestone } from '../data/site'

const cardBase =
  'flex h-full min-h-[30rem] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-deep-line dark:bg-deep-card'

function CardContent({ milestone, footer }: { milestone: Milestone; footer: ReactNode }) {
  const soon = milestone.hidden
  return (
    <>
      {/* Header block in place of an image: milestone code over the brand colour. */}
      <div
        className={`relative grid h-56 place-items-center overflow-hidden ${
          soon ? 'bg-slate-100 dark:bg-deep' : 'bg-petrol'
        }`}
      >
        <span
          className={`text-7xl font-bold tracking-tight motion-safe:transition-transform motion-safe:duration-500 ${
            soon ? 'text-slate-300 dark:text-deep-line' : 'text-white motion-safe:group-hover:scale-110'
          }`}
        >
          {milestone.code}
        </span>
        {soon && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-petrol">
            <Clock size={12} aria-hidden="true" />
            Coming soon
          </span>
        )}
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-1 ${soon ? 'bg-slate-200 dark:bg-deep-line' : 'bg-accent'}`}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className={`text-xl font-semibold ${soon ? 'text-slate-500 dark:text-slate-400' : 'text-petrol dark:text-offwhite'}`}>
          {milestone.name}
        </h2>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{milestone.summary}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <CalendarDays size={16} aria-hidden="true" />
            {soon ? `Presentation on ${milestone.date}` : milestone.date}
          </span>
          {footer}
        </div>
      </div>
    </>
  )
}

export function Milestones() {
  return (
    <>
      <PageHeader title="Milestones" intro="The project's four milestones, from inception to transition." />
      <Section>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {allMilestones.map((m, i) => (
            <li key={m.id} className="hero-rise" style={{ '--hero-delay': `${i * 90}ms` } as CSSProperties}>
              {m.hidden ? (
                <article aria-label={`${m.code} ${m.name}, coming soon`} className={`${cardBase} opacity-90`}>
                  <CardContent milestone={m} footer={null} />
                </article>
              ) : (
                <Link
                  to={`/milestones/${m.id}`}
                  className={`${cardBase} group motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 hover:shadow-xl hover:shadow-petrol/15 focus-visible:shadow-xl motion-safe:hover:scale-[1.03] motion-safe:focus-visible:scale-[1.03] dark:hover:shadow-black/30`}
                >
                  <CardContent
                    milestone={m}
                    footer={
                      <span className="inline-flex items-center gap-1 font-semibold text-petrol dark:text-accent">
                        View
                        <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                      </span>
                    }
                  />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
