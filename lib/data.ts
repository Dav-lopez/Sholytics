// ─── HERO ───────────────────────────────────────────────────────────────────
export const HERO_STATS = [
  { value: '600K+',  label: 'Cancer deaths per year in the U.S.' },
  { value: '$35B',   label: 'Annual drug shortage disruption cost' },
  { value: '60M',    label: 'Rural Americans without specialist access' },
  { value: '1.2M',   label: 'Americans living with HIV' },
]

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
export const MARQUEE_ITEMS = [
  'MedAI Care', 'CancerAI', 'DrugAI', 'AIDSAI',
  'America Health Grid', 'Precision Medicine', 'EHR Integration',
  'Genomics AI', 'Predictive Analytics', 'Clinical Decision Support',
  'Drug Shortage Prediction', 'Veteran Health AI', 'NIH Collaboration',
  'FDA Data Integration', 'CMS Value-Based Care',
]

// ─── MEDAI CARE ───────────────────────────────────────────────────────────────
export const MEDAI_FEATURES = [
  {
    icon: '🧠',
    title: 'Ensemble ML Engine',
    desc: 'Deep neural networks, random forests, and support vector machines trained on EHR data, medical imaging, genomics, and wearable device inputs — working in concert to detect patterns no single model finds alone.',
  },
  {
    icon: '📊',
    title: 'Real-Time Clinical Dashboard',
    desc: 'Dynamic dashboards give clinicians immediate visibility into patient health trends, risk scores, and treatment response — enabling faster intervention before conditions escalate.',
  },
  {
    icon: '🔬',
    title: 'NLP on Clinical Notes',
    desc: 'Advanced NLP parses unstructured clinical notes, research publications, and patient feedback to continuously refine predictive models with up-to-date evidence.',
  },
  {
    icon: '🎯',
    title: 'Patient Population Segmentation',
    desc: 'Clustering algorithms segment patients into risk cohorts based on health characteristics, enabling targeted care protocols and identification of best practices across similar cases.',
  },
  {
    icon: '🔒',
    title: 'HIPAA-Compliant Infrastructure',
    desc: 'Built on AWS and Azure with end-to-end encryption, audit trails, and SOC 2 Type II practices. Patient data never moves without explicit consent and documented authorization.',
  },
  {
    icon: '🔗',
    title: 'EHR System Integration',
    desc: 'Connects with Epic, Oracle Health, and major EHR platforms through HL7/FHIR standards. No rip-and-replace — MedAI Care works inside the systems clinicians already use.',
  },
]

export const MEDAI_STATS = [
  { value: '16.3%', label: 'U.S. digital health CAGR' },
  { value: '$85B',  label: 'U.S. market size by 2025' },
  { value: '$43B',  label: 'U.S. healthcare tech by 2025' },
  { value: '2026',  label: 'Projected break-even year' },
]

// ─── RESEARCH DIVISIONS ──────────────────────────────────────────────────────
export const DIVISIONS = [
  {
    icon: '🧬',
    name: 'MedAI Care',
    tag: 'Clinical AI',
    tagline: 'Personalized treatment intelligence',
    desc: 'Adaptive AI platform using ensemble machine learning trained on EHR data, medical imaging, genomics, and real-time wearable inputs. Personalized treatment plans delivered in real-time to clinicians.',
    stats: [
      { value: '16.3%', label: 'U.S. digital health CAGR' },
      { value: '$85B',  label: '2025 market size' },
    ],
    impact: 'Addresses one-size-fits-all treatment protocols that produce suboptimal outcomes for a significant portion of patients annually.',
    color: '#F97316',
  },
  {
    icon: '🔬',
    name: 'CancerAI',
    tag: 'Oncology AI',
    tagline: 'Earlier detection. Better outcomes.',
    desc: 'AI-assisted cancer detection through radiology imaging analysis and genomic risk stratification. Clinical trial matching engine connects patients to relevant studies faster than manual methods.',
    stats: [
      { value: '39%',  label: 'Americans diagnosed in lifetime' },
      { value: '+30%', label: '5yr survival with early detection' },
    ],
    impact: 'Over 600,000 Americans die from cancer annually. Earlier detection through AI-assisted imaging analysis is one of the most impactful interventions available.',
    color: '#FB923C',
  },
  {
    icon: '💊',
    name: 'DrugAI',
    tag: 'Supply Intelligence',
    tagline: 'Predict shortages before they harm patients',
    desc: 'Predicts national drug shortages 6–12 months before they occur using FDA shortage database signals, manufacturer production data, and hospital inventory patterns — integrating with FDA\'s CDER Direct NextGen Portal.',
    stats: [
      { value: '300+', label: 'Drugs in shortage today' },
      { value: '$35B', label: 'Annual disruption cost' },
    ],
    impact: 'Drug shortages delay or deny treatment for millions of patients — often for the most critical medications including chemotherapy agents and anesthetics.',
    color: '#FBBF24',
  },
  {
    icon: '🌍',
    name: 'AIDSAI',
    tag: 'Infectious Disease AI',
    tagline: 'HIV treatment and prevention support',
    desc: 'Treatment adherence monitoring, drug resistance forecasting, and public health spread modeling. Supports proactive outreach in underserved communities that lack regular access to infectious disease specialists.',
    stats: [
      { value: '1.2M', label: 'Americans living with HIV' },
      { value: '35K',  label: 'New preventable cases/year' },
    ],
    impact: 'New HIV infections remain concentrated in communities with the least access to specialist care. AI-assisted adherence monitoring and risk stratification can change those odds.',
    color: '#A78BFA',
  },
  {
    icon: '🏥',
    name: 'America Health Grid',
    tag: 'National AI Platform',
    tagline: 'Healthcare access for all 50 states',
    desc: 'AI-assisted telehealth triage for rural Americans, VA hospital integration, national outbreak early warning, and chronic disease prediction for underserved populations across all 50 states.',
    stats: [
      { value: '60M', label: 'Americans without specialist access' },
      { value: '340', label: 'Rural hospitals closed since 2010' },
    ],
    impact: 'Rural Americans have shorter average life expectancies than urban counterparts — a gap driven primarily by delayed diagnosis and limited specialist availability.',
    color: '#F97316',
  },
  {
    icon: '🧠',
    name: 'Precision Medicine',
    tag: 'Genomic AI',
    tagline: 'Individualized treatment from genomic data',
    desc: 'Whole-genome analysis combined with lifestyle data and medical history generates individualized treatment recommendations. Aligned with NIH All of Us Research Program and pharmacogenomics research.',
    stats: [
      { value: '$528B', label: 'Annual trial-and-error prescribing waste' },
      { value: '60%',   label: 'Patients who benefit from genomic data' },
    ],
    impact: 'The same drug at the same dose produces vastly different outcomes based on individual genetics. Precision medicine eliminates that uncertainty before prescribing.',
    color: '#34D399',
  },
]

// ─── IMPACT ───────────────────────────────────────────────────────────────────
export const IMPACT_BARS = [
  { label: 'Cancer (late-stage detection deaths)', sub: '600K deaths/yr',       width: '95%' },
  { label: 'Drug shortage patient disruptions',    sub: 'Millions affected',    width: '80%' },
  { label: 'Rural specialist access gap',          sub: '60M without access',   width: '72%' },
  { label: 'Trial-and-error prescribing waste',    sub: '$528B annually',       width: '65%' },
  { label: 'Preventable new HIV transmissions',    sub: '35K/yr',               width: '40%' },
]

export const IMPACT_ITEMS = [
  {
    icon: '🎯',
    title: 'CMS Value-Based Care Alignment',
    desc: 'SHOLYTICS platforms align with CMS Hospital Value-Based Purchasing (VBP), Hospital Readmissions Reduction (HRRP), and HAC Reduction programs — delivering quality metrics that support Medicare participation.',
  },
  {
    icon: '🔗',
    title: 'FDA Drug Shortage Integration',
    desc: "DrugAI integrates with FDA's CDER Direct NextGen Portal and public shortage database. Predictive models provide 6–12 month early warning to hospital procurement teams.",
  },
  {
    icon: '🏛️',
    title: 'NIH & NCI Research Collaboration',
    desc: 'Seeking active collaboration with NIH, NCI, and CDC to validate AI models against national health datasets and contribute to peer-reviewed clinical research.',
  },
  {
    icon: '⚕️',
    title: 'HIPAA-Compliant Infrastructure',
    desc: 'All platforms built on HIPAA-compliant cloud infrastructure with end-to-end encryption, access audit trails, and SOC 2 Type II security practices.',
  },
]

// ─── TEAM ─────────────────────────────────────────────────────────────────────
export const TEAM = [
  {
    initials: 'AA',
    name: 'Adekunle Adefabi',
    role: 'Co-Founder & CEO',
    bio: 'Provides strategic vision and organizational leadership. Leads SHOLYTICS\' mission to build AI-powered healthcare research platforms at national scale.',
  },
  {
    initials: 'IO',
    name: 'Ibrahim Olushola',
    role: 'Co-Founder & Chief Data Scientist',
    bio: 'Directs ML pipeline architecture across all six platforms. Leads the AI systems behind MedAI Care and CancerAI research infrastructure.',
  },
  {
    initials: 'JL',
    name: 'Jesutoba Lopez',
    role: 'Co-Founder & Head of Technology',
    bio: 'Builds HIPAA-compliant cloud infrastructure for global AI deployment. Leads EHR integration architecture and systems reliability.',
  },
  {
    initials: 'OO',
    name: 'Olamide Olasupo',
    role: 'Co-Founder & CFO',
    bio: 'Guides financial strategy and sustainability. Manages capital planning, grant applications, and investor relations for SHOLYTICS.',
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
    desc: 'Founded by researchers with backgrounds in AI, software engineering, data science, and healthcare analytics. APSU affiliation.',
  },
  {
    icon: '🤖',
    title: 'AI & Software Engineering Expertise',
    desc: 'Team expertise spans ML pipeline architecture, HIPAA-compliant cloud infrastructure, EHR integration, and clinical data engineering.',
  },
  {
    icon: '🏥',
    title: 'Healthcare Analytics Focus',
    desc: 'Deep domain knowledge in CMS value-based care programs, FDA drug shortage frameworks, NIH research grant structure, and clinical decision support.',
  },
  {
    icon: '🎯',
    title: 'Mission-Driven Organization',
    desc: 'Built to serve the public interest — targeting healthcare gaps that disproportionately affect rural, veteran, and underserved communities across the United States.',
  },
  {
    icon: '📋',
    title: 'Compliance-First Architecture',
    desc: 'Every platform designed from day one with HIPAA compliance, SOC 2 Type II practices, FDA data integration standards, and CMS quality reporting requirements.',
  },
]

// ─── PARTNERS ─────────────────────────────────────────────────────────────────
export const PARTNERS = [
  {
    category: 'AI & Cloud',
    items: ['Microsoft', 'Google Cloud', 'Amazon AWS', 'NVIDIA', 'OpenAI'],
  },
  {
    category: 'Healthcare Tech',
    items: ['Epic Systems', 'Oracle Health', 'Philips Healthcare', 'GE HealthCare'],
  },
  {
    category: 'Pharmaceutical',
    items: ['Pfizer', 'Moderna', 'Merck', 'Johnson & Johnson', 'Gilead Sciences'],
  },
  {
    category: 'Universities',
    items: ['Harvard Medical School', 'Stanford Medicine', 'Johns Hopkins', 'MIT', 'Vanderbilt'],
  },
  {
    category: 'Government',
    items: ['NIH', 'NCI', 'CDC', 'FDA', 'CMS'],
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
  'Research Collaboration',
  'University Partnership',
  'Government Grant Inquiry',
  'Hospital Onboarding',
  'Investment Inquiry',
  'Media / Press',
  'General Inquiry',
]
