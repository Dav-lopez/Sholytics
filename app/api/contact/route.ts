import { NextRequest, NextResponse } from 'next/server'

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

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim()) return 'Name is required'
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) return 'Valid email is required'
  if (!body.msg?.trim()) return 'Message is required'
  if ((body.msg?.length ?? 0) > 5000) return 'Message is too long (5,000 characters maximum)'
  if ((body.workflow?.length ?? 0) > 3000) return 'Workflow answer is too long (3,000 characters maximum)'
  if ((body.name?.length ?? 0) > 200 || (body.org?.length ?? 0) > 200) return 'Name or organization is too long'
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
  let body: Partial<ContactPayload>
  try {
    body = await req.json()
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

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
    })

    if (!res.ok) {
      console.error('[Contact API] Resend rejected the message', res.status, await res.text())
      return NextResponse.json(
        { success: false, error: `We could not send your message. Please email us directly at ${FALLBACK_EMAIL}.` },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[Contact API Error]', err)
    return NextResponse.json(
      { success: false, error: `Server error. Please email us directly at ${FALLBACK_EMAIL}.` },
      { status: 500 },
    )
  }
}
