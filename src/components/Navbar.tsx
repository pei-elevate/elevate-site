import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { milestones, resources } from '../data/site'
import { useTheme } from '../lib/theme'
import { resourceIcons } from './BrandIcons'
import { Logo } from './Logo'
import { SmartLink } from './SmartLink'

const mainLinks = [
  { to: '/minutes', label: 'Minutes' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/team', label: 'Team' },
]

const linkBase =
  'rounded-md px-3 py-2 text-[15px] font-medium transition-colors hover:text-petrol-600 dark:hover:text-accent'
const linkIdle = 'text-petrol/80 dark:text-offwhite/85'
const linkActive = 'text-petrol underline decoration-accent decoration-2 underline-offset-8 dark:text-accent'

function navClass({ isActive }: { isActive: boolean }) {
  return `${linkBase} ${isActive ? linkActive : linkIdle}`
}

/** Close a menu when one of its links is clicked. */
function closeOnLink(setOpen: (open: boolean) => void) {
  return (e: ReactMouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false)
  }
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className="grid size-10 place-items-center rounded-full text-petrol transition-colors hover:bg-petrol/10 dark:text-accent dark:hover:bg-white/10"
    >
      {dark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  )
}

function ResourceIcons() {
  return (
    <>
      {resources.map((r) => {
        const Icon = resourceIcons[r.key]
        return (
          <SmartLink
            key={r.key}
            href={r.href}
            ariaLabel={r.label}
            title={r.label}
            className="grid size-10 place-items-center rounded-full text-petrol transition-colors hover:bg-petrol/10 hover:text-petrol-600 dark:text-offwhite dark:hover:bg-white/10 dark:hover:text-accent"
          >
            <Icon size={20} aria-hidden="true" />
          </SmartLink>
        )
      })}
    </>
  )
}

function MilestonesDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const active = pathname.startsWith('/milestones')

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`${linkBase} ${active ? linkActive : linkIdle} inline-flex items-center gap-1`}
      >
        Milestones
        <ChevronDown size={16} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul
          onClick={closeOnLink(setOpen)}
          className="menu-enter absolute left-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-deep-line dark:bg-deep-card">
          {milestones.map((m) => (
            <li key={m.id}>
              <NavLink
                to={`/milestones/${m.id}`}
                className={({ isActive }) =>
                  `flex items-baseline gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-petrol/5 dark:hover:bg-white/5 ${
                    isActive ? 'text-petrol dark:text-accent' : 'text-slate-700 dark:text-offwhite/90'
                  }`
                }
              >
                <span className="font-semibold text-petrol dark:text-accent">{m.code}</span>
                {m.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/** True once the page has scrolled past a few pixels. */
function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > threshold)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const scrolled = useScrolled()

  return (
    <header
      className={`sticky top-0 z-40 border-b motion-safe:transition-[background-color,box-shadow,border-color] motion-safe:duration-300 ${
        scrolled || open
          ? 'border-slate-200 bg-white/85 shadow-md shadow-petrol/5 backdrop-blur-md dark:border-deep-line dark:bg-deep/85 dark:shadow-black/30'
          : 'border-transparent bg-white dark:bg-deep'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" aria-label="elevate – home" className="shrink-0">
          <Logo
            className={`w-28 origin-left motion-safe:transition-transform motion-safe:duration-300 ${scrolled ? 'scale-90' : ''}`}
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {mainLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={navClass}>
              {l.label}
            </NavLink>
          ))}
          <MilestonesDropdown />
          <NavLink to="/documentation" className={navClass}>
            Documentation
          </NavLink>
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          <ResourceIcons />
          <span aria-hidden="true" className="mx-1 h-6 w-px bg-slate-300 dark:bg-white/20" />
          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full text-petrol hover:bg-petrol/10 dark:text-offwhite dark:hover:bg-white/10"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" onClick={closeOnLink(setOpen)} className="menu-enter border-t border-slate-200 lg:hidden dark:border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {mainLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={navClass}>
                {l.label}
              </NavLink>
            ))}
            <p className="mt-2 px-3 text-xs font-semibold tracking-widest text-petrol/60 uppercase dark:text-offwhite/60">
              Milestones
            </p>
            {milestones.map((m) => (
              <NavLink key={m.id} to={`/milestones/${m.id}`} className={navClass}>
                <span className="font-semibold">{m.code}</span> · {m.name}
              </NavLink>
            ))}
            <NavLink to="/documentation" className={`${navClass({ isActive: pathname === '/documentation' })} mt-2`}>
              Documentation
            </NavLink>
            <div className="mt-3 flex gap-1 border-t border-slate-200 pt-3 dark:border-white/10">
              <ResourceIcons />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
