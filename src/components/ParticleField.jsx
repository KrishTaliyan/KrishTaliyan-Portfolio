import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks'

/**
 * A constellation of drifting particles. Nearby particles link up with faint
 * lines, and the cursor gently pulls particles towards it and draws links too.
 */
export default function ParticleField({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = prefersReducedMotion()
    const mouse = { x: -9999, y: -9999 }
    let w = 0
    let h = 0
    let dpr = 1
    let particles = []
    let raf = 0
    let visible = true

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(110, (w * h) / 14000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        hue: Math.random() < 0.6 ? 158 : 258,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const linkDist = 120
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (!reduced) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const d = Math.hypot(dx, dy)
          if (d < 180 && d > 0) {
            p.vx += (dx / d) * 0.012
            p.vy += (dy / d) * 0.012
          }
          p.vx *= 0.99
          p.vy *= 0.99
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
          // keep a minimum drift so the field never freezes
          if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.05
          if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.05
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, 0.75)`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < linkDist) {
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.14 * (1 - d / linkDist)})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
        const md = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        if (md < 160) {
          ctx.strokeStyle = `rgba(52, 211, 153, ${0.35 * (1 - md / 160)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }
    }

    const loop = () => {
      if (visible) draw()
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(canvas)

    resize()
    if (reduced) draw()
    else loop()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />
}
