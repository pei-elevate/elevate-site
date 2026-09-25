import { PageHeader, Section } from '../components/Section'
import { schedule, type ScheduleRow, type Task } from '../data/site'

/** Length of the run of rows starting at `i` that share the same key (like merged cells in the spreadsheet). */
function spanAt(i: number, key: (r: ScheduleRow) => string) {
  const k = key(schedule[i])
  if (i > 0 && key(schedule[i - 1]) === k) return 0
  let n = 1
  while (i + n < schedule.length && key(schedule[i + n]) === k) n++
  return n
}

const phaseOf = (r: ScheduleRow) => r.phase

function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="space-y-1">
      {tasks.map((t) =>
        typeof t === 'string' ? (
          <li key={t}>{t}</li>
        ) : (
          <li key={t.title}>
            <span className="font-semibold">{t.title}</span>
            <ul className="mt-1 list-disc space-y-1 pl-5 marker:text-accent">
              {t.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ),
      )}
    </ul>
  )
}

const cell = 'border border-slate-200 px-4 py-3 align-top dark:border-deep-line'
const groupCell = `${cell} bg-offwhite font-semibold text-petrol dark:bg-deep-card dark:text-offwhite`

export function Calendar() {
  return (
    <>
      <PageHeader
        title="Calendar"
        intro="Project schedule by phase, from September 2026 to June 2027."
      />
      <Section>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-deep-line">
          <table className="w-full min-w-[560px] border-collapse bg-white text-left text-[15px] leading-relaxed text-slate-600 dark:bg-deep-card/40 dark:text-slate-300">
            <thead className="bg-petrol text-sm tracking-wide text-white uppercase">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Phase</th>
                <th scope="col" className="px-4 py-3 font-semibold">Weeks</th>
                <th scope="col" className="px-4 py-3 font-semibold">Tasks</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, i) => {
                const phaseSpan = spanAt(i, phaseOf)

                return (
                  <tr key={i}>
                    {phaseSpan > 0 && (
                      <th scope="row" rowSpan={phaseSpan} className={groupCell}>
                        {row.phase}
                      </th>
                    )}
                    {row.type === 'milestone' ? (
                      <>
                        <td className={`${cell} bg-accent/25 font-semibold whitespace-nowrap text-petrol dark:text-offwhite`}>
                          {row.date}
                        </td>
                        <td className={`${cell} bg-accent/25 font-bold text-petrol dark:text-accent`}>
                          {row.code}
                        </td>
                      </>
                    ) : (
                      <>
                        <td
                          className={`${cell} whitespace-nowrap ${row.type === 'event' ? 'bg-secondary/10 font-semibold text-petrol dark:text-offwhite' : ''}`}
                        >
                          {row.type === 'event' ? row.date : row.weeks}
                        </td>
                        <td className={`${cell} ${row.type === 'event' ? 'bg-secondary/10' : ''}`}>
                          <TaskList tasks={row.tasks} />
                        </td>
                      </>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  )
}
