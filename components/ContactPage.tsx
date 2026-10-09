'use client'

import { useState } from 'react'

const CONTACT_EMAIL = 'dashagoloborodko@gmail.com'

const FIELD_LABEL: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: 8,
  fontFamily: 'var(--font-dm-mono), monospace', fontSize: 11,
  letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a',
}

const FIELD_INPUT: React.CSSProperties = {
  fontFamily: 'var(--font-dm-mono), monospace', fontSize: 15, color: '#141414',
  padding: '10px 12px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: 6,
}

export function ContactPage() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'website visitor'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <div style={{ padding: '60px 24px 100px', maxWidth: 640, margin: '0 auto' }}>
      <div style={{
        fontFamily: 'var(--font-dm-mono), monospace', fontSize: 11,
        letterSpacing: '0.24em', textTransform: 'uppercase',
        color: '#9a9a9a', marginBottom: 14,
      }}>
        get in touch
      </div>

      <h1 style={{
        fontFamily: 'var(--font-dm-mono), monospace', fontWeight: 500,
        fontSize: 40, margin: 0, lineHeight: 1.1, letterSpacing: '-0.01em',
        color: '#141414',
      }}>
        Contact me
      </h1>

      <p style={{
        fontFamily: 'var(--font-dm-mono), monospace', fontSize: 14, lineHeight: 1.7,
        color: '#2a2a2a', marginTop: 18,
      }}>
        Got a project, a workshop idea, or just want to say hi? Send me a message below.
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <label style={FIELD_LABEL}>
          Name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={FIELD_INPUT}
          />
        </label>

        <label style={FIELD_LABEL}>
          Your message
          <textarea
            required
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ ...FIELD_INPUT, resize: 'vertical' }}
          />
        </label>

        <button
          type="submit"
          style={{
            alignSelf: 'flex-start',
            padding: '12px 26px', borderRadius: 999,
            background: '#141414', color: '#ffffff', border: 0, cursor: 'pointer',
            fontFamily: 'var(--font-dm-mono), monospace', fontSize: 12,
            letterSpacing: '0.16em', textTransform: 'uppercase',
          }}
        >
          Send message
        </button>
      </form>
    </div>
  )
}
