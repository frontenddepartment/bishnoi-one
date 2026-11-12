import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import './CtaBand.css'

export default function CtaBand() {
  return (
    <section className="cta" id="cta">
      <div className="cta__sky" aria-hidden="true">
        <span className="cta__planet" />
        <span className="cta__ring cta__ring--1" />
        <span className="cta__ring cta__ring--2" />
        <span className="cta__star cta__star--1" />
        <span className="cta__star cta__star--2" />
        <span className="cta__star cta__star--3" />
      </div>

      <Reveal className="shell cta__inner" direction="scale">
        <span className="cta__pill">
          <Icon name="bolt" size={14} /> Live in an afternoon
        </span>
        <h2>
          Put your whole company
          <br />
          in one place
        </h2>
        <p>
          Start free with up to three seats. Invite the team when you are ready, and upgrade only if
          you outgrow it.
        </p>
        <div className="cta__actions">
          <a className="btn btn--light btn--lg" href="#top">
            Get started free
            <Icon name="arrowRight" size={18} />
          </a>
          <a className="btn btn--outline-light btn--lg" href="#/pricing">
            Compare plans
          </a>
        </div>
        <p className="cta__fine">
          {['No credit card', 'Free forever plan', 'Set up in minutes'].map((item) => (
            <span key={item}>
              <Icon name="check" size={15} />
              {item}
            </span>
          ))}
        </p>
      </Reveal>
    </section>
  )
}
