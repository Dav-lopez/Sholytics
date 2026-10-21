# SHOLYTICS LLC — Next.js 15 Website (v2)

> AI-Powered Healthcare Innovation for Research, Prevention & Better Outcomes

Official website for **SHOLYTICS LLC** and its first product, **DrugAI** (medication supply intelligence). Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

---

## 🚀 Quick Start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve production build
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 15** | React framework, App Router, API Routes |
| **TypeScript** | Type safety across all components |
| **Tailwind CSS 3.4** | Utility-first styling |
| **Framer Motion 11** | Scroll reveals, entrance animations |
| **Lucide React** | Icons (navbar menu/close) |

---

## 📁 Project Structure

```
sholytics/
├── app/
│   ├── layout.tsx           # Root layout — full SEO metadata
│   ├── page.tsx             # Homepage (assembles all sections)
│   └── api/
│       └── contact/
│           └── route.ts     # POST /api/contact — form submission
├── components/
│   ├── Navbar.tsx           # Fixed nav — active section highlighting
│   ├── Hero.tsx             # Particle canvas + revised headline
│   ├── Marquee.tsx          # Scrolling platform ticker
│   ├── About.tsx            # Company overview + Why SHOLYTICS
│   ├── DrugAI.tsx           # First product section (prototype)
│   ├── Research.tsx         # Product roadmap with status labels
│   ├── Imagery.tsx          # Photo mosaic (desktop + mobile)
│   ├── Mission.tsx          # Mission statement
│   ├── Divisions.tsx        # Full division list (mobile-fixed)
│   ├── Credibility.tsx      # Why SHOLYTICS for institutions
│   ├── Team.tsx             # 4 co-founder cards
│   ├── Partners.tsx         # Partner ecosystem
│   ├── Contact.tsx          # Form → POST /api/contact
│   └── Footer.tsx           # Full footer with nav links
├── lib/
│   └── data.ts              # ALL content — edit here, not in components (see content rules at the top)
├── styles/
│   └── globals.css          # Design tokens, animations, utilities
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── .env.local.example       # Copy to .env.local and add keys
└── vercel.json
```

---

## ✉️ Activating the Contact Form

The form posts to `/api/contact`, which sends each enquiry by email through
[Resend](https://resend.com) using its REST API (no extra package needed).

1. Create a Resend account and verify `sholytics.org` as a sending domain.
2. Add these environment variables in Vercel (and `.env.local` for local testing):

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_TO=management@sholytics.org
CONTACT_FROM=SHOLYTICS Website <contact@sholytics.org>
```

Until `RESEND_API_KEY` is set, the form shows visitors a message asking them to email
management@sholytics.org directly, rather than reporting success for a message that
was never delivered.

---

## 🔍 SEO Checklist

- [x] Full `metadata` with `metadataBase`, `openGraph`, `twitter`, `robots`, `alternates`
- [x] `public/sitemap.xml` — update `lastmod` dates on content changes
- [x] `public/robots.txt`
- [x] `public/favicon.svg`
- [ ] Add `public/og-image.png` (1200×630px) for social sharing
- [ ] Submit sitemap to Google Search Console after deployment

---

## 📐 Page Sections (in order)

| # | Section | ID | Notes |
|---|---------|----|----|
| 1 | Navbar | — | Active section highlight |
| 2 | Hero | `#hero` | Particle canvas, revised copy |
| 3 | Marquee | — | Platform ticker |
| 4 | About | `#about` | Who/why/what |
| 5 | DrugAI | `#drugai` | First product (prototype) |
| 6 | Roadmap | `#research` | Products with Prototype / Research / Concept status |
| 7 | Imagery | `#imagery` | Photo mosaic |
| 8 | Mission | `#mission` | Statement + pills |
| 9 | Divisions | `#divisions` | List view, mobile-safe |
| 10 | Credibility | `#credibility` | For hospitals/universities |
| 11 | Team | `#team` | 4 founders |
| 12 | Partners | `#partners` | Kinds of partners sought (no named organizations) |
| 13 | Contact | `#contact` | Live form → API |
| 14 | Footer | — | Links, legal |

---

## 🚢 Deploy to Vercel

```bash
# Push to GitHub, then:
npx vercel          # follow prompts — framework auto-detected

# Or connect via vercel.com → Import Repository → Deploy
```

Environment variables to add in Vercel dashboard:
- `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`
- `NEXT_PUBLIC_SITE_URL=https://sholytics.org`

---

## 🏢 Company

**SHOLYTICS LLC**
File No. 1486154 · Commonwealth of Kentucky
Filed: August 19, 2025 · Status: Active
271 W. Short St Ste 410, Lexington, KY 40507

| Purpose | Email |
|---------|-------|
| General | management@sholytics.org |
| Partnerships | partnerships@sholytics.org |
| Research | research@sholytics.org |
| Grants | grants@sholytics.org |
| Careers | careers@sholytics.org |

---

© 2025 SHOLYTICS LLC. All rights reserved.
