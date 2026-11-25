import { profile, stats } from '../data'
import { useCountUp, useTypewriter } from '../hooks'
import { ArrowDown, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from './Icons'
import ParticleField from './ParticleField'

function Stat({ value, suffix, label, decimals = 0 }) {
  const [ref, n] = useCountUp(value, { decimals })
  return (
    <div ref={ref} className="px-4 py-5 text-center sm:px-6">
      <p className="text-3xl font-bold text-white sm:text-4xl">
        {n}
        <span className="gradient-text">{suffix}</span>
      </p>
      <p className="mt-1 text-xs leading-snug text-slate-400 sm:text-sm">{label}</p>
    </div>
  )
}

const floating = [
  { label: 'React', cls: '-left-6 top-10', delay: '0s' },
  { label: 'Node.js', cls: '-right-4 top-24', delay: '1.2s' },
  { label: 'MongoDB', cls: '-left-10 bottom-20', delay: '2.1s' },
  { label: 'React Native', cls: '-right-10 bottom-8', delay: '0.6s' },
]

export default function Hero() {
  const role = useTypewriter(profile.roles)

  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden pt-28">
      {/* Background layers */}
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-iris-500/20 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-mint-500/15 blur-[120px]" />
      <ParticleField />

      <div className="container-x relative grid flex-1 items-center gap-14 pb-12 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-mint-400/25 bg-mint-400/[0.07] px-3.5 py-1.5 text-xs font-medium text-mint-300 opacity-0 [animation:fadeUp_.8s_.1s_forwards]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint-400" />
            </span>
            Open to internships & full-time roles
          </p>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white opacity-0 [animation:fadeUp_.8s_.25s_forwards] sm:text-6xl lg:text-7xl">
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
          </h1>

          <p className="mt-5 h-9 font-mono text-xl text-slate-300 opacity-0 [animation:fadeUp_.8s_.4s_forwards] sm:text-2xl">
            <span className="text-mint-400">&gt;</span> {role}
            <span className="ml-0.5 inline-block h-6 w-[3px] translate-y-1 animate-blink bg-mint-400" />
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 opacity-0 [animation:fadeUp_.8s_.55s_forwards] sm:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 opacity-0 [animation:fadeUp_.8s_.7s_forwards]">
            <a href="#projects" className="btn-primary">
              View my work <ArrowDown className="h-4 w-4" />
            </a>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-ghost">
              <DownloadIcon className="h-4 w-4" /> Resume
            </a>
            <div className="ml-1 flex items-center gap-1">
              {[
                { href: profile.github, icon: GithubIcon, label: 'GitHub' },
                { href: profile.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
                { href: `mailto:${profile.email}`, icon: MailIcon, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full text-slate-400 transition hover:-translate-y-0.5 hover:bg-white/5 hover:text-mint-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative mx-auto w-64 opacity-0 [animation:fadeIn_1.2s_.4s_forwards] sm:w-80">
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
              style={{ animationDelay: f.delay }}
            >
              {f.label}
            </span>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="container-x relative pb-10">
        <div className="glass grid grid-cols-2 divide-white/[0.07] opacity-0 [animation:fadeUp_.8s_.9s_forwards] max-sm:[&>*:nth-child(-n+2)]:border-b max-sm:[&>*]:border-white/[0.07] sm:grid-cols-4 sm:divide-x">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
