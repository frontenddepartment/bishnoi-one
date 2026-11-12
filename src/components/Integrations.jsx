import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import './Integrations.css'

// Platform features shared by all eight systems. Each icon sits in a circle
// coloured from the brand palette.
const ROW_ONE = [
  { name: 'Single sign-on', icon: 'shield', tone: 'orange' },
  { name: 'Role-based access', icon: 'people', tone: 'blue' },
  { name: 'Live dashboards', icon: 'chart', tone: 'yellow' },
  { name: 'Workflow automation', icon: 'automation', tone: 'red' },
  { name: 'Approval flows', icon: 'check', tone: 'green' },
  { name: 'Full audit trail', icon: 'board', tone: 'forest' },
  { name: 'Real-time sync', icon: 'bolt', tone: 'orange' },
  { name: 'Works on any device', icon: 'globe', tone: 'blue' },
]

const ROW_TWO = [
  { name: 'Multi-branch stock', icon: 'pipeline', tone: 'green' },
  { name: 'Payroll and leave', icon: 'people', tone: 'yellow' },
  { name: 'Invoices and bills', icon: 'board', tone: 'orange' },
  { name: 'Budgets and forecasts', icon: 'chart', tone: 'forest' },
  { name: 'Smart alerts', icon: 'sparkle', tone: 'red' },
  { name: 'Custom reports', icon: 'pipeline', tone: 'blue' },
  { name: 'Bank-grade security', icon: 'shield', tone: 'green' },
  { name: 'Help whenever you need it', icon: 'headset', tone: 'yellow' },
]

function Row({ items, reverse = false }) {
  const doubled = [...items, ...items]
  return (
    <div className={`marquee ${reverse ? 'marquee--reverse' : ''}`}>
      <div className="marquee__track">
        {doubled.map((item, index) => (
          <span key={`${item.name}-${index}`} className="int-chip" data-tone={item.tone}>
            <span className="int-chip__mark">
              <Icon name={item.icon} size={16} />
            </span>
            {item.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Integrations() {
  return (
    <section className="section section--tight integrations">
      <div className="shell">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">
            <Icon name="sparkle" size={14} /> Everything included
          </span>
          <h2>Every feature, in every system</h2>
          <p className="lead">
            One login gives every team the same tools: access control, automation, approvals and live
            reporting, working the same way across all eight systems.
          </p>
        </Reveal>
      </div>

      <div className="integrations__rows">
        <Row items={ROW_ONE} />
        <Row items={ROW_TWO} reverse />
      </div>

      <div className="shell integrations__foot">
        <a className="link-arrow" href="#showcase">
          Explore the eight systems <Icon name="arrowRight" size={16} />
        </a>
      </div>
    </section>
  )
}
