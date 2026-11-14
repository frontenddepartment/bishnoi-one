import { useEffect } from 'react'
import { useInView } from '../hooks/useInView.js'
import './HowItWorks.css'

/* Three posters hanging on wires against a dark wall:
   1. orange — "Fix it once. Clear it everywhere." with a dashboard peeking in
   2. dark   — "Eight systems. One login." with glowing rings and the app icon
   3. cream  — "Faster sign-offs. Fewer follow-ups." with a 92.4% progress ring */

const EXCEPTIONS = [
  ['PO not found in Books', 'RECORD_NOT_FOUND', 'Critical', 'red', 64],
  ['Desk API timeout (30s)', 'TIMEOUT', 'High', 'orange', 96],
  ['Email token expired', 'invalid_grant', 'Critical', 'red', 22],
  ['Low confidence: vendor name', 'CONFIDENCE_BELOW_0.70', 'Medium', 'amber', 41],
  ['Duplicate invoice detected', 'DUPLICATE_HASH', 'Low', 'pink', 22],
  ['CRM rate limited', 'HTTP_429', 'Medium', 'amber', 12],
]

const SIDEBAR = [
  ['Workspace', ['Overview', 'Workflows', 'Templates', 'Workflow Builder', 'AI Configuration', 'Test Run', 'Review Queue', 'Analytics']],
  ['Operations', ['Runs & Logs', 'Exceptions', 'Connections', 'Data Sources']],
  ['Administration', ['Team & Permissions', 'Notifications', 'Usage & Billing', 'Audit Log', 'System Settings']],
]

// Tiny sparkline paths for the "Runs" column
const SPARKS = [
  'M0 6 L5 5 L10 6 L15 3 L20 4 L25 1',
  'M0 4 L4 1 L8 6 L12 2 L16 6 L20 2 L25 4',
  'M0 6 L6 5 L12 5 L18 2 L25 1',
  'M0 4 L6 3 L12 4 L18 3 L25 3',
  'M0 5 L5 2 L10 6 L15 3 L20 5 L25 2',
  'M0 6 L6 6 L10 2 L14 6 L20 4 L25 5',
]

const Brand = ({ tone }) => (
  <span className={`hw__brand hw__brand--${tone}`}>
    <span className="hw__brand-mark">
      <img src="/bishnoi-logo.png" alt="" />
    </span>
    Bishnoi One
  </span>
)

export default function HowItWorks() {
  const [ref, inView] = useInView({ threshold: 0.15 })

  // Scroll progress through the section (-1 entering → 1 leaving) drives a
  // gentle drift and tilt on each poster, like paper moving on its wires.
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / ((vh + r.height) / 2)))
      el.style.setProperty('--p', p.toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])
  const pct = 92.4
  const R = 52
  const C = 2 * Math.PI * R

  return (
    <section className={`hw ${inView ? 'is-in' : ''}`} id="how" ref={ref} aria-label="Bishnoi One in practice">
      <div className="hw__wall">
        {/* 1 — Orange poster */}
        <article className="hw__poster hw__poster--orange" style={{ '--i': 0 }}>
          <span className="hw__wire hw__wire--l" aria-hidden="true" />
          <span className="hw__wire hw__wire--r" aria-hidden="true" />
          <h3>Fix it once. Clear it everywhere.</h3>

          <div className="hw__shot" aria-hidden="true">
            <div className="hw__chrome">
              <i /><i /><i />
              <span className="hw__url">Bishnoi One · Exceptions</span>
            </div>
            <div className="hw__app">
              <aside className="hw__side">
                <span className="hw__side-brand">
                  <img src="/bishnoi-logo.png" alt="" /> Bishnoi One
                </span>
                {SIDEBAR.map(([group, items]) => (
                  <div key={group} className="hw__side-group">
                    <em>{group}</em>
                    {items.map((item) => (
                      <span key={item} className={item === 'Exceptions' ? 'is-on' : ''}>
                        {item}
                        {item === 'Templates' ? <b>180</b> : null}
                        {item === 'Notifications' ? <b>78</b> : null}
                      </span>
                    ))}
                  </div>
                ))}
              </aside>
              <div className="hw__main">
                <span className="hw__crumb">Operations › Exceptions</span>
                <b className="hw__h">Exceptions</b>
                <small>Grouped by root cause; one fix clears many runs.</small>
                <div className="hw__kpis">
                  <span><i className="hw__ico hw__ico--red">!</i><em>Open</em><b>23</b> 6 groups</span>
                  <span><i className="hw__ico hw__ico--green">✓</i><em>Auto-resolved today</em><b>41</b> by rules</span>
                </div>
                <div className="hw__tabs">
                  <span className="is-on">Open 23</span>
                  <span>Snoozed 4</span>
                  <span>Resolved 112</span>
                </div>
                <div className="hw__table">
                  <div className="hw__tr hw__th">
                    <span />
                    <span>Exception</span>
                    <span>Severity</span>
                    <span>Runs</span>
                  </div>
                  {EXCEPTIONS.map(([title, code, sev, tone, runs], i) => (
                    <div key={title} className="hw__tr">
                      <span><i className="hw__check" /></span>
                      <span>
                        <b>{title}</b>
                        <small>{code}</small>
                      </span>
                      <span><i className="hw__sev" data-tone={tone}>{sev}</i></span>
                      <span className="hw__runs">
                        {runs}
                        <svg viewBox="0 0 25 7"><path d={SPARKS[i]} /></svg>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="hw__note">3 of 6 open groups share one cause: connector credentials. Rotating the email token…</div>
                <b className="hw__h hw__h--sm">Rules at work</b>
                <small>Exceptions handled automatically before they reach you</small>
                <span className="hw__rule">Route “PO not found” to AP review</span>
                <span className="hw__rule">Retry HTTP 429 with exponential backoff</span>
              </div>
            </div>
          </div>

          <Brand tone="dark" />
        </article>

        {/* 2 — Dark poster (hangs a little higher) */}
        <article className="hw__poster hw__poster--dark" style={{ '--i': 1 }}>
          <span className="hw__wire hw__wire--l" aria-hidden="true" />
          <span className="hw__wire hw__wire--r" aria-hidden="true" />
          <h3>Eight systems. One login.</h3>

          <div className="hw__rings" aria-hidden="true" />
          <span className="hw__appicon" aria-hidden="true">
            <img src="/bishnoi-logo.png" alt="" />
          </span>
          <span className="hw__domain">Bishnoi One</span>
        </article>

        {/* 3 — Cream poster */}
        <article className="hw__poster hw__poster--cream" style={{ '--i': 2 }}>
          <span className="hw__wire hw__wire--l" aria-hidden="true" />
          <span className="hw__wire hw__wire--r" aria-hidden="true" />
          <h3>
            Faster sign-offs.
            <br />
            <span>Fewer follow-ups.</span>
          </h3>

          <div className="hw__gauge" aria-label={`${pct}% auto-processed this week`}>
            <svg viewBox="0 0 120 120">
              <defs>
                <linearGradient id="hw-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff6a3d" />
                  <stop offset="55%" stopColor="#f59a7f" />
                  <stop offset="100%" stopColor="#c9b3e6" />
                </linearGradient>
              </defs>
              <circle className="hw__gauge-track" cx="60" cy="60" r={R} />
              <circle
                className="hw__gauge-arc"
                cx="60"
                cy="60"
                r={R}
                stroke="url(#hw-grad)"
                strokeDasharray={C}
                strokeDashoffset={inView ? C * (1 - pct / 100) : C}
              />
            </svg>
            <span className="hw__gauge-label">
              <b>{pct}%</b>
              <small>auto-processed this week</small>
            </span>
          </div>

          <Brand tone="cream" />
        </article>
      </div>
    </section>
  )
}
