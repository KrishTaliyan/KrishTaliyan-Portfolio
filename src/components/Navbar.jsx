import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { nav, profile } from '../data'
import { useActiveSection } from '../hooks'
import { useScrollFrame } from '../lib/scroll'
import { CloseIcon, MenuIcon } from './Icons'
import Magnetic from './Magnetic'

const ids = nav.map((n) => n.id)

export default function Navbar() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [pill, setPill] = useState({ left: 0, width: 0 })
  const bar = useRef(null)
  const lastY = useRef(0)
  const links = useRef({})

  useScrollFrame((y) => {
    const max = document.documentElement.scrollHeight - innerHeight
    if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
    setScrolled(y > 24)
    // Hide while scrolling down, reveal on the way back up.
    const dy = y - lastY.current
    if (Math.abs(dy) > 6) {
      setHidden(dy > 0 && y > 400)
      lastY.current = y
    }
  })

  // Slide the highlight pill under the active link.
  useLayoutEffect(() => {
    const measure = () => {
      const el = links.current[active]
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
        hidden && !open ? '-translate-y-24' : ''
      }`}
    >
      <div ref={bar} className="absolute left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-mint-400 to-iris-400" style={{ transform: 'scaleX(0)' }} />
      <nav
        className={`container-x mt-3 flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled ? 'glass shadow-2xl shadow-black/40' : 'border border-transparent'
        }`}
        aria-label="Main"
      >
        <a href="#home" className="group flex items-center gap-2 font-bold text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-mint-400 to-iris-400 font-mono text-sm text-ink-950 transition-transform duration-700 group-hover:rotate-[360deg]">
            KT
          </span>
          <span className="hidden sm:inline">
            {profile.firstName}
            <span className="text-mint-400">.</span>
          </span>
        </a>

        <ul className="relative hidden items-center gap-1 md:flex">
          <span
            className="absolute top-0 h-full rounded-full bg-white/[0.08] transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
            style={{ left: pill.left, width: pill.width, opacity: pill.width ? 1 : 0 }}
            aria-hidden="true"
          />
          {nav.map((item) => (
            <li key={item.id} ref={(el) => (links.current[item.id] = el)} className="relative">
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active === item.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Magnetic className="hidden sm:inline-flex">
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary !px-4 !py-2 text-xs">
              Resume
            </a>
          </Magnetic>
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`container-x transition-all duration-300 md:hidden ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
      >
        <ul className="glass mt-2 grid gap-1 bg-ink-900/90 p-3">
          {nav.map((item, i) => (
            <li
              key={item.id}
              className="transition-all duration-500"
              style={{ transitionDelay: open ? `${i * 40}ms` : '0ms', opacity: open ? 1 : 0, transform: open ? 'none' : 'translateY(-6px)' }}
            >
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${
                  active === item.id ? 'bg-white/[0.08] text-white' : 'text-slate-300'
                }`}
              >
                {item.label}
                <span className="font-mono text-[10px] text-slate-600">0{i}</span>
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary mt-1 w-full">
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
