'use client'
import { motion } from 'framer-motion'
import { MEDAI_FEATURES, MEDAI_STATS } from '@/lib/data'

export default function MedAICare() {
  return (
    <section
      id="medaicare"
      style={{ background: '#0a0f1e', padding: '5rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16"
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md mb-4 font-mono text-[11px] tracking-widest uppercase"
              style={{ background: 'rgba(249,115,22,0.1)', color: '#FB923C', border: '1px solid rgba(249,115,22,0.2)' }}
            >
              Flagship Product
            </div>
            <h2
              className="font-bold leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
            >
              MedAI Care
            </h2>
            <p className="text-orange-400 font-mono text-sm mt-2 mb-5">
              AI-driven personalized clinical intelligence
            </p>
            <p className="text-slate-400 text-[16px] leading-[1.8] max-w-xl">
              MedAI Care is SHOLYTICS&apos;s primary commercial platform — an adaptive AI system that
              transforms clinical data into personalized treatment plans and real-time decision support
              for healthcare providers. Built for hospitals, clinics, specialty centers, and telehealth
              networks of all sizes.
            </p>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-2 gap-4">
            {MEDAI_STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-5 border text-center"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(249,115,22,0.12)' }}
              >
                <div className="font-mono font-bold text-orange-500 text-2xl mb-1">{s.value}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {MEDAI_FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-xl p-6 border transition-all duration-200 hover:border-orange-500/30 group"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(249,115,22,0.1)' }}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-[16px] mb-2 group-hover:text-orange-400 transition-colors duration-200">
                {f.title}
              </h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl px-8 md:px-12 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border"
          style={{ background: 'rgba(249,115,22,0.04)', borderColor: 'rgba(249,115,22,0.2)' }}
        >
          <div>
            <p className="font-bold text-[18px] mb-2">Subscription-Based Access for Healthcare Providers</p>
            <p className="text-[14px] text-slate-400 max-w-xl leading-relaxed">
              MedAI Care operates on a tiered subscription model for institutions of all sizes — from
              single clinics to large hospital networks. Clinical training programs and advanced
              analytics packages available as add-ons.
            </p>
          </div>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-shrink-0 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-[14px] transition-all duration-200 hover:shadow-[0_8px_30px_rgba(249,115,22,0.35)] whitespace-nowrap"
          >
            Schedule a Demo →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
