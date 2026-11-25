import { achievements, timeline } from '../data'
import { spotlightHandler } from '../hooks'
import { CodeIcon, TrophyIcon } from './Icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Journey() {
  return (
    <section id="journey" className="section">
      <div className="container-x">
        <SectionHeading index="03" eyebrow="Journey" title={<>Experience, training &amp; <span className="gradient-text">education</span></>} />

        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          {/* Timeline */}
          <ol className="relative border-l border-white/10 pl-8">
            <span className="absolute -left-px top-0 h-2/3 w-px bg-gradient-to-b from-mint-400 via-iris-400 to-transparent" />
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 120} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[41px] top-1.5 grid h-5 w-5 place-items-center rounded-full border border-mint-400/50 bg-ink-950">
                  <span className="h-2 w-2 rounded-full bg-mint-400 shadow-[0_0_12px] shadow-mint-400" />
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-mint-300">{t.when}</span>
                  <span className="rounded-full bg-iris-400/10 px-2 py-0.5 text-[11px] font-medium text-iris-300">{t.kind}</span>
                </div>
                <h3 className="mt-2 text-xl font-semibold text-white">{t.title}</h3>
                <p className="text-sm text-slate-400">{t.org}</p>
                <ul className="mt-4 space-y-2">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>

          {/* Achievements */}
          <div className="space-y-5">
            {achievements.map((a, i) => {
              const Icon = i === 0 ? TrophyIcon : CodeIcon
              return (
                <Reveal key={a.title} delay={i * 150}>
                  <div onMouseMove={spotlightHandler} className="spotlight glass p-6 transition hover:border-mint-400/30">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint-400/10 text-mint-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-lg font-semibold text-white">{a.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">{a.body}</p>
                    <ul className="mt-4 space-y-2">
                      {a.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-sm text-slate-300">
                          <span className="text-mint-400">✓</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
