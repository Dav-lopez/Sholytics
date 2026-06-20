# SHOLYTICS LLC — Next.js 15 Website (v2)

> AI-Powered Healthcare Innovation for Research, Prevention & Better Outcomes

Official website for **SHOLYTICS LLC** and **MedAI Care**. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

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
│   ├── MedAICare.tsx        # Flagship product section
│   ├── Research.tsx         # 6-division research grid
│   ├── Impact.tsx           # Animated counter + bar charts
│   ├── Imagery.tsx          # Photo mosaic (desktop + mobile)
│   ├── Mission.tsx          # Mission statement
│   ├── Divisions.tsx        # Full division list (mobile-fixed)
│   ├── Credibility.tsx      # Why SHOLYTICS for institutions
│   ├── Team.tsx             # 4 co-founder cards
│   ├── Partners.tsx         # Partner ecosystem
│   ├── Contact.tsx          # Form → POST /api/contact
│   └── Footer.tsx           # Full footer with nav links
├── lib/
│   └── data.ts              # ALL content — edit here, not in components
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

The form submits to `/api/contact`. Choose one email provider:

### Option A — Resend (recommended, free tier: 3,000 emails/mo)

```bash
npm install resend
```

```env
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

Then uncomment the Resend block in `app/api/contact/route.ts`.

### Option B — Zoho SMTP via Nodemailer

```bash
npm install nodemailer @types/nodemailer
```

```env
# .env.local
ZOHO_USER=management@sholytics.org
ZOHO_PASS=your_zoho_app_password
```

Then uncomment the Nodemailer block in `app/api/contact/route.ts`.

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
| 5 | MedAI Care | `#medaicare` | Flagship product |
| 6 | Research | `#research` | 6 divisions grid |
| 7 | Impact | `#impact` | Animated stats |
| 8 | Imagery | `#imagery` | Photo mosaic |
| 9 | Mission | `#mission` | Statement + pills |
| 10 | Divisions | `#divisions` | List view, mobile-safe |
| 11 | Credibility | `#credibility` | For hospitals/universities |
| 12 | Team | `#team` | 4 founders |
| 13 | Partners | `#partners` | 5 target ecosystems |
| 14 | Contact | `#contact` | Live form → API |
| 15 | Footer | — | Links, legal |

---

## 🚢 Deploy to Vercel

```bash
# Push to GitHub, then:
npx vercel          # follow prompts — framework auto-detected

# Or connect via vercel.com → Import Repository → Deploy
```

Environment variables to add in Vercel dashboard:
- `RESEND_API_KEY` or `ZOHO_USER` + `ZOHO_PASS`
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
