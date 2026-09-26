import { User } from 'lucide-react'
import { isPlaceholder, type Feature, type Person } from '../data/site'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'
import { SmartLink } from './SmartLink'
import { cardClass } from './Section'

/** Plain feature rectangle: title only, fills with petrol on hover. */
export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="group relative flex h-full min-h-24 items-center overflow-hidden rounded-lg border border-slate-200 bg-white px-6 py-6 motion-safe:transition-[transform,background-color,border-color,box-shadow] motion-safe:duration-300 hover:border-petrol hover:bg-petrol hover:shadow-xl hover:shadow-petrol/20 motion-safe:hover:-translate-y-1.5 sm:min-h-28 dark:border-deep-line dark:bg-deep-card dark:hover:border-accent/60 dark:hover:bg-petrol">
      <h3 className="text-xl leading-tight font-bold tracking-tight text-petrol transition-colors duration-300 group-hover:text-white sm:text-2xl dark:text-offwhite">
        {feature.title}
      </h3>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-x-100"
      />
    </article>
  )
}

const socialButtonClass =
  'grid size-9 place-items-center rounded-full border border-slate-200 text-petrol transition-colors hover:border-accent hover:bg-accent/15 dark:border-deep-line dark:text-offwhite dark:hover:text-accent'

/** Icon links to the person's GitHub and LinkedIn, when set. */
function SocialLinks({ person }: { person: Person }) {
  const items = [
    { href: person.github, label: 'GitHub', Icon: GitHubIcon },
    { href: person.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  ].filter((i) => i.href !== undefined)
  if (items.length === 0) return null
  return (
    <div className="mt-3 flex gap-2">
      {items.map(({ href, label, Icon }) => (
        <SmartLink
          key={label}
          href={href!}
          ariaLabel={`${person.name} on ${label}`}
          title={label}
          className={socialButtonClass}
        >
          <Icon size={16} />
        </SmartLink>
      ))}
    </div>
  )
}

/** Card with a rectangular portrait photo. */
export function ProfileCard({ person }: { person: Person }) {
  const hasPhoto = !isPlaceholder(person.photo)
  return (
    <article className={`${cardClass.replace('p-6', '')} flex h-full flex-col overflow-hidden text-center`}>
      {hasPhoto ? (
        <img
          src={person.photo}
          alt={`Photo of ${person.name}`}
          className="aspect-[4/5] w-full object-cover"
          loading="lazy"
        />
      ) : (
        <span
          role="img"
          aria-label={`Photo placeholder for ${person.name}`}
          className="grid aspect-[4/5] w-full place-items-center bg-secondary/15 text-secondary"
        >
          <User size={56} strokeWidth={1.5} aria-hidden="true" />
        </span>
      )}
      <div
        className="flex flex-1 flex-col items-center border-t-4 border-secondary px-4 py-5"
      >
        <h3 className="text-lg font-semibold text-petrol dark:text-offwhite">
          {person.name}
        </h3>
        {person.role && <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{person.role}</p>}
        <SocialLinks person={person} />
      </div>
    </article>
  )
}

/** Up to five cards per row on desktop; an incomplete row is centred at the same card width. */
export function ProfileGrid({ people }: { people: Person[] }) {
  return (
    <ul className="flex flex-wrap justify-center gap-5">
      {people.map((p) => (
        <li
          key={p.name}
          className="w-[calc((100%-1.25rem)/2)] sm:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-5rem)/5)]"
        >
          <ProfileCard person={p} />
        </li>
      ))}
    </ul>
  )
}
