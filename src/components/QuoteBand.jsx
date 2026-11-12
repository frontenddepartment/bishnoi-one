import { useInView } from '../hooks/useInView.js'
import './QuoteBand.css'

/* Orange band: a large statement on the left with key phrases in bold, and a
   round team photo on the right inside thin concentric rings. */
export default function QuoteBand() {
  const [ref, inView] = useInView({ threshold: 0.25 })

  return (
    <section className={`qb ${inView ? 'is-in' : ''}`} ref={ref} aria-labelledby="qb-quote">
      <div className="shell shell--wide qb__inner">
        <figure className="qb__text">
          <span className="qb__mark" aria-hidden="true">
            “
          </span>
          <blockquote id="qb-quote">
            <p>
              We wanted <b>one place</b> where the everyday work <b>runs by itself</b>, and every
              team only stops for <b>what truly needs a person.</b>
            </p>
          </blockquote>
          <figcaption>
            <strong>The Bishnoi One team</strong>
            <span>Why we built it</span>
          </figcaption>
        </figure>

        <div className="qb__visual">
          <div className="qb__rings" aria-hidden="true">
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i} style={{ '--n': i }} />
            ))}
          </div>
          <div className="qb__photo">
            <img src="/howwework.jpg" alt="Our team meeting around a desk in the office" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
