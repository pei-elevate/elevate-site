import type { ReactNode } from 'react'
import { isPlaceholder } from '../data/site'

interface SmartLinkProps {
  href: string
  children: ReactNode
  className?: string
  ariaLabel?: string
  title?: string
}

/**
 * External link that opens in a new tab. If the href is still a placeholder
 * (e.g. "[GITHUB LINK]") it renders as a disabled element instead.
 */
export function SmartLink({ href, children, className = '', ariaLabel, title }: SmartLinkProps) {
  if (isPlaceholder(href)) {
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-label={ariaLabel ? `${ariaLabel} (not available yet)` : undefined}
        title={`${title ?? ariaLabel ?? ''} ${href}`.trim()}
        className={`cursor-not-allowed opacity-60 ${className}`}
      >
        {children}
      </span>
    )
  }
  const external = /^https?:|^mailto:/.test(href)
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      title={title}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
