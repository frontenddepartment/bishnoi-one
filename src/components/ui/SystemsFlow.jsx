import { useEffect, useState } from 'react'
import { systems } from '../../data/site.js'

/**
 * Hero band: the six systems as nodes along one connected line, with
 * particles of data flowing between them in both directions, so the visual
 * says "six systems, one record". Static dust and soft glows are generated
 * from a fixed seed so the band looks the same on every visit.
 */

const W = 1000
const H = 200
const MID = H / 2

function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const ORANGES = ['#f36b21', '#f5843f', '#f9a03f', '#e85d12', '#fbb27a']

// Node positions: evenly spaced, alternating slightly above and below centre.
const NODES = systems.slice(0, 6).map((s, i, arr) => ({
  ...s,
  x: 90 + (i * (W - 180)) / (arr.length - 1),
  y: MID + (i % 2 === 0 ? -18 : 18),
}))

// Smooth curve through the nodes, extended off both edges of the band.
function curve(points, bend) {
  const pts = [{ x: -60, y: MID }, ...points, { x: W + 60, y: MID }]
  let d = `M${pts[0].x},${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]
    const b = pts[i]
    const cx = (a.x + b.x) / 2
    d += ` C${cx},${a.y + bend} ${cx},${b.y - bend} ${b.x},${b.y}`
  }
  return d
}

const MAIN = curve(NODES, 0)
const UPPER = curve(NODES.map((n) => ({ x: n.x, y: n.y - 12 })), -20)
const LOWER = curve(NODES.map((n) => ({ x: n.x, y: n.y + 12 })), 20)

// Short events that pop up beside some nodes.
const EVENTS = [
  { node: 0, text: '+128 units received' },
  { node: 1, text: 'Payroll approved' },
  { node: 2, text: 'New deal · ₱240k' },
  { node: 4, text: 'Invoice matched' },
]

function build() {
  const rand = rng(20261112)
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5
  const dust = []
  // Particles scattered along the connections between neighbouring nodes.
  for (let i = 0; i < NODES.length - 1; i++) {
    const a = NODES[i]
    const b = NODES[i + 1]
    for (let n = 0; n < 150; n++) {
      const t = rand()
      const e = t * t * (3 - 2 * t) // ease, so dots follow the S-curve
      dust.push({
        x: a.x + (b.x - a.x) * t + gauss() * 5,
        y: a.y + (b.y - a.y) * e + gauss() * 12,
        r: 0.7 + rand() * 2.1,
        fill: rand() < 0.8 ? ORANGES[Math.floor(rand() * ORANGES.length)] : '#ffffff',
        o: 0.25 + rand() * 0.55,
      })
    }
  }
  const glow = []
  for (let i = 0; i < 12; i++) {
    glow.push({
      x: rand() * W,
      y: MID + gauss() * H * 0.35,
      r: 14 + rand() * 34,
      fill: ORANGES[Math.floor(rand() * 3)],
      o: 0.18 + rand() * 0.25,
    })
  }
  return { dust, glow }
}

const { dust, glow } = build()

// Moving data particles: [path id, duration in s, count, radius, colour].
const STREAMS = [
  ['flow-main', 9, 14, 3.4, '#f36b21'],
  ['flow-upper', 12, 10, 2.4, '#f9a03f'],
  ['flow-lower', 11, 10, 2.4, '#e85d12'],
]

export default function SystemsFlow({ className = '' }) {
  const [still, setStill] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setStill(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <div className={`helix flow ${className}`.trim()} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <filter id="flow-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id="flow-shadow" x="-40%" y="-40%" width="180%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#7a2e07" floodOpacity="0.16" />
          </filter>
          <path id="flow-main" d={MAIN} />
          <path id="flow-upper" d={UPPER} />
          <path id="flow-lower" d={LOWER} />
        </defs>

        <g filter="url(#flow-blur)">
          {glow.map((g, i) => (
            <circle key={i} cx={g.x.toFixed(1)} cy={g.y.toFixed(1)} r={g.r.toFixed(1)} fill={g.fill} opacity={g.o.toFixed(2)} />
          ))}
        </g>

        <use href="#flow-upper" className="flow__line flow__line--soft" />
        <use href="#flow-lower" className="flow__line flow__line--soft" />
        <use href="#flow-main" className="flow__line" />

        {dust.map((d, i) => (
          <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.r.toFixed(2)} fill={d.fill} opacity={d.o.toFixed(2)} />
        ))}

        {!still &&
          STREAMS.map(([id, dur, count, r, fill], s) =>
            Array.from({ length: count }, (_, k) => (
              <circle key={`${id}-${k}`} r={r} fill={fill} opacity="0.9">
                <animateMotion
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  begin={`-${((k / count) * dur).toFixed(2)}s`}
                  keyPoints={s === 1 ? '1;0' : '0;1'}
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href={`#${id}`} />
                </animateMotion>
              </circle>
            )),
          )}

        {NODES.map((n, i) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            <g className="flow__node" style={{ '--i': i }}>
            <circle r="38" className="flow__pulse" />
            <rect x="-28" y="-28" width="56" height="56" rx="16" fill="#fff" filter="url(#flow-shadow)" />
            <image href={n.logo} x="-17" y="-17" width="34" height="34" />
            <title>{n.name}</title>
            </g>
          </g>
        ))}

        {EVENTS.map((e, i) => {
          const n = NODES[e.node]
          const w = e.text.length * 6.6 + 30
          const x = Math.min(Math.max(n.x + 36, 8), W - w - 8)
          const y = e.node % 2 === 0 ? n.y - 46 : n.y + 20
          return (
            <g key={e.text} className="flow__chip" style={{ '--i': i }} transform={`translate(${x.toFixed(0)} ${y})`}>
              <rect width={w} height="26" rx="13" fill="#fff" filter="url(#flow-shadow)" />
              <circle cx="14" cy="13" r="4" fill="#59ba43" />
              <text x="24" y="17" className="flow__chip-text">
                {e.text}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
