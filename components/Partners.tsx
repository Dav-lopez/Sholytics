'use client'
import { motion } from 'framer-motion'
import { PARTNERS } from '@/lib/data'

const CATEGORY_ICONS: Record<string, string> = {
  'AI & Cloud': '☁️',
  'Healthcare Tech': '🏥',
  'Pharmaceutical': '💊',
  'Universities': '🎓',
  'Government': '🏛️',
}

export default function Partners() {
  return (
    <section id="partners" style={{ background: '#0d1526', padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <p className="font-mono text-xs text-orange-500 tracking-[0.12em] uppercase mb-3">Target Ecosystem</p>
            <h2 className="font-bold leading-tight tracking-tight mb-3" style={{ fontSize:'clamp(2rem,4vw,3rem)' }}>
              Partners we&apos;re building toward
            </h2>
            <p className="text-slate-400 text-[16px] max-w-md leading-relaxed">
              Actively preparing proposals for universities, hospitals, government agencies,
              and technology leaders. Collaboration inquiries welcome.
            </p>
          </div>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior:'smooth' })}
            className="flex-shrink-0 self-start md:self-auto px-6 py-3 rounded-xl border font-semibold text-[14px] text-orange-400 transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/8"
            style={{ borderColor:'rgba(249,115,22,0.25)', background:'rgba(249,115,22,0.06)' }}
          >
            Send a Proposal →
          </button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {PARTNERS.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.07 }}
              className="rounded-xl p-5 border"
              style={{ background:'rgba(255,255,255,0.02)', borderColor:'rgba(249,115,22,0.1)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-base">{CATEGORY_ICONS[group.category]}</span>
                <p className="font-mono text-[10px] text-orange-500 tracking-[0.1em] uppercase">{group.category}</p>
              </div>
              {group.items.map(item => (
                <p
                  key={item}
                  className="text-[12px] text-slate-400 mb-2 pl-3 relative"
                  style={{ borderLeft:'1.5px solid rgba(249,115,22,0.15)' }}
                >
                  {item}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Outreach CTA strip */}
        <motion.div
          initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ duration:0.5, delay:0.3 }}
          className="rounded-xl px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border"
          style={{ background:'rgba(249,115,22,0.05)', borderColor:'rgba(249,115,22,0.18)' }}
        >
          <p className="text-slate-300 text-[14px] leading-relaxed">
            University and government proposals sent to:{' '}
            <a href="mailto:partnerships@sholytics.org" className="text-orange-400 hover:text-orange-300 transition-colors font-medium">partnerships@sholytics.org</a>
            {' '}·{' '}
            <a href="mailto:research@sholytics.org" className="text-orange-400 hover:text-orange-300 transition-colors font-medium">research@sholytics.org</a>
            {' '}·{' '}
            <a href="mailto:grants@sholytics.org" className="text-orange-400 hover:text-orange-300 transition-colors font-medium">grants@sholytics.org</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
