import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView.js'
import { useCountUp } from '../hooks/useCountUp.js'
import { products } from '../data/site.js'
import './DashboardStage.css'

/* A tilted desktop monitor showing a live-looking Bishnoi One overview:
   KPI tiles, an orders chart, a feed that keeps receiving new activity,
   approvals, stock levels and who is in today. All sample data. */

const ORDERS = [42, 58, 51, 74, 66, 88, 79, 95, 84, 102, 97, 118]
const RETURNS = [18, 22, 30, 26, 34, 29, 38, 31, 36, 33, 41, 37]
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function smooth(values, w, h, max) {
  const step = w / (values.length - 1)
  const pts = values.map((v, i) => [i * step, h - (v / max) * h])
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`
  }
  return d
}

const KPIS = [
  { label: 'Revenue this month', value: 4.82, prefix: '₱', suffix: 'M', digits: 2, delta: '+12.4%', up: true, spark: [3, 5, 4, 6, 5, 7, 8] },
  { label: 'Orders today', value: 1284, digits: 0, delta: '+8.1%', up: true, spark: [4, 4, 6, 5, 7, 6, 8] },
  { label: 'Stock value', value: 18.6, prefix: '₱', suffix: 'M', digits: 1, delta: '-2.3%', up: false, spark: [8, 7, 7, 6, 6, 5, 5] },
  { label: 'Team members', value: 214, digits: 0, delta: '+3 new', up: true, spark: [5, 5, 6, 6, 6, 7, 7] },
]

const APPROVALS = [
  { level: 'Urgent', tone: 'red', title: 'Stock reorder', note: 'Paracetamol 500mg below minimum', due: '1 hr' },
  { level: 'Today', tone: 'orange', title: 'Payroll run', note: '214 payslips ready to release', due: '3 hrs' },
  { level: 'This week', tone: 'green', title: 'Supplier invoice', note: 'Matched to PO-2291', due: '2 days' },
]

const FEED = [
  { system: 'inventory', event: 'Batch B-1182 received at Manila DC', status: 'Posted' },
  { system: 'crm', event: 'Quote sent to St. Luke’s Pharmacy', status: 'Sent' },
  { system: 'books', event: 'Invoice INV-5530 paid', status: 'Matched' },
  { system: 'people', event: 'Leave approved for J. Santos', status: 'Approved' },
  { system: 'finance', event: 'Budget Q4 marketing updated', status: 'Saved' },
  { system: 'analytics', event: 'Weekly sales report refreshed', status: 'Ready' },
  { system: 'inventory', event: 'Transfer TR-418 to Cebu branch', status: 'Shipped' },
  { system: 'crm', event: 'New lead from Mercury Clinic', status: 'Assigned' },
]

const STOCK = [
  { name: 'Paracetamol 500mg', pct: 18, tone: 'red' },
  { name: 'Amoxicillin 250mg', pct: 46, tone: 'orange' },
  { name: 'Vitamin C 1000mg', pct: 72, tone: 'green' },
  { name: 'Insulin pens', pct: 88, tone: 'green' },
]

const TEAM = [
  { i: 'MR', c: '#f36b21' },
  { i: 'JS', c: '#173f2a' },
  { i: 'AL', c: '#5a6dff' },
  { i: 'KC', c: '#59ba43' },
  { i: 'PD', c: '#e02f2f' },
]

function Kpi({ k, active, d }) {
  const v = useCountUp(k.value, active, 1800)
  const max = Math.max(...k.spark)
  const pts = k.spark.map((s, i) => `${(i / (k.spark.length - 1)) * 60},${18 - (s / max) * 16}`).join(' ')
  return (
    <div className="dash__card dash__kpi" style={{ '--d': d }}>
      <span className="dash__kpi-label">{k.label}</span>
      <strong className="dash__kpi-value">
        {k.prefix}
        {v.toLocaleString('en-US', { minimumFractionDigits: k.digits, maximumFractionDigits: k.digits })}
        {k.suffix}
      </strong>
      <div className="dash__kpi-foot">
        <span className={`dash__delta ${k.up ? 'is-up' : 'is-down'}`}>{k.delta}</span>
        <svg viewBox="0 0 60 20" className="dash__spark">
          <polyline points={pts} />
        </svg>
      </div>
    </div>
  )
}

function clock(offsetMin) {
  const t = 9 * 60 + 42 - offsetMin
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`
}

export default function DashboardStage() {
  const [ref, inView] = useInView({ threshold: 0.2 })
  const [tick, setTick] = useState(0)

  // Feed: a new item arrives every few seconds while the section is visible.
  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setTick((t) => t + 1), 3200)
    return () => clearInterval(id)
  }, [inView])

  const W = 520
  const H = 130
  const max = 130
  const peak = 9
  const px = (peak / (ORDERS.length - 1)) * W
  const py = H - (ORDERS[peak] / max) * H
  const byId = Object.fromEntries(products.map((p) => [p.id, p]))
  const feed = Array.from({ length: 4 }, (_, k) => {
    const n = tick - k
    return { ...FEED[((n % FEED.length) + FEED.length) % FEED.length], key: n, time: clock(k * 17 - tick * 3) }
  })

  return (
    <section className={`stage ${inView ? 'is-in' : ''}`} ref={ref} aria-labelledby="stage-title">
      <div className="shell shell--wide stage__head">
        <p className="stage__eyebrow">One screen for the whole company</p>
        <h2 id="stage-title" className="stage__title">
          See every system <em>at a glance</em>
        </h2>
        <p className="stage__lead">
          Sales, stock, people and money update on one live dashboard, so every team works from the
          same numbers.
        </p>
      </div>

      <div className="stage__scene" aria-hidden="true">
        <div className="stage__rings" />
        <div className="monitor">
          <div className="monitor__screen">
            <aside className="dash__side">
              <div className="dash__brand">
                <span className="dash__brand-dot" /> Bishnoi One
              </div>
              <div className="dash__search">Search anything…</div>
              <p className="dash__group">Systems</p>
              {products.map((p, i) => (
                <div key={p.id} className={`dash__nav ${i === 0 ? 'is-active' : ''}`}>
                  <img src={p.logo} alt="" width="14" height="14" />
                  {p.name}
                </div>
              ))}
              <p className="dash__group">Workspace</p>
              <div className="dash__nav">
                Approvals <span className="dash__badge">12</span>
              </div>
              <div className="dash__nav">Team &amp; roles</div>
              <div className="dash__nav">Reports</div>
              <div className="dash__nav">Audit trail</div>
              <div className="dash__user">
                <span className="dash__avatar" style={{ background: '#173f2a' }}>
                  AB
                </span>
                <div>
                  <b>Ana Bautista</b>
                  <small>Operations</small>
                </div>
              </div>
            </aside>

            <div className="dash__main">
              <div className="dash__topbar" style={{ '--d': 0 }}>
                <div>
                  <b>Good morning, Ana</b>
                  <small>Here is what changed since yesterday</small>
                </div>
                <span className="dash__pill dash__pill--live">
                  <span className="dash__live" /> Live
                </span>
              </div>

              <div className="dash__kpis">
                {KPIS.map((k, i) => (
                  <Kpi key={k.label} k={k} active={inView} d={i + 1} />
                ))}
              </div>

              <div className="dash__card dash__chart" style={{ '--d': 5 }}>
                <div className="dash__card-head">
                  <strong>Orders vs returns</strong>
                  <div className="dash__legend">
                    <span className="dash__key dash__key--a" /> Orders
                    <span className="dash__key dash__key--b" /> Returns
                    <span className="dash__pill">This year ▾</span>
                  </div>
                </div>
                <svg viewBox={`0 0 ${W} ${H + 24}`} className="dash__svg">
                  <defs>
                    <linearGradient id="dash-area" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#f36b21" stopOpacity="0.22" />
                      <stop offset="1" stopColor="#f36b21" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0, 0.33, 0.66, 1].map((g) => (
                    <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} className="dash__grid" />
                  ))}
                  <path d={`${smooth(ORDERS, W, H, max)} L${W},${H} L0,${H} Z`} className="dash__area" fill="url(#dash-area)" />
                  <path d={smooth(RETURNS, W, H, max)} className="dash__line dash__line--soft" />
                  <path d={smooth(ORDERS, W, H, max)} className="dash__line" />
                  <line x1={px} x2={px} y1="0" y2={H} className="dash__cursor" />
                  <circle cx={px} cy={py} r="4.5" className="dash__dot" />
                  {MONTHS.map((m, i) => (
                    <text key={m} x={(i / 11) * W} y={H + 18} className={`dash__tick ${i === peak ? 'is-on' : ''}`}>
                      {m}
                    </text>
                  ))}
                </svg>
                <div className="dash__tip" style={{ left: `${(px / W) * 100}%` }}>
                  <b>Oct 2026</b>
                  <span>Orders 97k</span>
                  <span>Returns 33k</span>
                </div>
              </div>

              <div className="dash__card dash__table" style={{ '--d': 6 }}>
                <div className="dash__card-head">
                  <strong>Recent activity</strong>
                  <span className="dash__link">View all →</span>
                </div>
                <div className="dash__feed">
                  {feed.map((a, k) => (
                    <div className={`dash__row ${k === 0 ? 'is-new' : ''}`} key={a.key}>
                      <img src={byId[a.system]?.logo} alt="" width="14" height="14" />
                      <span className="dash__event">{a.event}</span>
                      <span className="dash__time">{a.time}</span>
                      <span className="dash__ok">✓ {a.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dash__aside">
              <div className="dash__card" style={{ '--d': 3 }}>
                <div className="dash__card-head">
                  <strong>Waiting for approval</strong>
                  <span className="dash__muted">12 open</span>
                </div>
                {APPROVALS.map((a) => (
                  <div className={`dash__task dash__task--${a.tone}`} key={a.title}>
                    <span className="dash__level">{a.level}</span>
                    <div>
                      <b>{a.title}</b>
                      <small>{a.note}</small>
                    </div>
                    <span className="dash__due">{a.due}</span>
                  </div>
                ))}
              </div>

              <div className="dash__card" style={{ '--d': 5 }}>
                <div className="dash__card-head">
                  <strong>Stock levels</strong>
                  <span className="dash__muted">Manila DC</span>
                </div>
                {STOCK.map((s, i) => (
                  <div className="dash__stock" key={s.name}>
                    <div className="dash__stock-top">
                      <span>{s.name}</span>
                      <b>{s.pct}%</b>
                    </div>
                    <div className={`dash__bar dash__bar--${s.tone}`}>
                      <span style={{ '--w': `${s.pct}%`, '--i': i }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="dash__card" style={{ '--d': 7 }}>
                <div className="dash__card-head">
                  <strong>In today</strong>
                  <span className="dash__muted">198 of 214</span>
                </div>
                <div className="dash__team">
                  {TEAM.map((t, i) => (
                    <span key={t.i} className="dash__avatar" style={{ background: t.c, '--i': i }}>
                      {t.i}
                    </span>
                  ))}
                  <span className="dash__avatar dash__avatar--more">+193</span>
                </div>
                <div className="dash__synced">
                  <span className="dash__live" /> All eight systems in sync · 2 min ago
                </div>
              </div>
            </div>
          </div>
          <div className="monitor__chin" />
          <div className="monitor__neck" />
          <div className="monitor__foot" />
        </div>
      </div>
    </section>
  )
}
