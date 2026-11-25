import Reveal from './Reveal'

export default function SectionHeading({ index, eyebrow, title, children }) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="eyebrow">
        <span className="text-slate-500">{index} /</span> {eyebrow}
      </p>
      <h2 className="heading">{title}</h2>
      {children && <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{children}</p>}
    </Reveal>
  )
}
