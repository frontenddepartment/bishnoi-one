import { useInView } from '../hooks/useInView.js'
import './WordsSplit.css'

/* Split band: team photo on the left, three big stacked words on a dark
   panel on the right, with the middle word in brand orange. */
const WORDS = [
  { word: 'Connect' },
  { word: 'Approve', accent: true },
  { word: 'Grow' },
]

export default function WordsSplit() {
  const [ref, inView] = useInView({ threshold: 0.25 })

  return (
    <section className={`ws ${inView ? 'is-in' : ''}`} ref={ref} aria-label="Connect, approve, grow">
      <div className="ws__photo">
        <img src="/image.JPG" alt="Two team members reviewing work on a laptop in the office" loading="lazy" />
      </div>

      <div className="ws__panel">
        <ul className="ws__words">
          {WORDS.map((w, i) => (
            <li key={w.word} className={`ws__word ${w.accent ? 'is-accent' : ''}`} style={{ '--i': i }}>
              <span className="ws__text">{w.word}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
