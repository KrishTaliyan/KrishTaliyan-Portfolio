import Lenis from 'lenis'
import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks'

/**
 * One smooth-scroll engine (Lenis) + one requestAnimationFrame loop for the
 * whole site. Components that react to scroll (parallax, stacking cards,
 * timeline fill…) subscribe with `useScrollFrame` instead of adding their own
 * scroll listeners, so everything updates in the same frame.
 */

let lenis = null
const subscribers = new Set()
const NAV_OFFSET = -76

export const getLenis = () => lenis

export function initSmoothScroll() {
  if (!prefersReducedMotion()) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    })
  }

  let raf = 0
  let lastY = -1
  let lastW = 0
  const loop = (time) => {
    lenis?.raf(time)
    const y = window.scrollY
    const w = window.innerWidth
    if (y !== lastY || w !== lastW) {
      lastY = y
      lastW = w
      const velocity = lenis ? lenis.velocity : 0
      subscribers.forEach((fn) => fn(y, velocity))
    }
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  // Route every in-page "#section" link through the smooth scroller.
  const onClick = (e) => {
    const a = e.target.closest?.('a[href^="#"]')
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return
    const id = a.getAttribute('href').slice(1)
    if (!id || !document.getElementById(id)) return
    e.preventDefault()
    scrollToId(id)
    history.replaceState(null, '', `#${id}`)
  }
  document.addEventListener('click', onClick)

  return () => {
    cancelAnimationFrame(raf)
    document.removeEventListener('click', onClick)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToId(id, { immediate = false } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = id === 'home' ? 0 : NAV_OFFSET
  if (lenis) {
    lenis.scrollTo(id === 'home' ? 0 : el, { offset, immediate, duration: 1.6 })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top: id === 'home' ? 0 : top, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
  }
}

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

/** Run `fn(scrollY, velocity)` on every frame where the page scrolled or resized. */
export function useScrollFrame(fn) {
  const ref = useRef(fn)
  useEffect(() => {
    ref.current = fn
  })
  useEffect(() => {
    const cb = (y, v) => ref.current(y, v)
    subscribers.add(cb)
    cb(window.scrollY, 0)
    return () => subscribers.delete(cb)
  }, [])
}

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))
