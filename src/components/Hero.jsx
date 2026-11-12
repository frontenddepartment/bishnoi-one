import Icon from './ui/Icon.jsx'
import HeroDemo from './ui/HeroDemo.jsx'
import { systems, departments } from '../data/site.js'
import './Hero.css'

// Team faces shown beside the headline, each on a brand accent colour.
// x/y shift each photo so the head sits in the centre of its circle.
const TEAM = [
  { img: '/MAMMALOU.png', bg: '#5a6dff', x: '-74.8%', y: '-4.8%' },
  { img: '/MAMVAN.png', bg: '#ffd900', x: '-82%', y: '-9.6%' },
  { img: '/SIRJAVED.png', bg: '#fd4040', x: '-72.4%', y: '-4.8%' },
  { img: '/SIRSUBIR.png', bg: '#59ba43', x: '-72.4%', y: '-9.6%' },
]

/* Hero: a large headline with the system logos stacked inline, a short
   promise and call to action on the right, then a wide band
   showing the systems connected by flowing data. */
export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell shell--wide">
        <div className="hero__top">
          <h1 className="hero__title">
            Run your whole company
            <br />
            <span className="hero__accent">in one place</span>
            <br />
            <span className="hero__line3">
              <span className="hero__stack" aria-hidden="true">
                {TEAM.map((p, i) => (
                  <span key={p.img} className="hero__face" style={{ '--i': i, '--bg': p.bg, '--x': p.x, '--y': p.y }}>
                    <img src={p.img} alt="" width="80" height="80" />
                  </span>
                ))}
              </span>
              from one login
            </span>
          </h1>

          <div className="hero__aside">
            <p className="hero__lead">
              Eight connected systems for stock, people, customers, reporting, books, finance, files and support. Set
              Bishnoi One up in an afternoon.
            </p>
            <a className="hero__cta" href="#cta">
              Get started free
              <span className="hero__cta-icon">
                <Icon name="arrowUpRight" size={16} />
              </span>
            </a>
            <p className="hero__fineprint">Free forever plan · No credit card</p>
          </div>
        </div>

        <div className="hero__stage">
          <HeroDemo className="hero__helix" />
        </div>

        <div className="hero__trust">
          <p className="hero__trust-label">Built for every department</p>
          <ul className="hero__trust-logos">
            {departments.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
