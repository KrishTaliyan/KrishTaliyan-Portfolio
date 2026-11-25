import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks'

/**
 * Custom cursor for mouse users: a precise dot plus a trailing ring that
 * grows over interactive elements and can show a label (data-cursor="View").
 */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion()) return
    const root = document.documentElement
    root.classList.add('has-cursor')
    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const ringPos = { ...pos }
    let raf = 0
    let shown = false

    const move = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!shown) {
        shown = true
        ringPos.x = pos.x
        ringPos.y = pos.y
        dot.current.style.opacity = ring.current.style.opacity = '1'
      }
      dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
    }
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18
      ringPos.y += (pos.y - ringPos.y) * 0.18
      ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    const over = (e) => {
      const target = e.target.closest?.('a, button, [data-cursor], input, textarea, label')
      const text = target?.closest('[data-cursor]')?.getAttribute('data-cursor') || ''
      const isField = target && (target.matches('input, textarea') || target.tagName === 'LABEL')
      ring.current.classList.toggle('is-hover', !!target && !isField)
      ring.current.classList.toggle('has-label', !!text)
      ring.current.classList.toggle('is-field', !!isField)
      label.current.textContent = text
    }
    const down = () => ring.current.classList.add('is-down')
    const up = () => ring.current.classList.remove('is-down')
    const leave = () => {
      shown = false
      dot.current.style.opacity = ring.current.style.opacity = '0'
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.documentElement.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(loop)
    return () => {
      root.classList.remove('has-cursor')
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span ref={label} className="cursor-label" />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
