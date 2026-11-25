import { useRef } from 'react'

const enabled = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Pulls its child gently towards the cursor while hovered. */
export default function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    if (!enabled()) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transition = 'transform .15s ease-out'
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }
  const onLeave = () => {
    const el = ref.current
    el.style.transition = 'transform .7s cubic-bezier(.2,1.4,.4,1)'
    el.style.transform = ''
  }

  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`inline-flex will-change-transform ${className}`}>
      {children}
    </span>
  )
}
