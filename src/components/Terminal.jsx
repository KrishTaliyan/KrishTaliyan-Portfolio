import { useEffect, useRef, useState } from 'react'
import { profile, projects, skillGroups, timeline } from '../data'

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const commands = {
  help: () => [
    'Available commands:',
    '  whoami      — a quick intro',
    '  skills      — my tech stack',
    '  projects    — things I have built',
    '  education   — where I study',
    '  contact     — how to reach me',
    '  resume      — open my resume',
    '  goto <section> — jump to a section (about, projects, contact…)',
    '  clear       — clear the screen',
  ],
  whoami: () => [
    `${profile.name} — Full-Stack Developer (MERN).`,
    'B.Tech CSE @ LPU · CGPA 8.08 · 300+ LeetCode problems · 5★ Java on HackerRank.',
  ],
  skills: () => skillGroups.map((g) => `${g.title.padEnd(15)} ${g.items.join(', ')}`),
  projects: () => [
    ...projects.map((p) => `• ${p.title.padEnd(30)} ${p.live}`),
    'Tip: type "goto projects" to see them in detail.',
  ],
  education: () => timeline.filter((t) => t.kind === 'Education').map((t) => `${t.when.padEnd(20)} ${t.title}`),
  contact: () => [`email     ${profile.email}`, `phone     ${profile.phone}`, `github    ${profile.github}`, `linkedin  ${profile.linkedin}`],
  resume: () => {
    window.open(profile.resume, '_blank', 'noopener')
    return ['Opening resume in a new tab…']
  },
  ls: () => ['about.md  skills.json  projects/  resume.pdf  contact.txt'],
  date: () => [new Date().toString()],
  sudo: () => ['Nice try 😄 — but you can just email me: ' + profile.email],
  hire: () => ['Excellent choice! 🎉 Opening the contact section…', () => scrollTo('contact')],
}

const intro = [
  { type: 'out', text: `Welcome to krish.sh — an interactive résumé.` },
  { type: 'out', text: `Type "help" to see what I can do. Try "whoami" or "projects".` },
]

export default function Terminal() {
  const [lines, setLines] = useState(intro)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [hIndex, setHIndex] = useState(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const run = (raw) => {
    const cmd = raw.trim()
    const [name, ...args] = cmd.toLowerCase().split(/\s+/)
    const next = [...lines, { type: 'in', text: cmd }]
    if (!cmd) return setLines(next)
    if (name === 'clear') return setLines([])
    if (name === 'goto') {
      const target = args[0]
      const el = target && document.getElementById(target === 'certs' ? 'certifications' : target)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return setLines([...next, { type: 'out', text: `Jumping to #${target}…` }])
      }
      return setLines([...next, { type: 'err', text: 'Usage: goto home | about | skills | journey | projects | certs | contact' }])
    }
    const fn = commands[name]
    if (!fn) return setLines([...next, { type: 'err', text: `command not found: ${name}. Type "help".` }])
    const out = fn(args)
    out.filter((o) => typeof o === 'function').forEach((f) => setTimeout(f, 500))
    setLines([...next, ...out.filter((o) => typeof o === 'string').map((text) => ({ type: 'out', text }))])
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input)
      if (input.trim()) setHistory((h) => [input, ...h])
      setInput('')
      setHIndex(-1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const i = Math.min(hIndex + 1, history.length - 1)
      if (history[i] !== undefined) {
        setHIndex(i)
        setInput(history[i])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = hIndex - 1
      setHIndex(Math.max(i, -1))
      setInput(i >= 0 ? history[i] : '')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const match = [...Object.keys(commands), 'clear', 'goto'].find((c) => c.startsWith(input.trim().toLowerCase()))
      if (match && input.trim()) setInput(match)
    }
  }

  const suggestions = ['help', 'whoami', 'skills', 'projects', 'contact']

  return (
    <div className="glass overflow-hidden shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-slate-500">krish@portfolio: ~</span>
      </div>
      <div
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
        className="terminal-scroll h-80 cursor-text overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
      >
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {l.type === 'in' ? (
              <span>
                <span className="text-mint-400">➜</span> <span className="text-iris-300">~</span>{' '}
                <span className="text-white">{l.text}</span>
              </span>
            ) : (
              <span className={l.type === 'err' ? 'text-rose-400' : 'text-slate-400'}>{l.text}</span>
            )}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-mint-400">➜</span>&nbsp;<span className="text-iris-300">~</span>&nbsp;
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent text-white caret-mint-400 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="Terminal input"
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-white/[0.07] px-4 py-3">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => {
              run(s)
              inputRef.current?.focus({ preventScroll: true })
            }}
            className="rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-slate-400 transition hover:border-mint-400/50 hover:text-mint-300"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
