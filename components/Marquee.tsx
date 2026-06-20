'use client'
import { MARQUEE_ITEMS } from '@/lib/data'

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div
      className="border-y overflow-hidden py-4"
      style={{ borderColor: 'rgba(249,115,22,0.12)', background: '#0a0f1e' }}
    >
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-mono text-xs tracking-widest text-orange-400/60 flex items-center gap-3"
          >
            {item}
            <span className="text-orange-500/30">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
