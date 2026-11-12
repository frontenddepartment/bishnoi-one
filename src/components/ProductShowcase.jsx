import { useEffect, useState } from 'react'
import Icon from './ui/Icon.jsx'
import SystemDemo from './ui/SystemDemo.jsx'
import { useInView } from '../hooks/useInView.js'
import { products } from '../data/site.js'
import './ProductShowcase.css'

// Long enough for each system demo to play through once.
const DURATION = 10500

export default function ProductShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [sectionRef, inView] = useInView({ threshold: 0.25, once: false })

  useEffect(() => {
    if (paused || !inView) return
    const id = window.setTimeout(() => setActive((i) => (i + 1) % products.length), DURATION)
    return () => window.clearTimeout(id)
  }, [active, paused, inView])

  // Links such as #showcase-books (from the hero and Products menu) open
  // the matching system and scroll the section into view.
  useEffect(() => {
    const openFromHash = () => {
      const match = window.location.hash.match(/^#showcase-(.+)$/)
      if (!match) return
      const index = products.findIndex((p) => p.id === match[1])
      if (index === -1) return
      setActive(index)
      setPaused(true)
      document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const product = products[active]

  return (
    <section className="section showcase" id="showcase" ref={sectionRef} aria-label="The eight Bishnoi One systems">
      <div className="shell">
        <div
          className="showcase__panel"
          data-accent={product.accent}
          id={`panel-${product.id}`}
          aria-live="polite"
          aria-label={`${product.name} overview`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="showcase__copy" key={product.id}>
            <span className="showcase__badge">
              {product.logo ? <img src={product.logo} alt="" width="18" height="18" className="product-logo" decoding="async" /> : <Icon name={product.icon} size={16} />}
              {product.name}
            </span>
            <h3>{product.headline}</h3>
            <p>{product.description}</p>
            <ul className="showcase__bullets">
              {product.bullets.map((bullet) => (
                <li key={bullet}>
                  <span className="showcase__check">
                    <Icon name="check" size={14} />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="showcase__footer">
              <a className="btn btn--primary showcase__cta" href="#cta">
                Try {product.short}
                <Icon name="arrowRight" size={17} />
              </a>
              <div className="showcase__stat">
                <strong>{product.stat.value}</strong>
                <span>{product.stat.label}</span>
              </div>
            </div>
          </div>

          <div className="showcase__art" key={`${product.id}-art`}>
            <SystemDemo id={product.id} />
          </div>
        </div>
      </div>
    </section>
  )
}
