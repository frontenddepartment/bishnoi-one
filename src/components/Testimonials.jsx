import { useEffect, useState } from 'react'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import { testimonials } from '../data/site.js'
import './Testimonials.css'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 7000)
    return () => window.clearInterval(id)
  }, [paused])

  const go = (next) => {
    setPaused(true)
    setIndex((next + testimonials.length) % testimonials.length)
  }

  const current = testimonials[index]

  return (
    <section className="section section--muted quotes" id="customers">
      <div className="shell">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">
            <Icon name="star" size={14} /> 4.8 out of 5, from 12,400 reviews
          </span>
          <h2>Teams do not switch back</h2>
        </Reveal>

        <div
          className="quotes__stage"
          data-accent={current.accent}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <span className="quotes__mark">
            <Icon name="quote" size={44} />
          </span>

          <blockquote key={current.name} className="quotes__card">
            <p>{current.quote}</p>
            <footer>
              <span className="quotes__avatar" aria-hidden="true">
                {current.name.charAt(0)}
              </span>
              <span className="quotes__person">
                <strong>{current.name}</strong>
                <em>{current.role}</em>
              </span>
              <span className="quotes__metric">
                <strong>{current.metric.value}</strong>
                <em>{current.metric.label}</em>
              </span>
            </footer>
          </blockquote>

          <div className="quotes__controls">
            <button type="button" aria-label="Previous story" onClick={() => go(index - 1)}>
              <Icon name="arrowLeft" size={18} />
            </button>
            <div className="quotes__dots" role="group" aria-label="Customer stories">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  aria-current={i === index}
                  aria-label={`Story from ${item.company}`}
                  className={i === index ? 'is-active' : ''}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <button type="button" aria-label="Next story" onClick={() => go(index + 1)}>
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
