import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CAPABILITIES, SERVICE_DETAIL, ENGAGEMENTS, INDUSTRIES, INDUSTRY_DETAIL, ROLES, APPROACH } from '../data'
import { MaskLines, Reveal, MagneticButton, Photo, Arrow, EASE } from './primitives'
import { Trust, Ecosystem, FAQ, Contact } from './Sections'
import { img } from '../images'

/* ── Shared ─────────────────────────────────────────────── */
export function PageHero({ eyebrow, lines, lede, image, alt, crumb }) {
  return (
    <section className="phero">
      <div className="wrap phero__grid">
        <div className="phero__copy">
          <motion.nav className="crumbs" aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}>
            <a href="#home">Home</a><span aria-hidden="true">/</span><span>{crumb}</span>
          </motion.nav>
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}><i className="tick" />{eyebrow}</motion.p>
          <MaskLines as="h1" animateNow className="display phero__title" lines={lines} delay={0.2} />
          <motion.p className="lede" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}>{lede}</motion.p>
        </div>
        <motion.div className="phero__media" initial={{ opacity: 0, scale: 0.96, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.3 }}>
          <Photo src={img(image)} alt={alt} ratio="4 / 3" eager parallax={12} />
        </motion.div>
      </div>
    </section>
  )
}

export function CTABand({ title = 'Ready to connect your systems?', text = 'Book a consultation and we will walk through your current setup, your priorities and where to start.' }) {
  return (
    <section className="ctaband">
      <div className="wrap">
        <motion.div className="ctaband__box" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: EASE }}>
          <div className="ctaband__glow" aria-hidden="true" />
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="ctaband__actions">
            <MagneticButton href="#contact" variant="btn--white">Book a consultation</MagneticButton>
            <a className="ctaband__link" href="#services">Explore services <Arrow size={14} /></a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Home: industries teaser ────────────────────────────── */
export function IndustriesTeaser() {
  return (
    <section className="section" id="sectors">
      <div className="wrap">
        <div className="section-head">
          <Reveal className="eyebrow"><i className="tick" />Industries</Reveal>
          <MaskLines className="h2" lines={['Technology shaped around', 'the realities of your industry.']} />
          <Reveal className="lede" delay={0.2}>Six sectors, each with its own regulation, risk and pace. See how we adapt our services to yours.</Reveal>
        </div>
        <div className="itease">
          {INDUSTRIES.map((d, i) => (
            <motion.a key={d.n} href={`#industry-${d.img}`} className="itease__card"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
              whileHover="hover"
            >
              <span className="itease__img"><motion.img src={img(`ind-${d.img}`)} alt="" loading="lazy" variants={{ hover: { scale: 1.08 } }} transition={{ duration: 0.6, ease: EASE }} /></span>
              <span className="itease__body">
                <b>{d.name}</b>
                <span>{d.desc}</span>
              </span>
              <motion.span className="itease__arr" variants={{ hover: { rotate: 45, backgroundColor: 'var(--ink)', color: '#fff' } }}><Arrow size={14} /></motion.span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Services page ──────────────────────────────────────── */
function ServiceTabs({ active }) {
  return (
    <div className="stabs">
      <div className="wrap">
        <nav className="stabs__inner" aria-label="Services">
          {CAPABILITIES.map((c) => (
            <a key={c.viz} href={`#service-${c.viz}`} className={`stabs__tab ${active === c.viz ? 'is-active' : ''}`}>
              {active === c.viz && <motion.span layoutId="stab" className="stabs__pill" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
              <span className="stabs__n">{c.n}</span>{c.title.replace(' Services', '').replace(' Solutions', '')}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}

function ServiceBlock({ cap, i }) {
  const d = SERVICE_DETAIL[cap.viz]
  const flip = i % 2 === 1
  return (
    <section id={`service-${cap.viz}`} className={`sblock ${flip ? 'is-flip' : ''}`} data-service={cap.viz}>
      <div className="wrap sblock__grid">
        <div className="sblock__copy">
          <Reveal className="sblock__n mono">{cap.n} / {cap.key}</Reveal>
          <MaskLines className="h2 sblock__title" lines={[cap.title]} />
          <Reveal as="p" className="sblock__lead" delay={0.1}>{d.lead}</Reveal>
          <Reveal as="p" className="sblock__body" delay={0.15}>{d.body}</Reveal>
          <div className="sblock__deliver">
            <span className="mono sblock__label">What we deliver</span>
            {d.deliver.map(([t, s], k) => (
              <motion.div key={t} className="deliv" initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.5, delay: k * 0.06, ease: EASE }}>
                <span className="deliv__dot" aria-hidden="true" />
                <div><b>{t}</b><span>{s}</span></div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="sblock__side">
          <Photo src={img(d.photo)} alt={cap.photoAlt} ratio="4 / 3" parallax={14} />
          <motion.div className="outcomes" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease: EASE }}>
            <span className="mono sblock__label">Typical outcomes</span>
            <ul>
              {d.outcomes.map((o) => (
                <li key={o}><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="var(--amber-soft)" /><path d="M5.5 10.2l3 3 6-6.4" fill="none" stroke="var(--amber-ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>{o}</li>
              ))}
            </ul>
            <div className="outcomes__tags">{cap.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function ServicesPage() {
  const [active, setActive] = useState('advisory')
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-service]')]
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.dataset.service) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <>
      <PageHero crumb="Services" eyebrow="Our services" image="tech-rack" alt="Engineer testing equipment in a server rack"
        lines={['Five practices.', 'One accountable partner.']}
        lede="From the first architecture review to day-to-day support, every service is designed to connect with the others, so nothing falls between teams or vendors." />
      <ServiceTabs active={active} />
      {CAPABILITIES.map((c, i) => <ServiceBlock key={c.viz} cap={c} i={i} />)}
      <section className="section engage">
        <div className="wrap">
          <div className="section-head">
            <Reveal className="eyebrow"><i className="tick" />Ways to work with us</Reveal>
            <MaskLines className="h2" lines={['Start where it', 'makes sense for you.']} />
          </div>
          <div className="engage__grid">
            {ENGAGEMENTS.map(([t, d, b], i) => (
              <motion.article key={t} className="engage__card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }} whileHover={{ y: -6 }}>
                <span className="engage__n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <span className="engage__best">{b}</span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  )
}

/* ── Industries page ────────────────────────────────────── */
export function IndustriesPage() {
  return (
    <>
      <PageHero crumb="Industries" eyebrow="Industries" image="ind-manufacturing" alt="Automated production line with a control terminal"
        lines={['Built for sectors', 'where systems can’t fail.']}
        lede="Every industry carries its own regulation, risk and operating rhythm. We bring the same five practices, shaped around what your sector demands." />
      <section className="section ilist">
        <div className="wrap">
          {INDUSTRIES.map((d, i) => {
            const x = INDUSTRY_DETAIL[d.img]
            return (
              <article key={d.n} id={`industry-${d.img}`} className={`irow ${i % 2 ? 'is-flip' : ''}`}>
                <div className="irow__media"><Photo src={img(`ind-${d.img}`)} alt={`${d.name} technology`} ratio="16 / 11" parallax={12} /></div>
                <div className="irow__copy">
                  <Reveal className="mono irow__n">{d.n} / Industry</Reveal>
                  <MaskLines className="h2 irow__title" lines={[d.name]} />
                  <Reveal as="p" className="sblock__lead" delay={0.1}>{x.lead}</Reveal>
                  <div className="irow__cols">
                    <div>
                      <span className="mono sblock__label">Common challenges</span>
                      <ul className="irow__list">{x.challenges.map((c) => <li key={c}>{c}</li>)}</ul>
                    </div>
                    <div>
                      <span className="mono sblock__label">How we help</span>
                      <div className="irow__links">{x.help.map(([t, k]) => <a key={k} href={`#service-${k}`}>{t}<Arrow size={12} /></a>)}</div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
      <CTABand title="Working in one of these sectors?" text="Tell us about your environment and the regulations you work under. We will show you how other teams in your sector approach the same problems." />
    </>
  )
}

/* ── About page ─────────────────────────────────────────── */
const ROLE_ICONS = [
  'M4 20V9l8-5 8 5v11 M9 20v-6h6v6',
  'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  'M7 17a4 4 0 010-8 5 5 0 019.6-1.5A3.5 3.5 0 1117.5 17H7z',
  'M12 3l7 3v5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V6l7-3z',
  'M4 13a8 8 0 0116 0 M4 13v4a2 2 0 002 2h1v-6H4 M20 13v4a2 2 0 01-2 2h-1v-6h3',
]

function Approach() {
  const [step, setStep] = useState(0)
  return (
    <section className="section approach">
      <div className="wrap">
        <div className="section-head">
          <Reveal className="eyebrow"><i className="tick" />How we work</Reveal>
          <MaskLines className="h2" lines={['A clear path from', 'first call to steady state.']} />
          <Reveal className="lede" delay={0.2}>Select a stage to see what happens and what you receive at the end of it.</Reveal>
        </div>
        <div className="approach__grid">
          <div className="approach__steps" role="tablist" aria-label="Engagement stages">
            {APPROACH.map(([t], i) => (
              <button key={t} role="tab" aria-selected={step === i} className={`approach__step ${step === i ? 'is-active' : ''}`} onClick={() => setStep(i)}>
                <span className="approach__num">{i + 1}</span>
                <span className="approach__t">{t}</span>
                <span className="approach__bar"><motion.i animate={{ scaleX: step >= i ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} /></span>
              </button>
            ))}
          </div>
          <div className="approach__panel" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: EASE }}>
                <span className="mono" style={{ color: 'var(--amber-ink)' }}>Stage {step + 1} of 4</span>
                <h3>{APPROACH[step][0]}</h3>
                <p>{APPROACH[step][1]}</p>
                <div className="approach__out"><span className="mono">You receive</span><b>{APPROACH[step][2]}</b></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutPage() {
  return (
    <>
      <PageHero crumb="About" eyebrow="About AE Solutions" image="team" alt="Engineers reviewing code together at dual monitors"
        lines={['We connect the technology', 'businesses already run on.']}
        lede="AE Solutions is an IT consulting and digital transformation partner. We help organisations plan, build and run their technology as one connected system." />
      <section className="section mission">
        <div className="wrap mission__grid">
          {[
            ['Our mission', 'Make enterprise technology simpler to run and easier to trust, so it supports the business instead of slowing it down.'],
            ['Our vision', 'Organisations where strategy, data, platforms, operations and security work as one system, with nothing lost between them.'],
            ['Our promise', 'Clear advice, honest estimates and documented work you own. When we say something is done, it is tested and handed over.'],
          ].map(([t, d], i) => (
            <motion.article key={t} className="mission__card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </motion.article>
          ))}
        </div>
      </section>
      <section className="section story">
        <div className="wrap story__grid">
          <Photo src={img('desk')} alt="AE consultant preparing an architecture review at his desk" ratio="5 / 4" parallax={14} />
          <div className="story__copy">
            <Reveal className="eyebrow"><i className="tick" />Why we exist</Reveal>
            <MaskLines className="h2" lines={['Most IT problems sit', 'between the systems.']} />
            <Reveal as="p" className="lede" delay={0.1}>Businesses rarely struggle because of one bad tool. They struggle because finance, operations, data and infrastructure were bought and managed separately, by different vendors, on different timelines.</Reveal>
            <Reveal as="p" className="lede" delay={0.15}>We built AE Solutions to work across those boundaries. One team that understands the strategy, the data, the platforms, the day-to-day operations and the security around them.</Reveal>
          </div>
        </div>
      </section>
      <Approach />
      <section className="section roles">
        <div className="wrap">
          <div className="section-head">
            <Reveal className="eyebrow"><i className="tick" />Our expertise</Reveal>
            <MaskLines className="h2" lines={['The specialists', 'behind every engagement.']} />
          </div>
          <div className="roles__grid">
            {ROLES.map(([t, d], i) => (
              <motion.article key={t} className="role" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }} whileHover={{ y: -6 }}>
                <span className="trust__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24"><path d={ROLE_ICONS[i]} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <Trust />
      <Ecosystem />
      <CTABand title="Let’s talk about your systems." />
    </>
  )
}

/* ── Contact page ───────────────────────────────────────── */
export function ContactPage() {
  return (
    <>
      <section className="phero phero--slim">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><a href="#home">Home</a><span aria-hidden="true">/</span><span>Contact</span></nav>
          <div className="next">
            {[
              ['Send your brief', 'Tell us about your systems and what needs to change.'],
              ['Discovery call', 'A conversation with a consultant to understand your priorities.'],
              ['Proposal', 'A clear scope, timeline and estimate for the first phase.'],
            ].map(([t, d], i) => (
              <motion.div key={t} className="next__step" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: EASE }}>
                <span className="next__n">{i + 1}</span>
                <div><b>{t}</b><span>{d}</span></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Contact />
      <FAQ />
    </>
  )
}
