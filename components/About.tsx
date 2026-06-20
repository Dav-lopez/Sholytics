'use client'
import { motion } from 'framer-motion'

const POINTS = [
  'Founded by AI engineers, data scientists, and healthcare analytics specialists',
  'Registered LLC in the Commonwealth of Kentucky — active since August 2025',
  'Building six specialized AI research platforms targeting distinct healthcare gaps',
  'Aligned with NIH, FDA, and CMS frameworks from day one',
  'Designed for hospitals, universities, government agencies, and research institutions',
  'HIPAA-compliant infrastructure architecture across all platforms',
]

export default function About() {
  return (
    <section
      id="about"
      style={{ background: '#030712', padding: '5rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs text-orange-500 tracking-[0.12em] uppercase mb-3">
              About SHOLYTICS
            </p>
            <h2
              className="font-bold leading-tight tracking-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              An AI research company built for healthcare's hardest problems
            </h2>
            <p className="text-slate-400 text-[16px] leading-[1.8] mb-5">
              SHOLYTICS LLC was founded to close the gap between what AI can do and what American
              healthcare actually deploys. We build specialized research platforms — not general-purpose
              tools — each designed around a specific, measurable failure in the U.S. health system.
            </p>
            <p className="text-slate-400 text-[16px] leading-[1.8] mb-8">
              Our flagship product, MedAI Care, is an AI-driven clinical platform built for hospitals
              and healthcare providers. Our research divisions — CancerAI, DrugAI, AIDSAI, America
              Health Grid, and Precision Medicine — each address a distinct national healthcare challenge
              with dedicated AI infrastructure.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {[
                { n: '4',    l: 'Co-Founders'     },
                { n: '6',    l: 'AI Platforms'    },
                { n: '2026', l: 'Break-even target'},
              ].map(s => (
                <div key={s.l}>
                  <div
                    className="font-mono font-bold text-orange-500 mb-1"
                    style={{ fontSize: '1.75rem' }}
                  >
                    {s.n}
                  </div>
                  <div className="text-xs text-slate-500">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 border"
            style={{ background: '#0a0f1e', borderColor: 'rgba(249,115,22,0.15)' }}
          >
            <p
              className="font-mono text-[11px] text-orange-500 tracking-widest uppercase mb-1"
            >
              Why SHOLYTICS
            </p>
            <h3 className="font-bold text-xl mb-6 leading-tight">
              Built for institutions that demand rigorous AI
            </h3>

            <div className="space-y-4">
              {POINTS.map((point) => (
                <div key={point} className="flex gap-3 items-start">
                  <span
                    className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: 'rgba(249,115,22,0.15)', color: '#F97316' }}
                  >
                    ✓
                  </span>
                  <p className="text-[14px] text-slate-400 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            <div
              className="mt-8 pt-6 border-t flex items-center justify-between flex-wrap gap-3"
              style={{ borderColor: 'rgba(249,115,22,0.1)' }}
            >
              <div>
                <p className="text-xs font-mono text-orange-500 tracking-widest uppercase mb-1">
                  Legal Status
                </p>
                <p className="text-[13px] text-slate-400">
                  File No. 1486154 · Commonwealth of Kentucky
                </p>
                <p className="text-[13px] text-slate-400">
                  Filed August 19, 2025 · Status: Active
                </p>
              </div>
              <div
                className="px-3 py-2 rounded-lg text-[12px] font-mono font-bold text-orange-400 border"
                style={{ background: 'rgba(249,115,22,0.08)', borderColor: 'rgba(249,115,22,0.25)' }}
              >
                ✓ ACTIVE
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
