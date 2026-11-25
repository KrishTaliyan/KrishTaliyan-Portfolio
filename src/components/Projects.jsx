import { useRef, useState } from 'react'
import { projects } from '../data'
import { prefersReducedMotion, spotlightHandler } from '../hooks'
import { clamp, useScrollFrame } from '../lib/scroll'
import { ArrowUpRight, GithubIcon } from './Icons'
import Magnetic from './Magnetic'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const featured = projects.filter((p) => p.featured)
const others = projects.filter((p) => !p.featured)
const STICKY_TOP = 96
const STEP = 28

/** Real screenshot of the live site inside a browser frame (falls back to an illustrated mock). */
function Preview({ p, tall = false }) {
  const [failed, setFailed] = useState(false)
  const [a, b] = p.accent
  const host = p.live.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <a
      href={p.live}
      target="_blank"
      rel="noreferrer"
      data-cursor="Visit ↗"
      className="group/preview relative block overflow-hidden rounded-2xl border border-white/10 bg-ink-800"
      style={{ boxShadow: `0 30px 80px -30px ${a}55` }}
      aria-label={`Open ${p.title} live demo`}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-ink-900 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate rounded-md bg-white/[0.05] px-2.5 py-0.5 font-mono text-[10px] text-slate-500">{host}</span>
      </div>
      <div className={`relative overflow-hidden ${tall ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}>
        {!failed && p.image ? (
          <img
            src={p.image}
            alt={`Screenshot of ${p.title}`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top transition duration-[1.2s] ease-out group-hover/preview:scale-[1.04]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center" style={{ background: `linear-gradient(135deg, ${a}40, ${b}30)` }}>
            <span className="text-6xl">{p.emoji}</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent opacity-0 transition duration-500 group-hover/preview:opacity-100" />
      </div>
    </a>
  )
}

function Tags({ tags }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <li key={t} className="chip !text-[11px]">
          {t}
        </li>
      ))}
    </ul>
  )
}

function Links({ p }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Magnetic>
        <a
          href={p.live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-mint-300"
        >
          Live demo <ArrowUpRight className="h-4 w-4" />
        </a>
      </Magnetic>
      {p.code && (
        <Magnetic>
          <a
            href={p.code}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm text-slate-200 transition hover:border-white/40 hover:text-white"
          >
            <GithubIcon className="h-4 w-4" /> Source code
          </a>
        </Magnetic>
      )}
    </div>
  )
}

/** Featured projects pin to the top and stack; covered cards shrink and dim. */
function FeaturedStack() {
  const wrappers = useRef([])
  const cards = useRef([])
  const shades = useRef([])

  useScrollFrame(() => {
    if (innerWidth < 1024 || prefersReducedMotion()) {
      cards.current.forEach((c) => c && (c.style.transform = ''))
      shades.current.forEach((s) => s && (s.style.opacity = '0'))
      return
    }
    featured.forEach((_, i) => {
      const next = wrappers.current[i + 1]
      const card = cards.current[i]
      if (!card) return
      let p = 0
      if (next) {
        const nextTop = next.getBoundingClientRect().top
        const target = STICKY_TOP + (i + 1) * STEP
        p = clamp(1 - (nextTop - target) / (innerHeight * 0.7))
      }
      const depth = featured.length - 1 - i
      card.style.transform = `scale(${1 - p * 0.05 * depth})`
      shades.current[i].style.opacity = String(p * 0.55)
    })
  })

  return (
    <div className="space-y-8 lg:space-y-0">
      {featured.map((p, i) => (
        <div
          key={p.title}
          ref={(el) => (wrappers.current[i] = el)}
          className="lg:sticky lg:pb-16"
          style={{ top: STICKY_TOP + i * STEP }}
        >
          <Reveal>
            <article
              ref={(el) => (cards.current[i] = el)}
              onMouseMove={spotlightHandler}
              className="spotlight relative origin-top overflow-hidden rounded-3xl border border-white/10 bg-ink-900 p-5 shadow-[0_-20px_60px_-20px_rgba(0,0,0,.8)] will-change-transform sm:p-8"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-[100px]"
                style={{ background: p.accent[0] }}
              />
              <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
                <div className={i % 2 ? 'lg:order-2' : ''}>
                  <Preview p={p} tall />
                </div>
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider">
                    <span className="text-5xl font-bold text-white/10">0{i + 1}</span>
                    <span className="text-mint-300">{p.category}</span>
                    <span className="text-slate-600">/</span>
                    <span className="text-slate-500">{p.date}</span>
                  </div>
                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{p.title}</h3>
                  <p className="mt-1 text-lg text-slate-400">{p.subtitle}</p>
                  <p className="mt-5 text-[15px] leading-relaxed text-slate-400">{p.description}</p>
                  <div className="mt-6">
                    <Tags tags={p.tags} />
                  </div>
                  <div className="mt-8">
                    <Links p={p} />
                  </div>
                </div>
              </div>
              <div ref={(el) => (shades.current[i] = el)} className="pointer-events-none absolute inset-0 bg-ink-950 opacity-0" />
            </article>
          </Reveal>
        </div>
      ))}
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-mint-500/10 blur-[140px]" />
      <div className="container-x relative">
        <SectionHeading index="04" eyebrow="Selected work" title="Projects I've" highlight="shipped">
          Every project here is live — hover a preview and click through to try it.
        </SectionHeading>

        <FeaturedStack />

        <Reveal className="mb-10 mt-24 flex items-end justify-between gap-4 lg:mt-16">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">
            More things I&apos;ve <span className="gradient-text">built</span>
          </h3>
          <a href="https://github.com/KrishTaliyan" target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 text-sm text-slate-400 transition hover:text-white sm:inline-flex">
            <GithubIcon className="h-4 w-4" /> All repositories <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {others.map((p, i) => (
            <Reveal key={p.title} delay={i * 110}>
              <article
                onMouseMove={spotlightHandler}
                className="spotlight glass group flex h-full flex-col p-4 transition duration-500 hover:-translate-y-1.5 hover:border-white/20"
              >
                <Preview p={p} />
                <div className="flex flex-1 flex-col px-1 pt-5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-mint-300">{p.category}</p>
                  <h4 className="mt-1.5 text-xl font-semibold text-white">
                    {p.title} <span className="font-normal text-slate-500">— {p.subtitle}</span>
                  </h4>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>
                  <div className="mt-4">
                    <Tags tags={p.tags} />
                  </div>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 self-start border-t border-white/[0.06] pt-4 text-sm font-medium text-white transition hover:text-mint-300"
                  >
                    Live demo <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
