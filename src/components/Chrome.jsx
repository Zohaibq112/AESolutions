import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import { BrandLogo, MagneticButton, EASE } from './primitives'

const LINKS = [
  ['Home', '#home', 'home'],
  ['Services', '#services', 'services'],
  ['Industries', '#industries', 'industries'],
  ['About', '#about', 'about'],
  ['Contact', '#contact', 'contact'],
]
const SERVICE_MENU = [
  ['IT Advisory', 'Architecture, governance, roadmaps', 'advisory'],
  ['Data Analytics & Integration', 'Pipelines, integration, dashboards', 'data'],
  ['Cloud & ERP', 'Migration, ERP, AWS · Azure · GCP', 'cloud'],
  ['Managed IT', 'Monitoring, patching, helpdesk', 'managed'],
  ['Compliance & Security', 'Risk, hardening, audit readiness', 'security'],
]

export function Preloader({ onDone }) {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(true)
  useEffect(() => {
    if (reduce) { setShow(false); onDone(); return }
    const t = setTimeout(() => setShow(false), 1100)
    return () => clearTimeout(t)
  }, [reduce]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          aria-hidden="true"
        >
          <motion.div className="preloader__logo" initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: EASE }}>
            <BrandLogo idSuffix="pre" />
          </motion.div>
          <div className="preloader__track"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Nav({ page = 'home' }) {
  const { scrollYProgress, scrollY } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const [scrolled, setScrolled] = useState(false)
  const [hover, setHover] = useState(null)
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 24)), [scrollY])
  useEffect(() => { setMenu(false); setOpen(false) }, [page])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        className={`nav ${scrolled || open ? 'is-scrolled' : ''}`}
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      >
        <div className="wrap nav__inner">
          <a href="#home" className="brand" aria-label="AE Solutions, back to top">
            <BrandLogo idSuffix="nav" />
          </a>
          <nav className="nav__links" aria-label="Primary" onPointerLeave={() => { setHover(null); setMenu(false) }}>
            {LINKS.slice(0, 4).map(([l, h, k]) => (
              <div key={h} className="nav__item" onPointerEnter={() => { setHover(h); setMenu(k === 'services') }}>
                <a href={h} className={`nav__link ${page === k ? 'is-current' : ''}`} aria-current={page === k ? 'page' : undefined}
                  onFocus={() => setMenu(k === 'services')} aria-haspopup={k === 'services' ? 'true' : undefined} aria-expanded={k === 'services' ? menu : undefined}>
                  {hover === h && <motion.span layoutId="navhover" className="hoverbg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  {l}
                  {k === 'services' && <svg className="nav__chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>}
                  {page === k && <motion.span layoutId="navcurrent" className="nav__dot" />}
                </a>
                {k === 'services' && (
                  <AnimatePresence>
                    {menu && (
                      <motion.div className="mega" initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ duration: 0.22, ease: EASE }}>
                        {SERVICE_MENU.map(([t, d, key], i) => (
                          <a key={key} href={`#service-${key}`} className="mega__item" onClick={() => setMenu(false)}>
                            <span className="mega__n">0{i + 1}</span>
                            <span><b>{t}</b><small>{d}</small></span>
                          </a>
                        ))}
                        <a href="#services" className="mega__all" onClick={() => setMenu(false)}>View all services →</a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>
          
          <MagneticButton href="#contact">Book a consultation</MagneticButton>
          <button className="nav__burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <motion.path d="M3 7 H21" stroke="currentColor" strokeWidth="2" animate={open ? { d: 'M5 5 L19 19' } : { d: 'M3 7 L21 7' }} transition={{ duration: 0.3 }} />
              <motion.path d="M3 17 H21" stroke="currentColor" strokeWidth="2" animate={open ? { d: 'M5 19 L19 5' } : { d: 'M3 17 L21 17' }} transition={{ duration: 0.3 }} />
            </svg>
          </button>
        </div>
        <motion.div className="nav__progress" style={{ scaleX: progress }} />
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {LINKS.map(([l, h], i) => (
              <motion.a key={h} href={h} onClick={() => setOpen(false)}
                initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: EASE }}
              >
                <small>{String(i + 1).padStart(2, '0')}</small>{l}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function Ticker() {
  const reduce = useReducedMotion()
  const words = ['Enterprise Architecture', 'Data Pipelines', 'Cloud Migration', 'ERP Implementation', 'Infrastructure Monitoring', 'Security Hardening', 'Audit Readiness', 'Technology Roadmaps']
  const row = [...words, ...words]
  return (
    <div className="ticker" aria-hidden="true">
      <motion.div className="ticker__track"
        animate={reduce ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
      >
        {row.map((w, i) => (
          <span key={i} className={`ticker__item ${i % 2 ? 'muted' : ''}`}><i />{w}</span>
        ))}
      </motion.div>
    </div>
  )
}
