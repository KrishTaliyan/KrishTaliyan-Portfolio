import { useMemo, useState } from 'react'
import { projects } from '../data'
import { prefersReducedMotion } from '../hooks'
import { ArrowUpRight, GithubIcon } from './Icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const filters = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

/** Tilts the card in 3D towards the cursor and moves the spotlight glow. */
function onTilt(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left
  const y = e.clientY - r.top
  el.style.setProperty('--mx', `${x}px`)
  el.style.setProperty('--my', `${y}px`)
  if (prefersReducedMotion()) return
  const rx = ((y / r.height) - 0.5) * -6
  const ry = ((x / r.width) - 0.5) * 6
  el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
}
function resetTilt(e) {
  e.currentTarget.style.transform = ''
}

function Cover({ p, large }) {
  const [a, b] = p.accent
  return (
    <div
      className={`relative overflow-hidden rounded-xl h-44`}
      style={{ background: `linear-gradient(135deg, ${a}33, ${b}22 60%, transparent)` }}
    >
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl" style={{ background: `${a}55` }} />
      <div className="absolute -bottom-12 -left-6 h-36 w-36 rounded-full blur-3xl" style={{ background: `${b}44` }} />
      {/* faux browser window */}
      <div className="absolute inset-x-6 bottom-0 top-6 rounded-t-lg border border-white/10 bg-ink-950/70 backdrop-blur transition-transform duration-500 group-hover:-translate-y-1.5">
        <div className="flex gap-1.5 border-b border-white/5 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
        <div className="flex items-center gap-4 p-4">
          <span className={`${large ? 'text-5xl' : 'text-4xl'} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}>{p.emoji}</span>
          <div className="flex-1 space-y-2">
            <div className="h-2 w-3/4 rounded-full" style={{ background: `linear-gradient(90deg, ${a}, ${b})` }} />
            <div className="h-2 w-1/2 rounded-full bg-white/10" />
            <div className="h-2 w-2/3 rounded-full bg-white/[0.06]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ p, large }) {
  return (
    <article
      onMouseMove={onTilt}
      onMouseLeave={resetTilt}
      className="spotlight glass group flex h-full flex-col p-4 transition-[transform,border-color] duration-200 ease-out hover:border-white/15 sm:p-5"
    >
      <Cover p={p} large={large} />
      <div className="flex flex-1 flex-col px-1 pt-5">
        <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider">
          <span className="text-mint-300">{p.category}</span>
          {p.date && <span className="text-slate-500">{p.date}</span>}
        </div>
        <h3 className="mt-2 text-xl font-semibold text-white">
          {p.title}
          <span className="font-normal text-slate-500"> — {p.subtitle}</span>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <li key={t} className="chip !text-[11px]">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4">
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition hover:bg-mint-400 hover:text-ink-950"
          >
            Live demo <ArrowUpRight className="h-4 w-4" />
          </a>
          {p.code && (
            <a
              href={p.code}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              <GithubIcon className="h-4 w-4" /> Source
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const shown = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter])

  return (
    <section id="projects" className="section">
      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-mint-500/10 blur-[140px]" />
      <div className="container-x relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading index="04" eyebrow="Selected work" title={<>Projects I&apos;ve <span className="gradient-text">shipped</span></>}>
            Every project below is live — click through and try them out.
          </SectionHeading>
          <Reveal className="mb-14 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  filter === f
                    ? 'bg-gradient-to-r from-mint-400 to-iris-400 font-semibold text-ink-950'
                    : 'border border-white/10 text-slate-400 hover:border-white/25 hover:text-white'
                }`}
              >
                {f}
                <span className="ml-1.5 font-mono text-[10px] opacity-70">
                  {f === 'All' ? projects.length : projects.filter((p) => p.category === f).length}
                </span>
              </button>
            ))}
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Reveal key={`${filter}-${p.title}`} delay={(i % 3) * 100}>
              <ProjectCard p={p} large={p.featured} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
