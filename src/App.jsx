import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import SystemsRail from './components/SystemsRail.jsx'
import DashboardStage from './components/DashboardStage.jsx'
import Statement from './components/Statement.jsx'
import PeoplePills from './components/PeoplePills.jsx'
import QuoteBand from './components/QuoteBand.jsx'
import WordsSplit from './components/WordsSplit.jsx'
import ProductShowcase from './components/ProductShowcase.jsx'
import Capabilities from './components/Capabilities.jsx'
import Spotlight from './components/Spotlight.jsx'
import StatsBand from './components/StatsBand.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Testimonials from './components/Testimonials.jsx'
import Integrations from './components/Integrations.jsx'
import Pricing from './components/Pricing.jsx'
import Faq from './components/Faq.jsx'
import CtaBand from './components/CtaBand.jsx'
import Footer from './components/Footer.jsx'

// Simple hash routing: "#/pricing" opens the Pricing page; any other hash
// (or none) shows the home page, where in-page anchors like #systems work.
const BASE_TITLE = document.title
const routeFromHash = () => (window.location.hash.startsWith('#/pricing') ? 'pricing' : 'home')

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
      <Capabilities />
      <Spotlight />
      <StatsBand />
      <HowItWorks />
      <Testimonials />
      <Integrations />
      <Faq />
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
    document.title = route === 'pricing' ? 'Pricing · Bishnoi One' : BASE_TITLE
  }, [route])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">{route === 'pricing' ? <PricingPage /> : <HomePage />}</main>
      <Footer />
    </>
  )
}
