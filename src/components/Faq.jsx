import { useState } from 'react'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import { faqs } from '../data/site.js'
import './Faq.css'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section section--muted faq" id="faq">
      <div className="shell faq__inner">
        <Reveal className="faq__aside" direction="left">
          <span className="eyebrow">FAQ</span>
          <h2>Questions people ask before they start</h2>
          <p className="lead">
            Still not sure? Our team answers in under four minutes, every day of the week.
          </p>
          <a className="btn btn--ghost" href="#cta">
            <Icon name="headset" size={18} />
            Talk to a human
          </a>
        </Reveal>

        <Reveal className="faq__list" direction="right" delay={80}>
          {faqs.map((item, index) => {
            const isOpen = open === index
            return (
              <div key={item.q} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-item__toggle">
                      <Icon name={isOpen ? 'minus' : 'plus'} size={18} />
                    </span>
                  </button>
                </h3>
                <div className="faq-item__body">
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
