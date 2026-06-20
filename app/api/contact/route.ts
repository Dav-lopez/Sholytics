import { NextRequest, NextResponse } from 'next/server'

// ─── Types ────────────────────────────────────────────────────────────────────
interface ContactPayload {
  name: string
  org: string
  email: string
  type: string
  msg: string
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim()) return 'Name is required'
  if (!body.email?.trim() || !body.email.includes('@')) return 'Valid email is required'
  if (!body.msg?.trim()) return 'Message is required'
  return null
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: Partial<ContactPayload> = await req.json()

    const error = validate(body)
    if (error) {
      return NextResponse.json({ success: false, error }, { status: 400 })
    }

    const { name, org, email, type, msg } = body as ContactPayload

    // ── Option A: Resend (recommended — free tier 3,000 emails/mo) ────────────
    // Install: npm install resend
    // Add to .env.local: RESEND_API_KEY=re_xxxxxxxxxxxx
    // Uncomment the block below:
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'SHOLYTICS Contact Form <contact@sholytics.org>',
    //   to: ['management@sholytics.org'],
    //   replyTo: email,
    //   subject: `[${type}] New inquiry from ${name}${org ? ` — ${org}` : ''}`,
    //   html: `
    //     <h2>New Partnership Inquiry</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Organization:</strong> ${org || 'Not provided'}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Type:</strong> ${type}</p>
    //     <hr/>
    //     <p><strong>Message:</strong></p>
    //     <p>${msg.replace(/\n/g, '<br/>')}</p>
    //   `,
    // })

    // ── Option B: Zoho SMTP via Nodemailer ────────────────────────────────────
    // Install: npm install nodemailer @types/nodemailer
    // Add to .env.local:
    //   ZOHO_USER=management@sholytics.org
    //   ZOHO_PASS=your_app_password
    // Uncomment:
    //
    // import nodemailer from 'nodemailer'
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.zoho.com',
    //   port: 465,
    //   secure: true,
    //   auth: { user: process.env.ZOHO_USER, pass: process.env.ZOHO_PASS },
    // })
    // await transporter.sendMail({
    //   from: `"SHOLYTICS Website" <${process.env.ZOHO_USER}>`,
    //   to: 'management@sholytics.org',
    //   replyTo: email,
    //   subject: `[${type}] New inquiry from ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <table>
    //       <tr><td><strong>Name</strong></td><td>${name}</td></tr>
    //       <tr><td><strong>Org</strong></td><td>${org || '—'}</td></tr>
    //       <tr><td><strong>Email</strong></td><td>${email}</td></tr>
    //       <tr><td><strong>Type</strong></td><td>${type}</td></tr>
    //     </table>
    //     <p><strong>Message:</strong><br/>${msg.replace(/\n/g, '<br/>')}</p>
    //   `,
    // })

    // ── Fallback: log to console (dev/staging) ────────────────────────────────
    console.log('[SHOLYTICS Contact]', { name, org, email, type, msg })

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (err) {
    console.error('[Contact API Error]', err)
    return NextResponse.json(
      { success: false, error: 'Server error. Please email us directly at management@sholytics.org' },
      { status: 500 }
    )
  }
}
