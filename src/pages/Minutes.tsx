import { ArrowLeft, ArrowRight, FileText } from 'lucide-react'
import Markdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { PageHeader, Section, cardClass } from '../components/Section'
import { findMinute, minutes } from '../lib/minutes'
import { NotFound } from './NotFound'

function formatDate(date: string) {
  const d = new Date(`${date}T00:00:00`)
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function MinutesList() {
  return (
    <>
      <PageHeader title="Minutes" intro="Records of the project meetings with the advisors and the CMA." />
      <Section>
        {minutes.length === 0 ? (
          <div className={`${cardClass} text-center text-slate-600 dark:text-slate-300`}>
            <FileText size={32} aria-hidden="true" className="mx-auto mb-3 text-petrol dark:text-accent" />
            <p>No meeting minutes have been published yet.</p>
          </div>
        ) : (
          <ol className="space-y-4">
            {minutes.map((m) => (
              <li key={m.slug}>
                <Link
                  to={`/minutes/${m.slug}`}
                  className={`${cardClass} group flex items-center gap-5 transition-colors hover:border-accent dark:hover:border-accent`}
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-petrol text-lg font-bold text-white dark:bg-accent dark:text-petrol">
                    {String(m.number).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-semibold text-petrol dark:text-offwhite">{m.title}</span>
                    {m.date && (
                      <time dateTime={m.date} className="text-sm text-slate-500 dark:text-slate-400">
                        {formatDate(m.date)}
                      </time>
                    )}
                  </span>
                  <ArrowRight
                    size={20}
                    aria-hidden="true"
                    className="shrink-0 text-petrol transition-transform group-hover:translate-x-1 dark:text-accent"
                  />
                </Link>
              </li>
            ))}
          </ol>
        )}
      </Section>
    </>
  )
}

export function MinuteDetail() {
  const { slug = '' } = useParams()
  const minute = findMinute(slug)
  if (!minute) return <NotFound />

  return (
    <>
      <PageHeader
        title={`Meeting ${String(minute.number).padStart(2, '0')}`}
        intro={
          <>
            <span className="block font-medium text-petrol dark:text-offwhite">{minute.title}</span>
            {minute.date && <time dateTime={minute.date}>{formatDate(minute.date)}</time>}
          </>
        }
      />
      <Section>
        <Link
          to="/minutes"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-petrol hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4 dark:text-accent"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All minutes
        </Link>
        <article className="prose max-w-3xl prose-slate dark:prose-invert prose-headings:text-petrol prose-a:text-petrol prose-a:decoration-accent prose-a:decoration-2 hover:prose-a:text-petrol-600 dark:prose-headings:text-offwhite dark:prose-a:text-accent">
          <Markdown remarkPlugins={[remarkGfm]}>{minute.body}</Markdown>
        </article>
      </Section>
    </>
  )
}
