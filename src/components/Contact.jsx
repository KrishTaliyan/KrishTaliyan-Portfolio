import { useState } from 'react'
import { profile } from '../data'
import { spotlightHandler } from '../hooks'
import { CheckIcon, CopyIcon, GithubIcon, LinkedinIcon, MailIcon, PhoneIcon, SendIcon } from './Icons'
import BigMarquee from './BigMarquee'
import Magnetic from './Magnetic'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: MailIcon, copy: true },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: PhoneIcon, copy: true },
  { label: 'LinkedIn', value: 'in/krish-taliyan', href: profile.linkedin, icon: LinkedinIcon },
  { label: 'GitHub', value: 'KrishTaliyan', href: profile.github, icon: GithubIcon },
]

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-mint-400/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-mint-400/10'

export default function Contact() {
  const [copied, setCopied] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(label)
      setTimeout(() => setCopied(null), 1800)
    } catch {
      /* clipboard blocked — the link still works */
    }
  }

  // GitHub Pages has no backend, so the form opens the visitor's email app
  // with the message already filled in.
  const onSubmit = (e) => {
    e.preventDefault()
    const subject = `Portfolio enquiry from ${form.name}`
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <section id="contact" className="section overflow-hidden !pt-10">
      <BigMarquee items={["Let's work together", 'Open to opportunities']} />
      <div className="h-16 sm:h-24" />
      <div className="absolute bottom-0 left-1/2 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-mint-500/15 to-iris-500/15 blur-[140px]" />
      <div className="container-x relative">
        <SectionHeading index="06" eyebrow="Contact" title="Let's build something" highlight="together">
          I&apos;m currently looking for new opportunities. Whether it&apos;s a role, a project, or just to say hi — my inbox is
          always open.
        </SectionHeading>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 80}>
                <div
                  onMouseMove={spotlightHandler}
                  className="spotlight glass group flex items-center gap-4 p-4 transition hover:border-mint-400/30"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint-400/10 text-mint-300 transition group-hover:scale-110">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="min-w-0 flex-1"
                  >
                    <p className="text-xs text-slate-500">{c.label}</p>
                    <p className="truncate text-sm font-medium text-white group-hover:text-mint-300">{c.value}</p>
                  </a>
                  {c.copy && (
                    <button
                      onClick={() => copy(c.value, c.label)}
                      className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white"
                      aria-label={`Copy ${c.label.toLowerCase()}`}
                    >
                      {copied === c.label ? <CheckIcon className="h-4 w-4 text-mint-400" /> : <CopyIcon className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <form onSubmit={onSubmit} className="glass space-y-4 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs text-slate-400">Your name</span>
                  <input required value={form.name} onChange={set('name')} className={inputCls} placeholder="Jane Doe" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs text-slate-400">Your email</span>
                  <input required type="email" value={form.email} onChange={set('email')} className={inputCls} placeholder="jane@company.com" />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs text-slate-400">Message</span>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={set('message')}
                  className={`${inputCls} resize-none`}
                  placeholder="Tell me about your project, role or idea…"
                />
              </label>
              <Magnetic className="w-full sm:w-auto">
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Send message <SendIcon className="h-4 w-4" />
                </button>
              </Magnetic>
              {sent && (
                <p className="text-sm text-mint-300" role="status">
                  Your email app should open with the message ready to send. If it didn&apos;t, email me at {profile.email}.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>

      {copied && (
        <div className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink-950 shadow-2xl [animation:fadeUp_.3s]" role="status">
          {copied} copied to clipboard ✓
        </div>
      )}
    </section>
  )
}
