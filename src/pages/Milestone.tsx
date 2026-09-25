import { ArrowLeft, ArrowRight, Presentation } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PageHeader, Section, cardClass } from '../components/Section'
import { isPlaceholder, milestones, type Milestone as MilestoneData, type MilestoneSection } from '../data/site'
import { NotFound } from './NotFound'

function CanvaEmbed({ milestone }: { milestone: MilestoneData }) {
  const title = `${milestone.code} ${milestone.name} presentation`
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-deep-line dark:bg-deep-card">
      {isPlaceholder(milestone.canvaEmbedUrl) ? (
        <div className="absolute inset-0 grid place-items-center p-6 text-center text-slate-500 dark:text-slate-400">
          <div>
            <Presentation size={40} aria-hidden="true" className="mx-auto mb-3 text-petrol dark:text-accent" />
            <p className="font-medium">Presentation coming soon</p>
            <p className="mt-1 text-sm">{milestone.canvaEmbedUrl}</p>
          </div>
        </div>
      ) : (
        <iframe
          src={milestone.canvaEmbedUrl}
          title={title}
          loading="lazy"
          allow="fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      )}
    </div>
  )
}

function SectionBlock({ section }: { section: MilestoneSection }) {
  return (
    <section className="border-t border-slate-200 pt-10 dark:border-deep-line">
      <h2 className="text-2xl font-semibold text-petrol dark:text-offwhite">
        {section.title}
        <span aria-hidden="true" className="mt-2 block h-1 w-10 rounded-full bg-accent" />
      </h2>
      <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-slate-700 dark:text-slate-300">
        {section.body?.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {section.items && (
          <ul className="list-disc space-y-2 pl-5 marker:text-accent">
            {section.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}
        {section.cards && (
          <ul className="grid gap-4 pt-2 sm:grid-cols-3">
            {section.cards.map((c) => (
              <li key={c.title} className={cardClass}>
                <h3 className="font-semibold text-secondary">{c.title}</h3>
                <p className="mt-2 text-[15px]">{c.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export function Milestone() {
  const { id } = useParams()
  const index = milestones.findIndex((m) => m.id === id)
  if (index === -1) return <NotFound />
  const milestone = milestones[index]
  const prev = milestones[index - 1]
  const next = milestones[index + 1]

  return (
    <>
      <PageHeader
        title={`${milestone.code} · ${milestone.name}`}
        intro={
          <>
            <span className="block">{milestone.summary}</span>
            <span className="mt-1 block text-base text-slate-500 dark:text-slate-400">{milestone.date}</span>
          </>
        }
      />
      <Section>
        <CanvaEmbed milestone={milestone} />
        <div className="mt-14 max-w-4xl space-y-10">
          {milestone.sections.map((s) => (
            <SectionBlock key={s.title} section={s} />
          ))}
        </div>

        <nav aria-label="Milestones" className="mt-16 flex justify-between gap-4 border-t border-slate-200 pt-8 dark:border-deep-line">
          {prev ? (
            <Link
              to={`/milestones/${prev.id}`}
              className="inline-flex items-center gap-2 font-semibold text-petrol hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4 dark:text-accent"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              {prev.code} {prev.name}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to={`/milestones/${next.id}`}
              className="inline-flex items-center gap-2 font-semibold text-petrol hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4 dark:text-accent"
            >
              {next.code} {next.name}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          )}
        </nav>
      </Section>
    </>
  )
}
