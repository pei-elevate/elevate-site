import { ArrowDown, ImageIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import { FeatureCard } from '../components/Cards'
import { Section } from '../components/Section'
import { features, hero } from '../data/site'
import { useTheme } from '../lib/theme'

// Hero illustrations: 1.png for light mode, 2.png for dark mode. Missing files fall back to a placeholder.
const heroImages = import.meta.glob<string>('../assets/hero.svg/*.png', { eager: true, query: '?url', import: 'default' })
const heroLight = heroImages['../assets/hero.svg/1.png']
const heroDark = heroImages['../assets/hero.svg/2.png']

function HeroIllustration() {
  const { theme } = useTheme()
  const src = theme === 'dark' ? (heroDark ?? heroLight) : (heroLight ?? heroDark)
  if (src) return <img src={src} alt="" className="aspect-square h-auto w-full rounded-3xl object-cover" />
  return (
    <div className="grid aspect-[4/3] w-full place-items-center rounded-3xl border-2 border-dashed border-slate-300 bg-offwhite text-center text-slate-500 dark:border-deep-line dark:bg-deep-card dark:text-slate-400">
      <div className="p-6">
        <ImageIcon size={40} strokeWidth={1.5} aria-hidden="true" className="mx-auto mb-3 text-secondary" />
        <p className="text-sm font-medium">[HERO ILLUSTRATION]</p>
        <p className="mt-1 text-xs">{hero.illustration}</p>
      </div>
    </div>
  )
}

export function Home() {
  const scrollToFeatures = () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white dark:border-deep-line dark:bg-deep">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:py-28">
          <div>
            <h1 className="hero-rise text-[44px] leading-[1.02] font-bold tracking-[-0.03em] text-petrol sm:text-6xl lg:text-[64px] xl:text-[76px] dark:text-offwhite">
              <span className="block sm:whitespace-nowrap">
                {hero.line1.text} <span className="hero-strike text-petrol/60 dark:text-offwhite/50">{hero.line1.struck}</span>
              </span>
              <span className="block sm:whitespace-nowrap">
                {hero.line2.text} <span className="hero-mark">{hero.line2.highlight}</span>
              </span>
            </h1>
            <p
              className="hero-rise mt-6 max-w-xl text-xl leading-relaxed text-slate-600 dark:text-slate-300"
              style={{ '--hero-delay': '120ms' } as CSSProperties}
            >
              {hero.subtitle}
            </p>
            <div className="hero-rise mt-9" style={{ '--hero-delay': '200ms' } as CSSProperties}>
              <button
                type="button"
                onClick={scrollToFeatures}
                className="inline-flex items-center gap-2 rounded-full bg-petrol px-7 py-3 font-semibold text-white transition-colors hover:bg-petrol-600 dark:bg-accent dark:text-petrol dark:hover:bg-accent/90"
              >
                {hero.cta}
                <ArrowDown size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="hero-rise relative mx-auto w-full max-w-sm lg:-top-10 lg:max-w-md" style={{ '--hero-delay': '200ms' } as CSSProperties}>
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* Features */}
      <Section id="features" eyebrow="What it does" title="Features">
        <ul className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f.title}>
              <FeatureCard feature={f} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
