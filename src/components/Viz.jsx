import { useEffect, useState } from 'react'
import { motion, useReducedMotion, animate, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE } from './primitives'
import { PLATFORMS } from '../logos'

/* 01 — ASSESS → DESIGN → EVOLVE loop */
export function AdvisoryViz() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setStep((s) => (s + 1) % 3), 1600)
    return () => clearInterval(t)
  }, [reduce])
  const steps = ['Assess', 'Design', 'Evolve']
  return (
    <div className="viz">
      <div className="stepper">
        {steps.map((s, i) => (
          <FragmentStep key={s} i={i} s={s} step={step} last={i === steps.length - 1} />
        ))}
      </div>
      <div className="stepper__loop">
        <span>↳ Continuous cycle</span>
        <span className="tnum">Iteration {String(step + 1).padStart(2, '0')} / 03</span>
      </div>
      <svg viewBox="0 0 400 120" style={{ marginTop: 24 }} aria-hidden="true">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={i} x1="0" x2="400" y1={i * 15 + 7} y2={i * 15 + 7} stroke="var(--rule)" />
        ))}
        <motion.path
          d="M0 100 C 60 96, 90 80, 130 76 S 210 58, 250 44 S 330 20, 400 12"
          fill="none" stroke="var(--ink)" strokeWidth="1.5"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.8, ease: EASE }}
        />
        <motion.path
          d="M0 100 C 60 96, 90 80, 130 76 S 210 58, 250 44 S 330 20, 400 12 L400 120 L0 120 Z"
          fill="var(--amber-soft)"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
        />
        <text x="0" y="118" fill="var(--ink-3)" fontSize="9" fontFamily="var(--f-mono)">ROADMAP · Q1</text>
        <text x="400" y="118" fill="var(--ink-3)" fontSize="9" fontFamily="var(--f-mono)" textAnchor="end">Q8</text>
        <motion.circle cx="400" cy="12" r="4" fill="var(--amber)"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.7 }} />
      </svg>
    </div>
  )
}
function FragmentStep({ i, s, step, last }) {
  const on = step === i
  return (
    <>
      <motion.div className={`stepper__node ${on ? 'on' : ''}`} animate={{ y: on ? -6 : 0 }} transition={{ duration: 0.5, ease: EASE }}>
        <small>Step {i + 1}</small>
        {s}
      </motion.div>
      {!last && (
        <div className="stepper__link">
          <motion.i animate={{ scaleX: step > i ? 1 : 0 }} transition={{ duration: 0.6, ease: EASE }} />
        </div>
      )}
    </>
  )
}

/* 02 — sources → pipeline → dashboard */
export function DataViz() {
  const reduce = useReducedMotion()
  const sources = ['CRM', 'ERP', 'IoT', 'Files']
  const bars = [38, 62, 48, 80, 56, 92, 70]
  return (
    <div className="viz">
      <svg viewBox="0 0 440 240" aria-hidden="true">
        {sources.map((s, i) => {
          const y = 30 + i * 56
          const d = `M92 ${y} C 150 ${y}, 150 120, 200 120`
          return (
            <g key={s}>
              <rect x="0" y={y - 16} width="92" height="32" fill="var(--paper)" stroke="var(--ink)" />
              <text x="12" y={y + 4} fontSize="11" fontFamily="var(--f-mono)" fill="var(--ink)">{s}</text>
              <motion.path d={d} fill="none" stroke="var(--ink-3)" strokeWidth="1"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease: EASE }} />
              {!reduce && (
                <circle r="3" fill="var(--amber)">
                  <animateMotion dur="1.8s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={d} />
                </circle>
              )}
            </g>
          )
        })}
        <rect x="200" y="96" width="60" height="48" fill="var(--ink)" />
        <text x="230" y="118" fontSize="9" fontFamily="var(--f-mono)" fill="var(--accent-on-dark)" textAnchor="middle">ETL</text>
        <text x="230" y="132" fontSize="9" fontFamily="var(--f-mono)" fill="var(--paper)" textAnchor="middle">MODEL</text>
        <path d="M260 120 H300" stroke="var(--ink)" />
        {!reduce && (
          <circle r="3" fill="var(--amber)">
            <animateMotion dur="0.9s" repeatCount="indefinite" path="M260 120 H300" />
          </circle>
        )}
        <rect x="300" y="36" width="140" height="168" fill="var(--paper)" stroke="var(--ink)" />
        <text x="310" y="54" fontSize="9" fontFamily="var(--f-mono)" fill="var(--ink-3)">DECISION VIEW</text>
        {bars.map((h, i) => (
          <motion.rect key={i} x={312 + i * 17} width="11" y={192 - h * 1.2} height={h * 1.2}
            fill={i === 5 ? 'var(--amber)' : 'var(--ink)'}
            style={{ transformOrigin: `${317 + i * 17}px 192px` }}
            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 + i * 0.07, ease: EASE }} />
        ))}
        <line x1="308" x2="432" y1="192" y2="192" stroke="var(--ink-3)" />
      </svg>
    </div>
  )
}

/* 03 — cloud providers into the enterprise core */
export function CloudViz() {
  const reduce = useReducedMotion()
  const tiles = PLATFORMS.map((p) => [p.key, p.short, p.logo])
  const modules = ['Finance', 'Supply', 'HR', 'Sales']
  return (
    <div className="viz" style={{ display: 'grid', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {tiles.map(([g, n, logo], i) => (
          <motion.div key={g}
            style={{ border: '1px solid var(--ink)', background: 'var(--paper)', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}
            initial={{ y: -24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
            whileHover={{ y: -4, backgroundColor: 'var(--paper-3)' }}
          >
            <span className={`viz-logo pl--${g}`}><img src={logo} alt="" /></span>
            <span style={{ fontSize: 10 }}>{n}</span>
          </motion.div>
        ))}
      </div>
      <svg viewBox="0 0 300 40" aria-hidden="true" style={{ height: 40 }}>
        {[37, 112, 188, 263].map((x, i) => (
          <g key={x}>
            <path d={`M${x} 0 V40`} stroke="var(--ink-3)" strokeDasharray="2 3" />
            {!reduce && (
              <motion.rect x={x - 3} width="6" height="6" fill="var(--amber)"
                animate={{ y: [-6, 40] }} transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.3, ease: 'easeIn' }} />
            )}
          </g>
        ))}
      </svg>
      <motion.div
        style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 16 }}
        initial={{ clipPath: 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE, delay: 0.3 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ color: 'var(--accent-on-dark)' }}>Enterprise core</span>
          <span>ERP · Live</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
          {modules.map((m, i) => (
            <motion.span key={m}
              style={{ border: '1px solid rgba(228,230,223,.25)', padding: '10px 6px', textAlign: 'center', fontSize: 10 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.9 + i * 0.1 }}
            >{m}</motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/* 04 — live status board */
function Spark({ seed }) {
  const reduce = useReducedMotion()
  const [pts, setPts] = useState(() => Array.from({ length: 16 }, (_, i) => 10 + Math.sin(i * 0.8 + seed) * 6 + Math.random() * 4))
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setPts((p) => [...p.slice(1), 8 + Math.random() * 12]), 900 + seed * 120)
    return () => clearInterval(t)
  }, [reduce, seed])
  const d = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * 6} ${22 - v}`).join(' ')
  return (
    <svg className="status__spark" viewBox="0 0 90 22" preserveAspectRatio="none" aria-hidden="true">
      <path d={`${d} L90 22 L0 22 Z`} fill="var(--amber-soft)" />
      <path d={d} fill="none" stroke="var(--ink)" strokeWidth="1" />
      <circle cx={90} cy={22 - pts[pts.length - 1]} r="2" fill="var(--amber)" />
    </svg>
  )
}
export function ManagedViz() {
  const rows = [
    ['Network', '99.98%'],
    ['Servers', '42 / 42'],
    ['Endpoints', '318 ok'],
    ['Alerts', '0 open'],
  ]
  return (
    <div className="viz">
      <div className="status">
        <div className="status__head">
          <span>System status</span>
          <b><span className="pulse-dot" />Operational</b>
        </div>
        {rows.map(([k, v], i) => (
          <motion.div key={k} className="status__row"
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: EASE }}
          >
            <span><span className="status__ok">●</span>&nbsp; {k}</span>
            <Spark seed={i} />
            <span className="status__val">{v}</span>
          </motion.div>
        ))}
      </div>
      <p style={{ marginTop: 12, color: 'var(--ink-3)', fontSize: 10 }}>Example monitoring view · illustrative values</p>
    </div>
  )
}

/* 05 — concentric control rings with radar sweep */
export function SecurityViz() {
  const reduce = useReducedMotion()
  const rings = [
    ['Compliance', 140],
    ['Data', 106],
    ['Infrastructure', 72],
    ['Identity', 38],
  ]
  return (
    <div className="viz">
      <svg viewBox="-160 -160 320 320" aria-hidden="true" style={{ maxWidth: 380, margin: '0 auto' }}>
        <defs>
          <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--amber)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--amber)" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        {rings.map(([name, r], i) => (
          <g key={name}>
            <motion.circle r={r} fill="none" stroke="var(--ink)" strokeWidth="1"
              strokeDasharray={i % 2 ? '3 5' : 'none'}
              initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: EASE }} />
            <rect x={-r - 1} y={-8} width={2} height={16} fill="var(--ink)" />
            <text x={0} y={-r + 14} textAnchor="middle" fontSize="9" fontFamily="var(--f-mono)" fill="var(--ink-2)" letterSpacing="1">{name.toUpperCase()}</text>
          </g>
        ))}
        {!reduce && (
          <motion.g animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}>
            <path d="M0 0 L140 0 A140 140 0 0 1 99 99 Z" fill="url(#sweep)" />
            <line x1="0" y1="0" x2="140" y2="0" stroke="var(--amber)" strokeWidth="1.5" />
          </motion.g>
        )}
        <rect x="-14" y="-14" width="28" height="28" fill="var(--ink)" />
        <path d="M-5 -1 V-5 A5 5 0 0 1 5 -5 V-1 M-7 -1 H7 V8 H-7 Z" fill="none" stroke="var(--accent-on-dark)" strokeWidth="1.4" />
        {[[60, -90], [-100, 40], [30, 110]].map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="3.5" fill="var(--amber)"
            animate={reduce ? {} : { opacity: [0, 1, 0] }} transition={{ duration: 5, repeat: Infinity, delay: i * 1.4 }} />
        ))}
      </svg>
    </div>
  )
}

/* number that counts up once in view */
export function CountUp({ to, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.4, ease: EASE, onUpdate: setV })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref} className="tnum">{v.toFixed(decimals)}{suffix}</span>
}

export const VIZ = { advisory: AdvisoryViz, data: DataViz, cloud: CloudViz, managed: ManagedViz, security: SecurityViz }
