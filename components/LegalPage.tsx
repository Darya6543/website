const H2: React.CSSProperties = {
  fontFamily: 'var(--font-dm-mono), monospace', fontWeight: 500,
  fontSize: 18, color: '#141414', marginTop: 36, marginBottom: 10,
}

const P: React.CSSProperties = {
  fontFamily: 'var(--font-dm-mono), monospace', fontSize: 14, lineHeight: 1.7,
  color: '#2a2a2a', marginTop: 0, marginBottom: 12,
}

export function LegalHeading({ children }: { children: React.ReactNode }) {
  return <h2 style={H2}>{children}</h2>
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return <p style={P}>{children}</p>
}

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '60px 24px 100px', maxWidth: 680, margin: '0 auto' }}>
      <h1 style={{
        fontFamily: 'var(--font-dm-mono), monospace', fontWeight: 500,
        fontSize: 32, margin: 0, lineHeight: 1.1, letterSpacing: '-0.01em',
        color: '#141414',
      }}>
        {title}
      </h1>
      {children}
    </div>
  )
}
