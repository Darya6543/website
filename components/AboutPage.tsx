import { SocialLinks } from './SocialIcons'

const CvBlock = ({
  title,
  entries,
}: {
  title: string
  entries: { y: string; role: string; org: string }[]
}) => (
  <div>
    <div style={{
      fontFamily: 'var(--font-dm-mono), monospace', fontSize: 11,
      letterSpacing: '0.2em', textTransform: 'uppercase',
      color: '#141414', marginBottom: 14,
    }}>
      {title}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {entries.map((e, i) => (
        <div key={i}>
          <div style={{
            display: 'inline-block',
            fontFamily: 'var(--font-dm-mono), monospace', fontSize: 10,
            padding: '3px 10px', borderRadius: 999,
            background: '#141414', color: '#ffffff',
            letterSpacing: '0.08em', marginBottom: 6,
          }}>
            {e.y}
          </div>
          <div style={{
            fontFamily: 'var(--font-dm-mono), monospace',
            fontWeight: 500, fontSize: 14,
          }}>
            {e.role}
          </div>
          <div style={{ fontFamily: 'var(--font-dm-mono), monospace', fontSize: 12, color: '#6b6b6b', marginTop: 2 }}>{e.org}</div>
        </div>
      ))}
    </div>
  </div>
)

export function AboutPage() {
  return (
    <div className="page-pad" style={{ padding: '60px 24px 80px', position: 'relative', maxWidth: 1040, margin: '0 auto' }}>
      <div className="about-grid" style={{
        display: 'grid', gridTemplateColumns: '360px 1fr', gap: 60,
        alignItems: 'start',
      }}>

        {/* ── Left column ─────────────────────────────────── */}
        <div className="about-photo-col">
          {/* Social links */}
          <SocialLinks networks={['instagram', 'tiktok', 'linkedin']} gap={8} style={{ marginBottom: 18, marginLeft: -8 }} />

          {/* Photo frame */}
          <div style={{
            background: '#efefef', aspectRatio: '3/4',
            position: 'relative', overflow: 'hidden',
            border: '8px solid #ffffff',
            boxShadow: '0 1px 0 rgba(0,0,0,0.08), 0 12px 30px rgba(0,0,0,0.1)',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/MyPicture/Darya.jpg"
              alt="Darya Goloborodko"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>

        {/* ── Right column ────────────────────────────────── */}
        <div>
          <div style={{
            fontFamily: 'var(--font-dm-mono), monospace', fontSize: 11,
            letterSpacing: '0.24em', textTransform: 'uppercase',
            color: '#9a9a9a', marginBottom: 14,
          }}>
            a little about me
          </div>

          <h1 style={{
            fontFamily: 'var(--font-dm-mono), monospace', fontWeight: 500,
            fontSize: 24, margin: 0, lineHeight: 1.3, letterSpacing: '-0.01em',
            color: '#141414',
          }}>
            Hi, I&apos;m Darya —
          </h1>

          <p style={{
            fontFamily: 'var(--font-dm-mono), monospace', fontSize: 14, lineHeight: 1.7,
            color: '#2a2a2a', maxWidth: 560, marginTop: 24,
          }}>
            nice to meet you! I&apos;m a freelance game artist and illustrator
            based in Berlin.
          </p>

          <p style={{ fontFamily: 'var(--font-dm-mono), monospace', fontSize: 14, lineHeight: 1.7, color: '#2a2a2a', maxWidth: 560, marginTop: 18 }}>
            I&apos;m co-founder and Art Lead of the indie game studio{' '}
            <strong>THE ROOF Interactive</strong>, and I also teach workshops
            in game art and game design.
          </p>

          {/* CV */}
          <div className="cv-grid" style={{
            marginTop: 40,
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40,
          }}>
            <CvBlock
              title="Experience"
              entries={[
                { y: '2026 — now',  role: 'Lecturer, Game Design', org: 'Design Schule Schwerin' },
                { y: '2025 — now',  role: 'Co-founder & Art Lead', org: 'THE ROOF Interactive, Berlin' },
                { y: '2024 — now',  role: 'Freelance Game Artist & Illustrator', org: 'Self-employed, Berlin' },
                { y: '2024 — now',  role: 'Workshop Lead, Game Design', org: 'TUMO Berlin — Learning Center for Creative Technologies' },
                { y: '2024 — 2025', role: 'Workshop Lead, Game Design', org: 'Stiftung Digitale Spielekultur (Projekttage Games Berlin-Brandenburg)' },
              ]}
            />
            <CvBlock
              title="Education"
              entries={[
                { y: '2022 — 2025', role: 'Master, Game Design, System Design', org: 'HTW Berlin' },
                { y: '2018 — 2022', role: 'Bachelor, Game Design', org: 'HTW Berlin' },
                { y: '2012 — 2016', role: 'Bachelor, Fine Art', org: 'Odesa State Academy of Civil Engineering and Architecture' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
