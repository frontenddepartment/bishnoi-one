import { useEffect, useRef, useState } from 'react'
import { systems } from '../data/site.js'
import './Statement.css'

/* A large statement sentence with small visual "pills" set inline between
   the words. As the reader scrolls through, the words darken one by one. */

const LogoStack = () => (
  <span className="stm-pill stm-pill--logos">
    {systems.slice(0, 4).map((s, i) => (
      <img key={s.id} src={s.logo} alt="" width="34" height="34" style={{ '--i': i }} />
    ))}
  </span>
)

const Tag = () => <span className="stm-pill stm-pill--tag">only the exceptions</span>

const Target = () => (
  <span className="stm-pill stm-pill--target">
    <span className="stm-pill__ring" />
    <span className="stm-pill__ring" />
    <span className="stm-pill__ring" />
    <span className="stm-pill__core" />
  </span>
)

const Bars = () => (
  <span className="stm-pill stm-pill--bars">
    <span />
    <span />
    <span />
  </span>
)

// Text pieces and inline pills, in reading order.
const PARTS = [
  'Bishnoi',
  'One',
  <LogoStack key="logos" />,
  'keeps',
  'every',
  'department',
  'on',
  'one',
  'record,',
  'sends',
  <Tag key="tag" />,
  'to',
  'the',
  'right',
  'person',
  <Target key="target" />,
  'and',
  'keeps',
  'the',
  'numbers',
  <Bars key="bars" />,
  'behind',
  'every',
  'decision.',
]

const WORD_COUNT = PARTS.filter((p) => typeof p === 'string').length

export default function Statement() {
  const ref = useRef(null)
  const [lit, setLit] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLit(WORD_COUNT)
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the text enters the lower part of the screen, 1 by the middle.
      const p = (vh * 0.85 - r.top) / (vh * 0.85 - vh * 0.3 + r.height * 0.5)
      setLit(Math.round(Math.min(Math.max(p, 0), 1) * WORD_COUNT))
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
  }, [])

  let w = 0
  return (
    <section className="statement" aria-label="What Bishnoi One does">
      <div className="shell shell--wide">
        <p className="statement__text" ref={ref}>
          {PARTS.map((part, i) => {
            if (typeof part !== 'string') return <span key={i}>{part} </span>
            const on = w++ < lit
            return (
              <span key={i}>
                <span className={`statement__word ${on ? 'is-on' : ''}`}>{part}</span>{' '}
              </span>
            )
          })}
        </p>
      </div>
    </section>
  )
}
