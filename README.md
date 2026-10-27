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
├── scripts/
│   └── check-launch.mjs     # Post-deploy checks: npm run check:launch -- <url>
├── tests/                   # npm test (contact form and email fallback)
└── .env.local.example       # Copy to .env.local and add keys
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

**When email delivery fails.** Each attempt to send waits at most 8 seconds. A timeout, network
error, 429 or 5xx from Resend is tried once more with the same `Idempotency-Key`, so the enquiry
is never sent twice. If it still fails, or Resend rejects it (bad key, unverified domain), the
visitor is told so and offered **Open this message in your email app**, which opens an email to
management@sholytics.org with their message already written. Nothing they typed is lost.

---

## 💬 Chat (SHOLYTICS Support)

The “Chat with us” button opens the SHOLYTICS help desk, which is hosted by the DrugAI app so the
same team answers chats from the website and the apps. Grace, an AI assistant, answers first;
visitors can ask for a person at any time, and staff reply from **Admin → Support inbox** in the app.

Set one variable in Vercel (the button stays hidden until it is set):

```env
NEXT_PUBLIC_SUPPORT_API_URL=https://app.sholytics.org   # the DrugAI app's address
```

The app accepts chats from `https://sholytics.org` and `https://www.sholytics.org` by default; other
sites are added with `SUPPORT_ALLOWED_ORIGINS` in the app's settings.

**If the app is down**, the chat doesn't dead-end: opening it shows *Chat is unavailable right
now* with an **Email management@sholytics.org** button (their question copied in) and the contact
form, which doesn't depend on the app. In a chat that loses its connection, a notice appears after
three missed updates, unsent messages stay in the box, and it recovers by itself.

The site's Content-Security-Policy only allows connections to this site and
`NEXT_PUBLIC_SUPPORT_API_URL`, which is read at build time: change it, then redeploy.

---

## ✅ Launch checks

After every production deploy (and once after DNS changes):

```bash
npm run check:launch -- https://sholytics.org --support https://app.sholytics.org
```

It checks pages, the privacy notice, robots and sitemap (every address loads), the social image,
404s, https redirect, the www address, security headers, that the contact form validates and
traps spam (without sending email), and that the help desk is up, allows this site, answers, and
is allowed by the site's CSP. Exit code 1 means something failed.

Once after setting up Resend, add `--send-test` to send one real enquiry, then confirm it arrived
in the management@sholytics.org inbox.

### Keeping the 24-month privacy promise

The privacy notice says enquiries and chats are deleted 24 months after the conversation ends.

- **Chats** live in the DrugAI app, whose daily check deletes them automatically.
- **Contact-form enquiries** arrive as emails, so they are deleted by hand: every quarter, in the
  management@sholytics.org mailbox, delete website enquiries (subjects start with the inquiry type
  in brackets) older than 24 months, unless the sender became a customer or partner. Also check
  how long Resend keeps sent-email logs in its dashboard and keep it at or below 24 months.

## 🧪 Tests

```bash
npm test        # contact form: validation, spam trap, rate limit, retries, timeouts, email fallback
npm run lint
```

## 🔍 SEO Checklist

- [x] Full `metadata` with `metadataBase`, `openGraph`, `twitter`, `robots`, `alternates`
- [x] `public/sitemap.xml` — update `lastmod` dates on content changes
- [x] `public/robots.txt`
- [x] `public/favicon.svg`
- [x] Social preview image generated by `app/opengraph-image.tsx` (1200×630)
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
| 9 | Credibility | `#credibility` | For hospitals/universities |
| 10 | Team | `#team` | 4 founders |
| 11 | Partners | `#partners` | Kinds of partners sought (no named organizations) |
| 12 | Contact | `#contact` | Live form → API |
| 13 | Footer | — | Links, legal |

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
- `NEXT_PUBLIC_SUPPORT_API_URL` (the DrugAI app's address, for the chat)

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

## Healthcare portfolio section
The public roadmap lists DrugAI and eight independent development repositories, with source links and conservative prototype labels. These are not links to live deployments. No real patient information, clinical efficacy or production readiness is claimed. Run `npm run build`, `npm run lint`, and `npm test` before merging. Update portfolio copy only after verifying implemented capabilities.
