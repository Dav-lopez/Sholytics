'use client'
// SHOLYTICS Support chat for sholytics.org. The conversation lives in the SHOLYTICS help desk
// (hosted with the DrugAI app), so the same team answers chats from the website and the apps.
// Grace, an AI assistant, answers first; visitors can ask for a person at any time.
//
// Set NEXT_PUBLIC_SUPPORT_API_URL to the app's address (e.g. https://app.sholytics.org). The app
// must list this site in SUPPORT_ALLOWED_ORIGINS (sholytics.org and www are allowed by default).
import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { FALLBACK_EMAIL, mailtoLink } from '@/lib/mailto'

const API = process.env.NEXT_PUBLIC_SUPPORT_API_URL?.replace(/\/$/, '') ?? ''
const TOKEN_KEY = 'sholytics-support-token'
const POLL_MS = 4000
const REQUEST_TIMEOUT_MS = 15_000
/** Consecutive failed refreshes before we tell the visitor the connection is having trouble. */
const POLL_FAILURES_BEFORE_NOTICE = 3

/**
 * The help desk can't be reached: offline, timed out, or a server error. Different from a
 * refusal (validation, rate limit), which has a message for the visitor and won't be fixed by
 * emailing instead.
 */
class ChatUnavailable extends Error {}

type Message = {
  id: string
  role: 'customer' | 'bot' | 'agent' | 'system' | 'note'
  authorName: string
  body: string
  redacted: boolean
  createdAt: string
}
type Conversation = {
  id: string
  status: 'bot' | 'waiting' | 'agent' | 'closed'
  assignedToName: string | null
  rating: number | null
  open: boolean
  hoursLabel: string
  messages: Message[]
}

function readToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}
function writeToken(token: string | null) {
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token)
    else window.localStorage.removeItem(TOKEN_KEY)
  } catch {
    // Private browsing: the chat still works until the page is closed.
  }
}

async function call<T>(path: string, token: string | null, body?: unknown): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API}${path}`, {
      method: body === undefined ? 'GET' : 'POST',
      headers: {
        ...(body === undefined ? {} : { 'content-type': 'application/json' }),
        ...(token ? { 'x-support-token': token } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
  } catch {
    throw new ChatUnavailable('Chat is unavailable right now.')
  }
  const data = await res.json().catch(() => null)
  if (res.status >= 500 || (!res.ok && data === null)) throw new ChatUnavailable('Chat is unavailable right now.')
  if (!res.ok) {
    const fields = data?.errors ? Object.values(data.errors as Record<string, string>)[0] : null
    throw new Error(data?.error || fields || 'Something went wrong. Please try again.')
  }
  return data as T
}

function statusLine(c: Conversation | null, open: boolean, hours: string) {
  if (!c || c.status === 'bot') return 'Grace, our AI assistant, answers first. A person is a tap away.'
  if (c.status === 'waiting')
    return open ? 'Waiting for someone from the SHOLYTICS team…' : `Our team is away (${hours}). We’ll reply by email.`
  if (c.status === 'agent') return `${c.assignedToName ?? 'The SHOLYTICS team'} is helping you.`
  return 'This chat has ended.'
}

const LINK = /(https:\/\/[^\s)]+)/g
function Linkified({ text }: { text: string }) {
  return (
    <>
      {text.split(LINK).map((part, i) =>
        i % 2 === 1 ? (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [teamOpen, setTeamOpen] = useState(true)
  const [hours, setHours] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // The help desk couldn't be reached; offer email instead of a dead end.
  const [unavailable, setUnavailable] = useState(false)
  const [pollFailures, setPollFailures] = useState(0)
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => setToken(readToken()), [])

  const load = useCallback(async () => {
    try {
      const data = await call<{ conversation: Conversation | null; open: boolean; hoursLabel: string }>(
        `/api/support/public/chat${open ? '?seen=1' : ''}`,
        token,
      )
      setConversation(data.conversation)
      setTeamOpen(data.open)
      setHours(data.hoursLabel)
      setUnavailable(false)
      setPollFailures(0)
      if (token && !data.conversation) {
        writeToken(null)
        setToken(null)
      }
    } catch (err) {
      // Keep polling; after a few misses in a row, say so.
      setPollFailures((n) => n + 1)
      if (err instanceof ChatUnavailable) setUnavailable(true)
    }
  }, [open, token])

  const status = conversation?.status ?? null
  const active = status !== null && status !== 'closed'
  useEffect(() => {
    if (!open || !API) return
    load()
    if (!token || !active) return
    const timer = window.setInterval(load, POLL_MS)
    return () => window.clearInterval(timer)
  }, [open, token, active, load])

  const count = conversation?.messages.length ?? 0
  useEffect(() => {
    if (count) end.current?.scrollIntoView({ block: 'end' })
  }, [count])

  if (!API) return null

  async function start(event: FormEvent) {
    event.preventDefault()
    if (!draft.trim()) return setError('Type your question.')
    if (!email.trim()) return setError('Enter your email so we can reply.')
    setBusy(true)
    setError(null)
    try {
      const data = await call<{ conversation: Conversation; token: string }>('/api/support/public/chat', null, {
        message: draft,
        name: name || undefined,
        email,
        page: window.location.pathname,
        product: 'website',
      })
      writeToken(data.token)
      setToken(data.token)
      setConversation(data.conversation)
      setDraft('')
      setUnavailable(false)
    } catch (err) {
      if (err instanceof ChatUnavailable) setUnavailable(true)
      else setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  async function send(event?: FormEvent) {
    event?.preventDefault()
    if (!draft.trim() || busy) return
    setBusy(true)
    setError(null)
    try {
      setConversation(await call<Conversation>('/api/support/public/chat/messages', token, { message: draft }))
      setDraft('')
      setPollFailures(0)
    } catch (err) {
      // The draft is kept so nothing the visitor typed is lost.
      if (err instanceof ChatUnavailable) {
        setPollFailures(POLL_FAILURES_BEFORE_NOTICE)
        setError('Your message didn’t send because chat is unavailable right now. Try again, or email us.')
      } else setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  async function act(body: { action: 'handoff' | 'close' } | { action: 'rate'; rating: 1 | -1 }) {
    setBusy(true)
    setError(null)
    try {
      setConversation(await call<Conversation>('/api/support/public/chat/action', token, body))
    } catch (err) {
      setError(
        err instanceof ChatUnavailable
          ? 'Chat is unavailable right now. Try again in a moment, or email us.'
          : (err as Error).message,
      )
    } finally {
      setBusy(false)
    }
  }

  const emailInstead = () =>
    mailtoLink(
      'Website chat',
      [draft.trim() || 'Hello,', '', name.trim() && `Name: ${name.trim()}`].filter(Boolean).join('\n'),
    )

  function newChat() {
    writeToken(null)
    setToken(null)
    setConversation(null)
    setError(null)
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (conversation) send()
    }
  }

  const field =
    'w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-200 outline-none placeholder-slate-500 focus:border-orange-500/60'

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="sholytics-chat"
        className={`fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 ${open ? 'max-sm:hidden' : ''}`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />}
        </svg>
        {open ? 'Close chat' : 'Chat with us'}
      </button>

      {open && (
        <section
          id="sholytics-chat"
          aria-label="Chat with SHOLYTICS"
          className="fixed inset-x-0 bottom-0 z-[70] flex h-[85dvh] flex-col border border-white/10 bg-[#0a0f1e] font-grotesk text-slate-200 shadow-2xl sm:inset-x-auto sm:bottom-20 sm:right-5 sm:h-[min(620px,calc(100dvh-7rem))] sm:w-[380px] sm:rounded-2xl"
        >
          <header className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-white">SHOLYTICS</h2>
              <p className="text-xs text-slate-400">
                {unavailable && !conversation ? 'Chat is offline. Email reaches the same team.' : statusLine(conversation, teamOpen, hours)}
              </p>
            </div>
            <button type="button" aria-label="Close chat" onClick={() => setOpen(false)} className="rounded-md p-1 text-slate-400 hover:bg-white/5 hover:text-white">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          {!conversation && unavailable ? (
            <div role="alert" className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
              <p className="text-sm font-medium text-white">Chat is unavailable right now.</p>
              <p className="text-sm leading-6 text-slate-400">
                We can’t reach our help desk at the moment. Email us instead and the SHOLYTICS team will reply
                by email.
              </p>
              <a
                href={emailInstead()}
                className="rounded-xl bg-orange-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Email {FALLBACK_EMAIL}
              </a>
              {draft.trim() && <p className="text-[11px] text-slate-500">Your question is copied into the email.</p>}
              <button
                type="button"
                onClick={() => {
                  setUnavailable(false)
                  void load()
                }}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
              >
                Try chat again
              </button>
              <p className="text-[11px] leading-5 text-slate-500">
                Or use the <a href="#contact" onClick={() => setOpen(false)} className="text-orange-500 hover:text-orange-400">contact form</a>.
              </p>
            </div>
          ) : !conversation ? (
            <form onSubmit={start} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" noValidate>
              <p className="text-sm font-medium text-white">Hi, I’m Grace, SHOLYTICS’s AI assistant.</p>
              <p className="text-sm leading-6 text-slate-400">
                Ask about DrugAI, the design-partner program, our research or how to get started. I’ll answer what I
                can, and you can ask for a person at any time.
              </p>
              <p className="font-mono text-[11px] text-slate-500">
                {teamOpen ? 'Team available now' : 'Team away now — we reply by email'}
                {hours ? ` · ${hours}` : ''}
              </p>
              <label className="grid gap-1 text-xs text-slate-400">
                Name (optional)
                <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={120} />
              </label>
              <label className="grid gap-1 text-xs text-slate-400">
                Email, so we can reply
                <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required maxLength={200} />
              </label>
              <label className="grid gap-1 text-xs text-slate-400">
                Your question
                <textarea className={`${field} resize-none`} rows={3} value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={2000} required />
              </label>
              {error && <p role="alert" className="text-xs text-red-400">{error}</p>}
              <button type="submit" disabled={busy} className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60">
                {busy ? 'Starting…' : 'Start chat'}
              </button>
              <p className="text-[11px] leading-5 text-slate-500">
                Please don’t share patient or health information. See our{' '}
                <a href="/privacy" className="text-orange-500 hover:text-orange-400">privacy notice</a>.
              </p>
            </form>
          ) : (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3" aria-live="polite">
                <div className="grid content-start gap-3">
                  {conversation.messages.map((m) =>
                    m.role === 'system' ? (
                      <p key={m.id} className="mx-auto max-w-[90%] rounded-md bg-white/5 px-3 py-1.5 text-center text-xs text-slate-400">
                        {m.body}
                      </p>
                    ) : (
                      <div key={m.id} className={`flex max-w-[88%] flex-col gap-1 ${m.role === 'customer' ? 'ml-auto items-end' : 'items-start'}`}>
                        <span className="text-[11px] text-slate-500">
                          {m.role === 'customer' ? 'You' : m.authorName} ·{' '}
                          {new Date(m.createdAt).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                        </span>
                        <div
                          className={`whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm leading-6 ${
                            m.role === 'customer'
                              ? 'bg-orange-500 text-white'
                              : m.role === 'bot'
                                ? 'bg-white/[0.06] text-slate-200'
                                : 'border border-orange-500/30 bg-orange-500/10 text-slate-100'
                          }`}
                        >
                          <Linkified text={m.body} />
                        </div>
                        {m.redacted && <span className="text-[11px] text-slate-500">Personal details removed</span>}
                      </div>
                    ),
                  )}
                  <div ref={end} />
                </div>
              </div>

              {status === 'closed' && (
                <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-2 text-xs text-slate-400">
                  {conversation.rating === null ? (
                    <>
                      Was this helpful?
                      <button type="button" disabled={busy} onClick={() => act({ action: 'rate', rating: 1 })} className="rounded-lg border border-white/10 px-2 py-1 hover:bg-white/5">Yes</button>
                      <button type="button" disabled={busy} onClick={() => act({ action: 'rate', rating: -1 })} className="rounded-lg border border-white/10 px-2 py-1 hover:bg-white/5">No</button>
                    </>
                  ) : (
                    'Thanks for the feedback.'
                  )}
                  <button type="button" onClick={newChat} className="ml-auto text-orange-500 hover:text-orange-400">Start a new chat</button>
                </div>
              )}

              <form onSubmit={send} className="grid gap-2 border-t border-white/10 px-4 py-3">
                {pollFailures >= POLL_FAILURES_BEFORE_NOTICE && (
                  <p role="status" className="rounded-lg bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                    Connection problem — we’re retrying. If it’s urgent,{' '}
                    <a href={emailInstead()} className="font-semibold underline underline-offset-2">email us</a>.
                  </p>
                )}
                {error && <p role="alert" className="text-xs text-red-400">{error}</p>}
                <div className="flex items-end gap-2">
                  <textarea
                    aria-label="Your message"
                    rows={2}
                    maxLength={2000}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={status === 'closed' ? 'Write again to reopen…' : 'Type your message…'}
                    className={`${field} resize-none`}
                  />
                  <button type="submit" aria-label="Send" disabled={busy || !draft.trim()} className="rounded-xl bg-orange-500 p-2.5 text-white transition hover:bg-orange-600 disabled:opacity-50">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m22 2-7 20-4-9-9-4 20-7zM22 2 11 13" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[11px] text-slate-500">Please don’t share patient details.</p>
                  <div className="flex gap-1">
                    {status === 'bot' && (
                      <button type="button" disabled={busy} onClick={() => act({ action: 'handoff' })} className="rounded-lg border border-white/15 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/5">
                        Talk to a person
                      </button>
                    )}
                    {active && (
                      <button type="button" disabled={busy} onClick={() => act({ action: 'close' })} className="rounded-lg px-2.5 py-1.5 text-xs text-slate-400 hover:bg-white/5">
                        End chat
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </>
          )}
        </section>
      )}
    </>
  )
}
