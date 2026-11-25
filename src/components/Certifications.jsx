import { useEffect, useState } from 'react'
import { certifications } from '../data'
import { lockScroll } from '../lib/scroll'
import { CloseIcon } from './Icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Certifications() {
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    lockScroll(true)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [open])

  return (
    <section id="certifications" className="section">
      <div className="container-x">
        <SectionHeading index="05" eyebrow="Certifications" title="Always" highlight="levelling up">
          Click any certificate to view it full size.
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 120}>
              <button
                onClick={() => setOpen(c)}
                className="glass group flex h-full w-full flex-col overflow-hidden text-left transition duration-300 hover:-translate-y-1 hover:border-mint-400/30"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5">
                  <img
                    src={c.image}
                    alt={`${c.title} certificate`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full bg-ink-950/80 px-2.5 py-1 font-mono text-[10px] text-slate-300 opacity-0 transition group-hover:opacity-100">
                    View ↗
                  </span>
                </div>
                <div className="flex-1 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-mint-300">{c.issuer}</p>
                  <h3 className="mt-1.5 text-lg font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.body}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-ink-950/85 p-4 backdrop-blur-sm [animation:fadeIn_.25s]"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${open.title} certificate`}
        >
          <div className="relative max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={open.image} alt={`${open.title} certificate`} className="max-h-[80vh] w-auto rounded-xl border border-white/10 shadow-2xl" />
            <p className="mt-3 text-center text-sm text-slate-400">
              <span className="text-white">{open.title}</span> · {open.issuer}
            </p>
            <button
              onClick={() => setOpen(null)}
              className="absolute -right-3 -top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-ink-950 shadow-lg"
              aria-label="Close"
              autoFocus
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
