import Reveal from './Reveal'
import SplitText from './SplitText'

export default function SectionHeading({ index, eyebrow, title, highlight, children }) {
  return (
    <div className="mb-14 max-w-3xl">
      <Reveal as="p" className="eyebrow flex items-center gap-3">
        <span className="text-slate-500">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-mint-400 to-transparent" />
        {eyebrow}
      </Reveal>
      <SplitText
        className="heading"
        parts={[{ text: title }, ...(highlight ? [{ text: highlight, className: 'gradient-text' }] : [])]}
      />
      {children && (
        <Reveal as="p" delay={200} className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
          {children}
        </Reveal>
      )}
    </div>
  )
}
