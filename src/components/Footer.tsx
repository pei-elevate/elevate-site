import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { advisors, collaborators, project, resources, team, type Person } from '../data/site'
import { resourceIcons } from './BrandIcons'
import { Logo } from './Logo'
import { SmartLink } from './SmartLink'

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold tracking-widest text-secondary uppercase">
        {title}
      </h2>
      {children}
    </div>
  )
}

const listClass = 'space-y-2 text-sm text-slate-600 dark:text-slate-300'

/** Names link to the person's page (advisors) or GitHub (students) when available. */
function NameList({ people }: { people: Person[] }) {
  return (
    <ul className={listClass}>
      {people.map((p) => {
        const href = p.profile ?? p.github
        return (
          <li key={p.name}>
            {href ? (
              <SmartLink
                href={href}
                className="transition-colors hover:text-petrol hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4 dark:hover:text-accent"
              >
                {p.name}
              </SmartLink>
            ) : (
              p.name
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function Footer() {
  return (
    <footer className="border-t-4 border-secondary bg-white dark:bg-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 xl:flex-row xl:justify-between xl:gap-16">
        <div className="shrink-0">
          <Link to="/" aria-label="elevate – home" className="inline-block">
            <Logo className="w-24" />
          </Link>
          <p className="mt-4 text-sm text-slate-500 xl:whitespace-nowrap dark:text-slate-400">{project.copyright}</p>
        </div>

        <div className="grid min-w-0 flex-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 xl:max-w-3xl">
          <FooterColumn title="Resources">
            <ul className={listClass}>
              {resources.map((r) => {
                const Icon = resourceIcons[r.key]
                return (
                  <li key={r.key}>
                    <SmartLink
                      href={r.href}
                      className="inline-flex items-center gap-2 transition-colors hover:text-petrol hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4 dark:hover:text-accent"
                    >
                      <Icon size={16} />
                      {r.label}
                    </SmartLink>
                  </li>
                )
              })}
            </ul>
          </FooterColumn>

          <FooterColumn title="Team Members">
            <NameList people={team} />
          </FooterColumn>

          <FooterColumn title="Project Advisors">
            <NameList people={advisors} />
          </FooterColumn>

          <FooterColumn title="Collaborator">
            <NameList people={collaborators} />
          </FooterColumn>
        </div>
      </div>
    </footer>
  )
}
