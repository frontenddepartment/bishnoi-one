import { useEffect, useRef, useState } from 'react'
import OrbitLogo from './ui/OrbitLogo.jsx'
import Icon from './ui/Icon.jsx'
import { useScrollPosition } from '../hooks/useScrollPosition.js'
import { systems, platformMenu, solutionsMenu, resourcesMenu } from '../data/site.js'
import './Navbar.css'

const MENUS = [
  { id: 'products', label: 'Products' },
  { id: 'platform', label: 'Platform' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'resources', label: 'Resources' },
]

function ProductsPanel() {
  return (
    <div className="mega mega--products">
      <div className="mega__main">
        <p className="mega__label">The Bishnoi One suite</p>
        <div className="mega__grid">
          {systems.map((system) => (
            <a key={system.id} className="mega-card" href={system.href}>
              <span className="mega-card__icon has-logo">
                <img src={system.logo} alt="" width="28" height="28" className="product-logo" decoding="async" />
              </span>
              <span className="mega-card__text">
                <span className="mega-card__title">
                  {system.name}
                  <Icon name="arrowRight" size={16} />
                </span>
                <span className="mega-card__blurb">{system.blurb}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
      <aside className="mega__aside">
        <img
          className="mega__promo"
          src="/addone-menu.jpg"
          alt="Work smarter with a powerful system: automate workflows, manage your data, boost productivity and grow with confidence"
          width="600"
          height="800"
          decoding="async"
        />
        <a className="link-arrow" href="#/pricing">
          Compare plans <Icon name="arrowRight" size={16} />
        </a>
      </aside>
    </div>
  )
}

function PlatformPanel() {
  return (
    <div className="mega mega--platform">
      <div className="mega__grid mega__grid--three">
        {platformMenu.map((item) => (
          <a key={item.title} className="mega-card mega-card--plain" href="#platform">
            <span
              className="mega-card__icon mega-card__icon--grad"
              style={{ '--g1': item.grad[0], '--g2': item.grad[1] }}
            >
              <Icon name={item.icon} size={20} />
            </span>
            <span className="mega-card__text">
              <span className="mega-card__title">{item.title}</span>
              <span className="mega-card__blurb">{item.blurb}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

function ListPanel({ items, footer }) {
  return (
    <div className="mega mega--list">
      <div className="mega__grid mega__grid--three">
        {items.map((item) => (
          <a key={item.title} className="mega-link" href="#platform">
            <span className="mega-card__title">{item.title}</span>
            <span className="mega-card__blurb">{item.blurb}</span>
          </a>
        ))}
      </div>
      {footer && <div className="mega__footer">{footer}</div>}
    </div>
  )
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState(null)
  const closeTimer = useRef(null)
  const scrollY = useScrollPosition()
  const isScrolled = scrollY > 12

  useEffect(() => {
    document.body.classList.toggle('is-locked', mobileOpen)
    return () => document.body.classList.remove('is-locked')
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return
      setOpenMenu(null)
      setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* Hover intent: a short grace period stops the panel flickering shut when the
     pointer crosses the gap between the trigger and the panel. */
  const openWithIntent = (id) => {
    window.clearTimeout(closeTimer.current)
    setOpenMenu(id)
  }

  const closeWithIntent = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140)
  }

  const renderPanel = (id) => {
    if (id === 'products') return <ProductsPanel />
    if (id === 'platform') return <PlatformPanel />
    if (id === 'solutions') return <ListPanel items={solutionsMenu} />
    if (id === 'resources')
      return (
        <ListPanel
          items={resourcesMenu}
          footer={
            <>
              <span>Not sure where to start?</span>
              <a className="link-arrow" href="#how">
                Take the 3 minute tour <Icon name="arrowRight" size={16} />
              </a>
            </>
          }
        />
      )
    return null
  }

  return (
    <>
      <header className={`nav ${isScrolled ? 'is-scrolled' : ''}`} onMouseLeave={closeWithIntent}>
        <div className="nav__inner shell shell--wide">
          <a className="nav__brand" href="#top" aria-label="Bishnoi One home">
            <OrbitLogo variant="lockup" />
          </a>

          <nav className="nav__links" aria-label="Main">
            {MENUS.map((menu) => (
              <div
                key={menu.id}
                className="nav__item"
                onMouseEnter={() => openWithIntent(menu.id)}
                onFocus={() => openWithIntent(menu.id)}
              >
                <button
                  type="button"
                  className={`nav__trigger ${openMenu === menu.id ? 'is-open' : ''}`}
                  aria-expanded={openMenu === menu.id}
                  onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
                >
                  {menu.label}
                  <Icon name="chevronDown" size={16} />
                </button>
              </div>
            ))}
            <a className="nav__trigger" href="#/pricing">
              Pricing
            </a>
          </nav>

          <div className="nav__actions">
            <a className="nav__login" href="#top">
              Log in
            </a>
            <a className="btn btn--gradient btn--sm nav__cta" href="#cta">
              Get started free
            </a>
            <button
              type="button"
              className="nav__burger"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} size={24} />
            </button>
          </div>
        </div>

        <div
          className={`nav__panel ${openMenu ? 'is-open' : ''}`}
          onMouseEnter={() => openWithIntent(openMenu)}
          onMouseLeave={closeWithIntent}
        >
          <div className="nav__panel-inner shell">{renderPanel(openMenu)}</div>
        </div>
      </header>

      {/* --- Mobile drawer --- */}
      {/* `inert` keeps the off-canvas links out of the tab order while hidden. */}
      <div
        className={`drawer ${mobileOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileOpen}
        inert={mobileOpen ? undefined : ''}
      >
        <div className="drawer__scroll">
          <nav className="drawer__nav" aria-label="Mobile">
            {MENUS.map((menu) => {
              const items =
                menu.id === 'products'
                  ? systems.map((s) => ({ title: s.name, blurb: s.blurb }))
                  : menu.id === 'platform'
                    ? platformMenu
                    : menu.id === 'solutions'
                      ? solutionsMenu
                      : resourcesMenu
              const open = mobileSection === menu.id
              return (
                <div key={menu.id} className={`drawer__group ${open ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="drawer__trigger"
                    aria-expanded={open}
                    onClick={() => setMobileSection(open ? null : menu.id)}
                  >
                    {menu.label}
                    <Icon name="chevronDown" size={20} />
                  </button>
                  <div className="drawer__sub">
                    {/* Single wrapper: the 0fr-to-1fr collapse only sizes one
                        grid row, so the links must share it. */}
                    <div className="drawer__sub-inner">
                      {items.map((item) => (
                        <a key={item.title} href="#platform" onClick={() => setMobileOpen(false)}>
                          <strong>{item.title}</strong>
                          <span>{item.blurb}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
            <a className="drawer__trigger" href="#/pricing" onClick={() => setMobileOpen(false)}>
              Pricing
            </a>
          </nav>

          <div className="drawer__actions">
            <a className="btn btn--gradient btn--block btn--lg" href="#cta" onClick={() => setMobileOpen(false)}>
              Get started free
            </a>
            <a className="btn btn--ghost btn--block btn--lg" href="#top" onClick={() => setMobileOpen(false)}>
              Log in
            </a>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`drawer__scrim ${mobileOpen ? 'is-open' : ''}`}
        aria-label="Close menu"
        inert={mobileOpen ? undefined : ''}
        onClick={() => setMobileOpen(false)}
      />
    </>
  )
}
