'use client'
import { motion } from 'framer-motion'
import { DIVISIONS } from '@/lib/data'

export default function Research() {
  return (
    <section id="research" style={{ background:'#0a0f1e', padding:'5rem 0' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6 }} className="mb-14"
        >
          <p className="font-mono text-xs text-orange-500 tracking-[0.12em] uppercase mb-3">Research Divisions</p>
          <h2 className="font-bold leading-tight tracking-tight mb-4" style={{ fontSize:'clamp(2rem,4vw,3rem)' }}>
            Six AI platforms targeting six<br/>measurable healthcare gaps.
          </h2>
          <p className="text-slate-400 text-[17px] max-w-xl leading-relaxed">
            Each division is built around a specific failure point in U.S. healthcare — one with clear
            data, a defined patient population, and a concrete AI intervention.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden"
          style={{ border:'1px solid rgba(249,115,22,0.15)', gap:'1px', background:'rgba(249,115,22,0.04)' }}
        >
          {DIVISIONS.map((div, i) => (
            <motion.div
              key={div.name}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08 }}
              className="research-card p-8 md:p-10 cursor-default group"
              style={{ background:'#0a0f1e' }}
            >
              <div className="text-4xl mb-5">{div.icon}</div>
              <span
                className="inline-block font-mono text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded mb-3"
                style={{ background:'rgba(249,115,22,0.1)', color:'#FB923C' }}
              >{div.tag}</span>
              <h3 className="text-[19px] font-bold mb-3 leading-tight">{div.name}</h3>
              <p className="text-[13px] text-slate-400 leading-[1.75] mb-4">{div.desc}</p>
              <p
                className="text-[12px] leading-relaxed mb-5 px-3 py-2.5 rounded-lg"
                style={{ color:'#FB923C', background:'rgba(249,115,22,0.06)', borderLeft:'2px solid #F97316' }}
              >{div.impact}</p>
              <div className="flex gap-6 pt-4" style={{ borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                {div.stats.map(s => (
                  <div key={s.label}>
                    <div className="font-mono text-[13px] font-bold text-orange-400">{s.value}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
