/**
 * Original brand visual: two strands of orange and white particles twisting
 * around each other, joined by rungs, like a strand of DNA (one company,
 * many systems). Generated once from a fixed seed so it renders the same on
 * every visit. One period is drawn and repeated, so it can drift sideways
 * forever without a seam.
 */

const W = 1200
const H = 320
const WAVES = 2 // full twists per period

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
const LIGHTS = ['#ffffff', '#fdf3ec', '#e9eeeb']

function build() {
  const rand = rng(20261112)
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5
  const k = (Math.PI * 2 * WAVES) / W
  const amp = H * 0.3
  const mid = H / 2
  const dots = []

  for (let strand = 0; strand < 2; strand++) {
    const phase = strand * Math.PI
    for (let i = 0; i < 900; i++) {
      const x = rand() * W
      const y = mid + Math.sin(x * k + phase) * amp
      // Depth: cos tells us whether this part of the strand faces the viewer.
      const depth = (Math.cos(x * k + phase) + 1) / 2
      const spread = 10 + depth * 16
      const warm = rand() < 0.78
      const palette = warm ? ORANGES : LIGHTS
      dots.push({
        x: x + gauss() * 6,
        y: y + gauss() * spread,
        r: (0.9 + rand() * 2.6) * (0.65 + depth * 0.7),
        fill: palette[Math.floor(rand() * palette.length)],
        o: (0.45 + rand() * 0.55) * (0.55 + depth * 0.45),
      })
    }
  }

  // Rungs between the strands, mostly light particles.
  const rungs = WAVES * 7
  for (let j = 0; j < rungs; j++) {
    const x = ((j + 0.5) / rungs) * W
    const y1 = mid + Math.sin(x * k) * amp
    const y2 = mid + Math.sin(x * k + Math.PI) * amp
    for (let n = 0; n < 26; n++) {
      const t = rand()
      dots.push({
        x: x + gauss() * 4,
        y: y1 + (y2 - y1) * t,
        r: 0.8 + rand() * 1.6,
        fill: rand() < 0.7 ? LIGHTS[Math.floor(rand() * 2)] : ORANGES[2],
        o: 0.5 + rand() * 0.4,
      })
    }
  }

  // Large out-of-focus particles for depth of field.
  const bokeh = []
  for (let i = 0; i < 16; i++) {
    bokeh.push({
      x: rand() * W,
      y: mid + gauss() * H * 0.45,
      r: 10 + rand() * 34,
      fill: rand() < 0.75 ? ORANGES[Math.floor(rand() * 3)] : '#ffffff',
      o: 0.25 + rand() * 0.35,
    })
  }
  return { dots, bokeh }
}

const { dots, bokeh } = build()

export default function ParticleHelix({ className = '' }) {
  return (
    <div className={`helix ${className}`.trim()} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <filter id="helix-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <g id="helix-period">
            <g filter="url(#helix-blur)">
              {bokeh.map((b, i) => (
                <circle key={i} cx={b.x.toFixed(1)} cy={b.y.toFixed(1)} r={b.r.toFixed(1)} fill={b.fill} opacity={b.o.toFixed(2)} />
              ))}
            </g>
            {dots.map((d, i) => (
              <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.r.toFixed(2)} fill={d.fill} opacity={d.o.toFixed(2)} />
            ))}
          </g>
        </defs>
        <g className="helix__track">
          <use href="#helix-period" x="0" />
          <use href="#helix-period" x={W} />
        </g>
      </svg>
    </div>
  )
}
