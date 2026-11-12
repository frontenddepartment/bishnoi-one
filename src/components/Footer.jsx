import OrbitLogo from './ui/OrbitLogo.jsx'
import Icon from './ui/Icon.jsx'
import { footerColumns, systems } from '../data/site.js'
import './Footer.css'

const SOCIALS = ['LinkedIn', 'X', 'YouTube', 'Instagram']
const LEGAL = ['Privacy', 'Terms', 'Cookies', 'Status', 'Accessibility']

// Small stroked line icons for the footer link columns (24px grid).
const GLYPHS = {
  rocket: 'M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3c1-4 4-8 9-9 0 0 1 6-6 12zM9 12l-4 1 2-4h3M12 15l-1 4 4-2v-3',
  briefcase: 'M4 7h16v13H4zM9 7V4h6v3M4 13h16',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1',
  trend: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  users: 'M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM17 11a3 3 0 0 0 0-6M21 20v-1a4 4 0 0 0-3-3.9',
  pen: 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4',
  help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.5v.7M12 17h.01',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  video: 'M3 6h12v12H3zM15 10l6-3v10l-6-3',
  chat: 'M4 5h16v11H9l-5 4z',
  code: 'M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v6M12 7h.01',
  news: 'M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M8 9h5M8 13h5',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
}

const Glyph = ({ name }) => (
  <svg className="footer__glyph" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={GLYPHS[name]} />
  </svg>
)

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__top">
        <div className="footer__brand">
          <OrbitLogo />
          <p>
            One platform for the work that runs your company. Built for teams who would rather get on
            with it than configure software.
          </p>
          <form className="footer__signup" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="footer-email">
              Work email
            </label>
            <input id="footer-email" type="email" placeholder="you@company.com" required />
            <button type="submit" className="btn btn--gradient btn--sm">
              Get started
            </button>
          </form>
          <p className="footer__signupnote">Free forever plan. No card needed.</p>
        </div>

        <nav className="footer__cols" aria-label="Footer">
          <div className="footer__col">
            <h4>Product</h4>
            <ul>
              {systems.map((system) => (
                <li key={system.id}>
                  <a href={system.href}>
                    <span className="footer__logo">
                      <img src={system.logo} alt="" width="18" height="18" decoding="async" loading="lazy" />
                    </span>
                    {system.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title} className="footer__col">
              <h4>{column.title}</h4>
              <ul>
                {column.links.map(([label, icon]) => (
                  <li key={label}>
                    <a href="#top">
                      <Glyph name={icon} />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="shell footer__badges">
        <span>
          <Icon name="shield" size={16} /> SOC 2 Type II
        </span>
        <span>
          <Icon name="globe" size={16} /> GDPR compliant
        </span>
        <span>
          <Icon name="check" size={16} /> 99.9% uptime SLA
        </span>
        <span>
          <Icon name="star" size={16} /> 4.8 / 5 average rating
        </span>
      </div>

      <div className="shell footer__bottom">
        <p>© {new Date().getFullYear()} Bishnoi One. All rights reserved.</p>
        <ul className="footer__legal">
          {LEGAL.map((item) => (
            <li key={item}>
              <a href="#top">{item}</a>
            </li>
          ))}
        </ul>
        <ul className="footer__social">
          {SOCIALS.map((item) => (
            <li key={item}>
              <a href="#top" aria-label={item}>
                {item.charAt(0)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
