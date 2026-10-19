import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]

/** Fade/slide a block in when it enters the viewport (once). */
export function Reveal({ children, delay = 0, y = 28, as = 'div', className, ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}

/** Masked line-by-line headline reveal. `lines` is an array of nodes. */
export function MaskLines({ lines, className, delay = 0, stagger = 0.09, animateNow = false, as = 'h2' }) {
  const M = motion[as]
  const variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const line = {
    hidden: { y: '105%' },
    show: { y: '0%', transition: { duration: 1.05, ease: EASE } },
  }
  const trigger = animateNow
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.4 } }
  return (
    <M className={className} variants={variants} {...trigger}>
      {lines.map((l, i) => (
        <span className="line" key={i} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em' }}>
          <motion.span style={{ display: 'inline-block' }} variants={line}>
            {l}
          </motion.span>
        </span>
      ))}
    </M>
  )
}

/** Button that leans toward the pointer, with an amber wipe on hover. */
export function MagneticButton({ children, href = '#contact', variant = '', onClick, type, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const leave = () => { x.set(0); y.set(0) }

  const Tag = type ? motion.button : motion.a
  const tagProps = type ? { type, onClick } : { href, onClick }

  return (
    <Tag
      ref={ref}
      className={`btn ${variant} ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={move}
      onPointerLeave={leave}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      animate="rest"
      {...tagProps}
    >
      <motion.span
        className="btn__fill"
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.45, ease: EASE }}
      />
      <span>{children}</span>
      <span className="btn__arrow" aria-hidden="true">
        <motion.svg width="14" height="14" viewBox="0 0 14 14"
          variants={{ rest: { x: 0 }, hover: { x: [0, 18, -18, 0] } }}
          transition={{ duration: 0.55, ease: EASE, times: [0, 0.45, 0.46, 1] }}
        >
          <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </motion.svg>
      </span>
    </Tag>
  )
}

export function Arrow({ size = 16, rotate = 0 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M3 13L13 3M5 3h8v8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function BrandMark({ className = 'brand__mark', idSuffix = 'a' }) {
  const gid = `aeg-${idSuffix}`
  return (
    <svg className={className} viewBox="0 0 64 44" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#19A8AC" />
          <stop offset="1" stopColor="#2C6FDB" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="44" height="44" rx="11" fill={`url(#${gid})`} />
      <text x="22" y="29.5" textAnchor="middle" fill="#fff" fontFamily="var(--f-display)" fontWeight="800" fontSize="17" letterSpacing="-0.5">AE</text>
      <rect x="47" y="8" width="5.5" height="5.5" rx="1.4" fill="#3672E0" />
      <rect x="54.5" y="3" width="4" height="4" rx="1" fill="#5AC5BF" />
      <rect x="53" y="17" width="5" height="5" rx="1.3" fill="#38BBB3" />
      <rect x="60" y="11" width="3" height="3" rx="0.8" fill="#A6BFEE" />
      <rect x="48" y="27" width="4.5" height="4.5" rx="1.2" fill="#5588E4" />
      <rect x="59" y="23" width="3.2" height="3.2" rx="0.8" fill="#87AAEA" />
      <rect x="54" y="34" width="3.2" height="3.2" rx="0.8" fill="#93D7D1" />
    </svg>
  )
}

/** Full AE Solutions lockup: mark + wordmark + tagline (brand supplied by client). */
export function BrandLogo({ tagline = true, idSuffix = 'n' }) {
  return (
    <span className="logo">
      <BrandMark idSuffix={idSuffix} />
      <span className="logo__type">
        <span className="logo__word"><b>AE</b><i>SOLUTIONS</i></span>
        {tagline && <span className="logo__tag">Digital transformation</span>}
      </span>
    </span>
  )
}

/** Photo with a wipe-in reveal, slow parallax drift and drawing-style labels. */
export function Photo({ src, alt, fig, tag, ratio = '16 / 9', className = '', parallax = 40, eager = false }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax])
  return (
    <motion.figure
      ref={ref}
      className={`photo ${className}`}
      style={{ aspectRatio: ratio }}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.span
        className="photo__shutter"
        aria-hidden="true"
        variants={{ hidden: { scaleY: 1 }, shown: { scaleY: 0 } }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={{ y, scale: 1.08 }}
        whileHover={{ scale: 1.12 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      <span className="photo__corner tl" aria-hidden="true" />
      <span className="photo__corner br" aria-hidden="true" />
      {fig && <figcaption className="photo__fig mono">{fig}</figcaption>}
      {tag && <span className="photo__tag mono" aria-hidden="true"><i />{tag}</span>}
    </motion.figure>
  )
}
