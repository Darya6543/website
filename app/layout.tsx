import type { Metadata } from 'next'
import { DM_Mono } from 'next/font/google'
import { AppShell } from '@/components/AppShell'
import './globals.css'

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
})

const SITE_URL = 'https://darya-goloborodko.com'
const SITE_TITLE = 'Darya Goloborodko — Game Art & Illustration'
const SITE_DESCRIPTION =
  'Portfolio of Darya Goloborodko, freelance game artist and illustrator based in Berlin. ' +
  'Co-founder and Art Lead of the indie game studio THE ROOF Interactive.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s — Darya Goloborodko',
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: 'Darya Goloborodko' }],
  keywords: ['Darya Goloborodko', 'game art', 'illustration', 'game artist', 'illustrator', 'Berlin', 'THE ROOF Interactive'],
  alternates: { canonical: '/' },
  // Link previews (WhatsApp, iMessage, LinkedIn, Facebook, …)
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Darya Goloborodko',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Flowers in the city — illustration by Darya Goloborodko' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmMono.variable}>
      <body style={{ margin: 0, background: '#ffffff' }}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
