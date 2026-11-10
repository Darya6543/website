export const SOCIAL = {
  instagram: 'https://www.instagram.com/darya_goloborodko_art/',
  tiktok: 'https://www.tiktok.com/@darya_goloborodko_art',
  linkedin: 'https://www.linkedin.com/in/darya-goloborodko-a6511a1b8/',
}

export const InstagramIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
  </svg>
)

export const LinkedInIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <line x1="7.5" y1="10" x2="7.5" y2="17" />
    <circle cx="7.5" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    <path d="M11.5 17v-4.2c0-1.7 1-2.8 2.5-2.8s2.5 1 2.5 2.8V17" />
  </svg>
)

// Outline-style TikTok note, drawn to match the other two icons.
export const TikTokIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <path d="M13 7v7.2a2.4 2.4 0 1 1-2.4-2.4" />
    <path d="M13 7c.3 1.6 1.5 2.7 3.2 2.8" />
  </svg>
)

const ICON_LINK: React.CSSProperties = { color: '#141414', display: 'flex' }

export function SocialLinks({
  networks,
  size = 28,
  gap = 16,
  style,
  className,
}: {
  networks: (keyof typeof SOCIAL)[]
  size?: number
  gap?: number
  style?: React.CSSProperties
  className?: string
}) {
  const icons = { instagram: InstagramIcon, tiktok: TikTokIcon, linkedin: LinkedInIcon }
  const labels = { instagram: 'Instagram', tiktok: 'TikTok', linkedin: 'LinkedIn' }
  return (
    <div className={className} style={{ display: 'flex', gap, ...style }}>
      {networks.map((n) => {
        const Icon = icons[n]
        return (
          <a key={n} href={SOCIAL[n]} target="_blank" rel="noopener noreferrer" aria-label={labels[n]} style={ICON_LINK}>
            <Icon size={size} />
          </a>
        )
      })}
    </div>
  )
}
