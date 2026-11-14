import { useState } from 'react'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import CtaBand from './CtaBand.jsx'
import { JumpLink, SectionHead, Faq } from './PlatformPage.jsx'
import { systemPage } from '../data/systemPages.js'
import { systems } from '../data/site.js'
import './PlatformPage.css'
import './SystemPage.css'

/* One page per Bishnoi One system (#/systems/<id>), rendered from
   src/data/systemPages.js. Shares the hero, section and FAQ styles with the
   Platform pages so both read as one site. */

const systemOf = (id) => systems.find((s) => s.id === id)

function Board({ columns }) {
  return (
    <div className="sp-board" aria-hidden="true">
      <div className="sp-board__bar">
        <span />
        <span />
        <span />
        <b>Sales pipeline</b>
      </div>
      <div className="sp-board__cols">
        {columns.map(([stage, deals], c) => (
          <div key={stage} className="sp-board__col" style={{ '--i': c }}>
            <div className="sp-board__head">
              {stage}
              <small>{deals.length}</small>
            </div>
            {deals.map(([name, value, owner]) => (
              <div key={name} className={`sp-deal ${stage === 'Won' ? 'is-won' : ''}`}>
                <b>{name}</b>
                <span className="sp-deal__row">
                  {value}
                  <i>{owner}</i>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Hero({ page, system }) {
  const { hero } = page
  return (
    <section className="pf-hero sp-hero">
      <div className="pf-hero__glow" aria-hidden="true" />
      <div className="shell pf-hero__inner">
        <Reveal>
          <span className="pf-hero__eyebrow">
            <img className="pf-hero__logo" src={system.logo} alt="" />
            {hero.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="pf-hero__title">{hero.headline}</h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="pf-hero__sub">{hero.sub}</p>
        </Reveal>
        <Reveal delay={240} className="pf-hero__actions">
          <JumpLink className="pf-btn pf-btn--solid" href={hero.primary.href}>
            {hero.primary.label}
          </JumpLink>
          <JumpLink className="pf-btn pf-btn--ghost" href={hero.secondary.href}>
            {hero.secondary.label}
          </JumpLink>
        </Reveal>
        {hero.board && (
          <Reveal delay={320} className="sp-hero__visual">
            <Board columns={hero.board} />
          </Reveal>
        )}
      </div>
    </section>
  )
}

function Explainer({ data, name }) {
  return (
    <section className="pf-section" id="what-is">
      <div className="shell sp-explain">
        <Reveal className="sp-explain__text">
          <span className="pf-head__eyebrow">What is a {name}?</span>
          <h2>{data.title}</h2>
          {data.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>
        <ul className="sp-keeps">
          {data.keeps.map(([icon, title, body], i) => (
            <Reveal as="li" key={title} delay={i * 70}>
              <span className="sp-keeps__icon" aria-hidden="true">
                <Icon name={icon} size={18} />
              </span>
              <span>
                <b>{title}</b>
                <small>{body}</small>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Highlights({ data }) {
  return (
    <section className="pf-section pf-section--muted" id="features">
      <div className="shell">
        <SectionHead eyebrow="Why teams use it" title={data.title} />
        <div className="sp-highlights">
          {data.items.map((h, i) => (
            <Reveal key={h.title} className="pf-card" delay={i * 70}>
              <span className="sp-tag">{h.tag}</span>
              <h3>{h.title}</h3>
              <p>{h.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Journey({ data }) {
  const [active, setActive] = useState(0)
  const stage = data.stages[active]

  // Arrow keys move between tabs, as the WAI-ARIA tabs pattern expects.
  const onKey = (event) => {
    const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = (active + step + data.stages.length) % data.stages.length
    setActive(next)
    document.getElementById(`sp-tab-${next}`)?.focus()
  }

  return (
    <section className="pf-section" id="journey">
      <div className="shell">
        <SectionHead eyebrow="How it works" title={data.title} />
        <Reveal className="sp-journey">
          <div className="sp-journey__tabs" role="tablist" aria-label="Customer journey" onKeyDown={onKey}>
            {data.stages.map((s, i) => (
              <button
                key={s.tab}
                id={`sp-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="sp-journey-panel"
                tabIndex={i === active ? 0 : -1}
                className={`sp-journey__tab ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="sp-journey__num">{i + 1}</span>
                {s.tab}
              </button>
            ))}
          </div>
          <div
            className="sp-journey__panel"
            id="sp-journey-panel"
            role="tabpanel"
            aria-labelledby={`sp-tab-${active}`}
            key={active}
          >
            <div className="sp-journey__progress" aria-hidden="true">
              {data.stages.map((s, i) => (
                <span key={s.tab} className={i <= active ? 'is-on' : ''} />
              ))}
            </div>
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
            <ul>
              {stage.points.map((pt) => (
                <li key={pt}>
                  <Icon name="check" size={16} />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Connects({ data, name }) {
  return (
    <section className="pf-section pf-section--muted" id="connects">
      <div className="shell">
        <SectionHead eyebrow={`${name} + Bishnoi One`} title={data.title} />
        <div className="sp-connects">
          {data.items.map(([id, body], i) => {
            const s = systemOf(id)
            return (
              <Reveal key={id} className="sp-connect" delay={i * 60}>
                <img src={s.logo} alt="" width="32" height="32" />
                <b>{s.name}</b>
                <p>{body}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function SystemPage({ id }) {
  const page = systemPage(id)
  const system = systemOf(id)
  if (!page || !system) {
    return (
      <div className="page page--system">
        <section className="pf-hero">
          <div className="shell pf-hero__inner">
            <h1 className="pf-hero__title">This page is on its way.</h1>
            <p className="pf-hero__sub">We are still writing it. In the meantime, see how every system fits together.</p>
            <div className="pf-hero__actions">
              <a className="pf-btn pf-btn--solid" href="#/platform">
                See the platform
              </a>
            </div>
          </div>
        </section>
      </div>
    )
  }
  return (
    <div className="page page--system">
      <Hero page={page} system={system} />
      <Explainer data={page.explainer} name={page.title} />
      <Highlights data={page.highlights} />
      <Journey data={page.journey} />
      <Connects data={page.connects} name={page.title} />
      <Faq items={page.faq} />
      <CtaBand />
    </div>
  )
}

export const systemTitle = (id) => {
  const page = systemPage(id)
  return page ? `${page.title} · Bishnoi One` : 'Bishnoi One'
}
