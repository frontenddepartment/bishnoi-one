import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { systems } from '../../data/site.js'
import './HeroDemo.css'

/**
 * Hero "video": a camera tours three connected Bishnoi One screens on a loop.
 * It zooms into the Operations board while two teammates work, glides along
 * the connection to Inventory, then to Analytics, pulls back to show all
 * three linked, and starts again. Purely visual: not clickable, not
 * focusable, hidden from screen readers.
 */

const H = 280 // design height of the viewport
const GAP = 190 // space between screens (holds the connection lines)

const STATUS = {
  new: { label: 'New', tone: 'grey' },
  working: { label: 'Working on it', tone: 'orange' },
  review: { label: 'In review', tone: 'blue' },
  stuck: { label: 'Stuck', tone: 'red' },
  done: { label: 'Done', tone: 'green' },
}

const START_ROWS = [
  { id: 'r1', item: 'Order #5521 · St. Luke’s', sys: 'crm', owner: ['MR', '#f36b21'], status: 'working', pct: 60, due: 'Today' },
  { id: 'r2', item: 'Payroll · November', sys: 'people', owner: ['JS', '#173f2a'], status: 'review', pct: 80, due: 'Fri' },
  { id: 'r3', item: 'Restock Paracetamol 500mg', sys: 'inventory', owner: ['AL', '#5a6dff'], status: 'stuck', pct: 30, due: 'Tomorrow' },
  { id: 'r4', item: 'Q4 marketing budget', sys: 'finance', owner: ['KC', '#59ba43'], status: 'done', pct: 100, due: 'Mon' },
]

const NEW_TEXT = 'Invoice INV-5531 · Mercury Clinic'

const STOCK = [
  { id: 'p1', name: 'Paracetamol 500mg', units: 120, pct: 14, tone: 'red' },
  { id: 'p2', name: 'Amoxicillin 250mg', units: 860, pct: 46, tone: 'orange' },
  { id: 'p3', name: 'Vitamin C 1000mg', units: 2140, pct: 72, tone: 'green' },
  { id: 'p4', name: 'Insulin pens', units: 410, pct: 88, tone: 'green' },
]

const CHART = [30, 42, 38, 55, 49, 66, 61, 74, 70, 86]

const initial = () => ({
  rows: START_ROWS.map((r) => ({ ...r })),
  newRow: null,
  done: 7,
  ordered: false,
  chart: false,
  tip: false,
  kpi: { revenue: 4.61, orders: 1236 },
  toast: null,
  cam: { screen: 0, target: null, zoom: 1 },
  ana: { x: -80, y: 120, click: 0 },
  mark: { x: -80, y: 320, click: 0 },
})

const wait = (ms, signal) =>
  new Promise((res, rej) => {
    const t = setTimeout(res, ms)
    signal.addEventListener('abort', () => {
      clearTimeout(t)
      rej(new Error('stop'))
    })
  })

// Position of an element inside the track, ignoring CSS transforms.
function offsetIn(el, root) {
  let x = 0
  let y = 0
  let n = el
  while (n && n !== root) {
    x += n.offsetLeft
    y += n.offsetTop
    n = n.offsetParent
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight }
}

export default function HeroDemo({ className = '' }) {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const [box, setBox] = useState({ scale: 1, w: 1100 })
  const [s, setS] = useState(initial)
  const [still, setStill] = useState(false)

  // Fit: fixed design height, width fills the band.
  useLayoutEffect(() => {
    const el = wrapRef.current
    const fit = () => {
      const { width, height } = el.getBoundingClientRect()
      const scale = Math.min(Math.max(height / H, 0.5), 1.25)
      setBox({ scale, w: width / scale })
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const SW = Math.round(Math.min(box.w - 70, 1040)) // screen width
  const SH = 244 // screen height
  const narrow = SW < 760
  const screenX = (i) => i * (SW + GAP)

  // Camera: centre the viewport on a screen or element, at a zoom level.
  const camFocus = (() => {
    const { screen, target, zoom } = s.cam
    let fx = screenX(screen) + SW / 2
    let fy = SH / 2
    if (target === 'all') fx = screenX(1) + SW / 2
    else if (target && trackRef.current) {
      const el = trackRef.current.querySelector(`[data-t="${target}"]`)
      if (el) {
        const o = offsetIn(el, trackRef.current)
        fx = o.x + o.w / 2
        fy = o.y + o.h / 2
      }
    }
    // Keep zoomed-in views from showing past the screen's edges.
    if (zoom > 1) {
      const halfW = box.w / 2 / zoom
      const halfH = H / 2 / zoom
      const left = screenX(screen)
      fx = Math.min(Math.max(fx, left + halfW - 20), left + SW - halfW + 20)
      fy = Math.min(Math.max(fy, halfH - 18), SH - halfH + 18)
    }
    return { fx, fy, zoom }
  })()

  // The looping script.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true)
      return
    }
    const ctrl = new AbortController()
    const sig = ctrl.signal
    const set = (fn) => setS((p) => ({ ...p, ...fn(p) }))
    const at = (target) => {
      const root = trackRef.current
      const el = root?.querySelector(`[data-t="${target}"]`)
      if (!el) return null
      const o = offsetIn(el, root)
      return { x: o.x + o.w * 0.55, y: o.y + o.h * 0.6 }
    }
    const move = async (who, target, ms = 1000) => {
      const p = at(target)
      if (p) set((st) => ({ [who]: { ...st[who], ...p } }))
      await wait(ms, sig)
    }
    const click = async (who) => {
      set((st) => ({ [who]: { ...st[who], click: st[who].click + 1 } }))
      await wait(280, sig)
    }
    const cam = (screen, target = null, zoom = 1) => set(() => ({ cam: { screen, target, zoom } }))
    const row = (id, patch) => set((p) => ({ rows: p.rows.map((r) => (r.id === id ? { ...r, ...patch } : r)) }))
    const toast = (text) => set(() => ({ toast: { text, key: Math.random() } }))
    const tween = async (from, to, ms, apply) => {
      const steps = 16
      for (let i = 1; i <= steps; i++) {
        apply(from + ((to - from) * i) / steps)
        await wait(ms / steps, sig)
      }
    }

    const run = async () => {
      for (;;) {
        // --- Screen 1: Operations board --------------------------------
        setS(initial())
        await wait(700, sig)
        cam(0, 'col-status', 1.3)
        await wait(500, sig)
        await move('ana', 'status-r3', 1100)
        await click('ana')
        row('r3', { status: 'working', pct: 55 })
        await wait(700, sig)
        await move('ana', 'status-r2', 900)
        await click('ana')
        row('r2', { status: 'done', pct: 100 })
        set((p) => ({ done: p.done + 1 }))
        toast('Payslips released in People')
        await wait(900, sig)

        cam(0, null, 1)
        await move('mark', 'add', 1300)
        await click('mark')
        set(() => ({ newRow: { text: '', status: 'new', pct: 0 } }))
        cam(0, 'row-new', 1.3)
        await wait(450, sig)
        for (let i = 1; i <= NEW_TEXT.length; i++) {
          set((p) => ({ newRow: { ...p.newRow, text: NEW_TEXT.slice(0, i) } }))
          await wait(34, sig)
        }
        await move('ana', 'status-new', 900)
        await click('ana')
        set((p) => ({ newRow: { ...p.newRow, status: 'working', pct: 25 } }))
        toast('Restock request sent to Inventory')
        await wait(900, sig)

        // --- Glide along the connection to Inventory --------------------
        cam(0, null, 0.82)
        await wait(700, sig)
        cam(1, null, 0.82)
        await wait(1400, sig)
        cam(1, null, 1)
        await wait(600, sig)
        await move('ana', 'reorder-p1', 1100)
        cam(1, 'tile-p1', 1.35)
        await wait(500, sig)
        await click('ana')
        set(() => ({ ordered: true }))
        toast('Purchase order PO-2292 created')
        await wait(1500, sig)

        // --- Glide to Analytics -----------------------------------------
        cam(1, null, 0.82)
        await wait(700, sig)
        cam(2, null, 0.82)
        set(() => ({ chart: true }))
        await wait(1400, sig)
        cam(2, null, 1)
        await tween(4.61, 4.82, 900, (v) => set((p) => ({ kpi: { ...p.kpi, revenue: v } })))
        await tween(1236, 1284, 700, (v) => set((p) => ({ kpi: { ...p.kpi, orders: Math.round(v) } })))
        await move('mark', 'point', 1100)
        cam(2, 'point', 1.3)
        set(() => ({ tip: true }))
        await wait(1700, sig)

        // --- Pull back: all three screens, connected --------------------
        cam(1, 'all', Math.min(0.6, box.w / (SW * 3 + GAP * 2 + 60)))
        await wait(2600, sig)
        cam(0, null, 0.82)
        await wait(1300, sig)
      }
    }
    run().catch(() => {})
    return () => ctrl.abort()
    // The script restarts if the band is resized (screen sizes change).
  }, [SW, box.w])

  const byId = Object.fromEntries(systems.map((x) => [x.id, x]))
  const allRows = s.newRow
    ? [...s.rows, { id: 'new', item: s.newRow.text, sys: 'books', owner: ['AB', '#c4500f'], status: s.newRow.status, pct: s.newRow.pct, due: 'Next week', typing: true }]
    : s.rows

  const chartPath = CHART.map((v, i) => `${i ? 'L' : 'M'}${(i / (CHART.length - 1)) * 100},${100 - v}`).join(' ')

  const Cursor = ({ who, name, color }) => (
    <div className="demo__cursor" style={{ transform: `translate(${s[who].x}px, ${s[who].y}px)`, '--c': color }}>
      <span key={s[who].click} className={`demo__ripple ${s[who].click ? 'is-on' : ''}`} />
      <svg width="18" height="20" viewBox="0 0 18 20">
        <path d="M1 1l15 7.2-6.6 1.9-3.1 6.4z" fill={color} stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <span className="demo__name">{name}</span>
    </div>
  )

  const Side = ({ active }) => (
    <aside className="demo__side">
      <span className="demo__logo" />
      {systems.map((x) => (
        <span key={x.id} className={`demo__nav ${x.id === active ? 'is-on' : ''}`}>
          <img src={x.logo} alt="" width="18" height="18" />
        </span>
      ))}
    </aside>
  )

  const { fx, fy, zoom } = camFocus

  return (
    <div className={`helix demo ${className}`.trim()} ref={wrapRef} aria-hidden="true">
      <div className="demo__viewport" style={{ width: box.w, height: H, transform: `scale(${box.scale})` }}>
        <div
          ref={trackRef}
          className={`demo__track ${narrow ? 'is-narrow' : ''}`}
          style={{ transform: `translate(${box.w / 2}px, ${H / 2}px) scale(${zoom}) translate(${-fx}px, ${-fy}px)` }}
        >
          {/* Screen 1 — Operations board */}
          <div className="demo__window" style={{ left: screenX(0), width: SW, height: SH }}>
            <Side active="crm" />
            <div className="demo__main">
              <header className="demo__head">
                <div>
                  <b>Operations board</b>
                  <small>This week · 8 systems connected</small>
                </div>
                <div className="demo__head-right">
                  <span className="demo__count">
                    <b key={s.done}>{s.done}</b> done this week
                  </span>
                  <span className="demo__add" data-t="add">
                    + New item
                  </span>
                </div>
              </header>
              <div className="demo__table">
                <div className="demo__row demo__row--head">
                  <span>Item</span>
                  <span className="demo__col-owner">Owner</span>
                  <span data-t="col-status">Status</span>
                  <span className="demo__col-progress">Progress</span>
                  <span className="demo__col-due">Due</span>
                </div>
                {allRows.map((r) => (
                  <div key={r.id} className={`demo__row ${r.typing ? 'is-new' : ''}`} data-t={r.typing ? 'row-new' : undefined}>
                    <span className="demo__item">
                      <img src={byId[r.sys]?.logo} alt="" width="14" height="14" />
                      <span>
                        {r.item}
                        {r.typing && r.item.length < NEW_TEXT.length && <span className="demo__caret" />}
                      </span>
                    </span>
                    <span className="demo__col-owner">
                      <i className="demo__owner" style={{ background: r.owner[1] }}>
                        {r.owner[0]}
                      </i>
                    </span>
                    <span>
                      <span key={r.status} className={`demo__status demo__status--${STATUS[r.status].tone}`} data-t={`status-${r.id}`}>
                        {STATUS[r.status].label}
                      </span>
                    </span>
                    <span className="demo__col-progress">
                      <span className="demo__bar">
                        <span style={{ width: `${r.pct}%` }} />
                      </span>
                      <small>{r.pct}%</small>
                    </span>
                    <span className="demo__col-due">{r.due}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connection 1 → 2 */}
          <div className="demo__link" style={{ left: screenX(0) + SW, width: GAP, top: SH / 2 }}>
            <span className="demo__link-line" />
            <span className="demo__link-dot" />
            <span className="demo__link-dot" style={{ animationDelay: '-0.9s' }} />
            <span className="demo__link-pill">Orders → Stock</span>
          </div>

          {/* Screen 2 — Inventory */}
          <div className="demo__window" style={{ left: screenX(1), width: SW, height: SH }}>
            <Side active="inventory" />
            <div className="demo__main">
              <header className="demo__head">
                <div>
                  <b>Inventory · Manila DC</b>
                  <small>4 products need attention</small>
                </div>
                <span className="demo__chip">Stock value ₱18.6M</span>
              </header>
              <div className="demo__tiles">
                {STOCK.map((p) => {
                  const done = p.id === 'p1' && s.ordered
                  return (
                    <div key={p.id} className={`demo__tile ${done ? 'is-done' : ''}`} data-t={`tile-${p.id}`}>
                      <img src={byId.inventory?.logo} alt="" width="16" height="16" />
                      <b>{p.name}</b>
                      <small>{done ? 'Arriving Thursday' : `${p.units.toLocaleString()} units`}</small>
                      <span className={`demo__meter demo__meter--${done ? 'green' : p.tone}`}>
                        <span style={{ width: `${done ? 100 : p.pct}%` }} />
                      </span>
                      {p.id === 'p1' ? (
                        <span className={`demo__btn ${done ? 'is-done' : ''}`} data-t="reorder-p1">
                          {done ? '✓ Ordered' : 'Reorder'}
                        </span>
                      ) : (
                        <span className="demo__ok">In stock</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Connection 2 → 3 */}
          <div className="demo__link" style={{ left: screenX(1) + SW, width: GAP, top: SH / 2 }}>
            <span className="demo__link-line" />
            <span className="demo__link-dot" />
            <span className="demo__link-dot" style={{ animationDelay: '-0.9s' }} />
            <span className="demo__link-pill">Stock → Reports</span>
          </div>

          {/* Screen 3 — Analytics */}
          <div className="demo__window" style={{ left: screenX(2), width: SW, height: SH }}>
            <Side active="analytics" />
            <div className="demo__main">
              <header className="demo__head">
                <div>
                  <b>Analytics · This month</b>
                  <small>Live from all eight systems</small>
                </div>
                <span className="demo__chip demo__chip--live">● Live</span>
              </header>
              <div className="demo__kpis">
                <div className="demo__kpi">
                  <small>Revenue</small>
                  <b>₱{s.kpi.revenue.toFixed(2)}M</b>
                </div>
                <div className="demo__kpi">
                  <small>Orders</small>
                  <b>{s.kpi.orders.toLocaleString()}</b>
                </div>
                <div className="demo__kpi">
                  <small>Tasks done</small>
                  <b>{s.done}</b>
                </div>
              </div>
              <div className={`demo__chart ${s.chart ? 'is-on' : ''}`}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d={`${chartPath} L100,100 L0,100 Z`} className={`demo__area ${s.chart ? 'is-on' : ''}`} />
                  <path d={chartPath} className={`demo__line ${s.chart ? 'is-on' : ''}`} />
                </svg>
                <span className="demo__point" data-t="point" style={{ left: '77.7%', top: `${100 - CHART[7]}%` }} />
                <span className={`demo__tip ${s.tip ? 'is-on' : ''}`} style={{ left: '77.7%', top: `${100 - CHART[7]}%` }}>
                  <b>Week 8</b> Orders up 18%
                </span>
              </div>
            </div>
          </div>

          {!still && (
            <>
              <Cursor who="mark" name="Mark · Finance" color="#173f2a" />
              <Cursor who="ana" name="Ana · Operations" color="#f36b21" />
            </>
          )}
        </div>
      </div>

      {s.toast && (
        <div key={s.toast.key} className="demo__toast">
          <span className="demo__toast-dot" /> {s.toast.text}
        </div>
      )}
    </div>
  )
}
