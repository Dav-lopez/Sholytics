'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1000&q=80',
    alt: 'Clinician reviewing AI-powered patient dashboard',
    label: 'MedAI Care',
    sub: 'Real-time clinical decision support',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=700&q=80',
    alt: 'Cancer research and imaging laboratory',
    label: 'CancerAI',
    sub: 'AI-assisted early detection',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&q=80',
    alt: 'Hospital pharmacy and drug supply',
    label: 'DrugAI',
    sub: 'Supply chain intelligence',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=700&q=80',
    alt: 'Rural telehealth consultation',
    label: 'America Health Grid',
    sub: 'Rural & veteran healthcare access',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=700&q=80',
    alt: 'DNA sequencing and genomics',
    label: 'Precision Medicine',
    sub: 'Genomic AI analysis',
    tall: false,
  },
]

export default function Imagery() {
  return (
    <section id="imagery" style={{ background: '#0a0f1e', padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <p className="font-mono text-xs text-orange-500 tracking-[0.12em] uppercase mb-3">
              Healthcare AI in Practice
            </p>
            <h2 className="font-bold leading-tight tracking-tight" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
              From research to real lives
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-xs leading-relaxed md:text-right">
            Each platform targets a distinct clinical environment — from hospital floors to rural telehealth.
          </p>
        </motion.div>

        {/* Desktop mosaic — CSS classes only, no inline grid-template-rows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="hidden md:grid rounded-2xl overflow-hidden imagery-mosaic"
        >
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden group ${img.tall ? 'imagery-tall' : ''}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                style={{ filter: 'saturate(0.75) brightness(0.88)' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 flex items-end p-5"
                style={{ background: 'linear-gradient(to top, rgba(3,7,18,0.88) 0%, rgba(3,7,18,0.2) 50%, transparent 100%)' }}
              >
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">{img.label}</p>
                  <p className="font-mono text-[11px] text-slate-400 mt-0.5">{img.sub}</p>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-orange-500/0 group-hover:border-orange-500/20 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </motion.div>

        {/* Mobile: simple stacked grid */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl ${i === 0 ? 'col-span-2 h-52' : 'h-40'}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                style={{ filter: 'saturate(0.8)' }}
                sizes="50vw"
              />
              <div
                className="absolute inset-0 flex items-end p-3"
                style={{ background: 'linear-gradient(to top, rgba(3,7,18,0.85) 0%, transparent 55%)' }}
              >
                <div>
                  <p className="text-white text-[13px] font-semibold">{img.label}</p>
                  <p className="font-mono text-[10px] text-slate-400">{img.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
