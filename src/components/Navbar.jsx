import { useEffect, useState } from 'react'
import { nav, profile } from '../data'
import { useActiveSection, useScrollProgress } from '../hooks'
import { CloseIcon, MenuIcon } from './Icons'

const ids = nav.map((n) => n.id)

export default function Navbar() {
  const active = useActiveSection(ids)
  const progress = useScrollProgress()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="absolute left-0 top-0 h-[2px] bg-gradient-to-r from-mint-400 to-iris-400 transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
      />
      <nav
        className={`container-x mt-3 flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled ? 'glass shadow-2xl shadow-black/40' : 'border border-transparent'
        }`}
        aria-label="Main"
      >
        <a href="#home" className="group flex items-center gap-2 font-bold text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-mint-400 to-iris-400 font-mono text-sm text-ink-950 transition-transform duration-500 group-hover:rotate-[360deg]">
            KT
          </span>
          <span className="hidden sm:inline">
            {profile.firstName}
            <span className="text-mint-400">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active === item.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {active === item.id && <span className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]" />}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary hidden !px-4 !py-2 text-xs sm:inline-flex">
            Resume
          </a>
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
        <ul className="glass mt-2 grid gap-1 p-3">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm ${
                  active === item.id ? 'bg-white/[0.08] text-white' : 'text-slate-300'
                }`}
              >
                {item.label}
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
