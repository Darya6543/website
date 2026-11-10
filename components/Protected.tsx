import { ProtectedClient } from './ProtectedClient'

// Keeps personal contact data (address, email) out of the page's HTML
// source, so harvesting bots that scrape the raw HTML don't find it.
// The text is base64-encoded at build time and only decoded in the
// visitor's browser after they click the "show" button.
export function Protected({ text, label }: { text: string; label: string }) {
  return <ProtectedClient encoded={Buffer.from(text, 'utf-8').toString('base64')} label={label} />
}
