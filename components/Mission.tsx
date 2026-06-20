'use client'
import { motion } from 'framer-motion'

const PILLS = [
  'Early Detection', 'Drug Shortage Prevention', 'Rural Health Equity',
  'Precision Treatment', 'HIV Treatment Support', 'Veterans Health',
  'Clinical Decision Support', 'Genomic Medicine', 'National AI Grid',
  'CMS Value-Based Care', 'FDA Integration', 'NIH Research',
]

export default function Mission() {
  return (
    <section
      id="mission"
      className="py-24 relative overflow-hidden"
      style={{ background: '#030712' }}
    >
      {/* ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06), transparent 68%)' }}
      />
      {/* top + bottom edge lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent)' }} />

      <div className="max-w-3xl mx-auto px-6 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs text-orange-500 tracking-[0.14em] uppercase mb-5">Our Mission</p>
          <h2
            className="font-bold leading-tight tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}
          >
            Every American deserves care as{' '}
            <span className="orange-gradient-text">
              rigorous as the science behind it
            </span>
          </h2>
          <p className="text-slate-400 text-[17px] md:text-[18px] leading-[1.85] mb-10 max-w-2xl mx-auto">
            The gap between what AI can do and what healthcare actually deploys is measurable —
            in delayed diagnoses, avoidable drug shortages, and preventable complications.
            SHOLYTICS exists to close that gap, one research platform at a time.
          </p>
          <div className="flex gap-2.5 justify-center flex-wrap">
            {PILLS.map((p) => (
              <span
                key={p}
                className="px-4 py-2 rounded-full text-[13px] font-medium text-orange-300/80 border transition-all duration-200 cursor-default hover:border-orange-500/45 hover:text-orange-300"
                style={{
                  background: 'rgba(249,115,22,0.05)',
                  borderColor: 'rgba(249,115,22,0.18)',
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
