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
          <p className="font-mono text-xs text-orange-500 tracking-[0.12em] uppercase mb-3">Product Roadmap</p>
          <h2 className="font-bold leading-tight tracking-tight mb-4" style={{ fontSize:'clamp(2rem,4vw,3rem)' }}>
            A growing healthcare portfolio.<br/>Built and tested independently.
          </h2>
          <p className="text-slate-400 text-[17px] max-w-xl leading-relaxed">
            We build one product at a time and expand only when users show us it is worth it.
            Each line is labelled by its real stage: prototype, research or concept.
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
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="inline-block font-mono text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded"
                  style={{ background:'rgba(249,115,22,0.1)', color:'#FB923C' }}
                >{div.tag}</span>
                <span
                  className="inline-block font-mono text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded border"
                  style={div.status === 'Prototype'
                    ? { background:'rgba(52,211,153,0.12)', color:'#6EE7B7', borderColor:'rgba(52,211,153,0.35)' }
                    : { background:'transparent', color:'#94A3B8', borderColor:'rgba(148,163,184,0.35)' }}
                >{div.status}</span>
              </div>
              <h3 className="text-[19px] font-bold mb-3 leading-tight">{div.name}</h3>
              <p className="text-[13px] text-slate-400 leading-[1.75] mb-4">{div.desc}</p>\n              {div.repo && <a href={'https://github.com/Dav-lopez/'+div.repo} target="_blank" rel="noopener noreferrer" className="inline-block mb-4 text-[13px] text-orange-400 underline underline-offset-4">View development repository</a>}
              <p
                className="text-[12px] leading-relaxed px-3 py-2.5 rounded-lg"
                style={{ color:'#FB923C', background:'rgba(249,115,22,0.06)', borderLeft:'2px solid #F97316' }}
              >{div.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
