const ICON_SIZE = 28

const InstagramIcon = () => (
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <line x1="7.5" y1="10" x2="7.5" y2="17" />
    <circle cx="7.5" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    <path d="M11.5 17v-4.2c0-1.7 1-2.8 2.5-2.8s2.5 1 2.5 2.8V17" />
  </svg>
)

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
    <div style={{ padding: '60px 24px 80px', position: 'relative', maxWidth: 1040, margin: '0 auto' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '360px 1fr', gap: 60,
        alignItems: 'start',
      }}>

        {/* ── Left column ─────────────────────────────────── */}
        <div>
          {/* Social links */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 18, marginLeft: -8 }}>
            {/* TODO: replace # with the real profile URLs */}
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: '#141414' }}>
              <InstagramIcon />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: '#141414' }}>
              <LinkedInIcon />
            </a>
          </div>

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
            fontSize: 40, margin: 0, lineHeight: 1.1, letterSpacing: '-0.01em',
            color: '#141414',
          }}>
            Hi, I&apos;m Darya,
          </h1>

          <p style={{
            fontFamily: 'var(--font-dm-mono), monospace', fontSize: 16, lineHeight: 1.6,
            color: '#2a2a2a', maxWidth: 560, marginTop: 24,
          }}>
            nice to meet you! I&apos;m a freelance game artist and illustrator
            from Berlin.
          </p>

          <p style={{ fontFamily: 'var(--font-dm-mono), monospace', fontSize: 14, lineHeight: 1.7, color: '#2a2a2a', maxWidth: 560, marginTop: 18 }}>
            I&apos;m also co-founder and Art Lead of the indie game studio{' '}
            <strong>The Roof Interactive</strong>. I also give workshops in
            Game Art and Game Design.
          </p>

          {/* CV */}
          <div style={{
            marginTop: 40,
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40,
          }}>
            <CvBlock
              title="Experience"
              entries={[
                { y: '2024 — now',  role: 'Freelance Game Art & Illustration', org: 'Self-employed, Berlin' },
                { y: '2024 — now',  role: 'Workshop Lead, Game Design', org: 'TOMO Berlin — Lernzentrum für kreative Technologien' },
                { y: '2024 — 2025', role: 'Workshopleitung Game Design', org: 'Stiftung Digitale Spielekultur, Projekttage Berlin' },
              ]}
            />
            <CvBlock
              title="Education"
              entries={[
                { y: '2022 — 2025', role: 'Master, Game Design / System Design', org: 'HTW Berlin' },
                { y: '2018 — 2022', role: 'Bachelor, Game Design', org: 'HTW Berlin' },
                { y: '2012 — 2016', role: 'Bachelor, Fine Art', org: 'Odesa State Academy of Building and Architecture' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
