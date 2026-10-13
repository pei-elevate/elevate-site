import { ArrowLeft, ArrowRight, ExternalLink, FileText, Presentation } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PageHeader, Section, cardClass } from '../components/Section'
import {
  isPlaceholder,
  milestones,
  type Milestone as MilestoneData,
  type MilestoneImage,
  type MilestoneSection,
  type MilestoneSubsection,
} from '../data/site'
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

function FigureImage({ image }: { image: MilestoneImage }) {
  const imgSrc = image.src.startsWith('/') ? `.${image.src}` : image.src
  return (
    <figure
      className="mt-4 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-sm dark:border-deep-line dark:bg-white"
      style={image.width ? { maxWidth: image.width + 18 } : undefined}
    >
      <a
        href={imgSrc}
        target="_blank"
        rel="noopener noreferrer"
        title="Click to view full resolution"
        className="block cursor-zoom-in"
      >
        <img
          src={imgSrc}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-auto w-full rounded-lg bg-white object-contain"
          loading="lazy"
        />
      </a>
    </figure>
  )
}

function SubsectionBlock({ subsection }: { subsection: MilestoneSubsection }) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-sm dark:border-deep-line dark:bg-deep-card/40">
      <h3 className="text-xl font-semibold text-petrol dark:text-offwhite">{subsection.title}</h3>
      {subsection.body?.map((p) => (
        <p key={p} className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-300">
          {p}
        </p>
      ))}
      {subsection.items && (
        <ul className="list-disc space-y-2 pl-5 marker:text-accent">
          {subsection.items.map((i) => {
            const colonIndex = i.indexOf(': ')
            if (colonIndex !== -1) {
              const name = i.slice(0, colonIndex)
              const desc = i.slice(colonIndex + 2)
              return (
                <li key={i}>
                  <strong className="font-semibold text-slate-900 dark:text-offwhite">{name}:</strong>{' '}
                  <span>{desc}</span>
                </li>
              )
            }
            return <li key={i}>{i}</li>
          })}
        </ul>
      )}
      {subsection.groups && (
        <div className="space-y-5 pt-1">
          {subsection.groups.map((group) => (
            <div key={group.title} className="space-y-2">
              <h4 className="text-base font-semibold text-secondary">{group.title}</h4>
              <ul className="list-disc space-y-2 pl-5 marker:text-accent">
                {group.items.map((item) => {
                  const colonIndex = item.indexOf(': ')
                  if (colonIndex !== -1) {
                    const name = item.slice(0, colonIndex)
                    const desc = item.slice(colonIndex + 2)
                    return (
                      <li key={item}>
                        <strong className="font-semibold text-slate-900 dark:text-offwhite">{name}:</strong>{' '}
                        <span>{desc}</span>
                      </li>
                    )
                  }
                  return <li key={item}>{item}</li>
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
      {subsection.image && <FigureImage image={subsection.image} />}
      {subsection.images && (
        <div className="grid gap-4 sm:grid-cols-2">
          {subsection.images.map((img) => (
            <FigureImage key={img.src} image={img} />
          ))}
        </div>
      )}
      {subsection.pdf && (
        <div className="pt-2">
          <a
            href={subsection.pdf.src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-petrol px-5 py-2.5 font-semibold text-white transition-colors hover:bg-petrol-600 dark:bg-accent dark:text-petrol dark:hover:bg-accent/90"
          >
            <FileText size={18} aria-hidden="true" />
            {subsection.pdf.label}
          </a>
        </div>
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
            {section.items.map((i) => {
              const colonIndex = i.indexOf(': ')
              if (colonIndex !== -1) {
                const name = i.slice(0, colonIndex)
                const desc = i.slice(colonIndex + 2)
                return (
                  <li key={i}>
                    <strong className="font-semibold text-slate-900 dark:text-offwhite">{name}:</strong>{' '}
                    <span>{desc}</span>
                  </li>
                )
              }
              return <li key={i}>{i}</li>
            })}
          </ul>
        )}
        {section.cards && (
          <ul className="grid gap-4 pt-2 sm:grid-cols-3 lg:grid-cols-5">
            {section.cards.map((c) => (
              <li key={c.title} className={`${cardClass} flex flex-col justify-center text-center`}>
                <h3 className="font-semibold text-secondary">{c.title}</h3>
                {c.description && <p className="mt-2 text-[15px]">{c.description}</p>}
              </li>
            ))}
          </ul>
        )}
        {section.groups && (
          <div className="space-y-6 pt-2">
            {section.groups.map((group) => (
              <div key={group.title} className="space-y-3">
                <h3 className="text-lg font-semibold text-secondary">{group.title}</h3>
                <ul className="list-disc space-y-2 pl-5 marker:text-accent">
                  {group.items.map((item) => {
                    const colonIndex = item.indexOf(': ')
                    if (colonIndex !== -1) {
                      const name = item.slice(0, colonIndex)
                      const desc = item.slice(colonIndex + 2)
                      return (
                        <li key={item}>
                          <strong className="font-semibold text-slate-900 dark:text-offwhite">{name}:</strong>{' '}
                          <span>{desc}</span>
                        </li>
                      )
                    }
                    return <li key={item}>{item}</li>
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
        {section.image?.src && <FigureImage image={section.image} />}
        {section.images && (
          <div className="space-y-6 pt-2">
            {section.images.map((img) => (
              <FigureImage key={img.src} image={img} />
            ))}
          </div>
        )}
        {section.subsections && (
          <div className="space-y-6 pt-2">
            {section.subsections.map((sub) => (
              <SubsectionBlock key={sub.title} subsection={sub} />
            ))}
          </div>
        )}
        {section.pdf && (
          <div className="pt-2">
            <a
              href={section.pdf.src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-petrol px-5 py-2.5 font-semibold text-white transition-colors hover:bg-petrol-600 dark:bg-accent dark:text-petrol dark:hover:bg-accent/90"
            >
              <FileText size={18} aria-hidden="true" />
              {section.pdf.label}
            </a>
          </div>
        )}
        {section.embed && (
          <div className="space-y-3 pt-2">
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-deep-line dark:bg-deep-card"
              style={{ height: section.embed.height ?? 540 }}
            >
              <iframe
                src={section.embed.url}
                title={section.embed.title ?? 'Interactive Embed'}
                loading="lazy"
                allow="fullscreen"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            </div>
            {section.embed.externalUrl && (
              <div className="flex justify-end">
                <a
                  href={section.embed.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-petrol/30 px-4 py-2 text-sm font-semibold text-petrol transition-colors hover:border-petrol hover:bg-petrol hover:text-white dark:border-accent/40 dark:text-accent dark:hover:border-accent dark:hover:bg-accent dark:hover:text-petrol"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  {section.embed.externalLabel ?? 'Open in External Tool'}
                </a>
              </div>
            )}
          </div>
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
