import { useInView } from '../hooks/useInView.js'
import './WorkflowStages.css'

/* "Where workflows shape growth": oversized staggered headline over four
   workflow stages that step down the page, each with its tasks as pills.
   tone: one highlighted pill per stage — blue, yellow, red, green. */
const STAGES = [
  {
    label: 'Connect',
    items: [
      { text: 'link your business systems' },
      { text: 'import existing spreadsheets' },
      { text: 'map who owns each process', tone: 'blue' },
      { text: 'invite team & clients' },
      { text: 'set access levels' },
    ],
  },
  {
    label: 'Approve',
    items: [
      { text: 'route incoming requests' },
      { text: 'manager sign-off rules' },
      { text: 'flag exceptions instantly' },
      { text: 'approved in one tap', tone: 'yellow' },
    ],
  },
  {
    label: 'Automate',
    items: [
      { text: 'trigger follow-up tasks & alerts' },
      { text: 'sync records across systems', tone: 'red' },
      { text: 'auto-assign to the right owner' },
      { text: 'full audit trail + timestamps' },
    ],
  },
  {
    label: 'Grow',
    items: [
      { text: 'live dashboards', tone: 'green' },
      { text: 'weekly performance & team feedback' },
    ],
  },
]

export default function WorkflowStages() {
  const [ref, inView] = useInView({ threshold: 0.15 })

  return (
    <section className={`wfs ${inView ? 'is-in' : ''}`} ref={ref} aria-labelledby="wfs-title">
      <div className="wfs__glow wfs__glow--a" aria-hidden="true" />
      <div className="wfs__glow wfs__glow--b" aria-hidden="true" />
      <div className="wfs__glow wfs__glow--c" aria-hidden="true" />

      <div className="shell wfs__inner">
        <h2 className="wfs__title" id="wfs-title">
          <span className="wfs__line wfs__line--1" style={{ '--i': 0 }}>Where</span>
          <span className="wfs__line wfs__line--2" style={{ '--i': 1 }}>Workflows</span>
          <span className="wfs__line wfs__line--3" style={{ '--i': 2 }}>
            <span>Shape</span>
            <span className="wfs__accent">Growth</span>
          </span>
        </h2>

        <ol className="wfs__stages">
          {STAGES.map((stage, i) => (
            <li className="wfs__stage" key={stage.label} style={{ '--i': i }}>
              <h3 className="wfs__label">
                <svg className="wfs__marker" viewBox="0 0 36 14" aria-hidden="true">
                  <rect x="0.75" y="0.75" width="34.5" height="12.5" rx="6.25" />
                  <path d="M8 7h19M23.5 4l3.5 3-3.5 3" />
                </svg>
                {stage.label}
              </h3>
              <ul className="wfs__items">
                {stage.items.map((item, j) => (
                  <li
                    key={item.text}
                    className={`wfs__pill ${item.tone ? `wfs__pill--${item.tone}` : ''}`}
                    style={{ '--j': j }}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
