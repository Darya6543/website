'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { id: 'gallery', label: 'gallery', href: '/' },
  { id: 'about',   label: 'about',   href: '/about' },
  { id: 'contact', label: 'contact', href: '/contact' },
]

export function HeaderBanner() {
  const pathname = usePathname()
  const active = pathname === '/about' ? 'about' : pathname === '/contact' ? 'contact' : 'gallery'

  return (
    <header style={{
      padding: '48px 32px 24px',
      textAlign: 'right',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
    }}>
      <h1 style={{
        fontFamily: "'Kyiv Region', serif", fontWeight: 400,
        fontSize: 48, letterSpacing: '0.01em',
        margin: 0, color: '#141414', lineHeight: 1,
      }}>
        Darya Goloborodko
      </h1>
      <div style={{
        fontFamily: 'var(--font-dm-mono), monospace',
        fontSize: 13, letterSpacing: '0.08em', color: '#8a8a8a', marginTop: 8,
      }}>
        Game Art and Illustration
      </div>

      {/* Menu */}
      <nav style={{
        display: 'flex', justifyContent: 'flex-end', gap: 28,
        fontFamily: 'var(--font-dm-mono), monospace', fontSize: 12,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        marginTop: 22,
      }}>
        {NAV.map((m) => (
          <Link key={m.id} href={m.href} style={{
            textDecoration: 'none',
            fontFamily: 'var(--font-dm-mono), monospace',
            fontSize: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: active === m.id ? '#141414' : '#9a9a9a',
            borderBottom: active === m.id ? '1.5px solid #141414' : '1.5px solid transparent',
            paddingBottom: 4,
          }}>
            {m.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
