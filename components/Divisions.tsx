'use client'
import { motion } from 'framer-motion'
import { DIVISIONS } from '@/lib/data'

export default function Divisions() {
  return (
    <section id="divisions" style={{ background: '#0d1526', padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-xs text-orange-500 tracking-[0.12em] uppercase mb-3">Platform Overview</p>
          <h2 className="font-bold leading-tight tracking-tight" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
            Full division breakdown
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(249,115,22,0.15)' }}
        >
          {DIVISIONS.map((div, i) => (
            <div
              key={div.name}
              className="division-row relative transition-all duration-200 hover:bg-orange-500/[0.04]"
              style={{
                borderBottom: i < DIVISIONS.length - 1 ? '1px solid rgba(249,115,22,0.1)' : 'none',
              }}
            >
              {/* Mobile: stacked. Desktop: side-by-side */}
              <div className="flex flex-col gap-3 p-6 md:p-7 md:grid md:gap-8 md:items-center division-row-grid">
                <div className="flex items-center gap-4">
                  <span className="text-3xl w-10 text-center flex-shrink-0">{div.icon}</span>
                  <div>
                    <div className="font-bold text-[17px] leading-tight">{div.name}</div>
                    <div className="font-mono text-[10px] text-orange-500 tracking-widest uppercase mt-1">
                      {div.tag}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{div.desc}</p>
                <span className="hidden md:block text-orange-500 text-xl opacity-30 transition-opacity group-hover:opacity-100">→</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
