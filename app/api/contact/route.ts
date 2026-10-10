import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.strato.de',
    port: 465,
    secure: true,
    auth: {
      user: process.env.CONTACT_SMTP_USER,
      pass: process.env.CONTACT_SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_SMTP_USER,
      to: process.env.CONTACT_SMTP_USER,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form send failed:', err)
    // TEMP: surface the real error for debugging a live-only failure; revert once fixed.
    const detail = err instanceof Error ? { message: err.message, code: (err as NodeJS.ErrnoException).code } : String(err)
    return NextResponse.json({ error: 'Send failed', detail }, { status: 500 })
  }
}
