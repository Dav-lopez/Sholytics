'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { IMPACT_BARS, IMPACT_ITEMS } from '@/lib/data'

export default function Impact() {
  const barsRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !animated.current) {
        animated.current = true
        barsRef.current?.querySelectorAll<HTMLDivElement>('[data-width]').forEach((bar, i) => {
          setTimeout(() => { bar.style.width = bar.dataset.width || '0%' }, 200 + i * 100)
        })
        if (counterRef.current) {
          const el = counterRef.current
          const end = 125000000, dur = 2000, start = Date.now()
          const tick = () => {
            const p = Math.min((Date.now()-start)/dur,1)
            const ease = p*p*(3-2*p)
            el.textContent = Math.floor(ease*end).toLocaleString()+'+'
            if (p<1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      }
    }, { threshold: 0.2 })
    if (barsRef.current) observer.observe(barsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="impact" style={{ background:'#030712', padding:'5rem 0' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6 }} className="mb-14"
        >
          <p className="font-mono text-xs text-orange-500 tracking-[0.12em] uppercase mb-3">Measured Impact</p>
          <h2 className="font-bold leading-tight tracking-tight" style={{ fontSize:'clamp(2rem,4vw,3rem)' }}>
            The numbers behind<br/>the problem
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <motion.div
            ref={barsRef}
            initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.6 }}
            className="rounded-2xl p-8 md:p-10 border"
            style={{ background:'#0a0f1e', borderColor:'rgba(249,115,22,0.15)' }}
          >
            <div ref={counterRef} className="font-mono font-bold text-orange-500 mb-2"
              style={{ fontSize:'clamp(2.8rem,5vw,4.5rem)', lineHeight:1 }}>0</div>
            <p className="text-sm text-slate-500 mb-8">Americans affected by addressable healthcare gaps annually</p>
            {IMPACT_BARS.map(bar => (
              <div key={bar.label} className="mb-5">
                <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                  <span>{bar.label}</span>
                  <span className="text-orange-400">{bar.sub}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full bar-fill"
                    style={{ width:'0%', background:'linear-gradient(90deg, #F97316, #FBBF24)', transition:'width 1.2s cubic-bezier(0.4,0,0.2,1)' }}
                    data-width={bar.width} />
                </div>
              </div>
            ))}
          </motion.div>

          <div className="flex flex-col gap-4">
            {IMPACT_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }}
                className="rounded-xl p-5 border transition-all duration-200 hover:border-orange-500/40 hover:translate-x-1.5"
                style={{ background:'#0a0f1e', borderColor:'rgba(249,115,22,0.12)' }}
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-semibold text-[15px]">{item.title}</h3>
                </div>
                <p className="text-[13px] text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
