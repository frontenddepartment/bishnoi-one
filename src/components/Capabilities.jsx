import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import { capabilities } from '../data/site.js'
import './Capabilities.css'

export default function Capabilities() {
  return (
    <section className="section caps" id="platform">
      <div className="shell">
        <div className="caps__head">
          <Reveal className="section-head" direction="left">
            <span className="eyebrow">
              <Icon name="sparkle" size={14} /> The platform underneath
            </span>
            <h2>
              The clever bits that make
              <br />
              the whole thing click
            </h2>
          </Reveal>
          <Reveal direction="right" delay={100}>
            <p className="lead caps__head-lead">
              Every Bishnoi One product sits on the same platform, so automations, dashboards and
              integrations work the same way wherever you are.
            </p>
            <a className="link-arrow" href="#cta">
              See the full platform <Icon name="arrowRight" size={16} />
            </a>
          </Reveal>
        </div>

        <div className="caps__grid">
          {capabilities.map((item, index) => (
            <Reveal
              key={item.title}
              className="cap-card"
              data-accent={item.accent}
              delay={index * 70}
              direction="scale"
            >
              <span className="cap-card__icon">
                <Icon name={item.icon} size={24} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span className="cap-card__link">
                Learn more <Icon name="arrowRight" size={15} />
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
