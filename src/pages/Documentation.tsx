import { BookOpen, Code, FileText, Network } from 'lucide-react'
import { PageHeader, Section, cardClass } from '../components/Section'
import { documentation, links } from '../data/site'

const icons = { architecture: Network, api: Code, 'user-docs': BookOpen } as Record<string, typeof Network>

export function Documentation() {
  return (
    <>
      <PageHeader title="Documentation" intro="Technical and user documentation for elevate." />
      <Section>
        <ul className="grid gap-6 md:grid-cols-3">
          {documentation.map((d) => {
            const Icon = icons[d.id] ?? FileText
            return (
              <li key={d.id} id={d.id} className={cardClass}>
                <span className="grid size-12 place-items-center rounded-xl bg-secondary/15 text-secondary">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-xl font-semibold text-petrol dark:text-offwhite">{d.title}</h2>
                <p className="mt-2 text-[15px] text-slate-600 dark:text-slate-300">{d.body}</p>
              </li>
            )
          })}
        </ul>

        <div className={`${cardClass} mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between`}>
          <div>
            <h2 className="text-lg font-semibold text-petrol dark:text-offwhite">Project proposal</h2>
            <p className="text-[15px] text-slate-600 dark:text-slate-300">
              Background, goals, main functionalities and work plan (PDF).
            </p>
          </div>
          <a
            href={links.proposalPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-petrol px-5 py-2.5 font-semibold text-white transition-colors hover:bg-petrol-600 dark:bg-accent dark:text-petrol dark:hover:bg-accent/90"
          >
            <FileText size={18} aria-hidden="true" />
            Open PDF
          </a>
        </div>
      </Section>
    </>
  )
}
