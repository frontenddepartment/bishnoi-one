/**
 * Faceted "prism" background: a low-poly triangle mesh in brand orange and
 * neutral greys. Generated once from a fixed seed, so it renders identically
 * on every visit. Orange gathers in the top-right and bottom-left corners and
 * fades to grey towards the middle, where the hero copy sits.
 */

const W = 1440
const H = 820
const COLS = 16
const ROWS = 9

const GREYS = ['#f6f6f7', '#efeff1', '#e8e9ec', '#e0e1e5', '#d6d8dd', '#cbcdd3']
const ORANGES = ['#fff1e7', '#fde2cf', '#fbcaa8', '#f9ae7e', '#f68f4e', '#f36b21']

// Small deterministic PRNG (mulberry32) so the pattern never changes.
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

function buildFacets() {
  const rand = rng(20261111)
  const cw = W / COLS
  const ch = H / ROWS

  // Jittered grid points; edge points stay on the edge so the mesh covers fully.
  const pts = []
  for (let r = 0; r <= ROWS; r++) {
    const row = []
    for (let c = 0; c <= COLS; c++) {
      const jx = c === 0 || c === COLS ? 0 : (rand() - 0.5) * cw * 0.8
      const jy = r === 0 || r === ROWS ? 0 : (rand() - 0.5) * ch * 0.8
      row.push([c * cw + jx, r * ch + jy])
    }
    pts.push(row)
  }

  // How "orange" a point is: strongest in the top-right and bottom-left corners.
  const warmth = (x, y) => {
    const nx = x / W
    const ny = y / H
    const tr = Math.hypot(1 - nx, ny * 0.9)
    const bl = Math.hypot(nx * 1.1, 1 - ny)
    return Math.max(0, 1 - Math.min(tr, bl) / 0.75)
  }

  const facets = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const a = pts[r][c]
      const b = pts[r][c + 1]
      const d = pts[r + 1][c]
      const e = pts[r + 1][c + 1]
      // Alternate the diagonal for a less regular, more crystalline look.
      const tris = (r + c) % 2 === 0 ? [[a, b, e], [a, e, d]] : [[a, b, d], [b, e, d]]

      for (const tri of tris) {
        const cx = (tri[0][0] + tri[1][0] + tri[2][0]) / 3
        const cy = (tri[0][1] + tri[1][1] + tri[2][1]) / 3
        const w = warmth(cx, cy)
        // Light catches each facet differently: shade varies per triangle.
        const shade = Math.min(1, Math.max(0, w * 0.85 + (rand() - 0.5) * 0.45))
        const warm = rand() < w * 1.15
        const palette = warm ? ORANGES : GREYS
        const idx = Math.min(palette.length - 1, Math.floor(shade * palette.length))
        facets.push({
          points: tri.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' '),
          fill: palette[idx],
          delay: ((cx / W) * 0.9 + (cy / H) * 0.5).toFixed(2),
        })
      }
    }
  }
  return facets
}

const FACETS = buildFacets()

export default function PrismBackground({ className = '' }) {
  return (
    <div className={`prism ${className}`.trim()} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" focusable="false">
        {FACETS.map((f, i) => (
          <polygon
            key={i}
            points={f.points}
            fill={f.fill}
            stroke={f.fill}
            strokeWidth="0.6"
            style={{ '--d': `${f.delay}s` }}
          />
        ))}
      </svg>
    </div>
  )
}
