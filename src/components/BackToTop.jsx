import { useRef } from 'react'
import { scrollToId, useScrollFrame } from '../lib/scroll'
import Magnetic from './Magnetic'

const R = 22
const C = 2 * Math.PI * R

/** Floating button with a ring that fills as you scroll down the page. */
export default function BackToTop() {
  const wrap = useRef(null)
  const ring = useRef(null)

  useScrollFrame((y) => {
    const max = document.documentElement.scrollHeight - innerHeight
    const p = max > 0 ? y / max : 0
    ring.current.style.strokeDashoffset = String(C * (1 - p))
    const show = y > innerHeight * 0.8
    wrap.current.style.opacity = show ? '1' : '0'
    wrap.current.style.transform = show ? 'none' : 'translateY(16px) scale(.9)'
    wrap.current.style.pointerEvents = show ? 'auto' : 'none'
  })

  return (
    <div ref={wrap} className="fixed bottom-5 right-5 z-40 opacity-0 transition-all duration-500 sm:bottom-8 sm:right-8">
      <Magnetic strength={0.4}>
        <button
          onClick={() => scrollToId('home')}
          aria-label="Back to top"
          className="relative grid h-14 w-14 place-items-center rounded-full bg-ink-900/90 text-white shadow-2xl shadow-black/60 backdrop-blur transition hover:text-mint-300"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
            <circle cx="28" cy="28" r={R} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="2" />
            <circle
              ref={ring}
              cx="28"
              cy="28"
              r={R}
              fill="none"
              stroke="url(#btt)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C}
            />
            <defs>
              <linearGradient id="btt" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#34d399" />
                <stop offset="1" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </Magnetic>
    </div>
  )
}
