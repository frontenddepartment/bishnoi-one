import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import CtaBand from './CtaBand.jsx'
import { platformOverview, platformPages } from '../data/platform.js'
import { platformMenu, systems } from '../data/site.js'
import './PlatformPage.css'

/* Platform pages, all rendered from src/data/platform.js:
     #/platform          overview (what Bishnoi One is, its eight systems)
     #/platform/<slug>   one page per Platform menu item */

const logoOf = (id) => systems.find((s) => s.id === id)?.logo

// Hero buttons point at sections on this same page. A plain "#id" link would
// change the hash and leave the page, so scroll to the section instead.
export function JumpLink({ href, className, children }) {
  const onClick = (event) => {
    const el = document.getElementById(href.slice(1))
    if (!el) return
    event.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  )
}

function Hero({ hero, menuItem }) {
  return (
    <section className="pf-hero">
      <div className="pf-hero__glow" aria-hidden="true" />
      <div className="shell pf-hero__inner">
        <Reveal>
          <span className="pf-hero__eyebrow">
            {menuItem ? (
              <span
                className="pf-hero__badge"
                style={{ '--g1': menuItem.grad[0], '--g2': menuItem.grad[1] }}
                aria-hidden="true"
              >
                <Icon name={menuItem.icon} size={16} />
              </span>
            ) : (
              <img className="pf-hero__logo" src="/bishnoi-logo.png" alt="" />
            )}
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
      </div>
    </section>
  )
}

export function SectionHead({ eyebrow, title }) {
  return (
    <Reveal className="pf-head">
      <span className="pf-head__eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </Reveal>
  )
}

export function Faq({ items: all }) {
  // Answers still waiting on a fact check are marked "VERIFY" in the data; keep them off the page.
  const items = all.filter(([, a]) => !a.startsWith('VERIFY'))
  return (
    <section className="pf-section" id="faq">
      <div className="shell pf-faq">
        <SectionHead eyebrow="Questions" title="What people ask first" />
        <div className="pf-faq__list">
          {items.map(([q, a], i) => (
            <Reveal key={q} as="details" className="pf-faq__item" delay={i * 60}>
              <summary>
                {q}
                <Icon name="plus" size={18} />
              </summary>
              <p>{a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function MoreLinks({ current }) {
  return (
    <section className="pf-section pf-section--muted">
      <div className="shell">
        <SectionHead eyebrow="Keep exploring" title={current ? 'More of the platform' : 'What the platform gives you'} />
        <div className="pf-more">
          {platformMenu
            .filter((item) => item.slug !== current)
            .map((item, i) => (
              <Reveal key={item.slug} delay={i * 50}>
                <a className="pf-more__card" href={`#/platform/${item.slug}`}>
                  <span
                    className="pf-more__icon"
                    style={{ '--g1': item.grad[0], '--g2': item.grad[1] }}
                    aria-hidden="true"
                  >
                    <Icon name={item.icon} size={20} />
                  </span>
                  <span className="pf-more__text">
                    <b>{item.title}</b>
                    <small>{item.blurb}</small>
                  </span>
                  <Icon name="arrowRight" size={18} className="pf-more__arrow" />
                </a>
              </Reveal>
            ))}
          {current ? (
            <Reveal delay={300}>
              <a className="pf-more__card pf-more__card--overview" href="#/platform">
                <span className="pf-more__icon pf-more__icon--logo" aria-hidden="true">
                  <img src="/bishnoi-logo.png" alt="" />
                </span>
                <span className="pf-more__text">
                  <b>Platform overview</b>
                  <small>What Bishnoi One is and how the eight systems fit together.</small>
                </span>
                <Icon name="arrowRight" size={18} className="pf-more__arrow" />
              </a>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------------ */

function Overview() {
  const d = platformOverview
  return (
    <>
      <Hero hero={d.hero} />

      <section className="pf-section" id="how-it-fits">
        <div className="shell">
          <SectionHead eyebrow="How it fits together" title="Three things every system shares" />
          <div className="pf-cards">
            {d.pillars.map((p, i) => (
              <Reveal key={p.title} className="pf-card" delay={i * 80}>
                <span className="pf-card__num">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pf-section pf-section--muted" id="systems-grid">
        <div className="shell">
          <SectionHead eyebrow="The eight systems" title="Each one does its job. Together they run the business." />
          <div className="pf-systems">
            {d.systems.map((s, i) => (
              <Reveal key={s.id} className="pf-system" delay={(i % 4) * 60}>
                <div className="pf-system__top">
                  <img src={logoOf(s.id)} alt="" />
                  <h3>{s.name}</h3>
                </div>
                <p>{s.job}</p>
                <ul>
                  {s.shares.map((x) => (
                    <li key={x}>
                      <Icon name="check" size={14} />
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pf-section" id="story">
        <div className="shell">
          <SectionHead eyebrow="See it work" title={d.story.title} />
          <ol className="pf-story">
            {d.story.steps.map(([where, what], i) => (
              <Reveal as="li" key={what} delay={i * 90}>
                <span className="pf-story__dot">{i + 1}</span>
                <b>{where}</b>
                <p>{what}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <MoreLinks />
      <Faq items={d.faq} />
    </>
  )
}

function Detail({ page }) {
  const menuItem = platformMenu.find((m) => m.slug === page.slug)
  return (
    <>
      <Hero hero={page.hero} menuItem={menuItem} />

      <section className="pf-section" id="features">
        <div className="shell">
          <SectionHead eyebrow="What you get" title={`${page.title}, built into every system`} />
          <div className="pf-cards">
            {page.features.map((f, i) => (
              <Reveal key={f.title} className="pf-card" delay={i * 80}>
                <span
                  className="pf-card__icon"
                  style={{ '--g1': menuItem.grad[0], '--g2': menuItem.grad[1] }}
                  aria-hidden="true"
                >
                  <Icon name={menuItem.icon} size={18} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pf-section pf-section--muted" id="steps">
        <div className="shell">
          <SectionHead eyebrow="How it works" title="Up and running in three steps" />
          <ol className="pf-steps">
            {page.steps.map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 90}>
                <span className="pf-steps__num">{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="pf-section" id="examples">
        <div className="shell">
          <SectionHead eyebrow="In practice" title="What it looks like day to day" />
          <ul className="pf-examples">
            {page.examples.map((ex, i) => (
              <Reveal as="li" key={ex} delay={i * 60}>
                <Icon name="arrowRight" size={18} />
                <span>{ex}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <MoreLinks current={page.slug} />
      <Faq items={page.faq} />
    </>
  )
}

export default function PlatformPage({ slug }) {
  const page = slug ? platformPages.find((p) => p.slug === slug) : null
  return (
    <div className="page page--platform">
      {page ? <Detail page={page} /> : <Overview />}
      <CtaBand />
    </div>
  )
}

export const platformTitle = (slug) => {
  const page = slug ? platformPages.find((p) => p.slug === slug) : null
  return page ? `${page.title} · Bishnoi One` : 'Platform · Bishnoi One'
}
