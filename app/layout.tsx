import type { Metadata } from 'next'
import { DM_Mono } from 'next/font/google'
import { AppShell } from '@/components/AppShell'
import './globals.css'

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
})

export const metadata: Metadata = {
  title: 'Darya Goloborodko — Game Art & Illustration',
  description: 'Portfolio — game art and illustration',
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
