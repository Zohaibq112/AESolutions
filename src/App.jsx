import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Preloader, Nav, Ticker } from './components/Chrome'
import Hero from './components/Hero'
import Capabilities from './components/Capabilities'
import { Manifesto, SystemLayers, Trust, FAQ, Footer } from './components/Sections'
import { ServicesPage, IndustriesPage, AboutPage, ContactPage, IndustriesTeaser, CTABand } from './components/Pages'

const PAGES = ['home', 'services', 'industries', 'about', 'contact']

/** Hash router: #services → page, #service-cloud → page + section, any other id → section on Home. */
function parseHash() {
  const h = decodeURIComponent(window.location.hash.slice(1))
  if (!h || h === 'top') return { page: 'home', section: null }
  if (PAGES.includes(h)) return { page: h, section: null }
  if (h.startsWith('service-')) return { page: 'services', section: h }
  if (h.startsWith('industry-')) return { page: 'industries', section: h }
  return { page: 'home', section: h }
}

function scrollToSection(id) {
  const el = id && document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top: y, behavior: 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' })
  }
}

function HomePage({ ready }) {
  return (
    <>
      <Hero ready={ready} />
      <Ticker />
      <Capabilities />
      <Manifesto />
      <SystemLayers />
      <Trust />
      <IndustriesTeaser />
      <FAQ />
      <CTABand />
    </>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  const [route, setRoute] = useState(parseHash)

  useEffect(() => {
    const onHash = () => {
      const next = parseHash()
      setRoute((prev) => {
        if (prev.page === next.page) requestAnimationFrame(() => scrollToSection(next.section))
        return next
      })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const page = route.page
  const titles = { home: 'AE Solutions', services: 'Services · AE Solutions', industries: 'Industries · AE Solutions', about: 'About · AE Solutions', contact: 'Contact · AE Solutions' }
  useEffect(() => { document.title = titles[page] }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="sheet-grid" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
      </div>
      <Preloader onDone={() => setReady(true)} />
      <Nav page={page} />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.main
          key={page}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, y: -16, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }}
          onAnimationComplete={(def) => { if (def && def.opacity === 1 && route.section) scrollToSection(route.section) }}
        >
          {page === 'home' && <HomePage ready={ready} />}
          {page === 'services' && <ServicesPage />}
          {page === 'industries' && <IndustriesPage />}
          {page === 'about' && <AboutPage />}
          {page === 'contact' && <ContactPage />}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
