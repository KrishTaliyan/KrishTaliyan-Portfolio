import { Fragment, useEffect, useRef, useState } from 'react'

/**
 * Splits text into words that slide up from behind a mask, one after another.
 * `parts` is a list of { text, className } so a heading can mix plain and
 * gradient words. Plays when scrolled into view, or when `play` becomes true.
 */
export default function SplitText({ as: Tag = 'h2', parts, className = '', play, delay = 0, stagger = 70 }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    if (play !== undefined) return
    const el = ref.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [play])

  const visible = play ?? seen
  let i = 0
  const label = parts.map((p) => p.text).join(' ')

  return (
    <Tag ref={ref} className={`split ${visible ? 'is-visible' : ''} ${className}`} aria-label={label}>
      {parts.map((part, pi) =>
        part.text.split(' ').map((word, wi) => {
          const d = delay + i++ * stagger
          return (
            <Fragment key={`${pi}-${wi}`}>
              <span className="split-w" aria-hidden="true">
                <span className={part.className} style={{ transitionDelay: `${d}ms` }}>
                  {word}
                </span>
              </span>{' '}
            </Fragment>
          )
        }),
      )}
    </Tag>
  )
}
