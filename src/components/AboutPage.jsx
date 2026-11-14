import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import AchieveBand from './AchieveBand.jsx'
import CtaBand from './CtaBand.jsx'
import { systems } from '../data/site.js'
import './AboutPage.css'

/* About page (#/about): who we are, why Bishnoi One exists, what we believe,
   and the eight systems we make. */

// The three ideas on the stage screen in the photo.
const VALUES = [
  {
    title: 'Create connections',
    body: 'Every system shares one record of your people, customers, stock and money, so information moves on its own instead of being retyped.',
    icon: 'puzzle',
    tone: 'blue',
  },
  {
    title: 'Secure approval',
    body: 'Every request reaches the right person with the full picture, and every decision is recorded. Control without the chasing.',
    icon: 'shield',
    tone: 'yellow',
  },
  {
    title: 'Achieve success',
    body: 'When the busywork runs itself, your team spends its time on customers and growth, and you see the results live.',
    icon: 'chart',
    tone: 'green',
  },
]

export default function AboutPage() {
  return (
    <div className="page page--about">
      {/* Hero */}
      <section className="ab-hero">
        <div className="ab-hero__glow" aria-hidden="true" />
        <div className="shell ab-hero__inner">
          <Reveal>
            <span className="ab-hero__eyebrow">
              <img src="/bishnoi-logo.png" alt="" />
              About Bishnoi One
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="ab-hero__title">We build the one place a business runs from.</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="ab-hero__sub">
              Bishnoi One brings people, money, stock, customers and support together in eight connected systems, so
              growing businesses can work as one team instead of eight separate tools.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Photo + orange caption strip */}
      <AchieveBand />

      {/* Our story */}
      <section className="ab-section">
        <div className="shell ab-story">
          <Reveal className="ab-head">
            <span className="ab-head__eyebrow">Why we built it</span>
            <h2>Too many tools. Not enough connection.</h2>
          </Reveal>
          <Reveal className="ab-story__text" delay={100}>
            <p>
              Most growing businesses run on a patchwork: one app for payroll, another for invoices, a spreadsheet for
              stock and an inbox full of approvals. Every handover between them is a chance for something to be
              retyped, missed or argued about.
            </p>
            <p>
              We started Bishnoi One to remove those handovers. Instead of connecting tools after the fact, we built
              the systems to share one foundation from day one: one login, one set of records and one place to
              approve.
            </p>
            <p>
              The result is a business where a new hire, a purchase order or a customer complaint moves through every
              team on its own, and where everyone looks at the same live numbers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="ab-section ab-section--muted">
        <div className="shell">
          <Reveal className="ab-head ab-head--center">
            <span className="ab-head__eyebrow">What we believe</span>
            <h2>Three ideas behind everything we make</h2>
          </Reveal>
          <div className="ab-values">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} className="ab-value" delay={i * 90}>
                <span className="ab-value__icon" data-tone={v.tone} aria-hidden="true">
                  <Icon name={v.icon} size={20} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The eight systems */}
      <section className="ab-section">
        <div className="shell">
          <Reveal className="ab-head ab-head--center">
            <span className="ab-head__eyebrow">What we make</span>
            <h2>Eight systems, one platform</h2>
          </Reveal>
          <div className="ab-systems">
            {systems.map((s, i) => (
              <Reveal key={s.id} className="ab-system" delay={(i % 4) * 60}>
                <img src={s.logo} alt="" />
                <b>{s.name}</b>
                <small>{s.blurb}</small>
              </Reveal>
            ))}
          </div>
          <Reveal className="ab-systems__more" delay={200}>
            <a className="link-arrow" href="#/platform">
              See how the platform fits together <Icon name="arrowRight" size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
