import { PageHeader, Section } from '../components/Section'
import { project, workPlan } from '../data/site'

export function Calendar() {
  return (
    <>
      <PageHeader
        title="Calendar"
        intro={`Project work plan, from October to May (${project.academicYear}).`}
      />
      <Section>
        <ol className="relative ml-4 border-l-2 border-secondary sm:ml-40">
          {workPlan.map((phase) => (
            <li key={phase.number} className="relative mb-12 pl-8 last:mb-0 sm:pl-10">
              <span
                aria-hidden="true"
                className="absolute top-0 -left-[17px] grid size-8 place-items-center rounded-full border-2 border-offwhite bg-petrol text-sm font-bold text-white dark:border-deep dark:bg-accent dark:text-petrol"
              >
                {phase.number}
              </span>
              <p className="mb-1 text-sm font-semibold tracking-wide text-secondary uppercase sm:absolute sm:top-1 sm:-left-40 sm:w-32 sm:text-right">
                {phase.period}
              </p>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-deep-line dark:bg-deep-card">
                <h2 className="text-xl font-semibold text-petrol dark:text-offwhite">
                  <span className="sr-only">Phase {phase.number}: </span>
                  {phase.title}
                </h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600 marker:text-accent dark:text-slate-300">
                  {phase.tasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  )
}
