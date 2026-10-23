// Contact form reliability: validation, spam trap, rate limit, and delivery when the email
// service is slow, failing or misconfigured. Resend is replaced by a fake fetch.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/contact/route'
import { deliver } from '@/lib/contact-delivery'
import { mailtoLink } from '@/lib/mailto'

let ipCounter = 0
const request = (body: unknown, ip = `198.51.100.${++ipCounter}`) =>
  new NextRequest('https://sholytics.org/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  })
const valid = { name: 'Ada', email: 'ada@example.com', msg: 'We would like to try DrugAI.', website: '' }
const ok = () => new Response(JSON.stringify({ id: 'email_1' }), { status: 200 })
const status = (n: number) => new Response('{"message":"x"}', { status: n })

let fetchMock: ReturnType<typeof vi.fn>
beforeEach(() => {
  fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
  vi.stubEnv('RESEND_API_KEY', 're_test')
  vi.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

describe('contact route', () => {
  it('rejects missing fields without sending', async () => {
    const res = await POST(request({ name: '', email: 'nope', msg: '' }))
    expect(res.status).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('answers the spam trap with success and sends nothing', async () => {
    const res = await POST(request({ ...valid, website: 'http://spam' }))
    expect(res.status).toBe(200)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('without an email key, refuses and gives the fallback address', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    const res = await POST(request(valid))
    const data = await res.json()
    expect(res.status).toBe(503)
    expect(data).toMatchObject({ success: false, fallbackEmail: 'management@sholytics.org' })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('sends a valid enquiry with the visitor as reply-to and escapes HTML', async () => {
    fetchMock.mockResolvedValueOnce(ok())
    const res = await POST(request({ ...valid, msg: '<script>alert(1)</script>' }))
    expect(res.status).toBe(200)
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(sent.reply_to).toBe('ada@example.com')
    expect(sent.html).toContain('&lt;script&gt;')
    expect(sent.html).not.toContain('<script>')
  })

  it('tells the visitor to try again or email when the service is down', async () => {
    fetchMock.mockResolvedValue(status(503))
    const res = await POST(request(valid))
    const data = await res.json()
    expect(res.status).toBe(503)
    expect(data.error).toMatch(/not responding/)
    expect(data.fallbackEmail).toBe('management@sholytics.org')
    expect(fetchMock).toHaveBeenCalledTimes(2)
  }, 10_000)

  it('limits one address to 5 messages in 10 minutes', async () => {
    fetchMock.mockImplementation(async () => ok())
    const ip = '203.0.113.50'
    const codes = []
    for (let i = 0; i < 6; i += 1) codes.push((await POST(request(valid, ip))).status)
    expect(codes).toEqual([200, 200, 200, 200, 200, 429])
    expect((await POST(request(valid, '203.0.113.51'))).status).toBe(200)
  })
})

describe('delivery', () => {
  const fast = { retryDelayMs: 1 }

  it('retries a server error once with the same idempotency key', async () => {
    fetchMock.mockResolvedValueOnce(status(500)).mockResolvedValueOnce(ok())
    expect(await deliver('k', {}, fast)).toBe('sent')
    const keys = fetchMock.mock.calls.map((c) => c[1].headers['Idempotency-Key'])
    expect(keys).toHaveLength(2)
    expect(keys[0]).toBe(keys[1])
  })

  it('retries a rate limit (429)', async () => {
    fetchMock.mockResolvedValueOnce(status(429)).mockResolvedValueOnce(ok())
    expect(await deliver('k', {}, fast)).toBe('sent')
  })

  it('does not retry a rejected request (bad key or unverified domain)', async () => {
    fetchMock.mockResolvedValue(status(403))
    expect(await deliver('k', {}, fast)).toBe('rejected')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('gives up after two network failures', async () => {
    fetchMock.mockRejectedValue(new TypeError('fetch failed'))
    expect(await deliver('k', {}, fast)).toBe('unavailable')
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('stops waiting for a service that hangs', async () => {
    fetchMock.mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener('abort', () => reject(init.signal?.reason))
        }),
    )
    const started = Date.now()
    expect(await deliver('k', {}, { timeoutMs: 50, retryDelayMs: 1 })).toBe('unavailable')
    expect(Date.now() - started).toBeLessThan(2000)
  })
})

describe('email fallback link', () => {
  it('encodes the subject and body', () => {
    const link = mailtoLink('Hi & welcome', 'Line 1\nLine 2?')
    expect(link).toBe('mailto:management@sholytics.org?subject=Hi%20%26%20welcome&body=Line%201%0ALine%202%3F')
  })

  it('shortens very long messages so email apps can open them', () => {
    const body = decodeURIComponent(mailtoLink('s', 'x'.repeat(5000)).split('body=')[1])
    expect(body.length).toBeLessThan(1600)
    expect(body).toContain('Message shortened')
  })
})
