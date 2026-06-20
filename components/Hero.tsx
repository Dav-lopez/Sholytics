'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HERO_STATS } from '@/lib/data'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = 0, H = 0, mx = 0, my = 0

    interface P { x:number; y:number; vx:number; vy:number; r:number; alpha:number; hue:number; reset():void }
    const particles: P[] = []

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      mx = W / 2; my = H / 2
    }
    window.addEventListener('resize', resize); resize()

    const make = (): P => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*0.38, vy: (Math.random()-0.5)*0.38,
      r: Math.random()*1.5+0.3, alpha: Math.random()*0.45+0.1,
      hue: Math.random()>0.5 ? 25 : 42,
      reset() { Object.assign(this, make()) }
    })
    for (let i=0; i<130; i++) particles.push(make())

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mx = e.clientX - r.left; my = e.clientY - r.top
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0,0,W,H)
      for (const p of particles) {
        p.x += p.vx + (mx-W/2)*0.00005
        p.y += p.vy + (my-H/2)*0.00005
        if (p.x<-5||p.x>W+5||p.y<-5||p.y>H+5) p.reset()
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle = `hsla(${p.hue},88%,62%,${p.alpha})`; ctx.fill()
      }
      for (let i=0; i<particles.length; i++) {
        for (let j=i+1; j<particles.length; j++) {
          const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y
          const d=Math.sqrt(dx*dx+dy*dy)
          if (d<110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y)
            ctx.strokeStyle=`rgba(249,115,22,${0.09*(1-d/110)})`; ctx.lineWidth=0.5; ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 100%, rgba(249,115,22,0.07) 0%, transparent 62%), #030712' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-28 pb-16 w-full">
        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
          className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full border"
          style={{ background:'rgba(249,115,22,0.1)', borderColor:'rgba(249,115,22,0.25)' }}
        >
          <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-orange-500 block" />
          <span className="font-mono text-[11px] text-orange-400 tracking-widest">
            REGISTERED · COMMONWEALTH OF KENTUCKY · ACTIVE 2025
          </span>
        </motion.div>

        {/* Revised headline — credible, not overreaching */}
        <motion.h1
          initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }}
          className="font-bold leading-[1.05] tracking-tight mb-3"
          style={{ fontSize:'clamp(2.8rem, 6.5vw, 5rem)' }}
        >
          AI-Powered Healthcare Innovation
        </motion.h1>
        <motion.span
          initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
          className="block font-bold leading-[1.05] tracking-tight mb-8 orange-gradient-text"
          style={{ fontSize:'clamp(2.8rem, 6.5vw, 5rem)' }}
        >
          for Research, Prevention &amp; Better Outcomes
        </motion.span>

        <motion.p
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6, delay:0.4 }}
          className="text-slate-400 text-[17px] leading-relaxed max-w-[580px] mb-10"
        >
          SHOLYTICS develops AI research platforms advancing healthcare through clinical decision support,
          early detection, drug shortage prediction, and precision medicine — improving outcomes for
          patients across America.
        </motion.p>

        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.5 }}
          className="flex gap-4 flex-wrap mb-16"
        >
          <button
            onClick={() => scrollTo('#medaicare')}
            className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-[15px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(249,115,22,0.35)]"
          >
            Explore MedAI Care
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-3.5 border border-white/20 hover:border-white/45 hover:bg-white/5 text-white font-semibold rounded-xl text-[15px] transition-all duration-200"
          >
            Request Partnership
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6, delay:0.7 }}
          className="flex gap-8 md:gap-12 pt-10 border-t border-white/[0.06] flex-wrap"
        >
          {HERO_STATS.map((s,i) => (
            <div key={i}>
              <div className="font-mono text-2xl font-bold text-orange-500 mb-1">{s.value}</div>
              <div className="text-xs text-slate-500 max-w-[140px] leading-relaxed">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
