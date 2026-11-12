import { useEffect, useRef, useState } from 'react'
import Icon from './ui/Icon.jsx'
import { useInView } from '../hooks/useInView.js'
import { products } from '../data/site.js'
import './SystemsRail.css'

/* "Every department, one platform": the eight systems as a sliding row of
   cards in alternating brand styles. Arrow buttons and dots move the row;
   it can also be dragged or swiped. */
const STYLES = ['orange', 'light', 'forest', 'light']

export default function SystemsRail() {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [sectionRef, inView] = useInView({ threshold: 0.2 })

  // Keep the dots in sync with the scroll position.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const card = track.firstElementChild
      if (!card) return
      const step = card.getBoundingClientRect().width + 16
      setIndex(Math.min(products.length - 1, Math.round(track.scrollLeft / step)))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const go = (to) => {
    const track = trackRef.current
    const card = track?.children[to]
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - track.firstElementChild.offsetLeft, behavior: 'smooth' })
  }

  return (
    <section className={`rail ${inView ? 'is-in' : ''}`} id="systems" ref={sectionRef}>
      <div className="shell shell--wide rail__head">
        <h2 className="rail__title">
          Every department,
          <span className="rail__title-2">
            <em>one connected</em> platform
          </span>
        </h2>

        <div className="rail__side">
          <p>
            Start with the system your team needs today. Add the rest whenever you are ready — they
            share one record from the very first day.
          </p>
          <div className="rail__controls">
            <div className="rail__dots" role="tablist" aria-label="Choose a system">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={p.name}
                  className={i === index ? 'is-active' : ''}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <div className="rail__arrows">
              <button
                type="button"
                className="rail__arrow"
                aria-label="Previous system"
                disabled={index === 0}
                onClick={() => go(Math.max(0, index - 1))}
              >
                <Icon name="arrowLeft" size={18} />
              </button>
              <button
                type="button"
                className="rail__arrow rail__arrow--next"
                aria-label="Next system"
                disabled={index === products.length - 1}
                onClick={() => go(Math.min(products.length - 1, index + 1))}
              >
                <Icon name="arrowRight" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ul className="rail__track" ref={trackRef}>
        {products.map((p, i) => (
          <li
            key={p.id}
            className={`rail__card rail__card--${STYLES[i % STYLES.length]}`}
            style={{ '--i': i }}
          >
            <div className="rail__card-top">
              <span className="rail__logo">
                <img src={p.logo} alt="" width="30" height="30" />
              </span>
              <h3>{p.name}</h3>
              <p className="rail__tagline">{p.tagline}</p>
            </div>
            <div className="rail__card-bottom">
              <p>{p.menuBlurb}.</p>
              <div className="rail__card-foot">
                <a className="rail__go" href={`#showcase-${p.id}`} aria-label={`Open ${p.name}`}>
                  <Icon name="arrowUpRight" size={16} />
                </a>
                <a className="rail__more" href={`#showcase-${p.id}`}>
                  Learn more
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
