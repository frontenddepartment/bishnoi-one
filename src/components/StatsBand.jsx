import { useInView } from '../hooks/useInView.js'
import { useCountUp } from '../hooks/useCountUp.js'
import { stats } from '../data/site.js'
import './StatsBand.css'

function Stat({ value, suffix, label, decimals = 0, delay }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const current = useCountUp(value, inView, 1700)

  return (
    <li ref={ref} className={`stat ${inView ? 'is-visible' : ''}`} style={{ '--reveal-delay': `${delay}ms` }}>
      <strong>
        {current.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        <span>{suffix}</span>
      </strong>
      <span className="stat__label">{label}</span>
    </li>
  )
}

export default function StatsBand() {
  return (
    <section className="statsband">
      <div className="statsband__rings" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="shell statsband__inner">
        <h2 className="statsband__title">
          Numbers from teams
          <br />
          already on board
        </h2>
        <ul className="statsband__grid">
          {stats.map((item, index) => (
            <Stat key={item.label} {...item} delay={index * 90} />
          ))}
        </ul>
      </div>
    </section>
  )
}
