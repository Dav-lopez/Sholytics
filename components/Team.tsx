'use client'
import { motion } from 'framer-motion'
import { TEAM } from '@/lib/data'

export default function Team() {
  return (
    <section id="team" style={{ background: '#0a0f1e', padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <p className="font-mono text-xs text-orange-500 tracking-[0.12em] uppercase mb-3">Leadership</p>
            <h2 className="font-bold leading-tight tracking-tight mb-3" style={{ fontSize:'clamp(2rem,4vw,3rem)' }}>
              The founding team
            </h2>
            <p className="text-slate-400 text-[16px] max-w-md leading-relaxed">
              Four co-founders based in Clarksville, TN. Registered in Lexington, KY.
              Building from day one with a research-first approach.
            </p>
          </div>
          {/* Registration badge */}
          <div
            className="flex-shrink-0 rounded-xl px-5 py-4 border self-start md:self-auto"
            style={{ background:'rgba(249,115,22,0.06)', borderColor:'rgba(249,115,22,0.2)' }}
          >
            <p className="font-mono text-[10px] text-orange-500 tracking-widest uppercase mb-1.5">Legal Entity</p>
            <p className="text-[13px] text-slate-300 font-medium">SHOLYTICS LLC</p>
            <p className="text-[12px] text-slate-500">File No. 1486154 · KY · Active</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.09 }}
              className="rounded-2xl p-7 border transition-all duration-200 hover:border-orange-500/35 hover:-translate-y-1.5"
              style={{ background:'rgba(255,255,255,0.02)', borderColor:'rgba(249,115,22,0.1)' }}
            >
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center font-mono text-lg font-bold text-orange-400"
                style={{ background:'rgba(249,115,22,0.1)', border:'1.5px solid rgba(249,115,22,0.25)' }}
              >
                {member.initials}
              </div>
              <h3 className="font-bold text-[15px] mb-1 leading-tight">{member.name}</h3>
              <p className="font-mono text-[10px] text-orange-400 tracking-widest uppercase mb-3 leading-relaxed">
                {member.role}
              </p>
              <p className="text-[13px] text-slate-400 leading-[1.65]">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
