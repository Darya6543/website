import type { Metadata } from 'next'
import { DatenschutzPage } from '@/components/DatenschutzPage'

// Keeps this page (with address and contact details) out of search results.
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function Datenschutz() {
  return <DatenschutzPage />
}
