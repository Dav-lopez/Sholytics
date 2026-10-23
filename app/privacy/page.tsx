import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy notice',
  description: 'How SHOLYTICS LLC handles information sent through sholytics.org.',
  alternates: { canonical: 'https://sholytics.org/privacy' },
}

const UPDATED = 'October 22, 2026'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <div className="space-y-3 text-[15px] leading-7 text-slate-400">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <main style={{ background: '#0a0f1e', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-16">
        <Link href="/" className="font-mono text-xs tracking-[0.12em] uppercase text-orange-500 hover:text-orange-400">
          ← SHOLYTICS
        </Link>
        <h1 className="mt-6 font-bold tracking-tight text-white" style={{ fontSize: 'clamp(2rem,4vw,2.75rem)' }}>
          Privacy notice
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated {UPDATED}</p>

        <p className="mt-8 text-[15px] leading-7 text-slate-300">
          This notice explains what SHOLYTICS LLC (&ldquo;we&rdquo;) does with information you send us
          through this website. It covers sholytics.org only. Our products, such as DrugAI, have their
          own terms for pilot and customer data.
        </p>

        <Section title="What we collect">
          <p>
            When you use the contact form we receive what you type: your name, organization, organization
            type, email address, enquiry type, your description of your current workflow, and your
            message. If you email us directly, we receive your email and its contents.
          </p>
          <p>
            If you use the chat, we receive your name (if you give it), your email address, your
            messages, the page you started from, and a one-way scrambled form of your network address
            that we use only to stop abuse. Grace, the first responder in the chat, is an AI assistant;
            when an AI provider is switched on, your messages are sent to that provider to write
            Grace&apos;s reply. Anything that looks like a date of birth, record number, ID or card
            number is removed before a message is stored. A small random key is kept in your browser so
            you can continue the chat; it is not a tracking cookie.
          </p>
          <p>
            We do not set advertising or tracking cookies, and this site does not use analytics. Our
            hosting provider keeps standard server logs (such as IP address and time of request) for
            security and reliability.
          </p>
          <p>
            <strong className="text-slate-200">Please do not send patient or health information.</strong>{' '}
            We don&apos;t need it to answer an enquiry, and the form is not designed for it.
          </p>
        </Section>

        <Section title="How we use it">
          <p>
            Only to reply to you, to follow up about your enquiry (for example, the DrugAI design-partner
            program or a research collaboration), and to keep a record of that conversation. We do not
            sell your information or use it for advertising, and we don&apos;t add you to a mailing list
            unless you ask.
          </p>
        </Section>

        <Section title="Who handles it for us">
          <p>
            Form submissions are delivered to our inbox by an email delivery provider (Resend), and the
            site is hosted by a cloud hosting provider. Chats are stored in our help desk, which runs with
            our DrugAI application on the same kind of hosting and database providers; if an AI provider is
            enabled for Grace, it processes chat messages to write replies. These providers process the information on our
            behalf to deliver the service. We don&apos;t share it with anyone else unless the law
            requires it.
          </p>
        </Section>

        <Section title="How long we keep it">
          <p>
            We keep enquiries and chats while we are in conversation with you and for up to 24 months afterwards,
            then delete them, unless you become a customer or partner and a separate agreement applies.
          </p>
        </Section>

        <Section title="Your choices">
          <p>
            You can ask us what we hold about you, or ask us to correct or delete it, at any time by
            emailing{' '}
            <a href="mailto:management@sholytics.org" className="text-orange-500 hover:text-orange-400">
              management@sholytics.org
            </a>
            . We&apos;ll respond within 30 days.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            SHOLYTICS LLC, 271 W. Short St Ste 410, Lexington, KY 40507 ·{' '}
            <a href="mailto:management@sholytics.org" className="text-orange-500 hover:text-orange-400">
              management@sholytics.org
            </a>
          </p>
          <p>If we change this notice, we&apos;ll update the date at the top of this page.</p>
        </Section>
      </div>
    </main>
  )
}
