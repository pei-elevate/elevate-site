import { useEffect, useRef, type RefObject } from 'react'

// Drawing geometry (SVG user units). Floor 0 is the ground floor; the cabin starts at the top.
const FLOORS = 3
const FLOOR_H = 96
const GROUND = 380
const TOP = GROUND - FLOORS * FLOOR_H
const SHAFT = { x: 60, w: 120 }
const CAB = { x: 68, w: 104, h: 84 }
const PULLEY = { x: 120, y: 72, r: 14 }
const TRAVEL = (FLOORS - 1) * FLOOR_H
const CAB_TOP = GROUND - (FLOORS - 1) * FLOOR_H - 2 - CAB.h
const CW = { w: 12, h: 50, top: GROUND - 12 - 50 }
const DOOR_W = (CAB.w - 8) / 2

const floorBottom = (f: number) => GROUND - f * FLOOR_H
const clamp = (v: number) => Math.min(1, Math.max(0, v))

const NAV_H = 80

/**
 * Scroll progress of the ride, from 0 to 1.
 * Pinned (large screens): the hero sticks while its extra height scrolls past.
 * Not pinned (small screens): the ride runs while the drawing itself scrolls up the screen.
 */
function progressOf(track: HTMLElement, drawing: Element, pinned: boolean) {
  if (pinned) {
    const rect = track.getBoundingClientRect()
    return clamp((NAV_H - rect.top) / Math.max(1, rect.height - (window.innerHeight - NAV_H)))
  }
  const start = window.innerHeight * 0.65
  return clamp((start - drawing.getBoundingClientRect().top) / Math.max(1, start - NAV_H))
}

/**
 * Elevator shaft whose cabin rides down from the top floor to the ground floor as the page scrolls
 * through `trackRef`. Doors are open at both ends of the ride. Everything is driven from refs, so
 * scrolling never re-renders React.
 */
export function ElevatorIllustration({ trackRef }: { trackRef: RefObject<HTMLElement | null> }) {
  const svg = useRef<SVGSVGElement>(null)
  const cabin = useRef<SVGGElement>(null)
  const counterweight = useRef<SVGGElement>(null)
  const pulley = useRef<SVGGElement>(null)
  const doors = useRef<(SVGRectElement | null)[]>([])
  const floorText = useRef<SVGTextElement>(null)
  const arrowText = useRef<SVGTextElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const drawing = svg.current
    if (!track || !drawing) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Matches the hero's `lg:motion-safe:` pinning classes.
    const wide = window.matchMedia('(min-width: 64rem)')
    const progress = () => progressOf(track, drawing, wide.matches && !reduced)

    let target = progress()
    let current = target
    let frame = 0
    let lastFloor = -1
    let lastArrow = ''
    let lastOpen: boolean | null = null

    const draw = (velocity: number) => {
      const y = current * TRAVEL
      cabin.current?.style.setProperty('transform', `translateY(${y}px)`)
      counterweight.current?.style.setProperty('transform', `translateY(${-y}px)`)
      pulley.current?.style.setProperty('transform', `rotate(${-current * 900}deg)`)

      const position = (FLOORS - 1) * (1 - current)
      const floor = Math.round(position)
      if (floor !== lastFloor) {
        lastFloor = floor
        if (floorText.current) floorText.current.textContent = String(floor)
      }

      const arrow = velocity > 0.0004 ? '▼' : velocity < -0.0004 ? '▲' : '•'
      if (arrow !== lastArrow && arrowText.current) arrowText.current.textContent = lastArrow = arrow

      const open = current < 0.015 || current > 0.985
      if (open !== lastOpen) {
        lastOpen = open
        doors.current.forEach((d, i) => d?.style.setProperty('transform', `translateX(${open ? (i ? 1 : -1) * (DOOR_W - 4) : 0}px)`))
      }
    }

    // Ease towards the scroll position for a smooth, slightly weighty ride.
    const tick = () => {
      const delta = target - current
      current = Math.abs(delta) < 0.0005 ? target : current + delta * 0.12
      draw(target - current)
      frame = current === target ? 0 : requestAnimationFrame(tick)
      if (!frame) draw(0)
    }

    const onScroll = () => {
      target = progress()
      if (reduced) {
        current = target
        draw(0)
      } else if (!frame) frame = requestAnimationFrame(tick)
    }

    draw(0)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [trackRef])

  return (
    <svg ref={svg} viewBox="44 0 152 384" className="h-full w-auto max-w-full" role="img" aria-label="Elevator that rides down as the page scrolls">
      <defs>
        <clipPath id="elevator-shaft">
          <rect x={SHAFT.x} y={PULLEY.y} width={SHAFT.w} height={GROUND - PULLEY.y} />
        </clipPath>
        <clipPath id="elevator-doors">
          <rect x={CAB.x + 4} y={CAB_TOP + 5} width={CAB.w - 8} height={CAB.h - 9} />
        </clipPath>
      </defs>

      {/* Floor display, in the headline's type */}
      <rect x="60" y="0" width="120" height="44" rx="10" className="fill-deep stroke-petrol dark:stroke-deep-line" strokeWidth="2" />
      <text ref={arrowText} x="88" y="28" textAnchor="middle" className="fill-accent text-[14px] font-bold">
        •
      </text>
      <text ref={floorText} x="136" y="35" textAnchor="middle" className="fill-accent font-sans text-[34px] font-bold tracking-[-0.03em]">
        {FLOORS - 1}
      </text>

      {/* Machine head */}
      <rect x="52" y="52" width="136" height={TOP - 52} rx="6" className="fill-petrol dark:fill-deep-line" />

      {/* Shaft */}
      <rect x={SHAFT.x} y={TOP} width={SHAFT.w} height={GROUND - TOP} className="fill-slate-100 dark:fill-deep-card" />
      {[SHAFT.x + 4, SHAFT.x + SHAFT.w - 4].map((rx) => (
        <line key={rx} x1={rx} x2={rx} y1={TOP} y2={GROUND} strokeWidth="2" className="stroke-slate-300 dark:stroke-deep-line" />
      ))}

      {/* Floor slabs */}
      {Array.from({ length: FLOORS }, (_, f) => (
        <line
          key={f}
          x1="50"
          x2="190"
          y1={floorBottom(f)}
          y2={floorBottom(f)}
          strokeWidth={f ? 3 : 5}
          strokeLinecap="round"
          className="stroke-petrol dark:stroke-secondary"
        />
      ))}

      <g clipPath="url(#elevator-shaft)">
        {/* Counterweight: rides opposite to the cabin, behind it */}
        <g ref={counterweight}>
          <rect x={PULLEY.x + PULLEY.r - 1} y={CW.top - 600} width="2" height="600" className="fill-slate-500 dark:fill-secondary" />
          <rect x={PULLEY.x + PULLEY.r - CW.w / 2} y={CW.top} width={CW.w} height={CW.h} rx="2" className="fill-slate-400 dark:fill-deep-line" />
        </g>

        {/* Cabin, with its cable running up to the pulley */}
        <g ref={cabin}>
          <rect x={PULLEY.x - PULLEY.r - 1} y={CAB_TOP - 600} width="2" height="600" className="fill-slate-500 dark:fill-secondary" />
          <rect x={CAB.x} y={CAB_TOP} width={CAB.w} height={CAB.h} rx="6" className="fill-petrol dark:fill-secondary" />
          <rect x={CAB.x + 4} y={CAB_TOP + 5} width={CAB.w - 8} height={CAB.h - 9} className="fill-white" />
          <rect x={CAB.x + 4} y={CAB_TOP + 5} width={CAB.w - 8} height={CAB.h - 9} className="fill-accent/60" />
          {/* Passenger */}
          <circle cx={CAB.x + CAB.w / 2} cy={CAB_TOP + 38} r="9" className="fill-petrol dark:fill-deep" />
          <path d={`M${CAB.x + CAB.w / 2 - 15} ${CAB_TOP + CAB.h - 4} v-18 a15 15 0 0 1 30 0 v18 Z`} className="fill-petrol dark:fill-deep" />
          <g clipPath="url(#elevator-doors)">
            {[0, 1].map((i) => (
              <rect
                key={i}
                ref={(el) => {
                  doors.current[i] = el
                }}
                x={CAB.x + 4 + i * DOOR_W}
                y={CAB_TOP + 5}
                width={DOOR_W}
                height={CAB.h - 9}
                className="elevator-door fill-slate-300 stroke-slate-400 dark:fill-deep-line dark:stroke-deep-card"
                strokeWidth="1"
              />
            ))}
          </g>
        </g>
      </g>

      {/* Pulley */}
      <circle cx={PULLEY.x} cy={PULLEY.y} r={PULLEY.r} className="fill-slate-300 stroke-deep dark:fill-deep dark:stroke-secondary" strokeWidth="3" />
      <g ref={pulley} style={{ transformOrigin: `${PULLEY.x}px ${PULLEY.y}px` }}>
        <line x1={PULLEY.x - PULLEY.r + 3} x2={PULLEY.x + PULLEY.r - 3} y1={PULLEY.y} y2={PULLEY.y} strokeWidth="3" className="stroke-deep dark:stroke-secondary" />
        <line x1={PULLEY.x} x2={PULLEY.x} y1={PULLEY.y - PULLEY.r + 3} y2={PULLEY.y + PULLEY.r - 3} strokeWidth="3" className="stroke-deep dark:stroke-secondary" />
      </g>
      <circle cx={PULLEY.x} cy={PULLEY.y} r="3" className="fill-accent" />
    </svg>
  )
}
