'use client'
import { motion } from 'framer-motion'
import { CREDENTIALS } from '@/lib/data'

export default function Credibility() {
  return (
    <section
      id="credibility"
      style={{ background: '#0d1526', padding: '5rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-xs text-orange-500 tracking-[0.12em] uppercase mb-3">
            Why SHOLYTICS
          </p>
          <h2
            className="font-bold leading-tight tracking-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Built for institutions that demand rigor
          </h2>
          <p className="text-slate-400 text-[17px] max-w-xl mx-auto leading-relaxed">
            Universities, hospitals, NIH, and FDA take credibility seriously.
            Here is what SHOLYTICS brings to every engagement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CREDENTIALS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-xl p-6 border transition-all duration-200 hover:border-orange-500/35 hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(249,115,22,0.12)' }}
            >
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className="font-bold text-[16px] mb-2">{c.title}</h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Registration strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 rounded-xl px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-4 border"
          style={{ background: 'rgba(249,115,22,0.05)', borderColor: 'rgba(249,115,22,0.18)' }}
        >
          <div className="flex items-center gap-6 flex-wrap">
            <div>
              <p className="font-mono text-[10px] text-orange-500 tracking-widest uppercase mb-1">Entity</p>
              <p className="text-[13px] text-slate-300 font-medium">SHOLYTICS LLC</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-orange-500 tracking-widest uppercase mb-1">File Number</p>
              <p className="text-[13px] text-slate-300 font-medium">1486154</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-orange-500 tracking-widest uppercase mb-1">State</p>
              <p className="text-[13px] text-slate-300 font-medium">Commonwealth of Kentucky</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-orange-500 tracking-widest uppercase mb-1">Filed</p>
              <p className="text-[13px] text-slate-300 font-medium">August 19, 2025</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-orange-500 tracking-widest uppercase mb-1">Status</p>
              <p className="text-[13px] text-orange-400 font-bold">Active</p>
            </div>
          </div>
          <div
            className="px-4 py-2 rounded-lg font-mono text-[12px] font-bold text-orange-400 border"
            style={{ background: 'rgba(249,115,22,0.1)', borderColor: 'rgba(249,115,22,0.3)' }}
          >
            ✓ Verified Active Entity
          </div>
        </motion.div>
      </div>
    </section>
  )
}
