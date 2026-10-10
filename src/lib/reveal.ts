import { useEffect, useRef } from 'react'

/**
 * Adds "is-visible" to every element matching `selector` inside the returned ref
 * once it scrolls into view, triggering the CSS transition in index.css.
 * With `stagger`, elements that enter together cascade 60ms apart.
 */
export function useReveal<T extends HTMLElement>(selector = '.reveal', { stagger = false } = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const items = ref.current?.querySelectorAll<HTMLElement>(selector)
    if (!items?.length) return
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const list = Array.from(items)
    const observer = new IntersectionObserver(
      (entries) => {
        const hits = entries.filter((e) => e.isIntersecting).map((e) => list.indexOf(e.target as HTMLElement))
        if (!hits.length) return
        // Reveal everything up to the last element in view, so items skipped by a
        // fast scroll (never intersecting) don't stay hidden above the viewport.
        let n = 0
        list.slice(0, Math.max(...hits) + 1).forEach((el) => {
          if (el.classList.contains('is-visible')) return
          if (stagger) el.style.setProperty('--reveal-delay', `${n++ * 60}ms`)
          el.classList.add('is-visible')
          observer.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    list.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [selector, stagger])

  return ref
}
