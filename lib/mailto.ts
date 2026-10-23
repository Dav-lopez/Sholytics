// A mailto: link that opens the visitor's email app with their message already written, used
// when the contact form or chat can't deliver. Email apps truncate very long links, so the body
// is capped and says so.
export const FALLBACK_EMAIL = 'management@sholytics.org'
const MAX_BODY = 1500

export function mailtoLink(subject: string, body: string, to = FALLBACK_EMAIL): string {
  const trimmed =
    body.length > MAX_BODY ? `${body.slice(0, MAX_BODY)}\n\n[Message shortened. Please paste the rest.]` : body
  return `mailto:${to}?subject=${encodeURIComponent(subject.slice(0, 150))}&body=${encodeURIComponent(trimmed)}`
}
