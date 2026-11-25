import { about, profile } from '../data'
import { PinIcon } from './Icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Terminal from './Terminal'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeading index="01" eyebrow="About me" title="Code, coffee &" highlight="curiosity" />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-slate-400 sm:text-lg">
            {about.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 120}>
                {p}
              </Reveal>
            ))}
            <Reveal delay={400} className="flex flex-wrap gap-3 pt-3">
              <span className="chip inline-flex items-center gap-1.5">
                <PinIcon className="h-3.5 w-3.5 text-mint-400" /> {profile.location}
              </span>
              <span className="chip">🎓 B.Tech CSE · LPU</span>
              <span className="chip">🧠 DSA enthusiast</span>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <p className="mb-3 font-mono text-xs text-slate-500">
              <span className="text-mint-400">//</span> Don&apos;t feel like reading? Ask the terminal.
            </p>
            <Terminal />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
