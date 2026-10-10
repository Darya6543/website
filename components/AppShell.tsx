import Link from 'next/link'
import { HeaderBanner } from './HeaderBanner'
import { CursorFollower } from './CursorFollower'

export function AppShell({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear()

  return (
    <div
      className="leaf-cursor bg-dots"
      style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', minHeight: '100vh' }}
    >
      <CursorFollower />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <HeaderBanner />
        {children}

        <footer style={{
          padding: '48px 24px 40px',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          marginTop: 40,
          textAlign: 'center',
          fontFamily: 'var(--font-dm-mono), monospace', fontSize: 11,
          color: '#8a8a8a', letterSpacing: '0.1em',
        }}>
          <div>© {year} · Darya Goloborodko</div>
          <div style={{ marginTop: 6 }}>made with care, in Berlin</div>
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center', gap: 18 }}>
            <Link href="/impressum" style={{ color: '#8a8a8a', textDecoration: 'none' }}>Impressum</Link>
            <Link href="/datenschutz" style={{ color: '#8a8a8a', textDecoration: 'none' }}>Datenschutz</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
