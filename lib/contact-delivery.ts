// Sends website enquiries through Resend (https://resend.com) using its REST API.

const SEND_TIMEOUT_MS = 8_000
const RETRY_DELAY_MS = 600

/**
 * Send through Resend, waiting at most 8 seconds per attempt. A timeout, network failure,
 * 429 or 5xx is tried once more; the same Idempotency-Key makes sure Resend sends the email
 * only once even if the first attempt actually got through. A 4xx (bad key, unverified
 * domain) is not retried: it won't fix itself.
 */
export async function deliver(
  apiKey: string,
  payload: Record<string, unknown>,
  options: { timeoutMs?: number; retryDelayMs?: number } = {},
): Promise<'sent' | 'rejected' | 'unavailable'> {
  const idempotencyKey = `contact-${crypto.randomUUID()}`
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(options.timeoutMs ?? SEND_TIMEOUT_MS),
      })
      if (res.ok) return 'sent'
      const detail = await res.text().catch(() => '')
      console.error('[Contact API] Resend returned', res.status, detail.slice(0, 500))
      if (res.status !== 429 && res.status < 500) return 'rejected'
    } catch (err) {
      console.error(`[Contact API] Resend attempt ${attempt} failed`, err)
    }
    if (attempt === 1) await new Promise((r) => setTimeout(r, options.retryDelayMs ?? RETRY_DELAY_MS))
  }
  return 'unavailable'
}

