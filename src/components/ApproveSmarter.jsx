import { useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView.js'
import Icon from './ui/Icon.jsx'
import './ApproveSmarter.css'

/* "Approve smarter." band: two product panels on top (preview the workflow,
   customise each step), then a big orange headline with a photo pill. */

const STEPS = [
  ['People', 'Leave request submitted', 'Trigger · from the People app, any team'],
  ['Books', 'Check leave balance', 'Action · reads balance and payroll period'],
  ['Desk', 'Confirm cover for the shift', 'Action · checks open tickets for that day'],
  ['Finance', 'Flag unpaid days over limit', 'Rule · only if balance is below 0'],
  ['People', 'Manager approves in one tap', 'Approval · reminder after 4 hours'],
  ['Books', 'Update payroll', 'Action · synced to this month’s run'],
]

// Icon files in public/ (Desk's is lowercase)
const icon = (sys) => (sys === 'Desk' ? '/desk.png' : `/${sys}.png`)

const SYSTEMS = [
  ['People', 'is-on'],
  ['Books', 'is-on'],
  ['Desk', ''],
]

// Laptop dashboard content (design width; see .aps__dash in the CSS)
const DASH_W = 440

const NAV = [
  ['Dashboard', null, 'board'],
  ['Approvals', null, 'check'],
  ['People', 'People'],
  ['Books', 'Books'],
  ['Finance', 'Finance'],
  ['Desk', 'Desk'],
  ['Inventory', 'Inventory'],
  ['CRM', 'CRM'],
  ['Analytics', 'Analytics'],
  ['WorkDrive', 'WorkDrive'],
  ['Automations', null, 'automation'],
  ['Settings', null, 'shield'],
]

// Owner avatars (same people and colours as the system dashboards)
const OWNERS = {
  J: '#f36b21',
  M: '#5a6dff',
  K: '#173f2a',
  A: '#3e8e2d',
  R: '#fd4040',
}

// Grouped tables in the Invoices style.
// rows: [request, requester, owner initial, amount, status tone, status, button]
const GROUPS = [
  {
    title: 'Waiting for you',
    color: '#f36b21',
    rows: [
      ['Leave · Dec 4–5', 'Leo Cruz · People', 'J', '2 days', 'yellow', 'Pending', 'Approve'],
      ['Trade fair booth', 'Marketing · Finance', 'K', '₱18,000', 'yellow', 'Pending', 'Approve'],
      ['Refund #2078', 'MegaDrug · Desk', 'R', '₱4,200', 'red', 'Escalated', 'Review'],
      ['Overtime · Nov wk 4', 'Ana Reyes · People', 'A', '6 hrs', 'blue', 'In review', 'Approve'],
    ],
  },
  {
    title: 'Approved today',
    color: '#3e8e2d',
    rows: [
      ['BILL-211 · PharmaHub', 'Purchasing · Books', 'M', '₱31,500', 'green', 'Approved', null],
      ['PO-2041 · MedSupply', 'Inventory · Books', 'A', '₱52,000', 'green', 'Approved', null],
    ],
  },
  {
    title: 'Due this week',
    color: '#5a6dff',
    rows: [
      ['Contract renewal · LabOne', 'Sales · CRM', 'K', '₱120,000', 'blue', 'Due Thu', 'Approve'],
      ['New laptop · Ria Santos', 'Onboarding · People', 'J', '₱58,000', 'yellow', 'Due Fri', 'Approve'],
    ],
  },
]

export default function ApproveSmarter() {
  const [ref, inView] = useInView({ threshold: 0.15 })
  const fitRef = useRef(null)

  // The dashboard is designed at a fixed size (DASH_W px wide) and scaled to
  // whatever width the laptop screen ends up at.
  useEffect(() => {
    const el = fitRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => el.style.setProperty('--s', el.offsetWidth / DASH_W))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <section className={`aps ${inView ? 'is-in' : ''}`} ref={ref} aria-labelledby="aps-title">
      <div className="aps__panels">
        {/* Preview the workflow */}
        <div className="aps__panel aps__panel--peach">
          <span className="aps__tag">Preview the workflow</span>

          <div className="aps__modal" aria-hidden="true">
            <div className="aps__modal-head">
              <span className="aps__dot aps__dot--orange" />
              <div>
                <b>Leave request to payroll</b>
                <small>Route time-off requests, check cover and balance, then update payroll once approved.</small>
              </div>
              <span className="aps__x">×</span>
            </div>

            <div className="aps__modal-body">
              <ol className="aps__steps">
                {STEPS.map(([sys, title, sub], i) => (
                  <li key={title} style={{ '--i': i }}>
                    <img src={icon(sys)} alt="" />
                    <span>
                      <b>{title}</b>
                      <small>{sub}</small>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="aps__side">
                <em>Systems</em>
                {SYSTEMS.map(([sys, on]) => (
                  <div key={sys} className="aps__sys">
                    <img src={icon(sys)} alt="" />
                    <span>{sys}</span>
                    <i className={on}>{on ? 'Connected' : 'Connect'}</i>
                  </div>
                ))}
                <em>Preview</em>
                <dl>
                  <dt>Runs / mo</dt><dd>2,431</dd>
                  <dt>Avg. approval</dt><dd>6 min</dd>
                  <dt>Saved</dt><dd>~14 h / wk</dd>
                </dl>
              </div>
            </div>

            <div className="aps__modal-foot">
              <span>Preview in sandbox</span>
              <span className="aps__btn aps__btn--ghost">Close</span>
              <span className="aps__btn">Use this flow</span>
            </div>
          </div>
        </div>

        {/* Approve from one dashboard */}
        <div className="aps__panel aps__panel--lilac">
          <span className="aps__tag">Approve from one dashboard</span>

          <div className="aps__scene" aria-hidden="true">
            <img className="aps__scene-img" src="/tablelaptop.png" alt="" loading="lazy" />
            {/* Live dashboard laid over the laptop screen (below the browser bar) */}
            <div className="aps__screen-fit" ref={fitRef}>
            <div className="aps__dash">
              <aside className="aps__side-nav">
                <span className="aps__brandmini">
                  <img src="/bishnoi-logo.png" alt="" /> Bishnoi One
                </span>
                {NAV.map(([label, sys, glyph], i) => (
                  <span key={label} className={`aps__nav-item ${i === 1 ? 'is-on' : ''}`}>
                    {sys ? <img src={icon(sys)} alt="" /> : <Icon name={glyph} size={8} className="aps__nav-ico" />}
                    {label}
                  </span>
                ))}
              </aside>

              <div className="aps__dash-main">
                <div className="aps__dash-head">
                  <b>Approvals</b>
                  <span className="aps__search">Search requests…</span>
                  <span className="aps__me">M</span>
                </div>

                {GROUPS.map((g) => (
                  <div key={g.title} className="aps__table" style={{ '--grp': g.color }}>
                    <div className="aps__tr aps__th">
                      <span>{g.title}</span>
                      <span>Owner</span>
                      <span>Amount</span>
                      <span>Status</span>
                      <span />
                    </div>
                    {g.rows.map(([title, sub, owner, amt, tone, status, action]) => (
                      <div key={title} className="aps__tr">
                        <span>
                          <b>{title}</b>
                          <small>{sub}</small>
                        </span>
                        <span><i className="aps__av" style={{ '--c': OWNERS[owner] }}>{owner}</i></span>
                        <span>{amt}</span>
                        <span className="aps__status" data-tone={tone}>{status}</span>
                        <span>{action ? <i className={`aps__btn ${action === 'Review' ? 'aps__btn--ghost' : ''}`}>{action}</i> : null}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Big headline band */}
      <div className="aps__band">
        <h2 className="aps__title" id="aps-title">
          <span className="aps__row">
            <span className="aps__word">Decide faster and approve</span>
            <span className="aps__photo">
              <img src="/howwework.jpg" alt="" aria-hidden="true" loading="lazy" />
            </span>
          </span>
          <span className="aps__row">
            <span className="aps__word">all in one place.</span>
            <a className="aps__cta" href="#cta">Explore now</a>
          </span>
        </h2>
        <p className="aps__note">Every request, approval and sign-off in one place.</p>
      </div>
    </section>
  )
}
