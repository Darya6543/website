import type { Metadata } from 'next'
import { ImpressumPage } from '@/components/ImpressumPage'

// Keeps this page (with address and contact details) out of search results.
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function Impressum() {
  return <ImpressumPage />
}
