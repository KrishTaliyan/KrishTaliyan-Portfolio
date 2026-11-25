import { useRef } from 'react'
import { profile, stats } from '../data'
import { useCountUp, useTypewriter } from '../hooks'
import { clamp, useScrollFrame } from '../lib/scroll'
import { ArrowDown, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from './Icons'
import Magnetic from './Magnetic'
import ParticleField from './ParticleField'
import SplitText from './SplitText'

function Stat({ value, suffix, label, decimals = 0, ready }) {
  const [ref, n] = useCountUp(value, { decimals, enabled: ready, duration: 2000 })
  return (
    <div ref={ref} className="px-4 py-5 text-center sm:px-6">
      <p className="text-3xl font-bold tabular-nums text-white sm:text-4xl">
        {n}
        <span className="gradient-text">{suffix}</span>
      </p>
      <p className="mt-1 text-xs leading-snug text-slate-400 sm:text-sm">{label}</p>
    </div>
  )
}

const floating = [
  { label: 'React', cls: '-left-8 top-10', delay: '0s' },
  { label: 'Node.js', cls: '-right-6 top-24', delay: '1.2s' },
  { label: 'MongoDB', cls: '-left-12 bottom-24', delay: '2.1s' },
  { label: 'React Native', cls: '-right-12 bottom-10', delay: '0.6s' },
]

const socials = [
  { href: profile.github, icon: GithubIcon, label: 'GitHub' },
  { href: profile.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
  { href: `mailto:${profile.email}`, icon: MailIcon, label: 'Email' },
]

export default function Hero({ ready }) {
  const role = useTypewriter(profile.roles)
  const text = useRef(null)
  const portrait = useRef(null)
  const blobs = useRef(null)
  const portraitTilt = useRef(null)

  // Parallax: as you scroll away, the text drifts up and fades, the portrait lags behind.
  useScrollFrame((y) => {
    const p = clamp(y / innerHeight)
    if (text.current) {
      text.current.style.transform = `translate3d(0, ${y * -0.18}px, 0)`
      text.current.style.opacity = String(1 - p * 1.1)
    }
    if (portrait.current) portrait.current.style.transform = `translate3d(0, ${y * 0.12}px, 0) rotate(${p * 4}deg)`
    if (blobs.current) blobs.current.style.transform = `translate3d(0, ${y * 0.3}px, 0)`
  })

  // Portrait tilts towards the cursor.
  const onTilt = (e) => {
    const el = portraitTilt.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${y * -10}deg)`
  }
  const resetTilt = () => (portraitTilt.current.style.transform = '')

  return (
    <section id="home" className={`relative flex min-h-[100svh] flex-col overflow-hidden pt-28 ${ready ? 'is-ready' : ''}`}>
      {/* Background layers */}
      <div className="grid-bg absolute inset-0" />
      <div ref={blobs} className="absolute inset-0">
        <div className="absolute -left-40 top-10 h-[28rem] w-[28rem] animate-float rounded-full bg-iris-500/20 blur-[120px] [animation-duration:9s]" />
        <div className="absolute -right-32 bottom-0 h-[26rem] w-[26rem] animate-float rounded-full bg-mint-500/15 blur-[120px] [animation-delay:2s] [animation-duration:11s]" />
      </div>
      <ParticleField />

      <div className="container-x relative grid flex-1 items-center gap-14 pb-12 lg:grid-cols-[1.25fr_1fr]">
        <div ref={text} className="will-change-transform">
          <p className="hero-in inline-flex items-center gap-2 rounded-full border border-mint-400/25 bg-mint-400/[0.07] px-3.5 py-1.5 text-xs font-medium text-mint-300" style={{ '--d': '0ms' }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint-400" />
            </span>
            Open to internships &amp; full-time roles
          </p>

          <SplitText
            as="h1"
            play={ready}
            delay={150}
            stagger={90}
            className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            parts={[{ text: "Hi, I'm" }, { text: profile.name, className: 'gradient-text' }]}
          />

          <p className="hero-in mt-5 h-9 font-mono text-xl text-slate-300 sm:text-2xl" style={{ '--d': '450ms' }}>
            <span className="text-mint-400">&gt;</span> {role}
            <span className="ml-0.5 inline-block h-6 w-[3px] translate-y-1 animate-blink bg-mint-400" />
          </p>

          <p className="hero-in mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg" style={{ '--d': '550ms' }}>
            {profile.tagline}
          </p>

          <div className="hero-in mt-9 flex flex-wrap items-center gap-3" style={{ '--d': '650ms' }}>
            <Magnetic>
              <a href="#projects" className="btn-primary">
                View my work <ArrowDown className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-ghost">
                <DownloadIcon className="h-4 w-4" /> Resume
              </a>
            </Magnetic>
            <div className="ml-1 flex items-center gap-1">
              {socials.map(({ href, icon: Icon, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full text-slate-400 transition hover:bg-white/5 hover:text-mint-300"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        {/* Portrait */}
        <div ref={portrait} className="will-change-transform">
          <div className="hero-in-scale relative mx-auto w-64 opacity-0 sm:w-80" style={{ '--d': '300ms' }} onMouseMove={onTilt} onMouseLeave={resetTilt}>
            <div ref={portraitTilt} className="relative transition-transform duration-300 ease-out [transform-style:preserve-3d]">
              <div className="absolute -inset-3 animate-spin-slow rounded-[2.2rem] bg-[conic-gradient(from_0deg,#34d399,#a78bfa,#0ea5e9,#34d399)] opacity-70 blur-md" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-800">
                <img
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  className="aspect-[4/5] w-full object-cover object-top"
                  fetchPriority="high"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 to-transparent p-4">
                  <p className="font-mono text-xs text-mint-300">~/krish $ status</p>
                  <p className="text-sm font-semibold text-white">Building with the MERN stack</p>
                </div>
              </div>
              {floating.map((f) => (
                <span
                  key={f.label}
                  className={`absolute hidden animate-float rounded-xl border border-white/10 bg-ink-900/95 px-3 py-1.5 font-mono text-xs text-mint-300 shadow-xl shadow-black/40 sm:block ${f.cls}`}
                  style={{ animationDelay: f.delay, transform: 'translateZ(40px)' }}
                >
                  {f.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        className="hero-in absolute bottom-40 right-6 hidden flex-col items-center gap-3 text-slate-500 transition hover:text-mint-300 xl:flex"
        style={{ '--d': '1000ms' }}
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollHint_1.8s_ease-in-out_infinite] bg-mint-400" />
        </span>
      </a>

      {/* Stats strip */}
      <div className="container-x relative pb-10">
        <div
          className="hero-in glass grid grid-cols-2 divide-white/[0.07] max-sm:[&>*:nth-child(-n+2)]:border-b max-sm:[&>*]:border-white/[0.07] sm:grid-cols-4 sm:divide-x"
          style={{ '--d': '800ms' }}
        >
          {stats.map((s) => (
            <Stat key={s.label} {...s} ready={ready} />
          ))}
        </div>
      </div>
    </section>
  )
}
