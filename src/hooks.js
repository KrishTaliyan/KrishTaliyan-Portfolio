import { useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Returns the id of the section currently in the middle of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

/** 0 → 1 scroll progress of the whole page. */
export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setP(max > 0 ? window.scrollY / max : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return p
}

/** Counts up from 0 to `target` the first time the returned ref is on screen. */
export function useCountUp(target, { duration = 1600, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0))
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let raf = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(target * eased)
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, duration])
  return [ref, value.toFixed(decimals)]
}

/** Cycles through `words`, typing and deleting each one. */
export function useTypewriter(words, { typeMs = 70, deleteMs = 40, holdMs = 1600 } = {}) {
  const [text, setText] = useState(prefersReducedMotion() ? words[0] : '')
  useEffect(() => {
    if (prefersReducedMotion()) return
    let i = 0
    let len = 0
    let deleting = false
    let timer
    const step = () => {
      const word = words[i]
      if (!deleting) {
        len++
        setText(word.slice(0, len))
        if (len === word.length) {
          deleting = true
          timer = setTimeout(step, holdMs)
          return
        }
        timer = setTimeout(step, typeMs)
      } else {
        len--
        setText(word.slice(0, len))
        if (len === 0) {
          deleting = false
          i = (i + 1) % words.length
        }
        timer = setTimeout(step, deleteMs)
      }
    }
    timer = setTimeout(step, 400)
    return () => clearTimeout(timer)
  }, [words, typeMs, deleteMs, holdMs])
  return text
}

/** Updates --mx / --my on an element so `.spotlight` can follow the cursor. */
export function spotlightHandler(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}
