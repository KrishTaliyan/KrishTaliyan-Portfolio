import { useRef } from 'react'
import { skillGroups } from '../data'
import { spotlightHandler } from '../hooks'
import { clamp, useScrollFrame } from '../lib/scroll'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const all = skillGroups.flatMap((g) => g.items)

function Marquee({ items, reverse = false }) {
  const doubled = [...items, ...items]
  return (
    <div className="relative flex overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className={`flex shrink-0 animate-marquee ${reverse ? '[animation-direction:reverse]' : ''}`}>
        {doubled.map((s, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="mr-3 whitespace-nowrap rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-slate-300"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const rows = useRef(null)
  const idle = useRef(0)

  // Marquee rows lean in the direction you scroll, proportional to scroll speed.
  useScrollFrame((_, v) => {
    const el = rows.current
    if (!el) return
    el.style.setProperty('--skew', `${clamp(-v * 0.35, -10, 10)}deg`)
    clearTimeout(idle.current)
    idle.current = setTimeout(() => el.style.setProperty('--skew', '0deg'), 120)
  })

  return (
    <section id="skills" className="section overflow-hidden">
      <div className="absolute left-1/2 top-1/3 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-iris-500/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading index="02" eyebrow="Tech arsenal" title="The tools I" highlight="build with">
          A full-stack toolkit — from typed-out algorithms to production deployments.
        </SectionHeading>
      </div>

      <div ref={rows} className="velocity-skew relative mb-14 space-y-3">
        <Marquee items={all.slice(0, Math.ceil(all.length / 2))} />
        <Marquee items={all.slice(Math.ceil(all.length / 2))} reverse />
      </div>

      <div className="container-x relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 100}>
            <div
              onMouseMove={spotlightHandler}
              className="spotlight glass group h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-mint-400/30"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-mint-400/20 to-iris-400/20 font-mono text-lg text-mint-300">
                  {g.icon}
                </span>
                <span className="font-mono text-xs text-slate-500">0{i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="chip transition group-hover:border-white/20">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
