import { NextRequest, NextResponse } from 'next/server'
import { INQUIRY_TYPES, ORG_TYPES } from '@/lib/data'
import { deliver } from '@/lib/contact-delivery'

// Two send attempts of up to 8 seconds each fit comfortably.
export const maxDuration = 30

// ─── Types ────────────────────────────────────────────────────────────────────
interface ContactPayload {
  name: string
  org: string
  orgType: string
  email: string
  type: string
  workflow: string
  msg: string
  website: string // honeypot: must stay empty
}

const FALLBACK_EMAIL = 'management@sholytics.org'
const MAX_BODY_BYTES = 20_000

// ─── Rate limiting ────────────────────────────────────────────────────────────
// Best-effort, per server instance: at most 5 submissions per IP per 10 minutes. Serverless
// platforms run several short-lived instances, so this slows down casual abuse rather than
// guaranteeing a hard limit; add a platform firewall rule (e.g. Vercel WAF rate limit on
// /api/contact) for a strict one.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }
  return false
}

function clientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(body: Partial<ContactPayload>): string | null {
  for (const key of ['name', 'org', 'orgType', 'email', 'type', 'workflow', 'msg', 'website'] as const) {
    if (body[key] !== undefined && typeof body[key] !== 'string') return 'Invalid request'
  }
  if (!body.name?.trim()) return 'Name is required'
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) return 'Valid email is required'
  if (!body.msg?.trim()) return 'Message is required'
  if ((body.msg?.length ?? 0) > 5000) return 'Message is too long (5,000 characters maximum)'
  if ((body.workflow?.length ?? 0) > 3000) return 'Workflow answer is too long (3,000 characters maximum)'
  if ((body.name?.length ?? 0) > 200 || (body.org?.length ?? 0) > 200) return 'Name or organization is too long'
  if ((body.email?.length ?? 0) > 254) return 'Email address is too long'
  if (body.orgType?.trim() && !(ORG_TYPES as readonly string[]).includes(body.orgType.trim())) return 'Choose an organization type from the list'
  if (body.type?.trim() && !(INQUIRY_TYPES as readonly string[]).includes(body.type.trim())) return 'Choose an inquiry type from the list'
  return null
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ─── Handler ──────────────────────────────────────────────────────────────────
// Sends each submission by email through Resend (https://resend.com) using its REST API.
// Required env: RESEND_API_KEY. Optional: CONTACT_TO (default management@sholytics.org),
// CONTACT_FROM (default "SHOLYTICS Website <contact@sholytics.org>"; the sending domain
// must be verified in Resend).
// Without RESEND_API_KEY the form does NOT pretend to succeed: it asks the visitor to
// email us directly, so no enquiry is silently lost.
export async function POST(req: NextRequest) {
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ success: false, error: 'Message is too large' }, { status: 413 })
  }
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many messages from your network. Please wait a few minutes, or email us at ${FALLBACK_EMAIL}.`,
      },
      { status: 429, headers: { 'Retry-After': '600' } },
    )
  }

  let body: Partial<ContactPayload>
  try {
    const raw = await req.text()
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, error: 'Message is too large' }, { status: 413 })
    }
    body = JSON.parse(raw)
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('not an object')
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot filled: almost certainly a bot. Report success so it learns nothing, send nothing.
  if (body.website?.trim()) {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  const error = validate(body)
  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[Contact API] RESEND_API_KEY is not set; submission not delivered')
    return NextResponse.json(
      {
        success: false,
        error: `Our contact form is not available right now. Please email us directly at ${FALLBACK_EMAIL}.`,
        fallbackEmail: FALLBACK_EMAIL,
      },
      { status: 503 },
    )
  }

  const name = body.name!.trim()
  const org = body.org?.trim() ?? ''
  const email = body.email!.trim()
  const type = body.type?.trim() || 'General Inquiry'
  const orgType = body.orgType?.trim() ?? ''
  const workflow = body.workflow?.trim() ?? ''
  const msg = body.msg!.trim()

  const payload = {
    from: process.env.CONTACT_FROM || 'SHOLYTICS Website <contact@sholytics.org>',
    to: [process.env.CONTACT_TO || FALLBACK_EMAIL],
    reply_to: email,
    subject: `[${type}] New inquiry from ${name}${org ? ` (${org})` : ''}`.slice(0, 200),
    html: `
          <h2>New website inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Organization:</strong> ${escapeHtml(org || 'Not provided')}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Organization type:</strong> ${escapeHtml(orgType || 'Not provided')}</p>
          <p><strong>Inquiry type:</strong> ${escapeHtml(type)}</p>
          <p><strong>Current stock-vs-delivery workflow:</strong> ${escapeHtml(workflow || 'Not provided').replace(/\n/g, '<br/>')}</p>
          <hr/>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(msg).replace(/\n/g, '<br/>')}</p>
        `,
    text: `Name: ${name}\nOrganization: ${org || 'Not provided'}\nOrganization type: ${orgType || 'Not provided'}\nEmail: ${email}\nInquiry type: ${type}\nCurrent workflow: ${workflow || 'Not provided'}\n\n${msg}`,
  }

  const outcome = await deliver(apiKey, payload)
  if (outcome === 'sent') return NextResponse.json({ success: true }, { status: 200 })
  return NextResponse.json(
    {
      success: false,
      error:
        outcome === 'rejected'
          ? `We could not send your message. Please email us directly at ${FALLBACK_EMAIL}.`
          : `Our email service is not responding. Please try again in a few minutes, or email us directly at ${FALLBACK_EMAIL}.`,
      fallbackEmail: FALLBACK_EMAIL,
    },
    { status: outcome === 'rejected' ? 502 : 503 },
  )
}
