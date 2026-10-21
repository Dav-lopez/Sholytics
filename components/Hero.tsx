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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animId = 0
    let running = false
    let visible = true
    let W = 0, H = 0, mx = 0, my = 0
    const LINK_DISTANCE = 110

    interface P { x:number; y:number; vx:number; vy:number; r:number; alpha:number; hue:number; reset():void }
    const particles: P[] = []

    const make = (): P => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*0.38, vy: (Math.random()-0.5)*0.38,
      r: Math.random()*1.5+0.3, alpha: Math.random()*0.45+0.1,
      hue: Math.random()>0.5 ? 25 : 42,
      reset() { Object.assign(this, make()) }
    })

    // Fewer particles on small screens: the line pass below is O(n²) per frame.
    const targetCount = () => (W < 640 ? 45 : W < 1024 ? 80 : 120)

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      mx = W / 2; my = H / 2
      const count = targetCount()
      while (particles.length < count) particles.push(make())
      particles.length = count
      if (!running) drawFrame(false)
    }

    const drawFrame = (move: boolean) => {
      ctx.clearRect(0,0,W,H)
      for (const p of particles) {
        if (move) {
          p.x += p.vx + (mx-W/2)*0.00005
          p.y += p.vy + (my-H/2)*0.00005
          if (p.x<-5||p.x>W+5||p.y<-5||p.y>H+5) p.reset()
        }
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle = `hsla(${p.hue},88%,62%,${p.alpha})`; ctx.fill()
      }
      ctx.lineWidth = 0.5
      for (let i=0; i<particles.length; i++) {
        for (let j=i+1; j<particles.length; j++) {
          const dx=particles[i].x-particles[j].x
          if (dx > LINK_DISTANCE || dx < -LINK_DISTANCE) continue
          const dy=particles[i].y-particles[j].y
          if (dy > LINK_DISTANCE || dy < -LINK_DISTANCE) continue
          const d=Math.sqrt(dx*dx+dy*dy)
          if (d<LINK_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y)
            ctx.strokeStyle=`rgba(249,115,22,${0.09*(1-d/LINK_DISTANCE)})`; ctx.stroke()
          }
        }
      }
    }

    const loop = () => {
      drawFrame(true)
      animId = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduceMotion || !visible || document.hidden) return
      running = true
      animId = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(animId)
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mx = e.clientX - r.left; my = e.clientY - r.top
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    // Pause when the hero is scrolled out of view.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start(); else stop()
    })
    observer.observe(canvas)

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    if (!reduceMotion) window.addEventListener('mousemove', onMove)
    resize()
    start()

    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('mousemove', onMove)
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
          Healthcare intelligence,
        </motion.h1>
        <motion.span
          initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
          className="block font-bold leading-[1.05] tracking-tight mb-8 orange-gradient-text"
          style={{ fontSize:'clamp(2.8rem, 6.5vw, 5rem)' }}
        >
          starting with medication supply.
        </motion.span>

        <motion.p
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6, delay:0.4 }}
          className="text-slate-400 text-[17px] leading-relaxed max-w-[580px] mb-10"
        >
          Our first product, DrugAI, helps pharmacy and hospital procurement teams see which
          medications may run out before the next delivery, why, and what to follow up on. It is a
          prototype, and we are looking for design partners to shape it.
        </motion.p>

        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.5 }}
          className="flex gap-4 flex-wrap mb-16"
        >
          <button
            onClick={() => scrollTo('#drugai')}
            className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-[15px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(249,115,22,0.35)]"
          >
            Explore DrugAI
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-3.5 border border-white/20 hover:border-white/45 hover:bg-white/5 text-white font-semibold rounded-xl text-[15px] transition-all duration-200"
          >
            Become a Design Partner
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
