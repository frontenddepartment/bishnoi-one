import { useInView } from '../hooks/useInView.js'
import Icon from './ui/Icon.jsx'
import './CtaBand.css'

/* Closing CTA banner: three colour columns, two-line headline and sub line on
   the left; on the right, the two buttons sit above an orange dome whose right
   foot lands on the screen edge. Inside the dome, two white orbit rings turn
   in opposite directions carrying feature icons. */

// Two orbit rings inside the dome; icons ride the rings as they turn.
// [glyph, angle on the ring in degrees]
const INNER = [
  ['shield', 200],
  ['check', 320],
  ['people', 80],
]
const OUTER = [
  ['automation', 160],
  ['chart', 235],
  ['board', 300],
  ['bolt', 20],
  ['headset', 90],
]

function Ring({ which, items }) {
  // Arc covers 78% of the circle, leaving a gap; a dot caps each end.
  const end = (0.78 * 360 * Math.PI) / 180
  return (
    <div className={`cta__ring cta__ring--${which}`}>
      <svg viewBox="0 0 100 100" className="cta__ring-line">
        <circle cx="50" cy="50" r="49" pathLength="100" strokeDasharray="78 22" />
        <circle className="cta__ring-dot" cx="99" cy="50" r="1.3" />
        <circle className="cta__ring-dot" cx={50 + 49 * Math.cos(end)} cy={50 + 49 * Math.sin(end)} r="1.3" />
      </svg>
      {items.map(([glyph, deg]) => (
        <span
          key={glyph}
          className="cta__node"
          style={{
            left: `${50 + 49 * Math.cos((deg * Math.PI) / 180)}%`,
            top: `${50 + 49 * Math.sin((deg * Math.PI) / 180)}%`,
          }}
        >
          <Icon name={glyph} size={18} />
        </span>
      ))}
    </div>
  )
}

export default function CtaBand() {
  const [ref, inView] = useInView({ threshold: 0.2 })

  return (
    <section className={`cta ${inView ? 'is-in' : ''}`} id="cta" ref={ref} aria-labelledby="cta-title">
      <div className="cta__inner">
        <div className="cta__copy">
          <h2 className="cta__title" id="cta-title">
            <span className="cta__word cta__word--1">Your business,</span>
            <span className="cta__word cta__word--2">finally connected.</span>
          </h2>

          <p className="cta__sub">
            Guides, templates and live sessions to help you set up every system and get your team running on
            Bishnoi One.
          </p>
        </div>
      </div>

      <div className="cta__stage">
        <div className="cta__actions">
          <a className="cta__btn cta__btn--solid" href="#systems">
            Access Systems
          </a>
          <a className="cta__btn cta__btn--outline" href="#how">
            Learn More
          </a>
        </div>

        <div className="cta__sun" aria-hidden="true">
          <div className="cta__orbit">
            <Ring which="outer" items={OUTER} />
            <Ring which="inner" items={INNER} />
          </div>
        </div>
      </div>
    </section>
  )
}
