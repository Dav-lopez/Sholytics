'use client'
const FOOTER_LINKS = {
  Research: [
    'MedAI Care', 'CancerAI', 'DrugAI',
    'AIDSAI', 'America Health Grid', 'Precision Medicine',
  ],
  Company: ['About', 'Mission', 'Team', 'Credibility', 'Contact'],
  Contact: [
    { label:'management@sholytics.org',    href:'mailto:management@sholytics.org'    },
    { label:'partnerships@sholytics.org',  href:'mailto:partnerships@sholytics.org'  },
    { label:'research@sholytics.org',      href:'mailto:research@sholytics.org'      },
    { label:'grants@sholytics.org',        href:'mailto:grants@sholytics.org'        },
  ],
}

const SECTION_IDS: Record<string, string> = {
  'MedAI Care':'#medaicare','CancerAI':'#research','DrugAI':'#research',
  'AIDSAI':'#research','America Health Grid':'#research','Precision Medicine':'#research',
  'About':'#about','Mission':'#mission','Team':'#team','Credibility':'#credibility','Contact':'#contact',
}

export default function Footer() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior:'smooth' })

  return (
    <footer style={{ background:'#07101f', padding:'4rem 0 2rem', borderTop:'1px solid rgba(249,115,22,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center font-mono font-bold text-white text-sm">S</div>
              <span className="font-mono font-bold text-white tracking-[0.1em] text-[14px]">SHOLYTICS</span>
            </div>
            <p className="text-[13px] text-slate-500 leading-[1.75] mb-5">
              Advancing healthcare through AI-powered research, clinical decision support, and better patient outcomes — across America.
            </p>
            <div className="rounded-lg px-4 py-3 border" style={{ background:'rgba(249,115,22,0.05)', borderColor:'rgba(249,115,22,0.15)' }}>
              <p className="font-mono text-[10px] text-orange-500 tracking-widest uppercase mb-1">Legal</p>
              <p className="text-[12px] text-slate-500">SHOLYTICS LLC · File No. 1486154</p>
              <p className="text-[12px] text-slate-500">Commonwealth of Kentucky · Active 2025</p>
            </div>
          </div>

          {/* Research */}
          <div>
            <p className="font-mono text-[10px] text-orange-500 tracking-[0.12em] uppercase mb-5">Research</p>
            {FOOTER_LINKS.Research.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(SECTION_IDS[item] || '#research')}
                className="block text-[13px] text-slate-500 hover:text-orange-400 mb-2.5 text-left transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Company */}
          <div>
            <p className="font-mono text-[10px] text-orange-500 tracking-[0.12em] uppercase mb-5">Company</p>
            {FOOTER_LINKS.Company.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(SECTION_IDS[item] || '#')}
                className="block text-[13px] text-slate-500 hover:text-orange-400 mb-2.5 text-left transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] text-orange-500 tracking-[0.12em] uppercase mb-5">Contact</p>
            {FOOTER_LINKS.Contact.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="block text-[13px] text-slate-500 hover:text-orange-400 mb-2.5 transition-colors duration-200 break-all"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-5">
              <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest mb-1">Address</p>
              <p className="text-[12px] text-slate-600 leading-relaxed">
                271 W. Short St Ste 410<br/>Lexington, KY 40507
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-6 border-t"
          style={{ borderColor:'rgba(249,115,22,0.08)' }}
        >
          <p className="text-[12px] text-slate-600">© 2025 SHOLYTICS LLC. All rights reserved.</p>
          <p className="text-[12px] text-slate-600">Empowering Success, Igniting Innovation</p>
        </div>
      </div>
    </footer>
  )
}
