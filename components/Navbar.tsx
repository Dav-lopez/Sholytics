'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About',     href: '#about'       },
  { label: 'MedAI Care',href: '#medaicare'   },
  { label: 'Research',  href: '#research'    },
  { label: 'Impact',    href: '#impact'      },
  { label: 'Team',      href: '#team'        },
  { label: 'Partners',  href: '#partners'    },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight active section
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(3,7,18,0.96)] backdrop-blur-xl border-b border-[rgba(249,115,22,0.13)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center font-mono font-bold text-white text-[13px] transition-transform group-hover:scale-105">
            S
          </div>
          <span className="font-mono font-bold text-white tracking-[0.1em] text-[13px]">SHOLYTICS</span>
        </button>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                activeSection === link.href.replace('#', '')
                  ? 'text-orange-400 bg-orange-500/8'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('#contact')}
            className="hidden md:block px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(249,115,22,0.35)]"
          >
            Partner With Us
          </button>
          <button
            className="lg:hidden text-slate-400 hover:text-white p-1 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t"
            style={{ background:'rgba(3,7,18,0.98)', borderColor:'rgba(249,115,22,0.13)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-0.5">
              {NAV_LINKS.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-3 px-3 rounded-lg text-slate-300 text-[15px] hover:text-white hover:bg-white/5 transition-all border-b border-white/[0.04] last:border-0"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#contact')}
                className="mt-3 w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
              >
                Partner With Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
