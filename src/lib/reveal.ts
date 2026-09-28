import { useEffect, useRef } from 'react'

/**
 * Adds "is-visible" to every `.reveal` element inside the returned ref once it
 * scrolls into view, triggering the CSS transition in index.css.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const items = ref.current?.querySelectorAll<HTMLElement>('.reveal')
    if (!items?.length) return
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ref
}
