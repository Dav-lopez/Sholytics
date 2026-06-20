'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONTACT_CHANNELS, INQUIRY_TYPES } from '@/lib/data'

export default function Contact() {
  const [form, setForm] = useState({ name:'', org:'', email:'', type:INQUIRY_TYPES[0], msg:'' })
  const [errors, setErrors] = useState<Record<string,string>>({})
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const e: Record<string,string> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required'
    if (!form.msg.trim()) e.msg = 'Please include a message'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setStatus('loading')
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else {
        setServerError(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setServerError('Network error. Please email us directly at management@sholytics.org')
      setStatus('error')
    }
  }

  const inputClass = (key: string) =>
    `w-full px-4 py-3 rounded-xl text-sm text-slate-200 outline-none transition-all duration-200 placeholder-slate-600 border ${
      errors[key]
        ? 'border-red-500 bg-red-500/5'
        : 'border-white/10 bg-white/[0.04] focus:border-orange-500/50 hover:border-white/20'
    }`

  return (
    <section id="contact" style={{ background:'#030712', padding:'5rem 0' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6 }} className="mb-14"
        >
          <p className="font-mono text-xs text-orange-500 tracking-[0.12em] uppercase mb-3">Get In Touch</p>
          <h2 className="font-bold leading-tight tracking-tight mb-4" style={{ fontSize:'clamp(2rem,4vw,3rem)' }}>
            Partner with SHOLYTICS
          </h2>
          <p className="text-slate-400 text-[17px] max-w-xl leading-relaxed">
            We welcome proposals from universities, hospitals, government agencies, and investors
            aligned with our mission to advance AI-driven healthcare research.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.6 }}
          >
            {CONTACT_CHANNELS.map(ch => (
              <div key={ch.label} className="flex gap-4 mb-7">
                <span className="text-xl mt-0.5">{ch.icon}</span>
                <div>
                  <p className="font-mono text-[10px] text-orange-500 tracking-widest uppercase mb-1">{ch.label}</p>
                  <a href={ch.href} className="text-[14px] text-slate-400 hover:text-orange-400 transition-colors">
                    {ch.value}
                  </a>
                </div>
              </div>
            ))}
            <div className="flex gap-4 mb-10">
              <span className="text-xl mt-0.5">📍</span>
              <div>
                <p className="font-mono text-[10px] text-orange-500 tracking-widest uppercase mb-1">Registered Office</p>
                <p className="text-[14px] text-slate-400">271 W. Short St Ste 410<br/>Lexington, KY 40507</p>
              </div>
            </div>

            <div className="rounded-xl px-6 py-5 border" style={{ background:'rgba(249,115,22,0.07)', borderColor:'rgba(249,115,22,0.2)' }}>
              <p className="font-mono text-[11px] text-orange-500 tracking-widest uppercase mb-2">SHOLYTICS LLC</p>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                File No. 1486154 · Commonwealth of Kentucky<br/>
                Filed August 19, 2025 · Status: Active
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.6 }}
            className="rounded-2xl p-8 md:p-10 border"
            style={{ background:'#0a0f1e', borderColor:'rgba(249,115,22,0.15)' }}
          >
            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-xl font-bold mb-2">Proposal received</h3>
                <p className="text-slate-400 text-[14px] leading-relaxed">
                  Thank you, {form.name}. We&apos;ll respond within 2 business days at{' '}
                  <strong className="text-orange-400">{form.email}</strong>
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide">Full Name *</label>
                    <input className={inputClass('name')} value={form.name}
                      onChange={e => { setForm({...form,name:e.target.value}); setErrors({...errors,name:''}) }}
                      placeholder="Your name" style={{ fontFamily:'inherit' }} />
                    {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide">Organization</label>
                    <input className={inputClass('org')} value={form.org}
                      onChange={e => setForm({...form,org:e.target.value})}
                      placeholder="Institution / Company" style={{ fontFamily:'inherit' }} />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide">Email Address *</label>
                  <input className={inputClass('email')} type="email" value={form.email}
                    onChange={e => { setForm({...form,email:e.target.value}); setErrors({...errors,email:''}) }}
                    placeholder="you@organization.org" style={{ fontFamily:'inherit' }} />
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide">Inquiry Type</label>
                  <select
                    className={inputClass('type')}
                    value={form.type} onChange={e => setForm({...form,type:e.target.value})}
                    style={{ fontFamily:'inherit', background:'#0d1526' }}
                  >
                    {INQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide">Message *</label>
                  <textarea
                    className={`${inputClass('msg')} resize-y min-h-[120px]`}
                    value={form.msg}
                    onChange={e => { setForm({...form,msg:e.target.value}); setErrors({...errors,msg:''}) }}
                    placeholder="Tell us about your organization and how you'd like to collaborate..."
                    style={{ fontFamily:'inherit' }}
                  />
                  {errors.msg && <p className="text-[11px] text-red-400 mt-1">{errors.msg}</p>}
                </div>

                {serverError && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/25 text-[13px] text-red-400">
                    {serverError}
                  </div>
                )}

                <button
                  onClick={submit}
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-bold rounded-xl text-[15px] transition-all duration-200 hover:shadow-[0_8px_30px_rgba(249,115,22,0.35)]"
                  style={{ fontFamily:'inherit' }}
                >
                  {status === 'loading' ? 'Sending…' : 'Send Proposal →'}
                </button>

                <p className="text-center text-[12px] text-slate-600 mt-4">
                  Or email directly:{' '}
                  <a href="mailto:management@sholytics.org" className="text-orange-500/70 hover:text-orange-400 transition-colors">
                    management@sholytics.org
                  </a>
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
