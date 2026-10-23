#!/usr/bin/env node
// Launch and reliability checks for a deployed SHOLYTICS website.
//
//   npm run check:launch -- https://sholytics.org
//   npm run check:launch -- https://sholytics.org --support https://app.sholytics.org
//   npm run check:launch -- https://sholytics.org --send-test   (sends one real test enquiry)
//
// Read-only by default: the contact checks use an invalid submission and the spam trap, which
// the server answers without sending any email. Exits with 1 if anything fails.

const args = process.argv.slice(2)
const site = (args.find((a) => /^https?:\/\//.test(a)) ?? '').replace(/\/$/, '')
const supportIndex = args.indexOf('--support')
const support = supportIndex >= 0 ? (args[supportIndex + 1] ?? '').replace(/\/$/, '') : ''
const sendTest = args.includes('--send-test')

if (!site) {
  console.error('Usage: npm run check:launch -- <site url> [--support <app url>] [--send-test]')
  process.exit(2)
}

const results = []
const record = (ok, name, detail = '') => {
  results.push({ ok, name })
  console.log(`${ok === 'warn' ? '!' : ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`)
}

async function get(url, init = {}) {
  return fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20_000), ...init })
}

async function check(name, fn) {
  try {
    const out = await fn()
    if (out === true || out === undefined) record(true, name)
    else if (typeof out === 'string') record(true, name, out)
    else record(out.ok, name, out.detail)
  } catch (err) {
    record(false, name, err instanceof Error ? err.message : String(err))
  }
}

const fail = (detail) => ({ ok: false, detail })
const warn = (detail) => ({ ok: 'warn', detail })

console.log(`Checking ${site}${support ? ` with help desk ${support}` : ''}\n`)

// ─── Pages ───────────────────────────────────────────────────────────────────
let home = null
await check('Home page loads', async () => {
  home = await get(`${site}/`)
  if (home.status !== 200) return fail(`status ${home.status}`)
  const html = await home.text()
  if (!html.includes('SHOLYTICS')) return fail('page does not mention SHOLYTICS')
  if (!/rel="canonical"/.test(html)) return warn('no canonical link')
  return 'status 200'
})

await check('Privacy notice loads and states retention', async () => {
  const res = await get(`${site}/privacy`)
  if (res.status !== 200) return fail(`status ${res.status}`)
  const html = await res.text()
  return html.includes('24 months') ? 'mentions 24-month retention' : fail('24-month retention not found')
})

await check('robots.txt points to the sitemap', async () => {
  const res = await get(`${site}/robots.txt`)
  if (res.status !== 200) return fail(`status ${res.status}`)
  const text = await res.text()
  return /Sitemap:\s*https?:\/\//i.test(text) ? true : fail('no Sitemap line')
})

await check('Every sitemap address loads', async () => {
  const res = await get(`${site}/sitemap.xml`)
  if (res.status !== 200) return fail(`status ${res.status}`)
  const locs = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  if (locs.length === 0) return fail('no addresses')
  const bad = []
  for (const loc of locs) {
    const r = await get(loc)
    if (r.status !== 200) bad.push(`${loc} (${r.status})`)
  }
  return bad.length ? fail(bad.join(', ')) : `${locs.length} addresses`
})

await check('Social preview image', async () => {
  const res = await get(`${site}/opengraph-image`)
  const type = res.headers.get('content-type') ?? ''
  return res.status === 200 && type.startsWith('image/') ? type : fail(`status ${res.status} ${type}`)
})

await check('Unknown page returns 404', async () => {
  const res = await get(`${site}/this-page-does-not-exist-${Date.now()}`)
  return res.status === 404 ? true : fail(`status ${res.status}`)
})

// ─── Transport and headers ───────────────────────────────────────────────────
if (site.startsWith('https://')) {
  await check('http redirects to https', async () => {
    const res = await get(site.replace('https://', 'http://') + '/')
    const to = res.headers.get('location') ?? ''
    return [301, 307, 308].includes(res.status) && to.startsWith('https://')
      ? `${res.status} → ${to}`
      : fail(`status ${res.status} ${to}`)
  })

  const host = new URL(site).host
  const other = host.startsWith('www.') ? host.slice(4) : `www.${host}`
  await check(`${other} works`, async () => {
    const res = await get(`https://${other}/`)
    if (res.status === 200) return '200 (consider redirecting to one address)'
    const to = res.headers.get('location') ?? ''
    return [301, 307, 308].includes(res.status) ? `${res.status} → ${to}` : fail(`status ${res.status}`)
  })
}

await check('Security headers', async () => {
  const res = home ?? (await get(`${site}/`))
  const need = {
    'content-security-policy': /frame-ancestors 'none'/,
    'x-content-type-options': /nosniff/,
    'referrer-policy': /./,
    ...(site.startsWith('https://') ? { 'strict-transport-security': /max-age=\d{7,}/ } : {}),
  }
  const missing = Object.entries(need)
    .filter(([name, pattern]) => !pattern.test(res.headers.get(name) ?? ''))
    .map(([name]) => name)
  return missing.length ? fail(`missing or weak: ${missing.join(', ')}`) : true
})

// ─── Contact form ────────────────────────────────────────────────────────────
const contact = (body) =>
  get(`${site}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })

await check('Contact form rejects an empty message (no email sent)', async () => {
  const res = await contact({ name: '', email: 'not-an-email', msg: '' })
  const data = await res.json().catch(() => null)
  return res.status === 400 && data?.success === false ? `400: ${data.error}` : fail(`status ${res.status}`)
})

await check('Contact form spam trap (no email sent)', async () => {
  const res = await contact({ name: 'Launch check', email: 'check@example.com', msg: 'Spam trap test', website: 'filled' })
  return res.status === 200 ? true : fail(`status ${res.status}`)
})

if (sendTest) {
  await check('Contact form delivers a real test enquiry', async () => {
    const res = await contact({
      name: 'Launch check',
      email: 'management@sholytics.org',
      type: 'General Inquiry',
      msg: `Automated launch check from scripts/check-launch.mjs at ${new Date().toISOString()}. Safe to delete.`,
      website: '',
    })
    const data = await res.json().catch(() => null)
    if (res.status === 503 && /not available/.test(data?.error ?? ''))
      return fail('RESEND_API_KEY is not set in this deployment')
    return res.status === 200 && data?.success
      ? 'sent: confirm it arrived in the management@sholytics.org inbox'
      : fail(`status ${res.status}: ${data?.error ?? ''}`)
  })
} else {
  record('warn', 'Real delivery not tested', 'run with --send-test once after setting RESEND_API_KEY')
}

// ─── Chat (help desk in the DrugAI app) ──────────────────────────────────────
if (support) {
  const origin = new URL(site).origin
  await check('Help desk is up', async () => {
    const res = await get(`${support}/health`)
    return res.status === 200 ? true : fail(`status ${res.status}`)
  })
  await check(`Help desk allows chats from ${origin}`, async () => {
    const res = await get(`${support}/api/support/public/chat`, {
      method: 'OPTIONS',
      headers: {
        origin,
        'access-control-request-method': 'POST',
        'access-control-request-headers': 'content-type, x-support-token',
      },
    })
    const allowed = res.headers.get('access-control-allow-origin')
    return allowed === origin
      ? true
      : fail(`allowed origin is ${allowed ?? 'none'}; add ${origin} to SUPPORT_ALLOWED_ORIGINS in the app`)
  })
  await check('Help desk answers the chat status call', async () => {
    const res = await get(`${support}/api/support/public/chat`, { headers: { origin } })
    const data = await res.json().catch(() => null)
    return res.status === 200 && data && 'hoursLabel' in data ? `hours: ${data.hoursLabel}` : fail(`status ${res.status}`)
  })
  await check('Website is allowed to connect to the help desk (CSP)', async () => {
    const csp = (home ?? (await get(`${site}/`))).headers.get('content-security-policy') ?? ''
    const connect = csp.split(';').find((d) => d.trim().startsWith('connect-src')) ?? ''
    return connect.includes(new URL(support).origin)
      ? true
      : fail('connect-src does not include the help desk; set NEXT_PUBLIC_SUPPORT_API_URL and redeploy')
  })
} else {
  record('warn', 'Chat not checked', 'pass --support https://app.sholytics.org')
}

const failed = results.filter((r) => r.ok === false).length
const warned = results.filter((r) => r.ok === 'warn').length
console.log(`\n${results.length - failed - warned} passed, ${warned} to note, ${failed} failed`)
process.exit(failed ? 1 : 0)
