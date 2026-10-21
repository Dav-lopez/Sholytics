import { ImageResponse } from 'next/og'

export const alt = 'SHOLYTICS: healthcare intelligence, starting with DrugAI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Social preview image shown when sholytics.org is shared (LinkedIn, email, chat).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(249,115,22,0.22) 0%, #030712 62%)',
          color: '#F8FAFC',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56, height: 56, borderRadius: 14, background: '#F97316',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 34, fontWeight: 700, color: '#fff',
            }}
          >
            S
          </div>
          <div style={{ fontSize: 30, letterSpacing: 6, fontWeight: 700 }}>SHOLYTICS</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>Healthcare intelligence,</div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, color: '#FB923C' }}>
            starting with medication supply.
          </div>
          <div style={{ fontSize: 30, color: '#94A3B8', marginTop: 28 }}>
            DrugAI helps pharmacy and procurement teams see supply gaps before the next delivery.
          </div>
        </div>
        <div style={{ fontSize: 24, color: '#FB923C', letterSpacing: 3 }}>
          SHOLYTICS.ORG · DESIGN PARTNERS WELCOME
        </div>
      </div>
    ),
    size,
  )
}
