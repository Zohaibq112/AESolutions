import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useScroll } from 'framer-motion'
import { MaskLines, MagneticButton, Photo, EASE } from './primitives'
import { img } from '../images'
import { PLATFORMS } from '../logos'

const NODES = [
  { id: 'adv', label: 'Advisory', idx: 'N-01', x: 90, y: 50, d: 'M90 68 V184 H250' },
  { id: 'data', label: 'Data', idx: 'N-02', x: 320, y: 50, d: 'M320 68 V168' },
  { id: 'cloud', label: 'Cloud + ERP', idx: 'N-03', x: 550, y: 50, d: 'M550 68 V184 H390' },
  { id: 'mit', label: 'Managed IT', idx: 'N-04', x: 90, y: 350, d: 'M90 332 V216 H250' },
  { id: 'ops', label: 'Operations', idx: 'N-05', x: 320, y: 350, d: 'M320 332 V232' },
  { id: 'sec', label: 'Security', idx: 'N-06', x: 550, y: 350, d: 'M550 332 V216 H390' },
]
const BUS = ['M142 50 H268', 'M372 50 H498', 'M142 350 H268', 'M372 350 H498']

function Schematic({ ready }) {
  const reduce = useReducedMotion()
  const [hot, setHot] = useState(0)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 16 })
  const sy = useSpring(my, { stiffness: 60, damping: 16 })
  const gx = useTransform(sx, (v) => v * 10)
  const gy = useTransform(sy, (v) => v * 8)
  const cx = useTransform(sx, (v) => v * -4)
  const cy = useTransform(sy, (v) => v * -4)

  useEffect(() => {
    if (!ready || reduce) return
    const t = setInterval(() => setHot((h) => (h + 1) % NODES.length), 1700)
    return () => clearInterval(t)
  }, [ready, reduce])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const draw = (i) => ({
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: EASE, delay: 0.5 + i * 0.08 } },
  })

  return (
    <motion.svg
      className="schematic"
      viewBox="0 0 640 400"
      role="img"
      aria-label="Schematic: six capability nodes routed into one AE connected core"
      onPointerMove={onMove}
      onPointerLeave={() => { mx.set(0); my.set(0) }}
      initial="hidden"
      animate={ready ? 'show' : 'hidden'}
    >
      {/* frame + dimension line */}
      <motion.g variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.3, duration: 0.8 } } }}>
        <path className="dim" d="M0 392 V400 M640 392 V400 M0 396 H640" />
        <text className="dimtext" x="4" y="388">SYSTEM CONTEXT · CONNECTED CORE</text>
        <text className="dimtext" x="636" y="388" textAnchor="end">5 CAPABILITIES · 1 STRATEGY</text>
        <path className="dim" d="M0 0 h10 M0 0 v10 M640 0 h-10 M640 0 v10" />
      </motion.g>

      <motion.g style={{ x: gx, y: gy }}>
        {BUS.map((d, i) => (
          <motion.path key={d} d={d} className="trace" strokeDasharray="3 4" variants={draw(i)} />
        ))}
        {NODES.map((n, i) => (
          <g key={n.id}>
            <motion.path d={n.d} className="trace" variants={draw(i + 2)} />
            <motion.path
              d={n.d}
              className="trace-live"
              initial={false}
              animate={{ pathLength: hot === i && ready ? 1 : 0, opacity: hot === i && ready ? 1 : 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            />
            {!reduce && ready && (
              <circle r="2.6" className="packet">
                <animateMotion dur={`${2.2 + (i % 3) * 0.5}s`} begin={`${1.6 + i * 0.35}s`} repeatCount="indefinite" path={n.d} />
              </circle>
            )}
          </g>
        ))}

        {NODES.map((n, i) => (
          <motion.g
            key={n.id + 'n'}
            className={`node ${hot === i && ready ? 'hot' : ''}`}
            variants={{
              hidden: { opacity: 0, scale: 0.6 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.9 + i * 0.07 } },
            }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <rect x={n.x - 52} y={n.y - 18} width="104" height="36" />
            <text x={n.x - 44} y={n.y - 5} className="idx">{n.idx}</text>
            <text x={n.x - 44} y={n.y + 10}>{n.label}</text>
          </motion.g>
        ))}
      </motion.g>

      {/* core */}
      <motion.g
        className="node core"
        style={{ x: cx, y: cy, transformOrigin: '320px 200px' }}
        variants={{ hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE, delay: 0.35 } } }}
      >
        <rect x="250" y="168" width="140" height="64" />
        <text x="260" y="184" className="idx">SYS-CORE</text>
        <text x="260" y="214" style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', fontVariationSettings: "'wdth' 125" }}>AE</text>
        <text x="306" y="214" style={{ fontSize: 9 }}>Connected</text>
        <motion.rect
          x="250" y="168" width="140" height="64" fill="none" stroke="var(--amber)" strokeWidth="1"
          animate={reduce ? {} : { opacity: [0.9, 0, 0.9], scale: [1, 1.12, 1] }}
          style={{ transformOrigin: '320px 200px' }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.g>
    </motion.svg>
  )
}

export default function Hero({ ready }) {
  const { scrollY } = useScroll()
  const titleY = useTransform(scrollY, [0, 600], [0, -80])
  const fade = { hidden: { opacity: 0, y: 16 }, show: (d) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: d } }) }
  const state = ready ? 'show' : 'hidden'

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <motion.div className="hero__top mono" initial="hidden" animate={state}>
          <motion.span className="eyebrow" variants={fade} custom={0.1}><i className="tick" />IT consulting &amp; digital transformation</motion.span>
          <motion.div className="hero__coords" variants={fade} custom={0.2}>
            <span className="hero__coords-lbl">Delivering on</span>
            {PLATFORMS.map((p) => (
              <span key={p.key} className={`plat-chip plat-chip--${p.key}`} title={p.name}><img src={p.logo} alt={p.name} /></span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div style={{ y: titleY }}>
          {ready && (
            <MaskLines
              as="h1"
              animateNow
              className="display hero__title"
              stagger={0.1}
              lines={[
                <>Technology</>,
                <>that works <span className="amp">as</span></>,
                <><em className="hero__em">one system.</em></>,
              ]}
            />
          )}
          {!ready && <h1 className="display hero__title" style={{ visibility: 'hidden' }}>Technology that works as one system.</h1>}
        </motion.div>

        <div className="hero__grid">
          <motion.div className="hero__copy" initial="hidden" animate={state}>
            <motion.p className="lede" variants={fade} custom={0.7}>
              AE Solutions connects advisory, data, cloud and ERP, managed IT and security into one technology strategy, so every system you run pulls in the same direction.
            </motion.p>
            <motion.div className="hero__ctas" variants={fade} custom={0.85}>
              <MagneticButton href="#contact">Book a consultation</MagneticButton>
              <MagneticButton href="#services" variant="btn--ghost">Explore services</MagneticButton>
            </motion.div>
            <motion.ul className="assure" variants={fade} custom={1}>
              {['Security and compliance built into every design', 'Delivery across AWS, Azure, Google Cloud and Oracle', 'One accountable team from strategy to support'].map((t) => (
                <li key={t}><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="var(--amber-soft)" /><path d="M5.5 10.2l3 3 6-6.4" fill="none" stroke="var(--amber-ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>{t}</li>
              ))}
            </motion.ul>
          </motion.div>
          <div className="hero__visual">
            <Photo src={img('hero')} alt="The AE delivery team working through a client system design together" ratio="16 / 10" eager parallax={14} />
            <p className="hero__caption mono">Weekly design review with the delivery team</p>
          </div>
        </div>

        <motion.div className="hero__foot" initial="hidden" animate={state}>
          {[
            ['Assess', 'Where your systems stand today'],
            ['Design', 'The architecture they should become'],
            ['Deliver', 'Cloud, ERP and data, rolled out'],
            ['Run', 'Monitored, patched, audit-ready'],
          ].map(([b, s], i) => (
            <motion.div key={b} variants={fade} custom={1.1 + i * 0.08}>
              <span className="mono" style={{ fontSize: 10 }}>Step {i + 1}</span>
              <b>{b}</b>
              <span>{s}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="platforms" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: EASE }}>
          <p className="platforms__lbl mono">Platforms we design, migrate and run on</p>
          <ul className="platforms__row">
            {PLATFORMS.map((p) => (
              <li key={p.key} className={`pl--${p.key}`}><img src={p.logo} alt={p.name} loading="lazy" /></li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
