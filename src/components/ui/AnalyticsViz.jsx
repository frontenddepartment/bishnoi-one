import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView.js'
import { systems } from '../../data/site.js'
import './AnalyticsViz.css'

/* Live visuals for the Analytics page. All sample data.
     LiveDashboard  tabbed dashboard (Sales, Inventory, People, Finance) whose
                    numbers keep ticking while it is on screen
     AskDemo        a plain-language question typed in, answered with a chart

   Chart colours follow the dataviz reference palette (light mode, validated on
   #fff): blue, orange, aqua, yellow. Aqua and yellow sit below 3:1 on white,
   so every mix chart carries visible labels with values. */

const TICK_MS = 2600
const DAYS = 30

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Small seeded random so the sample series look the same on every visit.
function rng(seed) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function series(seed, start, end, noise) {
  const r = rng(seed)
  return Array.from({ length: DAYS }, (_, i) => {
    const trend = start + ((end - start) * i) / (DAYS - 1)
    const weekly = Math.sin((i / 7) * Math.PI * 2) * noise * 0.6
    return trend + weekly + (r() - 0.5) * 2 * noise
  })
}

/* --- Formatting ---------------------------------------------------------- */
function fmt(value, unit, digits = 0) {
  if (unit === 'peso') {
    if (value >= 1e6) return `₱${(value / 1e6).toFixed(2)}M`
    if (value >= 1e4) return `₱${Math.round(value / 1e3)}K`
    return `₱${Math.round(value).toLocaleString()}`
  }
  if (unit === 'pct') return `${value.toFixed(digits)}%`
  return Math.round(value).toLocaleString()
}

const dayLabel = (index) => {
  const d = new Date()
  d.setDate(d.getDate() - (DAYS - 1 - index))
  return index === DAYS - 1 ? 'Today' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

// Round a raw step up to 1, 2, 2.5 or 5 x 10^n so axis labels read cleanly.
function niceStep(raw) {
  const exp = Math.pow(10, Math.floor(Math.log10(raw)))
  const f = raw / exp
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * exp
}

const logoOf = (id) => systems.find((s) => s.id === id)?.logo

/* --- Sample dashboards --------------------------------------------------- */
const SERIES_COLORS = ['var(--viz-1)', 'var(--viz-2)', 'var(--viz-3)', 'var(--viz-4)']
const STATUS_COLORS = { good: 'var(--viz-good)', warning: 'var(--viz-warning)', critical: 'var(--viz-critical)' }

const DASHBOARDS = [
  {
    id: 'sales',
    tab: 'Sales',
    kpis: [
      { label: 'Revenue this month', value: 4820000, unit: 'peso', delta: '+12.4%', up: true, live: 2600 },
      { label: 'Orders this month', value: 1284, delta: '+8.1%', up: true, live: 2 },
      { label: 'Average order', value: 3754, unit: 'peso', delta: '+3.9%', up: true, live: 0 },
      { label: 'Win rate', value: 32, unit: 'pct', delta: '+2 pts', up: true, live: 0 },
    ],
    chart: {
      title: 'Revenue per day',
      unit: 'peso',
      zero: true,
      current: series(7, 118000, 172000, 14000),
      previous: series(19, 108000, 146000, 12000),
      labels: ['This month', 'Last month'],
      live: 2600,
    },
    bars: {
      title: 'Revenue by branch',
      unit: 'peso',
      rows: [['Makati', 1420000], ['Quezon City', 1180000], ['Online', 960000], ['Cebu', 740000], ['Davao', 520000]],
    },
    mix: { title: 'Orders by channel', note: ['1,284', 'orders this month'], rows: [['In store', 42], ['Online', 31], ['B2B', 19], ['Phone', 8]] },
    feed: [
      ['crm', 'Deal won · Cedar Hospital', '₱1.2M'],
      ['books', 'Invoice INV-5531 paid', '₱84K'],
      ['crm', 'New lead · Mercury Clinic', 'Assigned'],
      ['inventory', 'Order SO-2210 shipped', '42 items'],
      ['books', 'Invoice INV-5532 sent', '₱36K'],
      ['crm', 'Quote sent · Bayside Labs', '₱310K'],
    ],
  },
  {
    id: 'inventory',
    tab: 'Inventory',
    kpis: [
      { label: 'Stock value', value: 18600000, unit: 'peso', delta: '-2.3%', up: false, live: 0 },
      { label: 'Units shipped today', value: 1116, delta: '+6.0%', up: true, live: 4 },
      { label: 'Items below reorder point', value: 7, delta: '-3 vs last week', up: true, live: 0 },
      { label: 'On-time delivery', value: 98, unit: 'pct', delta: '+1 pt', up: true, live: 0 },
    ],
    chart: {
      title: 'Units shipped per day',
      unit: 'count',
      zero: true,
      current: series(3, 880, 1120, 70),
      previous: series(11, 840, 990, 60),
      labels: ['This month', 'Last month'],
      live: 4,
    },
    bars: {
      title: 'Stock value by warehouse',
      unit: 'peso',
      rows: [['Main warehouse', 8400000], ['Quezon City', 3900000], ['Cebu', 3100000], ['Makati', 2200000], ['Davao', 1000000]],
    },
    mix: {
      title: 'Stock health',
      note: ['1,642', 'items tracked'],
      status: true,
      rows: [['In stock', 86, 'good'], ['Low stock', 10, 'warning'], ['Out of stock', 4, 'critical']],
    },
    feed: [
      ['inventory', 'Batch B-1182 received · Main', '1,200 units'],
      ['inventory', 'Transfer TR-418 to Cebu', 'Shipped'],
      ['books', 'Bill matched to PO-2291', '₱148K'],
      ['inventory', 'Reorder drafted · Nitrile gloves', '400 boxes'],
      ['desk', 'Ticket linked to SO-2207', 'Delivered'],
      ['inventory', 'Cycle count · Aisle 4', 'No variance'],
    ],
  },
  {
    id: 'people',
    tab: 'People',
    kpis: [
      { label: 'Headcount', value: 214, delta: '+3 this month', up: true, live: 0 },
      { label: 'Clocked in today', value: 188, delta: '88% of team', up: true, live: 1 },
      { label: 'On leave today', value: 9, delta: '2 fewer than usual', up: true, live: 0 },
      { label: 'Turnover, 12 months', value: 4.1, unit: 'pct', digits: 1, delta: '-0.6 pts', up: true, live: 0 },
    ],
    chart: {
      title: 'Attendance rate per day',
      unit: 'pct',
      digits: 1,
      zero: false,
      current: series(5, 91, 94.5, 1.2),
      previous: series(23, 90, 92.5, 1.2),
      labels: ['This month', 'Last month'],
      live: 0.05,
    },
    bars: {
      title: 'Headcount by department',
      unit: 'count',
      rows: [['RX', 64], ['Hospital', 52], ['B2B', 38], ['Finance', 26], ['Regulatory', 20]],
    },
    mix: { title: 'Where the team is today', note: ['214', 'people'], rows: [['In office', 152], ['At a branch', 36], ['On leave', 9], ['Off shift', 17]] },
    feed: [
      ['people', 'Leave approved · J. Santos', '2 days'],
      ['people', 'New hire starts · M. Santos', 'Makati'],
      ['books', 'Payroll run prepared', '214 payslips'],
      ['people', 'Review completed · A. Reyes', 'RX'],
      ['people', 'Shift swap approved · Cebu', 'Fri'],
      ['workdrive', 'Contract filed · M. Santos', 'Signed'],
    ],
  },
  {
    id: 'finance',
    tab: 'Finance',
    kpis: [
      { label: 'Cash balance', value: 12400000, unit: 'peso', delta: '+5.2%', up: true, live: 1800 },
      { label: 'Owed to us', value: 3100000, unit: 'peso', delta: '-8.4%', up: true, live: 0 },
      { label: 'Spend vs budget', value: 87, unit: 'pct', delta: 'On track', up: true, live: 0 },
      { label: 'Overdue invoices', value: 14, delta: '-5 vs last week', up: true, live: 0 },
    ],
    chart: {
      title: 'Cash balance per day',
      unit: 'peso',
      zero: false,
      current: series(13, 10200000, 12400000, 180000),
      previous: series(29, 9600000, 10400000, 160000),
      labels: ['This month', 'Last month'],
      live: 1800,
    },
    bars: {
      title: 'Spend by department, this month',
      unit: 'peso',
      rows: [['RX', 1600000], ['Hospital', 1300000], ['B2B', 900000], ['Marketing', 600000], ['IT', 400000]],
    },
    mix: { title: 'Q4 budget', note: ['₱18.4M', 'for the quarter'], rows: [['Spent', 62], ['Committed', 21], ['Remaining', 17]] },
    feed: [
      ['books', 'Payment received · Cedar Hospital', '₱1.2M'],
      ['finance', 'Budget updated · Q4 marketing', 'Saved'],
      ['books', 'Supplier bill paid · PO-2291', '₱148K'],
      ['finance', 'Spend approved · IT laptops', '₱220K'],
      ['books', 'Reminder sent · INV-5498', 'Overdue'],
      ['finance', 'Cash forecast refreshed', '13 weeks'],
    ],
  },
]

/* --- Pieces -------------------------------------------------------------- */

// Tweens from the previous value to the new one: counts up on mount, glides on ticks.
function Num({ value, unit, digits }) {
  const [shown, setShown] = useState(0)
  const from = useRef(0)
  useEffect(() => {
    if (reducedMotion()) {
      setShown(value)
      from.current = value
      return
    }
    const start = performance.now()
    const a = from.current
    const dur = a === 0 ? 1200 : 600
    let frame = 0
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const v = a + (value - a) * (1 - Math.pow(1 - p, 3))
      setShown(v)
      from.current = v
      if (p < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [value])
  return <>{fmt(shown, unit, digits)}</>
}

function LineChart({ chart, current }) {
  const [hover, setHover] = useState(null)
  // Axis: zero-based for counts and money, padded for rates; ends on round numbers.
  // Sized off the chart's starting data so the axis holds still while today's point grows.
  const base = [...chart.current, ...chart.previous]
  const hiBase = Math.max(...base)
  const bottom = chart.zero ? 0 : Math.min(...base)
  let top = hiBase + (hiBase - bottom) * 0.12
  if (chart.unit === 'pct') top = Math.min(top, 100)
  const step = niceStep((top - bottom) / 3)
  const min = chart.zero ? 0 : Math.floor(bottom / step) * step
  const max = Math.ceil(Math.max(top, ...current) / step) * step
  const ticks = []
  for (let v = max; v >= min - step / 2; v -= step) ticks.push(v)
  const y = (v) => 100 - ((v - min) / (max - min)) * 100
  const x = (i) => (i / (DAYS - 1)) * 100
  const path = (vals) => vals.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(' ')
  const last = current.length - 1

  const onMove = (event) => {
    const r = event.currentTarget.getBoundingClientRect()
    const i = Math.round(((event.clientX - r.left) / r.width) * (DAYS - 1))
    setHover(Math.max(0, Math.min(DAYS - 1, i)))
  }

  return (
    <div className="lv-card lv-card--chart">
      <div className="lv-card__head">
        <b>{chart.title}</b>
        <span className="lv-legend">
          <span>
            <i className="lv-key lv-key--line" />
            {chart.labels[0]}
          </span>
          <span>
            <i className="lv-key lv-key--dash" />
            {chart.labels[1]}
          </span>
        </span>
      </div>
      <div className="lv-line">
        <div className="lv-line__y">
          {ticks.map((t) => (
            <span key={t}>{fmt(t, chart.unit, chart.digits)}</span>
          ))}
        </div>
        <div className="lv-line__plot" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {ticks.map((t) => (
              <line key={t} x1="0" x2="100" y1={y(t)} y2={y(t)} className="lv-grid" />
            ))}
            <path d={path(chart.previous)} className="lv-prev" />
            <path d={path(current)} className="lv-cur" />
          </svg>
          {/* Live point: today's value keeps moving. */}
          <span className="lv-dot lv-dot--live" style={{ left: `${x(last)}%`, top: `${y(current[last])}%` }} />
          {hover !== null && (
            <>
              <span className="lv-cross" style={{ left: `${x(hover)}%` }} />
              <span className="lv-dot" style={{ left: `${x(hover)}%`, top: `${y(current[hover])}%` }} />
              <span className="lv-dot lv-dot--prev" style={{ left: `${x(hover)}%`, top: `${y(chart.previous[hover])}%` }} />
              {/* Sits beside the crosshair, inside the plot; flips left on the right half. */}
              <span className={`lv-tip ${x(hover) > 55 ? 'is-left' : ''}`} style={{ left: `${x(hover)}%` }}>
                <b>{dayLabel(hover)}</b>
                <span>
                  <i className="lv-key lv-key--line" />
                  {fmt(current[hover], chart.unit, chart.digits)}
                </span>
                <span>
                  <i className="lv-key lv-key--dash" />
                  {fmt(chart.previous[hover], chart.unit, chart.digits)}
                </span>
              </span>
            </>
          )}
        </div>
        <div className="lv-line__x">
          {[0, 7, 14, 21, 29].map((i) => (
            <span key={i}>{dayLabel(i)}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Bars({ bars, values }) {
  const max = Math.max(...values)
  return (
    <div className="lv-card">
      <div className="lv-card__head">
        <b>{bars.title}</b>
      </div>
      <ul className="lv-bars">
        {bars.rows.map(([label], i) => (
          <li key={label} title={`${label}: ${fmt(values[i], bars.unit)}`}>
            <span className="lv-bars__label">{label}</span>
            <span className="lv-bars__track">
              <span style={{ '--w': `${(values[i] / max) * 100}%`, '--i': i }} />
            </span>
            <span className="lv-bars__value">{fmt(values[i], bars.unit)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Mix({ mix }) {
  const total = mix.rows.reduce((s, r) => s + r[1], 0)
  const color = (row, i) => (mix.status ? STATUS_COLORS[row[2]] : SERIES_COLORS[i])
  return (
    <div className="lv-card">
      <div className="lv-card__head">
        <b>{mix.title}</b>
      </div>
      {mix.note && (
        <b className="lv-mix__note">
          {mix.note[0]}
          <small>{mix.note[1]}</small>
        </b>
      )}
      <div className="lv-mix">
        {mix.rows.map((row, i) => (
          <span
            key={row[0]}
            title={`${row[0]}: ${Math.round((row[1] / total) * 100)}%`}
            style={{ '--w': row[1] / total, background: color(row, i), '--i': i }}
          />
        ))}
      </div>
      <ul className="lv-mix__legend">
        {mix.rows.map((row, i) => (
          <li key={row[0]}>
            <i style={{ background: color(row, i) }} />
            {row[0]}
            <b>{Math.round((row[1] / total) * 100)}%</b>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ago = (ms) => {
  const s = Math.round(ms / 1000)
  if (s < 10) return 'just now'
  if (s < 60) return `${s}s ago`
  return `${Math.round(s / 60)}m ago`
}

function Feed({ items, now }) {
  return (
    <div className="lv-card">
      <div className="lv-card__head">
        <b>Latest activity</b>
      </div>
      <ul className="lv-feed">
        {items.map((it) => (
          <li key={it.key}>
            <img src={logoOf(it.system)} alt="" width="20" height="20" />
            <span className="lv-feed__text">
              {it.text}
              <small>{ago(now - it.at)}</small>
            </span>
            <span className="lv-feed__value">{it.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* --- Live dashboard ------------------------------------------------------ */

function initialState(d) {
  const now = Date.now()
  return {
    kpis: d.kpis.map((k) => k.value),
    current: [...d.chart.current],
    bars: d.bars.rows.map((r) => r[1]),
    feed: d.feed.slice(0, 4).map(([system, text, value], i) => ({
      key: `${d.id}-${i}`,
      system,
      text,
      value,
      at: now - [60, 240, 540, 900][i] * 1000,
    })),
    next: 4,
  }
}

function tick(d, s) {
  const r = Math.random
  // Values drift upward a little each tick, capped so a tab left open never runs away.
  const cap = (base, v) => Math.min(v, base * 1.04)
  const current = [...s.current]
  const today = d.chart.current[DAYS - 1]
  const ceiling = d.chart.unit === 'pct' ? Math.min(99, today + 2) : today * 1.15
  current[DAYS - 1] = Math.min(current[DAYS - 1] + d.chart.live * (0.4 + r()), ceiling)
  const pick = d.feed[s.next % d.feed.length]
  return {
    kpis: s.kpis.map((v, i) => cap(d.kpis[i].value, v + d.kpis[i].live * Math.round(r() * 2))),
    current,
    bars: s.bars.map((v, i) => (r() < 0.4 ? cap(d.bars.rows[i][1], v * (1 + r() * 0.006)) : v)),
    feed:
      r() < 0.55
        ? [{ key: `${d.id}-${s.next}`, system: pick[0], text: pick[1], value: pick[2], at: Date.now() }, ...s.feed].slice(0, 4)
        : s.feed,
    next: s.next + 1,
  }
}

export function LiveDashboard() {
  const [ref, inView] = useInView({ once: false, threshold: 0.1 })
  const [tab, setTab] = useState(0)
  const d = DASHBOARDS[tab]
  const [state, setState] = useState(() => initialState(d))
  const [now, setNow] = useState(Date.now)

  const pick = (i) => {
    setTab(i)
    setState(initialState(DASHBOARDS[i]))
  }

  useEffect(() => {
    if (!inView || reducedMotion()) return
    const id = window.setInterval(() => {
      if (document.hidden) return
      setState((s) => tick(d, s))
      setNow(Date.now())
    }, TICK_MS)
    return () => window.clearInterval(id)
  }, [inView, d])

  const onKey = (event) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = (tab + step + DASHBOARDS.length) % DASHBOARDS.length
    pick(next)
    document.getElementById(`lv-tab-${next}`)?.focus()
  }

  const clock = new Date(now).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  return (
    <div className="lv" ref={ref}>
      <div className="lv__bar">
        <span className="lv__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <div className="lv__tabs" role="tablist" aria-label="Sample dashboards" onKeyDown={onKey}>
          {DASHBOARDS.map((x, i) => (
            <button
              key={x.id}
              id={`lv-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === tab}
              aria-controls="lv-panel"
              tabIndex={i === tab ? 0 : -1}
              className={i === tab ? 'is-active' : ''}
              onClick={() => pick(i)}
            >
              {x.tab}
            </button>
          ))}
        </div>
        <span className="lv__live">
          <i aria-hidden="true" />
          Live · {clock}
        </span>
      </div>

      <div className="lv__body" id="lv-panel" role="tabpanel" aria-labelledby={`lv-tab-${tab}`} key={d.id}>
        <div className="lv-kpis">
          {d.kpis.map((k, i) => (
            <div key={k.label} className="lv-kpi" style={{ '--i': i }}>
              <span className="lv-kpi__label">{k.label}</span>
              <b className="lv-kpi__value">
                <Num value={state.kpis[i]} unit={k.unit} digits={k.digits} />
              </b>
              <span className={`lv-kpi__delta ${k.up ? 'is-up' : 'is-down'}`}>
                <span aria-hidden="true">{k.up ? '▲' : '▼'}</span> {k.delta}
              </span>
            </div>
          ))}
        </div>
        <div className="lv-grid-a">
          <LineChart chart={d.chart} current={state.current} />
          <Bars bars={d.bars} values={state.bars} />
        </div>
        <div className="lv-grid-b">
          <Mix mix={d.mix} />
          <Feed items={state.feed} now={now} />
        </div>
      </div>
    </div>
  )
}

/* --- Ask in plain words -------------------------------------------------- */

export function AskDemo({ questions }) {
  const [ref, inView] = useInView({ once: false, threshold: 0.3 })
  const [active, setActive] = useState(0)
  const [typed, setTyped] = useState(0)
  const [manual, setManual] = useState(false)
  const q = questions[active]
  const done = typed >= q.q.length
  const max = useMemo(() => Math.max(...q.bars.map((b) => b[1])), [q])

  // Type the question, show the answer, then move to the next question.
  useEffect(() => {
    if (!inView) return
    if (reducedMotion()) {
      setTyped(q.q.length)
      return
    }
    if (!done) {
      const id = window.setTimeout(() => setTyped((t) => t + 1), 38)
      return () => window.clearTimeout(id)
    }
    if (manual) return
    const id = window.setTimeout(() => {
      setActive((a) => (a + 1) % questions.length)
      setTyped(0)
    }, 6500)
    return () => window.clearTimeout(id)
  }, [inView, typed, done, manual, q, questions.length])

  const choose = (i) => {
    setManual(true)
    setActive(i)
    setTyped(reducedMotion() ? questions[i].q.length : 0)
  }

  return (
    <div className="lv-ask" ref={ref}>
      <div className="lv-ask__box">
        <span className="lv-ask__spark" aria-hidden="true">
          ✦
        </span>
        <span className="lv-ask__q">
          {q.q.slice(0, typed)}
          {!done && <i className="lv-ask__caret" aria-hidden="true" />}
        </span>
      </div>

      <div className={`lv-ask__answer ${done ? 'is-on' : ''}`} aria-live="polite">
        {done && (
          <>
            <p>{q.answer}</p>
            <div className="lv-card">
              <div className="lv-card__head">
                <b>{q.title}</b>
              </div>
              <ul className="lv-bars">
                {q.bars.map(([label, value], i) => (
                  <li key={label}>
                    <span className="lv-bars__label">{label}</span>
                    <span className="lv-bars__track">
                      <span style={{ '--w': `${(value / max) * 100}%`, '--i': i }} />
                    </span>
                    <span className="lv-bars__value">{fmt(value, q.unit)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="lv-ask__chips">
        <span>Try:</span>
        {questions.map((x, i) => (
          <button key={x.q} type="button" className={i === active ? 'is-active' : ''} onClick={() => choose(i)}>
            {x.q}
          </button>
        ))}
      </div>
    </div>
  )
}
