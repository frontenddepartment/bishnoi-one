import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import SystemsRail from './components/SystemsRail.jsx'
import DashboardStage from './components/DashboardStage.jsx'
import Statement from './components/Statement.jsx'
import PeoplePills from './components/PeoplePills.jsx'
import QuoteBand from './components/QuoteBand.jsx'
import WordsSplit from './components/WordsSplit.jsx'
import WorkflowStages from './components/WorkflowStages.jsx'
import ApproveSmarter from './components/ApproveSmarter.jsx'
import ProductShowcase from './components/ProductShowcase.jsx'
import Capabilities from './components/Capabilities.jsx'
import StatsBand from './components/StatsBand.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Integrations from './components/Integrations.jsx'
import Pricing from './components/Pricing.jsx'
import CtaBand from './components/CtaBand.jsx'
import Footer from './components/Footer.jsx'
import PlatformPage, { platformTitle } from './components/PlatformPage.jsx'
import AboutPage from './components/AboutPage.jsx'
import SystemPage, { systemTitle } from './components/SystemPage.jsx'

// Simple hash routing:
//   #/pricing           Pricing page
//   #/about             About page
//   #/platform          Platform overview
//   #/platform/<slug>   one Platform page (automations, dashboards, ai, ...)
//   #/systems/<id>      one system page (crm, books, desk, ...)
// Any other hash (or none) shows the home page, where in-page anchors like
// #systems work. Routes are plain strings so they compare cheaply.
const BASE_TITLE = document.title
const routeFromHash = () => {
  const h = window.location.hash
  if (h.startsWith('#/pricing')) return 'pricing'
  if (h.startsWith('#/about')) return 'about'
  if (h.startsWith('#/platform')) {
    const slug = h.slice('#/platform'.length).replace(/^\//, '').split(/[/?#]/)[0]
    return slug ? `platform/${slug}` : 'platform'
  }
  if (h.startsWith('#/systems/')) {
    const id = h.slice('#/systems/'.length).split(/[/?#]/)[0]
    if (id) return `systems/${id}`
  }
  return 'home'
}
const systemId = (route) => (route.startsWith('systems/') ? route.slice('systems/'.length) : null)
const platformSlug = (route) => (route.startsWith('platform/') ? route.slice('platform/'.length) : null)

function HomePage() {
  return (
    <>
      <Hero />
      <SystemsRail />
      <ProductShowcase />
      <DashboardStage />
      <Statement />
      <PeoplePills />
      <QuoteBand />
      <WordsSplit />
      <WorkflowStages />
      <ApproveSmarter />
      <Capabilities />
      <StatsBand />
      <HowItWorks />
      <Integrations />
      <CtaBand />
    </>
  )
}

function PricingPage() {
  return (
    <div className="page page--pricing">
      <Pricing />
      <CtaBand />
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState(routeFromHash)

  useEffect(() => {
    const onHash = () => {
      const next = routeFromHash()
      setRoute((prev) => {
        // Switching pages starts at the top; in-page anchors keep their own scrolling.
        if (prev !== next) window.scrollTo({ top: 0, behavior: 'instant' })
        return next
      })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Arriving on the home page with an anchor (e.g. from the Pricing page):
  // scroll to it once the home sections have rendered.
  useEffect(() => {
    if (route !== 'home') return
    const id = window.location.hash.slice(1)
    if (!id || id.startsWith('/')) return
    const el = document.getElementById(id)
    if (el) requestAnimationFrame(() => el.scrollIntoView())
  }, [route])

  useEffect(() => {
    document.title =
      route === 'pricing'
        ? 'Pricing · Bishnoi One'
        : route === 'about'
          ? 'About · Bishnoi One'
          : route.startsWith('platform')
          ? platformTitle(platformSlug(route))
          : route.startsWith('systems/')
          ? systemTitle(systemId(route))
          : BASE_TITLE
  }, [route])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        {route === 'pricing' ? (
          <PricingPage />
        ) : route === 'about' ? (
          <AboutPage />
        ) : route.startsWith('platform') ? (
          <PlatformPage key={route} slug={platformSlug(route)} />
        ) : route.startsWith('systems/') ? (
          <SystemPage key={route} id={systemId(route)} />
        ) : (
          <HomePage />
        )}
      </main>
      <Footer />
    </>
  )
}
