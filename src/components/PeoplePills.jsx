import { useInView } from '../hooks/useInView.js'
import './PeoplePills.css'

/* A row of tall rounded pills of different heights: brand colour blocks,
   short messages and two team members photographed against office scenes.
   The pills rise into place one after another when the row scrolls in. */

const Mark = ({ size = 'md' }) => (
  <span className={`pp__mark pp__mark--${size}`}>
    <img src="/bishnoi-logo.png" alt="" width="40" height="40" />
  </span>
)

export default function PeoplePills() {
  const [ref, inView] = useInView({ threshold: 0.2 })

  return (
    <section className={`pp ${inView ? 'is-in' : ''}`} ref={ref} aria-labelledby="pp-title">
      <div className="shell shell--wide">
        <h2 id="pp-title" className="pp__title">
          Eight systems run the day.
          <span>Your people make the calls.</span>
        </h2>
      </div>

      <ul className="pp__row">
        <li className="pp__pill pp__pill--orange" style={{ '--h': 0.6, '--i': 0 }}>
          <Mark size="lg" />
          <span className="pp__foot">Bishnoi One</span>
        </li>

        <li className="pp__pill pp__pill--photo" style={{ '--h': 0.72, '--i': 1 }}>
          <img className="pp__bg" src="/office.jpg" alt="" style={{ objectPosition: '82% 50%' }} />
          <img className="pp__person" src="/maamdebbie.png" alt="Debbie, Bishnoi One team" />
        </li>

        <li className="pp__pill pp__pill--dark" style={{ '--h': 0.86, '--i': 2 }}>
          <p>Every department on one record.</p>
        </li>

        <li className="pp__pill pp__pill--rings" style={{ '--h': 1, '--i': 3 }}>
          <span className="pp__rings" aria-hidden="true" />
          <span className="pp__brand">
            <Mark size="sm" /> Bishnoi One
          </span>
        </li>

        <li className="pp__pill pp__pill--photo" style={{ '--h': 0.86, '--i': 4 }}>
          <img className="pp__bg" src="/office2.jpg" alt="" style={{ objectPosition: '60% 50%' }} />
          <img className="pp__person pp__person--sumit" src="/sirsumit.png" alt="Sumit, Bishnoi One team" />
        </li>

        <li className="pp__pill pp__pill--blue" style={{ '--h': 0.72, '--i': 5 }}>
          <p>Approve exceptions as they happen.</p>
          <span className="pp__chip">Needs you</span>
        </li>

        <li className="pp__pill pp__pill--white" style={{ '--h': 0.86, '--i': 6 }}>
          <p>Built so every team works from the same numbers.</p>
          <a className="pp__btn" href="#systems">
            Explore systems
          </a>
        </li>
      </ul>
    </section>
  )
}
