import { useEffect, useState } from 'react'
import { lockScroll } from '../lib/scroll'

const DURATION = 1500
const EXIT = 1000
const words = ['Design', 'Develop', 'Deploy']

/**
 * Intro screen: a 0→100 counter and cycling words, then a two-layer curtain
 * wipes upwards to reveal the site. `onReveal` fires as the curtain starts
 * moving so the hero animation overlaps with it.
 */
export default function Preloader({ onReveal, onDone }) {
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    lockScroll(true)
    window.scrollTo(0, 0)
    let raf = 0
    let t1
    let t2
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        t1 = setTimeout(() => {
          setLeaving(true)
          lockScroll(false)
          onReveal()
          t2 = setTimeout(onDone, EXIT)
        }, 150)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
      lockScroll(false)
    }
  }, [onReveal, onDone])

  const word = words[Math.min(words.length - 1, Math.floor(count / 34))]

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      {/* trailing accent layer */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-mint-400 to-iris-500 transition-transform duration-[1000ms] ease-[cubic-bezier(.76,0,.24,1)]"
        style={{ transform: leaving ? 'translateY(-100%)' : 'none', transitionDelay: leaving ? '120ms' : '0ms' }}
      />
      {/* main layer */}
      <div
        className="absolute inset-0 flex flex-col justify-between bg-ink-950 p-6 transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)] sm:p-10"
        style={{ transform: leaving ? 'translateY(-100%)' : 'none' }}
      >
        <div className="flex items-center justify-between font-mono text-xs text-slate-500">
          <span>Krish Taliyan — Portfolio</span>
          <span>©{new Date().getFullYear()}</span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="overflow-hidden">
            <p key={word} className="text-4xl font-bold text-white [animation:slideUpIn_.5s_cubic-bezier(.2,.7,.2,1)] sm:text-6xl">
              {word}
              <span className="text-mint-400">.</span>
            </p>
          </div>
          <div className="h-px w-48 overflow-hidden bg-white/10 sm:w-72">
            <div className="h-full bg-gradient-to-r from-mint-400 to-iris-400" style={{ width: `${count}%` }} />
          </div>
        </div>

        <div className="flex items-end justify-between">
          <span className="font-mono text-xs text-slate-500">Loading experience</span>
          <span className="font-mono text-6xl font-bold tabular-nums text-white/90 sm:text-8xl">
            {String(count).padStart(3, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}
