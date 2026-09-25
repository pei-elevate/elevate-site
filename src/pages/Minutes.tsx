import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Download, Eye, FileText } from 'lucide-react'
import Markdown from 'react-markdown'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { PageHeader, Section, cardClass } from '../components/Section'
import { findMinute, minutes } from '../lib/minutes'
import { NotFound } from './NotFound'

const PAGE_SIZE = 5

function formatDate(date: string) {
  const d = new Date(`${date}T00:00:00`)
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

const pad = (n: number) => String(n).padStart(2, '0')

const buttonClass =
  'inline-flex shrink-0 items-center gap-2 rounded-full bg-petrol px-5 py-2.5 font-semibold text-white transition-colors hover:bg-petrol-600 dark:bg-accent dark:text-petrol dark:hover:bg-accent/90'

const pagerClass =
  'grid size-10 place-items-center rounded-full border border-slate-200 text-petrol transition-colors hover:border-accent disabled:pointer-events-none disabled:opacity-40 dark:border-deep-line dark:text-accent'

const actionClass =
  'inline-flex items-center gap-1.5 rounded-full border border-petrol/30 px-3.5 py-1.5 text-sm font-semibold text-petrol transition-colors hover:border-petrol hover:bg-petrol hover:text-white dark:border-accent/40 dark:text-accent dark:hover:border-accent dark:hover:bg-accent dark:hover:text-petrol'

export function MinutesList() {
  const [params, setParams] = useSearchParams()
  const pageCount = Math.max(1, Math.ceil(minutes.length / PAGE_SIZE))
  const page = Math.min(Math.max(1, Number(params.get('page')) || 1), pageCount)
  const rows = minutes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const goTo = (p: number) => setParams(p === 1 ? {} : { page: String(p) })

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
          <>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-deep-line">
              <table className="w-full border-collapse bg-white text-left text-[15px] text-slate-600 dark:bg-deep-card/40 dark:text-slate-300">
                <thead className="bg-petrol text-sm tracking-wide text-white uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Meeting</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Date</th>
                    <th scope="col" className="px-4 py-3 text-right font-semibold">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((m) => (
                    <tr key={m.slug} className="border-t border-slate-200 dark:border-deep-line">
                      <td className="px-4 py-3 font-bold text-petrol dark:text-accent">{pad(m.number)}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {m.date && <time dateTime={m.date}>{formatDate(m.date)}</time>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Link to={`/minutes/${m.slug}`} aria-label={`View meeting ${pad(m.number)}`} className={actionClass}>
                            <Eye size={16} aria-hidden="true" />
                            View
                          </Link>
                          {m.pdf && (
                            <a
                              href={m.pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Meeting ${pad(m.number)} PDF`}
                              className={actionClass}
                            >
                              <FileText size={16} aria-hidden="true" />
                              PDF
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pageCount > 1 && (
              <nav aria-label="Minutes pages" className="mt-6 flex items-center justify-end gap-3">
                <button type="button" onClick={() => goTo(page - 1)} disabled={page === 1} aria-label="Previous page" className={pagerClass}>
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Page {page} of {pageCount}
                </span>
                <button type="button" onClick={() => goTo(page + 1)} disabled={page === pageCount} aria-label="Next page" className={pagerClass}>
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </nav>
            )}
          </>
        )}
      </Section>
    </>
  )
}

export function MinuteDetail() {
  const { slug = '' } = useParams()
  const minute = findMinute(slug)
  if (!minute) return <NotFound />

  // `minutes` is sorted newest first.
  const index = minutes.indexOf(minute)
  const newer = minutes[index - 1]
  const older = minutes[index + 1]
  const details = [minute.location, minute.time, minute.duration].filter(Boolean).join(' · ')

  return (
    <>
      <PageHeader
        title={`Meeting ${pad(minute.number)}`}
        intro={
          <>
            <span className="block font-medium text-petrol dark:text-offwhite">{minute.title}</span>
            {minute.date && <time dateTime={minute.date}>{formatDate(minute.date)}</time>}
            {details && <span className="block">{details}</span>}
          </>
        }
      />
      <Section>
        <div className="mb-8 flex max-w-3xl flex-wrap items-center justify-between gap-4">
          <Link
            to="/minutes"
            className="inline-flex items-center gap-2 text-sm font-semibold text-petrol hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4 dark:text-accent"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            All minutes
          </Link>
          {minute.pdf && (
            <a href={minute.pdf} target="_blank" rel="noopener noreferrer" className={buttonClass}>
              <Download size={18} aria-hidden="true" />
              PDF
            </a>
          )}
        </div>
        <article className="prose max-w-3xl prose-slate dark:prose-invert prose-headings:text-petrol prose-a:text-petrol prose-a:decoration-accent prose-a:decoration-2 hover:prose-a:text-petrol-600 dark:prose-headings:text-offwhite dark:prose-a:text-accent">
          <Markdown remarkPlugins={[remarkGfm]}>{minute.body}</Markdown>
        </article>

        {(older || newer) && (
          <nav aria-label="Meetings" className="mt-16 flex max-w-3xl justify-between gap-4 border-t border-slate-200 pt-8 dark:border-deep-line">
            {older ? (
              <Link to={`/minutes/${older.slug}`} className="group inline-flex items-center gap-2 font-semibold text-petrol dark:text-accent">
                <ArrowLeft size={18} aria-hidden="true" className="transition-transform group-hover:-translate-x-1" />
                Meeting {pad(older.number)}
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link to={`/minutes/${newer.slug}`} className="group inline-flex items-center gap-2 font-semibold text-petrol dark:text-accent">
                Meeting {pad(newer.number)}
                <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </nav>
        )}
      </Section>
    </>
  )
}
