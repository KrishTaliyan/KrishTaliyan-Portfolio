import { useCallback, useEffect, useRef, useState } from 'react'
import About from './components/About'
import BackToTop from './components/BackToTop'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Journey from './components/Journey'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { prefersReducedMotion } from './hooks'
import { scrollToId } from './lib/scroll'

/** A soft glow that follows the cursor on devices with a mouse. */
function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    const onMove = (e) => {
      el.style.opacity = '1'
      el.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-700"
      style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.06), transparent 60%)' }}
    />
  )
}

// Show the intro once per browser session (and never for reduced-motion users).
const SEEN_KEY = 'kt-intro-seen'
const shouldShowIntro = () => !prefersReducedMotion() && !sessionStorage.getItem(SEEN_KEY)

export default function App() {
  const [intro, setIntro] = useState(shouldShowIntro)
  const [ready, setReady] = useState(() => !intro)

  const onReveal = useCallback(() => setReady(true), [])
  const onDone = useCallback(() => {
    sessionStorage.setItem(SEEN_KEY, '1')
    setIntro(false)
  }, [])

  // Links like …/KrishTaliyan-Portfolio/#projects arrive before React has rendered,
  // so jump to the section once the page is ready.
  useEffect(() => {
    if (!ready) return
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) requestAnimationFrame(() => scrollToId(id, { immediate: true }))
  }, [ready])

  return (
    <div className="noise relative min-h-screen overflow-x-clip">
      {intro && <Preloader onReveal={onReveal} onDone={onDone} />}
      <Cursor />
      <CursorGlow />
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink-950">
        Skip to content
      </a>
      <Navbar />
      <main className="relative z-10">
        <Hero ready={ready} />
        <About />
        <Skills />
        <Journey />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
