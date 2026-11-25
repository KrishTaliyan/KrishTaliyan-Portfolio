import { useRef } from 'react'
import { useScrollFrame } from '../lib/scroll'

/**
 * Oversized text band. Its horizontal position is driven by scroll, so it
 * glides sideways as you scroll down the page (and backwards on the way up).
 */
export default function BigMarquee({ items, speed = 0.35 }) {
  const track = useRef(null)
  const wrap = useRef(null)

  useScrollFrame(() => {
    const r = wrap.current?.getBoundingClientRect()
    if (!r || r.bottom < -200 || r.top > innerHeight + 200) return
    const x = (r.top - innerHeight) * speed
    track.current.style.transform = `translate3d(${x}px, 0, 0)`
  })

  const row = [...items, ...items, ...items]
  return (
    <div ref={wrap} className="relative overflow-hidden py-6 sm:py-10" aria-hidden="true">
      <div ref={track} className="flex w-max items-center gap-10 whitespace-nowrap will-change-transform">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-6xl font-extrabold uppercase tracking-tight sm:text-8xl lg:text-9xl">
            <span className={i % 2 ? 'text-outline' : 'gradient-text'}>{t}</span>
            <span className="text-3xl text-mint-400 sm:text-5xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
