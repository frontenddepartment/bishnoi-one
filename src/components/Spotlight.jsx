import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import './Spotlight.css'

/* Automation story: a plain-language rule, drawn as connected chips. */
function AutomationArt() {
  return (
    <div className="spot-art spot-art--auto">
      <span className="spot-art__rule">
        <em className="spot-art__when">When</em>
        <span className="spot-art__token">a deal is won</span>
        <em className="spot-art__then">then</em>
        <span className="spot-art__token spot-art__token--alt">create the onboarding plan</span>
      </span>

      <span className="spot-art__flow" aria-hidden="true">
        {['pipeline', 'automation', 'people'].map((icon, index) => (
          <b key={icon} style={{ '--i': index }}>
            <Icon name={icon} size={20} />
          </b>
        ))}
        <i />
      </span>

      <span className="spot-art__result">
        <Icon name="check" size={14} />
        Ran 1,284 times this month
      </span>
    </div>
  )
}

/* AI story: a draft writing itself. */
function AiArt() {
  return (
    <div className="spot-art spot-art--ai">
      <span className="spot-art__prompt">
        <Icon name="sparkle" size={16} />
        Summarise this account and draft the follow-up
      </span>
      <span className="spot-art__lines">
        {[96, 82, 90, 58].map((width, index) => (
          <b key={index} style={{ '--w': `${width}%`, '--i': index }} />
        ))}
      </span>
      <span className="spot-art__chips">
        {['Use draft', 'Shorten', 'Try again'].map((label, index) => (
          <em key={label} style={{ '--i': index }}>
            {label}
          </em>
        ))}
      </span>
    </div>
  )
}

const ROWS = [
  {
    id: 'automations',
    eyebrow: 'Automations',
    accent: 'blue',
    title: 'Describe the rule. Bishnoi One runs it forever.',
    body: 'No flowcharts to learn and no scripts to maintain. Write the rule the way you would say it out loud, and Bishnoi One handles it from then on, day and night.',
    points: [
      'Trigger on any change, date or form submission',
      'Chain as many actions as the job needs',
      'See every run, and undo any of them',
    ],
    art: <AutomationArt />,
  },
  {
    id: 'ai',
    eyebrow: 'Bishnoi One AI',
    accent: 'green',
    title: 'The first draft is already written.',
    body: 'Bishnoi One AI reads the context you already have — the thread, the account, the project — and offers a draft you can send, edit or throw away. It never acts without you.',
    points: [
      'Summarise a long thread in a sentence',
      'Draft replies in your own tone of voice',
      'Suggest the next step, with the reason why',
    ],
    art: <AiArt />,
    flip: true,
  },
]

export default function Spotlight() {
  return (
    <section className="section spotlight">
      <div className="shell">
        {ROWS.map((row) => (
          <div
            key={row.id}
            className={`spot-row ${row.flip ? 'spot-row--flip' : ''}`}
            data-accent={row.accent}
          >
            <Reveal className="spot-row__copy" direction={row.flip ? 'right' : 'left'}>
              <span className="eyebrow">{row.eyebrow}</span>
              <h2>{row.title}</h2>
              <p className="lead">{row.body}</p>
              <ul>
                {row.points.map((point) => (
                  <li key={point}>
                    <Icon name="check" size={15} />
                    {point}
                  </li>
                ))}
              </ul>
              <a className="link-arrow" href="#cta">
                Explore {row.eyebrow.toLowerCase()} <Icon name="arrowRight" size={16} />
              </a>
            </Reveal>

            <Reveal
              className="spot-row__art"
              direction={row.flip ? 'left' : 'right'}
              delay={100}
            >
              {row.art}
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  )
}
