// ─── CONTENT RULES ───────────────────────────────────────────────────────────
// Describe products by their real status: Prototype, Research or Concept.
// Do not claim integrations, certifications, partnerships, customers or results
// that do not exist yet, and cite a source for any market or health statistic.

export type Status = 'Prototype' | 'Research' | 'Concept'

// ─── HERO ───────────────────────────────────────────────────────────────────
export const HERO_STATS = [
  { value: 'DrugAI',  label: 'First product, now in prototype' },
  { value: 'CSV',     label: 'Starts from an inventory file, no integration needed' },
  { value: '0',       label: 'Patient records needed to use it' },
  { value: 'Open',    label: 'Design-partner program for pharmacies and hospitals' },
]

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
export const MARQUEE_ITEMS = [
  'DrugAI', 'Days-of-Supply Estimates', 'Delivery-Gap Alerts', 'Sourced Shortage Notices',
  'Ranked Review List', 'Procurement Reports', 'Audit Trail', 'Pharmacy Procurement',
  'Hospital Supply Chain', 'Clinical AI Research', 'Intelligence Exchange · Concept',
]

// ─── DRUGAI ───────────────────────────────────────────────────────────────────
export const DRUGAI_FEATURES = [
  {
    icon: '📥',
    title: 'Inventory Import',
    desc: 'Upload a CSV of stock on hand and average daily use. Every row is validated and previewed before anything is saved, and files containing patient information are rejected.',
  },
  {
    icon: '📆',
    title: 'Days of Supply and Delivery Gaps',
    desc: 'DrugAI compares how long each item should last with when the next order is due, and flags items that may run out first.',
  },
  {
    icon: '🎯',
    title: 'Ranked “Needs Review” List',
    desc: 'The items that need attention today, ranked by urgency: out of stock, potential gaps, overdue orders and low supply with nothing on order.',
  },
  {
    icon: '🧾',
    title: 'Every Alert Shows Its Working',
    desc: 'Each alert lists the inputs, the calculation, its assumptions and a suggested next step, so your team can check the estimate rather than trust a black box.',
  },
  {
    icon: '📰',
    title: 'Sourced Shortage Notices',
    desc: 'Link public shortage notices to the items they affect, with source, date and link. Older notices are flagged for a fresh check.',
  },
  {
    icon: '🔒',
    title: 'Private by Design',
    desc: 'Each organization’s data is isolated, every action is recorded in an audit log, and the first version needs no patient data at all.',
  },
]

export const DRUGAI_STATS = [
  { value: '240 ÷ 20', label: 'units on hand ÷ daily use = 12 days of supply' },
  { value: '16 − 12',  label: 'days to delivery − days of supply = 4-day gap' },
  { value: '1 list',   label: 'of what needs review today, ranked by urgency' },
  { value: 'CSV / PDF', label: 'procurement review reports for buyers' },
]

// ─── PRODUCT ROADMAP ─────────────────────────────────────────────────────────
export const DIVISIONS: {
  icon: string
  name: string
  tag: string
  status: Status
  tagline: string
  desc: string
  note: string
  color: string
}[] = [
  {
    icon: '💊',
    name: 'DrugAI',
    tag: 'Medication Supply Intelligence',
    status: 'Prototype',
    tagline: 'See supply gaps before they reach your shelf',
    desc: 'Helps pharmacy and hospital procurement teams see which medications may run out before the next delivery, why, and what to follow up on. Uses inventory files and public shortage notices; no patient data.',
    note: 'Now looking for design partners among independent pharmacies, pharmacy groups and hospital pharmacy teams.',
    color: '#FBBF24',
  },
  {
    icon: '🧬',
    name: 'MedAI Care',
    tag: 'Clinical Decision Support',
    status: 'Research',
    tagline: 'Clinical AI that keeps clinicians in control',
    desc: 'A research track exploring clinical decision support with university partners and de-identified or public datasets. Any clinical product will follow model validation and an appropriate regulatory review.',
    note: 'Research collaborations welcome. Not available as a clinical product.',
    color: '#F97316',
  },
  {
    icon: '🔗',
    name: 'Intelligence Exchange',
    tag: 'Shared Supply Signals',
    status: 'Concept',
    tagline: 'Independent by design. Connected by choice.',
    desc: 'A future, opt-in way for participating organizations to share aggregated, non-patient supply signals, so regional shortages can be seen earlier than any one organization could alone.',
    note: 'Planned only after DrugAI has active users and the governance is in place.',
    color: '#34D399',
  },
  {
    icon: '🔬',
    name: 'CancerAI',
    tag: 'Oncology Research',
    status: 'Concept',
    tagline: 'A long-term research interest',
    desc: 'A possible future research line on evidence discovery for oncology researchers. It does not diagnose or treat cancer.',
    note: 'Exploratory. Would require research partners and validated methods.',
    color: '#FB923C',
  },
  {
    icon: '🏥',
    name: 'Hospital Intelligence',
    tag: 'Operations Analytics',
    status: 'Concept',
    tagline: 'Operational visibility for hospitals',
    desc: 'A possible later product for capacity, staffing and operational reporting, considered only if DrugAI hospital users ask for it.',
    note: 'Not in development.',
    color: '#A78BFA',
  },
  {
    icon: '🧠',
    name: 'Research Intelligence',
    tag: 'Research Discovery',
    status: 'Concept',
    tagline: 'Organizing evidence for research teams',
    desc: 'A possible tool for university and research teams to find literature and datasets, with every finding traceable to its source.',
    note: 'Not in development.',
    color: '#F97316',
  },
]

// ─── TEAM ─────────────────────────────────────────────────────────────────────
// Bios describe current roles; each co-founder should confirm their own bio.
export const TEAM = [
  {
    initials: 'AA',
    name: 'Adekunle Adefabi',
    role: 'Co-Founder & CEO',
    bio: 'Leads strategy, partnerships and customer discovery, including the DrugAI design-partner program.',
  },
  {
    initials: 'IO',
    name: 'Ibrahim Olushola',
    role: 'Co-Founder & Chief Data Scientist',
    bio: 'Leads data science, including DrugAI’s forecasting methods and the clinical AI research track.',
  },
  {
    initials: 'JL',
    name: 'Jesutoba Lopez',
    role: 'Co-Founder & Head of Technology',
    bio: 'Leads product engineering and cloud infrastructure, including the DrugAI prototype.',
  },
  {
    initials: 'OO',
    name: 'Olamide Olasupo',
    role: 'Co-Founder & CFO',
    bio: 'Guides financial strategy, capital planning, grant applications and investor relations.',
  },
]

// ─── CREDIBILITY ──────────────────────────────────────────────────────────────
export const CREDENTIALS = [
  {
    icon: '🏛️',
    title: 'Registered Kentucky LLC',
    desc: 'File No. 1486154 · Commonwealth of Kentucky · Filed August 19, 2025 · Status: Active',
  },
  {
    icon: '🎓',
    title: 'Academic Research Background',
    desc: 'Founded by people with backgrounds in AI, software engineering, data science and healthcare analytics, with ties to Austin Peay State University.',
  },
  {
    icon: '🤖',
    title: 'Engineering and Data Expertise',
    desc: 'Team experience spans machine learning, data engineering, backend systems and cloud infrastructure.',
  },
  {
    icon: '🔍',
    title: 'Transparent by Default',
    desc: 'Our tools show their calculations and sources, and we label every product by its real stage: prototype, research or concept.',
  },
  {
    icon: '🎯',
    title: 'Evidence Before Claims',
    desc: 'We test with real users before scaling, and we publish results only once we have measured them.',
  },
  {
    icon: '🔒',
    title: 'Privacy-First Approach',
    desc: 'DrugAI’s first version uses no patient data. Any pilot with real organizational data will follow a security review and a written data agreement.',
  },
]

// ─── PARTNERS ─────────────────────────────────────────────────────────────────
// Kinds of organizations we want to work with. Name a specific organization here
// only once a partnership is real and they have agreed to be listed.
export const PARTNERS = [
  {
    category: 'Pharmacies',
    items: ['Independent pharmacies', 'Regional pharmacy groups', 'Pharmacy owners and managers'],
  },
  {
    category: 'Hospitals',
    items: ['Hospital pharmacy departments', 'Procurement and supply-chain teams', 'Pharmacy directors'],
  },
  {
    category: 'Research',
    items: ['University research groups', 'Health informatics labs', 'Medication-supply researchers'],
  },
  {
    category: 'Funding',
    items: ['Research grant programs', 'Startup programs', 'Mission-aligned investors'],
  },
  {
    category: 'Advisors',
    items: ['Pharmacy and supply-chain experts', 'Healthcare compliance advisors', 'Clinical research advisors'],
  },
]

// ─── CONTACT ──────────────────────────────────────────────────────────────────
export const CONTACT_CHANNELS = [
  { icon: '📧', label: 'General',      value: 'management@sholytics.org',    href: 'mailto:management@sholytics.org'    },
  { icon: '🤝', label: 'Partnerships', value: 'partnerships@sholytics.org',  href: 'mailto:partnerships@sholytics.org'  },
  { icon: '🔬', label: 'Research',     value: 'research@sholytics.org',       href: 'mailto:research@sholytics.org'      },
  { icon: '🏛️', label: 'Grants',       value: 'grants@sholytics.org',         href: 'mailto:grants@sholytics.org'        },
]

export const INQUIRY_TYPES = [
  'DrugAI Design Partner',
  'Share Your Procurement Workflow',
  'Research Collaboration',
  'University Partnership',
  'Grant Inquiry',
  'Investment Inquiry',
  'Media / Press',
  'General Inquiry',
]

export const ORG_TYPES = [
  'Independent pharmacy',
  'Pharmacy group',
  'Hospital pharmacy / procurement',
  'University or research group',
  'Investor',
  'Other',
]
