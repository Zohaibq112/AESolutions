import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CAPABILITIES } from '../data'
import { VIZ } from './Viz'
import { MaskLines, Reveal, Photo, EASE } from './primitives'
import { img } from '../images'

function CapCard({ cap, i, total, progress }) {
  const target = 1 - (total - i - 1) * 0.035
  const scale = useTransform(progress, [i / total, 1], [1, target])
  const dim = useTransform(progress, [i / total, (i + 1) / total], [0, i === total - 1 ? 0 : 0.65])
  const Viz = VIZ[cap.viz]
  return (
    <div className="cap-slot" style={{ top: `calc(88px + ${i * 16}px + env(safe-area-inset-top, 0px))` }}>
      <motion.article
        className="cap"
        style={{ scale }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: EASE }}
        aria-labelledby={`cap-${cap.n}`}
      >
        <div className="cap__index mono">
          <span><span className="n">{cap.n}</span> / {cap.key}</span>
          <span style={{ color: 'var(--ink-3)' }}>Capability {cap.n} of 05</span>
        </div>
        <div className="cap__body">
          <div>
            <h3 className="cap__title" id={`cap-${cap.n}`}>{cap.title}</h3>
            <p className="cap__desc">{cap.desc}</p>
            <Photo className="cap__photo" src={img(cap.photo || cap.viz)} alt={cap.photoAlt} ratio="16 / 7" parallax={10} />
          </div>
          <ul className="cap__tags">
            {cap.tags.map((t, k) => (
              <motion.li key={t}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + k * 0.06, ease: EASE }}
              >{t}</motion.li>
            ))}
          </ul>
        </div>
        <div className="cap__viz">
          <Viz />
        </div>
        <motion.div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--paper)', opacity: dim, pointerEvents: 'none' }} />
      </motion.article>
    </div>
  )
}

export default function Capabilities() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section className="section" id="capabilities">
      <div className="wrap">
        <div className="section-head">
          <Reveal className="eyebrow"><i className="tick" />Capabilities</Reveal>
          <MaskLines className="h2" lines={['Five capabilities.', 'One connected', 'technology strategy.']} />
          <Reveal className="lede" delay={0.2}>
            Each practice stands on its own. Together they cover the full lifecycle of an enterprise system, from the first assessment to the day-to-day running of it.
          </Reveal>
        </div>
        <div className="caps__stack" ref={ref}>
          {CAPABILITIES.map((c, i) => (
            <CapCard key={c.n} cap={c} i={i} total={CAPABILITIES.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
