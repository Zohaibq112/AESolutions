import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { LAYERS, DOMAINS, CLOUDS, INDUSTRIES } from '../data'
import { MaskLines, Reveal, MagneticButton, Arrow, Photo, BrandLogo, EASE } from './primitives'
import { img } from '../images'
import { LOGO } from '../logos'

/* ── Manifesto: words light up as you scroll ─────────────── */
function Word({ children, range, progress, hl }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <span style={{ position: 'relative' }}>
      <motion.span style={{ opacity }} className={hl ? 'hl' : ''}>{children}</motion.span>{' '}
    </span>
  )
}
export function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.45'] })
  const text = 'Most enterprises run on systems that were bought one at a time. We connect the layers you already have, business to infrastructure, so decisions, data and operations move together.'
  const hl = new Set(['connect', 'together.'])
  const words = text.split(' ')
  return (
    <section className="section manifesto" ref={ref}>
      <div className="wrap">
        <p className="eyebrow"><i className="tick" />Point of view</p>
        <p className="manifesto__text">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} hl={hl.has(w)}>{w}</Word>
          ))}
        </p>
        <div className="photo-band">
          <Photo src={img('workshop')} alt="Consultant mapping a client's system landscape on a whiteboard with the team" ratio="21 / 9" tag="Architecture workshop" parallax={22} />
          <div className="photo-band__specs">
            <div><span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>Layer 03 → 05</span><b>ERP to infrastructure</b><span>Business platforms mapped to the hardware they run on.</span></div>
            <div><span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>Layer 04</span><b>Data in motion</b><span>Pipelines documented end to end, source to dashboard.</span></div>
            <div><span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>Layer 06</span><b>Controls on every link</b><span>Identity, access and audit trails across each connection.</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Interactive layer stack ─────────────────────────────── */
export function SystemLayers() {
  const [active, setActive] = useState(2)
  const reduce = useReducedMotion()
  const cur = LAYERS[active]
  const linked = new Set(cur.links)

  return (
    <section className="section" id="system">
      <div className="wrap">
        <div className="section-head">
          <Reveal className="eyebrow"><i className="tick" />Architecture</Reveal>
          <MaskLines className="h2" lines={['Technology should', 'work as one system.']} />
          <Reveal className="lede" delay={0.2}>Select a layer to see how enterprise systems connect.</Reveal>
        </div>

        <div className="layers">
          <div className="layers__list" role="tablist" aria-label="Enterprise layers">
            {LAYERS.map((l, i) => (
              <button
                key={l.n}
                role="tab"
                id={`layer-tab-${i}`}
                aria-selected={active === i}
                aria-controls="layer-panel"
                className={`layer-btn ${active === i ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); const n = (i + 1) % 6; setActive(n); document.getElementById(`layer-tab-${n}`)?.focus() }
                  if (e.key === 'ArrowUp') { e.preventDefault(); const n = (i + 5) % 6; setActive(n); document.getElementById(`layer-tab-${n}`)?.focus() }
                }}
              >
                {active === i && <motion.span layoutId="layer-active" className="active-bg" transition={{ type: 'spring', stiffness: 380, damping: 36 }} />}
                <span className="num">{l.n}</span>
                <span className="name">{l.name}</span>
                <span className="state"><i />Connected</span>
              </button>
            ))}
          </div>

          <div className="layers__stage">
            <div className="stack-wrap" aria-hidden="true">
              <div className="stack">
                {LAYERS.map((l, i) => {
                  const isA = i === active
                  const isL = linked.has(l.name)
                  return (
                    <motion.div
                      key={l.n}
                      className={`plate ${isA ? 'is-active' : ''}`}
                      onClick={() => setActive(i)}
                      initial={false}
                      animate={{
                        y: `${(i - 2.5) * 24 + (isA ? -8 : 0)}%`,
                        x: isA ? '-14%' : '0%',
                        rotateX: 58,
                        rotateZ: -38,
                        borderStyle: isL ? 'dashed' : 'solid',
                        borderColor: isA || isL ? 'var(--amber)' : 'var(--ink)',
                      }}
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 170, damping: 22 }}
                      style={{ zIndex: 10 - i }}
                    >
                      <span className="plate__grid" />
                      <b>{l.n}</b>
                      <span>{l.name}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="layer-detail" id="layer-panel" role="tabpanel" aria-labelledby={`layer-tab-${active}`}>
              <AnimatePresence mode="wait">
                <motion.div key={cur.n} className="layer-detail__main"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <span className="mono" style={{ color: 'var(--amber-ink)' }}>Layer {cur.n} · {cur.owner}</span>
                  <h3>{cur.name}</h3>
                  <p>{cur.summary}</p>
                </motion.div>
              </AnimatePresence>
              <div className="layer-detail__links">
                <span className="mono" style={{ color: 'var(--ink-3)', fontSize: 11 }}>Connects to</span>
                <AnimatePresence mode="popLayout">
                  {cur.links.map((k, i) => (
                    <motion.div key={cur.n + k} className="row"
                      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.06, ease: EASE }}
                    >
                      <span>{k}</span><em>● Linked</em>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Ecosystem orbit ─────────────────────────────────────── */
export function Ecosystem() {
  const reduce = useReducedMotion()
  const [hot, setHot] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setHot((h) => (h + 1) % DOMAINS.length), 1400)
    return () => clearInterval(t)
  }, [reduce])
  const R = 215
  const sats = DOMAINS.map((d, i) => {
    const a = (i / DOMAINS.length) * Math.PI * 2 - Math.PI / 2
    return { d, x: Math.cos(a) * R, y: Math.sin(a) * R }
  })
  const w = (s) => s.length * 7.6 + 24

  return (
    <section className="section eco" id="ecosystem">
      <div className="wrap">
        <div className="section-head">
          <Reveal className="eyebrow"><i className="tick" />Technology ecosystem</Reveal>
          <MaskLines className="h2" lines={['Built across the', 'modern technology stack.']} />
        </div>
        <div className="eco__grid">
          <div className="eco__orbit orbit">
            <svg viewBox="-300 -300 600 600" role="img" aria-label="The AE connected core linked to cloud, data, ERP, infrastructure, security, applications and operations">
              <circle className="ring" r="280" />
              <circle className="ring dash" r={R} />
              <circle className="ring" r="140" />
              {[0, 45, 90, 135].map((a) => (
                <line key={a} className="spoke" x1={-290 * Math.cos((a * Math.PI) / 180)} y1={-290 * Math.sin((a * Math.PI) / 180)} x2={290 * Math.cos((a * Math.PI) / 180)} y2={290 * Math.sin((a * Math.PI) / 180)} strokeDasharray="1 7" />
              ))}
              <motion.g animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}>
                {sats.map((s, i) => (
                  <g key={s.d}>
                    <line x1="0" y1="0" x2={s.x} y2={s.y} stroke={hot === i ? 'var(--amber)' : 'var(--rule-strong)'} strokeWidth={hot === i ? 1.5 : 1} />
                    {!reduce && hot === i && (
                      <motion.circle r="4" className="blip" initial={{ cx: 0, cy: 0 }} animate={{ cx: s.x, cy: s.y }} transition={{ duration: 1.2, ease: 'easeInOut' }} />
                    )}
                  </g>
                ))}
                {sats.map((s, i) => (
                  <motion.g key={s.d + 's'} className={`sat ${hot === i ? 'hot' : ''}`}
                    animate={reduce ? {} : { rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  >
                    <rect x={s.x - w(s.d) / 2} y={s.y - 16} width={w(s.d)} height="32" />
                    <text x={s.x} y={s.y + 4} textAnchor="middle">{s.d}</text>
                  </motion.g>
                ))}
              </motion.g>
              <rect className="core-rect" x="-78" y="-78" width="156" height="156" />
              <motion.rect x="-78" y="-78" width="156" height="156" fill="none" stroke="var(--amber)"
                animate={reduce ? {} : { scale: [1, 1.25], opacity: [0.8, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }} />
              <text className="core-s" x="-62" y="-54">SYS-CORE · 00</text>
              <text className="core-t" x="-62" y="16">AE</text>
              <text className="core-s" x="-62" y="46">CONNECTED</text>
              <text className="core-s" x="-62" y="60" style={{ fill: 'var(--paper-3)' }}>CORE</text>
            </svg>
          </div>
          <div className="eco__side">
            <Reveal as="p" className="lede">
              Seven domains routed through one core. We work across AWS, Microsoft Azure, Google Cloud and Oracle, so the platform follows your business rather than the other way round.
            </Reveal>
            <div className="clouds">
              {CLOUDS.map((c, i) => (
                <motion.div key={c.name} className="cloud" initial="rest" whileHover="hover" animate="rest"
                  whileInView={{ opacity: [0, 1], y: [20, 0] }} viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                >
                  <motion.span className="sweep" variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }} transition={{ duration: 0.45, ease: EASE }} />
                  <span className="glyph glyph--logo"><img src={LOGO[c.k]} alt={c.name} /></span>
                  <div>
                    <div className="nm">{c.name}</div>
                    <div className="reg-list">{c.note}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Industries ──────────────────────────────────────────── */
export function Industries() {
  const [hover, setHover] = useState(null)
  return (
    <section className="section" id="industries">
      <div className="wrap">
        <div className="section-head">
          <Reveal className="eyebrow"><i className="tick" />Industries</Reveal>
          <MaskLines className="h2" lines={['Technology shaped', 'around the realities', 'of your industry.']} />
        </div>
        <div className="ind__list" onPointerLeave={() => setHover(null)}>
          {INDUSTRIES.map((d, i) => (
            <motion.a
              key={d.n}
              href="#contact"
              className={`ind-row ${hover === i ? 'is-hover' : ''}`}
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: EASE }}
            >
              <motion.span className="fill" initial={false} animate={{ scaleY: hover === i ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE }} />
              <span className="n">{d.n}</span>
              <motion.h3 animate={{ x: hover === i ? 16 : 0 }} transition={{ duration: 0.45, ease: EASE }}>{d.name}</motion.h3>
              <span className="ind-thumb" aria-hidden="true">
                <motion.img src={img(`ind-${d.img}`)} alt="" loading="lazy"
                  animate={{ scale: hover === i ? 1.12 : 1 }} transition={{ duration: 0.7, ease: EASE }} />
              </span>
              <p>{d.desc}</p>
              <motion.span className="arr" animate={{ rotate: hover === i ? 45 : 0 }} transition={{ duration: 0.45, ease: EASE }}>
                <Arrow />
              </motion.span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}


const FAQS = [
  ['What does AE Solutions do?', 'We help organisations plan, build and run their technology as one connected system. Our five practices cover IT advisory, data analytics and integration, cloud and ERP, managed IT, and compliance and security.'],
  ['Which cloud platforms do you work with?', 'We design and deliver on AWS, Microsoft Azure, Google Cloud and Oracle (including Oracle Cloud Infrastructure and Oracle ERP), including hybrid set-ups that keep some workloads on your own infrastructure. We recommend the platform that fits your estate, skills and budget.'],
  ['How does an engagement usually start?', 'With an assessment. We review your current systems, data flows, costs and risks, then agree a prioritised roadmap with clear milestones before any build work begins.'],
  ['Can you work with our existing systems and vendors?', 'Yes. Most clients already run a mix of ERP, line-of-business applications and cloud services. We integrate with what you have and work alongside your internal team and current suppliers.'],
  ['Do you provide support after go-live?', 'Yes. Our managed IT service covers infrastructure monitoring, patching, helpdesk and routine maintenance, so the systems we deliver stay reliable after launch.'],
  ['How do you handle security and compliance?', 'Security is part of every design. We run risk assessments, harden infrastructure and identity, map controls to the regulations that apply to you, and prepare the evidence you need for audits.'],
  ['Which industries do you work in?', 'Financial services, healthcare, retail and e-commerce, manufacturing, logistics and the public sector. Each has its own regulatory and operational demands, and we shape the approach around them.'],
  ['How long does a typical project take?', 'It depends on scope. An assessment is usually the quickest piece of work, while migrations and ERP roll-outs are planned in phases. We agree timelines and milestones with you once the assessment is complete.'],
]
export function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section faq" id="faq">
      <div className="wrap faq__grid">
        <div className="faq__intro">
          <Reveal className="eyebrow"><i className="tick" />FAQs</Reveal>
          <MaskLines className="h2" lines={['Questions we', 'hear most often.']} />
          <Reveal as="p" className="lede" delay={0.15}>Can’t find what you need? Tell us about your systems and we’ll answer directly.</Reveal>
          <Reveal delay={0.25}><MagneticButton href="#contact" variant="btn--ghost">Ask a question</MagneticButton></Reveal>
        </div>
        <div className="faq__list">
          {FAQS.map(([q, a], i) => {
            const isOpen = open === i
            return (
              <motion.div key={q} className={`faq__item ${isOpen ? 'is-open' : ''}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease: EASE }}
              >
                <h3>
                  <button id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{q}</span>
                    <motion.span className="faq__icon" aria-hidden="true" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }}>
                      <svg viewBox="0 0 16 16" width="16" height="16"><path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__a"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <p>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Contact ─────────────────────────────────────────────── */
const FOCUS = ['IT Advisory', 'Data & Analytics', 'Cloud & ERP', 'Managed IT', 'Security & Compliance']
export function Contact() {
  const [sel, setSel] = useState(['Cloud & ERP'])
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState({})
  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const next = {}
    if (!String(f.get('name') || '').trim()) next.name = 'Add your name so we know who to reply to.'
    const email = String(f.get('email') || '')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a work email like name@company.com.'
    setErr(next)
    if (!Object.keys(next).length) setSent(true)
  }
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <p className="eyebrow"><i className="tick" />Contact</p>
        <MaskLines as="h2" className="display contact__big" lines={[<>Let&rsquo;s map</>, <>your <span className="amber">system.</span></>]} />
        <div className="contact__grid">
          <div className="contact__intro">
            <p>Tell us where your technology stands today and what it needs to support next. We will come back with a first view of how the layers connect.</p>
            <span className="mono" style={{ fontSize: 11 }}>Reply within one business day</span>
          </div>
          <form className="form" onSubmit={submit} noValidate>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="done" className="form__done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                  <span className="mono" style={{ color: 'var(--amber)' }}>● Request logged</span>
                  <h3>Thanks. Your brief is ready for the team.</h3>
                  <p style={{ color: 'var(--band-ink-2)', margin: 0 }}>This is a demo form, so nothing was sent. Connect it to your inbox or CRM to go live.</p>
                  <div><button type="button" className="chip" onClick={() => setSent(false)}>Edit brief</button></div>
                </motion.div>
              ) : (
                <motion.div key="form" style={{ display: 'contents' }} exit={{ opacity: 0 }}>
                  <div className="field">
                    <label htmlFor="f-name">Name</label>
                    <input id="f-name" name="name" autoComplete="name" placeholder="Your name" aria-invalid={!!err.name} />
                    {err.name && <span className="err">{err.name}</span>}
                    <span className="bar" />
                  </div>
                  <div className="field">
                    <label htmlFor="f-company">Company</label>
                    <input id="f-company" name="company" autoComplete="organization" placeholder="Organisation" />
                    <span className="bar" />
                  </div>
                  <div className="field full">
                    <label htmlFor="f-email">Work email</label>
                    <input id="f-email" name="email" type="email" autoComplete="email" placeholder="name@company.com" aria-invalid={!!err.email} />
                    {err.email && <span className="err">{err.email}</span>}
                    <span className="bar" />
                  </div>
                  <div className="field full">
                    <span className="lbl" id="focus-lbl">Focus area</span>
                    <div className="chips" role="group" aria-labelledby="focus-lbl">
                      {FOCUS.map((f) => {
                        const on = sel.includes(f)
                        return (
                          <motion.button type="button" key={f} className="chip" aria-pressed={on} whileTap={{ scale: 0.94 }}
                            onClick={() => setSel((s) => (on ? s.filter((x) => x !== f) : [...s, f]))}
                          >{f}</motion.button>
                        )
                      })}
                    </div>
                  </div>
                  <div className="field full">
                    <label htmlFor="f-msg">What should your systems do better?</label>
                    <textarea id="f-msg" name="msg" rows="3" placeholder="e.g. Our ERP and reporting don't talk to each other" />
                    <span className="bar" />
                  </div>
                  <div className="form__foot">
                    <small>{sel.length} focus area{sel.length === 1 ? '' : 's'} selected</small>
                    <MagneticButton type="submit" variant="btn--light">Send brief</MagneticButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ── Footer as a drawing title block ─────────────────────── */
const PRINCIPLES = [
  { t: 'Security by default', d: 'Identity, access control and audit trails are designed in from the first workshop, not added at the end.', icon: 'M12 3l7 3v5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V6l7-3z M9 12l2 2 4-4.5' },
  { t: 'Governance you can show', d: 'Every recommendation ties back to a business priority, a cost and an owner, so decisions stand up to review.', icon: 'M4 20h16 M6 20V10 M10 20V6 M14 20v-8 M18 20V4' },
  { t: 'Platform-neutral advice', d: 'We work across AWS, Microsoft Azure, Google Cloud and Oracle and recommend what fits your estate and budget.', icon: 'M7 17a4 4 0 010-8 5 5 0 019.6-1.5A3.5 3.5 0 1117.5 17H7z' },
  { t: 'Documented handover', d: 'Architecture diagrams, runbooks and dashboards are yours to keep, so your team is never locked in.', icon: 'M7 3h7l5 5v13H7z M14 3v5h5 M10 13h6 M10 17h6' },
]
export function Trust() {
  return (
    <section className="section trust" id="trust">
      <div className="wrap">
        <div className="section-head">
          <Reveal className="eyebrow"><i className="tick" />Why AE Solutions</Reveal>
          <MaskLines className="h2" lines={['Built for teams that', 'can’t afford downtime.']} />
          <Reveal className="lede" delay={0.2}>How we work is part of what we deliver. These principles apply to every engagement, from a two-week assessment to a multi-year managed service.</Reveal>
        </div>
        <div className="trust__grid">
          {PRINCIPLES.map((p, i) => (
            <motion.article key={p.t} className="trust__card"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              whileHover={{ y: -6 }}
            >
              <span className="trust__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24"><path d={p.icon} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const cols = [
    ['Services', [['IT Advisory', '#service-advisory'], ['Data & Analytics', '#service-data'], ['Cloud & ERP', '#service-cloud'], ['Managed IT', '#service-managed'], ['Compliance & Security', '#service-security']]],
    ['Company', [['About us', '#about'], ['Industries', '#industries'], ['How we work', '#about'], ['FAQs', '#faq']]],
    ['Get in touch', [['Book a consultation', '#contact'], ['Contact', '#contact'], ['Back to top ↑', '#home']]],
  ]
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <BrandLogo idSuffix="foot" />
            <p>One connected technology strategy across advisory, data, cloud and ERP, managed IT and security.</p>
          </div>
          {cols.map(([h, links]) => (
            <nav key={h} className="footer__col" aria-label={h}>
              <span className="mono">{h}</span>
              {links.map(([l, href]) => <a key={l} href={href}>{l}</a>)}
            </nav>
          ))}
        </div>
        <div className="footer__base">
          <span>© {new Date().getFullYear()} AE Solutions. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
