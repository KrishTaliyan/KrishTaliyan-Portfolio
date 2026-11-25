import { nav, profile } from '../data'
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="container-x flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-semibold text-white">
            {profile.name}
            <span className="text-mint-400">.</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">
            © {new Date().getFullYear()} · Designed &amp; built with React + Tailwind CSS
          </p>
        </div>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-400">
          {nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className="transition hover:text-white">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          {[
            [profile.github, GithubIcon, 'GitHub'],
            [profile.linkedin, LinkedinIcon, 'LinkedIn'],
            [`mailto:${profile.email}`, MailIcon, 'Email'],
          ].map(([href, Icon, label]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-400 transition hover:border-mint-400/50 hover:text-mint-300"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
