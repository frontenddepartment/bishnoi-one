import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import { steps } from '../data/site.js'
import './HowItWorks.css'

export default function HowItWorks() {
  return (
    <section className="section how" id="how">
      <div className="shell">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">
            <Icon name="bolt" size={14} /> Four steps, one afternoon
          </span>
          <h2>
            Set up by lunch.
            <br />
            Running by <span className="text-gradient">the end of the day.</span>
          </h2>
          <p className="lead">
            No implementation project, no consultant, no six-week rollout plan. Bishnoi One is built so the
            person who needs it can set it up themselves.
          </p>
        </Reveal>

        <ol className="how__steps">
          {steps.map((step, index) => (
            <Reveal as="li" className="how-step" key={step.number} delay={index * 110}>
              <span className="how-step__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="how__cta" delay={200} direction="none">
          <div className="how__cta-text">
            <h3>Want to see it before you sign up?</h3>
            <p>Take the interactive tour. No form, no email, no sales call.</p>
          </div>
          <div className="how__cta-actions">
            <a className="btn btn--gradient" href="#cta">
              Start free
              <Icon name="arrowRight" size={17} />
            </a>
            <a className="btn btn--ghost" href="#showcase">
              <Icon name="play" size={16} />
              Take the tour
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
