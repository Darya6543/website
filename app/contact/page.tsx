import type { Metadata } from 'next'
import { ContactPage } from '@/components/ContactPage'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Darya Goloborodko for game art, illustration or workshop projects.',
  alternates: { canonical: '/contact' },
}

export default function Contact() {
  return <ContactPage />
}
