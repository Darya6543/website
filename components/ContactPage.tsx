'use client'

import { useState } from 'react'
import Link from 'next/link'

const FIELD_LABEL: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: 8,
  fontFamily: 'var(--font-dm-mono), monospace', fontSize: 11,
  letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a',
}

const FIELD_INPUT: React.CSSProperties = {
  fontFamily: 'var(--font-dm-mono), monospace', fontSize: 15, color: '#141414',
  padding: '10px 12px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: 6,
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error('send failed')
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
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
          Your email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          disabled={status === 'sending'}
          style={{
            alignSelf: 'flex-start',
            padding: '12px 26px', borderRadius: 999,
            background: '#141414', color: '#ffffff', border: 0,
            fontFamily: 'var(--font-dm-mono), monospace', fontSize: 12,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            opacity: status === 'sending' ? 0.6 : 1,
          }}
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>

        {status === 'sent' && (
          <p style={{ fontFamily: 'var(--font-dm-mono), monospace', fontSize: 13, color: '#2a7a3a' }}>
            Thanks! Your message is on its way.
          </p>
        )}
        {status === 'error' && (
          <p style={{ fontFamily: 'var(--font-dm-mono), monospace', fontSize: 13, color: '#a02a2a' }}>
            Something went wrong — please try again, or email me directly.
          </p>
        )}

        <p style={{
          fontFamily: 'var(--font-dm-mono), monospace', fontSize: 11, lineHeight: 1.6,
          color: '#9a9a9a',
        }}>
          By sending this message, you agree to the processing of your data as
          described in the{' '}
          <Link href="/datenschutz" style={{ color: '#9a9a9a' }}>privacy policy</Link>.
        </p>
      </form>
    </div>
  )
}
