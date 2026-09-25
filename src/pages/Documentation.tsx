import { FileText } from 'lucide-react'
import { PageHeader, Section, cardClass } from '../components/Section'
import { links } from '../data/site'

export function Documentation() {
  return (
    <>
      <PageHeader title="Documentation" intro="Project documents for elevate." />
      <Section>
        <div className={`${cardClass} flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between`}>
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
