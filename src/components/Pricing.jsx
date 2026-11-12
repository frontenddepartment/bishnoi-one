import { useState } from 'react'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import { pricing } from '../data/site.js'
import './Pricing.css'

const SEAT_OPTIONS = [3, 5, 10, 15, 25, 50]

export default function Pricing() {
  const [yearly, setYearly] = useState(true)
  const [seats, setSeats] = useState(10)

  return (
    <section className="section pricing" id="pricing">
      <div className="shell">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Pricing</span>
          <h2>
            Pick a plan. <span className="text-gradient">Change it whenever.</span>
          </h2>
          <p className="lead">
            Every plan includes unlimited items, docs and templates. Guests are always free, and
            there is no charge for viewers.
          </p>
        </Reveal>

        <Reveal className="pricing__controls" delay={100} direction="none">
          <div className="toggle" role="group" aria-label="Billing period">
            <button
              type="button"
              className={!yearly ? 'is-active' : ''}
              aria-pressed={!yearly}
              onClick={() => setYearly(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              className={yearly ? 'is-active' : ''}
              aria-pressed={yearly}
              onClick={() => setYearly(true)}
            >
              Yearly
              <span className="toggle__save">save 25%</span>
            </button>
          </div>

          <label className="seats">
            <span className="seats__label">Seats</span>
            <select value={seats} onChange={(event) => setSeats(Number(event.target.value))}>
              {SEAT_OPTIONS.map((count) => (
                <option key={count} value={count}>
                  {count} seats
                </option>
              ))}
            </select>
            <Icon name="chevronDown" size={16} />
          </label>
        </Reveal>

        <div className="pricing__grid">
          {pricing.tiers.map((tier, index) => {
            const price = yearly ? tier.yearly : tier.monthly
            const total = price * seats
            return (
              <Reveal
                key={tier.id}
                className={`tier ${tier.popular ? 'tier--popular' : ''}`}
                delay={index * 80}
                direction="scale"
              >
                {tier.popular && (
                  <span className="tier__flag">
                    <Icon name="sparkle" size={13} /> Most popular
                  </span>
                )}
                <div className="tier__head">
                  <h3>{tier.name}</h3>
                  <p>{tier.tagline}</p>
                </div>

                <div className="tier__price">
                  <span className="tier__currency">$</span>
                  <span className="tier__amount">{price}</span>
                  <span className="tier__period">
                    per seat
                    <em>/ month</em>
                  </span>
                </div>
                <p className="tier__total">
                  {price === 0
                    ? 'Free for up to 3 seats, forever'
                    : `$${total.toLocaleString()} / month total for ${seats} seats${
                        yearly ? ', billed yearly' : ''
                      }`}
                </p>

                <a
                  className={`btn btn--block ${tier.popular ? 'btn--gradient' : 'btn--ghost'}`}
                  href="#cta"
                >
                  {tier.cta}
                </a>

                <ul className="tier__features">
                  {tier.features.map((feature) => (
                    <li key={feature}>
                      <Icon name="check" size={15} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="pricing__enterprise" delay={120} direction="none">
          <div className="pricing__enterprise-copy">
            <span className="pill pricing__enterprise-pill">
              <Icon name="shield" size={14} /> {pricing.enterprise.name}
            </span>
            <h3>Rolling Bishnoi One out to the whole organisation?</h3>
            <p>{pricing.enterprise.blurb}</p>
          </div>
          <ul className="pricing__enterprise-points">
            {pricing.enterprise.points.map((point) => (
              <li key={point}>
                <Icon name="check" size={15} />
                {point}
              </li>
            ))}
          </ul>
          <a className="btn btn--primary" href="#cta">
            Talk to sales
            <Icon name="arrowRight" size={17} />
          </a>
        </Reveal>

        <p className="pricing__note">
          Prices in USD, excluding tax. 14 day trial on every paid plan, no card required.
        </p>
      </div>
    </section>
  )
}
